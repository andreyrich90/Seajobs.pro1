-- Step 1 of 2: what other people may read about a seafarer.
--
-- Until now every signed-in user could read every visible seafarer's whole
-- row over REST: passport number, phone, date of birth, visas, medical,
-- certificate numbers and scans. Row-level security cannot hide a column, so
-- the split is by object instead:
--
--   seafarers, certificates, sea_experience  the owner and an admin only
--                                            (step 2 drops the open policies)
--   seafarer_public, certificate_public,     what anyone may see: the fields
--   sea_experience_public                    the public profile and the
--                                            companies' search show, and only
--                                            for seafarers who are not hidden
--                                            or who chose this company
--
-- The views run with their owner's rights and carry the visibility rule in
-- their own WHERE, the same rule as 20261028000000 (seafarer_visible_to_caller).
-- Server routes use the service role and are not affected.
--
-- This step changes nothing for the old code: the open policies stay until
-- step 2 (20261028020000), which is run after the code that reads these views
-- is deployed.

create or replace view public.seafarer_public as
  select s.id, s.first_name, s.last_name, s.photo_url, s.nationality, s.rank,
         s.readiness_date, s.about, s.updated_at, s.boost_until
  from public.seafarers s
  where not s.is_hidden
     or s.id = auth.uid()
     or public.is_admin()
     or public.seafarer_visible_to_caller(s.id);

create or replace view public.certificate_public as
  select c.id, c.seafarer_id, c.name, c.issuing_authority, c.issue_date, c.expiry_date
  from public.certificates c
  where exists (select 1 from public.seafarer_public s where s.id = c.seafarer_id);

create or replace view public.sea_experience_public as
  select e.id, e.seafarer_id, e.vessel_name, e.vessel_type, e.rank, e.company, e.flag,
         e.from_date, e.to_date, e.dwt, e.engine
  from public.sea_experience e
  where exists (select 1 from public.seafarer_public s where s.id = e.seafarer_id);

revoke all on public.seafarer_public, public.certificate_public, public.sea_experience_public from public;
grant select on public.seafarer_public, public.certificate_public, public.sea_experience_public to anon, authenticated;

-- Admins keep reading the full rows of certificates and sea service once the
-- open policies are gone (seafarers already has its admin policy).
drop policy if exists "Admins can view all certificates" on public.certificates;
create policy "Admins can view all certificates" on public.certificates
  for select using (public.is_admin());

drop policy if exists "Admins can view all sea_experience" on public.sea_experience;
create policy "Admins can view all sea_experience" on public.sea_experience
  for select using (public.is_admin());

notify pgrst, 'reload schema';
