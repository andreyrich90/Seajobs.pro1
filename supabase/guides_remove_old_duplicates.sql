-- Remove the OLD duplicate guides that predate the new guide set.
-- The old guides carry the tag 'Industry'; the new 15 guides use topical tags
-- (Career, Salaries, CV, Certificates, Safety, Documents, Life at sea, Fleets,
-- Engine, Cruise, Contracts, English, Offshore), so deleting by tag removes only
-- the old ones. News articles are unaffected (they are category <> 'guide').

-- STEP 1 — PREVIEW: run this first to see exactly what will be deleted.
SELECT id, tag, published_at, title->>'en' AS title_en, title->>'ua' AS title_ua
FROM news_articles
WHERE category = 'guide' AND tag = 'Industry'
ORDER BY published_at;

-- STEP 2 — DELETE: run this only after the preview looks correct.
-- DELETE FROM news_articles WHERE category = 'guide' AND tag = 'Industry';
