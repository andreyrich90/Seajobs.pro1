-- Company guides (category = 'guide') for the employer-name searches Search
-- Console shows with impressions and no clicks: "bsm career at sea" (146),
-- "cma cgm вакансии" (97), "wilhelmsen praca" (49), "osm crewing", "osm thome
-- poland", "tos oferty pracy", "tos poland".
--
-- Written as independent overviews, not as the company's page: every guide
-- says SeaJobs.pro does not represent the company, points to its official
-- site, and warns against anyone charging money in its name. Facts come from
-- the companies' own pages and trade press as of October 2026, stated with
-- "about" / "according to the company" where sources differ; anything that
-- could not be confirmed (a cadet scheme, an office address) is left out.
--
-- ru + ua + en; pl as well for the three with Polish searches (Wilhelmsen,
-- OSM Thome, TOS). Links point at the page in the same language.
-- Idempotent — guarded by the English title. Run once in the SQL editor.

-- ── 26. BSM ──────────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'BSM (Bernhard Schulte Shipmanagement): jobs at sea and how to apply',
    'ru', 'BSM (Bernhard Schulte Shipmanagement): вакансии для моряков и как устроиться',
    'ua', 'BSM (Bernhard Schulte Shipmanagement): вакансії для моряків і як влаштуватися'),
  jsonb_build_object(
    'en', $en$Bernhard Schulte Shipmanagement (BSM) is one of the largest ship managers in the world and part of the German Schulte Group. It does not just own ships: it manages them — and crews them — for many shipowners. For a seafarer this means a wide choice of vessel types under one employer.

## The company in numbers

According to BSM, it manages **more than 650 vessels** through **11 ship management centres**, **28 crew service centres** and its own maritime training centres. The company gives its seafarer pool as 20,000 to 40,000 people depending on the page — either way, it is one of the biggest employers at sea. The fleet covers tankers, gas carriers, bulk carriers, container ships, car carriers and offshore units.

## Who BSM hires

All ranks — officers, engineers, ETOs, ratings and galley crew. Recruitment goes through BSM's own **crew service centres** in different countries; in Ukraine the company has a crew service centre in Odesa. The company describes its selection as strict: qualifications and competence are checked before the first contract.

## How to apply

1. Use the **official website** bs-shipmanagement.com and the contacts of the crew service centre in your country.
2. Prepare a complete CV: every certificate with number and expiry date, sea service by vessel type and engine, English level. A clear [maritime CV](/maritime-cv) saves the recruiter time.
3. Expect an interview and English and competence checks; tanker and gas-carrier ranks need the matching STCW chapter V endorsements.

Seafarers already with the company use BSM's Seafarer Portal app for documents and contact with the office.

## Vacancies on SeaJobs.pro

Postings that mention BSM appear on our board when crewing agencies publish them — [search for BSM](/jobs?q=BSM). For the same ranks with other employers, see the rank pages, for example [Chief Engineer](/jobs/rank/chief-engineer) or [Chief Officer](/jobs/rank/chief-officer).

## Beware of fakes

Large names attract scammers. **BSM does not charge seafarers for employment**, and neither does any honest crewing office. If someone asks you to pay for a "guaranteed contract with BSM", visa processing or "registration", stop: check the office on the official website and report the offer.

*SeaJobs.pro is an independent job board and does not represent Bernhard Schulte Shipmanagement. Company figures are taken from its public pages and may change.*$en$,
    'ru', $ru$Bernhard Schulte Shipmanagement (BSM) — один из крупнейших судовых менеджеров в мире, часть немецкой Schulte Group. Компания не только владеет судами: она управляет ими и комплектует экипажи для многих судовладельцев. Для моряка это значит широкий выбор типов судов у одного работодателя.

## Компания в цифрах

По данным BSM, компания управляет **более чем 650 судами** через **11 центров судового менеджмента**, **28 крюинговых центров** (crew service centres) и собственные учебные центры. Пул моряков на разных страницах компании указан от 20 000 до 40 000 человек — в любом случае это один из крупнейших работодателей в море. Флот включает танкеры, газовозы, балкеры, контейнеровозы, автовозы и оффшорные суда.

## Кого набирает BSM

Все должности — штурманов, механиков, ETO, рядовой состав и камбуз. Набор идёт через собственные **крюинговые центры** BSM в разных странах; в Украине у компании есть крюинговый центр в Одессе. Отбор компания описывает как строгий: квалификацию и компетентность проверяют до первого контракта.

## Как подать заявку

1. Используйте **официальный сайт** bs-shipmanagement.com и контакты крюингового центра в вашей стране.
2. Подготовьте полное CV: каждый сертификат с номером и сроком действия, стаж по типам судов и двигателей, уровень английского. Понятное [CV моряка](/ru/maritime-cv) экономит время менеджера.
3. Ожидайте собеседование, проверку английского и компетенций; для танкеров и газовозов нужны соответствующие допуски по главе V STCW.

Моряки, которые уже работают в компании, пользуются приложением BSM Seafarer Portal — для документов и связи с офисом.

## Вакансии на SeaJobs.pro

Вакансии с упоминанием BSM появляются у нас, когда их публикуют крюинги, — [поиск по BSM](/ru/jobs?q=BSM). Те же должности у других работодателей — на страницах должностей, например [старший механик](/ru/jobs/rank/chief-engineer) или [старший помощник](/ru/jobs/rank/chief-officer).

## Осторожно с подделками

Громкие названия привлекают мошенников. **BSM не берёт с моряков деньги за трудоустройство**, как и любой честный крюинг. Если вас просят заплатить за «гарантированный контракт в BSM», оформление визы или «регистрацию» — остановитесь: проверьте офис на официальном сайте и сообщите о предложении.

*SeaJobs.pro — независимый сайт вакансий и не представляет Bernhard Schulte Shipmanagement. Цифры о компании взяты из её открытых источников и могут меняться.*$ru$,
    'ua', $ua$Bernhard Schulte Shipmanagement (BSM) — один із найбільших суднових менеджерів у світі, частина німецької Schulte Group. Компанія не лише володіє суднами: вона керує ними й комплектує екіпажі для багатьох судновласників. Для моряка це означає широкий вибір типів суден в одного роботодавця.

## Компанія в цифрах

За даними BSM, компанія керує **понад 650 суднами** через **11 центрів суднового менеджменту**, **28 крюїнгових центрів** (crew service centres) і власні навчальні центри. Пул моряків на різних сторінках компанії вказано від 20 000 до 40 000 осіб — у будь-якому разі це один із найбільших роботодавців у морі. Флот охоплює танкери, газовози, балкери, контейнеровози, автовози та офшорні судна.

## Кого набирає BSM

Усі посади — штурманів, механіків, ETO, рядовий склад і камбуз. Набір іде через власні **крюїнгові центри** BSM у різних країнах; в Україні компанія має крюїнговий центр в Одесі. Відбір компанія описує як суворий: кваліфікацію й компетентність перевіряють до першого контракту.

## Як подати заявку

1. Користуйтеся **офіційним сайтом** bs-shipmanagement.com і контактами крюїнгового центру у вашій країні.
2. Підготуйте повне CV: кожен сертифікат із номером і строком дії, стаж за типами суден і двигунів, рівень англійської. Зрозуміле [CV моряка](/ua/maritime-cv) заощаджує час менеджера.
3. Очікуйте співбесіду, перевірку англійської та компетенцій; для танкерів і газовозів потрібні відповідні допуски за главою V STCW.

Моряки, які вже працюють у компанії, користуються застосунком BSM Seafarer Portal — для документів і зв'язку з офісом.

## Вакансії на SeaJobs.pro

Вакансії зі згадкою BSM з'являються в нас, коли їх публікують крюїнги, — [пошук за BSM](/ua/jobs?q=BSM). Ті самі посади в інших роботодавців — на сторінках посад, наприклад [старший механік](/ua/jobs/rank/chief-engineer) або [старший помічник](/ua/jobs/rank/chief-officer).

## Обережно з підробками

Гучні назви приваблюють шахраїв. **BSM не бере з моряків гроші за працевлаштування**, як і будь-який чесний крюїнг. Якщо вас просять заплатити за «гарантований контракт у BSM», оформлення візи чи «реєстрацію» — зупиніться: перевірте офіс на офіційному сайті й повідомте про пропозицію.

*SeaJobs.pro — незалежний сайт вакансій і не представляє Bernhard Schulte Shipmanagement. Цифри про компанію взято з її відкритих джерел, вони можуть змінюватися.*$ua$),
  'Companies', 'guide',
  'linear-gradient(135deg,#0e2a45,#1d4f8a)',
  true, '2026-10-08 09:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'BSM (Bernhard Schulte Shipmanagement): jobs at sea and how to apply');

