-- Company logos storage bucket + RLS policies.
--
-- The company profile page uploads to bucket "logos" at path
-- "<auth.uid>/logo.<ext>" (see app/[locale]/company/profile/page.tsx).
-- Without these policies Supabase rejects the upload with:
--   "new row violates row-level security policy".
--
-- Run this once in the Supabase SQL editor.

-- 1) Create the bucket (public so getPublicUrl() can be displayed).
insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do update set public = true;

-- 2) Policies on storage.objects, scoped to the "logos" bucket.
--    Each authenticated user may write only inside their own "<uid>/" folder.

-- Anyone can read logos (public display on company cards / vacancies).
drop policy if exists "logos_public_read" on storage.objects;
create policy "logos_public_read"
  on storage.objects for select
  using (bucket_id = 'logos');

-- Authenticated user can upload into their own folder.
drop policy if exists "logos_insert_own" on storage.objects;
create policy "logos_insert_own"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Authenticated user can overwrite (upsert) their own logo.
drop policy if exists "logos_update_own" on storage.objects;
create policy "logos_update_own"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Authenticated user can delete their own logo.
drop policy if exists "logos_delete_own" on storage.objects;
create policy "logos_delete_own"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
