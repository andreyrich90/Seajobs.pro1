-- Vacancies from crewing.portalmorski.pl (13.07.2026, batch D).
-- Vacancies already on the board are REFRESHED (created_at/updated_at bumped so
-- they resurface); genuinely new vacancies are inserted (guarded by title).
-- Nothing is deleted. Descriptions are unique, rewritten Markdown (role intro +
-- vessel particulars + requirements + how to apply) — never a verbatim copy.
-- Idempotent — safe to re-run. Run once in the Supabase SQL Editor.
--
-- Day-rate posts store the day rate in salary_from with salary_period = 'day',
-- so the board shows e.g. "250 EUR/day". "Negotiable" posts stay blank.

-- Ensure the salary_period column exists (matches the dated migration).
alter table public.vacancies
  add column if not exists salary_period text not null default 'month';

-- ── Refresh recurring MONTHLY posts already on the board ─────────────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
  WHERE title IN (
    'Steward / Stewardess — Ro-Ro Ferry (Suecia Seaways, DFDS), Netherlands–England',
    '3rd Officer — Oil / Chemical Tanker (MT Azuryth), Europe'
  );

-- ── Refresh + fix DAY-RATE posts already imported (set per-day salary) ───────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true,
    salary_from = 180, salary_to = NULL, salary_period = 'day', currency = 'EUR'
  WHERE title = '2nd Cook — Offshore Vessel (OSV / DSV, DP2), Europe';
UPDATE vacancies SET salary_from = 195, salary_to = NULL, salary_period = 'day', currency = 'EUR'
  WHERE title = '2nd Officer (DPO) — Survey Vessel (Amber Cecilia), Baltic / Worldwide';
UPDATE vacancies SET salary_from = 350, salary_to = NULL, salary_period = 'day', currency = 'EUR'
  WHERE title = 'Chief Officer (DPO) — PSV DP2 (Las Palmas → Nigeria), Worldwide';

-- ── OSM Poland — 3rd Officer (DPO), SOV / W2W ───────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = '3rd Officer (DPO) — SOV / W2W (Cyprus flag), France';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OSM Poland%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OSM Poland Sp. z o.o.', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer (DPO) — SOV / W2W (Cyprus flag), France', '3rd Officer', 'SOV', 6359, NULL, 'EUR', '4 weeks (4/4 rotation)', '2026-07-22',
'OSM Thome (OSM Poland) is looking for a 3rd Officer / DPO to join a Service Operation Vessel (SOV / W2W) working an offshore wind field off France. A 4-week, 4/4 rotation for a DP-qualified officer, paying 6,359 EUR per month (on board only). Joining 22 July 2026.

## Vessel particulars
- Type: SOV / walk-to-work (Cyprus flag)
- Trading area: France (offshore wind)
- Rotation: 4 weeks, 4/4, joining 22 July 2026

## Requirements
- Experience in rank
- Full DP certificate
- Offshore experience (only offshore-experienced candidates considered)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer (DPO) — SOV / W2W (Cyprus flag), France');
END $$;

-- ── Chipolbrok — 3rd Engineer, General Cargo / MPP (MV Nowowiejski) ──────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = '3rd Engineer — General Cargo / MPP Heavy-Lift (MV Nowowiejski), Worldwide';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Chipolbrok%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Chipolbrok', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — General Cargo / MPP Heavy-Lift (MV Nowowiejski), Worldwide', '3rd Engineer', 'General Cargo', 4165, NULL, 'USD', '4 months (± 1)', NULL,
'Chipolbrok is recruiting a 3rd Engineer for the MV Nowowiejski, a multipurpose / heavy-lift vessel with cranes up to 350 mt, trading worldwide — direct employment, no agents. A 4-month contract (± 1), paying 4,165 USD per month, plus HMS+ health insurance and further benefits from the second contract. Joining ASAP.

## Vessel particulars
- Type: general cargo / MPP heavy-lift (MV Nowowiejski, cranes up to 350 mt)
- Trading area: worldwide
- Contract: 4 months (± 1), joining ASAP

## Requirements
- Minimum one contract in rank as 3rd Engineer

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'crewing@chipolbrok.com.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — General Cargo / MPP Heavy-Lift (MV Nowowiejski), Worldwide');
END $$;

-- ── Polaris Usługi Morskie — 2nd Officer (DPO) + 2nd Engineer (DP), OSV ──────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title IN (
      '2nd Officer (DPO) — OSV (Malta flag), Europe / Angola',
      '2nd Engineer (DP) — OSV (Malta flag), Europe / Angola'
    );

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Polaris%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Polaris Usługi Morskie', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer (DPO) — OSV (Malta flag), Europe / Angola', '2nd Officer', 'OSV', NULL, NULL, 'USD', '± 6 weeks', '2026-08-14',
'Polaris Usługi Morskie is looking for a 2nd Officer / DPO for an offshore support vessel (OSV, Malta flag) trading Europe to Angola. A ~6-week contract, salary as per the company matrix. Joining 14 August 2026.

## Vessel particulars
- Type: offshore support vessel (OSV, Malta flag)
- Trading area: Europe – Angola
- Contract: ~6 weeks, joining 14 August 2026

