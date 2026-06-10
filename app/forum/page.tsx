"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, Pin, Plus, X, AlertCircle, LogIn } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase/client";
import type { ForumTopic } from "@/lib/supabase/types";
import type { Session } from "@supabase/supabase-js";
import { useLang } from "@/components/LangProvider";

function loc(field: unknown, lang: string): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    const obj = field as Record<string, unknown>;
    return loc(obj[lang] ?? obj.en ?? obj.ru ?? Object.values(obj)[0], lang);
  }
  return "";
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
    .from("seafarers")
    .select("first_name, last_name")
    .eq("id", userId)
    .single();
  if (seafarer?.first_name || seafarer?.last_name) {
    return [seafarer.first_name, seafarer.last_name].filter(Boolean).join(" ");
  }
  const { data: company } = await supabase
    .from("companies")
    .select("name")
    .eq("id", userId)
    .single();
  if (company?.name) return company.name;
  const { data: { user } } = await supabase.auth.getUser();
  const meta = user?.user_metadata;
  const googleName = meta?.full_name || meta?.name;
  if (googleName) return googleName;
  return user?.email?.split("@")[0] ?? "User";
}

export default function ForumPage() {
  const { lang } = useLang();
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [countMap, setCountMap] = useState<Record<string, number>>({});
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Safety timeout: stop spinner after 8s even if DB is unreachable
    const fallback = setTimeout(() => setLoading(false), 8000);

    async function load() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);

        const [{ data: topicsData }, { data: postsData }] = await Promise.all([
          supabase
            .from("forum_topics")
            .select("*")
            .order("is_pinned", { ascending: false })
            .order("created_at", { ascending: false }),
          supabase.from("forum_posts").select("topic_id"),
        ]);

        setTopics(topicsData ?? []);

        const map: Record<string, number> = {};
        for (const p of postsData ?? []) {
          map[p.topic_id] = (map[p.topic_id] ?? 0) + 1;
        }
        setCountMap(map);
      } finally {
        clearTimeout(fallback);
        setLoading(false);
      }
    }
    load();
    return () => clearTimeout(fallback);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session) return;
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const authorName = await resolveAuthorName(session.user.id);

    const { data, error: insertError } = await supabase
      .from("forum_topics")
      .insert({ user_id: session.user.id, author_name: authorName, title: title.trim(), content: content.trim() })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
    } else if (data) {
      setTopics((prev) => [data, ...prev]);
      setTitle("");
      setContent("");
      setShowForm(false);
    }
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-navy">
      <Header />

      <div className="mx-auto max-w-4xl px-5 py-10">

        {/* Page header */}
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
            <Link
              href="/auth/login"
              className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <LogIn size={16} /> Login to post
            </Link>
          )}
        </div>

        {/* New topic form */}
        {showForm && (
          <div className="mb-8 rounded-2xl border border-brass/20 bg-card p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-white">Create New Topic</h2>
            {error && (
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-coral" />
                <p className="text-sm text-coral">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foam">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => { setContent(e.target.value); setError(null); }}
                  placeholder="Write your post..."
                  rows={5} disabled={submitting}
                  className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50 resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit" disabled={submitting}
                  className="rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {submitting ? "Posting..." : "Post Topic"}
                </button>
                <button
                  type="button" onClick={() => { setShowForm(false); setError(null); }}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-mist transition hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Topics list */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-mist text-sm">Loading...</p>
          </div>
        ) : topics.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-card p-16 text-center">
            <MessageSquare size={32} className="mx-auto mb-3 text-mist" />
            <p className="text-mist">No topics yet. Be the first to start a discussion!</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-white/5 rounded-2xl border border-white/10 bg-card overflow-hidden">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/forum/${topic.id}`}
                className="flex items-start gap-4 px-5 py-4 transition hover:bg-white/5"
              >
                {/* Icon */}
                <div className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${topic.is_pinned ? "bg-brass/15" : "bg-teal/10"}`}>
                  {topic.is_pinned
                    ? <Pin size={16} className="text-brass2" />
                    : <MessageSquare size={16} className="text-teal" />
                  }
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {topic.is_pinned && (
                      <span className="rounded-full bg-brass/15 border border-brass/20 px-2 py-0.5 text-xs font-semibold text-brass2">
                        Pinned
                      </span>
                    )}
                    <h3 className="font-semibold text-white truncate">{loc(topic.title, lang)}</h3>
                  </div>
                  <p className="mt-0.5 text-xs text-mist">
                    by <span className="text-foam">{topic.author_name ?? "Anonymous"}</span>
                    {" · "}{timeAgo(topic.created_at)}
                  </p>
                </div>

                {/* Reply count */}
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
