import type { Metadata } from "next";
import { getDict } from "@/lib/i18n";
import { isLang } from "@/lib/langs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(isLang(locale) ? locale : "ru");
  return { title: t["about.title"], description: t["about.body"] };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDict(isLang(locale) ? locale : "ru");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-ink">{t["about.title"]}</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">{t["about.body"]}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { emoji: "🍳", title: t["nav.recipes"] },
          { emoji: "🥗", title: t["nav.pp"] },
          { emoji: "💡", title: t["nav.lifehacks"] },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-xl2 border border-line bg-surface p-6 text-center"
          >
            <div className="text-4xl">{c.emoji}</div>
            <div className="mt-2 font-display text-lg font-semibold text-ink">{c.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
