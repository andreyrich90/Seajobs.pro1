-- Crewing agencies whose vacancies are on the board but who have no account.
--
-- The screenshot importer creates a `companies` row with a fresh UUID and no
-- auth user, so these agencies never appear under Users in the admin panel.
-- Their contact address lives on the vacancy (`vacancies.contact_email`) —
-- that is the crewing e-mail applications are forwarded to.
--
-- `already_emailed` cross-checks outreach_log, so a batch can skip anyone who
-- has already had the invite.
--
-- Read-only. Run in the Supabase SQL Editor.

select
  c.name                                     as company,
  lower(btrim(v.contact_email))              as email,
  count(*) filter (where v.is_active)        as active_vacancies,
  count(*)                                   as total_vacancies,
  max(v.created_at)::date                    as last_posting,
  (o.email is not null)                      as already_emailed
from public.companies c
join public.vacancies v
  on v.company_id = c.id
left join public.profiles p
  on p.id = c.id and p.role = 'company'      -- an account for this company
left join public.outreach_log o
  on o.email = lower(btrim(v.contact_email))
where p.id is null                           -- ← nobody can log in as this company
  and coalesce(btrim(v.contact_email), '') <> ''
group by c.name, lower(btrim(v.contact_email)), o.email
order by active_vacancies desc, total_vacancies desc, company;


-- ── Same set, as one comma-separated line to paste into a mailer ────────────
-- Only agencies that still have live vacancies and have NOT been contacted yet.
--
-- select string_agg(distinct lower(btrim(v.contact_email)), ', ' order by lower(btrim(v.contact_email)))
--   from public.companies c
--   join public.vacancies v on v.company_id = c.id and v.is_active
--   left join public.profiles p on p.id = c.id and p.role = 'company'
--   left join public.outreach_log o on o.email = lower(btrim(v.contact_email))
--  where p.id is null
--    and o.email is null
--    and coalesce(btrim(v.contact_email), '') <> '';


-- ── How many agencies have no address at all ────────────────────────────────
-- These cannot be contacted and cannot receive applications either — worth
-- knowing the size of the hole.
--
-- select count(*) as agencies_without_any_email from (
--   select c.id
--     from public.companies c
--     join public.vacancies v on v.company_id = c.id
--     left join public.profiles p on p.id = c.id and p.role = 'company'
--    where p.id is null
--    group by c.id
--   having count(*) filter (where coalesce(btrim(v.contact_email), '') <> '') = 0
-- ) t;
