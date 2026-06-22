"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Newspaper, Calendar, Tag, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NEWS } from "@/lib/data";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";
import { slugId } from "@/lib/slug";

const TAG_COLORS: Record<string, string> = {
  Regulation: "bg-teal/10 border-teal/20 text-teal",
  Market:     "bg-coral/10 border-coral/20 text-coral",
  Industry:   "bg-brass/10 border-brass/20 text-brass2",
  Safety:     "bg-teal/10 border-teal/20 text-teal",
  Technology: "bg-brass/10 border-brass/20 text-brass2",
};

export type DbArticle = {
  id: string;
  title: Record<string, string>;
  body: Record<string, string> | null;
  tag: string | null;
  cover_gradient: string | null;
  cover_url: string | null;
  published_at: string | null;
  created_at: string;
};

type DisplayItem = {
  id: string;
  title: string;
  tag: string;
  date: string;
  gradient: string;
  coverUrl: string | null;
  excerpt: string;
  readMins: number;
};

function formatDate(dateStr: string, lang: string): string {
  return new Date(dateStr).toLocaleDateString(
    lang === "ua" ? "uk-UA" : lang === "pl" ? "pl-PL" : lang === "ru" ? "ru-RU" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

function readMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function makeExcerpt(text: string, max = 150): string {
  const clean = text.replace(/^#{1,6}\s.*$/gm, "").replace(/[#*_>`]/g, "").replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).replace(/\s+\S*$/, "") + "…" : clean;
}

export default function NewsClient({ initialDbArticles }: { initialDbArticles: DbArticle[] }) {
  const { lang } = useLang();
  const t = T[lang];
  const [activeTag, setActiveTag] = useState<string>("all");

  const ukKey = lang === "ua" ? "uk" : lang;
  const minLabel = lang === "ua" ? "хв читання" : lang === "pl" ? "min czytania" : lang === "ru" ? "мин чтения" : "min read";
  const latestLabel = lang === "ua" ? "Свіже" : lang === "pl" ? "Najnowsze" : lang === "ru" ? "Свежее" : "Latest";
  const allLabel = lang === "ua" ? "Усі" : lang === "pl" ? "Wszystkie" : lang === "ru" ? "Все" : "All";

  const staticItems: DisplayItem[] = [...NEWS].map((n) => {
    const body = n.body[lang] ?? n.body.en ?? "";
    return {
      id: n.slug,
      title: n.title[lang] ?? n.title.en,
      tag: n.tag,
      date: n.date,
      gradient: n.gradient,
      coverUrl: n.coverUrl ?? null,
      excerpt: makeExcerpt(body),
      readMins: readMinutes(body),
    };
  });

  const dbItems: DisplayItem[] = initialDbArticles.map((a) => {
    const body = a.body?.[lang] || a.body?.[ukKey] || a.body?.en || "";
    const title = a.title?.[lang] || a.title?.[ukKey] || a.title?.en || "";
    return {
      id: slugId(title, a.id),
      title,
      tag: a.tag ?? "News",
      date: a.published_at ?? a.created_at,
      gradient: a.cover_gradient ?? "linear-gradient(135deg,#0c4a6e,#155e75)",
      coverUrl: a.cover_url ?? null,
      excerpt: makeExcerpt(body),
      readMins: readMinutes(body),
    };
  });

  const items = [...dbItems, ...staticItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const tags = Array.from(new Set(items.map((i) => i.tag)));
  const filtered = activeTag === "all" ? items : items.filter((i) => i.tag === activeTag);

  return (
    <div className="min-h-screen bg-navy">
      <Header />
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-white">{t.nav_news}</h1>
          <p className="mt-2 text-sm text-mist">
            {lang === "ua" && "Останні новини морської індустрії"}
            {lang === "pl" && "Najnowsze wiadomości z branży morskiej"}
            {lang === "ru" && "Последние новости морской отрасли"}
            {lang === "en" && "Latest news from the maritime industry"}
          </p>
        </div>

        {/* Category filter */}
        {tags.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag("all")}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                activeTag === "all" ? "border-brass/40 bg-brass/15 text-brass2" : "border-white/10 bg-white/5 text-mist hover:text-white"
              }`}
            >
              {allLabel}
            </button>
            {tags.map((tg) => (
              <button
                key={tg}
                onClick={() => setActiveTag(tg)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  activeTag === tg ? "border-brass/40 bg-brass/15 text-brass2" : "border-white/10 bg-white/5 text-mist hover:text-white"
                }`}
              >
                {tg}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Main column */}
          <div className="min-w-0">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-card p-16 text-center">
                <Newspaper size={32} className="mx-auto mb-3 text-mist" />
                <p className="text-mist">No news yet.</p>
              </div>
            ) : (
              <>
                {/* Featured */}
                <Link href={`/news/${filtered[0].id}`}
                  className="group mb-8 block overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-white/20">
                  <div className="relative h-60 overflow-hidden sm:h-80"
                    style={{ background: filtered[0].coverUrl ? undefined : filtered[0].gradient }}>
                    {filtered[0].coverUrl && (
                      <img src={filtered[0].coverUrl} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </div>
                  <div className="p-6">
                    <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${TAG_COLORS[filtered[0].tag] ?? "bg-white/10 border-white/20 text-white"}`}>
                      <Tag size={11} /> {filtered[0].tag}
                    </span>
                    <h2 className="font-display text-xl font-semibold text-white group-hover:text-brass2 transition sm:text-2xl">
                      {filtered[0].title}
                    </h2>
                    {filtered[0].excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mist">{filtered[0].excerpt}</p>
                    )}
                    <p className="mt-3 flex items-center gap-3 text-xs text-mist">
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(filtered[0].date, lang)}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {filtered[0].readMins} {minLabel}</span>
                    </p>
                  </div>
                </Link>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {filtered.slice(1).map((item) => (
                    <Link key={item.id} href={`/news/${item.id}`}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-white/20">
                      <div className="relative h-44 overflow-hidden" style={{ background: item.coverUrl ? undefined : item.gradient }}>
                        {item.coverUrl && <img src={item.coverUrl} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                      </div>
                      <div className="p-5">
                        <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TAG_COLORS[item.tag] ?? "bg-white/10 border-white/20 text-white"}`}>
                          <Tag size={11} /> {item.tag}
                        </span>
                        <h3 className="font-display text-base font-semibold leading-snug text-white transition group-hover:text-brass2">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-mist">{item.excerpt}</p>
                        )}
                        <p className="mt-3 flex items-center gap-3 text-xs text-mist">
                          <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(item.date, lang)}</span>
                          <span className="flex items-center gap-1.5"><Clock size={12} /> {item.readMins} {minLabel}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar — Latest (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-card p-5">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-mist">{latestLabel}</h3>
              <div className="flex flex-col gap-4">
                {items.slice(0, 6).map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`} className="group flex gap-3">
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg" style={{ background: item.coverUrl ? undefined : item.gradient }}>
                      {item.coverUrl && <img src={item.coverUrl} alt="" className="h-full w-full object-cover" />}
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-xs font-semibold leading-snug text-foam transition group-hover:text-brass2">{item.title}</p>
                      <p className="mt-1 text-[11px] text-mist">{formatDate(item.date, lang)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
