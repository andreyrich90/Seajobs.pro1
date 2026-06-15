import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "ua", "pl"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Don't auto-redirect "/" to the visitor's browser language. With detection
  // on, a non-English visitor lands on /ru or /ua and the stored cookie keeps
  // redirecting "/" back there — so switching to English never sticks. The URL
  // is the single source of truth: "/" is always English; users pick a
  // language explicitly via the switcher.
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
