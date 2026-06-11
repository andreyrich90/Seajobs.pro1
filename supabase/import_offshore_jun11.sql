-- 7 offshore vacancies imported from a Telegram crewing channel, with
-- original descriptions and direct apply-by-email (contact_email).
-- Run this whole script once in the Supabase SQL Editor.

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OJ Crew' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OJ Crew', 'International');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'AB (CROP) — Construction Support Vessel, US Offshore Wind',
    'AB (Able Seaman)',
    'Construction Support Vessel',
    NULL, NULL, 'USD',
    '6 weeks',
    '2026-07-17',
    'OJ Crew is hiring AB / CROP-qualified candidates for a Construction Support Vessel working on US offshore wind projects. Joining 17 July 2026 for a 6-week rotation, rate negotiable. Requirements: valid rank-related STCW certificates, CROP Stage 3, a valid Medical Certificate, good English, a US visa with annotation for transit/travel to the OCS for wind activities, BOSIET, CA-EBS and the GWO Sea Survival module. Apply directly through SeaJobs.pro — your CV and certificates go straight to the crewing manager.',
    true, true, 'oil@ojcrew.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Select Offshore' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Select Offshore', 'International');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'AB — Jack-Up Rig, EU',
    'AB (Able Seaman)',
    'Jack-Up Rig',
    NULL, NULL, 'USD',
    '5 weeks',
    '2026-07-15',
    'Select Offshore is recruiting an AB for a jack-up rig operating in EU waters. Joining 15 July 2026 for 5-week rotations. Requirements: GWO Working at Heights, HUET, Chester Step test, and a valid UK work permit. Apply directly through SeaJobs.pro — your profile is sent straight to the crewing desk.',
    true, true, 'alfie.smart@selectoffshore.com'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    '2nd/3rd Engineer — OSV, Urgent Short Notice',
    '2nd Engineer',
    'PSV (Platform Supply Vessel)',
    NULL, NULL, 'USD',
    '4 weeks',
    '2026-06-12',
    'Select Offshore has an urgent short-notice opening for a 2nd/3rd Engineer on an OSV — mobilisation tonight or tomorrow morning. 4-week rotation. Ideal for candidates who can travel on very short notice and hold valid STCW certification. Apply directly through SeaJobs.pro — your profile is forwarded immediately to the crewing manager.',
    true, true, 'fin.maguire@selectoffshore.com'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    '4th Engineer — MPSV, Caribbean (Curaçao)',
    '4th Engineer',
    'Construction Support Vessel',
    NULL, NULL, 'USD',
    '5 weeks',
    '2026-06-11',
    'Select Offshore has an opening for a 4th Engineer on a CL MPSV based in Curaçao. Joining 11 June 2026 for a 5-week rotation. Requirements: High Voltage training and Basic Safety Training (STCW). Apply directly through SeaJobs.pro — your profile is sent straight to the crewing manager.',
    true, true, 'saxon.shine@selectoffshore.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'EDT Offshore' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'EDT Offshore', 'Aberdeen, United Kingdom');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    '2nd Officer / DPO — MPSV, North Europe (Aberdeen)',
    'DPO (Dynamic Positioning Operator)',
    'Construction Support Vessel',
    NULL, NULL, 'USD',
    NULL,
    '2026-06-12',
    'EDT Offshore is looking for an experienced 2nd Officer / DPO to join an MPSV on North Europe projects, based out of Aberdeen, Scotland. Start date ASAP. Previous ROV experience and a valid UK work permit are required. Apply directly through SeaJobs.pro — your CV and cover letter go straight to the crewing manager.',
    true, true, 'crewing@edtoffshore.com'
  );
END $$;

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'TOS People' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'TOS People', 'International');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Steward/Stewardess — Rock Installation Vessel (DP2), Europe',
    'Messman / Steward',
    'Construction Support Vessel',
    NULL, NULL, 'USD',
    '6 weeks on / 6 weeks off',
    '2026-06-17',
    'TOS People is recruiting a Steward/Stewardess for a DP2 Fall Pipe Rock Installation Vessel operating in European waters. Joining 17 June 2026 for a 6 weeks on / 6 weeks off rotation, Polish contract. Apply directly through SeaJobs.pro — your profile is sent straight to the crewing manager.',
    true, true, 'info.poland@tospeople.com'
  );

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  VALUES (
    v_company_id,
    'Master — ASD Tug & Barge, Gabon',
    'Master (Captain)',
    'Tug',
    NULL, NULL, 'USD',
    '8 weeks on / 8 weeks off',
    '2026-06-22',
    'TOS People urgently requires a Master with ASD tug and barge towing experience for operations in Gabon. Joining 22 June 2026 for an 8 weeks on / 8 weeks off rotation. Apply directly through SeaJobs.pro — your CV is sent straight to the crewing manager.',
    true, true, 'alyona@tospeople.com'
  );
END $$;
