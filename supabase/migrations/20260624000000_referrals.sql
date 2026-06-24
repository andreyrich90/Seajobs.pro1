-- ============================================================================
-- Referral program for seafarers.
-- ============================================================================
-- Every seafarer gets a unique referral_code. When someone signs up through
-- their link and later completes their profile (first_name + rank set), the
-- referrer's profile gets a 14-day "boost" (higher placement in the company
-- seafarer search) and an in-app notification.
--
-- Run once in the Supabase SQL editor. Idempotent.
-- ============================================================================

alter table seafarers add column if not exists referral_code text;
alter table seafarers add column if not exists boost_until timestamptz;

-- ── Auto-generate a unique referral code for every seafarer ────────────────
create or replace function public.generate_referral_code()
returns text
language plpgsql
as $$
declare
  code text;
begin
  loop
    code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
    if not exists (select 1 from seafarers where referral_code = code) then
      return code;
    end if;
  end loop;
end;
$$;

create or replace function public.set_referral_code()
returns trigger
language plpgsql
as $$
begin
  if new.referral_code is null then
    new.referral_code := public.generate_referral_code();
  end if;
  return new;
end;
$$;

drop trigger if exists trg_seafarers_referral_code on seafarers;
create trigger trg_seafarers_referral_code
  before insert on seafarers
  for each row execute function public.set_referral_code();

-- Backfill any existing rows created before this migration.
update seafarers set referral_code = public.generate_referral_code() where referral_code is null;

create unique index if not exists seafarers_referral_code_key on seafarers(referral_code);

-- ── Referrals table ─────────────────────────────────────────────────────────
create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references profiles(id) on delete cascade,
  referred_id uuid not null unique references profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'completed')),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists idx_referrals_referrer on referrals(referrer_id);

-- ── RLS ─────────────────────────────────────────────────────────────────────
alter table referrals enable row level security;

drop policy if exists "referrals_select_participant" on referrals;
create policy "referrals_select_participant" on referrals for select
  using (referrer_id = auth.uid() or referred_id = auth.uid() or public.is_admin());

-- Only the referred user can record that they signed up via a referral, and
-- only about themselves (never on someone else's behalf, never self-referral).
drop policy if exists "referrals_insert_referred" on referrals;
create policy "referrals_insert_referred" on referrals for insert
  to authenticated
  with check (referred_id = auth.uid() and referrer_id <> auth.uid());

-- ── Reward: boost the referrer once the referred seafarer completes their
--    profile (first_name + rank both set for the first time). ──────────────
create or replace function public.handle_referral_completion()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  r referrals%rowtype;
begin
  if new.first_name is null or new.rank is null then
    return new;
  end if;
  if old.first_name is not null and old.rank is not null then
    return new; -- was already complete; nothing changed
  end if;

  select * into r from referrals where referred_id = new.id and status = 'pending';
  if r.id is null then
    return new;
  end if;

  update referrals set status = 'completed', completed_at = now() where id = r.id;

  update seafarers
    set boost_until = greatest(coalesce(boost_until, now()), now()) + interval '14 days'
    where id = r.referrer_id;

  insert into notifications (user_id, type, title, body, link)
  values (
    r.referrer_id,
    'referral_completed',
    'Your referral is now active',
    'A friend you invited completed their profile — your profile got a 14-day visibility boost.',
    '/seafarer/profile'
  );

  return new;
end;
$$;

drop trigger if exists trg_referral_completion on seafarers;
create trigger trg_referral_completion
  after update on seafarers
  for each row execute function public.handle_referral_completion();

-- referral_code/boost_until are intentionally NOT granted to anon — they stay
-- visible only to the authenticated owner and admins, same access level as
-- the rest of the seafarer's private columns.

notify pgrst, 'reload schema';
