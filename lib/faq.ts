import type { Lang } from "@/lib/i18n";

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
      en: "Yes. Registration, building a CV, browsing vacancies and applying are completely free for seafarers — no hidden fees at any stage.",
      ru: "Да. Регистрация, создание CV, просмотр вакансий и отклики полностью бесплатны для моряков — никаких скрытых платежей.",
      ua: "Так. Реєстрація, створення CV, перегляд вакансій і відгуки повністю безкоштовні для моряків — жодних прихованих платежів.",
      pl: "Tak. Rejestracja, tworzenie CV, przeglądanie ofert i aplikowanie są całkowicie darmowe dla marynarzy — bez ukrytych opłat.",
      ro: "Da. Înregistrarea, crearea CV-ului, căutarea posturilor și aplicarea sunt complet gratuite pentru marinari — fără taxe ascunse.",
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
      en: "Set up a job alert in your dashboard — you'll get an email when a matching vacancy appears. You can also browse jobs by rank, vessel type or country from the links in the footer.",
      ru: "Настройте оповещение в личном кабинете — при появлении подходящей вакансии придёт письмо. Также можно смотреть вакансии по должности, типу судна или стране — ссылки внизу страницы.",
      ua: "Налаштуйте сповіщення в особистому кабінеті — коли з'явиться підходяща вакансія, прийде лист. Також можна дивитися вакансії за посадою, типом судна чи країною — посилання внизу сторінки.",
      pl: "Ustaw powiadomienie w panelu — gdy pojawi się pasująca oferta, dostaniesz e-mail. Możesz też przeglądać oferty według stanowiska, typu statku lub kraju — linki na dole strony.",
      ro: "Setează o alertă în contul tău — primești un e-mail când apare un post potrivit. Poți răsfoi și posturile după funcție, tipul navei sau țară — linkurile din subsolul paginii.",
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
