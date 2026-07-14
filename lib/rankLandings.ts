import type { Lang } from "@/lib/i18n";

// SEO landing pages for the most-searched ranks, served at /jobs/rank/<slug>.
// Each page is server-rendered with a localized <title>/<h1>/intro plus the
// live vacancy list filtered to that rank. Slugs are clean, keyword-matching
// strings (they must stay stable once indexed). `rank` must match the canonical
// value in lib/ranks.ts / vacancies.rank exactly so filtering works.

export type RankLanding = {
  rank: string;
  slug: string;
  names: Record<Lang, string>;
  // One-sentence role description. en/ru/ua written; pl/ro fall back to the
  // localized template without this extra line until translated.
  blurb: Partial<Record<Lang, string>>;
};

export const RANK_LANDINGS: RankLanding[] = [
  {
    rank: "Master (Captain)", slug: "master",
    names: { en: "Master", ru: "Капитан", ua: "Капітан", pl: "Kapitan", ro: "Comandant" },
    blurb: {
      en: "The Master has overall command of the vessel, its crew and safe navigation, and is legally responsible for the ship.",
      ru: "Капитан осуществляет общее командование судном и экипажем, отвечает за безопасное судовождение и несёт полную ответственность за судно.",
      ua: "Капітан здійснює загальне командування судном та екіпажем, відповідає за безпечне судноводіння й несе повну відповідальність за судно.",
    },
  },
  {
    rank: "Chief Officer (Chief Mate)", slug: "chief-officer",
    names: { en: "Chief Officer", ru: "Старший помощник", ua: "Старший помічник", pl: "Starszy oficer", ro: "Ofițer secund" },
    blurb: {
      en: "The Chief Officer is second in command on deck, running cargo operations, stability and the deck crew.",
      ru: "Старший помощник — второй по старшинству на палубе: отвечает за грузовые операции, остойчивость и палубную команду.",
      ua: "Старший помічник — другий за старшинством на палубі: відповідає за вантажні операції, остійність і палубну команду.",
    },
  },
  {
    rank: "2nd Officer", slug: "2nd-officer",
    names: { en: "Second Officer", ru: "Второй помощник", ua: "Другий помічник", pl: "Drugi oficer", ro: "Ofițer II punte" },
    blurb: {
      en: "The Second Officer is the navigation officer, responsible for passage planning, charts and bridge watchkeeping.",
      ru: "Второй помощник — штурман: отвечает за прокладку маршрута, карты и несение ходовой вахты на мостике.",
      ua: "Другий помічник — штурман: відповідає за прокладання маршруту, карти й несення ходової вахти на містку.",
    },
  },
  {
    rank: "3rd Officer", slug: "3rd-officer",
    names: { en: "Third Officer", ru: "Третий помощник", ua: "Третій помічник", pl: "Trzeci oficer", ro: "Ofițer III punte" },
    blurb: {
      en: "The Third Officer keeps a bridge watch and is usually responsible for the ship's safety and life-saving equipment.",
      ru: "Третий помощник несёт вахту на мостике и обычно отвечает за спасательное и противопожарное оборудование судна.",
      ua: "Третій помічник несе вахту на містку й зазвичай відповідає за рятувальне та протипожежне обладнання судна.",
    },
  },
  {
    rank: "Chief Engineer", slug: "chief-engineer",
    names: { en: "Chief Engineer", ru: "Старший механик", ua: "Старший механік", pl: "Starszy mechanik", ro: "Șef mecanic" },
    blurb: {
      en: "The Chief Engineer heads the engine department and is responsible for the operation and maintenance of all machinery on board.",
      ru: "Старший механик возглавляет машинную команду и отвечает за работу и обслуживание всех судовых механизмов.",
      ua: "Старший механік очолює машинну команду й відповідає за роботу та обслуговування всіх суднових механізмів.",
    },
  },
  {
    rank: "2nd Engineer", slug: "2nd-engineer",
    names: { en: "Second Engineer", ru: "Второй механик", ua: "Другий механік", pl: "Drugi mechanik", ro: "Secund mecanic" },
    blurb: {
      en: "The Second Engineer is the senior watchkeeping engineer, deputising for the Chief and running day-to-day engine-room operations.",
      ru: "Второй механик — старший вахтенный механик, замещает старшего механика и руководит повседневной работой машинного отделения.",
      ua: "Другий механік — старший вахтовий механік, заміщає старшого механіка й керує щоденною роботою машинного відділення.",
    },
  },
  {
    rank: "3rd Engineer", slug: "3rd-engineer",
    names: { en: "Third Engineer", ru: "Третий механик", ua: "Третій механік", pl: "Trzeci mechanik", ro: "Ofițer III mecanic" },
    blurb: {
      en: "The Third Engineer keeps an engine-room watch and typically looks after generators, pumps and auxiliary machinery.",
      ru: "Третий механик несёт вахту в машинном отделении и обычно обслуживает генераторы, насосы и вспомогательные механизмы.",
      ua: "Третій механік несе вахту в машинному відділенні й зазвичай обслуговує генератори, насоси та допоміжні механізми.",
    },
  },
  {
    rank: "ETO (Electro-Technical Officer)", slug: "eto",
    names: { en: "ETO (Electro-Technical Officer)", ru: "Электромеханик (ETO)", ua: "Електромеханік (ETO)", pl: "Oficer elektroautomatyk (ETO)", ro: "Ofițer electrician (ETO)" },
    blurb: {
      en: "The Electro-Technical Officer maintains the vessel's electrical, electronic and automation systems.",
      ru: "Электромеханик (ETO) обслуживает электрические, электронные и автоматизированные системы судна.",
      ua: "Електромеханік (ETO) обслуговує електричні, електронні та автоматизовані системи судна.",
    },
  },
  {
    rank: "Electrician", slug: "electrician",
    names: { en: "Electrician", ru: "Электрик", ua: "Електрик", pl: "Elektryk", ro: "Electrician" },
    blurb: {
      en: "The ship's Electrician maintains and repairs electrical equipment and wiring throughout the vessel.",
      ru: "Судовой электрик обслуживает и ремонтирует электрооборудование и проводку по всему судну.",
      ua: "Судновий електрик обслуговує та ремонтує електрообладнання й проводку по всьому судну.",
    },
  },
  {
    rank: "Fitter", slug: "fitter",
    names: { en: "Fitter", ru: "Токарь (Fitter)", ua: "Токар (Fitter)", pl: "Ślusarz (Fitter)", ro: "Fitter (lăcătuș)" },
    blurb: {
      en: "The Fitter carries out welding, machining and mechanical repairs for the engine department.",
      ru: "Токарь-слесарь (fitter) выполняет сварочные, токарные и механические ремонтные работы для машинной команды.",
      ua: "Токар-слюсар (fitter) виконує зварювальні, токарні та механічні ремонтні роботи для машинної команди.",
    },
  },
  {
    rank: "AB (Able Seaman)", slug: "able-seaman",
    names: { en: "Able Seaman (AB)", ru: "Матрос 1 класса (AB)", ua: "Матрос 1 класу (AB)", pl: "Starszy marynarz (AB)", ro: "Marinar (AB)" },
    blurb: {
      en: "The Able Seaman is an experienced deck rating handling watchkeeping, mooring, cargo work and vessel maintenance.",
      ru: "Матрос первого класса (AB) — опытный член палубной команды: вахта, швартовка, грузовые работы и обслуживание судна.",
      ua: "Матрос першого класу (AB) — досвідчений член палубної команди: вахта, швартування, вантажні роботи та обслуговування судна.",
    },
  },
  {
    rank: "OS (Ordinary Seaman)", slug: "ordinary-seaman",
    names: { en: "Ordinary Seaman (OS)", ru: "Матрос 2 класса (OS)", ua: "Матрос 2 класу (OS)", pl: "Młodszy marynarz (OS)", ro: "Marinar stagiar (OS)" },
    blurb: {
      en: "The Ordinary Seaman is an entry-level deck rating who assists with maintenance, watchkeeping and general deck work.",
      ru: "Матрос второго класса (OS) — начальная должность в палубной команде: помощь в обслуживании, вахте и палубных работах.",
      ua: "Матрос другого класу (OS) — початкова посада в палубній команді: допомога в обслуговуванні, вахті та палубних роботах.",
    },
  },
  {
    rank: "Bosun", slug: "bosun",
    names: { en: "Bosun", ru: "Боцман", ua: "Боцман", pl: "Bosman", ro: "Șef de echipaj (Bosun)" },
    blurb: {
      en: "The Bosun leads the deck ratings, organising maintenance, mooring and cargo work under the Chief Officer.",
      ru: "Боцман руководит палубной командой, организует обслуживание, швартовку и грузовые работы под началом старшего помощника.",
      ua: "Боцман керує палубною командою, організовує обслуговування, швартування та вантажні роботи під керівництвом старшого помічника.",
    },
  },
  {
    rank: "Motorman", slug: "motorman",
    names: { en: "Motorman", ru: "Моторист", ua: "Моторист", pl: "Motorzysta", ro: "Motorist" },
    blurb: {
      en: "The Motorman is an engine-room rating who assists the engineers with watchkeeping, maintenance and repairs.",
      ru: "Моторист — член машинной команды, помогает механикам нести вахту, обслуживать и ремонтировать механизмы.",
      ua: "Моторист — член машинної команди, допомагає механікам нести вахту, обслуговувати й ремонтувати механізми.",
    },
  },
  {
    rank: "Oiler", slug: "oiler",
    names: { en: "Oiler", ru: "Смазчик (Oiler)", ua: "Мастильник (Oiler)", pl: "Smarownik (Oiler)", ro: "Ungător (Oiler)" },
    blurb: {
      en: "The Oiler lubricates and monitors engine-room machinery and supports the engineers on watch.",
      ru: "Смазчик (oiler) смазывает и контролирует механизмы машинного отделения и помогает вахтенным механикам.",
      ua: "Мастильник (oiler) змащує й контролює механізми машинного відділення та допомагає вахтовим механікам.",
    },
  },
  {
    rank: "Chief Cook / Cook", slug: "cook",
    names: { en: "Ship Cook", ru: "Повар (кок)", ua: "Кухар (кок)", pl: "Kucharz okrętowy", ro: "Bucătar de navă" },
    blurb: {
      en: "The Ship's Cook prepares meals for the whole crew and manages provisions and galley hygiene on board.",
      ru: "Судовой повар (кок) готовит питание для всего экипажа, ведёт учёт провизии и следит за гигиеной камбуза.",
      ua: "Судновий кухар (кок) готує харчування для всього екіпажу, веде облік провізії та стежить за гігієною камбуза.",
    },
  },
  {
    rank: "Messman / Steward", slug: "messman",
    names: { en: "Messman / Steward", ru: "Мессбой / Стюард", ua: "Месбой / Стюард", pl: "Messman / Steward", ro: "Ospătar (Messman)" },
    blurb: {
      en: "The Messman assists the cook and keeps the galley, mess rooms and accommodation clean and stocked.",
      ru: "Мессбой помогает повару и поддерживает чистоту и порядок на камбузе, в столовых и жилых помещениях.",
      ua: "Месбой допомагає кухарю та підтримує чистоту й порядок на камбузі, у їдальнях і житлових приміщеннях.",
    },
  },
  {
    rank: "Deck Cadet", slug: "deck-cadet",
    names: { en: "Deck Cadet", ru: "Кадет палубный", ua: "Кадет палубний", pl: "Praktykant pokładowy", ro: "Cadet punte" },
    blurb: {
      en: "The Deck Cadet is a trainee deck officer gaining the sea-time and skills needed to qualify as an officer.",
      ru: "Палубный кадет — стажёр палубной команды, набирает морской стаж и навыки для получения офицерского диплома.",
      ua: "Палубний кадет — стажист палубної команди, набирає морський стаж і навички для отримання офіцерського диплома.",
    },
  },
  {
    rank: "Engine Cadet", slug: "engine-cadet",
    names: { en: "Engine Cadet", ru: "Кадет машинный", ua: "Кадет машинний", pl: "Praktykant maszynowy", ro: "Cadet mecanic" },
    blurb: {
      en: "The Engine Cadet is a trainee engineer gaining the sea-time and skills needed to qualify as an engineer officer.",
      ru: "Машинный кадет — стажёр машинной команды, набирает морской стаж и навыки для получения диплома механика.",
      ua: "Машинний кадет — стажист машинної команди, набирає морський стаж і навички для отримання диплома механіка.",
    },
  },
];

