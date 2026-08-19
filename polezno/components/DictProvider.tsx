"use client";

import { createContext, useContext, useMemo } from "react";
import type { Dict } from "@/lib/i18n";
import { DEFAULT_LANG, type Lang } from "@/lib/langs";

interface Ctx {
  lang: Lang;
  dict: Dict;
}

const DictCtx = createContext<Ctx>({ lang: DEFAULT_LANG, dict: {} });

export function DictProvider({
  lang,
  dict,
  children,
}: {
  lang: Lang;
  dict: Dict;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ lang, dict }), [lang, dict]);
  return <DictCtx.Provider value={value}>{children}</DictCtx.Provider>;
}

/** Translate a UI key. Falls back to the key itself so nothing renders blank. */
export function useT() {
  const { dict } = useContext(DictCtx);
  return (key: string) => dict[key] ?? key;
}

/** Current language code (no strings pulled in). */
export function useLang(): Lang {
  return useContext(DictCtx).lang;
}
