// src/lib/server/chat-tree.ts
// Service for handling tree-structured chat operations

import { db } from './db';
import { chats, messages } from './db/schema';
import { eq, and, desc, asc, sql } from 'drizzle-orm';
import type { Message } from 'ai';

export interface ChatMessage {
  id: string;
  chatId: string;
  parentId?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: {
    citations?: Array<{id: string, title: string, url?: string, chunk?: string}>;
    attachment?: {
      id: string;
      title: string;
      fileType: string;
      fileSize: number;
    };
    isStreaming?: boolean;
  };
  tokens?: number;
  depth: number;
  path?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  children?: ChatMessage[];
}

export interface Chat {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  messageCount?: number;
}

export class ChatTreeService {
  /**
   * Create a new chat session
   */
  async createChat(userId: string, title: string = 'New Chat', description?: string): Promise<Chat> {
    const [chat] = await db.insert(chats).values({
      userId,
      title,
      description,
      isActive: true
    }).returning();
    
    return chat;
  }

  /**
   * Get all chats for a user
   */
  async getUserChats(userId: string): Promise<Chat[]> {
    const userChats = await db
      .select({
        id: chats.id,
        userId: chats.userId,
        title: chats.title,
        description: chats.description,
        isActive: chats.isActive,
        createdAt: chats.createdAt,
        updatedAt: chats.updatedAt,
        messageCount: sql<number>`COUNT(${messages.id})`
      })
      .from(chats)
      .leftJoin(messages, and(
        eq(messages.chatId, chats.id),
        eq(messages.isDeleted, false)
      ))
      .where(eq(chats.userId, userId))
      .groupBy(chats.id)
      .orderBy(desc(chats.updatedAt));

    return userChats;
  }

  /**
   * Get a specific chat by ID
   */
  async getChat(chatId: string, userId: string): Promise<Chat | null> {
    const [chat] = await db
      .select()
      .from(chats)
      .where(and(
        eq(chats.id, chatId),
        eq(chats.userId, userId)
      ));

    return chat || null;
  }

  /**
   * Update chat title or description
   */
  async updateChat(chatId: string, userId: string, updates: {
    title?: string;
    description?: string;
  }): Promise<Chat | null> {
    const [updatedChat] = await db
      .update(chats)
      .set({
        ...updates,
        updatedAt: new Date()
      })
      .where(and(
        eq(chats.id, chatId),
        eq(chats.userId, userId)
      ))
      .returning();

    return updatedChat || null;
  }

  /**
   * Delete a chat (soft delete)
   */
  async deleteChat(chatId: string, userId: string): Promise<boolean> {
    const result = await db
      .update(chats)
      .set({
        isActive: false,
        updatedAt: new Date()
      })
      .where(and(
        eq(chats.id, chatId),
        eq(chats.userId, userId)
      ));

    return result.rowCount > 0;
  }

  /**
   * Add a new message to a chat
   */
  async addMessage(
    chatId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
    parentId?: string,
    metadata?: any
  ): Promise<ChatMessage> {
    // Get parent message info if parentId is provided
    let depth = 0;
    let path = '';

    if (parentId) {
      const parentMessage = await db
        .select({ depth: messages.depth, path: messages.path })
        .from(messages)
        .where(eq(messages.id, parentId))
        .limit(1);

      if (parentMessage.length > 0) {
        depth = parentMessage[0].depth + 1;
        // Generate new path by appending to parent path
        const parentPath = parentMessage[0].path || '';
        const siblingCount = await this.getSiblingCount(parentId);
        path = parentPath ? `${parentPath}.${siblingCount + 1}` : `${siblingCount + 1}`;
      }
    } else {
      // Root level message
      const rootCount = await this.getRootMessageCount(chatId);
      path = `${rootCount + 1}`;
    }

    const [message] = await db.insert(messages).values({
      chatId,
      parentId,
      role,
      content,
      metadata: metadata ? JSON.stringify(metadata) : null,
      depth,
      path
    }).returning();

    // Update chat's updatedAt timestamp
    await db
      .update(chats)
      .set({ updatedAt: new Date() })
      .where(eq(chats.id, chatId));

    return this.formatMessage(message);
  }

  /**
   * Get all messages for a chat in tree structure
   */
  async getChatMessages(chatId: string, userId: string): Promise<ChatMessage[]> {
    // Verify user owns the chat
    const chat = await this.getChat(chatId, userId);
    if (!chat) {
      throw new Error('Chat not found or access denied');
    }

    // Get all messages for the chat
    const allMessages = await db
      .select()
      .from(messages)
      .where(and(
        eq(messages.chatId, chatId),
        eq(messages.isDeleted, false)
      ))
      .orderBy(asc(messages.createdAt));

    // Convert to tree structure
    return this.buildMessageTree(allMessages.map(this.formatMessage));
  }