const BY_SLUG = new Map(RANK_LANDINGS.map((r) => [r.slug, r]));
export const RANK_LANDING_SLUGS = RANK_LANDINGS.map((r) => r.slug);

export function rankLandingBySlug(slug: string): RankLanding | undefined {
  return BY_SLUG.get(slug);
}

export function rankName(r: RankLanding, lang: Lang): string {
  return r.names[lang] ?? r.names.en;
}

/** Mirror of JobsClient's rank filter so the landing list matches the site. */
export function vacancyMatchesRank(vacancyRank: string | null, rank: string): boolean {
  if (!vacancyRank) return false;
  if (vacancyRank === rank) return true;
  if (rank === "AB (Able Seaman)" && vacancyRank.startsWith("AB ")) return true;
  if (rank === "OS (Ordinary Seaman)" && vacancyRank.startsWith("OS ")) return true;
  return false;
}

// ── Localized page copy (template woven with live data) ──────────────────────
type Copy = {
  home: string;
  jobsCrumb: string;
  metaTitle: (name: string) => string;
  metaDesc: (name: string) => string;
  h1: (name: string) => string;
  countLine: (n: number, name: string) => string;
  salaryLine: (min: string, max: string, cur: string) => string;
  vesselLine: (vessels: string) => string;
  requirements: string;
  relatedHeading: string;
  allJobs: string;
  noneYet: (name: string) => string;
};

