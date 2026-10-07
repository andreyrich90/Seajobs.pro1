import type { Lang } from "@/lib/langs";
import { withPrice } from "@/lib/cvWord";

/**
 * /maritime-cv — the page that sells the CV: upload the old one, let the AI
 * fill the profile, check it, download.
 *
 * Not the same job as /cv-builder. That one is the article — why a seafarer's
 * CV is built the way it is — and it is written to rank. This one is written
 * to convert: the upload box is the first thing on it. Two pages answering the
 * same search would split it, so this one carries the buying intent
 * ("скачать анкету моряка", "seafarer CV template Word") and the article
 * links here.
 *
 * Copy lives here rather than in lib/i18n.ts for the reason lib/cvBlast.ts
 * does: a few hundred strings for one route would ride in every reader's
 * dictionary on every page. The page is a Server Component and passes one
 * language down.
 *
 * `{price}` is filled from CV_WORD.usd by `maritimeCvCopy()` — never write the
 * figure into the strings, or the next price change leaves this page behind.
 */

export type MaritimeCvUploadCopy = {
  dropTitle: string;
  dropHint: string;
  dropButton: string;
  tooBig: string;
  badType: string;
  signinTitle: string;
  signinBody: string;
  signinButton: string;
  pendingFile: string;
  reading: string;
  done: string;
  failed: string;
  company: string;
  manual: string;
  privacy: string;
};

export type MaritimeCvCopy = {
  metaTitle: string;
  metaDescription: string;
  keywords: string;

  eyebrow: string;
  h1: string;
  lede: string;
  upload: MaritimeCvUploadCopy;

  stepsTitle: string;
  steps: { title: string; body: string }[];

  fleetsTitle: string;
  fleetsLede: string;
  fleets: { name: string; body: string }[];

  priceTitle: string;
  priceFree: string;
  pricePaid: string;
  priceNote: string;

  faqTitle: string;
  faq: { q: string; a: string }[];

  notTitle: string;
  notBody: string;

  closingTitle: string;
  closingCta: string;
  articleLink: string;
};

