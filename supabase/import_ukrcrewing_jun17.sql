-- 11 vacancies imported from Vestnik Kruinga (ukrcrewing.com.ua), posted 17.06.2026,
-- with original descriptions and direct apply-by-email (contact_email) where available.
-- Run this whole script once in the Supabase SQL Editor.

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Aquamarine Crew Agency' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name) VALUES (v_company_id, 'Aquamarine Crew Agency');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, source_url, contact_email)
  VALUES (
    v_company_id,
    'Chief Officer — LPG Tanker, Worldwide',
    'Chief Officer (Chief Mate)',
    'LPG Tanker',
    13000, 13000, 'USD',
    '4 months',
    '2026-06-30',
    'Aquamarine Crew Agency is looking for a Chief Officer to join an LPG Tanker on a worldwide trading pattern. Mixed crew (Ukrainian, Romanian, Filipino), joining 30 June 2026 for a 4-month contract. Excellent English and prior experience in rank required; STCW documents must be valid. Salary from $13,000/month. Apply directly through SeaJobs.pro — your profile, sea service record and certificates go straight to the crewing manager.',
    true, true, 'https://ukrcrewing.com.ua/vacancy/352293', 'application@aquamarine-crew.com'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, source_url, contact_email)
  VALUES (
    v_company_id,
    'Chief Engineer — Oil Chemical Tanker, Worldwide',
    'Chief Engineer',
    'Chemical Tanker',
    12270, 12270, 'EUR',
    '4 months',
    '2026-07-23',
    'Aquamarine Crew Agency is looking for a Chief Engineer to join an oil/chemical tanker on a worldwide trading pattern. Mixed crew (Greek, Ukrainian, Romanian, Filipino), joining 23 July 2026 for a 4-month contract. Excellent English and prior experience in rank required; STCW documents must be valid. Salary from €12,270/month. Apply directly through SeaJobs.pro — your profile, sea service record and certificates go straight to the crewing manager.',
    true, true, 'https://ukrcrewing.com.ua/vacancy/352287', 'application@aquamarine-crew.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Nordic Hamburg Shipmanagement' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name) VALUES (v_company_id, 'Nordic Hamburg Shipmanagement');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, source_url, contact_email)
  VALUES (
    v_company_id,
    '2nd Engineer — Container Vessel "GSL Eleftheria"',
    '2nd Engineer',
    'Container (Panamax)',
    7800, 7800, 'USD',
    '4 months',
    '2026-06-25',
    'Nordic Hamburg Shipmanagement is hiring a 2nd Engineer for the container vessel GSL Eleftheria (46,000 DWT, built 2013, Wärtsilä 8RT-flex 68 main engine). Mixed crew, joining 25 June 2026 for a 4-month contract. Good English and prior experience in rank and on the same vessel type required. Salary from $7,800/month. Apply directly through SeaJobs.pro — your profile, sea service record and certificates go straight to the crewing manager.',
    true, true, 'https://ukrcrewing.com.ua/vacancy/352291', 'ksenija@martide.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'YCrewing Marine Agency' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name) VALUES (v_company_id, 'YCrewing Marine Agency');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, source_url)
  VALUES (
    v_company_id,
    'Chief Engineer — Oil Chemical Tanker',
    'Chief Engineer',
    'Chemical Tanker',
    11000, 11500, 'USD',
    '4+1 months',
    '2026-06-23',
    'YCrewing Marine Agency is recruiting a Chief Engineer for an oil/chemical tanker with a mixed crew. Possible quick start — joining 23 June 2026 for a 4+1 month contract. Any English level accepted. Salary $11,000–11,500/month. Contact the agency directly on +373 60 758 295, +373 78 986 268 or +373 68 477 948, or apply directly through SeaJobs.pro and your profile, sea service record and certificates will be sent straight to the crewing manager.',
    true, true, 'https://ukrcrewing.com.ua/vacancy/352294'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Meridian Marine' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name) VALUES (v_company_id, 'Meridian Marine');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, source_url, contact_email)
  VALUES (
    v_company_id,
    '3rd Officer — Bulk Carrier, DWT 8000',
    '3rd Officer',
    'Bulk Carrier (Handysize)',
    2200, 2200, 'USD',
    '6+1 months',
    '2026-06-19',
    'Meridian Marine is recruiting a 3rd Officer for a bulk carrier (8,000 DWT) with a Russian-speaking crew. Joining 19 June 2026 for a 6+1 month contract. Any English level accepted. Salary $2,200/month. Apply directly through SeaJobs.pro — your profile, sea service record and certificates go straight to the crewing manager.',
    true, true, 'https://ukrcrewing.com.ua/vacancy/352289', 'con.mdnmar@gmail.com'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, source_url, contact_email)
  VALUES (
    v_company_id,
    'AB (Able Seaman) — Bulk Carrier, DWT 29000',
    'AB (Able Seaman)',
    'Bulk Carrier (Handysize)',
    1800, 1800, 'USD',
    '6+1 months',
    '2026-06-20',
    'Meridian Marine is recruiting an Able Seaman for a bulk carrier (29,000 DWT) with a Ukrainian crew. Joining 20 June 2026 for a 6+1 month contract. Any English level accepted. Salary $1,800/month. Apply directly through SeaJobs.pro — your profile, sea service record and certificates go straight to the crewing manager.',
    true, true, 'https://ukrcrewing.com.ua/vacancy/352288', 'con.mdnmar@gmail.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Ukraina Maritime Agency' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name) VALUES (v_company_id, 'Ukraina Maritime Agency');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, source_url, contact_email)
  VALUES (
    v_company_id,
    '2nd Engineer — Passenger Vessel',
    '2nd Engineer',
    'River Cruise',
    6750, 6750, 'EUR',
    '4 months',
    '2026-06-27',
    'Ukraina Maritime Agency is hiring a 2nd Engineer for a passenger vessel (300 DWT, built 1992). Mixed crew, joining 27 June 2026 for a 4-month contract. Good English required, minimum 3 contracts in rank; passenger vessel and 4-stroke engine experience preferred. Salary €6,750/month plus a €500 rejoining bonus. Apply directly through SeaJobs.pro, mentioning "2/E for Tatyana" — your profile goes straight to the crewing manager.',
    true, true, 'https://ukrcrewing.com.ua/vacancy/352286', 'cv@mau.com.ua'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, source_url, contact_email)
  VALUES (
    v_company_id,
    '3rd Engineer — Passenger Vessel',
    '3rd Engineer',
    'River Cruise',
    4000, 4000, 'EUR',
    '4 months',
    '2026-06-27',
    'Ukraina Maritime Agency is hiring a 3rd Engineer for a passenger vessel (300 DWT, built 1992, Caterpillar main engine). Mixed crew, joining 27 June 2026 for a 4-month contract. Good English required, minimum 2 contracts in rank; passenger vessel and 4-stroke engine experience preferred. Salary €4,000/month plus a €500 rejoining bonus. Apply directly through SeaJobs.pro, mentioning "3/E for Tatyana" — your profile goes straight to the crewing manager.',
    true, true, 'https://ukrcrewing.com.ua/vacancy/352285', 'cv@mau.com.ua'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Global Seaways Odessa' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name) VALUES (v_company_id, 'Global Seaways Odessa');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, source_url, contact_email)
  VALUES (
    v_company_id,
    '2nd Officer — Coaster, Med-Black Sea',
    '2nd Officer',
    'Coaster',
    3200, 3250, 'USD',
    '4 months',
    '2026-06-19',
    'Global Seaways Odessa is recruiting a 2nd Officer for a coaster (2,000 DWT, built 1987, Caterpillar 3512-TA main engine) trading the Mediterranean and Black Sea (excluding Ukraine and Russia). Ukrainian crew, joining 19 June 2026 for a 4-month contract, age limit 65, no visa required. Salary $3,200–3,250/month. Apply directly through SeaJobs.pro, mentioning "Coaster" — your profile goes straight to the crewing manager.',
    true, true, 'https://ukrcrewing.com.ua/vacancy/352280', 'okravets@globalseaways.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Acomarin Odessa Ltd' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name) VALUES (v_company_id, 'Acomarin Odessa Ltd');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, source_url, contact_email)
  VALUES (
    v_company_id,
    'Fitter — Oil Chemical Tanker "Mazu Xiao"',
    'Fitter',
    'Chemical Tanker',
    2015, 2600, 'USD',
    '4 months',
    '2026-06-24',
    'Acomarin Odessa Ltd is recruiting a Fitter for the oil/chemical tanker Mazu Xiao, trading the Mediterranean and Black Sea. Mixed crew (Ukrainian, Georgian, Indonesian, Azerbaijani), joining 24 June 2026 for a 4-month contract. Good English required, minimum 2 contracts in rank, age limit 63. Salary $2,015–2,600/month. Apply directly through SeaJobs.pro — your profile, sea service record and certificates go straight to the crewing manager.',
    true, true, 'https://ukrcrewing.com.ua/vacancy/352278', 'irina.nikonova@lapamarine.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Alpha Crew LTD' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name) VALUES (v_company_id, 'Alpha Crew LTD');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, source_url, contact_email)
  VALUES (
    v_company_id,
    'Chief Officer — PSV (Platform Supply Vessel), Angola',
    'Chief Officer (Chief Mate)',
    'PSV (Platform Supply Vessel)',
    310, 320, 'USD',
    '2-3 months',
    '2026-07-10',
    'Alpha Crew LTD is recruiting a Chief Officer for a Platform Supply/Support Vessel working off Angola. Mixed crew, joining 10 July 2026 for a 2–3 month contract. Good rank experience on PSV DP2 vessels and good English required; DP Unlimited certificate needed. Day rate $310–320. Apply directly through SeaJobs.pro — your profile, sea service record and certificates go straight to the crewing manager.',
    true, true, 'https://ukrcrewing.com.ua/vacancy/352279', 'cv@alphacrew.com'
  );
END $$;
