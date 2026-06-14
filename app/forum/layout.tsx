export const metadata = {
  title: "Seafarers Forum — Maritime Community, Jobs & Crewing Discussions | SeaJobs.pro",
  description:
    "Join the seafarers community: discuss crewing agencies, contracts, vessels, salaries and life at sea. / Сообщество моряков: обсуждение крюинговых агентств, контрактов, судов, зарплат и жизни в море.",
  keywords:
    "seafarers forum, maritime forum, crew community, sailor discussions, crewing agencies reviews, " +
    "форум моряков, морской форум, обсуждение крюинга, отзывы о крюинговых агентствах, жизнь в море, " +
    "форум моряків, forum marynarzy",
  openGraph: {
    title: "Seafarers Forum — Maritime Community | SeaJobs.pro",
    description:
      "Join the seafarers community. / Сообщество моряков — обсуждения и отзывы.",
    type: "website",
    siteName: "SeaJobs.pro",
    locale: "en_US",
    alternateLocale: ["ru_RU", "uk_UA", "pl_PL"],
  },
  twitter: {
    card: "summary",
    title: "Seafarers Forum — Maritime Community | SeaJobs.pro",
    description: "Join the seafarers community.",
  },
  alternates: {
    canonical: "https://seajobs.pro/forum",
  },
};

export default function ForumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
