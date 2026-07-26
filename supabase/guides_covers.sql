-- Set cover images for the /guides articles. The PNGs live in public/guides/
-- (deployed at https://seajobs.pro/guides/*.png). Run AFTER this branch is
-- deployed so the images exist, and after the guide INSERT scripts. Idempotent
-- — matches each guide by its English title.

UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/career-path.png'        WHERE title->>'en' = 'Maritime career path: from cadet to captain';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/stcw-certificates.png'   WHERE title->>'en' = 'STCW and seafarer certificates explained';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/salaries.png'            WHERE title->>'en' = 'How much do seafarers earn? Salaries by rank and vessel type';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/crewing-scams.png'       WHERE title->>'en' = 'How to avoid crewing scams: never pay to get a job at sea';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/maritime-cv.png'         WHERE title->>'en' = 'How to write a maritime CV that gets you hired';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/documents-visas.png'     WHERE title->>'en' = 'Documents and visas every seafarer needs';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/choose-agency.png'       WHERE title->>'en' = 'How to choose a reliable crewing agency';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/life-on-board.png'       WHERE title->>'en' = 'Life on board: contracts, rotations and daily routine';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/choose-fleet.png'        WHERE title->>'en' = 'Tanker, bulk or offshore: choosing the right fleet';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/first-contract.png'      WHERE title->>'en' = 'Getting your first contract: a guide for cadets and juniors';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/engine-department.png'   WHERE title->>'en' = 'The engine department explained: from wiper to chief engineer';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/cruise-ships.png'        WHERE title->>'en' = 'Working on cruise ships: departments, life and how to get hired';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/seafarer-contract.png'   WHERE title->>'en' = 'Understanding your seafarer contract: salary, overtime, leave and MLC rights';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/maritime-english.png'    WHERE title->>'en' = 'Maritime English and SMCP: why it matters and how to improve';
UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/dynamic-positioning.png' WHERE title->>'en' = 'Dynamic Positioning (DP): careers and how to become a DPO';
