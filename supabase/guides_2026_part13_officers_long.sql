-- Deck officer guides, long versions: Master, Chief Officer, Second Officer,
-- Third Officer. Replaces the bodies inserted by part11; titles stay the same,
-- so the URLs (slugs come from the title) do not change.
--
-- Added: a typical day, differences by vessel type, the documents with their
-- validity, interview questions, common mistakes, contract length, and a
-- short FAQ. Facts beyond part11: STCW I/9 (medical valid up to 2 years),
-- I/10 (flag endorsement), I/11 (certificates revalidated every 5 years),
-- VI/1 (Basic Training refreshed every 5 years), A-VIII/1 and MLC 2006 (at
-- least 10 hours of rest in 24 and 77 in 7 days), MLC Standard A2.5.1 (less
-- than 12 months on board before repatriation), SOLAS III/19 (a fire drill
-- and an abandon-ship drill for every crew member every month), IMO
-- Resolution A.893(21) (the four stages of passage planning).
--
-- UPDATE by English title: running it twice writes the same text twice.

-- ── 44. Master ───────────────────────────────────────────────────────────────
UPDATE news_articles SET body = jsonb_build_object(
  'en', $en$The **master** — the captain — commands the ship. Everyone on board, every document and every decision that matters ends with them. It is the top of the deck career and the rank most cadets name when asked where they are going. This guide covers what the job really involves, how the certificate is earned, how a master's day looks, what crewing desks ask at the interview, and what keeps experienced chief officers from their first command.

## What the master does

- **Command and safety.** The master is responsible for the safety of the ship, the crew and the cargo. Under the ISM Code the master has the **overriding authority** to put safety and the protection of the environment first — even against the wishes of the owner or the charterer — and to ask the company for help whenever it is needed.
- **Navigation.** On most merchant ships the master does not keep a watch, but approves every passage plan, writes the standing and night orders, and takes the con in pilotage waters, port approaches, traffic separation schemes, restricted visibility and heavy weather.
- **The company and the port.** Reports to the owner and the ship manager, works with charterers and agents, receives port state control, flag and class inspectors and, on tankers, vetting inspectors. Signs the ship's papers, the cargo documents and the notice of readiness.
- **The crew.** Discipline, work and rest hours, welfare, training on board, medical care when nobody else can give it, and in many companies the crew's wage account.
- **Records.** The official log, drills, the safety management system — what inspectors read first is the master's responsibility.

## A typical day

At sea a master's day rarely follows a watch, but it has a rhythm:

- **Morning:** a look at the bridge and the night order book, the position and the weather, then a short meeting with the chief officer and the chief engineer about the day's work.
- **Noon:** the noon report to the company and the charterer — position, distance run, fuel, expected time of arrival.
- **Afternoon:** e-mails with the office and agents, rounds of the ship, drills. Under SOLAS every crew member takes part in at least one fire drill and one abandon-ship drill a month, and the master decides when and how they happen.
- **Evening:** the night orders, and a last check of the weather and traffic ahead.

Arrival and departure change everything: the master is on the bridge from the pilot boarding until the ship is all fast, then receives the officials, and may sleep little until the ship sails again.

## Differences by vessel type

- **Tankers and gas carriers:** vetting inspections (OCIMF SIRE) decide whether the ship gets cargo, so a master's record with vetting is part of their reputation. Cargo operations follow strict procedures and ship-shore checklists.
- **Container ships:** many ports, tight schedules, short port stays and constant pilotage. Little sleep, a lot of manoeuvring.
- **Bulk carriers:** long voyages, draft surveys, cargo disputes, and charter-party questions such as laytime and notice of readiness.
- **Offshore:** dynamic positioning, operations planned with the client, small crews and short contracts.
- **Passenger ships:** hundreds or thousands of people, a separate safety organisation, and a master who is also the face of the ship.

## Certificates and documents

- **Certificate of competency, master unlimited** (STCW II/2, 3,000 GT or more) — revalidated every **five years**.
- **GMDSS General Operator's Certificate** — also revalidated.
- **Flag endorsement** (STCW I/10) for every flag you serve under that did not issue your certificate.
- **Medical certificate** — valid for at most **two years**.
- **Basic Training refreshers** (fire-fighting, survival craft) every five years.
- **ECDIS** generic and type-specific, **ERM/BRM**, **Medical Care**, often **Ship Security Officer**, and for tankers or gas carriers the **advanced cargo** endorsement.

## What it takes to get there

Under **STCW Regulation II/2**, a master's certificate for ships of 3,000 GT or more requires an officer-of-the-watch certificate and at least **36 months** of approved sea service as an officer in charge of a navigational watch. That can be reduced to **24 months** if at least 12 of them were served as **chief officer**. On top come the exams of your maritime administration and the management-level courses.

In practice a company wants more than the certificate: years as chief officer on the same vessel type, a clean record with inspections, and the trust of its superintendents. Most masters are promoted from within the fleet, often after sailing as chief officer under a master who recommends them.

## The path

Deck cadet → third officer → second officer → chief officer → **master**. With steady contracts it typically takes **8–12 years** from cadet to command — faster on some fleets, slower on others.

## Contracts and rotation

Masters often have shorter contracts than the rest of the crew — on many fleets around **three to four months**, on others longer. Under MLC 2006 the period on board before repatriation must be **less than 12 months**, and work and rest hours apply to the master too: at least **10 hours of rest in any 24** and **77 in any seven days**.

## Interview questions for a master

1. **"Tell me about your last inspections."** PSC, flag, vetting: how many observations, what they were, how they were closed.
2. **"Describe a situation where you used your overriding authority."** Weather routing against the charterer's schedule is a typical example. Show the reasoning and the report to the company.
3. **"What do you do in the first minutes after a collision / grounding / fire?"** Alarm, crew safety, damage assessment, reports, the company's emergency procedure.
4. **"How do you keep work and rest hours compliant during a busy port call?"**
5. **"When do you tender the notice of readiness?"** Questions about laytime and the charter party are common on bulk carriers.
6. **"How do you deal with a crew member who refuses an order?"** Calm, documented, by the procedure.

## Common mistakes

- **Applying for a type you have never commanded** — a first command is almost always on a type you know as chief officer.
- **A CV without the inspection record.** For a master it is the strongest argument.
- **Missing flag endorsements** or a revalidation that expires during the contract.
- **No references.** A word from a superintendent or a previous master often decides between two equal candidates.

## FAQ

**How long does it take to become a master?**
Usually 8–12 years from cadet, depending on the fleet and how steadily you sail.

**Can you become a captain without a maritime academy?**
STCW allows an officer-of-the-watch certificate after 36 months of sea service without an approved training programme, so a route through the ratings exists in many countries. It is longer, and the details depend on your maritime administration.

**Does the master keep a watch?**
On most merchant ships no; on small ships with fewer officers the master may share the watches.

**Is "master" the same as "captain"?**
Yes. "Master" is the term in conventions and certificates; "captain" is the everyday word.

**Is there an age limit?**
STCW sets none; what matters is the medical certificate and the company's policy.

## Pay and jobs

A master is the highest-paid rank on board; how much higher depends on the vessel type — tankers, gas carriers and offshore pay more than general cargo. The current range from real vacancies is on the [master jobs page](/jobs/rank/master), and a comparison by rank is on our [salaries page](/salaries).

## Your CV

Crewing desks read a master's CV for the vessel types and sizes commanded, trading areas and inspection results. Put them first — the [maritime CV](/maritime-cv) builds it from your profile.

*Requirements follow STCW, SOLAS and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
  'ru', $ru$**Капитан** командует судном. На нём замыкаются весь экипаж, все документы и каждое важное решение. Это вершина палубной карьеры и та должность, которую называет большинство кадетов, когда их спрашивают, куда они идут. В этом гайде — чем капитан занимается на самом деле, как получить диплом, как выглядит его день, что спрашивают в крюинге и что мешает опытным старпомам получить первое командование.

## Чем занимается капитан

- **Командование и безопасность.** Капитан отвечает за безопасность судна, экипажа и груза. По Кодексу ISM у него есть **преимущественное право (overriding authority)** ставить безопасность и защиту окружающей среды на первое место — даже вопреки желанию судовладельца или фрахтователя — и просить помощи у компании, когда это нужно.
- **Судовождение.** На большинстве торговых судов капитан не стоит вахту, но утверждает каждый план перехода, пишет постоянные и ночные распоряжения и сам управляет судном в лоцманских водах, на подходах к порту, в системах разделения движения, при ограниченной видимости и в шторм.
- **Компания и порт.** Отчитывается перед судовладельцем и менеджером, работает с фрахтователями и агентами, принимает инспекции port state control, флага и класса, а на танкерах — вэттинг. Подписывает судовые и грузовые документы и нотис о готовности.
- **Экипаж.** Дисциплина, часы труда и отдыха, быт, обучение на борту, медицинская помощь, когда больше некому, а во многих компаниях — и расчёт зарплаты экипажа.
- **Документация.** Судовой журнал, учения, система управления безопасностью — то, что инспектор читает первым, на ответственности капитана.

## Типичный день

В море день капитана не привязан к вахте, но у него есть ритм:

- **Утро:** мостик и журнал ночных распоряжений, место и погода, затем короткое совещание со старпомом и стармехом о работах на день.
- **Полдень:** полуденный отчёт компании и фрахтователю — место, пройденное расстояние, топливо, ожидаемое время прихода.
- **День:** переписка с офисом и агентами, обход судна, учения. По СОЛАС каждый член экипажа участвует как минимум в одной пожарной тревоге и одной шлюпочной тревоге в месяц, а когда и как их проводить, решает капитан.
- **Вечер:** ночные распоряжения и последняя проверка погоды и обстановки впереди.

Приход и отход меняют всё: капитан на мостике с момента посадки лоцмана до окончания швартовки, затем принимает власти и может почти не спать до отхода.

## Отличия по типам судов

- **Танкеры и газовозы:** от вэттинга (OCIMF SIRE) зависит, дадут ли судну груз, поэтому история вэттингов капитана — часть его репутации. Грузовые операции идут по строгим процедурам и чек-листам судно–берег.
- **Контейнеровозы:** много портов, жёсткое расписание, короткие стоянки и постоянная лоцманская проводка. Мало сна, много маневрирования.
- **Балкеры:** долгие переходы, драфт-сюрвеи, грузовые претензии и вопросы чартера — сталийное время и нотис о готовности.
- **Оффшор:** динамическое позиционирование, операции по плану заказчика, небольшие экипажи и короткие контракты.
- **Пассажирские суда:** сотни и тысячи людей, отдельная организация безопасности, и капитан — ещё и лицо судна.

## Дипломы и документы

- **Диплом капитана без ограничений** (ПДНВ II/2, 3000 и более) — подтверждается каждые **пять лет**.
- **Диплом оператора ГМССБ (GOC)** — тоже подтверждается.
- **Подтверждение флага (endorsement)** по правилу ПДНВ I/10 для каждого флага, который не выдавал ваш диплом.
- **Медицинское свидетельство** — действует не более **двух лет**.
- **Переподготовка по Basic Training** (борьба с пожаром, спасательные средства) каждые пять лет.
- **ECDIS** общий и на тип, **ERM/BRM**, **Medical Care**, часто **Ship Security Officer**, а для танкеров и газовозов — **расширенная грузовая подготовка**.

## Как туда попасть

По **правилу II/2 ПДНВ (STCW)** для диплома капитана судна валовой вместимостью 3000 и более нужен диплом вахтенного помощника и не менее **36 месяцев** одобренного стажа вахтенным помощником. Срок сокращается до **24 месяцев**, если не менее 12 из них вы работали **старшим помощником**. Сверху — экзамены морской администрации и курсы уровня управления.

На практике компании нужно больше, чем диплом: годы старпомом на том же типе судов, чистая история инспекций и доверие суперинтендантов. Большинство капитанов повышают внутри флота, часто после контракта старпомом у капитана, который их рекомендует.

## Путь

Палубный кадет → третий помощник → второй помощник → старший помощник → **капитан**. При регулярных контрактах путь от кадета до капитана обычно занимает **8–12 лет**: на одних флотах быстрее, на других медленнее.

## Контракты и ротация

У капитанов контракты часто короче, чем у остального экипажа: во многих компаниях около **трёх-четырёх месяцев**, в других дольше. По MLC 2006 срок на борту до репатриации должен быть **меньше 12 месяцев**, а нормы труда и отдыха касаются и капитана: не менее **10 часов отдыха в любые 24 часа** и **77 часов за любые семь дней**.

## Вопросы на собеседовании

1. **«Расскажите о последних инспекциях».** PSC, флаг, вэттинг: сколько замечаний, какие, как закрыли.
2. **«Опишите случай, когда вы использовали overriding authority».** Типичный пример — обход шторма вопреки графику фрахтователя. Покажите логику решения и доклад компании.
3. **«Что вы делаете в первые минуты после столкновения / посадки на мель / пожара?»** Тревога, безопасность людей, оценка повреждений, доклады, аварийная процедура компании.
4. **«Как вы соблюдаете часы отдыха во время напряжённой стоянки?»**
5. **«Когда вы подаёте нотис о готовности?»** На балкерах вопросы о сталийном времени и чартере — частые.
6. **«Как поступите, если член экипажа отказывается выполнить приказ?»** Спокойно, с записью, по процедуре.

## Частые ошибки

- **Заявка на тип, которым вы никогда не командовали.** Первое командование почти всегда на типе, который вы знаете как старпом.
- **CV без истории инспекций.** Для капитана это самый сильный аргумент.
- **Нет подтверждений флага** или срок подтверждения диплома истекает во время контракта.
- **Нет рекомендаций.** Слово суперинтенданта или прежнего капитана часто решает между двумя равными кандидатами.

## Частые вопросы

**Сколько лет нужно, чтобы стать капитаном?**
Обычно 8–12 лет от кадета — зависит от флота и регулярности контрактов.

**Можно ли стать капитаном без морской академии?**
ПДНВ допускает диплом вахтенного помощника после 36 месяцев стажа без одобренной программы подготовки, поэтому путь через рядовой состав во многих странах существует. Он дольше, а детали зависят от морской администрации.

**Стоит ли капитан вахту?**
На большинстве торговых судов нет; на небольших судах с малым числом помощников капитан может делить вахты.

**«Master» и «captain» — одно и то же?**
Да. «Master» — термин конвенций и дипломов, «captain» — обиходное слово.

**Есть ли возрастной предел?**
ПДНВ его не устанавливает; важны медицинское свидетельство и политика компании.

## Зарплата и вакансии

Капитан — самая высокооплачиваемая должность на борту; насколько выше остальных, зависит от типа судна: танкеры, газовозы и оффшор платят больше генгруза. Актуальный диапазон по реальным вакансиям — на странице [вакансий капитана](/ru/jobs/rank/master), сравнение по должностям — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV капитана крюинг смотрит на типы и размеры судов, которыми вы командовали, районы плавания и результаты инспекций. Поставьте это в начало — [CV моряка](/ru/maritime-cv) соберёт его из вашего профиля.

*Требования — по ПДНВ (STCW), СОЛАС и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
  'ua', $ua$**Капітан** командує судном. На ньому замикаються весь екіпаж, усі документи й кожне важливе рішення. Це вершина палубної кар'єри й та посада, яку називає більшість кадетів, коли їх питають, куди вони йдуть. У цьому гайді — чим капітан займається насправді, як отримати диплом, який у нього день, що питають у крюїнгу і що заважає досвідченим старпомам отримати перше командування.

## Чим займається капітан

- **Командування й безпека.** Капітан відповідає за безпеку судна, екіпажу й вантажу. За Кодексом ISM він має **переважне право (overriding authority)** ставити безпеку й захист довкілля на перше місце — навіть усупереч бажанню судновласника чи фрахтувальника — і просити допомоги в компанії, коли це потрібно.
- **Судноводіння.** На більшості торговельних суден капітан не несе вахту, але затверджує кожен план переходу, пише постійні й нічні розпорядження і сам керує судном у лоцманських водах, на підходах до порту, у системах розділення руху, за обмеженої видимості й у шторм.
- **Компанія й порт.** Звітує перед судновласником і менеджером, працює з фрахтувальниками й агентами, приймає інспекції port state control, прапора й класу, а на танкерах — веттинг. Підписує суднові й вантажні документи та нотис про готовність.
- **Екіпаж.** Дисципліна, години праці й відпочинку, побут, навчання на борту, медична допомога, коли більше нікому, а в багатьох компаніях — і розрахунок зарплати екіпажу.
- **Документація.** Судновий журнал, навчання, система управління безпекою — те, що інспектор читає першим, на відповідальності капітана.

## Типовий день

У морі день капітана не прив'язаний до вахти, але має ритм:

- **Ранок:** місток і журнал нічних розпоряджень, місце й погода, потім коротка нарада зі старпомом і стармехом про роботи на день.
- **Полудень:** полуденний звіт компанії та фрахтувальнику — місце, пройдена відстань, паливо, очікуваний час приходу.
- **День:** листування з офісом і агентами, обхід судна, навчання. За СОЛАС кожен член екіпажу бере участь щонайменше в одній пожежній і одній шлюпковій тривозі на місяць, а коли й як їх проводити, вирішує капітан.
- **Вечір:** нічні розпорядження й остання перевірка погоди та обстановки попереду.

Прихід і відхід змінюють усе: капітан на містку від посадки лоцмана до кінця швартування, потім приймає владу й може майже не спати до відходу.

## Відмінності за типами суден

- **Танкери й газовози:** від веттингу (OCIMF SIRE) залежить, чи дадуть судну вантаж, тому історія веттингів капітана — частина його репутації. Вантажні операції йдуть за суворими процедурами й чек-листами судно–берег.
- **Контейнеровози:** багато портів, жорсткий розклад, короткі стоянки й постійне лоцманське проведення. Мало сну, багато маневрування.
- **Балкери:** довгі переходи, драфт-сюрвеї, вантажні претензії й питання чартеру — сталійний час і нотис про готовність.
- **Офшор:** динамічне позиціонування, операції за планом замовника, невеликі екіпажі й короткі контракти.
- **Пасажирські судна:** сотні й тисячі людей, окрема організація безпеки, і капітан — ще й обличчя судна.

## Дипломи й документи

- **Диплом капітана без обмежень** (ПДНВ II/2, 3000 і більше) — підтверджується кожні **п'ять років**.
- **Диплом оператора ГМЗЛБ (GOC)** — теж підтверджується.
- **Підтвердження прапора (endorsement)** за правилом ПДНВ I/10 для кожного прапора, який не видавав ваш диплом.
- **Медичне свідоцтво** — чинне не більше **двох років**.
- **Перепідготовка з Basic Training** (боротьба з пожежею, рятувальні засоби) кожні п'ять років.
- **ECDIS** загальний і на тип, **ERM/BRM**, **Medical Care**, часто **Ship Security Officer**, а для танкерів і газовозів — **розширена вантажна підготовка**.

## Як туди потрапити

За **правилом II/2 ПДНВ (STCW)** для диплома капітана судна валовою місткістю 3000 і більше потрібен диплом вахтового помічника й не менше **36 місяців** схваленого стажу вахтовим помічником. Строк скорочується до **24 місяців**, якщо щонайменше 12 із них ви працювали **старшим помічником**. Зверху — іспити морської адміністрації та курси рівня управління.

На практиці компанії потрібно більше, ніж диплом: роки старпомом на тому самому типі суден, чиста історія інспекцій і довіра суперінтендантів. Більшість капітанів підвищують усередині флоту, часто після контракту старпомом у капітана, який їх рекомендує.

## Шлях

Палубний кадет → третій помічник → другий помічник → старший помічник → **капітан**. За регулярних контрактів шлях від кадета до капітана зазвичай триває **8–12 років**: на одних флотах швидше, на інших повільніше.

## Контракти й ротація

У капітанів контракти часто коротші, ніж в іншого екіпажу: у багатьох компаніях близько **трьох-чотирьох місяців**, в інших довше. За MLC 2006 строк на борту до репатріації має бути **менше 12 місяців**, а норми праці й відпочинку стосуються й капітана: щонайменше **10 годин відпочинку за будь-які 24 години** і **77 годин за будь-які сім днів**.

## Питання на співбесіді

1. **«Розкажіть про останні інспекції».** PSC, прапор, веттинг: скільки зауважень, які, як закрили.
2. **«Опишіть випадок, коли ви використали overriding authority».** Типовий приклад — обхід шторму всупереч графіку фрахтувальника. Покажіть логіку рішення й доповідь компанії.
3. **«Що ви робите в перші хвилини після зіткнення / посадки на мілину / пожежі?»** Тривога, безпека людей, оцінка пошкоджень, доповіді, аварійна процедура компанії.
4. **«Як ви дотримуєтеся годин відпочинку під час напруженої стоянки?»**
5. **«Коли ви подаєте нотис про готовність?»** На балкерах питання про сталійний час і чартер — часті.
6. **«Як вчините, якщо член екіпажу відмовляється виконати наказ?»** Спокійно, із записом, за процедурою.

## Часті помилки

- **Заявка на тип, яким ви ніколи не командували.** Перше командування майже завжди на типі, який ви знаєте як старпом.
- **CV без історії інспекцій.** Для капітана це найсильніший аргумент.
- **Немає підтверджень прапора** або строк підтвердження диплома спливає під час контракту.
- **Немає рекомендацій.** Слово суперінтенданта чи попереднього капітана часто вирішує між двома рівними кандидатами.

## Часті питання

**Скільки років потрібно, щоб стати капітаном?**
Зазвичай 8–12 років від кадета — залежить від флоту й регулярності контрактів.

**Чи можна стати капітаном без морської академії?**
ПДНВ допускає диплом вахтового помічника після 36 місяців стажу без схваленої програми підготовки, тому шлях через рядовий склад у багатьох країнах існує. Він довший, а деталі залежать від морської адміністрації.

**Чи несе капітан вахту?**
На більшості торговельних суден ні; на невеликих суднах із малою кількістю помічників капітан може ділити вахти.

**«Master» і «captain» — одне й те саме?**
Так. «Master» — термін конвенцій і дипломів, «captain» — побутове слово.

**Чи є вікова межа?**
ПДНВ її не встановлює; важливі медичне свідоцтво й політика компанії.

## Зарплата й вакансії

Капітан — найбільш оплачувана посада на борту; наскільки вище за інших, залежить від типу судна: танкери, газовози й офшор платять більше за генвантаж. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій капітана](/ua/jobs/rank/master), порівняння за посадами — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV капітана крюїнг дивиться на типи й розміри суден, якими ви командували, райони плавання й результати інспекцій. Поставте це на початок — [CV моряка](/ua/maritime-cv) збере його з вашого профілю.