  /**
   * Get a specific message by ID
   */
  async getMessage(messageId: string, userId: string): Promise<ChatMessage | null> {
    const [message] = await db
      .select()
      .from(messages)
      .innerJoin(chats, eq(chats.id, messages.chatId))
      .where(and(
        eq(messages.id, messageId),
        eq(chats.userId, userId),
        eq(messages.isDeleted, false)
      ));

    return message ? this.formatMessage(message.messages) : null;
  }

  /**
   * Edit a message (creates a new branch)
   */
  async editMessage(
    messageId: string,
    userId: string,
    newContent: string,
    newMetadata?: any
  ): Promise<ChatMessage> {
    const originalMessage = await this.getMessage(messageId, userId);
    if (!originalMessage) {
      throw new Error('Message not found or access denied');
    }

    // Create a new message with the same parent as the original
    return this.addMessage(
      originalMessage.chatId,
      originalMessage.role,
      newContent,
      originalMessage.parentId,
      newMetadata || originalMessage.metadata
    );
  }

  /**
   * Regenerate an assistant message (creates a new branch)
   */
  async regenerateMessage(
    messageId: string,
    userId: string,
    newContent: string,
    newMetadata?: any
  ): Promise<ChatMessage> {
    const originalMessage = await this.getMessage(messageId, userId);
    if (!originalMessage) {
      throw new Error('Message not found or access denied');
    }

    if (originalMessage.role !== 'assistant') {
      throw new Error('Can only regenerate assistant messages');
    }

    // Create a new assistant message with the same parent as the original
    return this.addMessage(
      originalMessage.chatId,
      'assistant',
      newContent,
      originalMessage.parentId,
      newMetadata || originalMessage.metadata
    );
  }

  /**
   * Soft delete a message
   */
  async deleteMessage(messageId: string, userId: string): Promise<boolean> {
    const result = await db
      .update(messages)
      .set({
        isDeleted: true,
        updatedAt: new Date()
      })
      .where(and(
        eq(messages.id, messageId),
        eq(messages.chatId, sql`(
          SELECT id FROM ${chats} 
          WHERE id = ${messages.chatId} AND user_id = ${userId}
        )`)
      ));

    return result.rowCount > 0;
  }

  /**
   * Get the linear conversation thread (for API compatibility)
   */
  async getLinearMessages(chatId: string, userId: string): Promise<Message[]> {
    const treeMessages = await this.getChatMessages(chatId, userId);
    return this.flattenMessageTree(treeMessages);
  }

  // Private helper methods

  private async getSiblingCount(parentId: string): Promise<number> {
    const [result] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(messages)
      .where(and(
        eq(messages.parentId, parentId),
        eq(messages.isDeleted, false)
      ));

    return result.count;
  }

  private async getRootMessageCount(chatId: string): Promise<number> {
    const [result] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(messages)
      .where(and(
        eq(messages.chatId, chatId),
        eq(messages.parentId, null),
        eq(messages.isDeleted, false)
      ));

    return result.count;
  }

  private buildMessageTree(messages: ChatMessage[]): ChatMessage[] {
    const messageMap = new Map<string, ChatMessage>();
    const rootMessages: ChatMessage[] = [];

    // First pass: create map of all messages
    messages.forEach(msg => {
      messageMap.set(msg.id, { ...msg, children: [] });
    });

    // Second pass: build tree structure
    messages.forEach(msg => {
      const messageWithChildren = messageMap.get(msg.id)!;
      
      if (msg.parentId) {
        const parent = messageMap.get(msg.parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(messageWithChildren);
        }
      } else {
        rootMessages.push(messageWithChildren);
      }
    });

    return rootMessages;
  }

  private flattenMessageTree(treeMessages: ChatMessage[]): Message[] {
    const result: Message[] = [];
    
    const flatten = (messages: ChatMessage[]) => {
      messages.forEach(msg => {
        result.push({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          ...(msg.metadata?.citations && { citations: msg.metadata.citations })
        });
        
        if (msg.children && msg.children.length > 0) {
          flatten(msg.children);
        }
      });
    };

    flatten(treeMessages);
    return result;
  }

  private formatMessage(dbMessage: any): ChatMessage {
    return {
      id: dbMessage.id,
      chatId: dbMessage.chatId,
      parentId: dbMessage.parentId,
      role: dbMessage.role,
      content: dbMessage.content,
      metadata: dbMessage.metadata ? JSON.parse(dbMessage.metadata) : undefined,
      tokens: dbMessage.tokens,
      depth: dbMessage.depth,
      path: dbMessage.path,
      isDeleted: dbMessage.isDeleted,
      createdAt: dbMessage.createdAt,
      updatedAt: dbMessage.updatedAt
    };
  }
}

export const chatTreeService = new ChatTreeService();
