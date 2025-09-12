// src/routes/api/chats/[id]/+server.ts
// API endpoints for individual chat management

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { chatTreeService } from '$lib/server/chat-tree';

export const GET: RequestHandler = async ({ params, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const chat = await chatTreeService.getChat(params.id, session.user.id);
    if (!chat) {
      return json({ error: 'Chat not found' }, { status: 404 });
    }

    return json({ chat });
  } catch (error) {
    console.error('Error fetching chat:', error);
    return json({ error: 'Failed to fetch chat' }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ params, request, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description } = await request.json();
    const chat = await chatTreeService.updateChat(params.id, session.user.id, {
      title,
      description
    });

    if (!chat) {
      return json({ error: 'Chat not found' }, { status: 404 });
    }

    return json({ chat });
  } catch (error) {
    console.error('Error updating chat:', error);
    return json({ error: 'Failed to update chat' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const success = await chatTreeService.deleteChat(params.id, session.user.id);
    if (!success) {
      return json({ error: 'Chat not found' }, { status: 404 });
    }

    return json({ success: true });
  } catch (error) {
    console.error('Error deleting chat:', error);
    return json({ error: 'Failed to delete chat' }, { status: 500 });
  }
};
