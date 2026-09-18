-- Let the seafarer attach their CV to a CV-distribution request.
--
-- Without it the request is a name and an email, and the actual work — reading
-- the CV, checking it is complete, mailing it — cannot start until someone asks
-- for the file by hand. With it the request arrives ready to act on.
--
-- The bucket is PRIVATE and has no policies at all. That is deliberate: a
-- seafarer's CV carries a passport number, visas and a date of birth, which is
-- the same reason `cv_share_tokens` exists rather than a public link. Only the
-- service role touches this bucket — it bypasses RLS — so the API route stays
-- the single writer, the way `20260902010000_service_requests_api_only.sql` made
-- it the single writer of the table. Admins read a file through a short-lived
-- signed URL minted server-side, never a public one.
--
-- Idempotent: safe to re-run.

alter table service_requests add column if not exists cv_path text;
alter table service_requests add column if not exists cv_name text;
alter table service_requests add column if not exists cv_size integer;

comment on column service_requests.cv_path is
  'Object path inside the private "service-cv" bucket. Read via a signed URL only.';

insert into storage.buckets (id, name, public)
values ('service-cv', 'service-cv', false)
on conflict (id) do update set public = false;

-- No storage policies on purpose. Anything that could read this bucket with the
-- anon or authenticated key would be a way to fish CVs out of it.
drop policy if exists "service_cv_read" on storage.objects;
drop policy if exists "service_cv_insert" on storage.objects;

notify pgrst, 'reload schema';