const en: MaritimeCvCopy = {
  metaTitle: "Seafarer CV in Word — upload your old CV, AI fills it in | SeaJobs.pro",
  metaDescription:
    "Upload your old CV (PDF or Word) and AI fills in a seafarer's CV for you: rank, documents, certificates, sea service. Check it, then download — PDF free, editable Word {price} once.",
  keywords:
    "seafarer cv template, maritime cv word, seaman cv download, offshore cv, tanker cv, merchant navy cv, cv for crewing agency, editable seafarer cv",

  eyebrow: "Seafarer CV · Word & PDF",
  h1: "Your seafarer CV, filled in from the one you already have",
  lede:
    "Drop your old CV here. AI reads it and puts your rank, documents, certificates and sea service into the format crewing managers read. You check it, fix what needs fixing, and download.",
  upload: {
    dropTitle: "Drop your old CV here",
    dropHint: "PDF or Word (.docx), up to 3 MB",
    dropButton: "Choose a file",
    tooBig: "That file is over 3 MB. Save it as a smaller PDF and try again.",
    badType: "Only PDF or Word (.docx) can be read. An old .doc can be saved as .docx in one step.",
    signinTitle: "One step left",
    signinBody: "Sign in with Google — your CV is saved to your profile, so you can edit it and download it again whenever you need.",
    signinButton: "Sign in and continue",
    pendingFile: "Your file is waiting:",
    reading: "AI is reading your CV… usually 15–30 seconds.",
    done: "Done — opening your CV.",
    failed: "Could not read this file.",
    company: "This page is for seafarers. You are signed in as a company.",
    manual: "No old CV? Fill in the profile by hand",
    privacy: "The file is only read, never published. Passport and visa numbers stay out of your public profile.",
  },

  stepsTitle: "Three steps",
  steps: [
    { title: "Upload the old CV", body: "Any layout, any language. A PDF from the agency, a Word file you made years ago — the AI finds the fields in it." },
    { title: "Check and correct", body: "Everything lands in your profile: rank, passport and seaman's book, certificates with expiry dates, every vessel. Fix a date, add the last contract." },
    { title: "Download", body: "PDF and image are free. The editable Word file is {price}, once — and stays yours: edit the profile and download again as often as you like." },
  ],

  fleetsTitle: "What crewing managers look for, fleet by fleet",
  fleetsLede: "Your CV lists every certificate and vessel you have. Make sure the ones your fleet is hired on are there:",
  fleets: [
    { name: "Merchant fleet", body: "Vessel types and DWT, main engine, sea service by type, STCW basics and the CoC with its expiry." },
    { name: "Offshore", body: "DP certificates and DP hours, BOSIET/HUET, OGUK medical, AHTS/PSV/SOV experience." },
    { name: "Tankers & gas carriers", body: "Oil, chemical or gas tanker endorsements at the top — Advanced Gas for LNG/LPG — and cargo operations experience." },
    { name: "Cruise & passenger", body: "Crowd Management, Passenger Safety, Ro-Pax experience, and the rotation you work." },
    { name: "Tugs & dredging", body: "Harbour or ocean towing, dredger types, short rotations and the region you work in." },
  ],

  priceTitle: "Price",
  priceFree: "PDF and image — free",
  pricePaid: "Editable Word (.docx) — {price} once, yours for good",
  priceNote: "No subscription. Pay once, then edit the profile and download the Word file again any time.",

  faqTitle: "Questions",
  faq: [
    { q: "Do you guarantee a contract?", a: "No. We prepare the document; the decision is the shipowner's and the crewing agency's." },
    { q: "Do I have to pay?", a: "No. Building the CV, PDF and image are free. Only the editable Word file costs {price}, once." },
    { q: "Can I change the CV after I download it?", a: "Yes. Edit your profile and download again — the Word file is unlocked for your account for good." },
    { q: "My CV is a scan. Will it work?", a: "A scan is a picture with no text in it, so it cannot be read. Upload a PDF with text, or fill in the profile by hand — it takes about ten minutes." },
    { q: "Who sees my passport number?", a: "Nobody but you and the crewing agencies you send the CV to. Your public profile shows a short whitelist only." },
  ],

  notTitle: "We never charge for a job",
  notBody:
    "Nothing here is charged for a contract, a berth, a medical, certificates or visas. Registration, searching and applying are free. The only paid thing on this page is a file format. If someone asks you for money for the job itself, it is not us, and it is not legal.",

  closingTitle: "Your next contract starts with the CV",
  closingCta: "Upload my CV",
  articleLink: "How a seafarer's CV is built — and why",
};