export const RANK_COPY: Record<Lang, Copy> = {
  en: {
    home: "Home",
    jobsCrumb: "Vacancies",
    metaTitle: (n) => `${n} jobs at sea — maritime vacancies | SeaJobs.pro`,
    metaDesc: (n) => `Current ${n} vacancies from verified crewing agencies. Salary, vessel type and joining date for every posting. Apply free on SeaJobs.pro.`,
    h1: (n) => `${n} jobs`,
    countLine: (num, n) => num > 0
      ? `There ${num === 1 ? "is" : "are"} currently ${num} open ${n} ${num === 1 ? "vacancy" : "vacancies"} on SeaJobs.pro from verified crewing agencies.`
      : `New ${n} vacancies from verified crewing agencies are added to SeaJobs.pro regularly — check back soon or set a job alert.`,
    salaryLine: (min, max, cur) => `Salaries currently range from ${min} to ${max} ${cur} per month.`,
    vesselLine: (v) => `Most positions are on ${v}.`,
    requirements: "Applicants usually need valid STCW certificates, a seafarer's medical and relevant sea-time in rank. You can apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.",
    relatedHeading: "Other ranks",
    allJobs: "All maritime vacancies",
    noneYet: (n) => `No open ${n} vacancies right now`,
  },
  ru: {
    home: "Главная",
    jobsCrumb: "Вакансии",
    metaTitle: (n) => `Вакансии ${n} — работа в море | SeaJobs.pro`,
    metaDesc: (n) => `Актуальные вакансии ${n} от проверенных крюинговых агентств. Зарплата, тип судна и дата посадки в каждой вакансии. Отклик бесплатно на SeaJobs.pro.`,
    h1: (n) => `Вакансии ${n}`,
    countLine: (num, n) => num > 0
      ? `Сейчас на SeaJobs.pro открыто ${num} ${num === 1 ? "вакансия" : "вакансий"} ${n} от проверенных крюинговых агентств.`
      : `Новые вакансии ${n} от проверенных крюингов появляются на SeaJobs.pro регулярно — загляните позже или включите оповещения.`,
    salaryLine: (min, max, cur) => `Зарплата сейчас — от ${min} до ${max} ${cur} в месяц.`,
    vesselLine: (v) => `Чаще всего вакансии на ${v}.`,
    requirements: "Обычно требуются действующие сертификаты STCW, судовая медкомиссия и опыт работы в должности. Откликнуться можно прямо на SeaJobs.pro — ваша анкета уходит напрямую крюинг-менеджеру.",
    relatedHeading: "Другие должности",
    allJobs: "Все вакансии",
    noneYet: (n) => `Сейчас открытых вакансий ${n} нет`,
  },
  ua: {
    home: "Головна",
    jobsCrumb: "Вакансії",
    metaTitle: (n) => `Вакансії ${n} — робота в морі | SeaJobs.pro`,
    metaDesc: (n) => `Актуальні вакансії ${n} від перевірених крюїнгових агентств. Зарплата, тип судна й дата посадки в кожній вакансії. Відгук безкоштовно на SeaJobs.pro.`,
    h1: (n) => `Вакансії ${n}`,
    countLine: (num, n) => num > 0
      ? `Зараз на SeaJobs.pro відкрито ${num} ${num === 1 ? "вакансію" : "вакансій"} ${n} від перевірених крюїнгових агентств.`
      : `Нові вакансії ${n} від перевірених крюїнгів з'являються на SeaJobs.pro регулярно — завітайте пізніше або увімкніть сповіщення.`,
    salaryLine: (min, max, cur) => `Зарплата зараз — від ${min} до ${max} ${cur} на місяць.`,
    vesselLine: (v) => `Найчастіше вакансії на ${v}.`,
    requirements: "Зазвичай потрібні чинні сертифікати STCW, суднова медкомісія та досвід роботи на посаді. Відгукнутися можна прямо на SeaJobs.pro — ваша анкета йде напряму крюїнг-менеджеру.",
    relatedHeading: "Інші посади",
    allJobs: "Усі вакансії",
    noneYet: (n) => `Зараз відкритих вакансій ${n} немає`,
  },
  pl: {
    home: "Strona główna",
    jobsCrumb: "Oferty pracy",
    metaTitle: (n) => `Praca ${n} na statku — oferty morskie | SeaJobs.pro`,
    metaDesc: (n) => `Aktualne oferty pracy ${n} od zweryfikowanych agencji crewingowych. Wynagrodzenie, typ statku i data zaokrętowania w każdej ofercie. Aplikuj za darmo na SeaJobs.pro.`,
    h1: (n) => `Praca: ${n}`,
    countLine: (num, n) => num > 0
      ? `Obecnie na SeaJobs.pro dostępnych jest ${num} ofert pracy ${n} od zweryfikowanych agencji crewingowych.`
      : `Nowe oferty pracy ${n} od zweryfikowanych agencji pojawiają się na SeaJobs.pro regularnie — zajrzyj później lub ustaw powiadomienia.`,
    salaryLine: (min, max, cur) => `Wynagrodzenie obecnie wynosi od ${min} do ${max} ${cur} miesięcznie.`,
    vesselLine: (v) => `Najwięcej ofert dotyczy jednostek typu ${v}.`,
    requirements: "Zwykle wymagane są ważne certyfikaty STCW, marynarskie badania lekarskie i doświadczenie na stanowisku. Możesz aplikować bezpośrednio przez SeaJobs.pro — Twoje CV trafia prosto do menedżera crewingu.",
    relatedHeading: "Inne stanowiska",
    allJobs: "Wszystkie oferty pracy",
    noneYet: (n) => `Obecnie brak ofert pracy ${n}`,
  },
  ro: {
    home: "Acasă",
    jobsCrumb: "Posturi",
    metaTitle: (n) => `Joburi ${n} pe navă — posturi maritime | SeaJobs.pro`,
    metaDesc: (n) => `Posturi ${n} actuale de la agenții de crewing verificate. Salariu, tipul navei și data îmbarcării pentru fiecare anunț. Aplică gratuit pe SeaJobs.pro.`,
    h1: (n) => `Joburi ${n}`,
    countLine: (num, n) => num > 0
      ? `În prezent, pe SeaJobs.pro sunt ${num} posturi ${n} deschise de la agenții de crewing verificate.`
      : `Posturi ${n} noi de la agenții verificate apar regulat pe SeaJobs.pro — revino mai târziu sau setează o alertă.`,
    salaryLine: (min, max, cur) => `Salariile variază în prezent între ${min} și ${max} ${cur} pe lună.`,
    vesselLine: (v) => `Majoritatea posturilor sunt pe ${v}.`,
    requirements: "De obicei sunt necesare certificate STCW valabile, aviz medical maritim și experiență în funcție. Poți aplica direct prin SeaJobs.pro — CV-ul tău ajunge direct la managerul de crewing.",
    relatedHeading: "Alte funcții",
    allJobs: "Toate posturile maritime",
    noneYet: (n) => `Momentan nu există posturi ${n} deschise`,
  },
};
