import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { OG_LOCALE, alternateOgLocales, contentCanonicalUrl, contentHreflangAlternates } from "@/lib/seo";
import { slugId, extractId } from "@/lib/slug";
import { RANK_LANDINGS, RANK_COPY, rankName } from "@/lib/rankLandings";
import { getSalaryStats } from "@/lib/salaryStatsCached";
import { buildSalaryContext, type SalaryContext, type StatVacancy } from "@/lib/salaryStats";
import type { Lang } from "@/lib/i18n";
import VacancyDetailClient, { type VacancyDetail, type RelatedGuide } from "./client";

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
    .select("id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, description, views_count, created_at, is_imported, source_url, contact_email, contact_phone, country, region, city, postal_code, valid_through, companies(id, name, logo_url, location, website, is_verified)")
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
  // Vacancy text is English-only, so pl/ro are duplicates → consolidate them
  // onto the English canonical and keep the hreflang cluster to en/ru/ua.
  const languages = contentHreflangAlternates(path);
  const canonical = contentCanonicalUrl(path, locale);

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

// Guide tags worth surfacing next to a vacancy, most specific first. The rank
// and vessel decide which specialised guides come before the evergreen ones, so
// an engine job on an offshore vessel leads with Engine + Offshore rather than
// the generic salary explainer.
function guideTagPriority(rank: string | null, vesselType: string | null, title: string): string[] {
  const s = `${rank ?? ""} ${vesselType ?? ""} ${title}`.toLowerCase();
  const tags: string[] = [];
  if (/engineer|motorman|fitter|oiler|wiper|eto|electr/.test(s)) tags.push("Engine");
  if (/offshore|ahts|psv|osv|dp\b|rig|drill|supply/.test(s)) tags.push("Offshore");
  if (/cruise|passenger|ferry|ro-pax/.test(s)) tags.push("Cruise");
  if (/cadet|trainee/.test(s)) tags.push("Career");
  if (/tanker|lng|lpg|gas|chemical|oil/.test(s)) tags.push("Fleets");
  // Evergreen fallbacks — relevant to every posting.
  tags.push("Salaries", "Contracts", "CV", "Documents", "Safety", "Health");
  return tags;
}

async function fetchRelatedGuides(
  rank: string | null,
  vesselType: string | null,
  title: string,
): Promise<RelatedGuide[]> {
  const { data } = await getAdminClient()
    .from("news_articles")
    .select("id, title, tag, cover_url, cover_gradient")
    .eq("category", "guide")
    .eq("is_published", true)
    .limit(60);
  if (!data?.length) return [];

  const priority = guideTagPriority(rank, vesselType, title);
  const rankOf = (tag: string | null) => {
    const i = priority.indexOf(tag ?? "");
    return i === -1 ? priority.length : i;
  };
  return [...data]
    .sort((a, b) => rankOf(a.tag) - rankOf(b.tag))
    .slice(0, 3)
    .map((g) => ({
      id: g.id,
      title: (g.title ?? {}) as Record<string, string>,
      tag: g.tag,
      coverUrl: g.cover_url ?? null,
      coverGradient: g.cover_gradient ?? null,
    }));
}

export default async function VacancyPage(
  { params }: { params: Promise<{ id: string; locale: string }> }
) {
  const { id, locale } = await params;
  const vacancy = await fetchVacancy(id);
  // Old/deleted vacancy links (still indexed by Google, or shared before the
  // listing was removed) send the visitor to the job board instead of a 404 —
  // keeping their locale (English has no prefix under localePrefix "as-needed").
  if (!vacancy) redirect(locale === "en" ? "/jobs" : `/${locale}/jobs`);

  const company = vacancy.companies;

  // Our own analysis layered on top of the listing: where this offer sits in
  // the portal-wide range for its rank × fleet, what the rank actually does,
  // and the guides worth reading before applying. Imported postings otherwise
  // carry nothing but the agency's own text.
  const [salaryStats, relatedGuides] = await Promise.all([
    getSalaryStats(),
    fetchRelatedGuides(vacancy.rank, vacancy.vessel_type, vacancy.title),
  ]);
  const salaryContext: SalaryContext | null = buildSalaryContext(salaryStats, {
    rank: vacancy.rank,
    vessel_type: vacancy.vessel_type,
    title: vacancy.title,
    salary_from: vacancy.salary_from,
    salary_to: vacancy.salary_to,
    salary_period: vacancy.salary_period,
    currency: vacancy.currency,
  } as StatVacancy);

  // One-sentence role description, already written per locale in rankLandings.
  // (Named `rankInfo` — `rankLanding` is taken further down by the breadcrumbs.)
  const rankInfo = RANK_LANDINGS.find((r) => r.rank === vacancy.rank) ?? null;
  const rankBlurb = rankInfo?.blurb?.[locale as Lang] ?? rankInfo?.blurb?.en ?? null;

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
    // Per-vacancy social card, so the listing carries an indexable image.
    "image": `${BASE_URL}/jobs/${slugId(vacancy.title, vacancy.id)}/opengraph-image`,
  };

  // Always emit baseSalary — Google flags "missing field baseSalary" otherwise.
  // Google wants either a single `value` or a complete `minValue`+`maxValue`
  // pair. Providing only one bound triggers a "missing maxValue" warning, so
  // when just one number is set we emit it as a single `value`. When no salary
  // is given at all (common for scraped/imported vacancies), we fall back to a
  // nominal 1 USD placeholder so the structured data stays valid — the visible
  // card shows no salary, so no "$1" is displayed to seafarers.
  {
    const hasRange = vacancy.salary_from && vacancy.salary_to;
    const single = vacancy.salary_from ?? vacancy.salary_to;
    const hasAny = vacancy.salary_from || vacancy.salary_to;
    jsonLd["baseSalary"] = {
      "@type": "MonetaryAmount",
      "currency": hasAny ? vacancy.currency : "USD",
      "value": {
        "@type": "QuantitativeValue",
        ...(hasRange
          ? { "minValue": vacancy.salary_from, "maxValue": vacancy.salary_to }
          : hasAny
          ? { "value": single }
          : { "minValue": 1, "maxValue": 1 }),
        "unitText": vacancy.salary_period === "day" ? "DAY" : "MONTH",
      },
    };
  }

  // Breadcrumb: Home › Vacancies › [rank landing, if any] › this vacancy.
  const lang = locale as Lang;
  const copy = RANK_COPY[lang] ?? RANK_COPY.en;
  const path = `/jobs/${slugId(vacancy.title, vacancy.id)}`;
  const rankLanding = vacancy.rank ? RANK_LANDINGS.find((r) => r.rank === vacancy.rank) : undefined;
  const crumbItems = [
    { name: copy.home, url: `${BASE_URL}${locale === "en" ? "" : `/${locale}`}/` },
    { name: copy.jobsCrumb, url: `${BASE_URL}${locale === "en" ? "" : `/${locale}`}/jobs` },
    ...(rankLanding
      ? [{ name: rankName(rankLanding, lang), url: `${BASE_URL}${locale === "en" ? "" : `/${locale}`}/jobs/rank/${rankLanding.slug}` }]
      : []),
    { name: vacancy.title, url: `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${path}` },
  ];
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbItems.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <VacancyDetailClient
        vacancy={vacancy}
        salaryContext={salaryContext}
        rankBlurb={rankBlurb}
        rankSlug={rankInfo?.slug ?? null}
        relatedGuides={relatedGuides}
      />
    </>
  );
}
