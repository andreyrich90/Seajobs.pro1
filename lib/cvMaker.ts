import type { Lang } from "@/lib/langs";

/**
 * The public page about making a seafarer's CV on the site — the free builder
 * and the paid Word export.
 *
 * Copy lives here rather than in `lib/i18n.ts` for the reason `lib/cvBlast.ts`
 * does: a few hundred strings for one route would otherwise ride along in every
 * reader's dictionary on every page. `page.tsx` is a Server Component, picks
 * one language and hands it down, so one language reaches the browser.
 *
 * This is also the page search engines are meant to find, which is why the
 * sections are written as prose rather than as feature bullets: "скачать
 * анкету моряка в Word" is a thing people type, and a page that answers it in
 * sentences outranks one that lists it.
 */

export type CvMakerCopy = {
  metaTitle: string;
  metaDescription: string;
  keywords: string;

  h1: string;
  lede: string;
  ctaPrimary: string;
  ctaSecondary: string;

  stepsTitle: string;
  steps: { title: string; body: string }[];

  /** The long-form part: each one reads as a short article. */
  sections: { title: string; body: string[] }[];

  insideTitle: string;
  insideLede: string;
  inside: { title: string; body: string }[];

  priceTitle: string;
  priceBody: string;
  priceFree: string;
  pricePaid: string;
  priceNote: string;

  faqTitle: string;
  faq: { q: string; a: string }[];

  notTitle: string;
  notBody: string;

  closingTitle: string;
  closingBody: string;
};

const en: CvMakerCopy = {
  metaTitle: "Seafarer CV builder — make and download your CV in PDF or Word | SeaJobs.pro",
  metaDescription:
    "Build a maritime CV from your SeaJobs.pro profile: ranks, certificates, documents and sea service in place. Download it free as PDF, or as an editable Word file for $6.49.",
  keywords:
    "seafarer cv, maritime cv template, seaman cv, cv for crewing agency, download cv in word, editable seafarer cv, marine cv maker, sea service record, stcw certificates cv",

  h1: "Your seafarer CV, built from your profile",
  lede:
    "Fill in your profile once and the CV writes itself — rank, certificates, documents and every voyage, in the order a crewing manager reads them. Download it free as a PDF, or as a Word file you can edit before you send it.",
  ctaPrimary: "Make my CV",
  ctaSecondary: "See the vacancies",

  stepsTitle: "Three steps, about ten minutes",
  steps: [
    {
      title: "Fill in the profile — or upload the CV you already have",
      body:
        "If you already have a CV in PDF or Word, upload it and the fields fill themselves: name, rank, certificates, vessels, dates. You check what was read and correct what was missed, which takes minutes rather than an evening of retyping.",
    },
    {
      title: "Choose how it looks",
      body:
        "Four layouts, from a plain classic sheet to a modern card. The content is the same in all of them; what changes is what a crewing manager's eye lands on first.",
    },
    {
      title: "Download and send",
      body:
        "PDF and image are free, with no limit on how many times you download them. Word costs once and stays yours — rebuild the file every time your profile changes.",
    },
  ],

  sections: [
    {
      title: "Why a seafarer's CV is not an ordinary CV",
      body: [
        "A shore CV is about what you can do. A seafarer's CV is about what is documented: rank held, the vessels behind it, tonnage and engine power, which certificates are valid and until when, which visas are in the passport. A crewing manager reads it to answer one question — can this person join this ship on this date, legally and without a surprise.",
        "That is why the order matters as much as the content. Contacts and readiness date at the top, because that is what decides whether to read on. Documents and their expiry dates next, because an expired medical ends the conversation. Then certificates, then the sea service with dates, vessel types and DWT, so the experience can be weighed rather than taken on trust.",
        "The builder lays it out that way by default. You are not deciding what a crewing department wants to see — it is already in the order they look for it.",
      ],
    },
    {
      title: "Auto-fill: upload the CV you already have",
      body: [
        "Most seafarers already have a CV somewhere — a Word file from four years ago, a PDF a previous agency made. Retyping it into a form is the reason profiles stay half-finished, so the site reads it for you instead.",
        "Upload a PDF or a .docx and the fields come back filled: personal details, rank, the certificates it could find with their issuing authority and expiry, and the voyages with vessel, type, company and dates. A long CV with twenty contracts is handled by summarising the oldest ones rather than dropping them.",
        "Nothing is saved until you have looked at it. What was read wrong you correct, what was missed you add, and from then on the profile — not a file on a laptop — is the thing you keep up to date.",
      ],
    },
    {
      title: "PDF, image, and the Word file",
      body: [
        "PDF is what you attach to an application: it looks the same everywhere and cannot be altered on the way. The image version exists for Telegram and WhatsApp, where a picture is read and an attachment is not. Both are free, always.",
        "Word is the one that costs, because it is the one you can change. Crewing departments ask for it by name — some paste your details into their own form, some want the objective rewritten for a specific vessel. From a PDF you cannot do either; you would be retyping your own CV.",
        "One payment of $6.49 opens the Word export for your account for good. Add a certificate next month, change your readiness date, and rebuild the file as many times as you like — there is nothing to buy twice.",
      ],
    },
    {
      title: "Keeping it current is the part that pays",
      body: [
        "A CV goes stale faster than seafarers expect. A medical expires, a certificate is renewed, a contract ends and the last voyage is missing. An agency that opens a CV with an expired document does not write back to ask — it moves to the next one.",
        "Because the document is built from the profile, updating one field updates every version of the CV at once. The same profile is what fills applications on the site and what goes to the crewing agency when you apply, so there is one thing to keep right rather than four files in four places.",
      ],
    },
  ],

  insideTitle: "What the CV contains",
  insideLede: "Every block is filled from your profile. Anything you leave empty simply does not appear — there are no blank lines in the finished document.",
  inside: [
    { title: "Contacts and readiness", body: "Name, rank, phone, e-mail, nationality, and the date you can join. An empty readiness date reads as “immediate”, not as unknown." },
    { title: "Identity documents and visas", body: "Passport, seaman's book, medical, diploma or CoC — each with its expiry — plus Schengen and US visas when you hold them." },
    { title: "Competency and STCW certificates", body: "Up to twenty certificates with the issuing authority and expiry date, newest first." },
    { title: "Sea service", body: "Up to ten voyages: vessel name and type, DWT, rank held, company and period. This is the block a crewing manager reads most closely." },
  ],

  priceTitle: "What it costs",
  priceBody: "Making the CV, every template, and as many downloads as you like are free. One format is paid.",
  priceFree: "PDF and image — free, unlimited",
  pricePaid: "Word (.docx), editable — $6.49 once, yours for good",
  priceNote:
    "Payment goes through Buy Me a Coffee. The download opens by itself as soon as the payment arrives — nobody has to confirm anything by hand.",

  faqTitle: "Questions seafarers ask",
  faq: [
    {
      q: "Do I have to pay to get a CV?",
      a: "No. Making the CV and downloading it as a PDF or an image is free and always will be. Only the editable Word file is paid.",
    },
    {
      q: "Can I edit the Word file afterwards?",
      a: "That is the whole point of it. It opens in Word, Google Docs, LibreOffice or Pages, and every line can be changed — add a certificate, rewrite the objective for one agency, remove a voyage.",
    },
    {
      q: "I paid — how long until I can download it?",
      a: "Seconds. The page you bought from unlocks on its own and starts the download. If something goes wrong, write to us and we open it by hand.",
    },
    {
      q: "Is one payment enough, or do I pay per file?",
      a: "One payment, for good. Rebuild the document whenever your profile changes; there is nothing to buy again.",
    },
    {
      q: "Can I upload my old CV instead of typing it in?",
      a: "Yes — a PDF or a .docx. The fields come back filled and you correct what was read wrong before anything is saved.",
    },
    {
      q: "Is my passport number safe here?",
      a: "Your profile is not your public page. The public profile shows only a thin set of fields; passport, visas and date of birth appear in the CV and nowhere else, and the CV only leaves the site when you send it or share a link that you can revoke.",
    },
  ],

  notTitle: "What we never charge for",
  notBody:
    "Nothing is charged for a contract, a berth, a medical, certificates or visas. Registering, searching vacancies, applying, and making and downloading your CV as a PDF are free. The only paid thing on this page is one file format. If anyone asks you to pay for a job itself, that is not us and it is not legal.",

  closingTitle: "Start with the profile",
  closingBody:
    "Ten minutes now, and the CV is ready every time a vacancy is worth answering — which is usually the day it is posted, not the week after.",
};

