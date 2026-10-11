-- Applying now also requires a name and a rank, not only a phone and a voyage.
--
-- Many recent sign-ups are an e-mail address and nothing else, and a crewing
-- agency that receives an application from one learns nothing about who wrote
-- it. The vacancy page now keeps the agency's contacts and the apply button
-- behind the same four fields (lib/profileGate.ts): first name, last name,
-- phone, rank. This trigger is the part that cannot be bypassed from the
-- browser. The sea-service rule from 20260705120000 stays as it was.
--
-- The 'PROFILE_INCOMPLETE' prefix is matched by the job page. Idempotent.

create or replace function public.enforce_profile_complete_on_apply()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  s record;
begin
  select first_name, last_name, phone, rank into s
  from seafarers where id = new.seafarer_id;

  if not found
     or coalesce(trim(s.first_name), '') = ''
     or coalesce(trim(s.last_name), '') = ''
     or coalesce(trim(s.phone), '') = ''
     or coalesce(trim(s.rank), '') = '' then
    raise exception 'PROFILE_INCOMPLETE: add your first name, last name, phone number and rank to your profile before applying';
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
