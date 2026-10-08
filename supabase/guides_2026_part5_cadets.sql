-- Cadet guides (category = 'guide'), written for the searches Search Console
-- shows the site already appears for: "deck cadet вакансии", "engine cadet
-- вакансии", "машинный кадет вакансии", "кадет вакансии", "electrical cadet
-- jobs", "lng deck cadet vacancies".
--
-- ru + ua + en. Links inside each body point at the page in the same language
-- (/ru/…, /ua/…, unprefixed for English). pl/ro fall back to English, as the
-- earlier guides do, until translated.
--
-- Each INSERT is idempotent — guarded by the English title. Body is the site's
-- markdown subset: "## " headings, "- "/"1. " lists, **bold**, [text](url).
-- Run once in the Supabase SQL Editor.

-- ── 21. Deck cadet ───────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Deck cadet jobs: how to find your first ship and what crewing agencies check',
    'ru', 'Вакансии палубного кадета (Deck Cadet): как найти первый рейс',
    'ua', 'Вакансії палубного кадета (Deck Cadet): як знайти перший рейс'),
  jsonb_build_object(
    'en', $en$A deck cadet is a future navigating officer doing the sea service that a certificate of competency requires. It is the hardest contract of a career to get — every crewing agency wants experience, and a cadet has none — but it is also the one that opens every other door. Here is what the job is, what you need, and where to look.

## What a deck cadet does on board

A deck cadet works under the Chief Officer and keeps bridge watches alongside an officer of the watch. In practice that means:

- **Bridge watchkeeping** under supervision — lookout, position fixing, the radar and ECDIS, the logbook.
- **Cargo work** — loading and discharging under the Chief Officer, draft surveys, hold and tank inspections.
- **Maintenance** with the deck crew — mooring equipment, life-saving and fire-fighting gear.
- **The Training Record Book** — every task you complete is signed off by an officer. Without a properly filled book the sea time may not count towards your certificate.

## How much sea time you need

Under STCW (regulation II/1), a deck officer of the watch needs **at least 12 months of approved seagoing service** as part of an approved training programme with onboard training recorded in a training record book — or 36 months without such a programme. At least six months of that must be bridge watchkeeping under supervision. In practice that is one or two cadet contracts.

## Documents crewing agencies ask for

- A valid **passport** and **seaman's book**.
- A **seafarer medical certificate** — check colour vision early: it is decisive for deck officers.
- **STCW basic training**: personal survival, fire prevention and fire fighting, elementary first aid, personal safety and social responsibilities; plus security awareness.
- A **referral letter from your maritime academy or college** — many companies only take cadets sent by a school.
- **English** — at least enough for a short interview; many agencies test it (Marlins or a similar test).

## Where to find a deck cadet vacancy

1. **Cadet programmes of shipowners and managers.** Large companies run their own intakes, often through maritime academies — these are the most reliable route and usually lead to a junior officer contract.
2. **Crewing agencies.** Send your CV with the word "cadet" in the subject and your school, year and English level in the first lines.
3. **Job boards.** Current offers are collected on the [deck cadet vacancies page](/jobs/rank/deck-cadet), with the vessel type, contract length and stipend.

## A CV that gets a cadet noticed

With no sea service, the CV has to sell everything else: the academy and course, practical training and simulator hours, every STCW course with its number and expiry date, English level, and any work that shows you are reliable. Keep it to one page. You can [build it from your profile](/maritime-cv) and send it in the format agencies expect.

## Questions at the cadet interview

A crewing interview for a cadet is short, usually in English, and checks attitude as much as knowledge. Be ready for:

1. **"Tell us about yourself."** School, year, practical training, why the sea — one minute, no more.
2. **"What are the duties of a lookout?"** And the basics of COLREG: who gives way, lights and shapes, sound signals.
3. **"What do you do if you hear 'man overboard'?"** Raise the alarm, throw a lifebuoy, keep the person in sight, inform the bridge.
4. **"Which STCW courses do you have, and until when are they valid?"** Know your own documents by heart.
5. **"Why our company?"** Read about the fleet before the call.

Speak slowly and honestly — saying "I have not done that yet, but I know the procedure is…" is far better than inventing experience.

## Never pay for a place

A cadet is the easiest person to deceive: they want the first contract badly and do not yet know how hiring works. **No legitimate company charges a seafarer for a job** — not for a "place in the programme", not for "processing", not for a visa. Courses and the medical are paid to a training centre or a clinic, never to whoever promises the contract.

When your documents are ready, look through the [deck cadet vacancies](/jobs/rank/deck-cadet) and apply directly — the CV goes straight to the crewing manager.$en$,
    'ru', $ru$Палубный кадет — будущий штурман, который набирает морской стаж для получения диплома. Это самый трудный контракт в карьере: крюинги хотят опыт, а у кадета его нет. Но именно он открывает все остальные двери. Разберём, что это за работа, что нужно и где искать вакансии.

## Чем занимается палубный кадет

Палубный кадет подчиняется старшему помощнику и несёт ходовую вахту вместе с вахтенным помощником. На практике это:

- **Вахта на мостике** под контролем — впередсмотрящий, определение места, радар и ECDIS, судовой журнал.
- **Грузовые операции** — погрузка и выгрузка под руководством старпома, драфт-сюрвей, осмотр трюмов и танков.
- **Работы с палубной командой** — швартовное оборудование, спасательные и противопожарные средства.
- **Training Record Book (книжка практики)** — каждое выполненное задание подписывает офицер. Без правильно заполненной книжки стаж могут не засчитать для диплома.

## Сколько стажа нужно

По конвенции ПДНВ (STCW, правило II/1) для диплома вахтенного помощника нужно **не меньше 12 месяцев морского стажа** в рамках одобренной программы подготовки с практикой, записанной в книжку, — или 36 месяцев без такой программы. Из них не меньше шести месяцев — несение ходовой вахты под наблюдением. Обычно это один-два кадетских контракта.

## Какие документы спрашивает крюинг

- Действующий **паспорт** и **мореходная (послужная) книжка**.
- **Медицинский сертификат моряка** — проверьте цветоощущение заранее: для штурмана это решающий пункт.
- **Базовая подготовка по STCW**: выживание, борьба с пожаром, первая помощь, личная безопасность; плюс курс по охране (security awareness).
- **Направление от морской академии или колледжа** — многие компании берут кадетов только от учебных заведений.
- **Английский** — хотя бы на короткое собеседование; многие крюинги проводят тест (Marlins или аналог).

## Где искать вакансию палубного кадета

1. **Кадетские программы судовладельцев и менеджеров.** Крупные компании набирают кадетов сами, часто через морские вузы. Это самый надёжный путь, и после него обычно предлагают контракт младшего офицера.
2. **Крюинговые агентства.** Отправляйте CV со словом «cadet» в теме письма, а в первых строках укажите учебное заведение, курс и уровень английского.
3. **Сайты вакансий.** Актуальные предложения собраны на странице [вакансий палубного кадета](/ru/jobs/rank/deck-cadet) — с типом судна, длительностью контракта и размером стипендии.

## CV, которое заметят

Морского стажа нет, поэтому резюме продаёт всё остальное: учебное заведение и курс, практику и часы на тренажёре, каждый курс STCW с номером и сроком действия, уровень английского и любой опыт работы, который показывает, что на вас можно положиться. Уложитесь в одну страницу. Его можно [собрать из профиля](/ru/maritime-cv) и отправить в том формате, который ждут крюинги.

## Вопросы на собеседовании кадета

Собеседование в крюинге для кадета короткое, обычно на английском, и проверяет отношение к делу не меньше, чем знания. Будьте готовы к таким вопросам:

1. **«Расскажите о себе».** Учебное заведение, курс, практика, почему море — минута, не больше.
2. **«Каковы обязанности впередсмотрящего?»** И основы МППСС (COLREG): кто уступает дорогу, огни и знаки, звуковые сигналы.
3. **«Что делать, если услышали „человек за бортом“?»** Поднять тревогу, бросить спасательный круг, не терять человека из виду, сообщить на мостик.
4. **«Какие у вас курсы STCW и до какого числа они действуют?»** Свои документы нужно знать наизусть.
5. **«Почему наша компания?»** Почитайте о флоте компании до звонка.

Говорите медленно и честно. «Я этого ещё не делал, но знаю, что процедура такая…» — намного лучше, чем выдуманный опыт.

## Никогда не платите за место

Кадета обмануть проще всех: первый контракт очень нужен, а как устроен найм — ещё непонятно. **Ни одна честная компания не берёт с моряка деньги за работу** — ни за «место в программе», ни за «оформление», ни за визу. Курсы и медкомиссия оплачиваются учебному центру или клинике, но никогда — тому, кто обещает контракт.

Когда документы готовы, посмотрите [вакансии палубного кадета](/ru/jobs/rank/deck-cadet) и откликайтесь напрямую — анкета уходит сразу крюинг-менеджеру.$ru$,
    'ua', $ua$Палубний кадет — майбутній штурман, який набирає морський стаж для отримання диплома. Це найважчий контракт у кар'єрі: крюїнги хочуть досвід, а в кадета його немає. Але саме він відчиняє всі інші двері. Розберемо, що це за робота, що потрібно і де шукати вакансії.

## Чим займається палубний кадет

Палубний кадет підпорядковується старшому помічнику й несе ходову вахту разом із вахтовим помічником. На практиці це:

- **Вахта на містку** під контролем — впередсмотрящий, визначення місця, радар і ECDIS, судновий журнал.
- **Вантажні операції** — навантаження й вивантаження під керівництвом старпома, драфт-сюрвей, огляд трюмів і танків.
- **Роботи з палубною командою** — швартове обладнання, рятувальні та протипожежні засоби.
- **Training Record Book (книжка практики)** — кожне виконане завдання підписує офіцер. Без правильно заповненої книжки стаж можуть не зарахувати для диплома.

## Скільки стажу потрібно

За конвенцією ПДНВ (STCW, правило II/1) для диплома вахтового помічника потрібно **не менше 12 місяців морського стажу** в межах схваленої програми підготовки з практикою, записаною в книжку, — або 36 місяців без такої програми. З них не менше шести місяців — несення ходової вахти під наглядом. Зазвичай це один-два кадетські контракти.

## Які документи запитує крюїнг

- Чинний **паспорт** і **посвідчення особи моряка (послужна книжка)**.
- **Медичний сертифікат моряка** — перевірте кольоровідчуття заздалегідь: для штурмана це вирішальний пункт.
- **Базова підготовка за STCW**: виживання, боротьба з пожежею, перша допомога, особиста безпека; плюс курс з охорони (security awareness).
- **Направлення від морської академії чи коледжу** — багато компаній беруть кадетів лише від навчальних закладів.
- **Англійська** — хоча б на коротку співбесіду; багато крюїнгів проводять тест (Marlins або аналог).

## Де шукати вакансію палубного кадета

1. **Кадетські програми судновласників і менеджерів.** Великі компанії набирають кадетів самі, часто через морські виші. Це найнадійніший шлях, і після нього зазвичай пропонують контракт молодшого офіцера.
2. **Крюїнгові агентства.** Надсилайте CV зі словом «cadet» у темі листа, а в перших рядках вкажіть навчальний заклад, курс і рівень англійської.
3. **Сайти вакансій.** Актуальні пропозиції зібрані на сторінці [вакансій палубного кадета](/ua/jobs/rank/deck-cadet) — з типом судна, тривалістю контракту й розміром стипендії.

## CV, яке помітять

Морського стажу немає, тож резюме продає все інше: навчальний заклад і курс, практику й години на тренажері, кожен курс STCW з номером і строком дії, рівень англійської та будь-який досвід роботи, що показує: на вас можна покластися. Вкладіться в одну сторінку. Його можна [зібрати з профілю](/ua/maritime-cv) і надіслати в тому форматі, якого чекають крюїнги.

## Питання на співбесіді кадета

Співбесіда в крюїнгу для кадета коротка, зазвичай англійською, і перевіряє ставлення до справи не менше, ніж знання. Будьте готові до таких питань:

1. **«Розкажіть про себе».** Навчальний заклад, курс, практика, чому море — хвилина, не більше.
2. **«Які обов'язки впередсмотрящого?»** І основи МППЗС (COLREG): хто поступається дорогою, вогні та знаки, звукові сигнали.
3. **«Що робити, якщо почули „людина за бортом“?»** Підняти тривогу, кинути рятувальний круг, не втрачати людину з поля зору, повідомити на місток.
4. **«Які у вас курси STCW і до якого числа вони чинні?»** Свої документи треба знати напам'ять.
5. **«Чому наша компанія?»** Почитайте про флот компанії до дзвінка.

Говоріть повільно й чесно. «Я цього ще не робив, але знаю, що процедура така…» — набагато краще, ніж вигаданий досвід.

## Ніколи не платіть за місце

Кадета обдурити найпростіше: перший контракт дуже потрібен, а як влаштований найм — ще незрозуміло. **Жодна чесна компанія не бере з моряка гроші за роботу** — ні за «місце в програмі», ні за «оформлення», ні за візу. Курси й медкомісія оплачуються навчальному центру або клініці, але ніколи — тому, хто обіцяє контракт.

Коли документи готові, перегляньте [вакансії палубного кадета](/ua/jobs/rank/deck-cadet) і відгукуйтеся напряму — анкета йде одразу крюїнг-менеджеру.$ua$),
  'Career', 'guide',
  'linear-gradient(135deg,#0e2a45,#1d6fa5)',
  true, '2026-10-08 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Deck cadet jobs: how to find your first ship and what crewing agencies check');

