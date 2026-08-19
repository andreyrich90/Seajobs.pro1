"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./DictProvider";
import { LANGS, LOCALES } from "@/lib/langs";

// Swaps the leading locale segment of the current path, keeping the rest so the
// reader stays on the same page in the other language.
export default function LangSwitcher() {
  const current = useLang();
  const pathname = usePathname() || "/";

  function swap(target: string): string {
    const parts = pathname.split("/");
    // parts[0] === "" , parts[1] === locale
    if (LOCALES.includes(parts[1] as any)) {
      parts[1] = target;
    } else {
      return `/${target}`;
    }
    return parts.join("/") || `/${target}`;
  }

  return (
    <div className="inline-flex items-center rounded-full border border-line p-0.5 text-xs font-semibold">
      {LANGS.map((l) => (
        <Link
          key={l.code}
          href={swap(l.code)}
          className={`rounded-full px-2.5 py-1 transition ${
            l.code === current
              ? "bg-basil text-white"
              : "text-muted hover:text-ink"
          }`}
        >
          {l.short}
        </Link>
      ))}
    </div>
  );
}
