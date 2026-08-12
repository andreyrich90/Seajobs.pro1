-- Telegram: per-seafarer job alerts and the public vacancy channel.
--
-- Two independent features share the same bot token:
--   1. A seafarer links their Telegram account to their SeaJobs profile and
--      gets a message whenever a vacancy matching their job alert is posted.
--      Email stays as the fallback for everyone who has not linked — it costs
--      us Resend quota, Telegram costs nothing, so linked users are served by
--      Telegram and free up the daily email budget for the rest.
--   2. Every new vacancy is mirrored to a public channel.
--
-- Idempotent: safe to re-run.

-- ── 1. Seafarer ↔ Telegram binding ──────────────────────────────────────────

-- Deliberately its own table rather than columns on `seafarers`: that table is
-- readable by every signed-in user ("Public can view seafarers" ... using
-- (true)), which would hand any company the chat id of every seafarer who
-- connected. Nobody but the owner has any business reading this row.
create table if not exists seafarer_telegram (
  seafarer_id uuid primary key references profiles(id) on delete cascade,
  -- One Telegram account drives one profile: without the unique constraint a
  -- shared or hijacked chat could receive — and unsubscribe from — alerts for
  -- several seafarers at once.
  chat_id bigint not null unique,
  lang text,
  linked_at timestamptz not null default now()
);

alter table seafarer_telegram enable row level security;

drop policy if exists "Own telegram link is readable" on seafarer_telegram;
drop policy if exists "Own telegram link is removable" on seafarer_telegram;

-- The owner can see that they are connected and disconnect themselves.
-- Writing the binding is the bot's job and goes through the service role.
create policy "Own telegram link is readable" on seafarer_telegram
  for select using (auth.uid() = seafarer_id);
create policy "Own telegram link is removable" on seafarer_telegram
  for delete using (auth.uid() = seafarer_id);

-- Linking happens through a one-time code carried in the bot's deep link
-- (t.me/<bot>?start=<code>). The code is what proves the person who opened the
-- chat is the person who was signed in, so it is short-lived and single-use.
create table if not exists telegram_link_codes (
  code text primary key,
  seafarer_id uuid not null references profiles(id) on delete cascade,
  lang text,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '30 minutes',
  used_at timestamptz
);

create index if not exists idx_telegram_link_codes_seafarer
  on telegram_link_codes(seafarer_id);

-- Codes are minted and redeemed only by the service role (/api/telegram/link
-- and the bot webhook). RLS on with no policy = nobody else can read them,
-- which is the point: a readable code is a hijackable account link.
alter table telegram_link_codes enable row level security;

-- ── 2. Channel mirror ───────────────────────────────────────────────────────

-- Set once the vacancy has been posted to the channel. Doubles as the "already
-- sent" marker for the hourly sweeper, so a failed live post is retried and a
-- successful one is never posted twice.
alter table vacancies add column if not exists telegram_message_id bigint;

create index if not exists idx_vacancies_telegram_pending
  on vacancies(created_at) where telegram_message_id is null and is_active = true;

notify pgrst, 'reload schema';
