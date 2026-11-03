import { RANK_GROUPS } from "@/lib/ranks";
import { companyFromEmail } from "@/lib/companyName";
import { formatPlan } from "@/lib/vacancyFormats";

// Shared server-side vacancy parser used by both the admin image/text route
// (api/admin/parse-vacancy-image) and the automated collector cron. Calls the
// Anthropic API with a schema prompt and returns one object per distinct
// vacancy found in the input (image screenshot or pasted/scraped text).

export type ParsedVacancy = {
  companyName?: string | null;
  companyLocation?: string | null;
  companyWebsite?: string | null;
  title?: string | null;
  rank?: string | null;
  vesselType?: string | null;
  salaryFrom?: number | null;
  salaryTo?: number | null;
  salaryPeriod?: "month" | "day" | null;
  currency?: string | null;
  contractDuration?: string | null;
  joiningDate?: string | null;
  description?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  applyUrl?: string | null;
};

// Schema mirrors the fields the admin Import Vacancy form (and
// api/admin/import-vacancy) accepts. __DESCRIPTION_RULE__ is filled in by
// systemPrompt(): screenshots get the rotating formats, text posts the classic
// outline.
const SCHEMA_PROMPT = `You extract maritime job vacancy postings from the input, which is either a
screenshot image or pasted text (e.g. Telegram channel posts).
Return ONLY valid JSON — no markdown fences, no preamble, no commentary.

The input may contain ONE vacancy or SEVERAL distinct vacancies (e.g. a list
page, a table of open positions, several channel posts, or an agency post
advertising multiple ranks). Ignore non-vacancy noise (greetings, ads, channel
promos) — extract only actual job vacancies.
Return one object PER DISTINCT VACANCY. A vacancy is distinct when it has its
own rank/position (possibly with its own salary, vessel or joining date) —
"Master and Chief Officer for mv X" is TWO vacancies sharing vessel data.
Never merge different positions into one object.

Schema:
{
  "vacancies": [
    {
      "companyName": string|null,
      "companyLocation": string|null,
      "companyWebsite": string|null,
      "title": string|null,
      "rank": string|null,
      "vesselType": string|null,
      "salaryFrom": number|null,
      "salaryTo": number|null,
      "salaryPeriod": "month"|"day"|null,
      "currency": string|null,
      "contractDuration": string|null,
      "joiningDate": "YYYY-MM-DD"|null,
      "description": string|null,
      "contactEmail": string|null,
      "contactPhone": string|null,
      "applyUrl": string|null
    }
  ]
}

Rules (apply to every vacancy object):
- "rank" must be one of: ${RANK_GROUPS.flatMap((g) => g.ranks).join(", ")}. Pick the closest match, or null if none fits.
- "title" = a short job title, e.g. "Chief Officer — Oil Tanker".
- "vesselType": ALWAYS extract when any hint exists — check the dedicated vessel-type field, the job title (e.g. "3rd Eng || LPG || Yara" → "LPG Carrier"), the vessel description or its specs. Normalise to a standard English name: "Bulk Carrier", "Container Ship", "Oil Tanker", "Chemical Tanker", "LPG Carrier", "LNG Carrier", "General Cargo", "Car Carrier (PCTC)", "Ro-Ro", "AHTS", "PSV", "OSV", "Tug", "Dredger", "Cruise Ship", "Ferry (RoPax)", "Fishing Vessel", etc. Use null ONLY when the source gives no clue at all.
- "salaryFrom"/"salaryTo" = plain numbers as quoted in the source, no currency symbols. If only one figure is given, set both to it. Do NOT convert between periods — report the number as written.
- "salaryPeriod" = "day" when the figure is a DAY RATE ("/day", "per day", "daily rate", "pd", "p/d", "$450 a day" — common on offshore, tug, dredger and yacht postings), otherwise "month". Use null only when no salary is given. Getting this wrong makes a 450/day offshore rate look like a 450/month wage, so read the unit carefully.
- "currency" = 3-letter ISO code (USD, EUR, GBP...).
- "joiningDate": if only month/year is given, use the first day of that month. Resolve relative dates ("ASAP", "immediately") to null.
__DESCRIPTION_RULE__
- "contactEmail": the crewing e-mail address exactly as printed in the source. Null if the source shows none. NEVER invent, guess or complete an address, and never take one from a different company.
- "applyUrl": ONLY when the source gives no e-mail for applications AND explicitly tells candidates to apply, register or fill in a profile/form through a link (a careers portal, an online application form, "please apply by: <link>"): the full URL of that page, starting with https:// (add it when the source omits the scheme). Copy it exactly as shown. Null in every other case — in particular when an application e-mail is given, for a company homepage that is merely mentioned (that is "companyWebsite"), and NEVER the address-bar URL of the page the screenshot was taken from or of a job board / aggregator listing.
- "contactPhone": if the ad gives a phone/WhatsApp/Viber/Telegram number to reach the crewing, extract it in international format where possible (e.g. "+380 50 123 45 67"). Null if none is shown. Do NOT invent a number.
- When several vacancies share one vessel/company, repeat the shared company/vessel data in each object, but write each "description" separately with its own wording — no copy-pasted paragraphs between vacancies.
- Use null for anything not present in the source. Do not invent data.`;

