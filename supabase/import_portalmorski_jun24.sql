-- 13 vacancies imported from crewing.portalmorski.pl (24.06.2026), with
-- original/unique descriptions and direct apply-by-email (contact_email) so a
-- seafarer's application is forwarded straight to the crewing agency.
-- Run this whole script once in the Supabase SQL Editor.

-- ── Marlow Navigation Poland ────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Marlow Navigation Poland' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Marlow Navigation Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'ETO — Car Carrier / PCC, Permanent Contract (Marlow)', 'ETO (Electrical Officer)', 'Car Carrier / PCC', 4550, NULL, 'EUR', 'Permanent', NULL,
    'Marlow Navigation Poland is hiring a Flying ETO for car carriers / PCC (EMS Highway, ISAR Highway, Weser Highway, Schelde Highway) on European port calls. Permanent contract, paid on & off, joining ASAP, 4,550 EUR/month. Requirements: experience in rank and a valid ETO licence. Apply directly through SeaJobs.pro — your CV and certificates go straight to the crewing manager.', true, true, 'applications.mnpl@marlowgroup.com');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Chief Officer — Timber Coaster (Scot Ranger), Europe', 'Chief Officer', 'Coaster', 5900, NULL, 'GBP', '5 weeks', NULL,
    'Marlow Navigation Poland is looking for a Chief Officer for the coaster MV Scot Ranger (GBR flag, built 2021, LOA 89.98 m, 3,457 GT) on European port calls. 5-week contract, joining ASAP, 5,900 GBP/month (paid on board only). Timber experience is a must and experience in rank required. Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.', true, true, 'applications.mnpl@marlowgroup.com');
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
  VALUES (v_company_id, '2nd Officer — Container Ship (m/v Baldur), Pacific', '2nd Officer', 'Container', 4500, NULL, 'USD', '4 months', '2026-11-03',
    'Dohle Marine Services Europe is recruiting a 2nd Officer for the container vessel m/v Baldur, trading around Papua New Guinea, Solomon Islands, Vanuatu and New Zealand. 4-month contract, joining 03 November 2026, 4,500 USD/month. Experience in rank and a working command of English required. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@dohle-mse.com');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, '2nd Engineer — Container Ship (m/v Rita), Worldwide', '2nd Engineer', 'Container', 8600, NULL, 'USD', '4 months', '2026-11-03',
    'Dohle Marine Services Europe is hiring a 2nd Engineer for the container vessel m/v Rita trading worldwide. 4-month contract, joining 03 November 2026, 8,600 USD/month. Experience in rank and a working command of English required. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@dohle-mse.com');
END $$;

-- ── Hartmann Crew Consultants ───────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Hartmann Crew Consultants' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Hartmann Crew Consultants', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'AB / OS — Tug (EMS Power), Germany — Poland', 'AB (Able Seaman)', 'Tug', 2500, NULL, 'EUR', '1 month', '2026-07-05',
    'Hartmann Crew Consultants requires an AB or OS for the tug EMS Power on the Germany - Poland route. 1-month contract, joining 05 July 2026. Pay: 2,500 EUR/month for AB, 2,000 EUR/month for OS. Apply directly through SeaJobs.pro — your application goes straight to the crewing manager.', true, true, 'info@hartmann-crew.pl');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Chief Engineer — Bulk Carrier 35k, Worldwide', 'Chief Engineer', 'Bulk Carrier', 9200, NULL, 'EUR', '3-4 months', '2026-07-10',
    'Hartmann Crew Consultants is looking for a Chief Engineer for a 35k bulk carrier (MAN-ME-B main engine, Daihatsu auxiliaries, 3 cranes) trading worldwide. 3-4 month contract, joining beginning/mid July, 9,200 EUR/month (negotiable). Requirements: experience in C/E rank, US visa, experience with electronic engines. Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.', true, true, 'info@hartmann-crew.pl');
END $$;

