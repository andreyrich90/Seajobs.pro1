-- ============================================================================
-- Baseline schema — consolidates the root-level supabase/*.sql one-off scripts
-- (schema.sql, vacancies.sql, admin.sql, features.sql, forum.sql, messages.sql,
-- notifications.sql, job_alerts.sql, news_cover.sql, security_complete.sql,
-- storage_logos.sql) that were run manually against production but never
-- captured as a dated migration.
--
-- Supabase Branching/Preview builds a fresh database by replaying ONLY
-- supabase/migrations/*.sql in order — it does not see the root-level scripts.
-- Without this file, every preview build fails as soon as any later migration
-- touches a table that only ever existed via a manual one-off script (e.g.
-- 20260609100000_forum_seed_topics.sql inserting into forum_topics).
--
-- This reproduces the schema as it stood immediately before the first real
-- dated migration (20260609000000_news_comments.sql) — tables include only
-- the columns that existed at that point; everything added since then is
-- already captured by its own later migration file.
--
-- Idempotent — safe to run against the already-populated production database.
-- ============================================================================

create extension if not exists "uuid-ossp";

-- ── Tables ──────────────────────────────────────────────────────────────────

create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null check (role in ('seafarer', 'company')),
  is_admin boolean not null default false,
  is_blocked boolean not null default false,
  created_at timestamptz default now() not null
);

create table if not exists seafarers (
  id uuid references profiles on delete cascade primary key,
  first_name text,
  last_name text,
  photo_url text,
  nationality text,
  date_of_birth date,
  phone text,
  rank text,
  readiness_date date,
  about text,
  updated_at timestamptz default now()
);

create table if not exists certificates (
  id uuid default gen_random_uuid() primary key,
  seafarer_id uuid references seafarers on delete cascade not null,
  name text not null,
  number text,
  issue_date date,
  expiry_date date,
  issuing_authority text,
  file_url text,
  created_at timestamptz default now() not null
);

create table if not exists sea_experience (
  id uuid default gen_random_uuid() primary key,
  seafarer_id uuid references seafarers on delete cascade not null,
  vessel_name text not null,
  vessel_type text,
  rank text,
  company text,
  flag text,
  imo_number text,
  from_date date,
  to_date date,
  created_at timestamptz default now() not null
);

create table if not exists companies (
  id uuid references profiles on delete cascade primary key,
  name text,
  logo_url text,
  location text,
  description text,
  website text,
  is_verified boolean not null default false,
  updated_at timestamptz default now()
);

create table if not exists vacancies (
  id uuid default gen_random_uuid() primary key,
  company_id uuid references companies(id) on delete cascade not null,
  title text not null,
  rank text,
  vessel_type text,
  salary_from integer,
  salary_to integer,
  currency text not null default 'USD',
  contract_duration text,
  joining_date date,
  description text,
  is_active boolean not null default true,
  views_count integer not null default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz
);

create table if not exists applications (
  id uuid default gen_random_uuid() primary key,
  vacancy_id uuid references vacancies(id) on delete cascade not null,
  seafarer_id uuid references profiles(id) on delete cascade not null,
  cover_letter text,
  status text not null default 'pending',
  created_at timestamptz default now() not null,
  unique(vacancy_id, seafarer_id)
);

create table if not exists saved_vacancies (
  vacancy_id uuid references vacancies(id) on delete cascade not null,
  seafarer_id uuid references profiles(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  primary key (vacancy_id, seafarer_id)
);

create table if not exists forum_topics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete set null,
  author_name text,
  title text not null,
  content text not null,
  is_pinned boolean not null default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz
);

create table if not exists forum_posts (
  id uuid default gen_random_uuid() primary key,
  topic_id uuid references forum_topics(id) on delete cascade not null,
  user_id uuid references auth.users on delete set null,
  author_name text,
  content text not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz
);

create table if not exists news_articles (
  id uuid default gen_random_uuid() primary key,
  title jsonb not null default '{}',
  body jsonb not null default '{}',
  tag text,
  cover_gradient text default 'linear-gradient(135deg,#0c4a6e,#155e75)',
  is_published boolean not null default false,
  published_at timestamptz,
  cover_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz
);

create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete set null,
  name text,
  email text,
  subject text,
  content text not null,
  is_read boolean not null default false,
  created_at timestamptz default now() not null
);

create table if not exists notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  link text,
  is_read boolean not null default false,
  created_at timestamptz default now() not null
);

create table if not exists job_alerts (
  seafarer_id uuid primary key references profiles(id) on delete cascade,
  rank text not null,
  created_at timestamptz default now() not null
);

-- ── Functions ───────────────────────────────────────────────────────────────

create or replace function public.update_updated_at_column()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and is_admin = true);
$$;

create or replace function public.increment_vacancy_views(vid uuid)
returns void language sql security definer set search_path = public as $$
  update vacancies set views_count = views_count + 1 where id = vid;
$$;
grant execute on function public.increment_vacancy_views(uuid) to anon, authenticated;

-- ── Triggers ────────────────────────────────────────────────────────────────

drop trigger if exists update_seafarers_updated_at on seafarers;
create trigger update_seafarers_updated_at
  before update on seafarers
  for each row execute function public.update_updated_at_column();

drop trigger if exists update_companies_updated_at on companies;
create trigger update_companies_updated_at
  before update on companies
  for each row execute function public.update_updated_at_column();

drop trigger if exists set_vacancies_updated_at on vacancies;
create trigger set_vacancies_updated_at
  before update on vacancies
  for each row execute function public.update_updated_at();

-- ── Storage: company logos bucket ────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do update set public = true;

drop policy if exists "logos_public_read" on storage.objects;
create policy "logos_public_read"
  on storage.objects for select
  using (bucket_id = 'logos');

drop policy if exists "logos_insert_own" on storage.objects;
create policy "logos_insert_own"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "logos_update_own" on storage.objects;
create policy "logos_update_own"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "logos_delete_own" on storage.objects;
create policy "logos_delete_own"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- ── RLS ─────────────────────────────────────────────────────────────────────

alter table profiles enable row level security;
drop policy if exists "Users can view own profile" on profiles;
drop policy if exists "Users can insert own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Users can delete own profile" on profiles;
drop policy if exists "Admins can delete profiles" on profiles;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id or is_admin());
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id or is_admin());
create policy "Users can delete own profile" on profiles for delete using (auth.uid() = id);
create policy "Admins can delete profiles" on profiles for delete using (is_admin());

alter table seafarers enable row level security;
drop policy if exists "Public can view seafarers" on seafarers;
drop policy if exists "Seafarers can insert own record" on seafarers;
drop policy if exists "Seafarers can update own record" on seafarers;
drop policy if exists "Seafarers can delete own record" on seafarers;
drop policy if exists "Admins can delete seafarers" on seafarers;
create policy "Public can view seafarers" on seafarers for select using (true);
create policy "Seafarers can insert own record" on seafarers for insert with check (auth.uid() = id);
create policy "Seafarers can update own record" on seafarers for update using (auth.uid() = id or is_admin());
create policy "Seafarers can delete own record" on seafarers for delete using (auth.uid() = id);
create policy "Admins can delete seafarers" on seafarers for delete using (is_admin());

alter table certificates enable row level security;
drop policy if exists "Public can view certificates" on certificates;
drop policy if exists "Seafarers can insert own certificates" on certificates;
drop policy if exists "Seafarers can update own certificates" on certificates;
drop policy if exists "Seafarers can delete own certificates" on certificates;
create policy "Public can view certificates" on certificates for select using (true);
create policy "Seafarers can insert own certificates" on certificates for insert with check (auth.uid() = seafarer_id);
create policy "Seafarers can update own certificates" on certificates for update using (auth.uid() = seafarer_id);
create policy "Seafarers can delete own certificates" on certificates for delete using (auth.uid() = seafarer_id);

alter table sea_experience enable row level security;
drop policy if exists "Public can view sea_experience" on sea_experience;
drop policy if exists "Seafarers can insert own experience" on sea_experience;
drop policy if exists "Seafarers can update own experience" on sea_experience;
drop policy if exists "Seafarers can delete own experience" on sea_experience;
create policy "Public can view sea_experience" on sea_experience for select using (true);
create policy "Seafarers can insert own experience" on sea_experience for insert with check (auth.uid() = seafarer_id);
create policy "Seafarers can update own experience" on sea_experience for update using (auth.uid() = seafarer_id);
create policy "Seafarers can delete own experience" on sea_experience for delete using (auth.uid() = seafarer_id);

alter table companies enable row level security;
drop policy if exists "Public can view companies" on companies;
drop policy if exists "Companies can insert own record" on companies;
drop policy if exists "Companies can update own record" on companies;
drop policy if exists "Companies can delete own record" on companies;
drop policy if exists "Admins can delete companies" on companies;
create policy "Public can view companies" on companies for select using (true);
create policy "Companies can insert own record" on companies for insert with check (auth.uid() = id);
create policy "Companies can update own record" on companies for update using (auth.uid() = id or is_admin());
create policy "Companies can delete own record" on companies for delete using (auth.uid() = id);
create policy "Admins can delete companies" on companies for delete using (is_admin());

alter table vacancies enable row level security;
drop policy if exists "Read vacancies" on vacancies;
drop policy if exists "Companies insert vacancies" on vacancies;
drop policy if exists "Companies update vacancies" on vacancies;
drop policy if exists "Companies delete vacancies" on vacancies;
create policy "Read vacancies" on vacancies for select using (is_active = true or company_id = auth.uid() or is_admin());
create policy "Companies insert vacancies" on vacancies for insert with check (company_id = auth.uid());
create policy "Companies update vacancies" on vacancies for update using (company_id = auth.uid() or is_admin());
create policy "Companies delete vacancies" on vacancies for delete using (company_id = auth.uid() or is_admin());

alter table applications enable row level security;
drop policy if exists "Seafarers insert applications" on applications;
drop policy if exists "Seafarers view own applications" on applications;
drop policy if exists "Companies view their applications" on applications;
drop policy if exists "Companies update applications" on applications;
drop policy if exists "Seafarers delete own applications" on applications;
drop policy if exists "Admins manage all applications" on applications;
create policy "Seafarers insert applications" on applications for insert with check (seafarer_id = auth.uid());
create policy "Seafarers view own applications" on applications for select using (seafarer_id = auth.uid());
create policy "Companies view their applications" on applications for select
  using (vacancy_id in (select id from vacancies where company_id = auth.uid()) or is_admin());
create policy "Companies update applications" on applications for update
  using (vacancy_id in (select id from vacancies where company_id = auth.uid()) or is_admin());
create policy "Seafarers delete own applications" on applications for delete using (seafarer_id = auth.uid());
create policy "Admins manage all applications" on applications for all using (is_admin());

alter table saved_vacancies enable row level security;
drop policy if exists "Seafarers manage saved vacancies" on saved_vacancies;
create policy "Seafarers manage saved vacancies" on saved_vacancies for all
  using (seafarer_id = auth.uid()) with check (seafarer_id = auth.uid());

alter table forum_topics enable row level security;
drop policy if exists "Anyone can read forum topics" on forum_topics;
drop policy if exists "Authenticated users can create topics" on forum_topics;
drop policy if exists "Users can update their own topics" on forum_topics;
drop policy if exists "Users can delete their own topics" on forum_topics;
drop policy if exists "Admins can manage all forum topics" on forum_topics;
create policy "Anyone can read forum topics" on forum_topics for select using (true);
create policy "Authenticated users can create topics" on forum_topics for insert with check (auth.uid() = user_id);
create policy "Users can update their own topics" on forum_topics for update using (auth.uid() = user_id or is_admin());
create policy "Users can delete their own topics" on forum_topics for delete using (auth.uid() = user_id or is_admin());
create policy "Admins can manage all forum topics" on forum_topics for all using (is_admin()) with check (is_admin());

alter table forum_posts enable row level security;
drop policy if exists "Anyone can read forum posts" on forum_posts;
drop policy if exists "Authenticated users can create posts" on forum_posts;
drop policy if exists "Users can update their own posts" on forum_posts;
drop policy if exists "Users can delete their own posts" on forum_posts;
drop policy if exists "Admins can manage all forum posts" on forum_posts;
create policy "Anyone can read forum posts" on forum_posts for select using (true);
create policy "Authenticated users can create posts" on forum_posts for insert with check (auth.uid() = user_id);
create policy "Users can update their own posts" on forum_posts for update using (auth.uid() = user_id or is_admin());
create policy "Users can delete their own posts" on forum_posts for delete using (auth.uid() = user_id or is_admin());
create policy "Admins can manage all forum posts" on forum_posts for all using (is_admin()) with check (is_admin());

alter table news_articles enable row level security;
drop policy if exists "Anyone can read published news" on news_articles;
drop policy if exists "Admins can manage news" on news_articles;
create policy "Anyone can read published news" on news_articles for select using (is_published = true or is_admin());
create policy "Admins can manage news" on news_articles for all using (is_admin()) with check (is_admin());

alter table messages enable row level security;
drop policy if exists "Anyone can send messages" on messages;
drop policy if exists "Users can view own messages" on messages;
drop policy if exists "Admins manage all messages" on messages;
create policy "Anyone can send messages" on messages for insert with check (true);
create policy "Users can view own messages" on messages for select using (user_id = auth.uid() or is_admin());
create policy "Admins manage all messages" on messages for all using (is_admin());

alter table notifications enable row level security;
drop policy if exists "Users can view own notifications" on notifications;
drop policy if exists "Users can mark own notifications read" on notifications;
drop policy if exists "Users can delete own notifications" on notifications;
create policy "Users can view own notifications" on notifications for select using (user_id = auth.uid());
create policy "Users can mark own notifications read" on notifications for update using (user_id = auth.uid());
create policy "Users can delete own notifications" on notifications for delete using (user_id = auth.uid());

alter table job_alerts enable row level security;
drop policy if exists "Seafarers manage own alerts" on job_alerts;
create policy "Seafarers manage own alerts" on job_alerts for all
  using (seafarer_id = auth.uid()) with check (seafarer_id = auth.uid());

-- ── Column-level privacy: hide PII from anonymous visitors ──────────────────

revoke select on seafarers from anon;
grant select (id, first_name, last_name, photo_url, nationality, rank,
              readiness_date, about, updated_at) on seafarers to anon;

revoke select on certificates from anon;
grant select (id, seafarer_id, name, issue_date, expiry_date,
              issuing_authority, created_at) on certificates to anon;

-- ── Indexes ──────────────────────────────────────────────────────────────────

create index if not exists idx_certificates_seafarer_id on certificates(seafarer_id);
create index if not exists idx_sea_experience_seafarer_id on sea_experience(seafarer_id);
create index if not exists idx_vacancies_company_id on vacancies(company_id);
create index if not exists idx_vacancies_is_active on vacancies(is_active);
create index if not exists idx_applications_vacancy_id on applications(vacancy_id);
create index if not exists idx_applications_seafarer_id on applications(seafarer_id);
create index if not exists idx_forum_posts_topic_id on forum_posts(topic_id);
create index if not exists idx_notifications_user_id on notifications(user_id);
create index if not exists idx_job_alerts_rank on job_alerts(rank);

notify pgrst, 'reload schema';
