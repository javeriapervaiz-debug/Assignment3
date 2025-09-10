// src/routes/api/documents/[id]/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RAGService } from '$lib/server/rag';

const ragService = new RAGService();

export const DELETE: RequestHandler = async ({ params, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const documentId = params.id;
    if (!documentId) {
      return json({ error: 'Document ID required' }, { status: 400 });
    }

    const success = await ragService.deleteDocument(session.user.id, documentId);
    
    if (success) {
      return json({ success: true, message: 'Document deleted successfully' });
    } else {
      return json({ error: 'Failed to delete document' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    return json({ error: error.message || 'Failed to delete document' }, { status: 500 });
  }
};
