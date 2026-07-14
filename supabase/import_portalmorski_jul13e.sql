-- Vacancies from crewing.portalmorski.pl (13.07.2026, batch E).
-- Vacancies already on the board are REFRESHED; new ones inserted (title-guarded).
-- Descriptions are unique, rewritten Markdown. Idempotent — safe to re-run.
-- Day rates go in salary_from with salary_period = 'day'. Web-only-application
-- posts (Clyde RoRo/RoPax) carry no forwarding contact_email.

alter table public.vacancies
  add column if not exists salary_period text not null default 'month';

-- ── Refresh recurring posts re-advertised today ─────────────────────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
  WHERE title IN (
    'Master — Bulk Carrier (18,825 GT), Worldwide',
    '2nd Engineer / Mechanic — HVDC Platform (DolWin Epsilon), North Sea',
    'Chief Engineer — Bulk Carrier (58,713 DWT, 2009), Worldwide'
  );

-- ── C P Marine UK — 2nd Cook, SOV (day rate) ────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = '2nd Cook — SOV (UK work permit), United Kingdom';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'C P Marine%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'C P Marine UK Ltd', 'Hull, United Kingdom');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Cook — SOV (UK work permit), United Kingdom', '2nd Cook', 'SOV', 180, NULL, 'day', 'GBP', '4-5 weeks', '2026-08-01',
'C P Marine UK is looking for a 2nd Cook for a Service Operation Vessel (SOV) working in UK waters. A short 4–5 week assignment paying a day rate of **GBP 180 per day** (subject to tax deductions). Joining 1 August 2026.

## Vessel particulars
- Type: SOV (service operation vessel)
- Trading area: United Kingdom
- Contract: ~4–5 weeks, joining 1 August 2026

## Requirements
- Experience as 2nd Cook
- UK Right to Work permit is required

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info@cpmarineuk.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Cook — SOV (UK work permit), United Kingdom');
END $$;

-- ── Clyde Marine Recruitment Poland — AB, Motorman, AB delivery (Ro-Ro) ──────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title IN (
      'AB (Able Seaman) — Ro-Ro Ferry (RoPax), Irish Sea',
      'Motorman — Ro-Ro Ferry (RoPax), Irish Sea',
      'AB (Able Seaman) — Ro-Ro Delivery (RoPax, Cyprus flag), Greece / Canada'
    );

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Clyde Marine%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Clyde Marine Recruitment Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB (Able Seaman) — Ro-Ro Ferry (RoPax), Irish Sea', 'AB (Able Seaman)', 'Ro-Ro', 5015, NULL, 'EUR', '6 weeks on / 3 weeks off', NULL,
'Clyde Marine Recruitment is looking for an AB to join a RoPax ferry on the Irish Sea. A fixed 6-weeks-on / 3-weeks-off rotation, paying 5,015 EUR per month, joining ASAP. Good rates of pay, a Marine Health benefit plan for the family and a seniority bonus after one year.

## Vessel particulars
- Type: ro-ro / ro-pax ferry
- Trading area: Irish Sea (UK waters)
- Rotation: 6 weeks on / 3 weeks off, joining ASAP

## Requirements
- Experience in rank as AB
- UK resident or relevant work permit (vessel operates in UK waters)
- Basic IGF certificate

## How to apply
Applications are accepted only through Clyde Marine''s digital profile portal: https://www.clyderecruit.com', true, true, NULL
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB (Able Seaman) — Ro-Ro Ferry (RoPax), Irish Sea');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Motorman — Ro-Ro Ferry (RoPax), Irish Sea', 'Motorman', 'Ro-Ro', 4925, NULL, 'EUR', '6 weeks on / 6 weeks off', '2026-06-04',
'Clyde Marine Recruitment needs a Motorman for a RoPax ferry on the Irish Sea. A 6-weeks-on / 6-weeks-off rotation paying 4,925 EUR per month. Good rates of pay, a Marine Health benefit plan for the family and a seniority bonus after one year.

## Vessel particulars
- Type: ro-ro / ro-pax ferry
- Trading area: Irish Sea (UK waters)
- Rotation: 6 weeks on / 6 weeks off

## Requirements
- Experience in rank as Motorman
- UK resident or relevant work permit (vessel operates in UK waters)

