-- Vacancies from crewing.portalmorski.pl (03.07.2026).
-- Both companies already exist from earlier imports, so each block reuses the
-- company via ILIKE and only inserts the new role (guarded by title). None are
-- repeats of an existing listing. Idempotent — safe to re-run.
-- Run this whole script once in the Supabase SQL Editor.

-- ── Wilhelmsen Marine Personnel — 2nd Engineer, LNG carrier ──────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Wilhelmsen Marine Personnel' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Wilhelmsen Marine Personnel', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — LNG Carrier (Avenir Achievement), Caribbean', '2nd Engineer', 'LNG Carrier', 17300, NULL, 'USD', '10 weeks', NULL,
'Wilhelmsen Marine Personnel is recruiting a 2nd Engineer for the LNG bunkering vessel Avenir Achievement (IMO 9886768, built 2022, main engine Sulzer) trading in the Caribbean Sea area. 10-week contract, joining ASAP (beginning of July 2026), 17,300 USD/month.

## Requirements
- minimum 24 months in rank
- valid STCW documentation
- good command of English
- good references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'WMP.PL.RECRUITING@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — LNG Carrier (Avenir Achievement), Caribbean');
END $$;

-- ── Crewplanet — 3rd Officer / Junior DPO, Walk-to-Work OSV ──────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Crewplanet' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Crewplanet', 'Riga, Latvia');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer / Junior DPO — Walk-to-Work OSV, North Sea', '3rd Officer', 'OSV', 205, NULL, 'EUR', '9 weeks', '2026-07-18',
'Crewplanet is recruiting a 3rd Officer JDPO for an esteemed Danish shipowner on a new project — a modern Walk-to-Work (W2W) OSV (built 1999, 8,395 GRT, main engine MAK 11,580 HP) trading the North Sea. Attractive daily salary of 205 EUR/day, 9-week contract, joining 18 July 2026. Entertainment facilities on board and a caring, supportive team.

## Requirements
- DP Full (Unlimited) certificate
- prior experience on W2W vessels
- good command of English, strong communication and teamwork
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@crewplanet.eu'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer / Junior DPO — Walk-to-Work OSV, North Sea');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB (Lasher) — RoRo / Con-Ro (Newbuilding), Italy', 'AB (Able Seaman)', 'RoRo Cargo', 3200, NULL, 'EUR', '3 months ± 1 month', NULL,
'Crewplanet is urgently recruiting an experienced AB-Lasher for a Ro-Ro / Ro-Lo / Con-Ro cargo vessel (new-built) trading Italy. Joining ASAP. Long-term rotation, 3-month (±1) contracts, 3,200 EUR/month plus a 200 EUR monthly performance bonus. Friendly, professional team.

## Requirements
- experience in rank and on a similar vessel type
- good command of English
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@crewplanet.eu'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB (Lasher) — RoRo / Con-Ro (Newbuilding), Italy');
END $$;
