-- Vacancies from crewing.portalmorski.pl (13.07.2026).
-- Vacancies already on the board are REFRESHED (created_at/updated_at bumped so
-- they resurface); genuinely new vacancies are inserted (guarded by title).
-- Nothing is deleted. Descriptions are unique, rewritten Markdown (role intro +
-- vessel particulars + requirements + how to apply) — never a verbatim copy.
-- Idempotent — safe to re-run. Run once in the Supabase SQL Editor.
--
-- Day-rate posts (Inter Marine 2/O) store no monthly salary — the day rate is
-- stated in the description instead, so the board never shows a misleading
-- monthly figure.

-- ── Inter Marine — 2nd Officer (DP), Survey Vessel "Amber Cecilia" ───────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = '2nd Officer (DPO) — Survey Vessel (Amber Cecilia), Baltic / Worldwide';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Inter Marine%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Inter Marine', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer (DPO) — Survey Vessel (Amber Cecilia), Baltic / Worldwide', '2nd Officer', 'Survey Vessel', NULL, NULL, 'EUR', '4 weeks (± 3 days)', '2026-07-15',
'Inter Marine is looking for a 2nd Officer / DPO for the survey vessel Amber Cecilia, working in the Baltic Sea and worldwide. A short 4-week (± 3 days) assignment for a DP-qualified officer, paying a day rate of **EUR 195 per day**. Joining 15 July 2026.

## Vessel particulars
- Type: survey vessel (Amber Cecilia)
- Trading area: Baltic Sea / worldwide
- Contract: 4 weeks (± 3 days), joining 15 July 2026

## Requirements
- Experience in rank and on this vessel type
- Valid DP certificate (Limited or Unlimited)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'crewing@intermarinegroup.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer (DPO) — Survey Vessel (Amber Cecilia), Baltic / Worldwide');
END $$;

-- ── Wilhelmsen Marine Personnel — 5 positions ───────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title IN (
      'Engine Cadet — LPG & Bulk Carrier, Worldwide',
      'Engine Cadet — Chemical Tanker & Ro-Ro, Worldwide',
      '2nd Engineer — Chemical / Products Tanker (TP Spirit, 2016), Worldwide',
      'Chief Officer — Ro-Ro (Tirranna, 2009), Worldwide / US Ports',
      '2nd Engineer / Mechanic — HVDC Platform (DolWin Epsilon), North Sea'
    );

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Wilhelmsen Marine Personnel%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Wilhelmsen Marine Personnel', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Engine Cadet — LPG & Bulk Carrier, Worldwide', 'Engine Cadet', 'LPG Carrier', 500, 850, 'USD', '4-6 months', '2026-07-01',
'Wilhelmsen Marine Personnel is offering an Engine Cadet berth on LPG and bulk carriers trading worldwide — an excellent first sea-time opportunity, no previous experience required. A 4–6 month contract paying 500–850 USD per month, joining June or July 2026.

## Vessel particulars
- Type: LPG carrier / bulk carrier
- Trading area: worldwide
- Contract: 4–6 months, joining June/July 2026

## Requirements
- STCW documents
- Good English
- Basic Training for Gas Tanker
- No sea experience required

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'WMP.PL.RECRUITING@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Engine Cadet — LPG & Bulk Carrier, Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Engine Cadet — Chemical Tanker & Ro-Ro, Worldwide', 'Engine Cadet', 'Chemical Tanker', 500, 850, 'USD', '4-6 months', '2026-07-01',
'Wilhelmsen Marine Personnel is recruiting an Engine Cadet for chemical tankers and ro-ro vessels trading worldwide. A great entry-level role for a future marine engineer — no experience needed. A 4–6 month contract at 500–850 USD per month, joining June or July 2026.

## Vessel particulars
- Type: chemical tanker / ro-ro
- Trading area: worldwide
- Contract: 4–6 months, joining June/July 2026

## Requirements
- STCW documents
- Good English
- Basic Training for Oil and Chemical Tanker Cargo Operations
- No sea experience required

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'WMP.PL.RECRUITING@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Engine Cadet — Chemical Tanker & Ro-Ro, Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Chemical / Products Tanker (TP Spirit, 2016), Worldwide', '2nd Engineer', 'Chemical Tanker', 11400, NULL, 'USD', '3 months', '2026-07-15',
'Wilhelmsen Marine Personnel is looking for a 2nd Engineer for the chemical / products tanker TP Spirit (Norway flag, built 2016) trading worldwide. A 3-month contract paying 11,400 USD per month (depending on experience), joining 15 July 2026 at Map Ta Phut.

