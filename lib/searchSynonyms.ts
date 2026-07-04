// Bilingual (RU / UA / PL ↔ EN) search for the jobs board.
//
// Vacancy titles/ranks/vessel types are stored in whatever language the
// agency posted. Seafarers search in their own language, so we expand a
// query into all equivalent terms across languages: typing "капитан" also
// matches "Master", and typing "master" matches "капитан".

// Each group lists equivalent maritime terms. Order/casing don't matter —
// everything is compared lower-cased.
const SYNONYM_GROUPS: string[][] = [
  // ── Deck officers ──
  ["master", "captain", "капитан", "капітан", "kapitan", "kapitän", "master mariner"],
  ["chief officer", "chief mate", "c/o", "старпом", "старший помощник", "старший помічник", "ст. помощник"],
  ["2nd officer", "second officer", "2/o", "второй помощник", "другий помічник"],
  ["3rd officer", "third officer", "3/o", "третий помощник", "третій помічник"],
  ["deck cadet", "палубный кадет", "палубный курсант", "курсант палубный"],
  // ── Engine officers ──
  ["chief engineer", "c/e", "стармех", "старший механик", "старший механік", "ст. механик"],
  ["2nd engineer", "second engineer", "2/e", "второй механик", "другий механік"],
  ["3rd engineer", "third engineer", "3/e", "третий механик", "третій механік"],
  ["4th engineer", "fourth engineer", "4/e", "четвертый механик"],
  ["engine cadet", "моторный кадет", "курсант механик"],
  ["eto", "electro-technical officer", "электромеханик", "электронщик", "етмех"],
  // ── Ratings ──
  ["bosun", "boatswain", "боцман"],
  ["able seaman", "able-bodied seaman", "ab seaman", "матрос", "матрос 1 класса", "матрос першого класу"],
  ["ordinary seaman", "os seaman", "матрос 2 класса", "ученик матроса"],
  ["motorman", "моторист"],
  ["oiler", "wiper", "смазчик", "уборщик"],
  ["fitter", "слесарь", "слюсар", "токарь"],
  ["welder", "сварщик", "зварювальник"],
  ["electrician", "электрик", "електрик"],
  ["pumpman", "помповый", "насосчик", "донкерман"],
  // ── Equipment operators ──
  ["excavator", "excavator operator", "экскаватор", "экскаваторщик", "екскаватор", "koparka", "operator koparki"],
  ["crane operator", "crane", "крановщик", "кранмейстер", "кран оператор", "операторкрана", "dźwig", "operator dźwigu"],
  ["bulldozer", "бульдозер", "бульдозерист", "spychacz"],
  ["dpo", "dynamic positioning", "дпо", "оператор динамического позиционирования", "динамическое позиционирование"],
  // ── Catering ──
  ["cook", "chief cook", "повар", "кок", "кухар"],
  ["steward", "messman", "стюард", "буфетчик", "вестовой"],
  // ── Vessel types ──
  ["tanker", "танкер", "танкерный"],
  ["oil tanker", "нефтяной танкер", "нефтетанкер", "crude"],
  ["chemical tanker", "химовоз", "химический танкер"],
  ["product tanker", "продуктовоз"],
  ["lng", "lng tanker", "газовоз lng", "сжиженный природный газ"],
  ["lpg", "lpg tanker", "газовоз", "сжиженный газ"],
  ["bulk carrier", "bulker", "балкер", "навалочное", "сухогруз балкер"],
  ["general cargo", "сухогруз", "генеральный груз", "генгруз"],
  ["container", "container ship", "контейнеровоз", "контейнер"],
  ["reefer", "рефрижератор", "рефрижераторное", "рефвоз"],
  ["roro", "ro-ro", "ролкер", "накатное"],
  ["car carrier", "pctc", "автомобилевоз", "автовоз"],
  ["cruise", "cruise ship", "круизное", "круизный лайнер", "лайнер"],
  ["ferry", "паром", "паромное"],
  ["offshore", "оффшор", "офшор", "шельф"],
  ["psv", "platform supply vessel", "снабженец"],
  ["ahts", "anchor handling", "якорезавозчик"],
  ["tug", "tugboat", "буксир"],
  ["dredger", "земснаряд", "дноуглубитель"],
  ["fishing", "fishing vessel", "рыболовное", "рыбопромысловое", "траулер", "trawler"],
  ["yacht", "superyacht", "яхта", "суперяхта"],
];

function tokenize(text: string): string[] {
  return text.toLowerCase().split(/[^a-zа-яіїєёґ0-9]+/i).filter(Boolean);
}

// A short code ("ab", "os", "c/o") must match a whole word to avoid matching
// inside unrelated words; longer terms match as a substring.
function termMatches(haystackText: string, haystackTokens: string[], term: string): boolean {
  if (term.length <= 3 || term.includes("/")) {
    return haystackTokens.includes(term.replace("/", ""));
  }
  return haystackText.includes(term);
}

// Expand a query into the set of equivalent terms across languages.
export function expandSearchTerms(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const out = new Set<string>([q]);
  for (const group of SYNONYM_GROUPS) {
    const hit = group.some((term) => q.includes(term) || (term.length >= 3 && term.includes(q)));
    if (hit) group.forEach((t) => out.add(t));
  }
  return [...out];
}

// True when `haystack` matches `query`, expanding the query bilingually.
export function searchMatches(haystack: string, query: string): boolean {
  const q = query.trim();
  if (!q) return true;
  const text = haystack.toLowerCase();
  const tokens = tokenize(haystack);
  return expandSearchTerms(q).some((term) => termMatches(text, tokens, term));
}
