// The two lines a news card shows under its title, worked out from the article
// body. Shared by the home page's server component, which prepares its
// database articles before they reach the browser, and HomeClient, which does
// the same for the static editorial in lib/data.ts.

export function newsExcerpt(text: string, max = 120): string {
  const clean = text.replace(/^#{1,6}\s.*$/gm, "").replace(/[#*_>`]/g, "").replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).replace(/\s+\S*$/, "") + "…" : clean;
}

export function newsReadMins(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
