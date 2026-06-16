-- Extra fields for a complete maritime CV (documents, education, languages,
-- competencies, and per-voyage DWT / engine).

alter table public.seafarers
  add column if not exists seamans_book   text,
  add column if not exists passport_no    text,
  add column if not exists passport_expiry date,
  add column if not exists us_visa        text,
  add column if not exists schengen_visa  text,
  add column if not exists education      text,
  add column if not exists languages      text,
  add column if not exists competencies   text;

alter table public.sea_experience
  add column if not exists dwt    text,
  add column if not exists engine text;