const ru: MaritimeCvCopy = {
  metaTitle: "Анкета моряка в Word — загрузите старое резюме, ИИ заполнит сам | SeaJobs.pro",
  metaDescription:
    "Загрузите старое резюме (PDF или Word), и ИИ заполнит анкету моряка: ранг, документы, сертификаты, стаж. Проверьте и скачайте — PDF бесплатно, редактируемый Word за {price} один раз.",
  keywords:
    "анкета моряка, резюме моряка word, скачать анкету моряка, cv моряка шаблон, анкета моряка офшор, резюме для крюинга, анкета моряка танкер, cv seaman",

  eyebrow: "Анкета моряка · Word и PDF",
  h1: "Анкета моряка — из резюме, которое у вас уже есть",
  lede:
    "Перетащите сюда старое резюме. ИИ прочитает его и разложит ранг, документы, сертификаты и стаж в формат, который читают крюинги. Вы проверяете, правите, что нужно, и скачиваете.",
  upload: {
    dropTitle: "Перетащите сюда старое резюме",
    dropHint: "PDF или Word (.docx), до 3 МБ",
    dropButton: "Выбрать файл",
    tooBig: "Файл больше 3 МБ. Сохраните его как PDF поменьше и попробуйте снова.",
    badType: "Читаются только PDF и Word (.docx). Старый .doc можно пересохранить в .docx в один шаг.",
    signinTitle: "Остался один шаг",
    signinBody: "Войдите через Google — анкета сохранится в вашем профиле, её можно будет править и скачивать снова, когда понадобится.",
    signinButton: "Войти и продолжить",
    pendingFile: "Ваш файл ждёт:",
    reading: "ИИ читает ваше резюме… обычно 15–30 секунд.",
    done: "Готово — открываем анкету.",
    failed: "Не удалось прочитать файл.",
    company: "Эта страница для моряков. Вы вошли как компания.",
    manual: "Нет старого резюме? Заполните профиль вручную",
    privacy: "Файл только читается и нигде не публикуется. Номера паспорта и виз не попадают в публичный профиль.",
  },

  stepsTitle: "Три шага",
  steps: [
    { title: "Загрузите старое резюме", body: "Любой вид, любой язык. PDF от крюинга, Word, сделанный годы назад, — ИИ сам найдёт в нём нужные поля." },
    { title: "Проверьте и поправьте", body: "Всё попадает в ваш профиль: ранг, паспорт и мореходная книжка, сертификаты со сроками, каждое судно. Поправьте дату, добавьте последний контракт." },
    { title: "Скачайте", body: "PDF и картинка — бесплатно. Редактируемый Word — {price} один раз, и он остаётся вашим: правьте профиль и скачивайте снова сколько угодно." },
  ],

  fleetsTitle: "Что смотрят крюинги — по флотам",
  fleetsLede: "В анкету попадает каждый ваш сертификат и каждое судно. Проверьте, что там есть то, по чему нанимают на ваш флот:",
  fleets: [
    { name: "Торговый флот", body: "Типы судов и DWT, главный двигатель, стаж по типам, базовые STCW и диплом со сроком действия." },
    { name: "Офшор", body: "DP-сертификаты и часы DP, BOSIET/HUET, медицина OGUK, опыт на AHTS/PSV/SOV." },
    { name: "Танкеры и газовозы", body: "Танкерные и газовые допуски наверху — Advanced Gas для LNG/LPG — и опыт грузовых операций." },
    { name: "Пассажирский флот", body: "Crowd Management, Passenger Safety, опыт на Ro-Pax и ротация, на которой вы работаете." },
    { name: "Буксиры и дноуглубление", body: "Портовая или морская буксировка, типы земснарядов, короткие ротации и регион работы." },
  ],

  priceTitle: "Цена",
  priceFree: "PDF и картинка — бесплатно",
  pricePaid: "Редактируемый Word (.docx) — {price} один раз, навсегда",
  priceNote: "Без подписки. Платите один раз, потом правьте профиль и скачивайте Word снова в любой момент.",

  faqTitle: "Вопросы",
  faq: [
    { q: "Вы гарантируете контракт?", a: "Нет. Мы готовим документ; решение принимают судовладелец и крюинг." },
    { q: "Обязательно платить?", a: "Нет. Собрать анкету, скачать PDF и картинку — бесплатно. Платный только редактируемый Word — {price}, один раз." },
    { q: "Можно поменять анкету после скачивания?", a: "Да. Правьте профиль и скачивайте снова — Word открыт для вашего аккаунта навсегда." },
    { q: "Моё резюме — скан. Получится?", a: "Скан — это картинка без текста, его не прочитать. Загрузите PDF с текстом или заполните профиль вручную — это минут десять." },
    { q: "Кто увидит номер моего паспорта?", a: "Только вы и крюинги, которым вы отправите анкету. В публичном профиле — лишь короткий список полей." },
  ],

  notTitle: "Мы никогда не берём денег за работу",
  notBody:
    "Здесь не берут денег за контракт, место на судне, медкомиссию, сертификаты или визы. Регистрация, поиск и отклики бесплатны. Единственное платное на этой странице — формат файла. Если кто-то просит у вас деньги за саму работу — это не мы, и это незаконно.",

  closingTitle: "Следующий контракт начинается с анкеты",
  closingCta: "Загрузить резюме",
  articleLink: "Как устроена анкета моряка — и почему",
};

