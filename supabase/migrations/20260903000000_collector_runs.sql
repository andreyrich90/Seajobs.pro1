-- One row per run of the Telegram collector.
--
-- The collector returned its summary to whoever called it and nowhere else, so
-- the cron's summary went straight into the void. "Have vacancies stopped
-- arriving?" then had no answer on the site: the only evidence was a 200 in the
-- Vercel log, which says the route ran, not that it found anything. Answering it
-- meant reading logs and guessing.
--
-- The counts are chosen to separate the three failures that look identical from
-- the outside:
--   fetched = 0                -> the scrape is broken or blocked (t.me markup
--                                 changed, or Telegram is refusing the host)
--   fetched > 0, fresh = 0     -> nothing new since the last high-water mark;
--                                 the channels are simply quiet
--   fresh > 0, drafts = 0      -> posts arrive but none survive the filters
--   drafts > 0, still nothing  -> the queue is waiting on a human, not on code
--    published on the site
--
-- Written by the service role only (the cron and the admin "run now" route), so
-- there is no insert policy. Admins read it to render the last-run line.
--
-- Idempotent: safe to re-run.

create table if not exists collector_runs (
  id uuid default gen_random_uuid() primary key,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  -- cron | manual. Free text rather than an enum so a third caller does not
  -- need a migration. Named trigger_kind, not trigger: TRIGGER is a SQL keyword,
  -- and recordRun swallows its own errors, so a column that quietly fails to
  -- parse would leave the audit silently empty.
  trigger_kind text not null default 'cron',
  ok boolean not null default false,

  sources integer not null default 0,
  -- Posts the scrape returned, before any filtering. The one number that tells
  -- code failure apart from a quiet channel.
  fetched integer not null default 0,
  -- Of those, newer than the source's last_post_id.
  fresh integer not null default 0,
  -- Of those, passing the vacancy keyword hint and sent to the parser.
  scanned integer not null default 0,
  drafts integer not null default 0,
  published integer not null default 0,
  -- Sources that threw. Their messages stay in import_sources.last_error.
  errors integer not null default 0,
  error_detail text,
  -- The per-source breakdown, exactly as the route returns it.
  report jsonb
);

create index if not exists idx_collector_runs_started on collector_runs(started_at desc);

alter table collector_runs enable row level security;

drop policy if exists "Admins read collector runs" on collector_runs;
create policy "Admins read collector runs" on collector_runs
  for select using (is_admin());

notify pgrst, 'reload schema';
