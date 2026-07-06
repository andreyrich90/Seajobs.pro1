-- Vacancies from crewing.portalmorski.pl (06.07.2026).
-- Recurring vacancies already on the board are REFRESHED (date bumped,
-- reactivated); genuinely new vacancies are inserted (guarded by title).
-- Idempotent — safe to re-run. Run this whole script once in the Supabase SQL Editor.

-- ── Refresh recurring vacancies (bump date so they show as fresh) ────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 6100, currency = 'EUR', joining_date = '2026-07-31'
  WHERE title = 'ETO / Electrical Officer — RoRo (Elisabeth Russ), Italy / Malta';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 8000, salary_to = 9500, currency = 'USD'
  WHERE title = 'Chief Officer — Heavy Lift / MPP, Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 3231, currency = 'EUR', joining_date = '2026-07-20'
  WHERE title = 'AB — RoRo (Cobelfret: Pauline / Somerset / Palatine), Europe';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 3744, currency = 'EUR', joining_date = '2026-07-07'
  WHERE title = 'AB — RoRo (Britannia Seaways, DFDS), Cuxhaven / England';

-- ── OSM Poland (OSM Thome) — four new roles ──────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OSM Poland%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OSM Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Steward / Stewardess (x3) — ROPAX (King Seaways, DFDS), Ijmuiden / Newcastle', 'Steward / Stewardess', 'RoRo Cargo', 2635, NULL, 'EUR', '2 months', '2026-07-30',
'OSM Poland (OSM Thome) is recruiting three Stewards / Stewardesses for the DFDS ROPAX ferry King Seaways, sailing the Ijmuiden - Newcastle route. 2-month contract, joining 30 July 2026, 2,635 EUR/month (on board only).

## Requirements
- experience in rank
- good English
- valid Basic Safety Training
- Security Awareness
- Crowd Management
- valid Health Certificate and Seaman''s Book

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Steward / Stewardess (x3) — ROPAX (King Seaways, DFDS), Ijmuiden / Newcastle');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer — Shuttle Tanker (NS Pioneer, DP), Brazil', '3rd Officer', 'Shuttle Tanker', 7950, NULL, 'USD', '8 weeks', '2026-07-27',
'OSM Poland (OSM Thome) is recruiting a 3rd Officer for the modern DP shuttle tanker NS Pioneer (DWT 154,107, built 2023, Bahamas flag, DNV class) operating in Brazil. 8-week contract, joining 27 July 2026, 7,950 USD/month (paid on board only).

## Requirements
- valid DP course
- tanker / shuttle tanker experience, minimum 6 months in rank
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer — Shuttle Tanker (NS Pioneer, DP), Brazil');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Cook — Offshore Tug / Supply Vessel, Norway', '2nd Cook', 'OSV', 6000, NULL, 'USD', '5 weeks rotation on / off', '2026-07-30',
'OSM Poland (OSM Thome) is recruiting a 2nd Cook for an offshore tug / supply vessel (Marshall Islands flag) operating in Norway. 5-week rotation on / off, embarkation in Norway, joining 30 July 2026, 6,000 USD/month (no tax).

## Requirements
- good experience as 2nd Cook
- valid Food Handling Certificate, not older than 5 years

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Cook — Offshore Tug / Supply Vessel, Norway');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'ETO / Electrical Officer — Offshore Multicat Utility Vessel, Taiwan', 'Electrical Officer / ETO', 'Multicat', 420, NULL, 'USD', 'few weeks (1 trip)', NULL,
'OSM Poland (OSM Thome) is urgently recruiting an ETO / Electrical Officer for an offshore multicat utility vessel (Marshall Islands flag) working in Taiwan. Few weeks, one trip only, joining ASAP, 420 USD/day (no tax).

## Requirements
- experience in rank
- DP maintenance experience is a must
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'ETO / Electrical Officer — Offshore Multicat Utility Vessel, Taiwan');
END $$;

-- ── OJ Crew HR Management — Master, Container ────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OJ Crew HR Management' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OJ Crew HR Management', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Master — Container Ship (GT 3778), Europe / India / USA', 'Master', 'Container Ship', 8700, NULL, 'EUR', '4 months ± 1', '2026-07-15',
'On behalf of our client, OJ Crew HR Management is looking for a Master to join a container cargo vessel (GT 3778, DWT 5580, Gibraltar flag) trading Europe, India and USA. 4-month (± 1) contract, joining around mid July, 8,700 EUR/month.

