# Crewing-agency outreach mailer

Invites crewing agencies (the ones whose vacancies we import) to register on
SeaJobs.pro and post directly.

## Files
- `invite_EN.html`, `invite_PL.html`, `invite_UK.html` — single-language invites.
- `invite_ALL.html` — one email containing all three languages stacked
  (use this only if you want a single message and don't know the recipient's
  language; the script does **not** use it).
- `recipients.json` — `{ company, email, lang }` list. Edit `lang`
  (`en` | `pl` | `uk`) per company as you see fit.
- `send-invites.ts` — sends each agency **one** personalised email in its own
  language via Resend (no BCC — nobody sees anyone else's address).
- `sent.log` — appended as emails go out; git-ignored; used to skip
  already-sent addresses on re-run (safe to resume).

## Why per-language, not one big email / BCC
- Each recipient gets their own message → no one sees other addresses.
- Sent from the verified `seajobs.pro` domain with a real reply-to → far
  better deliverability than a 57-address BCC blast (which usually hits spam).
- Copy is in the recipient's language → higher open/registration rate.

## Run (from repo root)
Use `npm run outreach` (wraps `npx tsx scripts/outreach/send-invites.ts`).
```bash
# 1) DRY RUN — prints exactly what would be sent, sends nothing
npm run outreach

# 2) PREVIEW — send all 3 languages to yourself first
TEST_TO=you@example.com npm run outreach

# 3) LIVE — send to everyone in recipients.json (skips anything in sent.log)
SEND=1 npm run outreach

# Optional filters
SEND=1 LIMIT=10 npm run outreach     # first 10 only (batch it)
SEND=1 ONLY=baltimex npm run outreach   # only matching company/email
```

Needs `RESEND_API_KEY` in the environment or in `.env.local` (read
automatically). Paces at ~1.4 emails/sec to stay under Resend's rate limit.

## Tip
Send in small batches (`LIMIT=10`) across a few hours rather than all 50+ at
once — gentler on your domain reputation.
