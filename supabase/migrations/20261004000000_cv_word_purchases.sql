-- Paid Word export of a seafarer's CV.
--
-- PDF and PNG stay free; this buys the one thing they cannot be — a document
-- the seafarer can edit and an agency can ask for by name. One payment unlocks
-- the export for that account for good: a CV is rewritten for every second
-- application, and charging again for a corrected line would make the product
-- an annoyance rather than a tool.
--
-- Idempotent, like every migration here. Run it in the Supabase SQL editor.

create table if not exists cv_word_purchases (
  id             uuid primary key default gen_random_uuid(),
  -- seafarers.id is the auth user id, so this is both the owner and the
  -- profile the document is built from.
  seafarer_id    uuid not null references seafarers(id) on delete cascade,
  -- The address the purchase was started from. The payment webhook matches on
  -- it, which is why it is stored even though seafarer_id already identifies
  -- the buyer: people pay from a second mailbox, and then neither matches.
  email          text not null,
  status         text not null default 'pending',
  price_usd      numeric,
  paid_at        timestamptz,
  paid_amount    numeric,
  paid_currency  text,
  paid_ref       text,
  created_at     timestamptz not null default now()
);

-- The webhook looks up "the newest unpaid purchase for this address".
create index if not exists idx_cv_word_purchases_email_created
  on cv_word_purchases (email, created_at desc);
-- The download route asks "has this seafarer ever paid".
create index if not exists idx_cv_word_purchases_seafarer_paid
  on cv_word_purchases (seafarer_id) where paid_at is not null;

alter table cv_word_purchases enable row level security;

-- Read-only, and only your own. Everything that writes here — creating the
-- pending row, marking it paid from the webhook, an admin fixing a payment
-- that did not match — runs with the service role and bypasses RLS, so there
-- is deliberately no insert or update policy: a browser must not be able to
-- declare itself paid.
drop policy if exists "Seafarers read own cv purchases" on cv_word_purchases;
create policy "Seafarers read own cv purchases" on cv_word_purchases
  for select using (seafarer_id = auth.uid() or is_admin());

-- payment_events.request_id points at service_requests, so a Word payment has
-- nowhere to land in it. Give it its own column rather than loosening that one:
-- every payment stays on record with the thing it actually paid for.
alter table payment_events
  add column if not exists cv_purchase_id uuid references cv_word_purchases(id) on delete set null;

notify pgrst, 'reload schema';
