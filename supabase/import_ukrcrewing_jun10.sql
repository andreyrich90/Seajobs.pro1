-- 9 vacancies imported from external crewing sites, with original
-- descriptions and direct apply-by-email (contact_email).
-- Run this whole script once in the Supabase SQL Editor.

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Uniship Crewing LTD' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Uniship Crewing LTD', 'Odessa, Ukraine');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    '2nd Engineer — Dry Cargo Vessel',
    '2nd Engineer',
    'General Cargo',
    4939, NULL, 'USD',
    '6 months',
    '2026-06-10',
    'A reputable crewing agency is looking for an experienced 2nd Engineer to join a dry cargo vessel "Selecta" (built 2007, 14,030 DWT, Pielstick main engine). Mixed international crew. Joining 10 June 2026 for a 6-month contract. Candidates must have a good command of English, at least 3 contracts in rank and 2 contracts on the same vessel type. Salary from $4,939/month. Apply directly through SeaJobs.pro — your profile, sea service record and certificates will be sent straight to the crewing manager.',
    true, true, 'info@uniship-crewing.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Nyki Shipping Odessa' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Nyki Shipping Odessa', 'Odessa, Ukraine');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'AB-Welder — General Cargo, Mediterranean',
    'AB Welder',
    'General Cargo',
    NULL, 1900, 'USD',
    '6 months',
    '2026-06-10',
    'Nyki Shipping Odessa is recruiting an AB-Welder for a general cargo vessel (8,100 DWT) trading in the Mediterranean Sea. All-Ukrainian crew, 6-month contract, joining 10 June 2026. Good command of English and prior welding/AB experience required. Salary up to $1,900/month. Apply through SeaJobs.pro and your CV goes straight to the crewing desk.',
    true, true, 'crew@nykicrew.com'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Engine Cadet — Container, North Sea',
    'Engine Cadet',
    'Container (Feeder)',
    NULL, 500, 'EUR',
    '6 months',
    '2026-06-10',
    'Looking to start your engine career? Nyki Shipping Odessa has an Engine Cadet position open on a container feeder vessel (8,250 DWT, MAK main engine, 3000 kW) operating in the North Sea. Mixed crew (Ukrainian, Russian, Filipino). 6-month contract from 10 June 2026, salary up to €500/month plus onboard training under supervision of senior engineers. Good English required. Send your application directly to the crewing manager via SeaJobs.pro.',
    true, true, 'crew@nykicrew.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Uniteam Marine Limited' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Uniteam Marine Limited', 'Ukraine');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    '3rd Officer — Large Container Vessel',
    '3rd Officer',
    'Container (Post-Panamax)',
    3500, NULL, 'USD',
    '4 months',
    '2026-06-10',
    'Uniteam Marine is hiring a 3rd Officer for a large container vessel (108,771 DWT, built 2010). 4-month contract, joining 10 June 2026. Mixed international crew, good English required. Minimum 3 contracts in rank and 2 on the same vessel type — prior experience on a vessel of similar size/type is mandatory. Salary from $3,500/month. Apply via SeaJobs.pro — your profile is forwarded directly to the crewing department.',
    true, true, 'ukraine@uniteammarine.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Briese Crewing Ukraine' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Briese Crewing Ukraine', 'Odessa, Ukraine');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Chief Engineer — General Cargo, Worldwide',
    'Chief Engineer',
    'General Cargo',
    6000, 7500, 'USD',
    '4 months',
    '2026-06-10',
    'Briese Crewing Ukraine is seeking a Chief Engineer for a general cargo vessel (5,200 DWT, built 2010, MAK main engine, 2000 kW) trading worldwide. 4-month contract starting 10 June 2026. Mixed crew (Ukrainian/Russian/Filipino), good English. Minimum 1 contract in rank required. Salary $6,000–7,500/month depending on experience. Apply directly through SeaJobs.pro.',
    true, true, 'briese.ukraine@gmail.com'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Ordinary Seaman — General Cargo, Worldwide',
    'OS (Ordinary Seaman)',
    'General Cargo',
    1307, NULL, 'USD',
    '6 months',
    '2026-06-10',
    'Briese Crewing Ukraine is recruiting an Ordinary Seaman for a general cargo vessel (3,300 DWT, built 2010), trading worldwide. 6-month contract, joining 10 June 2026. Mixed crew, good English, no prior experience required — a great opportunity for newcomers. Includes extra overtime pay and lashing duties. Salary from $1,307/month. Apply through SeaJobs.pro.',
    true, true, 'briese.ukraine@gmail.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Techmarine Crewing Agency LLC' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Techmarine Crewing Agency LLC', 'Ukraine');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Chief Engineer — Heavy Lift Vessel',
    'Chief Engineer',
    'Heavy Lift / Project Cargo',
    11300, 11800, 'USD',
    '4+ months',
    '2026-06-10',
    'Techmarine Crewing Agency is looking for a Chief Engineer for a heavy lift vessel (32,106 DWT, built 2012, Wartsila 7RT-flex50 main engine, 10,476 kW). 4+ month contract from 10 June 2026, mixed crew, good English. Newcomers to the Chief Engineer rank are welcome to apply with at least 2–3 contracts as 2nd Engineer on similar vessels — Sulzer/Wartsila RT-flex experience is mandatory. Age limit 60. Excellent salary: $11,300–11,800/month. Apply directly through SeaJobs.pro.',
    true, true, 'crew@techmarine.com.ua'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Swan Marine Services' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Swan Marine Services', 'Ukraine');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Master — Kamsarmax Bulk Carrier',
    'Master (Captain)',
    'Bulk Carrier (Panamax)',
    9800, 10000, 'USD',
    '5+/-1 months',
    '2026-06-10',
    'Swan Marine Services is recruiting a Master for a Kamsarmax bulk carrier (82,000 DWT, built 2018, MAN B&W ME main engine, 9,700 kW). Worldwide trading, 5±1 month contract, joining 10 June 2026. Fluent English required, age limit 55. Minimum 5 contracts in rank and on the same vessel type, with previous Master experience on bulkers (at least 4 contracts). Re-joining bonus offered. Only Ukrainian candidates will be considered. Salary $9,800–10,000/month. Apply through SeaJobs.pro.',
    true, true, 'cv@swanmarineservices.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Global Seaways Odessa' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Global Seaways Odessa', 'Odessa, Ukraine');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    '2nd Engineer — Bulk Carrier, No Agency Fee',
    '2nd Engineer',
    'Bulk Carrier (Panamax)',
    8000, NULL, 'USD',
    '4 months',
    '2026-06-13',
    'Global Seaways Odessa has an opening for a 2nd Engineer on a bulk carrier (61,300 DWT, built 2015, MAN B&W ME main engine). 4-month contract, joining 13 June 2026. Mixed crew, any English level accepted. Minimum 2 contracts in rank required. No agency fee. Salary from $8,000/month. Apply directly through SeaJobs.pro — your profile goes straight to the crewing manager.',
    true, true, 'odessa@globalseaways.com'
  );
END $$;