-- ── 22. Engine cadet ─────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Engine cadet jobs: requirements, sea time and how to get the first contract',
    'ru', 'Вакансии машинного кадета (Engine Cadet): требования, стаж и первый контракт',
    'ua', 'Вакансії машинного кадета (Engine Cadet): вимоги, стаж і перший контракт'),
  jsonb_build_object(
    'en', $en$An engine cadet is a future marine engineer doing the sea service needed for the first engineering certificate. The engine room is loud, hot and demanding, but engineers are in short supply worldwide — which makes the engine department one of the more reliable ways into a sea career. Here is what the job involves and how to land it.

## What an engine cadet does

The engine cadet works under the Second Engineer and the Chief Engineer, usually alongside the motormen and the engineer on watch:

- **Engine-room watchkeeping** under supervision — rounds, readings, the engine log, starting and stopping auxiliary machinery.
- **Planned maintenance** — overhauls of purifiers, pumps, compressors and auxiliary engines.
- **Workshop work** — the lathe, welding, fitting parts.
- **Bunkering and transfers** of fuel and lubricating oil, under an engineer.
- **The Training Record Book** — tasks signed off by the engineers; it is what turns months on board into recognised sea time.

## How much sea time you need

Under STCW (regulation III/1), an engineer officer of the watch needs **at least 12 months of combined workshop skill training and approved seagoing service** as part of an approved training programme with a training record book — otherwise 36 months, of which at least 30 must be seagoing service in the engine department. At least six months must be engine-room watchkeeping under supervision.

## Documents and what agencies check

- **Passport, seaman's book, seafarer medical certificate.**
- **STCW basic training** and security awareness.
- **A referral from your maritime academy or college** — a common requirement for cadetships.
- **English** for a short interview or test.
- **Hands-on skills.** Agencies like to see workshop practice, welding and lathe hours, and any experience with engines or electrics — even from a garage or a factory.

## Where to look

1. **Shipowners' cadet programmes** — the most reliable route, often run with maritime schools.
2. **Crewing agencies** — say "engine cadet" in the subject, and list your school, year, English level and practical skills in the first lines.
3. **Job boards** — current offers are on the [engine cadet vacancies page](/jobs/rank/engine-cadet), with the vessel type and stipend. The stipend varies a lot: it is typically a few hundred US dollars a month and is higher with large owners and on gas carriers.

## Questions at the engine cadet interview

Expect a short technical conversation, usually in English:

1. **"How does a four-stroke diesel engine work?"** Intake, compression, power, exhaust — and how a two-stroke main engine differs.
2. **"What is a purifier for?"** Separating water and solids from fuel and lubricating oil.
3. **"What would you check on an engine-room round?"** Temperatures, pressures, levels, leaks, unusual noise or vibration.
4. **"What do you do if you discover a fire in the engine room?"** Raise the alarm, inform the engineer on watch and the bridge, follow the fire plan.
5. **"Which tools and machines can you use?"** Be specific: lathe, welding, measuring instruments.

Honesty works better than bluffing: engineers will quickly see what you really know.

## What comes after

After the cadetship and the exams you can apply for a certificate as engineer officer of the watch and work as **Fourth or Third Engineer**. From there the path runs to Second Engineer and Chief Engineer — one of the best-paid positions at sea. See how the [engine department](/guides) is organised in our other guides.

Never pay anyone for a cadet place — no honest company charges a seafarer for a job. When your documents are ready, browse the [engine cadet vacancies](/jobs/rank/engine-cadet) and apply directly.$en$,
    'ru', $ru$Машинный кадет — будущий судовой механик, который набирает морской стаж для первого диплома. В машинном отделении шумно, жарко и тяжело, но механиков в мире не хватает, поэтому машинная команда — один из самых надёжных путей в море. Разберём, что входит в работу и как получить первый контракт.

## Чем занимается машинный кадет

Машинный кадет подчиняется второму и старшему механику и обычно работает рядом с мотористами и вахтенным механиком:

- **Вахта в машинном отделении** под контролем — обходы, снятие параметров, машинный журнал, пуск и остановка вспомогательных механизмов.
- **Плановое обслуживание** — переборка сепараторов, насосов, компрессоров и дизель-генераторов.
- **Работа в мастерской** — токарный станок, сварка, подгонка деталей.
- **Бункеровка и перекачка** топлива и масла под руководством механика.
- **Training Record Book (книжка практики)** — задания подписывают механики. Именно она превращает месяцы на судне в признанный стаж.

## Сколько стажа нужно

По STCW (правило III/1) для диплома вахтенного механика нужно **не меньше 12 месяцев обучения в мастерских и морского стажа вместе** в рамках одобренной программы с книжкой практики. Без программы — 36 месяцев, из них не меньше 30 месяцев плавания в машинной команде. Не меньше шести месяцев — несение вахты в машинном отделении под наблюдением.

## Документы и что проверяет крюинг

- **Паспорт, мореходная книжка, медицинский сертификат моряка.**
- **Базовая подготовка по STCW** и курс по охране.
- **Направление от морской академии или колледжа** — частое требование для кадетов.
- **Английский** для короткого собеседования или теста.
- **Практические навыки.** Крюингам нравится видеть практику в мастерских, часы на токарном станке и сварке, любой опыт с двигателями и электрикой — даже из гаража или с завода.

## Где искать вакансию

1. **Кадетские программы судовладельцев** — самый надёжный путь, часто через морские учебные заведения.
2. **Крюинговые агентства** — пишите «engine cadet» в теме, а в первых строках укажите учебное заведение, курс, уровень английского и практические навыки.
3. **Сайты вакансий** — актуальные предложения на странице [вакансий машинного кадета](/ru/jobs/rank/engine-cadet), с типом судна и стипендией. Стипендия сильно отличается: обычно это несколько сотен долларов в месяц, у крупных судовладельцев и на газовозах — выше.

## Вопросы на собеседовании машинного кадета

Ожидайте короткий технический разговор, обычно на английском:

1. **«Как работает четырёхтактный дизель?»** Впуск, сжатие, рабочий ход, выпуск — и чем от него отличается двухтактный главный двигатель.
2. **«Для чего нужен сепаратор?»** Отделять воду и механические примеси от топлива и масла.
3. **«Что вы проверяете при обходе машинного отделения?»** Температуры, давления, уровни, протечки, необычный шум или вибрацию.
4. **«Что делать, если обнаружили пожар в машинном отделении?»** Поднять тревогу, сообщить вахтенному механику и на мостик, действовать по плану борьбы с пожаром.
5. **«С какими инструментами и станками вы умеете работать?»** Говорите конкретно: токарный станок, сварка, измерительный инструмент.

Честность работает лучше блефа: механики быстро увидят, что вы знаете на самом деле.

## Что дальше

После практики и экзаменов можно получать диплом вахтенного механика и работать **четвёртым или третьим механиком**. Дальше путь ведёт ко второму и старшему механику — одной из самых высокооплачиваемых должностей на флоте. Как устроена машинная команда, мы разбирали в других [гайдах](/ru/guides).

Никому не платите за место кадета — честные компании не берут с моряка деньги за работу. Когда документы готовы, смотрите [вакансии машинного кадета](/ru/jobs/rank/engine-cadet) и откликайтесь напрямую.$ru$,
    'ua', $ua$Машинний кадет — майбутній судновий механік, який набирає морський стаж для першого диплома. У машинному відділенні гучно, жарко й важко, але механіків у світі бракує, тому машинна команда — один із найнадійніших шляхів у море. Розберемо, що входить у роботу і як отримати перший контракт.

## Чим займається машинний кадет

Машинний кадет підпорядковується другому та старшому механіку й зазвичай працює поруч із мотористами та вахтовим механіком:

- **Вахта в машинному відділенні** під контролем — обходи, зняття параметрів, машинний журнал, пуск і зупинка допоміжних механізмів.
- **Планове обслуговування** — перебирання сепараторів, насосів, компресорів і дизель-генераторів.
- **Робота в майстерні** — токарний верстат, зварювання, припасування деталей.
- **Бункерування й перекачування** палива та оливи під керівництвом механіка.
- **Training Record Book (книжка практики)** — завдання підписують механіки. Саме вона перетворює місяці на судні на визнаний стаж.

## Скільки стажу потрібно

За STCW (правило III/1) для диплома вахтового механіка потрібно **не менше 12 місяців навчання в майстернях і морського стажу разом** у межах схваленої програми з книжкою практики. Без програми — 36 місяців, з них не менше 30 місяців плавання в машинній команді. Не менше шести місяців — несення вахти в машинному відділенні під наглядом.

## Документи й що перевіряє крюїнг

- **Паспорт, послужна книжка, медичний сертифікат моряка.**
- **Базова підготовка за STCW** і курс з охорони.
- **Направлення від морської академії чи коледжу** — часта вимога для кадетів.
- **Англійська** для короткої співбесіди або тесту.
- **Практичні навички.** Крюїнгам подобається бачити практику в майстернях, години на токарному верстаті й зварюванні, будь-який досвід із двигунами та електрикою — навіть із гаража чи заводу.

## Де шукати вакансію

1. **Кадетські програми судновласників** — найнадійніший шлях, часто через морські навчальні заклади.
2. **Крюїнгові агентства** — пишіть «engine cadet» у темі, а в перших рядках вкажіть навчальний заклад, курс, рівень англійської та практичні навички.
3. **Сайти вакансій** — актуальні пропозиції на сторінці [вакансій машинного кадета](/ua/jobs/rank/engine-cadet), з типом судна й стипендією. Стипендія дуже різниться: зазвичай це кілька сотень доларів на місяць, у великих судновласників і на газовозах — вища.

## Питання на співбесіді машинного кадета

Очікуйте коротку технічну розмову, зазвичай англійською:

1. **«Як працює чотиритактний дизель?»** Впуск, стиск, робочий хід, випуск — і чим від нього відрізняється двотактний головний двигун.
2. **«Для чого потрібен сепаратор?»** Відокремлювати воду й механічні домішки від палива та оливи.
3. **«Що ви перевіряєте під час обходу машинного відділення?»** Температури, тиски, рівні, протікання, незвичний шум або вібрацію.
4. **«Що робити, якщо виявили пожежу в машинному відділенні?»** Підняти тривогу, повідомити вахтового механіка й місток, діяти за планом боротьби з пожежею.
5. **«З якими інструментами та верстатами ви вмієте працювати?»** Говоріть конкретно: токарний верстат, зварювання, вимірювальний інструмент.

Чесність працює краще за блеф: механіки швидко побачать, що ви знаєте насправді.

## Що далі

Після практики й іспитів можна отримувати диплом вахтового механіка та працювати **четвертим або третім механіком**. Далі шлях веде до другого й старшого механіка — однієї з найбільш високооплачуваних посад на флоті. Як влаштована машинна команда, ми розбирали в інших [гайдах](/ua/guides).

Нікому не платіть за місце кадета — чесні компанії не беруть із моряка гроші за роботу. Коли документи готові, переглядайте [вакансії машинного кадета](/ua/jobs/rank/engine-cadet) і відгукуйтеся напряму.$ua$),
  'Engine', 'guide',
  'linear-gradient(135deg,#0e2a45,#a5521d)',
  true, '2026-10-08 08:10:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Engine cadet jobs: requirements, sea time and how to get the first contract');

