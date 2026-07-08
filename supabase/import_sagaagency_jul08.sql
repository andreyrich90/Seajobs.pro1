-- Vacancies from Saga Agency (sagaagency.com, Klaipeda, Lithuania) — 08.07.2026.
-- All new (agency not previously on the board). Descriptions are fuller than
-- earlier imports: role intro + full vessel particulars + requirements.
-- Idempotent — inserts guarded by title. Run once in the Supabase SQL Editor.

DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Saga Agency' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Saga Agency', 'Klaipeda, Lithuania');
  END IF;

  -- 1. 3rd Engineer — Chemical / Oil Tanker (Faroe Islands)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — Chemical / Oil Tanker (Faroe Islands, 3,499 DWT), Europe', '3rd Engineer', 'Chemical / Oil Tanker', 4316, NULL, 'USD', '3 months (± 1 month)', '2026-07-15',
'Saga Agency is recruiting a 3rd Engineer for a modern chemical / oil products tanker trading within Europe. This is a compact, well-maintained coastal tanker with a Hanshin main engine — a good fit for an engineer who wants hands-on watchkeeping and maintenance on a smaller, efficient plant. Embarkation 15 July 2026, 3-month contract (± 1 month), 4,316 USD/month.

## Vessel particulars
- Type: chemical / oil products tanker
- Flag: Faroe Islands, built 2015
- GRT / DWT: 2,801 / 3,499
- Main engine: Hanshin, 2,427 kW
- Sailing area: Europe

## Requirements
- valid Certificate of Competency for 3rd Engineer and full STCW documentation
- valid tanker endorsements (Basic / Advanced Chemical & Oil Tanker training)
- good working English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — Chemical / Oil Tanker (Faroe Islands, 3,499 DWT), Europe');

  -- 2. AB — Chemical / Oil Tanker (Denmark)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB (EU citizen) — Chemical / Oil Tanker (Denmark, 11,505 DWT), Europe', 'AB (Able Seaman)', 'Chemical / Oil Tanker', 2482, NULL, 'EUR', '6 weeks (± 2 weeks)', '2026-07-10',
'Saga Agency is looking for an Able Seaman (EU citizen) to join a Danish-flag chemical / oil products tanker trading in European waters. Short, steady 6-week rotations make this a comfortable option for seafarers who prefer to stay close to home. Embarkation 10 July 2026, 6-week contract (± 2 weeks), 2,482 EUR/month.

## Vessel particulars
- Type: chemical / oil products tanker
- Flag: Denmark, built 2007
- GRT / DWT: 8,195 / 11,505
- Sailing area: Europe

## Requirements
- citizen of the European Union
- valid AB Certificate and full STCW documentation
- valid tanker endorsements (Basic Chemical & Oil Tanker training)
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB (EU citizen) — Chemical / Oil Tanker (Denmark, 11,505 DWT), Europe');

  -- 3. Bosun — Chemical / Oil Tanker (Denmark)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Bosun (EU citizen) — Chemical / Oil Tanker (Denmark, 11,505 DWT), Europe', 'Bosun', 'Chemical / Oil Tanker', 3412, NULL, 'EUR', '6 weeks (± 2 weeks)', '2026-07-10',
'Saga Agency is recruiting a Bosun (EU citizen) for a Danish-flag chemical / oil products tanker operating in Europe. You will lead the deck crew, plan and supervise deck maintenance and mooring operations, and work closely with the Chief Officer. Short 6-week rotations, embarkation 10 July 2026, 6-week contract (± 2 weeks), 3,412 EUR/month.

## Vessel particulars
- Type: chemical / oil products tanker
- Flag: Denmark, built 2007
- GRT / DWT: 8,195 / 11,505
- Sailing area: Europe

## Requirements
- citizen of the European Union
- experience as Bosun on tankers, full STCW documentation
- valid tanker endorsements (Basic Chemical & Oil Tanker training)
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Bosun (EU citizen) — Chemical / Oil Tanker (Denmark, 11,505 DWT), Europe');

  -- 4. OS — Tug Boat (Sweden)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'OS (EU citizen) — Tug Boat (Sweden), Northern Sweden', 'OS (Ordinary Seaman)', 'Tug', 2500, NULL, 'USD', '3 months', '2026-07-11',
'Saga Agency is recruiting an Ordinary Seaman (EU citizen) for a Swedish-flag tug boat working in Northern Sweden. A good entry-level deck position on a small, close-knit crew, with plenty of hands-on seamanship and towage work. Embarkation 11 July 2026, 3-month contract, 2,500 USD/month.

## Vessel particulars
- Type: tug boat
- Flag: Sweden
- GRT: 269
- Sailing area: Northern Sweden

