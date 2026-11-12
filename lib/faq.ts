import type { Lang } from "@/lib/langs";
import { FREE_UNLOCKS_PER_WEEK as F, SUB_FROM, subPrice } from "@/lib/subscription";

/** The cheapest plan as each language writes it — never typed into the answers. */
const p = (lang: Lang) => subPrice(SUB_FROM, lang);

// Localized FAQ content rendered by components/FaqSection.tsx as a visible
// accordion + FAQPage structured data (rich results / AI-search citations).
// Keep answers factual about how the product actually works.

export type FaqItem = {
  q: Record<Lang, string>;
  a: Record<Lang, string>;
};

export const FAQ_HEADING: Record<Lang, string> = {
  en: "Frequently asked questions",
  ru: "Частые вопросы",
  ua: "Часті запитання",
  pl: "Najczęstsze pytania",
  ro: "Întrebări frecvente",
};

// ── Seafarer-facing FAQ (homepage) ───────────────────────────────────────────
export const FAQ_SEAFARERS: FaqItem[] = [
  {
    q: {
      en: "Is SeaJobs.pro free for seafarers?",
      ru: "SeaJobs.pro бесплатен для моряков?",
      ua: "SeaJobs.pro безкоштовний для моряків?",
      pl: "Czy SeaJobs.pro jest darmowy dla marynarzy?",
      ro: "Este SeaJobs.pro gratuit pentru marinari?",
    },
    a: {
      en: `Partly. Registration, browsing vacancies, your profile and building a CV are free, and so are ${F} contact views a week: open a vacancy's contacts — the agency's e-mail and phone — and apply to it. With a subscription from ${p("en")} for 3 months there is no weekly limit, and you can download your CV. We never take money for a job, a contract or a place on board.`,
      ru: `Частично. Регистрация, просмотр вакансий, профиль и сборка CV — бесплатно, и ещё ${F} просмотра контактов в неделю: откройте контакты вакансии — e-mail и телефон крюинга — и откликнитесь. С подпиской от ${p("ru")} за 3 месяца — без недельного лимита и со скачиванием CV. Денег за работу, контракт или место на судне мы не берём никогда.`,
      ua: `Частково. Реєстрація, перегляд вакансій, профіль і збірка CV — безкоштовно, а ще ${F} перегляди контактів на тиждень: відкрийте контакти вакансії — e-mail і телефон крюїнгу — і відгукніться. З підпискою від ${p("ua")} за 3 місяці — без тижневого ліміту і із завантаженням CV. Грошей за роботу, контракт чи місце на судні ми не беремо ніколи.`,
      pl: `Częściowo. Rejestracja, przeglądanie ofert, profil i tworzenie CV są darmowe, a do tego ${F} odsłony kontaktów tygodniowo: odkryj kontakty oferty — e-mail i telefon agencji — i aplikuj. Z subskrypcją od ${p("pl")} za 3 miesiące — bez tygodniowego limitu i z pobieraniem CV. Nigdy nie bierzemy pieniędzy za pracę, kontrakt ani miejsce na statku.`,
      ro: `Parțial. Înregistrarea, căutarea posturilor, profilul și crearea CV-ului sunt gratuite, plus ${F} vizualizări de contacte pe săptămână: deschide contactele unui post — e-mailul și telefonul agenției — și aplică. Cu abonamentul de la ${p("ro")} pentru 3 luni nu ai limită săptămânală și poți descărca CV-ul. Nu luăm niciodată bani pentru un post, un contract sau un loc la bord.`,
    },
  },
  {
    q: {
      en: "How do I apply for a vacancy?",
      ru: "Как откликнуться на вакансию?",
      ua: "Як відгукнутися на вакансію?",
      pl: "Jak aplikować na ofertę?",
      ro: "Cum aplic la un post?",
    },
    a: {
      en: "Register, fill in your seafarer profile (or auto-fill it by uploading your CV), open a vacancy and press Apply. Your full application goes straight to the crewing manager.",
      ru: "Зарегистрируйтесь, заполните профиль моряка (или загрузите CV — данные подставятся автоматически), откройте вакансию и нажмите «Откликнуться». Ваша анкета уходит напрямую крюинг-менеджеру.",
      ua: "Зареєструйтеся, заповніть профіль моряка (або завантажте CV — дані підставляться автоматично), відкрийте вакансію та натисніть «Відгукнутися». Ваша анкета йде напряму крюїнг-менеджеру.",
      pl: "Zarejestruj się, uzupełnij profil marynarza (lub wgraj CV — dane uzupełnią się automatycznie), otwórz ofertę i kliknij Aplikuj. Twoje zgłoszenie trafia prosto do menedżera crewingu.",
      ro: "Înregistrează-te, completează profilul de marinar (sau încarcă CV-ul — datele se completează automat), deschide postul și apasă Aplică. Cererea ta ajunge direct la managerul de crewing.",
    },
  },
  {
    q: {
      en: "What documents do I need to work at sea?",
      ru: "Какие документы нужны для работы в море?",
      ua: "Які документи потрібні для роботи в морі?",
      pl: "Jakie dokumenty są potrzebne do pracy na morzu?",
      ro: "Ce documente îmi trebuie pentru a lucra pe mare?",
    },
    a: {
      en: "As a minimum: valid STCW basic safety certificates, a seafarer's medical certificate and a seaman's book. Officer ranks also need a certificate of competency; tankers and offshore add vessel-specific endorsements.",
      ru: "Минимум: действующие сертификаты STCW (базовая безопасность), судовая медкомиссия и паспорт моряка. Офицерам нужен рабочий диплом; на танкерах и оффшоре — дополнительные допуски по типу судна.",
      ua: "Мінімум: чинні сертифікати STCW (базова безпека), суднова медкомісія та посвідчення моряка. Офіцерам потрібен робочий диплом; на танкерах і офшорі — додаткові допуски за типом судна.",
      pl: "Minimum: ważne certyfikaty STCW (bezpieczeństwo podstawowe), świadectwo zdrowia marynarza i książeczka żeglarska. Oficerowie potrzebują dyplomu; zbiornikowce i offshore wymagają dodatkowych uprawnień.",
      ro: "Minimul: certificate STCW valabile (siguranță de bază), aviz medical maritim și carnet de marinar. Ofițerii au nevoie de brevet; tancurile și offshore-ul cer atestate suplimentare.",
    },
  },
  {
    q: {
      en: "Are the vacancies real and verified?",
      ru: "Вакансии настоящие и проверенные?",
      ua: "Вакансії справжні та перевірені?",
      pl: "Czy oferty są prawdziwe i zweryfikowane?",
      ro: "Posturile sunt reale și verificate?",
    },
    a: {
      en: "Vacancies come from crewing agencies and shipowners. Verified companies carry a badge, and every application is forwarded to a real crewing contact — SeaJobs.pro never charges seafarers for placement.",
      ru: "Вакансии публикуют крюинговые агентства и судовладельцы. Проверенные компании отмечены значком, а каждый отклик уходит реальному крюинг-контакту. SeaJobs.pro никогда не берёт с моряков деньги за трудоустройство.",
      ua: "Вакансії публікують крюїнгові агентства та судновласники. Перевірені компанії позначені значком, а кожен відгук іде реальному крюїнг-контакту. SeaJobs.pro ніколи не бере з моряків гроші за працевлаштування.",
      pl: "Oferty publikują agencje crewingowe i armatorzy. Zweryfikowane firmy mają odznakę, a każde zgłoszenie trafia do prawdziwego kontaktu crewingowego. SeaJobs.pro nigdy nie pobiera od marynarzy opłat za zatrudnienie.",
      ro: "Posturile sunt publicate de agenții de crewing și armatori. Companiile verificate au o insignă, iar fiecare aplicare ajunge la un contact real de crewing. SeaJobs.pro nu percepe niciodată taxe de plasare de la marinari.",
    },
  },
  {
    q: {
      en: "How will I find out about new vacancies for my rank?",
      ru: "Как узнавать о новых вакансиях по моей должности?",
      ua: "Як дізнаватися про нові вакансії за моєю посадою?",
      pl: "Jak dowiem się o nowych ofertach dla mojego stanowiska?",
      ro: "Cum aflu despre posturi noi pentru funcția mea?",
    },
    a: {
      en: "Set up a job alert in your dashboard and connect Telegram — we message you the moment a matching vacancy appears. You can follow several positions at once. You can also browse jobs by rank, vessel type or country from the links in the footer.",
      ru: "Настройте оповещение в личном кабинете и подключите Telegram — как только появится подходящая вакансия, пришлём сообщение. Должностей можно выбрать несколько. Также можно смотреть вакансии по должности, типу судна или стране — ссылки внизу страницы.",
      ua: "Налаштуйте сповіщення в особистому кабінеті та підключіть Telegram — щойно з'явиться підходяща вакансія, надішлемо повідомлення. Посад можна обрати кілька. Також можна дивитися вакансії за посадою, типом судна чи країною — посилання внизу сторінки.",
      pl: "Ustaw powiadomienie w panelu i połącz Telegram — napiszemy, gdy tylko pojawi się pasująca oferta. Możesz obserwować kilka stanowisk naraz. Możesz też przeglądać oferty według stanowiska, typu statku lub kraju — linki na dole strony.",
      ro: "Setează o alertă în contul tău și conectează Telegram — îți scriem imediat ce apare un post potrivit. Poți urmări mai multe funcții deodată. Poți răsfoi și posturile după funcție, tipul navei sau țară — linkurile din subsolul paginii.",
    },
  },
  {
    q: {
      en: "In what languages can I use SeaJobs.pro?",
      ru: "На каких языках доступен SeaJobs.pro?",
      ua: "Якими мовами доступний SeaJobs.pro?",
      pl: "W jakich językach dostępny jest SeaJobs.pro?",
      ro: "În ce limbi pot folosi SeaJobs.pro?",
    },
    a: {
      en: "The platform works in English, Russian, Ukrainian, Polish and Romanian — switch the language in the site header at any time.",
      ru: "Платформа работает на английском, русском, украинском, польском и румынском — язык переключается в шапке сайта в любой момент.",
      ua: "Платформа працює англійською, російською, українською, польською та румунською — мова перемикається в шапці сайту будь-коли.",
      pl: "Platforma działa po angielsku, rosyjsku, ukraińsku, polsku i rumuńsku — język zmienisz w nagłówku strony w każdej chwili.",
      ro: "Platforma funcționează în engleză, rusă, ucraineană, poloneză și română — schimbi limba din antetul site-ului oricând.",
    },
  },
];

