-- Step photos: a gallery of image URLs per recipe, in step order.
-- Run once on an existing database (0001 already includes it for fresh setups).
alter table public.recipes
  add column if not exists gallery jsonb not null default '[]'::jsonb;
