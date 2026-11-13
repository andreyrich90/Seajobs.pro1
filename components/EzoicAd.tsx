"use client";

import { useEffect } from "react";

// One Ezoic ad placement. The header scripts in components/HtmlShell.tsx load
// Ezoic on every public page; this marks where an ad may go.
//
// The site changes pages without reloading, which Ezoic's "Dynamic Content"
// guide covers: a placeholder that appears is shown with showAds(id), and one
// that leaves the page is cleaned up with destroyPlaceholders(id) — a page
// left without that keeps a dead slot, and coming back would put the same id
// on the page twice ("unpredictable ad behaviour", in their words). Doing both
// here, on mount and unmount, follows client-side navigation without a global
// route listener. Every id is used at most once per page.
//
// Ids: 101 — vacancy page, under the apply section; 102 — /jobs, after the
// sixth card. They are the placeholders configured in the Ezoic dashboard.
//
// The div is empty until Ezoic fills it, so a page without an ad (no approval
// yet, no demand, an ad blocker) shows nothing and keeps no gap.

type EzStandalone = {
  cmd: Array<() => void>;
  showAds: (...ids: number[]) => void;
  destroyPlaceholders: (...ids: number[]) => void;
};

function ez(run: (e: EzStandalone) => void) {
  const w = window as unknown as { ezstandalone?: Partial<EzStandalone> };
  w.ezstandalone = w.ezstandalone || {};
  w.ezstandalone.cmd = w.ezstandalone.cmd || [];
  w.ezstandalone.cmd.push(() => run(w.ezstandalone as EzStandalone));
}

export default function EzoicAd({ id, className }: { id: number; className?: string }) {
  useEffect(() => {
    ez((e) => e.showAds(id));
    return () => ez((e) => e.destroyPlaceholders(id));
  }, [id]);

  // empty:hidden — an unfilled slot takes no flex/grid gap either.
  return <div id={`ezoic-pub-ad-placeholder-${id}`} className={`empty:hidden ${className ?? ""}`} />;
}
