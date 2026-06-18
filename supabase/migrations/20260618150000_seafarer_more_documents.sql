-- Service record book ("послужная книжка") and medical certificate fields.
alter table public.seafarers
  add column if not exists service_record_book text,
  add column if not exists medical             text,
  add column if not exists medical_expiry      date;