## How to apply
Applications are accepted only through Clyde Marine''s digital profile portal: https://www.clyderecruit.com', true, true, NULL
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Motorman — Ro-Ro Ferry (RoPax), Irish Sea');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB (Able Seaman) — Ro-Ro Delivery (RoPax, Cyprus flag), Greece / Canada', 'AB (Able Seaman)', 'Ro-Ro', 3295, NULL, 'EUR', 'around 8 weeks', '2026-07-16',
'Clyde Marine Recruitment is recruiting an AB for a RoPax vessel delivery voyage from Greece to Canada. A project contract of around 8 weeks (may be extended by the nature of the delivery), paying 3,295 EUR per month on board. Joining 16 July 2026.

## Vessel particulars
- Type: ro-pax (Cyprus flag), delivery voyage
- Trading area: Greece – Canada
- Contract: ~8 weeks, joining 16 July 2026

## Requirements
- Experience in rank; ro-ro / ro-pax experience
- Cyprus flag documents and RoPax courses

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'ngierczynska@clyderecruit.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB (Able Seaman) — Ro-Ro Delivery (RoPax, Cyprus flag), Greece / Canada');
END $$;

-- ── TOS Poland — Excavator Operator + OS/Deckhand, Fall Pipe vessel (day rate) ─
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title IN (
      '2nd Excavator Operator — DP2 Fall Pipe Rock Installation Vessel, Europe',
      'OS / Deckhand — DP2 Fall Pipe Rock Installation Vessel, Europe'
    );

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'TOS Poland%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'TOS Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Excavator Operator — DP2 Fall Pipe Rock Installation Vessel, Europe', 'Excavator Operator', 'Offshore Vessel', 255, NULL, 'day', 'EUR', '6 weeks on / 6 weeks off', '2026-07-08',
'TOS Poland is looking for a 2nd Excavator Operator for a DP2 fall-pipe rock-installation vessel (Simon Stevin class) working in Europe. An equal-time 6-weeks-on / 6-weeks-off rotation, paying **EUR 255 per day net** on a Polish contract (after ZUS and tax). Joining 8 July 2026.

## Vessel particulars
- Type: DP2 fall-pipe rock-installation vessel (LOA 191.5 m, 2× Liebherr 984 excavators, built 2010)
- Trading area: Europe
- Rotation: 6 weeks on / 6 weeks off, joining 8 July 2026

## Requirements
- Experience in rank as excavator operator
- STCW Basic Safety, valid medical, Seaman''s Book
- UK work permit or English at B2 level

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info.poland@tospeople.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Excavator Operator — DP2 Fall Pipe Rock Installation Vessel, Europe');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'OS / Deckhand — DP2 Fall Pipe Rock Installation Vessel, Europe', 'OS (Ordinary Seaman)', 'Offshore Vessel', 184, NULL, 'day', 'EUR', '6 weeks on / 6 weeks off', '2026-07-01',
'TOS Poland is recruiting an OS / Deckhand for a DP2 fall-pipe rock-installation vessel (Simon Stevin class) working in Europe. An equal-time 6-weeks-on / 6-weeks-off rotation, paying **EUR 184 per day net** on a Polish contract (after ZUS and tax). Joining 1 July or 10 August 2026.

## Vessel particulars
- Type: DP2 fall-pipe rock-installation vessel (LOA 191.5 m, 2× Liebherr 984 excavators, built 2010)
- Trading area: Europe
- Rotation: 6 weeks on / 6 weeks off

## Requirements
- STCW Basic Safety, valid medical, Seaman''s Book
- UK work permit

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info.poland@tospeople.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'OS / Deckhand — DP2 Fall Pipe Rock Installation Vessel, Europe');
END $$;

-- ── Stödig Ship Management Poland — Motorman, jack-up windfarm barge ─────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = 'Motorman — Jack-Up Windfarm Barge, Offshore';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Stödig%' OR name ILIKE 'Stodig%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Stödig Ship Management Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Motorman — Jack-Up Windfarm Barge, Offshore', 'Motorman', 'Jack-up', NULL, NULL, 'EUR', '4 weeks', NULL,
'Stödig Ship Management is looking for a Motorman for windcarrier jack-up barges with a Norwegian owner. A 4-week contract in the offshore-wind sector, joining end of June. Salary discussed at the office.

## Vessel particulars
- Type: jack-up windcarrier barge (Norwegian owner)
- Sector: offshore wind
- Contract: 4 weeks, joining end of June

## Requirements
- At least 3 years of sea service
- Good spoken and written English
- GWO; HUET or BOSIET

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.poland@stodig.no'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Motorman — Jack-Up Windfarm Barge, Offshore');
END $$;
