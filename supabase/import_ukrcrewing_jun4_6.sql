-- ============================================================
-- Ukrcrewing.com.ua — Import vacancies June 4–6, 2026
-- Source: https://ukrcrewing.com.ua/vacancy/p2/
-- ============================================================
-- STEP 0: Add columns (skip if already done)
ALTER TABLE vacancies ADD COLUMN IF NOT EXISTS is_imported boolean NOT NULL DEFAULT false;
ALTER TABLE vacancies ADD COLUMN IF NOT EXISTS source_url text;

-- STEP 1: Create company
INSERT INTO companies (id, name, location, website)
SELECT gen_random_uuid(), 'Ukrcrewing.com.ua', 'Ukraine', 'https://ukrcrewing.com.ua'
WHERE NOT EXISTS (SELECT 1 FROM companies WHERE name = 'Ukrcrewing.com.ua');

-- STEP 2: Insert 26 vacancies
DO $$
DECLARE cid uuid;
BEGIN
  SELECT id INTO cid FROM companies WHERE name = 'Ukrcrewing.com.ua' LIMIT 1;

  INSERT INTO vacancies
    (company_id, title, rank, vessel_type,
     salary_from, salary_to, currency,
     contract_duration, joining_date,
     is_active, is_imported, source_url, views_count)
  VALUES

  -- ══ JUNE 5, 2026 ══════════════════════════════════════════

  (cid, '2nd Officer — Container',              '2nd Officer',                    'Container (Panamax)',    3725,  4025,  'USD', '6 months', '2026-06-11', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, '2nd Officer — Container',              '2nd Officer',                    'Container (Panamax)',    3325,  4025,  'USD', '6 months', '2026-06-10', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, '3rd Engineer — General Cargo',         '3rd Engineer',                   'General Cargo',         8200,  NULL,  'USD', '4 months', '2026-06-10', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Chief Engineer — Container',           'Chief Engineer',                 'Container (Panamax)',    9326, 10926,  'USD', '4 months', '2026-07-01', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Deck Cadet — General Cargo',           'Deck Cadet',                     'General Cargo',          600,  NULL,  'USD', '6 months', '2026-06-10', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Electrician — Container',              'Electrician',                    'Container (Panamax)',    5500,  6620,  'USD', '6 months', '2026-08-25', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Electrician — Container',              'Electrician',                    'Container (Panamax)',    6000,  6500,  'USD', '6 months', '2026-08-20', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, '2nd Engineer — Container',             '2nd Engineer',                   'Container (Panamax)',    7006,  8456,  'USD', '4 months', '2026-06-19', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Deck Cadet — General Cargo',           'Deck Cadet',                     'General Cargo',          600,  NULL,  'USD', '9 months', '2026-08-03', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Chief Engineer — General Cargo',       'Chief Engineer',                 'General Cargo',         7400,  8050,  'USD', '4 months', '2026-08-14', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, '3rd Engineer — Product Tanker',        '3rd Engineer',                   'Product Tanker',        4500,  NULL,  'USD', '4 months', '2026-07-24', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, '3rd Engineer — General Cargo',         '3rd Engineer',                   'General Cargo',         7600,  8100,  'USD', '4 months', '2026-08-17', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, '3rd Officer — Container',              '3rd Officer',                    'Container (Panamax)',    7800,  NULL,  'USD', '4 months', '2026-06-10', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, '3rd Officer — General Cargo',          '3rd Officer',                    'General Cargo',         NULL,  NULL,  'USD', '4 months', '2026-07-31', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Master — Bulk Carrier',                'Master (Captain)',                'Bulk Carrier (Handymax)',9700, 9800,  'USD', '4 months', '2026-06-15', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Chief Engineer — Container',           'Chief Engineer',                 'Container (Panamax)',    9326, 10826,  'USD', '4 months', '2026-06-10', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Chief Engineer — Container',           'Chief Engineer',                 'Container (Panamax)',    9326, 10826,  'USD', '4 months', '2026-07-10', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Chief Officer — Container',            'Chief Officer (Chief Mate)',      'Container (Panamax)',    7718,  8248,  'USD', '4 months', '2026-07-10', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Oiler — General Cargo',                'Oiler',                          'General Cargo',         1300,  NULL,  'USD', '9 months', '2026-07-01', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Oiler — General Cargo',                'Oiler',                          'General Cargo',         4400,  NULL,  'USD', '4 months', '2026-06-22', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Deck Fitter — Crude Oil Tanker',       'Deck Fitter',                    'Crude Oil Tanker',      3180,  NULL,  'USD', '6 months', '2026-06-15', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),

  -- ══ JUNE 6, 2026 ══════════════════════════════════════════

  (cid, 'Master — Container',                   'Master (Captain)',                'Container (Panamax)',   10511,  NULL,  'USD', '4 months', '2026-06-08', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'ETO — General Cargo',                  'ETO (Electro-Technical Officer)', 'General Cargo',         5890,  NULL,  'USD', '4 months', '2026-06-06', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'Chief Engineer — Oil Product Tanker',  'Chief Engineer',                 'Product Tanker',        9090,  NULL,  'USD', '4 months', '2026-06-12', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, '2nd Engineer — Reefer',                '2nd Engineer',                   'Reefer',                7388,  NULL,  'USD', '4 months', '2026-06-08', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0),
  (cid, 'ETO — Container',                      'ETO (Electro-Technical Officer)', 'Container (Panamax)',   5890,  7400,  'USD', '4 months', '2026-06-12', true, true, 'https://ukrcrewing.com.ua/vacancy/p2/', 0);

END $$;

-- Verify
SELECT count(*) as imported FROM vacancies WHERE is_imported = true;
