-- 11 vacancies imported from crewing.portalmorski.pl (23.06.2026), with
-- original/unique descriptions and direct apply-by-email (contact_email) so
-- a seafarer's application is forwarded straight to the crewing agency.
-- Run this whole script once in the Supabase SQL Editor.

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
  VALUES (
    v_company_id,
    '2nd Officer — Small General Cargo (WILSON GIJON), Europe — ASAP',
    '2nd Officer', 'General Cargo',
    NULL, NULL, 'EUR',
    '3 months', NULL,
    'Stödig Ship Management Poland is looking for a 2nd Officer to join the small general cargo vessel WILSON GIJON (General Cargo Ship, Bahamas flag, built 1993, GT 2506, DWT 3689) trading in Europe. 3-month rotation, joining ASAP. Relevant rank experience and valid STCW documents required. Apply directly through SeaJobs.pro — your CV and certificates go straight to the crewing manager.',
    true, true, 'recruitment.poland@stodig.no'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Steward / Stewardess — Jack-Up Installation Vessel — ASAP',
    'Steward / Stewardess', 'Jack-Up',
    NULL, NULL, 'EUR',
    '4 weeks', NULL,
    'Stödig Ship Management Poland requires a Steward / Stewardess for a jack-up installation vessel (Malta flag). Short 4-week contract, joining ASAP. Previous catering experience on board is required. Apply directly through SeaJobs.pro — your profile is sent straight to the crewing desk.',
    true, true, 'recruitment.poland@stodig.no'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Cook — Jack-Up Installation Vessel — ASAP',
    'Cook', 'Jack-Up',
    NULL, NULL, 'EUR',
    '4 weeks', NULL,
    'Stödig Ship Management Poland is hiring a Cook for a jack-up installation vessel (Malta flag). 4-week contract, joining ASAP. Previous galley experience required. Apply directly through SeaJobs.pro — your profile is sent straight to the crewing desk.',
    true, true, 'recruitment.poland@stodig.no'
  );
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
  VALUES (
    v_company_id,
    '3rd Engineer — Research Vessel (Ocean Warrior), Spain → USA',
    '3rd Engineer', 'Research Vessel',
    NULL, NULL, 'USD',
    '4-6 weeks', '2026-06-24',
    'OSM Poland (OSM Thome) is recruiting a 3rd Engineer for the research vessel OCEAN WARRIOR (IMO 9791262, built 2016, Netherlands flag). Short 4-6 week trip from Spain to the USA, joining around 24 June 2026. Experience in rank required. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.',
    true, true, 'recruitment.gda@osmthome.com'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'URGENT Chief Engineer — New-Build Oil/Chemical Tanker (Athenian Faith)',
    'Chief Engineer', 'Chemical/Oil Tanker',
    15150, NULL, 'USD',
    '4 months', '2026-06-26',
    'OSM Poland (OSM Thome) urgently needs a Chief Engineer for the new-build oil/chemical tanker ATHENIAN FAITH (built 2026, DWT 18,500 MT, length 150 m, MAN-B&W). 4-month contract, joining 26 June 2026, 15,150 USD/month (paid on board). Requirements: valid STCW CoC Chief Engineer Unlimited (Reg. III/2), Advanced Oil & Chemical Tanker Cargo Operations certificates (STCW A-V/1-1 and A-V/1-2), minimum 12-24 months on oil/chemical tankers preferred, strong knowledge of marine diesel engines and cargo operations support. Apply directly through SeaJobs.pro — your CV and certificates go straight to the crewing manager.',
    true, true, 'recruitment.gda@osmthome.com'
  );
END $$;

-- ── MAG - Morska Agencja Gdynia ─────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'MAG - Morska Agencja Gdynia' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'MAG - Morska Agencja Gdynia', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'AB — Ro-Ro Cargo Ship (PRECISION), Liverpool — Dublin',
    'AB (Able Seaman)', 'Ro-Ro',
    4596, NULL, 'GBP',
    '6 weeks', '2026-07-01',
    'MAG - Morska Agencja Gdynia is hiring an AB for the Ro-Ro cargo ship PRECISION (IMO 9506239, Malta flag, built 2012) on the Liverpool - Dublin run. 6-week contract, joining 01 July 2026, 4,596.15 GBP/month. All documents in line with STCW required; previous AB experience on Ro-Ro vessels. Apply directly through SeaJobs.pro — your application is forwarded straight to the crewing manager (ref: AB FOR PRECISION).',
    true, true, 'application@mag.pl'
  );
