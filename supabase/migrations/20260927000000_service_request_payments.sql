-- Knowing that a CV-distribution order was actually paid for.
--
-- Until now the page sent the reader to Buy Me a Coffee and forgot about them.
-- Whether the money arrived was answerable only in the BMC inbox, and matching
-- an e-mail there to a row here was done by eye. That is the one fact the work
-- waits on: nothing is mailed to 5 400 crewing addresses on a maybe.
--
-- Two different facts are recorded, and they must not be confused:
--
--   pay_clicked_at  the reader pressed the pay button. Intent, nothing more —
--                   the checkout may have been abandoned on the next screen.
--                   Useful because it arrives instantly and without any
--                   provider wiring, so it is the signal that works today.
--   paid_at         the provider said the money arrived, over a signed
--                   webhook. This is the one that may start a mailing.
--
-- payment_events keeps every webhook body verbatim. Buy Me a Coffee's payload
-- shape is not something we control, and the first real event is the only
-- documentation we will get of it; throwing the body away after a failed match
-- would mean a payment that exists on their side and nowhere on ours.
--
-- Idempotent: safe to re-run.

alter table service_requests add column if not exists pay_clicked_at timestamptz;
alter table service_requests add column if not exists paid_at timestamptz;
alter table service_requests add column if not exists paid_amount numeric(10,2);
alter table service_requests add column if not exists paid_currency text;
-- The provider's own id for the purchase, so a retried webhook is recognised
-- and a payment can be traced back to their dashboard during a dispute.
alter table service_requests add column if not exists paid_ref text;

comment on column service_requests.pay_clicked_at is
  'Pressed the pay button. Intent only — never treat as payment.';
comment on column service_requests.paid_at is
  'Provider confirmed the money over a signed webhook. Safe to start the work.';

create table if not exists payment_events (
  id uuid default gen_random_uuid() primary key,
  received_at timestamptz not null default now(),
  provider text not null default 'buymeacoffee',
  -- The provider's event/purchase id when the payload carries one, otherwise a
  -- hash of the body. Unique, so a retry updates nothing and pays nobody twice.
  event_key text not null,
  event_type text,
  email text,
  amount numeric(10,2),
  currency text,
  -- The request this was matched to, if any. Null is a normal outcome: someone
  -- can pay from a different address than the one on the form, and that payment
  -- still has to be visible.
  request_id uuid references service_requests(id) on delete set null,
  matched boolean not null default false,
  payload jsonb not null
);

create unique index if not exists idx_payment_events_key on payment_events(provider, event_key);
create index if not exists idx_payment_events_received on payment_events(received_at desc);
create index if not exists idx_payment_events_email on payment_events(lower(email));

alter table payment_events enable row level security;

-- Written by the service role only (the webhook route). Admins read it to see
-- payments that matched nothing.
drop policy if exists "Admins read payment events" on payment_events;
create policy "Admins read payment events" on payment_events
  for select using (is_admin());

notify pgrst, 'reload schema';
