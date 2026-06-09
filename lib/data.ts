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
  {
    id: 4,
    title: {
      en: "Over 300 Vessels File for PGSA Permits as Hormuz Traffic Slows to a Trickle",
      ua: "Понад 300 суден подали заявки на дозволи PGSA — трафік через Ормузьку протоку впав до мінімуму",
      pl: "Ponad 300 statków złożyło wnioski o pozwolenia PGSA — ruch przez Cieśninę Ormuz spada do minimum",
      ru: "Более 300 судов подали заявки на разрешения PGSA — трафик через Ормузский пролив упал до минимума",
    },
    body: {
      en: "More than 300 non-Iranian commercial vessels have formally applied for safe-passage permits through the Strait of Hormuz following the establishment of the Persian Gulf Strait Authority (PGSA) by Iran in late May 2026. The move has thrown one of the world's most critical maritime chokepoints into uncertainty, with transit numbers falling well below historical averages.\n\nAccording to tracking data analyzed by industry sources, only six verified crossings were recorded on June 3 — a figure that stands in stark contrast to the roughly 20–22 transits typically observed on any given day. Of the vessels currently held up, approximately 77 percent are outbound — predominantly bound for China and India — while the remaining 23 percent are inbound cargo destined for UAE ports.\n\nThe scale of the disruption is considerable: an estimated 2,000 vessels are caught up in the standoff, though some shipping intelligence services put the number of actively affected ships lower. Over the past three weeks, around 40 vessels managed to complete transit with coordination support from US Navy forces in the region. However, US officials have clarified that American forces are maintaining communication channels with commercial shipping rather than providing direct escorts.\n\nThe PGSA, which Iran asserts holds authority over a defined geographic corridor through the Strait, has stated it will not issue permits to vessels flying flags of countries it designates as hostile. The full list of restricted nationalities has not been officially disclosed, adding compliance uncertainty for operators and owners.\n\nFor seafarers and shipping companies, the consequences are immediate: voyages are lengthening, crew contracts are stretching beyond agreed rotations, and insurance premiums for Gulf transit have climbed sharply. Crewing managers and charterers are urged to monitor PGSA developments closely and build significant delay buffers into all scheduling decisions until the situation stabilises.",
      ua: "Понад 300 неіранських комерційних суден офіційно подали заявки на отримання дозволів для безпечного проходу через Ормузьку протоку після заснування Іраном Органу управління судноплавством у Перській затоці (PGSA) наприкінці травня 2026 року. Цей крок поставив під загрозу один із найважливіших морських коридорів світу: кількість транзитів впала значно нижче звичайних показників.\n\nЗа даними аналізу трекінгових систем, 3 червня через протоку пройшло лише шість підтверджених суден — разючий контраст із середнім показником у 20–22 переходи на добу. Серед суден, що чекають на дозвіл або обмежені у переміщенні, близько 77% прямують на вихід із протоки — переважно до Китаю та Індії, — а решта 23% рухаються у бік портів ОАЕ.\n\nМасштаб зупинки значний: за різними оцінками, у зону конфлікту потрапило близько 2 000 суден. За останні три тижні приблизно 40 з них змогли пройти протоку завдяки координаційній підтримці ВМС США в регіоні. Водночас американська сторона уточнила, що її сили лише підтримують зв'язок із комерційними суднами, а не супроводжують їх.\n\nPGSA, якому Іран надав повноваження контролювати визначений географічний коридор у протоці, заявив, що не видаватиме дозволи суднам під прапорами країн, визнаних ворожими. Повний перелік таких держав офіційно не оприлюднений, що створює додаткову невизначеність для судновласників та операторів.\n\nДля моряків та судноплавних компаній наслідки відчутні вже зараз: рейси подовжуються, терміни контрактів екіпажів виходять за рамки погоджених ротацій, а страхові премії за транзит через затоку різко зросли. Крюінговим менеджерам та фрахтувальникам рекомендується уважно стежити за заявами PGSA і закладати суттєві запаси часу в усі планові рішення до стабілізації ситуації.",
      pl: "Ponad 300 nieperskich statków handlowych złożyło formalne wnioski o zezwolenia na bezpieczny przejazd przez Cieśninę Ormuz po powołaniu przez Iran Organu Zarządzania Cieśniną Perską (PGSA) pod koniec maja 2026 roku. Posunięcie to postawiło jeden z najważniejszych morskich korytarzy świata w stan niepewności, a liczba tranzytów spadła daleko poniżej historycznych średnich.\n\nWedług danych śledzenia analizowanych przez źródła branżowe 3 czerwca odnotowano jedynie sześć potwierdzonych przepraw — wynik uderzająco niski w porównaniu ze zwykłymi 20–22 tranzytami dziennie. Spośród statków oczekujących lub objętych ograniczeniami około 77 procent płynie na wyjście z cieśniny — głównie do Chin i Indii — natomiast pozostałe 23 procent stanowi ładunek przychodzący do portów ZEA.\n\nSkala zakłóceń jest znacząca: szacuje się, że nawet 2 000 statków jest uwikłanych w impas. W ciągu ostatnich trzech tygodni około 40 statków zdołało przepłynąć przez cieśninę dzięki wsparciu koordynacyjnemu sił Marynarki Wojennej USA w regionie. Strona amerykańska wyjaśniła jednak, że jej siły utrzymują łączność ze statkami handlowymi, a nie zapewniają im bezpośrednich eskort.\n\nPGSA, któremu Iran przyznał uprawnienia do kontroli nad wyznaczonym korytarzem geograficznym w cieśninie, oświadczył, że nie będzie wydawał zezwoleń statkom pływającym pod banderami krajów uznanych za wrogie. Pełna lista takich krajów nie została oficjalnie opublikowana, co stwarza dodatkową niepewność dla armatorów i operatorów.\n\nDla marynarzy i firm żeglugowych skutki są natychmiastowe: rejsy się wydłużają, kontrakty załóg wykraczają poza uzgodnione rotacje, a składki ubezpieczeniowe za tranzyt przez Zatokę Perską gwałtownie wzrosły. Menedżerowie crewingowi i czarterujący są wzywani do ścisłego monitorowania ogłoszeń PGSA i uwzględniania znacznych rezerw czasowych we wszystkich decyzjach planistycznych do czasu stabilizacji sytuacji.",
      ru: "Более 300 неиранских коммерческих судов официально подали заявки на получение разрешений для безопасного прохода через Ормузский пролив после создания Ираном Органа управления судоходством в Персидском заливе (PGSA) в конце мая 2026 года. Этот шаг поставил один из важнейших морских коридоров мира в состояние неопределённости, а число транзитов опустилось значительно ниже исторических показателей.\n\nПо данным систем отслеживания, 3 июня через пролив прошло лишь шесть подтверждённых судов — разительный контраст с обычными 20–22 транзитами в сутки. Среди судов, ожидающих разрешения или ограниченных в передвижении, около 77% движутся на выход из пролива — преимущественно в Китай и Индию, — тогда как оставшиеся 23% перевозят грузы, направляющиеся в порты ОАЭ.\n\nМасштаб нарушений значителен: по различным оценкам, в зоне противостояния находится около 2 000 судов. За последние три недели примерно 40 из них смогли пройти пролив благодаря координационной поддержке ВМС США в регионе. Вместе с тем американская сторона уточнила, что её силы поддерживают связь с коммерческими судами, а не сопровождают их.\n\nPGSA, которому Иран предоставил полномочия контролировать определённый географический коридор в проливе, заявил, что не будет выдавать разрешения судам под флагами стран, признанных враждебными. Полный перечень таких государств официально не раскрыт, что создаёт дополнительную неопределённость для судовладельцев и операторов.\n\nДля моряков и судоходных компаний последствия ощутимы уже сейчас: рейсы удлиняются, сроки контрактов экипажей выходят за рамки согласованных ротаций, а страховые премии за транзит через Персидский залив резко выросли. Крюинговым менеджерам и фрахтователям рекомендуется внимательно следить за заявлениями PGSA и закладывать значительный временной запас во все плановые решения до стабилизации ситуации.",
    },
    tag: "Industry",
    date: "2026-06-09",
    gradient: "linear-gradient(135deg,#1e3a5f,#7c2d12)",
  },
];
