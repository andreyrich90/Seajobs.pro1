-- 2 excavator-operator vacancies from crewing.portalmorski.pl (02.07.2026).
-- Idempotent: inserted only if the title does not already exist.
-- Run this whole script once in the Supabase SQL Editor.

-- ── TOS Poland — DP2 Rock Installation Vessel ────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'TOS%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'TOS Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Excavator Operator — DP2 Rock Installation Vessel (Simon Stevin), EU', 'Excavator Operator', 'Construction Support Vessel', 255, NULL, 'EUR', '6 weeks on / 6 weeks off', '2026-07-08',
'TOS Poland is recruiting a 2nd Excavator Operator for the DP2 Fall Pipe Rock Installation Vessel Simon Stevin (LOA 191.5 m, built 2010, 2 x Liebherr 984 excavators) operating in the EU. 6 weeks on / 6 weeks off rotation, joining 8 July 2026, 255 EUR/day net on a Polish contract (after ZUS and tax).

## Requirements
- experience in rank
- STCW Basic Safety Training
- valid Medical certificate
- seaman''s book
- UK work permit or English at B2 level

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'info.poland@tospeople.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Excavator Operator — DP2 Rock Installation Vessel (Simon Stevin), EU');
END $$;

-- ── Jupiter Shipping Services — Excavator / OS, General Cargo ─────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Jupiter Shipping Services' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Jupiter Shipping Services', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Excavator Operator / OS — General Cargo, Europe', 'Excavator Operator', 'General Cargo', 6000, NULL, 'EUR', '6 weeks', NULL,
'Jupiter Shipping Services is recruiting an Excavator Operator / OS for general cargo vessels trading in Europe. 6-week contract, ASAP start, 6,000 EUR/month.

## Requirements
- OS Certificate and an Excavator licence
- experience on general cargo / bulk vessels
- good English
- age up to 50

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'jupiter@jupitershipping.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Excavator Operator / OS — General Cargo, Europe');
END $$;
