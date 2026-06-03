export type Job = {
  id: number;
  rank: string;
  vessel: string;
  salary: number;
  currency: "USD" | "EUR";
  duration: string;
  joining: string;
  company: string;
  flag: string;
  location: string;
  logo: string;
  hot?: boolean;
};

export const JOBS: Job[] = [
  { id: 1, rank: "Chief Officer", vessel: "LNG", salary: 11500, currency: "USD", duration: "4+1", joining: "2026-06-12", company: "Hanseatic Crewing", flag: "🇩🇪", location: "Hamburg", logo: "HC", hot: true },
  { id: 2, rank: "2nd Engineer", vessel: "Tanker", salary: 9200, currency: "EUR", duration: "6", joining: "2026-06-20", company: "Aegean Marine", flag: "🇬🇷", location: "Piraeus", logo: "AM" },
  { id: 3, rank: "Master", vessel: "Bulk Carrier", salary: 13800, currency: "USD", duration: "4", joining: "2026-07-01", company: "Nordic Fleet", flag: "🇳🇴", location: "Oslo", logo: "NF", hot: true },
  { id: 4, rank: "AB", vessel: "Container", salary: 2400, currency: "EUR", duration: "6+1", joining: "2026-06-08", company: "Rotterdam Crew", flag: "🇳🇱", location: "Rotterdam", logo: "RC" },
  { id: 5, rank: "ETO", vessel: "Cruise", salary: 5600, currency: "EUR", duration: "4", joining: "2026-06-25", company: "Adriatic Crew", flag: "🇮🇹", location: "Genoa", logo: "AC" },
  { id: 6, rank: "Chief Engineer", vessel: "Offshore", salary: 14200, currency: "USD", duration: "5/5", joining: "2026-07-10", company: "Maersk Crewing", flag: "🇩🇰", location: "Copenhagen", logo: "MC", hot: true },
];
export type NewsItem = {
  id: number;
  title: Record<string, string>;
  body: Record<string, string>;
  tag: string;
  date: string;
  gradient: string;
};

