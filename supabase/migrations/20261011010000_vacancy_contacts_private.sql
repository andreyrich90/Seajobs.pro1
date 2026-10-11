-- The crewing agency's contacts are no longer readable through the public API.
--
-- Since 20261011000000 the vacancy page shows a crewing agency's e-mail and
-- phone only to a seafarer whose profile names a person and a rank. The
-- table itself was still readable with the anon key, contact_email included,
-- so anyone could pull every address with one request. Row-level security
-- cannot hide a column, so this closes it with column privileges:
-- anon and authenticated may read every vacancy column except
--   contact_email, contact_phone, source_url (the agency's own post).
--
-- The service role (every API route and server page) is untouched. Browsers get
-- the contacts from api/vacancy-contact (seafarers with a complete profile) and
-- api/admin/vacancy-contacts (admins).
--
-- A column added to vacancies later is NOT readable from the browser until it
-- is granted here too; see lib/vacancyColumns.ts. Insert, update and delete
-- privileges are unchanged. Idempotent.

revoke select on public.vacancies from anon, authenticated;
revoke select (contact_email, contact_phone, source_url) on public.vacancies from anon, authenticated;

grant select (
  id, company_id, title, rank, vessel_type,
  salary_from, salary_to, salary_period, currency,
  contract_duration, joining_date, description,
  is_active, is_imported,
  country, region, city, postal_code, valid_through,
  views_count, created_at, updated_at, featured_until, telegram_message_id
) on public.vacancies to anon, authenticated;

notify pgrst, 'reload schema';
