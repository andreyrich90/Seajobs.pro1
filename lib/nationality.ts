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
  // Africa and the Middle East — most of the values the first list missed.
  TZ: { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
  ET: { code: "ET", name: "Ethiopia", flag: "🇪🇹" },
  KE: { code: "KE", name: "Kenya", flag: "🇰🇪" },
  MA: { code: "MA", name: "Morocco", flag: "🇲🇦" },
  TN: { code: "TN", name: "Tunisia", flag: "🇹🇳" },
  DZ: { code: "DZ", name: "Algeria", flag: "🇩🇿" },
  LY: { code: "LY", name: "Libya", flag: "🇱🇾" },
  SD: { code: "SD", name: "Sudan", flag: "🇸🇩" },
  DJ: { code: "DJ", name: "Djibouti", flag: "🇩🇯" },
  SN: { code: "SN", name: "Senegal", flag: "🇸🇳" },
  AO: { code: "AO", name: "Angola", flag: "🇦🇴" },
  ZW: { code: "ZW", name: "Zimbabwe", flag: "🇿🇼" },
  MU: { code: "MU", name: "Mauritius", flag: "🇲🇺" },
  IR: { code: "IR", name: "Iran", flag: "🇮🇷" },
  IQ: { code: "IQ", name: "Iraq", flag: "🇮🇶" },
  SY: { code: "SY", name: "Syria", flag: "🇸🇾" },
  JO: { code: "JO", name: "Jordan", flag: "🇯🇴" },
  LB: { code: "LB", name: "Lebanon", flag: "🇱🇧" },
  SA: { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  YE: { code: "YE", name: "Yemen", flag: "🇾🇪" },
  OM: { code: "OM", name: "Oman", flag: "🇴🇲" },
  // Asia and Oceania
  MY: { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  KR: { code: "KR", name: "South Korea", flag: "🇰🇷" },
  AM: { code: "AM", name: "Armenia", flag: "🇦🇲" },
  NZ: { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  // Europe
  ME: { code: "ME", name: "Montenegro", flag: "🇲🇪" },
  MK: { code: "MK", name: "North Macedonia", flag: "🇲🇰" },
  SI: { code: "SI", name: "Slovenia", flag: "🇸🇮" },
  FI: { code: "FI", name: "Finland", flag: "🇫🇮" },
  FR: { code: "FR", name: "France", flag: "🇫🇷" },
  BE: { code: "BE", name: "Belgium", flag: "🇧🇪" },
  AT: { code: "AT", name: "Austria", flag: "🇦🇹" },
  CH: { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  IE: { code: "IE", name: "Ireland", flag: "🇮🇪" },
  // The Americas
  MX: { code: "MX", name: "Mexico", flag: "🇲🇽" },
  PA: { code: "PA", name: "Panama", flag: "🇵🇦" },
  CO: { code: "CO", name: "Colombia", flag: "🇨🇴" },
  PE: { code: "PE", name: "Peru", flag: "🇵🇪" },
  VE: { code: "VE", name: "Venezuela", flag: "🇻🇪" },
  CL: { code: "CL", name: "Chile", flag: "🇨🇱" },
  HN: { code: "HN", name: "Honduras", flag: "🇭🇳" },
  GT: { code: "GT", name: "Guatemala", flag: "🇬🇹" },
  SV: { code: "SV", name: "El Salvador", flag: "🇸🇻" },
  CR: { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
  JM: { code: "JM", name: "Jamaica", flag: "🇯🇲" },
  GY: { code: "GY", name: "Guyana", flag: "🇬🇾" },
  VC: { code: "VC", name: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
};

// Every spelling that resolves to a country: the English name, the local name,
// the adjective form people actually type, the ISO code, and the Cyrillic
// forms — a Ukrainian seafarer filling a Russian-language form writes
// "Украина", the same man on the Ukrainian form writes "Україна".
const ALIASES: Record<string, string[]> = {
  UA: ["ukraine", "ukrainian", "ukrainia", "ukr", "ua", "україна", "украина", "українець", "українка", "украинец", "украинка", "ukraina", "ukrainskaya", "ukrainian citizen", "ukranian"],
  PL: ["poland", "polish", "pol", "pl", "polska", "polak", "польша", "польща", "поляк", "polonia"],
  RO: ["romania", "romanian", "rou", "ro", "românia", "roman", "румыния", "румунія", "roumania", "rumania", "rumanian"],
  RU: ["russia", "russian", "rus", "ru", "россия", "росія", "русский", "российская федерация", "russian federation"],
  BG: ["bulgaria", "bulgarian", "bgr", "bg", "българия", "болгария"],
  HR: ["croatia", "croatian", "hrv", "hr", "hrvatska", "хорватия"],
  LV: ["latvia", "latvian", "lva", "lv", "latvija", "латвия"],
  LT: ["lithuania", "lithuanian", "ltu", "lt", "lietuva", "литва"],
  EE: ["estonia", "estonian", "est", "ee", "eesti", "эстония"],
  GE: ["georgia", "georgian", "geo", "ge", "საქართველო", "грузия", "сакартвело"],
  MD: ["moldova", "moldovan", "mda", "md", "молдова", "молдавия"],
  BY: ["belarus", "belarusian", "blr", "by", "беларусь", "белоруссия", "білорусь"],
  AZ: ["azerbaijan", "azerbaijani", "aze", "az", "азербайджан", "azerbajan", "azərbaycan"],
  KZ: ["kazakhstan", "kazakh", "kaz", "kz", "казахстан", "kazah"],
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
  EG: ["egypt", "egyptian", "egy", "eg", "египет", "مصر"],
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
  // Names and adjectives only for these: their ISO codes ("sa", "me", "co"…)
  // are ordinary words or other countries' initials far more often.
  TZ: ["tanzania", "tanzanian", "танзания"],
  ET: ["ethiopia", "ethiopian", "эфиопия"],
  KE: ["kenya", "kenyan", "кения"],
  MA: ["morocco", "moroccan", "maroc", "марокко"],
  TN: ["tunisia", "tunisian", "тунис"],
  DZ: ["algeria", "algerian", "алжир"],
  LY: ["libya", "libyan", "ливия"],
  SD: ["sudan", "sudanese", "судан"],
  DJ: ["djibouti", "djiboutian", "джибути"],
  SN: ["senegal", "senegalese", "сенегал"],
  AO: ["angola", "angolan", "ангола"],
  ZW: ["zimbabwe", "zimbabwean", "зимбабве"],
  MU: ["mauritius", "mauritian", "маврикий"],
  IR: ["iran", "iranian", "иран"],
  IQ: ["iraq", "iraqi", "ирак"],
  SY: ["syria", "syrian", "сирия"],
  JO: ["jordan", "jordanian", "иордания"],
  LB: ["lebanon", "lebanese", "ливан"],
  SA: ["saudi", "saudi arabia", "saudi arabian", "саудовская аравия"],
  YE: ["yemen", "yemeni", "йемен"],
  OM: ["oman", "omani", "оман"],
  MY: ["malaysia", "malaysian", "малайзия"],
  KR: ["south korea", "south korean", "korea", "korean", "republic of korea", "корея"],
  AM: ["armenia", "armenian", "армения"],
  NZ: ["new zealand", "new zealander", "новая зеландия"],
  ME: ["montenegro", "montenegrin", "черногория"],
  MK: ["north macedonia", "macedonia", "macedonian", "македония"],
  SI: ["slovenia", "slovenian", "slovene", "словения"],
  FI: ["finland", "finnish", "финляндия"],
  FR: ["france", "french", "франция"],
  BE: ["belgium", "belgian", "бельгия"],
  AT: ["austria", "austrian", "австрия"],
  CH: ["switzerland", "swiss", "швейцария"],
  IE: ["ireland", "irish", "ирландия"],
  MX: ["mexico", "méxico", "mexican", "мексика"],
  PA: ["panama", "panamanian", "панама"],
  CO: ["colombia", "colombian", "колумбия"],
  PE: ["peru", "peruvian", "перу"],
  VE: ["venezuela", "venezuelan", "венесуэла"],
  CL: ["chile", "chilean", "чили"],
  HN: ["honduras", "honduran", "гондурас"],
  GT: ["guatemala", "guatemalan", "гватемала"],
  SV: ["el salvador", "salvadoran", "salvadorian", "сальвадор"],
  CR: ["costa rica", "costa rican", "коста-рика"],
  JM: ["jamaica", "jamaican", "ямайка"],
  GY: ["guyana", "guyanese", "гайана"],
  VC: ["saint vincent", "st vincent", "vincentian"],
};

const LOOKUP = new Map<string, string>();
for (const [code, names] of Object.entries(ALIASES)) {
  for (const n of names) LOOKUP.set(n, code);
}

// Every alias of three letters or more, as a pattern that only matches where a
// word starts. A plain substring test read "North Macedonia" as Norway ("nor")
// and "Salvadoran" as Latvia ("lva"). Three-letter codes must also end the
// word; longer names may run on, so "Indiann" and "Srilankan" still land.
const PATTERNS: { re: RegExp; code: string; len: number }[] = [];
for (const [alias, code] of LOOKUP) {
  if (alias.length <= 2) continue; // codes must be the whole value
  const body = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tail = alias.length === 3 ? "(?![\\p{L}\\p{M}])" : "";
  PATTERNS.push({ re: new RegExp(`(?<![\\p{L}\\p{M}])${body}${tail}`, "u"), code, len: alias.length });
}

/**
 * Free text → ISO country code, or null when nothing matches.
 *
 * Two-letter codes are only honoured as the whole value: "in" inside a longer
 * phrase is the English preposition far more often than it is India. When the
 * text names two countries ("Ukrainian/Romanian", "Russia, Ukraine") the first
 * one written counts: that is the one the seafarer put first, and picking the
 * longer name instead made the result depend on spelling.
 */
export function normalizeNationality(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const s = raw
    .toLowerCase()
    .replace(/[.,;/\\()&|+]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!s) return null;

  const exact = LOOKUP.get(s);
  if (exact) return exact;

  // Earliest match first; at the same spot the longer alias, so "south africa"
  // is not decided by a shorter entry that starts there too.
  let best: { code: string; at: number; len: number } | null = null;
  for (const p of PATTERNS) {
    const m = p.re.exec(s);
    if (!m) continue;
    if (!best || m.index < best.at || (m.index === best.at && p.len > best.len)) {
      best = { code: p.code, at: m.index, len: p.len };
    }
  }
  return best?.code ?? null;
}

/** Display data for a code from `normalizeNationality`. */
export function countryOf(code: string): Country {
  return COUNTRIES[code] ?? { code, name: code, flag: "🏳️" };
}