const ua: MaritimeCvCopy = {
  metaTitle: "Анкета моряка у Word — завантажте старе резюме, ШІ заповнить сам | SeaJobs.pro",
  metaDescription:
    "Завантажте старе резюме (PDF або Word), і ШІ заповнить анкету моряка: ранг, документи, сертифікати, стаж. Перевірте й завантажте — PDF безкоштовно, редагований Word за {price} один раз.",
  keywords:
    "анкета моряка, резюме моряка word, завантажити анкету моряка, cv моряка шаблон, анкета моряка офшор, резюме для крюїнгу, анкета моряка танкер",

  eyebrow: "Анкета моряка · Word і PDF",
  h1: "Анкета моряка — з резюме, яке у вас уже є",
  lede:
    "Перетягніть сюди старе резюме. ШІ прочитає його й розкладе ранг, документи, сертифікати та стаж у формат, який читають крюїнги. Ви перевіряєте, виправляєте, що треба, і завантажуєте.",
  upload: {
    dropTitle: "Перетягніть сюди старе резюме",
    dropHint: "PDF або Word (.docx), до 3 МБ",
    dropButton: "Обрати файл",
    tooBig: "Файл більший за 3 МБ. Збережіть його як менший PDF і спробуйте знову.",
    badType: "Читаються лише PDF і Word (.docx). Старий .doc можна перезберегти в .docx за один крок.",
    signinTitle: "Залишився один крок",
    signinBody: "Увійдіть через Google — анкета збережеться у вашому профілі, її можна буде редагувати й завантажувати знову, коли знадобиться.",
    signinButton: "Увійти й продовжити",
    pendingFile: "Ваш файл чекає:",
    reading: "ШІ читає ваше резюме… зазвичай 15–30 секунд.",
    done: "Готово — відкриваємо анкету.",
    failed: "Не вдалося прочитати файл.",
    company: "Ця сторінка для моряків. Ви увійшли як компанія.",
    manual: "Немає старого резюме? Заповніть профіль вручну",
    privacy: "Файл лише читається й ніде не публікується. Номери паспорта й віз не потрапляють у публічний профіль.",
  },

  stepsTitle: "Три кроки",
  steps: [
    { title: "Завантажте старе резюме", body: "Будь-який вигляд, будь-яка мова. PDF від крюїнгу, Word, зроблений роки тому, — ШІ сам знайде в ньому потрібні поля." },
    { title: "Перевірте й виправте", body: "Усе потрапляє у ваш профіль: ранг, паспорт і посвідчення моряка, сертифікати зі строками, кожне судно. Виправте дату, додайте останній контракт." },
    { title: "Завантажте", body: "PDF і зображення — безкоштовно. Редагований Word — {price} один раз, і він залишається вашим: редагуйте профіль і завантажуйте знову скільки завгодно." },
  ],

  fleetsTitle: "Що дивляться крюїнги — за флотами",
  fleetsLede: "В анкету потрапляє кожен ваш сертифікат і кожне судно. Перевірте, що там є те, за чим наймають на ваш флот:",
  fleets: [
    { name: "Торговий флот", body: "Типи суден і DWT, головний двигун, стаж за типами, базові STCW і диплом зі строком дії." },
    { name: "Офшор", body: "DP-сертифікати й години DP, BOSIET/HUET, медицина OGUK, досвід на AHTS/PSV/SOV." },
    { name: "Танкери й газовози", body: "Танкерні та газові допуски нагорі — Advanced Gas для LNG/LPG — і досвід вантажних операцій." },
    { name: "Пасажирський флот", body: "Crowd Management, Passenger Safety, досвід на Ro-Pax і ротація, на якій ви працюєте." },
    { name: "Буксири й днопоглиблення", body: "Портове або морське буксирування, типи земснарядів, короткі ротації й регіон роботи." },
  ],

  priceTitle: "Ціна",
  priceFree: "PDF і зображення — безкоштовно",
  pricePaid: "Редагований Word (.docx) — {price} один раз, назавжди",
  priceNote: "Без підписки. Платите один раз, потім редагуйте профіль і завантажуйте Word знову будь-коли.",

  faqTitle: "Питання",
  faq: [
    { q: "Ви гарантуєте контракт?", a: "Ні. Ми готуємо документ; рішення ухвалюють судновласник і крюїнг." },
    { q: "Обов'язково платити?", a: "Ні. Зібрати анкету, завантажити PDF і зображення — безкоштовно. Платний лише редагований Word — {price}, один раз." },
    { q: "Можна змінити анкету після завантаження?", a: "Так. Редагуйте профіль і завантажуйте знову — Word відкритий для вашого акаунта назавжди." },
    { q: "Моє резюме — скан. Вийде?", a: "Скан — це зображення без тексту, його не прочитати. Завантажте PDF із текстом або заповніть профіль вручну — це хвилин десять." },
    { q: "Хто побачить номер мого паспорта?", a: "Лише ви й крюїнги, яким ви надішлете анкету. У публічному профілі — тільки короткий перелік полів." },
  ],

  notTitle: "Ми ніколи не беремо грошей за роботу",
  notBody:
    "Тут не беруть грошей за контракт, місце на судні, медкомісію, сертифікати чи візи. Реєстрація, пошук і відгуки безкоштовні. Єдине платне на цій сторінці — формат файлу. Якщо хтось просить у вас гроші за саму роботу — це не ми, і це незаконно.",

  closingTitle: "Наступний контракт починається з анкети",
  closingCta: "Завантажити резюме",
  articleLink: "Як влаштована анкета моряка — і чому",
};

