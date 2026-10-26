/**
 * The seafarer subscription: plans, prices, checkout links and the copy around
 * them. Shared by the browser and the server, so nothing here touches the
 * database — the access checks live in lib/subscriptionAccess.ts.
 *
 * What it opens, and what it deliberately does not:
 *
 *   - **Free for everyone signed in:** searching, the profile, and building
 *     and editing the CV.
 *   - **With a subscription:** applying through the portal (the site sends the
 *     CV to the agency), a vacancy's e-mail and phone, the "write from my own
 *     mailbox" route, a company's contact people, and the CV files (PDF, image,
 *     Word in every fleet template).
 *
 * What is never paid for is a job: the subscription buys the portal's tools,
 * and every paid page says so in the same breath (MLC 2006 A1.4(5)(b), and
 * the site's own "never pay for a job" notice). While it is on sale the
 * vacancy pages stop claiming `directApply` to Google, since applying needs it.
 *
 * Same one-field shape as `lib/cvBlast.ts` and `lib/cvWord.ts`: a plan sells
 * once its Buy Me a Coffee extra is pasted into `payUrl`, and **the price here
 * must match the product the link points at** — the button shows this number,
 * the checkout charges whatever BMC was told. Dollars only, for the same reason
 * as everywhere else on the site: the checkout charges in dollars.
 *
 * One payment, no auto-renewal. Paying again before the window ends adds the
 * months on top of it (see `windowFor`), so renewing early loses nothing.
 */

export type PlanId = "3m" | "6m" | "12m";

export const PLAN_IDS: PlanId[] = ["3m", "6m", "12m"];

export const SUB_PLANS: Record<PlanId, { months: 3 | 6 | 12; usd: number; payUrl: string | null }> = {
  "3m": { months: 3, usd: 5, payUrl: "https://buymeacoffee.com/seajobs.pro/e/591416" },
  "6m": { months: 6, usd: 8, payUrl: "https://buymeacoffee.com/seajobs.pro/e/591418" },
  "12m": { months: 12, usd: 12, payUrl: "https://buymeacoffee.com/seajobs.pro/e/591420" },
};

export function isPlanId(v: unknown): v is PlanId {
  return v === "3m" || v === "6m" || v === "12m";
}

/**
 * The free tier: vacancies a seafarer without a subscription may open each
 * week (Monday 00:00 Kyiv), each showing its contacts and taking an
 * application. Server side in lib/freeUnlocks.ts; here so pages can say it.
 */
export const FREE_UNLOCKS_PER_WEEK = 3;

/** Any plan on sale. Until then the page says subscriptions open soon. */
export const SUB_SELLING = PLAN_IDS.some((p) => SUB_PLANS[p].payUrl);

/**
 * The provider's own id for a plan, read off its checkout link — the number
 * Buy Me a Coffee also sends as `data.extras[].id` in the payment body. Derived
 * rather than written twice, as for the Word export: a link and an id that
 * disagree would be a bug nobody notices until a payment lands on nothing.
 */
export function planExtraId(plan: PlanId): number | null {
  const m = /\/e\/(\d+)/.exec(SUB_PLANS[plan].payUrl ?? "");
  return m ? Number(m[1]) : null;
}

/**
 * Which plan a payment body names, from the extra ids it carries.
 *
 * `undefined` — the body names no product at all; `null` — it names one, and
 * it is not a subscription. The webhook treats those apart: a subscription is
 * only ever recognised by its id, never guessed from the amount, because $5,
 * $8 and $12 sit right beside the Word export's price.
 */
export function planForExtraIds(ids: number[]): PlanId | null | undefined {
  if (ids.length === 0) return undefined;
  for (const p of PLAN_IDS) {
    const id = planExtraId(p);
    if (id !== null && ids.includes(id)) return p;
  }
  return null;
}

/** `n` calendar months after `d`, the day clamped to the target month's length (31 Jan + 1 → 28/29 Feb). */
export function addMonths(d: Date, n: number): Date {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + n;
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(d.getUTCDate(), last), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()));
}

/**
 * The window a new payment buys: from now, or from the end of the window the
 * seafarer already has, whichever is later. Pure, so the money path can be
 * checked without a database.
 */
export function windowFor(now: Date, currentUntil: Date | null, months: number): { starts: Date; until: Date } {
  const starts = currentUntil && currentUntil > now ? currentUntil : now;
  return { starts, until: addMonths(starts, months) };
}

/**
 * A plan's price as a reader sees it: "$5", or "5 $" where the language writes
 * the symbol after the number. Whole dollars print without decimals — a
 * subscription at "$5.00" reads like a receipt, not an offer.
 */
export function subPrice(plan: PlanId, lang?: string): string {
  const usd = SUB_PLANS[plan].usd;
  const n = Number.isInteger(usd) ? String(usd) : usd.toFixed(2).replace(".", lang === "pl" || lang === "ro" ? "," : ".");
  return lang === "pl" || lang === "ro" ? `${n} $` : `$${n}`;
}

/** The cheapest plan's price — what "from {price}" quotes. */
export const SUB_FROM: PlanId = "3m";

/**
 * Fill every `{price}` in a copy object — strings, arrays, nested objects —
 * with the cheapest plan's price as `lang` writes it. The CV pages carry the
 * token, never the figure, so a price change cannot leave one of them behind.
 */
export function withSubPrice<T>(node: T, lang?: string): T {
  const price = subPrice(SUB_FROM, lang);
  const fill = (n: unknown): unknown => {
    if (typeof n === "string") return n.split("{price}").join(price);
    if (Array.isArray(n)) return n.map(fill);
    if (n && typeof n === "object") {
      return Object.fromEntries(Object.entries(n as Record<string, unknown>).map(([k, v]) => [k, fill(v)]));
    }
    return n;
  };
  return fill(node) as T;
}

