-- Fix markdown spacing on already-inserted forum posts (headings/lists/quotes
-- must be separated by blank lines to render). Re-running the seed files would
-- skip existing rows (guarded), so update their content directly. Idempotent.

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Крюинговый менеджер тратит на первый просмотр вашего CV меньше минуты. За эту минуту он решает: звонить вам или закрыть файл. Хорошее резюме моряка — это не творчество, это чёткая анкета, по которой сразу видно, подходите вы под вакансию или нет.

## Что должно быть в CV моряка

**Личные данные.** ФИО как в загранпаспорте, дата рождения, гражданство, город, телефон, email, Skype/WhatsApp. Фото в судовой или деловой одежде — обязательно.

**Должность и звание.** Ранг, на который претендуете (Master, Chief Officer, AB, 2nd Engineer и т.д.). Пишите так, как это называется в международной практике.

**Документы.** Диплом (CoC), подтверждения (endorsement) под флагами, паспорт моряка, виза США C1/D, срок годности каждого документа. Менеджер смотрит сюда в первую очередь.

**Опыт работы.** Таблицей, от последнего к первому: судно, тип судна, флаг, GT/DWT, тип двигателя (для механиков), судовладелец/крюинг, ваша должность, даты посадки и списания. Пробелы между контрактами лучше объяснить одной строкой.

**Сертификаты STCW.** Basic Safety, Advanced Fire Fighting, танкерные, GMDSS, DP — с датами.

**Образование и языки.** Морской вуз/училище, уровень английского (Marlins — балл, если сдавали).

## Частые ошибки

- Резюме на три страницы «воды». Крюинг хочет факты, а не эссе.
- Нет типа судна и GT — менеджер не может сопоставить с вакансией.
- Просрочены документы, а в CV это не видно.
- Одно резюме на все должности. Под танкер и под балкер акценты разные.
- Фото с отдыха, в футболке, с солнцезащитными очками.

## Формат и отправка

PDF, имя файла — `Familia_Rank_CV.pdf` (латиницей). В теле письма — одна-две строки: должность, готовность к посадке, ключевые документы. Не прикладывайте 20 сканов сразу — их попросят позже.

Готовое резюме? Загрузите его в профиль на **seajobs.pro** — и откликайтесь на вакансии в один клик, CV уходит напрямую крюинг-менеджеру.$ru$,
  'en', $en$A crewing manager spends less than a minute on the first look at your CV. In that minute they decide whether to call you or close the file. A good seaman CV is not a creative essay — it is a clear data sheet that instantly shows whether you fit the vacancy.

## What a seaman CV must contain

**Personal details.** Full name as in your passport, date of birth, nationality, city, phone, email, Skype/WhatsApp. A photo in uniform or business dress is a must.

**Rank / position.** The rank you are applying for (Master, Chief Officer, AB, 2nd Engineer, etc.), written the way it is used internationally.

**Documents.** CoC, flag endorsements, seaman's book, US C1/D visa, and the expiry date of each. This is the first thing a manager reads.

**Sea service.** A table, most recent first: vessel name, vessel type, flag, GT/DWT, engine type (for engineers), owner/manager, your rank, sign-on and sign-off dates. Explain gaps between contracts in one line.

**STCW certificates.** Basic Safety, Advanced Fire Fighting, tanker courses, GMDSS, DP — with dates.

**Education and languages.** Maritime academy, English level (Marlins score if taken).

## Common mistakes

- A three-page CV full of filler. Crewing wants facts, not prose.
- No vessel type or GT — the manager cannot match you to the job.
- Expired documents that the CV does not reveal.
- One CV for every rank. Tanker and bulker emphasis differ.
- A holiday photo in a T-shirt and sunglasses.

## Format and sending

PDF, file name `Surname_Rank_CV.pdf`. In the email body, one or two lines: rank, availability, key documents. Do not attach 20 scans at once — they will be requested later.

CV ready? Upload it to your profile on **seajobs.pro** and apply in one click — it goes straight to the crewing manager.$en$)
WHERE title->>'ru' = 'Резюме моряка (CV): как составить, что писать и образец, который берут на контракт';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Без правильного пакета документов вас не возьмут ни на одно судно, каким бы сильным ни было CV. Разберём базовый набор моряка и в каком порядке его собирать.

## Мореходная книжка (Seaman's Book)

Это ваш главный «трудовой» документ в море. В неё вносят каждый контракт: судно, должность, даты посадки и списания. Именно по книжке считается ваш морской стаж (ценз) для следующего диплома. Оформляется в морской администрации; для работы под иностранным флагом часто нужна книжка международного образца.

## Паспорт моряка (удостоверение личности моряка, SID)

Документ, удостоверяющий личность именно как моряка, по конвенции ILO. Позволяет проходить через границы в портах, съезжать на берег, следовать к судну и обратно. Не путать с загранпаспортом — нужны оба.

## Диплом (CoC) и подтверждения (Endorsement)

Диплом подтверждает вашу квалификацию (вахтенный помощник, механик, капитан). Endorsement — это признание вашего диплома конкретным флагом (Панама, Либерия, Мальта и т.д.). Судовладелец обычно говорит, под каким флагом нужно подтверждение.

## Медицинский сертификат

Заключение о годности к работе в море по международной форме. Без действующего медсертификата на судно не пустят. Срок обычно до 2 лет.

## Сертификаты STCW

Базовый набор: Basic Safety Training, Proficiency in Survival Craft, Advanced Fire Fighting, Medical First Aid, Security Awareness. Для танкеров, газовозов, пассажирских судов — дополнительные курсы.

## В каком порядке собирать

1. Загранпаспорт → 2. Медкомиссия и медсертификат → 3. Базовые курсы STCW → 4. Диплом и мореходная книжка → 5. Endorsement под нужный флаг → 6. Виза (например, США C1/D), если требует маршрут.

Следите за сроками годности — «просроченный» сертификат превращает готового кандидата в непроходного за один день.

Документы в порядке? Ищите контракт под свою квалификацию на **seajobs.pro** — фильтр по рангу и типу судна экономит недели поиска.$ru$,
  'en', $en$Without the right set of documents no ship will take you on, however strong your CV is. Here is the seafarer's core document set and the order in which to build it.

## Seaman's Book (Continuous Discharge Certificate)

Your main "service record" at sea. Every contract is entered in it: vessel, rank, sign-on and sign-off dates. Your sea service (the time counted toward your next CoC) is calculated from this book. Issued by the maritime administration; foreign-flag work often needs an internationally recognised book.

## Seafarer's Identity Document (SID)

An ID that identifies you specifically as a seafarer under the ILO convention. It lets you cross borders in ports, take shore leave, and travel to and from the ship. It is not the same as your travel passport — you need both.

## Certificate of Competency (CoC) and Endorsements

The CoC proves your qualification (watch officer, engineer, master). The endorsement is a specific flag's recognition of your CoC (Panama, Liberia, Malta, etc.). The owner usually tells you which flag endorsement is required.

## Medical certificate

A statement of fitness for sea service on the international form. No valid medical, no boarding. Usually valid up to 2 years.

## STCW certificates

Core set: Basic Safety Training, Proficiency in Survival Craft, Advanced Fire Fighting, Medical First Aid, Security Awareness. Tankers, gas carriers and passenger ships require extra courses.

## The order to collect them

1. Travel passport → 2. Medical exam and certificate → 3. Basic STCW courses → 4. CoC and Seaman's Book → 5. Flag endorsement → 6. Visa (e.g. US C1/D) if your route needs it.

Watch the expiry dates — an expired certificate turns a ready candidate into a rejected one overnight.

Documents in order? Find a contract for your qualification on **seajobs.pro** — filtering by rank and vessel type saves weeks of searching.$en$)
WHERE title->>'ru' = 'Паспорт моряка и мореходная книжка: что это, зачем нужно и как получить в 2026 году';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$«Моряки налоги не платят» — фраза, из-за которой люди попадают на неприятности. Правда сложнее и зависит от вашего налогового резидентства. Это не юридическая консультация, а карта, чтобы задать правильные вопросы своему бухгалтеру.

## От чего вообще зависит налог

Ключевое понятие — налоговое резидентство. Как правило, оно определяется тем, сколько дней в году вы физически провели в стране (часто порог — 183 дня). Резидент обычно обязан декларировать мировой доход, нерезидент — по особым правилам.

