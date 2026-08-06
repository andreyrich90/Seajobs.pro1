-- Audit trail for every transactional email the site sends (lib/email.ts).
--
-- Two purposes:
--   1. Visibility — sends used to fail silently, so a rate-limited email (e.g. a
--      CV headed to a crewing agency) just vanished. Now every attempt is
--      recorded with its outcome.
--   2. Budgeting — the job-alert fan-out emails one seafarer per subscriber per
--      vacancy, which could exhaust the provider's daily quota in a single
--      Telegram import run. The fan-out now checks today's count first.
--
-- Idempotent; safe to run more than once.

CREATE TABLE IF NOT EXISTS email_log (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  to_email   text        NOT NULL,
  kind       text        NOT NULL,
  ok         boolean     NOT NULL,
  error      text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- The budget query filters on kind + ok + created_at.
CREATE INDEX IF NOT EXISTS email_log_kind_created_idx
  ON email_log (kind, created_at DESC);
CREATE INDEX IF NOT EXISTS email_log_created_idx
  ON email_log (created_at DESC);

-- Written only by server routes using the service-role key, so RLS stays on
-- with no policies — anon/authenticated clients get no access at all.
ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;
