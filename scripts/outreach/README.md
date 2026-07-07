# Crewing-agency outreach mailer

Invites crewing agencies (the ones whose vacancies we import) to register on
SeaJobs.pro and post directly. Each agency gets **one** personalised email in
its own language — never a BCC blast, so nobody sees anyone else's address
(better privacy and deliverability).

## Two ways to send

### A) Browser link — no terminal (recommended)
Route: `app/api/outreach/route.ts`. Just open a URL (works from phone/tablet).
It uses the `RESEND_API_KEY` already configured on Vercel.

One-time setup:
1. Run `supabase/outreach_log.sql` once in the Supabase SQL Editor (creates the
   table that remembers who was already emailed).
2. Make sure `OUTREACH_SECRET` (or the existing `CRON_SECRET`) is set in Vercel
   env vars. Use its value as `secret` below.

Then open:
```
# preview to yourself (sends EN + PL + UK)
https://seajobs.pro/api/outreach?secret=SECRET&test=you@example.com

# see who would be sent (sends nothing)
https://seajobs.pro/api/outreach?secret=SECRET

# send the next 10 not-yet-emailed agencies
https://seajobs.pro/api/outreach?secret=SECRET&send=1&limit=10

# only a specific company/email
https://seajobs.pro/api/outreach?secret=SECRET&send=1&only=baltimex
```
Re-open the `send=1&limit=10` link to send the next batch — already-sent
addresses (tracked in `outreach_log`) are skipped automatically.

### B) CLI — needs Node + terminal
```bash
npm run outreach                                # dry run
TEST_TO=you@example.com npm run outreach        # preview to yourself
SEND=1 npm run outreach                         # send to everyone
SEND=1 LIMIT=10 npm run outreach                # first 10 only
SEND=1 ONLY=baltimex npm run outreach           # matching only
```
Reads `RESEND_API_KEY` from the env or `.env.local`. Tracks sent addresses in
`scripts/outreach/sent.log` (git-ignored).

## Files
- `../../lib/outreach.ts` — **single source of truth**: templates (EN/PL/UK),
  subjects, From/Reply-To, and the recipient list. Edit copy here.
- `recipients.json` — `{ company, email, lang }` list. Edit `lang`
  (`en` | `pl` | `uk`) per company.
- `invite_ALL.html` — static preview of a single email with all three
  languages stacked (not used by the sender; open it in a browser to look).
- `send-invites.ts` — the CLI mailer (option B).
- `sent.log` — CLI send log (git-ignored).

## Tip
Send in small batches (`limit=10`) across a few hours rather than all 50+ at
once — gentler on your domain reputation, less spam risk.
