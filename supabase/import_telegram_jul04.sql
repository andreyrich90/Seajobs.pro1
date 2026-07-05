-- Vacancies from Telegram crewing channels (04.07.2026).
-- One recurring vacancy is REFRESHED (Viking Passama Master); the rest are new,
-- each with a unique description. Existing companies reused via ILIKE.
-- Idempotent — safe to re-run. Run this whole script once in the Supabase SQL Editor.

-- ── Refresh recurring vacancy ────────────────────────────────────────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, joining_date = '2026-07-25'
  WHERE title = 'Master — Car Carrier PCTC (Viking Passama), Worldwide';

-- ── Worldwide Recruitment Solutions (new company) — two offshore roles ───────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Worldwide Recruitment Solutions' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Worldwide Recruitment Solutions', 'United Kingdom');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Storekeeper — Pipe Layer Vessel, Norway (2 weeks)', 'Store Keeper', 'Pipe Layer', NULL, NULL, 'EUR', '2 weeks', NULL,
'Worldwide Recruitment Solutions (WRS) is looking for a Storekeeper to join a pipe-laying vessel operating in Norway. Short 2-week assignment, joining ASAP — a good fit between contracts or as a first step into the offshore sector.

## Requirements
- valid STCW certificates and medical
- BOSIET
- seaman''s book and passport

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'isabelle.j@worldwide-rs.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Storekeeper — Pipe Layer Vessel, Norway (2 weeks)');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Steward — Cable Lay Vessel (2 positions), Netherlands', 'Steward / Stewardess', 'Cable Layer', NULL, NULL, 'EUR', '2 months', '2026-07-06',
'Worldwide Recruitment Solutions (WRS) is recruiting two Stewards for a cable-laying vessel working out of the Netherlands. 2-month contract, joining 6 July 2026. Offshore catering experience is a strong plus — the GWO set below is mandatory.

## Requirements
- STCW certificates and valid medical
- Food Hygiene Certificate
- HUET CA-EBS
- GWO Manual Handling and GWO Boat Transfer (or GWO Sea Survival)
- passport and seaman''s book

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'ruel.b@worldwide-rs.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Steward — Cable Lay Vessel (2 positions), Netherlands');
END $$;

-- ── TOS People — drill ship DPO + MPSV crane operator ────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'TOS People' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'TOS People', 'International');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer DPO — Drill Ship (Full DP), 4 weeks', 'DPO (Dynamic Positioning Operator)', 'Drillship', NULL, NULL, 'USD', '4 weeks', '2026-07-06',
'TOS People is looking for a 2nd Officer DPO to join a drill ship. Start 6 July 2026 for a 4-week trip — a rare short rotation in the drilling segment for a DPO with a full (unlimited) certificate.

## Requirements
- Full DP (Unlimited) certificate
- valid STCW documentation
- BOSIET + CA-EBS

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'Y.Shabatura@tospeople.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer DPO — Drill Ship (Full DP), 4 weeks');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Crane Operator (Stage 3) / AB — MPSV, Europe', 'Crane Operator (Offshore)', 'MPSV', NULL, NULL, 'EUR', '6 weeks ± 1', NULL,
'TOS People is urgently recruiting a Crane Operator (Stage 3) / AB for a multipurpose support vessel (MPSV) working in Europe. Joining ASAP, 6-week (±1) contract. For non-EU candidates a valid Schengen visa is a must; DSV (dive support) experience is highly valued.

## Requirements
- Crane Operator Stage 3 certificate
- AB certificate and valid STCW documentation
- valid Schengen visa (for non-EU candidates)
- DSV experience preferred

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info.poland@tospeople.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Crane Operator (Stage 3) / AB — MPSV, Europe');
END $$;

-- ── STMA Group (new company) — Greek bulk carrier fleet, 7 roles ─────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'STMA Group' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'STMA Group', 'Athens, Greece');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Master — Bulk Carrier (Theodoros P / Prigipos), Worldwide', 'Master', 'Bulk Carrier', 10300, 10500, 'USD', '4 months ± 2', '2026-07-15',
'STMA crewing is recruiting Masters for the bulk carriers Theodoros P and Prigipos trading worldwide. July joining, 4-month (±2) contract, 10,300-10,500 USD/month plus a 700 USD/month retention bonus. A well-run Greek fleet with steady rotations for candidates who stay with the owner.

## Requirements
- experience in rank on bulk carriers
- valid STCW certificates and travel documents
- good English and positive references from previous employers

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'europe@stma-group.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Master — Bulk Carrier (Theodoros P / Prigipos), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — Bulk Carrier (Pergamos / Nea Ionia), Worldwide', 'Chief Engineer', 'Bulk Carrier', 10300, 10500, 'USD', '4 months ± 2', '2026-07-15',
'STMA crewing needs Chief Engineers for the bulk carriers Pergamos and Nea Ionia, worldwide trading. Joining in July, 4-month (±2) contract, 10,300-10,500 USD/month plus a 700 USD/month retention bonus paid for continued cooperation.