-- ── 27. CMA CGM ──────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'CMA CGM jobs for seafarers: how to get on the group''s ships',
    'ru', 'Вакансии CMA CGM для моряков: как попасть на суда компании',
    'ua', 'Вакансії CMA CGM для моряків: як потрапити на судна компанії'),
  jsonb_build_object(
    'en', $en$CMA CGM, based in Marseille, is one of the three largest container lines in the world. Its ships range from feeders to some of the largest container ships afloat, and a growing part of the fleet runs on LNG and methanol. For seafarers that means modern ships, a fixed liner schedule and a large employer with a long-term fleet plan.

## The fleet

According to the trade press, by early 2026 CMA CGM operated **more than 650 vessels**, about **400 of them owned**. The owned fleet is managed by **CMA Ships**, the group's ship management arm. New deliveries include LNG-powered container ships of over 23,000 TEU and a series of methanol-powered vessels.

## How CMA CGM recruits

The group has a dedicated recruitment site for seafarers, **CMASHIPS.com**, which brings together the group's agencies, subsidiaries and partners that recruit and manage its crews. According to the company, it hires **officers, engineers, ratings, catering staff and cadets**, and trains cadets together with maritime academies in France and elsewhere.

## What is usually required

- Experience on **container ships** for senior ranks — the type matters.
- For ships running on LNG or other low-flashpoint fuels, the **IGF Code training** (STCW V/3) — basic for all crew with safety duties, advanced for officers and engineers responsible for the fuel.
- Good **English**, valid STCW certificates, a seafarer medical and the visas the route needs.

## How to apply

1. Apply through **cmaships.com** or the official crewing partner in your country — and check that it really is one.
2. Keep a complete, up-to-date CV: rank, container-ship sea time with TEU and engine type, certificates with expiry dates. You can [build it from your profile](/maritime-cv).
3. Watch the [container ship vacancies](/jobs/vessel/container-ship) on SeaJobs.pro — postings that mention CMA CGM can also be found [by search](/jobs?q=CMA%20CGM).

## Beware of fakes

A famous name is used by scammers more often than an unknown one. **CMA CGM does not charge seafarers for jobs.** Anyone asking for a fee "for a place on a CMA CGM ship" is not working for the company.

*SeaJobs.pro is an independent job board and does not represent CMA CGM. Fleet figures are taken from public sources and change as ships are delivered.*$en$,
    'ru', $ru$CMA CGM из Марселя — одна из трёх крупнейших контейнерных линий мира. Её суда — от фидеров до одних из самых больших контейнеровозов на воде, и всё больше флота ходит на сжиженном газе и метаноле. Для моряка это современные суда, регулярные линии и крупный работодатель с долгосрочным планом флота.

## Флот

По данным отраслевой прессы, к началу 2026 года CMA CGM эксплуатировала **более 650 судов**, из них около **400 собственных**. Собственным флотом управляет **CMA Ships** — подразделение группы по судовому менеджменту. Среди новых судов — контейнеровозы на СПГ вместимостью более 23 000 TEU и серия судов на метаноле.

## Как CMA CGM набирает моряков

У группы есть отдельный сайт для набора моряков — **CMASHIPS.com**. Он объединяет агентства, дочерние компании и партнёров группы, которые набирают и сопровождают экипажи. По данным компании, нужны **штурманы, механики, рядовой состав, камбуз и кадеты**; кадетов готовят вместе с морскими академиями во Франции и других странах.

## Что обычно требуется

- Опыт на **контейнеровозах** для старших должностей — тип судна важен.
- Для судов на СПГ и другом низкотемпературном топливе — **подготовка по Кодексу IGF** (STCW V/3): базовая для всего экипажа с обязанностями по безопасности, расширенная — для офицеров и механиков, отвечающих за топливо.
- Хороший **английский**, действующие сертификаты STCW, медкомиссия и визы, которые нужны на линии.

## Как подать заявку

1. Подавайте через **cmaships.com** или официального крюингового партнёра в вашей стране — и проверьте, что он действительно официальный.
2. Держите полное и свежее CV: должность, стаж на контейнеровозах с TEU и типом двигателя, сертификаты со сроками. Его можно [собрать из профиля](/ru/maritime-cv).
3. Следите за [вакансиями на контейнеровозах](/ru/jobs/vessel/container-ship) на SeaJobs.pro — вакансии с упоминанием CMA CGM можно найти и [через поиск](/ru/jobs?q=CMA%20CGM).

## Осторожно с подделками

Известным именем мошенники пользуются чаще, чем неизвестным. **CMA CGM не берёт с моряков деньги за работу.** Тот, кто просит плату «за место на судне CMA CGM», на компанию не работает.

*SeaJobs.pro — независимый сайт вакансий и не представляет CMA CGM. Цифры о флоте взяты из открытых источников и меняются по мере поставки новых судов.*$ru$,
    'ua', $ua$CMA CGM із Марселя — одна з трьох найбільших контейнерних ліній світу. Її судна — від фідерів до одних із найбільших контейнеровозів на воді, і дедалі більше флоту ходить на зрідженому газі та метанолі. Для моряка це сучасні судна, регулярні лінії й великий роботодавець із довгостроковим планом флоту.

## Флот

За даними галузевої преси, на початок 2026 року CMA CGM експлуатувала **понад 650 суден**, з них близько **400 власних**. Власним флотом керує **CMA Ships** — підрозділ групи із суднового менеджменту. Серед нових суден — контейнеровози на ЗПГ місткістю понад 23 000 TEU і серія суден на метанолі.

## Як CMA CGM набирає моряків

Група має окремий сайт для набору моряків — **CMASHIPS.com**. Він об'єднує агентства, дочірні компанії та партнерів групи, які набирають і супроводжують екіпажі. За даними компанії, потрібні **штурмани, механіки, рядовий склад, камбуз і кадети**; кадетів готують разом із морськими академіями у Франції та інших країнах.

## Що зазвичай потрібно

- Досвід на **контейнеровозах** для старших посад — тип судна важливий.
- Для суден на ЗПГ та іншому низькотемпературному паливі — **підготовка за Кодексом IGF** (STCW V/3): базова для всього екіпажу з обов'язками з безпеки, розширена — для офіцерів і механіків, відповідальних за паливо.
- Добра **англійська**, чинні сертифікати STCW, медкомісія та візи, потрібні на лінії.

## Як подати заявку

1. Подавайте через **cmaships.com** або офіційного крюїнгового партнера у вашій країні — і перевірте, що він справді офіційний.
2. Тримайте повне й свіже CV: посада, стаж на контейнеровозах із TEU і типом двигуна, сертифікати зі строками. Його можна [зібрати з профілю](/ua/maritime-cv).
3. Стежте за [вакансіями на контейнеровозах](/ua/jobs/vessel/container-ship) на SeaJobs.pro — вакансії зі згадкою CMA CGM можна знайти й [через пошук](/ua/jobs?q=CMA%20CGM).

## Обережно з підробками

Відомим ім'ям шахраї користуються частіше, ніж невідомим. **CMA CGM не бере з моряків гроші за роботу.** Той, хто просить плату «за місце на судні CMA CGM», на компанію не працює.

*SeaJobs.pro — незалежний сайт вакансій і не представляє CMA CGM. Цифри про флот узято з відкритих джерел, вони змінюються з постачанням нових суден.*$ua$),
  'Companies', 'guide',
  'linear-gradient(135deg,#0e2a45,#1a5c8f)',
  true, '2026-10-08 09:10:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'CMA CGM jobs for seafarers: how to get on the group''s ships');