-- ── 23. Deck or engine ───────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Deck or engine cadet: which department to choose',
    'ru', 'Палубный или машинный кадет: какое направление выбрать',
    'ua', 'Палубний чи машинний кадет: який напрям обрати'),
  jsonb_build_object(
    'en', $en$Every future officer chooses a side early: the bridge or the engine room. The choice decides your daily work, your certificates and, later, the jobs open to you ashore. Here is an honest comparison.

## The work itself

- **Deck:** navigation, watchkeeping on the bridge, cargo operations, mooring, the ship's safety equipment, paperwork and inspections. More contact with ports, charterers and inspectors.
- **Engine:** the main engine, generators, pumps, purifiers and every system that keeps the ship alive. Repairs with your hands, troubleshooting, a workshop. Noisier and hotter, but very concrete — a problem is either fixed or it is not.

## Health and the medical

**Colour vision** matters most for deck officers: a deck career may be closed to someone with a colour-vision defect. Check it before you choose. Engine officers also need good health, but colour-vision requirements are usually less strict — the medical examiner will tell you exactly.

## Getting the first contract

Both cadetships are hard to find. Engine cadets often have a slight advantage: the world fleet is short of engineers, and many companies are keen to grow their own. Compare current offers: [deck cadet vacancies](/jobs/rank/deck-cadet) and [engine cadet vacancies](/jobs/rank/engine-cadet).

## Career and pay

- **Deck:** third officer → second officer → chief officer → master.
- **Engine:** fourth/third engineer → second engineer → chief engineer.

At the top, a master and a chief engineer earn at a comparable level, and on many ships the chief engineer's pay is close to the master's. Junior engineers are often paid a little more than junior deck officers of the same level. The current figures by rank are on our [salaries page](/salaries).

## Life after sea

- **Deck officers** move ashore into superintendent, port captain, marine surveyor, pilot, chartering and crewing roles.
- **Engineers** become technical superintendents, surveyors, shipyard and repair specialists — and their skills are valued in power plants and industry too.

## How to decide

Choose deck if you like planning, responsibility for people and cargo, and working with information. Choose engine if you like machinery, repairs and seeing the direct result of your work. Whichever you choose, start building your profile now — a complete [maritime CV](/maritime-cv) makes the first contract easier.$en$,
    'ru', $ru$Каждый будущий офицер рано выбирает сторону: мостик или машинное отделение. От выбора зависят повседневная работа, дипломы и даже то, где можно работать на берегу после моря. Честное сравнение.

## Сама работа

- **Палуба:** судовождение, вахта на мостике, грузовые операции, швартовки, спасательное оборудование, документы и проверки. Больше общения с портами, фрахтователями и инспекторами.
- **Машина:** главный двигатель, генераторы, насосы, сепараторы — все системы, на которых держится судно. Ремонт руками, поиск неисправностей, мастерская. Шумнее и жарче, но очень конкретно: проблема либо решена, либо нет.

## Здоровье и медкомиссия

**Цветоощущение** важнее всего для штурманов: человеку с нарушением цветового зрения палубная карьера может быть закрыта. Проверьте это до выбора. Механикам тоже нужно хорошее здоровье, но требования к цветоощущению обычно мягче — точно скажет врач на медкомиссии.

## Первый контракт

Найти кадетский контракт трудно в обоих случаях. У машинных кадетов часто небольшое преимущество: механиков в мировом флоте не хватает, и многие компании охотно растят своих. Сравните актуальные предложения: [вакансии палубного кадета](/ru/jobs/rank/deck-cadet) и [вакансии машинного кадета](/ru/jobs/rank/engine-cadet).

## Карьера и зарплата

- **Палуба:** третий помощник → второй помощник → старший помощник → капитан.
- **Машина:** четвёртый/третий механик → второй механик → старший механик.

На вершине капитан и старший механик зарабатывают сопоставимо, и на многих судах зарплата стармеха близка к капитанской. Младшим механикам часто платят чуть больше, чем штурманам того же уровня. Актуальные цифры по должностям — на странице [зарплат](/ru/salaries).

## Жизнь после моря

- **Штурманы** уходят на берег суперинтендантами, капитанами порта, сюрвейерами, лоцманами, в фрахт и крюинг.
- **Механики** становятся техническими суперинтендантами, сюрвейерами, специалистами верфей и ремонта — их навыки ценят и в энергетике, и в промышленности.

## Как решить

Выбирайте палубу, если вам нравится планировать, отвечать за людей и груз и работать с информацией. Выбирайте машину, если вам нравится техника, ремонт и видеть прямой результат своей работы. Что бы вы ни выбрали, начинайте собирать профиль уже сейчас — полное [CV моряка](/ru/maritime-cv) облегчает поиск первого контракта.$ru$,
    'ua', $ua$Кожен майбутній офіцер рано обирає бік: місток або машинне відділення. Від вибору залежать щоденна робота, дипломи й навіть те, де можна працювати на березі після моря. Чесне порівняння.

## Сама робота

- **Палуба:** судноводіння, вахта на містку, вантажні операції, швартування, рятувальне обладнання, документи й перевірки. Більше спілкування з портами, фрахтувальниками та інспекторами.
- **Машина:** головний двигун, генератори, насоси, сепаратори — усі системи, на яких тримається судно. Ремонт руками, пошук несправностей, майстерня. Гучніше й спекотніше, але дуже конкретно: проблема або вирішена, або ні.

## Здоров'я та медкомісія

**Кольоровідчуття** найважливіше для штурманів: людині з порушенням кольорового зору палубна кар'єра може бути закрита. Перевірте це до вибору. Механікам теж потрібне добре здоров'я, але вимоги до кольоровідчуття зазвичай м'якші — точно скаже лікар на медкомісії.

## Перший контракт

Знайти кадетський контракт важко в обох випадках. Машинні кадети часто мають невелику перевагу: механіків у світовому флоті бракує, і багато компаній охоче вирощують своїх. Порівняйте актуальні пропозиції: [вакансії палубного кадета](/ua/jobs/rank/deck-cadet) і [вакансії машинного кадета](/ua/jobs/rank/engine-cadet).

## Кар'єра та зарплата

- **Палуба:** третій помічник → другий помічник → старший помічник → капітан.
- **Машина:** четвертий/третій механік → другий механік → старший механік.

На вершині капітан і старший механік заробляють співставно, і на багатьох суднах зарплата стармеха близька до капітанської. Молодшим механікам часто платять трохи більше, ніж штурманам того ж рівня. Актуальні цифри за посадами — на сторінці [зарплат](/ua/salaries).

## Життя після моря

- **Штурмани** йдуть на берег суперінтендантами, капітанами порту, сюрвеєрами, лоцманами, у фрахт і крюїнг.
- **Механіки** стають технічними суперінтендантами, сюрвеєрами, фахівцями верфей і ремонту — їхні навички цінують і в енергетиці, і в промисловості.

## Як вирішити

Обирайте палубу, якщо вам подобається планувати, відповідати за людей і вантаж та працювати з інформацією. Обирайте машину, якщо вам подобається техніка, ремонт і бачити прямий результат своєї роботи. Що б ви не обрали, починайте збирати профіль уже зараз — повне [CV моряка](/ua/maritime-cv) полегшує пошук першого контракту.$ua$),
  'Career', 'guide',
  'linear-gradient(135deg,#0e2a45,#4a5fa8)',
  true, '2026-10-08 08:20:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Deck or engine cadet: which department to choose');

