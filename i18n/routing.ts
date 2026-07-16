import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "ua", "pl", "ro"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Don't auto-redirect "/" to the visitor's browser language. With detection
  // on, a non-English visitor lands on /ru or /ua and the stored cookie keeps
  // redirecting "/" back there — so switching to English never sticks. The URL
  // is the single source of truth: "/" is always English; users pick a
  // language explicitly via the switcher.
  localeDetection: false,
  // Don't emit the middleware's Link: <…>; hreflang=… response header. It uses
  // our raw locale codes, and "ua" is not a valid hreflang language code (the
  // Ukrainian code is "uk") — Lighthouse flags it. Correct hreflang alternates
  // (with ua→uk mapped) are already emitted per page via generateMetadata.
  alternateLinks: false,
});

export type AppLocale = (typeof routing.locales)[number];