## Requirements
- citizen of the European Union
- valid STCW documentation (Basic Safety Training)
- willingness to work on deck in a small crew
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'OS (EU citizen) — Tug Boat (Sweden), Northern Sweden');

  -- 5. Chief Engineer — Chemical / Oil Tanker (Cyprus)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer (EU citizen) — Chemical / Oil Tanker (Cyprus, 2,802 DWT), Europe', 'Chief Engineer', 'Chemical / Oil Tanker', 10700, NULL, 'USD', '2 months', NULL,
'Saga Agency is recruiting a Chief Engineer (EU citizen) for a Cyprus-flag chemical / oil products tanker trading in Europe. You will take full charge of the engine department on a compact Wartsila plant, ideal for a Chief who values a short contract and a manageable, modern machinery space. 2-month contract, joining soonest, 10,700 USD/month.

## Vessel particulars
- Type: chemical / oil products tanker
- Flag: Cyprus, built 2000
- GRT / DWT: 1,845 / 2,802
- Main engine: Wartsila, 1,320 kW
- Sailing area: Europe

## Requirements
- citizen of the European Union
- valid Certificate of Competency for Chief Engineer and full STCW documentation
- valid tanker endorsements (Advanced Chemical & Oil Tanker training)
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer (EU citizen) — Chemical / Oil Tanker (Cyprus, 2,802 DWT), Europe');

  -- 6. 2nd Officer — Chemical / Oil Tanker (Malta)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer (EU citizen) — Chemical / Oil Tanker (Malta, 3,569 DWT), Europe', '2nd Officer', 'Chemical / Oil Tanker', 5454, NULL, 'USD', '6 weeks', NULL,
'Saga Agency is looking for a 2nd Officer (EU citizen) for a Malta-flag chemical / oil products tanker trading Europe. As navigation officer you will handle passage planning, ECDIS and cargo watch duties on a modern coastal tanker with short 6-week rotations. Joining soonest, 6-week contract, 5,454 USD/month.

## Vessel particulars
- Type: chemical / oil products tanker
- Flag: Malta, built 2007
- GRT / DWT: 2,999 / 3,569
- Sailing area: Europe

## Requirements
- citizen of the European Union
- valid Certificate of Competency for 2nd/OOW and full STCW documentation
- valid tanker endorsements (Basic Chemical & Oil Tanker training)
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer (EU citizen) — Chemical / Oil Tanker (Malta, 3,569 DWT), Europe');

  -- 7. Chief Officer — Chemical / Oil Tanker (Belize)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer (EU citizen) — Chemical / Oil Tanker (Belize, 23,433 DWT), Worldwide', 'Chief Officer (Chief Mate)', 'Chemical / Oil Tanker', 9585, NULL, 'USD', '2-3 months', NULL,
'Saga Agency is recruiting a Chief Officer (EU citizen) for a larger chemical / oil products tanker trading worldwide. This is the biggest tanker in the current Saga line-up (23,433 DWT), giving the Chief Mate full responsibility for cargo operations, stability and deck management on worldwide trade. 2-3 month contract, joining soonest, 9,585 USD/month.

## Vessel particulars
- Type: chemical / oil products tanker
- Flag: Belize, built 1992
- GRT / DWT: 14,332 / 23,433
- Sailing area: worldwide

## Requirements
- citizen of the European Union
- valid Certificate of Competency for Chief Officer and full STCW documentation
- valid tanker endorsements (Advanced Chemical & Oil Tanker training)
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer (EU citizen) — Chemical / Oil Tanker (Belize, 23,433 DWT), Worldwide');

  -- 8. AB — Reefer (NIS)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB (Forklift) — Reefer (NIS Flag, 3,543 DWT), Europe / Worldwide', 'AB (Able Seaman)', 'Reefer', 2560, NULL, 'USD', '3 months (± 1 month)', NULL,
'Saga Agency is recruiting an Able Seaman for a NIS-flag reefer (refrigerated cargo) vessel trading Europe and worldwide. Reefer trade means active cargo handling in port, so forklift skills are a real advantage here. Joining as soon as possible, 3-month contract (± 1 month), 2,560 USD/month.

## Vessel particulars
- Type: reefer (refrigerated cargo vessel)
- Flag: NIS (Norwegian International Register), built 1990
- GRT / DWT: 3,625 / 3,543
- Sailing area: Europe, worldwide

## Requirements
- valid AB Certificate and full STCW documentation
- experience with forklift operation is required
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB (Forklift) — Reefer (NIS Flag, 3,543 DWT), Europe / Worldwide');

  -- 9. Motorman — General Cargo (Cyprus)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Motorman (EU citizen) — General Cargo (Cyprus, 4,450 DWT), Europe', 'Motorman', 'General Cargo', 3200, NULL, 'EUR', '3 months (± 2 weeks)', '2026-08-11',