// Telegram posts and pasted text: one classic outline, as the descriptions
// have always been. These posts carry a few lines, and a longer text would have
// to be made of something the source never said.
const CLASSIC_DESCRIPTION = `- "description" = a UNIQUE, rewritten job description in English Markdown — NOT a verbatim copy of the source text (duplicated text hurts SEO). Rephrase everything in your own words and structure it as:
    1. A 2–4 sentence intro paragraph in your own words (vessel type, trading area, contract length, salary — whatever is given). THIS is where the unique wording comes from.
    2. "## Vessel particulars" — a bullet list of any ship specs present (type, IMO, flag, year built, GRT/DWT, main engine, sailing area). Omit this whole section if the source has no specs.
    3. "## Requirements" — include EVERY requirement that appears in the source: certificates and courses, experience in rank (years / vessel types / GT or kW limits), documents and visas, English level, nationality or permit constraints, age or medical notes. Reword each bullet in your own phrasing, but NONE may be dropped, merged away or replaced with a generic line — applicants must see the real requirements for this exact vacancy. Do NOT add requirements that are not in the source.
    4. "## How to apply" — ALWAYS end with this exact sentence: "Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager." EXCEPT when "applyUrl" is set and "contactEmail" is null: then end with this exact sentence instead: "This company accepts applications only on its own website — use the link on this page to fill in your profile there."
  Uniqueness comes from rephrasing and the intro — never from inventing facts: only include specs, requirements and figures that actually appear in the source. Skip any section whose data is absent (except "How to apply", which is always included).
`;

// Screenshots: the same facts, but laid out in one of the rotating formats of
// lib/vacancyFormats.ts when the screenshot says enough about the ship or the
// trade to fill one. Rearranged, never added to.
const RICH_DESCRIPTION = `- "description" = a UNIQUE, rewritten job description in English Markdown — NOT a verbatim copy of the source (duplicated text hurts SEO). How to build it depends on what the source says about the ship and the trade:
    A. When the source gives ship details beyond the bare type (name, IMO, flag, year built, DWT/GT, engine, cargo, equipment) or a trading area: use the FORMAT assigned to this vacancy in the user message (vacancy 1 takes format 1, vacancy 2 format 2, and so on, wrapping round). Follow its section order and its "## " headings, and present EVERY fact the source gives — ship, trade, contract, pay, joining, requirements — neatly and in full; nothing given in the source may be left out. Length follows the source: as long as the stated facts need, never padded.
    B. Otherwise (only a rank, a type and a few lines): write the classic outline — a 2–4 sentence intro, "## Vessel particulars" only if any spec is given, "## Requirements", "## How to apply".
  Rules for both:
    - Invent NOTHING. Every fact about this vacancy — company, ship, specs, trading area, salary, contract, rotation, joining date, crew, benefits, duties — comes from the source. No general statements about what the rank "typically" does, no advice, no market figures, no praise of the company. The one thing you may add is a few plain words explaining a technical term the source itself uses (e.g. "semi-refrigerated", "DFDE", "DP2"), and only when it helps a reader.
    - "## Requirements" includes EVERY requirement that appears in the source: certificates and courses, experience in rank (years / vessel types / GT or kW limits), documents and visas, English level, nationality or permit constraints, age or medical notes. Reword each bullet, but NONE may be dropped, merged away or replaced with a generic line. Do NOT add requirements that are not in the source.
    - "## How to apply" is always the last section and ends with this exact sentence: "Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager." EXCEPT when "applyUrl" is set and "contactEmail" is null: then end with this exact sentence instead: "This company accepts applications only on its own website — use the link on this page to fill in your profile there."
    - Skip any section whose content is not in the source (except "## How to apply"). Do not repeat sentences between vacancies.
`;

function systemPrompt(rich: boolean): string {
  return SCHEMA_PROMPT.replace("__DESCRIPTION_RULE__\n", () => (rich ? RICH_DESCRIPTION : CLASSIC_DESCRIPTION));
}

