// src/lib/server/db/schema.ts

import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	pgEnum,
	uuid,
	boolean,
	varchar,
	real
  } from 'drizzle-orm/pg-core';
  import type { AdapterAccount } from '@auth/core/adapters';
  
  // Define user roles enum
  export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);
  
  // Define message roles enum for chat
  export const messageRoleEnum = pgEnum('message_role', ['user', 'assistant', 'system']);
  
  export const users = pgTable('users', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull().unique(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
	hashedPassword: text('hashed_password'), // Your custom field for password
	role: userRoleEnum('role').notNull().default('user'), // Add role with default 'user'
	createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(), // Track user creation time
  });
  
  export const accounts = pgTable(
	'accounts',
	{
	  userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	  type: text('type').$type<AdapterAccount['type']>().notNull(),
	  provider: text('provider').notNull(),
	  providerAccountId: text('providerAccountId').notNull(),
	  refresh_token: text('refresh_token'),
	  access_token: text('access_token'),
	  expires_at: integer('expires_at'),
	  token_type: text('token_type'),
	  scope: text('scope'),
	  id_token: text('id_token'),
	  session_state: text('session_state')
	},
	(account) => ({
	  compoundKey: primaryKey({
		columns: [account.provider, account.providerAccountId]
	  })
	})
  );
  
  export const sessions = pgTable('sessions', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
	  .notNull()
	  .references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull()
  });
  
  export const verificationTokens = pgTable(
	'verification_tokens',
	{
	  identifier: text('identifier').notNull(),
	  token: text('token').notNull(),
	  expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	(vt) => ({
	  compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
	})
  );

  // Chat Sessions Table (renamed from chatSessions for consistency)
  export const chats = pgTable('chats', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: text('user_id')
	  .notNull()
	  .references(() => users.id, { onDelete: 'cascade' }),
	title: text('title').notNull().default('New Chat'),
	description: text('description'), // Optional chat description
	isActive: boolean('is_active').notNull().default(true),
	createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow()
  });

  // Chat Messages Table with Tree Structure Support
  export const messages = pgTable('messages', {
	id: uuid('id').defaultRandom().primaryKey(),
	chatId: uuid('chat_id')
	  .notNull()
	  .references(() => chats.id, { onDelete: 'cascade' }),
	parentId: uuid('parent_id')
	  .references(() => messages.id, { onDelete: 'cascade' }), // For branching
	role: messageRoleEnum('role').notNull(),
	content: text('content').notNull(),
	// Metadata for enhanced functionality
	metadata: text('metadata'), // JSON string for additional data (citations, attachments, etc.)
	tokens: integer('tokens').default(0),
	// Tree structure fields
	depth: integer('depth').notNull().default(0), // How deep in the tree (0 = root level)
	path: text('path'), // Materialized path for efficient tree queries (e.g., "1.2.3")
	isDeleted: boolean('is_deleted').notNull().default(false), // Soft delete
	// Timestamps
	createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow()
  });

  // Legacy tables for backward compatibility (will be deprecated)
  export const chatSessions = chats;
  export const chatMessages = messages;

  // Indexes for better performance
  export const messagesIndexes = {
    chatId: 'messages_chat_id_idx',
    parentId: 'messages_parent_id_idx', 
    path: 'messages_path_idx',
    role: 'messages_role_idx',
    createdAt: 'messages_created_at_idx',
    isDeleted: 'messages_is_deleted_idx'
  };

  // Chat Analytics Table (for tracking usage)
  export const chatAnalytics = pgTable('chat_analytics', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: text('user_id')
	  .notNull()
	  .references(() => users.id, { onDelete: 'cascade' }),
	sessionId: uuid('session_id')
	  .notNull()
	  .references(() => chatSessions.id, { onDelete: 'cascade' }),
	messageCount: integer('message_count').notNull().default(0),
	totalTokens: integer('total_tokens').notNull().default(0),
	duration: integer('duration').default(0), // in seconds
	createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow()
  });

  // Password Reset Tokens Table
  export const passwordResetTokens = pgTable('password_reset_tokens', {
	token: text('token').notNull().primaryKey(),
	userId: text('user_id', { length: 255 })
	  .notNull()
	  .references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { mode: 'date' }).notNull()
  });

  // Email Verification Tokens Table
  export const emailVerificationTokens = pgTable('email_verification_tokens', {
	token: text('token').notNull().primaryKey(),
	userId: text('user_id')
	  .notNull()
	  .references(() => users.id, { onDelete: 'cascade' }),
	email: text('email').notNull(),
	expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
	createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow()
  });

  // RAG Tables for Document Management and Vector Search

  // Documents Table - stores metadata about uploaded documents
  export const documents = pgTable('documents', {
	id: uuid('id').defaultRandom().primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	content: text('content').notNull(),
	sourceUrl: varchar('source_url', { length: 500 }),
	filePath: varchar('file_path', { length: 500 }),
	fileType: varchar('file_type', { length: 50 }), // pdf, txt, md, etc.
	fileSize: integer('file_size'), // in bytes
	userId: text('user_id')
	  .notNull()
	  .references(() => users.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow()
  });

  // Chunks Table - stores text chunks from documents
  export const chunks = pgTable('chunks', {
	id: uuid('id').defaultRandom().primaryKey(),
	documentId: uuid('document_id')
	  .notNull()
	  .references(() => documents.id, { onDelete: 'cascade' }),
	content: text('content').notNull(),
	chunkIndex: integer('chunk_index').notNull(), // order within document
	startChar: integer('start_char'), // character position in original document
	endChar: integer('end_char'), // character position in original document
	createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow()
  });

  // Embeddings Table - stores vector embeddings for semantic search
  export const embeddings = pgTable('embeddings', {
	id: uuid('id').defaultRandom().primaryKey(),
	chunkId: uuid('chunk_id')
	  .notNull()
	  .references(() => chunks.id, { onDelete: 'cascade' }),
	embedding: text('embedding').notNull(), // JSON array of floats stored as text
	embeddingVector: text('embedding_vector'), // pgvector column for similarity search
	modelName: varchar('model_name', { length: 100 }).notNull(), // e.g., 'all-MiniLM-L6-v2'
	dimension: integer('dimension').notNull(), // embedding dimension
	createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow()
  });

  // Document Access Control Table - for sharing documents between users
  export const documentAccess = pgTable('document_access', {
	id: uuid('id').defaultRandom().primaryKey(),
	documentId: uuid('document_id')
	  .notNull()
	  .references(() => documents.id, { onDelete: 'cascade' }),
	userId: text('user_id')
	  .notNull()
	  .references(() => users.id, { onDelete: 'cascade' }),
	permission: varchar('permission', { length: 20 }).notNull().default('read'), // read, write, admin
	grantedBy: text('granted_by')
	  .notNull()
	  .references(() => users.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow()
  });