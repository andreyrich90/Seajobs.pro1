import type { Metadata } from "next";
import LifehackCard from "@/components/LifehackCard";
import { getDict } from "@/lib/i18n";
import { isLang } from "@/lib/langs";
import { getLifehacks } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(isLang(locale) ? locale : "ru");
  return { title: t["lifehacks.title"], description: t["lifehacks.subtitle"] };
}

export default async function LifehacksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDict(isLang(locale) ? locale : "ru");
  const items = await getLifehacks();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-bold text-ink">{t["lifehacks.title"]}</h1>
        <p className="mt-2 text-muted">{t["lifehacks.subtitle"]}</p>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((l) => (
          <LifehackCard key={l.id} item={l} />
        ))}
      </div>
    </div>
  );
}
