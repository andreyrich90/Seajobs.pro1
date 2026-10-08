import type { Lang } from "@/lib/langs";
import { slavic } from "@/lib/plural";

// SEO landing pages for the most-searched vessel types, at /jobs/vessel/<slug>.
// Unlike ranks (exact match), vessel_type values are free-form strings from many
// import sources, so each landing matches by keywords against
// "<vessel_type> <title>" — the same idea as lib/fleets.ts. Slugs are clean,
// keyword-matching and must stay stable once indexed.

export type VesselLanding = {
  slug: string;
  keywords: string[];
  // A representative search term for the "all vacancies" CTA (/jobs?q=…).
  query: string;
  names: Record<Lang, string>;
  blurb: Partial<Record<Lang, string>>;
};

export const VESSEL_LANDINGS: VesselLanding[] = [
  {
    slug: "tanker", query: "tanker",
    keywords: ["tanker", "crude", "product tanker", "oil tanker", "vlcc", "suezmax", "aframax"],
    names: { en: "Tanker", ru: "Танкер", ua: "Танкер", pl: "Zbiornikowiec", ro: "Tanc petrolier" },
    blurb: {
      en: "Tankers carry crude oil, refined products and chemicals in bulk; crews need tanker-specific safety and cargo certificates.",
      ru: "Танкеры перевозят наливом сырую нефть, нефтепродукты и химию; экипажу нужны танкерные сертификаты по безопасности и грузовым операциям.",
      ua: "Танкери перевозять наливом сиру нафту, нафтопродукти й хімію; екіпажу потрібні танкерні сертифікати з безпеки та вантажних операцій.",
      pl: "Zbiornikowce przewożą luzem ropę, produkty naftowe i chemikalia; załoga potrzebuje specjalistycznych certyfikatów zbiornikowcowych.",
      ro: "Tancurile transportă în vrac țiței, produse petroliere și substanțe chimice; echipajul are nevoie de certificate specifice de tanc.",
    },
  },
  {
    slug: "chemical-tanker", query: "chemical tanker",
    keywords: ["chemical", "chem tanker", "oil/chemical", "oil / chemical"],
    names: { en: "Chemical Tanker", ru: "Химовоз", ua: "Хімовоз", pl: "Chemikaliowiec", ro: "Tanc chimic" },
    blurb: {
      en: "Chemical tankers carry liquid chemicals and require a Chemical Tanker endorsement and strict cargo-handling procedures.",
      ru: "Химовозы перевозят жидкую химию; требуется допуск по химовозам (Chemical Tanker) и строгие процедуры работы с грузом.",
      ua: "Хімовози перевозять рідку хімію; потрібен допуск по хімовозах (Chemical Tanker) і суворі процедури роботи з вантажем.",
      pl: "Chemikaliowce przewożą płynne chemikalia i wymagają uprawnień na chemikaliowce oraz ścisłych procedur obsługi ładunku.",
      ro: "Tancurile chimice transportă substanțe chimice lichide și necesită atestat de tanc chimic și proceduri stricte de manipulare a mărfii.",
    },
  },
  {
    slug: "bulk-carrier", query: "bulk carrier",
    keywords: ["bulk", "bulker", "handysize", "handymax", "supramax", "panamax", "capesize"],
    names: { en: "Bulk Carrier", ru: "Балкер", ua: "Балкер", pl: "Masowiec", ro: "Vrachier" },
    blurb: {
      en: "Bulk carriers transport dry bulk cargo such as grain, coal and ore; a staple of the merchant fleet worldwide.",
      ru: "Балкеры перевозят навалочные грузы — зерно, уголь, руду; одна из самых массовых должностей в торговом флоте.",
      ua: "Балкери перевозять навалочні вантажі — зерно, вугілля, руду; одна з найпоширеніших робіт у торговому флоті.",
      pl: "Masowce przewożą suche ładunki masowe, takie jak zboże, węgiel i rudy; podstawa światowej floty handlowej.",
      ro: "Vrachierele transportă mărfuri vrac uscate precum cereale, cărbune și minereu; un pilon al flotei comerciale mondiale.",
    },
  },
  {
    slug: "container-ship", query: "container",
    keywords: ["container", "feeder", "boxship"],
    names: { en: "Container Ship", ru: "Контейнеровоз", ua: "Контейнеровоз", pl: "Kontenerowiec", ro: "Portcontainer" },
    blurb: {
      en: "Container ships run fixed liner schedules carrying containerised cargo, from small feeders to ultra-large vessels.",
      ru: "Контейнеровозы работают на регулярных линиях и перевозят контейнеры — от небольших фидеров до сверхкрупных судов.",
      ua: "Контейнеровози працюють на регулярних лініях і перевозять контейнери — від невеликих фідерів до надвеликих суден.",
      pl: "Kontenerowce kursują na stałych liniach żeglugowych, przewożąc kontenery — od małych dowozowców po jednostki ultra-wielkie.",
      ro: "Portcontainerele operează pe linii regulate, transportând marfă în containere — de la feedere mici la nave ultra-mari.",
    },
  },
  {
    slug: "general-cargo", query: "general cargo",
    keywords: ["general cargo", "multipurpose", "multi-purpose", "mpp", "coaster", "heavy lift"],
    names: { en: "General Cargo / MPP", ru: "Генеральный груз / MPP", ua: "Генеральний вантаж / MPP", pl: "Drobnicowiec / MPP", ro: "Marfă generală / MPP" },
    blurb: {
      en: "General cargo and multipurpose vessels carry mixed and project cargo; common on short-sea and coaster trades.",
      ru: "Суда генерального груза и многоцелевые (MPP) перевозят разнородный и проектный груз; часто в каботаже и на короткой линии.",
      ua: "Судна генерального вантажу та багатоцільові (MPP) перевозять різнорідний і проєктний вантаж; часто в каботажі та на короткій лінії.",
      pl: "Drobnicowce i jednostki wielozadaniowe (MPP) przewożą ładunki drobnicowe i projektowe; częste w żegludze bliskiego zasięgu.",
      ro: "Navele de marfă generală și multifuncționale (MPP) transportă marfă mixtă și de proiect; frecvente pe rutele de coastă și short-sea.",
    },
  },
  {
    slug: "gas-carrier", query: "LNG LPG gas carrier",
    keywords: ["lng", "lpg", "gas carrier", "gas tanker", "ethylene"],
    names: { en: "Gas Carrier (LNG / LPG)", ru: "Газовоз (LNG / LPG)", ua: "Газовоз (LNG / LPG)", pl: "Gazowiec (LNG / LPG)", ro: "Navă de gaz (LNG / LPG)" },
    blurb: {
      en: "Gas carriers transport liquefied gas (LNG/LPG) and are among the highest-paying tankers, requiring gas-specific certificates.",
      ru: "Газовозы перевозят сжиженный газ (LNG/LPG) и относятся к самым высокооплачиваемым танкерам; нужны сертификаты по газовозам.",
      ua: "Газовози перевозять зріджений газ (LNG/LPG) і належать до найбільш високооплачуваних танкерів; потрібні сертифікати по газовозах.",
      pl: "Gazowce przewożą skroplony gaz (LNG/LPG) i należą do najlepiej płatnych zbiornikowców; wymagają certyfikatów gazowcowych.",
      ro: "Navele de gaz transportă gaz lichefiat (LNG/LPG) și sunt printre cele mai bine plătite tancuri; necesită certificate specifice de gaz.",
    },
  },
  {
    slug: "car-carrier", query: "car carrier PCTC",
    keywords: ["car carrier", "pctc", "pcc", "vehicle carrier", "pure car"],
    names: { en: "Car Carrier (PCTC)", ru: "Автовоз (PCTC)", ua: "Автовоз (PCTC)", pl: "Samochodowiec (PCTC)", ro: "Navă auto (PCTC)" },
    blurb: {
      en: "Car carriers (PCTC/PCC) transport cars and rolling cargo on multiple decks via internal ramps.",
      ru: "Автовозы (PCTC/PCC) перевозят автомобили и накатный груз на нескольких палубах по внутренним рампам.",
      ua: "Автовози (PCTC/PCC) перевозять автомобілі та накатний вантаж на кількох палубах внутрішніми рампами.",
      pl: "Samochodowce (PCTC/PCC) przewożą samochody i ładunki toczne na wielu pokładach za pomocą wewnętrznych ramp.",
      ro: "Navele auto (PCTC/PCC) transportă automobile și marfă rulantă pe mai multe punți, prin rampe interne.",
    },
  },
  {
    slug: "offshore", query: "offshore",
    keywords: ["offshore", "ahts", "psv", "osv", "supply vessel", "dp2", "dp3", "platform", "wind", "ctv", "sov", "survey", "rov", "diving", "construction vessel", "rock installation", "jack-up"],
    names: { en: "Offshore Vessel", ru: "Оффшорное судно", ua: "Офшорне судно", pl: "Statek offshore", ro: "Navă offshore" },
    blurb: {
      en: "Offshore vessels (AHTS, PSV, OSV, wind SOV/CTV) support oil, gas and wind operations at sea, often on rotation and day rates.",
      ru: "Оффшорные суда (AHTS, PSV, OSV, ветровые SOV/CTV) обслуживают нефтегаз и ветропарки в море; часто вахтовая работа и суточные ставки.",
      ua: "Офшорні судна (AHTS, PSV, OSV, вітрові SOV/CTV) обслуговують нафтогаз і вітропарки в морі; часто вахтова робота та добові ставки.",
      pl: "Jednostki offshore (AHTS, PSV, OSV, wiatrowe SOV/CTV) obsługują operacje naftowe, gazowe i wiatrowe na morzu, często w systemie rotacyjnym i stawkach dziennych.",
      ro: "Navele offshore (AHTS, PSV, OSV, SOV/CTV pentru eoliene) susțin operațiuni petroliere, de gaz și eoliene pe mare, adesea în rotație și cu tarife zilnice.",
    },
  },
  {
    slug: "cruise-ship", query: "cruise",
    keywords: ["cruise", "passenger", "yacht", "expedition"],
    names: { en: "Cruise Ship", ru: "Круизное судно", ua: "Круїзне судно", pl: "Wycieczkowiec", ro: "Navă de croazieră" },
    blurb: {
      en: "Cruise ships carry passengers and employ large marine, hotel and entertainment crews on scheduled voyages.",
      ru: "Круизные суда перевозят пассажиров и нанимают большие судовые, гостиничные и развлекательные экипажи на регулярных рейсах.",
      ua: "Круїзні судна перевозять пасажирів і наймають великі суднові, готельні та розважальні екіпажі на регулярних рейсах.",
      pl: "Wycieczkowce przewożą pasażerów i zatrudniają liczne załogi morskie, hotelowe i rozrywkowe na rejsach rozkładowych.",
      ro: "Navele de croazieră transportă pasageri și angajează echipaje mari — de punte/mașini, hoteliere și de divertisment — pe voiaje programate.",
    },
  },
  {
    slug: "ferry", query: "ferry ropax",
    keywords: ["ferry", "ropax", "ro-pax", "ro pax"],
    names: { en: "Ferry (RoPax)", ru: "Паром (RoPax)", ua: "Пором (RoPax)", pl: "Prom (RoPax)", ro: "Feribot (RoPax)" },
    blurb: {
      en: "Ferries and RoPax vessels carry passengers and vehicles on short fixed routes, often on equal-time rotations.",
      ru: "Паромы и суда RoPax перевозят пассажиров и транспорт на коротких регулярных линиях, часто по равномерным ротациям.",
      ua: "Пороми та судна RoPax перевозять пасажирів і транспорт на коротких регулярних лініях, часто за рівномірними ротаціями.",
      pl: "Promy i jednostki RoPax przewożą pasażerów i pojazdy na krótkich stałych trasach, często w równym systemie rotacji.",
      ro: "Feriboturile și navele RoPax transportă pasageri și vehicule pe rute scurte fixe, adesea în rotație egală.",
    },
  },
  {
    slug: "tug", query: "tug",
    keywords: ["tug", "tugboat", "asd", "escort", "pusher", "salvage"],
    names: { en: "Tug", ru: "Буксир", ua: "Буксир", pl: "Holownik", ro: "Remorcher" },
    blurb: {
      en: "Tugs assist berthing, towage and salvage operations in ports and at sea, usually on rotation contracts.",
      ru: "Буксиры выполняют швартовные операции, буксировку и спасательные работы в портах и в море, обычно по вахтовым контрактам.",
      ua: "Буксири виконують швартувальні операції, буксирування та рятувальні роботи в портах і в морі, зазвичай за вахтовими контрактами.",
      pl: "Holowniki wspomagają cumowanie, holowanie i akcje ratownicze w portach i na morzu, zwykle na kontraktach rotacyjnych.",
      ro: "Remorcherele asistă la acostare, remorcaj și operațiuni de salvare în porturi și pe mare, de obicei pe contracte în rotație.",
    },
  },
];

