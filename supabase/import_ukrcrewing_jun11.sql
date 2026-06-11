-- 6 more vacancies imported from external crewing sites, with original
-- descriptions and direct apply-by-email (contact_email).
-- Run this whole script once in the Supabase SQL Editor.

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Nika Maritime' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Nika Maritime', 'Ukraine');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    '2nd Officer — General Cargo, Worldwide',
    '2nd Officer',
    'General Cargo',
    3000, NULL, 'USD',
    '4+2 months',
    '2026-06-13',
    'Nika Maritime is recruiting a 2nd Officer for a general cargo vessel (2,287 DWT / 2,042 GT, built 1999, MAN B&W main engine, flag Antigua & Barbuda) trading in the European region. Joining in Belfast, UK, 13–15 June 2026, for a 4+2 month contract. Mixed international crew, excellent English required, minimum 1 contract in rank. Salary from $3,000/month. Apply directly through SeaJobs.pro — your profile, sea service record and certificates will be sent straight to the crewing manager.',
    true, true, 'crew.nikamaritime@gmail.com'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Chief Officer — General Cargo, Worldwide',
    'Chief Officer (Chief Mate)',
    'General Cargo',
    4000, NULL, 'USD',
    '4+2 months',
    '2026-06-19',
    'Nika Maritime has an urgent opening for a Chief Officer on a general cargo vessel (2,287 DWT / 2,042 GT, built 1999, MAN B&W main engine, flag Antigua & Barbuda) trading in the European region. Joining in the Netherlands, 19–21 June 2026, for a 4+2 month contract. Mixed international crew, excellent English required. Salary from $4,000/month. Apply directly through SeaJobs.pro — your profile goes straight to the crewing manager.',
    true, true, 'crew.nikamaritime@gmail.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'MS Crewing' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'MS Crewing', 'Ukraine');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Chief Engineer — General Cargo, Mediterranean',
    'Chief Engineer',
    'General Cargo',
    7000, NULL, 'USD',
    '6 months',
    '2026-06-17',
    'MS Crewing is looking for a Chief Engineer for a general cargo vessel (6,000 DWT, Yanmar main engine, 2,500 kW) trading in the Mediterranean Sea. 6-month contract, joining 17 June 2026. Russian-speaking crew, good English required, age limit 62. Previous experience in rank and on the same vessel type is mandatory. Salary from $7,000/month. Apply directly through SeaJobs.pro — your profile is forwarded straight to the crewing desk.',
    true, true, 'crew@mscrewing.com'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Welder — Bulk Carrier, Worldwide',
    'Fitter Welder',
    'Bulk Carrier (Handysize)',
    2500, NULL, 'USD',
    '6 months',
    '2026-06-16',
    'MS Crewing is recruiting a Welder for a bulk carrier (28,000 DWT, built 2014) trading worldwide. 6-month contract, joining 16 June 2026. All-Ukrainian crew, any level of English accepted, prior welding experience in rank required. Salary from $2,500/month. Apply directly through SeaJobs.pro — your application goes straight to the crewing manager.',
    true, true, 'crew@mscrewing.com'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Ordinary Seaman — Bulk Carrier, Worldwide',
    'OS (Ordinary Seaman)',
    'Bulk Carrier (Handysize)',
    1500, NULL, 'USD',
    '6 months',
    '2026-06-16',
    'MS Crewing has an opening for an Ordinary Seaman on a bulk carrier (28,000 DWT, built 2014) trading worldwide. 6-month contract, joining 16 June 2026. All-Ukrainian crew, any level of English accepted — a great opportunity for newcomers. Salary from $1,500/month. Apply directly through SeaJobs.pro.',
    true, true, 'crew@mscrewing.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Alpha Crew LTD' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Alpha Crew LTD', 'United Kingdom');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    '2nd Officer / DPO — MRSV, North Sea',
    '2nd Officer',
    'Construction Support Vessel',
    NULL, NULL, 'EUR',
    '2 months',
    '2026-06-20',
    'Alpha Crew LTD is hiring a 2nd Officer / DPO for a Multi-Role Support Vessel (MPSV, DP2) operating in the North Sea. 2-month contract, joining 20 June 2026. Mixed international crew, good English required. Previous experience in rank and on the same vessel type is mandatory. Requirements: DP Unlimited certificate, valid UK Work Permit, and ROV / North Sea experience. Day rate €340–350. Apply directly through SeaJobs.pro — your profile is sent straight to the crewing manager.',
    true, true, 'cv@alphacrew.com'
  );
END $$;
