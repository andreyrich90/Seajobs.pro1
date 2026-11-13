const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    // Logos/photos/covers are free-text URLs (Supabase Storage uploads,
    // admin-pasted news covers, scraped vacancy source images) — there's no
    // fixed set of hosts to allowlist, so accept any HTTPS host.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    // Ukrainian moved from /uk to /ua — keep old (indexed) links working.
    return [
      { source: "/uk", destination: "/ua", permanent: true },
      { source: "/uk/:path*", destination: "/ua/:path*", permanent: true },
      // ads.txt is kept by Ezoic's Ads.txt Manager (account 19390) and served
      // from there, so the list of authorised sellers updates without a deploy.
      // The IAB spec allows one redirect to another domain. The static
      // public/ads.txt (the rejected AdSense line) was removed with this.
      {
        source: "/ads.txt",
        destination: "https://srv.adstxtmanager.com/19390/seajobs.pro",
        statusCode: 301,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
