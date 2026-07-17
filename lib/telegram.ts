// Read a public Telegram channel's web preview (t.me/s/<handle>) server-side.
// Telegram renders the last ~20 posts as static HTML with no auth, so a plain
// fetch with a browser User-Agent is enough — no bot token, no API key.
// Used by the automated collector cron and the admin tg-probe diagnostic.

export type TelegramPost = {
  id: number | null;      // post number (from the data-post="handle/123" attr)
  url: string | null;     // permalink, e.g. https://t.me/handle/123
  text: string;           // plain-text message body
};

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
  "Accept-Language": "en,ru;q=0.8",
};

function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Fetch the recent posts of a public channel. Throws on network/HTTP failure. */
export async function fetchTelegramPosts(handle: string): Promise<TelegramPost[]> {
  const clean = handle.trim().replace(/^@/, "").replace(/\s+/g, "");
  if (!/^[A-Za-z0-9_]{3,64}$/.test(clean)) throw new Error("bad_handle");

  const res = await fetch(`https://t.me/s/${clean}`, {
    headers: BROWSER_HEADERS,
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`telegram_${res.status}`);
  const html = await res.text();

  // Each post is a <div class="tgme_widget_message ..." data-post="handle/123">
  // wrapping a <div class="tgme_widget_message_text ...">body</div>.
  const posts: TelegramPost[] = [];
  const blockRe = /<div class="tgme_widget_message[ "][\s\S]*?(?=<div class="tgme_widget_message[ "]|$)/g;
  const blocks = html.match(blockRe) ?? [];

  for (const block of blocks) {
    const idMatch = block.match(/data-post="[^"/]+\/(\d+)"/);
    const textMatch = block.match(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/);
    const text = textMatch ? htmlToText(textMatch[1]) : "";
    if (!text) continue;
    const id = idMatch ? Number(idMatch[1]) : null;
    posts.push({
      id,
      url: id ? `https://t.me/${clean}/${id}` : null,
      text,
    });
  }

  // Fallback: if block splitting missed everything, grab all text divs.
  if (posts.length === 0) {
    const all = [...html.matchAll(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/g)];
    for (const m of all) {
      const text = htmlToText(m[1]);
      if (text) posts.push({ id: null, url: null, text });
    }
  }

  return posts;
}
