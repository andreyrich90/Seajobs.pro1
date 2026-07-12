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
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only, used by API routes), `ANTHROPIC_API_KEY` (CV parsing + forum translation + vacancy-image parsing), `RESEND_API_KEY` (transactional email), `CRON_SECRET` (verifies the Vercel cron requests; also the fallback secret for the outreach route), `OUTREACH_SECRET` (optional — gates `/api/outreach`).

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

Key Supabase tables: `profiles` (role + `is_admin`/`is_blocked` flags, one row per auth user), `seafarers`, `companies`, `vacancies`, `applications`, `saved_vacancies`, `certificates`, `sea_experience`, `job_alerts`, `notifications`, `messages` (contact form), `conversations`/`chat_messages` (company↔seafarer DMs), `forum_categories` (a.k.a. forum "sections"), `forum_topics`, `forum_posts`, `news_articles`, `news_comments`, `referrals` (referral tracking; `seafarers`/`companies` carry a unique `referral_code`), `outreach_log` (which crewing agencies have already been emailed).

Migrations under `supabase/migrations/` are dated + idempotent; `20260608000000_baseline_schema.sql` is the consolidated baseline and later files layer on chat, referrals, forum sections/replies, anonymous forum posting, seafarer documents/diplomas, and the "profile required before applying" rule.

### Auth & roles

- Supabase Auth with the **PKCE** flow. `app/auth/login`, `register`, `forgot-password`, `callback` are the (non-localized) auth screens; `app/auth/callback/page.tsx` exchanges the `?code=` and inserts a `seafarers` row for new sign-ups.
- Role is derived from which profile rows exist / `profiles.role`, not a single enum check everywhere — page-level layouts each do their own guard:
  - `app/[locale]/admin/layout.tsx` — checks `profiles.is_admin`, redirects to `/` if false.
  - `app/[locale]/company/layout.tsx` and `app/[locale]/seafarer/layout.tsx` — check `profiles.is_blocked` and the matching session role, redirect to login/home otherwise.
- API routes that mutate data on behalf of a role (e.g. `app/api/admin/*`, `app/api/notify`) re-verify the caller server-side: read the `Authorization: Bearer <access_token>` header, call `admin.auth.getUser(token)`, then check `profiles.is_admin` or that the caller owns the row being modified. Client-side route guards are UX only — treat every API route as the real security boundary.

### i18n

The app supports five languages: `en` (default), `ru`, `ua` (Ukrainian — URL prefix `/ua`, not `/uk`), `pl`, `ro` (Romanian). The `Lang` union and `LANGS` picker list live in `lib/i18n.ts`; `routing.locales` in `i18n/routing.ts` must stay in sync. There are **two parallel i18n systems**; know which one a file uses before editing strings:

1. **`lib/i18n.ts`** (legacy, primary) — exports `T: Record<Lang, Record<string, string>>`, a flat key/value map per language with ~1600 lines of strings. `components/LangProvider.tsx` provides `useLang()` (reads the locale from the URL via `useParams()`, falls back to a `localStorage`-persisted preference only on `/auth/*` routes). Components call `const { lang } = useLang(); const t = T[lang];`. **This is where almost all UI copy lives — add new strings here.**
2. **`next-intl`** (`i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`) — owns the `/[locale]/...` URL structure, `middleware.ts` locale negotiation, and per-page `<title>`/OpenGraph metadata (`generateMetadata` in `layout.tsx` files, using `lib/seo.ts` for hreflang). `localePrefix: "as-needed"` means English has no prefix (`/jobs`, not `/en/jobs`); `localeDetection` is off so `/` is always English.

`messages/*.json` (`en`, `ru`, `ua`, `pl`, `ro`) are **generated**, not hand-edited — `scripts/export-messages.ts` (run ad hoc, e.g. `npx tsx scripts/export-messages.ts`) dumps `lib/i18n.ts`'s `T` into per-locale JSON files purely so `next-intl`'s `NextIntlClientProvider` has something to pass down; the actual `useTranslations()` next-intl hook is barely used (a couple of layout/metadata files). Re-run the export script after changing `lib/i18n.ts` if a next-intl-consuming file needs the update.

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
| `/admin/*` | `app/[locale]/admin/` | dashboard, users, vacancies, import, messages, chats, forum, news |
| `/auth/*` | `app/auth/` | login, register, forgot-password, callback — **not** under `[locale]` |
| `/for-companies`, `/about`, `/privacy`, `/terms` | `app/[locale]/...` | static marketing/legal pages |