## Правило 183 дней

Во многих странах, если вы провели за пределами страны больше определённого числа дней (часто 183+), ваш статус и ставка меняются. Именно поэтому морякам важно **вести учёт дней**: даты посадки и списания, штампы, авиабилеты. Мореходная книжка и билеты — ваша доказательная база.

## Почему «ничего не платить» — опасная стратегия

- Банк может запросить источник средств при крупных переводах.
- При покупке недвижимости/авто спрашивают происхождение денег.
- Отсутствие деклараций годами — риск доначислений и штрафов.
- В некоторых странах есть специальные (льготные) режимы для моряков — но чтобы ими пользоваться, нужно правильно оформиться, а не просто молчать.

## Что делать практично

1. Узнайте правила именно вашей страны резидентства — они у всех разные.
2. Ведите личный табель: дни в стране и вне её, контракты.
3. Сохраняйте контракты, расчётные листы (payslips), выписки о переводах.
4. Раз в год консультируйтесь с бухгалтером, который понимает моряков.
5. Если есть льготный морской режим — оформите его официально.

Спокойные финансы начинаются со стабильных контрактов. Свежие вакансии от проверенных судовладельцев — на **seajobs.pro**.$ru$,
  'en', $en$"Seafarers don't pay tax" is the phrase that gets people into trouble. The truth is more nuanced and depends on your tax residency. This is not legal advice — it is a map to help you ask your accountant the right questions.

## What the tax actually depends on

The key concept is tax residency. It is usually decided by how many days per year you were physically in a country (183 days is a common threshold). A resident generally must declare worldwide income; a non-resident is taxed under special rules.

## The 183-day rule

In many countries, if you spend more than a set number of days outside the country (often 183+), your status and rate change. That is why seafarers must **track their days**: sign-on/sign-off dates, stamps, flight tickets. Your seaman's book and tickets are your evidence.

## Why "paying nothing" is a risky strategy

- Banks can ask for the source of funds on large transfers.
- Buying property or a car triggers questions about where the money came from.
- Years with no declarations invite back-taxes and penalties.
- Some countries have special (favourable) regimes for seafarers — but you must register for them properly, not just stay silent.

## Practical steps

1. Learn the rules of your own country of residency — they differ everywhere.
2. Keep a personal log: days in and out of the country, contracts.
3. Save contracts, payslips and transfer statements.
4. Once a year, consult an accountant who understands seafarers.
5. If a seafarer tax regime exists, register for it officially.

Calm finances start with steady contracts. Fresh vacancies from verified owners are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Налоги моряка: надо ли платить, правило 183 дней и как не попасть на штрафы';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Хотите в море, но не знаете, с какого конца подступиться? Разложим по шагам — без иллюзий и без занудства.

## Шаг 1. Решите, какая служба вам ближе

**Палуба (Deck)** — навигация, груз, работа на открытом воздухе, путь к капитану. **Машина (Engine)** — двигатели, механика, техника, путь к старшему механику. **Камбуз/сервис** — повар, стюард. От выбора зависит, какие курсы и диплом вам нужны.

## Шаг 2. Образование

Есть два пути: морской вуз/училище (даёт диплом офицера и практику кадетом) или старт с рядового состава (матрос, моторист) через базовые курсы. Второй путь короче и дешевле, но потолок роста ниже, пока не получите диплом.

## Шаг 3. Базовые документы и курсы

Загранпаспорт, медкомиссия, базовые STCW-курсы (Basic Safety Training и др.), мореходная книжка, паспорт моряка. Это минимальный «билет» на борт.

## Шаг 4. Первый контракт — самое трудное

Без опыта берут неохотно, это правда. Что реально помогает:

- регистрация сразу в нескольких крюингах и на профильных площадках;
- готовность идти на низкую стартовую позицию (OS, wiper, ученик повара);
- честное CV без выдуманного опыта;
- гибкость по типу судна и региону.

## Шаг 5. Наберите ценз и растите

Первые 1–2 контракта — это про опыт и записи в книжку, а не про деньги. Дальше начинается нормальный доход и карьерная лестница: OS → AB → боцман, или моторист → 4-й механик и выше.

## Сколько это стоит и сколько занимает

Базовый пакет курсов и документов — ощутимая, но окупаемая инвестиция. От старта до первого выхода в море при активных действиях — обычно несколько месяцев.

Готовы искать первый рейс? На **seajobs.pro** есть фильтр вакансий, где встречаются позиции «без опыта» и для кадетов — начните отсюда.$ru$,
  'en', $en$You want to go to sea but have no idea where to start? Here is the path, step by step — no illusions, no filler.

## Step 1. Decide which department suits you

**Deck** — navigation, cargo, outdoor work, the road to master. **Engine** — engines, machinery, technical work, the road to chief engineer. **Galley/service** — cook, steward. Your choice decides which courses and CoC you need.

## Step 2. Education

Two routes: a maritime academy (gives an officer CoC and cadet sea time) or starting as a rating (deckhand, motorman) through basic courses. The second route is shorter and cheaper, but your ceiling is lower until you earn a CoC.

## Step 3. Core documents and courses

Travel passport, medical exam, basic STCW courses (Basic Safety Training, etc.), seaman's book, seafarer ID. This is the minimum "ticket" aboard.

## Step 4. The first contract — the hardest part

It is true that companies are reluctant to take someone with no experience. What actually helps:

- registering with several crewing agencies and job boards at once;
- being willing to take a low entry position (OS, wiper, galley trainee);
- an honest CV with no invented experience;
- flexibility on vessel type and region.

## Step 5. Build sea time and grow

The first one or two contracts are about experience and book entries, not money. After that a proper income and career ladder begin: OS → AB → bosun, or motorman → 4th engineer and up.

## Cost and timeline

The basic package of courses and documents is a noticeable but recoverable investment. From start to first sailing, with active effort, usually a few months.

Ready to look for your first voyage? **seajobs.pro** has a filter where "no experience" and cadet positions appear — start there.$en$)
WHERE title->>'ru' = 'Как стать моряком с нуля: путь от берега до первого контракта в 2026 году';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Судно ходит под флагом Панамы, экипаж — с трёх континентов, судовладелец — из Германии, а управляет крюинг из Польши. Нормально ли это? Да. Разберём, что такое флаг судна и почему это важно для моряка.

## Что такое флаг судна

Флаг — это страна регистрации судна. Её законы определяют требования к документам экипажа, трудовые нормы, налоги судовладельца, стандарты безопасности. «Флаг удобства» — когда судно регистрируют в стране, где это дешевле и проще (Панама, Либерия, Маршалловы острова, Мальта и др.), даже если владелец из другой страны.

## Почему это важно вам

**Подтверждение диплома (endorsement).** Под каждый флаг ваш диплом нужно подтвердить. Панамский endorsement не подойдёт для мальтийского судна. Судовладелец обычно оплачивает или организует нужное подтверждение.

**Трудовые условия.** Флаги бывают разные по репутации. Есть флаги из «белого списка» с нормальным контролем, есть проблемные. От флага зависит, насколько реально защищены ваши права.

**Виза и порты.** Флаг влияет на маршруты и заходы, а значит — на визовые требования (например, C1/D для США).

## Как понять, что флаг «нормальный»

- Флаг в белом списке Парижского/Токийского меморандума (Paris/Tokyo MoU) — хороший признак.
- Судовладелец без проблем называет флаг и коллективный договор (ITF/MLC).
- На судне действует конвенция MLC 2006 — базовая защита ваших прав.

## Красные флаги (в переносном смысле)

- Владелец уходит от прямого ответа, под каким флагом судно.
- Нет коллективного договора, зарплата «в конверте».
- Флаг из «чёрного списка» и старое судно с плохой историей задержаний в портах.

Флаг сам по себе — не приговор: под «удобными» флагами ходят и отличные суда серьёзных компаний. Важно смотреть на связку флаг + судовладелец + договор.

Ищите контракты, где условия прозрачны, — вакансии от проверенных крюингов на **seajobs.pro**.$ru$,
  'en', $en$A ship flies the Panama flag, the crew is from three continents, the owner is German and the crewing is run from Poland. Is that normal? Yes. Here is what a ship's flag is and why it matters to you.

