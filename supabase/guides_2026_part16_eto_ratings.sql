-- Electrical and engine-room ratings (category = 'guide'), long format:
-- ETO, Electrician, Fitter, Wiper. The motorman/oiler is left out on purpose:
-- "Oiler and motorman jobs offshore" already answers those searches, and a
-- general guide would compete with it.
--
-- Facts: STCW III/6 (electro-technical officer, 750 kW or more), III/7
-- (electro-technical rating), III/4 (rating forming part of an engineering
-- watch), III/5 (able seafarer engine); I/9, VI/1; MLC 2006 rest hours,
-- Standard A2.5.1 and Standard A1.4 (no recruitment fees charged to
-- seafarers). The fitter has no STCW certificate of their own; the guide says
-- so and lists what companies actually ask for. No salary figures. The wiper
-- has no /jobs/rank landing; its guide links to the motorman and oiler pages.
--
-- pl + ru + ua + en. Covers are set at the end — run after the deploy that
-- adds public/guides/{eto,electrician,fitter,wiper}.png.
-- Idempotent — guarded by the English title.

-- ── 56. ETO ──────────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Electro-technical officer (ETO) on a ship: duties, certificate and how to get hired',
    'ru', 'Электромеханик на судне (ETO): обязанности, диплом и как устроиться',
    'ua', 'Електромеханік на судні (ETO): обов''язки, диплом і як влаштуватися',
    'pl', 'Oficer elektroautomatyk (ETO) na statku: obowiązki, dyplom i jak znaleźć pracę'),
  jsonb_build_object(
    'en', $en$The **electro-technical officer (ETO)** looks after everything on board that runs on electricity and electronics: generators and switchboards, motors and starters, automation and alarms, cranes and winches, and often the bridge and communication equipment. Ships get more electric and more automated every year, and good ETOs are among the hardest officers for crewing agencies to find. This guide covers the duties, a typical day, how the job differs by vessel type, the certificate, the interview and the mistakes that cost contracts.

## What the ETO does

- **Power generation and distribution.** Generators, the main and emergency switchboards, breakers and protection, load sharing, insulation monitoring.
- **Motors and drives.** Electric motors, starters, frequency converters, and the electrical side of pumps, fans and compressors.
- **Automation and control.** The engine control system, alarm and monitoring system, sensors, PLCs and control circuits — fault-finding is a large part of the job.
- **Deck machinery.** Cranes, winches, windlasses and hatch-cover systems, especially on bulk carriers and general cargo ships.
- **Bridge and communication equipment.** On many ships the ETO also maintains radars, GPS, gyro, ECDIS and other navigation electronics, alongside the officers who use them.
- **High voltage.** On ships with high-voltage plants, the ETO is part of the permit-to-work system for switching and isolation.
- **Records and spares.** Maintenance records, insulation readings, spare parts for electrical equipment.

The ETO reports to the chief engineer and works with the whole engine team.

## A typical day

- **08:00–17:00:** the ETO is usually a **day worker** — rounds of the switchboards and generators in the morning, then the planned jobs and whatever failed overnight.
- **Any hour:** alarms that the engineers cannot clear, blackouts, a crane that stops in the middle of cargo work.

In port the ETO's day often follows the cargo: on bulk carriers and multipurpose ships the cranes must work, and the ETO is the person who keeps them working.

## Differences by vessel type

- **Bulk carriers and general cargo:** deck cranes and hatch covers — a lot of hydraulics and electrics outdoors in all weather.
- **Container ships:** hundreds of reefer containers to monitor and connect; large generators and high loads.
- **Tankers and gas carriers:** electrical equipment in hazardous areas — explosion-proof (Ex) equipment and strict rules about it.
- **Offshore and DP vessels:** diesel-electric plants, thrusters, power management and redundancy; DP faults are often electrical.
- **Passenger ships:** high-voltage plants, electric propulsion and very large hotel systems; often several ETOs and electricians.

## Certificates and documents

- **Certificate of competency, electro-technical officer** (STCW III/6, ships of 750 kW or more) — revalidated every **five years**.
- **Medical certificate** — valid for at most **two years**.
- **Basic Training** (refreshed every five years), **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **High Voltage** training, which crewing desks ask for on most modern ships.
- **ERM**; for tankers and gas carriers the basic cargo courses; type-specific automation courses where the fleet uses them.
- **Flag endorsement** (STCW I/10) when the ship's flag did not issue your certificate.

## What it takes

Under **STCW Regulation III/6**, the ETO must be at least **18** and have completed at least **12 months** of combined workshop skill training and approved seagoing service, of which at least **six months** must be seagoing service as part of an approved training programme — or at least **36 months** otherwise, of which at least 30 months seagoing service in the engine department — plus the education and training of the STCW Code for the ETO.

There is also a rating level: the **electro-technical rating** (III/7), the electrician — see our guide on the ship's electrician.

## The path

Electrical cadet → **ETO**; experienced ETOs move to larger and more complex ships (passenger, offshore, gas carriers) or to shore jobs as electrical superintendents. Some take the engineer route, which needs separate engineer certificates.

## Contracts and rotation

ETOs usually sail **four to six months**. MLC 2006 limits time on board before repatriation to **less than 12 months**, and the rest-hour minimums — **10 hours in 24** and **77 in seven days** — apply even when the cranes break during cargo work.

## Interview questions for an ETO

1. **"How do you find an earth fault on a 440 V insulated system?"** The insulation monitor, isolating circuits one by one, safety.
2. **"Two generators do not share the load equally — what do you check?"** Governors, droop settings, the power management system.
3. **"What is the procedure before working on high-voltage equipment?"** Permit, isolation, earthing, testing for dead.
4. **"A crane stops during cargo work — how do you approach it?"** Alarms, the control circuit, limit switches, hydraulics.
5. **"What does Ex marking mean, and where does it matter?"** Hazardous areas on tankers and gas carriers.
6. **"Which automation systems have you worked with?"** Makes and models, concretely.

## Common mistakes

- **A CV without equipment makes** — switchboards, automation systems, crane makers.
- **No High Voltage course** when applying to modern ships.
- **Listing only shore electrical experience** without the marine side.
- **Courses expiring mid-contract.**

## FAQ

**What is the difference between ETO and electrician?**
The ETO is an officer with the STCW III/6 certificate; the electrician is a rating with III/7. On many ships only one of the two is carried.

**Is the ETO part of the engine department?**
Yes — the ETO reports to the chief engineer.

**Do I need High Voltage training?**
Not on every ship, but most crewing desks expect it, and on ships with high-voltage plants it is required.

**Can a shore electrician become an ETO?**
Yes, through approved training and sea service under STCW III/6 — the details depend on your maritime administration.

## Pay and jobs

ETOs are paid at officer level, often close to the second engineer on fleets that struggle to find them. The current range from real vacancies is on the [ETO jobs page](/jobs/rank/eto); compare ranks on our [salaries page](/salaries).

## Your CV

Crewing desks read an ETO's CV for vessel types, generator and switchboard makers, automation systems and High Voltage training. The [maritime CV](/maritime-cv) puts them first.

*Requirements follow STCW and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Электромеханик (ETO)** отвечает за всё на борту, что работает на электричестве и электронике: генераторы и щиты, электродвигатели и пускатели, автоматику и сигнализацию, краны и лебёдки, а часто ещё и навигационное и радиооборудование. Суда с каждым годом становятся электрифицированнее и автоматизированнее, и хороший ETO — один из самых дефицитных офицеров для крюинга. В гайде — обязанности, типичный день, отличия по типам судов, диплом, собеседование и ошибки, которые стоят контрактов.

## Чем занимается электромеханик

- **Выработка и распределение энергии.** Генераторы, главный и аварийный распределительные щиты, автоматы и защиты, распределение нагрузки, контроль сопротивления изоляции.
- **Двигатели и приводы.** Электродвигатели, пускатели, частотные преобразователи, электрическая часть насосов, вентиляторов и компрессоров.
- **Автоматика и управление.** Система управления машиной, сигнализация и мониторинг, датчики, ПЛК и цепи управления — поиск неисправностей занимает большую часть работы.
- **Палубные механизмы.** Краны, лебёдки, брашпили и системы люковых крышек — особенно на балкерах и генгрузе.
- **Навигационное и радиооборудование.** На многих судах ETO обслуживает и радары, GPS, гирокомпас, ECDIS и другую электронику мостика вместе с помощниками, которые ею пользуются.
- **Высокое напряжение.** На судах с установками высокого напряжения ETO участвует в системе нарядов-допусков на переключения и изоляцию.
- **Записи и запчасти.** Записи по обслуживанию, замеры изоляции, запчасти для электрооборудования.

ETO подчиняется стармеху и работает со всей машинной командой.

## Типичный день

- **08:00–17:00:** ETO обычно **подвахтенный** — утром обход щитов и генераторов, затем плановые работы и то, что отказало за ночь.
- **В любое время:** тревоги, которые механики не могут сбросить, блэкауты, кран, остановившийся посреди грузовых работ.

В порту день ETO часто подчинён грузу: на балкерах и многоцелевых судах краны должны работать, и именно ETO держит их в работе.

## Отличия по типам судов

- **Балкеры и генгруз:** палубные краны и люковые крышки — много гидравлики и электрики на открытой палубе в любую погоду.
- **Контейнеровозы:** сотни рефконтейнеров, которые нужно подключать и контролировать; большие генераторы и высокие нагрузки.
- **Танкеры и газовозы:** электрооборудование во взрывоопасных зонах — взрывозащищённое (Ex) исполнение и строгие правила работы с ним.
- **Оффшор и DP-суда:** дизель-электрические установки, подруливающие устройства, управление мощностью и резервирование; неисправности DP часто электрические.
- **Пассажирские суда:** высокое напряжение, электродвижение и огромные гостиничные системы; часто несколько ETO и электриков.

## Дипломы и документы

- **Диплом электромеханика (ETO)** (ПДНВ III/6, суда 750 кВт и более) — подтверждается каждые **пять лет**.
- **Медицинское свидетельство** — не более **двух лет**.
- **Basic Training** (переподготовка каждые пять лет), **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- Подготовка **High Voltage**, которую крюинг просит на большинстве современных судов.
- **ERM**; для танкеров и газовозов — начальные грузовые курсы; курсы на тип автоматики, если она есть во флоте.
- **Подтверждение флага** (ПДНВ I/10), если диплом выдан не государством флага судна.

## Что для этого нужно

По **правилу III/6 ПДНВ (STCW)** электромеханик должен быть не младше **18 лет** и пройти не менее **12 месяцев** совмещённой подготовки в мастерских и одобренного стажа, из которых не менее **шести месяцев** — стаж в море в рамках одобренной программы подготовки, — или не менее **36 месяцев** иначе, из которых не менее 30 месяцев стажа в машинной службе, плюс образование и подготовку по Кодексу ПДНВ для ETO.

Есть и уровень рядового состава — **электрик (electro-technical rating, III/7)**: о нём наш гайд про судового электрика.

## Путь

Электрокадет → **ETO**; опытные ETO переходят на более крупные и сложные суда — пассажирские, оффшор, газовозы — или на берег суперинтендантами по электрике. Некоторые идут в механики, но для этого нужны отдельные механические дипломы.

## Контракты и ротация

ETO обычно работают **четыре–шесть месяцев**. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**, а минимум отдыха — **10 часов за 24** и **77 за семь дней** — действует, даже когда краны ломаются посреди грузовых работ.

## Вопросы на собеседовании

1. **«Как найти замыкание на корпус в изолированной сети 440 В?»** Прибор контроля изоляции, поочерёдное отключение цепей, безопасность.
2. **«Два генератора неравномерно делят нагрузку — что проверяете?»** Регуляторы, статизм, система управления мощностью.
3. **«Какой порядок перед работой на оборудовании высокого напряжения?»** Допуск, отключение, заземление, проверка отсутствия напряжения.
4. **«Кран остановился во время грузовых работ — как подходите?»** Тревоги, цепь управления, концевые выключатели, гидравлика.
5. **«Что означает маркировка Ex и где это важно?»** Взрывоопасные зоны на танкерах и газовозах.
6. **«С какими системами автоматики вы работали?»** Марки и модели, конкретно.

## Частые ошибки

- **CV без марок оборудования** — щиты, системы автоматики, производители кранов.
- **Нет курса High Voltage**, когда подаётесь на современные суда.
- **Только береговой электрический опыт** без морской части.
- **Курсы, истекающие посреди контракта.**

## Частые вопросы

**Чем ETO отличается от электрика?**
ETO — офицер с дипломом ПДНВ III/6; электрик — рядовой состав со свидетельством III/7. На многих судах есть только один из двух.

**ETO входит в машинную службу?**
Да — ETO подчиняется стармеху.

**Нужен ли High Voltage?**
Не на каждом судне, но большинство крюингов его ждут, а на судах с высоким напряжением он обязателен.

**Может ли береговой электрик стать ETO?**
Да, через одобренную подготовку и стаж по правилу III/6 ПДНВ — детали зависят от морской администрации.

## Зарплата и вакансии

ETO платят на офицерском уровне, во флотах, где их не хватает, — часто близко ко второму механику. Актуальный диапазон по реальным вакансиям — на странице [вакансий электромеханика](/ru/jobs/rank/eto), сравнение должностей — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV электромеханика крюинг смотрит на типы судов, производителей генераторов и щитов, системы автоматики и курс High Voltage. [CV моряка](/ru/maritime-cv) ставит это в начало.

*Требования — по ПДНВ (STCW) и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Електромеханік (ETO)** відповідає за все на борту, що працює на електриці й електроніці: генератори й щити, електродвигуни й пускачі, автоматику й сигналізацію, крани й лебідки, а часто ще й навігаційне та радіообладнання. Судна щороку стають електрифікованішими й автоматизованішими, і добрий ETO — один із найдефіцитніших офіцерів для крюїнгу. У гайді — обов'язки, типовий день, відмінності за типами суден, диплом, співбесіда й помилки, які коштують контрактів.

## Чим займається електромеханік

- **Вироблення й розподіл енергії.** Генератори, головний і аварійний розподільні щити, автомати й захисти, розподіл навантаження, контроль опору ізоляції.
- **Двигуни й приводи.** Електродвигуни, пускачі, частотні перетворювачі, електрична частина насосів, вентиляторів і компресорів.
- **Автоматика й керування.** Система керування машиною, сигналізація й моніторинг, датчики, ПЛК і кола керування — пошук несправностей займає велику частину роботи.
- **Палубні механізми.** Крани, лебідки, брашпилі й системи люкових кришок — особливо на балкерах і генвантажі.
- **Навігаційне й радіообладнання.** На багатьох суднах ETO обслуговує й радари, GPS, гірокомпас, ECDIS та іншу електроніку містка разом із помічниками, які нею користуються.
- **Висока напруга.** На суднах з установками високої напруги ETO бере участь у системі нарядів-допусків на перемикання й ізоляцію.
- **Записи й запчастини.** Записи з обслуговування, заміри ізоляції, запчастини для електрообладнання.

ETO підпорядковується стармехові й працює з усією машинною командою.

## Типовий день

- **08:00–17:00:** ETO зазвичай **підвахтовий** — уранці обхід щитів і генераторів, потім планові роботи й те, що відмовило за ніч.
- **Будь-коли:** тривоги, які механіки не можуть скинути, блекаути, кран, що зупинився посеред вантажних робіт.

У порту день ETO часто підпорядкований вантажу: на балкерах і багатоцільових суднах крани мають працювати, і саме ETO тримає їх у роботі.

## Відмінності за типами суден

- **Балкери й генвантаж:** палубні крани й люкові кришки — багато гідравліки й електрики на відкритій палубі за будь-якої погоди.
- **Контейнеровози:** сотні рефконтейнерів, які треба підключати й контролювати; великі генератори й високі навантаження.
- **Танкери й газовози:** електрообладнання у вибухонебезпечних зонах — вибухозахищене (Ex) виконання й суворі правила роботи з ним.
- **Офшор і DP-судна:** дизель-електричні установки, підрулювальні пристрої, керування потужністю й резервування; несправності DP часто електричні.
- **Пасажирські судна:** висока напруга, електрорух і величезні готельні системи; часто кілька ETO й електриків.

## Дипломи й документи

- **Диплом електромеханіка (ETO)** (ПДНВ III/6, судна 750 кВт і більше) — підтверджується кожні **п'ять років**.
- **Медичне свідоцтво** — не більше **двох років**.
- **Basic Training** (перепідготовка кожні п'ять років), **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- Підготовка **High Voltage**, яку крюїнг просить на більшості сучасних суден.
- **ERM**; для танкерів і газовозів — початкові вантажні курси; курси на тип автоматики, якщо вона є у флоті.
- **Підтвердження прапора** (ПДНВ I/10), якщо диплом видала не держава прапора судна.

## Що для цього потрібно

За **правилом III/6 ПДНВ (STCW)** електромеханік має бути не молодшим **18 років** і пройти щонайменше **12 місяців** суміщеної підготовки в майстернях і схваленого стажу, з яких щонайменше **шість місяців** — стаж у морі в межах схваленої програми підготовки, — або щонайменше **36 місяців** інакше, з яких щонайменше 30 місяців стажу в машинній службі, плюс освіту й підготовку за Кодексом ПДНВ для ETO.

Є й рівень рядового складу — **електрик (electro-technical rating, III/7)**: про нього наш гайд про суднового електрика.

## Шлях

Електрокадет → **ETO**; досвідчені ETO переходять на більші й складніші судна — пасажирські, офшор, газовози — або на берег суперінтендантами з електрики. Деякі йдуть у механіки, але для цього потрібні окремі механічні дипломи.

## Контракти й ротація

ETO зазвичай працюють **чотири–шість місяців**. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**, а мінімум відпочинку — **10 годин за 24** і **77 за сім днів** — діє, навіть коли крани ламаються посеред вантажних робіт.

## Питання на співбесіді

1. **«Як знайти замикання на корпус в ізольованій мережі 440 В?»** Прилад контролю ізоляції, почергове вимкнення кіл, безпека.
2. **«Два генератори нерівномірно ділять навантаження — що перевіряєте?»** Регулятори, статизм, система керування потужністю.
3. **«Який порядок перед роботою на обладнанні високої напруги?»** Допуск, вимкнення, заземлення, перевірка відсутності напруги.
4. **«Кран зупинився під час вантажних робіт — як підходите?»** Тривоги, коло керування, кінцеві вимикачі, гідравліка.
5. **«Що означає маркування Ex і де це важливо?»** Вибухонебезпечні зони на танкерах і газовозах.
6. **«З якими системами автоматики ви працювали?»** Марки й моделі, конкретно.

## Часті помилки

- **CV без марок обладнання** — щити, системи автоматики, виробники кранів.
- **Немає курсу High Voltage**, коли подаєтеся на сучасні судна.
- **Лише береговий електричний досвід** без морської частини.
- **Курси, що спливають посеред контракту.**

## Часті питання

**Чим ETO відрізняється від електрика?**
ETO — офіцер із дипломом ПДНВ III/6; електрик — рядовий склад зі свідоцтвом III/7. На багатьох суднах є лише один із двох.

**ETO входить до машинної служби?**
Так — ETO підпорядковується стармехові.

**Чи потрібен High Voltage?**
Не на кожному судні, але більшість крюїнгів його чекають, а на суднах з високою напругою він обов'язковий.

**Чи може береговий електрик стати ETO?**
Так, через схвалену підготовку й стаж за правилом III/6 ПДНВ — деталі залежать від морської адміністрації.

## Зарплата й вакансії

ETO платять на офіцерському рівні, у флотах, де їх бракує, — часто близько до другого механіка. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій електромеханіка](/ua/jobs/rank/eto), порівняння посад — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV електромеханіка крюїнг дивиться на типи суден, виробників генераторів і щитів, системи автоматики й курс High Voltage. [CV моряка](/ua/maritime-cv) ставить це на початок.

*Вимоги — за ПДНВ (STCW) і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Oficer elektroautomatyk (ETO)** odpowiada za wszystko na burcie, co działa na prąd i elektronikę: generatory i rozdzielnice, silniki i rozruszniki, automatykę i alarmy, dźwigi i windy, a często także urządzenia nawigacyjne i łączności. Statki z roku na rok są coraz bardziej zelektryfikowane i zautomatyzowane, a dobry ETO to jeden z oficerów, których agencjom najtrudniej znaleźć. W poradniku: obowiązki, typowy dzień, różnice według typu statku, dyplom, rozmowa i błędy, które kosztują kontrakty.

## Czym zajmuje się ETO

- **Wytwarzanie i rozdział energii.** Generatory, rozdzielnica główna i awaryjna, wyłączniki i zabezpieczenia, rozdział obciążenia, kontrola rezystancji izolacji.
- **Silniki i napędy.** Silniki elektryczne, rozruszniki, przemienniki częstotliwości, elektryczna część pomp, wentylatorów i sprężarek.
- **Automatyka i sterowanie.** System sterowania siłownią, alarmy i monitoring, czujniki, sterowniki PLC i obwody sterowania — wyszukiwanie usterek to duża część pracy.
- **Urządzenia pokładowe.** Dźwigi, windy, windy kotwiczne i systemy pokryw lukowych — szczególnie na masowcach i drobnicowcach.
- **Urządzenia nawigacyjne i łączności.** Na wielu statkach ETO konserwuje też radary, GPS, żyrokompas, ECDIS i inną elektronikę mostka razem z oficerami, którzy z niej korzystają.
- **Wysokie napięcie.** Na statkach z instalacją wysokiego napięcia ETO uczestniczy w systemie zezwoleń na przełączenia i odłączenia.
- **Zapisy i części.** Zapisy konserwacji, pomiary izolacji, części do urządzeń elektrycznych.

ETO podlega starszemu mechanikowi i pracuje z całym zespołem maszynowym.

## Typowy dzień

- **08:00–17:00:** ETO zwykle pracuje **na dniówce** — rano obchód rozdzielnic i generatorów, potem prace planowe i to, co zepsuło się w nocy.
- **O każdej porze:** alarmy, których mechanicy nie mogą skasować, blackouty, dźwig, który stanął w środku prac ładunkowych.

W porcie dzień ETO często zależy od ładunku: na masowcach i statkach wielozadaniowych dźwigi muszą działać, a to ETO utrzymuje je w ruchu.

## Różnice według typu statku

- **Masowce i drobnicowce:** dźwigi pokładowe i pokrywy lukowe — dużo hydrauliki i elektryki na otwartym pokładzie przy każdej pogodzie.
- **Kontenerowce:** setki kontenerów chłodzonych do podłączenia i kontroli; duże generatory i wysokie obciążenia.
- **Tankowce i gazowce:** urządzenia elektryczne w strefach zagrożenia wybuchem — wykonanie przeciwwybuchowe (Ex) i ścisłe zasady pracy.
- **Offshore i statki DP:** napęd spalinowo-elektryczny, pędniki, zarządzanie mocą i redundancja; usterki DP są często elektryczne.
- **Statki pasażerskie:** wysokie napięcie, napęd elektryczny i ogromne systemy hotelowe; często kilku ETO i elektryków.

## Dyplomy i dokumenty

- **Dyplom oficera elektroautomatyka (ETO)** (STCW III/6, statki 750 kW i więcej) — odnawiany co **pięć lat**.
- **Świadectwo zdrowia** — ważne najwyżej **dwa lata**.
- **Basic Training** (odnawiany co pięć lat), **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- Szkolenie **High Voltage**, o które agencje proszą na większości nowoczesnych statków.
- **ERM**; na tankowce i gazowce — podstawowe kursy ładunkowe; kursy typowe dla automatyki, jeśli flota jej używa.
- **Potwierdzenie bandery** (STCW I/10), jeśli dyplom nie został wydany przez państwo bandery statku.

## Czego to wymaga

Zgodnie z **prawidłem III/6 STCW** ETO musi mieć co najmniej **18 lat** i ukończyć co najmniej **12 miesięcy** łączonego szkolenia warsztatowego i zatwierdzonej praktyki, w tym co najmniej **sześć miesięcy** praktyki na morzu w ramach zatwierdzonego programu szkolenia — albo co najmniej **36 miesięcy** w inny sposób, w tym co najmniej 30 miesięcy praktyki w dziale maszynowym — oraz wykształcenie i szkolenie według Kodeksu STCW dla ETO.

Jest też poziom załogi szeregowej — **elektryk (electro-technical rating, III/7)**: o nim nasz poradnik o elektryku okrętowym.

## Ścieżka

Kadet elektryk → **ETO**; doświadczeni ETO przechodzą na większe i bardziej złożone statki — pasażerskie, offshore, gazowce — albo na ląd jako inspektorzy elektryczni. Niektórzy wybierają drogę mechanika, ale to wymaga osobnych dyplomów mechanicznych.

## Kontrakty i rotacja

ETO pływają zwykle **cztery–sześć miesięcy**. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**, a minimum odpoczynku — **10 godzin na 24** i **77 na siedem dni** — obowiązuje nawet wtedy, gdy dźwigi psują się w trakcie prac ładunkowych.

## Pytania na rozmowie

1. **„Jak znaleźć zwarcie doziemne w izolowanej sieci 440 V?”** Kontrola izolacji, odłączanie obwodów po kolei, bezpieczeństwo.
2. **„Dwa generatory nierówno dzielą obciążenie — co Pan sprawdza?”** Regulatory, statyzm, system zarządzania mocą.
3. **„Jaka jest procedura przed pracą przy wysokim napięciu?”** Zezwolenie, odłączenie, uziemienie, sprawdzenie braku napięcia.
4. **„Dźwig stanął podczas prac ładunkowych — od czego Pan zaczyna?”** Alarmy, obwód sterowania, wyłączniki krańcowe, hydraulika.
5. **„Co oznacza oznaczenie Ex i gdzie ma znaczenie?”** Strefy zagrożenia wybuchem na tankowcach i gazowcach.
6. **„Z jakimi systemami automatyki Pan pracował?”** Marki i modele, konkretnie.

## Częste błędy

- **CV bez marek urządzeń** — rozdzielnice, systemy automatyki, producenci dźwigów.
- **Brak kursu High Voltage**, gdy aplikujesz na nowoczesne statki.
- **Tylko lądowe doświadczenie elektryczne** bez części morskiej.
- **Kursy wygasające w trakcie kontraktu.**

## Najczęstsze pytania

**Czym ETO różni się od elektryka?**
ETO to oficer z dyplomem STCW III/6; elektryk to członek załogi szeregowej ze świadectwem III/7. Na wielu statkach jest tylko jeden z nich.

**Czy ETO należy do działu maszynowego?**
Tak — ETO podlega starszemu mechanikowi.

**Czy potrzebny jest High Voltage?**
Nie na każdym statku, ale większość agencji go oczekuje, a na statkach z wysokim napięciem jest wymagany.

**Czy elektryk z lądu może zostać ETO?**
Tak, przez zatwierdzone szkolenie i praktykę według prawidła III/6 STCW — szczegóły zależą od administracji morskiej.

## Wynagrodzenie i oferty

ETO zarabiają na poziomie oficerskim, we flotach, którym ich brakuje, często blisko drugiego mechanika. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla ETO](/pl/jobs/rank/eto), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV ETO agencja patrzy na typy statków, producentów generatorów i rozdzielnic, systemy automatyki i kurs High Voltage. [CV marynarza](/pl/maritime-cv) stawia to na początku.

