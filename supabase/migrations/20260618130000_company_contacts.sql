-- Multiple contact phones/emails and crew-manager contact cards for companies.
-- crew_managers is an array of { name, department, phone, email } objects.
alter table public.companies
  add column if not exists phones        text[] default '{}',
  add column if not exists emails        text[] default '{}',
  add column if not exists crew_managers jsonb  default '[]'::jsonb;
