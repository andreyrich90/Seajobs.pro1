// Turning a seafarer's CV into the profile fields.
//
// The prompt and the model call live here rather than in the route so they can
// be exercised without the network: everything that actually went wrong — a
// reply that ran out of room and stopped mid-JSON — is decided in this file,
// and the route only wires it to a request.
//
// The schema is aligned 1:1 with the Supabase columns the client writes to
// (seafarers / certificates / sea_experience), so the parsed result maps
// straight into the profile with no translation step.

// How much history the answer may carry.
//
// A seafarer with twenty years at sea has sixty contracts, and writing them all
// out is what truncated the reply mid-JSON. The recent ones are what a crewing
// manager reads; the rest matter only as a total, so the prompt asks for a
// counted sentence instead of rows. The compact retry exists for the CVs that
// overflow even this.
export const MAX_CONTRACTS = 15;
export const MAX_CONTRACTS_COMPACT = 8;
export const MAX_CERTS = 40;

/** Generous rather than exact: stopping one token short costs the whole answer,
 *  unused room costs nothing. The old value was 4096, which is what broke. */
export const MAX_TOKENS = 16000;

export const MODEL = "claude-haiku-4-5-20251001";

export const SCHEMA_PROMPT = `You extract structured data from a seafarer's CV/resume.
Return ONLY valid JSON — no markdown fences, no preamble, no commentary.

Schema:
{
  "first_name": string|null,
  "last_name": string|null,
  "rank": string|null,
  "nationality": string|null,
  "phone": string|null,
  "date_of_birth": "YYYY-MM-DD"|null,
  "readiness_date": "YYYY-MM-DD"|null,
  "about": string|null,
  "seamans_book": string|null,
  "seamans_book_expiry": "YYYY-MM-DD"|null,
  "passport_no": string|null,
  "passport_expiry": "YYYY-MM-DD"|null,
  "diploma": string|null,
  "diploma_expiry": "YYYY-MM-DD"|null,
  "service_record_book": string|null,
  "medical": string|null,
  "medical_expiry": "YYYY-MM-DD"|null,
  "us_visa": string|null,
  "schengen_visa": string|null,
  "education": string|null,
  "languages": string|null,
  "competencies": string|null,
  "certificates": [
    { "name": string, "number": string|null, "issue_date": "YYYY-MM-DD"|null, "expiry_date": "YYYY-MM-DD"|null, "issuing_authority": string|null }
  ],
  "experience": [
    { "vessel_name": string, "vessel_type": string|null, "rank": string|null, "company": string|null, "flag": string|null, "dwt": string|null, "engine": string|null, "from_date": "YYYY-MM-DD"|null, "to_date": "YYYY-MM-DD"|null }
  ]
}

Rules:
- Use null for unknown scalar fields and [] for empty lists.
- Map ranks to standard maritime titles (e.g. "Master", "Chief Officer", "2nd Officer", "Chief Engineer", "2nd Engineer", "Able Seaman", "Ordinary Seaman").
- All dates ISO "YYYY-MM-DD". If only month/year is known, use the first day of that month.
- "about" = a concise 1–2 sentence professional summary in English.
- "us_visa"/"schengen_visa" = validity text if present (e.g. "Valid until 05/2028"); "seamans_book"/"passport_no" = the document number as written.
- "seamans_book" = seaman's book / seaman's passport number; "passport_no" = foreign/travel (biometric) passport number; "diploma" = Certificate of Competency / diploma number (e.g. "CoC II/2 No. 12345").
- "education" = institution, field and graduation year on one line.
- "languages" = e.g. "English: Fluent, Russian: Native".
- "competencies" = key skills, one per line.
- "dwt" = deadweight/GRT as written (e.g. "58,500 DWT"); "engine" = engine make / power (e.g. "MAN-B&W / 12,800").

Length — this matters more than completeness of the old history:
- "experience": the ${MAX_CONTRACTS} most recent contracts only, newest first. Do NOT list older ones.
- If you left contracts out, add one sentence at the end of "about": how many earlier contracts there were, roughly how many years they cover, and in which ranks. E.g. "Earlier service: 23 contracts over ~9 years as AB and Bosun."
- "certificates": at most ${MAX_CERTS}. Keep STCW and CoC-related ones first; drop duplicates.
- Keep "about" under 400 characters and "competencies" under 600.`;

/** The nudge for a CV that overflowed even the capped prompt. */
export const COMPACT_NUDGE =
  `Your previous answer was cut off because it was too long. Answer again, shorter: ` +
  `at most ${MAX_CONTRACTS_COMPACT} contracts in "experience" (the most recent), at most 20 ` +
  `certificates, and summarise everything you leave out in one sentence at the end of "about". ` +
  `The JSON must be complete.`;

export type Answer =
  | { ok: true; text: string; stopReason: string; truncated: boolean }
  | { ok: false; status: number; detail: string };

type Fetch = typeof fetch;

/**
 * One call to the model.
 *
 * `truncated` is the field the whole fix turns on: a reply that stopped at the
 * ceiling used to be indistinguishable from a reply that came back malformed,
 * and both were reported as "model did not return valid JSON".
 */
export async function askClaude(
  apiKey: string,
  userContent: unknown[],
  opts: { compact?: boolean; fetchImpl?: Fetch } = {},
): Promise<Answer> {
  const doFetch = opts.fetchImpl ?? fetch;
  const content = opts.compact
    ? [...userContent, { type: "text", text: COMPACT_NUDGE }]
    : userContent;

  const r = await doFetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SCHEMA_PROMPT,
      messages: [{ role: "user", content }],
    }),
  });

  if (!r.ok) {
    const detail = await r.text();
    // Surface the upstream status/message so failures are diagnosable
    // (e.g. 401 = bad/missing key, 400 = bad request, 429 = rate limit).
    let message = detail;
    try {
      message = JSON.parse(detail)?.error?.message ?? detail;
    } catch {
      /* keep raw text */
    }
    return { ok: false, status: r.status, detail: String(message) };
  }

  const data = await r.json();
  const text: string = ((data.content as { text?: string }[] | undefined) ?? [])
    .map((i) => i.text ?? "")
    .join("");
  const stopReason = String(data.stop_reason ?? "unknown");
  return { ok: true, text, stopReason, truncated: stopReason === "max_tokens" };
}

/** Tolerate stray prose and fences: take the outermost JSON object. */
export function extractJson(text: string): string {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  return start >= 0 && end > start ? cleaned.slice(start, end + 1) : cleaned;
}