-- ── 28. Wilhelmsen ───────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Wilhelmsen jobs for seafarers: the Polish manning office and how to apply',
    'ru', 'Wilhelmsen: работа для моряков, офис в Польше и как подать заявку',
    'ua', 'Wilhelmsen: робота для моряків, офіс у Польщі та як подати заявку',
    'pl', 'Wilhelmsen praca dla marynarzy: biuro w Polsce i jak aplikować'),
  jsonb_build_object(
    'en', $en$Wilhelmsen is a Norwegian maritime group with a long history, and its ship management arm, Wilhelmsen Ship Management, manages and crews vessels for many owners. Seafarers from Poland and neighbouring countries most often meet the company through its Polish manning office.

## The manning office in Poland

According to Wilhelmsen, its Polish office — **Wilhelmsen Marine Personnel Sp. z o.o.** in **Szczecin** — recruits crew for ships and for the **offshore wind** industry. Candidates register online or send a CV by e-mail; a recruitment officer then contacts the shortlisted ones. Walk-in candidates may be seen when staff are available.

## Who they look for

Officers, engineers and ratings for the managed fleet, and personnel for offshore wind vessels. Postings seen on job boards have included Masters, Chief Engineers and Chief Officers for **bulk carriers**, with requirements such as bulk-carrier experience, two-stroke engine experience, a **C1/D visa** and good English.

## How to prepare

1. Check the current contacts on the **official Wilhelmsen website** (the Poland page of crew management).
2. Send a complete CV in English: rank, sea service by vessel type, engine and tonnage, certificates with expiry dates. A ready [maritime CV](/maritime-cv) helps.
3. Make sure the documents the vacancy names are valid — especially the US visa when the trade calls at American ports.

## Similar vacancies

See current [jobs on bulk carriers](/jobs/vessel/bulk-carrier), [offshore jobs](/jobs/vessel/offshore) and vacancies from [Polish crewing agencies](/jobs/country/poland). Postings that mention Wilhelmsen can be found [by search](/jobs?q=Wilhelmsen).

## No fees

Wilhelmsen, like every legitimate employer, **does not charge seafarers for jobs**. Report anyone who asks for money in its name.

*SeaJobs.pro is an independent job board and does not represent Wilhelmsen. Details are taken from the company's public pages and may change.*$en$,
    'ru', $ru$Wilhelmsen — норвежская морская группа с долгой историей, а её подразделение Wilhelmsen Ship Management управляет судами и комплектует экипажи для многих судовладельцев. Моряки из Польши и соседних стран чаще всего знакомятся с компанией через её польский крюинговый офис.

## Крюинговый офис в Польше

По данным Wilhelmsen, польский офис — **Wilhelmsen Marine Personnel Sp. z o.o.** в **Щецине** — набирает экипажи на суда и персонал для **оффшорной ветроэнергетики**. Кандидаты регистрируются онлайн или присылают CV по почте; затем менеджер связывается с теми, кто прошёл отбор. Прийти без записи можно, если есть свободные сотрудники.

## Кого ищут

Штурманов, механиков и рядовой состав для управляемого флота и персонал для судов, обслуживающих ветропарки. В объявлениях на сайтах вакансий встречались капитаны, старшие механики и старпомы на **балкеры** с требованиями: опыт на балкерах, опыт с двухтактными двигателями, **виза C1/D** и хороший английский.

## Как подготовиться

1. Проверьте актуальные контакты на **официальном сайте Wilhelmsen** (страница крюинга в Польше).
2. Отправьте полное CV на английском: должность, стаж по типам судов, двигателям и тоннажу, сертификаты со сроками. Поможет готовое [CV моряка](/ru/maritime-cv).
3. Убедитесь, что документы из вакансии действуют — особенно американская виза, если линия заходит в порты США.

## Похожие вакансии

Смотрите актуальные [вакансии на балкерах](/ru/jobs/vessel/bulk-carrier), [в оффшоре](/ru/jobs/vessel/offshore) и от [польских крюингов](/ru/jobs/country/poland). Вакансии с упоминанием Wilhelmsen можно найти [через поиск](/ru/jobs?q=Wilhelmsen).

## Без оплаты

Wilhelmsen, как и любой честный работодатель, **не берёт с моряков деньги за работу**. Сообщайте о любом, кто просит деньги от её имени.

*SeaJobs.pro — независимый сайт вакансий и не представляет Wilhelmsen. Сведения взяты с открытых страниц компании и могут меняться.*$ru$,
    'ua', $ua$Wilhelmsen — норвезька морська група з довгою історією, а її підрозділ Wilhelmsen Ship Management керує суднами й комплектує екіпажі для багатьох судновласників. Моряки з Польщі та сусідніх країн найчастіше знайомляться з компанією через її польський крюїнговий офіс.

## Крюїнговий офіс у Польщі

За даними Wilhelmsen, польський офіс — **Wilhelmsen Marine Personnel Sp. z o.o.** у **Щецині** — набирає екіпажі на судна та персонал для **офшорної вітроенергетики**. Кандидати реєструються онлайн або надсилають CV поштою; потім менеджер зв'язується з тими, хто пройшов відбір. Прийти без запису можна, якщо є вільні працівники.

## Кого шукають

Штурманів, механіків і рядовий склад для керованого флоту та персонал для суден, що обслуговують вітропарки. В оголошеннях на сайтах вакансій траплялися капітани, старші механіки й старпоми на **балкери** з вимогами: досвід на балкерах, досвід із двотактними двигунами, **віза C1/D** і добра англійська.

## Як підготуватися

1. Перевірте актуальні контакти на **офіційному сайті Wilhelmsen** (сторінка крюїнгу в Польщі).
2. Надішліть повне CV англійською: посада, стаж за типами суден, двигунами й тоннажем, сертифікати зі строками. Допоможе готове [CV моряка](/ua/maritime-cv).
3. Переконайтеся, що документи з вакансії чинні — особливо американська віза, якщо лінія заходить у порти США.

## Схожі вакансії

Дивіться актуальні [вакансії на балкерах](/ua/jobs/vessel/bulk-carrier), [в офшорі](/ua/jobs/vessel/offshore) і від [польських крюїнгів](/ua/jobs/country/poland). Вакансії зі згадкою Wilhelmsen можна знайти [через пошук](/ua/jobs?q=Wilhelmsen).

## Без оплати

Wilhelmsen, як і будь-який чесний роботодавець, **не бере з моряків гроші за роботу**. Повідомляйте про будь-кого, хто просить гроші від її імені.

*SeaJobs.pro — незалежний сайт вакансій і не представляє Wilhelmsen. Відомості взято з відкритих сторінок компанії, вони можуть змінюватися.*$ua$,
    'pl', $pl$Wilhelmsen to norweska grupa morska z długą historią, a jej spółka Wilhelmsen Ship Management zarządza statkami i obsadza je załogami dla wielu armatorów. Marynarze z Polski najczęściej poznają firmę przez jej polskie biuro crewingowe.

## Biuro crewingowe w Polsce

Według Wilhelmsen polskie biuro — **Wilhelmsen Marine Personnel Sp. z o.o.** w **Szczecinie** — rekrutuje załogi na statki oraz personel dla **morskiej energetyki wiatrowej**. Kandydaci rejestrują się online lub wysyłają CV mailem; z wybranymi osobami kontaktuje się rekruter. Wizyta bez umówienia jest możliwa, jeśli pracownicy mają czas.

## Kogo szukają

Oficerów, mechaników i załogę szeregową do zarządzanej floty oraz personel na jednostki obsługujące farmy wiatrowe. W ogłoszeniach na portalach pojawiali się kapitanowie, starsi mechanicy i starsi oficerowie na **masowce**, z wymaganiami takimi jak doświadczenie na masowcach, praca z silnikami dwusuwowymi, **wiza C1/D** i dobry angielski.

## Jak się przygotować

1. Sprawdź aktualne kontakty na **oficjalnej stronie Wilhelmsen** (strona crewingu w Polsce).
2. Wyślij pełne CV po angielsku: stanowisko, staż według typu statku, silnika i tonażu, certyfikaty z datami ważności. Pomoże gotowe [CV marynarza](/pl/maritime-cv).
3. Upewnij się, że dokumenty wymagane w ofercie są ważne — zwłaszcza wiza USA, jeśli statek zawija do portów amerykańskich.

## Podobne oferty

Zobacz aktualne [oferty pracy na masowcach](/pl/jobs/vessel/bulk-carrier), [w offshore](/pl/jobs/vessel/offshore) i od [polskich agencji crewingowych](/pl/jobs/country/poland). Oferty z nazwą Wilhelmsen znajdziesz też [w wyszukiwarce](/pl/jobs?q=Wilhelmsen).

## Bez opłat

Wilhelmsen, jak każdy uczciwy pracodawca, **nie pobiera od marynarzy opłat za pracę**. Zgłaszaj każdego, kto żąda pieniędzy w jej imieniu.

*SeaJobs.pro to niezależny portal z ofertami pracy i nie reprezentuje Wilhelmsen. Informacje pochodzą z publicznych stron firmy i mogą się zmieniać.*$pl$),
  'Companies', 'guide',
  'linear-gradient(135deg,#0e2a45,#2a6f97)',
  true, '2026-10-08 09:20:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Wilhelmsen jobs for seafarers: the Polish manning office and how to apply');

