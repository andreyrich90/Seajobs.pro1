-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vacancy_id UUID REFERENCES vacancies(id) ON DELETE CASCADE NOT NULL,
  seafarer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  cover_letter TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(vacancy_id, seafarer_id)
);
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Seafarers can insert own applications" ON applications FOR INSERT WITH CHECK (seafarer_id = auth.uid());
CREATE POLICY "Seafarers can view own applications" ON applications FOR SELECT USING (seafarer_id = auth.uid());
CREATE POLICY "Companies can view applications to their vacancies" ON applications FOR SELECT USING (EXISTS (SELECT 1 FROM vacancies WHERE vacancies.id = applications.vacancy_id AND vacancies.company_id = auth.uid()));
CREATE POLICY "Companies can update application status" ON applications FOR UPDATE USING (EXISTS (SELECT 1 FROM vacancies WHERE vacancies.id = applications.vacancy_id AND vacancies.company_id = auth.uid()));
CREATE POLICY "Seafarers can delete own applications" ON applications FOR DELETE USING (seafarer_id = auth.uid());
CREATE POLICY "Admins manage all applications" ON applications FOR ALL USING (public.is_admin());

-- Saved vacancies table
CREATE TABLE IF NOT EXISTS saved_vacancies (
  vacancy_id UUID REFERENCES vacancies(id) ON DELETE CASCADE NOT NULL,
  seafarer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (vacancy_id, seafarer_id)
);
ALTER TABLE saved_vacancies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Seafarers manage saved vacancies" ON saved_vacancies FOR ALL USING (seafarer_id = auth.uid()) WITH CHECK (seafarer_id = auth.uid());

-- Add views_count and applications_count to vacancies
ALTER TABLE vacancies ADD COLUMN IF NOT EXISTS views_count INTEGER NOT NULL DEFAULT 0;

-- Add is_verified to companies
ALTER TABLE companies ADD COLUMN IF NOT EXISTS is_verified BOOLEAN NOT NULL DEFAULT false;
