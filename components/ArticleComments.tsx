"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import { useT } from "@/components/DictProvider";
import { useLang } from "@/components/LangProvider";
import MarkdownEditor from "@/components/MarkdownEditor";
import { supabase } from "@/lib/supabase/client";
import { renderMarkdown } from "@/lib/markdown";

// Comments under an article — news and guides share one table,
// `news_comments`, keyed by `commentKey` (`db-<uuid>` for a database row, the
// static slug for the few hardcoded news items). Anyone may post, so comments
// are rendered with `ugc`: links are nofollow and http(s) only, images are
// shown as links. An admin sees a delete button; the table's delete policy
// (`is_admin()`) is what actually decides.

type Comment = {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
};

function formatCommentDate(d: string, lang: string) {
  return new Date(d).toLocaleDateString(
    lang === "ua" ? "uk-UA" : lang === "pl" ? "pl-PL" : lang === "ru" ? "ru-RU" : lang === "ro" ? "ro-RO" : "en-GB",
    { timeZone: "UTC", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" },
  );
}

export default function ArticleComments({ commentKey }: { commentKey: string }) {
  const t = useT();
  const { lang } = useLang();
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase
      .from("news_comments")
      .select("id, author_name, content, created_at")
      .eq("article_id", commentKey)
      .order("created_at", { ascending: true })
      .then(({ data }) => { if (data) setComments(data as Comment[]); });
  }, [commentKey]);

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      const { data } = await supabase.from("profiles").select("is_admin").eq("id", session.user.id).single();
      if (alive && data?.is_admin) setIsAdmin(true);
    });
    return () => { alive = false; };
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    setError("");
    const { data, error: err } = await supabase
      .from("news_comments")
      .insert({ article_id: commentKey, author_name: name.trim(), content: text.trim() })
      .select("id, author_name, content, created_at")
      .single();
    if (err) {
      setError(t.news_comment_error);
    } else if (data) {
      setComments((prev) => [...prev, data as Comment]);
      setText("");
    }
    setSubmitting(false);
  }

  async function remove(id: string) {
    if (!window.confirm(t.news_comment_delete_confirm)) return;
    // RLS turns a refused delete into "0 rows", not an error — ask for the
    // deleted row back so the list only changes when the database did.
    const { data } = await supabase.from("news_comments").delete().eq("id", id).select("id");
    if (data && data.length) setComments((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="mt-10">
      <h2 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-white">
        <MessageCircle size={20} className="text-brassInk" />
        {t.news_comments}
        {comments.length > 0 && (
          <span className="text-sm font-normal text-mist">({comments.length})</span>
        )}
      </h2>

      <form onSubmit={submit} className="mb-8 rounded-2xl border border-white/10 bg-card p-5">
        <div className="mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.news_comment_name_ph}
            maxLength={100}
            required
            className="w-full rounded-xl border border-white/10 bg-navy px-4 py-2.5 text-sm text-white placeholder-mist/50 outline-none focus:border-brass/40 transition"
          />
        </div>
        <div className="mb-3">
          <MarkdownEditor
            value={text}
            onChange={setText}
            placeholder={t.news_comment_text_ph}
            maxLength={2000}
            rows={3}
            textareaClassName="w-full resize-none rounded-b-xl border border-white/10 bg-navy px-4 py-2.5 text-sm text-white placeholder-mist/50 outline-none focus:border-brass/40 transition"
          />
        </div>
        {error && <p className="mb-2 text-xs text-coral">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting || !name.trim() || !text.trim()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-[#0a1f33] to-[#0e2a45] border border-brass/30 px-5 py-2.5 text-sm font-semibold text-brassInk transition hover:border-brass/60 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div className="mb-2 flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brass/20 text-xs font-bold uppercase text-brassInk">
                  {c.author_name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{c.author_name}</p>
                  <p className="text-xs text-mist">{formatCommentDate(c.created_at, lang)}</p>
                </div>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => remove(c.id)}
                    title={t.news_comment_delete}
                    aria-label={t.news_comment_delete}
                    className="rounded-lg p-1.5 text-mist transition hover:bg-coral/10 hover:text-coral"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div className="leading-relaxed">{renderMarkdown(c.content, { ugc: true })}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