## Requirements
- experience in rank on container vessels
- very good English
- valid STCW certificates
- valid medical certificate

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'poland@ojcrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Master — Container Ship (GT 3778), Europe / India / USA');
END $$;

-- ── Stan Shipping Agency — 2nd Engineer, MPSV ───────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Stan Shipping Agency%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Stan Shipping Agency', 'Szemud, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd / 3rd Engineer / Chief Engineer — MPSV (Dina Polaris), EU / Norway', '2nd Engineer', 'Construction Support Vessel', 10000, NULL, 'USD', '8 weeks on / off', '2026-07-16',
'Stan Shipping Agency is recruiting engineers (2nd Engineer, 3rd Engineer and Chief Engineer) for the MPSV Dina Polaris trading EU / Norway. 8 weeks on / off rotation, joining 16 July 2026 in Mexico, 10,000 USD/month.

## Requirements
- offshore experience
- valid DPVM certificate
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'lukasz.jamroz@stanship.com.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd / 3rd Engineer / Chief Engineer — MPSV (Dina Polaris), EU / Norway');
END $$;

-- ── MAG - Morska Agencja Gdynia — Motorman, RoRo ────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'MAG - Morska Agencja Gdynia' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'MAG - Morska Agencja Gdynia', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Motorman (MTM) — RoRo Cargo (Performance), Warrenpoint / Heysham', 'Motorman', 'RoRo Cargo', 4596, NULL, 'GBP', '6 weeks', NULL,
'MAG - Morska Agencja Gdynia is urgently recruiting a Motorman (MTM) for the RoRo cargo ship Performance (IMO 9506227, Malta flag, built 2012) sailing the Warrenpoint - Heysham route. 6-week contract, joining ASAP, 4,596.15 GBP/month.

## Requirements
- experience as Motorman on a similar type of vessel
- all documents in line with STCW, MTM diploma (Rating Forming Part of Engine Room Watch)
- UK FWP is mandatory

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@mag.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Motorman (MTM) — RoRo Cargo (Performance), Warrenpoint / Heysham');
END $$;

-- ── I.E.S Marine Co. Ltd. — Motorman, Accommodation Barge ────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'I.E.S Marine Co. Ltd.' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'I.E.S Marine Co. Ltd.', 'Warszawa, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Motorman — Non Self-Propelled Accommodation Barge, Norway', 'Motorman', 'Accommodation Barge', 3050, NULL, 'EUR', '2 months', '2026-07-31',
'I.E.S Marine Co. Ltd. is recruiting a Motorman for a non self-propelled accommodation barge (Bahamas flag, LOA 83.5 m, breadth 18.53 m) working in Norway. 2-month contract, joining end of July / beginning of August, 3,050 EUR/month.

## Requirements
- experience as Motorman
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'aplikacje@iespoland.eu'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Motorman — Non Self-Propelled Accommodation Barge, Norway');
END $$;

-- ── Clyde Marine Recruitment Poland (new company) — Hotel Fitter, RoPax ───────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Clyde Marine Recruitment Poland' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Clyde Marine Recruitment Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Hotel Fitter — RoPax, Mediterranean', 'Fitter / Welder', 'RoRo Cargo', 3824, NULL, 'EUR', '8/4 or 6/6 weeks (tbc)', '2026-07-27',
'Clyde Marine Recruitment Poland is looking for a Hotel Fitter to join a RoPax vessel in the Mediterranean Sea around 27 July. 8/4 weeks or 6/6 weeks rotation (to be confirmed), 3,824 EUR/month.

## Requirements
- experience in rank
- RoPax-specific courses are advantageous but not essential

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'ngierczynska@clyderecruit.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Hotel Fitter — RoPax, Mediterranean');
END $$;

-- ── Balteam Crewing Agency (new company) — AB / Crane Operator, DSV ───────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Balteam Crewing Agency' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Balteam Crewing Agency', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB / Crane Operator (CROP) — DSV (DP2), Europe', 'AB (Able Seaman)', 'Offshore Vessel (other)', 200, NULL, 'EUR', '4 weeks rotation', '2026-07-22',
'Balteam Crewing Agency is recruiting an AB / Crane Operator (CROP) for a DSV DP2 (built 2001, GT 1424, LOA 60 m, 2 x Caterpillar 3512B main engines, total 1908 kW) working in Europe. 4-week rotation, joining 22 July 2026 in Cuxhaven, 200 EUR/day. Polish contract; registration as a seafarer and A1 form required.

