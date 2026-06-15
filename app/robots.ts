import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/seafarer/", "/company/", "/admin/", "/auth/",
          "/*/seafarer/", "/*/company/", "/*/admin/",
        ],
      },
    ],
    sitemap: "https://seajobs.pro/sitemap.xml",
  };
}
