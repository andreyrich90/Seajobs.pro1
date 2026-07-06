-- One-off cleanup: remove duplicate rows created by repeated CV imports
-- (the importer now skips existing rows, this clears what already piled up).
-- Keeps the earliest row of each duplicate group. Idempotent — safe to re-run.

-- Sea experience: same seafarer + vessel + rank + dates = duplicate.
DELETE FROM sea_experience
WHERE id IN (
  SELECT id FROM (
    SELECT id, row_number() OVER (
      PARTITION BY
        seafarer_id,
        lower(coalesce(vessel_name, '')),
        lower(coalesce(rank, '')),
        coalesce(from_date::text, ''),
        coalesce(to_date::text, '')
      ORDER BY created_at, id
    ) AS rn
    FROM sea_experience
  ) t
  WHERE rn > 1
);

-- Certificates: same seafarer + name + number = duplicate.
DELETE FROM certificates
WHERE id IN (
  SELECT id FROM (
    SELECT id, row_number() OVER (
      PARTITION BY
        seafarer_id,
        lower(coalesce(name, '')),
        lower(coalesce(number, ''))
      ORDER BY created_at, id
    ) AS rn
    FROM certificates
  ) t
  WHERE rn > 1
);
