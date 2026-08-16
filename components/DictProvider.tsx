"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dict } from "@/lib/langs";

// One language's strings, handed down from the server.
//
// `app/[locale]/layout.tsx` is a Server Component and already knows the locale
// from the URL, so it can pick the right dictionary and pass it in as a prop.
// Only that one crosses to the browser; the other four never leave the server.
// Before this, every client component imported the whole `T` map, so a Russian
// reader downloaded the English, Ukrainian, Polish and Romanian strings too —
// about 113 KB of JavaScript, on every page, that could never be displayed.
//
// The dictionary arrives with the first render, so `useT()` is synchronous and
// there is no loading state and no flash of untranslated text.

const DictContext = createContext<Dict | null>(null);

export function DictProvider({ dict, children }: { dict: Dict; children: ReactNode }) {
  return <DictContext.Provider value={dict}>{children}</DictContext.Provider>;
}

/**
 * The current language's strings. Replaces `const t = T[lang]`.
 *
 * Available anywhere inside the `[locale]` tree. The auth screens sit outside
 * it and read `T[lang]` directly — see the note in `lib/i18n.ts`.
 */
export function useT(): Dict {
  const dict = useContext(DictContext);
  if (!dict) throw new Error("useT must be used inside DictProvider");
  return dict;
}
