-- Job alerts table: seafarers subscribe to notifications for new vacancies matching their rank
CREATE TABLE IF NOT EXISTS job_alerts (
  seafarer_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  rank TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE job_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Seafarers manage own alerts"
  ON job_alerts FOR ALL
  USING (seafarer_id = auth.uid());

-- Public read policies for company pages
CREATE POLICY "Public can view companies"
  ON companies FOR SELECT
  USING (true);

CREATE POLICY "Public can view vacancies"
  ON vacancies FOR SELECT
  USING (true);
