-- Vacancies from crewing.portalmorski.pl (07.07.2026).
-- Recurring vacancies already on the board are REFRESHED (date bumped,
-- reactivated); genuinely new vacancies are inserted (guarded by title).
-- Idempotent — safe to re-run. Run this whole script once in the Supabase SQL Editor.

-- ── Refresh recurring vacancies (bump date so they show as fresh) ────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 3500, currency = 'EUR', joining_date = '2026-07-25'
  WHERE title = '4th Engineer — RoRo (Grendi Futura, Italian Flag), Europe / USA';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 3400, currency = 'EUR', joining_date = '2026-07-15'
  WHERE title = 'AB — RoRo (Grendi Futura, Italian Flag), Europe';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 3744, currency = 'EUR', joining_date = '2026-07-07'
  WHERE title = 'AB — RoRo (Britannia Seaways, DFDS), Cuxhaven / England';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 3200, salary_to = 3400, currency = 'EUR'
  WHERE title = 'AB (Lasher) — RoRo / Con-Ro (Newbuilding), Italy';

-- ── Dohle Marine Services Europe — three Chief Officer roles ─────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Dohle Marine Services Europe' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Dohle Marine Services Europe', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Container Ship (Admiral Neptune), Turkey / Belgium', 'Chief Officer (Chief Mate)', 'Container Ship', 8600, NULL, 'USD', '4 months', '2026-10-15',
'Dohle Marine Services Europe is recruiting a Chief Officer for the container ship m/v Admiral Neptune (IMO 9354387, GT 9,962, DWT 11,433, MAN 9M43 main engine, crew of 19) trading Turkey - Belgium. 4-month contract, joining 15 October 2026, 8,600 USD/month.

## Requirements
- experience as Chief Officer
- good English
- RT Flex engine experience or MAN ME experience

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Container Ship (Admiral Neptune), Turkey / Belgium');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Container Ship (Marti Star II), China / Japan', 'Chief Officer (Chief Mate)', 'Container Ship', 8600, NULL, 'USD', '4 months', '2026-10-05',
'Dohle Marine Services Europe is recruiting a Chief Officer for the container ship m/v Marti Star II (IMO 9383596, GT 9,610, B&W 6S46MC-C main engine) trading China - Japan. 4-month contract, joining 05 October 2026, 8,600 USD/month.

## Requirements
- experience as Chief Officer
- good English
- RT Flex engine experience or MAN ME experience

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Container Ship (Marti Star II), China / Japan');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Bulk Carrier (TD Hamburg), Worldwide', 'Chief Officer (Chief Mate)', 'Bulk Carrier', 8600, NULL, 'USD', '4 months', '2026-07-15',
'Dohle Marine Services Europe is recruiting a Chief Officer for the bulk carrier m/v TD Hamburg (IMO 9726578, GT 36,347, DWT 63,463, B&W 5S60ME-C8.2, 4 x 36 MT cargo cranes, crew of 26) trading Chile, Peru, Panama Canal, Belgium, Germany and Finland. 4-month contract, joining 15 July 2026, 8,600 USD/month.

## Requirements
- experience as Chief Officer
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Bulk Carrier (TD Hamburg), Worldwide');
END $$;

-- ── Columbia Shipmanagement — 1st Refrigeration Engineer, Cruise Ship ────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Columbia Shipmanagement' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Columbia Shipmanagement', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '1st Refrigeration Engineer — Cruise Ship, Worldwide', 'Refrigeration Engineer', 'Cruise Ship', 13800, NULL, 'USD', '10 weeks on / 10 weeks off', '2026-09-12',
'Columbia Shipmanagement is recruiting a 1st Refrigeration Engineer for a cruise ship (Malta flag, built 2017, GT 150,695, LOA 335.20 m) trading worldwide touristic regions. 10 weeks on / 10 weeks off, joining 12 September 2026, 13,800 USD/month.

## Requirements
- experience on a similar position and with cruise vessels
- candidate must possess a valid EU-recognized F-Gas certificate

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'malgorzata.kopec@stodig.no'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '1st Refrigeration Engineer — Cruise Ship, Worldwide');
END $$;