export const NEWS: NewsItem[] = [
  {
    id: 1,
    title: {
      ua: "IMO оновлює вимоги STCW щодо годин відпочинку у 2026",
      pl: "IMO aktualizuje wymogi STCW dotyczące godzin odpoczynku w 2026",
      ru: "IMO обновляет требования STCW к часам отдыха в 2026",
      en: "IMO updates STCW rest-hour requirements for 2026",
    },
    body: {
      ua: "Міжнародна морська організація (IMO) оголосила про оновлення Конвенції STCW щодо мінімальних годин відпочинку для моряків, яке набере чинності з 1 січня 2026 року.\n\nЗгідно з новими правилами, мінімальний час відпочинку між вахтами збільшується до 11 годин, а загальний відпочинок за 24-годинний період має становити не менше 10 годин. Це рішення прийнято у відповідь на численні звіти про перевтому екіпажів, яка є однією з основних причин морських аварій.\n\nКомпаніям надається перехідний період до 1 липня 2026 року для приведення внутрішніх процедур у відповідність до нових вимог. Порушення правил тягнуть за собою затримку судна в порту та штрафи.",
      pl: "Międzynarodowa Organizacja Morska (IMO) ogłosiła aktualizację Konwencji STCW dotyczącą minimalnych godzin odpoczynku dla marynarzy, która wejdzie w życie 1 stycznia 2026 roku.\n\nZgodnie z nowymi przepisami minimalny czas odpoczynku między wachtami wzrasta do 11 godzin, a całkowity odpoczynek w ciągu 24 godzin musi wynosić co najmniej 10 godzin. Decyzja ta jest odpowiedzią na liczne raporty o zmęczeniu załóg, które są jedną z głównych przyczyn wypadków morskich.\n\nFirmom przysługuje okres przejściowy do 1 lipca 2026 roku na dostosowanie wewnętrznych procedur do nowych wymogów. Naruszenia grożą zatrzymaniem statku w porcie i karami finansowymi.",
      ru: "Международная морская организация (IMO) объявила об обновлении Конвенции STCW в части минимальных часов отдыха для моряков, которое вступит в силу с 1 января 2026 года.\n\nСогласно новым правилам, минимальное время отдыха между вахтами увеличивается до 11 часов, а общий отдых за 24-часовой период должен составлять не менее 10 часов. Это решение принято в ответ на многочисленные отчёты об усталости экипажей, являющейся одной из основных причин морских аварий.\n\nКомпаниям предоставляется переходный период до 1 июля 2026 года для приведения внутренних процедур в соответствие с новыми требованиями. Нарушения влекут задержку судна в порту и штрафы.",
      en: "The International Maritime Organization (IMO) has announced updates to the STCW Convention regarding minimum rest hours for seafarers, taking effect January 1, 2026.\n\nUnder the new rules, minimum rest between watches increases to 11 hours, and total rest in any 24-hour period must be at least 10 hours. The decision responds to widespread reports of crew fatigue, one of the leading causes of maritime accidents.\n\nCompanies are given a transition period until July 1, 2026 to align internal procedures with the new requirements. Violations will result in port state detention and financial penalties.",
    },
    tag: "Regulation",
    date: "2026-05-24",
    gradient: "linear-gradient(135deg,#0c4a6e,#155e75)",
  },
  {
    id: 2,
    title: {
      ua: "Зарплати офіцерів зросли на 8% через дефіцит екіпажів",
      pl: "Pensje oficerów wzrosły o 8% z powodu niedoboru załóg",
      ru: "Зарплаты офицеров выросли на 8% из-за дефицита экипажей",
      en: "Officer salaries rise 8% amid global crew shortage",
    },
    body: {
      ua: "За даними останнього звіту BIMCO та INTERCARGO, глобальний дефіцит кваліфікованих морських офіцерів досяг критичного рівня, що призвело до зростання середніх зарплат на 8% порівняно з 2025 роком.\n\nНайбільший попит спостерігається на капітанів та старших механіків для суден на зрідженому природному газі (LNG), де зарплати перевищують $15 000 на місяць. Офіцери палубної служби на танкерах також фіксують зростання доходів на 10–12%.\n\nАналітики прогнозують, що ситуація не зміниться найближчі три роки, оскільки кількість нових суден, що замовляються, значно перевищує кількість моряків, які закінчують навчальні заклади. Крюінговим компаніям рекомендується завчасно укладати довгострокові контракти з кваліфікованим персоналом.",
      pl: "Według najnowszego raportu BIMCO i INTERCARGO globalny niedobór wykwalifikowanych oficerów morskich osiągnął poziom krytyczny, co doprowadziło do wzrostu średnich wynagrodzeń o 8% w porównaniu z 2025 rokiem.\n\nNajwyższy popyt dotyczy kapitanów i starszych mechaników na statkach LNG, gdzie wynagrodzenia przekraczają 15 000 USD miesięcznie. Oficerowie pokładowi na tankowcach również odnotowują wzrost dochodów o 10–12%.\n\nAnalitycy przewidują, że sytuacja nie zmieni się przez najbliższe trzy lata, ponieważ liczba zamawianych nowych statków znacznie przewyższa liczbę marynarzy kończących uczelnie morskie.",
      ru: "По данным последнего отчёта BIMCO и INTERCARGO, глобальный дефицит квалифицированных морских офицеров достиг критического уровня, что привело к росту средних зарплат на 8% по сравнению с 2025 годом.\n\nНаибольший спрос наблюдается на капитанов и старших механиков для судов на сжиженном природном газе (LNG), где зарплаты превышают $15 000 в месяц. Офицеры палубной службы на танкерах также фиксируют рост доходов на 10–12%.\n\nАналитики прогнозируют, что ситуация не изменится в ближайшие три года, поскольку количество новых заказываемых судов значительно превышает количество моряков, заканчивающих учебные заведения.",
      en: "According to the latest BIMCO and INTERCARGO report, the global shortage of qualified maritime officers has reached a critical level, driving average salaries up 8% compared to 2025.\n\nDemand is highest for captains and chief engineers on LNG vessels, where salaries exceed $15,000 per month. Deck officers on tankers are also seeing income growth of 10–12%.\n\nAnalysts predict the situation will not improve for at least three years, as the number of new vessels on order far exceeds the number of seafarers graduating from maritime academies. Crewing companies are advised to secure long-term contracts with qualified personnel in advance.",
    },
    tag: "Market",
    date: "2026-05-20",
    gradient: "linear-gradient(135deg,#7c2d12,#9a3412)",
  },
  {
    id: 3,
    title: {
      ua: "Новим суднам на зеленому паливі потрібно 4000 інженерів",
      pl: "Nowe statki na zielone paliwo potrzebują 4000 inżynierów",
      ru: "Новым судам на зелёном топливе нужно 4000 инженеров",
      en: "New green-fuel vessels need 4,000 trained engineers",
    },
    body: {
      ua: "Перехід морської галузі на альтернативні види палива — аміак, метанол та водень — створює гостру потребу у підготовці нових інженерних кадрів. За оцінками DNV, до 2028 року флот потребуватиме щонайменше 4 000 сертифікованих інженерів для обслуговування таких установок.\n\nНаразі лише 12 навчальних закладів у світі пропонують сертифіковані програми підготовки для роботи з альтернативними видами палива. Більшість з них розташована в Норвегії, Японії та Республіці Корея.\n\nIMO спільно з провідними суднобудівними компаніями розробляє єдиний міжнародний стандарт сертифікації. Очікується, що він буде прийнятий до кінця 2026 року. Моряки з відповідними сертифікатами можуть розраховувати на надбавку до зарплати у розмірі 20–30%.",
      pl: "Przejście branży morskiej na alternatywne paliwa — amoniak, metanol i wodór — stwarza pilną potrzebę szkolenia nowych kadr inżynierskich. Według szacunków DNV do 2028 roku flota będzie potrzebować co najmniej 4 000 certyfikowanych inżynierów do obsługi takich instalacji.\n\nObecnie tylko 12 uczelni na świecie oferuje certyfikowane programy szkoleniowe w zakresie pracy z alternatywnymi paliwami. Większość z nich znajduje się w Norwegii, Japonii i Korei Południowej.\n\nIMO we współpracy z wiodącymi firmami stoczniowymi opracowuje jednolity międzynarodowy standard certyfikacji, który ma zostać przyjęty do końca 2026 roku.",
      ru: "Переход морской отрасли на альтернативные виды топлива — аммиак, метанол и водород — создаёт острую необходимость в подготовке новых инженерных кадров. По оценкам DNV, к 2028 году флот потребует не менее 4 000 сертифицированных инженеров для обслуживания таких установок.\n\nВ настоящее время только 12 учебных заведений в мире предлагают сертифицированные программы подготовки для работы с альтернативными видами топлива. Большинство из них расположены в Норвегии, Японии и Республике Корея.\n\nIMO совместно с ведущими судостроительными компаниями разрабатывает единый международный стандарт сертификации, который планируется принять до конца 2026 года.",
      en: "The maritime industry's shift to alternative fuels — ammonia, methanol, and hydrogen — is creating an urgent need for new engineering talent. According to DNV estimates, the fleet will require at least 4,000 certified engineers to operate such systems by 2028.\n\nCurrently only 12 institutions worldwide offer certified training programmes for alternative fuel systems, most located in Norway, Japan, and South Korea.\n\nThe IMO, together with leading shipbuilding companies, is developing a unified international certification standard expected to be adopted by end of 2026. Engineers holding such certificates can expect a salary premium of 20–30%.",
    },
    tag: "Industry",
    date: "2026-05-15",
    gradient: "linear-gradient(135deg,#14532d,#166534)",
  },
];
