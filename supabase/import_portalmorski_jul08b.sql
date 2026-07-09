-- Vacancies from crewing.portalmorski.pl (08.07.2026, batch B).
-- Recurring vacancies already on the board are REFRESHED; genuinely new
-- vacancies are inserted (guarded by title). Descriptions are fuller: role
-- intro + vessel particulars + requirements.
-- Idempotent — safe to re-run. Run once in the Supabase SQL Editor.

-- ── Refresh recurring vacancies ─────────────────────────────────────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 8950, currency = 'EUR', joining_date = '2026-07-20'
  WHERE title = 'Master — Bulk Carrier (18,825 GT), Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 2274, currency = 'EUR', joining_date = '2026-07-14'
  WHERE title = 'Chief Cook / Cook — Ro-Pax, EU';

-- ── Inter Marine — 2nd Engineer (Container) + Electrician (Barge Carrier) ────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Inter Marine' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Inter Marine', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Container Ship, Spain / West Africa', '2nd Engineer', 'Container Ship', 8250, NULL, 'USD', '6 weeks', '2026-07-15',
'Inter Marine is recruiting a 2nd Engineer for a container ship trading between Spain and West Africa, joining in the port of Gdynia. There is a genuine promotion path here — a strong 3rd Engineer ready to step up can be considered for the 2nd Engineer position. Short 6-week rotation, joining around 15 July 2026, 8,250 USD/month plus a rejoining bonus of 100 USD on each further contract (up to 1,100 USD).

## Vessel particulars
- Type: container ship
- Joining port: Gdynia
- Sailing area: Spain - West Africa

## Requirements
- valid 2nd Engineer Certificate of Competency (a 3rd Engineer ready for promotion may also apply)
- full STCW documentation
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'crewing@intermarinegroup.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Container Ship, Spain / West Africa');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Electrician / ETO — Barge Carrier, Europe', 'Electrical Officer / ETO', 'Barge Carrier', 251, NULL, 'GBP', '6 weeks', '2026-07-14',
'Inter Marine is recruiting an Electrician for a barge carrier operating in Europe. This can be filled by a regular Electrician — an ETO certificate is not required — making it a good option for electricians looking to move into the offshore/heavy-lift sector. The crew on board is international (Portuguese, Romanian, Latvian and Polish, plus one South African). 6-week contract (14 July to 25 August 2026), joining soon, 251.33 GBP/day.

## Vessel particulars
- Type: barge carrier
- Crew: mixed nationalities
- Sailing area: Europe

## Requirements
- qualified marine Electrician (ETO not mandatory)
- valid STCW documentation
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'crewing@intermarinegroup.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Electrician / ETO — Barge Carrier, Europe');
END $$;

-- ── Nova Ship Crew Poland — Cook, General Cargo ─────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Nova Ship Crew Poland' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Nova Ship Crew Poland', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Cook — General Cargo / MPP (6,770 GT), Europe / Mediterranean', 'Chief Cook / Cook', 'General Cargo', 3000, NULL, 'EUR', '2-3 months', '2026-07-15',
'Nova Ship Crew Poland is recruiting a Cook for a general cargo / MPP vessel trading Europe and the Mediterranean Sea. You will cater for a compact 17-person Polish / EU crew. Direct employment through the owner''s office — no agencies, with all contractual and payroll matters handled by the owner and medical insurance including family. 2-3 month contract, joining mid July 2026, 3,000 EUR/month (negotiable).

## Vessel particulars
- Type: general cargo / MPP
- Size: 6,770 GT
- Crew: 17 on board (Polish / EU)
- Sailing area: Europe / Mediterranean Sea

## Requirements
- experience as ship''s Cook
- valid STCW documentation and Food Handling / Ship''s Cook certificate
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info@novashipcrewpoland.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Cook — General Cargo / MPP (6,770 GT), Europe / Mediterranean');
END $$;

