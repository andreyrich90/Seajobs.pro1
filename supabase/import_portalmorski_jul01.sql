-- 11 vacancies imported from crewing.portalmorski.pl (01.07.2026), with
-- structured markdown descriptions and direct apply-by-email (contact_email).
-- Idempotent: each vacancy is inserted only if its title does not already
-- exist, so the whole script can be safely re-run.
-- Run this whole script once in the Supabase SQL Editor.

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
  SELECT v_company_id, '3rd Engineer — Construction Vessel (Siem Barracuda), Offshore', '3rd Engineer', 'Construction Support Vessel', 338, NULL, 'USD', '4 weeks', '2026-07-29',
'OSM Poland (OSM Thome) is recruiting a 3rd Engineer for the offshore construction vessel Siem Barracuda. 4-week contract, joining 29 July 2026, 338 USD/day.

## Requirements
- offshore construction vessel experience is a must
- valid UK visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — Construction Vessel (Siem Barracuda), Offshore');
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
  SELECT v_company_id, '2nd Engineer — Container Ship, Spain / West Africa', '2nd Engineer', 'Container Ship', 8250, NULL, 'USD', '6 weeks', '2026-07-10',
'Inter Marine is recruiting a 2nd Engineer for a container vessel (port of Gdynia) trading Spain – West Africa. 6-week contract, joining around 10 July 2026, 8,250 USD/month. A 3rd Engineer ready for promotion may also be considered.

## Requirements
- experience in rank (or 3rd Engineer ready to advance)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'crewing@intermarinegroup.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Container Ship, Spain / West Africa');
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
  SELECT v_company_id, '2nd Officer — General Cargo (Timber), Baltic Sea', '2nd Officer', 'General Cargo', 3844, NULL, 'USD', '4 months', NULL,
'OJ Crew is recruiting a 2nd Officer for a general cargo / MPP vessel trading timber in the Baltic Sea (9 crew; deck team Master, C/O, 2/O, Deck Cadet; paper charts only on board). 4-month contract, joining beginning of July 2026, 3,844 USD/month (negotiable).

## Requirements
- 2nd Officer National license
- valid STCW documentation
- valid Medical certificate
- experience in rank on similar vessels
- good command of working English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'poland@ojcrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer — General Cargo (Timber), Baltic Sea');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — General Cargo, Baltic Sea / UK', 'Chief Officer (Chief Mate)', 'General Cargo', 6000, NULL, 'USD', '4 months', NULL,
'OJ Crew is recruiting a Chief Officer for a general cargo / MPP vessel trading the Baltic Sea and UK (8 crew; deck team Master, C/O, 2/O). 4-month contract, joining beginning of July 2026, 6,000 USD/month (negotiable).

## Requirements
- Chief Officer Certificate of Competency
- valid STCW documentation
- valid Medical certificate
- experience in rank on similar vessels
- good command of working English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'poland@ojcrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — General Cargo, Baltic Sea / UK');
END $$;

-- ── CHIPOLBROK ────────────────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Chipolbrok' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Chipolbrok', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Heavy Lift / MPP, Worldwide', 'Chief Officer (Chief Mate)', 'Heavy Lift / Project Cargo', 8000, NULL, 'USD', '4 months ± 1 month', NULL,
'Chipolbrok is recruiting a Chief Officer for MPP / heavy-lift vessels with cranes up to 350 MT (DWT 28,000–62,000) trading worldwide. Direct employment with the owner, no intermediaries; health insurance (HMS) plus extra allowances. 4-month (±1) contract, joining TBA June/July 2026, 8,000 USD/month plus a bonus up to 1,500 USD.

