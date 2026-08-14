-- Several job alerts per seafarer.
--
-- job_alerts was keyed by seafarer_id alone, so the table itself allowed one
-- subscription per person: a Master who also sails as Chief Officer had to pick
-- one and miss the other. The key becomes (seafarer_id, rank), which keeps the
-- same guarantee that matters — no duplicate row for the same rank — while
-- letting one seafarer follow as many positions as they like.
--
-- Existing rows survive untouched: every one of them is already unique on the
-- pair, so the new key accepts them as they are.
--
-- Idempotent: safe to re-run.

do $$
begin
  -- Drop the single-column key only if that is what is actually there. A
  -- re-run finds the composite key already in place and does nothing.
  if exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    where t.relname = 'job_alerts'
      and c.contype = 'p'
      and array_length(c.conkey, 1) = 1
  ) then
    alter table job_alerts drop constraint job_alerts_pkey;
  end if;

  if not exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    where t.relname = 'job_alerts' and c.contype = 'p'
  ) then
    -- Same rank twice for the same person is still meaningless, so the pair
    -- stays unique — the client can upsert without checking first.
    alter table job_alerts add constraint job_alerts_pkey primary key (seafarer_id, rank);
  end if;
end $$;

-- The fan-out reads every alert and matches on rank; the dashboard reads one
-- seafarer's rows. The composite key covers the second (seafarer_id leads it),
-- and this index covers the first.
create index if not exists idx_job_alerts_rank on job_alerts(rank);

-- RLS is unchanged and already row-level: "Seafarers manage own alerts" with
-- seafarer_id = auth.uid() applies per row, so it covers many rows per person
-- exactly as it covered one.

notify pgrst, 'reload schema';
