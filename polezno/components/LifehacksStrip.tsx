"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang, useT } from "./DictProvider";
import { pick } from "@/lib/langs";
import { href } from "@/lib/nav";
import type { Lifehack } from "@/lib/types";

// Forest-green band with a horizontally scrolling rail of numbered lifehack
// cards (from the design concept).
export default function LifehacksStrip({ items }: { items: Lifehack[] }) {
  const t = useT();
  const lang = useLang();

  return (
    <section className="relative my-6 overflow-hidden bg-basil py-20 text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-48 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--c-honey) / 0.18), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-semibold text-cream sm:text-[34px]">
              {t("home.lifehacks.title")}
            </h2>
            <p className="mt-2 text-cream/65">{t("home.lifehacks.subtitle")}</p>
          </div>
          <Link
            href={href(lang, "/lifehacks")}
            className="inline-flex items-center gap-1.5 font-bold text-honey hover:underline"
          >
            {t("home.lifehacks.cta")} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="no-scrollbar flex gap-5 overflow-x-auto pb-2">
          {items.map((item, i) => (
            <Link
              key={item.id}
              href={href(lang, `/lifehacks/${item.slug}`)}
              className="min-w-[280px] max-w-[280px] rounded-xl2 border border-cream/15 bg-cream/[0.06] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-cream/[0.12]"
            >
              <div className="font-display text-3xl font-semibold text-honey">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h4 className="mb-2 mt-3.5 text-base font-bold text-cream">
                {pick(item.title, lang)}
              </h4>
              <p className="text-[13.5px] leading-relaxed text-cream/70 clamp-3">
                {pick(item.summary, lang)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