*Wymagania według STCW i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Engine', 'guide',
  'linear-gradient(135deg,#0e2a45,#13647a)',
  true, '2026-10-12 09:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Electro-technical officer (ETO) on a ship: duties, certificate and how to get hired');

-- ── 57. Electrician ──────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Ship''s electrician: duties, the STCW certificate and how it differs from the ETO',
    'ru', 'Судовой электрик: обязанности, свидетельство ПДНВ и чем отличается от ETO',
    'ua', 'Судновий електрик: обов''язки, свідоцтво ПДНВ і чим відрізняється від ETO',
    'pl', 'Elektryk okrętowy: obowiązki, świadectwo STCW i czym różni się od ETO'),
  jsonb_build_object(
    'en', $en$The **ship's electrician** — in STCW terms the **electro-technical rating** — maintains and repairs the electrical equipment on board under the direction of the ETO or the engineers. On some ships the electrician works alongside an ETO; on others, smaller ones especially, the electrician is the only electrical specialist on board. For electricians from shore it is also one of the most direct ways to sea. This guide covers the duties, the difference from the ETO, the certificate, a typical day, the interview and how to get the first contract.

## What the electrician does

- **Maintenance of electrical equipment.** Motors, starters, lighting, cables, junction boxes and distribution panels — inspection, cleaning, testing, repair.
- **Insulation readings and tests.** Regular measurements and records, and finding the faults the readings point to.
- **Deck machinery.** The electrical side of cranes, winches, windlasses and hatch covers.
- **Emergency equipment.** Emergency lighting, batteries, the emergency generator's electrical side, alarm and signal circuits.
- **Galley and accommodation.** Ovens, refrigerators, laundry, air conditioning — everything the crew notices first when it breaks.
- **Helping the ETO and engineers** with larger jobs, fault-finding and planned maintenance.

## Electrician or ETO?

- **Level:** the electrician is a **rating**; the ETO is an **officer**.
- **STCW:** the electrician holds **III/7** (electro-technical rating); the ETO holds **III/6**.
- **Work:** the electrician carries out maintenance and repairs; the ETO also plans, diagnoses complex automation and power management, and answers for the electrical plant to the chief engineer.
- **Pay:** the ETO is paid at officer level, the electrician at senior-rating level.

Many electricians later study for the ETO certificate.

## A typical day

The electrician is usually a **day worker**, roughly 08:00–17:00: the jobs of the planned maintenance system in the morning, repairs and requests from the crew in the afternoon. Breakdowns — a crane, a reefer, a galley oven — come at any hour, and in port the cargo gear often decides the day.

## Differences by vessel type

- **Bulk carriers and general cargo:** cranes and hatch covers, outdoors, in salt and rain.
- **Container ships:** reefer containers — connecting, monitoring and repairing them is often the electrician's main job.
- **Tankers and gas carriers:** explosion-proof (Ex) equipment in hazardous areas and strict permits.
- **Passenger ships:** a large electrical department with several electricians, cabins, galleys and hotel systems on a big scale.
- **Offshore:** diesel-electric plants and thrusters; often a mix of marine and offshore safety training.

## Certificates and documents

- **Electro-technical rating** (STCW III/7).
- **Basic Training** (refreshed every five years) and **Security Awareness** or **Designated Security Duties**.
- **Medical certificate** — valid for at most **two years**.
- **High Voltage** awareness or training where the ship has a high-voltage plant.
- A **seaman's book** and passport; a shore electrical qualification is a strong plus.

## What it takes

Under **STCW Regulation III/7**, the electro-technical rating must be at least **18** and have **one** of:

- approved seagoing service including at least **12 months** of training and experience; or
- approved training including at least **six months** of approved seagoing service; or
- qualifications that meet the competences of the STCW Code for this rating, plus at least **three months** of approved seagoing service.

The third route is the one many shore electricians use: the qualification is already there, and the sea time is short.

## How to get the first contract

1. **Get the STCW basics first**: Basic Training, medical, seaman's book.
2. **Show your shore experience in detail**: industrial installations, motors, PLCs, high voltage — with dates.
3. **Ask the agency which route to III/7 your administration recognises.**
4. **Start where electricians are carried**: container ships with reefers, passenger ships, larger offshore vessels.
5. **Never pay for a placement** — under MLC 2006 recruitment fees must not be charged to the seafarer.

## Contracts and rotation

Electricians usually sail **four to nine months**, depending on the company. MLC 2006 limits time on board before repatriation to **less than 12 months**, and the rest-hour minimums — **10 hours in 24** and **77 in seven days** — apply to every rating.

## Interview questions for an electrician

1. **"How do you measure insulation resistance, and what is a bad reading?"**
2. **"A motor trips on overload — what do you check?"** The load, the motor, the starter, the settings.
3. **"How do you isolate equipment safely before work?"** Lock-out, tag-out, testing for dead.
4. **"A reefer container shows an alarm — your steps?"**
5. **"What is different about equipment in a hazardous area?"** Ex marking, no improvised repairs.
6. **"What shore electrical work have you done?"** Concretely.

## Common mistakes

- **A CV that hides the shore qualification** — for this rank it is often the strongest argument.
- **Applying as ETO without the III/6 certificate.**
- **No Basic Training** — the most common reason a shore electrician is turned down.
- **Paying an agency.** An honest agency is paid by the shipowner.

## FAQ

**Can a shore electrician go to sea?**
Yes. STCW III/7 has a route for people whose qualification already covers the competences, with as little as three months of approved sea service.

**Do I need English?**
Basic technical English, yes — manuals, alarms and the engineers are in English.

**What is the next step after electrician?**
The ETO certificate under STCW III/6, which brings officer rank and pay.

**Is "electrician" the same as "electro-technical rating"?**
Yes — the second is the STCW name.

## Pay and jobs

The electrician is a senior rating; the pay sits above most ratings and below the ETO. The current range from real vacancies is on the [electrician jobs page](/jobs/rank/electrician); see the [ETO jobs](/jobs/rank/eto) for the next step and compare ranks on our [salaries page](/salaries).

## Your CV

Crewing desks read an electrician's CV for the shore qualification, equipment worked on and vessel types. The [maritime CV](/maritime-cv) puts them on one page.

*Requirements follow STCW and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Судовой электрик** — по ПДНВ **electro-technical rating**, электрик рядового состава — обслуживает и ремонтирует электрооборудование на борту под руководством ETO или механиков. На одних судах электрик работает рядом с ETO, на других, особенно небольших, он единственный электрик на борту. Для береговых электриков это ещё и один из самых прямых путей в море. В гайде — обязанности, отличие от ETO, свидетельство, типичный день, собеседование и как получить первый контракт.

## Чем занимается электрик

- **Обслуживание электрооборудования.** Двигатели, пускатели, освещение, кабели, распределительные коробки и щиты — осмотр, чистка, проверки, ремонт.
- **Замеры изоляции и испытания.** Регулярные замеры и записи и поиск неисправностей, на которые они указывают.
- **Палубные механизмы.** Электрическая часть кранов, лебёдок, брашпилей и люковых крышек.
- **Аварийное оборудование.** Аварийное освещение, аккумуляторы, электрическая часть аварийного генератора, цепи тревог и сигнализации.
- **Камбуз и жилые помещения.** Плиты, холодильники, прачечная, кондиционирование — всё, что экипаж замечает первым, когда оно ломается.
- **Помощь ETO и механикам** в крупных работах, поиске неисправностей и плановом обслуживании.

## Электрик или ETO?

- **Уровень:** электрик — **рядовой состав**, ETO — **офицер**.
- **ПДНВ:** у электрика свидетельство **III/7**, у ETO — диплом **III/6**.
- **Работа:** электрик выполняет обслуживание и ремонт; ETO ещё планирует, разбирается со сложной автоматикой и управлением мощностью и отвечает за электроустановку перед стармехом.
- **Зарплата:** ETO платят на офицерском уровне, электрику — на уровне старшего рядового состава.

Многие электрики потом учатся на диплом ETO.

## Типичный день

Электрик обычно **подвахтенный**, примерно с 08:00 до 17:00: утром работы по системе планового обслуживания, днём ремонты и заявки экипажа. Поломки — кран, рефконтейнер, плита на камбузе — бывают в любое время, а в порту день часто определяет грузовое устройство.

## Отличия по типам судов

- **Балкеры и генгруз:** краны и люковые крышки на открытой палубе, в соли и под дождём.
- **Контейнеровозы:** рефконтейнеры — подключение, контроль и ремонт часто главная работа электрика.
- **Танкеры и газовозы:** взрывозащищённое (Ex) оборудование во взрывоопасных зонах и строгие допуски.
- **Пассажирские суда:** большая электрослужба с несколькими электриками, каюты, камбузы и гостиничные системы в большом масштабе.
- **Оффшор:** дизель-электрические установки и подруливающие устройства; часто смесь морских и оффшорных курсов безопасности.

## Свидетельства и документы

- **Электрик (electro-technical rating)**, ПДНВ III/7.
- **Basic Training** (переподготовка каждые пять лет) и **Security Awareness** или **Designated Security Duties**.
- **Медицинское свидетельство** — не более **двух лет**.
- Подготовка по **высокому напряжению**, если на судне установка высокого напряжения.
- **Мореходная книжка** и паспорт; береговая электрическая квалификация — серьёзный плюс.

## Что для этого нужно

По **правилу III/7 ПДНВ (STCW)** электрик должен быть не младше **18 лет** и иметь **одно** из:

- одобренный стаж в море, включающий не менее **12 месяцев** подготовки и опыта; или
- одобренную подготовку, включающую не менее **шести месяцев** одобренного стажа в море; или
- квалификацию, отвечающую компетенциям Кодекса ПДНВ для этой должности, плюс не менее **трёх месяцев** одобренного стажа в море.

Третьим путём пользуются многие береговые электрики: квалификация уже есть, а стажа нужно немного.

## Как получить первый контракт

1. **Сначала базовые документы ПДНВ**: Basic Training, медкомиссия, мореходная книжка.
2. **Подробно опишите береговой опыт**: промышленные установки, двигатели, ПЛК, высокое напряжение — с датами.
3. **Спросите в агентстве, какой путь к III/7 признаёт ваша администрация.**
4. **Начинайте там, где электрики есть в штате**: контейнеровозы с рефконтейнерами, пассажирские суда, крупные оффшорные суда.
5. **Никогда не платите за трудоустройство** — по MLC 2006 сборы за трудоустройство с моряка брать нельзя.

## Контракты и ротация

Электрики обычно работают **четыре–девять месяцев**, в зависимости от компании. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**, а минимум отдыха — **10 часов за 24** и **77 за семь дней** — касается всего рядового состава.

## Вопросы на собеседовании

1. **«Как измерить сопротивление изоляции и какое значение плохое?»**
2. **«Двигатель отключается по перегрузке — что проверяете?»** Нагрузку, двигатель, пускатель, уставки.
3. **«Как безопасно отключить оборудование перед работой?»** Блокировка, бирка, проверка отсутствия напряжения.
4. **«Рефконтейнер выдаёт тревогу — ваши шаги?»**
5. **«Чем отличается оборудование во взрывоопасной зоне?»** Маркировка Ex, никаких самодельных ремонтов.
6. **«Какие электрические работы вы делали на берегу?»** Конкретно.

## Частые ошибки

- **CV, в котором спрятана береговая квалификация** — для этой должности это часто самый сильный аргумент.
- **Подаваться на ETO без диплома III/6.**
- **Нет Basic Training** — самая частая причина отказа береговому электрику.
- **Платить агентству.** Честному агентству платит судовладелец.

## Частые вопросы

**Может ли береговой электрик уйти в море?**
Да. В правиле III/7 ПДНВ есть путь для тех, чья квалификация уже покрывает компетенции, — с одобренным стажем в море всего от трёх месяцев.

**Нужен ли английский?**
Базовый технический — да: инструкции, тревоги и механики — на английском.

**Какой следующий шаг после электрика?**
Диплом ETO по правилу III/6 ПДНВ — офицерская должность и зарплата.

**«Электрик» и «electro-technical rating» — одно и то же?**
Да, второе — название по ПДНВ.

## Зарплата и вакансии

Электрик — старший рядовой состав; зарплата выше большинства рядовых должностей и ниже ETO. Актуальный диапазон по реальным вакансиям — на странице [вакансий электрика](/ru/jobs/rank/electrician); следующий шаг — [вакансии электромеханика](/ru/jobs/rank/eto), сравнение должностей — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV электрика крюинг смотрит на береговую квалификацию, оборудование, с которым вы работали, и типы судов. [CV моряка](/ru/maritime-cv) собирает их на одной странице.

*Требования — по ПДНВ (STCW) и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Судновий електрик** — за ПДНВ **electro-technical rating**, електрик рядового складу — обслуговує й ремонтує електрообладнання на борту під керівництвом ETO або механіків. На одних суднах електрик працює поруч з ETO, на інших, особливо невеликих, він єдиний електрик на борту. Для берегових електриків це ще й один із найпряміших шляхів у море. У гайді — обов'язки, відмінність від ETO, свідоцтво, типовий день, співбесіда й як отримати перший контракт.

## Чим займається електрик

- **Обслуговування електрообладнання.** Двигуни, пускачі, освітлення, кабелі, розподільні коробки й щити — огляд, чищення, перевірки, ремонт.
- **Заміри ізоляції та випробування.** Регулярні заміри й записи та пошук несправностей, на які вони вказують.
- **Палубні механізми.** Електрична частина кранів, лебідок, брашпилів і люкових кришок.
- **Аварійне обладнання.** Аварійне освітлення, акумулятори, електрична частина аварійного генератора, кола тривог і сигналізації.
- **Камбуз і житлові приміщення.** Плити, холодильники, пральня, кондиціювання — усе, що екіпаж помічає першим, коли воно ламається.
- **Допомога ETO й механікам** у великих роботах, пошуку несправностей і плановому обслуговуванні.

## Електрик чи ETO?

- **Рівень:** електрик — **рядовий склад**, ETO — **офіцер**.
- **ПДНВ:** в електрика свідоцтво **III/7**, в ETO — диплом **III/6**.
- **Робота:** електрик виконує обслуговування й ремонт; ETO ще планує, розбирається зі складною автоматикою й керуванням потужністю та відповідає за електроустановку перед стармехом.
- **Зарплата:** ETO платять на офіцерському рівні, електрикові — на рівні старшого рядового складу.

Багато електриків потім навчаються на диплом ETO.

## Типовий день

Електрик зазвичай **підвахтовий**, приблизно з 08:00 до 17:00: уранці роботи за системою планового обслуговування, удень ремонти й заявки екіпажу. Поломки — кран, рефконтейнер, плита на камбузі — бувають будь-коли, а в порту день часто визначає вантажний пристрій.

## Відмінності за типами суден

- **Балкери й генвантаж:** крани й люкові кришки на відкритій палубі, у солі й під дощем.
- **Контейнеровози:** рефконтейнери — підключення, контроль і ремонт часто головна робота електрика.
- **Танкери й газовози:** вибухозахищене (Ex) обладнання у вибухонебезпечних зонах і суворі допуски.
- **Пасажирські судна:** велика електрослужба з кількома електриками, каюти, камбузи й готельні системи у великому масштабі.
- **Офшор:** дизель-електричні установки й підрулювальні пристрої; часто суміш морських і офшорних курсів безпеки.

## Свідоцтва й документи

- **Електрик (electro-technical rating)**, ПДНВ III/7.
- **Basic Training** (перепідготовка кожні п'ять років) і **Security Awareness** або **Designated Security Duties**.
- **Медичне свідоцтво** — не більше **двох років**.
- Підготовка з **високої напруги**, якщо на судні установка високої напруги.
- **Послужна книжка** й паспорт; берегова електрична кваліфікація — серйозний плюс.

## Що для цього потрібно

За **правилом III/7 ПДНВ (STCW)** електрик має бути не молодшим **18 років** і мати **одне** з:

- схвалений стаж у морі, що включає щонайменше **12 місяців** підготовки й досвіду; або
- схвалену підготовку, що включає щонайменше **шість місяців** схваленого стажу в морі; або
- кваліфікацію, що відповідає компетенціям Кодексу ПДНВ для цієї посади, плюс щонайменше **три місяці** схваленого стажу в морі.

Третім шляхом користуються багато берегових електриків: кваліфікація вже є, а стажу потрібно небагато.

## Як отримати перший контракт

1. **Спочатку базові документи ПДНВ**: Basic Training, медкомісія, послужна книжка.
2. **Детально опишіть береговий досвід**: промислові установки, двигуни, ПЛК, висока напруга — з датами.
3. **Запитайте в агентстві, який шлях до III/7 визнає ваша адміністрація.**
4. **Починайте там, де електрики є в штаті**: контейнеровози з рефконтейнерами, пасажирські судна, великі офшорні судна.
5. **Ніколи не платіть за працевлаштування** — за MLC 2006 збори за працевлаштування з моряка брати не можна.

## Контракти й ротація

Електрики зазвичай працюють **чотири–дев'ять місяців**, залежно від компанії. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**, а мінімум відпочинку — **10 годин за 24** і **77 за сім днів** — стосується всього рядового складу.

## Питання на співбесіді

1. **«Як виміряти опір ізоляції і яке значення погане?»**
2. **«Двигун вимикається через перевантаження — що перевіряєте?»** Навантаження, двигун, пускач, уставки.
3. **«Як безпечно вимкнути обладнання перед роботою?»** Блокування, бирка, перевірка відсутності напруги.
4. **«Рефконтейнер видає тривогу — ваші кроки?»**
5. **«Чим відрізняється обладнання у вибухонебезпечній зоні?»** Маркування Ex, жодних саморобних ремонтів.
6. **«Які електричні роботи ви виконували на березі?»** Конкретно.

## Часті помилки

- **CV, у якому сховано берегову кваліфікацію** — для цієї посади це часто найсильніший аргумент.
- **Подаватися на ETO без диплома III/6.**
- **Немає Basic Training** — найчастіша причина відмови береговому електрикові.
- **Платити агентству.** Чесному агентству платить судновласник.

## Часті питання

**Чи може береговий електрик піти в море?**
Так. У правилі III/7 ПДНВ є шлях для тих, чия кваліфікація вже покриває компетенції, — зі схваленим стажем у морі лише від трьох місяців.

**Чи потрібна англійська?**
Базова технічна — так: інструкції, тривоги й механіки — англійською.

**Який наступний крок після електрика?**
Диплом ETO за правилом III/6 ПДНВ — офіцерська посада й зарплата.

**«Електрик» і «electro-technical rating» — одне й те саме?**
Так, друге — назва за ПДНВ.

## Зарплата й вакансії

Електрик — старший рядовий склад; зарплата вища за більшість рядових посад і нижча за ETO. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій електрика](/ua/jobs/rank/electrician); наступний крок — [вакансії електромеханіка](/ua/jobs/rank/eto), порівняння посад — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV електрика крюїнг дивиться на берегову кваліфікацію, обладнання, з яким ви працювали, і типи суден. [CV моряка](/ua/maritime-cv) збирає їх на одній сторінці.

*Вимоги — за ПДНВ (STCW) і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Elektryk okrętowy** — w terminologii STCW **electro-technical rating**, elektryk z załogi szeregowej — konserwuje i naprawia urządzenia elektryczne na burcie pod kierunkiem ETO lub mechaników. Na niektórych statkach pracuje obok ETO, na innych, zwłaszcza mniejszych, jest jedynym elektrykiem na burcie. Dla elektryków z lądu to także jedna z najprostszych dróg na morze. W poradniku: obowiązki, różnica względem ETO, świadectwo, typowy dzień, rozmowa i jak zdobyć pierwszy kontrakt.

## Czym zajmuje się elektryk

- **Konserwacja urządzeń elektrycznych.** Silniki, rozruszniki, oświetlenie, kable, puszki i rozdzielnice — przeglądy, czyszczenie, testy, naprawy.
- **Pomiary izolacji i testy.** Regularne pomiary i zapisy oraz szukanie usterek, na które wskazują.
- **Urządzenia pokładowe.** Elektryczna część dźwigów, wind, wind kotwicznych i pokryw lukowych.
- **Urządzenia awaryjne.** Oświetlenie awaryjne, akumulatory, elektryczna część awaryjnego zespołu prądotwórczego, obwody alarmów i sygnalizacji.
- **Kambuz i pomieszczenia mieszkalne.** Piece, lodówki, pralnia, klimatyzacja — wszystko, co załoga zauważa najpierw, gdy się zepsuje.
- **Pomoc ETO i mechanikom** przy większych pracach, szukaniu usterek i planowej konserwacji.

## Elektryk czy ETO?

- **Poziom:** elektryk to **załoga szeregowa**, ETO to **oficer**.
- **STCW:** elektryk ma świadectwo **III/7**, ETO — dyplom **III/6**.
- **Praca:** elektryk wykonuje konserwację i naprawy; ETO także planuje, diagnozuje złożoną automatykę i zarządzanie mocą i odpowiada za instalację elektryczną przed starszym mechanikiem.
- **Płaca:** ETO zarabia na poziomie oficerskim, elektryk — na poziomie starszej załogi szeregowej.

Wielu elektryków uczy się potem na dyplom ETO.

## Typowy dzień

Elektryk pracuje zwykle **na dniówce**, mniej więcej 08:00–17:00: rano prace z systemu planowej konserwacji, po południu naprawy i zgłoszenia załogi. Awarie — dźwig, kontener chłodzony, piec w kambuzie — zdarzają się o każdej porze, a w porcie dzień często wyznaczają urządzenia ładunkowe.

## Różnice według typu statku

- **Masowce i drobnicowce:** dźwigi i pokrywy lukowe na otwartym pokładzie, w soli i deszczu.
- **Kontenerowce:** kontenery chłodzone — podłączanie, kontrola i naprawy to często główna praca elektryka.
- **Tankowce i gazowce:** urządzenia przeciwwybuchowe (Ex) w strefach zagrożenia i ścisłe zezwolenia.
- **Statki pasażerskie:** duży dział elektryczny z kilkoma elektrykami, kabiny, kambuzy i systemy hotelowe na dużą skalę.
- **Offshore:** napęd spalinowo-elektryczny i pędniki; często połączenie kursów morskich i offshore.

## Świadectwa i dokumenty

- **Elektryk (electro-technical rating)**, STCW III/7.
- **Basic Training** (odnawiany co pięć lat) i **Security Awareness** lub **Designated Security Duties**.
- **Świadectwo zdrowia** — ważne najwyżej **dwa lata**.
- Szkolenie z **wysokiego napięcia**, jeśli statek ma taką instalację.
- **Książeczka żeglarska** i paszport; lądowe kwalifikacje elektryczne to duży plus.

## Czego to wymaga

Zgodnie z **prawidłem III/7 STCW** elektryk musi mieć co najmniej **18 lat** i **jedno** z:

- zatwierdzonej praktyki na morzu obejmującej co najmniej **12 miesięcy** szkolenia i doświadczenia; lub
- zatwierdzonego szkolenia obejmującego co najmniej **sześć miesięcy** zatwierdzonej praktyki na morzu; lub
- kwalifikacji spełniających kompetencje Kodeksu STCW dla tego stanowiska oraz co najmniej **trzech miesięcy** zatwierdzonej praktyki na morzu.

Z trzeciej drogi korzysta wielu elektryków z lądu: kwalifikacje już mają, a praktyki potrzeba niewiele.

## Jak zdobyć pierwszy kontrakt

1. **Najpierw podstawowe dokumenty STCW**: Basic Training, świadectwo zdrowia, książeczka żeglarska.
2. **Opisz szczegółowo doświadczenie z lądu**: instalacje przemysłowe, silniki, sterowniki PLC, wysokie napięcie — z datami.
3. **Zapytaj w agencji, którą drogę do III/7 uznaje Twoja administracja.**
4. **Zacznij tam, gdzie elektrycy są w załodze**: kontenerowce z kontenerami chłodzonymi, statki pasażerskie, większe jednostki offshore.
5. **Nigdy nie płać za zatrudnienie** — zgodnie z MLC 2006 marynarz nie może ponosić opłat za pośrednictwo.

## Kontrakty i rotacja

Elektrycy pływają zwykle **cztery–dziewięć miesięcy**, zależnie od firmy. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**, a minimum odpoczynku — **10 godzin na 24** i **77 na siedem dni** — dotyczy całej załogi szeregowej.

## Pytania na rozmowie

1. **„Jak mierzy się rezystancję izolacji i jaki wynik jest zły?”**
2. **„Silnik wyłącza się z przeciążenia — co Pan sprawdza?”** Obciążenie, silnik, rozrusznik, nastawy.
3. **„Jak bezpiecznie odłączyć urządzenie przed pracą?”** Blokada, zawieszka, sprawdzenie braku napięcia.
4. **„Kontener chłodzony zgłasza alarm — Pana kroki?”**
5. **„Czym różnią się urządzenia w strefie zagrożenia wybuchem?”** Oznaczenie Ex, żadnych prowizorycznych napraw.
6. **„Jakie prace elektryczne wykonywał Pan na lądzie?”** Konkretnie.

## Częste błędy

- **CV, w którym ukryte są kwalifikacje z lądu** — na tym stanowisku to często najmocniejszy argument.
- **Aplikowanie na ETO bez dyplomu III/6.**
- **Brak Basic Training** — najczęstszy powód odmowy dla elektryka z lądu.
- **Płacenie agencji.** Uczciwej agencji płaci armator.

## Najczęstsze pytania

**Czy elektryk z lądu może pójść na morze?**
Tak. Prawidło III/7 STCW ma drogę dla osób, których kwalifikacje już obejmują kompetencje — z zatwierdzoną praktyką na morzu już od trzech miesięcy.

**Czy potrzebny jest angielski?**
Podstawowy techniczny tak — instrukcje, alarmy i mechanicy są po angielsku.

**Jaki jest następny krok po elektryku?**
Dyplom ETO z prawidła III/6 STCW — stanowisko i płaca oficerska.

**Czy „elektryk” to to samo co „electro-technical rating”?**
Tak — to drugie to nazwa z STCW.

## Wynagrodzenie i oferty

Elektryk to starsza załoga szeregowa; płaca jest wyższa niż na większości stanowisk szeregowych i niższa niż ETO. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla elektryków](/pl/jobs/rank/electrician); następny krok to [oferty dla ETO](/pl/jobs/rank/eto), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV elektryka agencja patrzy na kwalifikacje z lądu, urządzenia, przy których pracowałeś, i typy statków. [CV marynarza](/pl/maritime-cv) zbiera je na jednej stronie.

