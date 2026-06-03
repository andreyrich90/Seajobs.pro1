"use client";

import Link from "next/link";
import { Newspaper, Calendar, Tag } from "lucide-react";
import Header from "@/components/Header";
import { NEWS } from "@/lib/data";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

const TAG_COLORS: Record<string, string> = {
  Regulation: "bg-teal/10 border-teal/20 text-teal",
  Market: "bg-coral/10 border-coral/20 text-coral",
  Industry: "bg-brass/10 border-brass/20 text-brass2",
};

function formatDate(dateStr: string, lang: string): string {
  return new Date(dateStr).toLocaleDateString(
    lang === "ua" ? "uk-UA" : lang === "pl" ? "pl-PL" : lang === "ru" ? "ru-RU" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

export default function NewsPage() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <div className="min-h-screen bg-navy">
      <Header />

      <div className="mx-auto max-w-5xl px-5 py-10">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="font-display text-3xl font-semibold text-white">{t.nav_news}</h1>
          <p className="mt-2 text-sm text-mist">
            {lang === "ua" && "Останні новини морської індустрії"}
            {lang === "pl" && "Najnowsze wiadomości z branży morskiej"}
            {lang === "ru" && "Последние новости морской отрасли"}
            {lang === "en" && "Latest news from the maritime industry"}
          </p>
        </div>

        {/* Featured article */}
        <Link
          href={`/news/${NEWS[0].id}`}
          className="group mb-8 block overflow-hidden rounded-2xl border border-white/10 transition hover:border-white/20"
        >
          <div
            className="relative flex min-h-[200px] items-end p-6 sm:min-h-[260px]"
            style={{ background: NEWS[0].gradient }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="relative">
              <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${TAG_COLORS[NEWS[0].tag] ?? "bg-white/10 border-white/20 text-white"}`}>
                <Tag size={11} /> {NEWS[0].tag}
              </span>
              <h2 className="font-display text-xl font-semibold text-white group-hover:text-brass2 transition sm:text-2xl">
                {NEWS[0].title[lang] ?? NEWS[0].title.en}
              </h2>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
                <Calendar size={12} /> {formatDate(NEWS[0].date, lang)}
              </p>
            </div>
          </div>
        </Link>

        {/* Other articles */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {NEWS.slice(1).map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-white/20"
            >
              <div
                className="h-32"
                style={{ background: item.gradient }}
              />
              <div className="p-5">
                <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TAG_COLORS[item.tag] ?? "bg-white/10 border-white/20 text-white"}`}>
                  <Tag size={11} /> {item.tag}
                </span>
                <h3 className="font-display text-base font-semibold text-white group-hover:text-brass2 transition leading-snug">
                  {item.title[lang] ?? item.title.en}
                </h3>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-mist">
                  <Calendar size={12} /> {formatDate(item.date, lang)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {NEWS.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-card p-16 text-center">
            <Newspaper size={32} className="mx-auto mb-3 text-mist" />
            <p className="text-mist">No news yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
