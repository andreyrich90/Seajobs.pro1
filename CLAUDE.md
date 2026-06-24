# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at http://localhost:3000
npm run build     # production build
npm run start     # run a production build
npm run lint      # ESLint via Next.js
```

There is no test suite configured.

Local development needs Supabase env vars (see `.env.local.example`):
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only, used by API routes), `ANTHROPIC_API_KEY` (CV parsing + forum translation), `RESEND_API_KEY` (transactional email), `CRON_SECRET` (verifies the Vercel cron request).

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

Key Supabase tables: `profiles` (role + `is_admin`/`is_blocked` flags, one row per auth user), `seafarers`, `companies`, `vacancies`, `applications`, `saved_vacancies`, `certificates`, `sea_experience`, `job_alerts`, `notifications`, `messages` (contact form), `conversations`/`chat_messages` (company↔seafarer DMs), `forum_categories`, `forum_topics`, `forum_posts`, `news_articles`.

### Auth & roles

- Supabase Auth with the **PKCE** flow. `app/auth/login`, `register`, `forgot-password`, `callback` are the (non-localized) auth screens; `app/auth/callback/page.tsx` exchanges the `?code=` and inserts a `seafarers` row for new sign-ups.
- Role is derived from which profile rows exist / `profiles.role`, not a single enum check everywhere — page-level layouts each do their own guard:
  - `app/[locale]/admin/layout.tsx` — checks `profiles.is_admin`, redirects to `/` if false.
  - `app/[locale]/company/layout.tsx` and `app/[locale]/seafarer/layout.tsx` — check `profiles.is_blocked` and the matching session role, redirect to login/home otherwise.
- API routes that mutate data on behalf of a role (e.g. `app/api/admin/*`, `app/api/notify`) re-verify the caller server-side: read the `Authorization: Bearer <access_token>` header, call `admin.auth.getUser(token)`, then check `profiles.is_admin` or that the caller owns the row being modified. Client-side route guards are UX only — treat every API route as the real security boundary.

### i18n

The app supports four languages: `en` (default), `ru`, `ua` (Ukrainian — URL prefix `/ua`, not `/uk`), `pl`. There are **two parallel i18n systems**; know which one a file uses before editing strings:

1. **`lib/i18n.ts`** (legacy, primary) — exports `T: Record<Lang, Record<string, string>>`, a flat key/value map per language with ~1600 lines of strings. `components/LangProvider.tsx` provides `useLang()` (reads the locale from the URL via `useParams()`, falls back to a `localStorage`-persisted preference only on `/auth/*` routes). Components call `const { lang } = useLang(); const t = T[lang];`. **This is where almost all UI copy lives — add new strings here.**
2. **`next-intl`** (`i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`) — owns the `/[locale]/...` URL structure, `middleware.ts` locale negotiation, and per-page `<title>`/OpenGraph metadata (`generateMetadata` in `layout.tsx` files, using `lib/seo.ts` for hreflang). `localePrefix: "as-needed"` means English has no prefix (`/jobs`, not `/en/jobs`); `localeDetection` is off so `/` is always English.

`messages/*.json` are **generated**, not hand-edited — `scripts/export-messages.ts` (run ad hoc, e.g. `npx tsx scripts/export-messages.ts`) dumps `lib/i18n.ts`'s `T` into per-locale JSON files purely so `next-intl`'s `NextIntlClientProvider` has something to pass down; the actual `useTranslations()` next-intl hook is barely used (a couple of layout/metadata files). Re-run the export script after changing `lib/i18n.ts` if a next-intl-consuming file needs the update.

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
| `/admin/*` | `app/[locale]/admin/` | dashboard, users, vacancies, import, messages, forum, news |
| `/auth/*` | `app/auth/` | login, register, forgot-password, callback — **not** under `[locale]` |
| `/for-companies`, `/about`, `/privacy`, `/terms` | `app/[locale]/...` | static marketing/legal pages |

`/uk` and `/uk/:path*` permanently redirect to `/ua` (`next.config.js`) — old indexed links from before the Ukrainian prefix was renamed.

### API routes (`app/api/`)

All route handlers use the Node runtime and a service-role Supabase client (`createClient` with `SUPABASE_SERVICE_ROLE_KEY`), since they need to bypass RLS or act on behalf of a verified caller:

- `api/notify` — central notification dispatcher (in-app `notifications` row + email via Resend). Handles `application_received`, `external_application`, `status_changed`, `new_vacancy`, `new_message`. Always re-derives the caller from their bearer token and checks they own/are party to the resource before acting.
- `api/admin/import-vacancy` — admin-only bulk vacancy import (used to seed listings scraped from partner sites; see `supabase/import_*.sql` for the source data this replaced).
- `api/admin/translate-news`, `api/admin/translate-forum`, `api/forum/translate-topic` — call the Anthropic API (`lib/forumI18n.ts`) to machine-translate admin-authored content into the other 3 languages.
- `api/cv-parse` — accepts an uploaded PDF/DOCX CV (`mammoth` for DOCX text extraction), asks Claude to extract structured fields matching the `seafarers`/`certificates`/`sea_experience` columns, returns JSON the client writes straight into the profile.
- `api/cron/close-expired-vacancies` — Vercel Cron (`vercel.json`, daily 01:00 UTC), deactivates vacancies whose `joining_date` is >14 days in the past. Verifies `Authorization: Bearer <CRON_SECRET>` when that env var is set.
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

### Conventions / gotchas

- `next.config.js` sets `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` to `true` — **`npm run build` will not fail on type or lint errors.** Run `npm run lint` and check `tsc` output yourself before considering a change verified.
- Because most pages consume `useLang()` and/or talk to Supabase client-side, most page/component files are `"use client"`.
- `lib/ranks.ts` (`RANK_GROUPS`) and `lib/searchSynonyms.ts` are the canonical rank taxonomy and search-synonym tables used by job filtering/search — extend these rather than hardcoding rank strings elsewhere.