`/uk` and `/uk/:path*` permanently redirect to `/ua` (`next.config.js`) — old indexed links from before the Ukrainian prefix was renamed.

### API routes (`app/api/`)

All route handlers use the Node runtime and a service-role Supabase client (`createClient` with `SUPABASE_SERVICE_ROLE_KEY`), since they need to bypass RLS or act on behalf of a verified caller:

- `api/notify` — central notification dispatcher (in-app `notifications` row + email via Resend). Handles `application_received`, `external_application`, `status_changed`, `new_vacancy`, `new_message`. Always re-derives the caller from their bearer token and checks they own/are party to the resource before acting. **`external_application`** is the imported-vacancy path: when a seafarer applies to a vacancy that carries a `contact_email` (the scraped crewing-agency address), `buildCvEmailHtml()` renders the seafarer's full CV (contacts, documents/visas, certificates, sea service, cover letter) as email-safe HTML and sends it **straight to that crewing email** — no company account needed on our side.
- `api/admin/import-vacancy` — admin-only bulk vacancy import (used to seed listings scraped from partner sites; see `supabase/import_*.sql` for the source data this replaced). Imported rows set `is_imported = true` and store the agency's `contact_email` so applications can be forwarded (see `external_application` above).
- `api/admin/parse-vacancy-image` — admin-only: send a vacancy screenshot (JPEG/PNG/WebP), Claude extracts a JSON posting matching the Import Vacancy form fields so it can be reviewed before saving. Its prompt makes the model write a **unique, rewritten** Markdown `description` (intro + `## Vessel particulars` / `## Requirements` / `## How to apply`), never a verbatim copy of the screenshot — duplicated descriptions hurt SEO, so keep this constraint if you touch the prompt.
- `api/admin/translate-news`, `api/admin/translate-forum`, `api/forum/translate-topic` — call the Anthropic API (`lib/forumI18n.ts`) to machine-translate admin-authored content into the other languages.
- `api/cv-parse` — accepts an uploaded PDF/DOCX CV (`mammoth` for DOCX text extraction), asks Claude to extract structured fields matching the `seafarers`/`certificates`/`sea_experience` columns, returns JSON the client writes straight into the profile.
- `api/cron/*` — three Vercel Crons (see `vercel.json`), each verifying `Authorization: Bearer <CRON_SECRET>` when the env var is set:
  - `close-expired-vacancies` (daily 01:00 UTC) — deactivates vacancies whose `joining_date` is >14 days in the past.
  - `referral-reminders` (daily 02:00 UTC) — emails referred users who signed up 7+ days ago but haven't finished their seafarer profile (finishing it is what rewards their referrer).
  - `unread-messages-digest` (daily 07:00 UTC) — companion to the instant-email throttle in `api/notify`: sends one "you have unread messages" follow-up per conversation for still-unread messages that arrived after the last email.
- `api/outreach` — browser-triggered crewing-agency invite mailer (open a URL, no terminal). Sends one personalised email per agency in its language via Resend, tracking sent addresses in `outreach_log` so repeat runs skip them. Gated by `OUTREACH_SECRET`/`CRON_SECRET`. Shares copy + recipient list with the `npm run outreach` CLI via `lib/outreach.ts` (see `scripts/outreach/README.md`).
- `api/contact`, `api/company/applicant` — contact form submission and company-side applicant lookup.

### Styling

Tailwind CSS with a custom maritime palette defined in `tailwind.config.ts`:

| Token | Hex | Usage |
|-------|-----|-------|
| `navy` / `navy2` | `#0a1f33` / `#0e2a45` | primary backgrounds |
| `deep` | `#061523` | darkest background |
| `card` | `#0f2942` | card surfaces |
| `brass` / `brass2` | `#c9a227` / `#e3c04a` | accent / CTA |
| `foam` | `#e8f0f2` | primary text |
| `mist` | `#8aa0b0` | secondary text |
| `teal` | `#2dd4bf` | vessel-type labels |
| `coral` | `#e8744f` | "HOT" badge / errors |

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
