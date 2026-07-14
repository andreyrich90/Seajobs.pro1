import type { Lang } from "@/lib/i18n";

// SEO landing pages for the countries whose crewing agencies post on the board,
// at /jobs/country/<slug>. A vacancy belongs to a country when its agency
// location (companies.location) or its stored country matches the country's
// keywords (name + major maritime cities). Slugs must stay stable once indexed.

export type CountryLanding = {
  slug: string;
  keywords: string[];
  names: Record<Lang, string>;
  blurb: Partial<Record<Lang, string>>;
};

export const COUNTRY_LANDINGS: CountryLanding[] = [
  {
    slug: "poland",
    keywords: ["poland", "polska", "gdynia", "gdansk", "gdańsk", "szczecin", "sopot", "szemud", "świnoujście", "swinoujscie", "warsaw", "warszawa", "gdnia"],
    names: { en: "Poland", ru: "Польша", ua: "Польща", pl: "Polska", ro: "Polonia" },
    blurb: {
      en: "Poland is one of Europe's biggest crewing hubs, with agencies in Gdynia, Gdańsk and Szczecin recruiting for merchant, offshore and passenger fleets.",
      ru: "Польша — один из крупнейших крюинговых центров Европы: агентства в Гдыне, Гданьске и Щецине набирают экипажи на торговый, оффшорный и пассажирский флот.",
      ua: "Польща — один із найбільших крюїнгових центрів Європи: агентства в Гдині, Гданську та Щецині набирають екіпажі на торговий, офшорний і пасажирський флот.",
    },
  },
  {
    slug: "ukraine",
    keywords: ["ukraine", "україна", "украина", "odessa", "odesa", "одесса", "одеса", "kyiv", "kiev", "mykolaiv", "kherson", "mariupol"],
    names: { en: "Ukraine", ru: "Украина", ua: "Україна", pl: "Ukraina", ro: "Ucraina" },
    blurb: {
      en: "Ukraine supplies a large share of the world's officers and ratings, with crewing agencies concentrated in Odesa.",
      ru: "Украина даёт значительную часть мировых офицеров и рядового состава; крюинговые агентства сосредоточены в Одессе.",
      ua: "Україна дає значну частину світових офіцерів і рядового складу; крюїнгові агентства зосереджені в Одесі.",
    },
  },
  {
    slug: "latvia",
    keywords: ["latvia", "latvija", "riga", "rīga", "рига", "латвия", "ventspils", "liepaja"],
    names: { en: "Latvia", ru: "Латвия", ua: "Латвія", pl: "Łotwa", ro: "Letonia" },
    blurb: {
      en: "Latvia's crewing agencies, based mainly in Riga, recruit seafarers for merchant and offshore fleets across Europe.",
      ru: "Крюинговые агентства Латвии, в основном в Риге, набирают моряков на торговый и оффшорный флот по всей Европе.",
      ua: "Крюїнгові агентства Латвії, здебільшого в Ризі, набирають моряків на торговий і офшорний флот по всій Європі.",
    },
  },
  {
    slug: "lithuania",
    keywords: ["lithuania", "lietuva", "klaipeda", "klaipėda", "клайпеда", "литва", "vilnius"],
    names: { en: "Lithuania", ru: "Литва", ua: "Литва", pl: "Litwa", ro: "Lituania" },
    blurb: {
      en: "Lithuania's maritime industry centres on Klaipeda, whose crewing agencies recruit for cargo, offshore and specialised vessels.",
      ru: "Морская отрасль Литвы сосредоточена в Клайпеде, откуда крюинговые агентства набирают экипажи на грузовой, оффшорный и специализированный флот.",
      ua: "Морська галузь Литви зосереджена в Клайпеді, звідки крюїнгові агентства набирають екіпажі на вантажний, офшорний і спеціалізований флот.",
    },
  },
  {
    slug: "greece",
    keywords: ["greece", "athens", "piraeus", "греция", "афины", "греція"],
    names: { en: "Greece", ru: "Греция", ua: "Греція", pl: "Grecja", ro: "Grecia" },
    blurb: {
      en: "Greece is home to the world's largest ship-owning community; its agencies crew tankers, bulkers and container ships worldwide.",
      ru: "Греция — крупнейшее в мире судовладельческое сообщество; её агентства комплектуют танкеры, балкеры и контейнеровозы по всему миру.",
      ua: "Греція — найбільша у світі судновласницька спільнота; її агентства комплектують танкери, балкери та контейнеровози по всьому світу.",
    },
  },
  {
    slug: "malta",
    keywords: ["malta", "valletta", "birzebbuga", "birżebbuġa", "мальта"],
    names: { en: "Malta", ru: "Мальта", ua: "Мальта", pl: "Malta", ro: "Malta" },
    blurb: {
      en: "Malta, one of the world's largest ship registries, hosts crewing agencies recruiting for internationally traded fleets.",
      ru: "Мальта — один из крупнейших судовых регистров мира; здесь работают крюинговые агентства для судов международного плавания.",
      ua: "Мальта — один із найбільших суднових регістрів світу; тут працюють крюїнгові агентства для суден міжнародного плавання.",
    },
  },
  {
    slug: "united-kingdom",
    keywords: ["united kingdom", "great britain", "england", "scotland", "aberdeen", "hull", "glasgow", "london", "великобритания", "британия"],
    names: { en: "United Kingdom", ru: "Великобритания", ua: "Велика Британія", pl: "Wielka Brytania", ro: "Marea Britanie" },
    blurb: {
      en: "The UK, and Aberdeen in particular, is a major hub for offshore and wind-farm crewing alongside merchant recruitment.",
      ru: "Великобритания, и особенно Абердин, — крупный центр найма на оффшор и ветропарки, а также на торговый флот.",
      ua: "Велика Британія, і особливо Абердин, — великий центр найму на офшор і вітропарки, а також на торговий флот.",
    },
  },
];

