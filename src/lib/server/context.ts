// Context retrieval system for RAG (Retrieval-Augmented Generation)
// This is a simplified version - in a full implementation, you'd use pgvector

export interface DocumentChunk {
  id: string;
  title: string;
  content: string;
  url?: string;
  metadata?: Record<string, any>;
  similarity?: number;
}

export interface Citation {
  id: string;
  title: string;
  url?: string;
  chunk?: string;
}

// Mock knowledge base - in a real implementation, this would come from pgvector
const KNOWLEDGE_BASE: DocumentChunk[] = [
  {
    id: 'auth-1',
    title: 'User Authentication System',
    content: 'The authentication system uses Auth.js with email/password authentication, OAuth providers (Google & GitHub), and secure session management. Passwords are hashed using bcrypt with 12 salt rounds.',
    url: '/admin/users',
    metadata: { category: 'authentication', priority: 'high' }
  },
  {
    id: 'auth-2', 
    title: 'Password Security',
    content: 'Password requirements include minimum 8 characters, bcrypt hashing with 12 salt rounds, and secure password reset via email verification.',
    url: '/forgot-password',
    metadata: { category: 'security', priority: 'high' }
  },
  {
    id: 'admin-1',
    title: 'Admin Dashboard Features',
    content: 'The admin dashboard provides user management, system statistics, and platform settings. Admins can view user activity, manage roles, and configure system parameters.',
    url: '/admin',
    metadata: { category: 'admin', priority: 'medium' }
  },
  {
    id: 'chat-1',
    title: 'AI Chat System',
    content: 'The AI chat system uses Google Gemini AI with streaming responses, session management, and message history. It supports markdown rendering and syntax highlighting.',
    url: '/chat',
    metadata: { category: 'features', priority: 'medium' }
  },
  {
    id: 'security-1',
    title: 'Security Best Practices',
    content: 'Security features include JWT session tokens, CSRF protection, SQL injection prevention via Drizzle ORM, and environment variable protection for sensitive data.',
    url: '/admin/settings',
    metadata: { category: 'security', priority: 'high' }
  },
  {
    id: 'email-1',
    title: 'Email System',
    content: 'Email functionality includes account verification, password reset notifications, and automated emails using Nodemailer with SMTP configuration.',
    url: '/verify-email-pending',
    metadata: { category: 'features', priority: 'medium' }
  },
  {
    id: 'db-1',
    title: 'Database Schema',
    content: 'The database uses PostgreSQL with Drizzle ORM. Schema includes users, sessions, accounts, verification tokens, chat sessions, and chat messages tables.',
    url: '/admin/stats',
    metadata: { category: 'technical', priority: 'low' }
  }
];

// Simple text similarity function (in production, use proper embeddings)
function calculateSimilarity(query: string, text: string): number {
  const queryWords = query.toLowerCase().split(/\s+/);
  const textWords = text.toLowerCase().split(/\s+/);
  
  let matches = 0;
  for (const queryWord of queryWords) {
    if (textWords.some(textWord => textWord.includes(queryWord) || queryWord.includes(textWord))) {
      matches++;
    }
  }
  
  return matches / queryWords.length;
}

// Retrieve relevant context chunks based on user query
export async function retrieveContext(query: string, maxResults: number = 3): Promise<{
  chunks: DocumentChunk[];
  citations: Citation[];
}> {
  // Calculate similarity scores
  const scoredChunks = KNOWLEDGE_BASE.map(chunk => ({
    ...chunk,
    similarity: calculateSimilarity(query, `${chunk.title} ${chunk.content}`)
  }));

  // Sort by similarity and take top results
  const relevantChunks = scoredChunks
    .filter(chunk => chunk.similarity > 0.1) // Only include chunks with some relevance
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, maxResults);

  // Convert to citations
  const citations: Citation[] = relevantChunks.map(chunk => ({
    id: chunk.id,
    title: chunk.title,
    url: chunk.url,
    chunk: chunk.content.substring(0, 200) + (chunk.content.length > 200 ? '...' : '')
  }));

  return {
    chunks: relevantChunks,
    citations
  };
}

// Generate context-aware system prompt
export function generateContextPrompt(chunks: DocumentChunk[]): string {
  if (chunks.length === 0) {
    return `You are a helpful AI assistant for an authentication platform. 
    You can help users with:
    - General questions about the platform
    - Technical support and troubleshooting
    - Account management guidance
    - Security best practices
    - Feature explanations
    
    Be professional, helpful, and concise in your responses. 
    If you don't know something specific about the platform, say so and suggest contacting support.`;
  }

  const contextInfo = chunks.map(chunk => 
    `**${chunk.title}**: ${chunk.content}`
  ).join('\n\n');

  return `You are a helpful AI assistant for an authentication platform. 

CONTEXT INFORMATION:
${contextInfo}

Based on the context above, help users with:
- Platform features and functionality
- Technical support and troubleshooting  
- Account management guidance
- Security best practices
- Feature explanations

When providing answers, reference the context information when relevant and cite sources using [1], [2], etc. format.
Be professional, helpful, and concise in your responses.`;
}
