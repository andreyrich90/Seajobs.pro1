// The CV-distribution service: its catalogue and its copy.
//
// Kept out of `lib/i18n.ts` on purpose. That map reaches the browser through
// `DictProvider` on *every* page, so ~90 strings for one route would be paid
// for by every reader who never opens it. `app/[locale]/cv-distribution/page.tsx`
// is a Server Component: it picks one language out of `CV_BLAST_COPY` and hands
// it to the client as a prop, the same shape `layout.tsx` uses for the site-wide
// dictionary. Same reasoning as `TG_COPY` in lib/telegramBot.ts and `META_COPY`
// in the vacancy page.
//
// Prices are the ones agreed with the partner who runs the mailing, already
// carrying the agreed markup (+10% on the expensive packages, +20% on the cheap
// ones), converted at 1 € = 52 ₴ and 1 $ = 45 ₴ and rounded. They are shown, but
// nothing is charged yet: the button opens a request form, not a checkout.
// Whole units only — nobody prices a mailing at €23.60.

import type { Lang } from "@/lib/langs";

export type PackageGroup = "fleet" | "general" | "monthly" | "extra";

export type BlastPackage = {
  code: string;
  /** Product names that read the same in every language stay here; the rest are
   *  looked up per language in `CvBlastCopy.packages`. */
  name?: string;
  group: PackageGroup;
  eur: number;
  usd: number;
  /** Size of the address base. Null for items that are not a mailing. */
  addresses: number | null;
  /** How many times the CV goes out to that base. */
  sends: number;
  /** Whether the price is one-off or monthly. */
  recurring?: boolean;
  /** Fleet tags, English throughout the site (vessel types are stored in English). */
  tags: string;
};

export const BLAST_PACKAGES: BlastPackage[] = [
  // Narrow bases: fewer addresses, but every one of them hires this fleet.
  { code: "offshore",   name: "Offshore MAX",                      group: "fleet", eur: 24, usd: 28, addresses: 5400, sends: 1, tags: "Offshore · Merchant" },
  { code: "offshore2",  name: "Offshore MAX ×2",                   group: "fleet", eur: 38, usd: 44, addresses: 4900, sends: 2, tags: "Offshore · Merchant" },
  { code: "tanker_gas", name: "Tanker + GAS Fleet",                group: "fleet", eur: 27, usd: 31, addresses: 2400, sends: 3, tags: "Tanker · GAS · Merchant" },
  { code: "bulk",       name: "Bulk Carrier MAX",                  group: "fleet", eur: 19, usd: 22, addresses: 1060, sends: 3, tags: "Bulker · Merchant" },
  { code: "container",  name: "Container MAX",                     group: "fleet", eur: 16, usd: 19, addresses: 740,  sends: 3, tags: "Container · Merchant" },
  { code: "roro",       name: "RO-RO · Ferry · Passenger · Yacht", group: "fleet", eur: 20, usd: 23, addresses: 810,  sends: 3, tags: "RO-RO · Merchant" },

  { code: "gen_max_ua", group: "general", eur: 37, usd: 43, addresses: 14000, sends: 1, tags: "all fleets" },
  { code: "gen_mid",    group: "general", eur: 32, usd: 37, addresses: 11000, sends: 1, tags: "all fleets" },
  { code: "gen_std",    group: "general", eur: 28, usd: 32, addresses: 9600,  sends: 1, tags: "all fleets" },
  { code: "gen_eco",    group: "general", eur: 21, usd: 24, addresses: 7100,  sends: 1, tags: "all fleets" },
  { code: "ua_crewing", group: "general", eur: 18, usd: 21, addresses: 700,   sends: 3, tags: "all fleets" },
  { code: "crew_sites", group: "general", eur: 21, usd: 24, addresses: 1600,  sends: 3, tags: "Maritime Zone · Crewell · Crewdate · Ukrcrewing" },

  // One price, different cadence: the narrower the base, the more often it can
  // be mailed without burning it out.
  { code: "full_offshore",  name: "Full Offshore",  group: "monthly", eur: 97, usd: 112, addresses: null, sends: 5,  recurring: true, tags: "Offshore · Merchant" },
  { code: "full_tanker",    name: "Full Tanker",    group: "monthly", eur: 97, usd: 112, addresses: null, sends: 11, recurring: true, tags: "Tanker · Merchant" },
  { code: "full_bulk",      name: "Full Bulk",      group: "monthly", eur: 97, usd: 112, addresses: null, sends: 16, recurring: true, tags: "Bulker · Merchant" },
  { code: "full_container", name: "Full Container", group: "monthly", eur: 97, usd: 112, addresses: null, sends: 16, recurring: true, tags: "Container · Merchant" },
  { code: "full_general",   name: "Full General",   group: "monthly", eur: 97, usd: 112, addresses: null, sends: 4,  recurring: true, tags: "all fleets" },

  { code: "application_form", group: "extra", eur: 21, usd: 24, addresses: null, sends: 0, tags: "PDF · Word" },
];

