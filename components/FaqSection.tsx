"use client";

import { ChevronDown } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { FAQ_HEADING, type FaqItem } from "@/lib/faq";

// Visible FAQ accordion + FAQPage structured data. Client components are
// server-rendered in the App Router, so the JSON-LD lands in the initial HTML
// in the visitor's language (matching the visible text, as Google requires).
export default function FaqSection({ items }: { items: FaqItem[] }) {
  const { lang } = useLang();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q[lang] ?? item.q.en,
      acceptedAnswer: { "@type": "Answer", text: item.a[lang] ?? item.a.en },
    })),
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white">
        {FAQ_HEADING[lang] ?? FAQ_HEADING.en}
      </h2>
      <div className="mt-6 flex flex-col gap-3">
        {items.map((item, i) => (
          <details key={i} className="group rounded-2xl border border-white/10 bg-card px-5 py-4 open:border-brass/30">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
              {item.q[lang] ?? item.q.en}
              <ChevronDown size={16} className="shrink-0 text-mist transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-mist">{item.a[lang] ?? item.a.en}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
