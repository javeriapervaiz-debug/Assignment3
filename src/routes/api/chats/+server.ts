// src/routes/api/chats/+server.ts
// API endpoints for chat management

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { chatTreeService } from '$lib/server/chat-tree';
// No need to import auth - using locals.auth() directly

export const GET: RequestHandler = async ({ locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const chats = await chatTreeService.getUserChats(session.user.id);
    return json({ chats });
  } catch (error) {
    console.error('Error fetching chats:', error);
    return json({ error: 'Failed to fetch chats' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description } = await request.json();
    const chat = await chatTreeService.createChat(
      session.user.id,
      title || 'New Chat',
      description
    );

    return json({ chat }, { status: 201 });
  } catch (error) {
    console.error('Error creating chat:', error);
    return json({ error: 'Failed to create chat' }, { status: 500 });
  }
};
