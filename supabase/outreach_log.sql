-- Tracks which crewing agencies already received the outreach invite, so the
-- /api/outreach mailer skips them on the next run (safe batch-by-batch sending).
-- Idempotent — safe to re-run. Run once in the Supabase SQL Editor.

CREATE TABLE IF NOT EXISTS outreach_log (
  email      text PRIMARY KEY,
  company    text,
  lang       text,
  resend_id  text,
  sent_at    timestamptz NOT NULL DEFAULT now()
);

-- Service-role only (API route uses the service key); no public access.
ALTER TABLE outreach_log ENABLE ROW LEVEL SECURITY;
