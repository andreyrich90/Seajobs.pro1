-- Contact messages / suggestions table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT,
  email TEXT,
  subject TEXT,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Anyone (including guests) can send a message
CREATE POLICY "Anyone can send messages" ON messages
  FOR INSERT WITH CHECK (true);

-- Logged-in users can see their own messages
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (user_id = auth.uid());

-- Admins have full access
CREATE POLICY "Admins manage all messages" ON messages
  FOR ALL USING (public.is_admin());
