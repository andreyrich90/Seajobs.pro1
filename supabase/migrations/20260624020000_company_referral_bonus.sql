-- ============================================================================
-- Company referral bonus: featured vacancy reward.
-- ============================================================================
-- Companies get their own referral_code too. When a seafarer signs up through
-- a company's link and completes their profile, the company's most recent
-- active vacancy gets featured (higher placement on /jobs) for 14 days.
--
-- Run once in the Supabase SQL editor. Idempotent.
-- ============================================================================

alter table companies add column if not exists referral_code text;
alter table vacancies add column if not exists featured_until timestamptz;

-- referral codes must be unique across both seafarers AND companies, since a
-- referred user's signup looks the code up in either table.
create or replace function public.generate_referral_code()
returns text
language plpgsql
as $$
declare
  code text;
begin
  loop
    code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
    if not exists (select 1 from seafarers where referral_code = code)
       and not exists (select 1 from companies where referral_code = code) then
      return code;
    end if;
  end loop;
end;
$$;

create or replace function public.set_company_referral_code()
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

drop trigger if exists trg_companies_referral_code on companies;
create trigger trg_companies_referral_code
  before insert on companies
  for each row execute function public.set_company_referral_code();

-- Backfill any existing rows created before this migration.
update companies set referral_code = public.generate_referral_code() where referral_code is null;

create unique index if not exists companies_referral_code_key on companies(referral_code);

-- companies.referral_code is intentionally NOT public — mirrors the same
-- restriction seafarers.referral_code already has, to prevent code scraping.
revoke select on companies from anon;
grant select (id, name, logo_url, location, description, website, phones,
              emails, crew_managers, updated_at, is_verified) on companies to anon;

-- ── Reward: branch by referrer type — seafarer referrer gets the existing
--    streak-aware profile boost, company referrer gets their newest active
--    vacancy featured. ──────────────────────────────────────────────────────
create or replace function public.handle_referral_completion()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  r referrals%rowtype;
  completed_count integer;
  boost_days integer;
  is_company boolean;
  target_vacancy uuid;
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

  select exists(select 1 from companies where id = r.referrer_id) into is_company;

  if is_company then
    select id into target_vacancy from vacancies
      where company_id = r.referrer_id and is_active = true
      order by created_at desc limit 1;

    if target_vacancy is not null then
      update vacancies
        set featured_until = greatest(coalesce(featured_until, now()), now()) + interval '14 days'
        where id = target_vacancy;
    end if;

    insert into notifications (user_id, type, title, body, link)
    values (
      r.referrer_id,
      'referral_completed',
      'Your referral is now active',
      case
        when target_vacancy is not null then
          'A seafarer you invited completed their profile — your latest vacancy got a 14-day featured boost.'
        else
          'A seafarer you invited completed their profile. Post a vacancy to use your featured-boost reward.'
      end,
      '/company/vacancies'
    );
  else
    select count(*) into completed_count from referrals
      where referrer_id = r.referrer_id and status = 'completed';

    boost_days := case when completed_count in (3, 5) then 30 else 14 end;

    update seafarers
      set boost_until = greatest(coalesce(boost_until, now()), now()) + (boost_days || ' days')::interval
      where id = r.referrer_id;

    insert into notifications (user_id, type, title, body, link)
    values (
      r.referrer_id,
      'referral_completed',
      'Your referral is now active',
      case
        when boost_days = 30 then
          'A friend you invited completed their profile — that''s your ' || completed_count || 'th referral, so your profile got a 30-day visibility boost!'
        else
          'A friend you invited completed their profile — your profile got a 14-day visibility boost.'
      end,
      '/seafarer/profile'
    );
  end if;

  return new;
end;
$$;

notify pgrst, 'reload schema';
