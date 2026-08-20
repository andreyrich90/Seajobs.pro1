"use client";

import { useEffect, useRef, useState } from "react";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A Google AdSense ad unit that renders nothing until:
 *  1. NEXT_PUBLIC_ADSENSE_ID is set (so nothing shows before ad codes exist), and
 *  2. it scrolls near the viewport (lazy — keeps the page fast and avoids
 *     requesting ads for content the reader never reaches).
 *
 * Pass the ad unit's `slot` id from AdSense. `format` defaults to a responsive
 * unit. The AdSense loader script itself is injected once in the locale layout.
 */
export default function AdSlot({
  slot,
  format = "auto",
  className = "",
  label,
}: {
  slot: string;
  format?: string;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLModElement>(null);
  const [visible, setVisible] = useState(false);
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_ID) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setVisible(true);
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* ad blocker or loader missing — silently skip */
    }
  }, [visible]);

  // Without an AdSense id or a configured slot there is nothing to render —
  // keep it out of the DOM entirely.
  if (!ADSENSE_ID || !slot) return null;

  return (
    <div className={`my-8 text-center ${className}`}>
      {label && (
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted/70">
          {label}
        </div>
      )}
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