const pl: MaritimeCvCopy = {
  metaTitle: "CV marynarza w Wordzie — wgraj stare CV, AI wypełni je samo | SeaJobs.pro",
  metaDescription:
    "Wgraj stare CV (PDF lub Word), a AI wypełni CV marynarza: stopień, dokumenty, certyfikaty, staż. Sprawdź i pobierz — PDF za darmo, edytowalny Word za {price} jednorazowo.",
  keywords:
    "cv marynarza, cv marynarza word, wzór cv marynarza, cv offshore, cv tankowiec, cv dla agencji crewingowej, edytowalne cv marynarza",

  eyebrow: "CV marynarza · Word i PDF",
  h1: "CV marynarza — z tego, które już masz",
  lede:
    "Przeciągnij tu swoje stare CV. AI je przeczyta i rozłoży stopień, dokumenty, certyfikaty i staż w formacie, który czytają agencje crewingowe. Ty sprawdzasz, poprawiasz, co trzeba, i pobierasz.",
  upload: {
    dropTitle: "Przeciągnij tu swoje stare CV",
    dropHint: "PDF lub Word (.docx), do 3 MB",
    dropButton: "Wybierz plik",
    tooBig: "Plik ma ponad 3 MB. Zapisz go jako mniejszy PDF i spróbuj ponownie.",
    badType: "Czytamy tylko PDF i Word (.docx). Stary .doc można zapisać jako .docx w jednym kroku.",
    signinTitle: "Został jeden krok",
    signinBody: "Zaloguj się przez Google — CV zapisze się w Twoim profilu, więc możesz je edytować i pobierać ponownie, kiedy chcesz.",
    signinButton: "Zaloguj się i kontynuuj",
    pendingFile: "Twój plik czeka:",
    reading: "AI czyta Twoje CV… zwykle 15–30 sekund.",
    done: "Gotowe — otwieramy Twoje CV.",
    failed: "Nie udało się odczytać pliku.",
    company: "Ta strona jest dla marynarzy. Jesteś zalogowany jako firma.",
    manual: "Nie masz starego CV? Wypełnij profil ręcznie",
    privacy: "Plik jest tylko czytany i nigdzie nie publikowany. Numery paszportu i wiz nie trafiają do publicznego profilu.",
  },

  stepsTitle: "Trzy kroki",
  steps: [
    { title: "Wgraj stare CV", body: "Dowolny układ, dowolny język. PDF od agencji, Word sprzed lat — AI samo znajdzie w nim potrzebne pola." },
    { title: "Sprawdź i popraw", body: "Wszystko trafia do Twojego profilu: stopień, paszport i książeczka żeglarska, certyfikaty z datami ważności, każdy statek. Popraw datę, dodaj ostatni kontrakt." },
    { title: "Pobierz", body: "PDF i obraz — za darmo. Edytowalny Word — {price} jednorazowo, i zostaje Twój: edytuj profil i pobieraj ponownie, ile chcesz." },
  ],

  fleetsTitle: "Na co patrzą agencje — flota po flocie",
  fleetsLede: "W CV trafia każdy Twój certyfikat i każdy statek. Sprawdź, czy jest tam to, po czym zatrudnia się na Twoją flotę:",
  fleets: [
    { name: "Flota handlowa", body: "Typy statków i DWT, silnik główny, staż według typów, podstawowe STCW i dyplom z datą ważności." },
    { name: "Offshore", body: "Certyfikaty DP i godziny DP, BOSIET/HUET, badania OGUK, doświadczenie na AHTS/PSV/SOV." },
    { name: "Tankowce i gazowce", body: "Uprawnienia tankowcowe i gazowe na górze — Advanced Gas dla LNG/LPG — i doświadczenie w operacjach ładunkowych." },
    { name: "Statki pasażerskie", body: "Crowd Management, Passenger Safety, doświadczenie na Ro-Pax i system pracy, w którym pływasz." },
    { name: "Holowniki i pogłębiarki", body: "Holowanie portowe lub oceaniczne, typy pogłębiarek, krótkie rotacje i region pracy." },
  ],

  priceTitle: "Cena",
  priceFree: "PDF i obraz — za darmo",
  pricePaid: "Edytowalny Word (.docx) — {price} raz, na stałe",
  priceNote: "Bez abonamentu. Płacisz raz, potem edytujesz profil i pobierasz Worda ponownie w dowolnej chwili.",

  faqTitle: "Pytania",
  faq: [
    { q: "Gwarantujecie kontrakt?", a: "Nie. Przygotowujemy dokument; decyzję podejmują armator i agencja crewingowa." },
    { q: "Czy muszę płacić?", a: "Nie. Zbudowanie CV, PDF i obraz są za darmo. Płatny jest tylko edytowalny Word — {price}, jednorazowo." },
    { q: "Czy mogę zmienić CV po pobraniu?", a: "Tak. Edytuj profil i pobierz ponownie — Word jest odblokowany dla Twojego konta na stałe." },
    { q: "Moje CV to skan. Zadziała?", a: "Skan to obraz bez tekstu, więc nie da się go odczytać. Wgraj PDF z tekstem albo wypełnij profil ręcznie — to około dziesięciu minut." },
    { q: "Kto zobaczy numer mojego paszportu?", a: "Tylko Ty i agencje, do których wyślesz CV. Publiczny profil pokazuje jedynie krótką listę pól." },
  ],

  notTitle: "Nigdy nie bierzemy pieniędzy za pracę",
  notBody:
    "Nie pobieramy opłat za kontrakt, miejsce na statku, badania, certyfikaty ani wizy. Rejestracja, szukanie i aplikowanie są darmowe. Jedyną płatną rzeczą na tej stronie jest format pliku. Jeśli ktoś żąda od Ciebie pieniędzy za samą pracę — to nie my i jest to nielegalne.",

  closingTitle: "Kolejny kontrakt zaczyna się od CV",
  closingCta: "Wgraj moje CV",
  articleLink: "Jak zbudowane jest CV marynarza — i dlaczego",
};

