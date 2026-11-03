// The shapes a vacancy description from a SCREENSHOT can take.
//
// Imported vacancies used to share one outline — intro, "Vessel particulars",
// "Requirements", "How to apply" — so a board of 1,500 postings read like one
// template filled in 1,500 times. When a screenshot carries real detail about
// the ship or the trade, the parser (lib/parseVacancy.ts) now gets these
// formats in a shuffled order and gives each vacancy in the post the next one,
// so eight ranks from one agency post come out as eight differently built
// texts. Telegram posts, and screenshots without such detail, keep the plain
// classic outline.
//
// Every format only REARRANGES what the source says; none adds facts. Two
// headings are fixed in all of them: "## Requirements" (every requirement from
// the source, none dropped) and "## How to apply" as the last section.

export const DESCRIPTION_FORMATS: { id: string; outline: string }[] = [
  {
    id: "classic",
    outline: `A 2-4 sentence intro paragraph -> "## Vessel particulars" (bullets) -> "## Requirements" -> "## How to apply".`,
  },
  {
    id: "at-a-glance",
    outline: `"## At a glance" (bullets: rank, vessel type, contract, salary, joining, trading area) -> a 2-3 sentence paragraph introducing the position -> "## Vessel particulars" -> "## Requirements" -> "## How to apply".`,
  },
  {
    id: "who-for",
    outline: `A 2-3 sentence intro -> "## Who is this vacancy for?" (a short paragraph built from the stated requirements) -> "## The vessel" (bullets) -> "## Requirements" -> "## How to apply".`,
  },
  {
    id: "vessel-first",
    outline: `"## About the vessel" (the stated ship facts as a short paragraph plus bullets) -> a 2-3 sentence paragraph on the position and contract -> "## Requirements" -> "## How to apply".`,
  },
  {
    id: "pay-first",
    outline: `A 2 sentence intro -> "## Contract and pay" (bullets: salary, contract, rotation, joining) -> "## Vessel particulars" -> "## Requirements" -> "## How to apply".`,
  },
  {
    id: "candidate",
    outline: `"## The candidate we are looking for" (a short paragraph built from the stated requirements) -> "## Requirements" -> "## The ship and the trade" (bullets) -> "## How to apply".`,
  },
  {
    id: "checklist",
    outline: `A 2-3 sentence intro -> "## Is this vacancy right for you?" (yes/no questions drawn from the stated requirements) -> "## Requirements" -> "## Vessel and voyage" (bullets) -> "## How to apply".`,
  },
  {
    id: "narrative",
    outline: `Two short paragraphs without lists: the offer (rank, contract, pay), then the ship and its trade -> "## Requirements" (the only list) -> "## How to apply".`,
  },
  {
    id: "highlights",
    outline: `A 2 sentence intro -> "## Highlights of this offer" (bullets of the strongest stated facts: pay, contract length, vessel, trading area) -> "## Vessel particulars" -> "## Requirements" -> "## How to apply".`,
  },
  {
    id: "trade-first",
    outline: `"## Trading area and contract" (a short paragraph) -> a 2 sentence paragraph introducing the position -> "## Vessel particulars" -> "## Requirements" -> "## How to apply".`,
  },
  {
    id: "two-cards",
    outline: `A 1-2 sentence intro -> "## Position details" (bullets: rank, contract, salary, joining) -> "## Ship details" (bullets) -> "## Requirements" -> "## How to apply".`,
  },
  {
    id: "recap",
    outline: `A 2-3 sentence intro -> "## Vessel particulars" -> "## Requirements" -> "## In short" (a 2 sentence recap of the offer) -> "## How to apply".`,
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
