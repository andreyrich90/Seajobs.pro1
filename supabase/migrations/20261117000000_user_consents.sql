-- Consent to the processing of personal data: a journal, one row per
-- confirmation.
--
-- A row says that this account ticked this box (kind) under this version of
-- the Privacy Policy and Terms, when, from which IP, in which language and
-- where (the registration form or the banner in the cabinet). It is the proof
-- if anyone ever asks whether a person agreed. When the policy changes, the
-- version in lib/consent.ts moves and everyone is asked again; old rows stay.
--
-- Rows are written only by api/consent with the service role, so the IP is
-- the one the server saw and a browser cannot back-date a consent. The owner
-- and an admin may read them. Deleting the account deletes its profile and,
-- with it, these rows.
--
-- ASCII only: pasted into the SQL editor from a browser that translates pages.

create table if not exists public.user_consents (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  kind        text not null,
  version     text not null,
  granted     boolean not null default true,
  source      text,
  locale      text,
  ip          text,
  user_agent  text,
  created_at  timestamptz not null default now()
);

create index if not exists user_consents_user_kind_idx
  on public.user_consents (user_id, kind, created_at desc);

alter table public.user_consents enable row level security;

drop policy if exists "Owner or admin reads consents" on public.user_consents;
create policy "Owner or admin reads consents" on public.user_consents
  for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_admin()));

revoke insert, update, delete on public.user_consents from anon, authenticated;
