import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates } from "@/lib/seo";
import VacancyDetailClient, { type VacancyDetail } from "./client";

type VacancyFull = VacancyDetail & {
  is_imported: boolean;
  source_url: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  postal_code: string | null;
  valid_through: string | null;
};

const BASE_URL = "https://seajobs.pro";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

async function fetchVacancy(id: string): Promise<VacancyFull | null> {
  const { data } = await getAdminClient()
    .from("vacancies")
    .select("id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, views_count, created_at, is_imported, source_url, contact_email, country, region, city, postal_code, valid_through, companies(id, name, logo_url, location, website, is_verified)")
    .eq("id", id)
    .single();
  return (data as VacancyFull | null);
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string; locale: string }> }
): Promise<Metadata> {
  const { id, locale } = await params;
  const vacancy = await fetchVacancy(id);
  if (!vacancy) return { title: "Vacancy not found — SeaJobs.pro" };

  const company = vacancy.companies;
  const rankPart = vacancy.rank ? `${vacancy.rank} ` : "";
  const vesselPart = vacancy.vessel_type ? ` on ${vacancy.vessel_type}` : "";
  const locationPart = company?.location ? ` · ${company.location}` : "";
  const salaryPart =
    vacancy.salary_from && vacancy.salary_to
      ? ` Salary: ${vacancy.salary_from.toLocaleString()}–${vacancy.salary_to.toLocaleString()} ${vacancy.currency}.`
      : vacancy.salary_from
      ? ` Salary from ${vacancy.salary_from.toLocaleString()} ${vacancy.currency}.`
      : "";

  const title = `${vacancy.title}${company?.name ? ` — ${company.name}` : ""} | SeaJobs.pro`;
  const description = `${rankPart}position${vesselPart}${locationPart}.${salaryPart} Apply on SeaJobs.pro — the maritime job board for seafarers.`;
  const languages = hreflangAlternates(`/jobs/${vacancy.id}`);

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
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: languages[locale],
      languages,
    },
  };
}

export default async function VacancyPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const vacancy = await fetchVacancy(id);
  if (!vacancy) notFound();

  const company = vacancy.companies;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "identifier": {
      "@type": "PropertyValue",
      "name": "SeaJobs.pro",
      "value": vacancy.id,
    },
    "title": vacancy.title,
    "description": vacancy.description
      ?? `${vacancy.rank ?? "Seafarer"} position${vacancy.vessel_type ? ` on ${vacancy.vessel_type}` : ""}. Apply on SeaJobs.pro — maritime job board for seafarers.`,
    "datePosted": vacancy.created_at,
    // Prefer the company-set deadline; otherwise default to 60 days after posting.
    "validThrough": (() => {
      if (vacancy.valid_through) return new Date(vacancy.valid_through).toISOString();
      const expiry = new Date(vacancy.created_at);
      expiry.setDate(expiry.getDate() + 60);
      return expiry.toISOString();
    })(),
    "employmentType": "CONTRACTOR",
    "industry": "Maritime / Shipping",
    ...(vacancy.rank ? { "occupationalCategory": vacancy.rank } : {}),
    "hiringOrganization": {
      "@type": "Organization",
      "name": company?.name ?? "SeaJobs.pro",
      "sameAs": company?.website ?? BASE_URL,
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": vacancy.city ?? company?.location ?? "International Waters",
        ...(vacancy.region ? { "addressRegion": vacancy.region } : {}),
        ...(vacancy.postal_code ? { "postalCode": vacancy.postal_code } : {}),
        // addressCountry is required by Google; default to a sensible value.
        "addressCountry": vacancy.country ?? "INT",
      },
    },
    "directApply": true,
    "url": `${BASE_URL}/jobs/${vacancy.id}`,
  };

  if (vacancy.salary_from || vacancy.salary_to) {
    // Google wants either a single `value` or a complete `minValue`+`maxValue`
    // pair. Providing only one bound triggers a "missing maxValue" warning, so
    // when just one number is set we emit it as a single `value` instead.
    const hasRange = vacancy.salary_from && vacancy.salary_to;
    const single = vacancy.salary_from ?? vacancy.salary_to;
    jsonLd["baseSalary"] = {
      "@type": "MonetaryAmount",
      "currency": vacancy.currency,
      "value": {
        "@type": "QuantitativeValue",
        ...(hasRange
          ? { "minValue": vacancy.salary_from, "maxValue": vacancy.salary_to }
          : { "value": single }),
        "unitText": "MONTH",
      },
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VacancyDetailClient vacancy={vacancy} />
    </>
  );
}