-- ── 29. OSM Thome ────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'OSM Thome crewing: jobs for seafarers and how to apply',
    'ru', 'OSM Thome: вакансии для моряков, крюинг и как подать заявку',
    'ua', 'OSM Thome: вакансії для моряків, крюїнг і як подати заявку',
    'pl', 'OSM Thome praca dla marynarzy: crewing i jak aplikować'),
  jsonb_build_object(
    'en', $en$OSM Thome is one of the largest crew and ship managers in the world, formed by the merger of Norway's OSM Maritime and Singapore's Thome Group. It crews merchant ships, tankers, gas carriers and offshore units for many owners.

## The company

According to OSM Thome, it employs around **30,000 seafarers and offshore personnel** of more than **70 nationalities**. Its head office is in Norway, and it runs its own manning offices around the world, including subsidiaries in **Poland**, Lithuania, Latvia and Croatia. The company works with its own manning offices rather than third-party agents, which is why searches like "OSM crewing" or "OSM Poland" usually lead to the same company.

## Who they hire

All ranks for merchant and offshore fleets: officers, engineers, ETOs, ratings and galley staff. Tankers, gas carriers and offshore vessels need the matching endorsements — STCW chapter V for tankers, DP certificates and offshore safety training (such as BOSIET) for offshore units.

## How to apply

1. Start from the **official website** osmthome.com and the contacts of the manning office in your country.
2. Send a full CV in English with sea service by vessel type, certificates with numbers and expiry dates, and English level. A ready [maritime CV](/maritime-cv) helps.
3. Expect an interview and document checks; keep scans of every certificate ready.

## Similar vacancies

See current [tanker jobs](/jobs/vessel/tanker), [gas carrier jobs](/jobs/vessel/gas-carrier) and [offshore jobs](/jobs/vessel/offshore). Postings that mention OSM can be found [by search](/jobs?q=OSM).

## No fees

OSM Thome **does not charge seafarers for employment**. If someone asks you to pay for a place "in OSM", check the office on the official site and report the offer.

*SeaJobs.pro is an independent job board and does not represent OSM Thome. Figures are taken from the company's public pages and may change.*$en$,
    'ru', $ru$OSM Thome — один из крупнейших крюинговых и судовых менеджеров мира, образованный слиянием норвежской OSM Maritime и сингапурской Thome Group. Компания комплектует экипажи торговых судов, танкеров, газовозов и оффшорных объектов для многих судовладельцев.

## О компании

По данным OSM Thome, у неё работает около **30 000 моряков и оффшорного персонала** более чем **70 национальностей**. Головной офис — в Норвегии, а набор идёт через собственные крюинговые офисы по всему миру, в том числе дочерние компании в **Польше**, Литве, Латвии и Хорватии. Компания работает через свои офисы, а не через сторонних агентов, поэтому запросы «OSM crewing» или «OSM Poland» обычно ведут к одной и той же компании.

## Кого набирают

Все должности для торгового и оффшорного флота: штурманов, механиков, ETO, рядовой состав и камбуз. На танкерах, газовозах и оффшорных судах нужны соответствующие допуски — глава V STCW для танкеров, сертификаты DP и оффшорная подготовка по безопасности (например, BOSIET) для оффшора.

## Как подать заявку

1. Начните с **официального сайта** osmthome.com и контактов крюингового офиса в вашей стране.
2. Отправьте полное CV на английском: стаж по типам судов, сертификаты с номерами и сроками, уровень английского. Поможет готовое [CV моряка](/ru/maritime-cv).
3. Ожидайте собеседование и проверку документов; держите сканы всех сертификатов под рукой.

## Похожие вакансии

Смотрите актуальные [вакансии на танкерах](/ru/jobs/vessel/tanker), [на газовозах](/ru/jobs/vessel/gas-carrier) и [в оффшоре](/ru/jobs/vessel/offshore). Вакансии с упоминанием OSM можно найти [через поиск](/ru/jobs?q=OSM).

## Без оплаты

OSM Thome **не берёт с моряков деньги за трудоустройство**. Если вас просят заплатить за место «в OSM», проверьте офис на официальном сайте и сообщите о предложении.

*SeaJobs.pro — независимый сайт вакансий и не представляет OSM Thome. Цифры взяты с открытых страниц компании и могут меняться.*$ru$,
    'ua', $ua$OSM Thome — один із найбільших крюїнгових і суднових менеджерів світу, утворений злиттям норвезької OSM Maritime і сінгапурської Thome Group. Компанія комплектує екіпажі торгових суден, танкерів, газовозів і офшорних об'єктів для багатьох судновласників.

## Про компанію

За даними OSM Thome, у неї працює близько **30 000 моряків і офшорного персоналу** понад **70 національностей**. Головний офіс — у Норвегії, а набір іде через власні крюїнгові офіси по всьому світу, зокрема дочірні компанії в **Польщі**, Литві, Латвії та Хорватії. Компанія працює через свої офіси, а не через сторонніх агентів, тому запити «OSM crewing» чи «OSM Poland» зазвичай ведуть до однієї й тієї самої компанії.

## Кого набирають

Усі посади для торгового й офшорного флоту: штурманів, механіків, ETO, рядовий склад і камбуз. На танкерах, газовозах і офшорних суднах потрібні відповідні допуски — глава V STCW для танкерів, сертифікати DP та офшорна підготовка з безпеки (наприклад, BOSIET) для офшору.

## Як подати заявку

1. Почніть з **офіційного сайту** osmthome.com і контактів крюїнгового офісу у вашій країні.
2. Надішліть повне CV англійською: стаж за типами суден, сертифікати з номерами й строками, рівень англійської. Допоможе готове [CV моряка](/ua/maritime-cv).
3. Очікуйте співбесіду й перевірку документів; тримайте скани всіх сертифікатів під рукою.

## Схожі вакансії

Дивіться актуальні [вакансії на танкерах](/ua/jobs/vessel/tanker), [на газовозах](/ua/jobs/vessel/gas-carrier) і [в офшорі](/ua/jobs/vessel/offshore). Вакансії зі згадкою OSM можна знайти [через пошук](/ua/jobs?q=OSM).

## Без оплати

OSM Thome **не бере з моряків гроші за працевлаштування**. Якщо вас просять заплатити за місце «в OSM», перевірте офіс на офіційному сайті й повідомте про пропозицію.

*SeaJobs.pro — незалежний сайт вакансій і не представляє OSM Thome. Цифри взято з відкритих сторінок компанії, вони можуть змінюватися.*$ua$,
    'pl', $pl$OSM Thome to jeden z największych na świecie menedżerów załóg i statków, powstały z połączenia norweskiej OSM Maritime i singapurskiej Thome Group. Obsadza załogami statki handlowe, zbiornikowce, gazowce i jednostki offshore dla wielu armatorów.

## O firmie

Według OSM Thome firma zatrudnia około **30 000 marynarzy i pracowników offshore** z ponad **70 krajów**. Centrala znajduje się w Norwegii, a rekrutacja odbywa się przez własne biura crewingowe na całym świecie, w tym spółki w **Polsce**, na Litwie, Łotwie i w Chorwacji. Firma działa przez własne biura, a nie zewnętrznych agentów, dlatego wyszukiwania „OSM crewing” czy „OSM Poland” zwykle prowadzą do tej samej firmy.

## Kogo rekrutują

Wszystkie stanowiska na flotę handlową i offshore: oficerów, mechaników, ETO, załogę szeregową i kuchnię. Na zbiornikowcach, gazowcach i jednostkach offshore potrzebne są odpowiednie uprawnienia — rozdział V STCW dla zbiornikowców, certyfikaty DP i szkolenia bezpieczeństwa offshore (np. BOSIET) dla offshore.

## Jak aplikować

1. Zacznij od **oficjalnej strony** osmthome.com i kontaktów do biura crewingowego w Twoim kraju.
2. Wyślij pełne CV po angielsku: staż według typów statków, certyfikaty z numerami i datami ważności, poziom angielskiego. Pomoże gotowe [CV marynarza](/pl/maritime-cv).
3. Spodziewaj się rozmowy i weryfikacji dokumentów; miej pod ręką skany wszystkich certyfikatów.

## Podobne oferty

Zobacz aktualne [oferty na zbiornikowcach](/pl/jobs/vessel/tanker), [na gazowcach](/pl/jobs/vessel/gas-carrier) i [w offshore](/pl/jobs/vessel/offshore). Oferty z nazwą OSM znajdziesz też [w wyszukiwarce](/pl/jobs?q=OSM).

## Bez opłat

OSM Thome **nie pobiera od marynarzy opłat za zatrudnienie**. Jeśli ktoś żąda pieniędzy za miejsce „w OSM”, sprawdź biuro na oficjalnej stronie i zgłoś ofertę.

*SeaJobs.pro to niezależny portal z ofertami pracy i nie reprezentuje OSM Thome. Dane pochodzą z publicznych stron firmy i mogą się zmieniać.*$pl$),
  'Companies', 'guide',
  'linear-gradient(135deg,#0e2a45,#0f6e86)',
  true, '2026-10-08 09:30:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'OSM Thome crewing: jobs for seafarers and how to apply');

