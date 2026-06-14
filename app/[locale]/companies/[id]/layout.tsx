import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from("companies")
    .select("name, location, description")
    .eq("id", id)
    .single();

  if (!data?.name) return { title: "Company | SeaJobs.pro" };

  const title = `${data.name}${data.location ? ` — ${data.location}` : ""} | SeaJobs.pro`;
  const description = (data.description ?? "").trim().slice(0, 160)
    || `${data.name} on SeaJobs.pro — open vacancies and company profile for seafarers.`;

  const languages = hreflangAlternates(`/companies/${id}`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "SeaJobs.pro",
      url: languages[locale],
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: languages[locale],
      languages,
    },
  };
}

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