-- ── 24. Electrical / ETO cadet ───────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Electrical cadet (ETO cadet): how to start a career as an electro-technical officer',
    'ru', 'Электрокадет (Electrical / ETO Cadet): как начать карьеру электромеханика',
    'ua', 'Електрокадет (Electrical / ETO Cadet): як почати кар''єру електромеханіка'),
  jsonb_build_object(
    'en', $en$The electro-technical officer (ETO) looks after everything on board that runs on electricity and electronics: generators and switchboards, motors, automation, navigation and communication equipment. Ships are becoming more electric and more automated every year, and good ETOs are hard to find. The way in is the electrical cadetship.

## What an electrical cadet does

- Rounds and checks of the **main switchboard, generators and distribution panels**.
- Maintenance of **electric motors**, starters, lighting and emergency power.
- Work with **automation and alarm systems**, sensors and control circuits.
- Help with **deck machinery**: cranes, winches, hatch covers.
- Records in the **Training Record Book**, signed off by the ETO or the Chief Engineer.

## Sea time and the certificate

Under STCW (regulation III/6), the ETO certificate requires **at least 12 months of combined workshop skill training and approved seagoing service, of which at least six months must be seagoing service** as part of an approved training programme. There is also a separate rating level — electro-technical rating (III/7) — for those who start without an officer's education.

## What crewing agencies look for

- An **electrical or electronics education** — a maritime academy, a college or a related technical degree.
- **Basic STCW training**, a seafarer medical and a seaman's book.
- **English** — manuals, alarm lists and diagrams are in English.
- **Practical skills**: reading electrical diagrams, a multimeter, soldering, PLC basics. Shore experience as an electrician counts for a lot.

## Where to look

Electrical cadet positions are fewer than deck or engine ones, so use every channel: shipowners' cadet programmes, crewing agencies (write "electrical cadet" or "ETO cadet" in the subject) and job boards. Current offers for qualified officers are on the [ETO vacancies page](/jobs/rank/eto) — it shows which companies and vessel types are hiring electro-technical officers right now, which is where to send your cadet CV too.

## Where it leads

After the certificate you work as **ETO**. Experience on cruise ships, offshore vessels, gas carriers and modern container ships is especially valued — these ships carry the most complex electrical plant. Ashore, ETOs move into electrical superintendent, automation and service-engineer roles.

As with any cadetship, never pay anyone for a place. Prepare a clear one-page [maritime CV](/maritime-cv) with your diplomas, courses and practical skills, and keep an eye on the [ETO vacancies](/jobs/rank/eto).$en$,
    'ru', $ru$Электромеханик (ETO) отвечает за всё, что на судне работает на электричестве и электронике: генераторы и главный распределительный щит, электродвигатели, автоматику, навигационное и радиооборудование. Суда с каждым годом становятся всё более «электрическими» и автоматизированными, и хороших ETO не хватает. Вход в профессию — практика электрокадетом.

## Чем занимается электрокадет

- Обходы и проверки **ГРЩ, генераторов и распределительных щитов**.
- Обслуживание **электродвигателей**, пускателей, освещения и аварийного питания.
- Работа с **автоматикой и системой аварийно-предупредительной сигнализации**, датчиками и схемами управления.
- Помощь с **палубными механизмами**: краны, лебёдки, люковые закрытия.
- Записи в **Training Record Book**, которые подписывает электромеханик или старший механик.

## Стаж и диплом

По STCW (правило III/6) для диплома ETO нужно **не меньше 12 месяцев обучения в мастерских и морского стажа вместе, из которых не меньше шести месяцев — плавание** в рамках одобренной программы подготовки. Есть и отдельный рядовой уровень — электрик (electro-technical rating, правило III/7) — для тех, кто начинает без офицерского образования.

## Что ищут крюинги

- **Электротехническое образование** — морская академия, колледж или профильный технический вуз.
- **Базовая подготовка по STCW**, медкомиссия моряка и мореходная книжка.
- **Английский** — инструкции, списки аварийных сигналов и схемы на английском.
- **Практические навыки**: чтение электрических схем, мультиметр, пайка, основы PLC. Опыт работы электриком на берегу очень ценится.

## Где искать

Мест для электрокадетов меньше, чем для палубных и машинных, поэтому используйте все каналы: кадетские программы судовладельцев, крюинги (пишите «electrical cadet» или «ETO cadet» в теме письма) и сайты вакансий. Актуальные предложения для дипломированных офицеров — на странице [вакансий ETO](/ru/jobs/rank/eto). По ней видно, какие компании и типы судов сейчас набирают электромехаников, — туда же стоит отправлять и кадетское CV.

## Куда это ведёт

После диплома — работа **электромехаником (ETO)**. Особенно ценится опыт на круизных и оффшорных судах, газовозах и современных контейнеровозах — там самая сложная электрическая часть. На берегу ETO становятся электротехническими суперинтендантами, специалистами по автоматике и сервисными инженерами.

Как и на любой кадетской позиции, никому не платите за место. Подготовьте понятное [CV моряка](/ru/maritime-cv) на одну страницу — с дипломами, курсами и практическими навыками — и следите за [вакансиями ETO](/ru/jobs/rank/eto).$ru$,
    'ua', $ua$Електромеханік (ETO) відповідає за все, що на судні працює на електриці та електроніці: генератори й головний розподільний щит, електродвигуни, автоматику, навігаційне та радіообладнання. Судна щороку стають дедалі «електричнішими» й автоматизованішими, і хороших ETO бракує. Вхід у професію — практика електрокадетом.

## Чим займається електрокадет

- Обходи й перевірки **ГРЩ, генераторів і розподільних щитів**.
- Обслуговування **електродвигунів**, пускачів, освітлення та аварійного живлення.
- Робота з **автоматикою та системою аварійно-попереджувальної сигналізації**, датчиками й схемами керування.
- Допомога з **палубними механізмами**: крани, лебідки, люкові закриття.
- Записи в **Training Record Book**, які підписує електромеханік або старший механік.

## Стаж і диплом

За STCW (правило III/6) для диплома ETO потрібно **не менше 12 місяців навчання в майстернях і морського стажу разом, з яких не менше шести місяців — плавання** в межах схваленої програми підготовки. Є й окремий рядовий рівень — електрик (electro-technical rating, правило III/7) — для тих, хто починає без офіцерської освіти.

## Що шукають крюїнги

- **Електротехнічна освіта** — морська академія, коледж або профільний технічний виш.
- **Базова підготовка за STCW**, медкомісія моряка й послужна книжка.
- **Англійська** — інструкції, списки аварійних сигналів і схеми англійською.
- **Практичні навички**: читання електричних схем, мультиметр, паяння, основи PLC. Досвід роботи електриком на березі дуже цінується.

## Де шукати

Місць для електрокадетів менше, ніж для палубних і машинних, тож використовуйте всі канали: кадетські програми судновласників, крюїнги (пишіть «electrical cadet» або «ETO cadet» у темі листа) і сайти вакансій. Актуальні пропозиції для дипломованих офіцерів — на сторінці [вакансій ETO](/ua/jobs/rank/eto). По ній видно, які компанії й типи суден зараз набирають електромеханіків, — туди ж варто надсилати й кадетське CV.

## Куди це веде

Після диплома — робота **електромеханіком (ETO)**. Особливо цінується досвід на круїзних і офшорних суднах, газовозах і сучасних контейнеровозах — там найскладніша електрична частина. На березі ETO стають електротехнічними суперінтендантами, фахівцями з автоматики та сервісними інженерами.

Як і на будь-якій кадетській позиції, нікому не платіть за місце. Підготуйте зрозуміле [CV моряка](/ua/maritime-cv) на одну сторінку — з дипломами, курсами й практичними навичками — і стежте за [вакансіями ETO](/ua/jobs/rank/eto).$ua$),
  'Career', 'guide',
  'linear-gradient(135deg,#0e2a45,#b08d1b)',
  true, '2026-10-08 08:30:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Electrical cadet (ETO cadet): how to start a career as an electro-technical officer');

