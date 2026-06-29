-- 20 vacancies imported from crewing.portalmorski.pl (29.06.2026), with
-- structured markdown descriptions (intro + Requirements + How to apply) and
-- direct apply-by-email (contact_email) so a seafarer's application is
-- forwarded straight to the crewing agency.
-- Idempotent: each vacancy is inserted only if its title does not already
-- exist, so the whole script can be safely re-run.
-- Run this whole script once in the Supabase SQL Editor.

-- ── Nova Ship Crew Poland ─────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Nova Ship Crew Poland' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Nova Ship Crew Poland', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'OS — General Cargo / MPP (4,800 GT), Mediterranean', 'OS (Ordinary Seaman)', 'General Cargo', 2000, 2300, 'EUR', '2-3 months', '2026-07-05',
'Nova Ship Crew Poland is hiring an Ordinary Seaman for a general cargo / MPP vessel (4,800 GT, 110 m, Polish/EU crew) trading in the Mediterranean Sea. 2-3 month contract, joining 5-6 July 2026, 2,000-2,300 EUR/month depending on experience. Direct employment through the shipowner''s office, with medical insurance including family.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info@novashipcrewpoland.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'OS — General Cargo / MPP (4,800 GT), Mediterranean');
END $$;

-- ── Euro Shipping Services ────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Euro Shipping Services' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Euro Shipping Services', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer (Single) — General Cargo Coaster, Worldwide', 'Chief Engineer', 'General Cargo', 6800, NULL, 'EUR', '4 months ± 1 month', NULL,
'Euro Shipping Services is recruiting a single Chief Engineer for a multi-purpose dry cargo coaster trading worldwide. 4-month (±1) contract, joining around the end of July / beginning of August 2026, 6,800 EUR/month. Accepted C/E diploma up to 3,000 kW.

## Requirements
- experience on general cargo vessels, minimum 2 contracts in rank
- documents in line with STCW

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'aplikacje@euroshipping.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer (Single) — General Cargo Coaster, Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer (Single) — General Cargo Coaster (Newbuilding), Worldwide', 'Chief Engineer', 'General Cargo', 7500, NULL, 'EUR', '4 months ± 1 month', NULL,
'Euro Shipping Services is recruiting a single Chief Engineer for a multi-purpose dry cargo coaster (newbuilding) trading worldwide. 4-month (±1) contract, joining around the end of July 2026, 7,500 EUR/month. Accepted C/E diploma up to 3,000 kW.

## Requirements
- experience on general cargo vessels, minimum 2 contracts in rank

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'aplikacje@euroshipping.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer (Single) — General Cargo Coaster (Newbuilding), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — General Cargo Coaster (Newbuilding), Worldwide', 'Chief Officer (Chief Mate)', 'General Cargo', 5200, NULL, 'EUR', '4 months ± 1 month', NULL,
'Euro Shipping Services is recruiting a Chief Officer for a general cargo coaster (newbuilding) trading worldwide; the officer deck crew is 2/O, C/O and Master. 4-month (±1) contract, joining around mid August 2026, 5,200 EUR/month. Experience on general cargo, minimum 3 contracts in rank with the same owner.

## Requirements
- documents in line with STCW
- yellow fever vaccination
- Basic Safety Training (4-in-1)
- Proficiency in Survival Craft and Rescue Boats (PSC)
- Advanced Fire Fighting (AFF)
- Medical First Aid (MFA)
- Designated Security Duties
- Security awareness
- seaman''s book issued after 2000
- passport valid at least 9 months from the joining date

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'aplikacje@euroshipping.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — General Cargo Coaster (Newbuilding), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Master — General Cargo Coaster, Worldwide', 'Master', 'General Cargo', 6850, NULL, 'EUR', '4 months ± 1 month', NULL,
'Euro Shipping Services is recruiting a Master for a general cargo coaster trading worldwide; the officer deck crew is Master, C/O and 2/O. 4-month (±1) contract, joining around mid/end of August 2026, 6,850 EUR/month. Experience on general cargo, minimum 3 contracts in rank with the same owner.

## Requirements
- documents in line with STCW
- USA visa welcome
- references / opinions welcome

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'aplikacje@euroshipping.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Master — General Cargo Coaster, Worldwide');
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
  SELECT v_company_id, '2nd Officer (DPO Unlimited) — PSV, West Africa', '2nd Officer', 'PSV', 9000, NULL, 'USD', '8 weeks on / 8 weeks off', NULL,
'Wilhelmsen Marine Personnel is recruiting a 2nd Officer DPO for the PSV Ever Hope (IMO 9786267) operating in West Africa (excluding Namibia). 8 weeks on / 8 weeks off rotation, immediate start, 9,000 USD/month.

## Requirements
- DP unlimited license
- STCW documents
- PSV experience
- valid DP logbook

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'wmp.pl.recruiting@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer (DPO Unlimited) — PSV, West Africa');
END $$;

