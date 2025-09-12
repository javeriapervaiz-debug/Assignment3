// src/routes/api/messages/[id]/+server.ts
// API endpoints for individual message management

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { chatTreeService } from '$lib/server/chat-tree';

export const GET: RequestHandler = async ({ params, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const message = await chatTreeService.getMessage(params.id, session.user.id);
    if (!message) {
      return json({ error: 'Message not found' }, { status: 404 });
    }

    return json({ message });
  } catch (error) {
    console.error('Error fetching message:', error);
    return json({ error: 'Failed to fetch message' }, { status: 500 });
  }
};

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, metadata, action } = await request.json();
    
    if (!content) {
      return json({ error: 'Content is required' }, { status: 400 });
    }

    let message;
    
    if (action === 'regenerate') {
      // Regenerate assistant message (creates new branch)
      message = await chatTreeService.regenerateMessage(
        params.id,
        session.user.id,
        content,
        metadata
      );
    } else {
      // Edit message (creates new branch)
      message = await chatTreeService.editMessage(
        params.id,
        session.user.id,
        content,
        metadata
      );
    }

    return json({ message });
  } catch (error) {
    console.error('Error updating message:', error);
    return json({ error: 'Failed to update message' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const success = await chatTreeService.deleteMessage(params.id, session.user.id);
    if (!success) {
      return json({ error: 'Message not found' }, { status: 404 });
    }

    return json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return json({ error: 'Failed to delete message' }, { status: 500 });
  }
};
