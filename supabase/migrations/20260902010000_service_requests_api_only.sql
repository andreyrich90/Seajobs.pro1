-- Close the anonymous insert on `service_requests`.
--
-- The requests now arrive through /api/service-request, which reads the package
-- name and price from the catalogue in lib/cvBlast.ts rather than trusting the
-- body. Leaving the open insert policy in place would keep a second door where
-- anyone holding the anon key could write any package at any price — and those
-- numbers are the only thing the page exists to measure.
--
-- The API route uses the service role, which bypasses RLS, so it is unaffected.
-- Admins keep full access through the policy added with the table.
--
-- Idempotent: safe to re-run.

drop policy if exists "Anyone can request a service" on service_requests;

notify pgrst, 'reload schema';