interface AnthropicContentBlock { type: string; text?: string }

export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type ParseImage = { base64: string; mediaType: string };

export type ParseInput = {
  text?: string;
  /** Single screenshot (legacy shape, still used by callers that have one image). */
  imageBase64?: string;
  mediaType?: string;
  /**
   * Consecutive vertical slices of ONE screenshot, top to bottom. Tall
   * screenshots are sliced client-side because the API downscales an image's
   * long edge to ~1568px — a 1440x3088 phone screenshot would lose half its
   * resolution and its small table text becomes unreadable.
   */
  images?: ParseImage[];
  /**
   * Lay the description out in one of the rotating formats when the source has
   * enough ship or trade detail (lib/vacancyFormats.ts). The screenshot route
   * sets it; Telegram posts and pasted text keep the classic outline.
   */
  rich?: boolean;
};

/** Accepts both a raw base64 string and a `data:image/...;base64,...` URL. */
function stripDataUrl(data: string): string {
  const comma = data.indexOf(",");
  return data.startsWith("data:") && comma >= 0 ? data.slice(comma + 1) : data;
}

// Text posts (Telegram collector, high volume) stay on Haiku; screenshots are
// a dense OCR-like task done by hand a few times a day, so accuracy wins.
const TEXT_MODEL = "claude-haiku-4-5-20251001";
const IMAGE_MODEL = "claude-sonnet-5";

/** Returns one ParsedVacancy per distinct vacancy found; [] if none / empty input. */
export async function parseVacancies(input: ParseInput): Promise<ParsedVacancy[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("missing_api_key");

  const images: ParseImage[] = (
    input.images?.length
      ? input.images
      : input.imageBase64 && input.mediaType
      ? [{ base64: input.imageBase64, mediaType: input.mediaType }]
      : []
  ).filter((im) => im.base64 && IMAGE_TYPES.includes(im.mediaType));

  const hasText = typeof input.text === "string" && input.text.trim().length > 0;
  if (images.length === 0 && !hasText) return [];

  const sliceNote =
    images.length > 1
      ? `The ${images.length} images above are consecutive top-to-bottom slices of ONE screenshot and they overlap slightly. Read them as a single posting: a vacancy that appears in two slices is ONE vacancy, not two.\n`
      : "";

  // A fresh order of description formats per request (lib/vacancyFormats.ts),
  // for screenshots only.
  const plan = input.rich
    ? `\n\nDescription formats, in vacancy order (wrap round after the last):\n${formatPlan()}`
    : "";

  const userContent = images.length
    ? [
        ...images.map((im) => ({
          type: "image",
          source: { type: "base64", media_type: im.mediaType, data: stripDataUrl(im.base64) },
        })),
        { type: "text", text: `${sliceNote}Extract every vacancy in this posting into the JSON schema.${plan}` },
      ]
    : [{ type: "text", text: `Extract every vacancy in the text below into the JSON schema.${plan}\n\n---\n${input.text!.slice(0, 24000)}` }];

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: images.length ? IMAGE_MODEL : TEXT_MODEL,
      // Screenshot descriptions can run longer, and one post can list a dozen ranks.
      max_tokens: 16000,
      system: systemPrompt(!!input.rich),
      messages: [{ role: "user", content: userContent }],
    }),
  });

  if (!r.ok) {
    const detail = await r.text();
    throw new Error(`anthropic_${r.status}: ${detail.slice(0, 200)}`);
  }

  const data = await r.json();
  const responseText: string = (data.content as AnthropicContentBlock[] | undefined ?? [])
    .map((i) => i.text ?? "")
    .join("");

  const cleaned = responseText.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const arrStart = cleaned.indexOf("[");
  const from = start >= 0 && (arrStart < 0 || start < arrStart) ? start : arrStart;
  const end = Math.max(cleaned.lastIndexOf("}"), cleaned.lastIndexOf("]"));
  const jsonText = from >= 0 && end > from ? cleaned.slice(from, end + 1) : cleaned;

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return [];
  }

  const obj = parsed as Record<string, unknown>;
  const list: unknown[] = Array.isArray(obj?.vacancies)
    ? (obj.vacancies as unknown[])
    : Array.isArray(parsed)
    ? (parsed as unknown[])
    : parsed
    ? [parsed]
    : [];

  return (list.filter((v) => v && typeof v === "object") as ParsedVacancy[]).map((v) => ({
    ...v,
    // When the model found a contact email but no company name, derive the
    // name from the email domain (e.g. cv@ariesnav.com → "Ariesnav").
    companyName: v.companyName?.trim() || companyFromEmail(v.contactEmail) || v.companyName || null,
  }));
}