## What a ship's flag is

The flag is the country where the ship is registered. Its laws set the crew document requirements, labour standards, the owner's taxes and safety rules. A "flag of convenience" is when a ship is registered in a country where it is cheaper and simpler (Panama, Liberia, Marshall Islands, Malta, etc.), even if the owner is elsewhere.

## Why it matters to you

**Endorsement.** Your CoC must be endorsed for each flag. A Panama endorsement will not work on a Maltese ship. The owner usually pays for or arranges the endorsement you need.

**Working conditions.** Flags vary in reputation. Some are "white list" flags with proper oversight; others are problematic. The flag affects how real your protections are.

**Visa and ports.** The flag influences routes and port calls, and therefore visa requirements (for example US C1/D).

## How to tell a "good" flag

- The flag is on the white list of the Paris/Tokyo MoU — a good sign.
- The owner readily names the flag and the collective agreement (ITF/MLC).
- MLC 2006 applies on board — the baseline protection of your rights.

## Warning signs

- The owner dodges the question of which flag the ship flies.
- No collective agreement, cash-in-hand wages.
- A black-list flag on an old ship with a poor port-detention record.

The flag alone is not a verdict: excellent ships from serious companies also sail under convenient flags. What matters is the combination of flag + owner + agreement.

Look for contracts with transparent terms — vacancies from verified crewing agencies on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Флаги удобства (Панама, Либерия, Маршалловы острова): что значит флаг судна для моряка';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Динамическое позиционирование (DP) — это система, которая удерживает судно на точке без якоря, компьютерами и подруливающими устройствами. На офшоре без DPO никуда, и платят таким специалистам заметно выше рынка. Разберём, как туда попасть.

## Кто такой DPO

Офицер, который управляет судном в режиме DP: снабжение платформ (PSV), якорные операции (AHTS), укладка труб, строительные и буровые суда. Ошибка у платформы стоит очень дорого, поэтому требования высокие.

## Схема сертификации (IMCA/Nautical Institute)

Путь обычно такой:

1. **Induction course** — вводный курс DP.
2. **Морская практика (DP sea time)** — набор часов и записей в DP logbook под наблюдением.
3. **Simulator/Advanced course** — продвинутый курс на симуляторе.
4. **Ещё практика** и оформление сертификата (Limited, затем Unlimited).

Нужен действующий диплом вахтенного помощника как база — DP надстраивается на офицерскую квалификацию.

## Сколько стоит и сколько занимает

Курсы DP — ощутимая инвестиция, плюс время на набор морского ценза на DP-судах. Полный путь от Induction до Unlimited обычно занимает от года и больше, в зависимости от того, как быстро набираете часы.

## Сколько платят

DPO и особенно SDPO — один из самых доходных сегментов. Ротации часто короче торгового флота (нередко 4/4 или 5/5 недель), а ставки выше. Рынок зависит от офшорной активности, но хороших DPO всегда не хватает.

## С чего начать реально

- Получите/подтвердите офицерский диплом.
- Пройдите Induction course в аккредитованном центре.
- Ищите первый контракт на DP-судне, где можно набирать ценз (иногда как 2nd/3rd Officer).
- Ведите DP logbook аккуратно — это ваш пропуск на следующий уровень.

Смотрите офшорные вакансии (PSV, AHTS, DP) на **seajobs.pro** — фильтр по типу судна поможет найти старт для набора DP-ценза.$ru$,
  'en', $en$Dynamic Positioning (DP) is the system that holds a ship on a fixed point without anchoring, using computers and thrusters. Offshore work is impossible without DPOs, and they are paid well above the market. Here is how to get in.

## What a DPO does

An officer who runs the ship in DP mode: platform supply (PSV), anchor handling (AHTS), pipe-laying, construction and drilling vessels. A mistake next to a platform is extremely costly, so the requirements are high.

## The certification path (IMCA/Nautical Institute)

The route usually is:

1. **Induction course** — the introductory DP course.
2. **DP sea time** — logging hours and entries in a DP logbook under supervision.
3. **Simulator/Advanced course** — the advanced simulator course.
4. **More sea time** and issuance of the certificate (Limited, then Unlimited).

You need a valid watch officer CoC as a base — DP is built on top of an officer qualification.

## Cost and timeline

DP courses are a noticeable investment, plus the time to build DP sea service. The full path from Induction to Unlimited usually takes a year or more, depending on how fast you log hours.

## How much it pays

DPO, and especially SDPO, is one of the best-paid segments. Rotations are often shorter than the merchant fleet (frequently 4/4 or 5/5 weeks) and rates are higher. The market depends on offshore activity, but good DPOs are always in short supply.

## Where to actually start

- Obtain/endorse an officer CoC.
- Take an Induction course at an accredited centre.
- Find a first contract on a DP vessel where you can build sea time (sometimes as 2nd/3rd Officer).
- Keep the DP logbook meticulously — it is your pass to the next level.

Browse offshore vacancies (PSV, AHTS, DP) on **seajobs.pro** — the vessel-type filter helps you find a starting point to build DP time.$en$)
WHERE title->>'ru' = 'DP-оператор (DPO): как получить сертификат, сколько стоит обучение и сколько платят';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Круизный лайнер — это плавучий город: тысячи пассажиров, рестораны, театры, бассейны. И это отдельный рынок труда со своими правилами, который часто открыт даже для тех, у кого нет классического морского диплома.

## Кто нужен на круизах

**Морская команда (Marine/Deck/Engine).** Капитан, офицеры, механики, матросы, электрики — как на торговом флоте, только акцент на безопасности пассажиров.

**Отельный департамент (Hotel).** Самый большой блок: официанты, бармены, повара, стюарды кают, ресепшн, продавцы магазинов, охрана. Сюда часто берут без морского диплома — важнее сервис и английский.

**Развлечения и сервисы.** Аниматоры, музыканты, фотографы, спа, фитнес-инструкторы, детские аниматоры.

## Сколько платят

Базовые ставки в отельном департаменте могут быть скромными, но многое добирается чаевыми (особенно официанты, бармены, стюарды кают). Морская и техническая команда получает фиксированную зарплату как на торговом флоте. Контракты длинные (часто 4–8 месяцев), но питание и проживание — за счёт компании.

## Особенности, о которых лучше знать заранее

- Строгий стандарт внешнего вида и поведения.
- Работа с людьми = эмоциональная нагрузка каждый день.
- Короткие, но частые заходы в красивые порты.
- Большой международный экипаж — нужен уверенный английский.

## Как попасть

1. Определите департамент (отель, морская команда, развлечения).
2. Соберите пакет: STCW Basic Safety обязателен даже для отельного персонала, паспорт моряка, медсертификат, виза (часто C1/D для США).
3. Составьте CV с акцентом на сервис/специальность и английский.
4. Регистрируйтесь в круизных агентствах и на профильных площадках.

Ищете морскую или сервисную позицию? Смотрите вакансии круизного и пассажирского флота на **seajobs.pro**.$ru$,
  'en', $en$A cruise liner is a floating city: thousands of passengers, restaurants, theatres, pools. It is also a separate job market with its own rules, and it is often open even to people without a classic maritime CoC.

## Who is needed on cruise ships

**Marine team (Deck/Engine).** Captain, officers, engineers, deckhands, electricians — as on the merchant fleet, but with the emphasis on passenger safety.

**Hotel department.** The largest block: waiters, bartenders, cooks, cabin stewards, reception, shop staff, security. Many of these are hired without a maritime CoC — service skills and English matter more.

**Entertainment and services.** Animators, musicians, photographers, spa, fitness instructors, kids' club staff.

## How much it pays

Base pay in the hotel department can be modest, but a lot is topped up by tips (especially waiters, bartenders, cabin stewards). The marine and technical crew get a fixed salary like the merchant fleet. Contracts are long (often 4–8 months), but food and accommodation are covered by the company.

## Things to know in advance

- A strict standard of appearance and behaviour.
- Working with people = emotional load every day.
- Short but frequent calls at beautiful ports.
- A large international crew — confident English is required.

## How to get hired

1. Choose your department (hotel, marine team, entertainment).
2. Gather the pack: STCW Basic Safety is mandatory even for hotel staff, plus seaman's book, medical, and a visa (often US C1/D).
3. Write a CV focused on service/specialty and English.
4. Register with cruise agencies and job boards.

