"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Salad, X } from "lucide-react";
import { useState } from "react";
import { useLang, useT } from "./DictProvider";
import LangSwitcher from "./LangSwitcher";
import ThemeToggle from "./ThemeToggle";
import { href } from "@/lib/nav";

export default function Header() {
  const t = useT();
  const lang = useLang();
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  const nav = [
    { path: "/recipes", label: t("nav.recipes") },
    { path: "/pp", label: t("nav.pp") },
    { path: "/lifehacks", label: t("nav.lifehacks") },
    { path: "/about", label: t("nav.about") },
  ];

  const isActive = (path: string) => pathname.startsWith(href(lang, path));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href={href(lang)} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-basil text-white">
            <Salad size={20} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            {t("brand")}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.path}
              href={href(lang, item.path)}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                isActive(item.path)
                  ? "bg-basil/10 text-basilInk"
                  : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LangSwitcher />
          </div>
          <ThemeToggle />
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-cream md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.path}
                href={href(lang, item.path)}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm font-semibold ${
                  isActive(item.path)
                    ? "bg-basil/10 text-basilInk"
                    : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <LangSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
