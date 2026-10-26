import { ImageResponse } from "next/og";

// The site's own social card: what Facebook, Telegram, LinkedIn and X show for
// any seajobs.pro link that has no card of its own (DEFAULT_OG_IMAGE in
// lib/seo.ts points at it). Served by app/opengraph-image.tsx and
// app/twitter-image.tsx, which only wrap this.
//
// It speaks to both sides of the board: seafarers come for the vacancies,
// crewing companies for the seafarers. The vacancy and company figures are
// floors of the counts in October 2026 (1,406 live vacancies, 401 companies);
// the seafarer figure is the one the owner chose to show, as on the earlier
// card. Change them here by hand.
//
// Satori draws this: every element with children needs display:flex, and the
// default font carries Latin only, so the card is in English.

export const SITE_CARD_ALT = "SeaJobs.pro — maritime jobs for seafarers, seafarers for crewing companies";
export const SITE_CARD_SIZE = { width: 1200, height: 630 };

const GOLD = "#e3c04a";
const MIST = "#9fb3c3";

const STATS = [
  { value: "1,400+", label: "live vacancies", note: "for seafarers" },
  { value: "12,000+", label: "seafarers", note: "for crewing companies" },
  { value: "400+", label: "crewing companies", note: "on the board" },
];

export function siteCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(180deg, #12304c 0%, #0a1f33 55%, #06141f 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Chart grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(201,162,39,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow behind the emblem */}
        <div
          style={{
            position: "absolute",
            top: -140,
            left: 300,
            width: 600,
            height: 420,
            borderRadius: 300,
            background: "radial-gradient(ellipse, rgba(201,162,39,0.20) 0%, transparent 70%)",
          }}
        />

        {/* Emblem + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 34 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "linear-gradient(135deg, #c9a227, #e3c04a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
          >
            <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#061523" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {/* The lucide Anchor the header uses, its bottom arc written as two
                  cubics: Satori draws SVG arcs unreliably. */}
              <circle cx="12" cy="5" r="3" />
              <path d="M12 22 L12 8" />
              <path d="M5 12 L2 12 C2 17.52 6.48 22 12 22 C17.52 22 22 17.52 22 12 L19 12" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, color: "#ffffff", letterSpacing: "-1px" }}>
            SeaJobs<span style={{ color: GOLD }}>.pro</span>
          </div>
        </div>

        {/* What the site is, for both sides */}
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#ffffff", marginBottom: 12 }}>
          Maritime jobs for seafarers
        </div>
        <div style={{ display: "flex", fontSize: 26, color: MIST, marginBottom: 46 }}>
          Vacancies from crewing agencies · Seafarers for crewing companies
        </div>

        {/* The board in numbers */}
        <div style={{ display: "flex", gap: 22 }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 300,
                padding: "18px 10px 16px",
                borderRadius: 20,
                border: "1px solid rgba(227,192,74,0.35)",
                background: "rgba(18,48,76,0.75)",
              }}
            >
              <div style={{ display: "flex", fontSize: 46, fontWeight: 700, color: GOLD }}>{s.value}</div>
              <div style={{ display: "flex", fontSize: 22, color: "#ffffff", marginTop: 2 }}>{s.label}</div>
              <div style={{ display: "flex", fontSize: 17, color: MIST, marginTop: 4 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", fontSize: 20, color: MIST, marginTop: 34 }}>
          Jobs for seafarers · Free to post vacancies
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #c9a227, #e3c04a, #c9a227)",
          }}
        />
      </div>
    ),
    { ...SITE_CARD_SIZE },
  );
}
