-- Vacancies from crewing.portalmorski.pl (10.07.2026, batch B).
-- Genuinely new vacancies are inserted (guarded by title); nothing is deleted.
-- Descriptions are unique, rewritten Markdown (role intro + vessel particulars
-- + requirements + how to apply) — never a verbatim copy of the source.
-- Idempotent — safe to re-run. Run once in the Supabase SQL Editor.
--
-- Note: OSM "Chief Officer on PSV/CC" (14,410 USD) is already on the board as
-- "Chief Officer — OSV, 5-Week Rotation" (see import_portalmorski_jul10.sql),
-- so it is intentionally omitted here.
-- BSM and Phoenocean accept applications only through their own web portals
-- (Phoenocean explicitly deletes e-mailed applications), so those two carry no
-- forwarding contact_email — the apply link lives in the description instead.

-- ── OSM Poland — Steward/ess, Ro-Ro (Suecia Seaways, DFDS) ───────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'OSM Poland%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'OSM Poland Sp. z o.o.', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Steward / Stewardess — Ro-Ro Ferry (Suecia Seaways, DFDS), Netherlands–England', 'Steward / Stewardess', 'Ro-Ro', 2857, NULL, 'EUR', '6-7 weeks', NULL,
'OSM Thome (OSM Poland) urgently needs a Steward/ess to join the ro-ro ferry Suecia Seaways (DFDS) on the short-sea route between Vlaardingen in the Netherlands and Felixstowe in England. This is a fast-paced catering post on a busy North Sea ferry, with a quick 6–7 week rotation and an ASAP join. Pay is 2,857 EUR per month (paid onboard only).

## Vessel particulars
- Type: ro-ro ferry (Suecia Seaways, DFDS)
- Trading area: Vlaardingen (NL) – Felixstowe (UK)
- Contract: 6–7 weeks, joining ASAP

## Requirements
- Basic Safety Training (STCW)
- Security Awareness
- EU passport
- Valid Seaman''s Book (SBK)

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'recruitment.gda@osmthome.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Steward / Stewardess — Ro-Ro Ferry (Suecia Seaways, DFDS), Netherlands–England');
END $$;

-- ── MAG (Morska Agencja Gdynia) — AB, Ro-Ro (Liverpool–Dublin) ───────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'MAG - Morska Agencja Gdynia%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'MAG - Morska Agencja Gdynia', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'AB (Able Seaman) — Ro-Ro / Con-Ro, Liverpool–Dublin', 'AB (Able Seaman)', 'Ro-Ro', 4596, NULL, 'GBP', '6 weeks', '2026-07-26',
'Morska Agencja Gdynia (MAG) is recruiting an AB (Able Seaman) for a ro-ro / ro-lo / con-ro vessel working the Irish Sea between Liverpool and Dublin. A steady 6-week contract on a short-sea route, with a strong 4,596 GBP per month for an experienced ro-ro deck rating. Joining 26 July 2026.

## Vessel particulars
- Type: ro-ro / ro-lo / con-ro
- Trading area: Liverpool – Dublin
- Contract: 6 weeks, joining 26 July 2026

## Requirements
- Previous experience as AB on ro-ro vessels
- Full set of valid documents in line with STCW

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'application@mag.pl'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'AB (Able Seaman) — Ro-Ro / Con-Ro, Liverpool–Dublin');
END $$;

-- ── Bernhard Schulte Shipmanagement (Poland) — 2nd Engineer, Chemical Tanker ─
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Bernhard Schulte Shipmanagement%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Bernhard Schulte Shipmanagement (Poland)', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, '2nd Engineer — Chemical Tanker (Ravel, IMO 9866952), Europe', '2nd Engineer', 'Chemical Tanker', 10315, NULL, 'EUR', '8 weeks', '2026-08-01',
'Bernhard Schulte Shipmanagement (BSM Poland) is looking for a 2nd Engineer for the chemical tanker Ravel (IMO 9866952) trading in European waters. An 8-week contract on a modern chemical carrier, paying 10,315 EUR per month onboard, joining in August 2026.

## Vessel particulars
- Type: chemical tanker (Ravel, IMO 9866952)
- Trading area: Europe
- Contract: 8 weeks, joining August 2026

## Requirements
- Experience in rank and on chemical tankers
- Advanced Chemical Tanker certificate
- Good command of English

## How to apply
Register via the BSM careers portal: https://careersatsea.bs-shipmanagement.com/Home/register/SEAFR — further details are available at the BSM Poland office in Gdynia.', true, true, NULL
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = '2nd Engineer — Chemical Tanker (Ravel, IMO 9866952), Europe');
END $$;

