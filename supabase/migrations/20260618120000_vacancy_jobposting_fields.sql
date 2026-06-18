-- Structured-location + validity fields for richer JobPosting structured data
-- (Google for Jobs). These let companies provide the address parts and an
-- expiry date that Google's JobPosting schema recommends.
alter table public.vacancies
  add column if not exists country       text,   -- addressCountry (ISO-2 preferred, e.g. "UA")
  add column if not exists region         text,   -- addressRegion (state / oblast)
  add column if not exists city           text,   -- addressLocality
  add column if not exists postal_code    text,   -- postalCode
  add column if not exists valid_through  date;    -- JobPosting.validThrough (application deadline)