-- ── KGA - Krzysztof Grono Agency ──────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'KGA - Krzysztof Grono Agency' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'KGA - Krzysztof Grono Agency', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB — Bulk Carrier (25,000 GT), Worldwide', 'AB (Able Seaman)', 'Bulk Carrier', 2500, NULL, 'EUR', '3-4 months', '2026-07-07',
'KGA - Krzysztof Grono Agency is recruiting an Able Seaman for a bulk carrier (owner F.H. Bertling, built 2017, around 25,000 GT) trading worldwide. 3-4 month (±1) contract, joining 7 July 2026, 2,500 EUR/month.

## Requirements
- experience in rank
- valid USA visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'grono@grono.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB — Bulk Carrier (25,000 GT), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Fitter / Welder — Bulk Carrier (25,000 GT), Worldwide', 'Fitter', 'Bulk Carrier', 3400, NULL, 'EUR', '3-4 months', '2026-06-30',
'KGA - Krzysztof Grono Agency is recruiting a Fitter/Welder for a bulk carrier (owner F.H. Bertling, built 2017, around 25,000 GT) trading worldwide. 3-4 month (±1) contract, joining 30 June 2026, 3,400 EUR/month.

## Requirements
- experience in rank
- valid US visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'grono@grono.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Fitter / Welder — Bulk Carrier (25,000 GT), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Oiler — Bulk Carrier (25,000 GT), Worldwide', 'Oiler', 'Bulk Carrier', 2500, NULL, 'EUR', '3-4 months', '2026-07-07',
'KGA - Krzysztof Grono Agency is recruiting an Oiler for a bulk carrier (owner F.H. Bertling, built 2017, around 25,000 GT) trading worldwide. 3-4 month (±1) contract, joining 7 July 2026, 2,500 EUR/month.

## Requirements
- experience in rank
- valid USA visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'grono@grono.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Oiler — Bulk Carrier (25,000 GT), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'OS — Bulk Carrier (25,000 GT), Worldwide', 'OS (Ordinary Seaman)', 'Bulk Carrier', 2000, NULL, 'EUR', '3-4 months', '2026-07-07',
'KGA - Krzysztof Grono Agency is recruiting an Ordinary Seaman for a bulk carrier (owner F.H. Bertling, built 2017, around 25,000 GT) trading worldwide. 3-4 month (±1) contract, joining 7 July 2026, 2,000 EUR/month.

## Requirements
- experience in rank
- valid US visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'grono@grono.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'OS — Bulk Carrier (25,000 GT), Worldwide');
END $$;

-- ── OJ Crew ───────────────────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OJ Crew%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OJ Crew HR Management', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Cook — Car Carrier (PCC), Worldwide', 'Chief Cook / Cook', 'RoRo (Pure Car Carrier)', 2500, NULL, 'USD', '4 months', '2026-07-05',
'OJ Crew is seeking an experienced Cook for a pure car carrier (PCC). 4-month contract, joining 5 July 2026, 2,500 USD/month (2,400 USD basic wage plus a 100 USD bakery bonus).

## Requirements
- valid STCW documents
- valid Medical certificate

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'poland@ojcrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Cook — Car Carrier (PCC), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Car Carrier (PCC), Worldwide', 'Chief Officer (Chief Mate)', 'RoRo (Pure Car Carrier)', 8500, NULL, 'USD', '4 months ± 1', NULL,
'OJ Crew is recruiting a Chief Officer for a pure car carrier (PCC). 4-month (±1) contract, joining around mid August 2026, 8,500 USD/month.

## Requirements
- experience in rank on PCC vessels

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'poland@ojcrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Car Carrier (PCC), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Bulk Carrier (58,713 DWT), Worldwide', '2nd Engineer', 'Bulk Carrier', 9000, NULL, 'USD', '2 months', '2026-07-15',
'OJ Crew is recruiting a 2nd Engineer for a bulk carrier (built 2010, GT 33,096, DWT 58,713, MAN B&W MC-C main engine, Daihatsu/Yanmar generators, ERMA FIRST BWTS). 2-month contract, joining around 15-20 July 2026, 9,000 USD/month on board.

## Requirements
- minimum 12 months in rank
- MAN B&W MC-C engine experience
- fluent English
- valid STCW certificates
- valid Medical certificate
- EU citizenship

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'poland@ojcrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Bulk Carrier (58,713 DWT), Worldwide');
END $$;

-- ── Polish Marine Management ──────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Polish Marine Management' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Polish Marine Management', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — Oil Tanker (Whitchallenger), Europe', 'Chief Engineer', 'Oil Tanker', 5452, NULL, 'GBP', '6 weeks on / off', NULL,
'Polish Marine Management is recruiting a Chief Engineer for the oil tanker Whitchallenger (IMO 9252278) trading in Europe. 6 weeks on / off rotation, ASAP start, 5,451.57 GBP/month paid on board and at home.

