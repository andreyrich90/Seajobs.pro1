"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NEWS } from "@/lib/data";
import { useLang } from "@/components/LangProvider";
import { supabase } from "@/lib/supabase/client";
import type { NewsArticle } from "@/lib/supabase/types";
import { extractId } from "@/lib/slug";
import { renderMarkdown } from "@/lib/markdown";
import PopularJobLinks from "@/components/PopularJobLinks";
import ShareBar from "@/components/ShareBar";
import ArticleComments from "@/components/ArticleComments";

const TAG_COLORS: Record<string, string> = {
  Regulation: "bg-teal/10 border-teal/20 text-teal",
  Market:     "bg-coral/10 border-coral/20 text-coral",
  Industry:   "bg-brass/10 border-brass/20 text-brassInk",
  Safety:     "bg-teal/10 border-teal/20 text-teal",
  Technology: "bg-brass/10 border-brass/20 text-brassInk",
};

type Article = {
  id: string;
  title: string;
  body: string;
  tag: string;
  gradient: string;
  coverUrl: string | null;
  date: string;
};

function formatDate(d: string, lang: string) {
  return new Date(d).toLocaleDateString(
    lang === "ua" ? "uk-UA" : lang === "pl" ? "pl-PL" : lang === "ru" ? "ru-RU" : "en-GB",
    { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }
  );
}

export default function ArticleClient({ id, initialArticle }: { id: string; initialArticle?: Article | null }) {
  const { lang } = useLang();
  const [article, setArticle] = useState<Article | null>(initialArticle ?? null);
  const [others, setOthers] = useState<Article[]>([]);
  const [loading, setLoading] = useState(!initialArticle);

  const uuid = extractId(id); // db article when present; else static slug
  // Stable key for comments (independent of the cosmetic slug in the URL).
  const commentKey = uuid ? `db-${uuid}` : id;

  useEffect(() => {
    async function load() {
      if (uuid) {
        const { data } = await supabase
          .from("news_articles").select("*").eq("id", uuid).single();
        if (data) {
          const a = data as NewsArticle;
          const titleMap = a.title as Record<string, string>;
          const bodyMap = a.body as Record<string, string>;
          // Legacy rows may store Ukrainian text under the old "ua" key.
          const ukKey = lang === "ua" ? "uk" : lang;
          setArticle({
            id,
            title: titleMap[lang] || titleMap[ukKey] || titleMap.en || "",
            body: bodyMap[lang] || bodyMap[ukKey] || bodyMap.en || "",
            tag: a.tag ?? "News",
            gradient: a.cover_gradient ?? "linear-gradient(135deg,#0c4a6e,#155e75)",
            coverUrl: a.cover_url ?? null,
            date: a.published_at ?? a.created_at,
          });
        }
      } else {
        const found = NEWS.find((n) =>
          n.slug === id ||
          `static-${n.id}` === id ||
          n.id === parseInt(id)
        );
        if (found) {
          setArticle({
            id,
            title: found.title[lang] ?? found.title.en,
            body: found.body[lang] ?? found.body.en,
            tag: found.tag,
            gradient: found.gradient,
            coverUrl: found.coverUrl ?? null,
            date: found.date,
          });
          setOthers(
            NEWS.filter((n) => n.slug !== found.slug).slice(0, 2).map((n) => ({
              id: n.slug,
              title: n.title[lang] ?? n.title.en,
              body: "",
              tag: n.tag,
              gradient: n.gradient,
              coverUrl: n.coverUrl ?? null,
              date: n.date,
            }))
          );
        }
      }
      setLoading(false);
    }
    load();
  }, [id, lang, uuid]);

  // The URL handed to the share buttons has to carry the locale prefix. Without
  // it every share pointed at the English article, so a reader on /ru/news/...
  // posted a link that Facebook then scraped in English — the card, the title
  // and the generated cover image all came back in the wrong language, whatever
  // the reader had selected. English is the default locale and carries no
  // prefix, which is why the bug was invisible from an English page.
  const shareUrl = `https://seajobs.pro${lang === "en" ? "" : `/${lang}`}/news/${id}`;
  const shareTitle = article?.title ?? "SeaJobs.pro";

  if (loading) return (
    <div className="min-h-screen bg-navy">
      <Header />
      <div className="flex items-center justify-center py-32">
        <p className="text-mist text-sm">Loading…</p>
      </div>
    </div>
  );

  if (!article) return (
    <div className="min-h-screen bg-navy">
      <Header />
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="text-mist">Article not found.</p>
        <Link href="/news" className="mt-4 inline-flex items-center gap-1.5 text-sm text-brassInk hover:underline">
          <ChevronLeft size={14} /> Back to news
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-navy">
      <Header />
      <div className="mx-auto max-w-3xl px-5 py-10">

        {/* Breadcrumbs */}
        <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-mist" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brassInk">
            {({ en: "Home", ru: "Главная", ua: "Головна", pl: "Strona główna", ro: "Acasă" } as Record<string, string>)[lang] ?? "Home"}
          </Link>
          <ChevronRight size={12} />
          <Link href="/news" className="hover:text-brassInk">
            {({ en: "News", ru: "Новости", ua: "Новини", pl: "Aktualności", ro: "Știri" } as Record<string, string>)[lang] ?? "News"}
          </Link>
          <ChevronRight size={12} />
          <span className="truncate text-foam max-w-[60vw] sm:max-w-none">{article.title}</span>
        </nav>

        {/* Cover (large, no text overlay) */}
        <div className="mb-6 overflow-hidden rounded-2xl">
          <div className="relative h-72 sm:h-96" style={{ background: article.coverUrl ? undefined : article.gradient }}>
            {article.coverUrl && (
              <Image src={article.coverUrl} alt={article.title} fill sizes="(min-width: 768px) 768px, 100vw" priority className="object-cover" />
            )}
          </div>
        </div>

        {/* Title block — below the image */}
        <div className="mb-8">
          <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${TAG_COLORS[article.tag] ?? "bg-white/10 border-white/20 text-white"}`}>
            <Tag size={11} /> {article.tag}
          </span>
          <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">{article.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-mist">
            <Calendar size={12} /> {formatDate(article.date, lang)}
          </p>
        </div>

        {/* Body */}
        <div className="rounded-2xl border border-white/10 bg-card px-6 py-8 sm:px-8">
          {renderMarkdown(article.body)}
        </div>

        <ShareBar url={shareUrl} title={shareTitle} />

        <PopularJobLinks variant="section" />

        <ArticleComments commentKey={commentKey} />

        {/* More news */}
        {others.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-5 font-display text-lg font-semibold text-white">
              {lang === "ua" ? "Більше новин" : lang === "pl" ? "Więcej wiadomości" : lang === "ru" ? "Больше новостей" : "More news"}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {others.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}
                  className="group rounded-2xl border border-white/10 bg-card overflow-hidden transition hover:border-white/20">
                  <div className="relative h-24" style={{ background: item.coverUrl ? undefined : item.gradient }}>
                    {item.coverUrl && <Image src={item.coverUrl} alt={item.title} fill sizes="(min-width: 640px) 350px, 100vw" className="object-cover" />}
                  </div>
                  <div className="p-4">
                    <span className={`mb-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${TAG_COLORS[item.tag] ?? "bg-white/10 border-white/20 text-white"}`}>
                      <Tag size={10} /> {item.tag}
                    </span>
                    <p className="text-sm font-semibold text-white group-hover:text-brassInk transition leading-snug">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
