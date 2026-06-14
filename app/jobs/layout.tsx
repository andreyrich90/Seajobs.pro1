export const metadata = {
  title: "Seafarer Jobs & Vacancies — Search by Rank, Vessel Type | SeaJobs.pro",
  description: "Browse maritime job vacancies for all ranks and vessel types — Captains, Officers, Engineers, Ratings. / Вакансии для моряков всех рангов и типов судов — поиск по рангу, типу судна и зарплате.",
  keywords: "seafarer jobs, maritime vacancies, crew jobs, ship vacancies, jobs for seamen, able seaman jobs, chief officer jobs, chief engineer jobs, deck cadet jobs, crewing agency jobs, " +
    "вакансии для моряков, работа на судне, работа в море, крюинг вакансии, вакансии моряк, работа матрос, работа механик на судне, " +
    "робота для моряків, вакансії моряк",
  openGraph: {
    title: "Seafarer Jobs & Vacancies — Search by Rank, Vessel Type | SeaJobs.pro",
    description: "Browse maritime job vacancies for all ranks and vessel types. / Вакансии для моряков всех рангов и типов судов.",
    type: "website",
    siteName: "SeaJobs.pro",
    locale: "en_US",
    alternateLocale: ["ru_RU", "uk_UA", "pl_PL"],
  },
  twitter: {
    card: "summary",
    title: "Seafarer Jobs & Vacancies — Search by Rank, Vessel Type | SeaJobs.pro",
    description: "Browse maritime job vacancies for all ranks and vessel types.",
  },
  alternates: {
    canonical: "https://seajobs.pro/jobs",
  },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
