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
      en: "No. Registration, your profile, the CV builder and every application are free for seafarers, and always will be. If anyone asks you for money for a job, a medical, a contract or a visa — that is a scam, and you can report the vacancy to us.",
      ru: "Нет. Регистрация, профиль, конструктор CV и любые отклики бесплатны для моряков и останутся такими. Если кто-то просит деньги за работу, медкомиссию, контракт или визу — это мошенничество, сообщите нам о такой вакансии.",
      ua: "Ні. Реєстрація, профіль, конструктор CV та будь-які відгуки безкоштовні для моряків і залишаться такими. Якщо хтось просить гроші за роботу, медкомісію, контракт чи візу — це шахрайство, повідомте нам про таку вакансію.",
      pl: "Nie. Rejestracja, profil, kreator CV i wszystkie aplikacje są dla marynarzy bezpłatne i takie pozostaną. Jeśli ktoś żąda pieniędzy za pracę, badania, kontrakt lub wizę — to oszustwo, zgłoś nam taką ofertę.",
      ro: "Nu. Înregistrarea, profilul, generatorul de CV și toate aplicările sunt gratuite pentru marinari și vor rămâne așa. Dacă cineva îți cere bani pentru un post, vizita medicală, contract sau viză — este o înșelătorie, anunță-ne despre acel anunț.",
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
      en: "Your full CV — contacts, documents and visas, certificates, sea service and your cover letter — is formatted and sent to the crewing agency. If the company has an account on SeaJobs.pro it also lands in their dashboard; if the vacancy came with a crewing e-mail, it goes straight to that address. Either way the application appears in your own list, where you follow its status.",
      ru: "Ваше полное CV — контакты, документы и визы, сертификаты, морской стаж и сопроводительное письмо — оформляется и отправляется в крюинговое агентство. Если у компании есть аккаунт на SeaJobs.pro, отклик попадает в её кабинет; если у вакансии указан крюинговый email — уходит прямо на этот адрес. В любом случае отклик появляется в вашем списке, где видно его статус.",
      ua: "Ваше повне CV — контакти, документи та візи, сертифікати, морський стаж і супровідний лист — оформлюється й надсилається до крюїнгового агентства. Якщо в компанії є акаунт на SeaJobs.pro, відгук потрапляє в її кабінет; якщо у вакансії вказано крюїнговий email — іде прямо на цю адресу. У будь-якому разі відгук з'являється у вашому списку, де видно його статус.",
      pl: "Twoje pełne CV — kontakty, dokumenty i wizy, certyfikaty, staż morski i list motywacyjny — zostaje sformatowane i wysłane do agencji crewingowej. Jeśli firma ma konto na SeaJobs.pro, aplikacja trafia do jej panelu; jeśli przy ofercie podano e-mail crewingu — idzie prosto na ten adres. Tak czy inaczej aplikacja pojawia się na Twojej liście, gdzie widzisz jej status.",
      ro: "CV-ul tău complet — contacte, documente și vize, certificate, stagiu pe mare și scrisoarea de intenție — este formatat și trimis agenției de crewing. Dacă firma are cont pe SeaJobs.pro, aplicarea ajunge și în panoul ei; dacă anunțul are un e-mail de crewing, ajunge direct la acea adresă. Oricum, aplicarea apare în lista ta, unde îi urmărești statusul.",
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
