-- Automated vacancy collection pipeline.
--
-- import_sources  — public channels (currently Telegram) the cron collector
--                   polls for fresh vacancy posts.
-- vacancy_drafts  — parsed vacancies awaiting admin review before they become
--                   real `vacancies` rows. The review queue is the safety net:
--                   nothing scraped goes live without a human approving it.
--
-- Idempotent.

create table if not exists public.import_sources (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'telegram',        -- 'telegram' for now
  handle text not null,                          -- channel handle, no leading @
  label text,                                    -- human-friendly name
  default_contact_email text,                    -- fallback crewing email if a post has none
  is_active boolean not null default true,
  last_checked_at timestamptz,
  last_post_id bigint,                           -- high-water mark: highest Telegram post id processed
  last_error text,
  created_at timestamptz not null default now()
);

create unique index if not exists import_sources_kind_handle_idx
  on public.import_sources (kind, lower(handle));

create table if not exists public.vacancy_drafts (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.import_sources (id) on delete set null,
  source_kind text,
  source_handle text,
  source_url text,
  raw_text text,                                 -- the original post text
  parsed jsonb not null,                         -- one ParsedVacancy object
  dedup_key text not null,                       -- hash of source+post, blocks re-import of same post
  status text not null default 'pending',        -- 'pending' | 'approved' | 'rejected'
  vacancy_id uuid,                               -- set once approved & imported
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists vacancy_drafts_dedup_idx
  on public.vacancy_drafts (dedup_key);

create index if not exists vacancy_drafts_status_idx
  on public.vacancy_drafts (status, created_at desc);
