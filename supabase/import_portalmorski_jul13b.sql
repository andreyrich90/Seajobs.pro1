-- Vacancies from crewing.portalmorski.pl (13.07.2026, batch B).
-- Vacancies already on the board are REFRESHED (created_at/updated_at bumped so
-- they resurface); genuinely new vacancies are inserted (guarded by title).
-- Nothing is deleted. Descriptions are unique, rewritten Markdown (role intro +
-- vessel particulars + requirements + how to apply) — never a verbatim copy.
-- Idempotent — safe to re-run. Run once in the Supabase SQL Editor.
--
-- Notes:
-- * MAG "AB — Ro-Ro, Liverpool–Dublin" and Seamar "Deck Fitter — General Cargo"
--   are recurring posts (already imported); they are refreshed + re-inserted if
--   missing.
-- * OSM "2nd Officer — PSV HM Flipper" is the same recurring temporary post as
--   import_portalmorski_jul13.sql, now re-advertised for a start beginning
--   August at 5,442 GBP — so its row is updated in place rather than duplicated.

-- ── MAG (Morska Agencja Gdynia) — AB (recurring) + 3rd Engineer ──────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title IN (
      'AB (Able Seaman) — Ro-Ro / Con-Ro, Liverpool–Dublin',
      '3rd Engineer — Car Carrier, Europe'
    );

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'MAG - Morska Agencja Gdynia%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'MAG - Morska Agencja Gdynia', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB (Able Seaman) — Ro-Ro / Con-Ro, Liverpool–Dublin', 'AB (Able Seaman)', 'Ro-Ro', 4596, NULL, 'GBP', '6 weeks', '2026-07-26',
'Morska Agencja Gdynia (MAG) is recruiting an AB (Able Seaman) for a ro-ro / ro-lo / con-ro vessel working the Irish Sea between Liverpool and Dublin. A steady 6-week contract on a short-sea route, paying 4,596 GBP per month for an experienced ro-ro deck rating. Joining 26 July 2026.

## Vessel particulars
- Type: ro-ro / ro-lo / con-ro
- Trading area: Liverpool – Dublin
- Contract: 6 weeks, joining 26 July 2026

## Requirements
- Previous experience as AB on ro-ro vessels
- Full set of valid documents in line with STCW

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@mag.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB (Able Seaman) — Ro-Ro / Con-Ro, Liverpool–Dublin');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — Car Carrier, Europe', '3rd Engineer', 'Car Carrier', 3700, NULL, 'EUR', '2 months on / 2 months off', '2026-08-02',
'Morska Agencja Gdynia (MAG) is looking for a 3rd Engineer for a car carrier (PCC) trading around Europe, with Polish officers and Filipino ratings. A comfortable 2-months-on / 2-months-off rotation, paying 3,700 EUR per month. Joining 2 August 2026.

## Vessel particulars
- Type: car carrier / PCC
- Trading area: Europe
- Crew: Polish officers, Filipino ratings
- Rotation: 2 months on / 2 months off, joining 2 August 2026

## Requirements
- Experience as 3rd Engineer
- Current STCW documents, valid medical certificate, ERM

## Conditions
- From the 2nd contract: standby pay of 1,850 EUR for each month at home, a seniority bonus, and HMS medical insurance.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@mag.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — Car Carrier, Europe');
END $$;

-- ── Dohle Marine Services Europe — AB, 2nd Engineer, Chief Officer ───────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title IN (
      'AB (Able Seaman) — Ro-Ro (Elisabeth Russ), Italy–Malta',
      '2nd Engineer — Ro-Ro (Caroline Russ), Italy–Malta',
      'Chief Officer — Container Ship (ESL Asante, 2013), China / Korea / Mexico'
    );

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Dohle Marine Services Europe%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Dohle Marine Services Europe', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB (Able Seaman) — Ro-Ro (Elisabeth Russ), Italy–Malta', 'AB (Able Seaman)', 'Ro-Ro', 3000, NULL, 'EUR', '12 weeks on / 6 weeks off', '2026-08-05',
'Dohle Marine Services Europe is recruiting an AB for the ro-ro vessel m/v Elisabeth Russ on the Italy–Malta route. An EU-crewed post with a 12-weeks-on / 6-weeks-off rotation, paying 3,000 EUR per month. Joining 5 August 2026. Motivated OS candidates seeking promotion are also considered.

## Vessel particulars
- Type: ro-ro (m/v Elisabeth Russ, IMO 9186429)
- Particulars: 10,471 GT, 3,146 NT, 7,296 DWT
- Trading area: Italy – Malta
- Rotation: 12 weeks on / 6 weeks off, joining 5 August 2026

## Requirements
- AB Diploma (STCW II/5) or Watchkeeping Rating (STCW II/4)
- Survival craft (Ratownik) certificate
- Good English and coronavirus vaccination

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB (Able Seaman) — Ro-Ro (Elisabeth Russ), Italy–Malta');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Ro-Ro (Caroline Russ), Italy–Malta', '2nd Engineer', 'Ro-Ro', 7600, NULL, 'EUR', '10 weeks on / 10 weeks off', '2026-08-09',
'Dohle Marine Services Europe is looking for a 2nd Engineer for the ro-ro cargo ship m/v Caroline Russ on the Italy–Malta route. A comfortable equal-time 10-weeks-on / 10-weeks-off rotation, paying 7,600 EUR per month. Joining 9 August 2026.

