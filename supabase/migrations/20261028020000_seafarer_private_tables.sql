-- Step 2 of 2: close the seafarer tables to everyone but the owner and admins.
--
-- Run AFTER the code that reads seafarer_public / certificate_public /
-- sea_experience_public is deployed (see 20261028010000). From here on:
--   seafarers       own row ("Seafarers can view own record"), admins
--   certificates    own rows, admins
--   sea_experience  own rows, admins
-- Everyone else reads the *_public views, which carry only the public fields.

drop policy if exists "Public can view seafarers" on public.seafarers;
drop policy if exists "Public can view certificates" on public.certificates;
drop policy if exists "Public can view sea_experience" on public.sea_experience;

notify pgrst, 'reload schema';