*Wymagania według STCW i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Engine', 'guide',
  'linear-gradient(135deg,#0e2a45,#2a6f97)',
  true, '2026-10-12 09:10:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Ship''s electrician: duties, the STCW certificate and how it differs from the ETO');

-- ── 58. Fitter ───────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Fitter on a ship: welding, machining, documents and how to get hired',
    'ru', 'Фиттер на судне (токарь-сварщик): обязанности, документы и как устроиться',
    'ua', 'Фітер на судні (токар-зварник): обов''язки, документи та як влаштуватися',
    'pl', 'Fitter na statku (ślusarz-spawacz): obowiązki, dokumenty i jak znaleźć pracę'),
  jsonb_build_object(
    'en', $en$The **fitter** is the engine department's craftsman: welding, cutting, machining on the lathe, making the part that is not on board and repairing the one that broke. When a pipe cracks at sea or a bracket shears off on deck, the fitter is the person who turns a problem into a repair. It is a senior engine rating, and a natural job at sea for welders and machinists from shore. This guide covers the duties, a typical day, the documents, the interview and how to get the first contract.

## What the fitter does

- **Welding and cutting.** Pipes, brackets, ladders, railings, supports — electric arc welding and gas cutting, on deck and in the engine room.
- **Machining.** Work on the lathe, drilling and milling where the workshop has them: shafts, bushes, flanges, studs.
- **Mechanical repairs.** Pumps, valves, heat exchangers, pipework — together with the engineers.
- **Fabrication.** Making what the ship needs from the stores: a new support, a guard, a repair piece.
- **Overhauls.** Helping with main engine and generator overhauls — lifting, measuring, cleaning, fitting.
- **The workshop.** Keeping tools, the lathe, welding equipment and gas bottles in order and safe.

The fitter usually reports to the **second engineer**, who plans the work.

## A typical day

The fitter is a **day worker**: roughly 08:00–17:00 in the engine-room workshop or wherever the job is. Welding and cutting outside the workshop need a **hot work permit**: fire watch, gas checks, fire extinguishers ready, the area cleared — the fitter knows the procedure better than anyone. Repairs that cannot wait come at any hour.

## Differences by vessel type

- **Bulk carriers and general cargo:** hatch covers, cranes, grab repairs — a lot of welding on deck.
- **Tankers and gas carriers:** hot work in or near cargo areas is strictly controlled and often not allowed at all during operations; the permit system is heavier.
- **Container ships:** lashing gear repairs, cell guides, reefer brackets.
- **Offshore:** deck equipment, sea fastening of cargo, often welding work to client standards.
- **Passenger ships:** big workshops, several fitters and a lot of hotel-side repairs.

## Documents

There is **no separate STCW certificate for a fitter**. What companies ask for:

- an engine rating certificate — **rating forming part of an engineering watch** (STCW III/4) or **able seafarer engine** (III/5);
- a **welding certificate** from a recognised body, with the processes and positions you are qualified for;
- **Basic Training** (refreshed every five years) and Security Awareness;
- a **medical certificate**, valid for at most two years;
- a seaman's book and passport.

## What it takes

Under STCW, the **watch rating** (III/4) must be at least **16** and have approved sea service including at least **six months** of training and experience — or special training ashore or on board with at least **two months** of approved sea service. The **able seafarer engine** (III/5) must be at least **18**, hold the III/4 qualification, and have at least **12 months** of approved sea service in the engine department — or **six months** after approved training.

In practice the hiring decision rests on the welding: a crewing manager wants to see your certificates, the processes you can do, and often a practical test.

## How to get the first contract

1. **Get your welding qualification documented** with dates and processes.
2. **Get Basic Training, the medical and a seaman's book** before applying.
3. **Ask the agency which engine rating certificate your administration requires** for your route to sea.
4. **Show shore work in detail**: shipyards, pipe workshops, steel structures — sea-related work counts most.
5. **Never pay for a placement** — under MLC 2006 recruitment fees must not be charged to the seafarer.

## Contracts and rotation

Fitters usually sail **six to nine months**, depending on the company and the crew's nationality. MLC 2006 limits time on board before repatriation to **less than 12 months**, and the rest-hour minimums — **10 hours in 24** and **77 in seven days** — apply to every rating.

## Interview questions for a fitter

1. **"Which welding processes and positions are you qualified for?"**
2. **"What does a hot work permit include?"** Gas test, fire watch, extinguishers, the area, the time limit.
3. **"How do you weld a pipe that carried fuel?"** Cleaning, gas-freeing, testing — or not welding it at all.
4. **"How do you machine a bush to size on the lathe?"**
5. **"What do you check before using gas cutting equipment?"** Hoses, flashback arrestors, bottles secured.
6. **"Show us your welding."** Many agencies and ships run a practical test.

## Common mistakes

- **No welding certificate** — saying "I can weld" is not enough.
- **A CV without the processes and materials** you have worked with.
- **Ignoring hot work procedures** in the interview — safety questions decide many fitter interviews.
- **Paying an agency.** An honest agency is paid by the shipowner.

## FAQ

**Is a fitter an officer?**
No — the fitter is a senior engine rating.

**Do I need an STCW certificate to be a fitter?**
There is no special one, but companies want an engine rating certificate (III/4 or III/5) plus your welding certificates.

**Can a shore welder become a ship's fitter?**
Yes — with Basic Training, a medical, an engine rating certificate and welding papers.

**What is the next step after fitter?**
Some fitters move to motorman or study for the engineer's certificate (STCW III/1).

## Pay and jobs

The fitter is among the better-paid ratings, close to the motorman and electrician. The current range from real vacancies is on the [fitter jobs page](/jobs/rank/fitter); compare ranks on our [salaries page](/salaries).

## Your CV

Crewing desks read a fitter's CV for welding processes, certificates with dates, the machines you have used and vessel types. The [maritime CV](/maritime-cv) puts them on one page.

*Requirements follow STCW and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Фиттер** (на постсоветских судах — токарь или токарь-сварщик) — мастер на все руки машинной команды: сварка, резка, работа на токарном станке, изготовление детали, которой нет на борту, и ремонт той, что сломалась. Когда в море трескается трубопровод или на палубе отрывает кронштейн, фиттер превращает проблему в ремонт. Это старший рядовой состав машинной команды и естественная работа в море для береговых сварщиков и токарей. В гайде — обязанности, типичный день, документы, собеседование и как получить первый контракт.

## Чем занимается фиттер

- **Сварка и резка.** Трубы, кронштейны, трапы, леерные ограждения, опоры — электродуговая сварка и газовая резка на палубе и в машинном отделении.
- **Механообработка.** Работа на токарном станке, сверление и фрезерование, если они есть в мастерской: валы, втулки, фланцы, шпильки.
- **Механический ремонт.** Насосы, клапаны, теплообменники, трубопроводы — вместе с механиками.
- **Изготовление.** Сделать из запасов то, что нужно судну: новую опору, ограждение, ремонтную вставку.
- **Переборки.** Помощь на переборках главного двигателя и генераторов — подъём, замеры, чистка, сборка.
- **Мастерская.** Порядок и безопасность инструмента, станка, сварочного оборудования и газовых баллонов.

Фиттер обычно подчиняется **второму механику**, который планирует работы.

## Типичный день

Фиттер — **подвахтенный**: примерно с 08:00 до 17:00 в мастерской машинного отделения или там, где нужна работа. Сварка и резка вне мастерской требуют **наряда-допуска на огневые работы**: пожарный наблюдатель, замер газа, готовые огнетушители, очищенная зона — фиттер знает эту процедуру лучше всех. Ремонты, которые не ждут, бывают в любое время.

## Отличия по типам судов

- **Балкеры и генгруз:** люковые крышки, краны, ремонт грейферов — много сварки на палубе.
- **Танкеры и газовозы:** огневые работы в грузовой зоне или рядом строго ограничены и во время операций часто вообще запрещены; система допусков тяжелее.
- **Контейнеровозы:** ремонт найтовов, направляющих ячеек, кронштейнов для рефконтейнеров.
- **Оффшор:** палубное оборудование, морское крепление груза, часто сварка по стандартам заказчика.
- **Пассажирские суда:** большие мастерские, несколько фиттеров и много ремонта гостиничной части.

## Документы

**Отдельного свидетельства ПДНВ для фиттера нет.** Компании просят:

- свидетельство машинного рядового состава — **моторист вахты** (ПДНВ III/4) или **моторист первого класса (able seafarer engine)** (III/5);
- **сертификат сварщика** от признанного органа с процессами и положениями, на которые вы аттестованы;
- **Basic Training** (переподготовка каждые пять лет) и Security Awareness;
- **медицинское свидетельство** — не более двух лет;
- мореходную книжку и паспорт.

## Что для этого нужно

По ПДНВ **моторист вахты** (III/4) должен быть не младше **16 лет** и иметь одобренный стаж, включающий не менее **шести месяцев** подготовки и опыта, — или специальную подготовку на берегу либо на судне с одобренным стажем не менее **двух месяцев**. **Моторист первого класса** (III/5) — не младше **18 лет**, с квалификацией III/4 и не менее **12 месяцев** одобренного стажа в машинной службе — или **шести месяцев** после одобренной подготовки.

На практике решение о найме зависит от сварки: крюинг хочет видеть сертификаты, процессы, которые вы умеете, и часто проводит практический тест.

## Как получить первый контракт

1. **Оформите сварочную квалификацию документально** — с датами и процессами.
2. **Получите Basic Training, медкомиссию и мореходную книжку** до подачи.
3. **Спросите в агентстве, какое машинное свидетельство требует ваша администрация** для вашего пути в море.
4. **Подробно опишите береговую работу**: верфи, трубные цеха, металлоконструкции — морская работа ценится больше всего.
5. **Никогда не платите за трудоустройство** — по MLC 2006 сборы за трудоустройство с моряка брать нельзя.

## Контракты и ротация

Фиттеры обычно работают **шесть–девять месяцев**, в зависимости от компании и национальности экипажа. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**, а минимум отдыха — **10 часов за 24** и **77 за семь дней** — касается всего рядового состава.

## Вопросы на собеседовании

1. **«На какие процессы и положения сварки вы аттестованы?»**
2. **«Что входит в допуск на огневые работы?»** Замер газа, пожарный наблюдатель, огнетушители, зона, ограничение по времени.
3. **«Как варить трубу, по которой шло топливо?»** Очистка, дегазация, проверка — или не варить вовсе.
4. **«Как выточить втулку в размер на токарном станке?»**
5. **«Что вы проверяете перед газовой резкой?»** Шланги, огнепреградители, закреплённые баллоны.
6. **«Покажите, как вы варите».** Многие агентства и суда проводят практический тест.

## Частые ошибки

- **Нет сертификата сварщика** — фразы «умею варить» недостаточно.
- **CV без процессов и материалов**, с которыми вы работали.
- **Пренебрежение процедурами огневых работ** на собеседовании — вопросы безопасности решают многие собеседования фиттеров.
- **Платить агентству.** Честному агентству платит судовладелец.

## Частые вопросы

**Фиттер — офицер?**
Нет — фиттер относится к старшему машинному рядовому составу.

**Нужно ли фиттеру свидетельство ПДНВ?**
Специального нет, но компании хотят машинное свидетельство (III/4 или III/5) плюс сварочные сертификаты.

**Может ли береговой сварщик стать судовым фиттером?**
Да — с Basic Training, медкомиссией, машинным свидетельством и сварочными документами.

**Какой следующий шаг после фиттера?**
Часть фиттеров переходит в мотористы или учится на диплом механика (ПДНВ III/1).

## Зарплата и вакансии

Фиттер — один из лучше оплачиваемых рядовых, на уровне моториста и электрика. Актуальный диапазон по реальным вакансиям — на странице [вакансий фиттера](/ru/jobs/rank/fitter), сравнение должностей — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV фиттера крюинг смотрит процессы сварки, сертификаты со сроками, станки, с которыми вы работали, и типы судов. [CV моряка](/ru/maritime-cv) собирает их на одной странице.

*Требования — по ПДНВ (STCW) и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Фітер** (на пострадянських суднах — токар або токар-зварник) — майстер на всі руки машинної команди: зварювання, різання, робота на токарному верстаті, виготовлення деталі, якої немає на борту, і ремонт тієї, що зламалася. Коли в морі тріскає трубопровід чи на палубі відриває кронштейн, фітер перетворює проблему на ремонт. Це старший рядовий склад машинної команди й природна робота в морі для берегових зварників і токарів. У гайді — обов'язки, типовий день, документи, співбесіда й як отримати перший контракт.

## Чим займається фітер

- **Зварювання й різання.** Труби, кронштейни, трапи, леєрні огородження, опори — електродугове зварювання й газове різання на палубі та в машинному відділенні.
- **Механообробка.** Робота на токарному верстаті, свердління й фрезерування, якщо вони є в майстерні: вали, втулки, фланці, шпильки.
- **Механічний ремонт.** Насоси, клапани, теплообмінники, трубопроводи — разом із механіками.
- **Виготовлення.** Зробити із запасів те, що потрібно судну: нову опору, огородження, ремонтну вставку.
- **Перебирання.** Допомога на перебираннях головного двигуна й генераторів — підйом, заміри, чищення, складання.
- **Майстерня.** Порядок і безпека інструменту, верстата, зварювального обладнання й газових балонів.

Фітер зазвичай підпорядковується **другому механікові**, який планує роботи.

## Типовий день

Фітер — **підвахтовий**: приблизно з 08:00 до 17:00 у майстерні машинного відділення або там, де потрібна робота. Зварювання й різання поза майстернею вимагають **наряду-допуску на вогневі роботи**: пожежний спостерігач, замір газу, готові вогнегасники, очищена зона — фітер знає цю процедуру краще за всіх. Ремонти, які не чекають, бувають будь-коли.

## Відмінності за типами суден

- **Балкери й генвантаж:** люкові кришки, крани, ремонт грейферів — багато зварювання на палубі.
- **Танкери й газовози:** вогневі роботи у вантажній зоні чи поруч суворо обмежені й під час операцій часто взагалі заборонені; система допусків важча.
- **Контейнеровози:** ремонт найтовів, напрямних комірок, кронштейнів для рефконтейнерів.
- **Офшор:** палубне обладнання, морське кріплення вантажу, часто зварювання за стандартами замовника.
- **Пасажирські судна:** великі майстерні, кілька фітерів і багато ремонту готельної частини.

## Документи

**Окремого свідоцтва ПДНВ для фітера немає.** Компанії просять:

- свідоцтво машинного рядового складу — **моторист вахти** (ПДНВ III/4) або **моторист першого класу (able seafarer engine)** (III/5);
- **сертифікат зварника** від визнаного органу з процесами й положеннями, на які ви атестовані;
- **Basic Training** (перепідготовка кожні п'ять років) і Security Awareness;
- **медичне свідоцтво** — не більше двох років;
- послужну книжку й паспорт.

## Що для цього потрібно

За ПДНВ **моторист вахти** (III/4) має бути не молодшим **16 років** і мати схвалений стаж, що включає щонайменше **шість місяців** підготовки й досвіду, — або спеціальну підготовку на березі чи на судні зі схваленим стажем щонайменше **два місяці**. **Моторист першого класу** (III/5) — не молодший **18 років**, із кваліфікацією III/4 і щонайменше **12 місяцями** схваленого стажу в машинній службі — або **шістьма місяцями** після схваленої підготовки.

На практиці рішення про найм залежить від зварювання: крюїнг хоче бачити сертифікати, процеси, які ви вмієте, і часто проводить практичний тест.

## Як отримати перший контракт

1. **Оформіть зварювальну кваліфікацію документально** — з датами й процесами.
2. **Отримайте Basic Training, медкомісію й послужну книжку** до подання.
3. **Запитайте в агентстві, яке машинне свідоцтво вимагає ваша адміністрація** для вашого шляху в море.
4. **Детально опишіть берегову роботу**: верфі, трубні цехи, металоконструкції — морська робота цінується найбільше.
5. **Ніколи не платіть за працевлаштування** — за MLC 2006 збори за працевлаштування з моряка брати не можна.

## Контракти й ротація

Фітери зазвичай працюють **шість–дев'ять місяців**, залежно від компанії й національності екіпажу. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**, а мінімум відпочинку — **10 годин за 24** і **77 за сім днів** — стосується всього рядового складу.

## Питання на співбесіді

1. **«На які процеси й положення зварювання ви атестовані?»**
2. **«Що входить у допуск на вогневі роботи?»** Замір газу, пожежний спостерігач, вогнегасники, зона, обмеження за часом.
3. **«Як зварювати трубу, якою йшло паливо?»** Очищення, дегазація, перевірка — або не зварювати взагалі.
4. **«Як виточити втулку в розмір на токарному верстаті?»**
5. **«Що ви перевіряєте перед газовим різанням?»** Шланги, вогнеперешкоджувачі, закріплені балони.
6. **«Покажіть, як ви зварюєте».** Багато агентств і суден проводять практичний тест.

## Часті помилки

- **Немає сертифіката зварника** — фрази «вмію зварювати» недостатньо.
- **CV без процесів і матеріалів**, з якими ви працювали.
- **Нехтування процедурами вогневих робіт** на співбесіді — питання безпеки вирішують багато співбесід фітерів.
- **Платити агентству.** Чесному агентству платить судновласник.

## Часті питання

**Фітер — офіцер?**
Ні — фітер належить до старшого машинного рядового складу.

**Чи потрібне фітерові свідоцтво ПДНВ?**
Спеціального немає, але компанії хочуть машинне свідоцтво (III/4 або III/5) плюс зварювальні сертифікати.

**Чи може береговий зварник стати судновим фітером?**
Так — із Basic Training, медкомісією, машинним свідоцтвом і зварювальними документами.

**Який наступний крок після фітера?**
Частина фітерів переходить у мотористи або навчається на диплом механіка (ПДНВ III/1).

## Зарплата й вакансії

Фітер — один із краще оплачуваних рядових, на рівні моториста й електрика. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій фітера](/ua/jobs/rank/fitter), порівняння посад — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV фітера крюїнг дивиться процеси зварювання, сертифікати зі строками, верстати, з якими ви працювали, і типи суден. [CV моряка](/ua/maritime-cv) збирає їх на одній сторінці.

*Вимоги — за ПДНВ (STCW) і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Fitter** (ślusarz okrętowy, często także spawacz i tokarz) to fachowiec działu maszynowego: spawanie, cięcie, praca na tokarce, wykonanie części, której nie ma na burcie, i naprawa tej, która się zepsuła. Gdy na morzu pęka rurociąg albo na pokładzie odrywa się wspornik, to fitter zamienia problem w naprawę. To starsza załoga maszynowa i naturalna praca na morzu dla spawaczy i tokarzy z lądu. W poradniku: obowiązki, typowy dzień, dokumenty, rozmowa i jak zdobyć pierwszy kontrakt.

## Czym zajmuje się fitter

- **Spawanie i cięcie.** Rury, wsporniki, trapy, relingi, podpory — spawanie łukowe i cięcie gazowe na pokładzie i w maszynowni.
- **Obróbka skrawaniem.** Praca na tokarce, wiercenie i frezowanie, jeśli warsztat je ma: wały, tuleje, kołnierze, szpilki.
- **Naprawy mechaniczne.** Pompy, zawory, wymienniki ciepła, rurociągi — razem z mechanikami.
- **Wykonawstwo.** Zrobić z zapasów to, czego statek potrzebuje: nową podporę, osłonę, wstawkę naprawczą.
- **Remonty.** Pomoc przy remontach silnika głównego i generatorów — podnoszenie, pomiary, czyszczenie, montaż.
- **Warsztat.** Porządek i bezpieczeństwo narzędzi, tokarki, sprzętu spawalniczego i butli gazowych.

Fitter zwykle podlega **drugiemu mechanikowi**, który planuje prace.

## Typowy dzień

Fitter pracuje **na dniówce**: mniej więcej 08:00–17:00 w warsztacie maszynowni lub tam, gdzie jest praca. Spawanie i cięcie poza warsztatem wymagają **zezwolenia na prace pożarowo niebezpieczne**: obserwator pożarowy, pomiar gazu, gotowe gaśnice, oczyszczony teren — fitter zna tę procedurę najlepiej. Naprawy, które nie mogą czekać, zdarzają się o każdej porze.

## Różnice według typu statku

- **Masowce i drobnicowce:** pokrywy lukowe, dźwigi, naprawy chwytaków — dużo spawania na pokładzie.
- **Tankowce i gazowce:** prace pożarowo niebezpieczne w strefie ładunkowej lub obok są ściśle ograniczone i podczas operacji często zakazane; system zezwoleń jest cięższy.
- **Kontenerowce:** naprawy mocowań, prowadnic komórek, wsporników dla kontenerów chłodzonych.
- **Offshore:** wyposażenie pokładu, mocowanie ładunku na morze, często spawanie według standardów klienta.
- **Statki pasażerskie:** duże warsztaty, kilku fitterów i dużo napraw części hotelowej.

## Dokumenty

**Nie ma osobnego świadectwa STCW dla fittera.** Firmy proszą o:

- świadectwo załogi maszynowej — **marynarz wachty maszynowej** (STCW III/4) lub **starszy marynarz działu maszynowego (able seafarer engine)** (III/5);
- **certyfikat spawacza** wydany przez uznaną instytucję, z metodami i pozycjami, na które masz uprawnienia;
- **Basic Training** (odnawiany co pięć lat) i Security Awareness;
- **świadectwo zdrowia** — ważne najwyżej dwa lata;
- książeczkę żeglarską i paszport.

## Czego to wymaga

Według STCW **marynarz wachty maszynowej** (III/4) musi mieć co najmniej **16 lat** i zatwierdzoną praktykę obejmującą co najmniej **sześć miesięcy** szkolenia i doświadczenia — lub specjalne szkolenie na lądzie albo na statku z co najmniej **dwoma miesiącami** zatwierdzonej praktyki. **Starszy marynarz działu maszynowego** (III/5) musi mieć co najmniej **18 lat**, kwalifikację III/4 i co najmniej **12 miesięcy** zatwierdzonej praktyki w dziale maszynowym — lub **sześć miesięcy** po zatwierdzonym szkoleniu.

W praktyce decyzja o zatrudnieniu zależy od spawania: agencja chce zobaczyć certyfikaty, metody, które opanowałeś, i często robi test praktyczny.

## Jak zdobyć pierwszy kontrakt

1. **Udokumentuj kwalifikacje spawalnicze** — z datami i metodami.
2. **Zdobądź Basic Training, świadectwo zdrowia i książeczkę żeglarską** przed aplikowaniem.
3. **Zapytaj w agencji, jakiego świadectwa maszynowego wymaga Twoja administracja** dla Twojej drogi na morze.
4. **Opisz szczegółowo pracę na lądzie**: stocznie, warsztaty rurowe, konstrukcje stalowe — praca związana z morzem liczy się najbardziej.
5. **Nigdy nie płać za zatrudnienie** — zgodnie z MLC 2006 marynarz nie może ponosić opłat za pośrednictwo.

## Kontrakty i rotacja

Fitterzy pływają zwykle **sześć–dziewięć miesięcy**, zależnie od firmy i narodowości załogi. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**, a minimum odpoczynku — **10 godzin na 24** i **77 na siedem dni** — dotyczy całej załogi szeregowej.

## Pytania na rozmowie

1. **„Na jakie metody i pozycje spawania ma Pan uprawnienia?”**
2. **„Co obejmuje zezwolenie na prace pożarowo niebezpieczne?”** Pomiar gazu, obserwator pożarowy, gaśnice, teren, limit czasu.
3. **„Jak spawać rurę, którą płynęło paliwo?”** Czyszczenie, odgazowanie, sprawdzenie — albo w ogóle nie spawać.
4. **„Jak wytoczyć tuleję na wymiar na tokarce?”**
5. **„Co sprawdza Pan przed cięciem gazowym?”** Węże, bezpieczniki przypalnikowe, zabezpieczone butle.
6. **„Proszę pokazać, jak Pan spawa”.** Wiele agencji i statków robi test praktyczny.

## Częste błędy

- **Brak certyfikatu spawacza** — samo „umiem spawać” nie wystarcza.
- **CV bez metod i materiałów**, z którymi pracowałeś.
- **Lekceważenie procedur prac pożarowo niebezpiecznych** na rozmowie — pytania o bezpieczeństwo rozstrzygają wiele rozmów z fitterami.
- **Płacenie agencji.** Uczciwej agencji płaci armator.

## Najczęstsze pytania

**Czy fitter jest oficerem?**
Nie — fitter należy do starszej załogi maszynowej.

**Czy fitter potrzebuje świadectwa STCW?**
Specjalnego nie ma, ale firmy chcą świadectwa maszynowego (III/4 lub III/5) oraz certyfikatów spawalniczych.

**Czy spawacz z lądu może zostać fitterem na statku?**
Tak — z Basic Training, świadectwem zdrowia, świadectwem maszynowym i dokumentami spawalniczymi.

**Jaki jest następny krok po fitterze?**
Część fitterów przechodzi na motorzystę albo uczy się na dyplom mechanika (STCW III/1).

## Wynagrodzenie i oferty

Fitter należy do lepiej opłacanych marynarzy szeregowych, na poziomie motorzysty i elektryka. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla fitterów](/pl/jobs/rank/fitter), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV fittera agencja patrzy na metody spawania, certyfikaty z datami, maszyny, na których pracowałeś, i typy statków. [CV marynarza](/pl/maritime-cv) zbiera je na jednej stronie.

