import Link from "next/link";
import { ArrowRight, Sparkles, Timer, Utensils } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import LifehackCard from "@/components/LifehackCard";
import { getDict } from "@/lib/i18n";
import { isLang, type Lang } from "@/lib/langs";
import { href } from "@/lib/nav";
import { getLifehacks, getPpRecipes, getRecipes } from "@/lib/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Lang = isLang(locale) ? locale : "ru";
  const t = getDict(lang);

  const [recipes, pp, lifehacks] = await Promise.all([
    getRecipes(),
    getPpRecipes(),
    getLifehacks(),
  ]);

  const featured = recipes.slice(0, 6);
  const ppFeatured = pp.slice(0, 3);
  const lhFeatured = lifehacks.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="hero-surface border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-sm font-semibold text-basilInk">
              <Sparkles size={15} /> {t["brand.tagline"]}
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {t["home.hero.title"]}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">{t["home.hero.subtitle"]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={href(lang, "/recipes")}
                className="inline-flex items-center gap-2 rounded-full bg-basil px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-basil2"
              >
                {t["home.hero.cta"]} <ArrowRight size={18} />
              </Link>
              <Link
                href={href(lang, "/pp")}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-semibold text-ink transition hover:border-basil"
              >
                🥗 {t["home.hero.ctaPp"]}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              <Stat value={`${recipes.length}+`} label={t["home.stats.recipes"]} icon={<Utensils size={16} />} />
              <Stat value={`${pp.length}`} label={t["home.stats.pp"]} icon={<Sparkles size={16} />} />
              <Stat value={`${lifehacks.length}`} label={t["home.stats.lifehacks"]} icon={<Timer size={16} />} />
            </div>
          </div>

          {/* Image collage */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 4).map((r, i) => (
                <div
                  key={r.id}
                  className={`overflow-hidden rounded-xl2 border border-line shadow-soft ${
                    i % 2 === 1 ? "mt-8" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt="" className="aspect-square w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured recipes */}
      <Section
        title={t["home.featured"]}
        ctaLabel={t["nav.recipes"]}
        ctaHref={href(lang, "/recipes")}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      </Section>

      {/* PP band */}
      <section className="border-y border-line bg-honey/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink">
                🥗 {t["home.pp.title"]}
              </h2>
              <p className="mt-1 text-muted">{t["home.pp.subtitle"]}</p>
            </div>
            <Link
              href={href(lang, "/pp")}
              className="inline-flex items-center gap-1.5 font-semibold text-basilInk hover:underline"
            >
              {t["home.pp.cta"]} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ppFeatured.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Lifehacks */}
      <Section
        title={t["home.lifehacks.title"]}
        subtitle={t["home.lifehacks.subtitle"]}
        ctaLabel={t["home.lifehacks.cta"]}
        ctaHref={href(lang, "/lifehacks")}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {lhFeatured.map((l) => (
            <LifehackCard key={l.id} item={l} />
          ))}
        </div>
      </Section>
    </>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 font-display text-3xl font-bold text-ink">
        {value}
      </div>
      <div className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-muted">
        <span className="text-basil">{icon}</span>
        {label}
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  children,
}: {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink">{title}</h2>
          {subtitle && <p className="mt-1 text-muted">{subtitle}</p>}
        </div>
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-1.5 font-semibold text-basilInk hover:underline"
          >
            {ctaLabel} <ArrowRight size={16} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