-- ── OSM Poland — 2nd Engineer, Offshore Cable Layer ─────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OSM Poland%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OSM Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Offshore Cable Layer Vessel, USA', '2nd Engineer', 'Offshore Vessel (other)', 400, NULL, 'USD', '4-5 weeks', '2026-07-11',
'OSM Poland (OSM Thome) is urgently recruiting a 2nd Engineer for an offshore cable layer vessel (NIS flag) working in the USA. 4-5 week contract, joining 11 July 2026, 400 USD/day.

## Requirements
- offshore construction vessel experience is a must
- valid US visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Offshore Cable Layer Vessel, USA');
END $$;

-- ── Wilhelmsen Marine Personnel — Chief Officer, RO-RO ──────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Wilhelmsen Marine Personnel' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Wilhelmsen Marine Personnel', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — RO-RO (Tirranna), Worldwide / US Ports', 'Chief Officer (Chief Mate)', 'RoRo Cargo', 9337, NULL, 'USD', '3-4 months', '2026-07-20',
'Wilhelmsen Marine Personnel is recruiting a Chief Officer for the RO-RO vessel Tirranna (IMO 9377523, built 2009, Norway flag, owner and technical management Wilhelmsen) trading worldwide and US ports. 3-4 month contract, joining mid / end of July, 9,337 USD/month.

## Requirements
- experience in rank
- valid US visa C1/D
- STCW documentation
- good English and good references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'WMP.PL.RECRUITING@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — RO-RO (Tirranna), Worldwide / US Ports');
END $$;

-- ── Baltimex (new company) — CTV / Ro-Pax / sailing cruise / general cargo ────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Baltimex' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Baltimex', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB — CTV (Offshore Wind Farms), Germany / Denmark', 'AB (Able Seaman)', 'Crew Transfer Vessel (CTV)', 167, NULL, 'EUR', '15 days on / 15 days off', '2026-08-15',
'Baltimex is recruiting Able Seamen for CTVs (crew transfer vessels) servicing offshore wind farms off Germany and Denmark — three CTV units in total. 15 days on / 15 days off, joining 15 August and 01 September 2026, 166.80 EUR/day gross. Social insurance in Germany (approx. 25% deduction from gross), travel day 40 EUR + company covers travel, food 15 EUR/day, accommodation arranged by operator ashore, fixed 218 EUR/month allowance for Sunday/holiday work.

## Requirements
- Passport, Seaman''s Book, Medical certificate
- Watchkeeping Rating (A-II/4)
- Basic Safety Training (A-VI/1 §1-2)
- Proficiency in Survival Craft & Rescue Boat (A-VI/2 §1)
- Security Awareness Training (A-VI/6-2)
- very good English (owner requirement)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'abuczynska@baltimex.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB — CTV (Offshore Wind Farms), Germany / Denmark');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Cook Assistant / Junior Cook — Ro-Pax, Denmark', 'Cook Assistant', 'RoRo Ferry / Ro-Pax', 70, NULL, 'EUR', '8 weeks on / 4 weeks off', '2026-07-10',
'Baltimex is recruiting a Cook Assistant / Junior Cook (pantry) for a Ro-Ro / passenger ferry trading Denmark. 8 weeks on / 4 weeks off, joining 10 July 2026, 70 EUR/day.

## Requirements
- Passport, National Seaman''s Book (with sea service pages), Medical Health Certificate
- Basic Safety Training (A-VI/1 §1-2)
- Passenger Ships Personnel Certificate - CROWD (V2 §4-7; A-V/2 2.1-2.4)
- Proficiency in Survival Craft & Rescue Boat (A-VI/2 §1)
- Security Awareness Training (A-VI/5, A-VI/6-2)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'abuczynska@baltimex.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Cook Assistant / Junior Cook — Ro-Pax, Denmark');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Steward / Stewardess — Ro-Pax, Denmark', 'Steward / Stewardess', 'RoRo Ferry / Ro-Pax', 70, NULL, 'EUR', '6 weeks on / 4 weeks off', '2026-07-10',
'Baltimex is recruiting a Steward / Stewardess for a Ro-Ro / passenger ferry trading Denmark. 6 weeks on / 4 weeks off, joining 10 July 2026, 70 EUR/day.

