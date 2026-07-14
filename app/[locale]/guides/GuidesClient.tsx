"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/components/LangProvider";
import { GUIDES_UI } from "@/lib/guidesUi";
import { slugId } from "@/lib/slug";

export type GuideCard = {
  id: string;
  title: Record<string, string>;
  body: Record<string, string> | null;
  tag: string | null;
  cover_gradient: string | null;
  cover_url: string | null;
  published_at: string | null;
  created_at: string;
};

function excerpt(text: string, max = 140): string {
  const clean = text.replace(/^#{1,6}\s.*$/gm, "").replace(/[#*_>`]/g, "").replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).replace(/\s+\S*$/, "") + "…" : clean;
}
function readMins(text: string): number {
  return Math.max(1, Math.round(text.trim().split(/\s+/).filter(Boolean).length / 200));
}

export default function GuidesClient({ initialGuides }: { initialGuides: GuideCard[] }) {
  const { lang } = useLang();
  const ui = GUIDES_UI[lang] ?? GUIDES_UI.en;
  const ukKey = lang === "ua" ? "uk" : lang;
  const minLabel = lang === "ua" ? "хв" : lang === "pl" ? "min" : lang === "ru" ? "мин" : lang === "ro" ? "min" : "min";

  const items = initialGuides.map((g) => {
    const body = g.body?.[lang] || g.body?.[ukKey] || g.body?.en || "";
    const title = g.title?.[lang] || g.title?.[ukKey] || g.title?.en || "";
    return {
      id: slugId(title, g.id),
      title,
      tag: g.tag,
      date: g.published_at ?? g.created_at,
      gradient: g.cover_gradient ?? "linear-gradient(135deg,#0c4a6e,#155e75)",
      coverUrl: g.cover_url ?? null,
      excerpt: excerpt(body),
      readMins: readMins(body),
    };
  });

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(
      lang === "ua" ? "uk-UA" : lang === "pl" ? "pl-PL" : lang === "ru" ? "ru-RU" : lang === "ro" ? "ro-RO" : "en-GB",
      { day: "numeric", month: "long", year: "numeric" },
    );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex items-center gap-2 text-brass2">
          <BookOpen size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">{ui.crumb}</span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">{ui.h1}</h1>
        <p className="mt-2 max-w-2xl text-[15px] text-mist">{ui.metaDesc}</p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-card px-5 py-16 text-center">
            <BookOpen size={28} className="mx-auto mb-3 text-mist/40" />
            <p className="text-sm text-mist">{ui.empty}</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((n) => (
              <Link key={n.id} href={`/guides/${n.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-white/20">
                <div className="relative h-40 overflow-hidden" style={{ background: n.coverUrl ? undefined : n.gradient }}>
                  {n.coverUrl && <Image src={n.coverUrl} alt={n.title} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {n.tag && (
                    <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-brass/20 bg-brass/10 px-2.5 py-0.5 text-[11px] font-semibold text-brass2">
                      {n.tag}
                    </span>
                  )}
                  <h2 className="font-display text-lg font-semibold leading-snug text-white transition group-hover:text-brass2 line-clamp-2">{n.title}</h2>
                  <p className="mt-2 text-sm text-mist line-clamp-2">{n.excerpt}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-mist">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {fmtDate(n.date)}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {n.readMins} {minLabel}</span>
                    <span className="ml-auto flex items-center gap-1 font-bold text-brass2">{ui.readMore} <ArrowRight size={12} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
