import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";

const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Seafarer Jobs & Vacancies — Search by Rank, Vessel Type | SeaJobs.pro",
    description:
      "Browse maritime job vacancies for all ranks and vessel types — Captains, Officers, Engineers, Ratings.",
  },
  ru: {
    title: "Вакансии для моряков — поиск по рангу и типу судна | SeaJobs.pro",
    description:
      "Вакансии для моряков всех рангов и типов судов — поиск по рангу, типу судна и зарплате.",
  },
  ua: {
    title: "Вакансії для моряків — пошук за рангом та типом судна | SeaJobs.pro",
    description:
      "Вакансії для моряків усіх рангів та типів суден — пошук за рангом, типом судна та зарплатою.",
  },
  pl: {
    title: "Praca dla marynarzy — szukaj według rangi i typu statku | SeaJobs.pro",
    description:
      "Oferty pracy dla marynarzy wszystkich rang i typów statków — szukaj według rangi, typu statku i wynagrodzenia.",
  },
  ro: {
    title: "Joburi pentru marinari — caută după rang și tip de navă | SeaJobs.pro",
    description:
      "Posturi vacante pentru marinari de toate rangurile și tipurile de nave — caută după rang, tip de navă și salariu.",
  },
};

const KEYWORDS =
  // English — general + intent
  "seafarer jobs, maritime vacancies, crew jobs, ship vacancies, jobs for seamen, jobs at sea, seaman job vacancy, seafarer recruitment, marine crewing, maritime employment, crewing agency jobs, seafarer jobs no experience, " +
  // English — ranks
  "able seaman jobs, ordinary seaman jobs, bosun jobs, motorman jobs, oiler jobs, fitter welder jobs, ship cook jobs, messman jobs, master mariner vacancies, chief officer jobs, second officer jobs, third officer jobs, chief engineer jobs, second engineer jobs, third engineer jobs, ETO jobs, ship electrician jobs, deck cadet jobs, engine cadet jobs, DPO jobs, " +
  // English — vessel types
  "tanker jobs, chemical tanker vacancies, LNG carrier jobs, container ship jobs, bulk carrier jobs, general cargo vacancies, offshore vacancies, PSV AHTS jobs, cruise ship jobs, RoRo jobs, dredger jobs, heavy lift vessel jobs, " +
  // Russian
  "вакансии для моряков, работа на судне, работа в море, работа моряком, работа моряком без опыта, крюинг вакансии, крюинговые компании, свежие вакансии для моряков, вакансии моряк, работа матрос, вакансии матрос АБ, вакансии моторист, вакансии боцман, вакансии повар на судно, работа механик на судне, вакансии второй механик, вакансии старший механик, вакансии капитан, вакансии старпом, вакансии электромеханик ЭТО, морской кадет вакансии, работа на танкере, работа на контейнеровозе, вакансии на балкер, работа на оффшоре, работа на круизном лайнере, зарплата моряка, " +
  // Ukrainian
  "робота для моряків, вакансії моряк, робота моряком, робота моряком без досвіду, робота в морі, робота на судні, крюїнг вакансії, крюїнгові компанії, свіжі вакансії для моряків, вакансії матрос, вакансії механік судно, вакансії на танкер, " +
  // Polish
  "praca dla marynarzy, praca na statku, praca na morzu, oferty pracy marynarz, praca marynarz bez doświadczenia, crewing oferty pracy, praca oficer pokładowy, praca mechanik okrętowy, praca kucharz na statku, praca na tankowcu, praca na kontenerowcu, praca marynarz zarobki, " +
  // Romanian
  "joburi pentru marinari, locuri de munca marinari, angajari marinari, joburi pe vapor, munca pe mare, agentii crewing romania, joburi ofiter maritim, joburi mecanic naval, marinar fara experienta, salariu marinar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const meta = SITE_META[locale];

  return {
    title: meta.title,
    description: meta.description,
    keywords: KEYWORDS,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
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
      canonical: canonicalUrl("/jobs", locale),
      languages: hreflangAlternates("/jobs"),
    },
  };
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