'Saga Agency is recruiting a Motorman (EU citizen) for a Cyprus-flag general cargo vessel trading Europe. You will support the engineers in the daily running and maintenance of a MAK main engine on a small, friendly 7-person crew. Embarkation 11 August 2026, 3-month contract (± 2 weeks), 3,200 EUR/month.

## Vessel particulars
- Type: general cargo
- Flag: Cyprus, built 2009
- GRT / DWT: 2,967 / 4,450
- Main engine: MAK, 1,980 kW
- Sailing area: Europe

## Requirements
- citizen of the European Union
- valid STCW documentation and engine-rating certification
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Motorman (EU citizen) — General Cargo (Cyprus, 4,450 DWT), Europe');

  -- 10. Motorman — Tug Boat (St Vincent)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Motorman — Tug Boat (St Vincent), Europe', 'Motorman', 'Tug', 2300, NULL, 'EUR', '3 months', '2026-07-23',
'Saga Agency is recruiting a Motorman for a Saint Vincent and the Grenadines flag tug boat working in Europe. A hands-on engine-room role on a classic, compact tug with a Ruston main engine — well suited to a motorman who likes practical maintenance work. Embarkation 23 July 2026, 3-month contract, 2,300 EUR/month.

## Vessel particulars
- Type: tug boat
- Flag: Saint Vincent and the Grenadines, built 1986
- GRT / DWT: 259 / 125
- Main engine: Ruston, 2,304 kW
- Sailing area: Europe

## Requirements
- valid STCW documentation and engine-rating certification
- tug / workboat experience welcome
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Motorman — Tug Boat (St Vincent), Europe');

  -- 11. Chief Officer — Tug Boat (St Vincent)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Tug Boat (St Vincent), Europe', 'Chief Officer (Chief Mate)', 'Tug', 5000, NULL, 'EUR', '3 months (± 2 weeks)', '2026-07-23',
'Saga Agency is recruiting a Chief Officer for a Saint Vincent and the Grenadines flag tug boat operating in Europe. The role suits an officer with towage / workboat background; the position can also be filled as Officer in Charge (C-TE). Embarkation 23 July 2026, 3-month contract (± 2 weeks), 5,000 EUR/month.

## Vessel particulars
- Type: tug boat
- Flag: Saint Vincent and the Grenadines, built 1986
- GRT / DWT: 259 / 125
- Sailing area: Europe

## Requirements
- some tug experience is required (may be held as Officer in Charge, C-TE)
- valid Certificate of Competency and full STCW documentation
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Tug Boat (St Vincent), Europe');

  -- 12. Cook / Deck Assistant — General Cargo (Cyprus)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Cook / Deck Assistant (EU citizen) — General Cargo (Cyprus, 4,450 DWT), Europe', 'Chief Cook / Cook', 'General Cargo', 3100, NULL, 'EUR', '3 months on / off', '2026-08-11',
'Saga Agency is recruiting a Cook (EU citizen) for a Cyprus-flag general cargo vessel trading Europe. This is a combined galley-and-deck role — cooking for a small 7-person crew with duties to assist on deck (or an AB with genuine cooking skills). A versatile position for someone who enjoys a dual role on a compact ship. Embarkation 11 August 2026, 3 months on / off, 3,100 EUR/month.

## Vessel particulars
- Type: general cargo
- Flag: Cyprus, built 2009
- GRT / DWT: 2,967 / 4,450
- Crew: 7 on board
- Sailing area: Europe

## Requirements
- citizen of the European Union
- cooking experience plus willingness to assist on deck (or AB with cooking skills)
- valid STCW documentation
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Cook / Deck Assistant (EU citizen) — General Cargo (Cyprus, 4,450 DWT), Europe');

  -- 13. Chief Engineer — General Cargo (Norway)
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — General Cargo (Norway, 4,748 DWT), Europe', 'Chief Engineer', 'General Cargo', 7000, NULL, 'USD', '3 months', '2026-08-01',
'Saga Agency is recruiting a Chief Engineer for a Norway-flag general cargo vessel trading Europe. You will run the engine department on a reliable Deutz plant; strong English and computer skills are important for the reporting and planned-maintenance systems on board. Embarkation 01 August 2026, 3-month contract, 7,000 USD/month.

## Vessel particulars
- Type: general cargo
- Flag: Norway, built 1998
- GRT / DWT: 2,834 / 4,748
- Main engine: Deutz, 2,200 kW
- Sailing area: Europe

## Requirements
- valid Certificate of Competency for Chief Engineer and full STCW documentation
- good English and computer skills (PMS / reporting)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'resources@sagaagency.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — General Cargo (Norway, 4,748 DWT), Europe');
END $$;