Looking for a marine or service position? Browse cruise and passenger fleet vacancies on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Работа на круизных лайнерах: какие есть должности, сколько платят и как туда попасть';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Master, C/O, AB, OS, ETO, oiler — новичку эти сокращения кажутся шифром. Разложим экипаж по полочкам, чтобы вы понимали, кто за что отвечает и куда расти.

## Палубная команда (Deck)

- **Master (Капитан)** — главный на судне, полная ответственность за всё.
- **Chief Officer / Chief Mate (Старший помощник)** — груз, остойчивость, палубная команда; заместитель капитана.
- **2nd Officer (Второй помощник)** — навигация, карты, ECDIS.
- **3rd Officer (Третий помощник)** — спасательные и пожарные средства, вахта.
- **Bosun (Боцман)** — старший над рядовым палубным составом, «прораб» палубы.
- **AB (Able Seaman, матрос 1 класса)** — квалифицированный матрос, вахта на руле, палубные работы.
- **OS (Ordinary Seaman, матрос 2 класса)** — начальная палубная позиция.

## Машинная команда (Engine)

- **Chief Engineer (Старший механик)** — «капитан машины», ответственность за всю технику.
- **2nd Engineer (Второй механик)** — главный двигатель и основные системы, практический руководитель машины.
- **3rd / 4th Engineer** — вспомогательные механизмы, насосы, сепараторы.
- **ETO (Electro-Technical Officer, электромеханик)** — электрика и автоматика.
- **Motorman / Oiler / Wiper** — рядовой машинный состав.
- **Fitter** — судовой слесарь/сварщик.

## Камбуз и сервис (Catering)

- **Chief Cook / Cook (Повар)** — питание экипажа, «половина успеха рейса».
- **Messman / Steward** — помощь на камбузе, уборка, сервировка.

## Как расти

Палуба: OS → AB → боцман → (с дипломом) 3rd → 2nd → Chief Officer → Master. Машина: wiper/motorman → 4th → 3rd → 2nd → Chief Engineer. Каждый следующий шаг требует ценза (морского стажа) и, для офицеров, диплома.

Знаете, куда хотите расти? Найдите вакансию под свой ранг на **seajobs.pro** — фильтр по должности показывает подходящие контракты сразу.$ru$,
  'en', $en$Master, C/O, AB, OS, ETO, oiler — to a newcomer these abbreviations look like code. Here is the crew laid out clearly, so you understand who does what and where to grow.

## Deck department

- **Master** — the top authority on the ship, full responsibility for everything.
- **Chief Officer / Chief Mate** — cargo, stability, deck crew; the captain's deputy.
- **2nd Officer** — navigation, charts, ECDIS.
- **3rd Officer** — life-saving and fire-fighting appliances, watchkeeping.
- **Bosun** — the senior over the deck ratings, the deck "foreman".
- **AB (Able Seaman)** — a qualified rating, helm watch, deck work.
- **OS (Ordinary Seaman)** — the entry-level deck position.

## Engine department

- **Chief Engineer** — the "captain of the engine", responsible for all machinery.
- **2nd Engineer** — the main engine and key systems, the practical head of the engine room.
- **3rd / 4th Engineer** — auxiliary machinery, pumps, separators.
- **ETO (Electro-Technical Officer)** — electrics and automation.
- **Motorman / Oiler / Wiper** — engine ratings.
- **Fitter** — the ship's mechanic/welder.

## Galley and service

- **Chief Cook / Cook** — feeds the crew, "half the success of a voyage".
- **Messman / Steward** — galley help, cleaning, serving.

## How to grow

Deck: OS → AB → bosun → (with a CoC) 3rd → 2nd → Chief Officer → Master. Engine: wiper/motorman → 4th → 3rd → 2nd → Chief Engineer. Each step up requires sea time and, for officers, a CoC.

Know where you want to grow? Find a vacancy for your rank on **seajobs.pro** — the rank filter shows matching contracts right away.$en$)
WHERE title->>'ru' = 'Кто есть кто на судне: ранги и должности экипажа простыми словами (AB, OS, боцман, ETO)';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$«А если меня будет укачивать?» — страх номер один у новичков. Хорошая новость: у подавляющего большинства морская болезнь проходит за несколько дней, и её можно пережить. Разберём без паники.

## Почему укачивает

Мозг получает противоречивые сигналы: вестибулярный аппарат чувствует качку, а глаза (например, в каюте) — нет. Этот конфликт и вызывает тошноту, слабость, холодный пот. Это не слабость характера, это физиология.

## Хорошая новость про адаптацию

У большинства людей организм адаптируется за 2–4 дня («морские ноги»). После этого качка почти не мешает. Есть редкие исключения, кому море не подходит совсем, но это меньшинство.

## Что реально помогает в первые дни

- **Смотрите на горизонт**, будьте на палубе на свежем воздухе — глаза и вестибулярный аппарат «договариваются».
- **Держитесь ближе к центру судна** и к ватерлинии — там качает меньше всего.
- **Ешьте понемногу**, простую пищу; сухари, крекеры, имбирь помогают многим.
- **Пейте воду**, избегайте алкоголя и жирного.
- **Занимайте себя работой** — вахта и дело отвлекают лучше, чем лежание в каюте.
- **Медикаменты** (таблетки от укачивания, пластыри со скополамином) — по инструкции и лучше заранее, до появления симптомов. Учтите: некоторые вызывают сонливость.

## Чего не делать

- Не залегать в тёмной каюте, уткнувшись в телефон, — станет хуже.
- Не голодать (пустой желудок переносит качку хуже).
- Не паниковать: это временно.

## Стоит ли из-за этого бояться идти в море

Нет. Многие капитаны и старпомы в первые рейсы страдали от укачивания. Организм привыкает, а профессия остаётся с вами на всю жизнь.

Готовы попробовать море по-настоящему? Первые вакансии, в том числе для новичков, ищите на **seajobs.pro**.$ru$,
  'en', $en$"What if I get seasick?" is the number-one fear of newcomers. The good news: for the vast majority seasickness passes within a few days and is survivable. Let's break it down without panic.

## Why it happens

The brain gets conflicting signals: the inner ear feels the motion, but the eyes (say, in a cabin) do not. That conflict causes nausea, weakness and cold sweat. It is not weakness of character — it is physiology.

## The good news about adaptation

Most people's bodies adapt in 2–4 days ("sea legs"). After that the motion barely bothers you. There are rare exceptions for whom the sea does not suit at all, but they are a minority.

## What actually helps in the first days

- **Look at the horizon**, stay on deck in fresh air — the eyes and inner ear "reach agreement".
- **Stay near the middle of the ship** and close to the waterline — the motion is smallest there.
- **Eat small amounts** of plain food; dry crackers and ginger help many people.
- **Drink water**, avoid alcohol and greasy food.
- **Keep busy with work** — a watch and a task distract better than lying in the cabin.
- **Medication** (motion-sickness tablets, scopolamine patches) — per instructions and ideally before symptoms start. Note: some cause drowsiness.

## What not to do

- Don't hole up in a dark cabin staring at your phone — it gets worse.
- Don't starve (an empty stomach handles motion worse).
- Don't panic: it is temporary.

## Should this fear keep you off the sea

No. Many captains and chief officers were seasick on their first voyages. The body adapts, and the profession stays with you for life.

Ready to really try the sea? Find first-timer vacancies too on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Морская болезнь: почему укачивает, пройдёт ли это и что реально помогает';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Морской трудовой контракт (Seafarer's Employment Agreement, SEA) — это документ, который определяет всё: зарплату, длину рейса, что вам должны и что вы должны. Подписывать его «не читая» — классическая дорогая ошибка. Вот на что смотреть.

## Ключевые пункты, которые обязаны быть

- **Стороны договора.** Кто работодатель — судовладелец или крюинг? Название, реквизиты.
- **Судно и должность.** Название/тип судна, ваш ранг.
- **Зарплата.** Базовая ставка, овертайм, надбавки, валюта, дата выплаты, кому и как переводят.
- **Срок контракта.** Длительность и допуск (например, 4 месяца ± 1). Смотрите, как оформляется продление.
- **Рабочее время и отдых.** Должны соответствовать MLC 2006.
- **Отпускные (leave pay).** Начисляются ли за каждый месяц.
- **Репатриация.** Кто и в каких случаях оплачивает дорогу домой.
- **Медицина и страхование.** Покрытие болезни/травмы, компенсации.

