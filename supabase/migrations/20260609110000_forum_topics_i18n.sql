-- Step 1: Convert title and content columns to JSONB
-- Run this FIRST in Supabase SQL Editor

ALTER TABLE forum_topics
  ALTER COLUMN title TYPE jsonb USING jsonb_build_object('ru', title),
  ALTER COLUMN content TYPE jsonb USING jsonb_build_object('ru', content);
