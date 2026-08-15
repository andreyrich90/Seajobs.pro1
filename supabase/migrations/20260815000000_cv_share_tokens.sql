-- Second way to apply: the seafarer writes to the agency from their own mailbox.
--
-- A mail client cannot attach a file from a link, so the CV travels as a URL
-- instead — which is the better half of the trade anyway: the crewing manager
-- lands on SeaJobs.pro rather than reading a signature in a footer.
--
-- The URL cannot be the public profile. A CV carries a passport number, visas
-- and a date of birth, and `seafarers` deliberately exposes only a thin
-- whitelist to anonymous visitors. So each application mints its own token:
-- one link per agency, dead after 30 days, revocable at any time, and — because
-- it is per application — a leak can be traced to the agency it was given to.
--
-- Idempotent: safe to re-run.

create table if not exists cv_share_tokens (
  token text primary key,
  seafarer_id uuid not null references profiles(id) on delete cascade,
  -- Which application this link was minted for. Kept nullable so the row
  -- survives if the application is ever removed; the link is then simply an
  -- orphan the seafarer can still see and revoke.
  application_id uuid references applications(id) on delete set null,
  vacancy_id uuid references vacancies(id) on delete set null,
  -- Free text: who it was sent to, so the seafarer's list is readable.
  sent_to text,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '30 days',
  revoked_at timestamptz,
  -- Proof the agency actually opened it — the one thing a mailto flow can still
  -- tell the seafarer, since we never learn whether the mail was sent.
  opened_at timestamptz,
  opened_count integer not null default 0
);

create index if not exists idx_cv_share_tokens_seafarer on cv_share_tokens(seafarer_id, created_at desc);

alter table cv_share_tokens enable row level security;

drop policy if exists "Seafarers see own CV links" on cv_share_tokens;
drop policy if exists "Seafarers revoke own CV links" on cv_share_tokens;

-- The owner lists and revokes their own links. Minting is done by the API with
-- the service role, and so is the read behind the public page — an unauthenticated
-- visitor holding the token must never be able to query the table itself.
create policy "Seafarers see own CV links" on cv_share_tokens
  for select using (auth.uid() = seafarer_id);
create policy "Seafarers revoke own CV links" on cv_share_tokens
  for update using (auth.uid() = seafarer_id) with check (auth.uid() = seafarer_id);

notify pgrst, 'reload schema';
