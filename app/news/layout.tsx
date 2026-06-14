export const metadata = {
  title: "Maritime News for Seafarers — Industry, Regulations, Salaries | SeaJobs.pro",
  description:
    "Latest maritime news for seafarers: STCW regulations, officer salaries, crew shortages, vessel safety. / Свежие морские новости для моряков: регуляции STCW, зарплаты офицеров, нехватка экипажей, безопасность судов.",
  keywords:
    "maritime news, seafarer news, shipping news, crew news, maritime industry updates, " +
    "морские новости, новости для моряков, новости судоходства, новости крюинга, " +
    "новини для моряків, wiadomości morskie",
  openGraph: {
    title: "Maritime News for Seafarers | SeaJobs.pro",
    description:
      "Latest maritime news for seafarers. / Свежие морские новости для моряков.",
    type: "website",
    siteName: "SeaJobs.pro",
    locale: "en_US",
    alternateLocale: ["ru_RU", "uk_UA", "pl_PL"],
  },
  twitter: {
    card: "summary",
    title: "Maritime News for Seafarers | SeaJobs.pro",
    description: "Latest maritime news for seafarers.",
  },
  alternates: {
    canonical: "https://seajobs.pro/news",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
