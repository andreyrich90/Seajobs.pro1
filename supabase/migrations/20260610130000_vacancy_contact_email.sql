-- Allow imported vacancies to specify a direct contact email for the crewing
-- agency. When set, applications are emailed there instead of going through
-- the normal in-app company inbox.
ALTER TABLE vacancies ADD COLUMN IF NOT EXISTS contact_email TEXT;