*Wymagania według STCW i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Engine', 'guide',
  'linear-gradient(135deg,#0e2a45,#8a3d1d)',
  true, '2026-10-12 09:20:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Fitter on a ship: welding, machining, documents and how to get hired');

-- ── 59. Wiper ────────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Wiper on a ship: the first job in the engine room and how to get it',
    'ru', 'Вайпер на судне: первая должность в машинном отделении и как её получить',
    'ua', 'Вайпер на судні: перша посада в машинному відділенні та як її отримати',
    'pl', 'Wiper na statku: pierwsza praca w maszynowni i jak ją zdobyć'),
  jsonb_build_object(
    'en', $en$The **wiper** is the entry rank in the engine room — the engine department's equivalent of the ordinary seaman on deck. The name comes from the job: keeping the engine room clean, wiping oil and dirt off machinery, and helping the engineers and motormen with everything else. It does not need years of college, and it is the first step to motorman, oiler, fitter and — with study — engineer. This guide covers the duties, a typical day, the documents, how to get the first contract and how not to get cheated on the way.

## What a wiper does

- **Keeping the engine room clean.** Floor plates, bilges, machinery, workshops and stores — an engine room that is clean is one where leaks are seen early.
- **Helping with maintenance.** Carrying parts, cleaning components during overhauls, holding, lifting, learning.
- **Fuel, oil and sludge.** Helping with transfers, sounding tanks under supervision, collecting and handling waste oil and rags safely.
- **Stores and spares.** Taking engine stores on board and putting them away.
- **Painting and small jobs** in the engine room and steering gear room.
- **Learning the plant.** Where every pump, valve and emergency stop is — the basis of everything that comes next.

## A typical day

The wiper is a **day worker**: roughly 08:00–17:00 with breaks, working with the motormen, the fitter and the engineers. On some ships a wiper who already holds the watch rating certificate joins an engineer on watch. Stores, bunkering and breakdowns come at any hour.

## Documents — in the order you will need them

1. **Passport.**
2. **Seafarer medical certificate** — valid for at most two years (one year under 18).
3. **Basic Training** — fire-fighting, survival, first aid, personal safety; refreshed every five years.
4. **Security Awareness.**
5. **Seaman's book**, issued by your maritime administration.
6. **Rating forming part of an engineering watch** (STCW III/4), once you have the required sea service or training.

## What it takes

Under **STCW Regulation III/4**, the engine watch rating must be at least **16** (many companies hire from 18) and have approved sea service including at least **six months** of training and experience — or special training ashore or on board that includes at least **two months** of approved sea service. A wiper often starts before holding III/4 and earns it on board.

The next step, **able seafarer engine** (III/5), needs III/4 and at least **12 months** of approved sea service in the engine department — or **six months** after approved training.

## How to get the first contract

1. **Get the documents first**: seaman's book, medical, Basic Training.
2. **Learn basic English**: the words for tools, safety, numbers and the parts of an engine.
3. **Show any mechanical work from shore**: car repair, workshops, factories — it counts.
4. **Apply to agencies that take juniors**, and to the fleets that hire them: bulk carriers, general cargo, river-sea ships.
5. **Never pay for a job.** Under MLC 2006 recruitment fees must not be charged to the seafarer; "a fee for a place on board" is a scam.

## Contracts and rotation

Ratings often sail **six to nine months**. MLC 2006 limits the time on board before repatriation to **less than 12 months**; the employer pays the repatriation, and you are entitled to at least **10 hours of rest in any 24** and **77 in any seven days**.

## Safety in the engine room

A wiper's first weeks are the riskiest: hot surfaces, rotating machinery, noise and oil on the floor. Wear the protective equipment you are given, ear protection always, never work on machinery that is not isolated, and ask before touching anything you do not know. Engineers respect a wiper who asks.

## Interview questions for a wiper

1. **"Why do you want to work in the engine room?"**
2. **"What did you learn in Basic Training?"** Fire classes and extinguishers, survival in water, first aid.
3. **"What do you do if you see a fuel leak?"** Report at once, no open flame, follow the engineer's orders.
4. **"Have you worked with tools?"** Any mechanical work counts.
5. **"Do you know these words?"** Pump, valve, pipe, spanner, leak, stop.

## Common mistakes

- **Paying for "a guaranteed place on board".**
- **Buying courses from unrecognised training centres** — certificates must come from centres approved by your maritime administration.
- **No English at all.**
- **Waiting for the perfect first ship.** Any honest contract gives you sea time.

## FAQ

**What is the difference between a wiper and a motorman?**
The wiper is the entry rank; the motorman (or oiler) is a qualified engine rating who keeps watches and works more independently.

**Can I go to sea as a wiper without a maritime education?**
Yes, with the documents above. Officer ranks need longer training.

**How long until I become a motorman?**
It depends on the company; under STCW, the able seafarer engine certificate needs at least 12 months of sea service as a watch rating, or six after approved training.

**Is wiper work only cleaning?**
Cleaning is a large part of it, but a wiper also helps with maintenance and overhauls — that is where the learning happens.

## Pay and jobs

The wiper is the entry rank, so the pay is the lowest in the engine room — and it rises with each step. See [motorman jobs](/jobs/rank/motorman) and [oiler jobs](/jobs/rank/oiler) for where the path leads, and compare ranks on our [salaries page](/salaries).

## Your CV

With little sea time, the [maritime CV](/maritime-cv) shows what you do have — courses, documents, languages and mechanical work from shore — in the order a crewing manager reads it.

*Requirements follow STCW and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Вайпер** — начальная должность в машинном отделении, машинный аналог матроса второго класса на палубе. Название говорит о работе: держать машинное отделение в чистоте, вытирать масло и грязь с механизмов и помогать механикам и мотористам во всём остальном. Для неё не нужны годы учёбы, и это первый шаг к мотористу, смазчику, фиттеру, а при учёбе — и к механику. В гайде — обязанности, типичный день, документы, как получить первый контракт и как не попасться мошенникам по дороге.

## Чем занимается вайпер

- **Чистота машинного отделения.** Плиты настила, льяла, механизмы, мастерские и кладовые — в чистой машине протечки видны сразу.
- **Помощь в обслуживании.** Подносить детали, чистить узлы при переборках, держать, поднимать, учиться.
- **Топливо, масло и шлам.** Помогать при перекачках, замерять танки под наблюдением, собирать и безопасно обращаться с отработанным маслом и ветошью.
- **Снабжение и запчасти.** Принимать машинное снабжение на борт и раскладывать его.
- **Покраска и мелкие работы** в машинном отделении и румпельном.
- **Изучение установки.** Где каждый насос, клапан и аварийная остановка — основа всего, что будет дальше.

## Типичный день

Вайпер — **подвахтенный**: примерно с 08:00 до 17:00 с перерывами, вместе с мотористами, фиттером и механиками. На некоторых судах вайпер, у которого уже есть свидетельство моториста вахты, стоит вахту с механиком. Снабжение, бункеровки и поломки бывают в любое время.

## Документы — в том порядке, в каком они понадобятся

1. **Заграничный паспорт.**
2. **Медицинское свидетельство моряка** — не более двух лет (до 18 лет — один год).
3. **Basic Training** — борьба с пожаром, выживание, первая помощь, личная безопасность; переподготовка каждые пять лет.
4. **Security Awareness.**
5. **Мореходная книжка**, которую выдаёт морская администрация.
6. **Свидетельство моториста вахты** (ПДНВ III/4), когда наберётся нужный стаж или подготовка.

## Что для этого нужно

По **правилу III/4 ПДНВ (STCW)** моторист вахты должен быть не младше **16 лет** (многие компании берут с 18) и иметь одобренный стаж, включающий не менее **шести месяцев** подготовки и опыта, — или специальную подготовку на берегу либо на судне с одобренным стажем не менее **двух месяцев**. Вайпер часто начинает без III/4 и получает его на борту.

Следующий шаг, **моторист первого класса (able seafarer engine)** (III/5), требует III/4 и не менее **12 месяцев** одобренного стажа в машинной службе — или **шести месяцев** после одобренной подготовки.

## Как получить первый контракт

1. **Сначала документы**: мореходная книжка, медкомиссия, Basic Training.
2. **Выучите базовый английский**: инструмент, безопасность, числа, части двигателя.
3. **Покажите любую механическую работу на берегу**: автосервис, мастерские, заводы — это засчитывается.
4. **Подавайтесь в агентства, которые берут младших**, и на флоты, где их берут: балкеры, генгруз, суда река-море.
5. **Никогда не платите за работу.** По MLC 2006 сборы за трудоустройство с моряка брать нельзя; «взнос за место на судне» — это мошенничество.

## Контракты и ротация

Рядовой состав часто работает **шесть–девять месяцев**. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**; репатриацию оплачивает работодатель, а вам положено не менее **10 часов отдыха в любые 24 часа** и **77 за любые семь дней**.

## Безопасность в машинном отделении

Первые недели вайпера — самые рискованные: горячие поверхности, вращающиеся механизмы, шум и масло на полу. Носите выданные средства защиты, наушники — всегда, никогда не работайте на механизме, который не отключён, и спрашивайте, прежде чем трогать то, чего не знаете. Механики уважают вайпера, который спрашивает.

## Вопросы на собеседовании

1. **«Почему вы хотите работать в машинном отделении?»**
2. **«Чему вас научили на Basic Training?»** Классы пожаров и огнетушители, выживание в воде, первая помощь.
3. **«Что вы сделаете, если увидите течь топлива?»** Сразу доложить, никакого открытого огня, выполнять команды механика.
4. **«Работали ли вы с инструментом?»** Любая механическая работа засчитывается.
5. **«Знаете ли вы эти слова?»** Pump, valve, pipe, spanner, leak, stop.

## Частые ошибки

- **Платить за «гарантированное место на судне».**
- **Покупать курсы в непризнанных учебных центрах** — сертификаты должны быть от центров, одобренных морской администрацией.
- **Совсем нет английского.**
- **Ждать идеальное первое судно.** Любой честный контракт даёт стаж.

## Частые вопросы

**Чем вайпер отличается от моториста?**
Вайпер — начальная должность; моторист (или смазчик) — квалифицированный член машинной команды, который стоит вахты и работает самостоятельнее.

**Можно ли уйти в море вайпером без морского образования?**
Да, с документами выше. Для офицерских должностей нужна более долгая подготовка.

**Когда я стану мотористом?**
Зависит от компании; по ПДНВ свидетельство моториста первого класса требует не менее 12 месяцев стажа мотористом вахты или шести месяцев после одобренной подготовки.

**Работа вайпера — это только уборка?**
Уборка — большая часть, но вайпер помогает и в обслуживании, и на переборках — там и происходит обучение.

## Зарплата и вакансии

Вайпер — начальная должность, поэтому зарплата самая низкая в машине, и она растёт с каждым шагом. Посмотрите [вакансии моториста](/ru/jobs/rank/motorman) и [смазчика](/ru/jobs/rank/oiler), чтобы увидеть, куда ведёт путь, а сравнение должностей — на странице [зарплат](/ru/salaries).

## Ваше CV

Когда стажа мало, [CV моряка](/ru/maritime-cv) показывает то, что у вас есть, — курсы, документы, языки и механическую работу на берегу — в том порядке, в каком его читает крюинг-менеджер.

*Требования — по ПДНВ (STCW) и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Вайпер** — початкова посада в машинному відділенні, машинний аналог матроса другого класу на палубі. Назва говорить про роботу: тримати машинне відділення в чистоті, витирати оливу й бруд із механізмів і допомагати механікам і мотористам у всьому іншому. Для неї не потрібні роки навчання, і це перший крок до моториста, мастильника, фітера, а з навчанням — і до механіка. У гайді — обов'язки, типовий день, документи, як отримати перший контракт і як не потрапити до шахраїв дорогою.

## Чим займається вайпер

- **Чистота машинного відділення.** Плити настилу, льяла, механізми, майстерні й комори — у чистій машині протікання видно одразу.
- **Допомога в обслуговуванні.** Підносити деталі, чистити вузли під час перебирань, тримати, піднімати, учитися.
- **Паливо, олива й шлам.** Допомагати під час перекачувань, заміряти танки під наглядом, збирати й безпечно поводитися з відпрацьованою оливою й ганчір'ям.
- **Постачання й запчастини.** Приймати машинне постачання на борт і розкладати його.
- **Фарбування й дрібні роботи** в машинному відділенні та румпельному.
- **Вивчення установки.** Де кожен насос, клапан і аварійна зупинка — основа всього, що буде далі.

## Типовий день

Вайпер — **підвахтовий**: приблизно з 08:00 до 17:00 з перервами, разом із мотористами, фітером і механіками. На деяких суднах вайпер, у якого вже є свідоцтво моториста вахти, несе вахту з механіком. Постачання, бункерування й поломки бувають будь-коли.

## Документи — у тому порядку, в якому вони знадобляться

1. **Закордонний паспорт.**
2. **Медичне свідоцтво моряка** — не більше двох років (до 18 років — один рік).
3. **Basic Training** — боротьба з пожежею, виживання, перша допомога, особиста безпека; перепідготовка кожні п'ять років.
4. **Security Awareness.**
5. **Послужна книжка**, яку видає морська адміністрація.
6. **Свідоцтво моториста вахти** (ПДНВ III/4), коли набереться потрібний стаж або підготовка.

## Що для цього потрібно

За **правилом III/4 ПДНВ (STCW)** моторист вахти має бути не молодшим **16 років** (багато компаній беруть із 18) і мати схвалений стаж, що включає щонайменше **шість місяців** підготовки й досвіду, — або спеціальну підготовку на березі чи на судні зі схваленим стажем щонайменше **два місяці**. Вайпер часто починає без III/4 і отримує його на борту.

Наступний крок, **моторист першого класу (able seafarer engine)** (III/5), вимагає III/4 і щонайменше **12 місяців** схваленого стажу в машинній службі — або **шести місяців** після схваленої підготовки.

## Як отримати перший контракт

1. **Спочатку документи**: послужна книжка, медкомісія, Basic Training.
2. **Вивчіть базову англійську**: інструмент, безпека, числа, частини двигуна.
3. **Покажіть будь-яку механічну роботу на березі**: автосервіс, майстерні, заводи — це зараховується.
4. **Подавайтеся в агентства, які беруть молодших**, і на флоти, де їх беруть: балкери, генвантаж, судна ріка-море.
5. **Ніколи не платіть за роботу.** За MLC 2006 збори за працевлаштування з моряка брати не можна; «внесок за місце на судні» — це шахрайство.

## Контракти й ротація

Рядовий склад часто працює **шість–дев'ять місяців**. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**; репатріацію оплачує роботодавець, а вам належить щонайменше **10 годин відпочинку за будь-які 24 години** і **77 за будь-які сім днів**.

## Безпека в машинному відділенні

Перші тижні вайпера — найризикованіші: гарячі поверхні, механізми, що обертаються, шум і олива на підлозі. Носіть видані засоби захисту, навушники — завжди, ніколи не працюйте на механізмі, який не вимкнено, і питайте, перш ніж торкатися того, чого не знаєте. Механіки поважають вайпера, який питає.

## Питання на співбесіді

1. **«Чому ви хочете працювати в машинному відділенні?»**
2. **«Чого вас навчили на Basic Training?»** Класи пожеж і вогнегасники, виживання у воді, перша допомога.
3. **«Що ви зробите, якщо побачите протікання палива?»** Одразу доповісти, жодного відкритого вогню, виконувати команди механіка.
4. **«Чи працювали ви з інструментом?»** Будь-яка механічна робота зараховується.
5. **«Чи знаєте ви ці слова?»** Pump, valve, pipe, spanner, leak, stop.

## Часті помилки

- **Платити за «гарантоване місце на судні».**
- **Купувати курси в невизнаних навчальних центрах** — сертифікати мають бути від центрів, схвалених морською адміністрацією.
- **Зовсім немає англійської.**
- **Чекати ідеальне перше судно.** Будь-який чесний контракт дає стаж.

## Часті питання

**Чим вайпер відрізняється від моториста?**
Вайпер — початкова посада; моторист (або мастильник) — кваліфікований член машинної команди, який несе вахти й працює самостійніше.

**Чи можна піти в море вайпером без морської освіти?**
Так, із документами вище. Для офіцерських посад потрібна довша підготовка.

**Коли я стану мотористом?**
Залежить від компанії; за ПДНВ свідоцтво моториста першого класу вимагає щонайменше 12 місяців стажу мотористом вахти або шести місяців після схваленої підготовки.

**Робота вайпера — це лише прибирання?**
Прибирання — велика частина, але вайпер допомагає й в обслуговуванні, і на перебираннях — там і відбувається навчання.

## Зарплата й вакансії

Вайпер — початкова посада, тому зарплата найнижча в машині, і вона зростає з кожним кроком. Перегляньте [вакансії моториста](/ua/jobs/rank/motorman) і [мастильника](/ua/jobs/rank/oiler), щоб побачити, куди веде шлях, а порівняння посад — на сторінці [зарплат](/ua/salaries).

## Ваше CV

Коли стажу мало, [CV моряка](/ua/maritime-cv) показує те, що у вас є, — курси, документи, мови й механічну роботу на березі — у тому порядку, в якому його читає крюїнг-менеджер.

*Вимоги — за ПДНВ (STCW) і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Wiper** to stanowisko wejściowe w maszynowni — maszynowy odpowiednik młodszego marynarza na pokładzie. Nazwa mówi o pracy: utrzymywać maszynownię w czystości, wycierać olej i brud z urządzeń i pomagać mechanikom i motorzystom we wszystkim innym. Nie wymaga lat nauki i jest pierwszym krokiem do motorzysty, smarownika, fittera, a z nauką — także mechanika. W poradniku: obowiązki, typowy dzień, dokumenty, jak zdobyć pierwszy kontrakt i jak nie dać się oszukać po drodze.

## Czym zajmuje się wiper

- **Czystość maszynowni.** Płyty podłogowe, zęzy, urządzenia, warsztaty i magazyny — w czystej maszynowni przecieki widać od razu.
- **Pomoc przy konserwacji.** Podawanie części, czyszczenie podzespołów przy remontach, trzymanie, podnoszenie, nauka.
- **Paliwo, olej i szlam.** Pomoc przy przepompowaniach, sondowanie zbiorników pod nadzorem, zbieranie i bezpieczne obchodzenie się z olejem odpadowym i czyściwem.
- **Zaopatrzenie i części.** Przyjmowanie zaopatrzenia maszynowego na burtę i jego rozkładanie.
- **Malowanie i drobne prace** w maszynowni i pomieszczeniu maszyny sterowej.
- **Poznawanie siłowni.** Gdzie jest każda pompa, zawór i wyłącznik awaryjny — podstawa wszystkiego, co przyjdzie później.

## Typowy dzień

Wiper pracuje **na dniówce**: mniej więcej 08:00–17:00 z przerwami, razem z motorzystami, fitterem i mechanikami. Na niektórych statkach wiper, który ma już świadectwo marynarza wachty maszynowej, pełni wachtę z mechanikiem. Zaopatrzenie, bunkrowania i awarie zdarzają się o każdej porze.

## Dokumenty — w kolejności, w jakiej będą potrzebne

1. **Paszport.**
2. **Świadectwo zdrowia marynarza** — ważne najwyżej dwa lata (poniżej 18 lat — rok).
3. **Basic Training** — ochrona przeciwpożarowa, przetrwanie, pierwsza pomoc, bezpieczeństwo własne; odnawiany co pięć lat.
4. **Security Awareness.**
5. **Książeczka żeglarska** wydawana przez administrację morską.
6. **Świadectwo marynarza wachty maszynowej** (STCW III/4), gdy uzbierasz wymaganą praktykę lub szkolenie.

## Czego to wymaga

Zgodnie z **prawidłem III/4 STCW** marynarz wachty maszynowej musi mieć co najmniej **16 lat** (wiele firm zatrudnia od 18) i zatwierdzoną praktykę obejmującą co najmniej **sześć miesięcy** szkolenia i doświadczenia — lub specjalne szkolenie na lądzie albo na statku z co najmniej **dwoma miesiącami** zatwierdzonej praktyki. Wiper często zaczyna bez III/4 i zdobywa je na burcie.

Następny krok, **starszy marynarz działu maszynowego (able seafarer engine)** (III/5), wymaga III/4 i co najmniej **12 miesięcy** zatwierdzonej praktyki w dziale maszynowym — lub **sześciu miesięcy** po zatwierdzonym szkoleniu.

## Jak zdobyć pierwszy kontrakt

1. **Najpierw dokumenty**: książeczka żeglarska, świadectwo zdrowia, Basic Training.
2. **Naucz się podstaw angielskiego**: narzędzia, bezpieczeństwo, liczby, części silnika.
3. **Pokaż każdą pracę mechaniczną z lądu**: warsztat samochodowy, zakład, fabryka — to się liczy.
4. **Aplikuj do agencji, które biorą młodszych**, i na floty, które ich zatrudniają: masowce, drobnicowce, statki rzeczno-morskie.
5. **Nigdy nie płać za pracę.** Zgodnie z MLC 2006 marynarz nie może ponosić opłat za pośrednictwo; „opłata za miejsce na statku” to oszustwo.

## Kontrakty i rotacja

Załoga szeregowa pływa często **sześć–dziewięć miesięcy**. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**; repatriację opłaca pracodawca, a Tobie przysługuje co najmniej **10 godzin odpoczynku w każdych 24 godzinach** i **77 w każdych siedmiu dniach**.

## Bezpieczeństwo w maszynowni

Pierwsze tygodnie wipera są najbardziej ryzykowne: gorące powierzchnie, obracające się maszyny, hałas i olej na podłodze. Noś wydane środki ochrony, ochronniki słuchu zawsze, nigdy nie pracuj przy urządzeniu, które nie jest odłączone, i pytaj, zanim dotkniesz czegoś, czego nie znasz. Mechanicy szanują wipera, który pyta.

## Pytania na rozmowie

1. **„Dlaczego chce Pan pracować w maszynowni?”**
2. **„Czego nauczył się Pan na Basic Training?”** Grupy pożarów i gaśnice, przetrwanie w wodzie, pierwsza pomoc.
3. **„Co Pan zrobi, gdy zobaczy wyciek paliwa?”** Natychmiast zgłosić, żadnego otwartego ognia, wykonywać polecenia mechanika.
4. **„Czy pracował Pan z narzędziami?”** Każda praca mechaniczna się liczy.
5. **„Czy zna Pan te słowa?”** Pump, valve, pipe, spanner, leak, stop.

## Częste błędy

- **Płacenie za „gwarantowane miejsce na statku”.**
- **Kupowanie kursów w nieuznanych ośrodkach** — świadectwa muszą pochodzić z ośrodków zatwierdzonych przez administrację morską.
- **Brak angielskiego.**
- **Czekanie na idealny pierwszy statek.** Każdy uczciwy kontrakt daje praktykę.

## Najczęstsze pytania

**Czym wiper różni się od motorzysty?**
Wiper to stanowisko wejściowe; motorzysta (lub smarownik) to wykwalifikowany członek załogi maszynowej, który pełni wachty i pracuje bardziej samodzielnie.

**Czy można pójść na morze jako wiper bez wykształcenia morskiego?**
Tak, z dokumentami wymienionymi wyżej. Stanowiska oficerskie wymagają dłuższego szkolenia.

**Kiedy zostanę motorzystą?**
Zależy od firmy; według STCW świadectwo starszego marynarza działu maszynowego wymaga co najmniej 12 miesięcy praktyki jako marynarz wachty maszynowej lub sześciu po zatwierdzonym szkoleniu.

**Czy praca wipera to tylko sprzątanie?**
Sprzątanie to duża część, ale wiper pomaga też przy konserwacji i remontach — tam właśnie się uczy.

## Wynagrodzenie i oferty

Wiper to stanowisko wejściowe, więc płaca jest najniższa w maszynowni — i rośnie z każdym krokiem. Zobacz [oferty dla motorzystów](/pl/jobs/rank/motorman) i [smarowników](/pl/jobs/rank/oiler), żeby zobaczyć, dokąd prowadzi ścieżka, a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

Przy krótkiej praktyce [CV marynarza](/pl/maritime-cv) pokazuje to, co masz — kursy, dokumenty, języki i pracę mechaniczną z lądu — w kolejności, w jakiej czyta je menedżer agencji.

*Wymagania według STCW i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Engine', 'guide',
  'linear-gradient(135deg,#0e2a45,#1d6fa5)',
  true, '2026-10-12 09:30:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Wiper on a ship: the first job in the engine room and how to get it');

-- ── Covers ───────────────────────────────────────────────────────────────────
UPDATE news_articles SET cover_url = v.url FROM (VALUES
 ('Electro-technical officer (ETO) on a ship: duties, certificate and how to get hired', 'https://seajobs.pro/guides/eto.png?v=1'),
 ('Ship''s electrician: duties, the STCW certificate and how it differs from the ETO', 'https://seajobs.pro/guides/electrician.png?v=1'),
 ('Fitter on a ship: welding, machining, documents and how to get hired', 'https://seajobs.pro/guides/fitter.png?v=1'),
 ('Wiper on a ship: the first job in the engine room and how to get it', 'https://seajobs.pro/guides/wiper.png?v=1')
) AS v(t, url)
WHERE news_articles.title->>'en' = v.t AND coalesce(news_articles.cover_url, '') = '';