-- ── Stan Shipping Agency Ltd ────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Stan Shipping Agency' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Stan Shipping Agency', 'Szemud, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Chief Officer — General Cargo (Snaefell River), Isle of Man / Ireland / UK', 'Chief Officer', 'General Cargo', NULL, NULL, 'GBP', '4 weeks', '2026-07-05',
    'Stan Shipping Agency is recruiting a Chief Officer for the general cargo ship SNAEFELL RIVER (IMO 8906224, Isle of Man flag, built 1989, GT 852, DWT 1,300) sailing Isle of Man / Ireland / UK. 4-week contract, joining 05 July 2026, rate 200 GBP/day on board incl. travel days. Apply directly through SeaJobs.pro — your CV and references go straight to the crewing manager.', true, true, 'lukasz.jamroz@stanship.com.pl');
END $$;

-- ── OJ Crew HR Management ───────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OJ Crew HR Management' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OJ Crew HR Management', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Cook — Reefer Vessel, Worldwide', 'Cook', 'Reefer', 2400, NULL, 'USD', '4 months ± 1 month', '2026-07-08',
    'OJ Crew HR Management is seeking an experienced Cook to join a reefer vessel trading worldwide. 4 months (±1 month) contract, joining beginning of July, 2,400 USD/month. Requirements: valid STCW documents and a valid Medical certificate. Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.', true, true, 'poland@ojcrew.com');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Single Engineer — General Cargo / MPP, Europe', 'Single Engineer', 'General Cargo / MPP', 8500, NULL, 'EUR', '8 weeks', '2026-07-05',
    'OJ Crew HR Management is looking for an experienced Single Engineer to join a general cargo vessel (DWT 3,931, GT 2,978, MAK engine, Netherlands flag) trading in Europe. 8-week contract, joining 05 July 2026, 8,500-9,000 EUR/month (negotiable). Requirements: Chief Engineer CoC or 2nd Engineer Dutch CoC is an advantage, valid STCW documentation, valid Medical certificate, very good English. Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.', true, true, 'poland@ojcrew.com');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Chief Officer — Car Carrier / PCC, Worldwide', 'Chief Officer', 'Car Carrier / PCC', 8500, NULL, 'USD', '4 months ± 1 month', '2026-08-15',
    'OJ Crew HR Management is recruiting a Chief Officer to join a PCC / car carrier trading worldwide. 4 months (±1 month) contract, joining around mid August, 8,500 USD/month. Experience in rank on PCC required. Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.', true, true, 'poland@ojcrew.com');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'Cook — Pure Car Carrier (PCC), Worldwide', 'Cook', 'Car Carrier / PCC', 2500, NULL, 'USD', '4 months', '2026-07-05',
    'OJ Crew HR Management is seeking an experienced Cook to join a pure car carrier (PCC) trading worldwide. 4-month contract, joining 05 July 2026, 2,400 USD basic wage + 100 USD bakery bonus. Requirements: valid STCW documents and a valid Medical certificate. Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.', true, true, 'poland@ojcrew.com');
END $$;

-- ── MMS - Marine Manning Service ────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'MMS - Marine Manning Service' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'MMS - Marine Manning Service', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, '3rd Officer — Container Ship (MSC Jubilee), Worldwide', '3rd Officer', 'Container', 3800, NULL, 'USD', '4 months', '2026-07-01',
    'MMS - Marine Manning Service is recruiting a 3rd Officer for the container vessel MSC Jubilee trading worldwide. 4-month contract, joining 01 July in China or 04-07 July in Vietnam, around 3,800 USD/month. Minimum 2 contracts for 3rd Off preferred. Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.', true, true, 'mms@mms.com.pl');
END $$;

-- ── CHIPOLBROK ──────────────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Chipolbrok' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Chipolbrok', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (v_company_id, 'ETO — General Cargo / Heavy Lift (MacGregor cranes), Worldwide', 'ETO (Electrical Officer)', 'General Cargo / MPP', 7400, NULL, 'USD', '4 months ± 1 month', NULL,
    'Chipolbrok is hiring an ETO for MPP / heavy-lift general cargo vessels with cranes up to 350 MT (DWT 28,000-62,000) trading worldwide. 4 months (±1 month) contract, joining TBA June/July 2026, 7,400 USD/month + bonus up to 1,400 USD. Direct employment with the owner, private medical care, cargo-related extra work paid separately. Requirements: minimum 2 contracts as ETO, vessels with MacGregor cranes. Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.', true, true, 'crewing@chipolbrok.com.pl');
END $$;
