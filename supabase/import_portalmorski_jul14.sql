-- Vacancies from crewing.portalmorski.pl (14.07.2026 batch).
-- Vacancies already on the board are REFRESHED; new ones inserted (title-guarded).
-- Descriptions are unique, rewritten Markdown. Idempotent — safe to re-run.
-- Day rates go in salary_from with salary_period = 'day'.

alter table public.vacancies
  add column if not exists salary_period text not null default 'month';

-- ── Refresh recurring posts re-advertised today ─────────────────────────────
UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
  WHERE title IN (
    '3rd Engineer — Car Carrier, Europe',
    '3rd Engineer — Car Carrier (UECC, dual-fuel), Europe',
    'Chief Engineer — Bulk Carrier (58,713 DWT, 2009), Worldwide',
    '2nd Engineer — Bulk Carrier (58,713 DWT, 2010), Worldwide',
    'Master — Container Ship (GT 3778), Europe / India / USA'
  );

-- ── Dohle Marine Services Europe — Chief Engineer, general cargo ─────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = 'Chief Engineer — General Cargo (MV Louise Auerbach), USA / Chile';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Dohle%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Dohle Marine Services Europe', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — General Cargo (MV Louise Auerbach), USA / Chile', 'Chief Engineer', 'General Cargo', 10350, NULL, 'month', 'USD', 'permanent rotation', '2026-08-15',
'Dohle Marine Services is looking for a Chief Engineer for the general cargo vessel MV Louise Auerbach, trading between the USA and Chile. A senior engine-room posting on a well-managed modern unit, paying 10,350 USD per month. Joining 15 August 2026.

## Vessel particulars
- Vessel: MV Louise Auerbach
- Type: general cargo / multipurpose
- Trading area: USA – Chile
- Joining: 15 August 2026

## Requirements
- Valid Chief Engineer licence (unlimited)
- Previous experience in rank on general cargo / multipurpose tonnage
- Full set of STCW certificates and a valid medical

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'work@doehle-mse.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — General Cargo (MV Louise Auerbach), USA / Chile');
END $$;

-- ── Wilhelmsen Marine Personnel — Master, LNG carrier ───────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = 'Master — LNG Carrier (Avenir Accolade), Caribbean';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Wilhelmsen%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Wilhelmsen Marine Personnel', 'Szczecin, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Master — LNG Carrier (Avenir Accolade), Caribbean', 'Master', 'LNG Carrier', 22100, NULL, 'month', 'USD', 'approx 10 weeks', NULL,
'Wilhelmsen Marine Personnel is recruiting a Master for the small-scale LNG carrier Avenir Accolade (IMO 9830903, Malta flag), trading in the Caribbean. A high-earning command posting on a modern gas carrier, paying 22,100 USD per month over a contract of about 10 weeks. Immediate joining.

## Vessel particulars
- Vessel: Avenir Accolade (IMO 9830903), Malta flag
- Type: LNG carrier (small-scale)
- Trading area: Caribbean
- Contract: approx. 10 weeks, immediate joining

## Requirements
- Valid Master licence (unlimited)
- Command or senior experience on LNG / gas carriers
- Advanced Liquefied Gas Tanker Cargo Operations plus full STCW set

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'WMP.PL.RECRUITING@wilhelmsen.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Master — LNG Carrier (Avenir Accolade), Caribbean');
END $$;

-- ── SMT Shipping — Chief Engineer, bulk carrier ─────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = 'Chief Engineer — Bulk Carrier (mv Venture), Worldwide';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'SMT Shipping%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'SMT Shipping', 'Sopot, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — Bulk Carrier (mv Venture), Worldwide', 'Chief Engineer', 'Bulk Carrier', 9500, NULL, 'month', 'USD', 'about 2 months', '2026-07-20',
'SMT Shipping is looking for a Chief Engineer for the bulk carrier mv Venture, trading worldwide. A short senior contract of around two months, paying 9,500 USD per month. Joining 20 July 2026.

## Vessel particulars
- Vessel: mv Venture
- Type: bulk carrier
- Trading area: worldwide
- Contract: about 2 months, joining 20 July 2026

## Requirements
- Valid Chief Engineer licence
- Previous experience in rank on bulk carriers
- Full set of STCW certificates and a valid medical

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.desk@smtshipping.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — Bulk Carrier (mv Venture), Worldwide');
END $$;