*Вимоги — за ПДНВ (STCW), СОЛАС і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
  'pl', $pl$**Kapitan** dowodzi statkiem. Na nim kończą się cała załoga, wszystkie dokumenty i każda ważna decyzja. To szczyt kariery pokładowej i stanowisko, które wymienia większość kadetów, gdy pyta się ich, dokąd zmierzają. W tym poradniku: czym kapitan naprawdę się zajmuje, jak zdobyć dyplom, jak wygląda jego dzień, o co pytają agencje i co powstrzymuje doświadczonych starszych oficerów przed pierwszym dowództwem.

## Czym zajmuje się kapitan

- **Dowodzenie i bezpieczeństwo.** Kapitan odpowiada za bezpieczeństwo statku, załogi i ładunku. Zgodnie z Kodeksem ISM ma **nadrzędne uprawnienia (overriding authority)**, by stawiać bezpieczeństwo i ochronę środowiska na pierwszym miejscu — nawet wbrew armatorowi lub czarterującemu — i prosić firmę o pomoc, gdy jest potrzebna.
- **Nawigacja.** Na większości statków handlowych kapitan nie pełni wachty, ale zatwierdza każdy plan podróży, pisze stałe i nocne polecenia i sam prowadzi statek na wodach pilotowych, przy podejściu do portu, w systemach rozgraniczenia ruchu, przy ograniczonej widoczności i w sztormie.
- **Firma i port.** Raportuje armatorowi i menedżerowi, współpracuje z czarterującymi i agentami, przyjmuje inspekcje port state control, bandery i towarzystwa klasyfikacyjnego, a na tankowcach — vetting. Podpisuje dokumenty statkowe i ładunkowe oraz notę gotowości.
- **Załoga.** Dyscyplina, godziny pracy i odpoczynku, warunki bytowe, szkolenia na burcie, opieka medyczna, gdy nie ma jej kto zapewnić, a w wielu firmach także rozliczenie płac.
- **Dokumentacja.** Dziennik okrętowy, ćwiczenia, system zarządzania bezpieczeństwem — to, co inspektor czyta najpierw, jest na odpowiedzialności kapitana.

## Typowy dzień

Na morzu dzień kapitana nie zależy od wachty, ale ma swój rytm:

- **Rano:** mostek i książka nocnych poleceń, pozycja i pogoda, potem krótka narada ze starszym oficerem i starszym mechanikiem o pracach na dzień.
- **Południe:** raport południowy dla firmy i czarterującego — pozycja, przebyta odległość, paliwo, przewidywany czas przybycia.
- **Po południu:** korespondencja z biurem i agentami, obchód statku, ćwiczenia. Zgodnie z SOLAS każdy członek załogi uczestniczy co miesiąc w co najmniej jednym alarmie pożarowym i jednym alarmie opuszczenia statku, a kiedy i jak je przeprowadzić, decyduje kapitan.
- **Wieczór:** nocne polecenia i ostatnie sprawdzenie pogody i ruchu przed statkiem.

Wejście i wyjście z portu zmieniają wszystko: kapitan jest na mostku od zaokrętowania pilota do zakończenia cumowania, potem przyjmuje urzędników i może prawie nie spać aż do wyjścia.

## Różnice według typu statku

- **Tankowce i gazowce:** od vettingu (OCIMF SIRE) zależy, czy statek dostanie ładunek, więc historia vettingów kapitana to część jego reputacji. Operacje ładunkowe idą według ścisłych procedur i list kontrolnych statek–ląd.
- **Kontenerowce:** wiele portów, napięty rozkład, krótkie postoje i ciągłe pilotaże. Mało snu, dużo manewrów.
- **Masowce:** długie podróże, draft survey, spory ładunkowe i kwestie czarterowe — czas postoju (laytime) i nota gotowości.
- **Offshore:** dynamiczne pozycjonowanie, operacje planowane z klientem, małe załogi i krótkie kontrakty.
- **Statki pasażerskie:** setki lub tysiące ludzi, osobna organizacja bezpieczeństwa, a kapitan jest także twarzą statku.

## Dyplomy i dokumenty

- **Dyplom kapitana bez ograniczeń** (STCW II/2, 3000 i więcej) — odnawiany co **pięć lat**.
- **Świadectwo operatora GMDSS (GOC)** — również odnawiane.
- **Potwierdzenie bandery (endorsement)** według prawidła STCW I/10 dla każdej bandery, która nie wydała Twojego dyplomu.
- **Świadectwo zdrowia** — ważne najwyżej **dwa lata**.
- **Kursy odnawiające Basic Training** (ochrona przeciwpożarowa, środki ratunkowe) co pięć lat.
- **ECDIS** ogólny i typowy, **ERM/BRM**, **Medical Care**, często **Ship Security Officer**, a na tankowce i gazowce — **zaawansowane szkolenie ładunkowe**.

## Jak tam dojść

Zgodnie z **prawidłem II/2 STCW** dyplom kapitana na statkach o pojemności brutto 3000 i więcej wymaga dyplomu oficera wachtowego i co najmniej **36 miesięcy** zatwierdzonej praktyki jako oficer wachtowy. Okres skraca się do **24 miesięcy**, jeśli co najmniej 12 z nich przepracowano jako **starszy oficer**. Do tego egzaminy administracji morskiej i kursy poziomu zarządzania.

