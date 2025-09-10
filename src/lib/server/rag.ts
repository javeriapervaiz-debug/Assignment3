// src/lib/server/rag.ts
import { db } from './db';
import { documents, chunks, embeddings, documentAccess } from './db/schema';
import { eq, and, sql } from 'drizzle-orm';

export interface DocumentData {
  title: string;
  content: string;
  sourceUrl?: string;
  filePath?: string;
  fileType?: string;
  fileSize?: number;
}

export interface SearchResult {
  content: string;
  chunkIndex: number;
  title: string;
  sourceUrl?: string;
  similarity: number;
  documentId: string;
}

export class RAGService {
  private embeddingServiceUrl = process.env.EMBEDDING_SERVICE_URL || 'http://localhost:8001';
  private chunkSize = 500; // characters per chunk
  private chunkOverlap = 50; // characters overlap between chunks

  /**
   * Add a document to the RAG system
   */
  async addDocument(userId: string, documentData: DocumentData): Promise<string> {
    try {
      // 1. Store document metadata
      const [document] = await db.insert(documents).values({
        title: documentData.title,
        content: documentData.content,
        sourceUrl: documentData.sourceUrl,
        filePath: documentData.filePath,
        fileType: documentData.fileType,
        fileSize: documentData.fileSize,
        userId: userId
      }).returning({ id: documents.id });

      // 2. Chunk the content
      const textChunks = this.chunkText(documentData.content);

      // 3. Process each chunk
      for (let i = 0; i < textChunks.length; i++) {
        const chunk = textChunks[i];
        
        // Store chunk
        const [chunkResult] = await db.insert(chunks).values({
          documentId: document.id,
          content: chunk,
          chunkIndex: i,
          startChar: i * (this.chunkSize - this.chunkOverlap),
          endChar: Math.min((i + 1) * (this.chunkSize - this.chunkOverlap) + this.chunkOverlap, documentData.content.length)
        }).returning({ id: chunks.id });

        // Get embedding for the chunk
        const embedding = await this.getEmbedding(chunk);
        
        // Store embedding (both as JSON and vector)
        await db.insert(embeddings).values({
          chunkId: chunkResult.id,
          embedding: JSON.stringify(embedding),
          embeddingVector: `[${embedding.join(',')}]`, // pgvector format
          modelName: 'all-MiniLM-L6-v2',
          dimension: embedding.length
        });
      }

      return document.id;
    } catch (error) {
      console.error('Error adding document:', error);
      throw new Error(`Failed to add document: ${error.message}`);
    }
  }

  /**
   * Search for relevant chunks using vector similarity
   */
  async search(userId: string, query: string, limit: number = 5): Promise<SearchResult[]> {
    try {
      // Get query embedding
      const queryEmbedding = await this.getEmbedding(query);
      const queryVector = `[${queryEmbedding.join(',')}]`;

      // Vector similarity search using pgvector
      const results = await db.execute(sql`
        SELECT 
          c.content,
          c.chunk_index,
          d.title,
          d.source_url,
          d.id as document_id,
          1 - (e.embedding_vector <=> ${queryVector}::vector) as similarity
        FROM embeddings e
        JOIN chunks c ON e.chunk_id = c.id
        JOIN documents d ON c.document_id = d.id
        WHERE d.user_id = ${userId}
        ORDER BY e.embedding_vector <=> ${queryVector}::vector
        LIMIT ${limit}
      `);

      return results.map(row => ({
        content: row.content,
        chunkIndex: row.chunk_index,
        title: row.title,
        sourceUrl: row.source_url,
        similarity: parseFloat(row.similarity),
        documentId: row.document_id
      }));
    } catch (error) {
      console.error('Error searching documents:', error);
      throw new Error(`Failed to search documents: ${error.message}`);
    }
  }

  /**
   * Get documents for a user
   */
  async getUserDocuments(userId: string, limit: number = 20, offset: number = 0) {
    try {
      const results = await db
        .select({
          id: documents.id,
          title: documents.title,
          fileType: documents.fileType,
          fileSize: documents.fileSize,
          createdAt: documents.createdAt,
          updatedAt: documents.updatedAt
        })
        .from(documents)
        .where(eq(documents.userId, userId))
        .orderBy(sql`${documents.updatedAt} DESC`)
        .limit(limit)
        .offset(offset);

      return results;
    } catch (error) {
      console.error('Error getting user documents:', error);
      throw new Error(`Failed to get documents: ${error.message}`);
    }
  }

  /**
   * Delete a document and all its chunks/embeddings
   */
  async deleteDocument(userId: string, documentId: string): Promise<boolean> {
    try {
      // Verify ownership
      const [document] = await db
        .select({ id: documents.id })
        .from(documents)
        .where(and(eq(documents.id, documentId), eq(documents.userId, userId)));

      if (!document) {
        throw new Error('Document not found or access denied');
      }

      // Delete document (cascades to chunks and embeddings)
      await db.delete(documents).where(eq(documents.id, documentId));
      
      return true;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw new Error(`Failed to delete document: ${error.message}`);
    }
  }

  /**
   * Chunk text into overlapping segments
   */
  private chunkText(text: string): string[] {
    const chunks: string[] = [];
    const words = text.split(/\s+/);
    const wordsPerChunk = Math.floor(this.chunkSize / 6); // rough estimate: 6 chars per word
    const wordsOverlap = Math.floor(this.chunkOverlap / 6);

    for (let i = 0; i < words.length; i += wordsPerChunk - wordsOverlap) {
      const chunk = words.slice(i, i + wordsPerChunk).join(' ');
      if (chunk.trim()) {
        chunks.push(chunk.trim());
      }
    }

    return chunks;
  }

  /**
   * Get embedding from embedding service
   */
  private async getEmbedding(text: string): Promise<number[]> {
    try {
      const response = await fetch(`${this.embeddingServiceUrl}/embed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() })
      });

      if (!response.ok) {
        throw new Error(`Embedding service error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.embedding;
    } catch (error) {
      console.error('Error getting embedding:', error);
      // Fallback: return zero vector if embedding service is down
      return new Array(384).fill(0);
    }
  }

  /**
   * Health check for embedding service
   */
  async checkEmbeddingService(): Promise<boolean> {
    try {
      const response = await fetch(`${this.embeddingServiceUrl}/health`, {
        method: 'GET',
        timeout: 5000
      });
      return response.ok;
    } catch (error) {
      console.error('Embedding service health check failed:', error);
      return false;
    }
  }
}
