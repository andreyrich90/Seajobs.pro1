-- Vacancies from crewing.portalmorski.pl (09.07.2026).
-- Recurring vacancies already on the board are REFRESHED; genuinely new
-- vacancies are inserted (guarded by title). Fuller descriptions.
-- Idempotent — safe to re-run. Run once in the Supabase SQL Editor.

-- ── Refresh recurring Euro Shipping coaster vacancies ───────────────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 6850, currency = 'EUR', joining_date = '2026-08-15'
  WHERE title = 'Master — General Cargo Coaster, Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 8000, salary_to = 8500, currency = 'EUR', joining_date = '2026-07-31'
  WHERE title = 'Chief Engineer (Single) — General Cargo Coaster (Newbuilding), Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 7000, salary_to = 7500, currency = 'EUR', joining_date = '2026-07-31'
  WHERE title = 'Chief Engineer (Single) — General Cargo Coaster, Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true, salary_from = 5200, currency = 'EUR', joining_date = '2026-08-15'
  WHERE title = 'Chief Officer — General Cargo Coaster (Newbuilding), Worldwide';

-- ── Baltimex — 3rd Officer + Chief Officer, General Cargo / MPP (8,620 GT) ───
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Baltimex' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Baltimex', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — General Cargo / MPP (8,620 GT), Worldwide', 'Chief Officer (Chief Mate)', 'General Cargo', 6300, 6500, 'USD', '3-4 months', '2026-07-15',
'Baltimex is recruiting a Chief Officer for a general cargo / MPP vessel (8,620 GT) trading worldwide with a mixed-nationality crew. As Chief Mate you take charge of cargo operations, stability and deck maintenance on a mid-size multipurpose ship. 3-4 month contract, joining 15 July 2026, 6,300-6,500 USD/month.

## Vessel particulars
- Type: general cargo / MPP
- Size: 8,620 GT
- Crew: mixed nationalities
- Sailing area: worldwide

## Requirements
- Diploma II/1 and at least 1 year in rank
- full STCW documentation
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'abuczynska@baltimex.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — General Cargo / MPP (8,620 GT), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer — General Cargo / MPP (8,620 GT), Worldwide', '3rd Officer', 'General Cargo', 3300, NULL, 'USD', '3-4 months', '2026-07-15',
'Baltimex is recruiting a 3rd Officer for a general cargo / MPP vessel (8,620 GT) trading worldwide. A solid navigation-officer position on a mid-size multipurpose ship — passage planning, ECDIS and cargo watch duties. 3-4 month contract, joining 15 July 2026, 3,300 USD/month.

## Vessel particulars
- Type: general cargo / MPP
- Size: 8,620 GT
- Sailing area: worldwide

## Requirements
- valid Certificate of Competency for 3rd Officer / OOW
- full STCW documentation
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'abuczynska@baltimex.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer — General Cargo / MPP (8,620 GT), Worldwide');
END $$;

-- ── uniQrew ltd — Chief Officer, Container (CMA CGM Altamira) ────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'uniQrew ltd' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'uniQrew ltd', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Container Ship (CMA CGM Altamira, 2,126 TEU), Worldwide', 'Chief Officer (Chief Mate)', 'Container Ship', 8200, NULL, 'USD', '4 months', '2026-08-31',
'uniQrew ltd is recruiting a Chief Officer for the brand-new container ship MV CMA CGM Altamira (built 2024) trading worldwide. This is a modern LNG dual-fuel box ship — the contract includes a one-month familiarization on LNG paid at basic wage, so previous LNG experience is not essential. 4-month contract, joining end of August 2026, 8,200 USD/month.

## Vessel particulars
- Type: container ship
- Vessel: MV CMA CGM Altamira, IMO 9961350, built 2024
- DWT / capacity: 31,114 DWT · 2,126 TEU
- Main engine: MAN B&W 6S60ME-C10-GI (LNG dual-fuel)
- Sailing area: worldwide

## Requirements
- experience as Chief Officer on container vessels
- full STCW documentation (LNG familiarization provided on board)
- good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'uniqrew@uniqrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Container Ship (CMA CGM Altamira, 2,126 TEU), Worldwide');
END $$;