const BY_SLUG = new Map(VESSEL_LANDINGS.map((v) => [v.slug, v]));
export const VESSEL_LANDING_SLUGS = VESSEL_LANDINGS.map((v) => v.slug);

export function vesselLandingBySlug(slug: string): VesselLanding | undefined {
  return BY_SLUG.get(slug);
}

export function vesselName(v: VesselLanding, lang: Lang): string {
  return v.names[lang] ?? v.names.en;
}

/** "on bulk carriers", "на балкере" — the vessel as the end of a phrase. */
export const VESSEL_ON: Record<string, Record<Lang, string>> = {
  "tanker": { en: "on tankers", ru: "на танкере", ua: "на танкері", pl: "na zbiornikowcu", ro: "pe tancuri petroliere" },
  "chemical-tanker": { en: "on chemical tankers", ru: "на химовозе", ua: "на хімовозі", pl: "na chemikaliowcu", ro: "pe tancuri chimice" },
  "bulk-carrier": { en: "on bulk carriers", ru: "на балкере", ua: "на балкері", pl: "na masowcu", ro: "pe vrachiere" },
  "container-ship": { en: "on container ships", ru: "на контейнеровозе", ua: "на контейнеровозі", pl: "na kontenerowcu", ro: "pe portcontainere" },
  "general-cargo": { en: "on general cargo / MPP vessels", ru: "на судах генерального груза / MPP", ua: "на суднах генерального вантажу / MPP", pl: "na drobnicowcu / MPP", ro: "pe nave de marfă generală / MPP" },
  "gas-carrier": { en: "on gas carriers (LNG / LPG)", ru: "на газовозе (LNG / LPG)", ua: "на газовозі (LNG / LPG)", pl: "na gazowcu (LNG / LPG)", ro: "pe nave de gaz (LNG / LPG)" },
  "car-carrier": { en: "on car carriers (PCTC)", ru: "на автовозе (PCTC)", ua: "на автовозі (PCTC)", pl: "na samochodowcu (PCTC)", ro: "pe nave auto (PCTC)" },
  "offshore": { en: "on offshore vessels", ru: "на оффшорных судах", ua: "на офшорних суднах", pl: "na statkach offshore", ro: "pe nave offshore" },
  "cruise-ship": { en: "on cruise ships", ru: "на круизных судах", ua: "на круїзних суднах", pl: "na wycieczkowcach", ro: "pe nave de croazieră" },
  "ferry": { en: "on ferries (RoPax)", ru: "на пароме (RoPax)", ua: "на поромі (RoPax)", pl: "na promie (RoPax)", ro: "pe feriboturi (RoPax)" },
  "tug": { en: "on tugs", ru: "на буксире", ua: "на буксирі", pl: "na holowniku", ro: "pe remorchere" },
};

