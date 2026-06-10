import { createClient } from "@supabase/supabase-js";
import type { MetadataRoute } from "next";
import { NEWS } from "@/lib/data";

const BASE = "https://seajobs.pro";

export const revalidate = 3600; // regenerate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,               lastModified: new Date(), changeFrequency: "daily",  priority: 1.0 },
    { url: `${BASE}/jobs`,     lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE}/forum`,    lastModified: new Date(), changeFrequency: "daily",  priority: 0.7 },
    { url: `${BASE}/news`,     lastModified: new Date(), changeFrequency: "daily",  priority: 0.7 },
  ];

  const newsRoutes: MetadataRoute.Sitemap = NEWS.map((n) => ({
    url: `${BASE}/news/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  try {
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const [{ data: vacancies }, { data: topics }] = await Promise.all([
      admin
        .from("vacancies")
        .select("id, updated_at, created_at")
        .eq("is_active", true)
        .order("created_at", { ascending: false }),
      admin
        .from("forum_topics")
        .select("id, updated_at, created_at")
        .order("created_at", { ascending: false }),
    ]);

    const vacancyRoutes: MetadataRoute.Sitemap = (vacancies ?? []).map((v) => ({
      url: `${BASE}/jobs/${v.id}`,
      lastModified: new Date(v.updated_at ?? v.created_at),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const forumRoutes: MetadataRoute.Sitemap = (topics ?? []).map((t) => ({
      url: `${BASE}/forum/${t.id}`,
      lastModified: new Date(t.updated_at ?? t.created_at),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...newsRoutes, ...vacancyRoutes, ...forumRoutes];
  } catch {
    return [...staticRoutes, ...newsRoutes];
  }
}
