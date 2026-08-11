-- Companies must be identifiable and reachable before their vacancies go live.
--
-- The company dashboard writes to `vacancies` straight from the browser, and it
-- did `companies.upsert({ id })` first purely to satisfy the foreign key — so an
-- account that never filled in its profile could publish a vacancy that showed
-- up on the board with no company name and no way to contact anyone.
--
-- A client-side check cannot enforce this (the browser holds the anon key and
-- can insert directly), and RLS is bypassed by the service-role client used for
-- imports, so the rule lives in a trigger: it applies to every writer.
--
-- Idempotent: safe to re-run.

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

  -- Reachable either through the company profile or through the vacancy's own
  -- crewing contact (that is how imported agency postings carry their address).
  if coalesce(array_length(array_remove(c_emails, ''), 1), 0) = 0
     and coalesce(array_length(array_remove(c_phones, ''), 1), 0) = 0
     and coalesce(btrim(new.contact_email), '') = ''
     and coalesce(btrim(new.contact_phone), '') = ''
  then
    raise exception 'company_contact_required'
      using hint = 'Add an email or phone number in the company profile before publishing a vacancy.';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_vacancy_requires_company_details on public.vacancies;

create trigger trg_vacancy_requires_company_details
  before insert or update on public.vacancies
  for each row
  execute function public.vacancy_requires_company_details();

-- ── Before/after check ───────────────────────────────────────────────────────
-- Existing active vacancies are NOT touched by this migration — the trigger
-- only fires on the next insert or update of a row. Run this to see which live
-- postings would now be blocked from being edited or re-activated, so their
-- companies can be asked to fill in the missing details:
--
-- select c.id, c.name, count(v.id) as active_vacancies,
--        (c.name is null or btrim(c.name) = '') as missing_name
--   from public.companies c
--   join public.vacancies v on v.company_id = c.id and v.is_active
--  where (c.name is null or btrim(c.name) = '')
--     or (coalesce(array_length(array_remove(c.emails, ''), 1), 0) = 0
--         and coalesce(array_length(array_remove(c.phones, ''), 1), 0) = 0
--         and coalesce(btrim(v.contact_email), '') = ''
--         and coalesce(btrim(v.contact_phone), '') = '')
--  group by c.id, c.name
--  order by active_vacancies desc;
