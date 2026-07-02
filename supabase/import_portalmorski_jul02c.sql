-- Vacancies from crewing.portalmorski.pl (02.07.2026, batch C).
-- All companies already exist from earlier imports, so each block reuses the
-- company via ILIKE and only inserts the new role (guarded by title). None of
-- these are repeats of an existing listing, so all are genuine INSERTs.
-- Idempotent — safe to re-run. Run this whole script once in the Supabase SQL Editor.

-- ── Fast Baltic — Master, GC coaster (Belgian flag, newbuilding) ──────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Fast Baltic' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Fast Baltic', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Master — General Cargo Coaster (Belgian Flag, Newbuilding), North / Baltic Sea', 'Master', 'Coaster', 15000, NULL, 'EUR', '2.5 months ± 2 weeks', NULL,
'Fast Baltic is recruiting a Master for a newbuilding general cargo / MPP coaster (3,850 DWAT, up to 3,000 GT) under the Belgian flag, with a Polish crew. Trading area: North Sea, UK, Ireland, France, Belgium and Holland. 2.5 months on / 2.5 months off rotation, joining August / September 2026, 15,000 EUR/month gross. Legal employment with health insurance, taxes and pension paid; the vessel calls at Polish ports.

## Requirements
- experience in rank on general cargo / coaster vessels
- valid documentation for a Belgian-flag vessel

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'ship@fastbaltic.com.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Master — General Cargo Coaster (Belgian Flag, Newbuilding), North / Baltic Sea');
END $$;

-- ── uniQrew ltd — 4th Engineer, RoRo (Grendi Futura) ─────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'uniQrew ltd' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'uniQrew ltd', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '4th Engineer — RoRo (Grendi Futura, Italian Flag), Europe / USA', '4th Engineer', 'RoRo Cargo', 3500, NULL, 'EUR', '12 weeks / 3 months', '2026-07-25',
'uniQrew ltd is recruiting a 4th Engineer for the RoRo vessel Grendi Futura (Italian flag, Polish crew) trading Europe to USA. 12-week (3-month) contract, joining 25 July 2026, 3,500 EUR/month net (owner arranges the Italian-flag social benefits). On board: single cabins, WiFi, gym, sauna and Polish TV.

## Requirements
- 4/E experience welcome
- valid USA visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'krzysztof@uniqrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '4th Engineer — RoRo (Grendi Futura, Italian Flag), Europe / USA');
END $$;

-- ── Phoenocean — AB, ro-ro (Cobelfret) ───────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Phoenocean' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Phoenocean', 'Warsaw, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB — RoRo (Cobelfret: Pauline / Somerset / Palatine), Europe', 'AB (Able Seaman)', 'RoRo Cargo', 3231, NULL, 'EUR', '10 weeks on / 10 weeks off', '2026-07-06',
'Phoenocean is recruiting an Able Seaman for owner COBELFRET on the RoRo vessels Pauline, Somerset or Palatine trading in Europe. Possibility of steady rotation and very good financial conditions. 10 weeks on / 10 weeks off, joining 06 July 2026, 3,231 EUR/month plus overtime 9.24 EUR.

## Requirements
- II/5 Able Seafarer Deck
- lashing experience
- RoRo courses NOT required

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'rekrutacja@phoenocean.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB — RoRo (Cobelfret: Pauline / Somerset / Palatine), Europe');
END $$;

-- ── Polaris Usługi Morskie — 2nd Officer / DPO, AHTS ─────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Polaris Usługi Morskie' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Polaris Usługi Morskie', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Officer / DPO — AHTS (Malta Flag), Europe', 'DPO (Dynamic Positioning Operator)', 'AHTS', NULL, NULL, 'EUR', '± 6 weeks', '2026-07-15',
'Polaris Usługi Morskie is recruiting a 2nd Officer / DPO for an AHTS (Malta flag) offshore vessel trading in Europe. Approx. 6-week contract, joining 15 July 2026. Salary as per the company salary matrix.

## Requirements
- experience in rank
- valid BOSIET / FOET
- DP ADVANCED certificate

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@maritime.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Officer / DPO — AHTS (Malta Flag), Europe');
END $$;

-- ── OSM Poland — AB, RoRo (Britannia Seaways, DFDS) ──────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OSM Poland' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OSM Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB — RoRo (Britannia Seaways, DFDS), Cuxhaven / England', 'AB (Able Seaman)', 'RoRo Cargo', 3744, NULL, 'EUR', '8 weeks on / 4 weeks off', '2026-07-07',
'OSM Poland (OSM Thome) is urgently recruiting an Able Seaman for the RoRo vessel Britannia Seaways (DFDS) trading Cuxhaven to England. 8 weeks on / 4 weeks off rotation, joining 07 July 2026 in Cuxhaven, 3,744 EUR/month (on board only).

## Requirements
- experience in rank, lashing experience preferable
- Able Body Seaman STCW Diploma, Basic Safety, Security Awareness, SBK
- valid health certificate
- experience on RoRo / lashing

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'emilia.korzeniowska@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB — RoRo (Britannia Seaways, DFDS), Cuxhaven / England');
END $$;

-- ── I.E.S Marine Co. Ltd. — 3rd Engineer, Bulk Carrier ───────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'I.E.S Marine Co. Ltd.' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'I.E.S Marine Co. Ltd.', 'Warsaw, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — Bulk Carrier (51,760 DWT), Worldwide', '3rd Engineer', 'Bulk Carrier', 4000, NULL, 'USD', '6 months', '2026-07-12',
'I.E.S Marine Co. Ltd. is recruiting a 3rd Engineer for a bulk carrier (51,760 DWT, 29,800 GT, built 2009, main engine Mitsubishi 6UEC50 LS II 8,045 kW, Bahamas flag) trading worldwide. 6-month contract, joining 12 July 2026, 4,000 USD/month.

## Requirements
- minimum 1 contract as 3/Eng
- valid US visa (mandatory)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'aplikacje@iespoland.eu'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — Bulk Carrier (51,760 DWT), Worldwide');
END $$;

-- ── Seamar — Electrical Cadet, General Cargo / MPP ───────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Seamar' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Seamar', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Electrical Cadet — General Cargo / MPP, Europe / South Africa', 'Electrical Cadet', 'General Cargo', 800, NULL, 'EUR', '3 months', '2026-07-17',
'Seamar is recruiting an Electrical (EE) Cadet for a general cargo / MPP vessel trading Europe to South Africa. Offer for students. 3-month contract, joining around 17 July 2026, 800 EUR/month plus overtime.

## Requirements
- offer for students (cadetship)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'seamar@seamar.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Electrical Cadet — General Cargo / MPP, Europe / South Africa');
END $$;
