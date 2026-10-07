-- Merge duplicate sea-service rows that are already on file.
--
-- Uploading a CV twice used to store the same contract twice, because the
-- import only skipped a voyage whose every field was read identically. The
-- app now applies `sameVoyage` (lib/voyages.ts) on import and sweeps a
-- seafarer's rows whenever their CV screens open; this does the same once for
-- everyone, so profiles nobody opens again are clean too.
--
-- The rule, mirrored from lib/voyages.ts: same seafarer, same ship once the
-- type prefix (M/V, MT, …) and punctuation are stripped, and either the starts
-- are within 31 days, or the contracts overlap by more than 15 days (an empty
-- end is a contract still running), or neither has a start and the ends match.
-- Of each pair the most complete row stays, its empty fields are filled from
-- the other, and the other is deleted. Idempotent: a second run finds nothing.

create or replace function pg_temp.vessel_key(n text) returns text language sql immutable as $$
  select regexp_replace(
    lower(regexp_replace(trim(coalesce(n, '')), '^(m\s*[/.]?\s*[vts]|s\s*[/.]?\s*s|mts|lng\s*c|lpg\s*c)\.?\s+', '', 'i')),
    '[^[:alnum:]]+', '', 'g')
$$;

create or replace function pg_temp.filled(e sea_experience) returns int language sql immutable as $$
  select (e.vessel_type is not null and e.vessel_type <> '')::int + (e.rank is not null and e.rank <> '')::int
       + (e.company is not null and e.company <> '')::int + (e.flag is not null and e.flag <> '')::int
       + (e.imo_number is not null and e.imo_number <> '')::int + (e.dwt is not null and e.dwt <> '')::int
       + (e.engine is not null and e.engine <> '')::int
       + (e.from_date is not null)::int + (e.to_date is not null)::int
$$;

drop table if exists voyage_dupes;
create temp table voyage_dupes as
with ranked as (
  select e.*, pg_temp.vessel_key(e.vessel_name) as vk,
         row_number() over (partition by e.seafarer_id order by pg_temp.filled(e) desc, e.created_at, e.id) as rk
  from sea_experience e
)
-- `dup` is a copy of `keep`, and `keep` ranks above it.
select k.id as keep_id, d.id as dup_id
from ranked k
join ranked d on d.seafarer_id = k.seafarer_id and d.vk = k.vk and d.vk <> '' and d.rk > k.rk
where (k.from_date is not null and d.from_date is not null and (
         abs(k.from_date - d.from_date) <= 31
         or least(coalesce(k.to_date, current_date), coalesce(d.to_date, current_date))
            - greatest(k.from_date, d.from_date) > 15))
   or (k.from_date is null and d.from_date is null and k.to_date is not distinct from d.to_date);

-- A row that is itself someone's duplicate is not a keeper.
delete from voyage_dupes v where exists (select 1 from voyage_dupes x where x.dup_id = v.keep_id);

update sea_experience k set
  vessel_type = coalesce(nullif(k.vessel_type, ''), (select nullif(d.vessel_type, '') from voyage_dupes v join sea_experience d on d.id = v.dup_id where v.keep_id = k.id and nullif(d.vessel_type, '') is not null limit 1)),
  rank        = coalesce(nullif(k.rank, ''),        (select nullif(d.rank, '')        from voyage_dupes v join sea_experience d on d.id = v.dup_id where v.keep_id = k.id and nullif(d.rank, '') is not null limit 1)),
  company     = coalesce(nullif(k.company, ''),     (select nullif(d.company, '')     from voyage_dupes v join sea_experience d on d.id = v.dup_id where v.keep_id = k.id and nullif(d.company, '') is not null limit 1)),
  flag        = coalesce(nullif(k.flag, ''),        (select nullif(d.flag, '')        from voyage_dupes v join sea_experience d on d.id = v.dup_id where v.keep_id = k.id and nullif(d.flag, '') is not null limit 1)),
  imo_number  = coalesce(nullif(k.imo_number, ''),  (select nullif(d.imo_number, '')  from voyage_dupes v join sea_experience d on d.id = v.dup_id where v.keep_id = k.id and nullif(d.imo_number, '') is not null limit 1)),
  dwt         = coalesce(nullif(k.dwt, ''),         (select nullif(d.dwt, '')         from voyage_dupes v join sea_experience d on d.id = v.dup_id where v.keep_id = k.id and nullif(d.dwt, '') is not null limit 1)),
  engine      = coalesce(nullif(k.engine, ''),      (select nullif(d.engine, '')      from voyage_dupes v join sea_experience d on d.id = v.dup_id where v.keep_id = k.id and nullif(d.engine, '') is not null limit 1))
where k.id in (select keep_id from voyage_dupes);

delete from sea_experience where id in (select dup_id from voyage_dupes);

drop table voyage_dupes;