const ru: CvMakerCopy = {
  metaTitle: "Анкета моряка — составить и скачать CV в PDF или Word | SeaJobs.pro",
  metaDescription:
    "Соберите морское CV из профиля на SeaJobs.pro: ранг, сертификаты, документы и стаж уже на местах. Скачивайте бесплатно в PDF или в редактируемом Word за $6.49.",
  keywords:
    "анкета моряка, резюме моряка, cv моряка, скачать анкету моряка, анкета моряка word, резюме моряка образец, cv для крюинга, морской стаж в резюме, анкета в word редактируемая",

  h1: "Анкета моряка, собранная из вашего профиля",
  lede:
    "Заполните профиль один раз — и CV соберётся само: ранг, сертификаты, документы и все рейсы в том порядке, в каком их читает крюинговый менеджер. Скачивайте бесплатно в PDF или в Word, который можно править перед отправкой.",
  ctaPrimary: "Собрать анкету",
  ctaSecondary: "Смотреть вакансии",

  stepsTitle: "Три шага, около десяти минут",
  steps: [
    {
      title: "Заполните профиль — или загрузите готовое CV",
      body:
        "Если анкета уже есть в PDF или Word, загрузите её, и поля заполнятся сами: имя, ранг, сертификаты, суда, даты. Вы проверяете распознанное и правите пропущенное — это минуты, а не вечер перепечатывания.",
    },
    {
      title: "Выберите вид",
      body:
        "Четыре макета — от строгого классического листа до современной карточки. Содержание во всех одно, меняется лишь то, за что первым цепляется взгляд крюингового менеджера.",
    },
    {
      title: "Скачайте и отправьте",
      body:
        "PDF и картинка бесплатны, скачивать можно сколько угодно раз. Word оплачивается один раз и остаётся вашим — пересобирайте файл каждый раз, когда меняется профиль.",
    },
  ],

  sections: [
    {
      title: "Почему анкета моряка — не обычное резюме",
      body: [
        "Береговое резюме — про то, что вы умеете. Анкета моряка — про то, что подтверждено документами: какой ранг отработан, на каких судах, какой дедвейт и мощность, какие сертификаты действуют и до какого числа, какие визы в паспорте. Крюинговый менеджер читает её, чтобы ответить на один вопрос: может ли этот человек выйти на это судно в эту дату — законно и без сюрпризов.",
        "Поэтому порядок важен не меньше содержания. Контакты и дата готовности сверху, потому что по ним решают, читать ли дальше. Следом документы со сроками: просроченная медкомиссия заканчивает разговор. Потом сертификаты, потом стаж с датами, типами судов и дедвейтом, чтобы опыт можно было взвесить, а не принимать на веру.",
        "Конструктор раскладывает всё именно так. Вам не нужно угадывать, что хочет увидеть крюинг, — это уже выстроено в том порядке, в каком там смотрят.",
      ],
    },
    {
      title: "Автозаполнение: загрузите своё старое CV",
      body: [
        "У большинства моряков анкета уже где-то есть — файл Word четырёхлетней давности, PDF, сделанный прошлым агентством. Перепечатывать его в форму никто не хочет, и именно поэтому профили остаются недозаполненными. Сайт читает файл за вас.",
        "Загружаете PDF или .docx — и поля возвращаются заполненными: личные данные, ранг, найденные сертификаты с органом выдачи и сроком, рейсы с судном, типом, компанией и датами. Длинное CV с двумя десятками контрактов обрабатывается так, что самые старые записи сворачиваются в подсчитанный стаж, а не выбрасываются.",
        "Ничего не сохраняется, пока вы не посмотрите. Что распознано неверно — поправите, что пропущено — добавите, и дальше в актуальном состоянии держится профиль, а не файл на ноутбуке.",
      ],
    },
    {
      title: "PDF, картинка и файл Word",
      body: [
        "PDF — то, что прикладывают к отклику: он выглядит одинаково везде и не меняется по дороге. Картинка нужна для Telegram и WhatsApp, где изображение смотрят, а вложение — нет. И то и другое бесплатно, всегда.",
        "Платный — Word, потому что именно его можно менять. Крюинги просят его прямо: кто-то переносит ваши данные в свою форму, кто-то хочет переписанный objective под конкретное судно. Из PDF ни того, ни другого не сделать — придётся перепечатывать собственную анкету.",
        "Одна оплата $6.49 открывает выгрузку в Word для вашего аккаунта навсегда. Добавили сертификат через месяц, поменяли дату готовности — пересобирайте файл сколько нужно, второй раз платить не за что.",
      ],
    },
    {
      title: "Самое ценное — держать анкету свежей",
      body: [
        "Анкета устаревает быстрее, чем кажется. Истекла медкомиссия, продлён сертификат, закончился контракт — и последнего рейса в CV нет. Агентство, открывшее анкету с просроченным документом, не станет писать и уточнять: оно перейдёт к следующей.",
        "Поскольку документ собирается из профиля, правка одного поля обновляет сразу все версии CV. Тот же профиль заполняет отклики на сайте и уходит в крюинговое агентство, когда вы откликаетесь, — следить нужно за одним местом, а не за четырьмя файлами в четырёх папках.",
      ],
    },
  ],

  insideTitle: "Что внутри анкеты",
  insideLede: "Каждый блок заполняется из профиля. Что оставили пустым — просто не появится: пустых строк в готовом документе нет.",
  inside: [
    { title: "Контакты и готовность", body: "Имя, ранг, телефон, почта, гражданство и дата, с которой готовы выйти. Пустая дата читается как «готов сейчас», а не как «неизвестно»." },
    { title: "Документы и визы", body: "Паспорт, мореходная книжка, медкомиссия, диплом — каждый со сроком действия, — плюс шенген и виза США, если они есть." },
    { title: "Сертификаты и STCW", body: "До двадцати сертификатов с органом выдачи и сроком, свежие сверху." },
    { title: "Морской стаж", body: "До десяти рейсов: судно и тип, дедвейт, отработанный ранг, компания и период. Этот блок крюинговый менеджер читает внимательнее всего." },
  ],

  priceTitle: "Сколько это стоит",
  priceBody: "Сборка анкеты, все шаблоны и любое число скачиваний — бесплатно. Платный один формат.",
  priceFree: "PDF и картинка — бесплатно, без ограничений",
  pricePaid: "Word (.docx), редактируемый — $6.49 один раз, навсегда",
  priceNote:
    "Оплата через Buy Me a Coffee. Скачивание открывается само, как только платёж дошёл, — подтверждать вручную ничего не нужно.",

  faqTitle: "Что спрашивают моряки",
  faq: [
    {
      q: "За анкету обязательно платить?",
      a: "Нет. Собрать анкету и скачать её в PDF или картинкой — бесплатно и останется бесплатным. Платный только редактируемый файл Word.",
    },
    {
      q: "Word потом правится?",
      a: "В этом и смысл. Он открывается в Word, Google Docs, LibreOffice или Pages, и менять можно каждую строку: дописать сертификат, переписать objective под агентство, убрать рейс.",
    },
    {
      q: "Оплатил — через сколько смогу скачать?",
      a: "Через секунды. Страница, с которой вы покупали, разблокируется сама и начнёт скачивание. Если что-то пойдёт не так — напишите нам, откроем вручную.",
    },
    {
      q: "Оплата одна или за каждый файл?",
      a: "Одна, навсегда. Пересобирайте документ при каждом изменении профиля — доплачивать не за что.",
    },
    {
      q: "Можно загрузить старое CV вместо ручного ввода?",
      a: "Да, PDF или .docx. Поля вернутся заполненными, и вы поправите неверно распознанное до того, как что-то сохранится.",
    },
    {
      q: "Номер паспорта тут в безопасности?",
      a: "Профиль и публичная страница — разные вещи. Публично видна лишь узкая часть полей; паспорт, визы и дата рождения попадают только в саму анкету, и она уходит с сайта только тогда, когда вы отправляете её сами или даёте ссылку, которую можно отозвать.",
    },
  ],

  notTitle: "За что мы никогда не берём денег",
  notBody:
    "Мы не берём денег за контракт, за место на судне, за медкомиссию, сертификаты или визы. Регистрация, поиск вакансий, отклики, сборка анкеты и скачивание её в PDF — бесплатны. Платное на этой странице одно: один формат файла. Если кто-то просит деньги за саму работу — это не мы, и это незаконно.",

  closingTitle: "Начните с профиля",
  closingBody:
    "Десять минут сейчас — и анкета готова в тот момент, когда появилась стоящая вакансия. А это обычно день публикации, а не неделя спустя.",
};