// ── Company-facing FAQ (/for-companies) ──────────────────────────────────────
export const FAQ_COMPANIES: FaqItem[] = [
  {
    q: {
      en: "Is posting vacancies free for companies?",
      ru: "Размещение вакансий бесплатно для компаний?",
      ua: "Розміщення вакансій безкоштовне для компаній?",
      pl: "Czy publikacja ofert jest darmowa dla firm?",
      ro: "Publicarea posturilor este gratuită pentru companii?",
    },
    a: {
      en: "Yes — registering a company account and posting vacancies is free. A posting takes about two minutes.",
      ru: "Да — регистрация компании и размещение вакансий бесплатны. Публикация занимает около двух минут.",
      ua: "Так — реєстрація компанії та розміщення вакансій безкоштовні. Публікація займає близько двох хвилин.",
      pl: "Tak — rejestracja firmy i publikacja ofert są darmowe. Dodanie oferty zajmuje około dwóch minut.",
      ro: "Da — înregistrarea companiei și publicarea posturilor sunt gratuite. Un anunț durează circa două minute.",
    },
  },
  {
    q: {
      en: "How do we receive applications?",
      ru: "Как мы получаем отклики?",
      ua: "Як ми отримуємо відгуки?",
      pl: "Jak otrzymujemy zgłoszenia?",
      ro: "Cum primim aplicările?",
    },
    a: {
      en: "Applications appear in your company dashboard with the seafarer's full profile — documents, certificates and sea service — and you also get an email notification for each one.",
      ru: "Отклики появляются в кабинете компании с полной анкетой моряка — документы, сертификаты, стаж. На каждый отклик также приходит уведомление на почту.",
      ua: "Відгуки з'являються в кабінеті компанії з повною анкетою моряка — документи, сертифікати, стаж. На кожен відгук також надходить сповіщення на пошту.",
      pl: "Zgłoszenia pojawiają się w panelu firmy z pełnym profilem marynarza — dokumenty, certyfikaty i praktyka morska. O każdym zgłoszeniu informuje też e-mail.",
      ro: "Aplicările apar în panoul companiei cu profilul complet al marinarului — documente, certificate și stagiu de îmbarcare. Primești și o notificare pe e-mail pentru fiecare.",
    },
  },
  {
    q: {
      en: "Can we search the seafarer database ourselves?",
      ru: "Можно ли самим искать моряков в базе?",
      ua: "Чи можна самим шукати моряків у базі?",
      pl: "Czy możemy sami przeszukiwać bazę marynarzy?",
      ro: "Putem căuta singuri în baza de marinari?",
    },
    a: {
      en: "Yes. The company dashboard includes a seafarer search with filters by rank, and you can contact candidates directly through the built-in chat.",
      ru: "Да. В кабинете компании есть поиск моряков с фильтрами по должности, а связаться с кандидатом можно напрямую во встроенном чате.",
      ua: "Так. У кабінеті компанії є пошук моряків із фільтрами за посадою, а зв'язатися з кандидатом можна напряму у вбудованому чаті.",
      pl: "Tak. Panel firmy zawiera wyszukiwarkę marynarzy z filtrami według stanowiska, a z kandydatem skontaktujesz się bezpośrednio przez wbudowany czat.",
      ro: "Da. Panoul companiei include o căutare de marinari cu filtre după funcție, iar candidații pot fi contactați direct prin chatul integrat.",
    },
  },
  {
    q: {
      en: "What is the verified company badge?",
      ru: "Что такое значок проверенной компании?",
      ua: "Що таке значок перевіреної компанії?",
      pl: "Czym jest odznaka zweryfikowanej firmy?",
      ro: "Ce este insigna de companie verificată?",
    },
    a: {
      en: "After a manual check of your company details, your profile and vacancies get a verified badge — seafarers see it on every posting, which noticeably increases applications.",
      ru: "После ручной проверки данных компании профиль и вакансии получают значок «проверено» — моряки видят его на каждой вакансии, что заметно повышает количество откликов.",
      ua: "Після ручної перевірки даних компанії профіль і вакансії отримують значок «перевірено» — моряки бачать його на кожній вакансії, що помітно збільшує кількість відгуків.",
      pl: "Po ręcznej weryfikacji danych firmy profil i oferty otrzymują odznakę weryfikacji — marynarze widzą ją przy każdej ofercie, co wyraźnie zwiększa liczbę zgłoszeń.",
      ro: "După o verificare manuală a datelor companiei, profilul și posturile primesc insigna de verificare — marinarii o văd la fiecare anunț, ceea ce crește vizibil numărul de aplicări.",
    },
  },
  {
    q: {
      en: "Do vacancies appear in Google search?",
      ru: "Вакансии попадают в поиск Google?",
      ua: "Вакансії потрапляють у пошук Google?",
      pl: "Czy oferty pojawiają się w wyszukiwarce Google?",
      ro: "Posturile apar în căutarea Google?",
    },
    a: {
      en: "Yes — every vacancy is published with Google for Jobs structured data and in five languages, so postings surface in regular search and in the Google jobs panel.",
      ru: "Да — каждая вакансия публикуется с разметкой Google for Jobs и на пяти языках, поэтому объявления видны и в обычном поиске, и в блоке вакансий Google.",
      ua: "Так — кожна вакансія публікується з розміткою Google for Jobs і п'ятьма мовами, тож оголошення видно і в звичайному пошуку, і в блоці вакансій Google.",
      pl: "Tak — każda oferta jest publikowana z danymi strukturalnymi Google for Jobs i w pięciu językach, więc ogłoszenia widać w zwykłym wyszukiwaniu i w panelu ofert Google.",
      ro: "Da — fiecare post este publicat cu date structurate Google for Jobs și în cinci limbi, astfel anunțurile apar în căutarea obișnuită și în panoul de joburi Google.",
    },
  },
];

