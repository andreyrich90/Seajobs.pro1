"use client";

import { useState } from "react";
import { Anchor, Globe, ChevronDown, LogIn, Briefcase, MessageSquare, Newspaper } from "lucide-react";
import { LANGS, T, type Lang } from "@/lib/i18n";

export default function Header({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const [open, setOpen] = useState(false);
  const t = T[lang];
  const current = LANGS.find((l) => l.code === lang)!;

  const nav = [
    { label: t.nav_jobs, icon: Briefcase },
    { label: t.nav_forum, icon: MessageSquare },
    { label: t.nav_news, icon: Newspaper },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-deep/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2 shadow-lg">
            <Anchor size={22} className="text-deep" strokeWidth={2.4} />
          </div>
          <span className="font-display text-2xl font-bold text-white">
            SeaJobs<span className="text-brass2">.pro</span>
          </span>
        </div>

        {/* Nav (desktop) */}
        <nav className="ml-6 hidden gap-6 md:flex">
          {nav.map((n) => (
            <span
              key={n.label}
              className="flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-foam transition hover:text-brass2"
            >
              <n.icon size={16} /> {n.label}
            </span>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Globe size={16} /> {current.label} <ChevronDown size={14} />
            </button>
            {open && (
              <div className="absolute right-0 top-12 z-50 min-w-[140px] rounded-xl border border-white/10 bg-navy2 p-1.5 shadow-2xl">
                {LANGS.map((l) => (
                  <div
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setOpen(false);
                    }}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-white/5 ${
                      lang === l.code ? "bg-brass/15" : ""
                    }`}
                  >
                    <span className="text-lg">{l.flag}</span> {l.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Login */}
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-brass to-brass2 px-4 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5">
            <LogIn size={16} /> {t.login}
          </button>
        </div>
      </div>
    </header>
  );
}