const ua: CvMakerCopy = {
  metaTitle: "Анкета моряка — скласти та завантажити CV у PDF чи Word | SeaJobs.pro",
  metaDescription:
    "Зберіть морське CV з профілю на SeaJobs.pro: ранг, сертифікати, документи та стаж уже на місцях. Завантажуйте безкоштовно у PDF або в редагованому Word за $6.49.",
  keywords:
    "анкета моряка, резюме моряка, cv моряка, завантажити анкету моряка, анкета моряка word, резюме моряка зразок, cv для крюїнгу, морський стаж у резюме",

  h1: "Анкета моряка, зібрана з вашого профілю",
  lede:
    "Заповніть профіль один раз — і CV збереться само: ранг, сертифікати, документи та всі рейси в тому порядку, в якому їх читає крюїнговий менеджер. Завантажуйте безкоштовно у PDF або у Word, який можна правити перед відправкою.",
  ctaPrimary: "Зібрати анкету",
  ctaSecondary: "Дивитись вакансії",

  stepsTitle: "Три кроки, близько десяти хвилин",
  steps: [
    {
      title: "Заповніть профіль — або завантажте готове CV",
      body:
        "Якщо анкета вже є у PDF чи Word, завантажте її, і поля заповняться самі: ім'я, ранг, сертифікати, судна, дати. Ви перевіряєте розпізнане й виправляєте пропущене — це хвилини, а не вечір передруку.",
    },
    {
      title: "Оберіть вигляд",
      body:
        "Чотири макети — від суворого класичного аркуша до сучасної картки. Зміст у всіх однаковий, змінюється лише те, за що першим чіпляється око крюїнгового менеджера.",
    },
    {
      title: "Завантажте й надішліть",
      body:
        "PDF і зображення безкоштовні, завантажувати можна скільки завгодно разів. Word оплачується один раз і лишається вашим — перезбирайте файл щоразу, коли змінюється профіль.",
    },
  ],

  sections: [
    {
      title: "Чому анкета моряка — не звичайне резюме",
      body: [
        "Берегове резюме — про те, що ви вмієте. Анкета моряка — про те, що підтверджено документами: який ранг відпрацьовано, на яких суднах, який дедвейт і потужність, які сертифікати діють і до якого числа, які візи в паспорті. Крюїнговий менеджер читає її, щоб відповісти на одне питання: чи може ця людина вийти на це судно в цю дату — законно й без несподіванок.",
        "Тому порядок важить не менше за зміст. Контакти й дата готовності зверху, бо саме за ними вирішують, чи читати далі. Далі документи зі строками: прострочена медкомісія закінчує розмову. Потім сертифікати, потім стаж із датами, типами суден і дедвейтом, щоб досвід можна було зважити, а не брати на віру.",
        "Конструктор розкладає все саме так. Вам не треба вгадувати, що хоче побачити крюїнг, — це вже вибудувано в тому порядку, в якому там дивляться.",
      ],
    },
    {
      title: "Автозаповнення: завантажте своє старе CV",
      body: [
        "У більшості моряків анкета вже десь є — файл Word чотирирічної давнини, PDF від попереднього агентства. Передруковувати його у форму ніхто не хоче, і саме тому профілі лишаються незаповненими. Сайт читає файл замість вас.",
        "Завантажуєте PDF або .docx — і поля повертаються заповненими: особисті дані, ранг, знайдені сертифікати з органом видачі та строком, рейси із судном, типом, компанією й датами. Довге CV з двома десятками контрактів обробляється так, що найстаріші записи згортаються в порахований стаж, а не викидаються.",
        "Нічого не зберігається, доки ви не подивитесь. Що розпізнано хибно — виправите, що пропущено — додасте, і далі в актуальному стані тримається профіль, а не файл на ноутбуці.",
      ],
    },
    {
      title: "PDF, зображення та файл Word",
      body: [
        "PDF — те, що додають до відгуку: він виглядає однаково всюди й не змінюється дорогою. Зображення потрібне для Telegram і WhatsApp, де картинку дивляться, а вкладення — ні. І те й інше безкоштовно, завжди.",
        "Платний — Word, бо саме його можна змінювати. Крюїнги просять його прямо: хтось переносить ваші дані у власну форму, хтось хоче переписаний objective під конкретне судно. З PDF ні того, ні іншого не зробити — доведеться передруковувати власну анкету.",
        "Одна оплата $6.49 відкриває вивантаження у Word для вашого акаунта назавжди. Додали сертифікат за місяць, змінили дату готовності — перезбирайте файл скільки треба, вдруге платити нема за що.",
      ],
    },
    {
      title: "Найцінніше — тримати анкету свіжою",
      body: [
        "Анкета старіє швидше, ніж здається. Збігла медкомісія, продовжено сертифікат, закінчився контракт — і останнього рейсу в CV немає. Агентство, що відкрило анкету з простроченим документом, не писатиме уточнювати: воно перейде до наступної.",
        "Оскільки документ збирається з профілю, правка одного поля оновлює одразу всі версії CV. Той самий профіль заповнює відгуки на сайті й іде до крюїнгового агентства, коли ви відгукуєтесь, — стежити треба за одним місцем, а не за чотирма файлами в чотирьох теках.",
      ],
    },
  ],

  insideTitle: "Що всередині анкети",
  insideLede: "Кожен блок заповнюється з профілю. Що лишили порожнім — просто не з'явиться: порожніх рядків у готовому документі немає.",
  inside: [
    { title: "Контакти й готовність", body: "Ім'я, ранг, телефон, пошта, громадянство та дата, з якої готові вийти. Порожня дата читається як «готовий зараз», а не як «невідомо»." },
    { title: "Документи та візи", body: "Паспорт, морехідна книжка, медкомісія, диплом — кожен зі строком дії, — плюс шенген і віза США, якщо вони є." },
    { title: "Сертифікати та STCW", body: "До двадцяти сертифікатів з органом видачі та строком, свіжі зверху." },
    { title: "Морський стаж", body: "До десяти рейсів: судно й тип, дедвейт, відпрацьований ранг, компанія та період. Цей блок крюїнговий менеджер читає найуважніше." },
  ],

  priceTitle: "Скільки це коштує",
  priceBody: "Збірка анкети, всі шаблони та будь-яка кількість завантажень — безкоштовно. Платний один формат.",
  priceFree: "PDF і зображення — безкоштовно, без обмежень",
  pricePaid: "Word (.docx), редагований — $6.49 один раз, назавжди",
  priceNote:
    "Оплата через Buy Me a Coffee. Завантаження відкривається само, щойно платіж надійшов, — підтверджувати вручну нічого не треба.",

  faqTitle: "Що питають моряки",
  faq: [
    { q: "За анкету обов'язково платити?", a: "Ні. Зібрати анкету й завантажити її у PDF або зображенням — безкоштовно й лишиться безкоштовним. Платний лише редагований файл Word." },
    { q: "Word потім правиться?", a: "У цьому й сенс. Він відкривається у Word, Google Docs, LibreOffice чи Pages, і змінювати можна кожен рядок: дописати сертифікат, переписати objective під агентство, прибрати рейс." },
    { q: "Оплатив — за скільки зможу завантажити?", a: "За секунди. Сторінка, з якої ви купували, розблокується сама й почне завантаження. Якщо щось піде не так — напишіть нам, відкриємо вручну." },
    { q: "Оплата одна чи за кожен файл?", a: "Одна, назавжди. Перезбирайте документ при кожній зміні профілю — доплачувати нема за що." },
    { q: "Можна завантажити старе CV замість ручного введення?", a: "Так, PDF або .docx. Поля повернуться заповненими, і ви виправите хибно розпізнане до того, як щось збережеться." },
    { q: "Номер паспорта тут у безпеці?", a: "Профіль і публічна сторінка — різні речі. Публічно видно лише вузьку частину полів; паспорт, візи та дата народження потрапляють тільки в саму анкету, і вона йде з сайту лише тоді, коли ви надсилаєте її самі або даєте посилання, яке можна відкликати." },
  ],

  notTitle: "За що ми ніколи не беремо грошей",
  notBody:
    "Ми не беремо грошей за контракт, за місце на судні, за медкомісію, сертифікати чи візи. Реєстрація, пошук вакансій, відгуки, збірка анкети та завантаження її у PDF — безкоштовні. Платне на цій сторінці одне: один формат файлу. Якщо хтось просить гроші за саму роботу — це не ми, і це незаконно.",

  closingTitle: "Почніть із профілю",
  closingBody:
    "Десять хвилин зараз — і анкета готова тоді, коли з'явилась варта уваги вакансія. А це зазвичай день публікації, а не тиждень по тому.",
};