W praktyce firma oczekuje więcej niż dyplomu: lat jako starszy oficer na tym samym typie statków, czystej historii inspekcji i zaufania inspektorów armatora. Większość kapitanów awansuje wewnątrz floty, często po kontrakcie jako starszy oficer u kapitana, który ich poleca.

## Ścieżka

Kadet pokładowy → trzeci oficer → drugi oficer → starszy oficer → **kapitan**. Przy regularnych kontraktach droga od kadeta do kapitana trwa zwykle **8–12 lat**: w jednych flotach szybciej, w innych wolniej.

## Kontrakty i rotacja

Kapitanowie mają często krótsze kontrakty niż reszta załogi: w wielu firmach około **trzech-czterech miesięcy**, w innych dłużej. Zgodnie z MLC 2006 okres na burcie przed repatriacją musi być **krótszy niż 12 miesięcy**, a normy pracy i odpoczynku dotyczą także kapitana: co najmniej **10 godzin odpoczynku w każdych 24 godzinach** i **77 godzin w każdych siedmiu dniach**.

## Pytania na rozmowie

1. **„Proszę opowiedzieć o ostatnich inspekcjach”.** PSC, bandera, vetting: ile uwag, jakie, jak zamknięte.
2. **„Proszę opisać sytuację, w której skorzystał Pan z overriding authority”.** Typowy przykład to ominięcie sztormu wbrew harmonogramowi czarterującego. Pokaż tok rozumowania i raport do firmy.
3. **„Co Pan robi w pierwszych minutach po kolizji / wejściu na mieliznę / pożarze?”** Alarm, bezpieczeństwo ludzi, ocena uszkodzeń, meldunki, procedura awaryjna firmy.
4. **„Jak zapewnia Pan zgodność godzin odpoczynku podczas intensywnego postoju?”**
5. **„Kiedy składa Pan notę gotowości?”** Na masowcach pytania o laytime i czarter są częste.
6. **„Co Pan zrobi, gdy członek załogi odmówi wykonania polecenia?”** Spokojnie, z zapisem, według procedury.

## Częste błędy

- **Aplikowanie na typ, którym nigdy nie dowodziłeś.** Pierwsze dowództwo jest prawie zawsze na typie znanym z pracy jako starszy oficer.
- **CV bez historii inspekcji.** Dla kapitana to najmocniejszy argument.
- **Brak potwierdzeń bandery** albo odnowienie dyplomu, które wygasa w trakcie kontraktu.
- **Brak referencji.** Słowo inspektora armatora lub poprzedniego kapitana często rozstrzyga między dwoma równymi kandydatami.

## Najczęstsze pytania

**Ile lat trzeba, żeby zostać kapitanem?**
Zwykle 8–12 lat od kadeta — zależy od floty i regularności kontraktów.

**Czy można zostać kapitanem bez akademii morskiej?**
STCW dopuszcza dyplom oficera wachtowego po 36 miesiącach praktyki bez zatwierdzonego programu szkolenia, więc droga przez załogę szeregową w wielu krajach istnieje. Jest dłuższa, a szczegóły zależą od administracji morskiej.

**Czy kapitan pełni wachtę?**
Na większości statków handlowych nie; na małych statkach z niewielką liczbą oficerów kapitan może dzielić wachty.

**Czy „master” i „captain” to to samo?**
Tak. „Master” to termin konwencji i dyplomów, „captain” — słowo potoczne.

**Czy jest limit wieku?**
STCW go nie określa; liczą się świadectwo zdrowia i polityka firmy.

## Wynagrodzenie i oferty

Kapitan to najlepiej opłacane stanowisko na burcie; o ile lepiej, zależy od typu statku — tankowce, gazowce i offshore płacą więcej niż drobnicowce. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla kapitanów](/pl/jobs/rank/master), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV kapitana agencja patrzy na typy i wielkości statków, którymi dowodziłeś, rejony pływania i wyniki inspekcji. Postaw to na początku — [CV marynarza](/pl/maritime-cv) zbuduje je z Twojego profilu.

*Wymagania według STCW, SOLAS i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$)
WHERE title->>'en' = 'Ship''s master (captain): duties, requirements and how to become one';

-- ── 45. Chief Officer ────────────────────────────────────────────────────────
UPDATE news_articles SET body = jsonb_build_object(
  'en', $en$The **chief officer** — chief mate, or simply "chief" on deck — is second in command after the master and the head of the deck department. If the master is the one who decides, the chief officer is the one who makes the ship work: cargo, stability, maintenance and the deck crew all run through this rank. This guide covers the duties, a typical day, how the job changes by vessel type, the documents, the interview and the step to master.

## What the chief officer does

- **Cargo.** Loading and discharge plans, stowage, lashing, hold or tank preparation and the documents that go with them. On a tanker the chief officer is usually the cargo officer; on a container ship, the dangerous goods and the stowage plan go across the chief officer's desk.
- **Stability and ballast.** Calculations before and during cargo operations on the loading computer, longitudinal strength, draft and trim, and ballast water management under the BWM Convention.
- **The deck crew.** Plans the bosun's and the ABs' work, the planned maintenance system for hull, hatch covers, mooring and cargo gear, and the work and rest hours of the deck team.
- **Watchkeeping.** Usually keeps the **04:00–08:00 and 16:00–20:00** watches — dawn and dusk, when star sights were once taken.
- **Safety.** On many ships the chief officer is the safety officer, leads the emergency party in drills, controls permits for enclosed spaces and hot work, and is often in charge of medical care on board.
- **Second in command.** Takes over if the master cannot act, and is the master's right hand during inspections and vetting.

## A typical day

- **04:00–08:00:** the morning watch on the bridge.
- **08:00:** a short meeting with the bosun: the day's jobs, who does what, which permits are needed.
- **Day:** rounds of the deck, maintenance records, cargo planning for the next port, paperwork for the office.
- **16:00–20:00:** the evening watch.

In port the rhythm turns around: cargo work runs day and night, and the chief officer shares the cargo watches with the other officers, signs the ship–shore checklists and takes the decisions when the plan meets reality.

## Differences by vessel type

- **Tankers:** cargo calculations, inert gas, crude oil washing on crude carriers, tank cleaning, ship–shore safety checklists and vetting. The chief officer's tanker endorsement is not a formality — it is the job.
- **Gas carriers:** cargo systems, cooling down and warming up tanks, boil-off — a separate endorsement and a long learning curve.
- **Bulk carriers:** hold cleaning and inspections, loading sequences that respect the hull's strength, draft surveys with the surveyor.
- **Container ships:** the stowage plan, lashing, dangerous goods segregation, reefer containers, very short port stays.
- **Offshore:** deck cargo, crane operations and work close to installations, often with DP.

## Certificates and documents

- **Certificate of competency, chief mate unlimited** (STCW II/2, 3,000 GT or more) — revalidated every **five years**.
- **GMDSS General Operator's Certificate.**
- **Flag endorsements** (STCW I/10) for the flags you will serve under.
- **Medical certificate** — valid for at most **two years**.
- **Basic Training refreshers** every five years.
- **ECDIS** generic and type-specific, **ERM/BRM**, **Medical Care**; for tankers and gas carriers the **advanced** cargo endorsement; often **Ship Security Officer**.

## What it takes

Under **STCW Regulation II/2**, a chief mate's certificate for ships of 3,000 GT or more requires an officer-of-the-watch certificate and at least **12 months** of approved sea service — in practice, time as second or third officer. It is a management-level certificate: your administration's exams come on top, together with courses such as Medical Care, ERM/BRM and ECDIS.

## The path

Usually after one or two contracts as **second officer**. Companies like to promote from their own fleet: someone who already knows the vessel type, the procedures and the superintendents. From chief officer, the step to **master** needs the master's certificate, and under STCW at least 12 months as chief officer opens the shorter 24-month route.

## Contracts and rotation

Chief officers usually sail **four to six months**, sometimes shorter on fleets that rotate senior officers more often. MLC 2006 limits the time on board before repatriation to **less than 12 months**, and the rest-hour rules — at least **10 hours in 24** and **77 in seven days** — are a real challenge for a chief officer in a busy port. Planning the cargo watches to stay compliant is part of the job.

## Interview questions for a chief officer

1. **"Walk me through your last loading plan."** Sequence, stresses, ballast, final drafts.
2. **"What does the loading computer show you, and what do you do if it fails?"**
3. **"How do you prepare holds / tanks for the next cargo?"** Cleaning, inspection, who signs off.
4. **"What are the steps of an enclosed space entry?"** Permit, ventilation, gas testing, the attendant, rescue equipment.
5. **"What did your last vetting / PSC inspection find on deck?"**
6. **"How do you plan maintenance with a small crew?"**

## Common mistakes

- **Claiming cargo experience you do not have.** A tanker chief officer is checked on cargo operations in detail; it shows within minutes.
- **No endorsement for the type.** Without the advanced tanker or gas endorsement, a tanker company cannot hire you as chief officer.
- **Rest hours that do not add up** in your records — inspectors look at them, and so do companies.
- **A CV that lists ships but not cargoes.** For this rank, what you carried matters as much as where.

## FAQ

**How long from second officer to chief officer?**
Usually one or two contracts as second officer, once the chief mate's certificate is in hand.

**Does the chief officer keep a watch?**
On most merchant ships yes, the 04–08 watch; on some large ships with an extra officer the chief officer is a day worker.

**Who is the safety officer on board?**
It depends on the company; on many ships it is the chief officer.

**What is the difference between chief officer and chief mate?**
None — they are two names for the same rank.

## Pay and jobs

The chief officer is usually the second-highest-paid on deck, with a clear step up from second officer. The current range from real vacancies is on the [chief officer jobs page](/jobs/rank/chief-officer); a comparison by rank and vessel type is on our [salaries page](/salaries).

## Your CV

For a chief officer, crewing desks look at the cargoes handled, vessel types and sizes, and vetting experience on tankers. The [maritime CV](/maritime-cv) puts these first, and the tanker template brings the endorsements to the top.

*Requirements follow STCW and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
  'ru', $ru$**Старший помощник** — старпом, на палубе просто «чиф» — второй после капитана и глава палубной службы. Если капитан решает, то старпом делает так, чтобы судно работало: груз, остойчивость, обслуживание и палубная команда проходят через эту должность. В гайде — обязанности, типичный день, отличия по типам судов, документы, собеседование и шаг к капитану.

## Чем занимается старпом

- **Груз.** Грузовые планы погрузки и выгрузки, укладка, крепление, подготовка трюмов или танков и все связанные документы. На танкере старпом обычно и есть грузовой помощник, на контейнеровозе через его стол проходят опасные грузы и каргоплан.
- **Остойчивость и балласт.** Расчёты на грузовом компьютере до и во время грузовых операций, общая прочность, осадка и дифферент, управление балластными водами по Конвенции BWM.
- **Палубная команда.** Планирует работу боцмана и матросов, систему планово-предупредительного обслуживания корпуса, люковых крышек, швартовного и грузового устройства, следит за часами труда и отдыха палубы.
- **Вахта.** Обычно стоит **с 04:00 до 08:00 и с 16:00 до 20:00** — рассвет и закат, когда когда-то брали высоты звёзд.
- **Безопасность.** На многих судах старпом — офицер по безопасности: руководит аварийной партией на учениях, выдаёт допуски на вход в закрытые помещения и огневые работы, часто отвечает за медицинскую помощь на борту.
- **Заместитель капитана.** Принимает командование, если капитан не может действовать, и помогает ему на инспекциях и вэттинге.

## Типичный день

- **04:00–08:00:** утренняя вахта на мостике.
- **08:00:** короткое совещание с боцманом: работы на день, кто что делает, какие нужны допуски.
- **День:** обход палубы, записи по обслуживанию, грузовой план на следующий порт, документы для офиса.
- **16:00–20:00:** вечерняя вахта.

В порту ритм переворачивается: грузовые операции идут круглосуточно, старпом делит грузовые вахты с другими помощниками, подписывает чек-листы судно–берег и принимает решения, когда план сталкивается с реальностью.

## Отличия по типам судов

- **Танкеры:** грузовые расчёты, инертный газ, мойка сырой нефтью на нефтяных танкерах, зачистка танков, чек-листы безопасности судно–берег и вэттинг. Танкерное подтверждение старпома — не формальность, а сама работа.
- **Газовозы:** грузовые системы, захолаживание и отогрев танков, boil-off — отдельное подтверждение и долгое обучение.
- **Балкеры:** мойка и осмотр трюмов, последовательность погрузки с учётом прочности корпуса, драфт-сюрвей с сюрвейером.
- **Контейнеровозы:** каргоплан, крепление, разделение опасных грузов, рефконтейнеры, очень короткие стоянки.
- **Оффшор:** палубный груз, крановые операции и работа рядом с установками, часто с DP.

## Дипломы и документы

- **Диплом старшего помощника без ограничений** (ПДНВ II/2, 3000 и более) — подтверждается каждые **пять лет**.
- **Диплом оператора ГМССБ (GOC).**
- **Подтверждения флага** (ПДНВ I/10) для флагов, под которыми будете работать.
- **Медицинское свидетельство** — действует не более **двух лет**.
- **Переподготовка по Basic Training** каждые пять лет.
- **ECDIS** общий и на тип, **ERM/BRM**, **Medical Care**; для танкеров и газовозов — **расширенная** грузовая подготовка; часто **Ship Security Officer**.

## Что для этого нужно

По **правилу II/2 ПДНВ (STCW)** для диплома старшего помощника на суда валовой вместимостью 3000 и более нужен диплом вахтенного помощника и не менее **12 месяцев** одобренного стажа — на практике вторым или третьим помощником. Это диплом уровня управления: сверху — экзамены администрации и курсы вроде Medical Care, ERM/BRM и ECDIS.

## Путь

Обычно после одного-двух контрактов **вторым помощником**. Компании охотно повышают своих: того, кто уже знает тип судна, процедуры и суперинтендантов. Со старпома шаг к **капитану** требует капитанского диплома, а по ПДНВ не менее 12 месяцев старпомом открывают сокращённый 24-месячный путь.

## Контракты и ротация

Старпомы обычно работают **четыре–шесть месяцев**, иногда меньше там, где старших офицеров меняют чаще. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**, а нормы отдыха — не менее **10 часов за 24** и **77 за семь дней** — для старпома в напряжённом порту настоящий вызов. Спланировать грузовые вахты так, чтобы их соблюсти, — часть работы.

## Вопросы на собеседовании

1. **«Расскажите о последнем грузовом плане».** Последовательность, напряжения, балласт, конечные осадки.
2. **«Что показывает грузовой компьютер и что вы сделаете, если он откажет?»**
3. **«Как вы готовите трюмы / танки к следующему грузу?»** Мойка, осмотр, кто принимает.
4. **«Какие шаги при входе в закрытое помещение?»** Допуск, вентиляция, замер атмосферы, наблюдающий, спасательное снаряжение.
5. **«Что нашёл последний вэттинг / PSC на палубе?»**
6. **«Как вы планируете обслуживание с небольшой командой?»**

## Частые ошибки

- **Заявлять грузовой опыт, которого нет.** Старпома на танкер подробно проверяют по грузовым операциям — это видно за несколько минут.
- **Нет подтверждения на тип.** Без расширенного танкерного или газового подтверждения танкерная компания не может взять вас старпомом.
- **Часы отдыха в записях не сходятся** — их смотрят и инспекторы, и компании.
- **CV со списком судов, но без грузов.** Для этой должности важно не только где, но и что вы возили.

## Частые вопросы

**Сколько времени от второго помощника до старпома?**
Обычно один-два контракта вторым помощником после получения диплома старшего помощника.

**Стоит ли старпом вахту?**
На большинстве торговых судов да, вахту 04–08; на некоторых больших судах с дополнительным помощником старпом работает подвахтенным.

**Кто на борту офицер по безопасности?**
Зависит от компании; на многих судах — старпом.

**Чем chief officer отличается от chief mate?**
Ничем — это два названия одной должности.

## Зарплата и вакансии

Старпом обычно второй по зарплате на палубе, с заметным шагом вверх от второго помощника. Актуальный диапазон по реальным вакансиям — на странице [вакансий старпома](/ru/jobs/rank/chief-officer), сравнение по должностям и типам судов — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV старпома крюинг смотрит, какие грузы вы возили, типы и размеры судов, а на танкерах — опыт вэттинга. [CV моряка](/ru/maritime-cv) ставит это в начало, а шаблон для танкеров поднимает наверх подтверждения.

*Требования — по ПДНВ (STCW) и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
  'ua', $ua$**Старший помічник** — старпом, на палубі просто «чіф» — другий після капітана й голова палубної служби. Якщо капітан вирішує, то старпом робить так, щоб судно працювало: вантаж, остійність, обслуговування й палубна команда проходять через цю посаду. У гайді — обов'язки, типовий день, відмінності за типами суден, документи, співбесіда й крок до капітана.

## Чим займається старпом

- **Вантаж.** Вантажні плани завантаження й вивантаження, укладання, кріплення, підготовка трюмів чи танків і всі пов'язані документи. На танкері старпом зазвичай і є вантажним помічником, на контейнеровозі через його стіл проходять небезпечні вантажі й каргоплан.
- **Остійність і баласт.** Розрахунки на вантажному комп'ютері до й під час вантажних операцій, загальна міцність, осадка й диферент, керування баластними водами за Конвенцією BWM.
- **Палубна команда.** Планує роботу боцмана й матросів, систему планово-попереджувального обслуговування корпусу, люкових кришок, швартовного й вантажного пристроїв, стежить за годинами праці й відпочинку палуби.
- **Вахта.** Зазвичай несе **з 04:00 до 08:00 і з 16:00 до 20:00** — світанок і захід, коли колись брали висоти зірок.
- **Безпека.** На багатьох суднах старпом — офіцер із безпеки: керує аварійною партією на навчаннях, видає допуски на вхід у закриті приміщення й вогневі роботи, часто відповідає за медичну допомогу на борту.
- **Заступник капітана.** Приймає командування, якщо капітан не може діяти, і допомагає йому на інспекціях і веттингу.

## Типовий день

- **04:00–08:00:** ранкова вахта на містку.
- **08:00:** коротка нарада з боцманом: роботи на день, хто що робить, які потрібні допуски.
- **День:** обхід палуби, записи з обслуговування, вантажний план на наступний порт, документи для офісу.
- **16:00–20:00:** вечірня вахта.

У порту ритм перевертається: вантажні операції йдуть цілодобово, старпом ділить вантажні вахти з іншими помічниками, підписує чек-листи судно–берег і ухвалює рішення, коли план стикається з реальністю.

## Відмінності за типами суден

- **Танкери:** вантажні розрахунки, інертний газ, миття сирою нафтою на нафтових танкерах, зачистка танків, чек-листи безпеки судно–берег і веттинг. Танкерне підтвердження старпома — не формальність, а сама робота.
- **Газовози:** вантажні системи, захолоджування й відігрівання танків, boil-off — окреме підтвердження й довге навчання.
- **Балкери:** миття й огляд трюмів, послідовність завантаження з урахуванням міцності корпусу, драфт-сюрвей із сюрвеєром.
- **Контейнеровози:** каргоплан, кріплення, розділення небезпечних вантажів, рефконтейнери, дуже короткі стоянки.
- **Офшор:** палубний вантаж, кранові операції й робота поруч з установками, часто з DP.

## Дипломи й документи

- **Диплом старшого помічника без обмежень** (ПДНВ II/2, 3000 і більше) — підтверджується кожні **п'ять років**.
- **Диплом оператора ГМЗЛБ (GOC).**
- **Підтвердження прапора** (ПДНВ I/10) для прапорів, під якими працюватимете.
- **Медичне свідоцтво** — чинне не більше **двох років**.
- **Перепідготовка з Basic Training** кожні п'ять років.
- **ECDIS** загальний і на тип, **ERM/BRM**, **Medical Care**; для танкерів і газовозів — **розширена** вантажна підготовка; часто **Ship Security Officer**.

## Що для цього потрібно

За **правилом II/2 ПДНВ (STCW)** для диплома старшого помічника на судна валовою місткістю 3000 і більше потрібен диплом вахтового помічника й не менше **12 місяців** схваленого стажу — на практиці другим чи третім помічником. Це диплом рівня управління: зверху — іспити адміністрації й курси на кшталт Medical Care, ERM/BRM і ECDIS.

## Шлях

Зазвичай після одного-двох контрактів **другим помічником**. Компанії охоче підвищують своїх: того, хто вже знає тип судна, процедури й суперінтендантів. Зі старпома крок до **капітана** вимагає капітанського диплома, а за ПДНВ щонайменше 12 місяців старпомом відкривають скорочений 24-місячний шлях.

## Контракти й ротація

Старпоми зазвичай працюють **чотири–шість місяців**, іноді менше там, де старших офіцерів міняють частіше. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**, а норми відпочинку — щонайменше **10 годин за 24** і **77 за сім днів** — для старпома в напруженому порту справжній виклик. Спланувати вантажні вахти так, щоб їх дотриматися, — частина роботи.

## Питання на співбесіді

1. **«Розкажіть про останній вантажний план».** Послідовність, напруження, баласт, кінцеві осадки.
2. **«Що показує вантажний комп'ютер і що ви зробите, якщо він відмовить?»**
3. **«Як ви готуєте трюми / танки до наступного вантажу?»** Миття, огляд, хто приймає.
4. **«Які кроки під час входу в закрите приміщення?»** Допуск, вентиляція, замір атмосфери, спостерігач, рятувальне спорядження.
5. **«Що знайшов останній веттинг / PSC на палубі?»**
6. **«Як ви плануєте обслуговування з невеликою командою?»**

## Часті помилки

- **Заявляти вантажний досвід, якого немає.** Старпома на танкер детально перевіряють за вантажними операціями — це видно за кілька хвилин.
- **Немає підтвердження на тип.** Без розширеного танкерного чи газового підтвердження танкерна компанія не може взяти вас старпомом.
- **Години відпочинку в записах не сходяться** — їх дивляться й інспектори, і компанії.
- **CV зі списком суден, але без вантажів.** Для цієї посади важливо не лише де, а й що ви возили.

## Часті питання

**Скільки часу від другого помічника до старпома?**
Зазвичай один-два контракти другим помічником після отримання диплома старшого помічника.

**Чи несе старпом вахту?**
На більшості торговельних суден так, вахту 04–08; на деяких великих суднах із додатковим помічником старпом працює підвахтовим.

**Хто на борту офіцер із безпеки?**
Залежить від компанії; на багатьох суднах — старпом.

**Чим chief officer відрізняється від chief mate?**
Нічим — це дві назви однієї посади.

## Зарплата й вакансії

Старпом зазвичай другий за зарплатою на палубі, з помітним кроком угору від другого помічника. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій старпома](/ua/jobs/rank/chief-officer), порівняння за посадами й типами суден — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV старпома крюїнг дивиться, які вантажі ви возили, типи й розміри суден, а на танкерах — досвід веттингу. [CV моряка](/ua/maritime-cv) ставить це на початок, а шаблон для танкерів піднімає нагору підтвердження.

