-- 12 vacancies imported from crewing.portalmorski.pl (01.07.2026, batch 2),
-- with structured markdown descriptions and direct apply-by-email.
-- Idempotent: each vacancy is inserted only if its title does not already
-- exist, so the whole script can be safely re-run.
-- Run this whole script once in the Supabase SQL Editor.

-- ── Dohle Marine Services Europe — m/v Trouper ───────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Dohle Marine Services Europe' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Dohle Marine Services Europe', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'ETO / Electrical Officer — Container Ship (Trouper), Morocco / Iberia', 'Electrical Officer / ETO', 'Container Ship', 6750, NULL, 'USD', '4 months', NULL,
'Dohle Marine Services Europe is recruiting an Electrical Officer (ETO) for the container ship Trouper (IMO 9326952, GT 9,962, DWT 11,404) trading to Morocco, Portugal and Spain. 4-month contract, 6,750 USD/month.

## Requirements
- experience as Electrical Officer
- good command of English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'ETO / Electrical Officer — Container Ship (Trouper), Morocco / Iberia');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Container Ship (Trouper), Morocco / Iberia', 'Chief Officer (Chief Mate)', 'Container Ship', 8600, NULL, 'USD', '4 months', NULL,
'Dohle Marine Services Europe is recruiting a Chief Officer for the container ship Trouper (IMO 9326952, GT 9,962, DWT 11,404) trading to Morocco, Portugal and Spain. 4-month contract, 8,600 USD/month.

## Requirements
- experience as Chief Officer
- good command of English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Container Ship (Trouper), Morocco / Iberia');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer — Container Ship (Trouper), Europe', '2nd Officer', 'Container Ship', 4500, NULL, 'USD', '4 months', '2026-10-15',
'Dohle Marine Services Europe is recruiting a 2nd Officer for the container ship Trouper (IMO 9326952, GT 9,962, DWT 11,404) trading in Europe. 4-month contract, joining 15 October 2026, 4,500 USD/month.

## Requirements
- experience as 2nd Officer
- good command of English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer — Container Ship (Trouper), Europe');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer — Container Ship (Trouper), Europe', '3rd Officer', 'Container Ship', 3780, NULL, 'USD', '4 months', '2026-10-15',
'Dohle Marine Services Europe is recruiting a 3rd Officer for the container ship Trouper (IMO 9326952, GT 9,962, DWT 11,404) trading in Europe. 4-month contract, joining 15 October 2026, 3,780 USD/month.

## Requirements
- experience as 3rd Officer
- good command of English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer — Container Ship (Trouper), Europe');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Container Ship (Trouper), Europe', '2nd Engineer', 'Container Ship', 8600, NULL, 'USD', '4 months', '2026-07-15',
'Dohle Marine Services Europe is recruiting a 2nd Engineer for the container ship Trouper (IMO 9326952, GT 9,962, DWT 11,404) trading in Europe. 4-month contract, joining 15 July 2026, 8,600 USD/month.

## Requirements
- experience as 2nd Engineer
- good command of English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Container Ship (Trouper), Europe');
END $$;

-- ── Columbia Shipmanagement ───────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Columbia Shipmanagement' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Columbia Shipmanagement', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — Cruise Ship, Worldwide', '3rd Engineer', 'Cruise Ship', 4000, NULL, 'USD', '3 months on / 3 months off', NULL,
'Columbia Shipmanagement is recruiting a 3rd Engineer for a cruise / passenger vessel (built 1993, Bahamas flag, GT 24,344, 929–970 passengers, 370 crew, Wartsila main engines) sailing worldwide touristic regions. 3/3-month (±1) rotation, ASAP start, 4,000 USD/month.

## Requirements
- experience with cruise vessels preferred

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'malgorzata.kopec@stodig.no'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — Cruise Ship, Worldwide');
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
  SELECT v_company_id, 'Bosun — Bulk Carrier (25,000 GT), Worldwide', 'Bosun', 'Bulk Carrier', 3500, NULL, 'EUR', '3-4 months', NULL,
