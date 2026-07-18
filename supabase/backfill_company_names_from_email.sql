-- One-off backfill: set a company name from the crewing contact email domain
-- for imported vacancies whose company has no name yet.
--
-- The application already does this for NEW imports (lib/companyName.ts), but
-- vacancies added before that shipped keep an empty company name — e.g. the
-- "G-Crew" postings that came in from their email. This fills them in:
--   alfie.smart@selectoffshore.com  -> Selectoffshore
--   cv@ariesnav.com                 -> Ariesnav
--
-- Run once in the Supabase SQL editor. Safe to re-run (idempotent): it only
-- touches companies whose name is still empty or equal to the email.

with picked as (
  -- One representative email per company (the most recent vacancy that has one).
  select distinct on (company_id)
    company_id,
    lower(split_part(contact_email, '@', 2)) as domain,
    contact_email
  from public.vacancies
  where contact_email is not null
    and position('@' in contact_email) > 0
  order by company_id, created_at desc
)
update public.companies c
set name = initcap(split_part(p.domain, '.', 1)),   -- first domain label, capitalised
    updated_at = now()
from picked p
where c.id = p.company_id
  -- Skip free/public mailbox providers — they say nothing about the agency.
  and p.domain not in (
    'gmail.com','googlemail.com','yahoo.com','yahoo.co.uk','ymail.com',
    'hotmail.com','outlook.com','live.com','msn.com','icloud.com','me.com',
    'aol.com','gmx.com','gmx.net','proton.me','protonmail.com','pm.me',
    'mail.ru','inbox.ru','list.ru','bk.ru','internet.ru','yandex.ru',
    'yandex.com','ukr.net','i.ua','meta.ua','qq.com','163.com','126.com',
    'zoho.com','fastmail.com'
  )
  -- Only fill companies that have no usable name (null, blank, or just the email).
  and (
    c.name is null
    or btrim(c.name) = ''
    or lower(btrim(c.name)) = lower(p.contact_email)
  );