*Вимоги — за ПДНВ (STCW) і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
  'pl', $pl$**Starszy oficer** — chief mate, na pokładzie po prostu „chief” — jest drugi po kapitanie i kieruje działem pokładowym. Jeśli kapitan decyduje, to starszy oficer sprawia, że statek działa: ładunek, stateczność, konserwacja i załoga pokładowa przechodzą przez to stanowisko. W poradniku: obowiązki, typowy dzień, różnice według typu statku, dokumenty, rozmowa kwalifikacyjna i krok do kapitana.

## Czym zajmuje się starszy oficer

- **Ładunek.** Plany załadunku i wyładunku, sztauowanie, mocowanie, przygotowanie ładowni lub zbiorników i cała dokumentacja. Na tankowcu starszy oficer jest zwykle oficerem ładunkowym, na kontenerowcu przez jego biurko przechodzą towary niebezpieczne i plan sztauerski.
- **Stateczność i balast.** Obliczenia na komputerze ładunkowym przed i w trakcie operacji, wytrzymałość wzdłużna, zanurzenie i przegłębienie, zarządzanie wodami balastowymi według Konwencji BWM.
- **Załoga pokładowa.** Planuje pracę bosmana i marynarzy, system planowej konserwacji kadłuba, pokryw lukowych, urządzeń cumowniczych i ładunkowych, pilnuje godzin pracy i odpoczynku pokładu.
- **Wachta.** Zwykle pełni wachtę **04:00–08:00 i 16:00–20:00** — o świcie i o zmierzchu, gdy kiedyś mierzono wysokości gwiazd.
- **Bezpieczeństwo.** Na wielu statkach starszy oficer jest oficerem ds. bezpieczeństwa: kieruje grupą awaryjną podczas ćwiczeń, wydaje zezwolenia na wejście do przestrzeni zamkniętych i prace pożarowo niebezpieczne, często odpowiada za opiekę medyczną.
- **Zastępca kapitana.** Przejmuje dowodzenie, gdy kapitan nie może działać, i wspiera go przy inspekcjach i vettingu.

## Typowy dzień

- **04:00–08:00:** poranna wachta na mostku.
- **08:00:** krótka narada z bosmanem: prace na dzień, kto co robi, jakie zezwolenia są potrzebne.
- **W ciągu dnia:** obchód pokładu, zapisy konserwacji, plan ładunkowy na następny port, dokumenty dla biura.
- **16:00–20:00:** wieczorna wachta.

W porcie rytm się odwraca: operacje ładunkowe trwają dzień i noc, starszy oficer dzieli wachty ładunkowe z innymi oficerami, podpisuje listy kontrolne statek–ląd i podejmuje decyzje, gdy plan spotyka rzeczywistość.

## Różnice według typu statku

- **Tankowce:** obliczenia ładunkowe, gaz obojętny, mycie ropą naftową na tankowcach do ropy, czyszczenie zbiorników, listy kontrolne statek–ląd i vetting. Tankowcowe potwierdzenie starszego oficera to nie formalność, tylko sama praca.
- **Gazowce:** systemy ładunkowe, schładzanie i ogrzewanie zbiorników, boil-off — osobne potwierdzenie i długa nauka.
- **Masowce:** mycie i inspekcja ładowni, sekwencje załadunku z uwzględnieniem wytrzymałości kadłuba, draft survey z rzeczoznawcą.
- **Kontenerowce:** plan sztauerski, mocowanie, segregacja towarów niebezpiecznych, kontenery chłodzone, bardzo krótkie postoje.
- **Offshore:** ładunek pokładowy, operacje dźwigowe i praca blisko instalacji, często z DP.

## Dyplomy i dokumenty

- **Dyplom starszego oficera bez ograniczeń** (STCW II/2, 3000 i więcej) — odnawiany co **pięć lat**.
- **Świadectwo operatora GMDSS (GOC).**
- **Potwierdzenia bandery** (STCW I/10) dla bander, pod którymi będziesz pływać.
- **Świadectwo zdrowia** — ważne najwyżej **dwa lata**.
- **Kursy odnawiające Basic Training** co pięć lat.
- **ECDIS** ogólny i typowy, **ERM/BRM**, **Medical Care**; na tankowce i gazowce — **zaawansowane** szkolenie ładunkowe; często **Ship Security Officer**.

## Czego to wymaga