// ── "How to apply" page ──────────────────────────────────────────────────────
export const FAQ_APPLY: FaqItem[] = [
  {
    q: {
      en: "Do I have to pay to apply?",
      ru: "Нужно ли платить, чтобы подать анкету?",
      ua: "Чи потрібно платити, щоб подати анкету?",
      pl: "Czy muszę płacić, żeby aplikować?",
      ro: "Trebuie să plătesc ca să aplic?",
    },
    a: {
      en: `Not for ${F} contact views a week: open a vacancy's contacts — the agency's e-mail and phone — and apply to it for free. Beyond that, applying comes with the subscription, from ${p("en")} for 3 months, which also opens your CV files. Registration, your profile and the CV builder are free. You pay for the portal's tools, never for a job: if anyone asks you for money for a job, a medical, a contract or a visa, that is a scam, and you can report the vacancy to us.`,
      ru: `${F} просмотра контактов в неделю — бесплатно: откройте контакты вакансии — e-mail и телефон крюинга — и откликнитесь. Сверх этого отклик входит в подписку — от ${p("ru")} за 3 месяца; она же открывает файлы вашего CV. Регистрация, профиль и конструктор CV — бесплатно. Платите вы за инструменты портала, а не за работу: если кто-то просит деньги за работу, медкомиссию, контракт или визу — это мошенничество, сообщите нам о такой вакансии.`,
      ua: `${F} перегляди контактів на тиждень — безкоштовно: відкрийте контакти вакансії — e-mail і телефон крюїнгу — і відгукніться. Понад це відгук входить у підписку — від ${p("ua")} за 3 місяці; вона ж відкриває файли вашого CV. Реєстрація, профіль і конструктор CV — безкоштовно. Платите ви за інструменти порталу, а не за роботу: якщо хтось просить гроші за роботу, медкомісію, контракт чи візу — це шахрайство, повідомте нам про таку вакансію.`,
      pl: `${F} odsłony kontaktów tygodniowo są darmowe: odkryj kontakty oferty — e-mail i telefon agencji — i aplikuj. Ponad to aplikowanie jest w subskrypcji — od ${p("pl")} za 3 miesiące; otwiera ona też pliki Twojego CV. Rejestracja, profil i kreator CV są bezpłatne. Płacisz za narzędzia portalu, nie za pracę: jeśli ktoś żąda pieniędzy za pracę, badania, kontrakt lub wizę — to oszustwo, zgłoś nam taką ofertę.`,
      ro: `${F} vizualizări de contacte pe săptămână sunt gratuite: deschide contactele unui post — e-mailul și telefonul agenției — și aplică. Peste atât, aplicarea vine cu abonamentul — de la ${p("ro")} pentru 3 luni; el deschide și fișierele CV-ului tău. Înregistrarea, profilul și generatorul de CV sunt gratuite. Plătești uneltele portalului, nu un post: dacă cineva îți cere bani pentru un post, vizita medicală, contract sau viză — este o înșelătorie, anunță-ne despre acel anunț.`,
    },
  },
  {
    q: {
      en: "What exactly must be filled in before I can apply?",
      ru: "Что именно нужно заполнить, чтобы отклик отправился?",
      ua: "Що саме потрібно заповнити, щоб відгук надіслався?",
      pl: "Co dokładnie muszę uzupełnić, żeby wysłać aplikację?",
      ro: "Ce anume trebuie completat ca să pot aplica?",
    },
    a: {
      en: "Two things: a phone number in your profile and at least one sea service record. The crewing manager receives your CV together with the application, so it has to show how to reach you and what you have sailed on. Everything else — certificates, documents, readiness date — is optional but makes your CV much stronger.",
      ru: "Две вещи: телефон в профиле и минимум одна запись морского стажа. Крюинг-менеджер получает ваше CV вместе с откликом, поэтому в нём должно быть видно, как с вами связаться и на чём вы ходили. Всё остальное — сертификаты, документы, дата готовности — по желанию, но заметно усиливает CV.",
      ua: "Дві речі: телефон у профілі та щонайменше один запис морського стажу. Крюїнг-менеджер отримує ваше CV разом із відгуком, тож у ньому має бути видно, як з вами зв'язатися і на чому ви ходили. Усе інше — сертифікати, документи, дата готовності — за бажанням, але помітно посилює CV.",
      pl: "Dwie rzeczy: numer telefonu w profilu i co najmniej jeden wpis stażu morskiego. Menedżer crewingu dostaje Twoje CV razem z aplikacją, więc musi z niego wynikać, jak się z Tobą skontaktować i na czym pływałeś. Reszta — certyfikaty, dokumenty, data gotowości — jest opcjonalna, ale wyraźnie wzmacnia CV.",
      ro: "Două lucruri: un număr de telefon în profil și cel puțin o înregistrare de stagiu pe mare. Managerul de crewing primește CV-ul tău odată cu aplicarea, deci trebuie să se vadă cum te poate contacta și pe ce nave ai navigat. Restul — certificate, documente, data disponibilității — este opțional, dar îți întărește mult CV-ul.",
    },
  },
  {
    q: {
      en: "What happens after I press Apply?",
      ru: "Что происходит после нажатия «Подать анкету»?",
      ua: "Що відбувається після натискання «Подати анкету»?",
      pl: "Co się dzieje po kliknięciu „Aplikuj”?",
      ro: "Ce se întâmplă după ce apăs „Aplică”?",
    },
    a: {
      en: "It depends on who posted the vacancy. If a crewing company posted it from its own account on SeaJobs.pro, your full CV — contacts, documents and visas, certificates, sea service and your cover letter — lands in its dashboard and is e-mailed to it. If the vacancy comes from a crewing agency's own announcement (its Telegram channel or website), you apply from your own mailbox: your mail app opens with the letter ready — the agency's address, the subject and a link to your CV — and you just press Send. The letter reaches the crewing manager personally, from you. The CV link works for 30 days and you can withdraw it from your dashboard. Either way the application appears in your own list.",
      ru: "Зависит от того, кто разместил вакансию. Если крюинговая компания разместила её сама из своего аккаунта на SeaJobs.pro, ваше полное CV — контакты, документы и визы, сертификаты, морской стаж и сопроводительное письмо — попадает в её кабинет и приходит ей на e-mail. Если вакансия взята из объявления самого крюинга (его Telegram-канала или сайта), отклик отправляется с вашей почты: откроется ваш почтовый клиент с готовым письмом — адрес крюинга, тема и ссылка на ваше CV, — останется нажать «Отправить». Письмо придёт менеджеру лично от вас. Ссылка на CV действует 30 дней, её можно отозвать в кабинете. В любом случае отклик появляется в вашем списке.",
      ua: "Залежить від того, хто розмістив вакансію. Якщо крюїнгова компанія розмістила її сама зі свого акаунта на SeaJobs.pro, ваше повне CV — контакти, документи та візи, сертифікати, морський стаж і супровідний лист — потрапляє в її кабінет і надходить їй на e-mail. Якщо вакансію взято з оголошення самого крюїнгу (його Telegram-каналу чи сайту), відгук надсилається з вашої пошти: відкриється ваш поштовий клієнт із готовим листом — адреса крюїнгу, тема і посилання на ваше CV, — залишиться натиснути «Надіслати». Лист прийде менеджеру особисто від вас. Посилання на CV діє 30 днів, його можна відкликати в кабінеті. У будь-якому разі відгук з'являється у вашому списку.",
      pl: "To zależy od tego, kto opublikował ofertę. Jeśli agencja crewingowa dodała ją sama ze swojego konta na SeaJobs.pro, Twoje pełne CV — kontakty, dokumenty i wizy, certyfikaty, staż morski i list motywacyjny — trafia do jej panelu i na jej e-mail. Jeśli oferta pochodzi z ogłoszenia samej agencji (jej kanału na Telegramie lub strony), aplikujesz ze swojej poczty: otworzy się Twój program pocztowy z gotowym listem — adres agencji, temat i link do Twojego CV — wystarczy kliknąć „Wyślij”. List dociera do menedżera osobiście od Ciebie. Link do CV działa 30 dni i możesz go wycofać w panelu. Tak czy inaczej aplikacja pojawia się na Twojej liście.",
      ro: "Depinde de cine a publicat anunțul. Dacă o companie de crewing l-a publicat din propriul cont pe SeaJobs.pro, CV-ul tău complet — contacte, documente și vize, certificate, stagiu pe mare și scrisoarea de intenție — ajunge în panoul ei și pe e-mailul ei. Dacă anunțul provine din anunțul agenției (canalul ei de Telegram sau site-ul ei), aplici de pe e-mailul tău: se deschide programul tău de e-mail cu scrisoarea gata scrisă — adresa agenției, subiectul și un link spre CV-ul tău — doar apeși „Trimite”. Scrisoarea ajunge la manager personal, de la tine. Linkul spre CV este valabil 30 de zile și îl poți retrage din cont. Oricum, aplicarea apare în lista ta.",
    },
  },
  {
    q: {
      en: "I don't have a CV file. Can I still apply?",
      ru: "У меня нет готового CV файлом. Могу я подать анкету?",
      ua: "У мене немає готового CV файлом. Чи можу я подати анкету?",
      pl: "Nie mam pliku z CV. Czy mimo to mogę aplikować?",
      ro: "Nu am un fișier CV. Pot totuși să aplic?",
    },
    a: {
      en: "Yes. Fill your profile in by hand — rank, contacts, sea service, certificates — and the portal builds the CV for you. You can then download it as a PDF in any of four templates and use it outside SeaJobs.pro as well.",
      ru: "Да. Заполните профиль вручную — должность, контакты, морской стаж, сертификаты — и портал соберёт CV за вас. Потом его можно скачать в PDF в одном из четырёх шаблонов и использовать вне SeaJobs.pro.",
      ua: "Так. Заповніть профіль вручну — посада, контакти, морський стаж, сертифікати — і портал складе CV за вас. Потім його можна завантажити у PDF в одному з чотирьох шаблонів і використовувати поза SeaJobs.pro.",
      pl: "Tak. Uzupełnij profil ręcznie — stanowisko, kontakty, staż morski, certyfikaty — a portal zbuduje CV za Ciebie. Potem możesz pobrać je w PDF w jednym z czterech szablonów i używać także poza SeaJobs.pro.",
      ro: "Da. Completează profilul manual — rangul, contactele, stagiul pe mare, certificatele — iar portalul îți construiește CV-ul. Apoi îl poți descărca în PDF într-unul din patru șabloane și îl poți folosi și în afara SeaJobs.pro.",
    },
  },
  {
    q: {
      en: "Do I have to fill everything in again for each vacancy?",
      ru: "Нужно ли заполнять всё заново для каждой вакансии?",
      ua: "Чи потрібно заповнювати все заново для кожної вакансії?",
      pl: "Czy muszę wypełniać wszystko od nowa przy każdej ofercie?",
      ro: "Trebuie să completez totul din nou pentru fiecare post?",
    },
    a: {
      en: "No. The profile is saved once and reused for every application — the next one takes a single click. Just keep it current: update your certificates when they are renewed and your readiness date when your plans change.",
      ru: "Нет. Профиль сохраняется один раз и подставляется в каждый следующий отклик — он занимает один клик. Достаточно поддерживать его в актуальном состоянии: обновлять сертификаты после продления и дату готовности при изменении планов.",
      ua: "Ні. Профіль зберігається один раз і підставляється в кожен наступний відгук — він займає один клік. Достатньо підтримувати його актуальним: оновлювати сертифікати після продовження та дату готовності при зміні планів.",
      pl: "Nie. Profil zapisuje się raz i jest używany przy każdej kolejnej aplikacji — zajmuje ona jedno kliknięcie. Wystarczy utrzymywać go aktualnym: odświeżać certyfikaty po przedłużeniu i datę gotowości, gdy zmienią się plany.",
      ro: "Nu. Profilul se salvează o dată și este refolosit la fiecare aplicare — următoarea îți ia un singur clic. Trebuie doar să îl ții actualizat: reînnoiește certificatele după prelungire și data disponibilității când îți schimbi planurile.",
    },
  },
];