## Requirements
- experience as C/E on bulk carriers
- valid STCW certificates and travel documents
- good English and positive references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'europe@stma-group.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — Bulk Carrier (Pergamos / Nea Ionia), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Bulk Carrier (Zorbas / Aris T), Worldwide', 'Chief Officer (Chief Mate)', 'Bulk Carrier', 8300, 8500, 'USD', '4 months ± 2', '2026-07-15',
'STMA crewing is looking for Chief Officers for the bulk carriers Zorbas and Aris T trading worldwide. July start, 4-month (±2) contract, 8,300-8,500 USD/month plus a 400 USD/month retention bonus. Solid cargo-work experience on bulkers is what the owner values most.

## Requirements
- experience in rank on bulk carriers
- valid STCW certificates and travel documents
- good English and positive references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'europe@stma-group.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Bulk Carrier (Zorbas / Aris T), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Bulk Carrier (Cyclades / Maria Maria), Worldwide', '2nd Engineer', 'Bulk Carrier', 8300, 8500, 'USD', '4 months ± 2', '2026-07-15',
'STMA crewing is recruiting 2nd Engineers for the bulk carriers Cyclades and Maria Maria, worldwide trading area. Joining in July, 4-month (±2) contract, 8,300-8,500 USD/month plus a 400 USD/month retention bonus.

## Requirements
- experience as 2/E on bulk carriers
- valid STCW certificates and travel documents
- good English and positive references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'europe@stma-group.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Bulk Carrier (Cyclades / Maria Maria), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer — Bulk Carrier (Nea Ionia / Pegasos), Worldwide', '2nd Officer', 'Bulk Carrier', 4200, 4400, 'USD', '4 months ± 2', '2026-07-15',
'STMA crewing is looking for 2nd Officers for the bulk carriers Nea Ionia and Pegasos trading worldwide. July joining, 4-month (±2) contract, 4,200-4,400 USD/month. A good step for a 3rd Officer moving up with bulker experience.

## Requirements
- experience in rank (bulk carrier experience preferred)
- valid STCW certificates and travel documents
- good English and positive references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'europe@stma-group.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer — Bulk Carrier (Nea Ionia / Pegasos), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — Bulk Carrier (Faneromeni / Kydonia), Worldwide', '3rd Engineer', 'Bulk Carrier', 4200, 4400, 'USD', '4 months ± 2', '2026-07-15',
'STMA crewing is recruiting 3rd Engineers for the bulk carriers Faneromeni and Kydonia, worldwide trading. Joining in July, 4-month (±2) contract, 4,200-4,400 USD/month within a stable Greek fleet.

## Requirements
- experience as 3/E (bulk carrier experience preferred)
- valid STCW certificates and travel documents
- good English and positive references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'europe@stma-group.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — Bulk Carrier (Faneromeni / Kydonia), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'ETO — Bulk Carrier (Agia Sofia I / Aris T), Worldwide', 'ETO (Electro-Technical Officer)', 'Bulk Carrier', 6500, NULL, 'USD', '4 months ± 2', '2026-07-15',
'STMA crewing is looking for Electro-Technical Officers for the bulk carriers Agia Sofia I and Aris T trading worldwide. July joining, 4-month (±2) contract, 6,500 USD/month. Hands-on electrical and automation work across a modern bulker fleet.

## Requirements
- experience as ETO / electrician on merchant vessels
- valid STCW certificates and travel documents
- good English and positive references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'europe@stma-group.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'ETO — Bulk Carrier (Agia Sofia I / Aris T), Worldwide');
END $$;

-- ── Alpha Marine Service (new company) — full crew for GC 12,000 DWT ─────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Alpha Marine Service' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Alpha Marine Service', 'Odesa, Ukraine');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — General Cargo (12,000 DWT, Pielstick), Ukrainians Only', 'Chief Engineer', 'General Cargo', 6800, 7400, 'USD', '6 months ± 1', '2026-07-20',
'Alpha Marine Service URGENTLY needs a Chief Engineer for a general cargo vessel (12,000 DWT, built 2009, main engine Pielstick 6PC2-6). Start in position, joining mid/end July 2026, 6-month (±1) contract, 6,800-7,400 USD/month. Ukrainian crew only.

## Requirements
- experience as C/E, Pielstick engine experience is a plus
- Ukrainian citizenship
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@alphamarineservice.com.ua'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — General Cargo (12,000 DWT, Pielstick), Ukrainians Only');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — General Cargo (12,000 DWT), Ukrainians Only', 'Chief Officer (Chief Mate)', 'General Cargo', 5000, 5500, 'USD', '6 months ± 1', '2026-07-20',
'Alpha Marine Service is recruiting a Chief Officer for a general cargo vessel (12,000 DWT, built 2009). Start in position, joining mid/end July 2026, 6-month (±1) contract, 5,000-5,500 USD/month. Ukrainian crew only.

