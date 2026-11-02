-- Some agencies take applications only through their own careers site: the
-- posting carries a link to a form or a profile to fill in, and no e-mail.
-- vacancies.apply_url holds that link. A vacancy with one sends readers to the
-- company's page instead of offering to apply through SeaJobs.pro.
--
-- Unlike contact_email and contact_phone (20261011010000_vacancy_contacts_private
-- .sql), the link is public: it is the agency's own public form, and the
-- vacancy page shows it to every reader. The grant is per column, so it has
-- to be given here (lib/vacancyColumns.ts).
--
-- The publish rule (vacancy_requires_company_details) wanted an e-mail or a
-- phone, on the vacancy or the company. A careers link is a way to reach the
-- agency too, so it now counts.
--
-- Run BEFORE merging the code that reads the column.

alter table public.vacancies add column if not exists apply_url text;

grant select (apply_url) on public.vacancies to anon, authenticated;

create or replace function public.vacancy_requires_company_details()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  c_name    text;
  c_emails  text[];
  c_phones  text[];
begin
  -- Drafts are fine; the rule is about what becomes publicly visible.
  if new.is_active is not true then
    return new;
  end if;

  select name, emails, phones
    into c_name, c_emails, c_phones
    from public.companies
   where id = new.company_id;

  if c_name is null or btrim(c_name) = '' then
    raise exception 'company_name_required'
      using hint = 'Add your company name in the company profile before publishing a vacancy.';
  end if;

  -- Reachable through the company profile, through the vacancy's own crewing
  -- contact, or through the agency's careers link.
  if coalesce(array_length(array_remove(c_emails, ''), 1), 0) = 0
     and coalesce(array_length(array_remove(c_phones, ''), 1), 0) = 0
     and coalesce(btrim(new.contact_email), '') = ''
     and coalesce(btrim(new.contact_phone), '') = ''
     and coalesce(btrim(new.apply_url), '') = ''
  then
    raise exception 'company_contact_required'
      using hint = 'Add an email or phone number in the company profile before publishing a vacancy.';
  end if;

  return new;
end;
$$;

revoke execute on function public.vacancy_requires_company_details() from public, anon, authenticated;

notify pgrst, 'reload schema';
