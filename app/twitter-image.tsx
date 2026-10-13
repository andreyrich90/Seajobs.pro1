import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SeaJobs.pro — Maritime Jobs for Seafarers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0a1f33",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
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
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(201,162,39,0.15) 0%, transparent 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #c9a227, #e3c04a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#061523" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {/* The same lucide Anchor the header uses — a ring, a shank and
                  the flukes — with the bottom arc written as two cubics instead
                  of an SVG arc, which Satori draws unreliably. The old shape (a
                  filled disc, a crossbar and a curve bulging upward) came out
                  reading as a stick figure at card size. */}
              <circle cx="12" cy="5" r="3" />
              <path d="M12 22 L12 8" />
              <path d="M5 12 L2 12 C2 17.52 6.48 22 12 22 C17.52 22 22 17.52 22 12 L19 12" />
            </svg>
          </div>
          <span style={{ fontSize: 52, fontWeight: 700, color: "#ffffff", letterSpacing: "-1px" }}>
            SeaJobs<span style={{ color: "#e3c04a" }}>.pro</span>
          </span>
        </div>
        <div style={{ fontSize: 28, color: "#8aa0b0", textAlign: "center", maxWidth: 700, lineHeight: 1.4, marginBottom: 48 }}>
          Maritime Jobs for Seafarers Worldwide
        </div>
        <div style={{ display: "flex", gap: 48 }}>
          {[
            { value: "12,000+", label: "Seafarers" },
            { value: "40+", label: "Countries" },
            { value: "Free", label: "To Post Jobs" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "#e3c04a" }}>{stat.value}</span>
              <span style={{ fontSize: 16, color: "#8aa0b0" }}>{stat.label}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #c9a227, #e3c04a, #c9a227)" }} />
      </div>
    ),
    { ...size }
  );
}
