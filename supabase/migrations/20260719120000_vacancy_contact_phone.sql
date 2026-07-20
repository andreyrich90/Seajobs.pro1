-- Store a direct contact phone for imported/scraped vacancies, when the source
-- ad lists one. Shown on the vacancy page so seafarers can reach the crewing
-- directly (the email stays server-side for CV forwarding). Idempotent.

alter table public.vacancies
  add column if not exists contact_phone text;
