-- Migration: Add tree-structured chat and message tables
-- This migration creates the new chat and message tables with branching support

-- Create the new chats table (replaces chat_sessions)
CREATE TABLE IF NOT EXISTS "chats" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "title" text NOT NULL DEFAULT 'New Chat',
  "description" text,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

-- Create the new messages table with tree structure support
CREATE TABLE IF NOT EXISTS "messages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "chat_id" uuid NOT NULL REFERENCES "chats"("id") ON DELETE CASCADE,
  "parent_id" uuid REFERENCES "messages"("id") ON DELETE CASCADE,
  "role" message_role NOT NULL,
  "content" text NOT NULL,
  "metadata" text, -- JSON string for additional data
  "tokens" integer DEFAULT 0,
  "depth" integer NOT NULL DEFAULT 0,
  "path" text, -- Materialized path for tree queries
  "is_deleted" boolean NOT NULL DEFAULT false,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "messages_chat_id_idx" ON "messages"("chat_id");
CREATE INDEX IF NOT EXISTS "messages_parent_id_idx" ON "messages"("parent_id");
CREATE INDEX IF NOT EXISTS "messages_path_idx" ON "messages"("path");
CREATE INDEX IF NOT EXISTS "messages_role_idx" ON "messages"("role");
CREATE INDEX IF NOT EXISTS "messages_created_at_idx" ON "messages"("created_at");
CREATE INDEX IF NOT EXISTS "messages_is_deleted_idx" ON "messages"("is_deleted");

-- Create index on chats for user queries
CREATE INDEX IF NOT EXISTS "chats_user_id_idx" ON "chats"("user_id");
CREATE INDEX IF NOT EXISTS "chats_is_active_idx" ON "chats"("is_active");

-- Migrate existing data from old tables to new tables (if they exist)
-- First, check if old tables exist and migrate data
DO $$
BEGIN
  -- Migrate chat_sessions to chats
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'chat_sessions') THEN
    INSERT INTO "chats" ("id", "user_id", "title", "is_active", "created_at", "updated_at")
    SELECT "id", "user_id", "title", "is_active", "created_at", "updated_at"
    FROM "chat_sessions"
    ON CONFLICT ("id") DO NOTHING;
  END IF;

  -- Migrate chat_messages to messages
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'chat_messages') THEN
    INSERT INTO "messages" ("id", "chat_id", "role", "content", "tokens", "created_at")
    SELECT 
      "id", 
      "session_id" as "chat_id", 
      "role", 
      "content", 
      "tokens", 
      "created_at"
    FROM "chat_messages"
    ON CONFLICT ("id") DO NOTHING;
  END IF;
END $$;

-- Add comments for documentation
COMMENT ON TABLE "chats" IS 'Chat sessions/threads for users';
COMMENT ON TABLE "messages" IS 'Individual messages in chat threads with tree structure for branching';
COMMENT ON COLUMN "messages"."parent_id" IS 'Points to parent message for branching conversations';
COMMENT ON COLUMN "messages"."depth" IS 'Tree depth level (0 = root level)';
COMMENT ON COLUMN "messages"."path" IS 'Materialized path for efficient tree queries (e.g., "1.2.3")';
COMMENT ON COLUMN "messages"."metadata" IS 'JSON string containing citations, attachments, and other metadata';
COMMENT ON COLUMN "messages"."is_deleted" IS 'Soft delete flag for message history preservation';
