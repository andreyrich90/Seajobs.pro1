-- Vacancies from crewing.portalmorski.pl (13.07.2026, batch C).
-- Vacancies already on the board are REFRESHED (created_at/updated_at bumped so
-- they resurface); genuinely new vacancies are inserted (guarded by title).
-- Nothing is deleted. Descriptions are unique, rewritten Markdown (role intro +
-- vessel particulars + requirements + how to apply) — never a verbatim copy.
-- Idempotent — safe to re-run. Run once in the Supabase SQL Editor.
--
-- Day-rate posts (Balteam 2nd Cook) store no monthly salary — the day rate is
-- stated in the description instead. Unibaltic accepts applications only via its
-- website, so those two carry no forwarding contact_email.

-- ── OSM Poland — AB, Ro-Ro Ferry (Britannia Seaways, DFDS) ───────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = 'AB (Able Seaman) — Ro-Ro Ferry (Britannia Seaways, DFDS), Cuxhaven–England';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OSM Poland%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OSM Poland Sp. z o.o.', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB (Able Seaman) — Ro-Ro Ferry (Britannia Seaways, DFDS), Cuxhaven–England', 'AB (Able Seaman)', 'Ro-Ro', 3744, NULL, 'EUR', '8 weeks / 4 weeks', NULL,
'OSM Thome (OSM Poland) urgently needs an AB to join the ro-ro ferry Britannia Seaways (DFDS) on the Cuxhaven–England route. A busy North Sea ferry post with an 8-weeks-on / 4-weeks-off rotation, paying 3,744 EUR per month (on board only). Joining ASAP in Cuxhaven.

## Vessel particulars
- Type: ro-ro ferry (Britannia Seaways, DFDS)
- Trading area: Cuxhaven (Germany) – England
- Rotation: 8 weeks on / 4 weeks off, joining ASAP

## Requirements
- AB — STCW Diploma, Basic Safety Training, Security Awareness, valid Seaman''s Book and health certificate
- Ro-ro / lashing experience preferred

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB (Able Seaman) — Ro-Ro Ferry (Britannia Seaways, DFDS), Cuxhaven–England');
END $$;

-- ── Balteam Crewing Agency — 2nd Cook (offshore) + 3rd Engineer (car carrier) ─
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title IN (
      '2nd Cook — Offshore Vessel (OSV / DSV, DP2), Europe',
      '3rd Engineer — Car Carrier (UECC, dual-fuel), Europe'
    );

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Balteam%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Balteam Crewing Agency', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Cook — Offshore Vessel (OSV / DSV, DP2), Europe', '2nd Cook', 'OSV', NULL, NULL, 'EUR', '4 weeks', '2026-08-05',
'Balteam Crewing Agency is recruiting a 2nd Cook for an offshore support / dive support vessel (OSV / DSV, DP2) working in European waters. A 4-week contract on a mixed-crew vessel, paying a day rate of **EUR 180 per day**. Joining 5 August 2026 in Cuxhaven.

## Vessel particulars
- Type: offshore support / dive support vessel (OSV / DSV, DP2)
- Particulars: built 2005, 1,524 GT, LOA 80 m, mixed crew
- Trading area: Europe
- Contract: 4 weeks, joining 5 August 2026 (Cuxhaven)

## Requirements
- Experience in position, offshore experience preferred
- Good English, ship''s cook certificate, night-shift experience
- Seaman status and A1 application required

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@balteam.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Cook — Offshore Vessel (OSV / DSV, DP2), Europe');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — Car Carrier (UECC, dual-fuel), Europe', '3rd Engineer', 'Car Carrier', 3877, NULL, 'EUR', '2 months on / 2 months off', '2026-07-08',
'Balteam Crewing Agency urgently needs a 3rd Engineer for a UECC dual-fuelled car carrier (PCC) trading around Europe. A 2-months-on / 2-months-off rotation, paying 3,877 EUR per month on the first contract, then 3,083 EUR on/off from the second contract. Joining 8 July 2026.

## Vessel particulars
- Type: car carrier / PCC (dual-fuelled, UECC)
- Trading area: Europe
- Rotation: 2 months on / 2 months off, joining 8 July 2026

## Requirements
- Experience in rank
- Good English
- Basic IGF training (dual-fuel vessels)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@balteam.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — Car Carrier (UECC, dual-fuel), Europe');
END $$;

