// src/routes/api/rag/search/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RAGService } from '$lib/server/rag';

const ragService = new RAGService();

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { query, limit = 5 } = await request.json();

    if (!query || typeof query !== 'string') {
      return json({ error: 'Query is required' }, { status: 400 });
    }

    const results = await ragService.search(session.user.id, query, limit);
    
    return json({ results });
  } catch (error) {
    console.error('Error searching documents:', error);
    return json({ error: error.message || 'Failed to search documents' }, { status: 500 });
  }
};
