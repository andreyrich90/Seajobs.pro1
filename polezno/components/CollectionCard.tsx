"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang, useT } from "./DictProvider";
import { pick, type Localized } from "@/lib/langs";
import { href } from "@/lib/nav";

export default function CollectionCard({
  slug,
  emoji,
  title,
  description,
  cover,
  count,
}: {
  slug: string;
  emoji: string;
  title: Localized;
  description: Localized;
  cover: string;
  count: number;
}) {
  const lang = useLang();
  const t = useT();

  return (
    <Link
      href={href(lang, `/collections/${slug}`)}
      className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-xl2 border border-line p-6 text-cream shadow-card transition hover:-translate-y-1 hover:shadow-soft"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cover}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10" />
      <div className="relative">
        <div className="text-3xl">{emoji}</div>
        <h3 className="mt-2 font-display text-2xl font-semibold text-cream">
          {pick(title, lang)}
        </h3>
        <p className="mt-1 text-sm text-cream/80 clamp-2">{pick(description, lang)}</p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-honey">
          {count} {t("collections.count")} <ArrowRight size={15} />
        </div>
      </div>
    </Link>
  );
}