## Vessel particulars
- Type: chemical / products tanker (TP Spirit)
- Flag: Norway, built 2016
- Trading area: worldwide
- Contract: 3 months, joining 15 July 2026 (Map Ta Phut)

## Requirements
- Around 33 months of experience in rank
- CoC with strong experience on oil tankers, ideally 100k DWT chemical/oil carriers
- Good English and good references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'WMP.PL.RECRUITING@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Chemical / Products Tanker (TP Spirit, 2016), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Ro-Ro (Tirranna, 2009), Worldwide / US Ports', 'Chief Officer (Chief Mate)', 'Ro-Ro', 9337, NULL, 'USD', '3-4 months', '2026-07-28',
'Wilhelmsen Marine Personnel is recruiting a Chief Officer for the ro-ro carrier Tirranna (IMO 9377523, Norway flag, built 2009), managed by Wilhelmsen, trading worldwide including US ports. A 3–4 month contract paying 9,337 USD per month, joining end of July 2026.

## Vessel particulars
- Type: ro-ro (Tirranna, IMO 9377523)
- Flag: Norway, built 2009 — owner & technical management: Wilhelmsen
- Trading area: worldwide, incl. US ports
- Contract: 3–4 months, joining end July 2026

## Requirements
- Experience in rank
- Valid US visa (C1/D)
- Full STCW documentation, good English, good references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'WMP.PL.RECRUITING@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Ro-Ro (Tirranna, 2009), Worldwide / US Ports');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer / Mechanic — HVDC Platform (DolWin Epsilon), North Sea', '2nd Engineer', 'Offshore Platform', 6246, NULL, 'EUR', '2 weeks on / 2 weeks off (2 rotations)', '2026-07-15',
'Wilhelmsen Marine Personnel is looking for a 2nd Engineer / Mechanic for the HVDC offshore platform DolWin Epsilon in the German North Sea. A comfortable equal-time 2-weeks-on / 2-weeks-off rotation (2 rotations), joining 15 July 2026. Around 6,246 EUR per month — a €4,896 basic plus a €90 offshore allowance for each day on board (42% tax).

## Vessel particulars
- Type: HVDC offshore platform (DolWin Epsilon)
- Trading area: North Sea (Germany)
- Rotation: 2 weeks on / 2 weeks off, for 2 rotations, joining 15 July 2026

## Requirements
- Experience as 2nd Engineer
- BOSIET and Slinger / Signaller certificates
- Good English and good references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'WMP.PL.RECRUITING@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer / Mechanic — HVDC Platform (DolWin Epsilon), North Sea');
END $$;

-- ── Marlow Navigation Poland — 4 positions ──────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title IN (
      'Messman / Steward — Car Carrier (MV Elbe Highway), Baltic / North Sea',
      '2nd Officer — Car Carrier (Seine Highway, 6/6 Rotation), Baltic / North Sea',
      'OS / Messboy — Car Carrier (Weser Highway), Baltic / North Sea',
      'ETO — Oil Tanker (82,374 GT, 2020), Worldwide'
    );

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Marlow Navigation Poland%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Marlow Navigation Poland Sp. z o.o.', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Messman / Steward — Car Carrier (MV Elbe Highway), Baltic / North Sea', 'Messman / Steward', 'Car Carrier', 2300, NULL, 'EUR', '6 weeks', '2026-07-26',
'Marlow Navigation Poland is recruiting a Messman / Steward for the car carrier MV Elbe Highway (PCC) sailing in the Baltic and North Sea. A steady 6-week contract in the galley/catering team of a mid-size PCC, paying 2,300 EUR per month (paid on board only). Joining 26 July 2026.

## Vessel particulars
- Type: car carrier / PCC (MV Elbe Highway)
- Particulars: 23,498 GRT, built 2005, LOA 147 m, crew 18
- Trading area: Baltic / North Sea
- Contract: 6 weeks, joining 26 July 2026

