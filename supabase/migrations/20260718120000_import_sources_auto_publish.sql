-- Let a Telegram source publish vacancies straight to the site instead of
-- queueing them for manual review. Qualifying posts (a position + a crewing
-- name, either stated or derived from the email domain) become live vacancies
-- automatically; dedup and the unique-description rewrite already apply on the
-- import path. Sources with auto_publish = false keep going to the review queue.
--
-- Idempotent.

alter table public.import_sources
  add column if not exists auto_publish boolean not null default true;
