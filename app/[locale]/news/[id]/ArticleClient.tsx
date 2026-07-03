"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, Calendar, Tag, Share2, Copy, Check, MessageCircle, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownEditor from "@/components/MarkdownEditor";
import { NEWS } from "@/lib/data";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";
import { supabase } from "@/lib/supabase/client";
import type { NewsArticle } from "@/lib/supabase/types";
import { extractId } from "@/lib/slug";
import { renderMarkdown } from "@/lib/markdown";
import PopularJobLinks from "@/components/PopularJobLinks";

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

type NewsComment = {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
};

const SHARE_PLATFORMS = [
  {
    key: "x",
    label: "X",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    key: "telegram",
    label: "Telegram",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.47l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.946z" />
      </svg>
    ),
    href: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    href: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
    href: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
];

function formatDate(d: string, lang: string) {
  return new Date(d).toLocaleDateString(
    lang === "ua" ? "uk-UA" : lang === "pl" ? "pl-PL" : lang === "ru" ? "ru-RU" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

function formatCommentDate(d: string, lang: string) {
  return new Date(d).toLocaleDateString(
    lang === "ua" ? "uk-UA" : lang === "pl" ? "pl-PL" : lang === "ru" ? "ru-RU" : "en-GB",
    { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }
  );
}

export default function ArticleClient({ id, initialArticle }: { id: string; initialArticle?: Article | null }) {
  const { lang } = useLang();
  const t = T[lang];
  const [article, setArticle] = useState<Article | null>(initialArticle ?? null);
  const [others, setOthers] = useState<Article[]>([]);
  const [loading, setLoading] = useState(!initialArticle);
  const [comments, setComments] = useState<NewsComment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    supabase
      .from("news_comments")
      .select("id, author_name, content, created_at")
      .eq("article_id", commentKey)
      .order("created_at", { ascending: true })
      .then(({ data }) => { if (data) setComments(data as NewsComment[]); })
      .catch(() => {});
  }, [commentKey]);

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    setSubmitting(true);
    setSubmitError("");
    const { data, error } = await supabase
      .from("news_comments")
      .insert({ article_id: commentKey, author_name: commentName.trim(), content: commentText.trim() })
      .select("id, author_name, content, created_at")
      .single();
    if (error) {
      setSubmitError(t.news_comment_error);
    } else if (data) {
      setComments((prev) => [...prev, data as NewsComment]);
      setCommentText("");
    }
    setSubmitting(false);
  }

  async function copyLink() {
    const url = `https://seajobs.pro/news/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  const shareUrl = `https://seajobs.pro/news/${id}`;
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

        {/* Share */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mist/60 mr-1">
            <Share2 size={12} /> {t.news_share}
          </span>
          {SHARE_PLATFORMS.map((p) => (
            <a
              key={p.key}
              href={p.href(shareUrl, shareTitle)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-mist transition hover:border-white/25 hover:text-white"
            >
              {p.icon} {p.label}
            </a>
          ))}
          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-mist transition hover:border-brass/40 hover:text-brass2"
          >
            {copied ? <Check size={13} className="text-teal" /> : <Copy size={13} />}
            {copied ? t.news_copied : t.news_copy_link}
          </button>
        </div>

        <PopularJobLinks variant="section" />

        {/* Comments */}
        <div className="mt-10">
          <h2 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-white">
            <MessageCircle size={20} className="text-brass2" />
            {t.news_comments}
            {comments.length > 0 && (
              <span className="text-sm font-normal text-mist">({comments.length})</span>
            )}
          </h2>

          <form onSubmit={submitComment} className="mb-8 rounded-2xl border border-white/10 bg-card p-5">
            <div className="mb-3">
              <input
                type="text"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder={t.news_comment_name_ph}
                maxLength={100}
                required
                className="w-full rounded-xl border border-white/10 bg-navy px-4 py-2.5 text-sm text-white placeholder-mist/50 outline-none focus:border-brass/40 transition"
              />
            </div>
            <div className="mb-3">
              <MarkdownEditor
                value={commentText}
                onChange={setCommentText}
                placeholder={t.news_comment_text_ph}
                maxLength={2000}
                rows={3}
                textareaClassName="w-full resize-none rounded-b-xl border border-white/10 bg-navy px-4 py-2.5 text-sm text-white placeholder-mist/50 outline-none focus:border-brass/40 transition"
              />
            </div>
            {submitError && (
              <p className="mb-2 text-xs text-coral">{submitError}</p>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || !commentName.trim() || !commentText.trim()}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-navy to-navy2 border border-brass/30 px-5 py-2.5 text-sm font-semibold text-brass2 transition hover:border-brass/60 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                {submitting ? t.news_posting : t.news_post_comment}
              </button>
            </div>
          </form>

          {comments.length === 0 ? (
            <p className="py-8 text-center text-sm text-mist">{t.news_no_comments}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {comments.map((c) => (
                <div key={c.id} className="rounded-2xl border border-white/10 bg-card px-5 py-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brass/20 text-xs font-bold text-brass2 uppercase">
                      {c.author_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{c.author_name}</p>
                      <p className="text-xs text-mist">{formatCommentDate(c.created_at, lang)}</p>
                    </div>
                  </div>
                  <div className="leading-relaxed">{renderMarkdown(c.content)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

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