## Requirements
- experience in rank on general cargo vessels
- Ukrainian citizenship
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@alphamarineservice.com.ua'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — General Cargo (12,000 DWT), Ukrainians Only');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer — General Cargo (12,000 DWT), Ukrainians Only', '2nd Officer', 'General Cargo', 2800, 3200, 'USD', '6 months ± 1', '2026-07-20',
'Alpha Marine Service is looking for a 2nd Officer for a general cargo vessel (12,000 DWT, built 2009). Joining mid/end July 2026, 6-month (±1) contract, 2,800-3,200 USD/month. Ukrainian crew only — start in position.

## Requirements
- experience in rank
- Ukrainian citizenship
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@alphamarineservice.com.ua'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer — General Cargo (12,000 DWT), Ukrainians Only');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer — General Cargo (12,000 DWT), Ukrainians Only', '3rd Officer', 'General Cargo', 2500, 2700, 'USD', '6 months ± 1', '2026-07-20',
'Alpha Marine Service is recruiting a 3rd Officer for a general cargo vessel (12,000 DWT, built 2009). Joining mid/end July 2026, 6-month (±1) contract, 2,500-2,700 USD/month. Ukrainian crew only — a good chance for a junior officer to build sea time.

## Requirements
- experience in rank welcome
- Ukrainian citizenship
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@alphamarineservice.com.ua'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer — General Cargo (12,000 DWT), Ukrainians Only');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — General Cargo (12,000 DWT, Pielstick), Ukrainians Only', '2nd Engineer', 'General Cargo', 4500, 4800, 'USD', '6 months ± 1', '2026-07-20',
'Alpha Marine Service is looking for a 2nd Engineer for a general cargo vessel (12,000 DWT, built 2009, Pielstick 6PC2-6 main engine). Joining mid/end July 2026, 6-month (±1) contract, 4,500-4,800 USD/month. Ukrainian crew only.

## Requirements
- experience as 2/E, medium-speed engine experience is a plus
- Ukrainian citizenship
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@alphamarineservice.com.ua'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — General Cargo (12,000 DWT, Pielstick), Ukrainians Only');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Electrician — General Cargo (12,000 DWT), Ukrainians Only', 'Electrician', 'General Cargo', 3300, NULL, 'USD', '6 months ± 1', '2026-07-20',
'Alpha Marine Service is recruiting an Electrician for a general cargo vessel (12,000 DWT, built 2009). Joining mid/end July 2026, 6-month (±1) contract, 3,300 USD/month. Ukrainian crew only.

## Requirements
- experience as ship''s electrician
- Ukrainian citizenship
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@alphamarineservice.com.ua'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Electrician — General Cargo (12,000 DWT), Ukrainians Only');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Cook — General Cargo (12,000 DWT), Ukrainians Only', 'Chief Cook / Cook', 'General Cargo', 2100, 2300, 'USD', '6 months ± 1', '2026-07-20',
'Alpha Marine Service is looking for a Cook for a general cargo vessel (12,000 DWT, built 2009) with a Ukrainian crew. Joining mid/end July 2026, 6-month (±1) contract, 2,100-2,300 USD/month. Cooking for a compact crew — home-style menu.

## Requirements
- experience as ship''s cook
- Ukrainian citizenship
- valid STCW documentation and health certificate

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@alphamarineservice.com.ua'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Cook — General Cargo (12,000 DWT), Ukrainians Only');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB — General Cargo (12,000 DWT), Ukrainians Only', 'AB (Able Seaman)', 'General Cargo', 1400, 1480, 'USD', '6 months ± 1', '2026-07-20',
'Alpha Marine Service is recruiting an Able Seaman for a general cargo vessel (12,000 DWT, built 2009). Joining mid/end July 2026, 6-month (±1) contract, 1,400-1,480 USD/month. Ukrainian crew only — standard deck watch and maintenance duties.

## Requirements
- AB certificate (STCW II/5 or II/4)
- Ukrainian citizenship
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@alphamarineservice.com.ua'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB — General Cargo (12,000 DWT), Ukrainians Only');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'OS — General Cargo (12,000 DWT), Ukrainians Only', 'OS (Ordinary Seaman)', 'General Cargo', 1300, 1380, 'USD', '6 months ± 1', '2026-07-20',
'Alpha Marine Service is looking for an Ordinary Seaman for a general cargo vessel (12,000 DWT, built 2009). Joining mid/end July 2026, 6-month (±1) contract, 1,300-1,380 USD/month. Ukrainian crew only — a solid entry position to build deck sea time.

## Requirements
- basic STCW certificates
- Ukrainian citizenship

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@alphamarineservice.com.ua'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'OS — General Cargo (12,000 DWT), Ukrainians Only');
END $$;
