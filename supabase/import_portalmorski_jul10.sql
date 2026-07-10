-- Vacancies from crewing.portalmorski.pl (10.07.2026).
-- Recurring vacancies already on the board are REFRESHED; genuinely new
-- vacancies are inserted (guarded by title). Fuller descriptions.
-- Idempotent — safe to re-run. Run once in the Supabase SQL Editor.

-- ── Refresh recurring vacancies ─────────────────────────────────────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 8950, currency = 'EUR', joining_date = '2026-07-20'
  WHERE title = 'Master — Bulk Carrier (18,825 GT), Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 5200, currency = 'EUR', joining_date = '2026-08-15'
  WHERE title = 'Chief Officer — General Cargo Coaster (Newbuilding), Worldwide';

-- ── Dohle Marine Services Europe — 3rd Officer, Container (MV Panda 001) ─────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Dohle Marine Services Europe' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Dohle Marine Services Europe', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer — Container Ship (MV Panda 001), Worldwide', '3rd Officer', 'Container Ship', 3780, NULL, 'USD', '4 months', '2026-07-25',
'Dohle Marine Services Europe is recruiting a 3rd Officer for the large container ship MV Panda 001 (ex Tailwind Panda 001) trading worldwide — China, Malaysia, Spain and Slovenia. This is a big post-panamax box ship, giving a junior officer solid ocean-going navigation and cargo-watch experience. 4-month contract, joining 25 July 2026, 3,780 USD/month.

## Vessel particulars
- Type: container ship
- IMO: 9290787, Germany flag, built 2005
- GRT / DWT: 66,280 / 71,655
- Main engine: Sulzer 10RTA96C-B, 54,926 kW
- Sailing area: worldwide (China, Malaysia, Spain, Slovenia)

## Requirements
- valid Certificate of Competency for 3rd Officer / OOW
- full STCW documentation
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer — Container Ship (MV Panda 001), Worldwide');
END $$;

-- ── KGA - Krzysztof Grono Agency — 4 ranks on a Bertling bulk carrier ────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'KGA - Krzysztof Grono Agency' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'KGA - Krzysztof Grono Agency', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer — Bulk Carrier (Bertling, 25,000 GT), Worldwide', '3rd Officer', 'Bulk Carrier', 3700, NULL, 'EUR', '3-4 months (± 1)', '2026-07-15',
'KGA - Krzysztof Grono Agency is urgently recruiting a 3rd Officer for a modern bulk carrier (vessel Beira, owner F.H. Bertling, built 2017) trading worldwide. A good ocean-going officer post with a reputable German owner. 3-4 month contract (± 1), joining 15 July 2026, 3,700 EUR/month (negotiable).

## Vessel particulars
- Type: bulk carrier
- Owner: F.H. Bertling, built 2017, around 25,000 GT
- Sailing area: worldwide

## Requirements
- valid Certificate of Competency for 3rd Officer / OOW
- valid US visa is required
- full STCW documentation and good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'grono@grono.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer — Bulk Carrier (Bertling, 25,000 GT), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Fitter / Welder — Bulk Carrier (Bertling, 25,000 GT), Worldwide', 'Fitter / Welder', 'Bulk Carrier', 3400, NULL, 'EUR', '3-4 months (± 1)', '2026-07-15',
'KGA - Krzysztof Grono Agency is recruiting a Fitter / Welder for a modern bulk carrier (owner F.H. Bertling, built 2017, around 25,000 GT) trading worldwide. Hands-on engine-room fabrication and maintenance work with a reputable German owner. 3-4 month contract (± 1), joining 15 July 2026, 3,400 EUR/month.

## Vessel particulars
- Type: bulk carrier
- Owner: F.H. Bertling, built 2017, around 25,000 GT
- Sailing area: worldwide

## Requirements
- experience as ship Fitter / Welder
- valid US visa is required
- full STCW documentation and good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'grono@grono.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Fitter / Welder — Bulk Carrier (Bertling, 25,000 GT), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB — Bulk Carrier (Bertling, 25,000 GT), Worldwide', 'AB (Able Seaman)', 'Bulk Carrier', 2500, NULL, 'EUR', '3-4 months (± 1)', '2026-07-15',
'KGA - Krzysztof Grono Agency is urgently recruiting an Able Seaman for a modern bulk carrier (owner F.H. Bertling, built 2017, around 25,000 GT) trading worldwide. 3-4 month contract (± 1), joining 15 July 2026, 2,500 EUR/month.

