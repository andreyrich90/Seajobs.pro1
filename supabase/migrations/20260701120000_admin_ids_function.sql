-- ============================================================================
-- Let the Messages UI label admin (SeaJobs staff) participants as "SeaJobs Team".
-- ============================================================================
-- profiles RLS hides other users' rows, so a seafarer/company cannot read
-- another account's is_admin flag directly. This SECURITY DEFINER function
-- returns ONLY the admin ids among the ones asked about — no other profile
-- data is exposed — so the client can relabel admin chat participants.
--
-- Idempotent. Run once in the Supabase SQL editor.
-- ============================================================================

create or replace function public.filter_admin_ids(ids uuid[])
returns uuid[]
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(array_agg(id), '{}')::uuid[]
  from profiles
  where id = any(ids) and is_admin = true;
$$;

grant execute on function public.filter_admin_ids(uuid[]) to authenticated, anon;

notify pgrst, 'reload schema';
