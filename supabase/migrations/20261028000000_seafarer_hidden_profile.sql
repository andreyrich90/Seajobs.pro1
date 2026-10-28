-- A seafarer can hide their profile from crewing companies while keeping the
-- account active (the "hide my profile" switch on /seafarer/profile).
--
-- Hidden means: not in the companies' seafarer search, no public profile page,
-- and the certificates and sea service behind it are not readable either.
-- Who still sees a hidden seafarer:
--   - the seafarer;
--   - an admin;
--   - a company the seafarer applied to, or is already talking to: applying is
--     the seafarer's own choice to be seen by that company.
-- Server routes run with the service role and are not affected.
--
-- The rule lives in row-level security, not in the pages, so the REST API
-- answers the same way the site does.

alter table public.seafarers
  add column if not exists is_hidden boolean not null default false;

-- Does the signed-in caller have a reason to see this seafarer although they
-- hid their profile? SECURITY DEFINER so the check reads applications and
-- conversations whatever their own policies, and so the policy below does not
-- recurse through them.
create or replace function public.seafarer_visible_to_caller(sid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null and (
    exists (
      select 1 from public.applications a
      join public.vacancies v on v.id = a.vacancy_id
      where a.seafarer_id = sid and v.company_id = auth.uid()
    )
    or exists (
      select 1 from public.conversations c
      where c.seafarer_id = sid and c.company_id = auth.uid()
    )
  );
$$;

revoke all on function public.seafarer_visible_to_caller(uuid) from public;
grant execute on function public.seafarer_visible_to_caller(uuid) to anon, authenticated;

drop policy if exists "Public can view seafarers" on public.seafarers;
create policy "Public can view seafarers" on public.seafarers
  for select using (
    not is_hidden
    or public.seafarer_visible_to_caller(id)
  );

-- Certificates and sea service follow their seafarer: readable to others only
-- while the seafarer row itself is. The subquery runs under the caller's own
-- policies, so a hidden seafarer's rows disappear with them.
drop policy if exists "Public can view certificates" on public.certificates;
create policy "Public can view certificates" on public.certificates
  for select using (exists (select 1 from public.seafarers s where s.id = certificates.seafarer_id));

drop policy if exists "Public can view sea_experience" on public.sea_experience;
create policy "Public can view sea_experience" on public.sea_experience
  for select using (exists (select 1 from public.seafarers s where s.id = sea_experience.seafarer_id));

-- A referral link must keep working for a seafarer who hid their profile, so
-- the code is resolved here rather than by reading the seafarers table.
create or replace function public.referrer_by_code(code text)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from (
    select id from public.seafarers where referral_code = upper(trim(code))
    union all
    select id from public.companies where referral_code = upper(trim(code))
  ) r
  limit 1;
$$;

revoke all on function public.referrer_by_code(text) from public;
grant execute on function public.referrer_by_code(text) to authenticated;

notify pgrst, 'reload schema';
