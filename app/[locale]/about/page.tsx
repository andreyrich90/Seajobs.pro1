"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Anchor, Ship, Users, Globe, FileText, Search, Send, MessageSquare,
  ShieldCheck, ShieldAlert, BadgeCheck, Wallet, Lock, Languages, Compass, CheckCircle2,
} from "lucide-react";
import { T, type Lang } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";

// Rich, original About content (kept inline, localised) — expands the page well
// beyond a boilerplate stub so both readers and search engines see a real,
// trustworthy description of what SeaJobs.pro is and how it works.
type Step = { t: string; d: string };
type AboutCopy = {
  worksTitle: string; worksSub: string;
  forSeafarers: string; seafarerSteps: Step[];
  forCompanies: string; companySteps: Step[];
  serveTitle: string; serveIntro: string; fleets: Step[]; ranksNote: string;
  scamTitle: string; scamLead: string; scamPoints: string[];
  coverageTitle: string; coveragePoints: Step[];
  trustTitle: string; trustPoints: Step[];
};

const AB: Record<Lang, AboutCopy> = {
  en: {
    worksTitle: "How SeaJobs.pro works",
    worksSub: "Two sides, one harbour — seafarers looking for their next contract, and crewing agencies looking for verified crew.",
    forSeafarers: "For seafarers",
    seafarerSteps: [
      { t: "Build your profile & CV", d: "Add your rank, sea service, certificates, documents and readiness date once. Upload an existing CV and we structure it for you." },
      { t: "Search real vacancies", d: "Filter by rank, vessel type and fleet — from bulk carriers and tankers to offshore, cruise and tugs. Salaries are shown up front, never “negotiable”." },
      { t: "Apply and track", d: "Apply in one click. Your full CV — certificates, sea service and documents — goes straight to the crewing manager, and you follow every application’s status." },
      { t: "Get contacted directly", d: "Verified crewing agencies message you through the platform. No middlemen between you and the ship." },
    ],
    forCompanies: "For crewing agencies",
    companySteps: [
      { t: "Register for free", d: "Create a company account and get a verified badge. Posting vacancies on SeaJobs.pro is free." },
      { t: "Post a vacancy in 2 minutes", d: "Publish a position with rank, vessel, salary and joining date. Every vacancy is automatically indexed for Google for Jobs." },
      { t: "Receive matching applicants", d: "Seafarers apply with a complete, structured CV, so you assess certificates and sea time at a glance." },
      { t: "Review and message", d: "Open each applicant’s CV, save shortlists and chat with candidates directly inside your dashboard." },
    ],
    serveTitle: "Who we serve",
    serveIntro: "SeaJobs.pro covers the whole merchant and specialised fleet, and every rank on board — from Master and Chief Engineer to ratings, cadets and catering crew.",
    fleets: [
      { t: "Merchant fleet", d: "Tankers, bulk carriers, container ships, general cargo, car carriers and reefers." },
      { t: "Offshore", d: "AHTS, PSV, OSV, DP vessels, wind-farm support and construction units." },
      { t: "Cruise & passenger", d: "Cruise liners, ferries and RoPax — deck, engine and hotel departments." },
      { t: "Tugs & dredging", d: "Harbour and ocean tugs, dredgers, barges and workboats." },
      { t: "Fishing", d: "Trawlers, seiners and fishing support vessels." },
    ],
    ranksNote: "Deck officers, engine officers, electro-technical, ratings, cadets, catering and offshore specialists — plus dual and combined roles.",
    scamTitle: "Our anti-scam promise",
    scamLead: "SeaJobs.pro is free for seafarers, and we are strict about it. A legitimate crewing agency never asks a seafarer for money.",
    scamPoints: [
      "Never pay for a contract, a place on board, a medical, certificates, visas or “processing”.",
      "If anyone asks you to pay to be hired — it is a scam. Stop all contact and let us know.",
      "We show this warning across the site and remove listings and companies that break the rule.",
    ],
    coverageTitle: "Coverage & languages",
    coveragePoints: [
      { t: "Vacancies across Europe", d: "Positions from crewing agencies throughout Europe, for seafarers of every nationality worldwide." },
      { t: "Five languages", d: "The platform is available in English, Russian, Ukrainian, Polish and Romanian." },
      { t: "One place for your career", d: "Vacancies, CV builder, applications, saved jobs, a maritime forum and industry news — in a single harbour." },
    ],
    trustTitle: "Why crews trust us",
    trustPoints: [
      { t: "Verified companies", d: "Crewing agencies carry a verified badge so you know who you are talking to." },
      { t: "Transparent salaries", d: "Real pay ranges on every vacancy — we ask crewing to state the salary, not hide it." },
      { t: "Direct contact", d: "Your CV reaches the crewing manager directly, with no fee and no intermediary." },
      { t: "Privacy first", d: "You control your data and who can see it. We never sell seafarer information." },
    ],
  },
  ru: {
    worksTitle: "Как работает SeaJobs.pro",
    worksSub: "Две стороны, одна гавань — моряки в поиске следующего контракта и крюинговые агентства в поиске проверенного экипажа.",
    forSeafarers: "Для моряков",
    seafarerSteps: [
      { t: "Заполните профиль и CV", d: "Один раз укажите ранг, морской стаж, сертификаты, документы и дату готовности. Загрузите готовое CV — мы разберём его на поля." },
      { t: "Ищите реальные вакансии", d: "Фильтруйте по рангу, типу судна и флоту — от балкеров и танкеров до офшора, круизов и буксиров. Зарплата указана сразу, без «договорная»." },
      { t: "Откликайтесь и отслеживайте", d: "Отклик в один клик. Ваше полное CV — сертификаты, стаж и документы — уходит напрямую крюинг-менеджеру, а вы видите статус каждого отклика." },
      { t: "Общайтесь напрямую", d: "Проверенные крюинги пишут вам через платформу. Никаких посредников между вами и судном." },
    ],
    forCompanies: "Для крюинговых агентств",
    companySteps: [
      { t: "Бесплатная регистрация", d: "Создайте аккаунт компании и получите бейдж проверенной. Размещение вакансий на SeaJobs.pro бесплатно." },
      { t: "Вакансия за 2 минуты", d: "Опубликуйте позицию с рангом, судном, зарплатой и датой посадки. Каждая вакансия автоматически индексируется в Google for Jobs." },
      { t: "Получайте подходящих кандидатов", d: "Моряки откликаются полным структурированным CV — вы сразу видите сертификаты и стаж." },
      { t: "Смотрите и пишите", d: "Открывайте CV каждого кандидата, сохраняйте шорт-листы и общайтесь прямо в кабинете." },
    ],
    serveTitle: "Кого мы обслуживаем",
    serveIntro: "SeaJobs.pro охватывает весь торговый и специализированный флот и все должности на борту — от капитана и старшего механика до рядового состава, кадетов и кейтеринга.",
    fleets: [
      { t: "Торговый флот", d: "Танкеры, балкеры, контейнеровозы, генеральный груз, автовозы и рефрижераторы." },
      { t: "Офшор", d: "AHTS, PSV, OSV, DP-суда, обслуживание ветропарков и монтажные единицы." },
      { t: "Круизы и пассажирский", d: "Лайнеры, паромы и RoPax — палубная, машинная и отельная службы." },
      { t: "Буксиры и дноуглубление", d: "Портовые и морские буксиры, дноуглубители, баржи и рабочие суда." },
      { t: "Рыболовный", d: "Траулеры, сейнеры и суда рыбопромыслового обеспечения." },
    ],
    ranksNote: "Палубные и машинные офицеры, электро-технические специалисты, рядовой состав, кадеты, кейтеринг и офшорные специалисты — включая совмещённые должности.",
    scamTitle: "Наше обещание против скама",
    scamLead: "SeaJobs.pro бесплатен для моряков, и мы строго за этим следим. Легальное крюинговое агентство никогда не просит у моряка денег.",
    scamPoints: [
      "Никогда не платите за контракт, место на борту, медкомиссию, сертификаты, визы или «оформление».",
      "Если у вас просят деньги за трудоустройство — это скам. Прекратите общение и сообщите нам.",
      "Мы показываем это предупреждение по всему сайту и удаляем объявления и компании, нарушающие правило.",
    ],
    coverageTitle: "География и языки",
    coveragePoints: [
      { t: "Вакансии по всей Европе", d: "Позиции от крюингов по всей Европе — для моряков любой национальности по всему миру." },
      { t: "Пять языков", d: "Платформа доступна на английском, русском, украинском, польском и румынском." },
      { t: "Всё для карьеры в одном месте", d: "Вакансии, конструктор CV, отклики, избранное, морской форум и новости отрасли — в одной гавани." },
    ],
    trustTitle: "Почему экипажи нам доверяют",
    trustPoints: [
      { t: "Проверенные компании", d: "У крюинговых агентств есть бейдж проверенной компании — вы знаете, с кем говорите." },
      { t: "Прозрачные зарплаты", d: "Реальные вилки зарплат в каждой вакансии — мы просим крюинг указывать зарплату, а не скрывать её." },
      { t: "Прямой контакт", d: "Ваше CV попадает напрямую крюинг-менеджеру — без комиссий и посредников." },
      { t: "Приватность прежде всего", d: "Вы управляете своими данными и тем, кто их видит. Мы не продаём данные моряков." },
    ],
  },
  ua: {
    worksTitle: "Як працює SeaJobs.pro",
    worksSub: "Дві сторони, одна гавань — моряки в пошуку наступного контракту та крюїнгові агенції в пошуку перевіреного екіпажу.",
    forSeafarers: "Для моряків",
    seafarerSteps: [
      { t: "Заповніть профіль і CV", d: "Один раз вкажіть ранг, морський стаж, сертифікати, документи й дату готовності. Завантажте готове CV — ми розберемо його на поля." },
      { t: "Шукайте реальні вакансії", d: "Фільтруйте за рангом, типом судна й флотом — від балкерів і танкерів до офшору, круїзів і буксирів. Зарплата вказана одразу, без «договірна»." },
      { t: "Відгукуйтесь і відстежуйте", d: "Відгук в один клік. Ваше повне CV — сертифікати, стаж і документи — йде напряму крюїнг-менеджеру, а ви бачите статус кожного відгуку." },
      { t: "Спілкуйтесь напряму", d: "Перевірені крюїнги пишуть вам через платформу. Жодних посередників між вами й судном." },
    ],
    forCompanies: "Для крюїнгових агенцій",
    companySteps: [
      { t: "Безкоштовна реєстрація", d: "Створіть акаунт компанії й отримайте бейдж перевіреної. Розміщення вакансій на SeaJobs.pro безкоштовне." },
      { t: "Вакансія за 2 хвилини", d: "Опублікуйте позицію з рангом, судном, зарплатою й датою посадки. Кожна вакансія автоматично індексується в Google for Jobs." },
      { t: "Отримуйте влучних кандидатів", d: "Моряки відгукуються повним структурованим CV — ви одразу бачите сертифікати й стаж." },
      { t: "Переглядайте й пишіть", d: "Відкривайте CV кожного кандидата, зберігайте шорт-листи й спілкуйтесь просто в кабінеті." },
    ],
    serveTitle: "Кого ми обслуговуємо",
    serveIntro: "SeaJobs.pro охоплює весь торговий і спеціалізований флот та всі посади на борту — від капітана й старшого механіка до рядового складу, кадетів і кейтерингу.",
    fleets: [
      { t: "Торговий флот", d: "Танкери, балкери, контейнеровози, генеральний вантаж, автовози й рефрижератори." },
      { t: "Офшор", d: "AHTS, PSV, OSV, DP-судна, обслуговування вітропарків і монтажні одиниці." },
      { t: "Круїзи та пасажирський", d: "Лайнери, пороми та RoPax — палубна, машинна й готельна служби." },
      { t: "Буксири та днопоглиблення", d: "Портові й морські буксири, днопоглиблювачі, баржі й робочі судна." },
      { t: "Риболовний", d: "Траулери, сейнери й судна рибопромислового забезпечення." },
    ],
    ranksNote: "Палубні й машинні офіцери, електро-технічні спеціалісти, рядовий склад, кадети, кейтеринг і офшорні спеціалісти — включно з суміщеними посадами.",
    scamTitle: "Наша обіцянка проти шахрайства",
    scamLead: "SeaJobs.pro безкоштовний для моряків, і ми суворо за цим стежимо. Легальна крюїнгова агенція ніколи не просить у моряка грошей.",
    scamPoints: [
      "Ніколи не платіть за контракт, місце на борту, медкомісію, сертифікати, візи чи «оформлення».",
      "Якщо у вас просять гроші за працевлаштування — це шахрайство. Припиніть спілкування й повідомте нас.",
      "Ми показуємо це попередження по всьому сайту й видаляємо оголошення та компанії, що порушують правило.",
    ],
    coverageTitle: "Географія та мови",
    coveragePoints: [
      { t: "Вакансії по всій Європі", d: "Позиції від крюїнгів по всій Європі — для моряків будь-якої національності по всьому світу." },
      { t: "П'ять мов", d: "Платформа доступна англійською, російською, українською, польською та румунською." },
      { t: "Усе для кар'єри в одному місці", d: "Вакансії, конструктор CV, відгуки, обране, морський форум і новини галузі — в одній гавані." },
    ],
    trustTitle: "Чому екіпажі нам довіряють",
    trustPoints: [
      { t: "Перевірені компанії", d: "У крюїнгових агенцій є бейдж перевіреної компанії — ви знаєте, з ким говорите." },
      { t: "Прозорі зарплати", d: "Реальні вилки зарплат у кожній вакансії — ми просимо крюїнг вказувати зарплату, а не приховувати її." },
      { t: "Прямий контакт", d: "Ваше CV потрапляє напряму крюїнг-менеджеру — без комісій і посередників." },
      { t: "Приватність передусім", d: "Ви керуєте своїми даними й тим, хто їх бачить. Ми не продаємо дані моряків." },
    ],
  },
  pl: {
    worksTitle: "Jak działa SeaJobs.pro",
    worksSub: "Dwie strony, jeden port — marynarze szukający kolejnego kontraktu i agencje crewingowe szukające zweryfikowanej załogi.",
    forSeafarers: "Dla marynarzy",
    seafarerSteps: [
      { t: "Uzupełnij profil i CV", d: "Raz podaj stanowisko, staż morski, certyfikaty, dokumenty i datę gotowości. Wgraj gotowe CV — my ułożymy je w pola." },
      { t: "Szukaj prawdziwych ofert", d: "Filtruj według stanowiska, typu statku i floty — od masowców i zbiornikowców po offshore, wycieczkowce i holowniki. Wynagrodzenie widać od razu, bez „do uzgodnienia”." },
      { t: "Aplikuj i śledź", d: "Aplikacja jednym kliknięciem. Twoje pełne CV — certyfikaty, staż i dokumenty — trafia prosto do menedżera crewingu, a Ty widzisz status każdej aplikacji." },
      { t: "Kontakt bezpośredni", d: "Zweryfikowane agencje piszą do Ciebie przez platformę. Żadnych pośredników między Tobą a statkiem." },
    ],
    forCompanies: "Dla agencji crewingowych",
    companySteps: [
      { t: "Bezpłatna rejestracja", d: "Załóż konto firmy i zdobądź odznakę zweryfikowanej. Publikacja ofert na SeaJobs.pro jest bezpłatna." },
      { t: "Oferta w 2 minuty", d: "Opublikuj stanowisko ze stanowiskiem, statkiem, wynagrodzeniem i datą zaokrętowania. Każda oferta jest automatycznie indeksowana w Google for Jobs." },
      { t: "Otrzymuj dopasowanych kandydatów", d: "Marynarze aplikują pełnym, uporządkowanym CV — od razu widzisz certyfikaty i staż." },
      { t: "Przeglądaj i pisz", d: "Otwieraj CV każdego kandydata, zapisuj listy i rozmawiaj prosto w panelu." },
    ],
    serveTitle: "Kogo obsługujemy",
    serveIntro: "SeaJobs.pro obejmuje całą flotę handlową i specjalistyczną oraz wszystkie stanowiska na pokładzie — od kapitana i starszego mechanika po załogę, kadetów i catering.",
    fleets: [
      { t: "Flota handlowa", d: "Zbiornikowce, masowce, kontenerowce, drobnica, samochodowce i chłodniowce." },
      { t: "Offshore", d: "AHTS, PSV, OSV, jednostki DP, obsługa farm wiatrowych i jednostki budowlane." },
      { t: "Wycieczkowce i pasażerskie", d: "Wycieczkowce, promy i RoPax — działy pokładowy, maszynowy i hotelowy." },
      { t: "Holowniki i pogłębiarki", d: "Holowniki portowe i morskie, pogłębiarki, barki i jednostki robocze." },
      { t: "Rybołówstwo", d: "Trawlery, sejnery i jednostki wsparcia połowów." },
    ],
    ranksNote: "Oficerowie pokładowi i mechanicy, elektrycy, załoga, kadeci, catering i specjaliści offshore — także role łączone.",
    scamTitle: "Nasza obietnica przeciw oszustwom",
    scamLead: "SeaJobs.pro jest bezpłatny dla marynarzy i ściśle tego pilnujemy. Legalna agencja crewingowa nigdy nie prosi marynarza o pieniądze.",
    scamPoints: [
      "Nigdy nie płać za kontrakt, miejsce na statku, badania, certyfikaty, wizy ani „obsługę”.",
      "Jeśli ktoś żąda opłaty za zatrudnienie — to oszustwo. Przerwij kontakt i daj nam znać.",
      "To ostrzeżenie pokazujemy w całym serwisie i usuwamy oferty oraz firmy łamiące zasadę.",
    ],
    coverageTitle: "Zasięg i języki",
    coveragePoints: [
      { t: "Oferty w całej Europie", d: "Stanowiska od agencji crewingowych w całej Europie — dla marynarzy każdej narodowości na świecie." },
      { t: "Pięć języków", d: "Platforma dostępna po angielsku, rosyjsku, ukraińsku, polsku i rumuńsku." },
      { t: "Cała kariera w jednym miejscu", d: "Oferty, kreator CV, aplikacje, zapisane oferty, forum morskie i wiadomości branżowe — w jednym porcie." },
    ],
    trustTitle: "Dlaczego załogi nam ufają",
    trustPoints: [
      { t: "Zweryfikowane firmy", d: "Agencje crewingowe mają odznakę zweryfikowanej firmy — wiesz, z kim rozmawiasz." },
      { t: "Przejrzyste wynagrodzenia", d: "Realne widełki w każdej ofercie — prosimy crewing o podanie wynagrodzenia, nie o jego ukrywanie." },
      { t: "Kontakt bezpośredni", d: "Twoje CV trafia prosto do menedżera crewingu — bez opłat i pośredników." },
      { t: "Prywatność przede wszystkim", d: "Ty decydujesz o swoich danych i o tym, kto je widzi. Nie sprzedajemy danych marynarzy." },
    ],
  },
  ro: {
    worksTitle: "Cum funcționează SeaJobs.pro",
    worksSub: "Două părți, un singur port — marinari în căutarea următorului contract și agenții de crewing în căutarea unui echipaj verificat.",
    forSeafarers: "Pentru marinari",
    seafarerSteps: [
      { t: "Completează profilul și CV-ul", d: "Adaugă o singură dată funcția, vechimea pe mare, certificatele, documentele și data disponibilității. Încarcă un CV existent — îl structurăm noi." },
      { t: "Caută joburi reale", d: "Filtrează după funcție, tipul navei și flotă — de la vrachiere și tancuri la offshore, croaziere și remorchere. Salariul e afișat direct, fără „negociabil”." },
      { t: "Aplică și urmărește", d: "Aplici dintr-un clic. CV-ul tău complet — certificate, vechime și documente — ajunge direct la managerul de crewing, iar tu vezi statusul fiecărei aplicații." },
      { t: "Contact direct", d: "Agențiile verificate îți scriu prin platformă. Niciun intermediar între tine și navă." },
    ],
    forCompanies: "Pentru agenții de crewing",
    companySteps: [
      { t: "Înregistrare gratuită", d: "Creează un cont de companie și obține insigna de verificat. Publicarea joburilor pe SeaJobs.pro este gratuită." },
      { t: "Un job în 2 minute", d: "Publică o poziție cu funcția, nava, salariul și data îmbarcării. Fiecare job este indexat automat pentru Google for Jobs." },
      { t: "Primești candidați potriviți", d: "Marinarii aplică cu un CV complet și structurat — vezi imediat certificatele și vechimea." },
      { t: "Analizează și scrie", d: "Deschide CV-ul fiecărui candidat, salvează liste scurte și discută direct în panou." },
    ],
    serveTitle: "Pe cine deservim",
    serveIntro: "SeaJobs.pro acoperă întreaga flotă comercială și specializată și toate funcțiile de la bord — de la comandant și șef mecanic la nebrevetați, cadeți și catering.",
    fleets: [
      { t: "Flota comercială", d: "Tancuri, vrachiere, portcontainere, marfă generală, transportoare auto și nave frigorifice." },
      { t: "Offshore", d: "AHTS, PSV, OSV, nave DP, suport pentru parcuri eoliene și unități de construcție." },
      { t: "Croaziere și pasageri", d: "Nave de croazieră, feriboturi și RoPax — punte, mașini și departamentul hotelier." },
      { t: "Remorchere și dragare", d: "Remorchere portuare și maritime, drage, barje și nave de lucru." },
      { t: "Pescuit", d: "Traulere, seinere și nave de suport pentru pescuit." },
    ],
    ranksNote: "Ofițeri de punte și mecanici, electricieni, nebrevetați, cadeți, catering și specialiști offshore — inclusiv roluri combinate.",
    scamTitle: "Promisiunea noastră anti-fraudă",
    scamLead: "SeaJobs.pro este gratuit pentru marinari și suntem stricți în privința asta. O agenție de crewing legitimă nu cere niciodată bani unui marinar.",
    scamPoints: [
      "Nu plăti niciodată pentru un contract, un loc la bord, vizita medicală, certificate, vize sau „procesare”.",
      "Dacă cineva îți cere bani ca să fii angajat — este o fraudă. Oprește contactul și anunță-ne.",
      "Afișăm acest avertisment pe tot site-ul și eliminăm anunțurile și companiile care încalcă regula.",
    ],
    coverageTitle: "Acoperire și limbi",
    coveragePoints: [
      { t: "Joburi în toată Europa", d: "Poziții de la agenții de crewing din toată Europa — pentru marinari de orice naționalitate din lume." },
      { t: "Cinci limbi", d: "Platforma este disponibilă în engleză, rusă, ucraineană, poloneză și română." },
      { t: "Toată cariera într-un loc", d: "Joburi, generator de CV, aplicații, joburi salvate, forum maritim și știri din industrie — într-un singur port." },
    ],
    trustTitle: "De ce au încredere echipajele",
    trustPoints: [
      { t: "Companii verificate", d: "Agențiile de crewing au o insignă de verificat — știi cu cine vorbești." },
      { t: "Salarii transparente", d: "Intervale reale de salariu la fiecare job — cerem crewingului să indice salariul, nu să-l ascundă." },
      { t: "Contact direct", d: "CV-ul tău ajunge direct la managerul de crewing — fără taxe și fără intermediari." },
      { t: "Confidențialitate în primul rând", d: "Tu controlezi datele tale și cine le vede. Nu vindem datele marinarilor." },
    ],
  },
};

