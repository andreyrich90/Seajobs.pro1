import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Flame, Gauge, Users } from "lucide-react";
import { getDict } from "@/lib/i18n";
import { isLang, pick, LOCALES, type Lang } from "@/lib/langs";
import { href } from "@/lib/nav";
import { getRecipe, getRecipes } from "@/lib/content";

// Re-read from the database in the background at most every 30s (ISR),
// so new recipes added via SQL appear without a redeploy.
export const revalidate = 30;

export const dynamicParams = true;

export async function generateStaticParams() {
  const recipes = await getRecipes();
  return LOCALES.flatMap((locale) =>
    recipes.map((r) => ({ locale, slug: r.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang: Lang = isLang(locale) ? locale : "ru";
  const recipe = await getRecipe(slug);
  if (!recipe) return { title: "404" };
  return {
    title: pick(recipe.title, lang),
    description: pick(recipe.description, lang),
    openGraph: {
      title: pick(recipe.title, lang),
      description: pick(recipe.description, lang),
      images: [recipe.image],
    },
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang: Lang = isLang(locale) ? locale : "ru";
  const t = getDict(lang);
  const recipe = await getRecipe(slug);
  if (!recipe) notFound();

  const meta = [
    { icon: <Clock size={18} />, label: t["recipe.time"], value: `${recipe.minutes} ${t["recipe.min"]}` },
    { icon: <Flame size={18} />, label: t["recipe.calories"], value: `${recipe.calories} ${t["recipe.kcal"]}` },
    { icon: <Users size={18} />, label: t["recipe.servings"], value: `${recipe.servings}` },
    { icon: <Gauge size={18} />, label: t["recipe.difficulty"], value: t[`difficulty.${recipe.difficulty}`] },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <Link
        href={href(lang, "/recipes")}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-ink"
      >
        <ArrowLeft size={16} /> {t["recipe.back"]}
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-basil/10 px-3 py-1 text-sm font-semibold text-basilInk">
          {t[`cat.${recipe.category}`]}
        </span>
        {recipe.isPp && (
          <span className="rounded-full bg-honey px-3 py-1 text-sm font-bold text-ink">
            🥗 {t["recipe.pp.badge"]}
          </span>
        )}
      </div>

      <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
        {pick(recipe.title, lang)}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">{pick(recipe.description, lang)}</p>

      <div className="mt-6 overflow-hidden rounded-xl2 border border-line bg-cream2 shadow-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.image}
          alt={pick(recipe.title, lang)}
          className="mx-auto max-h-[600px] w-full object-contain"
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {meta.map((m) => (
          <div
            key={m.label}
            className="rounded-xl2 border border-line bg-surface p-4 text-center"
          >
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-basil/10 text-basil">
              {m.icon}
            </div>
            <div className="mt-2 font-display text-lg font-bold text-ink">{m.value}</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Ingredients */}
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">{t["recipe.ingredients"]}</h2>
          <ul className="mt-4 space-y-2.5">
            {pick(recipe.ingredients, lang).map((ing, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-basil" />
                <span className="text-ink">{ing}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Steps */}
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">{t["recipe.steps"]}</h2>
          <ol className="mt-4 space-y-5">
            {pick(recipe.steps, lang).map((step, i) => {
              const photo = recipe.gallery?.[i];
              return (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-basil font-display font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="pt-1 leading-relaxed text-ink">{step}</p>
                    {photo && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={photo}
                        alt=""
                        loading="lazy"
                        className="mt-3 w-full max-w-md rounded-xl border border-line object-cover"
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>

      {pick(recipe.tags, lang).length > 0 && (
        <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-6">
          <span className="text-sm font-semibold text-muted">{t["recipe.tags"]}:</span>
          {pick(recipe.tags, lang).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