## Requirements
- Passport, National Seaman''s Book (with sea service pages), Medical Health Certificate
- Basic Safety Training (A-VI/1 §1-2)
- Passenger Ships Personnel Certificate - CROWD (V2 §4-7; A-V/2 2.1-2.4)
- Proficiency in Survival Craft & Rescue Boat (A-VI/2 §1)
- Security Awareness Training (A-VI/5, A-VI/6-2)
- Food handling certificate

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'abuczynska@baltimex.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Steward / Stewardess — Ro-Pax, Denmark');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Messman — Ro-Pax, Denmark / Germany', 'Messman', 'RoRo Ferry / Ro-Pax', 70, NULL, 'EUR', '7 weeks on / 4 weeks off', '2026-07-31',
'Baltimex is recruiting a Messman for a Ro-Ro / passenger ferry trading Denmark - Germany. 7 weeks on / 4 weeks off, joining 31 July 2026, 70 EUR/day.

## Requirements
- Passport, National Seaman''s Book (with sea service pages), Medical Health Certificate
- Basic Safety Training (A-VI/1 §1-2)
- Passenger Ships Personnel Certificate - CROWD (V2 §4-7; A-V/2 2.1-2.4)
- Proficiency in Survival Craft & Rescue Boat (A-VI/2 §1)
- Security Awareness Training (A-VI/5, A-VI/6-2)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'abuczynska@baltimex.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Messman — Ro-Pax, Denmark / Germany');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Cleaner / Housekeeping — Ro-Pax, Germany', 'Messman', 'RoRo Ferry / Ro-Pax', 70, NULL, 'EUR', '6 weeks on / 4 weeks off', '2026-07-09',
'Baltimex is recruiting a Cleaner / Housekeeping crew member for a Ro-Ro / passenger ferry trading Germany. 6 weeks on / 4 weeks off, joining 09 July 2026, 70 EUR/day.

## Requirements
- Passport, National Seaman''s Book (with sea service pages), Medical Health Certificate
- Basic Safety Training (A-VI/1 §1-2)
- Passenger Ships Personnel Certificate - CROWD (V2 §4-7; A-V/2 2.1-2.4)
- Proficiency in Survival Craft & Rescue Boat (A-VI/2 §1)
- Security Awareness Training (A-VI/5, A-VI/6-2)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'abuczynska@baltimex.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Cleaner / Housekeeping — Ro-Pax, Germany');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Deck Hand (II/4) — Luxury Sailing Cruise Ship, Mediterranean', 'OS (Ordinary Seaman)', 'Cruise Ship', 1065, NULL, 'EUR', '3-4 months', '2026-07-07',
'Baltimex is recruiting a Deck Hand (II/4) for a luxury sailing passenger cruise ship (work at heights) trading the Mediterranean Sea. Cabins are shared. 3-4 month contract, joining 07 July 2026, 1,065 EUR/month.

## Requirements
- experience required
- Diploma II/4
- ability to work at heights

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'abuczynska@baltimex.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Deck Hand (II/4) — Luxury Sailing Cruise Ship, Mediterranean');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Fitter / Welder — General Cargo / MPP, Italy', 'Fitter / Welder', 'General Cargo', 3200, NULL, 'USD', '2-4 months', NULL,
'Baltimex is recruiting a Fitter / Welder for a general cargo / MPP vessel (GRT 5,604, KW 2,800, B&W Alpha STX 7S 26 MC MK6 main engine) trading Italy. 2-4 month contract, joining ASAP, 3,200 USD/month.

## Requirements
- experience required as Fitter / Welder

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'abuczynska@baltimex.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Fitter / Welder — General Cargo / MPP, Italy');
END $$;
