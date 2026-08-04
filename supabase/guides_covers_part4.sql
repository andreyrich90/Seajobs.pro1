-- Cover images for the 5 new guides (supabase/guides_2026_part4.sql). PNGs live
-- in public/guides/ (deployed at https://seajobs.pro/guides/*.png). Run AFTER
-- this branch is deployed (so the images exist) and after the guide INSERTs.
-- Idempotent — matches each guide by its English title.

UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/medical-eng1.png?v=1'      WHERE title->>'en' = 'The seafarer medical certificate (ENG1): how to pass and what can fail you';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/crew-change.png?v=1'       WHERE title->>'en' = 'Crew change explained: signing on and off, flights and joining agents';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/money-management.png?v=1'  WHERE title->>'en' = 'Money management for seafarers: allotments, tax and saving your salary';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/shore-careers.png?v=1'     WHERE title->>'en' = 'Life after sea: shore-based maritime careers for former seafarers';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/wellbeing.png?v=1'         WHERE title->>'en' = 'Mental health and wellbeing at sea: staying healthy on long contracts';
