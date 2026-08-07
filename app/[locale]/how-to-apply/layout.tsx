import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";

const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "How to Apply for a Maritime Job — Step by Step | SeaJobs.pro",
    description:
      "Upload your CV and we fill your seafarer profile automatically, or fill it in by hand. Then apply to any vacancy in one click — your full CV goes straight to the crewing manager.",
  },
  ru: {
    title: "Как подать анкету на вакансию — пошаговая инструкция | SeaJobs.pro",
    description:
      "Загрузите своё CV — профиль моряка заполнится автоматически, или заполните его вручную. Дальше отклик на любую вакансию в один клик: полное CV уходит прямо крюинг-менеджеру.",
  },
  ua: {
    title: "Як подати анкету на вакансію — покрокова інструкція | SeaJobs.pro",
    description:
      "Завантажте своє CV — профіль моряка заповниться автоматично, або заповніть його вручну. Далі відгук на будь-яку вакансію в один клік: повне CV йде прямо крюїнг-менеджеру.",
  },
  pl: {
    title: "Jak aplikować na ofertę pracy na statku — krok po kroku | SeaJobs.pro",
    description:
      "Wgraj swoje CV, a profil marynarza wypełni się automatycznie, albo uzupełnij go ręcznie. Potem aplikujesz jednym kliknięciem — pełne CV trafia prosto do menedżera crewingu.",
  },
  ro: {
    title: "Cum aplici la un post pe navă — pas cu pas | SeaJobs.pro",
    description:
      "Încarcă-ți CV-ul și profilul de marinar se completează automat, sau completează-l manual. Apoi aplici la orice post dintr-un singur clic — CV-ul complet ajunge direct la managerul de crewing.",
  },
};

const KEYWORDS =
  "how to apply for a seafarer job, maritime job application, seafarer CV upload, crewing application, apply for ship job, " +
  "как подать анкету моряка, отклик на вакансию моряка, загрузить резюме моряка, анкета в крюинг, " +
  "як подати анкету моряка, jak aplikować marynarz, cum aplici marinar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const meta = SITE_META[locale] ?? SITE_META.en;

  return {
    title: meta.title,
    description: meta.description,
    keywords: KEYWORDS,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      siteName: "SeaJobs.pro",
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: canonicalUrl("/how-to-apply", locale),
      languages: hreflangAlternates("/how-to-apply"),
    },
  };
}

export default function HowToApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
