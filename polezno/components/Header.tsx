"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, X } from "lucide-react";
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
    { path: "/collections", label: t("nav.collections") },
    { path: "/lifehacks", label: t("nav.lifehacks") },
    { path: "/about", label: t("nav.about") },
  ];

  const isActive = (path: string) => pathname.startsWith(href(lang, path));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/85 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-content items-center justify-between gap-4 px-5 sm:px-8">
        {/* Logo */}
        <Link href={href(lang)} className="flex items-center gap-2.5">
          <span className="relative h-[34px] w-[34px] rounded-full logo-ring">
            <span className="absolute inset-[6px] rounded-full bg-cream" />
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-ink">
            {t("brand")}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.path}
              href={href(lang, item.path)}
              className={`group relative text-[15px] font-semibold transition ${
                isActive(item.path) ? "text-clay" : "text-ink/85 hover:text-ink"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-clay transition-all ${
                  isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          <div className="hidden items-center gap-2.5 sm:flex">
            <LangSwitcher />
            <ThemeToggle />
          </div>
          <Link
            href={href(lang, "/recipes")}
            aria-label="search"
            className="hidden h-[38px] w-[38px] items-center justify-center rounded-full border border-line text-ink transition hover:bg-cream2 sm:inline-flex"
          >
            <Search size={17} />
          </Link>
          <Link
            href={href(lang, "/pp")}
            aria-label="favorites"
            className="hidden h-[38px] w-[38px] items-center justify-center rounded-full border border-line text-ink transition hover:bg-cream2 sm:inline-flex"
          >
            <Heart size={17} />
          </Link>
          <Link
            href={href(lang, "/about")}
            className="hidden rounded-full bg-basil px-5 py-2.5 text-sm font-bold text-cream shadow-soft transition hover:bg-clay sm:inline-block"
          >
            {t("header.profile")}
          </Link>

          <button
            className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-line text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-cream lg:hidden">
          <nav className="mx-auto flex max-w-content flex-col gap-1 px-5 py-3">
            {nav.map((item) => (
              <Link
                key={item.path}
                href={href(lang, item.path)}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-[15px] font-semibold ${
                  isActive(item.path) ? "bg-clay/10 text-clay" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 px-1 pt-3">
              <LangSwitcher />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
