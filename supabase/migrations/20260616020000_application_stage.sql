-- ATS pipeline stage for the crewing candidate Kanban.
-- Kept separate from `status` (which drives the seafarer-facing view).
alter table public.applications
  add column if not exists stage text not null default 'new';

-- Backfill the pipeline from any existing status so current data isn't lost.
update public.applications set stage = case
  when status = 'rejected' then 'rejected'
  when status = 'accepted' then 'offer'
  when status = 'viewed'   then 'interview'
  else 'new'
end
where stage = 'new';
