"use client";

import Link from "next/link";
import { Clock, Flame, Heart, Users } from "lucide-react";
import { useLang, useT } from "./DictProvider";
import { pick } from "@/lib/langs";
import { href } from "@/lib/nav";
import type { Recipe } from "@/lib/types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const lang = useLang();
  const t = useT();
  const tags = pick(recipe.tags, lang).slice(0, 2);

  return (
    <Link
      href={href(lang, `/recipes/${recipe.slug}`)}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-line bg-card shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-soft"
    >
      <div className="relative h-[200px] overflow-hidden bg-cream2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.image}
          alt={pick(recipe.title, lang)}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.08]"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-surface/92 px-3 py-1.5 text-[11.5px] font-extrabold tracking-wide text-basil2">
          {recipe.calories} {t("recipe.kcal")}
        </span>
        <span className="absolute right-3.5 top-3.5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-surface/92 text-clay transition group-hover:scale-110">
          <Heart size={16} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[19px] font-semibold leading-snug text-ink clamp-2">
          {pick(recipe.title, lang)}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-3.5 text-[12.5px] font-semibold text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-basil" /> {recipe.minutes} {t("recipe.min")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Flame size={14} className="text-clay" /> {recipe.calories} {t("recipe.kcal")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users size={14} className="text-basil" /> {recipe.servings} {t("recipe.portions")}
          </span>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2">
          {recipe.isPp && (
            <span className="rounded-full bg-leaf/20 px-2.5 py-1 text-[11px] font-bold text-basil2">
              {t("recipe.pp.badge")}
            </span>
          )}
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream2 px-2.5 py-1 text-[11px] font-bold text-basil2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