-- ── Manx Ocean Crewing (new company) — Chief Officer, General Cargo ─────────
-- No application e-mail was published for this offer; office phone +44 1624 834 100.
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Manx Ocean Crewing' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location, website) VALUES (v_company_id, 'Manx Ocean Crewing', 'Isle of Man, British Isles', 'http://www.navalis.com');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — General Cargo (Latvian Flag, 3,789 DWT), Northern Europe', 'Chief Officer (Chief Mate)', 'General Cargo', 6000, NULL, 'USD', '4 months', '2026-07-01',
'Manx Ocean Crewing is recruiting a Chief Officer for a small general cargo vessel trading the Northern Europe region. A good role for an officer comfortable on a compact ship with a small, mixed-nationality crew. 4-month contract, joining 01 July 2026, salary negotiable depending on experience — from 6,000 USD/month.

## Vessel particulars
- Type: general cargo
- Flag: Latvia, built 1998
- GRT / DWT: 2,780 / 3,789
- Navigation: eGlobe 2 ECDIS
- Crew: 8 in total, mixed nationalities
- Sailing area: Northern Europe

## Requirements
- experience as Chief Officer on general cargo vessels
- experience sailing with a small crew complement and mixed nationalities
- valid Certificate of Competency and full STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your application is forwarded straight to the crewing manager. Office: +44 1624 834 100 · www.navalis.com', true, true, NULL
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — General Cargo (Latvian Flag, 3,789 DWT), Northern Europe');
END $$;

-- ── Dohle Marine Services Europe — Container m/v Rita (2 ranks) ──────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Dohle Marine Services Europe' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Dohle Marine Services Europe', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Container Ship (m/v Rita), Europe', 'Chief Officer (Chief Mate)', 'Container Ship', 8600, NULL, 'USD', '4 months', '2026-11-15',
'Dohle Marine Services Europe is recruiting a Chief Officer for the container ship m/v Rita, a Szczecin-built panamax-class box ship trading in Europe. This is a large, well-equipped vessel (2,785 TEU, 432 reefer plugs) offering the Chief Mate full cargo and deck responsibility. 4-month contract, joining 15 November 2026, 8,600 USD/month.

## Vessel particulars
- Type: container ship
- IMO: 9301988, built at Szczecin Shipyard
- GRT / DWT: 32,903 / 37,213
- Capacity: 2,785 TEU, 432 reefer plugs
- Main engine: MAN B&W 7K80MC-C-MK6, 26,270 kW
- Sailing area: Europe

## Requirements
- experience as Chief Officer on container ships
- full STCW documentation
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Container Ship (m/v Rita), Europe');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Container Ship (m/v Rita), Europe', '2nd Engineer', 'Container Ship', 8600, NULL, 'USD', '4 months', '2026-11-03',
'Dohle Marine Services Europe is recruiting a 2nd Engineer for the container ship m/v Rita trading Europe. You will run the day-to-day operation and maintenance of a large MAN B&W 7K80MC-C-MK6 main engine and its auxiliaries on a modern panamax-class box ship. 4-month contract, joining 03 November 2026, 8,600 USD/month.

## Vessel particulars
- Type: container ship
- IMO: 9301988, built at Szczecin Shipyard
- GRT / DWT: 32,903 / 37,213
- Capacity: 2,785 TEU, 432 reefer plugs
- Main engine: MAN B&W 7K80MC-C-MK6, 26,270 kW
- Sailing area: Europe

## Requirements
- experience as 2nd Engineer on motor vessels
- full STCW documentation
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Container Ship (m/v Rita), Europe');
END $$;

