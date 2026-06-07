import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #c9a227, #e3c04a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="110"
          height="110"
          viewBox="0 0 24 26"
          fill="none"
          stroke="#061523"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="4" r="3" fill="#061523" stroke="none" />
          <line x1="12" y1="7" x2="12" y2="21" />
          <line x1="5" y1="11" x2="19" y2="11" />
          <path d="M5 19C5 15.5 8.13 13 12 13s7 2.5 7 6" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
