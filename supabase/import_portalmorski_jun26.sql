-- 16 vacancies imported from crewing.portalmorski.pl (26.06.2026), with
-- original/unique descriptions and direct apply-by-email (contact_email) so a
-- seafarer's application is forwarded straight to the crewing agency.
-- Run this whole script once in the Supabase SQL Editor.

-- ── Inter Marine ────────────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Inter Marine' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Inter Marine', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'AB — PSV Vessel, Offshore Project (Black Sea), Joining 16 July', 'AB (Able Seaman)', 'PSV', 215, NULL, 'EUR', '5 weeks ± 1 week', '2026-07-16',
    'Inter Marine is hiring an AB for a PSV vessel on a temporary/extra-crew offshore project in the Europe/Black Sea region. 5-week (±1 week) contract, joining 16 July 2026, 215 EUR/day. Experience in rank required. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'crewing@intermarinegroup.com');
END $$;

-- ── Stödig Ship Management Poland ───────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Stödig Ship Management Poland' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Stödig Ship Management Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'AB — General Cargo (m/v Enny), Europe, Permanent', 'AB (Able Seaman)', 'General Cargo', 2900, NULL, 'EUR', '6 weeks on / 6 weeks off', NULL,
    'Stödig Ship Management Poland is recruiting an AB for the general cargo vessel m/v ENNY (Danish DIS flag) trading in Europe. 6 weeks on / 6 weeks off rotation, joining around 20 June 2026, 2,900 EUR/month (paid on board). Experience on a similar vessel and a permanent-employment commitment required. Apply directly through SeaJobs.pro — your CV and certificates go straight to the crewing manager.', true, true, 'recruitment.poland@stodig.no');
END $$;

-- ── OSM Poland (OSM Thome) ──────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OSM Poland' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OSM Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Steward/Stewardess — CSOV, Taiwan Project', 'Steward / Stewardess', 'Construction Support Vessel', 4200, NULL, 'USD', '8 weeks on / 8 weeks off', '2026-08-19',
    'OSM Poland (OSM Thome) is recruiting a Steward/Stewardess for a Construction Service Operation Vessel (CSOV, Taiwan flag, accommodation for up to 120 pax) working on an offshore project in Taiwan with embarkation from Vietnam. 8 weeks on / 8 weeks off contract, joining 19 August 2026, 4,200 USD/month (on board only). Requirements: STCW Basic Safety Certificate, Proficiency in Designated Security Duties, valid Health Certificate, Hepatitis A, Typhoid and Yellow Fever vaccinations. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, '2nd Officer — Chemical/Oil Tanker (Fure Vanguard), Europe', '2nd Officer', 'Chemical Tanker', 5150, NULL, 'USD', '2 months', '2026-06-30',
    'OSM Poland (OSM Thome) is recruiting a 2nd Officer for the chemical/oil products tanker FURE VANGUARD (IMO 9963360, Isle of Man flag, built 2024), currently carrying jet fuel from the UK to RAF bases in Cyprus. 2-month contract, joining 30 June 2026, 5,150 USD/month (paid on board only). Requirements: experience in rank and IGF Basic certificate. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com');
END $$;

-- ── Dohle Marine Services Europe ────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Dohle Marine Services Europe' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Dohle Marine Services Europe', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, '2nd Engineer — Container Ship (m/v Amalthea), Middle East', '2nd Engineer', 'Container (Panamax)', 8600, NULL, 'USD', '4 months', '2026-08-05',
    'Dohle Marine Services Europe is recruiting a 2nd Engineer for the container vessel m/v AMALTHEA (IMO 9397913, Portugal flag, GT 42,609, DWT 52,788, built 2009) trading to Saudi Arabia, Jordan and Egypt. 4-month contract, joining 05 August 2026, 8,600 USD/month. Working command of English required. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, '3rd Officer — Container Ship (m/v Venetia), Asia / Africa', '3rd Officer', 'Container (Panamax)', 3780, NULL, 'USD', '4 months', '2026-07-25',
    'Dohle Marine Services Europe is recruiting a 3rd Officer for the container vessel m/v VENETIA (IMO 9400203, GT 42,609, DWT 52,788, built 2018) trading to China, Malaysia, Singapore and South Africa. 4-month contract, joining 25 July 2026, 3,780 USD/month. Working command of English required. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, '3rd Engineer — Container Ship (MV Panda 007), Worldwide', '3rd Engineer', 'Container (Post-Panamax)', 4500, NULL, 'USD', '4 months', '2026-08-25',
    'Dohle Marine Services Europe is recruiting a 3rd Engineer for the container vessel MV PANDA 007 (IMO 9280598, Portugal flag, GT 65,247, DWT 73,235, built 2004) trading to Spain, Slovenia, Malaysia and China. 4-month contract, joining 25 August 2026, 4,500 USD/month. Working command of English required. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com');
END $$;

