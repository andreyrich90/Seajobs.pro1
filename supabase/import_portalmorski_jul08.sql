-- Vacancies from crewing.portalmorski.pl (08.07.2026).
-- Recurring vacancies already on the board are REFRESHED (date bumped,
-- reactivated); genuinely new vacancies are inserted (guarded by title).
-- Idempotent — safe to re-run. Run this whole script once in the Supabase SQL Editor.

-- ── Refresh recurring vacancies (bump date so they show as fresh) ────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 4596, currency = 'GBP', joining_date = '2026-07-11'
  WHERE title = 'AB — Ro-Ro Cargo Ship (PRECISION), Liverpool — Dublin';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 3200, currency = 'USD'
  WHERE title = 'Fitter / Welder — General Cargo / MPP, Italy';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 3000, currency = 'EUR', joining_date = '2026-08-05'
  WHERE title = 'AB — RoRo (Elisabeth Russ), Italy / Malta';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 167, currency = 'EUR', joining_date = '2026-08-15'
  WHERE title = 'AB — CTV (Offshore Wind Farms), Germany / Denmark';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 9337, currency = 'USD'
  WHERE title = 'Chief Officer — RO-RO (Tirranna), Worldwide / US Ports';

-- ── Dohle Marine Services Europe — Container (EF Eldra / Paul Russ), 2 ranks ──
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Dohle Marine Services Europe' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Dohle Marine Services Europe', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Container Ship (EF Eldra), Morocco / Mauritania / Spain', 'Chief Officer (Chief Mate)', 'Container Ship', 8600, NULL, 'USD', '4 months', '2026-10-05',
'Dohle Marine Services Europe is recruiting a Chief Officer for the container ship MV EF Eldra (ex Paul Russ, IMO 9470882, GT 16,137, DWT 17,918, MAN B&W 8S50ME-C7, crew of 26) trading Morocco, Mauritania and Spain. 4-month contract, joining 05 October 2026, 8,600 USD/month.

## Requirements
- experience as Chief Officer
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Container Ship (EF Eldra), Morocco / Mauritania / Spain');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — Container Ship (EF Eldra), Morocco / Mauritania / Spain', '3rd Engineer', 'Container Ship', 4500, NULL, 'USD', '4 months', '2026-11-05',
'Dohle Marine Services Europe is recruiting a 3rd Engineer for the container ship MV EF Eldra (ex Paul Russ, IMO 9470882, GT 16,137, MAN B&W 8S50ME-C7) trading Morocco, Mauritania and Spain. 4-month contract, joining 05 November 2026, 4,500 USD/month.

## Requirements
- experience as 3rd Engineer
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — Container Ship (EF Eldra), Morocco / Mauritania / Spain');
END $$;

-- ── Hartmann Crew Consultants — Chief Officer, Car Carrier / PCC ─────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Hartmann Crew Consultants' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Hartmann Crew Consultants', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Car Carrier / PCC (Piranha), Worldwide', 'Chief Officer (Chief Mate)', 'RoRo (Pure Car Carrier)', 8400, NULL, 'USD', '3-4 months', '2026-07-19',
'Hartmann Crew Consultants is recruiting a Chief Officer for the car carrier / PCC m/v Piranha trading worldwide. 3-4 month contract, joining 19 July 2026 in Belgium, 8,400 USD/month.

## Requirements
- experience in Chief Officer rank is essential
- valid US visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info@hartmann-crew.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Car Carrier / PCC (Piranha), Worldwide');
END $$;

-- ── TOS Poland — Steward / Stewardess, DP2 Rock Installation Vessel ──────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'TOS Poland' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'TOS Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Steward / Stewardess (UK Work Permit) — DP2 Rock Installation Vessel (Simon Stevin), EU', 'Steward / Stewardess', 'Offshore Vessel (other)', 163, NULL, 'EUR', '6 weeks on / 6 weeks off', '2026-08-05',
'TOS Poland is recruiting a Steward / Stewardess for the DP2 fall pipe rock installation vessel Simon Stevin (built 2010) operating in the EU offshore sector. 6 weeks on / 6 weeks off, joining 05 August 2026, 163 EUR/day (net, after tax and social insurance).

## Requirements
- experience in rank
- valid STCW and Medical
- UK Work Permit is mandatory

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info.poland@tospeople.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Steward / Stewardess (UK Work Permit) — DP2 Rock Installation Vessel (Simon Stevin), EU');
END $$;