const SEAFARER_ICONS = [FileText, Search, Send, MessageSquare];
const COMPANY_ICONS = [BadgeCheck, Send, Users, MessageSquare];
const FLEET_ICONS = [Ship, Compass, Users, Anchor, Globe];
const TRUST_ICONS = [BadgeCheck, Wallet, Send, Lock];
const COVERAGE_ICONS = [Globe, Languages, Anchor];

export default function AboutPage() {
  const { lang } = useLang();
  const t = T[lang];
  const ab = AB[lang] ?? AB.en;

  const values = [
    { icon: Ship, title: t.about_v1_title, text: t.about_v1_text },
    { icon: Users, title: t.about_v2_title, text: t.about_v2_text },
    { icon: Globe, title: t.about_v3_title, text: t.about_v3_text },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_0%,#0e2a45,#0a1f33_60%)]" />
          <div className="relative mx-auto max-w-4xl px-5 py-20 text-center">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brass to-brass2 shadow-xl">
              <Anchor size={30} className="text-[#061523]" strokeWidth={2.4} />
            </div>
            <h1 className="font-display text-4xl font-semibold text-white md:text-5xl">
              About SeaJobs<span className="text-brass2">.pro</span>
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-mist leading-relaxed">
              {t.about_hero_sub}
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-4xl px-5 py-16">
          <div className="rounded-2xl border border-white/10 bg-card p-8 md:p-12">
            <h2 className="font-display text-2xl font-semibold text-white mb-4">{t.about_mission_title}</h2>
            <p className="text-mist leading-relaxed">{t.about_mission_p1}</p>
            <p className="mt-4 text-mist leading-relaxed">{t.about_mission_p2}</p>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-5xl px-5 pb-4">
          <h2 className="font-display text-2xl font-semibold text-white text-center">{ab.worksTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-mist leading-relaxed">{ab.worksSub}</p>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Seafarers */}
            <div className="rounded-2xl border border-white/10 bg-card p-6 md:p-8">
              <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold text-white">
                <Users size={20} className="text-brass2" /> {ab.forSeafarers}
              </h3>
              <ol className="space-y-4">
                {ab.seafarerSteps.map((s, i) => {
                  const Icon = SEAFARER_ICONS[i] ?? FileText;
                  return (
                    <li key={i} className="flex gap-3.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brass/15 text-brass2">
                        <Icon size={17} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-white">{s.t}</span>
                        <span className="mt-0.5 block text-sm text-mist leading-relaxed">{s.d}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Companies */}
            <div className="rounded-2xl border border-white/10 bg-card p-6 md:p-8">
              <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold text-white">
                <BadgeCheck size={20} className="text-teal" /> {ab.forCompanies}
              </h3>
              <ol className="space-y-4">
                {ab.companySteps.map((s, i) => {
                  const Icon = COMPANY_ICONS[i] ?? FileText;
                  return (
                    <li key={i} className="flex gap-3.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal/15 text-teal">
                        <Icon size={17} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-white">{s.t}</span>
                        <span className="mt-0.5 block text-sm text-mist leading-relaxed">{s.d}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* Who we serve */}
        <section className="mx-auto max-w-5xl px-5 py-16">
          <h2 className="font-display text-2xl font-semibold text-white text-center">{ab.serveTitle}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-mist leading-relaxed">{ab.serveIntro}</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ab.fleets.map((f, i) => {
              const Icon = FLEET_ICONS[i] ?? Ship;
              return (
                <div key={f.t} className="rounded-2xl border border-white/10 bg-card p-5">
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-brass/15">
                    <Icon size={19} className="text-brass2" />
                  </div>
                  <h3 className="font-semibold text-white">{f.t}</h3>
                  <p className="mt-1 text-sm text-mist leading-relaxed">{f.d}</p>
                </div>
              );
            })}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-mist leading-relaxed">{ab.ranksNote}</p>
        </section>

        {/* Anti-scam promise */}
        <section className="mx-auto max-w-4xl px-5 pb-16">
          <div className="rounded-2xl border border-coral/30 bg-coral/5 p-8 md:p-10">
            <h2 className="mb-3 flex items-center gap-2 font-display text-2xl font-semibold text-white">
              <ShieldAlert size={24} className="text-coral" /> {ab.scamTitle}
            </h2>
            <p className="text-mist leading-relaxed">{ab.scamLead}</p>
            <ul className="mt-5 space-y-2.5">
              {ab.scamPoints.map((p, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-foam leading-relaxed">
                  <ShieldCheck size={17} className="mt-0.5 shrink-0 text-coral" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Coverage & languages */}
        <section className="mx-auto max-w-5xl px-5 pb-16">
          <h2 className="font-display text-2xl font-semibold text-white text-center mb-8">{ab.coverageTitle}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {ab.coveragePoints.map((c, i) => {
              const Icon = COVERAGE_ICONS[i] ?? Globe;
              return (
                <div key={c.t} className="rounded-2xl border border-white/10 bg-card p-6 text-center">
                  <div className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brass/15">
                    <Icon size={20} className="text-brass2" />
                  </div>
                  <h3 className="font-semibold text-white">{c.t}</h3>
                  <p className="mt-1.5 text-sm text-mist leading-relaxed">{c.d}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why trust us */}
        <section className="mx-auto max-w-5xl px-5 pb-16">
          <h2 className="font-display text-2xl font-semibold text-white text-center mb-8">{ab.trustTitle}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ab.trustPoints.map((tp, i) => {
              const Icon = TRUST_ICONS[i] ?? CheckCircle2;
              return (
                <div key={tp.t} className="flex gap-4 rounded-2xl border border-white/10 bg-card p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brass/15 text-brass2">
                    <Icon size={19} />
                  </span>
                  <span>
                    <span className="block font-semibold text-white">{tp.t}</span>
                    <span className="mt-0.5 block text-sm text-mist leading-relaxed">{tp.d}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-4xl px-5 pb-16">
          <h2 className="font-display text-2xl font-semibold text-white mb-8 text-center">{t.about_values_title}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-card p-6">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-brass/15">
                  <v.icon size={20} className="text-brass2" />
                </div>
                <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-mist leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mx-auto max-w-4xl px-5 pb-16">
          <div className="rounded-2xl border border-brass/20 bg-brass/5 p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-white mb-2">{t.about_cta_title}</h2>
            <p className="text-mist mb-5">{t.about_cta_sub}</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
            >
              {t.about_cta_btn}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
