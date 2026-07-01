-- Allow a forum reply to reply to another reply (threaded comments).
-- parent_id NULL = top-level reply to the topic; otherwise it points at the
-- reply being answered. Deleting a reply cascades to its child replies.
-- Idempotent. Run once in the Supabase SQL editor.

alter table public.forum_posts
  add column if not exists parent_id uuid references public.forum_posts(id) on delete cascade;

create index if not exists idx_forum_posts_parent on public.forum_posts(parent_id);

notify pgrst, 'reload schema';
