// Turning the request form's one "phone or Telegram" box into links the
// operator can tap the moment a payment lands.
//
// The box is free text, so it holds whatever people type: "+380 50 123 45 67",
// "@ivan_master", "t.me/ivan_master", "0048 600 100 200", or two of those at
// once. Pure, so the parsing is checked without a database or a bot.
//
// Links are https only. Telegram's sendMessage accepts http(s) and tg:// in a
// message, and refuses the whole message for anything else (viber:// included),
// so a convenience link must never be able to cost the operator the payment
// notice itself.

export type Contact = {
  /** Telegram username without the @. */
  telegram: string | null;
  /** Digits only, international, without the +. Null when the number has no country code. */
  phone: string | null;
  /** What was typed, for display. */
  raw: string;
};

const HANDLE = /^[A-Za-z][A-Za-z0-9_]{4,31}$/;

export function parseContact(input: string | null | undefined): Contact {
  const raw = (input ?? "").trim();
  let telegram: string | null = null;
  let phone: string | null = null;

  const link = /(?:https?:\/\/)?(?:t(?:elegram)?\.me)\/@?([A-Za-z][A-Za-z0-9_]{4,31})/i.exec(raw);
  const at = /(?:^|[\s,;(])@([A-Za-z][A-Za-z0-9_]{4,31})\b/.exec(raw);
  if (link) telegram = link[1];
  else if (at) telegram = at[1];
  else if (HANDLE.test(raw) && !/\d{5,}/.test(raw)) telegram = raw;

  // The first run of digits long enough to be a phone number, with the + or
  // 00 in front of it if there was one.
  const num = /(\+|00)?\s*\(?\d[\d\s().-]{6,}\d/.exec(raw.replace(/(?:https?:\/\/)?t(?:elegram)?\.me\/\S+/gi, ""));
  if (num) {
    const digits = num[0].replace(/\D/g, "");
    const intl = num[1] === "+" ? digits : num[1] === "00" ? digits.slice(2) : null;
    // Without a country code the number cannot be turned into a link: "0501234567"
    // is Ukrainian or Polish or something else, and a guess that dials a
    // stranger is worse than no button.
    if (intl && intl.length >= 9 && intl.length <= 15) phone = intl;
  }

  return { telegram, phone, raw };
}

/** HTML lines for the operator's Telegram message. `esc` is the bot's escaper. */
export function contactLines(c: Contact, esc: (s: string) => string, linkedChatId?: number | string | null): string[] {
  const out: string[] = [];
  if (c.telegram) out.push(`✈️ Telegram: <a href="https://t.me/${c.telegram}">@${esc(c.telegram)}</a>`);
  if (c.phone) {
    out.push(`📞 +${c.phone} — <a href="https://t.me/+${c.phone}">Telegram</a> · <a href="https://wa.me/${c.phone}">WhatsApp</a>`);
  } else if (c.raw && !c.telegram) {
    out.push(`📞 ${esc(c.raw)}`);
  }
  // The seafarer's own account, when they connected it to the bot from the
  // cabinet. A tg:// mention opens their profile in most clients; their
  // privacy settings decide whether it does.
  if (linkedChatId) out.push(`🤖 Підключений до бота: <a href="tg://user?id=${linkedChatId}">відкрити профіль</a>`);
  return out;
}