Zgodnie z **prawidłem II/2 STCW** dyplom starszego oficera na statkach o pojemności brutto 3000 i więcej wymaga dyplomu oficera wachtowego i co najmniej **12 miesięcy** zatwierdzonej praktyki — w praktyce jako drugi lub trzeci oficer. To dyplom poziomu zarządzania: dochodzą egzaminy administracji i kursy takie jak Medical Care, ERM/BRM i ECDIS.

## Ścieżka

Zwykle po jednym lub dwóch kontraktach jako **drugi oficer**. Firmy chętnie awansują swoich: kogoś, kto zna już typ statku, procedury i inspektorów armatora. Krok do **kapitana** wymaga dyplomu kapitana, a według STCW co najmniej 12 miesięcy jako starszy oficer otwiera krótszą, 24-miesięczną drogę.

## Kontrakty i rotacja

Starsi oficerowie pływają zwykle **cztery–sześć miesięcy**, czasem krócej we flotach, które częściej zmieniają starszych oficerów. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**, a normy odpoczynku — co najmniej **10 godzin na 24** i **77 na siedem dni** — to dla starszego oficera w intensywnym porcie prawdziwe wyzwanie. Zaplanowanie wacht ładunkowych tak, by je spełnić, to część pracy.

## Pytania na rozmowie

1. **„Proszę omówić ostatni plan załadunku”.** Sekwencja, naprężenia, balast, zanurzenia końcowe.
2. **„Co pokazuje komputer ładunkowy i co Pan zrobi, gdy przestanie działać?”**
3. **„Jak przygotowuje Pan ładownie / zbiorniki do następnego ładunku?”** Mycie, inspekcja, kto odbiera.
4. **„Jakie są kroki wejścia do przestrzeni zamkniętej?”** Zezwolenie, wentylacja, pomiar atmosfery, asekurujący, sprzęt ratunkowy.
5. **„Co wykazał ostatni vetting / PSC na pokładzie?”**
6. **„Jak planuje Pan konserwację przy małej załodze?”**

## Częste błędy

- **Deklarowanie doświadczenia ładunkowego, którego nie masz.** Starszego oficera na tankowiec sprawdza się szczegółowo z operacji ładunkowych — widać to po kilku minutach.
- **Brak potwierdzenia na typ.** Bez zaawansowanego potwierdzenia tankowcowego lub gazowego firma tankowcowa nie może Cię zatrudnić jako starszego oficera.
- **Godziny odpoczynku w zapisach się nie zgadzają** — sprawdzają je inspektorzy i firmy.
- **CV z listą statków, ale bez ładunków.** Na tym stanowisku liczy się nie tylko gdzie, ale i co przewoziłeś.

## Najczęstsze pytania

**Ile trwa droga od drugiego oficera do starszego?**
Zwykle jeden lub dwa kontrakty jako drugi oficer po uzyskaniu dyplomu starszego oficera.

**Czy starszy oficer pełni wachtę?**
Na większości statków handlowych tak, wachtę 04–08; na niektórych dużych statkach z dodatkowym oficerem pracuje na dniówce.

**Kto jest oficerem ds. bezpieczeństwa?**
Zależy od firmy; na wielu statkach starszy oficer.

**Czym różni się chief officer od chief mate?**
Niczym — to dwie nazwy tego samego stanowiska.

## Wynagrodzenie i oferty

Starszy oficer zarabia zwykle najwięcej na pokładzie zaraz po kapitanie, z wyraźnym skokiem względem drugiego oficera. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla starszych oficerów](/pl/jobs/rank/chief-officer), a porównanie stanowisk i typów statków — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV starszego oficera agencja patrzy, jakie ładunki przewoziłeś, na typy i wielkości statków, a na tankowcach — na doświadczenie z vettingiem. [CV marynarza](/pl/maritime-cv) stawia to na początku, a szablon tankowcowy wyciąga potwierdzenia na górę.

*Wymagania według STCW i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$)
WHERE title->>'en' = 'Chief officer (chief mate): duties, requirements and the step to master';

-- ── 46. Second Officer ───────────────────────────────────────────────────────
UPDATE news_articles SET body = jsonb_build_object(
  'en', $en$The **second officer** is the ship's **navigating officer**. Every passage the ship makes starts on their chart table — or, today, on their ECDIS. It is the rank where an officer stops being the newest on the bridge and starts being responsible for how the ship gets from one berth to the next. This guide covers the duties, the watch, a typical day, how the job changes by vessel type, the documents, the interview and the step to chief officer.

## What the second officer does

- **Passage planning.** Prepares the berth-to-berth plan for the master's approval. IMO guidance (Resolution A.893) splits it into four stages — **appraisal, planning, execution and monitoring**: gathering the information, drawing the route with safe depths, no-go areas, reporting points and tidal windows, then checking it is followed.
- **Charts and publications.** Keeps the electronic chart database and any paper charts corrected, applies Notices to Mariners, and keeps lists of lights, radio signals, sailing directions and tide tables up to date.
- **Navigation equipment.** ECDIS, radars and ARPA, GPS, gyro and magnetic compasses, echo sounder, speed log, AIS, VDR — tests, error logs, and defects reported to the master.
- **Watchkeeping.** Usually keeps the **00:00–04:00 and 12:00–16:00** watches, the "graveyard" watch at night.
- **Other duties** vary by company: often the GMDSS equipment and radio log, and on many ships medical stores and first aid.
- **In port and at manoeuvres.** Usually stationed aft at mooring, keeps cargo watches, and prepares the arrival and departure checklists for the bridge.

## A typical day

- **00:00–04:00:** the night watch, often the quietest and the one where fatigue is hardest to fight.
- **Morning:** sleep.
- **12:00–16:00:** the afternoon watch; the noon position goes into the master's report.
- **Afternoon and evening:** chart and ENC corrections, equipment checks, the next passage plan, and the arrival briefing for the master.

Before a port the workload rises: the plan to the pilot station must be ready, the berth information collected and the bridge equipment tested.

## Differences by vessel type

- **Container ships:** short sea passages and many ports — the second officer plans a new passage every few days.
- **Tankers and bulk carriers:** longer ocean passages, weather routing and port approaches with strict draft and under-keel clearance limits.
- **Offshore:** short trips to installations, DP operations and work close to platforms; often a DP certificate is expected.
- **Passenger ships:** larger bridge teams and strict procedures; the navigating officer's role is often split between several officers.

## Certificates and documents

- **Certificate of competency, officer in charge of a navigational watch** (STCW II/1, 500 GT or more) — revalidated every **five years**.
- **GMDSS General Operator's Certificate.**
- **Flag endorsements** (STCW I/10).
- **Medical certificate** — valid for at most **two years**.
- **Basic Training refreshers** every five years; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ECDIS** generic and type-specific, **ERM/BRM**; for tankers and gas carriers the basic cargo courses.

## What it takes

The second officer holds the same certificate as the third: **officer in charge of a navigational watch**, STCW Regulation II/1. That requires at least 12 months of approved sea service as part of an approved training programme (or 36 months otherwise), including at least six months of bridge watchkeeping under supervision, plus the GMDSS certificate and the safety courses. What separates second from third is experience, not paper: companies promote after one or two contracts as third officer.

## The path

Third officer → **second officer** → chief officer. The step to chief officer needs the chief mate's certificate under STCW II/2 and at least 12 months of approved sea service as an officer of the watch.

## Contracts and rotation

Second officers usually sail **four to six months**. MLC 2006 limits time on board before repatriation to **less than 12 months**; the rest-hour minimums — **10 hours in 24** and **77 in seven days** — matter especially for the 00–04 watch, which breaks the night in two.

## Interview questions for a second officer

1. **"What are the stages of passage planning?"** Appraisal, planning, execution, monitoring — and what goes into each.
2. **"How do you set the safety contour and safety depth on ECDIS?"** Draft, squat and the company's under-keel clearance policy.
3. **"How do you calculate under-keel clearance for a port approach?"**
4. **"A vessel is crossing from starboard and does not give way. What do you do?"** COLREG Rules 15, 16, 17 — and when to call the master.
5. **"Walk me through a GMDSS distress alert."**
6. **"How do you correct the ENCs and check the corrections were applied?"**

## Common mistakes

- **Treating ECDIS as a screen, not a system** — interviewers ask about alarms, settings and limits, not just routes.
- **No type-specific ECDIS** for the equipment the company uses.
- **Weak COLREG answers.** Every interview for a watch officer includes a COLREG situation.
- **A CV without trading areas** — ice, piracy areas, ECA zones and heavy-traffic straits all count.

## FAQ

**Does the second officer need a different certificate from the third?**
No. Both hold the STCW II/1 officer-of-the-watch certificate; the difference is experience and duties.

**Why does the second officer keep the 00–04 watch?**
It is the traditional split; the senior watchkeepers take the dawn and dusk watches, when the master is most likely to need them.

**Is the second officer the medical officer?**
On many ships yes, but it depends on the company.

**How long until promotion to chief officer?**
Usually after one or two contracts, once the chief mate's certificate is in hand.

## Pay and jobs

A clear step up from third officer, and a big one again to chief officer. The current range from real vacancies is on the [second officer jobs page](/jobs/rank/2nd-officer); a comparison by rank and vessel type is on our [salaries page](/salaries).

## Your CV

Crewing desks look for vessel types, the ECDIS models you have worked with and trading areas. List them in the [maritime CV](/maritime-cv) — it puts them where a manager looks first.

*Requirements follow STCW and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
  'ru', $ru$**Второй помощник** — **штурман-навигатор** судна. Каждый переход начинается на его штурманском столе, а сегодня — в его ECDIS. На этой должности офицер перестаёт быть самым новым на мостике и начинает отвечать за то, как судно дойдёт от одного причала до другого. В гайде — обязанности, вахта, типичный день, отличия по типам судов, документы, собеседование и шаг к старпому.

## Чем занимается второй помощник

- **План перехода.** Готовит план «от причала до причала» на утверждение капитану. Руководство ИМО (резолюция A.893) делит его на четыре этапа — **оценка, планирование, выполнение и контроль**: собрать информацию, проложить маршрут с безопасными глубинами, опасными районами, точками докладов и приливными окнами, затем следить за его выполнением.
- **Карты и пособия.** Держит откорректированными базу электронных карт и бумажные карты, применяет извещения мореплавателям, обновляет огни и знаки, радиосигналы, лоции и таблицы приливов.
- **Навигационное оборудование.** ECDIS, радары и САРП, GPS, гиро- и магнитный компасы, эхолот, лаг, АИС, VDR — проверки, журналы поправок, доклады капитану о неисправностях.
- **Вахта.** Обычно стоит **с 00:00 до 04:00 и с 12:00 до 16:00** — ночная «собака».
- **Другие обязанности** зависят от компании: часто ГМССБ и радиожурнал, а на многих судах — медикаменты и первая помощь.
- **В порту и на маневрах.** Обычно на корме при швартовке, несёт грузовые вахты, готовит чек-листы прихода и отхода для мостика.

## Типичный день

- **00:00–04:00:** ночная вахта — часто самая тихая и та, где тяжелее всего бороться с усталостью.
- **Утро:** сон.
- **12:00–16:00:** дневная вахта; полуденное место уходит в отчёт капитана.
- **День и вечер:** корректура карт и ENC, проверки оборудования, следующий план перехода и брифинг к приходу для капитана.

Перед портом нагрузка растёт: план до лоцманской станции должен быть готов, информация о причале собрана, оборудование мостика проверено.

## Отличия по типам судов

- **Контейнеровозы:** короткие переходы и много портов — второй помощник готовит новый план каждые несколько дней.
- **Танкеры и балкеры:** длинные океанские переходы, погодная проводка и подходы к портам со строгими ограничениями по осадке и запасу воды под килем.
- **Оффшор:** короткие рейсы к установкам, операции с DP и работа рядом с платформами; часто ждут сертификат DP.
- **Пассажирские суда:** большие команды мостика и строгие процедуры; роль штурмана-навигатора часто делят несколько помощников.

## Дипломы и документы

- **Диплом вахтенного помощника капитана** (ПДНВ II/1, 500 и более) — подтверждается каждые **пять лет**.
- **Диплом оператора ГМССБ (GOC).**
- **Подтверждения флага** (ПДНВ I/10).
- **Медицинское свидетельство** — действует не более **двух лет**.
- **Переподготовка по Basic Training** каждые пять лет; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ECDIS** общий и на тип, **ERM/BRM**; для танкеров и газовозов — начальные грузовые курсы.

## Что для этого нужно

У второго помощника тот же диплом, что и у третьего: **вахтенный помощник капитана**, правило II/1 ПДНВ (STCW). Нужно не менее 12 месяцев одобренного стажа в рамках одобренной программы подготовки (иначе 36 месяцев), включая не менее шести месяцев ходовых вахт под наблюдением, плюс диплом ГМССБ и курсы безопасности. Второго от третьего отличает опыт, а не бумага: компании повышают после одного-двух контрактов третьим помощником.

## Путь

Третий помощник → **второй помощник** → старший помощник. Для шага к старпому нужен диплом по правилу II/2 ПДНВ и не менее 12 месяцев одобренного стажа вахтенным помощником.

## Контракты и ротация

Вторые помощники обычно работают **четыре–шесть месяцев**. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**; минимум отдыха — **10 часов за 24** и **77 за семь дней** — особенно важен для вахты 00–04, которая разрывает ночь надвое.

## Вопросы на собеседовании

1. **«Какие этапы у планирования перехода?»** Оценка, планирование, выполнение, контроль — и что входит в каждый.
2. **«Как вы задаёте safety contour и safety depth в ECDIS?»** Осадка, проседание и политика компании по запасу под килем.
3. **«Как рассчитать запас воды под килем на подходе к порту?»**
4. **«Судно пересекает курс справа и не уступает. Ваши действия?»** МППСС, правила 15, 16, 17 — и когда вызывать капитана.
5. **«Расскажите порядок подачи сигнала бедствия по ГМССБ».**
6. **«Как вы корректируете ENC и проверяете, что корректура применена?»**

## Частые ошибки

- **Относиться к ECDIS как к экрану, а не системе** — на собеседовании спрашивают про тревоги, настройки и ограничения, а не только про маршруты.
- **Нет курса ECDIS на тип** оборудования, которое использует компания.
- **Слабые ответы по МППСС.** На любом собеседовании вахтенного помощника есть ситуация по МППСС.
- **CV без районов плавания** — лёд, пиратские районы, зоны ECA и загруженные проливы всё это засчитывается.

## Частые вопросы

**Нужен ли второму помощнику другой диплом, чем третьему?**
Нет. У обоих диплом вахтенного помощника по ПДНВ II/1; разница — в опыте и обязанностях.

**Почему второй помощник стоит вахту 00–04?**
Так сложилось: старшие вахтенные берут рассвет и закат, когда капитан чаще всего может понадобиться.

**Второй помощник — судовой медик?**
На многих судах да, но это зависит от компании.

**Когда повышение до старпома?**
Обычно после одного-двух контрактов, когда на руках диплом старшего помощника.

## Зарплата и вакансии

Заметный шаг вверх от третьего помощника и ещё один большой — к старпому. Актуальный диапазон по реальным вакансиям — на странице [вакансий второго помощника](/ru/jobs/rank/2nd-officer), сравнение по должностям и типам судов — на странице [зарплат](/ru/salaries).

## Ваше CV

Крюинг ищет в CV типы судов, модели ECDIS, с которыми вы работали, и районы плавания. Укажите их в [CV моряка](/ru/maritime-cv) — оно ставит их туда, куда менеджер смотрит первым.

*Требования — по ПДНВ (STCW) и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
  'ua', $ua$**Другий помічник** — **штурман-навігатор** судна. Кожен перехід починається на його штурманському столі, а сьогодні — в його ECDIS. На цій посаді офіцер перестає бути найновішим на містку й починає відповідати за те, як судно дійде від одного причалу до іншого. У гайді — обов'язки, вахта, типовий день, відмінності за типами суден, документи, співбесіда й крок до старпома.

## Чим займається другий помічник

- **План переходу.** Готує план «від причалу до причалу» на затвердження капітанові. Настанова ІМО (резолюція A.893) ділить його на чотири етапи — **оцінка, планування, виконання й контроль**: зібрати інформацію, прокласти маршрут із безпечними глибинами, небезпечними районами, точками доповідей і припливними вікнами, потім стежити за його виконанням.
- **Карти й посібники.** Тримає відкоригованими базу електронних карт і паперові карти, застосовує повідомлення мореплавцям, оновлює вогні та знаки, радіосигнали, лоції й таблиці припливів.
- **Навігаційне обладнання.** ECDIS, радари й САРП, GPS, гіро- й магнітний компаси, ехолот, лаг, АІС, VDR — перевірки, журнали поправок, доповіді капітанові про несправності.
- **Вахта.** Зазвичай несе **з 00:00 до 04:00 і з 12:00 до 16:00** — нічна «собака».
- **Інші обов'язки** залежать від компанії: часто ГМЗЛБ і радіожурнал, а на багатьох суднах — медикаменти й перша допомога.
- **У порту й на маневрах.** Зазвичай на кормі під час швартування, несе вантажні вахти, готує чек-листи приходу й відходу для містка.

## Типовий день

- **00:00–04:00:** нічна вахта — часто найтихіша й та, де найважче боротися з утомою.
- **Ранок:** сон.
- **12:00–16:00:** денна вахта; полуденне місце йде у звіт капітана.
- **День і вечір:** коректура карт і ENC, перевірки обладнання, наступний план переходу й брифінг до приходу для капітана.

Перед портом навантаження зростає: план до лоцманської станції має бути готовий, інформацію про причал зібрано, обладнання містка перевірено.

## Відмінності за типами суден

- **Контейнеровози:** короткі переходи й багато портів — другий помічник готує новий план що кілька днів.
- **Танкери й балкери:** довгі океанські переходи, погодне проведення й підходи до портів із суворими обмеженнями за осадкою й запасом води під кілем.
- **Офшор:** короткі рейси до установок, операції з DP і робота поруч із платформами; часто чекають сертифікат DP.
- **Пасажирські судна:** великі команди містка й суворі процедури; роль штурмана-навігатора часто ділять кілька помічників.

## Дипломи й документи

- **Диплом вахтового помічника капітана** (ПДНВ II/1, 500 і більше) — підтверджується кожні **п'ять років**.
- **Диплом оператора ГМЗЛБ (GOC).**
- **Підтвердження прапора** (ПДНВ I/10).
- **Медичне свідоцтво** — чинне не більше **двох років**.
- **Перепідготовка з Basic Training** кожні п'ять років; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ECDIS** загальний і на тип, **ERM/BRM**; для танкерів і газовозів — початкові вантажні курси.

## Що для цього потрібно

У другого помічника той самий диплом, що й у третього: **вахтовий помічник капітана**, правило II/1 ПДНВ (STCW). Потрібно щонайменше 12 місяців схваленого стажу в межах схваленої програми підготовки (інакше 36 місяців), зокрема щонайменше шість місяців ходових вахт під наглядом, плюс диплом ГМЗЛБ і курси безпеки. Другого від третього відрізняє досвід, а не папір: компанії підвищують після одного-двох контрактів третім помічником.

## Шлях

Третій помічник → **другий помічник** → старший помічник. Для кроку до старпома потрібен диплом за правилом II/2 ПДНВ і щонайменше 12 місяців схваленого стажу вахтовим помічником.

## Контракти й ротація

Другі помічники зазвичай працюють **чотири–шість місяців**. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**; мінімум відпочинку — **10 годин за 24** і **77 за сім днів** — особливо важливий для вахти 00–04, яка розриває ніч навпіл.

## Питання на співбесіді

1. **«Які етапи має планування переходу?»** Оцінка, планування, виконання, контроль — і що входить до кожного.
2. **«Як ви задаєте safety contour і safety depth в ECDIS?»** Осадка, просідання й політика компанії щодо запасу під кілем.
3. **«Як розрахувати запас води під кілем на підході до порту?»**
4. **«Судно перетинає курс праворуч і не поступається. Ваші дії?»** МППЗС, правила 15, 16, 17 — і коли викликати капітана.
5. **«Розкажіть порядок подання сигналу лиха за ГМЗЛБ».**
6. **«Як ви коригуєте ENC і перевіряєте, що коректуру застосовано?»**

## Часті помилки

- **Ставитися до ECDIS як до екрана, а не системи** — на співбесіді питають про тривоги, налаштування й обмеження, а не лише про маршрути.
- **Немає курсу ECDIS на тип** обладнання, яке використовує компанія.
- **Слабкі відповіді з МППЗС.** На будь-якій співбесіді вахтового помічника є ситуація з МППЗС.
- **CV без районів плавання** — лід, піратські райони, зони ECA й завантажені протоки — усе це зараховується.

## Часті питання

**Чи потрібен другому помічникові інший диплом, ніж третьому?**
Ні. В обох диплом вахтового помічника за ПДНВ II/1; різниця — у досвіді й обов'язках.

**Чому другий помічник несе вахту 00–04?**
Так склалося: старші вахтові беруть світанок і захід, коли капітан найчастіше може знадобитися.

**Другий помічник — судновий медик?**
На багатьох суднах так, але це залежить від компанії.

**Коли підвищення до старпома?**
Зазвичай після одного-двох контрактів, коли на руках диплом старшого помічника.

## Зарплата й вакансії

Помітний крок угору від третього помічника й ще один великий — до старпома. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій другого помічника](/ua/jobs/rank/2nd-officer), порівняння за посадами й типами суден — на сторінці [зарплат](/ua/salaries).