-- ── Wilhelmsen Marine Personnel — Technical Assistant, offshore HVDC platform ─
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Wilhelmsen Marine Personnel' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Wilhelmsen Marine Personnel', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Technical Assistant — HVDC Offshore Platform (DolWin Epsilon), North Sea', 'Technical Assistant', 'Offshore Platform', 6693, NULL, 'EUR', '2 weeks on / 2 weeks off', '2026-07-15',
'Wilhelmsen Marine Personnel is recruiting a Technical Assistant for the HVDC offshore converter platform DolWin Epsilon in the North Sea. This is a great step for a junior officer or engineer (2nd Officer / 3rd Engineer background) who wants to move into the offshore wind-energy sector on a comfortable 2-and-2 rotation. Joining 15 July 2026, 6,693 EUR/month (basic 4,968 EUR + 115 EUR offshore allowance per day on board, 42% tax).

## Vessel particulars
- Type: HVDC offshore converter platform (DolWin Epsilon)
- Sailing area: North Sea
- Rotation: 2 weeks on / 2 weeks off

## Requirements
- background as 2nd Officer or 3rd Engineer
- BOSIET, First Aid and Basic Fire Fighting
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'WMP.PL.RECRUITING@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Technical Assistant — HVDC Offshore Platform (DolWin Epsilon), North Sea');
END $$;

-- ── A&A Shipping Company Ltd (new company) — 3rd Engineer, Cement Carrier ────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'A&A Shipping Company' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'A&A Shipping Company Ltd', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — Cement Carrier, EU', '3rd Engineer', 'Cement Carrier', 3600, NULL, 'EUR', '4 months (± 1 month)', '2026-07-31',
'A&A Shipping Company is recruiting a 3rd Engineer for a cement carrier trading within the EU. Cement carriers run specialised pneumatic cargo-handling systems, giving engineers varied and interesting machinery work alongside standard watchkeeping. 4-month contract (± 1 month), joining end of July, 3,600 EUR/month.

## Vessel particulars
- Type: cement carrier
- Sailing area: EU

## Requirements
- valid 3rd Engineer Certificate of Competency and full STCW documentation
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'crewing@aashipping.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — Cement Carrier, EU');
END $$;

-- ── V.Ships Poland — 3rd Engineer, OSV / Survey Vessel ──────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'V.Ships%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'V.Ships Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer (Offshore) — OSV / Survey Vessel (NIS Flag), UK', '3rd Engineer', 'OSV', 230, NULL, 'EUR', '4 weeks (± 2 weeks)', '2026-07-29',
'V.Ships is recruiting a 3rd Engineer for an offshore support / survey vessel (NIS flag) working in UK waters. A good offshore role on a short 4-week rotation for an engineer with offshore experience in rank. Joining 29 July, 4-week contract (± 2 weeks), 230 EUR/day gross.

## Vessel particulars
- Type: OSV / survey vessel
- Flag: NIS (Norwegian International Register), IMO 9342724
- Sailing area: UK

## Requirements
- offshore experience in rank is required
- valid 3rd Engineer Certificate of Competency and full STCW documentation
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'Recruitment.Gdynia@glasgow.vships.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer (Offshore) — OSV / Survey Vessel (NIS Flag), UK');
END $$;

-- ── Jupiter Shipping Services — AB, General Cargo (Sider) ───────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Jupiter Shipping Services' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Jupiter Shipping Services', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB — General Cargo (Sider, Portugal Flag, 4,758 GT), Europe', 'AB (Able Seaman)', 'General Cargo', 2800, NULL, 'EUR', '2 months', NULL,
'Jupiter Shipping Services is urgently recruiting an Able Seaman for the general cargo vessel Sider (Portugal flag) trading Europe. A straightforward AB deck position on a small general cargo ship, joining as soon as possible. 2-month contract, 2,800 EUR/month.

## Vessel particulars
- Type: general cargo
- Vessel: Sider, Portugal flag
- Size: 4,758 GT
- Sailing area: Europe

## Requirements
- experience as AB, valid AB Certificate (II/5)
- full STCW documentation
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'jupiter@jupitershipping.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB — General Cargo (Sider, Portugal Flag, 4,758 GT), Europe');
END $$;