## Requirements
- experience on general cargo / heavy-lift vessels with international crew
- MPP + heavy-crane cargo operations
- non-standard cargo lashing / securing

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'crewing@chipolbrok.com.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Heavy Lift / MPP, Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer — Heavy Lift / MPP, Worldwide', '3rd Officer', 'Heavy Lift / Project Cargo', 4100, NULL, 'USD', '4 months ± 1 month', '2026-07-15',
'Chipolbrok is recruiting a 3rd Officer for MPP / heavy-lift vessels with cranes up to 350 MT trading worldwide. Direct employment with the owner, no intermediaries; health insurance (HMS) plus extra allowances. 4-month (±1) contract, joining 15 July 2026 (China), 4,100 USD/month plus a bonus up to 1,100 USD.

## Requirements
- experience on general cargo vessels

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'crewing@chipolbrok.com.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer — Heavy Lift / MPP, Worldwide');
END $$;

-- ── Crewplanet ────────────────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Crewplanet' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Crewplanet', 'Riga, Latvia');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB / Cook — Dredger, UK', 'AB (Able Seaman)', 'Dredger', 200, NULL, 'EUR', '6 weeks (1-2 contracts)', '2026-07-08',
'Crewplanet is recruiting an AB / Cook for a dredger operating in the UK. 6-week contract (1–2 contracts), joining 8 July 2026, 200 EUR/day after tax.

## Requirements
- previous experience in rank

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@crewplanet.eu'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB / Cook — Dredger, UK');
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
  SELECT v_company_id, '2nd Officer — Container Ship (Vera Rambow), Europe', '2nd Officer', 'Container Ship', 4018, NULL, 'USD', '3-4 months', NULL,
'Marlow Navigation Poland is recruiting a 2nd Officer for the container vessel Vera Rambow (built 2008, GT 17,488, LOA 167 m, German flag) calling at European ports. 3-4 month contract, ASAP start, 4,018 USD/month on board.

## Requirements
- experience in rank on similar vessels
- EU citizenship

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'applications.mnpl@marlowgroup.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer — Container Ship (Vera Rambow), Europe');
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
  SELECT v_company_id, 'OS — Bulk Carrier (Dalarna, 24,166 GT), Worldwide', 'OS (Ordinary Seaman)', 'Bulk Carrier', 2000, NULL, 'EUR', '3-4 months', NULL,
'KGA - Krzysztof Grono Agency is recruiting an Ordinary Seaman for the bulk carrier Dalarna (IMO 9626120, Singapore flag, built 2014, GT 24,166, DWT 35,958, LOA 179.93 m) trading worldwide. 3-4 month (±1) contract, joining July 2026, 2,000 EUR/month.

## Requirements
- experience in rank
- valid USA visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'grono@grono.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'OS — Bulk Carrier (Dalarna, 24,166 GT), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Messman — Bulk Carrier (Dalarna, 24,166 GT), Worldwide', 'Messman', 'Bulk Carrier', 2000, NULL, 'EUR', '3-4 months', NULL,
'KGA - Krzysztof Grono Agency is recruiting a Messman for the bulk carrier Dalarna (IMO 9626120, Singapore flag, built 2014, GT 24,166, DWT 35,958, LOA 179.93 m) trading worldwide. 3-4 month (±1) contract, joining July 2026, 2,000 EUR/month.

## Requirements
- experience in rank
- valid USA visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'grono@grono.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Messman — Bulk Carrier (Dalarna, 24,166 GT), Worldwide');
END $$;

-- ── Polaris Usługi Morskie ────────────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Polaris Usługi Morskie' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Polaris Usługi Morskie', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Master — Car Carrier PCTC (Viking Passama), Worldwide', 'Master', 'RoRo (PCTC)', 10350, NULL, 'USD', 'approx 14 weeks', '2026-07-25',
'Polaris Usługi Morskie is recruiting a Master for the PCTC car carrier m/v Viking Passama trading worldwide. Approx. 14-week contract, joining around 25 July 2026, 10,350 USD/month plus bonuses.

## Requirements
- experience as Master on PCTC vessels
- experience on Pure Car & Truck Carriers with Dual Fuel is a must
- valid US C1/D visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@maritime.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Master — Car Carrier PCTC (Viking Passama), Worldwide');
END $$;
