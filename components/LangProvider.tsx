"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useParams } from "next/navigation";
import type { Lang } from "@/lib/i18n";
import { usePathname, useRouter } from "@/i18n/navigation";

const VALID_LANGS: Lang[] = ["en", "uk", "pl", "ru"];

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

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
      router.replace(pathname, { locale: l });
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
