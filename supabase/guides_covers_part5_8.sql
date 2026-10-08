-- Cover images for the 16 guides in guides_2026_part5–part8. The PNGs live in
-- public/guides/ (served at https://seajobs.pro/guides/*.png) and carry no text,
-- so one image serves every language: Google reads the language from the page
-- and from the alt text, which is the guide's title in that language.
-- Run AFTER this branch is deployed (so the images exist) and after the guide
-- INSERTs. Idempotent — matches each guide by its English title.

UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/deck-cadet.png?v=1' WHERE title->>'en' = 'Deck cadet jobs: how to find your first ship and what crewing agencies check';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/engine-cadet.png?v=1' WHERE title->>'en' = 'Engine cadet jobs: requirements, sea time and how to get the first contract';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/deck-or-engine.png?v=1' WHERE title->>'en' = 'Deck or engine cadet: which department to choose';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/eto-cadet.png?v=1' WHERE title->>'en' = 'Electrical cadet (ETO cadet): how to start a career as an electro-technical officer';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/lng-cadet.png?v=1' WHERE title->>'en' = 'Cadet on a gas carrier or tanker (LNG deck cadet): requirements and how to get there';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/bsm.png?v=1' WHERE title->>'en' = 'BSM (Bernhard Schulte Shipmanagement): jobs at sea and how to apply';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/cma-cgm.png?v=1' WHERE title->>'en' = 'CMA CGM jobs for seafarers: how to get on the group''s ships';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/wilhelmsen.png?v=1' WHERE title->>'en' = 'Wilhelmsen jobs for seafarers: the Polish manning office and how to apply';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/osm-thome.png?v=1' WHERE title->>'en' = 'OSM Thome crewing: jobs for seafarers and how to apply';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/tos.png?v=1' WHERE title->>'en' = 'TOS (Transport & Offshore Services): offshore and maritime jobs and how to apply';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/agencies-poland.png?v=1' WHERE title->>'en' = 'Crewing agencies in Poland: how to choose one and check it is legal';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/dp-course.png?v=1' WHERE title->>'en' = 'DP operator course: steps, sea time and where to train';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/jobs-poland.png?v=1' WHERE title->>'en' = 'Seafarer jobs in Poland: officers of the watch, ETOs and able seamen';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/offshore.png?v=1' WHERE title->>'en' = 'How to get into offshore: certificates, vessels and the first contract';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/oiler.png?v=1' WHERE title->>'en' = 'Oiler and motorman jobs offshore: duties, certificates and how to get hired';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/steward.png?v=1' WHERE title->>'en' = 'Steward and stewardess jobs offshore: catering crew on vessels and platforms';