-- ── Romarine (Baltic Marine Services) — 2nd Engineer, AHTS "Eco One" ─────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = '2nd Engineer — AHTS (Eco One), Mediterranean';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Romarine%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Romarine', 'Świnoujście, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — AHTS (Eco One), Mediterranean', '2nd Engineer', 'AHTS', 5500, NULL, 'EUR', '2 (+1 option) months', '2026-07-20',
'Romarine (Baltic Marine Services) is looking for a 2nd Engineer for the multipurpose offshore vessel / AHTS Eco One in the Mediterranean. A 2-month contract (with a 1-month option), paying 5,500 EUR net per month (on board only). Joining around 20 July 2026. Double cabins on board.

## Vessel particulars
- Type: AHTS / multipurpose offshore vessel (Eco One, IMO 9651357, Italy flag)
- Particulars: LOA 59.25 m, breadth 14.95 m, double cabins
- Trading area: Mediterranean
- Contract: 2 (+1 option) months, joining around 20 July 2026

## Requirements
- Experience in rank

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'bms@world.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — AHTS (Eco One), Mediterranean');
END $$;

-- ── Unibaltic Crewing — Chief Engineer + 3rd Officer (chem/oil tankers) ──────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title IN (
      'Chief Engineer — Chemical / Oil Tanker (Cyprus flag), Europe',
      '3rd Officer — Oil / Chemical Tanker (MT Azuryth), Europe'
    );

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Unibaltic%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Unibaltic Crewing', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — Chemical / Oil Tanker (Cyprus flag), Europe', 'Chief Engineer', 'Chemical Tanker', 11250, NULL, 'EUR', 'permanent, 2 months on / 2 months off', NULL,
'Unibaltic Crewing urgently needs a Chief Engineer for a chemical / oil tanker (Cyprus flag) trading in Europe. Permanent employment on a 2-months-on / 2-months-off rotation, paying 11,250 EUR per month on board. Joining ASAP. Social and personal-accident / illness insurance in line with the CBA.

## Vessel particulars
- Type: chemical / oil tanker (Cyprus flag)
- Trading area: Europe
- Employment: permanent, 2 months on / 2 months off, joining ASAP

## Requirements
- Experience as Chief Engineer on chemical tankers per STCW III/2 or III/3
- Matrix: minimum 12 months as Chief Engineer on tankers
- Advanced Training for Oil Tankers Operations and Advanced Training for Chemical Tankers Operations (higher level)

## How to apply
Applications are accepted only through the Unibaltic website: https://www.unibaltic.pl (Crewing section).', true, true, NULL
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — Chemical / Oil Tanker (Cyprus flag), Europe');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer — Oil / Chemical Tanker (MT Azuryth), Europe', '3rd Officer', 'Chemical Tanker', 4650, NULL, 'EUR', '2 months (± 2 weeks)', '2026-08-03',
'Unibaltic Crewing is recruiting a 3rd Officer for the oil / chemical tanker MT Azuryth trading in Europe. A 2-month contract (± 2 weeks), paying 4,650 EUR per month on board. Joining 3 August 2026.

## Vessel particulars
- Type: oil / chemical tanker (MT Azuryth)
- Trading area: Europe
- Contract: 2 months (± 2 weeks), joining 3 August 2026

## Requirements
- Experience on oil / chemical tankers
- Advanced Chemical Tanker Operations certificate (higher level)
- Advanced Oil Tanker Operations certificate (higher level)
- BTM & BRM certificates not older than 5 years

## How to apply
Applications are accepted only through the Unibaltic website: https://www.unibaltic.pl (Crewing section).', true, true, NULL
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer — Oil / Chemical Tanker (MT Azuryth), Europe');
END $$;

-- ── Dohle Marine Services Europe — 4 container-ship posts ────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title IN (
      '2nd Engineer — Container Ship (ESL Nhava Sheva / Henrika), Asia',
      '2nd Engineer — Container Ship (ESL Shekou / Tamina), Asia',
      'ETO — Container Ship (Venetia), Europe / Morocco',
      '2nd Engineer — Container Ship (Amalthea), Red Sea'
    );

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Dohle Marine Services Europe%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Dohle Marine Services Europe', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Container Ship (ESL Nhava Sheva / Henrika), Asia', '2nd Engineer', 'Container Ship', 8600, NULL, 'USD', '4 months', '2026-07-20',
'Dohle Marine Services Europe is looking for a 2nd Engineer for the large container ship Henrika (ESL Nhava Sheva) trading Malaysia, China, Singapore and the UAE. A 4-month contract on a big box ship, paying 8,600 USD per month. Joining 20 July 2026.

