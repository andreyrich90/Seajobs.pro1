"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useLang, useT } from "./DictProvider";
import { pick } from "@/lib/langs";
import { RECIPE_CATEGORIES, type Recipe } from "@/lib/types";

export default function RecipeExplorer({
  recipes,
  initialPpOnly = false,
  initialCategory = "all",
}: {
  recipes: Recipe[];
  initialPpOnly?: boolean;
  initialCategory?: string;
}) {
  const t = useT();
  const lang = useLang();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(initialCategory);
  const [ppOnly, setPpOnly] = useState(initialPpOnly);

  // Categories actually present in the data, in the canonical order.
  const cats = useMemo(() => {
    const present = new Set(recipes.map((r) => r.category));
    return RECIPE_CATEGORIES.filter((c) => present.has(c));
  }, [recipes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      if (ppOnly && !r.isPp) return false;
      if (category !== "all" && r.category !== category) return false;
      if (!q) return true;
      const haystack = [
        pick(r.title, lang),
        pick(r.description, lang),
        ...pick(r.tags, lang),
        ...pick(r.ingredients, lang),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [recipes, query, category, ppOnly, lang]);

  const chip = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
      active
        ? "bg-basil text-white"
        : "border border-line bg-surface text-muted hover:text-ink"
    }`;

  return (
    <div>
      <div className="relative mb-4">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("recipes.search.placeholder")}
          className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 text-ink outline-none transition focus:border-basil"
        />
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button className={chip(category === "all")} onClick={() => setCategory("all")}>
          {t("recipes.filter.all")}
        </button>
        {cats.map((c) => (
          <button key={c} className={chip(category === c)} onClick={() => setCategory(c)}>
            {t(`cat.${c}`)}
          </button>
        ))}
        <button
          className={`${chip(ppOnly)} ml-auto`}
          onClick={() => setPpOnly((v) => !v)}
        >
          🥗 {t("recipes.filter.ppOnly")}
        </button>
      </div>

      <p className="mb-4 text-sm text-muted">
        {t("recipes.count")} <span className="font-semibold text-ink">{filtered.length}</span>
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl2 border border-dashed border-line bg-surface py-16 text-center text-muted">
          {t("recipes.empty")}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