const pl: CvMakerCopy = {
  metaTitle: "CV marynarza — stwórz i pobierz w PDF lub Wordzie | SeaJobs.pro",
  metaDescription:
    "Zbuduj morskie CV z profilu na SeaJobs.pro: stopień, certyfikaty, dokumenty i staż już na miejscu. Pobierz za darmo w PDF albo w edytowalnym Wordzie za 6,49 $.",
  keywords:
    "cv marynarza, cv morskie, cv dla crewingu, pobierz cv marynarza, cv marynarza word, wzór cv marynarza, staż morski w cv, certyfikaty stcw cv",

  h1: "CV marynarza zbudowane z Twojego profilu",
  lede:
    "Wypełnij profil raz, a CV napisze się samo — stopień, certyfikaty, dokumenty i każdy rejs w kolejności, w jakiej czyta je manager crewingu. Pobierz za darmo w PDF albo w Wordzie, który poprawisz przed wysłaniem.",
  ctaPrimary: "Zrób moje CV",
  ctaSecondary: "Zobacz oferty",

  stepsTitle: "Trzy kroki, około dziesięciu minut",
  steps: [
    { title: "Wypełnij profil — albo wgraj CV, które masz", body: "Jeśli masz już CV w PDF lub Wordzie, wgraj je, a pola wypełnią się same: imię, stopień, certyfikaty, statki, daty. Sprawdzasz odczytane i poprawiasz pominięte — to minuty, nie wieczór przepisywania." },
    { title: "Wybierz wygląd", body: "Cztery układy, od klasycznej kartki po nowoczesną kartę. Treść jest ta sama; zmienia się to, na czym oko managera crewingu zatrzyma się najpierw." },
    { title: "Pobierz i wyślij", body: "PDF i obraz są darmowe, bez limitu pobrań. Word płacisz raz i zostaje Twój — składaj plik od nowa za każdym razem, gdy zmieni się profil." },
  ],

  sections: [
    {
      title: "Dlaczego CV marynarza to nie zwykłe CV",
      body: [
        "CV lądowe mówi, co potrafisz. CV marynarza mówi, co jest udokumentowane: jaki stopień przepracowany, na jakich statkach, jaka nośność i moc, które certyfikaty są ważne i do kiedy, jakie wizy są w paszporcie. Manager crewingu czyta je, by odpowiedzieć na jedno pytanie: czy ta osoba może wejść na ten statek w tej dacie — legalnie i bez niespodzianek.",
        "Dlatego kolejność waży tyle co treść. Kontakty i data gotowości na górze, bo to po nich decyduje się, czy czytać dalej. Potem dokumenty z terminami: przeterminowane badania kończą rozmowę. Potem certyfikaty, potem staż z datami, typami statków i nośnością, żeby doświadczenie dało się zważyć, a nie przyjąć na wiarę.",
        "Kreator układa to właśnie tak. Nie musisz zgadywać, co crewing chce zobaczyć — jest już ustawione w kolejności, w jakiej tam patrzą.",
      ],
    },
    {
      title: "Autouzupełnianie: wgraj swoje stare CV",
      body: [
        "Większość marynarzy ma już gdzieś CV — plik Word sprzed czterech lat, PDF od poprzedniej agencji. Przepisywanie go do formularza jest powodem, dla którego profile zostają niedokończone, więc serwis czyta plik za Ciebie.",
        "Wgrywasz PDF albo .docx i pola wracają wypełnione: dane osobowe, stopień, znalezione certyfikaty z organem wydającym i terminem, rejsy ze statkiem, typem, firmą i datami. Długie CV z dwudziestoma kontraktami jest obsłużone tak, że najstarsze wpisy zwijają się w policzony staż, zamiast wypaść.",
        "Nic nie zapisuje się, zanim nie spojrzysz. Co odczytano źle — poprawisz, czego brakuje — dodasz, a dalej aktualny jest profil, nie plik na laptopie.",
      ],
    },
    {
      title: "PDF, obraz i plik Word",
      body: [
        "PDF załączasz do aplikacji: wygląda wszędzie tak samo i nie zmieni się po drodze. Obraz jest do Telegrama i WhatsAppa, gdzie zdjęcie się ogląda, a załącznika nie. Oba są darmowe, zawsze.",
        "Płatny jest Word, bo to ten, który można zmieniać. Crewingi proszą o niego wprost: jedni przenoszą dane do własnego formularza, inni chcą przepisanego objective pod konkretny statek. Z PDF nie zrobisz ani jednego, ani drugiego — przepisywałbyś własne CV.",
        "Jedna płatność 6,49 $ otwiera eksport do Worda dla Twojego konta na stałe. Dodasz certyfikat za miesiąc, zmienisz datę gotowości — składaj plik ile chcesz, drugi raz nie ma za co płacić.",
      ],
    },
    {
      title: "Najcenniejsze jest utrzymanie CV świeżym",
      body: [
        "CV starzeje się szybciej, niż się wydaje. Wygasły badania, odnowiony certyfikat, skończony kontrakt — i ostatniego rejsu w CV nie ma. Agencja, która otworzy CV z przeterminowanym dokumentem, nie napisze z pytaniem: przejdzie do następnego.",
        "Ponieważ dokument powstaje z profilu, poprawka jednego pola odświeża od razu każdą wersję CV. Ten sam profil wypełnia aplikacje w serwisie i trafia do agencji crewingowej, gdy aplikujesz — pilnujesz jednego miejsca, a nie czterech plików w czterech folderach.",
      ],
    },
  ],

  insideTitle: "Co zawiera CV",
  insideLede: "Każdy blok wypełnia się z profilu. Czego nie podasz, po prostu się nie pojawi — w gotowym dokumencie nie ma pustych linii.",
  inside: [
    { title: "Kontakty i gotowość", body: "Imię, stopień, telefon, e-mail, obywatelstwo i data, od której możesz wejść na statek. Pusta data czyta się jako „od zaraz”, nie jako „nie wiadomo”." },
    { title: "Dokumenty i wizy", body: "Paszport, książeczka żeglarska, badania, dyplom — każdy z terminem — oraz Schengen i wiza USA, jeśli je masz." },
    { title: "Certyfikaty i STCW", body: "Do dwudziestu certyfikatów z organem wydającym i terminem, najnowsze na górze." },
    { title: "Staż morski", body: "Do dziesięciu rejsów: statek i typ, nośność, stopień, firma i okres. Ten blok manager crewingu czyta najuważniej." },
  ],

  priceTitle: "Ile to kosztuje",
  priceBody: "Zrobienie CV, wszystkie szablony i dowolna liczba pobrań są darmowe. Płatny jest jeden format.",
  priceFree: "PDF i obraz — za darmo, bez limitu",
  pricePaid: "Word (.docx), edytowalny — 6,49 $ raz, na stałe",
  priceNote:
    "Płatność przez Buy Me a Coffee. Pobieranie otwiera się samo, gdy tylko płatność dotrze — nikt niczego nie potwierdza ręcznie.",

  faqTitle: "O co pytają marynarze",
  faq: [
    { q: "Czy za CV trzeba płacić?", a: "Nie. Zrobienie CV i pobranie go w PDF albo jako obraz jest darmowe i takie zostanie. Płatny jest tylko edytowalny plik Word." },
    { q: "Czy Worda da się potem edytować?", a: "O to w tym chodzi. Otwiera się w Wordzie, Google Docs, LibreOffice czy Pages i można zmienić każdą linię: dopisać certyfikat, przepisać objective pod agencję, usunąć rejs." },
    { q: "Zapłaciłem — kiedy pobiorę?", a: "W kilka sekund. Strona, z której kupowałeś, odblokuje się sama i zacznie pobieranie. Jeśli coś pójdzie nie tak — napisz, otworzymy ręcznie." },
    { q: "Płatność jest jedna czy za każdy plik?", a: "Jedna, na stałe. Składaj dokument od nowa przy każdej zmianie profilu — nie ma za co dopłacać." },
    { q: "Mogę wgrać stare CV zamiast przepisywać?", a: "Tak, PDF albo .docx. Pola wrócą wypełnione, a Ty poprawisz błędnie odczytane, zanim cokolwiek się zapisze." },
    { q: "Czy numer paszportu jest tu bezpieczny?", a: "Profil i strona publiczna to co innego. Publicznie widać wąski zestaw pól; paszport, wizy i data urodzenia trafiają tylko do samego CV, a ono opuszcza serwis dopiero wtedy, gdy wyślesz je sam albo dasz link, który możesz unieważnić." },
  ],

  notTitle: "Za co nigdy nie bierzemy pieniędzy",
  notBody:
    "Nie bierzemy pieniędzy za kontrakt, za miejsce na statku, za badania, certyfikaty ani wizy. Rejestracja, szukanie ofert, aplikowanie, zrobienie CV i pobranie go w PDF są darmowe. Płatna na tej stronie jest jedna rzecz: jeden format pliku. Jeśli ktoś żąda pieniędzy za samą pracę — to nie my i to nie jest legalne.",

  closingTitle: "Zacznij od profilu",
  closingBody:
    "Dziesięć minut teraz i CV jest gotowe w chwili, gdy pojawi się oferta warta odpowiedzi. A to zwykle dzień publikacji, nie tydzień później.",
};