'KGA - Krzysztof Grono Agency is recruiting a Bosun for a bulk carrier (owner F.H. Bertling, built 2017, around 25,000 GT) trading worldwide. 3-4 month (±1) contract, joining July 2026, 3,500 EUR/month.

## Requirements
- experience in rank
- valid USA visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'grono@grono.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Bosun — Bulk Carrier (25,000 GT), Worldwide');
END $$;

-- ── Inter Marine ──────────────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Inter Marine' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Inter Marine', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Deck Cadet — RoRo (Francesco Nullo), Marseille / Tunisia', 'Deck Cadet', 'RoRo Cargo', 800, NULL, 'EUR', '1 month', '2026-07-15',
'Inter Marine is recruiting a Deck Cadet for the RoRo vessel Francesco Nullo trading Marseille – Tunisia. 1-month contract, joining 15 July 2026, 800 EUR/month. The role covers bridge and deck work in port.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'crewing@intermarinegroup.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Deck Cadet — RoRo (Francesco Nullo), Marseille / Tunisia');
END $$;

-- ── Hartmann Crew Consultants ─────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Hartmann Crew Consultants' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Hartmann Crew Consultants', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — Bulk Carrier (35k DWT, MAN-ME-B), Worldwide', 'Chief Engineer', 'Bulk Carrier', 9200, NULL, 'EUR', '3-4 months', NULL,
'Hartmann Crew Consultants is recruiting a Chief Engineer for a bulk carrier (35,000 DWT, MAN-ME-B main engine, Daihatsu auxiliaries, 3 cranes) trading worldwide. 3-4 month contract, joining beginning/mid July 2026, 9,200 EUR/month (negotiable).

## Requirements
- experience in rank as Chief Engineer is essential
- experience with electronically controlled engines
- valid USA visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info@hartmann-crew.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — Bulk Carrier (35k DWT, MAN-ME-B), Worldwide');
END $$;

-- ── For Your Fleet Service ────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'For Your Fleet Service' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'For Your Fleet Service', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Electrician / ETO — Bulk Carrier (Panamax 82k DWT), Worldwide', 'Electrical Officer / ETO', 'Bulk Carrier', 6250, NULL, 'USD', 'about 4 months', NULL,
'For Your Fleet Service is recruiting an Electrician (ETO) for a Panamax bulk carrier without cranes (built 2011, 82,000 DWT, MAN B&W MC-C main engine, Cyprus flag) trading worldwide. About 4-month contract, joining mid July 2026 in Colombia, 6,250 USD/month plus a rejoining bonus.

## Requirements
- experience as ship electrician

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info@fyfservice.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Electrician / ETO — Bulk Carrier (Panamax 82k DWT), Worldwide');
END $$;

-- ── Wilhelmsen Marine Personnel — Engine Cadets ──────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Wilhelmsen Marine Personnel' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Wilhelmsen Marine Personnel', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Engine Cadet — LPG / Bulk Carrier, Worldwide', 'Engine Cadet', 'LPG Tanker', 500, 850, 'USD', '4-6 months', NULL,
'Wilhelmsen Marine Personnel is recruiting an Engine Cadet for LPG and bulk carrier vessels trading worldwide. 4-6 month contract, joining June/July 2026, 500–850 USD/month. Open to candidates with no prior sea experience.

## Requirements
- valid STCW documentation
- good English
- Basic Training for Gas Tanker

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'wmp.pl.recruiting@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Engine Cadet — LPG / Bulk Carrier, Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Engine Cadet — Chemical Tanker / RoRo, Worldwide', 'Engine Cadet', 'Chemical Tanker', 500, 850, 'USD', '4-6 months', NULL,
'Wilhelmsen Marine Personnel is recruiting an Engine Cadet for chemical tanker and RoRo vessels trading worldwide. 4-6 month contract, joining June/July 2026, 500–850 USD/month. Open to candidates with no prior sea experience.

## Requirements
- valid STCW documentation
- good English
- Basic Training for Oil and Chemical Tanker Cargo Operations

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'wmp.pl.recruiting@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Engine Cadet — Chemical Tanker / RoRo, Worldwide');
END $$;
