-- Publish queue for vacancies found by the Telegram collector.
--
-- The collector runs every six hours and used to publish everything it found
-- in the same minute. Now it imports those vacancies hidden (is_active = false)
-- with a release time in publish_at, and the release cron
-- (api/cron/release-vacancies, every 10 minutes) turns each one on when its
-- time comes: two or three at a time, 15-40 minutes apart, never at night in
-- Kyiv. See lib/publishQueue.ts.
--
-- publish_alerts: set for a vacancy that is new (not a re-advertised one), so
-- the release also sends its job alerts and the Telegram channel post.
--
-- Until this is run, the code sees no publish_at column and publishes
-- immediately, as before. Idempotent: safe to re-run.

alter table public.vacancies add column if not exists publish_at timestamptz;
alter table public.vacancies add column if not exists publish_alerts boolean not null default false;

create index if not exists vacancies_publish_at_idx
  on public.vacancies (publish_at)
  where publish_at is not null;

-- The browser reads vacancies column by column (20261011010000). Admins see the
-- queue time on /admin/vacancies, so signed-in sessions may read publish_at;
-- row-level security still hides queued rows from everyone but admins and the
-- owning company. publish_alerts stays server-only.
grant select (publish_at) on public.vacancies to authenticated;
