-- 5 vacancies imported from crewing.portalmorski.pl (30.06.2026), with
-- structured markdown descriptions and direct apply-by-email (contact_email).
-- Idempotent: each vacancy is inserted only if its title does not already
-- exist, so the whole script can be safely re-run.
-- (The OJ Crew "2nd Engineer to join Bulk Carrier 9000$/month" screenshot is
--  already covered by import_portalmorski_jun29.sql and is intentionally omitted.)
-- Run this whole script once in the Supabase SQL Editor.

-- ── V.Ships Poland ────────────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'V.Ships Poland' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'V.Ships Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer — Container Ship (26,800 DWT), Worldwide', '2nd Officer', 'Container Ship', 4026, NULL, 'USD', '3 months ± 1', NULL,
'V.Ships Poland is recruiting a 2nd Officer for a container carrier (26,800 DWT, French flag, built 2020) trading worldwide. 3-month (±1) contract, joining beginning of August 2026, 4,026 USD/month.

## Requirements
- experience on container vessels

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gdynia@glasgow.vships.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer — Container Ship (26,800 DWT), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer — Container Ship (26,800 DWT), Worldwide', '3rd Officer', 'Container Ship', 3640, NULL, 'USD', '3 months ± 1', NULL,
'V.Ships Poland is recruiting a 3rd Officer for a container carrier (26,800 DWT, French flag, built 2020) trading worldwide. 3-month (±1) contract, joining beginning of August 2026, 3,640 USD/month.

## Requirements
- experience on container vessels

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gdynia@glasgow.vships.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer — Container Ship (26,800 DWT), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB — LPG Carrier (EU Trade), Worldwide', 'AB (Able Seaman)', 'LPG Tanker', 3000, NULL, 'USD', '4 months ± 1', NULL,
'V.Ships Poland is recruiting an Able Seaman for an LPG gas carrier (3,090 DWT, built 2006, EU trade with EU crew) trading worldwide. 4-month (±1) contract, ASAP start, 3,000 USD/month.

## Requirements
- experience on LPG / gas carriers

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gdynia@glasgow.vships.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB — LPG Carrier (EU Trade), Worldwide');
END $$;

-- ── Wilhelmsen Marine Personnel ───────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Wilhelmsen Marine Personnel' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Wilhelmsen Marine Personnel', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Chemical / Products Tanker (TP Spirit), Worldwide', '2nd Engineer', 'Chemical Tanker', 11400, NULL, 'USD', '3 months', NULL,
'Wilhelmsen Marine Personnel is recruiting a 2nd Engineer for the chemical / products tanker TP Spirit (Norwegian flag, built 2016) trading worldwide. 3-month contract, joining July 2026, 11,400 USD/month depending on experience.

## Requirements
- at least 12 months of experience in rank
- chemical / oil tanker experience
- good English
- good references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'wmp.pl.recruiting@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Chemical / Products Tanker (TP Spirit), Worldwide');
END $$;

-- ── OSM Poland (OSM Thome) ────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OSM Poland' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OSM Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB (Temporary) — RoRo (Ark Germania), Europe', 'AB (Able Seaman)', 'RoRo Cargo', 3744, NULL, 'EUR', 'Temporary (17-29 July 2026)', '2026-07-17',
'OSM Poland (OSM Thome) is recruiting a temporary Able Seaman for the RoRo vessel Ark Germania (DFDS) operating in Europe. Short contract from 17 July until 29 July 2026, 3,744 EUR/month on board (plus a lashing bonus where applicable).

## Requirements
- experience in rank (lashing experience preferable)
- STCW Diploma
- Basic Safety Training
- Security Awareness
- SBK (proficiency in survival craft)
- valid Health certificate
- experience on RoRo vessels / lashing

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB (Temporary) — RoRo (Ark Germania), Europe');
END $$;
