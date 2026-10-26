-- The seafarer subscription: 3, 6 or 12 months of direct crewing contacts and
-- CV downloads (PDF, image, Word), paid through Buy Me a Coffee.
--
-- Searching, the profile and applying through the portal stay free. What the
-- subscription opens is what a seafarer uses to act on their own: a vacancy's
-- e-mail and phone, the "write from my own mailbox" route, a company's contact
-- people, and the CV files. See lib/subscription.ts.
--
-- One row per checkout. A row is opened (status 'pending') when the seafarer
-- presses a plan, before the provider's checkout; the payment webhook marks it
-- paid and gives it its window. Windows stack: a second payment starts where
-- the current one ends, so renewing early loses nothing.
--
-- Idempotent, like every migration here, and ASCII only. Run it in the
-- Supabase SQL editor.

create table if not exists seafarer_subscriptions (
  id             uuid primary key default gen_random_uuid(),
  -- seafarers.id is the auth user id.
  seafarer_id    uuid not null references seafarers(id) on delete cascade,
  plan           text not null check (plan in ('3m', '6m', '12m')),
  months         int  not null check (months in (3, 6, 12)),
  price_usd      numeric not null,
  -- The address the checkout was opened from. The webhook matches on it,
  -- which is why it is stored beside seafarer_id: people pay from a second
  -- mailbox, and then only the time of the checkout links the two.
  email          text not null,
  status         text not null default 'pending' check (status in ('pending', 'paid', 'refunded')),
  starts_at      timestamptz,
  paid_until     timestamptz,
  paid_at        timestamptz,
  paid_amount    numeric,
  paid_currency  text,
  -- The provider's event key, or 'manual:<admin id>' when an admin granted it.
  paid_ref       text,
  created_at     timestamptz not null default now()
);

-- "The newest unpaid checkout for this address and plan."
create index if not exists idx_seafarer_subscriptions_email_created
  on seafarer_subscriptions (email, created_at desc);
-- "Until when is this seafarer subscribed."
create index if not exists idx_seafarer_subscriptions_active
  on seafarer_subscriptions (seafarer_id, paid_until desc) where paid_at is not null;
-- "Unpaid checkouts opened in the last minutes", for the recency fallback.
create index if not exists idx_seafarer_subscriptions_pending
  on seafarer_subscriptions (created_at desc) where paid_at is null;

alter table seafarer_subscriptions enable row level security;

-- Read-only, and only your own. Every write (opening a checkout, the webhook,
-- an admin's grant) runs with the service role, so there is deliberately no
-- insert or update policy: a browser must not be able to declare itself paid.
drop policy if exists "Seafarers read own subscriptions" on seafarer_subscriptions;
create policy "Seafarers read own subscriptions" on seafarer_subscriptions
  for select using (seafarer_id = auth.uid() or is_admin());

-- Every payment stays on record with the thing it paid for, as for the Word
-- export and the mailing packages.
alter table payment_events
  add column if not exists subscription_id uuid references seafarer_subscriptions(id) on delete set null;

-- A company's phones, e-mails and contact people are now part of what the
-- subscription opens, so logged-out visitors no longer read them straight from
-- the table. Same column list as 20260624020000_company_referral_bonus.sql,
-- minus phones, emails and crew_managers. The company page asks
-- api/company-contacts for them instead. Signed-in roles keep their grant:
-- a company's own cabinet reads and edits those columns from the browser.
revoke select on companies from anon;
grant select (id, name, logo_url, location, description, website, updated_at, is_verified)
  on companies to anon;

notify pgrst, 'reload schema';
