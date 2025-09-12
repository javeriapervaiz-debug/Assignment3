// src/routes/api/chats/[id]/messages/+server.ts
// API endpoints for message management within a chat

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { chatTreeService } from '$lib/server/chat-tree';

export const GET: RequestHandler = async ({ params, url, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const format = url.searchParams.get('format') || 'tree';
    
    if (format === 'linear') {
      // Return linear format for API compatibility
      const messages = await chatTreeService.getLinearMessages(params.id, session.user.id);
      return json({ messages });
    } else {
      // Return tree format by default
      const messages = await chatTreeService.getChatMessages(params.id, session.user.id);
      return json({ messages });
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    return json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ params, request, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role, content, parentId, metadata } = await request.json();
    
    if (!role || !content) {
      return json({ error: 'Role and content are required' }, { status: 400 });
    }

    const message = await chatTreeService.addMessage(
      params.id,
      role,
      content,
      parentId,
      metadata
    );

    return json({ message }, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return json({ error: 'Failed to create message' }, { status: 500 });
  }
};
