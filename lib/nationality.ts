// Turning the free-text `seafarers.nationality` into a country you can count.
//
// The field is an <input type="text"> on the profile form, and it is also
// filled by the CV parser from whatever the uploaded document said. So the
// column holds "Ukraine", "Ukrainian", "UA", "Україна", "Украина", "ukrainian
// citizen" and a fair number of typos — all the same country. Counting the raw
// values would produce a list of near-duplicates that looks like data and
// isn't.
//
// Coverage is deliberately weighted to this board's audience (Ukraine, Poland,
// the Baltics, Romania) plus the nationalities that crew the world fleet.
// Anything unrecognised is reported separately rather than swept into "Other",
// so a spelling nobody anticipated shows up as something to add here instead of
// quietly vanishing.

export type Country = { code: string; name: string; flag: string };

/** Canonical countries, keyed by ISO 3166-1 alpha-2. */
const COUNTRIES: Record<string, Country> = {
  UA: { code: "UA", name: "Ukraine", flag: "🇺🇦" },
  PL: { code: "PL", name: "Poland", flag: "🇵🇱" },
  RO: { code: "RO", name: "Romania", flag: "🇷🇴" },
  RU: { code: "RU", name: "Russia", flag: "🇷🇺" },
  BG: { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  HR: { code: "HR", name: "Croatia", flag: "🇭🇷" },
  LV: { code: "LV", name: "Latvia", flag: "🇱🇻" },
  LT: { code: "LT", name: "Lithuania", flag: "🇱🇹" },
  EE: { code: "EE", name: "Estonia", flag: "🇪🇪" },
  GE: { code: "GE", name: "Georgia", flag: "🇬🇪" },
  MD: { code: "MD", name: "Moldova", flag: "🇲🇩" },
  BY: { code: "BY", name: "Belarus", flag: "🇧🇾" },
  AZ: { code: "AZ", name: "Azerbaijan", flag: "🇦🇿" },
  KZ: { code: "KZ", name: "Kazakhstan", flag: "🇰🇿" },
  TR: { code: "TR", name: "Turkey", flag: "🇹🇷" },
  PH: { code: "PH", name: "Philippines", flag: "🇵🇭" },
  IN: { code: "IN", name: "India", flag: "🇮🇳" },
  ID: { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  MM: { code: "MM", name: "Myanmar", flag: "🇲🇲" },
  CN: { code: "CN", name: "China", flag: "🇨🇳" },
  VN: { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  LK: { code: "LK", name: "Sri Lanka", flag: "🇱🇰" },
  BD: { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
  PK: { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  EG: { code: "EG", name: "Egypt", flag: "🇪🇬" },
  GR: { code: "GR", name: "Greece", flag: "🇬🇷" },
  IT: { code: "IT", name: "Italy", flag: "🇮🇹" },
  ES: { code: "ES", name: "Spain", flag: "🇪🇸" },
  PT: { code: "PT", name: "Portugal", flag: "🇵🇹" },
  DE: { code: "DE", name: "Germany", flag: "🇩🇪" },
  NL: { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  NO: { code: "NO", name: "Norway", flag: "🇳🇴" },
  DK: { code: "DK", name: "Denmark", flag: "🇩🇰" },
  SE: { code: "SE", name: "Sweden", flag: "🇸🇪" },
  GB: { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  RS: { code: "RS", name: "Serbia", flag: "🇷🇸" },
  SK: { code: "SK", name: "Slovakia", flag: "🇸🇰" },
  CZ: { code: "CZ", name: "Czechia", flag: "🇨🇿" },
  HU: { code: "HU", name: "Hungary", flag: "🇭🇺" },
  GH: { code: "GH", name: "Ghana", flag: "🇬🇭" },
  NG: { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  ZA: { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  BR: { code: "BR", name: "Brazil", flag: "🇧🇷" },
  AR: { code: "AR", name: "Argentina", flag: "🇦🇷" },
  US: { code: "US", name: "United States", flag: "🇺🇸" },
};

// Every spelling that resolves to a country: the English name, the local name,
// the adjective form people actually type, the ISO code, and the Cyrillic
// forms — a Ukrainian seafarer filling a Russian-language form writes
// "Украина", the same man on the Ukrainian form writes "Україна".
const ALIASES: Record<string, string[]> = {
  UA: ["ukraine", "ukrainian", "ukrainia", "ukr", "ua", "україна", "украина", "українець", "українка", "украинец", "украинка", "ukraina", "ukrainskaya", "ukrainian citizen"],
  PL: ["poland", "polish", "pol", "pl", "polska", "polak", "польша", "польща", "поляк", "polonia"],
  RO: ["romania", "romanian", "rou", "ro", "românia", "roman", "румыния", "румунія", "roumania"],
  RU: ["russia", "russian", "rus", "ru", "россия", "росія", "русский", "российская федерация", "russian federation"],
  BG: ["bulgaria", "bulgarian", "bgr", "bg", "българия", "болгария"],
  HR: ["croatia", "croatian", "hrv", "hr", "hrvatska", "хорватия"],
  LV: ["latvia", "latvian", "lva", "lv", "latvija", "латвия"],
  LT: ["lithuania", "lithuanian", "ltu", "lt", "lietuva", "литва"],
  EE: ["estonia", "estonian", "est", "ee", "eesti", "эстония"],
  GE: ["georgia", "georgian", "geo", "ge", "საქართველო", "грузия", "сакартвело"],
  MD: ["moldova", "moldovan", "mda", "md", "молдова", "молдавия"],
  BY: ["belarus", "belarusian", "blr", "by", "беларусь", "белоруссия", "білорусь"],
  AZ: ["azerbaijan", "azerbaijani", "aze", "az", "азербайджан"],
  KZ: ["kazakhstan", "kazakh", "kaz", "kz", "казахстан"],
  TR: ["turkey", "turkish", "tur", "tr", "türkiye", "turkiye", "турция"],
  PH: ["philippines", "filipino", "philippine", "phl", "ph", "pilipinas", "филиппины", "filipino citizen"],
  IN: ["india", "indian", "ind", "in", "индия"],
  ID: ["indonesia", "indonesian", "idn", "id", "индонезия"],
  MM: ["myanmar", "burmese", "burma", "mmr", "mm", "мьянма"],
  CN: ["china", "chinese", "chn", "cn", "китай"],
  VN: ["vietnam", "vietnamese", "vnm", "vn", "viet nam", "вьетнам"],
  LK: ["sri lanka", "sri lankan", "lka", "lk", "srilanka", "шри-ланка"],
  BD: ["bangladesh", "bangladeshi", "bgd", "bd", "бангладеш"],
  PK: ["pakistan", "pakistani", "pak", "pk", "пакистан"],
  EG: ["egypt", "egyptian", "egy", "eg", "египет"],
  GR: ["greece", "greek", "grc", "gr", "ελλάδα", "греция"],
  IT: ["italy", "italian", "ita", "it", "italia", "италия"],
  ES: ["spain", "spanish", "esp", "es", "españa", "espana", "испания"],
  PT: ["portugal", "portuguese", "prt", "pt", "португалия"],
  DE: ["germany", "german", "deu", "de", "deutschland", "германия"],
  NL: ["netherlands", "dutch", "nld", "nl", "holland", "нидерланды", "голландия"],
  NO: ["norway", "norwegian", "nor", "no", "norge", "норвегия"],
  DK: ["denmark", "danish", "dnk", "dk", "danmark", "дания"],
  SE: ["sweden", "swedish", "swe", "se", "sverige", "швеция"],
  GB: ["united kingdom", "uk", "gbr", "gb", "britain", "great britain", "british", "england", "english", "scotland", "wales", "великобритания", "англия"],
  RS: ["serbia", "serbian", "srb", "rs", "srbija", "сербия"],
  SK: ["slovakia", "slovak", "svk", "sk", "slovensko", "словакия"],
  CZ: ["czechia", "czech", "cze", "cz", "czech republic", "чехия"],
  HU: ["hungary", "hungarian", "hun", "hu", "magyarország", "венгрия"],
  GH: ["ghana", "ghanaian", "gha", "gh", "гана"],
  NG: ["nigeria", "nigerian", "nga", "ng", "нигерия"],
  ZA: ["south africa", "south african", "zaf", "za", "южная африка", "юар"],
  BR: ["brazil", "brazilian", "bra", "br", "brasil", "бразилия"],
  AR: ["argentina", "argentinian", "arg", "ar", "аргентина"],
  US: ["united states", "usa", "american", "us", "u.s.a.", "united states of america", "сша", "америка"],
};

const LOOKUP = new Map<string, string>();
for (const [code, names] of Object.entries(ALIASES)) {
  for (const n of names) LOOKUP.set(n, code);
}

/**
 * Free text → ISO country code, or null when nothing matches.
 *
 * Two-letter codes are only honoured as the whole value: "in" inside a longer
 * phrase is the English preposition far more often than it is India.
 */
export function normalizeNationality(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const s = raw
    .toLowerCase()
    .replace(/[.,;/\\()]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!s) return null;

  const exact = LOOKUP.get(s);
  if (exact) return exact;

  // Longest alias first, so "south africa" is not decided by "africa" and
  // "sri lanka" is not shadowed by a shorter entry.
  let best: { code: string; len: number } | null = null;
  for (const [alias, code] of LOOKUP) {
    if (alias.length <= 2) continue; // codes must be the whole value
    if (s.includes(alias) && (!best || alias.length > best.len)) {
      best = { code, len: alias.length };
    }
  }
  return best?.code ?? null;
}

/** Display data for a code from `normalizeNationality`. */
export function countryOf(code: string): Country {
  return COUNTRIES[code] ?? { code, name: code, flag: "🏳️" };
}