## Ваше CV

Крюїнг шукає в CV типи суден, моделі ECDIS, з якими ви працювали, і райони плавання. Зазначте їх у [CV моряка](/ua/maritime-cv) — воно ставить їх туди, куди менеджер дивиться першим.

*Вимоги — за ПДНВ (STCW) і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
  'pl', $pl$**Drugi oficer** to **oficer nawigacyjny** statku. Każda podróż zaczyna się na jego stole nawigacyjnym — a dziś w jego ECDIS. Na tym stanowisku oficer przestaje być najnowszym na mostku i zaczyna odpowiadać za to, jak statek dotrze od jednego nabrzeża do drugiego. W poradniku: obowiązki, wachta, typowy dzień, różnice według typu statku, dokumenty, rozmowa i krok do starszego oficera.

## Czym zajmuje się drugi oficer

- **Plan podróży.** Przygotowuje plan „od nabrzeża do nabrzeża” do zatwierdzenia przez kapitana. Wytyczne IMO (rezolucja A.893) dzielą go na cztery etapy — **ocenę, planowanie, realizację i monitorowanie**: zebranie informacji, wyznaczenie trasy z bezpiecznymi głębokościami, obszarami zakazanymi, punktami meldunkowymi i oknami pływowymi, a potem kontrolę jej wykonania.
- **Mapy i publikacje.** Utrzymuje poprawioną bazę map elektronicznych i mapy papierowe, nanosi Wiadomości Żeglarskie, aktualizuje spisy świateł, sygnałów radiowych, locje i tablice pływów.
- **Urządzenia nawigacyjne.** ECDIS, radary i ARPA, GPS, żyrokompas i kompas magnetyczny, echosonda, log, AIS, VDR — testy, dzienniki poprawek, zgłaszanie usterek kapitanowi.
- **Wachta.** Zwykle pełni wachtę **00:00–04:00 i 12:00–16:00** — nocną „psią wachtę”.
- **Inne obowiązki** zależą od firmy: często GMDSS i dziennik radiowy, a na wielu statkach apteczka i pierwsza pomoc.
- **W porcie i przy manewrach.** Zwykle na rufie przy cumowaniu, pełni wachty ładunkowe, przygotowuje listy kontrolne wejścia i wyjścia dla mostka.

## Typowy dzień

- **00:00–04:00:** nocna wachta — często najspokojniejsza i ta, na której najtrudniej walczyć ze zmęczeniem.
- **Rano:** sen.
- **12:00–16:00:** wachta popołudniowa; pozycja południowa trafia do raportu kapitana.
- **Popołudnie i wieczór:** korekta map i ENC, testy urządzeń, kolejny plan podróży i odprawa przed wejściem do portu dla kapitana.

Przed portem obciążenie rośnie: plan do stacji pilotowej musi być gotowy, informacje o nabrzeżu zebrane, a urządzenia mostka sprawdzone.

## Różnice według typu statku

- **Kontenerowce:** krótkie przejścia i wiele portów — drugi oficer przygotowuje nowy plan co kilka dni.
- **Tankowce i masowce:** długie przejścia oceaniczne, prowadzenie pogodowe i podejścia do portów ze ścisłymi limitami zanurzenia i zapasu wody pod stępką.
- **Offshore:** krótkie rejsy do instalacji, operacje DP i praca blisko platform; często oczekuje się certyfikatu DP.
- **Statki pasażerskie:** duże zespoły mostkowe i ścisłe procedury; rolę oficera nawigacyjnego często dzieli kilku oficerów.

## Dyplomy i dokumenty

- **Dyplom oficera wachtowego** (STCW II/1, 500 i więcej) — odnawiany co **pięć lat**.
- **Świadectwo operatora GMDSS (GOC).**
- **Potwierdzenia bandery** (STCW I/10).
- **Świadectwo zdrowia** — ważne najwyżej **dwa lata**.
- **Kursy odnawiające Basic Training** co pięć lat; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ECDIS** ogólny i typowy, **ERM/BRM**; na tankowce i gazowce — podstawowe kursy ładunkowe.

## Czego to wymaga

Drugi oficer ma ten sam dyplom co trzeci: **oficer wachtowy**, prawidło II/1 STCW. Wymaga on co najmniej 12 miesięcy zatwierdzonej praktyki w ramach zatwierdzonego programu szkolenia (inaczej 36 miesięcy), w tym co najmniej sześciu miesięcy wacht nawigacyjnych pod nadzorem, oraz świadectwa GMDSS i kursów bezpieczeństwa. Drugiego od trzeciego odróżnia doświadczenie, nie papier: firmy awansują po jednym lub dwóch kontraktach jako trzeci oficer.

## Ścieżka

Trzeci oficer → **drugi oficer** → starszy oficer. Krok do starszego oficera wymaga dyplomu z prawidła II/2 STCW i co najmniej 12 miesięcy zatwierdzonej praktyki jako oficer wachtowy.

## Kontrakty i rotacja

Drudzy oficerowie pływają zwykle **cztery–sześć miesięcy**. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**; minimum odpoczynku — **10 godzin na 24** i **77 na siedem dni** — jest szczególnie ważne przy wachcie 00–04, która dzieli noc na pół.

## Pytania na rozmowie

1. **„Jakie są etapy planowania podróży?”** Ocena, planowanie, realizacja, monitorowanie — i co wchodzi w każdy.
2. **„Jak ustawia Pan safety contour i safety depth w ECDIS?”** Zanurzenie, osiadanie i polityka firmy dotycząca zapasu pod stępką.
3. **„Jak obliczyć zapas wody pod stępką przy podejściu do portu?”**
4. **„Statek przecina kurs z prawej i nie ustępuje. Co Pan robi?”** COLREG, prawidła 15, 16, 17 — i kiedy wezwać kapitana.
5. **„Proszę omówić nadanie alarmu w niebezpieczeństwie w GMDSS”.**
6. **„Jak koryguje Pan ENC i sprawdza, czy korekty zostały naniesione?”**

## Częste błędy

- **Traktowanie ECDIS jak ekranu, a nie systemu** — na rozmowie pytają o alarmy, ustawienia i ograniczenia, nie tylko o trasy.
- **Brak kursu typowego ECDIS** dla sprzętu, którego używa firma.
- **Słabe odpowiedzi z COLREG.** Na każdej rozmowie oficera wachtowego jest sytuacja z COLREG.
- **CV bez rejonów pływania** — lód, rejony piractwa, strefy ECA i zatłoczone cieśniny się liczą.

