export const metadata = {
  title: "About SeaJobs.pro — Maritime Career Platform for Seafarers | SeaJobs.pro",
  description:
    "SeaJobs.pro connects seafarers with verified crewing agencies across Europe and worldwide. / SeaJobs.pro соединяет моряков с проверенными крюинговыми агентствами по всей Европе и миру.",
  keywords:
    "about SeaJobs, maritime job board, seafarer platform, crewing platform, " +
    "о SeaJobs, морская платформа, платформа для моряков, крюинговая платформа, " +
    "о нас, про нас",
  openGraph: {
    title: "About SeaJobs.pro — Maritime Career Platform | SeaJobs.pro",
    description:
      "Connecting seafarers with verified crewing agencies worldwide. / Соединяем моряков с проверенными крюинговыми агентствами.",
    type: "website",
    siteName: "SeaJobs.pro",
    locale: "en_US",
    alternateLocale: ["ru_RU", "uk_UA", "pl_PL"],
  },
  twitter: {
    card: "summary",
    title: "About SeaJobs.pro — Maritime Career Platform",
    description: "Connecting seafarers with verified crewing agencies worldwide.",
  },
  alternates: {
    canonical: "https://seajobs.pro/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