## Vessel particulars
- Type: container ship (Henrika, IMO 9535199, built Hyundai Samho)
- Particulars: 59,307 GT, 73,083 DWT, LOA 275 m, ~5,605 TEU, main engine 8K98ME7, 44,900 kW
- Trading area: Malaysia / China / Singapore / UAE
- Contract: 4 months, joining 20 July 2026

## Requirements
- Experience as 2nd Engineer
- Good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Container Ship (ESL Nhava Sheva / Henrika), Asia');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Container Ship (ESL Shekou / Tamina), Asia', '2nd Engineer', 'Container Ship', 8600, NULL, 'USD', '4 months', '2026-08-20',
'Dohle Marine Services Europe is recruiting a 2nd Engineer for the container ship Tamina (ESL Shekou) trading China, Malaysia, Sri Lanka and India. A 4-month contract, paying 8,600 USD per month. Joining 20 August 2026.

## Vessel particulars
- Type: container ship (Tamina, IMO 9290945, Portugal flag, built 2004)
- Particulars: 66,280 GT, 71,665 DWT, LOA 276 m, main engine 10RTA96C-B, 54,926 kW
- Trading area: China / Malaysia / Sri Lanka / India
- Contract: 4 months, joining 20 August 2026

## Requirements
- Experience as 2nd Engineer
- Good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Container Ship (ESL Shekou / Tamina), Asia');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'ETO — Container Ship (Venetia), Europe / Morocco', 'ETO (Electro-Technical Officer)', 'Container Ship', 6750, NULL, 'USD', '4 months', '2026-07-30',
'Dohle Marine Services Europe is looking for an ETO for the container ship Venetia trading Morocco, the Netherlands, Belgium and France. A 4-month contract, paying 6,750 USD per month. Joining 30 July 2026.

## Vessel particulars
- Type: container ship (Venetia, IMO 9400203, built CSBC)
- Particulars: 42,609 GT, 52,788 DWT, LOA 268.8 m, main engine 7RT-FLEX96C, 40,040 kW
- Trading area: Morocco / Netherlands / Belgium / France
- Contract: 4 months, joining 30 July 2026

## Requirements
- Experience as ETO
- Good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'ETO — Container Ship (Venetia), Europe / Morocco');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Container Ship (Amalthea), Red Sea', '2nd Engineer', 'Container Ship', 8600, NULL, 'USD', '4 months', '2026-08-20',
'Dohle Marine Services Europe is recruiting a 2nd Engineer for the container ship Amalthea trading Saudi Arabia, Jordan and Egypt. A 4-month contract, paying 8,600 USD per month. Joining 20 August 2026.

## Vessel particulars
- Type: container ship (Amalthea, IMO 9397913, Portugal flag, built 2009)
- Particulars: 42,609 GT, 52,788 DWT, main engine 7RT-FLEX96C, 40,040 kW
- Trading area: Saudi Arabia / Jordan / Egypt (Red Sea)
- Contract: 4 months, joining 20 August 2026

## Requirements
- Experience as 2nd Engineer
- Good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Container Ship (Amalthea), Red Sea');
END $$;

-- ── Astral Limited — 2nd Engineer, Chemical / Oil Tanker ────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = '2nd Engineer — Chemical / Oil Tanker (Liberia flag, 2007), Worldwide';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Astral Limited%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Astral Limited', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Chemical / Oil Tanker (Liberia flag, 2007), Worldwide', '2nd Engineer', 'Chemical Tanker', 10300, NULL, 'USD', '4 months (± 1)', NULL,
'Astral Limited urgently needs a 2nd Engineer for a chemical / oil tanker (Liberia flag, built 2007) trading worldwide. A 4-month contract (± 1 month), paying 10,300 USD per month. Joining ASAP.

## Vessel particulars
- Type: chemical / oil tanker (Liberia flag, built 2007, main engine MAN B&W 6S35MC)
- Trading area: worldwide
- Contract: 4 months (± 1), joining ASAP

## Requirements
- Experience as 2nd Engineer on chemical / oil tankers
- Full offer details are available at the office

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'wgiersz@astrallimited.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Chemical / Oil Tanker (Liberia flag, 2007), Worldwide');
END $$;
