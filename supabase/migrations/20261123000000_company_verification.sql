-- SeaJobs Partners: a crewing company proves it is a licensed agency, an admin
-- checks the documents, and its vacancies go into the "SeaJobs Partners" block
-- at the top of the board with the badge (lib/partners.ts).
--
-- 1. `company_verifications` — one row per submission: the files, the country
--    and registry number the company gave, and the admin's decision. The
--    company and an admin may read; every write runs with the service role
--    (api/company/verification, api/admin/company-verifications).
-- 2. The private `company-docs` bucket for the files. No storage policies at
--    all, like `service-cv`: only the service role reaches it, and the admin
--    screen opens a file through a ten-minute signed URL.
-- 3. `companies.is_verified` can no longer be set by the company itself. The
--    open "update own record" policy let any company switch its own badge on
--    over REST; a trigger now keeps the old value unless an admin or the
--    service role is writing. Policies cannot do this per column.
--
-- ASCII only: pasted into the SQL editor from a browser that translates pages.

create table if not exists public.company_verifications (
  id            uuid primary key default gen_random_uuid(),
  company_id    uuid not null references public.companies(id) on delete cascade,
  status        text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  country       text,
  registry_number text,
  note          text,
  files         jsonb not null default '[]'::jsonb,
  admin_note    text,
  submitted_at  timestamptz not null default now(),
  reviewed_at   timestamptz,
  reviewed_by   uuid
);

create index if not exists company_verifications_company_idx
  on public.company_verifications (company_id, submitted_at desc);
create index if not exists company_verifications_status_idx
  on public.company_verifications (status, submitted_at desc);

alter table public.company_verifications enable row level security;

drop policy if exists "Company or admin reads verifications" on public.company_verifications;
create policy "Company or admin reads verifications" on public.company_verifications
  for select to authenticated
  using (company_id = (select auth.uid()) or (select public.is_admin()));

revoke insert, update, delete on public.company_verifications from anon, authenticated;

insert into storage.buckets (id, name, public)
values ('company-docs', 'company-docs', false)
on conflict (id) do nothing;

create or replace function public.guard_company_verified()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- session_user, not current_user: inside a security definer function
  -- current_user is always the function's owner.
  if coalesce(auth.role(), '') = 'service_role'
     or session_user in ('postgres', 'supabase_admin')
     or coalesce(public.is_admin(), false) then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.is_verified := false;
  elsif new.is_verified is distinct from old.is_verified then
    new.is_verified := old.is_verified;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_guard_company_verified on public.companies;
create trigger trg_guard_company_verified
  before insert or update on public.companies
  for each row execute function public.guard_company_verified();
