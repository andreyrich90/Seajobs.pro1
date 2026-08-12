import { slugId } from "@/lib/slug";

// Our Telegram bot: the outbound half of the site's Telegram integration.
// (`lib/telegram.ts` is the unrelated inbound half — it scrapes other people's
// public channels for the vacancy collector, and needs no bot token.)
//
// Thin Telegram Bot API client plus the two message shapes the site sends:
// a job-alert DM to a seafarer and a vacancy post for the public channel.
//
// Everything here is best-effort by design. A vacancy import, a company
// publishing a job, or a cron run must never fail because Telegram was down or
// because the bot token isn't configured — the callers treat a false `ok` as
// "try again next sweep", not as an error.

const API = "https://api.telegram.org";

export const SITE = "https://seajobs.pro";

export type TgResult<T = unknown> = { ok: true; result: T } | { ok: false; error: string; blocked?: boolean };

function token(): string | null {
  return process.env.TELEGRAM_BOT_TOKEN?.trim() || null;
}

export function telegramConfigured(): boolean {
  return !!token();
}

/** Raw Bot API call. Never throws; a missing token is reported, not fatal. */
export async function tgApi<T = unknown>(method: string, payload: Record<string, unknown> = {}): Promise<TgResult<T>> {
  const t = token();
  if (!t) return { ok: false, error: "TELEGRAM_BOT_TOKEN not set" };

  try {
    const res = await fetch(`${API}/bot${t}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      result?: T;
      description?: string;
      error_code?: number;
    };
    if (res.ok && body.ok) return { ok: true, result: body.result as T };

    const error = `HTTP ${res.status}: ${body.description ?? "unknown error"}`;
    // 403 means the user blocked the bot or deleted the chat. That is not a
    // transient failure — the caller should stop writing to this chat id.
    const blocked = body.error_code === 403;
    if (!blocked) console.error(`[telegram] ${method} failed — ${error}`);
    return { ok: false, error, blocked };
  } catch (e) {
    const error = e instanceof Error ? e.message : "network error";
    console.error(`[telegram] ${method} threw — ${error}`);
    return { ok: false, error };
  }
}

/** Escapes the five characters Telegram's HTML parse mode cares about. */
export function esc(s: string | null | undefined): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function tgSend(
  chatId: string | number,
  html: string,
  opts: { buttonText?: string; buttonUrl?: string } = {},
): Promise<TgResult<{ message_id: number }>> {
  return tgApi<{ message_id: number }>("sendMessage", {
    chat_id: chatId,
    text: html,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
    ...(opts.buttonText && opts.buttonUrl
      ? { reply_markup: { inline_keyboard: [[{ text: opts.buttonText, url: opts.buttonUrl }]] } }
      : {}),
  });
}

/** The bot's @username, needed to build deep links. Cached — it never changes. */
let cachedUsername: string | null = null;
export async function botUsername(): Promise<string | null> {
  const configured = process.env.TELEGRAM_BOT_USERNAME?.trim().replace(/^@/, "");
  if (configured) return configured;
  if (cachedUsername) return cachedUsername;

  const me = await tgApi<{ username?: string }>("getMe");
  if (!me.ok || !me.result.username) return null;
  cachedUsername = me.result.username;
  return cachedUsername;
}

/* ── Copy ───────────────────────────────────────────────────────────────────
   Telegram messages are written per language rather than through lib/i18n's
   `T`: these strings are only ever rendered server-side, and the bot has to
   answer people who have never had a locale on the site (the /start of someone
   who found the channel first). */

export type TgLang = "en" | "ru" | "ua" | "pl" | "ro";

const LANGS: TgLang[] = ["en", "ru", "ua", "pl", "ro"];

/** Maps anything (a site locale, a Telegram `language_code`) onto our five. */
export function tgLang(raw: string | null | undefined): TgLang {
  const s = (raw ?? "").toLowerCase().slice(0, 2);
  if (s === "uk") return "ua"; // Telegram uses the ISO code, our URLs use /ua
  return (LANGS as string[]).includes(s) ? (s as TgLang) : "en";
}

export const TG_COPY: Record<TgLang, {
  linked: string;
  linkedHint: string;
  alreadyLinked: string;
  badCode: string;
  unlinked: string;
  notLinked: string;
  help: string;
  newJob: string;
  view: string;
  why: string;
  rank: string;
  vessel: string;
  salary: string;
  contract: string;
  joining: string;
  asap: string;
  perMonth: string;
  perDay: string;
  from: string;
  upTo: string;
}> = {
  en: {
    linked: "✅ Telegram connected.",
    linkedHint: "You will get a message here as soon as a vacancy matching your job alert is posted. Send /stop to turn it off.",
    alreadyLinked: "This Telegram account is already connected to a SeaJobs.pro profile.",
    badCode: "That link has expired. Open your SeaJobs.pro dashboard and press “Connect Telegram” again.",
    unlinked: "🔕 Disconnected. You will no longer get job alerts here.",
    notLinked: "This Telegram account is not connected to a SeaJobs.pro profile.",
    help: "I send job alerts from SeaJobs.pro.\n\nTo connect: open your dashboard on seajobs.pro and press “Connect Telegram”.\n/stop — turn alerts off.",
    newJob: "New vacancy for your rank",
    view: "Open vacancy",
    why: "You get this because of your job alert on SeaJobs.pro. /stop to turn it off.",
    rank: "Rank", vessel: "Vessel", salary: "Salary", contract: "Contract", joining: "Joining",
    asap: "ASAP", perMonth: "per month", perDay: "per day", from: "from", upTo: "up to",
  },
  ru: {
    linked: "✅ Telegram подключён.",
    linkedHint: "Как только появится вакансия по вашей подписке, пришлём сообщение сюда. Отключить — команда /stop.",
    alreadyLinked: "Этот аккаунт Telegram уже привязан к профилю на SeaJobs.pro.",
    badCode: "Ссылка устарела. Откройте кабинет на SeaJobs.pro и нажмите «Подключить Telegram» ещё раз.",
    unlinked: "🔕 Отключено. Уведомления о вакансиях сюда больше не придут.",
    notLinked: "Этот аккаунт Telegram не привязан к профилю на SeaJobs.pro.",
    help: "Я присылаю уведомления о вакансиях с SeaJobs.pro.\n\nЧтобы подключить: откройте кабинет на seajobs.pro и нажмите «Подключить Telegram».\n/stop — отключить уведомления.",
    newJob: "Новая вакансия по вашей должности",
    view: "Открыть вакансию",
    why: "Это уведомление по вашей подписке на SeaJobs.pro. Отключить — /stop.",
    rank: "Должность", vessel: "Тип судна", salary: "Зарплата", contract: "Контракт", joining: "Посадка",
    asap: "ASAP", perMonth: "в месяц", perDay: "в сутки", from: "от", upTo: "до",
  },
  ua: {
    linked: "✅ Telegram підключено.",
    linkedHint: "Щойно з’явиться вакансія за вашою підпискою, надішлемо повідомлення сюди. Вимкнути — команда /stop.",
    alreadyLinked: "Цей акаунт Telegram уже прив’язано до профілю на SeaJobs.pro.",
    badCode: "Посилання застаріло. Відкрийте кабінет на SeaJobs.pro і натисніть «Підключити Telegram» ще раз.",
    unlinked: "🔕 Вимкнено. Сповіщення про вакансії сюди більше не надходитимуть.",
    notLinked: "Цей акаунт Telegram не прив’язано до профілю на SeaJobs.pro.",
    help: "Я надсилаю сповіщення про вакансії з SeaJobs.pro.\n\nЩоб підключити: відкрийте кабінет на seajobs.pro і натисніть «Підключити Telegram».\n/stop — вимкнути сповіщення.",
    newJob: "Нова вакансія за вашою посадою",
    view: "Відкрити вакансію",
    why: "Це сповіщення за вашою підпискою на SeaJobs.pro. Вимкнути — /stop.",
    rank: "Посада", vessel: "Тип судна", salary: "Зарплата", contract: "Контракт", joining: "Посадка",
    asap: "ASAP", perMonth: "на місяць", perDay: "на добу", from: "від", upTo: "до",
  },
  pl: {
    linked: "✅ Telegram połączony.",
    linkedHint: "Gdy pojawi się oferta zgodna z Twoim powiadomieniem, napiszemy tutaj. Wyłączenie — komenda /stop.",
    alreadyLinked: "To konto Telegram jest już połączone z profilem na SeaJobs.pro.",
    badCode: "Link wygasł. Otwórz panel na SeaJobs.pro i naciśnij „Połącz Telegram” ponownie.",
    unlinked: "🔕 Wyłączone. Nie będziesz już tu otrzymywać powiadomień o ofertach.",
    notLinked: "To konto Telegram nie jest połączone z profilem na SeaJobs.pro.",
    help: "Wysyłam powiadomienia o ofertach z SeaJobs.pro.\n\nAby połączyć: otwórz panel na seajobs.pro i naciśnij „Połącz Telegram”.\n/stop — wyłącz powiadomienia.",
    newJob: "Nowa oferta na Twoje stanowisko",
    view: "Otwórz ofertę",
    why: "To powiadomienie z Twojej subskrypcji na SeaJobs.pro. Wyłączenie — /stop.",
    rank: "Stanowisko", vessel: "Typ statku", salary: "Stawka", contract: "Kontrakt", joining: "Zaokrętowanie",
    asap: "ASAP", perMonth: "miesięcznie", perDay: "dziennie", from: "od", upTo: "do",
  },
  ro: {
    linked: "✅ Telegram conectat.",
    linkedHint: "De îndată ce apare un post care se potrivește abonării tale, îți scriem aici. Dezactivare — comanda /stop.",
    alreadyLinked: "Acest cont Telegram este deja conectat la un profil de pe SeaJobs.pro.",
    badCode: "Linkul a expirat. Deschide contul pe SeaJobs.pro și apasă din nou „Conectează Telegram”.",
    unlinked: "🔕 Dezactivat. Nu vei mai primi aici anunțuri de posturi.",
    notLinked: "Acest cont Telegram nu este conectat la un profil de pe SeaJobs.pro.",
    help: "Trimit anunțuri de posturi de pe SeaJobs.pro.\n\nPentru a conecta: deschide contul pe seajobs.pro și apasă „Conectează Telegram”.\n/stop — dezactivează anunțurile.",
    newJob: "Post nou pentru funcția ta",
    view: "Deschide anunțul",
    why: "Primești asta datorită abonării tale pe SeaJobs.pro. Dezactivare — /stop.",
    rank: "Funcție", vessel: "Tip navă", salary: "Salariu", contract: "Contract", joining: "Îmbarcare",
    asap: "ASAP", perMonth: "pe lună", perDay: "pe zi", from: "de la", upTo: "până la",
  },
};

/* ── Vacancy rendering ──────────────────────────────────────────────────── */

export type TgVacancy = {
  id: string;
  title: string;
  rank?: string | null;
  vessel_type?: string | null;
  salary_from?: number | null;
  salary_to?: number | null;
  salary_period?: string | null;
  currency?: string | null;
  contract_duration?: string | null;
  joining_date?: string | null;
  companies?: { name?: string | null } | null;
};

/**
 * Links carry the reader's locale. Sending a Russian-speaking channel to the
 * English page would undo the point of writing the post in Russian. English is
 * the unprefixed default (localePrefix: "as-needed"), same as on the site.
 */
export function vacancyUrl(v: Pick<TgVacancy, "id" | "title">, lang: TgLang = "en"): string {
  const prefix = lang === "en" ? "" : `/${lang}`;
  return `${SITE}${prefix}/jobs/${slugId(v.title, v.id)}`;
}

function money(v: TgVacancy, c: (typeof TG_COPY)[TgLang]): string | null {
  const cur = v.currency || "USD";
  const per = v.salary_period === "day" ? c.perDay : c.perMonth;
  const n = (x: number) => x.toLocaleString("en-US").replace(/,/g, " ");
  if (v.salary_from && v.salary_to && v.salary_from !== v.salary_to)
    return `${n(v.salary_from)}–${n(v.salary_to)} ${cur} ${per}`;
  if (v.salary_from) return `${c.from} ${n(v.salary_from)} ${cur} ${per}`;
  if (v.salary_to) return `${c.upTo} ${n(v.salary_to)} ${cur} ${per}`;
  return null;
}

function joiningDate(iso: string | null | undefined, c: (typeof TG_COPY)[TgLang]): string {
  if (!iso) return c.asap;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return c.asap;
  return d.toISOString().slice(0, 10).split("-").reverse().join(".");
}

/**
 * The body both message shapes share: company, then the facts a seafarer scans
 * for. Every line is optional — an imported posting often has only a title.
 */
function vacancyLines(v: TgVacancy, c: (typeof TG_COPY)[TgLang]): string {
  const rows: string[] = [];
  if (v.rank) rows.push(`${c.rank}: <b>${esc(v.rank)}</b>`);
  if (v.vessel_type) rows.push(`${c.vessel}: <b>${esc(v.vessel_type)}</b>`);
  const m = money(v, c);
  if (m) rows.push(`${c.salary}: <b>${esc(m)}</b>`);
  if (v.contract_duration) rows.push(`${c.contract}: <b>${esc(v.contract_duration)}</b>`);
  rows.push(`${c.joining}: <b>${esc(joiningDate(v.joining_date, c))}</b>`);
  return rows.join("\n");
}

/** A job-alert DM: what matched, why, and one button to the posting. */
export function alertMessage(v: TgVacancy, lang: TgLang): string {
  const c = TG_COPY[lang];
  const company = v.companies?.name?.trim();
  return [
    `🔔 <b>${esc(c.newJob)}</b>`,
    "",
    `<b>${esc(v.title)}</b>`,
    company ? esc(company) : null,
    "",
    vacancyLines(v, c),
    "",
    `<a href="${vacancyUrl(v, lang)}">${esc(c.view)} →</a>`,
    "",
    `<i>${esc(c.why)}</i>`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

/** A channel post. Same facts, no per-user footer, hashtags for channel search. */
export function channelMessage(v: TgVacancy, lang: TgLang): string {
  const c = TG_COPY[lang];
  const company = v.companies?.name?.trim();
  // Hashtags let people filter a busy channel by rank or fleet, which is how
  // crewing channels are actually browsed.
  const tag = (s: string) => `#${s.replace(/[^\p{L}\p{N}]+/gu, "_").replace(/^_+|_+$/g, "")}`;
  const tags = [v.rank, v.vessel_type].filter(Boolean).map((s) => tag(s as string));
  return [
    `⚓️ <b>${esc(v.title)}</b>`,
    company ? esc(company) : null,
    "",
    vacancyLines(v, c),
    "",
    `<a href="${vacancyUrl(v, lang)}">${esc(c.view)} →</a>`,
    tags.length ? `\n${tags.join(" ")}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

/** Which language the public channel is written in. One env var to change it. */
export function channelLang(): TgLang {
  return tgLang(process.env.TELEGRAM_CHANNEL_LANG || "ru");
}

export function channelId(): string | null {
  return process.env.TELEGRAM_CHANNEL_ID?.trim() || null;
}
