-- Custom cover image per collection (collections themselves live in code;
-- this table only stores an optional cover the admin uploads for each slug).
create table if not exists public.collection_covers (
  slug       text primary key,
  image      text not null,
  updated_at timestamptz not null default now()
);

alter table public.collection_covers enable row level security;
drop policy if exists "collection_covers public read" on public.collection_covers;
create policy "collection_covers public read" on public.collection_covers
  for select using (true);
