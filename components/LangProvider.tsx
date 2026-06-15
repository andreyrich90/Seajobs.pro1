"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useParams, useRouter as useNextRouter } from "next/navigation";
import type { Lang } from "@/lib/i18n";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const VALID_LANGS: Lang[] = ["en", "uk", "pl", "ru"];

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const router = useNextRouter();

  // Pages under app/[locale]/... derive the language from the URL —
  // that's the source of truth for SEO and is set by the locale switcher
  // below via navigation. Pages outside [locale] (private dashboards)
  // fall back to a localStorage preference.
  const urlLocale = params?.locale as Lang | undefined;

  const [storedLang, setStoredLang] = useState<Lang>("en");

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
    if (urlLocale) {
      // Build the target URL ourselves rather than relying on next-intl's
      // useRouter().replace(), which always forces a locale prefix —
      // including for the default locale under "as-needed" mode (e.g.
      // /en/jobs). That extra prefix requires a middleware redirect that
      // the App Router's client-side navigation doesn't always follow,
      // producing a 404. Switching to the default locale must yield an
      // unprefixed path.
      const suffix = pathname === "/" ? "" : pathname;
      const href = l === routing.defaultLocale ? (suffix || "/") : `/${l}${suffix}`;
      router.replace(href);
    } else {
      setStoredLang(l);
      localStorage.setItem("lang", l);
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
