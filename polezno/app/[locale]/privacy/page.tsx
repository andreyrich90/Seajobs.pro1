import type { Metadata } from "next";
import { getDict } from "@/lib/i18n";
import { isLang, LOCALES, type Lang } from "@/lib/langs";
import { alternates } from "@/lib/seo";
import { privacySections, PRIVACY_UPDATED } from "@/lib/legal";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Lang = isLang(locale) ? locale : "ru";
  const t = getDict(lang);
  return {
    title: t["privacy.title"],
    alternates: alternates("/privacy", lang),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Lang = isLang(locale) ? locale : "ru";
  const t = getDict(lang);
  const sections = privacySections(lang);

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-4xl font-semibold text-basil sm:text-5xl">
        {t["privacy.title"]}
      </h1>
      <p className="mt-3 text-sm font-semibold text-muted">
        {t["privacy.updated"]}: {PRIVACY_UPDATED}
      </p>

      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-2xl font-bold text-ink">{s.heading}</h2>
            <div className="mt-3 space-y-3">
              {s.body.map((p, i) => (
                <p key={i} className="leading-relaxed text-ink/80">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