const ro: CvMakerCopy = {
  metaTitle: "CV de marinar — creează și descarcă în PDF sau Word | SeaJobs.pro",
  metaDescription:
    "Construiește-ți CV-ul maritim din profilul SeaJobs.pro: rangul, certificatele, actele și vechimea sunt deja la locul lor. Descarcă gratuit în PDF sau în Word editabil cu 6,49 $.",
  keywords:
    "cv marinar, cv maritim, cv pentru crewing, descarca cv marinar, cv marinar word, model cv marinar, vechime pe mare in cv, certificate stcw cv",

  h1: "CV-ul tău de marinar, construit din profil",
  lede:
    "Completează profilul o dată și CV-ul se scrie singur — rang, certificate, acte și fiecare voiaj, în ordinea în care le citește un manager de crewing. Descarcă-l gratuit în PDF sau în Word, pe care îl poți edita înainte de a-l trimite.",
  ctaPrimary: "Creează CV-ul",
  ctaSecondary: "Vezi posturile",

  stepsTitle: "Trei pași, cam zece minute",
  steps: [
    { title: "Completează profilul — sau încarcă CV-ul pe care îl ai", body: "Dacă ai deja un CV în PDF sau Word, încarcă-l și câmpurile se completează singure: nume, rang, certificate, nave, date. Verifici ce s-a citit și corectezi ce s-a pierdut — minute, nu o seară de retastat." },
    { title: "Alege cum arată", body: "Patru machete, de la o foaie clasică la o fișă modernă. Conținutul este același; se schimbă doar ce vede întâi ochiul managerului de crewing." },
    { title: "Descarcă și trimite", body: "PDF-ul și imaginea sunt gratuite, fără limită de descărcări. Pentru Word plătești o dată și rămâne al tău — reconstruiește fișierul ori de câte ori se schimbă profilul." },
  ],

  sections: [
    {
      title: "De ce CV-ul de marinar nu e un CV obișnuit",
      body: [
        "Un CV de uscat spune ce știi să faci. CV-ul de marinar spune ce este documentat: ce rang ai lucrat, pe ce nave, ce tonaj și ce putere, ce certificate sunt valabile și până când, ce vize ai în pașaport. Managerul de crewing îl citește pentru un singur răspuns: poate omul acesta să se îmbarce pe nava asta la data asta — legal și fără surprize.",
        "De aceea ordinea contează cât conținutul. Contactele și data disponibilității sus, pentru că după ele se decide dacă se citește mai departe. Apoi actele cu termene: un medical expirat încheie discuția. Apoi certificatele, apoi vechimea cu date, tipuri de nave și tonaj, ca experiența să poată fi cântărită, nu luată pe încredere.",
        "Generatorul așază totul exact așa. Nu trebuie să ghicești ce vrea să vadă crewingul — este deja în ordinea în care se uită acolo.",
      ],
    },
    {
      title: "Completare automată: încarcă CV-ul vechi",
      body: [
        "Majoritatea marinarilor au deja un CV undeva — un fișier Word de acum patru ani, un PDF făcut de o agenție anterioară. Retastarea lui într-un formular este motivul pentru care profilurile rămân neterminate, așa că site-ul îl citește în locul tău.",
        "Încarci un PDF sau un .docx și câmpurile se întorc completate: date personale, rang, certificatele găsite cu autoritatea emitentă și termenul, voiajele cu nava, tipul, compania și datele. Un CV lung, cu douăzeci de contracte, este tratat astfel încât cele mai vechi intrări să fie însumate ca vechime, nu aruncate.",
        "Nimic nu se salvează până nu te uiți. Ce s-a citit greșit corectezi, ce lipsește adaugi, iar de atunci ții la zi profilul, nu un fișier de pe laptop.",
      ],
    },
    {
      title: "PDF, imagine și fișierul Word",
      body: [
        "PDF-ul este ce atașezi la o aplicație: arată la fel peste tot și nu se modifică pe drum. Imaginea există pentru Telegram și WhatsApp, unde o poză se citește, iar un atașament nu. Amândouă sunt gratuite, întotdeauna.",
        "Word-ul costă, pentru că el este cel pe care îl poți schimba. Agențiile îl cer pe nume: unii îți mută datele în formularul lor, alții vor obiectivul rescris pentru o navă anume. Dintr-un PDF nu faci niciuna — ai retasta propriul CV.",
        "O plată de 6,49 $ deschide exportul în Word pentru contul tău definitiv. Adaugi un certificat luna viitoare, schimbi data disponibilității — reconstruiești fișierul de câte ori vrei, nu ai ce plăti a doua oară.",
      ],
    },
    {
      title: "Partea care contează: să-l ții actual",
      body: [
        "Un CV se învechește mai repede decât pare. Expiră medicalul, se reînnoiește un certificat, se termină un contract — și ultimul voiaj lipsește. O agenție care deschide un CV cu un act expirat nu scrie să întrebe: trece la următorul.",
        "Pentru că documentul se construiește din profil, o singură corectură actualizează deodată toate versiunile CV-ului. Același profil completează aplicațiile de pe site și ajunge la agenția de crewing când aplici — ai un singur loc de ținut în ordine, nu patru fișiere în patru foldere.",
      ],
    },
  ],

  insideTitle: "Ce conține CV-ul",
  insideLede: "Fiecare bloc se completează din profil. Ce lași gol pur și simplu nu apare — în documentul final nu există rânduri goale.",
  inside: [
    { title: "Contacte și disponibilitate", body: "Nume, rang, telefon, e-mail, cetățenie și data de la care te poți îmbarca. O dată goală se citește „imediat”, nu „nu se știe”." },
    { title: "Acte și vize", body: "Pașaport, carnet de marinar, medical, brevet — fiecare cu termenul său — plus Schengen și viza SUA, dacă le ai." },
    { title: "Certificate și STCW", body: "Până la douăzeci de certificate cu autoritatea emitentă și termenul, cele noi primele." },
    { title: "Vechime pe mare", body: "Până la zece voiaje: nava și tipul, tonajul, rangul lucrat, compania și perioada. Acesta este blocul citit cel mai atent." },
  ],

  priceTitle: "Cât costă",
  priceBody: "Crearea CV-ului, toate machetele și oricâte descărcări sunt gratuite. Un singur format se plătește.",
  priceFree: "PDF și imagine — gratuit, nelimitat",
  pricePaid: "Word (.docx), editabil — 6,49 $ o dată, definitiv",
  priceNote:
    "Plata trece prin Buy Me a Coffee. Descărcarea se deschide singură imediat ce plata ajunge — nimeni nu confirmă nimic manual.",

  faqTitle: "Ce întreabă marinarii",
  faq: [
    { q: "Trebuie neapărat să plătesc pentru CV?", a: "Nu. Crearea CV-ului și descărcarea lui în PDF sau ca imagine sunt gratuite și vor rămâne așa. Se plătește doar fișierul Word editabil." },
    { q: "Pot edita Word-ul după aceea?", a: "Exact pentru asta există. Se deschide în Word, Google Docs, LibreOffice sau Pages și poți schimba fiecare rând: adaugi un certificat, rescrii obiectivul pentru o agenție, scoți un voiaj." },
    { q: "Am plătit — în cât timp îl descarc?", a: "În câteva secunde. Pagina de unde ai cumpărat se deblochează singură și pornește descărcarea. Dacă ceva nu merge, scrie-ne și o deschidem manual." },
    { q: "Plata e una singură sau pentru fiecare fișier?", a: "Una singură, definitiv. Reconstruiește documentul la fiecare schimbare din profil — nu ai ce plăti din nou." },
    { q: "Pot încărca vechiul CV în loc să scriu tot?", a: "Da, PDF sau .docx. Câmpurile se întorc completate și corectezi ce s-a citit greșit înainte să se salveze ceva." },
    { q: "Numărul de pașaport e în siguranță aici?", a: "Profilul și pagina publică sunt lucruri diferite. Public se vede doar un set restrâns de câmpuri; pașaportul, vizele și data nașterii ajung doar în CV, iar acesta părăsește site-ul doar când îl trimiți tu sau dai un link pe care îl poți anula." },
  ],

  notTitle: "Pentru ce nu cerem niciodată bani",
  notBody:
    "Nu cerem bani pentru un contract, pentru un post pe navă, pentru medical, certificate sau vize. Înregistrarea, căutarea posturilor, aplicarea, crearea CV-ului și descărcarea lui în PDF sunt gratuite. Singurul lucru plătit pe această pagină este un format de fișier. Dacă cineva îți cere bani pentru munca în sine — nu suntem noi și nu este legal.",

  closingTitle: "Începe cu profilul",
  closingBody:
    "Zece minute acum și CV-ul e gata exact când apare un post care merită un răspuns. Iar asta e de obicei ziua publicării, nu săptămâna următoare.",
};

