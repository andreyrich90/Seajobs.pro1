-- Two clean-ups from the Supabase advisor. Neither changes who may read or
-- write what.
--
-- 1. Policies call auth.uid() and is_admin() once per query, not once per row
--    (lint 0003 auth_rls_initplan). Written as `(select auth.uid())` the call
--    becomes an init plan: Postgres evaluates it once and reuses the value.
--    The result is identical, only cheaper on large reads.
--
--    Every policy in `public` is rewritten in place with ALTER POLICY, so its
--    name, command and roles stay as they are. Calls already wrapped are left
--    alone, which makes this safe to run twice. Deparsed policy text shows a
--    wrapped call as `( SELECT auth.uid() AS uid)`; those are parked under a
--    placeholder while the bare calls are wrapped, then put back.
--
-- 2. Function hygiene.
--    - search_path pinned on the six functions that had none (lint 0011). All
--      of them use only `public` and built-ins.
--    - Trigger functions are not meant to be called over REST; EXECUTE on them
--      is only checked when a trigger is created, so revoking it from the API
--      roles changes nothing for the triggers (lints 0028/0029).
--    - referrer_by_code and filter_admin_ids are only called by signed-in
--      users, so `anon` loses EXECUTE on them.
--    is_admin, seafarer_visible_to_caller and increment_vacancy_views stay as
--    they are: policies, the public views and the anonymous view counter
--    call them on behalf of whoever is reading.

do $$
declare
  p record;
  q text;
  c text;
  n int := 0;
begin
  for p in
    select schemaname, tablename, policyname, qual, with_check
    from pg_policies
    where schemaname = 'public'
      and coalesce(qual, '') || coalesce(with_check, '') ~ '(auth\.uid\(\)|is_admin\(\))'
  loop
    q := p.qual;
    c := p.with_check;

    q := replace(q, 'SELECT auth.uid() AS uid', '@@UID@@');
    q := replace(q, 'SELECT is_admin() AS is_admin', '@@ADM@@');
    q := replace(q, 'SELECT public.is_admin() AS is_admin', '@@ADM@@');
    q := replace(q, 'public.is_admin()', 'is_admin()');
    q := replace(q, 'auth.uid()', '(select auth.uid())');
    q := replace(q, 'is_admin()', '(select public.is_admin())');
    q := replace(q, '@@UID@@', 'select auth.uid()');
    q := replace(q, '@@ADM@@', 'select public.is_admin()');

    c := replace(c, 'SELECT auth.uid() AS uid', '@@UID@@');
    c := replace(c, 'SELECT is_admin() AS is_admin', '@@ADM@@');
    c := replace(c, 'SELECT public.is_admin() AS is_admin', '@@ADM@@');
    c := replace(c, 'public.is_admin()', 'is_admin()');
    c := replace(c, 'auth.uid()', '(select auth.uid())');
    c := replace(c, 'is_admin()', '(select public.is_admin())');
    c := replace(c, '@@UID@@', 'select auth.uid()');
    c := replace(c, '@@ADM@@', 'select public.is_admin()');

    if q is distinct from p.qual and q is not null then
      execute format('alter policy %I on %I.%I using (%s)', p.policyname, p.schemaname, p.tablename, q);
    end if;
    if c is distinct from p.with_check and c is not null then
      execute format('alter policy %I on %I.%I with check (%s)', p.policyname, p.schemaname, p.tablename, c);
    end if;
    n := n + 1;
  end loop;
  raise notice 'policies checked: %', n;
end $$;

alter function public.generate_referral_code() set search_path = public;
alter function public.set_referral_code() set search_path = public;
alter function public.set_company_referral_code() set search_path = public;
alter function public.update_updated_at() set search_path = public;
alter function public.update_updated_at_column() set search_path = public;
alter function public.tidy_vacancy_title() set search_path = public;

revoke execute on function public.enforce_profile_complete_on_apply() from public, anon, authenticated;
revoke execute on function public.handle_referral_completion() from public, anon, authenticated;
revoke execute on function public.vacancy_requires_company_details() from public, anon, authenticated;

revoke execute on function public.referrer_by_code(text) from public, anon;
grant execute on function public.referrer_by_code(text) to authenticated;
revoke execute on function public.filter_admin_ids(uuid[]) from public, anon;
grant execute on function public.filter_admin_ids(uuid[]) to authenticated;

notify pgrst, 'reload schema';