-- ── Marlow Navigation Poland — Chief Officer (DPO), PSV DP2 ──────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Marlow Navigation Poland%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Marlow Navigation Poland Sp. z o.o.', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Officer (DPO) — PSV DP2 (Las Palmas → Nigeria), Worldwide', 'Chief Officer (Chief Mate)', 'PSV', NULL, NULL, 'EUR', '1 month', NULL,
'Marlow Navigation Poland needs a Chief Officer / DPO for a PSV (DP2) currently in drydock in Las Palmas and due to sail to Nigeria. A short one-month assignment joining ASAP, paying a day rate of **EUR 350 per day** for a Chief Officer with DPO experience on a PSV DP2 (or similar).

## Vessel particulars
- Type: PSV (DP2)
- Status: in drydock in Las Palmas, then proceeding to Nigeria
- Trading area: worldwide
- Contract: 1 month, joining ASAP

## Requirements
- Experience in rank as Chief Officer / DPO on PSV DP2 (or similar)
- Valid Dynamic Positioning certification

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'applications.mnpl@marlowgroup.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Officer (DPO) — PSV DP2 (Las Palmas → Nigeria), Worldwide');
END $$;

-- ── Phoenocean — Steward, Ro-Ro (Cobelfret "Palatine") ──────────────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'Phoenocean%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'Phoenocean', 'Warsaw, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Steward — Ro-Ro / Con-Ro (Cobelfret "Palatine"), Northern Europe', 'Steward / Stewardess', 'Ro-Ro', 2713, NULL, 'EUR', '10/10 weeks rotation', '2026-07-12',
'Phoenocean is recruiting a Steward (STWD) for the ro-ro / con-ro vessel Palatine, owned by Cobelfret, trading in Northern Europe. A comfortable equal-time 10/10-week rotation, joining between 12–18 July 2026. Pay is 2,713 EUR plus overtime (EUR 9.18 per hour above 103 hours).

## Vessel particulars
- Type: ro-ro / ro-lo / con-ro (owner Cobelfret, vessel "Palatine")
- Trading area: Northern Europe
- Rotation: 10 weeks on / 10 weeks off, joining 12–18 July 2026

## Requirements
- Full set of valid STCW documents
- HACCP certificate
- Ro-ro courses are NOT required

## How to apply
Applications are accepted only through the Phoenocean website: https://www.phoenocean.pl', true, true, NULL
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Steward — Ro-Ro / Con-Ro (Cobelfret "Palatine"), Northern Europe');
END $$;

-- ── V.Ships (Gdynia) — Cook + Chief Engineer, Oil Products Tanker ────────────
DO $$
DECLARE v_company_id uuid;
BEGIN
  SELECT id INTO v_company_id FROM companies WHERE name ILIKE 'V.Ships%' LIMIT 1;
  IF v_company_id IS NULL THEN
    v_company_id := gen_random_uuid();
    INSERT INTO companies (id, name, location) VALUES (v_company_id, 'V.Ships Poland', 'Gdynia, Poland');
  END IF;

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Cook (with OS/AB license) — Oil Products Tanker (2,164 GT), Worldwide', 'Chief Cook / Cook', 'Oil Tanker', 3260, NULL, 'EUR', '6 weeks', '2026-07-23',
'V.Ships (Gdynia) is looking for a Cook holding an OS or AB license for a small oil products tanker (2,164 GT, Denmark flag) trading worldwide. A short 6-week contract combining galley duties with a supporting deck rating role, paying 3,260 EUR per month. Joining 23 July 2026.

## Vessel particulars
- Type: oil products tanker
- Gross tonnage: 2,164
- Flag: Denmark
- Trading area: worldwide
- Contract: 6 weeks, joining 23 July 2026

## Requirements
- Experience as Cook on oil products tankers
- Valid OS or AB license

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'Recruitment.Gdynia@glasgow.vships.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Cook (with OS/AB license) — Oil Products Tanker (2,164 GT), Worldwide');

  INSERT INTO vacancies (company_id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, is_active, is_imported, contact_email)
  SELECT v_company_id, 'Chief Engineer — Oil Products Tanker (2,164 GT), Worldwide', 'Chief Engineer', 'Oil Tanker', 10800, NULL, 'EUR', '6 weeks', '2026-07-16',
'V.Ships (Gdynia) is recruiting a Chief Engineer for a small oil products tanker (2,164 GT, Denmark flag) trading worldwide. A short 6-week contract on a compact tanker, paying from 10,800 EUR per month (negotiable). Joining 16 July 2026.

## Vessel particulars
- Type: oil products tanker
- Gross tonnage: 2,164
- Flag: Denmark
- Trading area: worldwide
- Contract: 6 weeks, joining 16 July 2026

## Requirements
- Experience as Chief Engineer on oil products tankers
- Bunkering experience preferred

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.', true, true, 'Recruitment.Gdynia@glasgow.vships.com'
  WHERE NOT EXISTS (SELECT 1 FROM vacancies WHERE title = 'Chief Engineer — Oil Products Tanker (2,164 GT), Worldwide');
END $$;