-- ── I.E.S Marine Co. Ltd. ────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'I.E.S Marine Co. Ltd.' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'I.E.S Marine Co. Ltd.', 'Warsaw, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Engine Cadet — LNG Carrier, Worldwide', 'Engine Cadet', 'LNG Tanker', NULL, NULL, 'USD', '3 months', NULL,
    'I.E.S Marine is recruiting an Engine Cadet for an LNG carrier trading worldwide, joining September 2026. 3-month contract. Open only to maritime academy students/graduates — the owner plans a longer-term career path, offering a 4th Engineer position after two cadet contracts. Salary details available in the office. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'aplikacje@iespoland.eu');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'AB / OS — Tug, Gdynia — Europe (Urgent)', 'AB (Able Seaman)', 'Tug', 2100, NULL, 'EUR', '3-4 weeks', '2026-06-29',
    'I.E.S Marine urgently needs an AB or OS for a tug (built 1986) on the Gdynia–Europe route. 3-4 week contract, joining 29-30 June 2026 in Gdynia, 2,100 EUR/month. Requirements: AB or OS certificate of competency and experience as AB. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'aplikacje@iespoland.eu');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, '2nd Officer — Heavy Lift Semi-Sub, Worldwide', '2nd Officer', 'Semi-Submersible', 4350, NULL, 'USD', '4 months', NULL,
    'I.E.S Marine is recruiting a 2nd Officer for a semi-submersible heavy-lift vessel (no DP, GT 17,825, DWT 17,113, length 174 m, built 2008) trading worldwide. 4-month contract, joining July 2026. Only candidates with prior heavy-lift vessel experience will be considered. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'aplikacje@iespoland.eu');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, '2nd Engineer — Container Ship 4,254 TEU, Worldwide', '2nd Engineer', 'Container (Panamax)', 7600, NULL, 'EUR', '4 months', NULL,
    'I.E.S Marine is recruiting a 2nd Engineer for a 4,254 TEU container vessel (Panama flag, GT 41,225, DWT 53,335, MAN-B&W main engine, built 2008) for a German owner, trading worldwide. 4-month contract, joining mid-July 2026, 7,600 EUR/month. Requirements: 2nd Engineer experience on a similar vessel type and MAN-B&W engine experience. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'aplikacje@iespoland.eu');
END $$;

-- ── Phoenocean ───────────────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Phoenocean' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Phoenocean', 'Warsaw, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Motorman (Welder) — RoRo Cargo, Europe', 'Motorman', 'RoRo Cargo', 3232, NULL, 'EUR', '10/10 weeks rotation', '2026-07-10',
    'Phoenocean is recruiting a Motorman with a welding certificate for the RoRo vessel Palatine (CLDN owner) trading in Europe. 10/10-week rotation, joining 10 July 2026, 3,231.76 EUR/month plus 11.01 EUR/h overtime. Requirements: valid STCW courses, Rating Forming Part of an Engineering Watch (III/4), and a valid welder''s certificate (SPAWACZ 111). Apply directly through SeaJobs.pro — your CV and certificates go straight to the crewing manager.', true, true, 'rekrutacja@phoenocean.pl');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Chief Officer — PCTC Dual Fuel 7,000 CEU, Worldwide', 'Chief Officer (Chief Mate)', 'RoRo (PCTC)', 10250, NULL, 'USD', '3-4 months', '2026-07-19',
    'Phoenocean is recruiting a Chief Officer for the dual-fuel PCTC m/v Global Fuji (7,000 CEU capacity, Marshall Islands flag), sailing worldwide with a mixed Ukrainian/East European officer and Filipino crew. 3-4 month contract, joining 19 July 2026 in Zeebrugge, 10,250 USD/month (plus an optional 200 USD senior-licence bonus). Requirements: experience on similar-size PCTC and dual-fuel vessels, full STCW documentation and a valid US C1/D visa. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'rekrutacja@phoenocean.pl');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Steward/Stewardess — RoRo Cargo, Northern Europe', 'Steward / Stewardess', 'RoRo Cargo', 2713, NULL, 'EUR', '10/10 weeks rotation', '2026-07-10',
    'Phoenocean is recruiting a Steward/Stewardess for the RoRo vessel Palatine (Cobelfret owner) trading in Northern Europe. 10/10-week rotation, joining 10 July 2026, 2,713 EUR/month plus 9.18 EUR/h overtime (over 103 hours). Requirements: full STCW documentation and a valid HACCP certificate — RoRo-specific courses are not required. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'rekrutacja@phoenocean.pl');
END $$;

-- ── ECS Essberger Crewing Services ───────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'ECS Essberger Crewing Services' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'ECS Essberger Crewing Services', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, '3rd Officer — Chemical Tanker, Baltic / North / Mediterranean', '3rd Officer', 'Chemical Tanker', 4105, NULL, 'EUR', '2 months on/off', NULL,
    'ECS Essberger Crewing Services is recruiting a 3rd Officer for a small chemical tanker trading in the Baltic, North and Mediterranean Sea. 2-month on/off rotation, joining July 2026, 4,105 EUR/month. Requirements: tanker experience and an Advanced Chemical/Oil Tanker endorsement. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'aplikacje@essberger.pl');
END $$;

-- ── Romor Crewing Agency ─────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Romor Crewing Agency' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Romor Crewing Agency', 'Gdańsk, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Cook — Coaster / General Cargo, Europe', 'Chief Cook / Cook', 'Coaster', 3685, NULL, 'USD', '2 months, fixed rotation', '2026-07-03',
    'Romor Crewing Agency is recruiting a Cook for a small coaster/general cargo vessel (Norwegian owner, GT 4,999, DWT 7,650, built 1997, 8-9 crew on board) trading in Europe. 2-month fixed-rotation contract, joining 03 July 2026, 3,685 USD/month. Requirements: experience as Cook on small-DWT ships, good English and references. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@romor.pl');
END $$;
