-- Distinguish evergreen guides (blog) from time-sensitive news within the same
-- news_articles table. Existing rows default to 'news'. Guides are shown under
-- /guides, news under /news. Idempotent.

alter table public.news_articles
  add column if not exists category text not null default 'news';

create index if not exists news_articles_category_idx
  on public.news_articles (category);
