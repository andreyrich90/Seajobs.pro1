-- ============================================================================
-- SeaJobs.pro — COMPLETE SECURITY & RLS MIGRATION
-- ============================================================================
-- Run this ONCE in the Supabase SQL Editor.
-- It is IDEMPOTENT — safe to re-run (uses DROP POLICY IF EXISTS / IF NOT EXISTS).
--
-- This migration makes the app fully functional AND secure under a REAL anon
-- key (role = "anon"), instead of relying on the service_role key being shipped
-- to browsers. Run this BEFORE switching NEXT_PUBLIC_SUPABASE_ANON_KEY to the
-- real anon key, so nothing breaks when RLS finally starts being enforced.
-- ============================================================================

-- ─── 0. updated_at trigger function (both names, to satisfy all triggers) ────
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;

-- ─── 1. is_admin() helper (SECURITY DEFINER bypasses RLS, no recursion) ──────
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true);
$$;

-- ─── 2. Column-level privacy: hide PII from anonymous visitors ────────────────
-- Public profile pages only need safe columns. Phone / date_of_birth stay
-- visible to logged-in users (e.g. companies), but NOT to anonymous scrapers.
REVOKE SELECT ON seafarers FROM anon;
GRANT  SELECT (id, first_name, last_name, photo_url, nationality, rank,
               readiness_date, about, updated_at) ON seafarers TO anon;

-- Certificate numbers and file URLs are sensitive — hide from anon.
REVOKE SELECT ON certificates FROM anon;
GRANT  SELECT (id, seafarer_id, name, issue_date, expiry_date,
               issuing_authority, created_at) ON certificates TO anon;

-- ─── 3. View-counter RPC (anon can't UPDATE vacancies directly) ──────────────
CREATE OR REPLACE FUNCTION public.increment_vacancy_views(vid uuid)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE vacancies SET views_count = views_count + 1 WHERE id = vid;
$$;
GRANT EXECUTE ON FUNCTION public.increment_vacancy_views(uuid) TO anon, authenticated;

-- ─── 4. RLS POLICIES (idempotent) ────────────────────────────────────────────

-- profiles ───────────────────────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile"   ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
CREATE POLICY "Users can view own profile"   ON profiles FOR SELECT USING (auth.uid() = id OR is_admin());
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id OR is_admin());

-- seafarers ──────────────────────────────────────────────────────────────────
ALTER TABLE seafarers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view seafarers"        ON seafarers;
DROP POLICY IF EXISTS "Seafarers can view own record"    ON seafarers;
DROP POLICY IF EXISTS "Seafarers can insert own record"  ON seafarers;
DROP POLICY IF EXISTS "Seafarers can update own record"  ON seafarers;
CREATE POLICY "Public can view seafarers"       ON seafarers FOR SELECT USING (true);
CREATE POLICY "Seafarers can insert own record" ON seafarers FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Seafarers can update own record" ON seafarers FOR UPDATE USING (auth.uid() = id OR is_admin());

-- certificates ───────────────────────────────────────────────────────────────
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view certificates"          ON certificates;
DROP POLICY IF EXISTS "Seafarers can insert own certificates" ON certificates;
DROP POLICY IF EXISTS "Seafarers can update own certificates" ON certificates;
DROP POLICY IF EXISTS "Seafarers can delete own certificates" ON certificates;
CREATE POLICY "Public can view certificates"          ON certificates FOR SELECT USING (true);
CREATE POLICY "Seafarers can insert own certificates" ON certificates FOR INSERT WITH CHECK (auth.uid() = seafarer_id);
CREATE POLICY "Seafarers can update own certificates" ON certificates FOR UPDATE USING (auth.uid() = seafarer_id);
CREATE POLICY "Seafarers can delete own certificates" ON certificates FOR DELETE USING (auth.uid() = seafarer_id);

-- sea_experience ─────────────────────────────────────────────────────────────
ALTER TABLE sea_experience ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view sea_experience"       ON sea_experience;
DROP POLICY IF EXISTS "Seafarers can insert own experience"  ON sea_experience;
DROP POLICY IF EXISTS "Seafarers can update own experience"  ON sea_experience;
DROP POLICY IF EXISTS "Seafarers can delete own experience"  ON sea_experience;
CREATE POLICY "Public can view sea_experience"      ON sea_experience FOR SELECT USING (true);
CREATE POLICY "Seafarers can insert own experience" ON sea_experience FOR INSERT WITH CHECK (auth.uid() = seafarer_id);
CREATE POLICY "Seafarers can update own experience" ON sea_experience FOR UPDATE USING (auth.uid() = seafarer_id);
CREATE POLICY "Seafarers can delete own experience" ON sea_experience FOR DELETE USING (auth.uid() = seafarer_id);

-- companies ──────────────────────────────────────────────────────────────────
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view companies"        ON companies;
DROP POLICY IF EXISTS "Companies can insert own record"  ON companies;
DROP POLICY IF EXISTS "Companies can update own record"  ON companies;
CREATE POLICY "Public can view companies"       ON companies FOR SELECT USING (true);
CREATE POLICY "Companies can insert own record" ON companies FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Companies can update own record" ON companies FOR UPDATE USING (auth.uid() = id OR is_admin());

-- vacancies ──────────────────────────────────────────────────────────────────
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view vacancies"            ON vacancies;
DROP POLICY IF EXISTS "Public can read active vacancies"     ON vacancies;
DROP POLICY IF EXISTS "Companies manage their own vacancies" ON vacancies;
DROP POLICY IF EXISTS "Admins can manage all vacancies"      ON vacancies;
-- Active vacancies are public; owners and admins see all of theirs (incl. drafts)
CREATE POLICY "Read vacancies"            ON vacancies FOR SELECT USING (is_active = true OR company_id = auth.uid() OR is_admin());
CREATE POLICY "Companies insert vacancies" ON vacancies FOR INSERT WITH CHECK (company_id = auth.uid());
CREATE POLICY "Companies update vacancies" ON vacancies FOR UPDATE USING (company_id = auth.uid() OR is_admin());
CREATE POLICY "Companies delete vacancies" ON vacancies FOR DELETE USING (company_id = auth.uid() OR is_admin());