## Vessel particulars
- Type: bulk carrier
- Owner: F.H. Bertling, built 2017, around 25,000 GT
- Sailing area: worldwide

## Requirements
- valid AB Certificate and experience in rank
- valid US visa is required
- full STCW documentation and good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'grono@grono.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB — Bulk Carrier (Bertling, 25,000 GT), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'OS — Bulk Carrier (Bertling, 25,000 GT), Worldwide', 'OS (Ordinary Seaman)', 'Bulk Carrier', 2000, NULL, 'EUR', '3-4 months (± 1)', '2026-07-15',
'KGA - Krzysztof Grono Agency is urgently recruiting an Ordinary Seaman for a modern bulk carrier (owner F.H. Bertling, built 2017, around 25,000 GT) trading worldwide. A solid deck position with a reputable German owner. 3-4 month contract (± 1), joining 15 July 2026, 2,000 EUR/month.

## Vessel particulars
- Type: bulk carrier
- Owner: F.H. Bertling, built 2017, around 25,000 GT
- Sailing area: worldwide

## Requirements
- deck experience and valid STCW documentation
- valid US visa is required
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'grono@grono.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'OS — Bulk Carrier (Bertling, 25,000 GT), Worldwide');
END $$;

-- ── OSM Poland — Chief Officer, OSV ─────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OSM Poland%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OSM Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — OSV, 5-Week Rotation', 'Chief Officer (Chief Mate)', 'OSV', 14410, NULL, 'USD', '5 weeks on / off', '2026-07-25',
'OSM Poland (OSM Thome) is recruiting a Chief Officer for an offshore support vessel (OSV / construction) on a comfortable 5-week on / off rotation. A well-paid senior deck post for an officer with good experience in rank. Joining 25 July 2026, 14,410 USD/month (paid on board only).

## Vessel particulars
- Type: OSV (offshore support / construction)
- Rotation: 5 weeks on / off

## Requirements
- good experience in rank
- Chief Mate Certificate of Competency (STCW II/2)
- valid Seafarer Medical, Passport, Seaman''s Book and flag-state endorsement

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — OSV, 5-Week Rotation');
END $$;

-- ── Romor Crewing Agency — Master, self-discharging general cargo ────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Romor Crewing Agency' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Romor Crewing Agency', 'Gdansk, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Master — Self-Discharging General Cargo (Excavator, 2025 built), Europe', 'Master', 'General Cargo', 12000, NULL, 'USD', '2 months (stable rotation)', '2026-07-18',
'Romor Crewing Agency is recruiting a Master for a brand-new (2025 built) self-discharging general cargo / bulk vessel fitted with an excavator for cargo handling, trading Europe. Short 2-month contracts with a stable rotation. Joining 18-20 July 2026, 12,000 USD/month.

## Vessel particulars
- Type: self-discharging general cargo / bulk (excavator-equipped)
- Size: 5,699 GRT, LOA 120 m, built 2025
- Sailing area: Europe

## Requirements
- experience as Master on general cargo vessels
- good English and references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@romor.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Master — Self-Discharging General Cargo (Excavator, 2025 built), Europe');
END $$;

-- ── Seamar — Deck Fitter / Welder, General Cargo / MPP ──────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Seamar' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Seamar', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Deck Fitter / Welder — General Cargo / MPP (37,443 DWT), Europe / South Africa', 'Fitter / Welder', 'General Cargo', 2650, 2810, 'EUR', 'up to 3 months', '2026-07-17',
'Seamar is recruiting a Deck Fitter / Welder for a multipurpose container / general cargo vessel (built 2013) trading Europe - South Africa - Europe. The ship carries heavy-lift gear up to 60 MT / 240 MT, so there is plenty of varied deck fabrication and rigging work. Contract up to 3 months, joining around 17 July, 2,650-2,810 EUR/month on the first contract (depending on experience) plus overtime and medical insurance for the seafarer and family (HMS).

## Vessel particulars
- Type: multipurpose container / general cargo, built 2013
- DWT / capacity: 37,443 DWT · 2,225 TEU
- Cargo gear: heavy-lift up to 60 MT / 240 MT
- Sailing area: Europe - South Africa

## Requirements
- experience as Deck Fitter / Welder
- full STCW documentation and good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'seamar@seamar.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Deck Fitter / Welder — General Cargo / MPP (37,443 DWT), Europe / South Africa');
END $$;
