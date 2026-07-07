-- Vacancies from crewing.portalmorski.pl (07.07.2026, batch B).
-- Recurring vacancies already on the board are REFRESHED (date bumped,
-- reactivated); genuinely new vacancies are inserted (guarded by title).
-- Idempotent — safe to re-run. Run this whole script once in the Supabase SQL Editor.

-- ── Refresh recurring vacancies (bump date so they show as fresh) ────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 500, salary_to = 850, currency = 'USD'
  WHERE title = 'Engine Cadet — LPG / Bulk Carrier, Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 500, salary_to = 850, currency = 'USD'
  WHERE title = 'Engine Cadet — Chemical Tanker / RoRo, Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 17300, currency = 'USD'
  WHERE title = '2nd Engineer — LNG Carrier (Avenir Achievement), Caribbean';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 9337, currency = 'USD'
  WHERE title = 'Chief Officer — RO-RO (Tirranna), Worldwide / US Ports';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 4596, currency = 'GBP', joining_date = '2026-07-11'
  WHERE title = 'AB — Ro-Ro Cargo Ship (PRECISION), Liverpool — Dublin';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 4100, currency = 'USD', joining_date = '2026-07-15'
  WHERE title = '3rd Officer — Heavy Lift / MPP, Worldwide';

-- ── Nova Ship Crew Poland — 2nd Officer, General Cargo / MPP ─────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Nova Ship Crew Poland' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Nova Ship Crew Poland', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer — General Cargo / MPP (4,750 GT), Europe / Mediterranean', '2nd Officer', 'General Cargo', 4000, NULL, 'EUR', '3 months', '2026-07-15',
'Nova Ship Crew Poland is recruiting a 2nd Officer for a general cargo / MPP vessel (4,750 GT, 110 m; deck officers: Master, Chief Officer, 2nd Officer) trading Europe and the Mediterranean Sea. Direct employment through the owner''s office (no agencies) — all contractual and payroll matters handled by the owner, medical insurance including family. 3-month contract, joining mid July 2026, 4,000 EUR/month (negotiable).

## Requirements
- experience in rank
- valid STCW documentation

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info@novashipcrewpoland.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer — General Cargo / MPP (4,750 GT), Europe / Mediterranean');
END $$;

-- ── Hartmann Crew Consultants — Chief Officer, Bulk Carrier ──────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Hartmann Crew Consultants' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Hartmann Crew Consultants', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Bulk Carrier (DWT 37,720), Worldwide', 'Chief Officer (Chief Mate)', 'Bulk Carrier', 7200, 7400, 'EUR', '4 months', '2026-07-31',
'Hartmann Crew Consultants is recruiting a Chief Officer for a bulk carrier (DWT 37,720, ECDIS ChartWorld eGlobe) trading worldwide. 4-month contract, joining end of July, 7,200 EUR/month (negotiable, up to 7,400 EUR).

## Requirements
- experience on bulk carriers
- US visa and SHA certificate welcome

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info@hartmann-crew.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Bulk Carrier (DWT 37,720), Worldwide');
END $$;

-- ── SMT Shipping (new company) — Fitter / Welder, Floating Crane ─────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'SMT Shipping' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'SMT Shipping', 'Sopot, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Fitter / Welder — Floating Crane (Kraan 93), Europe / Netherlands', 'Fitter / Welder', 'Floating Crane', 2500, NULL, 'USD', '1-2 months', NULL,
'SMT Shipping is recruiting a Fitter / Welder for the floating crane m/v Kraan 93 operating in Europe and the Netherlands. 1-2 month contract, joining ASAP, 2,500 USD/month (on board only).

## Requirements
- FTR (fitter) experience
- EU citizen

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.desk@smtshipping.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Fitter / Welder — Floating Crane (Kraan 93), Europe / Netherlands');
END $$;

-- ── Crewplanet — Chief Cook / Cook, Ro-Pax ──────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Crewplanet' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Crewplanet', 'Riga, Latvia');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Cook / Cook — Ro-Pax, EU', 'Chief Cook / Cook', 'RoRo Ferry / Ro-Pax', 2274, NULL, 'EUR', '2 weeks on / off', '2026-07-08',
'Crewplanet is recruiting a Chief Cook / Cook for a Ro-Ro passenger (Ro-Pax) ferry trading the EU. 2 weeks on / 2 weeks off rotation, joining 08 July 2026, 2,274 EUR per 2-week rotation.

## Requirements
- previous experience in rank

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'cv@crewplanet.eu'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Cook / Cook — Ro-Pax, EU');
END $$;
