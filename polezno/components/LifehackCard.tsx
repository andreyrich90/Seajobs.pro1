"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLang, useT } from "./DictProvider";
import { pick } from "@/lib/langs";
import { href } from "@/lib/nav";
import type { Lifehack } from "@/lib/types";

export default function LifehackCard({ item }: { item: Lifehack }) {
  const lang = useLang();
  const t = useT();

  return (
    <Link
      href={href(lang, `/lifehacks/${item.slug}`)}
      className="group flex gap-4 overflow-hidden rounded-xl2 border border-line bg-card p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
    >
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={pick(item.title, lang)}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-semibold uppercase tracking-wide text-honey">
          {t(`lcat.${item.category}`)}
        </span>
        <h3 className="mt-0.5 flex items-start gap-1 font-display text-base font-semibold leading-snug text-ink clamp-2">
          {pick(item.title, lang)}
          <ArrowUpRight
            size={16}
            className="mt-0.5 shrink-0 text-muted transition group-hover:text-basil"
          />
        </h3>
        <p className="mt-1 text-sm text-muted clamp-2">{pick(item.summary, lang)}</p>
      </div>
    </Link>
  );
}