export function vesselOn(v: VesselLanding, lang: Lang): string {
  return VESSEL_ON[v.slug]?.[lang] ?? VESSEL_ON[v.slug]?.en ?? v.names.en;
}

// The English name seafarers search by, appended in titles where the local
// phrase does not already carry it — see RANK_TERM in lib/rankLandings.ts.
const VESSEL_TERM: Record<string, string> = {
  "tanker": "Tanker", "chemical-tanker": "Chemical Tanker", "bulk-carrier": "Bulk Carrier",
  "container-ship": "Container Ship", "general-cargo": "General Cargo", "gas-carrier": "LNG / LPG",
  "car-carrier": "Car Carrier", "offshore": "Offshore", "cruise-ship": "Cruise Ship",
  "ferry": "Ferry", "tug": "Tug",
};

/** "на балкере (Bulk Carrier)" — for titles. */
export function vesselSearchOn(v: VesselLanding, lang: Lang): string {
  const on = vesselOn(v, lang);
  const term = VESSEL_TERM[v.slug];
  if (lang === "en" || !term || on.toLowerCase().includes(term.toLowerCase())) return on;
  // "на пароме (RoPax)" → "на пароме (RoPax, Ferry)", not two brackets in a row.
  return on.endsWith(")") ? `${on.slice(0, -1)}, ${term})` : `${on} (${term})`;
}