/** The lines on a lock — applying, a vacancy's contacts, a company's, the CV files —
 *  and its button. `{price}` in `cta` is the cheapest plan. The full page copy
 *  is in lib/subscriptionCopy.ts, which only the subscription page loads. */
export type SubLock = {
  lockContacts: string;
  /** Under the free-tier box: what the subscription adds on top of it. */
  lockApply: string;
  lockCompany: string;
  lockCv: string;
  cta: string;
  /** The free tier. `{limit}` and `{left}` are counts, `{date}` the next Monday — filled by the page. */
  freeTitle: string;
  freeBody: string;
  freeBtn: string;
  freeLeft: string;
  freeUsed: string;
};

const SUB_LOCK: Record<string, SubLock> = {
  en: {
    lockContacts: "The agency's e-mail and phone open with a subscription.",
    lockApply: "With a subscription there is no weekly limit: every vacancy, writing from your own mailbox and your CV files.",
    lockCompany: "The company's contacts open with a subscription.",
    lockCv: "Downloading your CV (PDF, image, Word) comes with a subscription. Building and editing it stay free.",
    cta: "Subscribe — from {price}",
    freeTitle: "{limit} vacancies a week for free",
    freeBody: "Open this vacancy to see the agency's e-mail and phone and apply to it. Left this week: {left} of {limit}.",
    freeBtn: "Open this vacancy — free",
    freeLeft: "Free vacancies left this week: {left} of {limit}.",
    freeUsed: "This week's {limit} free vacancies are used. New ones on {date}.",
  },
  ru: {
    lockContacts: "E-mail и телефон крюинга открываются с подпиской.",
    lockApply: "С подпиской без недельного лимита: все вакансии, письмо со своей почты и файлы CV.",
    lockCompany: "Контакты компании открываются с подпиской.",
    lockCv: "Скачать CV (PDF, картинка, Word) можно с подпиской. Собирать и редактировать его — бесплатно.",
    cta: "Оформить подписку — от {price}",
    freeTitle: "{limit} вакансии в неделю — бесплатно",
    freeBody: "Откройте эту вакансию, чтобы увидеть e-mail и телефон крюинга и откликнуться. Осталось на этой неделе: {left} из {limit}.",
    freeBtn: "Открыть вакансию — бесплатно",
    freeLeft: "Бесплатных вакансий на этой неделе осталось: {left} из {limit}.",
    freeUsed: "{limit} бесплатные вакансии этой недели использованы. Новые — {date}.",
  },
  ua: {
    lockContacts: "E-mail і телефон крюїнгу відкриваються з підпискою.",
    lockApply: "З підпискою без тижневого ліміту: усі вакансії, лист зі своєї пошти та файли CV.",
    lockCompany: "Контакти компанії відкриваються з підпискою.",
    lockCv: "Завантажити CV (PDF, картинка, Word) можна з підпискою. Збирати й редагувати його — безкоштовно.",
    cta: "Оформити підписку — від {price}",
    freeTitle: "{limit} вакансії на тиждень — безкоштовно",
    freeBody: "Відкрийте цю вакансію, щоб побачити e-mail і телефон крюїнгу та відгукнутися. Залишилось цього тижня: {left} з {limit}.",
    freeBtn: "Відкрити вакансію — безкоштовно",
    freeLeft: "Безкоштовних вакансій цього тижня залишилось: {left} з {limit}.",
    freeUsed: "{limit} безкоштовні вакансії цього тижня використано. Нові — {date}.",
  },
  pl: {
    lockContacts: "E-mail i telefon agencji otwiera subskrypcja.",
    lockApply: "Z subskrypcją bez tygodniowego limitu: wszystkie oferty, list z własnej skrzynki i pliki CV.",
    lockCompany: "Kontakty firmy otwiera subskrypcja.",
    lockCv: "Pobranie CV (PDF, obraz, Word) jest w subskrypcji. Tworzenie i edycja pozostają darmowe.",
    cta: "Wykup subskrypcję — od {price}",
    freeTitle: "{limit} oferty tygodniowo za darmo",
    freeBody: "Otwórz tę ofertę, aby zobaczyć e-mail i telefon agencji i aplikować. W tym tygodniu zostało: {left} z {limit}.",
    freeBtn: "Otwórz ofertę — za darmo",
    freeLeft: "Darmowych ofert w tym tygodniu zostało: {left} z {limit}.",
    freeUsed: "Wykorzystano {limit} darmowe oferty w tym tygodniu. Kolejne — {date}.",
  },
  ro: {
    lockContacts: "E-mailul și telefonul agenției se deschid cu abonament.",
    lockApply: "Cu abonament nu ai limită săptămânală: toate posturile, scrisoarea din propriul e-mail și fișierele CV.",
    lockCompany: "Contactele companiei se deschid cu abonament.",
    lockCv: "Descărcarea CV-ului (PDF, imagine, Word) vine cu abonamentul. Construirea și editarea rămân gratuite.",
    cta: "Abonează-te — de la {price}",
    freeTitle: "{limit} posturi pe săptămână gratuit",
    freeBody: "Deschide acest post ca să vezi e-mailul și telefonul agenției și să aplici. Rămase săptămâna aceasta: {left} din {limit}.",
    freeBtn: "Deschide postul — gratuit",
    freeLeft: "Posturi gratuite rămase săptămâna aceasta: {left} din {limit}.",
    freeUsed: "Cele {limit} posturi gratuite din această săptămână au fost folosite. Următoarele — {date}.",
  },
};

export function subLock(lang: string): SubLock {
  return withSubPrice(SUB_LOCK[lang] ?? SUB_LOCK.en, lang);
}
