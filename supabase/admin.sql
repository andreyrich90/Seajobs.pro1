-- ─── Admin & blocking fields on profiles ───────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin  BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN NOT NULL DEFAULT false;

-- ─── Helper function (SECURITY DEFINER bypasses RLS — no recursion) ─
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true);
$$;

-- ─── Admin RLS policies on profiles ─────────────────────────────────
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete profiles"
  ON profiles FOR DELETE USING (is_admin());

-- ─── Admin RLS on seafarers ──────────────────────────────────────────
CREATE POLICY "Admins can view all seafarers"
  ON seafarers FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update seafarers"
  ON seafarers FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete seafarers"
  ON seafarers FOR DELETE USING (is_admin());

-- ─── Admin RLS on companies ──────────────────────────────────────────
CREATE POLICY "Admins can view all companies"
  ON companies FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update companies"
  ON companies FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete companies"
  ON companies FOR DELETE USING (is_admin());

-- ─── Admin RLS on vacancies ──────────────────────────────────────────
CREATE POLICY "Admins can manage all vacancies"
  ON vacancies FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ─── Admin RLS on forum_topics ───────────────────────────────────────
CREATE POLICY "Admins can manage all forum topics"
  ON forum_topics FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ─── Admin RLS on forum_posts ────────────────────────────────────────
CREATE POLICY "Admins can manage all forum posts"
  ON forum_posts FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ─── News articles table ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL DEFAULT '{}',
  body   JSONB NOT NULL DEFAULT '{}',
  tag TEXT,
  cover_gradient TEXT DEFAULT 'linear-gradient(135deg,#0c4a6e,#155e75)',
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ
);

ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published news"
  ON news_articles FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage news"
  ON news_articles FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ─── Grant yourself admin (replace with your actual user ID) ─────────
-- UPDATE profiles SET is_admin = true WHERE id = '<YOUR-USER-ID>';