## На что смотреть особенно внимательно

- **Овертайм: fixed или по часам?** «Гарантированный» овертайм уже включён в цифру или доплачивается сверху?
- **Что входит в «зарплату» в объявлении** — gross или net, с овертаймом или без. Разница бывает огромной.
- **Условия досрочного списания** — что будет с оплатой, если рейс прервут.
- **Штрафы и удержания** — за что могут вычесть.
- **Коллективный договор (CBA/ITF).** Если судно под ITF-договором — это дополнительная защита.

## Красные флаги

- Контракт только устно «на словах», без подписанного документа.
- Отказ дать текст SEA до посадки.
- Пункты, противоречащие MLC (например, плата за трудоустройство).
- Разница между тем, что обещал менеджер, и тем, что в бумаге.

## Практика

Читайте контракт целиком до подписания. Непонятное — спрашивайте у менеджера письменно. Сохраняйте свою копию. Помните: по MLC вам обязаны дать понятный экземпляр SEA.

Ищите контракты от проверенных судовладельцев с прозрачными условиями на **seajobs.pro**.$ru$,
  'en', $en$A Seafarer's Employment Agreement (SEA) defines everything: pay, voyage length, what you are owed and what you owe. Signing it "without reading" is a classic, expensive mistake. Here is what to check.

## Key clauses that must be present

- **Parties.** Who is the employer — the owner or the crewing agency? Name and details.
- **Vessel and rank.** Vessel name/type, your rank.
- **Wages.** Base rate, overtime, allowances, currency, pay date, how and to whom it is transferred.
- **Contract length.** Duration and tolerance (e.g. 4 months ± 1). Check how extensions are handled.
- **Hours of work and rest.** Must comply with MLC 2006.
- **Leave pay.** Whether it accrues for each month.
- **Repatriation.** Who pays for the trip home, and in which cases.
- **Medical and insurance.** Cover for illness/injury and compensation.

## What to watch especially closely

- **Overtime: fixed or hourly?** Is "guaranteed" overtime already inside the figure, or paid on top?
- **What the advertised "salary" includes** — gross or net, with or without overtime. The difference can be huge.
- **Early sign-off terms** — what happens to your pay if the voyage is cut short.
- **Fines and deductions** — what can be taken off.
- **Collective agreement (CBA/ITF).** An ITF-covered ship gives you extra protection.

## Warning signs

- A contract agreed only verbally, with no signed document.
- Refusal to show you the SEA text before boarding.
- Clauses that conflict with MLC (for example, a fee for employment).
- A gap between what the manager promised and what is on paper.

## In practice

Read the whole contract before signing. Ask about anything unclear in writing. Keep your own copy. Remember: under MLC you are entitled to a clear copy of the SEA.

Find contracts from verified owners with transparent terms on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Как читать морской контракт (SEA): на что смотреть, чтобы вас не обманули';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Матросу не нужен идеальный английский — нужен рабочий. Достаточно уверенно понимать команды и докладывать. Разберём базу, которую спрашивают чаще всего.

## На палубе (deck work)

- **Deck** — палуба. **On deck** — на палубе.
- **Rope / line** — трос, конец. **Wire** — стальной трос.
- **Winch** — лебёдка. **Windlass** — брашпиль (для якоря).
- **Hatch** — люк (грузовой). **Hatch cover** — крышка трюма.
- **Chipping and painting** — обивка ржавчины и покраска (главная работа матроса).
- **Lashing** — крепление груза. **To lash** — крепить.

## Швартовка (mooring)

- **Fore / forward** — нос. **Aft** — корма. **Amidships** — середина.
- **Heaving line** — бросательный конец (лёгкий, с грузиком).
- **Make fast** — закрепить (швартов). **Let go** — отдать.
- **Slack away** — потравить (ослабить). **Heave up / heave in** — выбирать.
- **Fender** — кранец.

## Команды на руле (helm) — отвечай повторяя

- **Midships** — прямо руль. Ответ: "Midships".
- **Port five / ten / twenty** — лево 5/10/20.
- **Starboard five / ten** — право 5/10.
- **Steady** — так держать. **Steady as she goes** — держать текущий курс.

Важное правило: **всегда повторяй команду вслух** (repeat back), выполни, потом доложи. Это стандарт безопасности, а не вежливость.

## Мини-диалог

> Officer: "Port ten."
> AB: "Port ten." (крутишь) "Ten of port wheel on."
> Officer: "Steady."
> AB: "Steady... Course one-eight-five."

Хотите проверить английский в деле? Ищите вакансии для матросов на **seajobs.pro** — там же видно требования к языку в каждом объявлении.$ru$,
  'en', $en$A deck rating does not need perfect English — just working English. It is enough to understand orders confidently and report back. Here is the base that is asked about most often.

## On deck

- **Deck / on deck** — the working surface of the ship.
- **Rope / line** — a fibre rope; **wire** — a steel rope.
- **Winch** — for mooring lines; **windlass** — for the anchor.
- **Hatch / hatch cover** — cargo hold opening and its lid.
- **Chipping and painting** — removing rust and repainting (the rating's main job).
- **Lashing / to lash** — securing cargo.

## Mooring

- **Fore / forward** — the bow; **aft** — the stern; **amidships** — the middle.
- **Heaving line** — the light line thrown ashore first.
- **Make fast** — secure a line; **let go** — release it.
- **Slack away** — pay out/loosen; **heave in** — take up the slack.
- **Fender** — protects the hull alongside.

## Helm orders — always repeat back

- **Midships** — rudder to zero.
- **Port/Starboard five / ten / twenty** — rudder degrees left/right.
- **Steady / steady as she goes** — hold the present heading.

Key rule: **always repeat the order aloud**, carry it out, then report. It is a safety standard, not politeness.

## Mini-dialogue

> Officer: "Port ten."
> AB: "Port ten." (turning) "Ten of port wheel on."
> Officer: "Steady."
> AB: "Steady... Course one-eight-five."

Want to put your English to work? Find deck-rating vacancies on **seajobs.pro** — each ad shows the language level required.$en$)
WHERE title->>'ru' = 'Английский для матросов: палубные работы, швартовка и руль — слова и фразы с разбором';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Штурман говорит по-английски постоянно: сдаёт и принимает вахту, командует рулевым, ведёт радиообмен, докладывает капитану. Собрали рабочий минимум.

## Мостик и вахта (bridge & watch)

- **Bridge** — мостик. **Watch** — вахта. **Watchkeeping** — несение вахты.
- **To take over the watch** — принять вахту. **To hand over** — сдать.
- **Lookout** — впередсмотрящий. **Keep a proper lookout** — вести надлежащее наблюдение.
- **Course** — курс. **Heading** — текущий курс по компасу. **Bearing** — пеленг.
- **Fix / position** — обсервация / место судна.

## Навигация (navigation)

- **Chart** — карта. **ECDIS** — электронная картография.
- **Waypoint** — путевая точка. **Route** — маршрут.
- **To alter course** — изменить курс. **To reduce / increase speed** — снизить / увеличить скорость.
- **Give way** — уступить дорогу. **Stand on** — сохранять курс и скорость (по МППСС/COLREGs).
- **Under keel clearance (UKC)** — запас воды под килем.

## Приём/сдача вахты — что доложить