const ro: MaritimeCvCopy = {
  metaTitle: "CV de marinar în Word — încarcă CV-ul vechi, AI-ul îl completează | SeaJobs.pro",
  metaDescription:
    "Încarcă CV-ul vechi (PDF sau Word) și AI-ul completează CV-ul de marinar: rang, acte, certificate, vechime. Verifică și descarcă — PDF gratuit, Word editabil cu {price} o singură dată.",
  keywords:
    "cv marinar, model cv marinar, cv marinar word, cv offshore, cv tanc petrolier, cv pentru agentie crewing, cv marinar editabil",

  eyebrow: "CV de marinar · Word și PDF",
  h1: "CV-ul tău de marinar — din cel pe care îl ai deja",
  lede:
    "Trage aici CV-ul vechi. AI-ul îl citește și pune rangul, actele, certificatele și vechimea în formatul pe care îl citesc agențiile de crewing. Tu verifici, corectezi ce trebuie și descarci.",
  upload: {
    dropTitle: "Trage aici CV-ul vechi",
    dropHint: "PDF sau Word (.docx), până la 3 MB",
    dropButton: "Alege un fișier",
    tooBig: "Fișierul depășește 3 MB. Salvează-l ca PDF mai mic și încearcă din nou.",
    badType: "Se citesc doar PDF și Word (.docx). Un .doc vechi se poate salva ca .docx dintr-un pas.",
    signinTitle: "A mai rămas un pas",
    signinBody: "Intră cu Google — CV-ul se salvează în profilul tău, ca să-l poți edita și descărca din nou oricând.",
    signinButton: "Intră și continuă",
    pendingFile: "Fișierul tău așteaptă:",
    reading: "AI-ul îți citește CV-ul… de obicei 15–30 de secunde.",
    done: "Gata — deschidem CV-ul.",
    failed: "Fișierul nu a putut fi citit.",
    company: "Pagina e pentru marinari. Ești conectat ca firmă.",
    manual: "Nu ai un CV vechi? Completează profilul manual",
    privacy: "Fișierul este doar citit, nu se publică nicăieri. Numerele de pașaport și vize nu apar în profilul public.",
  },

  stepsTitle: "Trei pași",
  steps: [
    { title: "Încarcă CV-ul vechi", body: "Orice aspect, orice limbă. Un PDF de la agenție, un Word de acum câțiva ani — AI-ul găsește singur câmpurile." },
    { title: "Verifică și corectează", body: "Totul ajunge în profilul tău: rang, pașaport și carnet de marinar, certificate cu termene, fiecare navă. Corectează o dată, adaugă ultimul contract." },
    { title: "Descarcă", body: "PDF-ul și imaginea sunt gratuite. Word-ul editabil costă {price}, o singură dată, și rămâne al tău: editezi profilul și descarci din nou de câte ori vrei." },
  ],

  fleetsTitle: "Ce caută agențiile, flotă cu flotă",
  fleetsLede: "În CV intră fiecare certificat și fiecare navă pe care le ai. Verifică să fie acolo cele după care se angajează pe flota ta:",
  fleets: [
    { name: "Flota comercială", body: "Tipuri de nave și DWT, motor principal, vechime pe tipuri, STCW de bază și brevetul cu termenul lui." },
    { name: "Offshore", body: "Certificate DP și ore DP, BOSIET/HUET, medical OGUK, experiență pe AHTS/PSV/SOV." },
    { name: "Petroliere și gaziere", body: "Atestatele de tanc petrolier, chimic sau gaz în față — Advanced Gas pentru LNG/LPG — și experiență în operațiuni de marfă." },
    { name: "Nave de pasageri", body: "Crowd Management, Passenger Safety, experiență pe Ro-Pax și rotația pe care lucrezi." },
    { name: "Remorchere și drage", body: "Remorcaj portuar sau oceanic, tipuri de drage, rotații scurte și zona de lucru." },
  ],

  priceTitle: "Preț",
  priceFree: "PDF și imagine — gratuit",
  pricePaid: "Word editabil (.docx) — {price} o dată, definitiv",
  priceNote: "Fără abonament. Plătești o dată, apoi editezi profilul și descarci Word-ul din nou oricând.",

  faqTitle: "Întrebări",
  faq: [
    { q: "Garantați un contract?", a: "Nu. Pregătim documentul; decizia aparține armatorului și agenției de crewing." },
    { q: "Trebuie să plătesc?", a: "Nu. Construirea CV-ului, PDF-ul și imaginea sunt gratuite. Doar Word-ul editabil costă {price}, o singură dată." },
    { q: "Pot schimba CV-ul după descărcare?", a: "Da. Editezi profilul și descarci din nou — Word-ul e deblocat pentru contul tău definitiv." },
    { q: "CV-ul meu e scanat. Merge?", a: "O scanare e o imagine fără text, deci nu poate fi citită. Încarcă un PDF cu text sau completează profilul manual — durează cam zece minute." },
    { q: "Cine îmi vede numărul de pașaport?", a: "Doar tu și agențiile cărora le trimiți CV-ul. Profilul public arată doar o listă scurtă de câmpuri." },
  ],

  notTitle: "Nu cerem niciodată bani pentru un loc de muncă",
  notBody:
    "Nu cerem bani pentru un contract, un post pe navă, medical, certificate sau vize. Înregistrarea, căutarea și aplicarea sunt gratuite. Singurul lucru plătit pe această pagină este un format de fișier. Dacă cineva îți cere bani pentru munca în sine — nu suntem noi și nu este legal.",

  closingTitle: "Următorul contract începe cu CV-ul",
  closingCta: "Încarcă CV-ul meu",
  articleLink: "Cum e construit CV-ul de marinar — și de ce",
};

const MARITIME_CV_COPY: Record<Lang, MaritimeCvCopy> = { en, ru, ua, pl, ro };


/** The copy for one language, with the real price filled in. */
export function maritimeCvCopy(lang: Lang): MaritimeCvCopy {
  return withPrice(MARITIME_CV_COPY[lang] ?? MARITIME_CV_COPY.en, lang);
}
