-- Vacancies from crewing.portalmorski.pl (02.07.2026).
-- Recurring vacancies already on the board are REFRESHED (created_at bumped,
-- reactivated, dates/salary updated) so they surface as new; genuinely new
-- vacancies are inserted (guarded by title). Idempotent — safe to re-run.
-- Run this whole script once in the Supabase SQL Editor.

-- ── Refresh recurring vacancies (bump date so they show as fresh) ────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, joining_date = '2026-07-19'
  WHERE title = 'Chief Officer — PCTC Dual Fuel 7,000 CEU, Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
  WHERE title = 'Chief Officer — General Cargo Coaster (Newbuilding), Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
  WHERE title = 'Master — General Cargo Coaster, Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 7000, salary_to = 8500, currency = 'EUR'
  WHERE title = 'Chief Engineer (Single) — General Cargo Coaster, Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, joining_date = '2026-07-15'
  WHERE title = '3rd Officer — Heavy Lift / MPP, Worldwide';

-- ── SEAMAR ────────────────────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Seamar' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Seamar', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — Coaster (3,800 DWT), Europe', 'Chief Engineer', 'Coaster', 8500, NULL, 'EUR', '4 months', NULL,
'Seamar is recruiting a Chief Engineer (single) for a modern coaster (3,800 DWT) trading in European waters. 4-month contract, joining end of July 2026, 8,500 EUR/month.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'seamar@seamar.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — Coaster (3,800 DWT), Europe');
END $$;

-- ── Dohle Marine Services Europe — m/v Elisabeth Russ ────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Dohle Marine Services Europe' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Dohle Marine Services Europe', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'ETO / Electrical Officer — RoRo (Elisabeth Russ), Italy / Malta', 'Electrical Officer / ETO', 'RoRo Cargo', 6100, NULL, 'EUR', '10 weeks on / 10 weeks off', '2026-07-31',
'Dohle Marine Services Europe is recruiting an Electrical Officer (ETO) for the RoRo vessel m/v Elisabeth Russ (IMO 9186429, GT 10,471, DWT 7,296) trading between Italy and Malta. 10 weeks on / 10 weeks off rotation, joining 31 July 2026, 6,100 EUR/month.

## Requirements
- experience as Electrical Officer
- good command of English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'ETO / Electrical Officer — RoRo (Elisabeth Russ), Italy / Malta');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB — RoRo (Elisabeth Russ), Italy / Malta', 'AB (Able Seaman)', 'RoRo Cargo', 3000, NULL, 'EUR', '12 weeks on / 6 weeks off', '2026-07-21',
'Dohle Marine Services Europe is recruiting an Able Seaman for the RoRo vessel m/v Elisabeth Russ (IMO 9186429, GT 10,471, DWT 7,296) trading between Italy and Malta. 12 weeks on / 6 weeks off rotation, joining 21 July 2026, 3,000 EUR/month. An OS with the relevant experience may also be considered.

## Requirements
- AB certificate (STCW II/5) or Watchkeeping rating (STCW II/4)
- coronavirus vaccination
- valid Proficiency in Survival Craft / rescue boat
- good command of English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB — RoRo (Elisabeth Russ), Italy / Malta');
END $$;

-- ── Jupiter Shipping Services — Celtic fleet ─────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Jupiter Shipping Services' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Jupiter Shipping Services', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — General Cargo (Celtic Venture), Europe', 'Chief Engineer', 'General Cargo', 7554, NULL, 'EUR', '2-3 months', NULL,
'Jupiter Shipping Services is recruiting a Chief Engineer for the general cargo vessel MV Celtic Venture (Portuguese flag, 8 crew) trading Europe and the Mediterranean. 2-3 month contract, joining beginning of July 2026, 7,554 EUR/month (a motorman in the engine room is also carried).

## Requirements
- general cargo experience, minimum 2-3 contracts in rank
- Marlins test

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'jupiter@jupitershipping.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — General Cargo (Celtic Venture), Europe');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — General Cargo (Celtic Navigator), Europe', 'Chief Officer (Chief Mate)', 'General Cargo', 5719, NULL, 'EUR', '2-3 months', NULL,
'Jupiter Shipping Services is recruiting a Chief Officer for the general cargo vessel MV Celtic Navigator (British flag, 8 crew) trading Europe and the Mediterranean. 2-3 month contract, ASAP start (June 2026), 5,719 EUR/month (negotiable).

## Requirements
- general cargo experience
- Marlins test, minimum 90%

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'jupiter@jupitershipping.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — General Cargo (Celtic Navigator), Europe');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — General Cargo (Celtic Forester), Europe', 'Chief Officer (Chief Mate)', 'General Cargo', 5719, NULL, 'EUR', '2-3 months', NULL,
'Jupiter Shipping Services is recruiting a Chief Officer for the general cargo vessel MV Celtic Forester (British flag, 8 crew) trading Europe and the Mediterranean. 2-3 month contract, ASAP start (July 2026), 5,719 EUR/month (negotiable).

## Requirements
- general cargo experience
- Marlins test, minimum 90%

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'jupiter@jupitershipping.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — General Cargo (Celtic Forester), Europe');
END $$;

-- ── Euro Shipping Services — Master, Bulk Carrier ────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Euro Shipping Services' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Euro Shipping Services', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Master — Bulk Carrier (18,825 GT), Worldwide', 'Master', 'Bulk Carrier', 8950, NULL, 'EUR', '2 months ± 1', '2026-07-20',
'Euro Shipping Services is urgently recruiting a Master for a bulk carrier (GT 18,825, built 2004, DWT 27,781) trading worldwide. 2-month (±1) contract, joining around 20 July 2026, 8,950 EUR/month.

## Requirements
- experience as Master, minimum 3 contracts with one owner

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'aplikacje@euroshipping.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Master — Bulk Carrier (18,825 GT), Worldwide');
END $$;

-- ── uniQrew ltd ───────────────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'uniQrew ltd' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'uniQrew ltd', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB — RoRo (Grendi Futura, Italian Flag), Europe', 'AB (Able Seaman)', 'RoRo Cargo', 3400, NULL, 'EUR', '12 weeks / 3 months ± 1', NULL,
'uniQrew ltd is recruiting an Able Seaman for the RoRo vessel Grendi Futura (Italian flag, Polish crew) trading in Europe. 12-week (3-month ±1) contract, joining mid July 2026, 3,400 EUR/month net (owner arranges the Italian-flag social benefits). On board: single cabins, WiFi, gym, sauna and Polish TV.

## Requirements
- AB experience on RoRo vessels
- valid USA visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'krzysztof@uniqrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB — RoRo (Grendi Futura, Italian Flag), Europe');
END $$;
