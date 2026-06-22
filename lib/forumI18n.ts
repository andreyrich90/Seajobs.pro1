// Shared helpers for translating forum topics into all supported languages.
export const LANGS = ["en", "ru", "ua", "pl"] as const;
export type Lang = (typeof LANGS)[number];

const LANG_NAME: Record<Lang, string> = {
  en: "English",
  ru: "Russian",
  ua: "Ukrainian",
  pl: "Polish",
};

export const asText = (v: unknown) => (typeof v === "string" && v.trim() ? v : "");

// Normalize a title/content field to a { lang: text } object.
// Plain strings are assumed Russian (legacy UI-created topics were stored so).
export function normObj(field: unknown): Record<string, string> {
  if (typeof field === "string") return field.trim() ? { ru: field } : {};
  if (field && typeof field === "object") {
    const obj = { ...(field as Record<string, string>) };
    if (obj.uk && !obj.ua) obj.ua = obj.uk; // legacy "uk" → "ua"
    return obj;
  }
  return {};
}

// Translate a forum post's title + body into the target language via Anthropic.
// Uses a delimiter format (not JSON) so long Markdown bodies with quotes/newlines
// can't break parsing.
export async function translateText(
  apiKey: string,
  lang: Lang,
  title: string,
  content: string,
): Promise<{ title: string; content: string }> {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8000,
      system:
        `You translate content for a maritime job board into ${LANG_NAME[lang]}. ` +
        `Preserve meaning, tone and any Markdown formatting/headings. ` +
        `Output EXACTLY this format and nothing else (no preamble, no code fences):\n` +
        `<<<TITLE>>>\n{translated title on one line}\n<<<CONTENT>>>\n{translated body}`,
      messages: [{ role: "user", content: `<<<TITLE>>>\n${title}\n<<<CONTENT>>>\n${content}` }],
    }),
  });
  if (!r.ok) throw new Error(`Anthropic ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const data = await r.json();
  let text: string = (data.content ?? []).map((b: { text?: string }) => b.text ?? "").join("").trim();
  text = text.replace(/^```[a-z]*\n?/i, "").replace(/```$/i, "").trim();

  const tIdx = text.indexOf("<<<TITLE>>>");
  const cIdx = text.indexOf("<<<CONTENT>>>");
  if (tIdx !== -1 && cIdx !== -1 && cIdx > tIdx) {
    return {
      title: text.slice(tIdx + "<<<TITLE>>>".length, cIdx).trim() || title,
      content: text.slice(cIdx + "<<<CONTENT>>>".length).trim() || content,
    };
  }
  // Fallback: keep originals if the model didn't follow the format.
  return { title, content };
}
