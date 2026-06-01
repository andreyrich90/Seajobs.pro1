# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at http://localhost:3000
npm run build     # production build
npm run lint      # ESLint via Next.js
```

There is no test suite configured.

## Architecture

SeaJobs.pro is a **Next.js 15 / React 19 / TypeScript** maritime job board — currently a static frontend with no backend, database, or API routes.

### Data layer

All application data lives in `lib/data.ts` as exported constants:
- `JOBS: Job[]` — job listings with rank, vessel type, salary, company, joining date
- `NEWS: NewsItem[]` — news articles with multilingual titles (`Record<Lang, string>`)

Adding or extending data means editing these arrays directly.

### i18n

The app supports four languages: `ua` (Ukrainian), `pl` (Polish), `ru` (Russian), `en` (English).

- `lib/i18n.ts` exports `T: Record<Lang, Record<string, string>>` — a flat key/value map per language. All UI strings live here.
- `components/LangProvider.tsx` wraps the app in a React Context that stores the active `Lang` and exposes `useLang()`.
- Pages and components call `const { lang } = useLang(); const t = T[lang];` to get translated strings.
- Language is in-memory only (resets on reload); there is no persistence or URL routing by locale.

Because every page consumes `useLang()`, every page and most components are `"use client"` components.

### Routing

| Route | Page file |
|-------|-----------|
| `/` | `app/page.tsx` — hero + search bar + latest jobs |
| `/jobs` | `app/jobs/page.tsx` — filterable full job listing |
| `/forum`, `/news` | not yet implemented (nav links exist in Header) |

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
| `coral` | `#e8744f` | "HOT" badge |

Fonts: **Fraunces** (`font-display`) for headings, **Archivo** (`font-body`) for body text — loaded from Google Fonts in `app/globals.css`.

The `@/` path alias resolves to the repository root (configured in `tsconfig.json`).
