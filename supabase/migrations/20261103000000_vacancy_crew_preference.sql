-- Which crew a company would rather hire for a vacancy: a region (europe,
-- asia) or countries as ISO codes (ua, pl, ro, ...). Chosen in the company
-- cabinet when posting, shown on the vacancy page. An empty list means no
-- preference. It filters nothing: every seafarer still sees and can apply.
-- The codes are checked in code (lib/crewPreference.ts), which ignores any it
-- does not know, so the list can grow without a migration.
--
-- The grant is per column (lib/vacancyColumns.ts), so it is given here.
-- Run BEFORE merging the code that reads the column.

alter table public.vacancies
  add column if not exists crew_preference text[] not null default '{}';

grant select (crew_preference) on public.vacancies to anon, authenticated;

notify pgrst, 'reload schema';
