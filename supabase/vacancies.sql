-- Vacancies table
CREATE TABLE IF NOT EXISTS vacancies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  rank TEXT,
  vessel_type TEXT,
  salary_from INTEGER,
  salary_to INTEGER,
  currency TEXT NOT NULL DEFAULT 'USD',
  contract_duration TEXT,
  joining_date DATE,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;

-- Companies can fully manage their own vacancies
CREATE POLICY "Companies manage their own vacancies"
  ON vacancies FOR ALL
  USING (company_id = auth.uid())
  WITH CHECK (company_id = auth.uid());

-- Anyone can read active vacancies (for the public job board)
CREATE POLICY "Public can read active vacancies"
  ON vacancies FOR SELECT
  USING (is_active = true);

-- Auto-update updated_at on changes
CREATE TRIGGER set_vacancies_updated_at
  BEFORE UPDATE ON vacancies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
