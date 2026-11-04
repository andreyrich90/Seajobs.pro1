-- Where a seafarer started their subscription checkout: the page the
-- subscription screen was opened from (its ?back=), such as a vacancy
-- (/jobs/<slug>-<uuid>) or the CV page (/seafarer/cv). Empty when the
-- subscription page was opened on its own, and for a subscription an admin
-- granted by hand. Shown in /admin/subscriptions and in the Telegram notice
-- of a payment, next to the seafarer's rank.
--
-- Written by api/subscription with the service role, like every other column
-- of this table. Idempotent and ASCII only; run before merging the code that
-- writes it.

alter table public.seafarer_subscriptions add column if not exists source text;

notify pgrst, 'reload schema';