-- ── OSM Poland — Master, AHTS (day rate) ────────────────────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = 'Master — AHTS (Aurora Challenger, day rate), Europe / UK';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OSM Poland%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OSM Poland Sp. z o.o.', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Master — AHTS (Aurora Challenger, day rate), Europe / UK', 'Master', 'AHTS', 818, NULL, 'day', 'USD', '4 weeks', '2026-07-22',
'OSM Poland is recruiting a Master for the anchor-handling tug supply vessel Aurora Challenger, working in Europe and UK waters. A short offshore rotation paying a day rate of **818 USD per day**, joining 22 July 2026.

## Vessel particulars
- Vessel: Aurora Challenger
- Type: AHTS (anchor-handling tug supply)
- Trading area: Europe and UK
- Contract: 4 weeks, joining 22 July 2026

## Requirements
- Valid Master licence with AHTS command experience
- Offshore / DP background and relevant safety courses
- Full set of STCW certificates and a valid medical

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Master — AHTS (Aurora Challenger, day rate), Europe / UK');
END $$;

-- ── Stan Shipping Agency — Chief Officer, general cargo ──────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = 'Chief Officer — General Cargo (mv Listervik), Baltic';

  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Stan Shipping%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Stan Shipping Agency', 'Szemud, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer — General Cargo (mv Listervik), Baltic', 'Chief Officer', 'General Cargo', 6335, NULL, 'month', 'EUR', '6 weeks on / 6 weeks off (+/-2)', '2026-08-01',
'Stan Shipping Agency is looking for a Chief Officer for the general cargo vessel mv Listervik (Faroe Islands flag), trading in the Baltic. An equal-time rotation of 6 weeks on / 6 weeks off (plus or minus two weeks), paying 6,335 EUR per month. Joining beginning of August 2026.

## Vessel particulars
- Vessel: mv Listervik, Faroe Islands flag
- Type: general cargo
- Trading area: Baltic
- Rotation: 6 weeks on / 6 weeks off (+/-2), joining beginning of August 2026

## Requirements
- Valid Chief Officer licence
- Experience in rank on general cargo / multipurpose vessels
- Full set of STCW certificates and a valid medical

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'lukasz.jamroz@stanship.com.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer — General Cargo (mv Listervik), Baltic');
END $$;

-- ── Polaris Usługi Morskie — LPG officers & engineers (Yara / Pazifik) ───────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Polaris%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Polaris Usługi Morskie', 'Szczecin, Poland');
  END IF;

  -- 3rd Officer — Yara Sela
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = '3rd Officer — LPG Carrier (Yara Sela), Worldwide';
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer — LPG Carrier (Yara Sela), Worldwide', '3rd Officer', 'LPG Carrier', 4750, NULL, 'month', 'USD', 'approx 14 weeks', '2026-08-01',
'Polaris Usługi Morskie is recruiting a 3rd Officer for the LPG carrier Yara Sela (IMO 9734850), trading worldwide. A contract of about 14 weeks paying 4,750 USD per month plus bonuses. Joining August 2026.

## Vessel particulars
- Vessel: Yara Sela (IMO 9734850)
- Type: LPG carrier
- Trading area: worldwide
- Contract: approx. 14 weeks, joining August 2026

## Requirements
- Minimum 1 year in rank on tankers over 15,000 GT
- STCW certificates and Basic Training for Liquefied Gas Tanker Cargo Operations
- Valid medical

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@maritime.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer — LPG Carrier (Yara Sela), Worldwide');

  -- 3rd Officer — Yara Freya
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = '3rd Officer — LPG Carrier (Yara Freya), Worldwide';
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Officer — LPG Carrier (Yara Freya), Worldwide', '3rd Officer', 'LPG Carrier', 4750, NULL, 'month', 'USD', 'approx 14 weeks', '2026-09-01',
'Polaris Usługi Morskie is looking for a 3rd Officer for the LPG carrier Yara Freya (IMO 9725500), trading worldwide. A contract of about 14 weeks paying 4,750 USD per month plus bonuses. Joining September 2026.

## Vessel particulars
- Vessel: Yara Freya (IMO 9725500)
- Type: LPG carrier
- Trading area: worldwide
- Contract: approx. 14 weeks, joining September 2026

