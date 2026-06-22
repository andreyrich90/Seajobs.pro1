import { ImageResponse } from "next/og";
import { getServerSupabase } from "@/lib/supabase/admin";
import { extractId } from "@/lib/slug";

export const alt = "Maritime job vacancy on SeaJobs.pro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function salaryText(v: {
  salary_from: number | null;
  salary_to: number | null;
  currency: string | null;
}): string {
  const cur = v.currency ?? "USD";
  if (v.salary_from && v.salary_to) return `${v.salary_from.toLocaleString()}–${v.salary_to.toLocaleString()} ${cur}`;
  if (v.salary_from) return `from ${v.salary_from.toLocaleString()} ${cur}`;
  if (v.salary_to) return `up to ${v.salary_to.toLocaleString()} ${cur}`;
  return "";
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id: param } = await params;
  const id = extractId(param) ?? param;

  let title = "Maritime Vacancy";
  let company = "";
  let rank: string | null = null;
  let vessel: string | null = null;
  let salary = "";
  try {
    const { data } = await getServerSupabase()
      .from("vacancies")
      .select("title, rank, vessel_type, salary_from, salary_to, currency, companies(name)")
      .eq("id", id)
      .single();
    if (data) {
      title = (data.title ?? title).slice(0, 90);
      rank = data.rank;
      vessel = data.vessel_type;
      salary = salaryText(data);
      const co = data.companies as { name: string | null } | null;
      company = co?.name ?? "";
    }
  } catch { /* fall back to generic card */ }

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0a1f33",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "serif",
          padding: 64,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(201,162,39,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #c9a227, #e3c04a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#061523" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="3" fill="#061523" stroke="none" />
              <line x1="12" y1="8" x2="12" y2="22" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <path d="M5 20C5 16.5 8.13 14 12 14s7 2.5 7 6" />
            </svg>
          </div>
          <span style={{ fontSize: 38, fontWeight: 700, color: "#ffffff", letterSpacing: "-1px" }}>
            SeaJobs<span style={{ color: "#e3c04a" }}>.pro</span>
          </span>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {rank && (
              <span style={{ fontSize: 24, color: "#e3c04a", background: "rgba(201,162,39,0.12)", border: "1px solid rgba(201,162,39,0.3)", borderRadius: 999, padding: "6px 18px" }}>
                {rank}
              </span>
            )}
            {vessel && (
              <span style={{ fontSize: 24, color: "#2dd4bf", background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.3)", borderRadius: 999, padding: "6px 18px" }}>
                {vessel}
              </span>
            )}
          </div>
          <div style={{ fontSize: 60, fontWeight: 700, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-1px" }}>
            {title}
          </div>
          {company && <div style={{ fontSize: 30, color: "#8aa0b0" }}>{company}</div>}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 40, fontWeight: 700, color: "#e3c04a" }}>{salary}</span>
          <span style={{ fontSize: 24, color: "#8aa0b0" }}>Apply on seajobs.pro</span>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, #c9a227, #e3c04a)" }} />
      </div>
    ),
    size,
  );
}
