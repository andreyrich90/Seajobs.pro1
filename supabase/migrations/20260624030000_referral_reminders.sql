-- ============================================================================
-- Referral reminder tracking.
-- ============================================================================
-- Tracks whether the "your friend hasn't finished their profile yet" nudge
-- (sent by the api/cron/referral-reminders Vercel cron, 7 days after signup)
-- has already gone out for a pending referral, so it's sent at most once.
--
-- Run once in the Supabase SQL editor. Idempotent.
-- ============================================================================

alter table referrals add column if not exists reminder_sent_at timestamptz;

notify pgrst, 'reload schema';
