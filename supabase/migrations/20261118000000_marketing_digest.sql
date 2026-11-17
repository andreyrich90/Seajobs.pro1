-- The weekly vacancy digest and the Brevo mailing list (lib/brevo.ts,
-- lib/marketing.ts).
--
-- Whether a seafarer wants marketing e-mail is a consent like the others: a
-- `user_consents` row with kind 'marketing', granted true or false, the
-- latest one wins. This table only keeps the sending state for those who said
-- yes: the address the list was given, the language, and when the last digest
-- went out, so the daily cron can send to whoever is due and no one twice in
-- a week. The address is here so an unsubscribe reported by Brevo (which only
-- knows the e-mail) can be traced back to the account.
--
-- Service role only: no policies, so no browser reads or writes it.
-- ASCII only: pasted into the SQL editor from a browser that translates pages.

create table if not exists public.marketing_digest (
  user_id       uuid primary key references public.profiles(id) on delete cascade,
  email         text,
  lang          text,
  synced_at     timestamptz,
  last_sent_at  timestamptz,
  last_count    integer,
  sends         integer not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists marketing_digest_email_idx on public.marketing_digest (lower(email));
create index if not exists marketing_digest_last_sent_idx on public.marketing_digest (last_sent_at nulls first);

alter table public.marketing_digest enable row level security;
revoke all on public.marketing_digest from anon, authenticated;
