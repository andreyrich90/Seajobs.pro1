-- Clean up the first company-posted vacancy (Marine Agency Sunrise, 2nd Engineer
-- for bulker): the description still contained the form's template hints
-- ("Short intro: ...", "How candidates should apply ..."), and the contract
-- field showed a bare "4". Rewrites the description from what the company
-- actually entered. Idempotent — safe to re-run.

UPDATE vacancies SET
  description = 'Marine Agency Sunrise is recruiting a 2nd Engineer for a Handymax bulk carrier (65,000 DWT, built 2025, Greek owner). 4-month contract, joining 12 July 2026, from 8,000 USD/month.

## Requirements
- experience in rank on bulk carriers
- Ukrainian crew only

## How to apply
Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.',
  contract_duration = '4 months',
  updated_at = now()
WHERE title ILIKE '2ND ENGINEER FOR BULKER';
