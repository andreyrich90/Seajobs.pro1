"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Trash2, Pin, PinOff, MessageSquare, ChevronDown, ChevronRight, Plus, FolderPlus, Languages } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { ForumTopic, ForumPost, ForumCategory } from "@/lib/supabase/types";

function loc(field: unknown, lang = "ru"): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    const obj = field as Record<string, unknown>;
    return loc(obj[lang] ?? obj.en ?? obj.ru ?? Object.values(obj)[0], lang);
  }
  return "";
}

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function AdminForumPage() {
  const [topics, setTopics]   = useState<ForumTopic[]>([]);
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [newCat, setNewCat] = useState("");
  const [savingCat, setSavingCat] = useState(false);
  const [catError, setCatError] = useState<string | null>(null);
  const [countMap, setCountMap] = useState<Record<string, number>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [topicPosts, setTopicPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [translateMsg, setTranslateMsg] = useState<string | null>(null);

  async function translateExisting() {
    setTranslating(true);
    setTranslateMsg("Starting…");
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) { setTranslateMsg("Not signed in."); setTranslating(false); return; }
    try {
      for (let guard = 0; guard < 500; guard++) {
        const res = await fetch("/api/admin/translate-forum", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!data.ok) { setTranslateMsg("Error: " + (data.error ?? "failed")); break; }
        if (data.remaining === 0) { setTranslateMsg("All topics translated ✓"); break; }
        setTranslateMsg(`Translating… ${data.remaining} left`);
      }
    } catch (e) {
      setTranslateMsg("Error: " + (e instanceof Error ? e.message : "failed"));
    }
    setTranslating(false);
  }

  useEffect(() => {
    async function load() {
      const [{ data: t }, { data: p }, { data: c }] = await Promise.all([
        supabase.from("forum_topics").select("*").order("created_at", { ascending: false }),
        supabase.from("forum_posts").select("topic_id"),
        supabase.from("forum_categories").select("*").order("sort_order").order("name"),
      ]);
      setTopics(t ?? []);
      setCategories(c ?? []);
      const map: Record<string, number> = {};
      for (const x of p ?? []) map[x.topic_id] = (map[x.topic_id] ?? 0) + 1;
      setCountMap(map);
      setLoading(false);
    }
    load();
  }, []);

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    const name = newCat.trim();
    if (!name) return;
    setSavingCat(true);
    setCatError(null);
    const { data, error } = await supabase
      .from("forum_categories")
      .insert({ name, sort_order: categories.length })
      .select()
      .single();
    if (error) setCatError(error.message);
    else if (data) { setCategories((prev) => [...prev, data]); setNewCat(""); }
    setSavingCat(false);
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete this section? Topics in it will become uncategorised.")) return;
    const { error } = await supabase.from("forum_categories").delete().eq("id", id);
    if (!error) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setTopics((prev) => prev.map((t) => (t.category_id === id ? { ...t, category_id: null } : t)));
    }
  }

  async function assignCategory(topic: ForumTopic, categoryId: string) {
    const value = categoryId || null;
    const { data } = await supabase
      .from("forum_topics").update({ category_id: value }).eq("id", topic.id).select().single();
    if (data) setTopics((prev) => prev.map((t) => (t.id === topic.id ? data : t)));
  }

  async function togglePin(topic: ForumTopic) {
    const { data } = await supabase
      .from("forum_topics").update({ is_pinned: !topic.is_pinned }).eq("id", topic.id).select().single();
    if (data) setTopics((prev) => prev.map((t) => t.id === topic.id ? data : t));
  }

  async function deleteTopic(id: string) {
    if (!confirm("Delete topic and all its replies?")) return;
    const { error } = await supabase.from("forum_topics").delete().eq("id", id);
    if (!error) { setTopics((prev) => prev.filter((t) => t.id !== id)); if (expanded === id) setExpanded(null); }
  }

  async function expandTopic(id: string) {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    const { data } = await supabase.from("forum_posts").select("*").eq("topic_id", id).order("created_at");
    setTopicPosts(data ?? []);
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this reply?")) return;
    const { error } = await supabase.from("forum_posts").delete().eq("id", id);
    if (!error) {
      setTopicPosts((prev) => prev.filter((p) => p.id !== id));
      if (expanded) setCountMap((m) => ({ ...m, [expanded]: (m[expanded] ?? 1) - 1 }));
    }
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Forum</h1>
          <p className="mt-1 text-sm text-mist">{topics.length} topics · click a row to see replies</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button
            onClick={translateExisting}
            disabled={translating}
            title="Translate every topic into all 4 languages (one-time)"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
          >
            <Languages size={16} /> {translating ? "Translating…" : "Translate existing topics"}
          </button>
          {translateMsg && <span className="text-xs text-mist">{translateMsg}</span>}
        </div>
      </div>

      {/* Sections / categories */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <FolderPlus size={16} className="text-brass2" />
          <h2 className="text-sm font-semibold text-mist uppercase tracking-wider">Sections</h2>
        </div>
        <form onSubmit={addCategory} className="flex flex-wrap gap-2">
          <input
            type="text" value={newCat}
            onChange={(e) => { setNewCat(e.target.value); setCatError(null); }}
            placeholder="New section name (e.g. Documents & Visas)"
            className="min-w-[220px] flex-1 rounded-xl border border-white/10 bg-navy2 px-4 py-2.5 text-sm text-white outline-none focus:border-brass"
          />
          <button type="submit" disabled={savingCat || !newCat.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50">
            <Plus size={15} /> {savingCat ? "Adding…" : "Add section"}
          </button>
        </form>
        {catError && <p className="mt-2 text-xs text-coral">{catError}</p>}
        {categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span key={c.id} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-foam">
                {c.name}
                <button onClick={() => deleteCategory(c.id)} title="Delete section" className="text-coral hover:text-coral/80">
                  <Trash2 size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><p className="text-mist text-sm">Loading...</p></div>
      ) : topics.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center text-mist text-sm">No topics yet.</div>
      ) : (
        <div className="flex flex-col gap-2">
          {topics.map((topic) => (
            <div key={topic.id} className="rounded-2xl border border-white/10 bg-card overflow-hidden">
              {/* Topic row */}
              <div className="flex items-center gap-3 px-4 py-3">
                <button onClick={() => expandTopic(topic.id)} className="text-mist hover:text-white transition">
                  {expanded === topic.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{loc(topic.title)}</p>
                  <p className="text-xs text-mist">
                    by <span className="text-foam">{topic.author_name ?? "anon"}</span>
                    {" · "}{timeAgo(topic.created_at)}
                  </p>
                </div>
                {categories.length > 0 && (
                  <select
                    value={topic.category_id ?? ""}
                    onChange={(e) => assignCategory(topic, e.target.value)}
                    className="hidden shrink-0 rounded-lg border border-white/10 bg-navy2 px-2 py-1 text-xs text-white outline-none focus:border-brass sm:block"
                  >
                    <option value="">— No section —</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                )}
                <div className="flex shrink-0 items-center gap-1.5 text-mist text-xs mr-2">
                  <MessageSquare size={13} /> {countMap[topic.id] ?? 0}
                </div>
                {topic.is_pinned && (
                  <span className="hidden sm:inline-flex rounded-full border border-brass/20 bg-brass/10 px-2 py-0.5 text-xs font-semibold text-brass2">Pinned</span>
                )}
                <button onClick={() => togglePin(topic)} title={topic.is_pinned ? "Unpin" : "Pin"}
                  className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-mist hover:text-white transition">
                  {topic.is_pinned ? <PinOff size={14} /> : <Pin size={14} />}
                </button>
                <button onClick={() => deleteTopic(topic.id)}
                  className="rounded-lg border border-coral/20 bg-coral/10 p-1.5 text-coral hover:bg-coral/20 transition">
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Expanded replies */}
              {expanded === topic.id && (
                <div className="border-t border-white/10 bg-navy/50 divide-y divide-white/5">
                  {topicPosts.length === 0 ? (
                    <p className="px-6 py-4 text-sm text-mist">No replies.</p>
                  ) : topicPosts.map((post) => (
                    <div key={post.id} className="flex items-start gap-3 px-6 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-mist mb-1">
                          <span className="text-foam font-semibold">{post.author_name ?? "anon"}</span>
                          {" · "}{timeAgo(post.created_at)}
                        </p>
                        <p className="text-sm text-foam line-clamp-2">{post.content}</p>
                      </div>
                      <button onClick={() => deletePost(post.id)}
                        className="shrink-0 rounded-lg border border-coral/20 bg-coral/10 p-1.5 text-coral hover:bg-coral/20 transition">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
