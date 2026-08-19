/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This app is a self-contained project inside a larger repo; pin the trace
  // root to its own folder so Next doesn't pick the repo-root lockfile.
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

module.exports = nextConfig;
