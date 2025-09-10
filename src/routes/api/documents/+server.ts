// src/routes/api/documents/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RAGService } from '$lib/server/rag';
import { parseDocument, validateFile } from '$lib/server/document-parser';

const ragService = new RAGService();

export const GET: RequestHandler = async ({ url, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const documents = await ragService.getUserDocuments(session.user.id, limit, offset);
    
    return json({ documents });
  } catch (error) {
    console.error('Error getting documents:', error);
    return json({ error: 'Failed to get documents' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const sourceUrl = formData.get('sourceUrl') as string;

    if (!file) {
      return json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return json({ error: validation.error }, { status: 400 });
    }

    // Parse document
    const parsedDoc = await parseDocument(file);
    
    // Use provided title or parsed title
    const documentTitle = title || parsedDoc.title;

    // Add document to RAG system
    const documentId = await ragService.addDocument(session.user.id, {
      title: documentTitle,
      content: parsedDoc.content,
      sourceUrl: sourceUrl || undefined,
      fileType: parsedDoc.fileType,
      fileSize: parsedDoc.fileSize
    });

    return json({ 
      success: true, 
      documentId,
      message: 'Document uploaded and processed successfully' 
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    return json({ error: error.message || 'Failed to upload document' }, { status: 500 });
  }
};
