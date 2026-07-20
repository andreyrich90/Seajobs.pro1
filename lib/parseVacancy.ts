import { RANK_GROUPS } from "@/lib/ranks";
import { companyFromEmail } from "@/lib/companyName";

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
  currency?: string | null;
  contractDuration?: string | null;
  joiningDate?: string | null;
  description?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
};

// Schema mirrors the fields the admin Import Vacancy form (and
// api/admin/import-vacancy) accepts.
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
      "currency": string|null,
      "contractDuration": string|null,
      "joiningDate": "YYYY-MM-DD"|null,
      "description": string|null,
      "contactEmail": string|null,
      "contactPhone": string|null
    }
  ]
}

Rules (apply to every vacancy object):
- "rank" must be one of: ${RANK_GROUPS.flatMap((g) => g.ranks).join(", ")}. Pick the closest match, or null if none fits.
- "title" = a short job title, e.g. "Chief Officer — Oil Tanker".
- "vesselType": ALWAYS extract when any hint exists — check the dedicated vessel-type field, the job title (e.g. "3rd Eng || LPG || Yara" → "LPG Carrier"), the vessel description or its specs. Normalise to a standard English name: "Bulk Carrier", "Container Ship", "Oil Tanker", "Chemical Tanker", "LPG Carrier", "LNG Carrier", "General Cargo", "Car Carrier (PCTC)", "Ro-Ro", "AHTS", "PSV", "OSV", "Tug", "Dredger", "Cruise Ship", "Ferry (RoPax)", "Fishing Vessel", etc. Use null ONLY when the source gives no clue at all.
- "salaryFrom"/"salaryTo" = plain numbers (monthly), no currency symbols. If only one figure is given, set both to it.
- "currency" = 3-letter ISO code (USD, EUR, GBP...).
- "joiningDate": if only month/year is given, use the first day of that month. Resolve relative dates ("ASAP", "immediately") to null.
- "description" = a UNIQUE, rewritten job description in English Markdown — NOT a verbatim copy of the source text (duplicated text hurts SEO). Rephrase everything in your own words and structure it as:
    1. A 2–4 sentence intro paragraph in your own words (vessel type, trading area, contract length, salary — whatever is given). THIS is where the unique wording comes from.
    2. "## Vessel particulars" — a bullet list of any ship specs present (type, IMO, flag, year built, GRT/DWT, main engine, sailing area). Omit this whole section if the source has no specs.
    3. "## Requirements" — include EVERY requirement that appears in the source: certificates and courses, experience in rank (years / vessel types / GT or kW limits), documents and visas, English level, nationality or permit constraints, age or medical notes. Reword each bullet in your own phrasing, but NONE may be dropped, merged away or replaced with a generic line — applicants must see the real requirements for this exact vacancy. Do NOT add requirements that are not in the source.
    4. "## How to apply" — ALWAYS end with this exact sentence: "Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager."
  Uniqueness comes from rephrasing and the intro — never from inventing facts: only include specs, requirements and figures that actually appear in the source. Skip any section whose data is absent (except "How to apply", which is always included).
- "contactPhone": if the ad gives a phone/WhatsApp/Viber/Telegram number to reach the crewing, extract it in international format where possible (e.g. "+380 50 123 45 67"). Null if none is shown. Do NOT invent a number.
- When several vacancies share one vessel/company, repeat the shared company/vessel data in each object, but write each "description" separately with its own wording — no copy-pasted paragraphs between vacancies.
- Use null for anything not present in the source. Do not invent data.`;

interface AnthropicContentBlock { type: string; text?: string }

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type ParseInput = { text?: string; imageBase64?: string; mediaType?: string };

/** Returns one ParsedVacancy per distinct vacancy found; [] if none / empty input. */
export async function parseVacancies(input: ParseInput): Promise<ParsedVacancy[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("missing_api_key");

  const hasImage = !!input.imageBase64 && !!input.mediaType && IMAGE_TYPES.includes(input.mediaType);
  const hasText = typeof input.text === "string" && input.text.trim().length > 0;
  if (!hasImage && !hasText) return [];

  const userContent = hasImage
    ? [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: input.mediaType,
            data: input.imageBase64!.includes(",")
              ? input.imageBase64!.slice(input.imageBase64!.indexOf(",") + 1)
              : input.imageBase64!,
          },
        },
        { type: "text", text: "Extract every vacancy in this posting into the JSON schema." },
      ]
    : [{ type: "text", text: `Extract every vacancy in the text below into the JSON schema.\n\n---\n${input.text!.slice(0, 24000)}` }];

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8192,
      system: SCHEMA_PROMPT,
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
