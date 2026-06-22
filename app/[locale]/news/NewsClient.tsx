"use client";

import { Link } from "@/i18n/navigation";
import { Newspaper, Calendar, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NEWS } from "@/lib/data";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

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
};

function formatDate(dateStr: string, lang: string): string {
  return new Date(dateStr).toLocaleDateString(
    lang === "ua" ? "uk-UA" : lang === "pl" ? "pl-PL" : lang === "ru" ? "ru-RU" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

export default function NewsClient({ initialDbArticles }: { initialDbArticles: DbArticle[] }) {
  const { lang } = useLang();
  const t = T[lang];

  const ukKey = lang === "ua" ? "uk" : lang;

  const staticItems: DisplayItem[] = [...NEWS]
    .map((n) => ({
      id: n.slug,
      title: n.title[lang] ?? n.title.en,
      tag: n.tag,
      date: n.date,
      gradient: n.gradient,
      coverUrl: n.coverUrl ?? null,
    }));

  const dbItems: DisplayItem[] = initialDbArticles.map((a) => ({
    id: `db-${a.id}`,
    title: a.title?.[lang] || a.title?.[ukKey] || a.title?.en || "",
    tag: a.tag ?? "News",
    date: a.published_at ?? a.created_at,
    gradient: a.cover_gradient ?? "linear-gradient(135deg,#0c4a6e,#155e75)",
    coverUrl: a.cover_url ?? null,
  }));

  const items = [...dbItems, ...staticItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-navy">
      <Header />
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-semibold text-white">{t.nav_news}</h1>
          <p className="mt-2 text-sm text-mist">
            {lang === "ua" && "Останні новини морської індустрії"}
            {lang === "pl" && "Najnowsze wiadomości z branży morskiej"}
            {lang === "ru" && "Последние новости морской отрасли"}
            {lang === "en" && "Latest news from the maritime industry"}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-card p-16 text-center">
            <Newspaper size={32} className="mx-auto mb-3 text-mist" />
            <p className="text-mist">No news yet.</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            <Link href={`/news/${items[0].id}`}
              className="group mb-8 block overflow-hidden rounded-2xl border border-white/10 transition hover:border-white/20">
              <div className="relative flex min-h-[200px] items-end p-6 sm:min-h-[260px]"
                style={{ background: items[0].coverUrl ? undefined : items[0].gradient }}>
                {items[0].coverUrl && (
                  <img src={items[0].coverUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative">
                  <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${TAG_COLORS[items[0].tag] ?? "bg-white/10 border-white/20 text-white"}`}>
                    <Tag size={11} /> {items[0].tag}
                  </span>
                  <h2 className="font-display text-xl font-semibold text-white group-hover:text-brass2 transition sm:text-2xl">
                    {items[0].title}
                  </h2>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
                    <Calendar size={12} /> {formatDate(items[0].date, lang)}
                  </p>
                </div>
              </div>
            </Link>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {items.slice(1).map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-white/20">
                  <div className="relative h-32" style={{ background: item.coverUrl ? undefined : item.gradient }}>
                    {item.coverUrl && <img src={item.coverUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />}
                  </div>
                  <div className="p-5">
                    <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TAG_COLORS[item.tag] ?? "bg-white/10 border-white/20 text-white"}`}>
                      <Tag size={11} /> {item.tag}
                    </span>
                    <h3 className="font-display text-base font-semibold text-white group-hover:text-brass2 transition leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-mist">
                      <Calendar size={12} /> {formatDate(item.date, lang)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
