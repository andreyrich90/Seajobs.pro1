"use client";

import { useEffect, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import NextLink from "next/link";
import { ChevronLeft, MessageSquare, LogIn, AlertCircle, Trash2, Pin, Pencil, Check, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownEditor from "@/components/MarkdownEditor";
import { supabase } from "@/lib/supabase/client";
import type { ForumTopic, ForumPost } from "@/lib/supabase/types";
import type { Session } from "@supabase/supabase-js";
import { useLang } from "@/components/LangProvider";
import { renderMarkdown } from "@/lib/markdown";

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

function PostCard({
  authorName, date, content, isOwn, onDelete, onSaveEdit, highlight,
}: {
  authorName: string | null;
  date: string;
  content: string;
  isOwn: boolean;
  onDelete?: () => void;
  onSaveEdit?: (newContent: string) => Promise<void>;
  highlight?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(content);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!draft.trim() || !onSaveEdit) return;
    setSaving(true);
    await onSaveEdit(draft.trim());
    setSaving(false);
    setEditing(false);
  }

  function cancel() {
    setDraft(content);
    setEditing(false);
  }

  return (
    <div className={`rounded-2xl border p-5 ${highlight ? "border-brass/20 bg-brass/5" : "border-white/10 bg-card"}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-sm font-bold text-white">
            {(authorName ?? "?")[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{authorName ?? "Anonymous"}</p>
            <p className="text-xs text-mist">{timeAgo(date)}</p>
          </div>
        </div>
        {isOwn && (
          <div className="flex items-center gap-1.5">
            {onSaveEdit && !editing && (
              <button
                onClick={() => { setDraft(content); setEditing(true); }}
                className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-mist hover:text-white transition"
                title="Edit"
              >
                <Pencil size={13} />
              </button>
            )}
            {onDelete && !editing && (
              <button
                onClick={onDelete}
                className="rounded-lg bg-coral/10 border border-coral/20 p-1.5 text-coral hover:bg-coral/20 transition"
                title="Delete"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        )}
      </div>

      {editing ? (
        <div className="flex flex-col gap-2">
          <MarkdownEditor
            value={draft}
            onChange={setDraft}
            rows={5}
            disabled={saving}
            textareaClassName="w-full resize-none rounded-b-xl border border-brass/30 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
          />
          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={saving || !draft.trim()}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 py-2 text-xs font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50"
            >
              <Check size={13} /> {saving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={cancel}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-mist transition hover:bg-white/5"
            >
              <X size={13} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="leading-relaxed">{renderMarkdown(content)}</div>
      )}
    </div>
  );
}

export default function TopicClient({
  initialTopic,
  initialPosts,
}: {
  initialTopic: ForumTopic;
  initialPosts: ForumPost[];
}) {
  const router = useRouter();
  const { lang } = useLang();
  const [topic, setTopic] = useState<ForumTopic>(initialTopic);
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [session, setSession] = useState<Session | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyAnonymous, setReplyAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingTopic, setEditingTopic] = useState(false);
  const [topicTitleDraft, setTopicTitleDraft] = useState("");
  const [topicContentDraft, setTopicContentDraft] = useState("");
  const [savingTopic, setSavingTopic] = useState(false);

  const id = topic.id;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!session || !replyText.trim()) return;
    setSubmitting(true);
    setError(null);

    const authorName = replyAnonymous ? null : await resolveAuthorName(session.user.id);

    const { data, error: insertError } = await supabase
      .from("forum_posts")
      .insert({ topic_id: id, user_id: session.user.id, author_name: authorName, is_anonymous: replyAnonymous, content: replyText.trim() })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
    } else if (data) {
      setPosts((prev) => [...prev, data]);
      setReplyText("");
      setReplyAnonymous(false);
    }
    setSubmitting(false);
  }

  async function handleDeletePost(postId: string) {
    if (!confirm("Delete this reply?")) return;
    const { error } = await supabase.from("forum_posts").delete().eq("id", postId);
    if (!error) setPosts((prev) => prev.filter((p) => p.id !== postId));
  }

  async function handleEditPost(postId: string, newContent: string) {
    const { error } = await supabase
      .from("forum_posts")
      .update({ content: newContent, updated_at: new Date().toISOString() })
      .eq("id", postId);
    if (!error) setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, content: newContent } : p));
  }

  async function handleDeleteTopic() {
    if (!confirm("Delete this topic and all its replies?")) return;
    const { error } = await supabase.from("forum_topics").delete().eq("id", id);
    if (!error) router.push("/forum");
  }

  function startEditTopic() {
    setTopicTitleDraft(loc(topic.title, lang));
    setTopicContentDraft(loc(topic.content, lang));
    setEditingTopic(true);
  }

  async function saveTopicEdit() {
    if (!topicTitleDraft.trim() || !topicContentDraft.trim()) return;
    setSavingTopic(true);
    const newTitle = { ...(typeof topic.title === "object" ? topic.title : { ru: topic.title }), [lang]: topicTitleDraft.trim() };
    const newContent = { ...(typeof topic.content === "object" ? topic.content : { ru: topic.content }), [lang]: topicContentDraft.trim() };
    const { data, error } = await supabase
      .from("forum_topics")
      .update({ title: newTitle, content: newContent, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (!error && data) setTopic(data);
    setSavingTopic(false);
    setEditingTopic(false);
  }

  const isTopicOwn = session?.user.id === topic.user_id;

  return (
    <div className="min-h-screen bg-navy">
      <Header />

      <div className="mx-auto max-w-4xl px-5 py-10">
        <Link href="/forum" className="mb-6 inline-flex items-center gap-1.5 text-sm text-mist hover:text-white transition">
          <ChevronLeft size={16} /> Back to Forum
        </Link>

        {editingTopic ? (
          <div className="mb-6 rounded-2xl border border-brass/20 bg-card p-6">
            <div className="flex flex-col gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">Title</label>
                <input
                  type="text"
                  value={topicTitleDraft}
                  onChange={(e) => setTopicTitleDraft(e.target.value)}
                  disabled={savingTopic}
                  className="w-full rounded-xl border border-brass/30 bg-navy2 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-brass disabled:opacity-50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">Content</label>
                <MarkdownEditor
                  value={topicContentDraft}
                  onChange={setTopicContentDraft}
                  rows={8}
                  disabled={savingTopic}
                  textareaClassName="w-full resize-none rounded-b-xl border border-brass/30 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={saveTopicEdit}
                  disabled={savingTopic || !topicTitleDraft.trim() || !topicContentDraft.trim()}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50"
                >
                  <Check size={14} /> {savingTopic ? "Saving…" : "Save changes"}
                </button>
                <button
                  onClick={() => setEditingTopic(false)}
                  disabled={savingTopic}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-mist transition hover:bg-white/5"
                >
                  <X size={14} /> Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              {topic.is_pinned && (
                <span className="flex items-center gap-1.5 rounded-full bg-brass/15 border border-brass/20 px-3 py-1 text-xs font-semibold text-brass2">
                  <Pin size={12} /> Pinned
                </span>
              )}
              <h1 className="font-display text-2xl font-semibold text-white">{loc(topic.title, lang)}</h1>
            </div>
            {isTopicOwn && (
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={startEditTopic}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-mist hover:text-white transition"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={handleDeleteTopic}
                  className="flex items-center gap-1.5 rounded-xl border border-coral/30 bg-coral/10 px-3 py-2 text-sm font-semibold text-coral hover:bg-coral/20 transition"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        )}

        {!editingTopic && (
          <PostCard
            authorName={topic.is_anonymous ? "Anonymous" : topic.author_name}
            date={topic.created_at}
            content={loc(topic.content, lang)}
            isOwn={false}
            highlight
          />
        )}

        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-mist">
            <MessageSquare size={16} />
            {posts.length} {posts.length === 1 ? "reply" : "replies"}
          </div>

          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                authorName={post.is_anonymous ? "Anonymous" : post.author_name}
                date={post.created_at}
                content={post.content}
                isOwn={session?.user.id === post.user_id}
                onDelete={() => handleDeletePost(post.id)}
                onSaveEdit={(newContent) => handleEditPost(post.id, newContent)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          {session ? (
            <div className="rounded-2xl border border-white/10 bg-card p-5">
              <h3 className="mb-4 font-semibold text-white">Write a reply</h3>
              {error && (
                <div className="mb-4 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-coral" />
                  <p className="text-sm text-coral">{error}</p>
                </div>
              )}
              <form onSubmit={handleReply} className="flex flex-col gap-3">
                <MarkdownEditor
                  value={replyText}
                  onChange={(v) => { setReplyText(v); setError(null); }}
                  placeholder="Write your reply..."
                  rows={4}
                  disabled={submitting}
                />
                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm text-mist">
                    <input
                      type="checkbox"
                      checked={replyAnonymous}
                      onChange={(e) => setReplyAnonymous(e.target.checked)}
                      disabled={submitting}
                      className="h-4 w-4 rounded border-white/10 bg-navy2 accent-brass"
                    />
                    Post anonymously
                  </label>
                  <button
                    type="submit"
                    disabled={submitting || !replyText.trim()}
                    className="rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
                  >
                    {submitting ? "Posting..." : "Post Reply"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-card p-6 flex items-center justify-between gap-4">
              <p className="text-sm text-mist">Log in to join the conversation.</p>
              <NextLink
                href="/auth/login"
                className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
              >
                <LogIn size={15} /> Login
              </NextLink>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
