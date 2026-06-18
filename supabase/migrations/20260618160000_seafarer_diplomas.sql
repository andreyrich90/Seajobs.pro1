-- Allow several diplomas / Certificates of Competency per seafarer.
-- Array of { name, number, expiry }. The legacy single diploma/diploma_expiry
-- columns are kept (mirrored from the first entry) for backward compatibility.
alter table public.seafarers
  add column if not exists diplomas jsonb default '[]'::jsonb;
