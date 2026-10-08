-- Covers for four older guides that were created in the admin and never got
-- one: the seafarer-résumé, first-job, 2026 salaries and STCW-2026 guides.
-- They are not in any SQL file in this repo, so they are matched by the start
-- of their Russian title (a plain-string title is read as Russian, the way
-- lib/forumI18n.ts reads it). A guide that already has a cover is left alone.
-- Run after the deploy that adds public/guides/{cv-hired,first-job,
-- salaries-2026,stcw-2026}.png. Idempotent.

UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/cv-hired.png?v=1'
WHERE category = 'guide' AND coalesce(cover_url, '') = ''
  AND coalesce(title->>'ru', title #>> '{}') LIKE 'Как написать резюме моряка%';

UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/first-job.png?v=1'
WHERE category = 'guide' AND coalesce(cover_url, '') = ''
  AND coalesce(title->>'ru', title #>> '{}') LIKE 'Как получить первую работу на море%';

UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/salaries-2026.png?v=1'
WHERE category = 'guide' AND coalesce(cover_url, '') = ''
  AND coalesce(title->>'ru', title #>> '{}') LIKE 'Зарплаты морских работников в 2026%';

UPDATE news_articles SET cover_url = 'https://seajobs.pro/guides/stcw-2026.png?v=1'
WHERE category = 'guide' AND coalesce(cover_url, '') = ''
  AND coalesce(title->>'ru', title #>> '{}') LIKE 'Сертификаты STCW объяснены%';

-- Guides still without a cover. Expect no rows; any row here is a title the
-- patterns above did not match.
SELECT coalesce(title->>'ru', title->>'en') AS title FROM news_articles
WHERE category = 'guide' AND coalesce(cover_url, '') = '';
