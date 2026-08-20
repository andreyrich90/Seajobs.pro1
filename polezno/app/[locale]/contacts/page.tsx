import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { getDict } from "@/lib/i18n";
import { isLang, LOCALES, type Lang } from "@/lib/langs";
import { alternates } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/legal";

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
    title: t["contacts.title"],
    description: t["contacts.subtitle"],
    alternates: alternates("/contacts", lang),
  };
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Lang = isLang(locale) ? locale : "ru";
  const t = getDict(lang);

  return (
    <article className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-4xl font-semibold text-basil sm:text-5xl">
        {t["contacts.title"]}
      </h1>
      <p className="mt-3 text-lg text-muted">{t["contacts.subtitle"]}</p>

      <div className="mt-8 rounded-xl2 border border-line bg-surface p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-basil/10 text-basil">
            <Mail size={22} />
          </span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t["contacts.email"]}
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-display text-xl font-bold text-ink hover:text-clay"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">{t["contacts.reply"]}</p>
      </div>
    </article>
  );
}
