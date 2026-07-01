"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import { MessageSquare, Pin, Plus, X, AlertCircle, LogIn } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownEditor from "@/components/MarkdownEditor";
import { supabase } from "@/lib/supabase/client";
import type { ForumTopic, ForumCategory } from "@/lib/supabase/types";
import type { Session } from "@supabase/supabase-js";
import { useLang } from "@/components/LangProvider";
import { slugId } from "@/lib/slug";

function loc(field: unknown, lang: string): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    const obj = field as Record<string, unknown>;
    const ukFallback = lang === "ua" ? obj.uk : undefined;
    return loc(obj[lang] ?? ukFallback ?? obj.en ?? obj.ru ?? Object.values(obj)[0], lang);
  }
  return "";
}

// Sections whose name matches this are treated as "Questions & Reviews":
// the title is optional there and auto-derived from the question text.
const QNA_RE = /question|review|вопрос|отзыв|питанн|відгук|pytani|opini/i;

function deriveTitle(text: string): string {
  const firstLine = text.trim().split("\n")[0].trim();
  return firstLine.length > 70 ? `${firstLine.slice(0, 70).trimEnd()}…` : firstLine;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

async function resolveAuthorName(userId: string): Promise<string> {
  const { data: seafarer } = await supabase
    .from("seafarers").select("first_name, last_name").eq("id", userId).single();
  if (seafarer?.first_name || seafarer?.last_name) {
    return [seafarer.first_name, seafarer.last_name].filter(Boolean).join(" ");
  }
  const { data: company } = await supabase.from("companies").select("name").eq("id", userId).single();
  if (company?.name) return company.name;
  const { data: { user } } = await supabase.auth.getUser();
  const meta = user?.user_metadata;
  const googleName = meta?.full_name || meta?.name;
  if (googleName) return googleName;
  return user?.email?.split("@")[0] ?? "User";
}

export default function ForumClient({
  initialTopics,
  initialCategories,
  initialCounts,
}: {
  initialTopics: ForumTopic[];
  initialCategories: ForumCategory[];
  initialCounts: Record<string, number>;
}) {
  const { lang } = useLang();
  const [topics, setTopics] = useState<ForumTopic[]>(initialTopics);
  const categories = initialCategories;
  const countMap = initialCounts;
  const [activeCat, setActiveCat] = useState<string | "all">("all");
  const [session, setSession] = useState<Session | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const catName = (id: string | null) => categories.find((c) => c.id === id)?.name ?? null;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session) return;
    const qna = QNA_RE.test(categories.find((c) => c.id === categoryId)?.name ?? "");
    if (!content.trim()) {
      setError("Please write your message.");
      return;
    }
    if (!qna && !title.trim()) {
      setError("Title and content are required.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const authorName = isAnonymous ? null : await resolveAuthorName(session.user.id);
    const finalTitle = title.trim() || deriveTitle(content);

    const { data, error: insertError } = await supabase
      .from("forum_topics")
      .insert({
        user_id: session.user.id,
        author_name: authorName,
        is_anonymous: isAnonymous,
        title: { [lang]: finalTitle },
        content: { [lang]: content.trim() },
        category_id: categoryId || null,
      })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
    } else if (data) {
      setTopics((prev) => [data, ...prev]);
      setTitle("");
      setContent("");
      setCategoryId("");
      setIsAnonymous(false);
      setShowForm(false);
      fetch("/api/forum/translate-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ topicId: data.id }),
      }).catch(() => {});
    }
    setSubmitting(false);
  }

  const isQnA = QNA_RE.test(categories.find((c) => c.id === categoryId)?.name ?? "");
  const visibleTopics = activeCat === "all" ? topics : topics.filter((t) => t.category_id === activeCat);

  return (
    <div className="min-h-screen bg-navy">
      <Header />

      <div className="mx-auto max-w-4xl px-5 py-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold text-white">Community Forum</h1>
            <p className="mt-1.5 text-sm text-mist">
              Discuss maritime topics, share experience, ask questions.
            </p>
          </div>
          {session ? (
            <button
              onClick={() => { setShowForm((v) => !v); setError(null); }}
              className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
            >
              {showForm ? <X size={16} /> : <Plus size={16} />}
              {showForm ? "Cancel" : "New Topic"}
            </button>
          ) : (
            <NextLink
              href="/auth/login"
              className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <LogIn size={16} /> Login to post
            </NextLink>
          )}
        </div>

        {showForm && (
          <div className="mb-8 rounded-2xl border border-brass/20 bg-card p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-white">{isQnA ? "Ask a Question / Leave a Review" : "Create New Topic"}</h2>
            {error && (
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-coral" />
                <p className="text-sm text-coral">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {categories.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foam">Section</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    disabled={submitting}
                    className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                  >
                    <option value="">— No section —</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              )}
              {!isQnA && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foam">Title</label>
                  <input
                    type="text" value={title}
                    onChange={(e) => { setTitle(e.target.value); setError(null); }}
                    placeholder="What would you like to discuss?"
                    disabled={submitting}
                    className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                  />
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foam">{isQnA ? "Your question or review" : "Content"}</label>
                <MarkdownEditor
                  value={content}
                  onChange={(v) => { setContent(v); setError(null); }}
                  placeholder={isQnA ? "Ask your question or leave a review…" : "Write your post..."}
                  rows={5}
                  disabled={submitting}
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-mist">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  disabled={submitting}
                  className="h-4 w-4 rounded border-white/10 bg-navy2 accent-brass"
                />
                Post anonymously
              </label>
              <div className="flex gap-3">
                <button
                  type="submit" disabled={submitting}
                  className="rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {submitting ? "Posting..." : "Post Topic"}
                </button>
                <button
                  type="button" onClick={() => { setShowForm(false); setError(null); setIsAnonymous(false); }}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-mist transition hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {categories.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCat("all")}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                activeCat === "all" ? "border-brass/40 bg-brass/15 text-brass2" : "border-white/10 bg-white/5 text-mist hover:text-white"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  activeCat === c.id ? "border-brass/40 bg-brass/15 text-brass2" : "border-white/10 bg-white/5 text-mist hover:text-white"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {visibleTopics.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-card p-16 text-center">
            <MessageSquare size={32} className="mx-auto mb-3 text-mist" />
            <p className="text-mist">No topics yet. Be the first to start a discussion!</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-white/5 rounded-2xl border border-white/10 bg-card overflow-hidden">
            {visibleTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/forum/${slugId(loc(topic.title, lang), topic.id)}`}
                className="flex items-start gap-4 px-5 py-4 transition hover:bg-white/5"
              >
                <div className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${topic.is_pinned ? "bg-brass/15" : "bg-teal/10"}`}>
                  {topic.is_pinned
                    ? <Pin size={16} className="text-brass2" />
                    : <MessageSquare size={16} className="text-teal" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {topic.is_pinned && (
                      <span className="rounded-full bg-brass/15 border border-brass/20 px-2 py-0.5 text-xs font-semibold text-brass2">
                        Pinned
                      </span>
                    )}
                    <h3 className="font-semibold text-white text-sm sm:text-base break-words">{loc(topic.title, lang)}</h3>
                    {catName(topic.category_id) && (
                      <span className="rounded-full bg-teal/10 border border-teal/20 px-2 py-0.5 text-xs font-semibold text-teal">
                        {catName(topic.category_id)}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-mist">
                    by <span className="text-foam">{topic.is_anonymous ? "Anonymous" : topic.author_name ?? "Anonymous"}</span>
                    {" · "}{timeAgo(topic.created_at)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 text-mist">
                  <MessageSquare size={14} />
                  <span className="text-sm font-semibold">{countMap[topic.id] ?? 0}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
