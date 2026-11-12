-- An imported vacancy (Telegram collector, screenshot import) is answered only
-- from the seafarer's own mailbox, or on the agency's careers site when it
-- gives a link instead of an e-mail. A phone number alone leaves the seafarer
-- no way to apply, so such a vacancy is no longer published: it needs an
-- e-mail (contact_email) or an apply link (apply_url) on the vacancy itself.
--
-- Vacancies a company posts from its own account are unchanged: applications
-- reach its cabinet, and the company profile still needs a name and an e-mail
-- or phone, as before.
--
-- The rule fires on insert and on update of a visible row, like the old one,
-- so it applies to every new import and every re-publish. Active imported
-- rows without either were switched off by hand on 12 November 2026.
--
-- Idempotent and ASCII only. Run before merging the code that expects it.

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

  -- Imported: the seafarer applies by e-mail or on the agency's own site.
  if new.is_imported is true then
    if coalesce(btrim(new.contact_email), '') = ''
       and coalesce(btrim(new.apply_url), '') = ''
    then
      raise exception 'vacancy_apply_route_required'
        using hint = 'An imported vacancy needs a crewing e-mail or an apply link; a phone number alone is not enough.';
    end if;
    return new;
  end if;

  -- Posted by a company: reachable through its profile or the vacancy itself.
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
