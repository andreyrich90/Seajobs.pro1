"use client";

import Link from "next/link";
import { useLang, useT } from "./DictProvider";
import { href } from "@/lib/nav";
import type { RecipeCategory } from "@/lib/types";

const CHIPS: { emoji: string; cat: RecipeCategory }[] = [
  { emoji: "🍳", cat: "breakfast" },
  { emoji: "🥗", cat: "salad" },
  { emoji: "🍲", cat: "soup" },
  { emoji: "🍝", cat: "main" },
  { emoji: "🍰", cat: "dessert" },
  { emoji: "🥤", cat: "drink" },
];

export default function CategoryChips() {
  const t = useT();
  const lang = useLang();

  const base =
    "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-clay hover:bg-clay hover:text-cream";

  return (
    <div className="flex flex-wrap gap-3">
      {CHIPS.map((c) => (
        <Link key={c.cat} href={href(lang, `/recipes?cat=${c.cat}`)} className={base}>
          <span>{c.emoji}</span> {t(`cat.${c.cat}`)}
        </Link>
      ))}
      <Link href={href(lang, "/pp")} className={base}>
        <span>🌱</span> {t("nav.pp")}
      </Link>
    </div>
  );
}
