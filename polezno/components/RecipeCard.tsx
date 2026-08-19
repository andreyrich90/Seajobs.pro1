"use client";

import Link from "next/link";
import { Clock, Flame } from "lucide-react";
import { useLang, useT } from "./DictProvider";
import { pick } from "@/lib/langs";
import { href } from "@/lib/nav";
import type { Recipe } from "@/lib/types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const lang = useLang();
  const t = useT();

  return (
    <Link
      href={href(lang, `/recipes/${recipe.slug}`)}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-line bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.image}
          alt={pick(recipe.title, lang)}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-semibold text-basilInk">
          {t(`cat.${recipe.category}`)}
        </span>
        {recipe.isPp && (
          <span className="absolute right-3 top-3 rounded-full bg-honey px-2.5 py-1 text-xs font-bold text-ink">
            {t("recipe.pp.badge")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink clamp-2">
          {pick(recipe.title, lang)}
        </h3>
        <p className="mt-1.5 text-sm text-muted clamp-2">
          {pick(recipe.description, lang)}
        </p>
        <div className="mt-3 flex items-center gap-4 pt-1 text-sm font-semibold text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={15} className="text-basil" />
            {recipe.minutes} {t("recipe.min")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Flame size={15} className="text-clay" />
            {recipe.calories} {t("recipe.kcal")}
          </span>
        </div>
      </div>
    </Link>
  );
}
