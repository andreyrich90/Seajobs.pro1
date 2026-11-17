-- One bell notification for every seafarer and company account that has not
-- yet confirmed consent to data processing under the current version
-- (CONSENT_VERSION in lib/consent.ts, '2026-11-17').
--
-- Run AFTER the code with the consent banners is deployed: the notification
-- leads to the cabinet, where the banner asks for the boxes. api/consent
-- deletes the notification once they are confirmed. The bell shows the text
-- in the reader's language by its type (components/NotificationBell.tsx);
-- the stored English text is the fallback.
--
-- Safe to run again: it skips accounts that already have the notification or
-- the consent. Needs 20261117000000_user_consents.sql first.
-- ASCII only: pasted into the SQL editor from a browser that translates pages.

insert into public.notifications (user_id, type, title, body, link)
select
  p.id,
  'consent_required',
  'Please confirm your consent to data processing',
  'We have updated our Privacy Policy and Terms. Open to confirm - it takes one click.',
  case when p.role = 'company' then '/company/dashboard' else '/seafarer/privacy' end
from public.profiles p
where p.role in ('seafarer', 'company')
  and coalesce(p.is_blocked, false) = false
  and not exists (
    select 1 from public.notifications n
    where n.user_id = p.id and n.type = 'consent_required'
  )
  and not exists (
    select 1 from public.user_consents c
    where c.user_id = p.id and c.version = '2026-11-17' and c.kind = 'privacy' and c.granted
  );