## Requirements
- experience as Chief Engineer on a tanker
- Advanced Training in Oil Tanker Operations (arranged for approved candidates)
- D&A test
- Marlins (minimum 85%) and TOSE (minimum Intermediate)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@pmmanagement.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — Oil Tanker (Whitchallenger), Europe');
END $$;

-- ── Marlow Navigation Poland ──────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Marlow Navigation Poland' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Marlow Navigation Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Car Carrier (PCC), Baltic / North Sea', '2nd Engineer', 'RoRo (Pure Car Carrier)', 7600, 8000, 'EUR', '6 weeks (6/6 rotation possible)', NULL,
'Marlow Navigation Poland is recruiting a 2nd Engineer for a car carrier (built 2006, MAN B&W main engine 9,170 kW, Bahamas flag) trading in the Baltic and North Sea. 6-week contract with a possible permanent 6/6 rotation, ASAP start, 7,600-8,000 EUR/month on board (plus a 100 EUR seniority allowance where applicable).

## Requirements
- experience in rank
- experience on the same engine type

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'applications.mnpl@marlowgroup.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Car Carrier (PCC), Baltic / North Sea');
END $$;

-- ── Romarine ──────────────────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Romarine' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Romarine', 'Świnoujście, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Survey Vessel (Laura Bassi), Italy', '2nd Engineer', 'Survey Vessel', 5500, NULL, 'EUR', '2-3 months', '2026-07-08',
'Romarine is recruiting a 2nd Engineer for the research / survey vessel Laura Bassi (IMO 9114256, Italian flag, LOA 80 m, beam 17.03 m) operating in Italy. 2-3 month contract, joining 8 July 2026, 5,500 EUR/month on board (net).

## Requirements
- experience in rank

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'bms@world.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Survey Vessel (Laura Bassi), Italy');
END $$;

-- ── Dohle Marine Services Europe ──────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Dohle Marine Services Europe' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Dohle Marine Services Europe', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — RoRo (Elisabeth Russ), Italy / Malta', '3rd Engineer', 'RoRo Cargo', 4100, NULL, 'EUR', '10 weeks on / 10 weeks off', '2026-07-31',
'Dohle Marine Services Europe is recruiting a 3rd Engineer for the RoRo vessel m/v Elisabeth Russ (IMO 9186429, GT 10,471, DWT 7,296) trading between Italy and Malta. 10 weeks on / 10 weeks off rotation, joining 31 July 2026, 4,100 EUR/month.

## Requirements
- experience as 3rd Engineer
- good command of English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — RoRo (Elisabeth Russ), Italy / Malta');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — Container Ship (Bakkafoss), Iceland / North America', 'Chief Engineer', 'Container Ship', 10350, NULL, 'USD', '4 months', '2026-09-05',
'Dohle Marine Services Europe is recruiting a Chief Engineer for the container ship EF Eva / Bakkafoss (IMO 9429194, GT 11,550, DWT 14,670) trading to Iceland, Canada and the USA. 4-month contract, joining 5 September 2026, 10,350 USD/month.

## Requirements
- experience as Chief Engineer
- good command of English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — Container Ship (Bakkafoss), Iceland / North America');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — Bulk Carrier (Rubina), Worldwide', 'Chief Engineer', 'Bulk Carrier', 10350, NULL, 'USD', '4 months', '2026-08-05',
'Dohle Marine Services Europe is recruiting a Chief Engineer for the bulk carrier Rubina (IMO 9725512, GT 25,618, DWT 39,958) trading worldwide. 4-month contract, joining 5 August 2026, 10,350 USD/month.

## Requirements
- experience as Chief Engineer
- good command of English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — Bulk Carrier (Rubina), Worldwide');
END $$;

-- ── Fast Baltic ───────────────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Fast Baltic' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Fast Baltic', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — General Cargo Coaster (Belgian Flag), North / Baltic Sea', 'Chief Officer (Chief Mate)', 'Coaster', 12920, NULL, 'EUR', '2.5 months ± 2 weeks', NULL,
'Fast Baltic is recruiting a Chief Officer for a general cargo / MPP coaster (3,000-3,850 DWT, up to 3,000 GT) under the Belgian flag, trading the North and Baltic Seas, UK, Ireland, France and Spain with calls at Polish ports (mainly Szczecin). 2.5-month (±2 weeks) contract, joining July 2026, 12,920 EUR gross. Legal employment with the Belgian owner covering health insurance, taxes and pension contributions.

## Requirements
- experience as Chief Officer on general cargo coaster / MPP vessels

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'ship@fastbaltic.com.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — General Cargo Coaster (Belgian Flag), North / Baltic Sea');
END $$;
