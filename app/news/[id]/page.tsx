"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NEWS } from "@/lib/data";
import { useLang } from "@/components/LangProvider";
import { supabase } from "@/lib/supabase/client";
import type { NewsArticle } from "@/lib/supabase/types";

const TAG_COLORS: Record<string, string> = {
  Regulation: "bg-teal/10 border-teal/20 text-teal",
  Market:     "bg-coral/10 border-coral/20 text-coral",
  Industry:   "bg-brass/10 border-brass/20 text-brass2",
  Safety:     "bg-teal/10 border-teal/20 text-teal",
  Technology: "bg-brass/10 border-brass/20 text-brass2",
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
    { day: "numeric", month: "long", year: "numeric" }
  );
}

export default function NewsArticlePage() {
  const { id }   = useParams<{ id: string }>();
  const { lang } = useLang();
  const [article, setArticle] = useState<Article | null>(null);
  const [others,  setOthers]  = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // DB article (id prefixed with "db-")
      if (id.startsWith("db-")) {
        const uuid = id.slice(3);
        const { data } = await supabase
          .from("news_articles").select("*").eq("id", uuid).single();
        if (data) {
          const a = data as NewsArticle;
          const titleMap = a.title as Record<string, string>;
          const bodyMap  = a.body  as Record<string, string>;
          setArticle({
            id,
            title:    titleMap[lang] || titleMap.en || "",
            body:     bodyMap[lang]  || bodyMap.en  || "",
            tag:      a.tag ?? "News",
            gradient: a.cover_gradient ?? "linear-gradient(135deg,#0c4a6e,#155e75)",
            coverUrl: a.cover_url ?? null,
            date:     a.published_at ?? a.created_at,
          });
        }
      } else {
        // Static article (id prefixed with "static-" or plain number)
        const numId = id.startsWith("static-") ? parseInt(id.slice(7)) : parseInt(id);
        const found = NEWS.find((n) => n.id === numId);
        if (found) {
          setArticle({
            id,
            title:    found.title[lang] ?? found.title.en,
            body:     found.body[lang]  ?? found.body.en,
            tag:      found.tag,
            gradient: found.gradient,
            coverUrl: null,
            date:     found.date,
          });
          setOthers(
            NEWS.filter((n) => n.id !== numId).slice(0, 2).map((n) => ({
              id: `static-${n.id}`,
              title: n.title[lang] ?? n.title.en,
              body: "",
              tag: n.tag,
              gradient: n.gradient,
              date: n.date,
            }))
          );
        }
      }
      setLoading(false);
    }
    load();
  }, [id, lang]);

  if (loading) return (
    <div className="min-h-screen bg-navy"><Header />
      <div className="flex items-center justify-center py-32"><p className="text-mist text-sm">Loading...</p></div>
    </div>
  );

  if (!article) return (
    <div className="min-h-screen bg-navy"><Header />
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="text-mist">Article not found.</p>
        <Link href="/news" className="mt-4 inline-flex items-center gap-1.5 text-sm text-brass2 hover:underline">
          <ChevronLeft size={14} /> Back to news
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-navy">
      <Header />
      <div className="mx-auto max-w-3xl px-5 py-10">
        <Link href="/news" className="mb-8 inline-flex items-center gap-1.5 text-sm text-mist hover:text-white transition">
          <ChevronLeft size={16} /> Back to News
        </Link>

        <div className="mb-8 overflow-hidden rounded-2xl relative" style={{ background: article.coverUrl ? undefined : article.gradient }}>
          {article.coverUrl && (
            <img src={article.coverUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="relative min-h-[180px] flex items-end p-6">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="relative">
              <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${TAG_COLORS[article.tag] ?? "bg-white/10 border-white/20 text-white"}`}>
                <Tag size={11} /> {article.tag}
              </span>
              <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">{article.title}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
                <Calendar size={12} /> {formatDate(article.date, lang)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card px-6 py-8 sm:px-8">
          {article.body.split("\n\n").map((para, i) => (
            <p key={i} className="mb-5 text-sm leading-7 text-foam last:mb-0">{para}</p>
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-5 font-display text-lg font-semibold text-white">
              {lang === "ua" ? "Більше новин" : lang === "pl" ? "Więcej wiadomości" : lang === "ru" ? "Больше новостей" : "More news"}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {others.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}
                  className="group rounded-2xl border border-white/10 bg-card overflow-hidden transition hover:border-white/20">
                  <div className="h-24" style={{ background: item.gradient }} />
                  <div className="p-4">
                    <span className={`mb-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${TAG_COLORS[item.tag] ?? "bg-white/10 border-white/20 text-white"}`}>
                      <Tag size={10} /> {item.tag}
                    </span>
                    <p className="text-sm font-semibold text-white group-hover:text-brass2 transition leading-snug">{item.title}</p>
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
