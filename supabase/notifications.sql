-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can mark own notifications read"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid());

-- Public read policy for seafarers (for public profile pages)
-- Run this to allow the public seafarer profile page to work:
CREATE POLICY "Public can view seafarers"
  ON seafarers FOR SELECT
  USING (true);

CREATE POLICY "Public can view sea_experience"
  ON sea_experience FOR SELECT
  USING (true);

CREATE POLICY "Public can view certificates"
  ON certificates FOR SELECT
  USING (true);
