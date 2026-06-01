-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (linked to auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('seafarer', 'company')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Seafarers table
CREATE TABLE seafarers (
  id UUID REFERENCES profiles ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  photo_url TEXT,
  nationality TEXT,
  date_of_birth DATE,
  phone TEXT,
  rank TEXT,
  readiness_date DATE,
  about TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates table
CREATE TABLE certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seafarer_id UUID REFERENCES seafarers ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  number TEXT,
  issue_date DATE,
  expiry_date DATE,
  issuing_authority TEXT,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Sea experience table
CREATE TABLE sea_experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seafarer_id UUID REFERENCES seafarers ON DELETE CASCADE NOT NULL,
  vessel_name TEXT NOT NULL,
  vessel_type TEXT,
  rank TEXT,
  company TEXT,
  flag TEXT,
  imo_number TEXT,
  from_date DATE,
  to_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Companies table
CREATE TABLE companies (
  id UUID REFERENCES profiles ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  logo_url TEXT,
  location TEXT,
  description TEXT,
  website TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE seafarers ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE sea_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = id);

-- RLS Policies for seafarers
CREATE POLICY "Seafarers can view own record"
  ON seafarers FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Seafarers can insert own record"
  ON seafarers FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Seafarers can update own record"
  ON seafarers FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Seafarers can delete own record"
  ON seafarers FOR DELETE
  USING (auth.uid() = id);

-- RLS Policies for certificates
CREATE POLICY "Seafarers can view own certificates"
  ON certificates FOR SELECT
  USING (auth.uid() = seafarer_id);

CREATE POLICY "Seafarers can insert own certificates"
  ON certificates FOR INSERT
  WITH CHECK (auth.uid() = seafarer_id);

CREATE POLICY "Seafarers can update own certificates"
  ON certificates FOR UPDATE
  USING (auth.uid() = seafarer_id);

CREATE POLICY "Seafarers can delete own certificates"
  ON certificates FOR DELETE
  USING (auth.uid() = seafarer_id);

-- RLS Policies for sea_experience
CREATE POLICY "Seafarers can view own experience"
  ON sea_experience FOR SELECT
  USING (auth.uid() = seafarer_id);

CREATE POLICY "Seafarers can insert own experience"
  ON sea_experience FOR INSERT
  WITH CHECK (auth.uid() = seafarer_id);

CREATE POLICY "Seafarers can update own experience"
  ON sea_experience FOR UPDATE
  USING (auth.uid() = seafarer_id);

CREATE POLICY "Seafarers can delete own experience"
  ON sea_experience FOR DELETE
  USING (auth.uid() = seafarer_id);

-- RLS Policies for companies
CREATE POLICY "Companies can view own record"
  ON companies FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Companies can insert own record"
  ON companies FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Companies can update own record"
  ON companies FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Companies can delete own record"
  ON companies FOR DELETE
  USING (auth.uid() = id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_seafarers_updated_at
  BEFORE UPDATE ON seafarers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