Курс, скорость, режим управления рулём, движение вокруг (traffic), погода, задачи капитана (Master's standing orders), особые указания. Фраза-шаблон:

> "I have the watch. Course one-two-zero, speed twelve knots, hand steering, two targets on the starboard bow, visibility good."

## Доклад капитану

- **Nothing to report, sir** — без замечаний.
- **A vessel is crossing from starboard, I intend to alter to starboard** — судно пересекает справа, намерен отвернуть вправо.

Готовы к позиции офицера? Смотрите вакансии 2nd/3rd Officer на **seajobs.pro**.$ru$,
  'en', $en$A deck officer speaks English constantly: handing over and taking the watch, conning the helmsman, working the radio, reporting to the Master. Here is the working minimum.

## Bridge & watch

- **Bridge / watch / watchkeeping** — the command position and the duty period.
- **To take over / hand over the watch** — start and end your duty.
- **Lookout** — keep a proper lookout at all times.
- **Course / heading / bearing** — intended track / compass heading / direction to an object.
- **Fix / position** — the ship's determined location.

## Navigation

- **Chart / ECDIS** — paper and electronic charts.
- **Waypoint / route** — points and the planned track.
- **To alter course / reduce / increase speed** — the core manoeuvring verbs.
- **Give way / stand on** — COLREGs terms for who keeps clear.
- **Under keel clearance (UKC)** — water depth below the keel.

## Handover — what to report

Course, speed, steering mode, traffic around, weather, the Master's standing orders, any special instructions. Template:

> "I have the watch. Course one-two-zero, speed twelve knots, hand steering, two targets on the starboard bow, visibility good."

## Reporting to the Master

- **Nothing to report, sir.**
- **A vessel is crossing from starboard; I intend to alter to starboard.**

Ready for an officer position? Browse 2nd/3rd Officer vacancies on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Английский для штурманов: мостик, вахта и навигация — фразы, которые нужны каждый день';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$В машине английский нужен не для красоты, а чтобы понять чек-лист, объяснить поломку суперинтенданту и заказать запчасть. Вот база.

## Машинное отделение (engine room)

- **Main engine (M/E)** — главный двигатель. **Auxiliary engine (A/E) / generator** — вспомогательный двигатель / генератор.
- **Boiler** — котёл. **Purifier / separator** — сепаратор. **Cooler / heat exchanger** — охладитель / теплообменник.
- **Pump** — насос. **Valve** — клапан. **Pipe / line** — трубопровод.
- **Fuel oil (FO) / diesel oil (DO) / lube oil (LO)** — топливо / дизтопливо / масло.

## Инструменты (tools)

- **Spanner / wrench** — ключ гаечный. **Socket** — головка. **Screwdriver** — отвёртка.
- **Hammer** — молоток. **Grinder** — болгарка. **Feeler gauge** — щуп.
- **To tighten / to loosen** — затянуть / ослабить. **To overhaul** — перебрать (провести ремонт).

## Поломки и состояние (troubleshooting)

- **Leak / leakage** — течь. **The pump is leaking** — насос течёт.
- **Overheating** — перегрев. **Vibration** — вибрация. **Alarm** — тревога/сигнал.
- **Spare part** — запчасть. **Worn out** — изношено. **To replace** — заменить.
- **Breakdown / failure** — поломка / отказ.

## Доклад о неисправности — шаблон

> "The number two generator is overheating. The cooling water temperature is high. I suspect the cooler is fouled. Request permission to stop and clean it."

Коротко и по делу — именно так и надо. Ищете контракт механика? Вакансии Chief/2nd/3rd Engineer — на **seajobs.pro**.$ru$,
  'en', $en$In the engine room English is not decoration — you need it to read a checklist, explain a breakdown to the superintendent and order a spare. Here is the base.

## Engine room

- **Main engine (M/E) / auxiliary engine (A/E) / generator** — the core machinery.
- **Boiler / purifier (separator) / cooler (heat exchanger)** — steam, fuel cleaning, cooling.
- **Pump / valve / pipe (line)** — the fluid systems.
- **Fuel oil (FO) / diesel oil (DO) / lube oil (LO)** — the main consumables.

## Tools

- **Spanner (wrench) / socket / screwdriver** — the basics.
- **Hammer / grinder / feeler gauge** — striking, cutting, measuring clearances.
- **To tighten / to loosen / to overhaul** — the key maintenance verbs.

## Troubleshooting

- **Leak / leakage** — "the pump is leaking".
- **Overheating / vibration / alarm** — the words for abnormal conditions.
- **Spare part / worn out / to replace** — parts and wear.
- **Breakdown / failure** — a stoppage.

## Reporting a fault — template

> "The number two generator is overheating. The cooling water temperature is high. I suspect the cooler is fouled. Request permission to stop and clean it."

Short and to the point is exactly right. Looking for an engine contract? Chief/2nd/3rd Engineer vacancies are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Английский для механиков: машинное отделение, инструменты и поломки — словарь с пояснениями';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Повар и стюард общаются с многонациональным экипажем, принимают провизию в порту и ведут учёт. Английский здесь очень практичный.

## Камбуз (galley)

- **Galley** — камбуз. **Mess room** — столовая. **Pantry** — буфетная.
- **Stove / oven** — плита / духовка. **Fridge / freezer** — холодильник / морозильник.
- **Provisions / stores** — провизия / запасы. **Dry stores** — сухие продукты.

## Продукты (food)

- **Meat / poultry / fish** — мясо / птица / рыба.
- **Vegetables / fruit** — овощи / фрукты. **Dairy** — молочное.
- **Flour / rice / pasta** — мука / рис / макароны.
- **Fresh / frozen / canned** — свежий / замороженный / консервированный.

## Приёмка провизии (taking provisions)

- **Delivery / supply** — поставка. **Order list / requisition** — заявка.
- **Quantity / weight** — количество / вес. **Expiry date** — срок годности.
- **To check / to sign for** — проверить / расписаться за.
- **Shortage** — недостача. **The delivery is short by five kilos** — недовес пять кг.

## Меню и диеты (menu & diets)

- **Breakfast / lunch / dinner / supper** — завтрак / обед / ужин.
- **Halal / vegetarian / no pork** — халяль / вегетарианское / без свинины (важно для смешанного экипажа!).
- **Portion / serving** — порция.

## Фраза дня

> "Today's lunch: chicken soup, beef with rice, and a vegetarian option. Dinner at eighteen hundred."

Хороший кок ценится на вес золота. Вакансии Cook / Chief Cook / Steward — на **seajobs.pro**.$ru$,
  'en', $en$The cook and steward deal with a multinational crew, take provisions in port and keep records. The English here is very practical.

## Galley

- **Galley / mess room / pantry** — where food is cooked, eaten and stored.
- **Stove / oven / fridge / freezer** — the main equipment.
- **Provisions / stores / dry stores** — the food supplies.

## Food

- **Meat / poultry / fish** — the proteins.
- **Vegetables / fruit / dairy** — the fresh groups.
- **Flour / rice / pasta** — the staples.
- **Fresh / frozen / canned** — the three storage states.

## Taking provisions

- **Delivery / supply / order list (requisition)** — the paperwork.
- **Quantity / weight / expiry date** — what you check.
- **To check / to sign for** — the receiving verbs.
- **Shortage** — "the delivery is short by five kilos".

## Menu & diets

- **Breakfast / lunch / dinner / supper** — the meals.
- **Halal / vegetarian / no pork** — essential for a mixed crew.
- **Portion / serving** — the amount per person.

## Phrase of the day

> "Today's lunch: chicken soup, beef with rice, and a vegetarian option. Dinner at eighteen hundred."

A good cook is worth their weight in gold. Cook / Chief Cook / Steward vacancies are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Английский для повара и стюарда: камбуз, провизия и меню — нужные слова и фразы';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Собеседование с судовладельцем часто идёт на английском по Skype. Разберём частые вопросы и готовые ответы-шаблоны — выучите их, и половина стресса уйдёт.

## О себе и опыте

- **"Tell me about yourself."** — Расскажите о себе.

> "My name is Ivan. I am an Able Seaman with four years of experience, mostly on bulk carriers and general cargo vessels."

- **"What was your last vessel?"** — Какое было последнее судно?

> "My last vessel was a 25,000 DWT bulk carrier under Panama flag. I worked as AB for four months."

## О документах

- **"Are your documents valid?"** — Документы действующие?

> "Yes. My CoC, STCW certificates and medical are all valid. My US C1/D visa is valid until 2028."

## Профессиональные / ситуационные

- **"What would you do in case of fire?"** — Что сделаете при пожаре?

> "I would raise the alarm, report to the bridge, and act according to the muster list and the vessel's procedures."

- **"Why did you leave your last company?"** — Почему ушли?

> "My contract finished and I was looking for a different vessel type." (никогда не ругайте прошлого капитана!)

## Если не поняли вопрос — это нормально

- **"Could you repeat that, please?"** — Повторите, пожалуйста.
- **"Sorry, could you speak a bit slower?"** — Можно чуть медленнее?

## Три правила

1. Говорите **медленно и понятно**, а не быстро и красиво.
2. Отвечайте **конкретно**: тип судна, срок, должность.
3. Никогда не врите на технических вопросах — это проверяется на борту в первый день.

Готовы пройти интервью? Актуальные вакансии от судовладельцев — на **seajobs.pro**.$ru$,
  'en', $en$The interview with an owner is often held in English over Skype. Here are the frequent questions with ready-made answer templates — learn them and half the stress disappears.

## About you and your experience

- **"Tell me about yourself."**

> "My name is Ivan. I am an Able Seaman with four years of experience, mostly on bulk carriers and general cargo vessels."

- **"What was your last vessel?"**

> "My last vessel was a 25,000 DWT bulk carrier under Panama flag. I worked as AB for four months."

## About documents

- **"Are your documents valid?"**

> "Yes. My CoC, STCW certificates and medical are all valid. My US C1/D visa is valid until 2028."

## Professional / situational

- **"What would you do in case of fire?"**

> "I would raise the alarm, report to the bridge, and act according to the muster list and the vessel's procedures."

- **"Why did you leave your last company?"**

> "My contract finished and I was looking for a different vessel type." (never criticise a former captain!)

## If you don't understand — that's fine

- **"Could you repeat that, please?"**
- **"Sorry, could you speak a bit slower?"**

## Three rules

1. Speak **slowly and clearly**, not fast and fancy.
2. Answer **specifically**: vessel type, duration, rank.
3. Never lie on technical questions — it is checked on board on day one.

Ready to interview? Current owner vacancies are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Собеседование на английском: типичные вопросы крюинга и как отвечать (с примерами)';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Это не «разговорный» английский, а стандартные морские команды (IMO SMCP). Они одинаковы во всём мире — выучите их дословно, импровизировать здесь нельзя.

## Команды на руль (helm / wheel orders)

- **Midships** — прямо руль (0°).
- **Port five / ten / fifteen / twenty** — лево 5/10/15/20°.
- **Starboard five / ten / fifteen / twenty** — право 5/10/15/20°.
- **Hard-a-port / Hard-a-starboard** — лево / право на борт (максимум).
- **Ease to five / ten** — уменьшить перекладку до 5/10°.
- **Steady** — одерживать. **Steady as she goes** — держать курс, каким идём.
- **Meet her** — одерживать поворот.

Рулевой **всегда повторяет команду**, выполняет и докладывает: "Port ten, ten of port wheel on."

## Команды курса

- **Steer one-eight-five** — держать курс 185. (цифры по одной: "one-eight-five", не "one hundred eighty-five").

## Команды в машину (engine orders — телеграф)

- **Full ahead / Half ahead / Slow ahead / Dead slow ahead** — полный / средний / малый / самый малый вперёд.
- **Stop engine** — стоп машина.
- **Dead slow astern / Slow astern / Half astern / Full astern** — назад с той же градацией.
- **Finished with engines (F.W.E.)** — машина больше не нужна.

## Почему это критично

Одинаковые слова = ноль недопонимания в стрессовой ситуации при маневрировании или швартовке. Ошибка в команде руля может стоить очень дорого.

Прокачиваете вахтенные навыки? Вакансии для рулевых и офицеров — на **seajobs.pro**.$ru$,
  'en', $en$This is not "conversational" English but standard marine orders (IMO SMCP). They are identical worldwide — learn them word for word; improvisation is not allowed here.

## Helm / wheel orders

- **Midships** — rudder to 0°.
- **Port / Starboard five / ten / fifteen / twenty** — rudder degrees.
- **Hard-a-port / Hard-a-starboard** — full rudder.
- **Ease to five / ten** — reduce the rudder angle.
- **Steady / steady as she goes** — hold the heading.
- **Meet her** — check the swing.

The helmsman **always repeats** the order, acts, and reports: "Port ten, ten of port wheel on."

## Course orders

- **Steer one-eight-five** — steer 185. (digits one by one: "one-eight-five", not "one hundred eighty-five").

## Engine orders (telegraph)

- **Full / Half / Slow / Dead slow ahead** — the ahead steps.
- **Stop engine.**
- **Dead slow / Slow / Half / Full astern** — the astern steps.
- **Finished with engines (F.W.E.)** — the engine is no longer needed.

## Why it is critical

Identical words = zero misunderstanding in the stress of manoeuvring or mooring. A wrong helm order can be very costly.

Building your watchkeeping skills? Helmsman and officer vacancies are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Команды на руле и в машину (SMCP): стандартные фразы, которые обязан знать каждый';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Радиообмен идёт по строгим правилам, чтобы всех поняли даже при плохой слышимости. Разберём служебные слова (procedure words) и сигналы бедствия.

## Служебные слова (procedure words)

- **Over** — приём (я закончил, жду ответа).
- **Out** — конец связи (ответа не жду). Никогда не говорят "over and out".
- **Roger** — принято, понял.
- **Copy / Copied** — принял (информацию).
- **Say again** — повторите (НЕ "repeat" — у "repeat" другое значение).
- **Stand by** — ждите на связи.
- **Affirmative / Negative** — да / нет.
- **This is...** — вас вызывает... (называешь судно).

## Три уровня срочности

- **Mayday** — сигнал бедствия, угроза жизни / судну. Повторяется три раза.
- **Pan-Pan** — срочность (проблема, но пока не бедствие).
- **Sécurité** (сэкюритэ) — безопасность (навигационное / метео предупреждение).

## Фонетический алфавит (обязательно знать)

Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.

## Пример вызова

> "Port Control, Port Control, this is motor vessel Neptune, Neptune, over."
> "Motor vessel Neptune, this is Port Control, go ahead, over."
> "Port Control, request permission to enter, my ETA is one-four-three-zero, over."

## Пример Mayday

> "Mayday, Mayday, Mayday. This is Neptune, Neptune, Neptune. Position six-zero degrees north... We have a fire on board, require immediate assistance. Over."

Учите радиообмен — это спасает жизни. Вакансии для моряков всех рангов — на **seajobs.pro**.$ru$,
  'en', $en$Radio traffic follows strict rules so that everyone is understood even with poor reception. Here are the procedure words and distress signals.

## Procedure words

- **Over** — I have finished and expect a reply.
- **Out** — end of contact, no reply expected. Never say "over and out".
- **Roger** — received and understood.
- **Copy / Copied** — I received the information.
- **Say again** — please repeat (NOT "repeat" — that word means something else).
- **Stand by** — wait on the channel.
- **Affirmative / Negative** — yes / no.
- **This is...** — used to identify the calling station.

## Three levels of urgency

- **Mayday** — distress, grave and imminent danger. Spoken three times.
- **Pan-Pan** — urgency (a problem, but not yet distress).
- **Sécurité** — safety (navigational or weather warning).

## Phonetic alphabet (must know)

Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.

## Example call

> "Port Control, Port Control, this is motor vessel Neptune, Neptune, over."
> "Motor vessel Neptune, this is Port Control, go ahead, over."
> "Port Control, request permission to enter, my ETA is one-four-three-zero, over."

## Example Mayday

> "Mayday, Mayday, Mayday. This is Neptune, Neptune, Neptune. Position six-zero degrees north... We have a fire on board, require immediate assistance. Over."

Learn radio work — it saves lives. Vacancies for all ranks are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'VHF-радиообмен на английском: procedure words и фразы (Mayday, Pan-Pan, Over, Roger)';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Швартовка — момент, где недопонимание опасно для рук и ног. Команды короткие и стандартные. Учим.

## Швартовы (mooring lines)

- **Headline** — продольный носовой. **Stern line** — продольный кормовой.
- **Spring** — шпринг (не даёт двигаться вперёд/назад).
- **Breast line** — прижимной.
- **Fore / aft station** — носовой / кормовой пост швартовки.

## Команды (commands) — с мостика на баки

- **Send the heaving line** — подать бросательный.
- **Send one headline / two springs** — подать один носовой / два шпринга.
- **Slack away the headline** — потравить носовой.
- **Heave in / heave away** — выбирать.
- **Hold on** — задержать (стоп травить/выбирать).
- **Make fast** — закрепить. **All fast fore and aft** — всё закреплено нос и корма.
- **Let go** — отдать. **Let go everything** — отдать всё.
- **Stand by fore and aft** — приготовиться на баке и корме.

## Отчёт с поста на мостик

- **Ready fore and aft** — готово на баке и корме.
- **All lines are fast** — все концы закреплены.
- **All clear** — всё чисто (концы в воде убраны от винта).

## Безопасность (важно!)

- **Snap-back zone** — опасная зона отскока лопнувшего троса. Никогда не стой в ней.
- **Mind your hands / mind the line** — берегите руки / следите за концом.

## Мини-диалог

> Bridge: "Fore station, send one headline and one spring."
> Fore: "One headline and one spring, roger." ... "Headline is fast."

Опытный швартовщик — ценный член команды. Вакансии для матросов и боцманов — на **seajobs.pro**.$ru$,
  'en', $en$Mooring is the moment where a misunderstanding is dangerous for hands and legs. The commands are short and standard. Let's learn them.

## Mooring lines

- **Headline / stern line** — the fore-and-aft lines.
- **Spring** — stops the ship moving ahead/astern.
- **Breast line** — holds the ship in alongside.
- **Fore / aft station** — the forward and after mooring positions.

## Commands — bridge to stations

- **Send the heaving line** — throw the light line ashore.
- **Send one headline / two springs** — pass specific lines.
- **Slack away the headline** — pay out.
- **Heave in / heave away** — take up.
- **Hold on** — stop and hold.
- **Make fast / all fast fore and aft** — secured everywhere.
- **Let go / let go everything** — release the lines.
- **Stand by fore and aft** — be ready at both stations.

## Report — station to bridge

- **Ready fore and aft.**
- **All lines are fast.**
- **All clear** — lines are clear of the propeller.

## Safety (important!)

- **Snap-back zone** — where a parted line whips back. Never stand in it.
- **Mind your hands / mind the line** — watch out.

## Mini-dialogue

> Bridge: "Fore station, send one headline and one spring."
> Fore: "One headline and one spring, roger." ... "Headline is fast."

An experienced mooring hand is a valued crew member. Deck-rating and bosun vacancies are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Швартовные команды на английском: слова и фразы для бака и кормы';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Погрузка, выгрузка и бункеровка — это работа с терминалом, сюрвейером и баржой, часто на английском. Собрали ключевое.

## Грузовые операции (cargo operations)

- **To load / to discharge** — грузить / выгружать.
- **Cargo hold** — трюм. **Tank** — танк (на танкере).
- **Loading rate** — темп погрузки. **To start / stop loading** — начать / остановить погрузку.
- **Draft / draught** — осадка. **Trim** — дифферент. **List** — крен.
- **Ballast / deballast** — принимать / откачивать балласт.
- **Stevedore** — докер. **Surveyor** — сюрвейер. **Tally** — счёт мест груза.
- **Lashing / securing** — крепление груза.

## Документы груза

- **Bill of lading (B/L)** — коносамент. **Manifest** — грузовой манифест.
- **Stowage plan** — план размещения груза.

## Бункеровка (bunkering)

- **Bunker / bunkering** — топливо / приём топлива.
- **Barge** — бункеровочная баржа. **Hose** — шланг. **Manifold** — приёмный коллектор.
- **Connect / disconnect the hose** — присоединить / отсоединить шланг.
- **Start / stop pumping** — начать / прекратить перекачку.
- **Sounding** — замер уровня в танке. **Overflow / spill** — перелив / разлив (авария!).
- **SOPEP** — судовой план ликвидации разливов нефти.

## Фраза для бункеровки

> "Stand by to start bunkering. Agreed rate two hundred cubic metres per hour. Emergency stop signal: three long blasts. Confirm, please."

Знание процедур на английском ценят на каждом судне. Вакансии на танкеры, балкеры и контейнеровозы — на **seajobs.pro**.$ru$,
  'en', $en$Loading, discharging and bunkering mean working with the terminal, the surveyor and the barge, often in English. Here are the essentials.

## Cargo operations

- **To load / to discharge** — the two core verbs.
- **Cargo hold / tank** — where cargo goes on dry ships / tankers.
- **Loading rate / to start / stop loading** — controlling the flow.
- **Draft (draught) / trim / list** — how the ship sits in the water.
- **Ballast / deballast** — adjusting stability.
- **Stevedore / surveyor / tally** — the shore people and cargo count.
- **Lashing / securing** — holding cargo in place.

## Cargo documents

- **Bill of lading (B/L) / manifest** — the cargo paperwork.
- **Stowage plan** — where each cargo is placed.

## Bunkering

- **Bunker / bunkering** — the fuel and the operation.
- **Barge / hose / manifold** — the transfer equipment.
- **Connect / disconnect the hose** — the connection verbs.
- **Start / stop pumping** — controlling the transfer.
- **Sounding / overflow (spill)** — measuring level / a pollution emergency.
- **SOPEP** — the ship's oil pollution emergency plan.

## Bunkering phrase

> "Stand by to start bunkering. Agreed rate two hundred cubic metres per hour. Emergency stop signal: three long blasts. Confirm, please."

Knowing the procedures in English is valued on every ship. Tanker, bulker and container vacancies are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Грузовые операции и бункеровка на английском: словарь и фразы для палубы и машины';

UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$В аварии нет времени подбирать слова. Эти термины и команды нужно знать на автомате — от них зависит жизнь.

## Тревоги (alarms) и сигналы

- **General alarm** — общесудовая тревога (семь коротких + один длинный сигнал).
- **Fire alarm** — пожарная тревога. **Abandon ship** — оставление судна.
- **Man overboard (MOB)** — человек за бортом.
- **Muster** — сбор по тревоге. **Muster station / muster list** — место сбора / расписание по тревогам.

## Учения (drills)

- **Fire drill** — учебная пожарная тревога. **Boat drill / abandon ship drill** — шлюпочная тревога.
- **Head count** — перекличка (все ли на месте).
- **This is a drill** — это учение (важно объявлять, чтобы не было паники).

## Команды и доклады

- **Raise the alarm** — поднять тревогу.
- **Report to your muster station** — прибыть на место сбора.
- **All crew accounted for** — весь экипаж на месте.
- **Fight the fire / boundary cooling** — тушить пожар / охлаждать переборки.
- **Is anyone injured?** — есть пострадавшие?

## Спасательное оборудование (LSA/FFA)

- **Lifejacket** — спасжилет. **Immersion suit** — гидрокостюм. **Lifeboat / liferaft** — шлюпка / плот.
- **EPIRB** — аварийный радиобуй. **Fire extinguisher** — огнетушитель. **Fire hose** — пожарный рукав.
- **Breathing apparatus (SCBA)** — дыхательный аппарат.

## Фраза, которую нельзя перепутать

> "Attention all crew. Fire in the engine room. This is NOT a drill. Report to your muster stations."

Безопасность — общий язык моряков всего мира. Вакансии от судовладельцев, которые серьёзно относятся к безопасности, — на **seajobs.pro**.$ru$,
  'en', $en$In an emergency there is no time to search for words. These terms and commands must be automatic — lives depend on them.

## Alarms and signals

- **General alarm** — seven short blasts plus one long.
- **Fire alarm / abandon ship** — the two most serious.
- **Man overboard (MOB).**
- **Muster / muster station / muster list** — the assembly and who goes where.

## Drills

- **Fire drill / boat drill (abandon ship drill)** — the routine exercises.
- **Head count** — checking everyone is present.
- **This is a drill** — always announced to avoid panic.

## Commands and reports

- **Raise the alarm.**
- **Report to your muster station.**
- **All crew accounted for.**
- **Fight the fire / boundary cooling.**
- **Is anyone injured?**

## Life-saving and fire-fighting appliances

- **Lifejacket / immersion suit / lifeboat / liferaft** — survival gear.
- **EPIRB / fire extinguisher / fire hose** — locating and fighting.
- **Breathing apparatus (SCBA)** — for smoke and enclosed spaces.

## The phrase you must not confuse

> "Attention all crew. Fire in the engine room. This is NOT a drill. Report to your muster stations."

Safety is the common language of seafarers everywhere. Vacancies from owners who take safety seriously are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Аварийный английский: тревоги, учения и команды в чрезвычайной ситуации';

