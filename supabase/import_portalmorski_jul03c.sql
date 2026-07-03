-- Vacancies from crewing.portalmorski.pl (03.07.2026, batch C).
-- Recurring vacancies already on the board are REFRESHED (date bumped,
-- reactivated); genuinely new vacancies are inserted (guarded by title).
-- Idempotent — safe to re-run. Run this whole script once in the Supabase SQL Editor.

-- ── Refresh recurring vacancies (bump date so they show as fresh) ────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
  WHERE title = 'Chief Engineer — PSV (Horn Island, DP2), Guyana';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
  WHERE title = 'Chief Officer — Car Carrier PCTC (Cygnus / Prometheus / Leo Leader), Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
  WHERE title = '2nd Officer (DPO Unlimited) — PSV, West Africa';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 8000, salary_to = 8500, currency = 'EUR', joining_date = '2026-08-20'
  WHERE title = 'Chief Engineer (Single) — General Cargo Coaster, Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, joining_date = '2026-07-20'
  WHERE title = 'Master — Bulk Carrier (18,825 GT), Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 6000, currency = 'EUR'
  WHERE title = 'Excavator Operator / OS — General Cargo, Europe';

-- ── M.R.T. Shipping Limited (new company) — Chief Engineer, AHTS / Tug ───────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'M.R.T. Shipping Limited' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'M.R.T. Shipping Limited', 'Birzebbuga, Malta');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — AHTS / Tug (CAT 3516), Europe / Baltic', 'Chief Engineer', 'AHTS', 7500, NULL, 'EUR', '60 days ± 30', '2026-07-25',
'M.R.T. Shipping Limited is recruiting a Chief Engineer for AHTS, tug or offshore support vessels trading Europe and the Baltic Sea. 60-day (± 30) contract, joining 20-30 July 2026, 7,500 EUR/month.

## Requirements
- minimum 12 months as Chief Engineer
- good knowledge of CAT 3516 engines
- maintenance planning and overhaul experience
- experience preparing repair specifications
- knowledge of generators, switchboards and automation systems
- good English communication skills

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@mrt.com.mt'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — AHTS / Tug (CAT 3516), Europe / Baltic');
END $$;

-- ── C P Marine UK Ltd (new company) — OOW, General Cargo ─────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'C P Marine UK Ltd' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'C P Marine UK Ltd', 'Hull, United Kingdom');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'OOW (Officer of the Watch) — General Cargo, Mediterranean', 'OOW (Officer of the Watch)', 'General Cargo', 5500, NULL, 'EUR', 'about 8 weeks', NULL,
'C P Marine UK Ltd is recruiting an Officer of the Watch (OOW) for a general cargo vessel trading the Mediterranean. About 8-week contract, joining soonest, 5,500 EUR/month.

## Requirements
- valid OOW Certificate of Competency and STCW documentation
- general cargo experience welcome

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info@cpmarineuk.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'OOW (Officer of the Watch) — General Cargo, Mediterranean');
END $$;

-- ── Novprofmar Sp. z o.o. (new company) — three roles ────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Novprofmar' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Novprofmar', 'Gdansk, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer / 3rd Engineer — Offshore, Europe', '2nd Engineer', 'Offshore Vessel (other)', 195, NULL, 'EUR', 'temporary, option for permanent', '2026-07-04',
'Novprofmar is recruiting a 2nd Engineer and a 3rd Engineer / Technician. 2nd Engineer joining 10 July or earlier (valid STCW III/3 CoC, Chief Engineer III/2 certificate preferred). 3rd Engineer / Technician joining 4 July (valid engineering certificate, CoC III/1 or higher preferred). 195 EUR/day. Initially a temporary assignment with the opportunity of long-term / permanent employment for the right candidate.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'employment@novprofmar.org'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer / 3rd Engineer — Offshore, Europe');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Multicat (Multrasalvor 6, Fehmarnbelt Tunnel), Denmark', 'Chief Officer (Chief Mate)', 'Multicat', 250, NULL, 'EUR', 'approx 2 weeks', '2026-08-05',
'Novprofmar is recruiting an experienced Chief Officer for the vessel Multrasalvor 6, working on the Fehmarnbelt Tunnel project under Dutch flag. Contract period 05.08.2026 - 19.08.2026, 250 EUR/day.

## Requirements
- experience in rank on similar vessels
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'employment@novprofmar.org'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Multicat (Multrasalvor 6, Fehmarnbelt Tunnel), Denmark');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Master — Survey Vessel, Italy', 'Master', 'Survey Vessel', 370, NULL, 'EUR', 'daytime operations', NULL,
'Novprofmar is urgently recruiting an experienced Master for a small survey vessel currently operating in Italy. Joining as soon as possible (ideally next week), 370 EUR/day. Working conditions: daytime operations only, approximately 10-12 working hours per day, overnight accommodation provided in a hotel, daily allowance included; some self-supporting duties may be required.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'employment@novprofmar.org'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Master — Survey Vessel, Italy');
END $$;
