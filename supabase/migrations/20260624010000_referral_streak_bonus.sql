-- ============================================================================
-- Referral streak bonus.
-- ============================================================================
-- A referrer's 3rd and 5th completed referral grants a 30-day boost instead
-- of the default 14 days, rewarding people who keep inviting past the first.
--
-- Run once in the Supabase SQL editor. Idempotent.
-- ============================================================================

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

  return new;
end;
$$;

notify pgrst, 'reload schema';
