"use client";

import { Fragment } from "react";

// Renders a consent label from lib/consentCopy.ts: the first [...] becomes a
// link to the Terms, the second to the Privacy Policy. Plain <a> with the
// locale prefix written out, so it works both on /auth/* (outside the
// [locale] tree) and in the cabinets; a new tab, so a half-filled form is not
// lost on the way.

function localeHref(path: string, lang: string) {
  return lang === "en" ? path : `/${lang}${path}`;
}

export default function ConsentText({ text, lang }: { text: string; lang: string }) {
  const targets = [localeHref("/terms", lang), localeHref("/privacy", lang)];
  const parts = text.split(/(\[[^\]]+\])/);
  let n = 0;
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\[([^\]]+)\]$/);
        if (!m) return <Fragment key={i}>{p}</Fragment>;
        const href = targets[Math.min(n++, targets.length - 1)];
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            className="font-semibold text-brassInk underline underline-offset-2 hover:no-underline"
          >
            {m[1]}
          </a>
        );
      })}
    </>
  );
}