export type CvBlastCopy = {
  pill: string;
  title: string;
  lede: string;
  /** The whole point of this build: say plainly that nothing is on sale yet. */
  soon: string;

  howTitle: string;
  howSub: string;
  steps: { h: string; p: string }[];
  stepWord: string;

  packagesTitle: string;
  packagesSub: string;
  currencyLabel: string;
  groups: Record<PackageGroup, { title: string; note: string }>;
  /** Names for the packages that have no fixed Latin name. */
  packages: Record<string, string>;
  chipAddresses: string;
  chipSends: string;
  once: string;
  perMonth: string;
  choose: string;

  formTitle: string;
  formSub: string;
  formChosen: string;
  fName: string;
  fEmail: string;
  fPhone: string;
  fRank: string;
  fFleet: string;
  fNote: string;
  fAny: string;
  submit: string;
  sending: string;
  okTitle: string;
  okBody: string;
  another: string;
  errEmail: string;
  errFail: string;

  notTitle: string;
  notBody: string[];

  faqTitle: string;
  faq: { q: string; a: string }[];
};

export const CV_BLAST_COPY: Record<Lang, CvBlastCopy> = {
  ua: {
    pill: "Послуга порталу",
    title: "Розсилка резюме по крюїнгових компаніях",
    lede: "Ваша анкета йде напряму у відділи кадрів судноплавних компаній і крюїнгів — по тій базі, що відповідає вашому флоту.",
    soon: "Послуга готується до запуску. Зараз ми збираємо заявки: залиште свою — повідомимо першими і зробимо знижку. Оплата поки не приймається.",

    howTitle: "Як це працюватиме",
    howSub: "Від заявки до перших відповідей зазвичай минає від кількох днів до пари тижнів.",
    stepWord: "КРОК",
    steps: [
      { h: "Обираєте пакет", p: "За типом флоту або по загальній базі. Видно, скільки адрес і скільки відправок входить." },
      { h: "Перевіряємо анкету", p: "Дивимось CV на повноту й оформлення. Чогось бракує — скажемо до відправки." },
      { h: "Відправляємо", p: "Лист іде з вашим CV у вкладенні та вашою адресою для відповіді." },
      { h: "Відповіді йдуть вам", p: "Компанії відповідають напряму на вашу пошту. Ми в листування не втручаємось." },
    ],

    packagesTitle: "Пакети",
    packagesSub: "Ціна вказана за пакет цілком. «Відправок: 3» означає три відправки по цій базі з інтервалом.",
    currencyLabel: "Валюта",
    groups: {
      fleet:   { title: "За типом флоту", note: "вужча база — вищий відгук" },
      general: { title: "Загальні бази", note: "максимальне охоплення по всіх типах суден" },
      monthly: { title: "Місячні пакети", note: "кілька відправок протягом місяця — для активного пошуку" },
      extra:   { title: "Додатково", note: "можна замовити окремо від розсилки" },
    },
    packages: {
      gen_max_ua: "Загальна MAX + UA Base",
      gen_mid: "Загальна Середня",
      gen_std: "Загальна Стандарт",
      gen_eco: "Загальна Економ",
      ua_crewing: "Усі українські крюїнги + Одеса",
      crew_sites: "Крюїнгові сайти — на вибір",
      application_form: "Складання Application Form",
    },
    chipAddresses: "адрес",
    chipSends: "відправок",
    once: "разово",
    perMonth: "на місяць",
    choose: "Залишити заявку",

    formTitle: "Заявка на розсилку",
    formSub: "Залиште контакти — напишемо, щойно послуга запрацює. Нічого платити зараз не потрібно.",
    formChosen: "Обраний пакет",
    fName: "Ім'я",
    fEmail: "Email",
    fPhone: "Телефон або Telegram (не обов'язково)",
    fRank: "Посада",
    fFleet: "Тип флоту",
    fNote: "Коментар (не обов'язково)",
    fAny: "Не вказано",
    submit: "Залишити заявку",
    sending: "Надсилаємо…",
    okTitle: "Заявку прийнято",
    okBody: "Напишемо на вказану пошту, щойно послуга запрацює. Ви серед перших — знижка ваша.",
    another: "Залишити ще одну",
    errEmail: "Перевірте адресу пошти",
    errFail: "Не вдалося надіслати. Спробуйте ще раз.",

    notTitle: "Чим це не є",
    notBody: [
      "Це не плата за працевлаштування. Ми не беремо грошей за контракт, місце на судні, медкомісію, сертифікати чи візи — і ніколи не братимемо. Якщо у вас просять гроші за роботу, це шахрайство, від кого б воно не йшло.",
      "Оплачується робота з документом: підготовка анкети та її розсилка по базі адрес. Це послуга оформлення, а не посередництво в наймі.",
      "Вакансії, відгуки та профіль на порталі були й залишаються безкоштовними.",
    ],

    faqTitle: "Часті питання",
    faq: [
      { q: "Кому йде лист?", a: "У відділи кадрів судноплавних компаній і крюїнгових агенцій по обраній базі. Список формується за типом флоту." },
      { q: "Куди прийдуть відповіді?", a: "Напряму на вашу пошту — вона вказана в листі як адреса для відповіді." },
      { q: "Гарантуєте контракт?", a: "Ні. Розсилка збільшує кількість компаній, які побачать вашу анкету. Рішення про найм ухвалює компанія." },
      { q: "Що з моїми даними?", a: "Відправляємо лише те, що ви вказали в анкеті. Паспортні дані в розсилку не потрапляють." },
    ],
  },

  ru: {
    pill: "Услуга портала",
    title: "Рассылка резюме по крюинговым компаниям",
    lede: "Ваша анкета уходит напрямую в отделы кадров судоходных компаний и крюингов — по той базе, которая соответствует вашему флоту.",
    soon: "Услуга готовится к запуску. Сейчас мы собираем заявки: оставьте свою — сообщим первыми и сделаем скидку. Оплата пока не принимается.",

    howTitle: "Как это будет работать",
    howSub: "От заявки до первых ответов обычно проходит от нескольких дней до пары недель.",
    stepWord: "ШАГ",
    steps: [
      { h: "Выбираете пакет", p: "По типу флота или по общей базе. Видно, сколько адресов и сколько отправок входит." },
      { h: "Проверяем анкету", p: "Смотрим CV на полноту и оформление. Чего-то не хватает — скажем до отправки." },
      { h: "Отправляем", p: "Письмо уходит с вашим CV в приложении и вашим адресом для ответа." },
      { h: "Ответы идут вам", p: "Компании отвечают напрямую на вашу почту. Мы в переписку не вмешиваемся." },
    ],

    packagesTitle: "Пакеты",
    packagesSub: "Цена указана за пакет целиком. «Отправок: 3» означает три отправки по этой базе с интервалом.",
    currencyLabel: "Валюта",
    groups: {
      fleet:   { title: "По типу флота", note: "узкая база — выше отклик" },
      general: { title: "Общие базы", note: "максимальный охват по всем типам судов" },
      monthly: { title: "Месячные пакеты", note: "несколько отправок в течение месяца — для активного поиска" },
      extra:   { title: "Дополнительно", note: "можно заказать отдельно от рассылки" },
    },
    packages: {
      gen_max_ua: "Общая MAX + UA Base",
      gen_mid: "Общая Средняя",
      gen_std: "Общая Стандарт",
      gen_eco: "Общая Эконом",
      ua_crewing: "Все украинские крюинги + Одесса",
      crew_sites: "Крюинговые сайты — на выбор",
      application_form: "Составление Application Form",
    },
    chipAddresses: "адресов",
    chipSends: "отправок",
    once: "разово",
    perMonth: "в месяц",
    choose: "Оставить заявку",

    formTitle: "Заявка на рассылку",
    formSub: "Оставьте контакты — напишем, как только услуга заработает. Платить сейчас ничего не нужно.",
    formChosen: "Выбранный пакет",
    fName: "Имя",
    fEmail: "Email",
    fPhone: "Телефон или Telegram (необязательно)",
    fRank: "Должность",
    fFleet: "Тип флота",
    fNote: "Комментарий (необязательно)",
    fAny: "Не указано",
    submit: "Оставить заявку",
    sending: "Отправляем…",
    okTitle: "Заявка принята",
    okBody: "Напишем на указанную почту, как только услуга заработает. Вы среди первых — скидка ваша.",
    another: "Оставить ещё одну",
    errEmail: "Проверьте адрес почты",
    errFail: "Не удалось отправить. Попробуйте ещё раз.",

    notTitle: "Чем это не является",
    notBody: [
      "Это не плата за трудоустройство. Мы не берём денег за контракт, место на судне, медкомиссию, сертификаты или визы — и никогда не будем. Если у вас просят деньги за работу, это развод, от кого бы он ни исходил.",
      "Оплачивается работа с документом: подготовка анкеты и её рассылка по базе адресов. Это услуга оформления, а не посредничество в найме.",
      "Вакансии, отклики и профиль на портале были и остаются бесплатными.",
    ],

    faqTitle: "Частые вопросы",
    faq: [
      { q: "Кому уходит письмо?", a: "В отделы кадров судоходных компаний и крюинговых агентств по выбранной базе. Список формируется по типу флота." },
      { q: "Куда придут ответы?", a: "Напрямую на вашу почту — она указана в письме как адрес для ответа." },
      { q: "Гарантируете контракт?", a: "Нет. Рассылка увеличивает число компаний, которые увидят вашу анкету. Решение о найме принимает компания." },
      { q: "Что с моими данными?", a: "Отправляем только то, что вы указали в анкете. Паспортные данные в рассылку не включаются." },
    ],
  },

  pl: {
    pill: "Usługa portalu",
    title: "Wysyłka CV do firm crewingowych",
    lede: "Twoja aplikacja trafia bezpośrednio do działów kadr armatorów i agencji crewingowych — do bazy dopasowanej do Twojej floty.",
    soon: "Usługa jest w przygotowaniu. Zbieramy zgłoszenia: zostaw swoje — powiadomimy Cię jako pierwszego i damy zniżkę. Płatności jeszcze nie przyjmujemy.",

    howTitle: "Jak to będzie działać",
    howSub: "Od zgłoszenia do pierwszych odpowiedzi mija zwykle od kilku dni do dwóch tygodni.",
    stepWord: "KROK",
    steps: [
      { h: "Wybierasz pakiet", p: "Według typu floty albo z bazy ogólnej. Widać, ile adresów i ile wysyłek obejmuje." },
      { h: "Sprawdzamy CV", p: "Patrzymy na kompletność i formę. Jeśli czegoś brakuje — powiemy przed wysyłką." },
      { h: "Wysyłamy", p: "List idzie z Twoim CV w załączniku i Twoim adresem do odpowiedzi." },
      { h: "Odpowiedzi trafiają do Ciebie", p: "Firmy odpisują bezpośrednio na Twoją pocztę. Nie wtrącamy się w korespondencję." },
    ],

    packagesTitle: "Pakiety",
    packagesSub: "Cena za cały pakiet. „Wysyłek: 3” oznacza trzy wysyłki do tej bazy w odstępach.",
    currencyLabel: "Waluta",
    groups: {
      fleet:   { title: "Według typu floty", note: "węższa baza — wyższa odpowiedź" },
      general: { title: "Bazy ogólne", note: "maksymalny zasięg, wszystkie typy statków" },
      monthly: { title: "Pakiety miesięczne", note: "kilka wysyłek w miesiącu — do aktywnego szukania" },
      extra:   { title: "Dodatkowo", note: "można zamówić osobno" },
    },
    packages: {
      gen_max_ua: "Ogólna MAX + UA Base",
      gen_mid: "Ogólna Średnia",
      gen_std: "Ogólna Standard",
      gen_eco: "Ogólna Ekonomiczna",
      ua_crewing: "Wszystkie ukraińskie crewingi + Odessa",
      crew_sites: "Portale crewingowe — do wyboru",
      application_form: "Przygotowanie Application Form",
    },
    chipAddresses: "adresów",
    chipSends: "wysyłek",
    once: "jednorazowo",
    perMonth: "miesięcznie",
    choose: "Zostaw zgłoszenie",

    formTitle: "Zgłoszenie na wysyłkę",
    formSub: "Zostaw kontakt — napiszemy, gdy usługa ruszy. Teraz nic nie płacisz.",
    formChosen: "Wybrany pakiet",
    fName: "Imię",
    fEmail: "Email",
    fPhone: "Telefon lub Telegram (opcjonalnie)",
    fRank: "Stanowisko",
    fFleet: "Typ floty",
    fNote: "Komentarz (opcjonalnie)",
    fAny: "Nie podano",
    submit: "Zostaw zgłoszenie",
    sending: "Wysyłamy…",
    okTitle: "Zgłoszenie przyjęte",
    okBody: "Napiszemy na podany adres, gdy usługa ruszy. Jesteś wśród pierwszych — zniżka jest Twoja.",
    another: "Zostaw kolejne",
    errEmail: "Sprawdź adres e-mail",
    errFail: "Nie udało się wysłać. Spróbuj ponownie.",

    notTitle: "Czym to nie jest",
    notBody: [
      "To nie jest opłata za zatrudnienie. Nie bierzemy pieniędzy za kontrakt, miejsce na statku, badania, certyfikaty ani wizy — i nigdy nie będziemy. Jeśli ktoś żąda zapłaty za pracę, to oszustwo, kimkolwiek by nie był.",
      "Płacisz za pracę z dokumentem: przygotowanie aplikacji i jej wysyłkę do bazy adresów. To usługa opracowania, nie pośrednictwo w zatrudnieniu.",
      "Oferty, aplikowanie i profil na portalu były i pozostają bezpłatne.",
    ],

    faqTitle: "Częste pytania",
    faq: [
      { q: "Do kogo trafia list?", a: "Do działów kadr armatorów i agencji crewingowych z wybranej bazy. Lista powstaje według typu floty." },
      { q: "Gdzie przyjdą odpowiedzi?", a: "Bezpośrednio na Twoją pocztę — jest wskazana w liście jako adres do odpowiedzi." },
      { q: "Gwarantujecie kontrakt?", a: "Nie. Wysyłka zwiększa liczbę firm, które zobaczą Twoją aplikację. Decyzję o zatrudnieniu podejmuje firma." },
      { q: "Co z moimi danymi?", a: "Wysyłamy tylko to, co podałeś w aplikacji. Dane paszportowe nie trafiają do wysyłki." },
    ],
  },

  en: {
    pill: "Portal service",
    title: "CV distribution to crewing companies",
    lede: "Your application goes straight to the HR desks of shipping companies and crewing agencies — to the base that matches your fleet.",
    soon: "The service is being prepared. We are collecting requests: leave yours and you will be told first, at a discount. No payment is taken yet.",

    howTitle: "How it will work",
    howSub: "From request to the first replies usually takes a few days to a couple of weeks.",
    stepWord: "STEP",
    steps: [
      { h: "You pick a package", p: "By fleet type or from the general base. The address count and the number of sends are shown." },
      { h: "We check the CV", p: "We look at completeness and formatting. If something is missing, we say so before sending." },
      { h: "We send", p: "The letter goes out with your CV attached and your address for replies." },
      { h: "Replies come to you", p: "Companies answer straight to your mailbox. We stay out of the correspondence." },
    ],

    packagesTitle: "Packages",
    packagesSub: "The price is for the whole package. “Sends: 3” means three mailings to that base, spaced out.",
    currencyLabel: "Currency",
    groups: {
      fleet:   { title: "By fleet type", note: "a narrower base answers more often" },
      general: { title: "General bases", note: "widest reach, every vessel type" },
      monthly: { title: "Monthly packages", note: "several sends across a month — for an active search" },
      extra:   { title: "Extras", note: "can be ordered on its own" },
    },
    packages: {
      gen_max_ua: "General MAX + UA Base",
      gen_mid: "General Medium",
      gen_std: "General Standard",
      gen_eco: "General Economy",
      ua_crewing: "All Ukrainian crewing agencies + Odesa",
      crew_sites: "Crewing portals — your pick",
      application_form: "Application Form preparation",
    },
    chipAddresses: "addresses",
    chipSends: "sends",
    once: "one-off",
    perMonth: "per month",
    choose: "Request it",

    formTitle: "Request the mailing",
    formSub: "Leave your contacts and we will write once the service is live. Nothing to pay now.",
    formChosen: "Chosen package",
    fName: "Name",
    fEmail: "Email",
    fPhone: "Phone or Telegram (optional)",
    fRank: "Rank",
    fFleet: "Fleet",
    fNote: "Comment (optional)",
    fAny: "Not specified",
    submit: "Send the request",
    sending: "Sending…",
    okTitle: "Request received",
    okBody: "We will write to that address as soon as the service is live. You are among the first — the discount is yours.",
    another: "Send another",
    errEmail: "Check the email address",
    errFail: "Could not send. Please try again.",

    notTitle: "What this is not",
    notBody: [
      "This is not a fee for employment. We take no money for a contract, a place on board, a medical, certificates or visas — and never will. If anyone asks you to pay for a job, it is a scam, whoever they are.",
      "What is paid for is document work: preparing the application and mailing it to a list of addresses. It is a preparation service, not placement.",
      "Vacancies, applications and the profile on the portal were and remain free.",
    ],

    faqTitle: "Common questions",
    faq: [
      { q: "Who receives the letter?", a: "HR desks at shipping companies and crewing agencies in the chosen base. The list is built by fleet type." },
      { q: "Where do replies go?", a: "Straight to your mailbox — it is set as the reply address in the letter." },
      { q: "Do you guarantee a contract?", a: "No. The mailing increases how many companies see your application. Hiring is the company's decision." },
      { q: "What about my data?", a: "We send only what you put in your application. Passport details are never included." },
    ],
  },

  ro: {
    pill: "Serviciu al portalului",
    title: "Distribuirea CV-ului către companiile de crewing",
    lede: "Dosarul tău ajunge direct la departamentele de personal ale armatorilor și agențiilor de crewing — pe baza potrivită flotei tale.",
    soon: "Serviciul este în pregătire. Strângem cereri: lasă-o pe a ta — te anunțăm primul și îți facem reducere. Deocamdată nu încasăm plăți.",

    howTitle: "Cum va funcționa",
    howSub: "De la cerere până la primele răspunsuri trec de obicei câteva zile până la două săptămâni.",
    stepWord: "PASUL",
    steps: [
      { h: "Alegi pachetul", p: "După tipul flotei sau din baza generală. Se vede câte adrese și câte trimiteri include." },
      { h: "Verificăm CV-ul", p: "Ne uităm la completitudine și formatare. Dacă lipsește ceva, îți spunem înainte de trimitere." },
      { h: "Trimitem", p: "Scrisoarea pleacă cu CV-ul atașat și cu adresa ta pentru răspuns." },
      { h: "Răspunsurile vin la tine", p: "Companiile răspund direct pe e-mailul tău. Nu intervenim în corespondență." },
    ],

    packagesTitle: "Pachete",
    packagesSub: "Prețul este pentru tot pachetul. „Trimiteri: 3” înseamnă trei trimiteri către acea bază, la interval.",
    currencyLabel: "Monedă",
    groups: {
      fleet:   { title: "După tipul flotei", note: "o bază mai îngustă răspunde mai des" },
      general: { title: "Baze generale", note: "acoperire maximă, toate tipurile de nave" },
      monthly: { title: "Pachete lunare", note: "mai multe trimiteri într-o lună — pentru căutare activă" },
      extra:   { title: "Suplimentar", note: "se poate comanda separat" },
    },
    packages: {
      gen_max_ua: "Generală MAX + UA Base",
      gen_mid: "Generală Medie",
      gen_std: "Generală Standard",
      gen_eco: "Generală Economy",
      ua_crewing: "Toate agențiile ucrainene + Odesa",
      crew_sites: "Portaluri de crewing — la alegere",
      application_form: "Întocmirea Application Form",
    },
    chipAddresses: "adrese",
    chipSends: "trimiteri",
    once: "o singură dată",
    perMonth: "pe lună",
    choose: "Trimite cererea",

    formTitle: "Cerere pentru distribuire",
    formSub: "Lasă-ne datele de contact — scriem când serviciul pornește. Nu plătești nimic acum.",
    formChosen: "Pachet ales",
    fName: "Nume",
    fEmail: "Email",
    fPhone: "Telefon sau Telegram (opțional)",
    fRank: "Funcție",
    fFleet: "Tipul flotei",
    fNote: "Comentariu (opțional)",
    fAny: "Nespecificat",
    submit: "Trimite cererea",
    sending: "Se trimite…",
    okTitle: "Cerere primită",
    okBody: "Îți scriem pe adresa indicată de îndată ce serviciul pornește. Ești printre primii — reducerea e a ta.",
    another: "Mai trimite una",
    errEmail: "Verifică adresa de e-mail",
    errFail: "Trimiterea a eșuat. Încearcă din nou.",

    notTitle: "Ce nu este acest serviciu",
    notBody: [
      "Nu este o taxă pentru angajare. Nu luăm bani pentru contract, pentru un loc la bord, pentru vizita medicală, certificate sau vize — și nu vom lua niciodată. Dacă cineva îți cere bani pentru un loc de muncă, este o înșelătorie, oricine ar fi.",
      "Se plătește munca la document: pregătirea dosarului și trimiterea lui către o listă de adrese. Este un serviciu de întocmire, nu intermediere la angajare.",
      "Posturile, aplicările și profilul pe portal au fost și rămân gratuite.",
    ],

    faqTitle: "Întrebări frecvente",
    faq: [
      { q: "Cine primește scrisoarea?", a: "Departamentele de personal ale armatorilor și agențiilor de crewing din baza aleasă. Lista se face după tipul flotei." },
      { q: "Unde ajung răspunsurile?", a: "Direct pe e-mailul tău — este trecut în scrisoare ca adresă de răspuns." },
      { q: "Garantați un contract?", a: "Nu. Distribuirea crește numărul companiilor care îți văd dosarul. Angajarea o decide compania." },
      { q: "Ce se întâmplă cu datele mele?", a: "Trimitem doar ce ai completat în dosar. Datele de pașaport nu sunt incluse niciodată." },
    ],
  },
};

/** The name shown for a package in one language. */
export function packageName(pkg: BlastPackage, copy: CvBlastCopy): string {
  return pkg.name ?? copy.packages[pkg.code] ?? pkg.code;
}