## Najczęstsze pytania

**Czy drugi oficer potrzebuje innego dyplomu niż trzeci?**
Nie. Obaj mają dyplom oficera wachtowego STCW II/1; różnią się doświadczeniem i obowiązkami.

**Dlaczego drugi oficer ma wachtę 00–04?**
Tak przyjęto: starsi wachtowi biorą świt i zmierzch, kiedy kapitan najczęściej może ich potrzebować.

**Czy drugi oficer jest oficerem medycznym?**
Na wielu statkach tak, ale zależy to od firmy.

**Kiedy awans na starszego oficera?**
Zwykle po jednym lub dwóch kontraktach, gdy masz już dyplom starszego oficera.

## Wynagrodzenie i oferty

Wyraźny krok w górę względem trzeciego oficera i kolejny duży — do starszego oficera. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla drugich oficerów](/pl/jobs/rank/2nd-officer), a porównanie stanowisk i typów statków — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

Agencja szuka w CV typów statków, modeli ECDIS, na których pracowałeś, i rejonów pływania. Wpisz je w [CV marynarza](/pl/maritime-cv) — stawia je tam, gdzie menedżer patrzy najpierw.

*Wymagania według STCW i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$)
WHERE title->>'en' = 'Second officer on a ship: duties, watch, requirements and promotion';

