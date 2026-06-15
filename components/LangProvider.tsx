"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useParams, usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";

const VALID_LANGS: Lang[] = ["en", "uk", "pl", "ru"];
const DEFAULT_LANG: Lang = "en";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  // Raw browser pathname (includes the locale prefix, e.g. "/ru/jobs").
  // We deliberately use next/navigation here rather than next-intl's
  // usePathname: this provider lives ABOVE the [locale] NextIntlClientProvider,
  // so next-intl's locale context would always be the default "en" and its
  // usePathname would fail to strip the real prefix — producing double-locale
  // URLs like "/uk/ru/jobs" (404) when switching languages.
  const pathname = usePathname();

  // Pages under app/[locale]/... derive the language from the URL —
  // that's the source of truth for SEO. Pages outside [locale]
  // (auth screens) fall back to a localStorage preference.
  const urlLocale = params?.locale as Lang | undefined;

  const [storedLang, setStoredLang] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    if (urlLocale) return;
    const stored = localStorage.getItem("lang") as Lang | "ua" | null;
    const normalized = stored === "ua" ? "uk" : stored;
    if (normalized && VALID_LANGS.includes(normalized)) {
      setStoredLang(normalized);
    }
  }, [urlLocale]);

  const lang = urlLocale ?? storedLang;

  function setLang(l: Lang) {
    if (l === lang) return;

    if (!urlLocale) {
      // Not a localized route (e.g. /auth/*) — persist preference only.
      setStoredLang(l);
      localStorage.setItem("lang", l);
      return;
    }

    // Strip any existing locale prefix, then re-apply the target locale.
    // The default locale carries no prefix ("as-needed").
    const segments = (pathname || "/").split("/");
    if (VALID_LANGS.includes(segments[1] as Lang)) {
      segments.splice(1, 1);
    }
    const rest = segments.join("/") || "/";
    const search = typeof window !== "undefined" ? window.location.search : "";
    const target =
      l === DEFAULT_LANG ? rest : `/${l}${rest === "/" ? "" : rest}`;

    // Full-page navigation rather than a client-side router.push. Switching to
    // the unprefixed default locale ("/jobs") via the client router did not
    // reliably update useParams().locale, so the page kept rendering the old
    // language. A real navigation lets the server render the target locale
    // (verified correct) and removes any client locale-context staleness.
    if (typeof window !== "undefined") {
      window.location.assign(target + search);
    }
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