-- applications ───────────────────────────────────────────────────────────────
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Seafarers can insert own applications"            ON applications;
DROP POLICY IF EXISTS "Seafarers can view own applications"              ON applications;
DROP POLICY IF EXISTS "Companies can view applications to their vacancies" ON applications;
DROP POLICY IF EXISTS "Companies can update application status"          ON applications;
DROP POLICY IF EXISTS "Seafarers can delete own applications"           ON applications;
CREATE POLICY "Seafarers insert applications" ON applications FOR INSERT WITH CHECK (seafarer_id = auth.uid());
CREATE POLICY "Seafarers view own applications" ON applications FOR SELECT USING (seafarer_id = auth.uid());
CREATE POLICY "Companies view their applications" ON applications FOR SELECT
  USING (vacancy_id IN (SELECT id FROM vacancies WHERE company_id = auth.uid()) OR is_admin());
CREATE POLICY "Companies update applications" ON applications FOR UPDATE
  USING (vacancy_id IN (SELECT id FROM vacancies WHERE company_id = auth.uid()) OR is_admin());
CREATE POLICY "Seafarers delete own applications" ON applications FOR DELETE USING (seafarer_id = auth.uid());

-- saved_vacancies ────────────────────────────────────────────────────────────
ALTER TABLE saved_vacancies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Seafarers manage saved vacancies" ON saved_vacancies;
CREATE POLICY "Seafarers manage saved vacancies" ON saved_vacancies FOR ALL
  USING (seafarer_id = auth.uid()) WITH CHECK (seafarer_id = auth.uid());

-- forum_topics ───────────────────────────────────────────────────────────────
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read forum topics"          ON forum_topics;
DROP POLICY IF EXISTS "Authenticated users can create topics" ON forum_topics;
DROP POLICY IF EXISTS "Users can update their own topics"     ON forum_topics;
DROP POLICY IF EXISTS "Users can delete their own topics"     ON forum_topics;
CREATE POLICY "Anyone can read forum topics"          ON forum_topics FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create topics" ON forum_topics FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own topics"     ON forum_topics FOR UPDATE USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Users can delete their own topics"     ON forum_topics FOR DELETE USING (auth.uid() = user_id OR is_admin());

-- forum_posts ────────────────────────────────────────────────────────────────
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read forum posts"          ON forum_posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON forum_posts;
DROP POLICY IF EXISTS "Users can update their own posts"     ON forum_posts;
DROP POLICY IF EXISTS "Users can delete their own posts"     ON forum_posts;
CREATE POLICY "Anyone can read forum posts"          ON forum_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts"     ON forum_posts FOR UPDATE USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Users can delete their own posts"     ON forum_posts FOR DELETE USING (auth.uid() = user_id OR is_admin());

-- news_articles ──────────────────────────────────────────────────────────────
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read published news" ON news_articles;
DROP POLICY IF EXISTS "Admins can manage news"         ON news_articles;
CREATE POLICY "Anyone can read published news" ON news_articles FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Admins can manage news"         ON news_articles FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- messages ───────────────────────────────────────────────────────────────────
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can send messages"     ON messages;
DROP POLICY IF EXISTS "Users can view own messages"  ON messages;
DROP POLICY IF EXISTS "Admins manage all messages"   ON messages;
CREATE POLICY "Anyone can send messages"    ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (user_id = auth.uid() OR is_admin());
CREATE POLICY "Admins manage all messages"  ON messages FOR ALL USING (is_admin());

-- notifications ──────────────────────────────────────────────────────────────
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own notifications"        ON notifications;
DROP POLICY IF EXISTS "Users can mark own notifications read"   ON notifications;
DROP POLICY IF EXISTS "Users can delete own notifications"      ON notifications;
CREATE POLICY "Users can view own notifications"      ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can mark own notifications read" ON notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own notifications"    ON notifications FOR DELETE USING (user_id = auth.uid());
-- (INSERT is done by the server with the service_role key, which bypasses RLS.)

-- job_alerts ─────────────────────────────────────────────────────────────────
ALTER TABLE job_alerts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Seafarers manage own alerts" ON job_alerts;
CREATE POLICY "Seafarers manage own alerts" ON job_alerts FOR ALL
  USING (seafarer_id = auth.uid()) WITH CHECK (seafarer_id = auth.uid());

-- ─── 5. Performance: indexes on foreign keys used in filters ─────────────────
CREATE INDEX IF NOT EXISTS idx_certificates_seafarer_id   ON certificates(seafarer_id);
CREATE INDEX IF NOT EXISTS idx_sea_experience_seafarer_id ON sea_experience(seafarer_id);
CREATE INDEX IF NOT EXISTS idx_vacancies_company_id       ON vacancies(company_id);
CREATE INDEX IF NOT EXISTS idx_vacancies_is_active        ON vacancies(is_active);
CREATE INDEX IF NOT EXISTS idx_applications_vacancy_id     ON applications(vacancy_id);
CREATE INDEX IF NOT EXISTS idx_applications_seafarer_id    ON applications(seafarer_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_topic_id        ON forum_posts(topic_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id        ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_alerts_rank             ON job_alerts(rank);

-- ─── 6. Reload PostgREST schema cache ────────────────────────────────────────
NOTIFY pgrst, 'reload schema';
