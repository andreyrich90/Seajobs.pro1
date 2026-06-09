create table if not exists news_comments (
  id          uuid        primary key default gen_random_uuid(),
  article_id  text        not null,
  author_name text        not null check (char_length(author_name) between 1 and 100),
  content     text        not null check (char_length(content) between 1 and 2000),
  created_at  timestamptz not null default now()
);

create index if not exists idx_news_comments_article
  on news_comments(article_id, created_at);

alter table news_comments enable row level security;

create policy "public select news_comments"
  on news_comments for select using (true);

create policy "public insert news_comments"
  on news_comments for insert with check (true);