## Requirements
- Minimum 1 year in rank on tankers over 15,000 GT
- STCW certificates and Basic Training for Liquefied Gas Tanker Cargo Operations
- Valid medical

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@maritime.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Officer — LPG Carrier (Yara Freya), Worldwide');

  -- 3rd Engineer — Yara Kara
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = '3rd Engineer — LPG Carrier (Yara Kara), Worldwide';
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — LPG Carrier (Yara Kara), Worldwide', '3rd Engineer', 'LPG Carrier', 5700, NULL, 'month', 'USD', 'approx 14 weeks', '2026-09-30',
'Polaris Usługi Morskie is recruiting a 3rd Engineer for the LPG carrier Yara Kara (IMO 9734836), trading worldwide. A contract of about 14 weeks paying 5,700 USD per month plus bonuses. Joining end of September 2026.

## Vessel particulars
- Vessel: Yara Kara (IMO 9734836)
- Type: LPG carrier
- Trading area: worldwide
- Contract: approx. 14 weeks, joining end of September 2026

## Requirements
- Minimum 1 year in rank on tankers over 15,000 GT
- STCW certificates and Basic Training for Liquefied Gas Tanker Cargo Operations
- Valid medical

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@maritime.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — LPG Carrier (Yara Kara), Worldwide');

  -- 3rd Engineer — Pazifik
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = '3rd Engineer — LPG Carrier (Pazifik), Worldwide';
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — LPG Carrier (Pazifik), Worldwide', '3rd Engineer', 'LPG Carrier', 5700, NULL, 'month', 'USD', 'approx 14 weeks', '2026-10-01',
'Polaris Usługi Morskie is looking for a 3rd Engineer for the LPG carrier Pazifik (IMO 9293430), trading worldwide. A contract of about 14 weeks paying 5,700 USD per month plus bonuses. Joining October 2026.

## Vessel particulars
- Vessel: Pazifik (IMO 9293430)
- Type: LPG carrier
- Trading area: worldwide
- Contract: approx. 14 weeks, joining October 2026

## Requirements
- Minimum 1 year in rank on tankers over 15,000 GT
- STCW certificates and Basic Training for Liquefied Gas Tanker Cargo Operations
- Valid medical

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@maritime.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — LPG Carrier (Pazifik), Worldwide');
END $$;

-- ── OJ Crew HR Management — AB (research) & 3rd Engineer (OSV), day rates ─────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OJ Crew%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OJ Crew HR Management', 'Szczecin, Poland');
  END IF;

  -- AB — Research Vessel (day rate)
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = 'AB (Able Seaman) — Research Vessel (day rate), Poland';
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB (Able Seaman) — Research Vessel (day rate), Poland', 'AB (Able Seaman)', 'Research Vessel', 130, NULL, 'day', 'EUR', '4 weeks (+/-1), 80/130 off/on', '2026-07-22',
'On behalf of its client, OJ Crew HR Management is looking for an AB to join a research vessel working in Poland. A short project of 4 weeks (plus or minus one) on an 80/130 off/on rotation, paying **130 EUR per day net**. Joining 22 July 2026.

## Vessel particulars
- Type: research vessel (GT 498, DWT 220, Mitsubishi 1250 kW ME, Lithuania flag)
- Trading area: Poland
- Contract: 4 weeks (+/-1), joining 22 July 2026

## Requirements
- Relevant AB experience
- Good English; valid STCW certificates and medical certificate
- EU passport

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'oil@ojcrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB (Able Seaman) — Research Vessel (day rate), Poland');

  -- 3rd Engineer — OSV (day rate)
  UPDATE vacancies SET created_at = now(), updated_at = now(), is_active = true
    WHERE title = '3rd Engineer — OSV (Offshore Support Vessel, day rate), Qatar';
  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '3rd Engineer — OSV (Offshore Support Vessel, day rate), Qatar', '3rd Engineer', 'OSV', 180, NULL, 'day', 'EUR', '8 weeks (+/-2)', '2026-08-12',
'OJ Crew HR Management is recruiting a 3rd Engineer for an offshore support vessel working in Qatar. A contract of 8 weeks (plus or minus two), paying a day rate of **180 EUR per day** (negotiable depending on experience). Joining 12 August 2026.

## Vessel particulars
- Type: OSV / offshore support vessel (GT 4399, 2x Niigata 8L28 HX 2206 kW ME, Marshall Islands flag)
- Trading area: Qatar
- Contract: 8 weeks (+/-2), joining 12 August 2026

## Requirements
- Relevant OSV engine-room experience
- BOSIET, CA-EBS, GWO Sea Survival, GWO Manual Handling
- Valid STCW documents, medical certificate and a very good command of working English

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'oil@ojcrew.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '3rd Engineer — OSV (Offshore Support Vessel, day rate), Qatar');
END $$;