/** Keyword match against "<vessel_type> <title>", mirroring lib/fleets.ts. */
export function vacancyMatchesVessel(vesselType: string | null, title: string, keywords: string[]): boolean {
  const hay = `${vesselType ?? ""} ${title}`.toLowerCase();
  return keywords.some((k) => hay.includes(k));
}

// ── Localized page copy ──────────────────────────────────────────────────────
type Copy = {
  home: string;
  jobsCrumb: string;
  metaTitle: (name: string) => string;
  metaDesc: (name: string) => string;
  h1: (name: string) => string;
  countLine: (n: number, name: string) => string;
  salaryLine: (min: string, max: string, cur: string) => string;
  rankLine: (ranks: string) => string;
  requirements: string;
  relatedHeading: string;
  allJobs: string;
  noneYet: (name: string) => string;
};

// Every function takes `on` — "on bulk carriers", "на балкере" — rather than
// the bare name: "Вакансии на Балкер" is what the nominative produced.
export const VESSEL_COPY: Record<Lang, Copy> = {
  en: {
    home: "Home",
    jobsCrumb: "Vacancies",
    metaTitle: (on) => `Jobs ${on} — maritime vacancies | SeaJobs.pro`,
    metaDesc: (on) => `Current vacancies ${on} from verified crewing agencies. Rank, salary and joining date for every posting. Apply free on SeaJobs.pro.`,
    h1: (on) => `Jobs ${on}`,
    countLine: (num, on) => num > 0
      ? `There ${num === 1 ? "is" : "are"} currently ${num} open ${num === 1 ? "vacancy" : "vacancies"} ${on} on SeaJobs.pro from verified crewing agencies.`
      : `New vacancies ${on} from verified crewing agencies are added to SeaJobs.pro regularly — check back soon or set a job alert.`,
    salaryLine: (min, max, cur) => `Salaries currently range from ${min} to ${max} ${cur} per month.`,
    rankLine: (r) => `Most in demand right now: ${r}.`,
    requirements: "Applicants usually need valid STCW certificates, a seafarer's medical and relevant sea-time. You can apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.",
    relatedHeading: "Other vessel types",
    allJobs: "All maritime vacancies",
    noneYet: (on) => `No open vacancies ${on} right now`,
  },
  ru: {
    home: "Главная",
    jobsCrumb: "Вакансии",
    metaTitle: (on) => `Работа ${on} — вакансии для моряков | SeaJobs.pro`,
    metaDesc: (on) => `Работа ${on}: актуальные вакансии от проверенных крюинговых агентств. Должность, зарплата и дата посадки в каждой. Отклик бесплатно на SeaJobs.pro.`,
    h1: (on) => `Работа ${on} — вакансии`,
    countLine: (num, on) => num > 0
      ? `Работа ${on}: сейчас на SeaJobs.pro ${slavic(num, "открыта", "открыто", "открыто")} ${num} ${slavic(num, "вакансия", "вакансии", "вакансий")} от проверенных крюинговых агентств.`
      : `Новые вакансии ${on} от проверенных крюингов появляются на SeaJobs.pro регулярно — загляните позже или включите оповещения.`,
    salaryLine: (min, max, cur) => `Зарплата сейчас — от ${min} до ${max} ${cur} в месяц.`,
    rankLine: (r) => `Сейчас чаще всего требуются: ${r}.`,
    requirements: "Обычно требуются действующие сертификаты STCW, судовая медкомиссия и опыт работы. Откликнуться можно прямо на SeaJobs.pro — ваша анкета уходит напрямую крюинг-менеджеру.",
    relatedHeading: "Другие типы судов",
    allJobs: "Все вакансии",
    noneYet: (on) => `Сейчас открытых вакансий ${on} нет`,
  },
  ua: {
    home: "Головна",
    jobsCrumb: "Вакансії",
    metaTitle: (on) => `Робота ${on} — вакансії для моряків | SeaJobs.pro`,
    metaDesc: (on) => `Робота ${on}: актуальні вакансії від перевірених крюїнгових агентств. Посада, зарплата й дата посадки в кожній. Відгук безкоштовно на SeaJobs.pro.`,
    h1: (on) => `Робота ${on} — вакансії`,
    countLine: (num, on) => num > 0
      ? `Робота ${on}: зараз на SeaJobs.pro ${slavic(num, "відкрита", "відкрито", "відкрито")} ${num} ${slavic(num, "вакансія", "вакансії", "вакансій")} від перевірених крюїнгових агентств.`
      : `Нові вакансії ${on} від перевірених крюїнгів з'являються на SeaJobs.pro регулярно — завітайте пізніше або увімкніть сповіщення.`,
    salaryLine: (min, max, cur) => `Зарплата зараз — від ${min} до ${max} ${cur} на місяць.`,
    rankLine: (r) => `Зараз найчастіше потрібні: ${r}.`,
    requirements: "Зазвичай потрібні чинні сертифікати STCW, суднова медкомісія та досвід роботи. Відгукнутися можна прямо на SeaJobs.pro — ваша анкета йде напряму крюїнг-менеджеру.",
    relatedHeading: "Інші типи суден",
    allJobs: "Усі вакансії",
    noneYet: (on) => `Зараз відкритих вакансій ${on} немає`,
  },
  pl: {
    home: "Strona główna",
    jobsCrumb: "Oferty pracy",
    metaTitle: (on) => `Praca ${on} — oferty dla marynarzy | SeaJobs.pro`,
    metaDesc: (on) => `Praca ${on}: aktualne oferty od zweryfikowanych agencji crewingowych. Stanowisko, wynagrodzenie i data zaokrętowania. Aplikuj za darmo na SeaJobs.pro.`,
    h1: (on) => `Praca ${on} — oferty`,
    countLine: (num, on) => num > 0
      ? `Praca ${on}: obecnie na SeaJobs.pro ${num === 1 ? "jest 1 oferta" : `${slavic(num, "jest", "są", "jest")} ${num} ${slavic(num, "ofert", "oferty", "ofert")}`} od zweryfikowanych agencji crewingowych.`
      : `Nowe oferty pracy ${on} od zweryfikowanych agencji pojawiają się na SeaJobs.pro regularnie — zajrzyj później lub ustaw powiadomienia.`,
    salaryLine: (min, max, cur) => `Wynagrodzenie obecnie wynosi od ${min} do ${max} ${cur} miesięcznie.`,
    rankLine: (r) => `Obecnie najczęściej poszukiwani: ${r}.`,
    requirements: "Zwykle wymagane są ważne certyfikaty STCW, marynarskie badania lekarskie i doświadczenie. Możesz aplikować bezpośrednio przez SeaJobs.pro — Twoje CV trafia prosto do menedżera crewingu.",
    relatedHeading: "Inne typy statków",
    allJobs: "Wszystkie oferty pracy",
    noneYet: (on) => `Obecnie brak ofert pracy ${on}`,
  },
  ro: {
    home: "Acasă",
    jobsCrumb: "Posturi",
    metaTitle: (on) => `Joburi ${on} — posturi maritime | SeaJobs.pro`,
    metaDesc: (on) => `Joburi ${on}: posturi actuale de la agenții de crewing verificate. Funcție, salariu și data îmbarcării pentru fiecare. Aplică gratuit pe SeaJobs.pro.`,
    h1: (on) => `Joburi ${on}`,
    countLine: (num, on) => num > 0
      ? `În prezent, pe SeaJobs.pro ${num === 1 ? "este 1 post deschis" : `sunt ${num} posturi deschise`} ${on}, de la agenții de crewing verificate.`
      : `Posturi noi ${on} de la agenții verificate apar regulat pe SeaJobs.pro — revino mai târziu sau setează o alertă.`,
    salaryLine: (min, max, cur) => `Salariile variază în prezent între ${min} și ${max} ${cur} pe lună.`,
    rankLine: (r) => `Cele mai căutate acum: ${r}.`,
    requirements: "De obicei sunt necesare certificate STCW valabile, aviz medical maritim și experiență. Poți aplica direct prin SeaJobs.pro — CV-ul tău ajunge direct la managerul de crewing.",
    relatedHeading: "Alte tipuri de nave",
    allJobs: "Toate posturile maritime",
    noneYet: (on) => `Momentan nu există posturi ${on}`,
  },
};