-- ── 30. TOS ──────────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'TOS (Transport & Offshore Services): offshore and maritime jobs and how to apply',
    'ru', 'TOS (Transport & Offshore Services): вакансии в оффшоре и на флоте',
    'ua', 'TOS (Transport & Offshore Services): вакансії в офшорі та на флоті',
    'pl', 'TOS oferty pracy dla marynarzy: offshore i żegluga, jak aplikować'),
  jsonb_build_object(
    'en', $en$TOS — Transport & Offshore Services — is a maritime and energy staffing company based in **Rotterdam** and working since **1992**. It places seafarers and offshore personnel on vessels and projects for its clients: offshore energy, wind farms, dredging, marine construction and shipping.

## TOS in Poland and Ukraine

TOS has a Polish company, **Transport & Offshore Services Poland Sp. z o.o.**, registered in **Gdynia**. Crewing directories also list a TOS office in **Odesa**. This is why searches such as "TOS Poland" and "TOS oferty pracy" are common among Polish and Ukrainian seafarers.

## Who TOS looks for

The company's open roles cover **Masters, officers, engineers, ABs**, and project specialists such as **riggers, welders, crane operators and foremen**. Offshore work usually means rotations and day rates, and project roles may be shorter than a classic merchant contract.

## What offshore employers usually require

- Offshore safety training — typically **BOSIET** (with CA-EBS) or an equivalent.
- For DP vessels, **DP certificates** and logged DP hours.
- A valid STCW set, a seafarer medical and, for some projects, an offshore medical.
- Good English and a CV that shows the offshore experience clearly.

## How to apply

1. Check current vacancies on the **official TOS website** and apply there or via the Polish office's published contacts.
2. Prepare a full CV in English with vessel types (AHTS, PSV, SOV, dredgers…), DP experience and every certificate with its expiry date. A ready [maritime CV](/maritime-cv) helps — and there is an [offshore template](/maritime-cv/offshore).
3. Compare with [offshore vacancies](/jobs/vessel/offshore) on SeaJobs.pro and postings that mention TOS [by search](/jobs?q=TOS).

## No fees

A legitimate staffing company is paid by its clients, **never by the seafarer**. Anyone asking you for money in TOS's name is not TOS.

*SeaJobs.pro is an independent job board and does not represent TOS. Details are taken from public sources and may change.*$en$,
    'ru', $ru$TOS — Transport & Offshore Services — кадровая компания для морской и энергетической отрасли из **Роттердама**, работает с **1992 года**. Она направляет моряков и оффшорный персонал на суда и проекты своих клиентов: оффшорная энергетика, ветропарки, дноуглубление, морское строительство и судоходство.

## TOS в Польше и Украине

У TOS есть польская компания — **Transport & Offshore Services Poland Sp. z o.o.**, зарегистрированная в **Гдыне**. В каталогах крюингов указан и офис TOS в **Одессе**. Поэтому запросы «TOS Poland» и «TOS oferty pracy» популярны у польских и украинских моряков.

## Кого ищет TOS

В открытых ролях компании — **капитаны, штурманы, механики, матросы (AB)**, а также проектные специалисты: **риггеры, сварщики, крановщики, бригадиры**. Работа в оффшоре — это обычно вахты и суточные ставки, а проектные роли бывают короче классического контракта в торговом флоте.

## Что обычно требуют в оффшоре

- Оффшорная подготовка по безопасности — как правило, **BOSIET** (с CA-EBS) или аналог.
- Для судов с динамическим позиционированием — **сертификаты DP** и подтверждённые часы DP.
- Действующий комплект STCW, медкомиссия моряка, а для некоторых проектов — оффшорная медкомиссия.
- Хороший английский и CV, в котором оффшорный опыт виден сразу.

## Как подать заявку

1. Смотрите актуальные вакансии на **официальном сайте TOS** и подавайте заявку там или по опубликованным контактам польского офиса.
2. Подготовьте полное CV на английском: типы судов (AHTS, PSV, SOV, земснаряды…), опыт DP и все сертификаты со сроками. Поможет готовое [CV моряка](/ru/maritime-cv) — есть и [шаблон для оффшора](/ru/maritime-cv/offshore).
3. Сравните с [оффшорными вакансиями](/ru/jobs/vessel/offshore) на SeaJobs.pro и вакансиями с упоминанием TOS [через поиск](/ru/jobs?q=TOS).

## Без оплаты

Честной кадровой компании платят её клиенты, **но никогда не моряк**. Тот, кто просит у вас деньги от имени TOS, — не TOS.

*SeaJobs.pro — независимый сайт вакансий и не представляет TOS. Сведения взяты из открытых источников и могут меняться.*$ru$,
    'ua', $ua$TOS — Transport & Offshore Services — кадрова компанія для морської та енергетичної галузі з **Роттердама**, працює з **1992 року**. Вона направляє моряків і офшорний персонал на судна та проєкти своїх клієнтів: офшорна енергетика, вітропарки, днопоглиблення, морське будівництво й судноплавство.

## TOS у Польщі та Україні

TOS має польську компанію — **Transport & Offshore Services Poland Sp. z o.o.**, зареєстровану в **Гдині**. У каталогах крюїнгів вказано й офіс TOS в **Одесі**. Тому запити «TOS Poland» і «TOS oferty pracy» популярні серед польських та українських моряків.

## Кого шукає TOS

У відкритих ролях компанії — **капітани, штурмани, механіки, матроси (AB)**, а також проєктні фахівці: **ригери, зварники, кранівники, бригадири**. Робота в офшорі — це зазвичай вахти й добові ставки, а проєктні ролі бувають коротшими за класичний контракт у торговому флоті.

## Що зазвичай вимагають в офшорі

- Офшорна підготовка з безпеки — як правило, **BOSIET** (з CA-EBS) або аналог.
- Для суден із динамічним позиціонуванням — **сертифікати DP** і підтверджені години DP.
- Чинний комплект STCW, медкомісія моряка, а для деяких проєктів — офшорна медкомісія.
- Добра англійська й CV, у якому офшорний досвід видно одразу.

## Як подати заявку

1. Дивіться актуальні вакансії на **офіційному сайті TOS** і подавайте заявку там або за опублікованими контактами польського офісу.
2. Підготуйте повне CV англійською: типи суден (AHTS, PSV, SOV, земснаряди…), досвід DP і всі сертифікати зі строками. Допоможе готове [CV моряка](/ua/maritime-cv) — є й [шаблон для офшору](/ua/maritime-cv/offshore).
3. Порівняйте з [офшорними вакансіями](/ua/jobs/vessel/offshore) на SeaJobs.pro і вакансіями зі згадкою TOS [через пошук](/ua/jobs?q=TOS).

## Без оплати

Чесній кадровій компанії платять її клієнти, **але ніколи не моряк**. Той, хто просить у вас гроші від імені TOS, — не TOS.

*SeaJobs.pro — незалежний сайт вакансій і не представляє TOS. Відомості взято з відкритих джерел, вони можуть змінюватися.*$ua$,
    'pl', $pl$TOS — Transport & Offshore Services — to firma rekrutacyjna dla branży morskiej i energetycznej z siedzibą w **Rotterdamie**, działająca od **1992 roku**. Kieruje marynarzy i personel offshore na statki i projekty swoich klientów: energetyka offshore, farmy wiatrowe, pogłębianie, budownictwo morskie i żegluga.

## TOS w Polsce

TOS ma polską spółkę — **Transport & Offshore Services Poland Sp. z o.o.** z siedzibą w **Gdyni**. Dlatego wyszukiwania „TOS Poland” i „TOS oferty pracy” są popularne wśród polskich marynarzy. Katalogi crewingowe wymieniają też biuro TOS w Odessie.

## Kogo szuka TOS

Wśród otwartych ról firmy są **kapitanowie, oficerowie, mechanicy, starsi marynarze (AB)** oraz specjaliści projektowi: **riggerzy, spawacze, operatorzy dźwigów, brygadziści**. Praca offshore to zwykle system rotacyjny i stawki dzienne, a role projektowe bywają krótsze niż klasyczny kontrakt we flocie handlowej.

## Czego zwykle wymaga offshore

- Szkolenie bezpieczeństwa offshore — najczęściej **BOSIET** (z CA-EBS) lub odpowiednik.
- Na jednostkach z dynamicznym pozycjonowaniem — **certyfikaty DP** i udokumentowane godziny DP.
- Ważny komplet STCW, morskie badania lekarskie, a przy niektórych projektach — badania offshore.
- Dobry angielski i CV, w którym doświadczenie offshore widać od razu.

## Jak aplikować

1. Sprawdź aktualne oferty na **oficjalnej stronie TOS** i aplikuj tam lub przez opublikowane kontakty polskiego biura.
2. Przygotuj pełne CV po angielsku: typy jednostek (AHTS, PSV, SOV, pogłębiarki…), doświadczenie DP i wszystkie certyfikaty z datami ważności. Pomoże gotowe [CV marynarza](/pl/maritime-cv) — jest też [szablon offshore](/pl/maritime-cv/offshore).
3. Porównaj z [ofertami offshore](/pl/jobs/vessel/offshore) na SeaJobs.pro i ofertami z nazwą TOS [w wyszukiwarce](/pl/jobs?q=TOS).

## Bez opłat

Uczciwej firmie rekrutacyjnej płacą jej klienci, **nigdy marynarz**. Ktoś, kto żąda od Ciebie pieniędzy w imieniu TOS, nie jest TOS.

*SeaJobs.pro to niezależny portal z ofertami pracy i nie reprezentuje TOS. Informacje pochodzą z publicznych źródeł i mogą się zmieniać.*$pl$),
  'Companies', 'guide',
  'linear-gradient(135deg,#0e2a45,#0d7d6b)',
  true, '2026-10-08 09:40:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'TOS (Transport & Offshore Services): offshore and maritime jobs and how to apply');
