-- Polezno — content schema.
-- Localized fields (title/description/…) are jsonb objects keyed by language
-- code, e.g. {"ru": "...", "en": "..."} — mirrors lib/types.ts. Apply this in
-- the Supabase SQL editor; there is no migration runner.

create extension if not exists "pgcrypto";

-- ── recipes ──────────────────────────────────────────────────────────────
create table if not exists public.recipes (
  id          text primary key default gen_random_uuid()::text,
  slug        text not null unique,
  category    text not null check (category in
                ('breakfast','soup','main','salad','dessert','drink','baking','snack')),
  is_pp       boolean not null default false,
  image       text,  -- nullable: attach a photo later from the admin panel;
                      -- the app shows a category placeholder cover until then
  minutes     integer not null default 0,
  calories    integer not null default 0,
  servings    integer not null default 1,
  difficulty  text not null default 'easy' check (difficulty in ('easy','medium','hard')),
  title       jsonb not null,
  description jsonb not null,
  ingredients jsonb not null default '{}'::jsonb,
  steps       jsonb not null default '{}'::jsonb,
  tags        jsonb not null default '{}'::jsonb,
  gallery     jsonb not null default '[]'::jsonb,  -- step photos, in step order
  created_at  timestamptz not null default now()
);

create index if not exists recipes_category_idx on public.recipes (category);
create index if not exists recipes_is_pp_idx on public.recipes (is_pp);
create index if not exists recipes_created_at_idx on public.recipes (created_at desc);

-- ── lifehacks ────────────────────────────────────────────────────────────
create table if not exists public.lifehacks (
  id         text primary key default gen_random_uuid()::text,
  slug       text not null unique,
  category   text not null check (category in ('storage','cooking','cleaning','saving')),
  image      text,  -- nullable, same as recipes
  title      jsonb not null,
  summary    jsonb not null,
  body       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists lifehacks_category_idx on public.lifehacks (category);
create index if not exists lifehacks_created_at_idx on public.lifehacks (created_at desc);

-- ── RLS: content is public-read, writes are service-role only ────────────
alter table public.recipes enable row level security;
alter table public.lifehacks enable row level security;

drop policy if exists "recipes public read" on public.recipes;
create policy "recipes public read" on public.recipes
  for select using (true);

drop policy if exists "lifehacks public read" on public.lifehacks;
create policy "lifehacks public read" on public.lifehacks
  for select using (true);
