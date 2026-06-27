import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";
import { NEWS } from "@/lib/data";
import { extractId } from "@/lib/slug";

export const alt = "Maritime news on SeaJobs.pro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function loc(field: unknown, lang: string): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    const obj = field as Record<string, unknown>;
    const uk = lang === "ua" ? obj.uk : undefined;
    return loc(obj[lang] ?? uk ?? obj.en ?? obj.ru ?? Object.values(obj)[0], lang);
  }
  return "";
}

function fmtDate(d: string, lang: string): string {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(
      lang === "ua" ? "uk-UA" : lang === "pl" ? "pl-PL" : lang === "ru" ? "ru-RU" : "en-GB",
      { day: "numeric", month: "long", year: "numeric" },
    );
  } catch {
    return "";
  }
}

type Resolved = { title: string; tag: string; date: string; coverUrl: string | null; gradient: string };

async function resolve(id: string, locale: string): Promise<Resolved> {
  const fallback: Resolved = { title: "Maritime News", tag: "News", date: "", coverUrl: null, gradient: "linear-gradient(135deg,#0c4a6e,#155e75)" };
  const uuid = extractId(id);
  const found = uuid ? undefined : NEWS.find((n) => n.slug === id || `static-${n.id}` === id || n.id === parseInt(id));
  if (found) {
    return {
      title: loc(found.title, locale).slice(0, 90),
      tag: found.tag,
      date: found.date,
      coverUrl: found.coverUrl ?? null,
      gradient: found.gradient,
    };
  }
  if (uuid) {
    try {
      const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
      const { data } = await sb.from("news_articles").select("title, tag, cover_url, cover_gradient, published_at, created_at").eq("id", uuid).single();
      if (data) {
        return {
          title: loc(data.title, locale).slice(0, 90) || fallback.title,
          tag: data.tag ?? "News",
          date: data.published_at ?? data.created_at ?? "",
          coverUrl: data.cover_url ?? null,
          gradient: data.cover_gradient ?? fallback.gradient,
        };
      }
    } catch { /* fall through */ }
  }
  return fallback;
}

export default async function Image({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  const a = await resolve(id, locale);

  // Facebook (and most chat apps) crop link-preview images toward a near-square
  // frame instead of showing the full 1200x630 canvas, so anything close to the
  // left/right edges gets cut off. Keep all text/badges inside a centered
  // SAFE_WIDTH column that stays within that crop on every platform.
  const SAFE_WIDTH = 640;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "serif",
          padding: "56px 0",
          position: "relative",
          background: a.coverUrl ? "#0a1f33" : a.gradient,
        }}
      >
        {a.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={a.coverUrl} alt="" style={{ position: "absolute", inset: 0, width: 1200, height: 630, objectFit: "cover" }} />
        )}
        {/* dark overlay for legibility */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,31,51,0.55) 0%, rgba(10,31,51,0.85) 100%)" }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, position: "relative", width: SAFE_WIDTH }}>
          <div
            style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #c9a227, #e3c04a)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#061523" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="3" fill="#061523" stroke="none" />
              <line x1="12" y1="8" x2="12" y2="22" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <path d="M5 20C5 16.5 8.13 14 12 14s7 2.5 7 6" />
            </svg>
          </div>
          <span style={{ fontSize: 30, fontWeight: 700, color: "#ffffff", letterSpacing: "-1px" }}>
            SeaJobs<span style={{ color: "#e3c04a" }}>.pro</span>
          </span>
        </div>

        {/* Body */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: SAFE_WIDTH }}>
          <span style={{ fontSize: 20, color: "#e3c04a", background: "rgba(201,162,39,0.15)", border: "1px solid rgba(201,162,39,0.35)", borderRadius: 999, padding: "5px 16px" }}>
            {a.tag}
          </span>
          <div style={{ width: "100%", fontSize: 38, fontWeight: 700, color: "#ffffff", lineHeight: 1.15, letterSpacing: "-0.5px", textAlign: "center" }}>
            {a.title}
          </div>
        </div>

        {/* Footer */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: SAFE_WIDTH }}>
          <span style={{ fontSize: 20, color: "#cdd9e1" }}>{fmtDate(a.date, locale)}</span>
          <span style={{ fontSize: 18, color: "#8aa0b0" }}>Read on seajobs.pro</span>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, #c9a227, #e3c04a)" }} />
      </div>
    ),
    size,
  );
}