END $$;

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
  VALUES (
    v_company_id,
    '2nd Engineer — Container Vessel, Spain — West Africa',
    '2nd Engineer', 'Container',
    8250, NULL, 'USD',
    '6 weeks', '2026-07-10',
    'Inter Marine is recruiting a 2nd Engineer for a container vessel, joining in the port of Gdynia for trading between Spain and West Africa. 6-week contract, joining around 10 July 2026, 8,250 USD/month. Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.',
    true, true, 'crewing@intermarinegroup.com'
  );
END $$;

-- ── EURO Shipping Services Ltd ──────────────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'EURO Shipping Services Ltd' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'EURO Shipping Services Ltd', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'URGENT Master — General Cargo (Coaster), Worldwide',
    'Master (Captain)', 'General Cargo (Coaster)',
    6850, NULL, 'EUR',
    '4 months ± 1 month', NULL,
    'EURO Shipping Services Ltd urgently needs a Master for a general cargo coaster trading worldwide. 4 months (±1 month) contract, joining ASAP, 6,850 EUR/month. Only candidates with GC experience — minimum 3 contracts in this rank with the same owner. Documents in line with STCW, US visa welcome, references/opinions appreciated. Apply directly through SeaJobs.pro — your CV, diploma and passport/visa copy go straight to the crewing manager.',
    true, true, 'aplikacje@euroshipping.pl'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Chief Engineer (Single) — General Cargo (Coaster), Worldwide',
    'Chief Engineer', 'General Cargo (Coaster)',
    6800, NULL, 'EUR',
    '4 months ± 1 month', '2026-07-31',
    'EURO Shipping Services Ltd is looking for a single Chief Engineer for a multi-purpose dry cargo coaster trading worldwide. 4 months (±1 month) contract, joining about end of July, 6,800 EUR/month. C/E diploma up to 3,000 kW accepted; minimum 2 contracts in this rank on GC. Apply directly through SeaJobs.pro — your CV and diploma scan go straight to the crewing manager.',
    true, true, 'aplikacje@euroshipping.pl'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Chief Engineer (Single) — New-Build General Cargo (Coaster), Worldwide',
    'Chief Engineer', 'General Cargo (Coaster)',
    6800, NULL, 'EUR',
    '4 months ± 1 month', '2026-07-31',
    'EURO Shipping Services Ltd needs a single Chief Engineer for a new-build multi-purpose dry cargo coaster, worldwide trading. 4 months (±1 month) contract, joining about end of July, 6,800 EUR/month. C/E diploma up to 3,000 kW accepted; minimum 2 contracts in this rank on GC. Apply directly through SeaJobs.pro — your CV and diploma scan go straight to the crewing manager.',
    true, true, 'aplikacje@euroshipping.pl'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'ETO — Bulk Carrier, Worldwide',
    'ETO (Electrical Officer)', 'Bulk Carrier',
    5750, NULL, 'EUR',
    '4 months ± 1 month', '2026-07-31',
    'EURO Shipping Services Ltd is recruiting an ETO for a bulk carrier trading worldwide. 4 months (±1 month, owner option) contract, joining about end of July, 5,750 EUR/month. Main engine HMM MAN-B&W 6S46 MC-C (7,860 kW), bow thruster 680 kW, three auxiliary engines ZJMD MAN-B&W 5L 23/30H (650 kW) and 1 x SISU 620 DSRG (120 kW). Requirements: minimum 2 last contracts with the same owner, all documents valid. Apply directly through SeaJobs.pro — your CV and Record of Service (last 5 years) go straight to the crewing manager.',
    true, true, 'aplikacje@euroshipping.pl'
  );
END $$;