## Vessel particulars
- Type: ro-ro / con-ro (m/v Caroline Russ, IMO 9197533, built by J.J. Sietas)
- Particulars: 10,488 GT, 3,146 NT, 7,261 DWT, main engine MAN 16V46B, 15,600 kW
- Trading area: Italy – Malta
- Rotation: 10 weeks on / 10 weeks off, joining 9 August 2026

## Requirements
- Experience as 2nd Engineer
- Good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Ro-Ro (Caroline Russ), Italy–Malta');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Container Ship (ESL Asante, 2013), China / Korea / Mexico', 'Chief Officer (Chief Mate)', 'Container Ship', 8600, NULL, 'USD', '4 months', '2026-07-23',
'Dohle Marine Services Europe is recruiting a Chief Officer for the container ship m/v ESL Asante trading China, South Korea and Mexico. A 4-month contract on a large post-panamax box ship, paying 8,600 USD per month. Joining 23 July 2026.

## Vessel particulars
- Type: container ship (m/v ESL Asante, IMO 9670822, Portugal flag, built 2013)
- Particulars: 42,690 GT, 58,037 DWT, LOA 228 m, ~3,124 TEU, main engine 7S70ME-C 8.2, 22,890 kW
- Trading area: China / South Korea / Mexico
- Contract: 4 months, joining 23 July 2026

## Requirements
- Experience as Chief Officer
- Good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Container Ship (ESL Asante, 2013), China / Korea / Mexico');
END $$;

-- ── OSM Poland — 2nd Officer PSV (re-advertised) + Chief Officer tanker ──────
DO $$
DECLARE
  v_company_id uuid;
  v_flipper_desc text := 'OSM Thome (OSM Poland) is looking for a 2nd Officer to cover a temporary position on the PSV HM Flipper in the North Sea, joining beginning of August 2026 for around 4–5 weeks. Pay is 5,442 GBP per month (paid on/off).

## Vessel particulars
- Type: PSV (HM Flipper)
- Trading area: North Sea
- Contract: temporary, ~5 weeks, joining early August 2026

## Requirements
- Proven experience as 2nd Officer on PSVs
- Full DP certificate
- UK work permit

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.';
BEGIN
  -- Same recurring HM Flipper post as jul13.sql — refresh it and update the
  -- salary / joining details to the new (August) advertisement.
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true,
      salary_from = 5442, salary_to = NULL, currency = 'GBP',
      contract_duration = '5 weeks', joining_date = '2026-08-01',
      description = v_flipper_desc, contact_email = 'recruitment.gda@osmthome.com'
    WHERE title = '2nd Officer (DPO) — PSV (HM Flipper, temporary), North Sea';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OSM Poland%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OSM Poland Sp. z o.o.', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer (DPO) — PSV (HM Flipper, temporary), North Sea', '2nd Officer', 'PSV', 5442, NULL, 'GBP', '5 weeks', '2026-08-01',
    v_flipper_desc, true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer (DPO) — PSV (HM Flipper, temporary), North Sea');

  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = 'Chief Officer — Oil / Chemical Tanker (Athenian Faith, 2026), Worldwide';

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Oil / Chemical Tanker (Athenian Faith, 2026), Worldwide', 'Chief Officer (Chief Mate)', 'Chemical Tanker', 12300, NULL, 'USD', '4 months', '2026-08-15',
'OSM Thome (OSM Poland) is recruiting a Chief Officer for the brand-new oil / chemical tanker Athenian Faith (built 2026) trading worldwide. A 4-month contract on a modern tanker, paying 12,300 USD per month (paid on board only). Joining 15 August 2026.

## Vessel particulars
- Type: oil / chemical tanker (Athenian Faith)
- Particulars: built 2026, 18,500 DWT, LOA 150 m, MAN-B&W main engine
- Trading area: worldwide
- Contract: 4 months, joining 15 August 2026

## Requirements
- Minimum 2 years experience in rank
- Chief Mate CoC (STCW II/2)
- Advanced Oil & Chemical Tanker Cargo Operations, Basic Oil & Chemical Tanker Training
- GMDSS GOC, ECDIS, ARPA, BRM; AFF, PSCRB, Medical First Aid; DSD or SSO
- Valid medical, passport, seaman''s book and flag-state endorsement
- Relevant tanker experience and cargo-handling skills

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Oil / Chemical Tanker (Athenian Faith, 2026), Worldwide');
END $$;

-- ── Seamar — Deck Fitter / Welder, General Cargo (recurring) ─────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = 'Deck Fitter / Welder — General Cargo / MPP (37,443 DWT), Europe / South Africa';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Seamar%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Seamar S.C.', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Deck Fitter / Welder — General Cargo / MPP (37,443 DWT), Europe / South Africa', 'Deck Fitter', 'General Cargo', 2650, 2810, 'EUR', 'up to 3 months', '2026-07-17',
'Seamar is recruiting a Deck Fitter / Welder for a modern general cargo / multipurpose vessel (built 2013) trading Europe – South Africa – Europe. A contract of up to 3 months, paying 2,650–2,810 EUR per month on the first contract (depending on experience), plus overtime and insurance for the seafarer and family in HMS. Joining around 17 July 2026.

## Vessel particulars
- Type: general cargo / MPP container vessel (built 2013)
- Particulars: 37,443 DWT, 2,225 TEU, heavy-lift gear up to 60 mt / 240 mt
- Trading area: Europe – South Africa – Europe
- Contract: up to 3 months, joining ~17 July 2026

## Requirements
- Experience as Deck Fitter / Welder

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'seamar@seamar.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Deck Fitter / Welder — General Cargo / MPP (37,443 DWT), Europe / South Africa');
END $$;
