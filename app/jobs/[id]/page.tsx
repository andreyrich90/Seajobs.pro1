import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import VacancyDetailClient, { type VacancyDetail } from "./client";

type VacancyFull = VacancyDetail & { is_imported: boolean; source_url: string | null };

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
    .select("id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, views_count, created_at, is_imported, source_url, companies(id, name, logo_url, location, website, is_verified)")
    .eq("id", id)
    .single();
  return (data as VacancyFull | null);
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "SeaJobs.pro",
      url: `${BASE_URL}/jobs/${vacancy.id}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/jobs/${vacancy.id}`,
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

  // Skip Google for Jobs structured data for imported/aggregated vacancies
  let jsonLd: Record<string, unknown> | null = null;
  if (!vacancy.is_imported) {
    jsonLd = {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": vacancy.title,
      "description": vacancy.description
        ?? `${vacancy.rank ?? "Seafarer"} position${vacancy.vessel_type ? ` on ${vacancy.vessel_type}` : ""}.`,
      "datePosted": vacancy.created_at,
      "employmentType": "CONTRACT",
      "hiringOrganization": {
        "@type": "Organization",
        "name": company?.name ?? "SeaJobs.pro",
        ...(company?.website ? { "sameAs": company.website } : {}),
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": company?.location ?? "International Waters",
          "addressCountry": "International",
        },
      },
      "directApply": true,
      "url": `${BASE_URL}/jobs/${vacancy.id}`,
    };

    if (vacancy.joining_date) jsonLd["validThrough"] = vacancy.joining_date;

    if (vacancy.salary_from || vacancy.salary_to) {
      jsonLd["baseSalary"] = {
        "@type": "MonetaryAmount",
        "currency": vacancy.currency,
        "value": {
          "@type": "QuantitativeValue",
          ...(vacancy.salary_from ? { "minValue": vacancy.salary_from } : {}),
          ...(vacancy.salary_to ? { "maxValue": vacancy.salary_to } : {}),
          "unitText": "MONTH",
        },
      };
    }
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <VacancyDetailClient vacancy={vacancy} />
    </>
  );
}
