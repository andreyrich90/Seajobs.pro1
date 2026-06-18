-- Forum sections / categories. Admins manage them; everyone can read.
create table if not exists public.forum_categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- Topics belong to an optional section.
alter table public.forum_topics
  add column if not exists category_id uuid references public.forum_categories(id) on delete set null;

alter table public.forum_categories enable row level security;

-- Anyone can read the list of sections.
drop policy if exists "forum_categories_read" on public.forum_categories;
create policy "forum_categories_read" on public.forum_categories
  for select using (true);

-- Only admins can create / edit / delete sections.
drop policy if exists "forum_categories_admin_write" on public.forum_categories;
create policy "forum_categories_admin_write" on public.forum_categories
  for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));
