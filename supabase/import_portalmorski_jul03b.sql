-- Vacancies from crewing.portalmorski.pl (03.07.2026, batch B).
-- Recurring vacancies already on the board are REFRESHED (date bumped,
-- reactivated); genuinely new vacancies are inserted (guarded by title).
-- Idempotent — safe to re-run. Run this whole script once in the Supabase SQL Editor.

-- ── Refresh recurring vacancies (bump date so they show as fresh) ────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
  WHERE title = '2nd Officer (DPO Unlimited) — PSV, West Africa';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
  WHERE title = 'Engine Cadet — Chemical Tanker / RoRo, Worldwide';

UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
  WHERE title = 'Engine Cadet — LPG / Bulk Carrier, Worldwide';

-- ── Wilhelmsen Marine Personnel — new roles ─────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Wilhelmsen Marine Personnel' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Wilhelmsen Marine Personnel', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — PSV (Horn Island, DP2), Guyana', 'Chief Engineer', 'PSV', 14850, NULL, 'USD', '4 weeks on / off (permanent rotation)', '2026-07-21',
'Wilhelmsen Marine Personnel is recruiting a Chief Engineer for the PSV Horn Island (IMO 9752333, USA flag, built 2014; main propulsion 2 x Schottel, 4 x Caterpillar 3516C diesel generators) trading Guyana. DP2 vessel, 4 weeks on / off permanent rotation, joining 21 July 2026, 14,850 USD/month.

## Requirements
- experience in rank, PSV experience
- experience with 4 x Caterpillar generators
- DP experience and valid DP logbook
- good references and good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'WMP.PL.RECRUITING@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — PSV (Horn Island, DP2), Guyana');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Car Carrier PCTC (Cygnus / Prometheus / Leo Leader), Worldwide', 'Chief Officer (Chief Mate)', 'RoRo (Pure Car Carrier)', 8300, NULL, 'USD', '4 months', NULL,
'Wilhelmsen Marine Personnel is recruiting a Chief Officer for pure car / truck carriers (PCTC) — Cygnus Leader, Prometheus Leader and Leo Leader — trading worldwide. Opportunity for long-term cooperation. 4-month contract, joining July / August 2026, 8,300 USD/month.

## Requirements
- solid experience in rank
- valid STCW documentation
- good references and good English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'WMP.PL.RECRUITING@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Car Carrier PCTC (Cygnus / Prometheus / Leo Leader), Worldwide');
END $$;

-- ── Phoenocean — Motorman / Welder, RoRo (CLDN Somerset) ────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Phoenocean' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Phoenocean', 'Warsaw, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Motorman / Welder — RoRo (CLDN Somerset), Europe', 'Motorman', 'RoRo Cargo', 3231, NULL, 'EUR', '10 weeks on / 10 weeks off', '2026-07-06',
'Phoenocean is recruiting a Motorman (Mtm/welder) for owner CLDN on the RoRo vessel Somerset trading in Europe. 10 weeks on / 10 weeks off rotation, joining 6-10 July 2026, 3,231.76 EUR/month plus overtime 11.01 EUR/h.

## Requirements
- valid STCW courses
- Rating forming part of an Engineering Watch (III/4)
- welder certificate (SPAWACZ 111) welcome but not required

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'rekrutacja@phoenocean.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Motorman / Welder — RoRo (CLDN Somerset), Europe');
END $$;

-- ── Magellan Marine Gdynia — new company + two roles ────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Magellan Marine' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Magellan Marine', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — Container Ship (1,700 TEU, German Owner), Worldwide', 'Chief Officer (Chief Mate)', 'Container Ship', 7716, 8066, 'USD', '4 months', NULL,
'Magellan Marine (Gdynia) is recruiting a Chief Officer for a 1,700 TEU container vessel (main engine MAN B&W 7S60MC-C8.2) of a renowned German owner, trading worldwide. Joining ASAP. 4-month contract, 7,716–8,066 USD/month depending on experience, plus a rejoining bonus of 500 USD/month paid during the next contract.

## Requirements
- experience in rank on container vessels

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'crew@magellanmarine.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — Container Ship (1,700 TEU, German Owner), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — Bulk Carrier (61,208 DWT), Worldwide', '3rd Engineer', 'Bulk Carrier', 3800, NULL, 'USD', '3-4 months', NULL,
'Magellan Marine (Gdynia) is recruiting a 3rd Engineer for a bulk carrier (61,208 DWT, main engine MAN B&W 6S50 ME-B) trading worldwide. Joining ASAP. 3-4 month contract, 3,800 USD/month.

## Requirements
- experience as 3rd Engineer on similar ships

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'crew@magellanmarine.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — Bulk Carrier (61,208 DWT), Worldwide');
END $$;
