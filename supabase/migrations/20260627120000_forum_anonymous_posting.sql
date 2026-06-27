-- Let a logged-in seafarer post a topic/reply without showing their name.
alter table public.forum_topics
  add column if not exists is_anonymous boolean not null default false;

alter table public.forum_posts
  add column if not exists is_anonymous boolean not null default false;
