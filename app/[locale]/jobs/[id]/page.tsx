import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";
import { slugId, extractId } from "@/lib/slug";
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

// Map country names (as they appear in vacancy.country or company.location) to
// ISO 3166-1 alpha-2 codes. Google's JobPosting requires a valid country code
// in addressCountry — a placeholder like "INT" makes the posting invalid.
const COUNTRY_CODES: Record<string, string> = {
  poland: "PL", polska: "PL", gdynia: "PL", gdansk: "PL", gdańsk: "PL", szczecin: "PL", "gdynia, poland": "PL",
  ukraine: "UA", україна: "UA", odessa: "UA", odesa: "UA",
  germany: "DE", netherlands: "NL", holland: "NL", spain: "ES", hiszpania: "ES",
  "united kingdom": "GB", "great britain": "GB", england: "GB", scotland: "GB", aberdeen: "GB", uk: "GB",
  cyprus: "CY", greece: "GR", norway: "NO", denmark: "DK", sweden: "SE", finland: "FI",
  croatia: "HR", italy: "IT", france: "FR", portugal: "PT", latvia: "LV", lithuania: "LT", estonia: "EE",
  singapore: "SG", malta: "MT", liberia: "LR", panama: "PA", usa: "US", "united states": "US",
};

function resolveCountry(country: string | null, location: string | null): string {
  const raw = (country ?? "").trim();
  // Already stored as a valid 2-letter ISO code.
  if (/^[A-Za-z]{2}$/.test(raw)) return raw.toUpperCase();
  const hay = `${country ?? ""} ${location ?? ""}`.toLowerCase();
  for (const [name, code] of Object.entries(COUNTRY_CODES)) {
    if (hay.includes(name)) return code;
  }
  // Last resort: the crewing agencies on the board are Poland-based.
  return "PL";
}

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

async function fetchVacancy(param: string): Promise<VacancyFull | null> {
  const id = extractId(param) ?? param; // accept "<slug>-<uuid>" or bare id
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
  const path = `/jobs/${slugId(vacancy.title, vacancy.id)}`;
  const languages = hreflangAlternates(path);
  const canonical = canonicalUrl(path, locale);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "SeaJobs.pro",
      url: canonical,
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical,
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
        "addressLocality": vacancy.city ?? company?.location ?? "At sea",
        ...(vacancy.region ? { "addressRegion": vacancy.region } : {}),
        ...(vacancy.postal_code ? { "postalCode": vacancy.postal_code } : {}),
        // addressCountry must be a valid ISO 3166-1 alpha-2 code for Google.
        "addressCountry": resolveCountry(vacancy.country, company?.location ?? null),
      },
    },
    "directApply": true,
    "url": `${BASE_URL}/jobs/${slugId(vacancy.title, vacancy.id)}`,
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
