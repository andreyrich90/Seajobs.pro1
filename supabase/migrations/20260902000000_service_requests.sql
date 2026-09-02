-- Requests for the paid CV-distribution service, collected before any payment
-- provider exists.
--
-- The service is being validated, not sold yet: the page shows the packages and
-- their prices, and the button opens a form instead of a checkout. That answers
-- the only question worth answering first — how many people, out of everyone who
-- reads the page, actually want it at that price — and it needs no merchant
-- account, no VAT handling and no refund flow to find out.
--
-- Deliberately its own table rather than a row in `messages`: a request carries
-- the package, the price it was shown at and the seafarer's rank and fleet, and
-- those are the fields the answer is read from. Folding them into a free-text
-- message would mean re-parsing prose to count anything.
--
-- Anyone may insert (a visitor need not be signed in, same rule as the contact
-- form); only admins read. There is no seafarer-facing list, so no owner policy.
--
-- Idempotent: safe to re-run.

create table if not exists service_requests (
  id uuid default gen_random_uuid() primary key,
  -- Null for a visitor who is not signed in. `on delete set null` keeps the
  -- request countable after an account is removed.
  user_id uuid references profiles(id) on delete set null,

  -- Which package was clicked. `package_code` is the stable key from
  -- lib/cvBlast.ts; `package_label` is the human name copied at request time so
  -- the row still reads correctly after the catalogue is edited.
  package_code text not null,
  package_label text not null,
  -- The prices shown on the page when the request was made, in whole units.
  -- Stored per row for the same reason: the catalogue will change, and a
  -- conversion rate is only meaningful against the price that was on screen.
  price_eur integer,
  price_usd integer,

  name text,
  email text not null,
  phone text,
  -- Rank and fleet come from the canonical taxonomies (lib/ranks.ts,
  -- lib/fleets.ts) so requests can be grouped the same way vacancies are.
  rank text,
  fleet text,
  note text,
  -- Which language the page was read in — tells us which market is asking.
  lang text,

  -- new -> contacted -> done, or dropped. Free text rather than an enum so a
  -- new state does not need a migration.
  status text not null default 'new',
  admin_note text,

  created_at timestamptz not null default now(),
  handled_at timestamptz
);

create index if not exists idx_service_requests_created on service_requests(created_at desc);
create index if not exists idx_service_requests_status on service_requests(status, created_at desc);

alter table service_requests enable row level security;

drop policy if exists "Anyone can request a service" on service_requests;
drop policy if exists "Admins manage service requests" on service_requests;

create policy "Anyone can request a service" on service_requests
  for insert with check (true);
create policy "Admins manage service requests" on service_requests
  for all using (is_admin());

notify pgrst, 'reload schema';
