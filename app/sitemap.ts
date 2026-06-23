import { createClient } from "@supabase/supabase-js";
import type { MetadataRoute } from "next";
import { NEWS } from "@/lib/data";
import { hreflangAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { slugId } from "@/lib/slug";

const BASE = "https://seajobs.pro";

// Resolve a localized (or plain) title field to a string for slug building.
function locTitle(field: unknown): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    const obj = field as Record<string, unknown>;
    const v = obj.en ?? obj.ru ?? obj.uk ?? Object.values(obj)[0];
    return typeof v === "string" ? v : "";
  }
  return "";
}

export const revalidate = 3600; // regenerate sitemap every hour

function localizedEntries(
  pathname: string,
  opts: { lastModified: Date; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }
): MetadataRoute.Sitemap {
  // hreflang map is keyed by language tag ("uk" for the /ua route), so we can't
  // look up the per-locale URL by routing locale. Build each <loc> from the
  // localized pathname directly to guarantee a valid absolute URL.
  const languages = hreflangAlternates(pathname);
  return routing.locales.map((locale) => ({
    url: `${BASE}${getPathname({ locale, href: pathname })}`,
    lastModified: opts.lastModified,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    ...localizedEntries("/", { lastModified: now, changeFrequency: "daily", priority: 1.0 }),
    ...localizedEntries("/jobs", { lastModified: now, changeFrequency: "hourly", priority: 0.9 }),
    ...localizedEntries("/forum", { lastModified: now, changeFrequency: "daily", priority: 0.7 }),
    ...localizedEntries("/news", { lastModified: now, changeFrequency: "daily", priority: 0.7 }),
    ...localizedEntries("/about", { lastModified: now, changeFrequency: "monthly", priority: 0.5 }),
    ...localizedEntries("/for-companies", { lastModified: now, changeFrequency: "monthly", priority: 0.6 }),
    ...localizedEntries("/terms", { lastModified: now, changeFrequency: "yearly", priority: 0.3 }),
    ...localizedEntries("/privacy", { lastModified: now, changeFrequency: "yearly", priority: 0.3 }),
  ];

  const newsRoutes: MetadataRoute.Sitemap = NEWS.flatMap((n) =>
    localizedEntries(`/news/${n.slug}`, {
      lastModified: new Date(n.date),
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  try {
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const [{ data: vacancies }, { data: topics }, { data: companies }] = await Promise.all([
      admin
        .from("vacancies")
        .select("id, title, updated_at, created_at")
        .eq("is_active", true)
        .or(`joining_date.is.null,joining_date.gte.${new Date(now.getTime() - 14 * 864e5).toISOString().slice(0, 10)}`)
        .order("created_at", { ascending: false }),
      admin
        .from("forum_topics")
        .select("id, title, updated_at, created_at")
        .order("created_at", { ascending: false }),
      admin
        .from("companies")
        .select("id, updated_at")
        .order("updated_at", { ascending: false }),
    ]);

    const vacancyRoutes: MetadataRoute.Sitemap = (vacancies ?? []).flatMap((v) =>
      localizedEntries(`/jobs/${slugId(locTitle(v.title), v.id)}`, {
        lastModified: new Date(v.updated_at ?? v.created_at),
        changeFrequency: "weekly",
        priority: 0.8,
      })
    );

    const forumRoutes: MetadataRoute.Sitemap = (topics ?? []).flatMap((t) =>
      localizedEntries(`/forum/${slugId(locTitle(t.title), t.id)}`, {
        lastModified: new Date(t.updated_at ?? t.created_at),
        changeFrequency: "weekly",
        priority: 0.6,
      })
    );

    const companyRoutes: MetadataRoute.Sitemap = (companies ?? []).flatMap((c) =>
      localizedEntries(`/companies/${c.id}`, {
        lastModified: c.updated_at ? new Date(c.updated_at) : now,
        changeFrequency: "weekly",
        priority: 0.5,
      })
    );

    return [...staticRoutes, ...newsRoutes, ...vacancyRoutes, ...forumRoutes, ...companyRoutes];
  } catch {
    return [...staticRoutes, ...newsRoutes];
  }
}