-- ── 25. Cadet on a tanker or gas carrier ─────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Cadet on a gas carrier or tanker (LNG deck cadet): requirements and how to get there',
    'ru', 'Кадет на газовоз или танкер (LNG Deck Cadet): требования и как туда попасть',
    'ua', 'Кадет на газовоз чи танкер (LNG Deck Cadet): вимоги та як туди потрапити'),
  jsonb_build_object(
    'en', $en$Gas carriers and tankers are among the best-paid ships in the merchant fleet, and the companies that run them prefer to train their officers from cadet level. A cadetship on an LNG, LPG or oil tanker is therefore one of the most valuable starts a career can have — and one of the most competitive.

## Why tanker companies take cadets

Tanker and gas-carrier operators work under strict safety standards and inspections by oil majors. They would rather grow officers who learned their procedures from day one than retrain experienced people from other fleets. That is why many LNG operators run their own cadet programmes and keep their best cadets as junior officers.

## Extra certificates

On top of the usual cadet documents (passport, seaman's book, medical, STCW basic training, security awareness), tanker work requires tanker cargo training under STCW chapter V:

- **Basic training for oil and chemical tanker cargo operations** (STCW V/1-1) — for oil and chemical tankers.
- **Basic training for liquefied gas tanker cargo operations** (STCW V/1-2) — for LNG and LPG carriers.

Some companies send their cadets on these courses themselves; others ask for them in advance. Check what the vacancy says before you pay for a course.

## What the work looks like

A cadet on a tanker does the same bridge or engine-room training as on any ship, plus cargo work: tank atmosphere checks, gas detection, the inert gas system, loading and discharging procedures, and very strict permit-to-work and safety routines. You learn discipline that every other fleet values afterwards.

## What gives you an edge

- **Strong English** — oil-major inspections and procedures are all in English.
- **Good academic results** — LNG operators often select cadets by grades and tests.
- **A clean medical** and a careful attitude to safety.
- **A complete CV** with every course, number and expiry date.

## Where to look

Watch the gas-carrier and tanker vacancies: the [jobs on gas carriers](/jobs/vessel/gas-carrier) and [jobs on tankers](/jobs/vessel/tanker) pages show which companies are hiring right now. Cadet offers also appear on the [deck cadet](/jobs/rank/deck-cadet) and [engine cadet](/jobs/rank/engine-cadet) pages.

Never pay for a "guaranteed place" on a gas carrier — the better the ship, the more scammers use its name. Training courses are paid to a training centre; the job itself costs a seafarer nothing.$en$,
    'ru', $ru$Газовозы и танкеры — одни из самых высокооплачиваемых судов торгового флота, и компании, которые ими управляют, предпочитают растить офицеров с кадетского уровня. Поэтому практика на LNG-, LPG- или нефтяном танкере — один из самых ценных стартов карьеры. И один из самых конкурентных.

## Почему танкерные компании берут кадетов

Операторы танкеров и газовозов работают по строгим стандартам безопасности и под проверками нефтяных мейджоров. Им проще вырастить офицеров, которые с первого дня учились по их процедурам, чем переучивать опытных людей из других флотов. Поэтому многие LNG-операторы ведут собственные кадетские программы и оставляют лучших кадетов младшими офицерами.

## Дополнительные сертификаты

Кроме обычных кадетских документов (паспорт, мореходная книжка, медкомиссия, базовая подготовка STCW, курс по охране), для работы на танкерах нужна грузовая подготовка по главе V STCW:

- **Базовая подготовка для грузовых операций на нефтяных и химических танкерах** (STCW V/1-1) — для нефтяных танкеров и химовозов.
- **Базовая подготовка для грузовых операций на газовозах** (STCW V/1-2) — для LNG и LPG.

Одни компании сами отправляют кадетов на эти курсы, другие требуют их заранее. Прежде чем платить за курс, проверьте, что написано в вакансии.

## Как выглядит работа

Кадет на танкере проходит ту же подготовку на мостике или в машине, что и на любом судне, плюс грузовые операции: контроль атмосферы в танках, газоанализ, система инертных газов, процедуры погрузки и выгрузки и очень строгие правила допуска к работам и безопасности. Это дисциплина, которую потом ценят все остальные флоты.

## Что даёт преимущество

- **Сильный английский** — проверки мейджоров и процедуры только на английском.
- **Хорошие оценки** — LNG-операторы часто отбирают кадетов по успеваемости и тестам.
- **Чистая медкомиссия** и внимательное отношение к безопасности.
- **Полное CV** со всеми курсами, номерами и сроками действия.

## Где искать

Следите за вакансиями на газовозах и танкерах: на страницах [работа на газовозе](/ru/jobs/vessel/gas-carrier) и [работа на танкере](/ru/jobs/vessel/tanker) видно, какие компании набирают сейчас. Кадетские предложения появляются и на страницах [палубного кадета](/ru/jobs/rank/deck-cadet) и [машинного кадета](/ru/jobs/rank/engine-cadet).

Никогда не платите за «гарантированное место» на газовозе — чем лучше судно, тем чаще его именем пользуются мошенники. Курсы оплачиваются учебному центру, а сама работа моряку ничего не стоит.$ru$,
    'ua', $ua$Газовози й танкери — одні з найбільш високооплачуваних суден торгового флоту, і компанії, що ними керують, воліють вирощувати офіцерів із кадетського рівня. Тому практика на LNG-, LPG- чи нафтовому танкері — один із найцінніших стартів кар'єри. І один із найбільш конкурентних.

## Чому танкерні компанії беруть кадетів

Оператори танкерів і газовозів працюють за суворими стандартами безпеки та під перевірками нафтових мейджорів. Їм простіше виростити офіцерів, які з першого дня вчилися за їхніми процедурами, ніж перенавчати досвідчених людей з інших флотів. Тому багато LNG-операторів ведуть власні кадетські програми й залишають найкращих кадетів молодшими офіцерами.

## Додаткові сертифікати

Окрім звичайних кадетських документів (паспорт, послужна книжка, медкомісія, базова підготовка STCW, курс з охорони), для роботи на танкерах потрібна вантажна підготовка за главою V STCW:

- **Базова підготовка для вантажних операцій на нафтових і хімічних танкерах** (STCW V/1-1) — для нафтових танкерів і хімовозів.
- **Базова підготовка для вантажних операцій на газовозах** (STCW V/1-2) — для LNG і LPG.

Одні компанії самі відправляють кадетів на ці курси, інші вимагають їх заздалегідь. Перш ніж платити за курс, перевірте, що написано у вакансії.

## Як виглядає робота

Кадет на танкері проходить ту саму підготовку на містку чи в машині, що й на будь-якому судні, плюс вантажні операції: контроль атмосфери в танках, газоаналіз, система інертних газів, процедури навантаження й вивантаження та дуже суворі правила допуску до робіт і безпеки. Це дисципліна, яку потім цінують усі інші флоти.

## Що дає перевагу

- **Сильна англійська** — перевірки мейджорів і процедури лише англійською.
- **Добрі оцінки** — LNG-оператори часто відбирають кадетів за успішністю й тестами.
- **Чиста медкомісія** та уважне ставлення до безпеки.
- **Повне CV** з усіма курсами, номерами й строками дії.

## Де шукати

Стежте за вакансіями на газовозах і танкерах: на сторінках [робота на газовозі](/ua/jobs/vessel/gas-carrier) і [робота на танкері](/ua/jobs/vessel/tanker) видно, які компанії набирають зараз. Кадетські пропозиції з'являються й на сторінках [палубного кадета](/ua/jobs/rank/deck-cadet) та [машинного кадета](/ua/jobs/rank/engine-cadet).

Ніколи не платіть за «гарантоване місце» на газовозі — що краще судно, то частіше його ім'ям користуються шахраї. Курси оплачуються навчальному центру, а сама робота моряку нічого не коштує.$ua$),
  'Fleets', 'guide',
  'linear-gradient(135deg,#0e2a45,#0d7d6b)',
  true, '2026-10-08 08:40:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Cadet on a gas carrier or tanker (LNG deck cadet): requirements and how to get there');
