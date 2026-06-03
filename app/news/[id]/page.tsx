"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, Tag } from "lucide-react";
import Header from "@/components/Header";
import { NEWS } from "@/lib/data";
import { useLang } from "@/components/LangProvider";

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

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLang();

  const article = NEWS.find((n) => String(n.id) === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-navy">
        <Header />
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <p className="text-mist">Article not found.</p>
          <Link href="/news" className="mt-4 inline-flex items-center gap-1.5 text-sm text-brass2 hover:underline">
            <ChevronLeft size={14} /> Back to news
          </Link>
        </div>
      </div>
    );
  }

  const otherArticles = NEWS.filter((n) => n.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-navy">
      <Header />

      <div className="mx-auto max-w-3xl px-5 py-10">

        {/* Back */}
        <Link
          href="/news"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-mist hover:text-white transition"
        >
          <ChevronLeft size={16} /> Back to News
        </Link>

        {/* Hero banner */}
        <div
          className="mb-8 overflow-hidden rounded-2xl"
          style={{ background: article.gradient }}
        >
          <div className="relative min-h-[180px] flex items-end p-6">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="relative">
              <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${TAG_COLORS[article.tag] ?? "bg-white/10 border-white/20 text-white"}`}>
                <Tag size={11} /> {article.tag}
              </span>
              <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {article.title[lang] ?? article.title.en}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
                <Calendar size={12} /> {formatDate(article.date, lang)}
              </p>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="rounded-2xl border border-white/10 bg-card px-6 py-8 sm:px-8">
          <div className="prose prose-invert max-w-none">
            {(article.body[lang] ?? article.body.en).split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-5 text-sm leading-7 text-foam last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* More articles */}
        {otherArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-5 font-display text-lg font-semibold text-white">
              {lang === "ua" && "Більше новин"}
              {lang === "pl" && "Więcej wiadomości"}
              {lang === "ru" && "Больше новостей"}
              {lang === "en" && "More news"}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {otherArticles.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="group rounded-2xl border border-white/10 bg-card overflow-hidden transition hover:border-white/20"
                >
                  <div className="h-24" style={{ background: item.gradient }} />
                  <div className="p-4">
                    <span className={`mb-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${TAG_COLORS[item.tag] ?? "bg-white/10 border-white/20 text-white"}`}>
                      <Tag size={10} /> {item.tag}
                    </span>
                    <p className="text-sm font-semibold text-white group-hover:text-brass2 transition leading-snug">
                      {item.title[lang] ?? item.title.en}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
