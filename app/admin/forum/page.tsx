"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Trash2, Pin, PinOff, MessageSquare, ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { ForumTopic, ForumPost } from "@/lib/supabase/types";

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function AdminForumPage() {
  const [topics, setTopics]   = useState<ForumTopic[]>([]);
  const [posts, setPosts]     = useState<ForumPost[]>([]);
  const [countMap, setCountMap] = useState<Record<string, number>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [topicPosts, setTopicPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: t }, { data: p }] = await Promise.all([
        supabase.from("forum_topics").select("*").order("created_at", { ascending: false }),
        supabase.from("forum_posts").select("topic_id"),
      ]);
      setTopics(t ?? []);
      const map: Record<string, number> = {};
      for (const x of p ?? []) map[x.topic_id] = (map[x.topic_id] ?? 0) + 1;
      setCountMap(map);
      setLoading(false);
    }
    load();
  }, []);

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
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-white">Forum</h1>
        <p className="mt-1 text-sm text-mist">{topics.length} topics · click a row to see replies</p>
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
                  <p className="font-semibold text-white truncate">{topic.title}</p>
                  <p className="text-xs text-mist">
                    by <span className="text-foam">{topic.author_name ?? "anon"}</span>
                    {" · "}{timeAgo(topic.created_at)}
                  </p>
                </div>
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
