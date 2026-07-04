-- Tracks the last "new message" email per (conversation, recipient) so that a
-- burst of chat messages produces ONE instant email (the first message) instead
-- of one email per message. The daily unread-messages digest cron then covers
-- whatever arrived after that email and is still unread ("the last one").
create table if not exists public.chat_email_log (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  recipient_id    uuid not null,
  sent_at         timestamptz not null default now(),
  primary key (conversation_id, recipient_id)
);

-- Service-role only (written by /api/notify and the digest cron). RLS enabled
-- with no policies on purpose: clients never read or write this table.
alter table public.chat_email_log enable row level security;