## Requirements
- Experience as Messman / Steward
- Valid STCW documents

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'applications@marlow.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Messman / Steward — Car Carrier (MV Elbe Highway), Baltic / North Sea');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer — Car Carrier (Seine Highway, 6/6 Rotation), Baltic / North Sea', '2nd Officer', 'Car Carrier', 5000, NULL, 'EUR', '7 weeks (6/6 permanent rotation possible)', '2026-07-22',
'Marlow Navigation Poland is looking for a 2nd Officer for the car carrier Seine Highway (ro-ro PCC) in the Baltic and North Sea. A 7-week contract with the option of a permanent 6/6-week rotation, paying 5,000 EUR per month (on board only). Joining 22 July 2026.

## Vessel particulars
- Type: car carrier / PCC (Seine Highway, ro-ro)
- Particulars: 23,498 GRT, built 2007, LOA 148 m, Bahamas flag
- Trading area: Baltic / North Sea
- Contract: 7 weeks (permanent 6/6-week rotation possible), joining 22 July 2026

## Requirements
- Experience in rank
- Ro-ro / car carrier experience

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'applications@marlow.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer — Car Carrier (Seine Highway, 6/6 Rotation), Baltic / North Sea');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'OS / Messboy — Car Carrier (Weser Highway), Baltic / North Sea', 'OS (Ordinary Seaman)', 'Car Carrier', 2300, NULL, 'EUR', '6 weeks (6/6 rotation possible)', '2026-07-21',
'Marlow Navigation Poland needs an OS / Messboy for the car carrier Weser Highway (PCC) in the Baltic and North Sea. A 6-week contract (permanent 6/6-week rotation possible), paying 2,300 EUR per month plus a 250 EUR lashing bonus (paid on board). Joining 21 July 2026.

## Vessel particulars
- Type: car carrier / PCC (Weser Highway)
- Particulars: built 1993, Panama flag, main engine MAN L35MC 3,221 kW
- Trading area: Baltic / North Sea
- Contract: 6 weeks (permanent 6/6-week rotation possible), joining 21 July 2026

## Requirements
- Experience as OS

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'applications.mnpl@marlowgroup.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'OS / Messboy — Car Carrier (Weser Highway), Baltic / North Sea');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'ETO — Oil Tanker (82,374 GT, 2020), Worldwide', 'ETO (Electro-Technical Officer)', 'Oil Tanker', 7500, NULL, 'EUR', '4 months', '2026-07-17',
'Marlow Navigation Poland is recruiting an ETO for a modern crude oil tanker (82,374 GT, Liberia flag, built 2020) trading worldwide. A 4-month contract paying from 7,500 EUR per month (negotiable), joining 17 July 2026.

## Vessel particulars
- Type: oil tanker (crude)
- Particulars: 82,374 GT, Liberia flag, built 2020, main engine MAN B&W 6S70ME-C, 18,400 kW (electronic)
- Trading area: worldwide
- Contract: 4 months, joining 17 July 2026

## Requirements
- Experience in rank and in electrical engineering
- Advanced Oil & Chemical Tanker certificate
- Valid US visa (required)
- Crude oil experience (required)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'applications.mnpl@marlowgroup.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'ETO — Oil Tanker (82,374 GT, 2020), Worldwide');
END $$;

-- ── OSM Poland — 2nd Officer (DP), PSV "HM Flipper" (temporary) ──────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = '2nd Officer (DPO) — PSV (HM Flipper, temporary), North Sea';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OSM Poland%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OSM Poland Sp. z o.o.', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer (DPO) — PSV (HM Flipper, temporary), North Sea', '2nd Officer', 'PSV', 7986, NULL, 'EUR', '5 weeks', '2026-07-15',
'OSM Thome (OSM Poland) is looking for a 2nd Officer to cover a temporary position on the PSV HM Flipper in the North Sea, joining mid-July for around 5 weeks. Pay is 7,986 EUR per month (paid on board).

## Vessel particulars
- Type: PSV (HM Flipper)
- Trading area: North Sea
- Contract: temporary, ~5 weeks, joining mid-July 2026

## Requirements
- Proven experience as 2nd Officer on PSVs
- Full DP certificate
- UK work permit

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer (DPO) — PSV (HM Flipper, temporary), North Sea');
END $$;