## Requirements
- Experience in rank
- BOSIET / FOET
- Full DP Operator

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@maritime.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer (DPO) — OSV (Malta flag), Europe / Angola');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer (DP) — OSV (Malta flag), Europe / Angola', '2nd Engineer', 'OSV', NULL, NULL, 'USD', '± 6 weeks', '2026-08-14',
'Polaris Usługi Morskie is recruiting a 2nd Engineer (DP) for an offshore support vessel (OSV, Malta flag) trading Europe to Angola. A ~6-week contract, salary negotiable. Joining 14 August 2026.

## Vessel particulars
- Type: offshore support vessel (OSV, Malta flag)
- Trading area: Europe – Angola
- Contract: ~6 weeks, joining 14 August 2026

## Requirements
- Experience in rank
- BOSIET
- DP Maintenance

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@maritime.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer (DP) — OSV (Malta flag), Europe / Angola');
END $$;

-- ── Balteam Crewing Agency — Single Engineer + Master, CTV ──────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title IN (
      'Single Engineer — CTV (Crew Transfer Vessel), Baltic',
      'Master — CTV (Crew Transfer Vessel), Baltic'
    );

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Balteam%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Balteam Crewing Agency', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Single Engineer — CTV (Crew Transfer Vessel), Baltic', 'Single Engineer', 'CTV', 250, NULL, 'day', 'EUR', '2 weeks (± 1)', '2026-07-14',
'Balteam Crewing Agency is looking for a Single Engineer for a crew transfer vessel (CTV) working the Polish Baltic offshore-wind sector. A short 2-week (± 1) rotation, paying a day rate of **EUR 250 per day on board** plus a 20 EUR food allowance and accommodation ashore. Joining 14 July 2026.

## Vessel particulars
- Type: crew transfer vessel (CTV, Cyprus management, engine Cat C32)
- Particulars: length / breadth 22 / 8 m
- Trading area: Polish Baltic
- Contract: 2 weeks (± 1), joining 14 July 2026

## Requirements
- Experience on similar vessels / engines
- Passenger Ship Crowd & Crisis Management and Human Behaviour / PAX safety training (can be arranged online)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@balteam.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Single Engineer — CTV (Crew Transfer Vessel), Baltic');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Master — CTV (Crew Transfer Vessel), Baltic', 'Master (Captain)', 'CTV', 300, NULL, 'day', 'EUR', '2 weeks (± 1)', '2026-07-14',
'Balteam Crewing Agency is recruiting a Master for a crew transfer vessel (CTV) in the Polish Baltic offshore-wind sector. A short 2-week (± 1) rotation, paying a day rate of **EUR 300 per day** plus a 20 EUR food allowance and accommodation ashore. Joining 14 July 2026.

## Vessel particulars
- Type: crew transfer vessel (CTV, Cyprus management, engine Cat C32)
- Particulars: length / breadth 22 / 8 m
- Trading area: Polish Baltic
- Contract: 2 weeks (± 1), joining 14 July 2026

## Requirements
- CTV and wind-farm experience
- Passenger Ship Crowd & Crisis Management and Human Behaviour / PAX safety training (can be arranged online)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@balteam.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Master — CTV (Crew Transfer Vessel), Baltic');
END $$;

-- ── OJ Crew HR Management — Chief Engineer + 2nd Engineer, Bulk Carrier ──────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title IN (
      'Chief Engineer — Bulk Carrier (58,713 DWT, 2009), Worldwide',
      '2nd Engineer — Bulk Carrier (58,713 DWT, 2010), Worldwide'
    );

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OJ Crew%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OJ Crew HR Management', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — Bulk Carrier (58,713 DWT, 2009), Worldwide', 'Chief Engineer', 'Bulk Carrier', 10800, NULL, 'USD', '4 months', '2026-08-01',
'OJ Crew HR Management is looking for a Chief Engineer for a bulk carrier (58,713 DWT, built 2009) trading worldwide. A 4-month contract paying 10,800 USD per month plus a rejoining bonus. Joining end of July / beginning of August 2026.

## Vessel particulars
- Type: bulk carrier (built 2009)
- Particulars: 33,096 GT, 58,713 DWT, main engine MAN B&W MC-C, generators Daihatsu / Yanmar
- Trading area: worldwide
- Contract: 4 months, joining end July / early August 2026

## Requirements
- Fluent English, valid STCW and medical certificates, EU citizen
- Minimum 12 months in rank and at least one contract on bulk carriers
- Experience with MAN B&W MC-C engines

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'patryk@ojcrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — Bulk Carrier (58,713 DWT, 2009), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Bulk Carrier (58,713 DWT, 2010), Worldwide', '2nd Engineer', 'Bulk Carrier', 9000, NULL, 'USD', '4 months', '2026-08-01',
'OJ Crew HR Management is recruiting a 2nd Engineer for a bulk carrier (58,713 DWT, built 2010) trading worldwide. A 4-month contract paying 9,000 USD per month on board. Joining August 2026.

## Vessel particulars
- Type: bulk carrier (built 2010)
- Particulars: 33,096 GT, 58,713 DWT, main engine MAN B&W MC-C, generators Daihatsu / Yanmar, BWTS ERMA FIRST
- Trading area: worldwide
- Contract: 4 months, joining August 2026

## Requirements
- Fluent English, valid STCW and medical certificates, EU citizen
- Minimum 12 months in rank
- Candidate must be familiar with MAN B&W MC-C engines

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'patryk@ojcrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Bulk Carrier (58,713 DWT, 2010), Worldwide');
END $$;