-- ── 47. Third Officer ────────────────────────────────────────────────────────
UPDATE news_articles SET body = jsonb_build_object(
  'en', $en$The **third officer** is the first officer's rank a deck cadet reaches — the moment you stand a bridge watch on your own. It is also the rank with the hardest first step: every company wants a third officer with experience, and nobody has it at the start. This guide covers the duties, a typical day, the certificate, the courses with their validity, the interview, the mistakes that cost a first contract, and how to get it anyway.

## What the third officer does

- **Watchkeeping.** Usually keeps the **08:00–12:00 and 20:00–24:00** watches — often the one the master is most likely to visit.
- **Life-saving and fire-fighting equipment.** Usually in charge of lifeboats and rafts, lifejackets and immersion suits, lifebuoys, fire extinguishers, breathing apparatus and fire hoses — with the weekly and monthly inspections required by SOLAS and their records. Lifeboat engines, for example, are run every week as part of the weekly inspection.
- **Drills.** Prepares the equipment for the fire and abandon-ship drills that every crew member joins at least once a month.
- **Assisting the master.** On many ships helps with port papers, crew lists and arrival documents, and keeps the flags and signals.
- **Moorings and cargo.** Usually forward at mooring with the bosun, and keeps cargo watches in port.

## A typical day

- **08:00–12:00:** the morning watch; the master often comes up during it.
- **Afternoon:** inspections of the life-saving and fire-fighting equipment, record books, preparation for drills.
- **20:00–24:00:** the evening watch, ending with the night orders read and handed over.

In port the third officer often keeps the gangway and cargo watches and is the first person officials meet on board.

## Certificates and documents

- **Certificate of competency, officer in charge of a navigational watch** (STCW II/1, 500 GT or more) — revalidated every **five years**.
- **GMDSS General Operator's Certificate.**
- **Medical certificate** — valid for at most **two years**.
- **Basic Training** (with refreshers every five years), **Advanced Fire Fighting**, **Medical First Aid**, **Proficiency in Survival Craft (PSCRB)**, **Security Awareness / Designated Security Duties**.
- **ECDIS** generic and type-specific, **ERM/BRM**; for tankers and gas carriers the basic cargo courses.
- **Flag endorsement** (STCW I/10) when the ship's flag did not issue your certificate.

## What it takes

The certificate is **officer in charge of a navigational watch** under STCW Regulation II/1, for ships of 500 GT or more:

- at least **18 years** old;
- at least **12 months** of approved sea service as part of an approved training programme with a training record book — or **36 months** without one;
- of that, at least **six months of bridge watchkeeping** under the supervision of the master or a qualified officer;
- the **GMDSS** operator certificate, the safety courses above, and the exams of your maritime administration.

## The first contract

The certificate is the easy part. The hard part is the first company. What works:

1. **Stay with the company you were a cadet with.** It is the most common way — they already know you, and many companies run cadet programmes precisely to grow their own officers.
2. **Accept the vessel type that is hiring.** Bulk carriers and general cargo take juniors more often than tankers and gas carriers; you can move later.
3. **Show the cadet time in detail** in your CV: vessel types, months, what you did on the bridge and with the equipment.
4. **Apply widely** — agencies, ship managers, and the vacancies on job boards — and keep your documents valid. A missing course is the most common reason for a fast "no".
5. **Consider a "junior officer" or "4th officer" role** where companies offer it: it is a bridge job and counts as experience.

## Contracts and rotation

Junior officers usually sail **four to six months**, sometimes longer. MLC 2006 limits time on board before repatriation to **less than 12 months**, and the minimum rest — **10 hours in 24** and **77 in seven days** — applies from your first day as an officer.

## Interview questions for a third officer

1. **"What lights and shapes does a vessel restricted in her ability to manoeuvre show?"** COLREG lights, shapes and sound signals come up every time.
2. **"When do you call the master?"** Read the standing orders — and say so.
3. **"How often are lifeboats, rafts and extinguishers inspected?"** Weekly and monthly checks, annual servicing.
4. **"What do you do when you hear the general alarm?"** Your muster station and duties from the muster list.
5. **"Take over the watch: what do you check?"** Position, course, traffic, equipment, night orders.
6. **"Why should we hire you without officer experience?"** Your cadet record, your courses and your English.

## Common mistakes

- **Waiting for the "ideal" first ship.** The first contract is about getting the experience, not the vessel type.
- **A CV that hides the cadet sea time** or lists it without vessel types and months.
- **Courses that expire mid-contract.** Companies check the dates against the contract length.
- **Paying someone for a placement.** An honest agency is paid by the shipowner; paying for a job is a scam.

## FAQ

**How long is a deck cadet before becoming third officer?**
At least 12 months of approved sea service with a training record book, plus the exams; in practice often longer.

**Can I become third officer without a maritime academy?**
STCW allows the certificate after 36 months of sea service without an approved programme — a longer route through the ratings.

**Is the third officer the safety officer?**
Usually the third officer looks after the safety equipment; the safety officer role itself is often the chief officer's.

**What is the difference between third officer and fourth officer?**
"Fourth officer" or "junior officer" is a training role some companies use before a full watchkeeping position.

## Pay and the path

Third officer is the entry level for officers; the step to second officer usually comes after one or two contracts. The current range from real vacancies is on the [third officer jobs page](/jobs/rank/3rd-officer), and a comparison by rank on our [salaries page](/salaries).

## Your CV

For a junior officer, the [maritime CV](/maritime-cv) matters more than for anyone: it shows the cadet sea service, the courses and their dates on one page, the way crewing managers read them.

*Requirements follow STCW, SOLAS and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
  'ru', $ru$**Третий помощник** — первая офицерская должность, до которой доходит палубный кадет: момент, когда вы впервые стоите ходовую вахту сами. И должность с самым трудным первым шагом: каждой компании нужен третий помощник с опытом, а в начале его нет ни у кого. В гайде — обязанности, типичный день, диплом, курсы и их сроки, собеседование, ошибки, которые стоят первого контракта, и как его всё-таки получить.

## Чем занимается третий помощник

- **Вахта.** Обычно стоит **с 08:00 до 12:00 и с 20:00 до 24:00** — ту вахту, на которую чаще всего заходит капитан.
- **Спасательное и противопожарное оборудование.** Обычно отвечает за шлюпки и плоты, спасательные жилеты и гидрокостюмы, спасательные круги, огнетушители, дыхательные аппараты и пожарные рукава — с еженедельными и ежемесячными проверками по СОЛАС и их записями. Например, двигатели шлюпок запускают каждую неделю в рамках еженедельной проверки.
- **Учения.** Готовит оборудование к пожарным и шлюпочным тревогам, в которых каждый член экипажа участвует не реже раза в месяц.
- **Помощь капитану.** На многих судах помогает с портовыми документами, судовыми ролями и приходными бумагами, ведёт флаги и сигналы.
- **Швартовка и груз.** Обычно на баке при швартовке вместе с боцманом, несёт грузовые вахты в порту.

## Типичный день

- **08:00–12:00:** утренняя вахта; капитан часто поднимается на мостик именно в это время.
- **День:** проверки спасательного и противопожарного оборудования, журналы, подготовка к учениям.
- **20:00–24:00:** вечерняя вахта, в конце — прочитанные и переданные ночные распоряжения.

В порту третий помощник часто несёт вахту у трапа и грузовые вахты и первым встречает власти на борту.

## Дипломы и документы

- **Диплом вахтенного помощника капитана** (ПДНВ II/1, 500 и более) — подтверждается каждые **пять лет**.
- **Диплом оператора ГМССБ (GOC).**
- **Медицинское свидетельство** — действует не более **двух лет**.
- **Basic Training** (с переподготовкой каждые пять лет), **Advanced Fire Fighting**, **Medical First Aid**, **спасательные средства (PSCRB)**, **Security Awareness / Designated Security Duties**.
- **ECDIS** общий и на тип, **ERM/BRM**; для танкеров и газовозов — начальные грузовые курсы.
- **Подтверждение флага** (ПДНВ I/10), если ваш диплом выдан не государством флага судна.

## Что для этого нужно

Нужен диплом **вахтенного помощника капитана** по правилу II/1 ПДНВ (STCW) для судов валовой вместимостью 500 и более:

- возраст не менее **18 лет**;
- не менее **12 месяцев** одобренного стажа в рамках одобренной программы подготовки с книжкой регистрации подготовки — или **36 месяцев** без неё;
- из них не менее **шести месяцев ходовых вахт** под наблюдением капитана или квалифицированного помощника;
- диплом **ГМССБ**, перечисленные курсы и экзамены морской администрации.

## Первый контракт

Диплом — лёгкая часть. Трудная — первая компания. Что работает:

1. **Оставайтесь в компании, где были кадетом.** Это самый частый путь: вас там знают, а многие компании держат кадетские программы именно ради своих офицеров.
2. **Соглашайтесь на тот тип судна, где берут.** Балкеры и генгруз берут младших чаще, чем танкеры и газовозы; сменить тип можно потом.
3. **Подробно покажите кадетский стаж** в CV: типы судов, месяцы, что вы делали на мостике и с оборудованием.
4. **Подавайтесь широко** — агентства, судовые менеджеры, вакансии на сайтах — и держите документы действующими. Недостающий курс — самая частая причина быстрого «нет».
5. **Рассмотрите должность «junior officer» или «4th officer»**, если компания её предлагает: это работа на мостике, и она засчитывается в опыт.

## Контракты и ротация

Младшие офицеры обычно работают **четыре–шесть месяцев**, иногда дольше. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**, а минимум отдыха — **10 часов за 24** и **77 за семь дней** — действует с первого дня в офицерской должности.

## Вопросы на собеседовании

1. **«Какие огни и знаки несёт судно, ограниченное в возможности маневрировать?»** Огни, знаки и звуковые сигналы МППСС спрашивают всегда.
2. **«Когда вы вызываете капитана?»** Прочитайте постоянные распоряжения — и так и скажите.
3. **«Как часто проверяют шлюпки, плоты и огнетушители?»** Еженедельные и ежемесячные проверки, ежегодное обслуживание.
4. **«Что вы делаете по общесудовой тревоге?»** Ваше место и обязанности по расписанию.
5. **«Вы принимаете вахту: что проверяете?»** Место, курс, обстановка, оборудование, ночные распоряжения.
6. **«Почему мы должны взять вас без офицерского опыта?»** Кадетский стаж, курсы и английский.

## Частые ошибки

- **Ждать «идеальное» первое судно.** Первый контракт — ради опыта, а не ради типа судна.
- **CV, в котором кадетский стаж спрятан** или указан без типов судов и месяцев.
- **Курсы, которые истекают посреди контракта.** Компании сверяют даты с длительностью контракта.
- **Платить кому-то за трудоустройство.** Честному агентству платит судовладелец; плата за работу — мошенничество.

## Частые вопросы

**Сколько нужно быть кадетом, чтобы стать третьим помощником?**
Не менее 12 месяцев одобренного стажа с книжкой регистрации подготовки плюс экзамены; на практике часто дольше.

**Можно ли стать третьим помощником без морской академии?**
ПДНВ допускает диплом после 36 месяцев стажа без одобренной программы — это более долгий путь через рядовой состав.

**Третий помощник — офицер по безопасности?**
Обычно третий помощник отвечает за спасательное оборудование; сама роль офицера по безопасности часто у старпома.

**Чем третий помощник отличается от четвёртого?**
«Четвёртый помощник» или «junior officer» — учебная должность, которую некоторые компании используют перед полноценной вахтой.

## Зарплата и путь

Третий помощник — начальный уровень для офицеров; шаг ко второму помощнику обычно приходит после одного-двух контрактов. Актуальный диапазон по реальным вакансиям — на странице [вакансий третьего помощника](/ru/jobs/rank/3rd-officer), сравнение по должностям — на странице [зарплат](/ru/salaries).

## Ваше CV

Для младшего офицера [CV моряка](/ru/maritime-cv) важнее, чем для кого-либо: оно показывает кадетский стаж, курсы и их сроки на одной странице — так, как их читают крюинг-менеджеры.

*Требования — по ПДНВ (STCW), СОЛАС и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
  'ua', $ua$**Третій помічник** — перша офіцерська посада, до якої доходить палубний кадет: момент, коли ви вперше несете ходову вахту самостійно. І посада з найважчим першим кроком: кожній компанії потрібен третій помічник із досвідом, а на початку його немає ні в кого. У гайді — обов'язки, типовий день, диплом, курси та їхні строки, співбесіда, помилки, які коштують першого контракту, і як його все ж отримати.

## Чим займається третій помічник

- **Вахта.** Зазвичай несе **з 08:00 до 12:00 і з 20:00 до 24:00** — ту вахту, на яку найчастіше заходить капітан.
- **Рятувальне й протипожежне обладнання.** Зазвичай відповідає за шлюпки й плоти, рятувальні жилети й гідрокостюми, рятувальні круги, вогнегасники, дихальні апарати й пожежні рукави — із щотижневими й щомісячними перевірками за СОЛАС та їхніми записами. Наприклад, двигуни шлюпок запускають щотижня в межах щотижневої перевірки.
- **Навчання.** Готує обладнання до пожежних і шлюпкових тривог, у яких кожен член екіпажу бере участь не рідше разу на місяць.
- **Допомога капітанові.** На багатьох суднах допомагає з портовими документами, судновими ролями й прихідними паперами, веде прапори й сигнали.
- **Швартування й вантаж.** Зазвичай на баку під час швартування разом із боцманом, несе вантажні вахти в порту.

## Типовий день

- **08:00–12:00:** ранкова вахта; капітан часто піднімається на місток саме в цей час.
- **День:** перевірки рятувального й протипожежного обладнання, журнали, підготовка до навчань.
- **20:00–24:00:** вечірня вахта, наприкінці — прочитані й передані нічні розпорядження.

У порту третій помічник часто несе вахту біля трапа й вантажні вахти й першим зустрічає владу на борту.

## Дипломи й документи

- **Диплом вахтового помічника капітана** (ПДНВ II/1, 500 і більше) — підтверджується кожні **п'ять років**.
- **Диплом оператора ГМЗЛБ (GOC).**
- **Медичне свідоцтво** — чинне не більше **двох років**.
- **Basic Training** (із перепідготовкою кожні п'ять років), **Advanced Fire Fighting**, **Medical First Aid**, **рятувальні засоби (PSCRB)**, **Security Awareness / Designated Security Duties**.
- **ECDIS** загальний і на тип, **ERM/BRM**; для танкерів і газовозів — початкові вантажні курси.
- **Підтвердження прапора** (ПДНВ I/10), якщо ваш диплом видала не держава прапора судна.

## Що для цього потрібно

Потрібен диплом **вахтового помічника капітана** за правилом II/1 ПДНВ (STCW) для суден валовою місткістю 500 і більше:

- вік щонайменше **18 років**;
- щонайменше **12 місяців** схваленого стажу в межах схваленої програми підготовки з книжкою реєстрації підготовки — або **36 місяців** без неї;
- з них щонайменше **шість місяців ходових вахт** під наглядом капітана чи кваліфікованого помічника;
- диплом **ГМЗЛБ**, перелічені курси й іспити морської адміністрації.

## Перший контракт

Диплом — легка частина. Важка — перша компанія. Що працює:

1. **Залишайтеся в компанії, де були кадетом.** Це найчастіший шлях: вас там знають, а багато компаній тримають кадетські програми саме заради своїх офіцерів.
2. **Погоджуйтеся на той тип судна, де беруть.** Балкери й генвантаж беруть молодших частіше, ніж танкери й газовози; змінити тип можна потім.
3. **Детально покажіть кадетський стаж** у CV: типи суден, місяці, що ви робили на містку й з обладнанням.
4. **Подавайтеся широко** — агентства, суднові менеджери, вакансії на сайтах — і тримайте документи чинними. Відсутній курс — найчастіша причина швидкого «ні».
5. **Розгляньте посаду «junior officer» або «4th officer»**, якщо компанія її пропонує: це робота на містку, і вона зараховується в досвід.

## Контракти й ротація

Молодші офіцери зазвичай працюють **чотири–шість місяців**, іноді довше. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**, а мінімум відпочинку — **10 годин за 24** і **77 за сім днів** — діє з першого дня на офіцерській посаді.

## Питання на співбесіді

1. **«Які вогні й знаки несе судно, обмежене в можливості маневрувати?»** Вогні, знаки й звукові сигнали МППЗС питають завжди.
2. **«Коли ви викликаєте капітана?»** Прочитайте постійні розпорядження — і так і скажіть.
3. **«Як часто перевіряють шлюпки, плоти й вогнегасники?»** Щотижневі й щомісячні перевірки, щорічне обслуговування.
4. **«Що ви робите за загальносудновою тривогою?»** Ваше місце й обов'язки за розкладом.
5. **«Ви приймаєте вахту: що перевіряєте?»** Місце, курс, обстановка, обладнання, нічні розпорядження.
6. **«Чому ми маємо взяти вас без офіцерського досвіду?»** Кадетський стаж, курси й англійська.

## Часті помилки

- **Чекати «ідеальне» перше судно.** Перший контракт — заради досвіду, а не заради типу судна.
- **CV, у якому кадетський стаж сховано** або вказано без типів суден і місяців.
- **Курси, що спливають посеред контракту.** Компанії звіряють дати з тривалістю контракту.
- **Платити комусь за працевлаштування.** Чесному агентству платить судновласник; плата за роботу — шахрайство.

## Часті питання

**Скільки треба бути кадетом, щоб стати третім помічником?**
Щонайменше 12 місяців схваленого стажу з книжкою реєстрації підготовки плюс іспити; на практиці часто довше.

**Чи можна стати третім помічником без морської академії?**
ПДНВ допускає диплом після 36 місяців стажу без схваленої програми — це довший шлях через рядовий склад.

**Третій помічник — офіцер із безпеки?**
Зазвичай третій помічник відповідає за рятувальне обладнання; сама роль офіцера з безпеки часто в старпома.

**Чим третій помічник відрізняється від четвертого?**
«Четвертий помічник» або «junior officer» — навчальна посада, яку деякі компанії використовують перед повноцінною вахтою.

## Зарплата й шлях

Третій помічник — початковий рівень для офіцерів; крок до другого помічника зазвичай приходить після одного-двох контрактів. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій третього помічника](/ua/jobs/rank/3rd-officer), порівняння за посадами — на сторінці [зарплат](/ua/salaries).

## Ваше CV

Для молодшого офіцера [CV моряка](/ua/maritime-cv) важливіше, ніж для будь-кого: воно показує кадетський стаж, курси та їхні строки на одній сторінці — так, як їх читають крюїнг-менеджери.

*Вимоги — за ПДНВ (STCW), СОЛАС і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
  'pl', $pl$**Trzeci oficer** to pierwsze stanowisko oficerskie, do którego dochodzi kadet pokładowy — moment, gdy pierwszy raz samodzielnie pełnisz wachtę na mostku. I stanowisko z najtrudniejszym pierwszym krokiem: każda firma chce trzeciego oficera z doświadczeniem, a na początku nikt go nie ma. W poradniku: obowiązki, typowy dzień, dyplom, kursy i ich ważność, rozmowa, błędy, które kosztują pierwszy kontrakt, i jak go mimo to zdobyć.

## Czym zajmuje się trzeci oficer

- **Wachta.** Zwykle pełni wachtę **08:00–12:00 i 20:00–24:00** — tę, na którą kapitan zagląda najczęściej.
- **Sprzęt ratunkowy i przeciwpożarowy.** Zwykle odpowiada za szalupy i tratwy, kamizelki i kombinezony ratunkowe, koła ratunkowe, gaśnice, aparaty oddechowe i węże pożarnicze — z cotygodniowymi i comiesięcznymi przeglądami wymaganymi przez SOLAS i ich zapisami. Silniki szalup uruchamia się na przykład co tydzień w ramach przeglądu tygodniowego.
- **Ćwiczenia.** Przygotowuje sprzęt do alarmów pożarowych i alarmów opuszczenia statku, w których każdy członek załogi bierze udział co najmniej raz w miesiącu.
- **Pomoc kapitanowi.** Na wielu statkach pomaga przy dokumentach portowych, listach załogi i papierach na wejście, prowadzi flagi i sygnały.
- **Cumowanie i ładunek.** Zwykle na dziobie przy cumowaniu razem z bosmanem, pełni wachty ładunkowe w porcie.

## Typowy dzień

- **08:00–12:00:** poranna wachta; kapitan często wchodzi wtedy na mostek.
- **Po południu:** przeglądy sprzętu ratunkowego i przeciwpożarowego, dzienniki, przygotowanie ćwiczeń.
- **20:00–24:00:** wieczorna wachta, zakończona przeczytaniem i przekazaniem nocnych poleceń.

W porcie trzeci oficer często pełni wachtę przy trapie i wachty ładunkowe i jako pierwszy spotyka urzędników na burcie.

## Dyplomy i dokumenty

- **Dyplom oficera wachtowego** (STCW II/1, 500 i więcej) — odnawiany co **pięć lat**.
- **Świadectwo operatora GMDSS (GOC).**
- **Świadectwo zdrowia** — ważne najwyżej **dwa lata**.
- **Basic Training** (z odnowieniem co pięć lat), **Advanced Fire Fighting**, **Medical First Aid**, **środki ratunkowe (PSCRB)**, **Security Awareness / Designated Security Duties**.
- **ECDIS** ogólny i typowy, **ERM/BRM**; na tankowce i gazowce — podstawowe kursy ładunkowe.
- **Potwierdzenie bandery** (STCW I/10), jeśli Twój dyplom nie został wydany przez państwo bandery statku.

## Czego to wymaga

Potrzebny jest dyplom **oficera wachtowego** z prawidła II/1 STCW na statki o pojemności brutto 500 i więcej:

- co najmniej **18 lat**;
- co najmniej **12 miesięcy** zatwierdzonej praktyki w ramach zatwierdzonego programu szkolenia z książką praktyk — lub **36 miesięcy** bez niej;
- w tym co najmniej **sześć miesięcy wacht nawigacyjnych** pod nadzorem kapitana lub wykwalifikowanego oficera;
- świadectwo **GMDSS**, wymienione kursy i egzaminy administracji morskiej.

## Pierwszy kontrakt

Dyplom to łatwa część. Trudna — pierwsza firma. Co działa:

1. **Zostań w firmie, w której byłeś kadetem.** To najczęstsza droga: znają Cię tam, a wiele firm prowadzi programy kadeckie właśnie po to, by wychować własnych oficerów.
2. **Przyjmij typ statku, na który biorą.** Masowce i drobnicowce przyjmują młodszych częściej niż tankowce i gazowce; typ możesz zmienić później.
3. **Pokaż szczegółowo praktykę kadecką** w CV: typy statków, miesiące, co robiłeś na mostku i przy sprzęcie.
4. **Aplikuj szeroko** — agencje, menedżerowie statków, oferty na portalach — i pilnuj ważności dokumentów. Brakujący kurs to najczęstszy powód szybkiego „nie”.
5. **Rozważ stanowisko „junior officer” lub „4th officer”**, jeśli firma je oferuje: to praca na mostku i liczy się jako doświadczenie.

## Kontrakty i rotacja

Młodsi oficerowie pływają zwykle **cztery–sześć miesięcy**, czasem dłużej. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**, a minimum odpoczynku — **10 godzin na 24** i **77 na siedem dni** — obowiązuje od pierwszego dnia na stanowisku oficerskim.

## Pytania na rozmowie

1. **„Jakie światła i znaki pokazuje statek o ograniczonej zdolności manewrowej?”** Światła, znaki i sygnały dźwiękowe COLREG są zawsze.
2. **„Kiedy wzywa Pan kapitana?”** Przeczytaj stałe polecenia — i tak powiedz.
3. **„Jak często sprawdza się szalupy, tratwy i gaśnice?”** Przeglądy tygodniowe i miesięczne, serwis roczny.
4. **„Co Pan robi na alarm ogólny?”** Twoje miejsce zbiórki i obowiązki według rozkładu alarmowego.
5. **„Przejmuje Pan wachtę: co sprawdza?”** Pozycja, kurs, ruch, urządzenia, nocne polecenia.
6. **„Dlaczego mamy Pana zatrudnić bez doświadczenia oficerskiego?”** Praktyka kadecka, kursy i angielski.

## Częste błędy

- **Czekanie na „idealny” pierwszy statek.** Pierwszy kontrakt jest po to, by zdobyć doświadczenie, a nie typ statku.
- **CV, w którym praktyka kadecka jest ukryta** albo podana bez typów statków i miesięcy.
- **Kursy, które wygasają w trakcie kontraktu.** Firmy porównują daty z długością kontraktu.
- **Płacenie komuś za zatrudnienie.** Uczciwej agencji płaci armator; płacenie za pracę to oszustwo.

## Najczęstsze pytania

**Jak długo trzeba być kadetem, żeby zostać trzecim oficerem?**
Co najmniej 12 miesięcy zatwierdzonej praktyki z książką praktyk plus egzaminy; w praktyce często dłużej.

**Czy można zostać trzecim oficerem bez akademii morskiej?**
STCW dopuszcza dyplom po 36 miesiącach praktyki bez zatwierdzonego programu — to dłuższa droga przez załogę szeregową.

**Czy trzeci oficer jest oficerem ds. bezpieczeństwa?**
Zwykle trzeci oficer dba o sprzęt ratunkowy; sama funkcja oficera ds. bezpieczeństwa należy często do starszego oficera.

**Czym różni się trzeci oficer od czwartego?**
„Czwarty oficer” lub „junior officer” to stanowisko szkoleniowe, które niektóre firmy stosują przed pełną wachtą.

## Wynagrodzenie i ścieżka

Trzeci oficer to poziom wejściowy dla oficerów; awans na drugiego oficera przychodzi zwykle po jednym lub dwóch kontraktach. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla trzecich oficerów](/pl/jobs/rank/3rd-officer), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

Dla młodszego oficera [CV marynarza](/pl/maritime-cv) ma większe znaczenie niż dla kogokolwiek: pokazuje praktykę kadecką, kursy i ich terminy na jednej stronie — tak, jak czytają je menedżerowie agencji.

*Wymagania według STCW, SOLAS i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$)
WHERE title->>'en' = 'Third officer on a ship: duties, the first officer''s certificate and the first contract';
