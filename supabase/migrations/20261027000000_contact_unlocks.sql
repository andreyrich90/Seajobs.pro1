-- Free vacancy unlocks (lib/freeUnlocks.ts).
--
-- A seafarer without a subscription may open up to three vacancies a week:
-- an opened vacancy shows the crewing agency's e-mail and phone and may be
-- applied to. One row per vacancy opened; once opened it stays open for that
-- seafarer, so coming back to it costs nothing. The week is counted from
-- these rows' created_at (Monday 00:00 Kyiv time, in code).
--
-- Every write goes through the service role (api/vacancy-contact); the owner
-- may read their own rows and nothing else.

create table if not exists public.contact_unlocks (
  id          uuid primary key default gen_random_uuid(),
  seafarer_id uuid not null references public.seafarers(id) on delete cascade,
  vacancy_id  uuid not null references public.vacancies(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (seafarer_id, vacancy_id)
);

create index if not exists contact_unlocks_seafarer_created_idx
  on public.contact_unlocks (seafarer_id, created_at desc);

alter table public.contact_unlocks enable row level security;

drop policy if exists "Seafarers read own unlocks" on public.contact_unlocks;
create policy "Seafarers read own unlocks" on public.contact_unlocks
  for select using (seafarer_id = auth.uid() or public.is_admin());

notify pgrst, 'reload schema';