-- ── Wilhelmsen Marine Personnel — 2nd Officer DPO, PSV ──────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Wilhelmsen Marine Personnel' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Wilhelmsen Marine Personnel', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer / DPO (DP Unlimited) — PSV (Ever Hope), West Africa', '2nd Officer', 'PSV', 9000, NULL, 'USD', '8 weeks on / off', NULL,
'Wilhelmsen Marine Personnel is recruiting a 2nd Officer / DPO with a DP Unlimited licence for the PSV Ever Hope (IMO 9786267) operating in West Africa (not Namibia). Permanent rotation, 8 weeks on / off, immediate start, 9,000 USD/month.

## Requirements
- experience in rank
- DP Unlimited licence, valid STCW
- PSV experience and DP logbook

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'WMP.PL.RECRUITING@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer / DPO (DP Unlimited) — PSV (Ever Hope), West Africa');
END $$;

-- ── AIDA Cruises (new company) — three cruise-ship engine roles ──────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'AIDA Cruises' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'AIDA Cruises', 'Rostock, Germany');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '1st (Maintenance) Engineer — Cruise Ship, Worldwide', '1st Engineer', 'Cruise Ship', 5432, NULL, 'EUR', '3 months', NULL,
'AIDA Cruises is recruiting a 1st (Maintenance) Engineer for its cruise fleet trading worldwide. 3-month contracts, joining ASAP, 5,432 EUR/month. Responsible for safe management of an engineering watch, maintenance per PMS for the assigned sub-department, training and supervision of crew, and compliance with flag, class and health/safety regulations.

## Requirements
- national 2nd Engineer Certificate of Competency (CoC III/2 unlimited) per STCW
- at least 2 contracts in a similar position on board (cruise vessels a plus)
- excellent English and communication skills

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'career@aida.de'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '1st (Maintenance) Engineer — Cruise Ship, Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Cruise Ship (AIDA), Worldwide', '2nd Engineer', 'Cruise Ship', 4854, NULL, 'EUR', '3 months', NULL,
'AIDA Cruises is recruiting a 2nd Engineer for its cruise fleet trading worldwide. 3-month contracts, joining ASAP, 58,248 EUR/year gross (approx. 4,854 EUR/month). Responsible for safe management of an engineering watch, preventive maintenance of technical equipment per ERM, and compliance with QMS/LMS and health/safety regulations.

## Requirements
- national 2nd Engineer Certificate of Competency (CoC III/2 unlimited) per STCW
- at least 2 contracts in a similar position on board (cruise vessels a plus)
- excellent English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'career@aida.de'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Cruise Ship (AIDA), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'HVAC / AC Engineer — Cruise Ship, Worldwide', 'HVAC / AC Engineer', 'Cruise Ship', 4634, NULL, 'EUR', '3 months', NULL,
'AIDA Cruises is recruiting an HVAC / AC Engineer for its cruise fleet trading worldwide. 3-month contracts, joining ASAP, 4,634 EUR/month gross. Ensures safe operation, maintenance and repair of refrigeration and ventilation plants, supervises provision storage temperatures, leads the HVAC technicians team and maintains all ice machines on board.

## Requirements
- bachelor''s degree or similar in refrigeration / ventilation mechanics
- several years'' experience with HVAC industrial and central cooling systems (cruise ships a plus)
- F-Gas certified
- fluent English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'career@aida.de'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'HVAC / AC Engineer — Cruise Ship, Worldwide');
END $$;

-- ── Astral Limited (new company) — Engine Cadet, Ro-Pax ─────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Astral Limited' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Astral Limited', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Engine Cadet — Ro-Pax, Europe', 'Engine Cadet', 'RoRo Ferry / Ro-Pax', 2400, NULL, 'EUR', '3 months ± 1', NULL,
'Astral Limited is recruiting an Engine Cadet for a Ro-Ro passenger (Ro-Pax) ferry trading Europe. 3-month (± 1) contract, joining ASAP, 2,400 EUR/month.

## Requirements
- good English (Marlins test is a plus)
- full set of passenger ship courses

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'wgiersz@astrallimited.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Engine Cadet — Ro-Pax, Europe');
END $$;

-- ── Romarine (Baltic Marine Services) — 2nd Engineer, AHTS / MPSV ────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Romarine' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Romarine', 'Swinoujscie, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — AHTS / MPSV (ECO ONE), Mediterranean', '2nd Engineer', 'AHTS', 5500, NULL, 'EUR', '2 + 1 months', '2026-07-20',
'Romarine (Baltic Marine Services) is recruiting a 2nd Engineer for the multipurpose offshore vessel ECO ONE (IMO 9651357, Italy flag, LOA 59.25 m, breadth 14.95 m) working in the Mediterranean. 2 + 1 (option) month contract, joining around 20 July, 5,500 EUR/month (net, on board only). Double cabins.

## Requirements
- experience on position

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'bms@world.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — AHTS / MPSV (ECO ONE), Mediterranean');
END $$;
