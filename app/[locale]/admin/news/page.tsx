"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { NewsArticle } from "@/lib/supabase/types";

const TAGS = ["Regulation", "Market", "Industry", "Safety", "Technology", "Other"];

const GRADIENTS = [
  { label: "Ocean",   value: "linear-gradient(135deg,#0c4a6e,#155e75)" },
  { label: "Ember",   value: "linear-gradient(135deg,#7c2d12,#9a3412)" },
  { label: "Forest",  value: "linear-gradient(135deg,#14532d,#166534)" },
  { label: "Violet",  value: "linear-gradient(135deg,#3b0764,#4c1d95)" },
  { label: "Slate",   value: "linear-gradient(135deg,#1e293b,#334155)" },
  { label: "Gold",    value: "linear-gradient(135deg,#713f12,#92400e)" },
];

const LANGS = [
  { code: "en", label: "EN" },
  { code: "ua", label: "UA" },
  { code: "pl", label: "PL" },
  { code: "ru", label: "RU" },
];

type ArticleForm = {
  title: Record<string, string>;
  body:  Record<string, string>;
  tag:   string;
  cover_gradient: string;
  cover_url:      string;
  is_published:   boolean;
};

const EMPTY_FORM: ArticleForm = {
  title: { en: "", ua: "", pl: "", ru: "" },
  body:  { en: "", ua: "", pl: "", ru: "" },
  tag:   "Industry",
  cover_gradient: GRADIENTS[0].value,
  cover_url: "",
  is_published: false,
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminNewsPage() {
  const [articles, setArticles]   = useState<NewsArticle[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm]           = useState<ArticleForm>(EMPTY_FORM);
  const [activeLang, setActiveLang] = useState("en");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase
      .from("news_articles")
      .select("*")
      .order("created_at", { ascending: false });
    setArticles((data as NewsArticle[]) ?? []);
    setLoading(false);
  }

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setActiveLang("en");
    setMsg(null);
    setShowForm(true);
  }

  function openEdit(a: NewsArticle) {
    setEditingId(a.id);
    // Legacy rows may store Ukrainian text under the old "ua" key; migrate it to "ua".
    const title = a.title as Record<string, string>;
    const body = a.body as Record<string, string>;
    setForm({
      title: { en: "", ua: title?.ua ?? "", pl: "", ru: "", ...title },
      body:  { en: "", ua: body?.ua ?? "", pl: "", ru: "", ...body },
      tag:   a.tag ?? "Industry",
      cover_gradient: a.cover_gradient ?? GRADIENTS[0].value,
      cover_url: a.cover_url ?? "",
      is_published:   a.is_published,
    });
    setActiveLang("en");
    setMsg(null);
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditingId(null); setMsg(null); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.en?.trim()) { setMsg({ type: "error", text: "English title is required." }); return; }
    if (!form.body.en?.trim())  { setMsg({ type: "error", text: "English body is required." }); return; }
    setSubmitting(true); setMsg(null);

    const payload = {
      title: form.title,
      body:  form.body,
      tag:   form.tag,
      cover_gradient: form.cover_gradient,
      cover_url: form.cover_url.trim() || null,
      is_published:   form.is_published,
      published_at:   form.is_published ? new Date().toISOString() : null,
      updated_at:     new Date().toISOString(),
    };

    if (editingId) {
      const { data, error } = await supabase
        .from("news_articles").update(payload).eq("id", editingId).select().single();
      if (error) { setMsg({ type: "error", text: error.message }); }
      else if (data) {
        setArticles((prev) => prev.map((a) => a.id === editingId ? data as NewsArticle : a));
        setMsg({ type: "success", text: "Article updated!" });
      }
    } else {
      const { data, error } = await supabase
        .from("news_articles").insert(payload).select().single();
      if (error) { setMsg({ type: "error", text: error.message }); }
      else if (data) {
        setArticles((prev) => [data as NewsArticle, ...prev]);
        setMsg({ type: "success", text: "Article created!" });
        setShowForm(false);
      }
    }
    setSubmitting(false);
  }

  async function togglePublish(a: NewsArticle) {
    const { data } = await supabase
      .from("news_articles")
      .update({ is_published: !a.is_published, published_at: !a.is_published ? new Date().toISOString() : null })
      .eq("id", a.id).select().single();
    if (data) setArticles((prev) => prev.map((x) => x.id === a.id ? data as NewsArticle : x));
  }

  async function deleteArticle(id: string) {
    if (!confirm("Delete this article?")) return;
    const { error } = await supabase.from("news_articles").delete().eq("id", id);
    if (!error) setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">News</h1>
          <p className="mt-1 text-sm text-mist">{articles.length} articles</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5">
          <Plus size={16} /> New Article
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 rounded-2xl border border-brass/20 bg-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold text-white">
              {editingId ? "Edit Article" : "New Article"}
            </h2>
            <button onClick={closeForm} className="text-mist hover:text-white transition"><X size={18} /></button>
          </div>

          {msg && (
            <div className={`mb-4 flex items-start gap-3 rounded-xl border px-4 py-3 ${msg.type === "success" ? "border-teal/30 bg-teal/10" : "border-coral/30 bg-coral/10"}`}>
              {msg.type === "success" ? <CheckCircle size={16} className="mt-0.5 text-teal" /> : <AlertCircle size={16} className="mt-0.5 text-coral" />}
              <p className={`text-sm ${msg.type === "success" ? "text-teal" : "text-coral"}`}>{msg.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Language tabs */}
            <div>
              <div className="flex gap-1 rounded-xl bg-navy2 p-1 mb-4 w-fit">
                {LANGS.map((l) => (
                  <button key={l.code} type="button" onClick={() => setActiveLang(l.code)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${activeLang === l.code ? "bg-brass/20 text-brass2" : "text-mist hover:text-white"}`}
                  >{l.label}</button>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foam">
                    Title {activeLang === "en" && <span className="text-coral">*</span>}
                    <span className="ml-1 text-xs text-mist uppercase">{activeLang}</span>
                  </label>
                  <input type="text"
                    value={form.title[activeLang] ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, title: { ...f.title, [activeLang]: e.target.value } }))}
                    placeholder={activeLang === "en" ? "Article title (required)" : "Translation (optional)"}
                    className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foam">
                    Body {activeLang === "en" && <span className="text-coral">*</span>}
                    <span className="ml-1 text-xs text-mist uppercase">{activeLang}</span>
                  </label>
                  <textarea
                    value={form.body[activeLang] ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, body: { ...f.body, [activeLang]: e.target.value } }))}
                    placeholder={activeLang === "en" ? "Article content (required)" : "Translation (optional)"}
                    rows={6}
                    className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foam">Tag</label>
                <select value={form.tag} onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                  className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass">
                  {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foam">Cover colour</label>
                <div className="flex gap-2 flex-wrap">
                  {GRADIENTS.map((g) => (
                    <button key={g.value} type="button"
                      onClick={() => setForm((f) => ({ ...f, cover_gradient: g.value }))}
                      title={g.label}
                      className={`h-9 w-14 rounded-lg transition ${form.cover_gradient === g.value ? "ring-2 ring-brass2 ring-offset-2 ring-offset-card" : ""}`}
                      style={{ background: g.value }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Cover photo URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Cover photo URL <span className="text-mist font-normal">(optional)</span></label>
              <input
                type="url"
                value={form.cover_url}
                onChange={(e) => setForm((f) => ({ ...f, cover_url: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass placeholder:text-mist/50"
              />
              <p className="text-xs text-mist">If set, the photo replaces the colour gradient on the news card.</p>
            </div>

            {/* Published toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div onClick={() => setForm((f) => ({ ...f, is_published: !f.is_published }))}
                className={`relative h-6 w-11 rounded-full transition-colors ${form.is_published ? "bg-teal" : "bg-white/20"}`}>
                <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${form.is_published ? "translate-x-5" : ""}`} />
              </div>
              <span className="text-sm font-semibold text-foam">
                {form.is_published ? "Published (visible on site)" : "Draft (hidden from visitors)"}
              </span>
            </label>

            {/* Cover preview */}
            <div className="rounded-xl overflow-hidden h-20 relative">
              {form.cover_url ? (
                <img src={form.cover_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0" style={{ background: form.cover_gradient }} />
              )}
              <div className="relative h-full flex items-end p-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-sm font-semibold text-white line-clamp-1">{form.title.en || "Preview title"}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={submitting}
                className="rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50">
                {submitting ? "Saving..." : editingId ? "Update" : "Create Article"}
              </button>
              <button type="button" onClick={closeForm}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-mist transition hover:bg-white/5">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Articles list */}
      {loading ? (
        <div className="flex items-center justify-center h-48"><p className="text-mist text-sm">Loading...</p></div>
      ) : articles.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center text-mist text-sm">
          No articles yet. Create the first one!
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {articles.map((a) => (
            <div key={a.id} className="rounded-2xl border border-white/10 bg-card flex items-center gap-4 p-4">
              <div className="h-14 w-20 shrink-0 rounded-xl overflow-hidden relative" style={{ background: a.cover_gradient ?? "" }}>
                {a.cover_url && <img src={a.cover_url} alt="" className="absolute inset-0 w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">
                  {(a.title as Record<string, string>).en ?? "(no title)"}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-mist">{formatDate(a.created_at)}</span>
                  {a.tag && <span className="text-xs font-semibold text-brass2">{a.tag}</span>}
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${
                    a.is_published ? "border-teal/20 bg-teal/10 text-teal" : "border-white/10 bg-white/5 text-mist"
                  }`}>{a.is_published ? "Published" : "Draft"}</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => togglePublish(a)} title={a.is_published ? "Unpublish" : "Publish"}
                  className={`rounded-lg border p-1.5 transition ${a.is_published ? "border-teal/20 bg-teal/10 text-teal hover:bg-teal/20" : "border-white/10 bg-white/5 text-mist hover:text-white"}`}>
                  {a.is_published ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => openEdit(a)}
                  className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-mist hover:text-white transition">
                  <Pencil size={14} />
                </button>
                <button onClick={() => deleteArticle(a.id)}
                  className="rounded-lg border border-coral/20 bg-coral/10 p-1.5 text-coral hover:bg-coral/20 transition">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