const BY_SLUG = new Map(COUNTRY_LANDINGS.map((c) => [c.slug, c]));
export const COUNTRY_LANDING_SLUGS = COUNTRY_LANDINGS.map((c) => c.slug);

export function countryLandingBySlug(slug: string): CountryLanding | undefined {
  return BY_SLUG.get(slug);
}

export function countryName(c: CountryLanding, lang: Lang): string {
  return c.names[lang] ?? c.names.en;
}

/** Match a vacancy to a country by its agency location or stored country. */
export function vacancyMatchesCountry(location: string | null, country: string | null, keywords: string[]): boolean {
  const hay = `${location ?? ""} ${country ?? ""}`.toLowerCase();
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
  agencyLine: (agencies: string) => string;
  requirements: string;
  relatedHeading: string;
  allJobs: string;
  noneYet: (name: string) => string;
};

export const COUNTRY_COPY: Record<Lang, Copy> = {
  en: {
    home: "Home",
    jobsCrumb: "Vacancies",
    metaTitle: (n) => `Maritime jobs — ${n} crewing agencies | SeaJobs.pro`,
    metaDesc: (n) => `Current maritime vacancies from crewing agencies in ${n}. Rank, vessel, salary and joining date for every posting. Apply free on SeaJobs.pro.`,
    h1: (n) => `Maritime jobs — ${n}`,
    countLine: (num, n) => num > 0
      ? `There ${num === 1 ? "is" : "are"} currently ${num} open ${num === 1 ? "vacancy" : "vacancies"} from crewing agencies in ${n} on SeaJobs.pro.`
      : `New vacancies from crewing agencies in ${n} are added to SeaJobs.pro regularly — check back soon or set a job alert.`,
    salaryLine: (min, max, cur) => `Salaries currently range from ${min} to ${max} ${cur} per month.`,
    agencyLine: (a) => `Agencies hiring now include ${a}.`,
    requirements: "Applicants usually need valid STCW certificates, a seafarer's medical and relevant sea-time. You can apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.",
    relatedHeading: "Other countries",
    allJobs: "All maritime vacancies",
    noneYet: (n) => `No open vacancies from ${n} agencies right now`,
  },
  ru: {
    home: "Главная",
    jobsCrumb: "Вакансии",
    metaTitle: (n) => `Работа моряком — крюинг ${n} | SeaJobs.pro`,
    metaDesc: (n) => `Актуальные вакансии от крюинговых агентств: ${n}. Должность, судно, зарплата и дата посадки в каждой. Отклик бесплатно на SeaJobs.pro.`,
    h1: (n) => `Работа моряком — ${n}`,
    countLine: (num, n) => num > 0
      ? `Сейчас на SeaJobs.pro открыто ${num} ${num === 1 ? "вакансия" : "вакансий"} от крюинговых агентств: ${n}.`
      : `Новые вакансии от крюинговых агентств (${n}) появляются на SeaJobs.pro регулярно — загляните позже или включите оповещения.`,
    salaryLine: (min, max, cur) => `Зарплата сейчас — от ${min} до ${max} ${cur} в месяц.`,
    agencyLine: (a) => `Сейчас набирают агентства: ${a}.`,
    requirements: "Обычно требуются действующие сертификаты STCW, судовая медкомиссия и опыт работы. Откликнуться можно прямо на SeaJobs.pro — ваша анкета уходит напрямую крюинг-менеджеру.",
    relatedHeading: "Другие страны",
    allJobs: "Все вакансии",
    noneYet: (n) => `Сейчас открытых вакансий от агентств (${n}) нет`,
  },
  ua: {
    home: "Головна",
    jobsCrumb: "Вакансії",
    metaTitle: (n) => `Робота моряком — крюїнг ${n} | SeaJobs.pro`,
    metaDesc: (n) => `Актуальні вакансії від крюїнгових агентств: ${n}. Посада, судно, зарплата й дата посадки в кожній. Відгук безкоштовно на SeaJobs.pro.`,
    h1: (n) => `Робота моряком — ${n}`,
    countLine: (num, n) => num > 0
      ? `Зараз на SeaJobs.pro відкрито ${num} ${num === 1 ? "вакансію" : "вакансій"} від крюїнгових агентств: ${n}.`
      : `Нові вакансії від крюїнгових агентств (${n}) з'являються на SeaJobs.pro регулярно — завітайте пізніше або увімкніть сповіщення.`,
    salaryLine: (min, max, cur) => `Зарплата зараз — від ${min} до ${max} ${cur} на місяць.`,
    agencyLine: (a) => `Зараз набирають агентства: ${a}.`,
    requirements: "Зазвичай потрібні чинні сертифікати STCW, суднова медкомісія та досвід роботи. Відгукнутися можна прямо на SeaJobs.pro — ваша анкета йде напряму крюїнг-менеджеру.",
    relatedHeading: "Інші країни",
    allJobs: "Усі вакансії",
    noneYet: (n) => `Зараз відкритих вакансій від агентств (${n}) немає`,
  },
  pl: {
    home: "Strona główna",
    jobsCrumb: "Oferty pracy",
    metaTitle: (n) => `Praca dla marynarzy — crewing ${n} | SeaJobs.pro`,
    metaDesc: (n) => `Aktualne oferty pracy od agencji crewingowych: ${n}. Stanowisko, statek, wynagrodzenie i data zaokrętowania. Aplikuj za darmo na SeaJobs.pro.`,
    h1: (n) => `Praca dla marynarzy — ${n}`,
    countLine: (num, n) => num > 0
      ? `Obecnie na SeaJobs.pro dostępnych jest ${num} ofert od agencji crewingowych: ${n}.`
      : `Nowe oferty od agencji crewingowych (${n}) pojawiają się na SeaJobs.pro regularnie — zajrzyj później lub ustaw powiadomienia.`,
    salaryLine: (min, max, cur) => `Wynagrodzenie obecnie wynosi od ${min} do ${max} ${cur} miesięcznie.`,
    agencyLine: (a) => `Obecnie rekrutują agencje: ${a}.`,
    requirements: "Zwykle wymagane są ważne certyfikaty STCW, marynarskie badania lekarskie i doświadczenie. Możesz aplikować bezpośrednio przez SeaJobs.pro — Twoje CV trafia prosto do menedżera crewingu.",
    relatedHeading: "Inne kraje",
    allJobs: "Wszystkie oferty pracy",
    noneYet: (n) => `Obecnie brak ofert od agencji z: ${n}`,
  },
  ro: {
    home: "Acasă",
    jobsCrumb: "Posturi",
    metaTitle: (n) => `Joburi pentru marinari — crewing ${n} | SeaJobs.pro`,
    metaDesc: (n) => `Posturi actuale de la agenții de crewing din ${n}. Funcție, navă, salariu și data îmbarcării pentru fiecare. Aplică gratuit pe SeaJobs.pro.`,
    h1: (n) => `Joburi pentru marinari — ${n}`,
    countLine: (num, n) => num > 0
      ? `În prezent, pe SeaJobs.pro sunt ${num} posturi de la agenții de crewing din ${n}.`
      : `Posturi noi de la agenții de crewing din ${n} apar regulat pe SeaJobs.pro — revino mai târziu sau setează o alertă.`,
    salaryLine: (min, max, cur) => `Salariile variază în prezent între ${min} și ${max} ${cur} pe lună.`,
    agencyLine: (a) => `Agenții care recrutează acum: ${a}.`,
    requirements: "De obicei sunt necesare certificate STCW valabile, aviz medical maritim și experiență. Poți aplica direct prin SeaJobs.pro — CV-ul tău ajunge direct la managerul de crewing.",
    relatedHeading: "Alte țări",
    allJobs: "Toate posturile maritime",
    noneYet: (n) => `Momentan nu există posturi de la agenții din ${n}`,
  },
};
