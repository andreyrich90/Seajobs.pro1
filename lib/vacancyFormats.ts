// The shapes a parsed vacancy description can take.
//
// Imported vacancies used to share one outline — intro, "Vessel particulars",
// "Requirements", "How to apply" — so a board of 1,500 postings read like one
// template filled in 1,500 times. The parser (lib/parseVacancy.ts) now gets a
// shuffled list of these formats with every request and gives each vacancy in
// the post the next one, so even eight ranks from one agency post come out as
// eight differently built texts.
//
// Two headings are fixed in every format, whatever else moves: "## Requirements"
// (every requirement from the source, none dropped) and "## How to apply" as the
// last section. The company's vacancy form and the parser rules both lean on
// them. Everything a format adds beyond the source is general knowledge about
// the rank and the vessel type, written as "typically" or "usually" — never a
// fact about this employer, ship or contract that the source does not state.

export const DESCRIPTION_FORMATS: { id: string; outline: string }[] = [
  {
    id: "classic",
    outline: `A 3-4 sentence intro paragraph -> "## Vessel particulars" (bullets; ONLY specs stated in the source, omit the section if none) -> "## What the role involves" (what this rank typically does on this vessel type) -> "## Requirements" -> "## Before you apply" (documents and certificates worth having ready) -> "## How to apply".`,
  },
  {
    id: "questions",
    outline: `A 2-3 sentence intro -> "## Who is this vacancy for?" (the candidate profile, from the stated requirements) -> "## What does the job usually involve?" -> "## Requirements" -> "## What should you have ready?" -> "## How to apply".`,
  },
  {
    id: "at-a-glance",
    outline: `"## At a glance" (bullets of stated facts only: rank, vessel type, contract, salary, joining, trading area — skip what is not given) -> a 3-4 sentence paragraph introducing the position -> "## The role on board" -> "## Requirements" -> "## How to apply".`,
  },
  {
    id: "duties-first",
    outline: `A 2 sentence intro -> "## Your work on board" (typical daily responsibilities of this rank on this vessel type, as a paragraph plus bullets) -> "## Requirements" -> "## About this type of vessel" (what the vessel type carries and how it works, in general terms) -> "## How to apply".`,
  },
  {
    id: "pay-first",
    outline: `A 2-3 sentence intro -> "## Contract and pay" (ONLY the contract, salary, rotation and joining facts the source states; if salary is not stated, say it is discussed with the crewing agency) -> "## Requirements" -> "## What the position involves" -> "## Documents to prepare" -> "## How to apply".`,
  },
  {
    id: "candidate",
    outline: `"## The candidate we are looking for" (a narrative paragraph built from the stated requirements) -> "## Requirements" -> "## The ship and the trade" (stated vessel facts plus a general explanation of this vessel type) -> "## Why this rank matters on this type of ship" -> "## How to apply".`,
  },
  {
    id: "vessel-first",
    outline: `"## About the vessel" (stated specs, then what this vessel type carries and how it works in general) -> a paragraph introducing the position and contract -> "## Requirements" -> "## Everyday responsibilities" -> "## How to apply".`,
  },
  {
    id: "checklist",
    outline: `A 2-3 sentence intro -> "## Is this vacancy right for you?" (a short checklist of questions a candidate can answer with yes/no, drawn from the stated requirements) -> "## Requirements" -> "## What to expect on board" (typical work and routine for this rank on this vessel type) -> "## How to apply".`,
  },
  {
    id: "narrative",
    outline: `Three flowing paragraphs without lists: the offer, the vessel type, and what the rank typically does on board -> "## Requirements" (the only list) -> a short closing paragraph on what to prepare -> "## How to apply".`,
  },
  {
    id: "before-you-apply",
    outline: `A 2-3 sentence intro -> "## Requirements" -> "## Before you apply" (valid certificates and their expiry, medical, sea-service record, references — general advice) -> "## Role overview" (what this rank typically does on this vessel type) -> "## How to apply".`,
  },
  {
    id: "career",
    outline: `A 2-3 sentence intro -> "## Where this role fits in a career" (the usual step from the rank below and towards the rank above, in general terms) -> "## Requirements" -> "## What the job usually involves" -> "## How to apply".`,
  },
  {
    id: "highlights",
    outline: `A 2-3 sentence intro -> "## Highlights of this offer" (ONLY stated facts: salary, contract, vessel, trading area, joining) -> "## Requirements" -> "## Questions worth asking the crewing agency" (general, relevant questions: rotation and relief, travel arrangements, wage payment, contract extension) -> "## How to apply".`,
  },
];

/**
 * The formats in a fresh random order, as the numbered list the parser prompt
 * hands to the model: vacancy 1 takes the first, vacancy 2 the second, and so
 * on, wrapping round after the last.
 */
export function formatPlan(): string {
  const order = [...DESCRIPTION_FORMATS];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order.map((f, i) => `${i + 1}. ${f.outline}`).join("\n");
}
