// Shared helpers for translating forum topics into all supported languages.
export const LANGS = ["en", "ru", "ua", "pl", "ro"] as const;
export type Lang = (typeof LANGS)[number];

const LANG_NAME: Record<Lang, string> = {
  en: "English",
  ru: "Russian",
  ua: "Ukrainian",
  pl: "Polish",
  ro: "Romanian",
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
//
// `complete` is false when the answer cannot be trusted as a translation: the
// model ran out of tokens mid-body, or ignored the format and the originals came
// back instead. A caller that stores the result as "translated" should refuse
// it then — saved, a cut-off article or an English copy under another language
// counts as done and is never retried.
export async function translateText(
  apiKey: string,
  lang: Lang,
  title: string,
  content: string,
): Promise<{ title: string; content: string; complete: boolean }> {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      // A handbook article runs to ~15k characters; in Cyrillic that is more
      // than 8000 tokens, which used to cut the translation off mid-text.
      max_tokens: 16000,
      system:
        `You translate content for a maritime job board into ${LANG_NAME[lang]}. ` +
        `Preserve meaning, tone and any Markdown formatting/headings. ` +
        `Keep every link target — the URL inside the parentheses — exactly as it is, ` +
        `and keep the markers some lines start with (::, !!, ??, =>) unchanged. ` +
        `Output EXACTLY this format and nothing else (no preamble, no code fences):\n` +
        `<<<TITLE>>>\n{translated title on one line}\n<<<CONTENT>>>\n{translated body}`,
      messages: [{ role: "user", content: `<<<TITLE>>>\n${title}\n<<<CONTENT>>>\n${content}` }],
    }),
  });
  if (!r.ok) throw new Error(`Anthropic ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const data = await r.json();
  let text: string = (data.content ?? []).map((b: { text?: string }) => b.text ?? "").join("").trim();
  text = text.replace(/^```[a-z]*\n?/i, "").replace(/```$/i, "").trim();
  const truncated = data.stop_reason === "max_tokens";

  const tIdx = text.indexOf("<<<TITLE>>>");
  const cIdx = text.indexOf("<<<CONTENT>>>");
  if (tIdx !== -1 && cIdx !== -1 && cIdx > tIdx) {
    const t = text.slice(tIdx + "<<<TITLE>>>".length, cIdx).trim();
    const c = text.slice(cIdx + "<<<CONTENT>>>".length).trim();
    return { title: t || title, content: c || content, complete: !truncated && !!t && !!c };
  }
  // Fallback: keep originals if the model didn't follow the format.
  return { title, content, complete: false };
}
