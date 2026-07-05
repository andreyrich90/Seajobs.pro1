import type { MetadataRoute } from "next";

// Private areas stay out of every index; public pages are open to all crawlers.
const DISALLOW = [
  "/seafarer/", "/company/", "/admin/", "/auth/",
  "/*/seafarer/", "/*/company/", "/*/admin/",
];

// AI search / assistant crawlers, listed explicitly so our welcome is
// unambiguous — these bots decide whether the site gets cited in ChatGPT /
// Perplexity / Gemini answers (chatgpt.com is already a top GA4 source).
const AI_BOTS = [
  "GPTBot",          // OpenAI
  "OAI-SearchBot",   // ChatGPT Search
  "ChatGPT-User",    // ChatGPT browsing on user request
  "PerplexityBot",   // Perplexity
  "ClaudeBot",       // Anthropic
  "Google-Extended", // Gemini
  "Bingbot",         // Bing (feeds the ChatGPT Search index)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_BOTS.map((bot) => ({ userAgent: bot, allow: "/", disallow: DISALLOW })),
    ],
    sitemap: "https://seajobs.pro/sitemap.xml",
  };
}