export const CV_MAKER_COPY: Record<Lang, CvMakerCopy> = { en, ru, ua, pl, ro };

/** The two service tiles the home page shows in place of the salary widget. */
export type ServiceTile = { eyebrow: string; title: string; body: string; cta: string };

export const HOME_SERVICE_TILES: Record<Lang, { cv: ServiceTile; blast: ServiceTile; salaries: string }> = {
  en: {
    cv: { eyebrow: "Free", title: "Make your CV", body: "Fill in the profile once — the CV builds itself. PDF free, Word editable.", cta: "Build my CV" },
    blast: { eyebrow: "Paid service", title: "CV distribution", body: "We send your CV to crewing agencies by fleet and rank, from our own address.", cta: "See the packages" },
    salaries: "Salaries by rank and fleet",
  },
  ru: {
    cv: { eyebrow: "Бесплатно", title: "Собрать анкету", body: "Заполните профиль один раз — CV соберётся само. PDF бесплатно, Word редактируемый.", cta: "Собрать анкету" },
    blast: { eyebrow: "Платная услуга", title: "Рассылка анкет", body: "Отправим ваше CV крюинговым агентствам по флоту и рангу, с нашего адреса.", cta: "Смотреть пакеты" },
    salaries: "Зарплаты по рангам и флотам",
  },
  ua: {
    cv: { eyebrow: "Безкоштовно", title: "Зібрати анкету", body: "Заповніть профіль один раз — CV збереться само. PDF безкоштовно, Word редагований.", cta: "Зібрати анкету" },
    blast: { eyebrow: "Платна послуга", title: "Розсилка анкет", body: "Надішлемо ваше CV крюїнговим агентствам за флотом і рангом, з нашої адреси.", cta: "Дивитись пакети" },
    salaries: "Зарплати за рангами та флотами",
  },
  pl: {
    cv: { eyebrow: "Za darmo", title: "Zrób CV", body: "Wypełnij profil raz — CV zbuduje się samo. PDF za darmo, Word edytowalny.", cta: "Zrób moje CV" },
    blast: { eyebrow: "Usługa płatna", title: "Wysyłka CV", body: "Wyślemy Twoje CV do agencji crewingowych według floty i stopnia, z naszego adresu.", cta: "Zobacz pakiety" },
    salaries: "Zarobki według stopnia i floty",
  },
  ro: {
    cv: { eyebrow: "Gratuit", title: "Creează CV-ul", body: "Completezi profilul o dată — CV-ul se construiește singur. PDF gratuit, Word editabil.", cta: "Creează CV-ul" },
    blast: { eyebrow: "Serviciu plătit", title: "Distribuție CV", body: "Trimitem CV-ul tău agențiilor de crewing, pe flotă și rang, de la adresa noastră.", cta: "Vezi pachetele" },
    salaries: "Salarii după rang și flotă",
  },
};
