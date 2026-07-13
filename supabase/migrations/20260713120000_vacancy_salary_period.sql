-- Day-rate vacancies (offshore CTV / OSV / survey, etc.) must show "per day"
-- rather than a misleading monthly figure. Add a salary period; existing rows
-- default to 'month'. Idempotent.
alter table public.vacancies
  add column if not exists salary_period text not null default 'month';