## Requirements
- experience on position, offshore experience required
- crane experience required
- offshore crane operator certificate
- AB certificate
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@balteam.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB / Crane Operator (CROP) — DSV (DP2), Europe');
END $$;

-- ── Mercator Crewing (new company) — Chief Engineer, SOV ─────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Mercator Crewing' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Mercator Crewing', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — SOV (Maltese flag), France', 'Chief Engineer', 'SOV', 12864, NULL, 'EUR', '6 weeks ± 2', '2026-07-16',
'Mercator Crewing is recruiting a Chief Engineer for a Service Operation Vessel (SOV, Maltese flag) working off France. 6-week (± 2) contract, joining 16-24 July 2026, 12,864 EUR/month.

## Requirements
- in rank on CSOV / SOV, walk-to-work (W2W) experience
- valid CoC, Maltese endorsement as advantage
- engine room management
- STCW Basic, Advanced Safety training (Medical FA, Advanced FF), Survival Craft
- Security awareness for seafarers with designated duties
- valid medical certificate
- HUET with CA-EBS as advantage
- good English (Marlins)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'poland@mercatorcrewing.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — SOV (Maltese flag), France');
END $$;

-- ── V.Ships Poland — three VLGC (ammonia carrier) roles ──────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'V.Ships%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'V.Ships Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Master — VLGC / Ammonia Carrier (2026 built), Worldwide', 'Master', 'Gas Carrier (VLGC)', 17000, 18000, 'USD', '3 months ± 1', '2026-07-25',
'V.Ships is recruiting a Master for a VLGC (ammonia carrier), 2026 built, 60,000 DWT, Man B&W ME-C series main engine, trading worldwide. 3-month (± 1) contract, joining 25 July, 17,000-18,000 USD/month plus 700 USD rejoin bonus.

## Requirements
- experience in rank on VLGC
- valid STCW documentation and gas tanker endorsements

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'Recruitment.Gdynia@glasgow.vships.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Master — VLGC / Ammonia Carrier (2026 built), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — VLGC / Ammonia Carrier (2026 built), Worldwide', 'Chief Engineer', 'Gas Carrier (VLGC)', 16000, 17000, 'USD', '3 months ± 1', '2026-07-25',
'V.Ships is recruiting a Chief Engineer for a VLGC (ammonia carrier), 2026 built, 60,000 DWT, Man B&W ME-C series main engine, trading worldwide. 3-month (± 1) contract, joining 25 July, 16,000-17,000 USD/month plus 700 USD rejoin bonus.

## Requirements
- experience in rank on VLGC
- knowledge of Man B&W ME-C series main engine
- valid STCW documentation and gas tanker endorsements

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'Recruitment.Gdynia@glasgow.vships.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — VLGC / Ammonia Carrier (2026 built), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — VLGC / Ammonia Carrier (2026 built), Worldwide', 'Chief Officer (Chief Mate)', 'Gas Carrier (VLGC)', 13500, 14500, 'USD', '3 months', '2026-07-25',
'V.Ships is recruiting a Chief Officer for a VLGC (ammonia carrier), 2026 built, 60,000 DWT, Man B&W ME-C series main engine, trading worldwide. 3-month contract, joining 25 July, 13,500-14,500 USD/month plus 500 USD rejoin bonus.

## Requirements
- experience in rank on VLGC
- valid STCW documentation and gas tanker endorsements

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'Recruitment.Gdynia@glasgow.vships.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — VLGC / Ammonia Carrier (2026 built), Worldwide');
END $$;

-- ── Columbia Shipmanagement — 2nd Engineer, Cruise Ship ──────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Columbia Shipmanagement' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Columbia Shipmanagement', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Cruise Ship (New Build), Worldwide', '2nd Engineer', 'Cruise Ship', 10450, NULL, 'USD', '3 / 3 months rotating', '2026-09-27',
'Columbia Shipmanagement is recruiting a 2nd Engineer for a new-build cruise ship trading worldwide touristic regions. 3 / 3 months rotating basis, joining 27 September 2026, 10,450 USD/month.

## Requirements
- experience on cruise / passenger vessels
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'malgorzata.kopec@stodig.no'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Cruise Ship (New Build), Worldwide');
END $$;
