-- The sea-service record is now required only for applications that go
-- through the portal (vacancies a crewing company posted from its own
-- account), where the company receives a CV built from the profile.
--
-- An imported vacancy (is_imported = true) is answered from the seafarer's
-- own mailbox, and since 12 November 2026 that letter carries the seafarer's
-- own CV file instead of a link to ours. Their sea service is in that file, so
-- the voyage rule only stood in the way. The four profile fields (first name,
-- last name, phone, rank) still apply to both routes.
--
-- The 'PROFILE_INCOMPLETE' prefix is matched by the job page. Idempotent.
-- ASCII only.

create or replace function public.enforce_profile_complete_on_apply()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  s record;
  mailbox boolean;
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

  select coalesce(v.is_imported, false) into mailbox
  from vacancies v where v.id = new.vacancy_id;

  if not coalesce(mailbox, false) and not exists (
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
