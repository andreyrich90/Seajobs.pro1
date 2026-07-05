-- Applying to a vacancy requires a complete profile: a contact phone number and
-- at least one sea-service record. The crewing agency receives the seafarer's
-- contacts and CV with every application, so an empty CV must not be sendable.
-- Enforced with a trigger (not just client UX) so it cannot be bypassed.
-- The 'PROFILE_INCOMPLETE' prefix is matched by the job page to show a friendly
-- message. Idempotent — safe to re-run.

create or replace function public.enforce_profile_complete_on_apply()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from seafarers s
    where s.id = new.seafarer_id and coalesce(trim(s.phone), '') <> ''
  ) then
    raise exception 'PROFILE_INCOMPLETE: add a contact phone number to your profile before applying';
  end if;

  if not exists (
    select 1 from sea_experience se where se.seafarer_id = new.seafarer_id
  ) then
    raise exception 'PROFILE_INCOMPLETE: add at least one sea service record before applying';
  end if;

  return new;
end;
$$;

drop trigger if exists applications_profile_complete on public.applications;
create trigger applications_profile_complete
  before insert on public.applications
  for each row execute function public.enforce_profile_complete_on_apply();
