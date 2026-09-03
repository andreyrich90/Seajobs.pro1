# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at http://localhost:3000
npm run build     # production build
npm run start     # run a production build
npm run lint      # ESLint via Next.js
npm run outreach  # CLI crewing-agency invite mailer (scripts/outreach/send-invites.ts)
```

There is no test suite configured.

Local development needs Supabase env vars (see `.env.local.example`):
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only, used by API routes), `ANTHROPIC_API_KEY` (CV parsing + forum translation + vacancy-image parsing), `RESEND_API_KEY` (transactional email), `CRON_SECRET` (verifies the Vercel cron requests; also the fallback secret for the outreach route), `OUTREACH_SECRET` (optional — gates `/api/outreach`), `TELEGRAM_BOT_TOKEN` + `TELEGRAM_WEBHOOK_SECRET` + `TELEGRAM_CHANNEL_ID` (the notification bot and the public vacancy channel — see **Telegram** below), `TELEGRAM_ADMIN_CHAT_ID` (optional — the private chat that gets a message on every CV-distribution request).

## Architecture

SeaJobs.pro is a **Next.js 15 (App Router) / React 19 / TypeScript** maritime job board with a **Supabase** backend (Postgres + Auth + Storage). It has three user roles — **seafarer**, **company**, **admin** — each with its own dashboard area, plus a public job board, forum, and news section.

### Data layer

There are two data sources, and which one a feature uses depends on when it was built:

- **Supabase** (`lib/supabase/`) is the live backend for everything user-generated: vacancies, applications, profiles, forum, messages, notifications, etc. Almost all current features read/write Supabase directly from client components via `supabase.from("table")...`.
  - `lib/supabase/client.ts` exports a browser client (`supabase`) backed by the anon key, wrapped in a `Proxy` so `createClient()` is lazily constructed (avoids crashing previews that lack env vars) and patched with PKCE auth + an 8s fetch timeout. It also exports `notify()`, a fire-and-forget POST to `/api/notify` for triggering email/in-app notifications.
  - `lib/supabase/admin.ts` exports `getServerSupabase()`, a service-role client for trusted server-side reads (Server Components, route handlers). **Never** expose the service-role key to the client.
  - `lib/supabase/types.ts` — hand-maintained `Database` type used to type both clients.
  - Schema lives in `supabase/*.sql` (one-off setup scripts, run manually in the Supabase SQL editor) and `supabase/migrations/*.sql` (dated, idempotent migrations). There is no migration runner — apply new SQL files manually against the Supabase project.
- **`lib/data.ts`** is legacy static/seed data still used for the **news** feature (`NEWS: NewsItem[]`, multilingual `Record<Lang, string>` titles/bodies) and the `Job` type. News today is a hybrid: some articles are these hardcoded entries, others live in the `news_articles` Supabase table (see `app/[locale]/news/`). Don't add new vacancies here — vacancies are 100% Supabase (`vacancies` table); `lib/data.ts`'s `JOBS` array is unused dead data kept only for the `Job` type import in `components/JobCard.tsx`.

Key Supabase tables: `profiles` (role + `is_admin`/`is_blocked` flags, one row per auth user), `seafarers`, `companies`, `vacancies`, `applications`, `saved_vacancies`, `certificates`, `sea_experience`, `job_alerts`, `notifications`, `messages` (contact form), `conversations`/`chat_messages` (company↔seafarer DMs), `forum_categories` (a.k.a. forum "sections"), `forum_topics`, `forum_posts`, `news_articles`, `news_comments`, `referrals` (referral tracking; `seafarers`/`companies` carry a unique `referral_code`), `outreach_log` (which crewing agencies have already been emailed), `seafarer_telegram` + `telegram_link_codes` (the Telegram binding and the single-use codes behind the bot's deep link — deliberately separate from `seafarers`, which every signed-in user can read), `service_requests` (interest in the paid CV distribution — see **Paid services** below), `collector_runs` (one row per Telegram-collector run, so "has it stopped?" is answerable on the site instead of in the Vercel log).

Migrations under `supabase/migrations/` are dated + idempotent; `20260608000000_baseline_schema.sql` is the consolidated baseline and later files layer on chat, referrals, forum sections/replies, anonymous forum posting, seafarer documents/diplomas, the "profile required before applying" rule, and the Telegram bot's columns.

### Auth & roles

- Supabase Auth with the **PKCE** flow. `app/auth/login`, `register`, `forgot-password`, `callback` are the (non-localized) auth screens; `app/auth/callback/page.tsx` exchanges the `?code=` and inserts a `seafarers` row for new sign-ups.
- Role is derived from which profile rows exist / `profiles.role`, not a single enum check everywhere — page-level layouts each do their own guard:
  - `app/[locale]/admin/layout.tsx` — checks `profiles.is_admin`, redirects to `/` if false.
  - `app/[locale]/company/layout.tsx` and `app/[locale]/seafarer/layout.tsx` — check `profiles.is_blocked` and the matching session role, redirect to login/home otherwise.
- API routes that mutate data on behalf of a role (e.g. `app/api/admin/*`, `app/api/notify`) re-verify the caller server-side: read the `Authorization: Bearer <access_token>` header, call `admin.auth.getUser(token)`, then check `profiles.is_admin` or that the caller owns the row being modified. Client-side route guards are UX only — treat every API route as the real security boundary.

### i18n

The app supports five languages: `en` (default), `ru`, `ua` (Ukrainian — URL prefix `/ua`, not `/uk`), `pl`, `ro` (Romanian). The `Lang` union and `LANGS` picker list live in **`lib/langs.ts`**, deliberately apart from the strings; `routing.locales` in `i18n/routing.ts` must stay in sync. There are **two parallel i18n systems**; know which one a file uses before editing strings:

1. **`lib/i18n.ts`** (legacy, primary) — exports `T: Record<Lang, Dict>`, a flat key/value map per language, ~2300 lines and about 140 KB. **This is where almost all UI copy lives — add new strings here.**

   `lib/i18n.ts` is **server-side only**. `app/[locale]/layout.tsx` is a Server Component, so it picks the one dictionary the reader needs and passes it to `DictProvider`; client components read it with `const t = useT()` (`components/DictProvider.tsx`). A `"use client"` file that imports `T` directly ships all five languages to every page it appears on — that was ~113 KB of unused JavaScript per load before this split. Import `Lang`/`LANGS` from `@/lib/langs`, never from `@/lib/i18n`, for the same reason: pulling any value out of `lib/i18n.ts` drags the whole map in.

   The exception is `app/auth/*`, which sits outside the `[locale]` tree and only learns its language in the browser. Its copy lives in **`lib/authI18n.ts`** (`AUTH_T`, plus `localePath`) so those pages don't pull the site-wide map either.

   `components/LangProvider.tsx` provides `useLang()` for the current `Lang` (reads the locale from the URL via `useParams()`, falls back to a `localStorage`-persisted preference only on `/auth/*` routes). It is separate from `useT()`: components that need the language code but no strings — date and fleet-label maps, for instance — use only `useLang()`.
2. **`next-intl`** (`i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`) — owns the `/[locale]/...` URL structure, `middleware.ts` locale negotiation, and per-page `<title>`/OpenGraph metadata (`generateMetadata` in `layout.tsx` files, using `lib/seo.ts` for hreflang). `localePrefix: "as-needed"` means English has no prefix (`/jobs`, not `/en/jobs`); `localeDetection` is off so `/` is always English.

`messages/*.json` (`en`, `ru`, `ua`, `pl`, `ro`) are **generated**, not hand-edited — `scripts/export-messages.ts` (run ad hoc, e.g. `npx tsx scripts/export-messages.ts`) dumps `lib/i18n.ts`'s `T` into per-locale JSON files. Nothing in the app reads them any more: no component calls `useTranslations`/`useMessages`, so neither `NextIntlClientProvider` is given `messages` — passing them serialised 23–34 KB of strings into every page for nobody. Only `i18n/request.ts` still loads them, and they remain useful as a plain-text snapshot of the copy. The providers themselves stay: `Link`/`useRouter` from `@/i18n/navigation` read the locale off them.

Some content is stored English-only in the DB and localized for display by small lookup maps rather than by `T`: `lib/forumSections.ts` (`sectionLabel`/`sectionDesc` for the built-in forum categories) and `lib/fleets.ts` (fleet-filter labels). Machine translation of admin-authored forum/news content into the other locales goes through `lib/forumI18n.ts` + the Anthropic API.

Use `Link`/`useRouter`/`usePathname` from `@/i18n/navigation` (not `next/navigation`) inside the `[locale]` tree so links keep the correct locale prefix.

### Routing

Almost everything lives under `app/[locale]/`; only the auth screens are unlocalized.

| Route | Page file | Notes |
|-------|-----------|-------|
| `/` | `app/[locale]/page.tsx` + `HomeClient.tsx` | hero + search + latest jobs/news |
| `/jobs`, `/jobs/[id]` | `app/[locale]/jobs/` | Supabase-backed listing + detail; `[id]` accepts `slug-<uuid>` (see `lib/slug.ts`) |
| `/companies/[id]` | `app/[locale]/companies/[id]/` | public company profile |
| `/seafarers/[id]` | `app/[locale]/seafarers/[id]/` | public seafarer profile (shared with companies) |
| `/forum`, `/forum/[id]` | `app/[locale]/forum/` | categories + topics/posts, all Supabase |
| `/news`, `/news/[id]` | `app/[locale]/news/` | hybrid static (`lib/data.ts`) + `news_articles` table |
| `/seafarer/*` | `app/[locale]/seafarer/` | dashboard, profile, cv, certificates, experience, applications, saved, messages |
| `/company/*` | `app/[locale]/company/` | dashboard, profile, vacancies, applications, seafarers search, messages |
| `/cv-distribution` | `app/[locale]/cv-distribution/` | the paid CV-distribution service — packages, prices, request form (see **Paid services**) |
| `/admin/*` | `app/[locale]/admin/` | dashboard, users, vacancies, import, messages, chats, forum, news, service-requests |
| `/auth/*` | `app/auth/` | login, register, forgot-password, callback — **not** under `[locale]` |
| `/for-companies`, `/about`, `/privacy`, `/terms` | `app/[locale]/...` | static marketing/legal pages |

`/uk` and `/uk/:path*` permanently redirect to `/ua` (`next.config.js`) — old indexed links from before the Ukrainian prefix was renamed.

### API routes (`app/api/`)

All route handlers use the Node runtime and a service-role Supabase client (`createClient` with `SUPABASE_SERVICE_ROLE_KEY`), since they need to bypass RLS or act on behalf of a verified caller:

- `api/notify` — central notification dispatcher (in-app `notifications` row + email via Resend). Handles `application_received`, `external_application`, `status_changed`, `new_vacancy`, `new_message`. Always re-derives the caller from their bearer token and checks they own/are party to the resource before acting. **`external_application`** is the imported-vacancy path: when a seafarer applies to a vacancy that carries a `contact_email` (the scraped crewing-agency address), `buildCvEmailHtml()` renders the seafarer's full CV (contacts, documents/visas, certificates, sea service, cover letter) as email-safe HTML and sends it **straight to that crewing email** — no company account needed on our side.
- `api/admin/import-vacancy` — admin-only bulk vacancy import (used to seed listings scraped from partner sites; see `supabase/import_*.sql` for the source data this replaced). Imported rows set `is_imported = true` and store the agency's `contact_email` so applications can be forwarded (see `external_application` above).
- `api/admin/parse-vacancy-image` — admin-only: send a vacancy screenshot (JPEG/PNG/WebP), Claude extracts a JSON posting **per vacancy found** (returns `vacancies: [...]` — a screenshot may contain several distinct positions; the Import form fills with the first and queues the rest) so each can be reviewed before saving. Its prompt makes the model write a **unique, rewritten** Markdown `description` (intro + `## Vessel particulars` / `## Requirements` / `## How to apply`), never a verbatim copy of the screenshot — duplicated descriptions hurt SEO, so keep this constraint if you touch the prompt. Two more invariants (apply equally to hand-written SQL import batches): **`vessel_type` must be extracted whenever any hint exists** (title, specs, dedicated field — normalised to a standard name like "LPG Carrier"), and **`## Requirements` must carry every real requirement from the source** (certs, experience limits, documents, English, permits), reworded but never dropped or replaced with a generic line; uniqueness comes from rephrasing and the intro, never from inventing facts.
- `api/admin/translate-news`, `api/admin/translate-forum`, `api/forum/translate-topic` — call the Anthropic API (`lib/forumI18n.ts`) to machine-translate admin-authored content into the other languages.
- `api/cv-parse` — accepts an uploaded PDF/DOCX CV (`mammoth` for DOCX text extraction), asks Claude to extract structured fields matching the `seafarers`/`certificates`/`sea_experience` columns, returns JSON the client writes straight into the profile.
- `api/cron/*` — five Vercel Crons (see `vercel.json`), each verifying `Authorization: Bearer <CRON_SECRET>` when the env var is set:
  - `close-expired-vacancies` (daily 01:00 UTC) — deactivates vacancies whose `joining_date` is >14 days in the past.
  - `referral-reminders` (daily 02:00 UTC) — emails referred users who signed up 7+ days ago but haven't finished their seafarer profile (finishing it is what rewards their referrer).
  - `unread-messages-digest` (daily 07:00 UTC) — companion to the instant-email throttle in `api/notify`: sends one "you have unread messages" follow-up per conversation for still-unread messages that arrived after the last email.
  - `collect-telegram` (every 6h) — scrapes the public crewing channels in `import_sources` for new postings (`lib/telegram.ts` + `lib/collectTelegram.ts`).
  - `telegram-channel` (hourly at :30) — mirrors to our own Telegram channel any vacancy that went live but has no `telegram_message_id` yet (see **Telegram** below).
- `api/outreach` — browser-triggered crewing-agency invite mailer (open a URL, no terminal). Sends one personalised email per agency in its language via Resend, tracking sent addresses in `outreach_log` so repeat runs skip them. Gated by `OUTREACH_SECRET`/`CRON_SECRET`. Shares copy + recipient list with the `npm run outreach` CLI via `lib/outreach.ts` (see `scripts/outreach/README.md`).
- `api/logo-reminder` — browser-triggered mailer asking registered companies to upload a logo, driven from a URL the same way and gated by the same secret. Its recipient list is a query, not a file: every `companies` row whose `logo_url` is still empty, so it shrinks by itself as companies comply. Dedupe reads `email_log` for `kind = 'logo_reminder'` rather than keeping a table of its own. It refuses to send once **any** 80 emails have gone out today — the Resend free tier is 100/day shared with the CVs seafarers send to agencies, and that path must not be starved. Copy in `lib/logoReminder.ts`.

Both mailers share their HTML chrome through **`lib/emailShell.ts`** (`emailShell()`), so the two emails cannot drift into looking like different products. Its CTA href defaults to `/auth/register` — note the `/auth/` prefix, since the registration screen sits outside the `[locale]` tree and the bare `/register` the invite used to link to is not a route.
- `api/cv-share` — mints the tokenised CV link for the "write from my own email" route (see **Applying** below). Server-side because the token is a bearer credential for a document holding a passport number and visas.
- `api/service-request` — the CV-distribution request form posts here instead of inserting from the browser. The package name and price are read from `BLAST_PACKAGES` on the server, so a forged POST cannot invent a package or a price nobody was shown — and those numbers are the only thing the page exists to measure. It also messages `TELEGRAM_ADMIN_CHAT_ID` on each request (best-effort; a failed notification never loses the row) and refuses a sixth request from one address within an hour. `20260902010000_service_requests_api_only.sql` drops the anonymous insert policy so this route is the only writer.
- `api/contact`, `api/company/applicant` — contact form submission and company-side applicant lookup.
- `api/admin/collect-now` — admin-only: runs the same collection the cron does, from the button on `/admin/import-queue`. Both callers pass a `trigger` so the run lands in `collector_runs` labelled `cron` or `manual`; the “Collector runs” panel on that page reads the table directly (RLS lets admins select it) and shows the last five. The counts exist to separate failures that look identical from outside: `fetched = 0` means the scrape is broken or blocked, `fetched > 0` with `fresh = 0` means the channels are quiet, and drafts piling up means the queue is waiting on a person rather than on code. `recordRun` swallows its own errors — a missing audit row must never lose a collection — which is why the column is `trigger_kind` and not the SQL keyword `trigger`.
- `api/admin/import-stats` — admin-only: per-channel yield for the auto-collector, rendered as the “Yield per channel” table on `/admin/import-queue`. A server route because PostgREST has no `GROUP BY`, so the aggregation happens in code — and doing it in the browser would mean shipping every `vacancy_drafts` row to the client to count it. Pages every read (the 1000-row cap again). The column that matters is the publish **rate**: a channel with many posts and few publications is spending moderation time and Claude calls on spam, and a stale “last post” means the collector is walking to a dead channel every 6 hours. `live` is counted against `vacancies.is_active`, so a published draft whose vacancy was later deleted does not inflate it.
- `api/admin/seafarer-stats` — admin-only: how many seafarers per country, with each country's three commonest ranks, rendered as the “Seafarers by country” panel on `/admin/dashboard`. `seafarers.nationality` is a free-text input (and is also filled by the CV parser), so the same country arrives as "Ukraine", "Ukrainian", "UA", "Україна", "Украина" — **`lib/nationality.ts`** normalises those to an ISO code before counting. Values it cannot place are returned verbatim in `unrecognised` and shown as chips in the panel rather than folded into an "Other" row: each one is a line worth adding to that file, and hiding them would make the rest look complete when it isn't. Paged, like every other sweep.
- `api/admin/telegram` — admin-only: `GET` reports Telegram adoption (connected, distinct rank subscribers, and the one that matters — subscribed but *not* connected, i.e. unreachable while alert email is paused); `POST` writes a one-off in-app announcement asking the unconnected to link. It has to be a server route: `seafarer_telegram` is readable only by its owner, so counting it from the browser returns zero, not a count. Both the stats and the broadcast page every sweep — PostgREST caps a response at 1000 rows. The broadcast skips anyone already connected or already asked, so pressing the button twice is harmless.
- `api/telegram/*` — the notification bot (see **Telegram** below): `link` mints the one-time deep-link code for the "Connect Telegram" button, `webhook` is the bot's inbox, `setup` registers the webhook and reports whether the wiring is complete.

### Applying

Two routes, both from the vacancy page's apply modal.

**From the portal** (the original): an `applications` row, then `/api/notify` emails the crewing agency with the CV rendered by `lib/cvHtml.ts`. Costs a Resend send.

**From the seafarer's own mailbox**: `/api/cv-share` mints a token into `cv_share_tokens`, and the button opens `mailto:` with the letter written — the agency address, the subject, and a link to `/cv/<token>`. Costs us nothing, arrives as a personal letter rather than bulk mail, and puts the crewing manager on our domain instead of in a signature line.

The CV cannot be the public profile: `seafarers` exposes only a thin whitelist to anonymous visitors, and a CV carries a passport number, visas and a date of birth. Hence a token per application — one link per agency, dead after 30 days, revocable from the applications page (`components/CvLinksPanel.tsx`), and traceable to the agency it was given to if it leaks. `/cv/[token]` sits outside `[locale]` (the reader arrived from an email, and the CV is English) and is `noindex`. Expired, revoked and never-existed all return the same page — telling a stranger which tokens once existed helps nobody.

`lib/cvHtml.ts` renders the CV for both the email and that page, so they cannot drift apart. What the mailto route cannot know is whether the letter was actually sent; `cv_share_tokens.opened_at` is the only feedback it can give back.

### Paid services

`/cv-distribution` sells nothing yet, and that is the design. The page shows the real catalogue and the real prices (`BLAST_PACKAGES` in **`lib/cvBlast.ts`**), but every "order" button opens a form that posts to `api/service-request` and writes a `service_requests` row — no checkout, no payment provider, no VAT to handle. The question worth answering first is how many readers want the service at that price, and a request form answers it for nothing. `/admin/service-requests` puts the counts per package and per page language above the list, because that aggregate *is* the deliverable, and `TELEGRAM_ADMIN_CHAT_ID` gets a message per request so nobody has to poll that screen.

Reachable from three places: the footer, a card under the list on `/seafarer/applications`, and its own item in the seafarer cabinet's sidebar (`cab_cv_blast`, pointing outside the `/seafarer` tree the way "Browse jobs" does).

Two constraints the copy must keep:

- **The site tells seafarers site-wide never to pay for a job** (`components/NoPaymentWarning.tsx`, shown in the footer, the apply flow and the seafarer cabinet). A paid page has to say in the same breath which side of that line it is on, so `notBody` states plainly that nothing is charged for a contract, a berth, a medical, certificates or visas, and that what is paid for is document work. Do not quietly drop that block to make the page read better.
- **"Do you guarantee a contract?" — "No."** stays in the FAQ. It removes most of the complaints before they arrive.

Charging seafarers is also the sharp edge of **MLC 2006 Standard A1.4(5)(b)**, which forbids recruitment and placement services from taking fees from seafarers. Preparing and sending a document is defensible; "we will get you hired" is not. Keep the wording on the side of preparation and visibility.

The page's copy lives in `lib/cvBlast.ts`, not `lib/i18n.ts` — about 90 strings for one route would otherwise ride along in every reader's dictionary on every page. `page.tsx` is a Server Component: it picks `CV_BLAST_COPY[locale]` and passes it down, so one language reaches the browser. The teaser block on `/seafarer/applications` carries its own three-string map for the same reason.

### Telegram

Two features share one bot (`TELEGRAM_BOT_TOKEN`), and both are best-effort: no Telegram failure may break an import, a publish, or a cron run.

**Job alerts to seafarers.** A seafarer presses "Connect Telegram" on their dashboard (`components/TelegramConnect.tsx`); `api/telegram/link` mints a single-use code into `telegram_link_codes` and returns `t.me/<bot>?start=<code>`; the bot's webhook redeems it and writes a `seafarer_telegram` row. That binding lives in its own table, not on `seafarers`, because `seafarers` is readable by every signed-in user — nobody but the owner should see who connected a Telegram account. `dispatchJobAlerts` then messages every matched seafarer who linked. **Job-alert email is currently paused** (`ALERT_EMAIL_ENABLED = false` in `lib/jobAlerts.ts` — the only switch): it was the one high-volume mail the site sends, competing for the same 100-a-day Resend quota as a seafarer's CV on its way to a crewing agency. Everyone who matches still gets the in-app notification, and every other kind of email is untouched. A 403 back from Telegram (bot blocked) drops the binding, so the next alert reaches that seafarer in-app only.

**The public vacancy channel.** Every new posting is mirrored to `TELEGRAM_CHANNEL_ID`. Two paths write to it on purpose: `importVacancy`/`api/notify` post immediately, and the hourly `api/cron/telegram-channel` sweeps anything still unposted. `vacancies.telegram_message_id` is the interlock — set on success, so the sweeper skips it and nothing is posted twice. The sweep only looks two days back by default so that switching the channel on doesn't dump the whole archive into it; pass `?days=…&limit=…` to seed the backlog deliberately, a run at a time.

Copy for both lives in `TG_COPY` in `lib/telegramBot.ts`, not in `lib/i18n.ts`: it renders server-side only, and the bot has to answer people who have never had a locale on the site. The bot writes in **one** language — `botLang()`, `TELEGRAM_LANG`, English by default — for channel posts, DMs and the `/start`/`/stop` replies alike: a vacancy's own content (rank, vessel type) is English whatever locale it is wrapped in, so a per-seafarer wrapper read as a mix rather than a translation. `TG_COPY` still carries all five languages, so flipping the env var switches everything at once. Links carry the matching locale prefix.

**Do not confuse `lib/telegram.ts` with `lib/telegramBot.ts`.** The first is inbound — it scrapes *other people's* public channels for the vacancy collector and needs no token. The second is outbound — our own bot.

Setup, once: create the bot with @BotFather → set `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET` (mandatory; the webhook rejects every update without it), `TELEGRAM_CHANNEL_ID` → add the bot as a channel admin with "post messages" → open `/api/telegram/setup?secret=<CRON_SECRET>` to register the webhook and verify the wiring.

### Styling

Tailwind CSS with a custom maritime palette. **`tailwind.config.ts` holds no literal colours** — every token is `rgb(var(--c-*) / <alpha-value>)`, and the channel values live in `app/globals.css`. Changing the theme therefore means editing that one file, never a component.

There are two themes. **«Штурманская»** (dark) is the product theme and sits on bare `:root`, so it is the CSS default and needs no script to appear. **«Глубина»** (light) is the opt-in alternative under `[data-theme="light"]`, set on `<html>` by an inline script in `layout.tsx` before paint. Whichever theme is the default must also be the CSS default: applying it from JavaScript means a blocked or slow script paints the other one first.

| Token | Dark (default) | Light | Usage |
|-------|----------------|-------|-------|
| `navy` | `#0a1f33` | `#c9e0f1` | page background |
| `navy2` | `#102a42` | `#e1eff9` | raised surface |
| `deep` | `#06141f` | `#a6c9e4` | deepest band: footer, section strips |
| `card` | `#12304c` | `#ffffff` | card surfaces |
| `brass` / `brass2` | `#c9a227` / `#e3c04a` | `#d9ae23` / `#b08d1b` | accent fill, CTA gradient |
| `brassInk` | `#e3c04a` | `#6f5605` | accent as text |
| `foam` | `#e4edf1` | `#07263f` | primary text |
| `mist` | `#99aebe` | `#25455c` | secondary text |
| `teal` | `#2dd4bf` | `#0e6f68` | vessel-type labels |
| `coral` | `#ed8262` | `#a9491f` | "HOT" badge / errors |

Two dark values are deliberate and worth not "fixing": the page is not near-black and the text is not near-white, because pairing the two pushes heading contrast to 16.5:1 — past the point where light type on a very dark ground starts to smear. And `card` sits a full 1.24× above `navy` so the layout reads as layers rather than one flat field.

`.hero-surface` / `.hero-surface-center` carry the hero gradient (a dawn sea, `#2c5578 → #0a1f33`, inverted for light) and are the only place a literal colour is written outside the token blocks.

`text-white`, `border-white/10` and friends are hardcoded throughout the app and mean "primary text" / "hairline". They are correct as-is on the dark default; the block of `:root[data-theme="light"]` overrides at the bottom of `globals.css` remaps them for light. **Any new hardcoded `white` utility needs an entry there or it will be invisible in light mode.**

Fonts: **Fraunces** (`font-display`) for headings, **Archivo** (`font-body`) for body text — self-hosted via `next/font/google` in `app/layout.tsx` (not loaded from a CDN `<link>`).

The `@/` path alias resolves to the repository root (configured in `tsconfig.json`).

### SEO

`lib/seo.ts` builds hreflang `alternates.languages` maps and OpenGraph locale codes per route, used in every `[locale]` layout's `generateMetadata`. `app/sitemap.ts` and `app/robots.ts` are dynamic route handlers (not static files). Job and news detail pages have dedicated `opengraph-image.tsx`/`twitter-image.tsx` route handlers for per-item social cards. URL slugs are `<slugified-title>-<uuid>` (`lib/slug.ts`); always look records up by the trailing UUID, never by the slug text, so old/edited-title links keep resolving.

### Shared components (`components/`)

All are `"use client"`. The reused ones worth knowing:

- `Header.tsx` / `Footer.tsx` — global chrome, including the language switcher (`LANGS`) and `NotificationBell.tsx` (polls the `notifications` table, opens on click).
- `LangProvider.tsx` — provides `useLang()`; wrap-around for the whole locale tree (see i18n above).
- `JobCard.tsx` / `PopularJobLinks.tsx` — vacancy card and the internal-linking block to rank/vessel SEO landing pages (same URLs the sitemap treats as landing pages).
- `MessagesView.tsx` + `ChatPanel.tsx` — the shared company↔seafarer DM UI (`conversations`/`chat_messages`), rendered inside both dashboards' `messages` pages.
- `MarkdownEditor.tsx` — toolbar textarea used for forum/news authoring; its output is rendered by `lib/markdown.tsx`, a small hand-rolled Markdown renderer (bold/italic/strike/links/images/lists), not a Markdown library.
- `ApplicantCvModal.tsx` — company-facing applicant CV preview; `ContactForm.tsx`, `CookieBanner.tsx`.

### Conventions / gotchas

- `next.config.js` sets `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` to `true` — **`npm run build` will not fail on type or lint errors.** Run `npm run lint` and check `tsc` output yourself before considering a change verified.
- Because most pages consume `useLang()` and/or talk to Supabase client-side, most page/component files are `"use client"`.
- `lib/ranks.ts` (`RANK_GROUPS`), `lib/searchSynonyms.ts`, and `lib/fleets.ts` (`FLEETS` — keyword-matched fleet filter) are the canonical rank/search/fleet taxonomies used by job filtering — extend these rather than hardcoding rank/vessel strings elsewhere.
- Referrals: `lib/referral.ts` captures a `?ref=<code>` on the auth pages (persisted through the OAuth round-trip in `localStorage`) and records a `referrals` row once the new user has a session. `next.config.js` allows any HTTPS image host (`remotePatterns: **`) because logos/covers are free-text URLs.
