-- ============================================================================
-- Direct chat between a crewing company and a seafarer.
-- ============================================================================
-- Rules:
--   * A conversation can be STARTED ONLY by a company, and only after the
--     seafarer has applied to one of that company's vacancies.
--   * Once a conversation exists, BOTH sides can send messages.
--
-- Run once in the Supabase SQL editor. Idempotent.
-- ============================================================================

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  company_id     uuid not null references profiles(id) on delete cascade,
  seafarer_id    uuid not null references profiles(id) on delete cascade,
  application_id uuid references applications(id) on delete set null,
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  unique (company_id, seafarer_id)
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references profiles(id) on delete cascade,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_conversations_company  on conversations(company_id);
create index if not exists idx_conversations_seafarer on conversations(seafarer_id);
create index if not exists idx_chat_messages_conversation on chat_messages(conversation_id, created_at);

-- ── RLS ─────────────────────────────────────────────────────────────────────
alter table conversations enable row level security;
alter table chat_messages enable row level security;

-- Participants can read their conversations.
drop policy if exists "conv_select_participant" on conversations;
create policy "conv_select_participant" on conversations for select
  using (company_id = auth.uid() or seafarer_id = auth.uid() or public.is_admin());

-- Only a company can START a conversation, and only with a seafarer who has
-- applied to one of that company's vacancies.
drop policy if exists "conv_insert_company" on conversations;
create policy "conv_insert_company" on conversations for insert
  to authenticated
  with check (
    company_id = auth.uid()
    and exists (
      select 1 from applications a
      join vacancies v on v.id = a.vacancy_id
      where v.company_id = auth.uid()
        and a.seafarer_id = conversations.seafarer_id
    )
  );

-- Either participant may bump last_message_at.
drop policy if exists "conv_update_participant" on conversations;
create policy "conv_update_participant" on conversations for update
  using (company_id = auth.uid() or seafarer_id = auth.uid());

-- Messages are readable by either participant of the parent conversation.
drop policy if exists "msg_select_participant" on chat_messages;
create policy "msg_select_participant" on chat_messages for select
  using (
    exists (
      select 1 from conversations c
      where c.id = chat_messages.conversation_id
        and (c.company_id = auth.uid() or c.seafarer_id = auth.uid())
    )
    or public.is_admin()
  );

-- Either participant may send a message (the sender must be themselves).
drop policy if exists "msg_insert_participant" on chat_messages;
create policy "msg_insert_participant" on chat_messages for insert
  to authenticated
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from conversations c
      where c.id = chat_messages.conversation_id
        and (c.company_id = auth.uid() or c.seafarer_id = auth.uid())
    )
  );

-- Either participant may mark messages as read.
drop policy if exists "msg_update_participant" on chat_messages;
create policy "msg_update_participant" on chat_messages for update
  using (
    exists (
      select 1 from conversations c
      where c.id = chat_messages.conversation_id
        and (c.company_id = auth.uid() or c.seafarer_id = auth.uid())
    )
  );

-- Realtime: stream new messages to participants (best-effort; the UI also polls).
do $$
begin
  begin
    alter publication supabase_realtime add table chat_messages;
  exception when duplicate_object then null;
  end;
end $$;

notify pgrst, 'reload schema';
