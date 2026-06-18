-- Additional seafarer document fields for the CV: seaman's book expiry,
-- and diploma / Certificate of Competency (number + expiry).
alter table public.seafarers
  add column if not exists seamans_book_expiry date,
  add column if not exists diploma             text,
  add column if not exists diploma_expiry      date;
