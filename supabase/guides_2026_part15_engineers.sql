-- Engine department ranks (category = 'guide'), long format from the start:
-- Chief Engineer, Second Engineer, Third Engineer, Fourth Engineer.
--
-- Facts: STCW Regulation III/1 (officer in charge of an engineering watch,
-- 750 kW or more) and III/2 (chief and second engineer, 3,000 kW or more);
-- III/3 for 750–3,000 kW; I/9, I/10, I/11 and VI/1 as in part13; MLC 2006
-- rest hours and Standard A2.5.1; MARPOL Annex I (oil record book, 15 ppm
-- oily water separator limit) and Annex VI (0.50% sulphur outside emission
-- control areas, 0.10% inside). Watch splits and who looks after which
-- machinery are company practice and are written as "often"/"usually".
-- No salary figures: the rank landing carries the live range. There is no
-- /jobs/rank landing for the fourth engineer; its guide links to the third
-- engineer and engine cadet pages.
--
-- pl + ru + ua + en. Covers are set at the end — run after the deploy that
-- adds public/guides/{chief-engineer,second-engineer,third-engineer,fourth-engineer}.png.
-- Idempotent — guarded by the English title.

-- ── 52. Chief Engineer ───────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Chief engineer on a ship: duties, requirements and how to become one',
    'ru', 'Старший механик (стармех): обязанности, требования и как им стать',
    'ua', 'Старший механік (стармех): обов''язки, вимоги та як ним стати',
    'pl', 'Starszy mechanik na statku: obowiązki, wymagania i jak nim zostać'),
  jsonb_build_object(
    'en', $en$The **chief engineer** — "chief" in the engine room, "C/E" on the crew list — heads the engine department and answers for every machine on board: the main engine, the generators, the boilers, the pumps, the steering gear, the fuel and everything that keeps the ship moving and alive. On deck the master commands; below, the chief engineer decides. This guide covers what the job involves, a typical day, the differences by vessel type, the certificate, the interview and the road from second engineer.

## What the chief engineer does

- **Responsibility for all machinery.** Safe and economical operation of the propulsion plant, power generation, auxiliary systems and the emergency equipment.
- **Planned maintenance.** The company's planned maintenance system, overhauls, class surveys and the condition of every machine — the chief engineer signs off the work and reports to the technical superintendent.
- **Fuel and lubricants.** Bunkering plans and procedures, fuel quality and samples, consumption reports, and compliance with MARPOL: the oil record book, the oily water separator (15 ppm), and the sulphur limits of Annex VI — 0.50% at sea in general and 0.10% in emission control areas.
- **Spares and budget.** Orders for spare parts and stores, often within a budget agreed with the office.
- **The engine team.** The second, third and fourth engineers, the ETO, fitters, oilers and wipers: who does what, training, work and rest hours.
- **Safety.** Engine-room fire risks, the emergency generator and fire pump, enclosed spaces and hot work, and the engine team's roles in drills.
- **Inspections.** Port state control, flag, class and — on tankers — vetting look hard at the engine room; the chief engineer is the person who answers.

## A typical day

- **Morning:** a round of the engine room, the log and the alarms of the night, then a meeting with the second engineer about the day's jobs. On many ships also a short meeting with the master.
- **Day:** e-mails with the superintendent, spare-part orders, maintenance records, checking the work on the big jobs.
- **Noon:** fuel and consumption figures for the noon report.
- **Evening:** the night orders for the engine room and the duty engineer.

Arrivals and departures, bunkering, blackouts and breakdowns override everything: the chief engineer is in the engine control room for manoeuvres and on call at any hour.

## Differences by vessel type

- **Container ships:** very large two-stroke engines, high speeds and tight schedules; little time in port for maintenance.
- **Tankers:** cargo pumps (steam or electric), inert gas and boilers; vetting inspects the engine room too.
- **Gas carriers (LNG):** dual-fuel engines or steam turbines on older ships, boil-off handling, high-voltage plants — and the IGF/IGC training that goes with them.
- **Bulk carriers:** simpler plants, long voyages, and a chief engineer who has to make spares last.
- **Offshore:** diesel-electric plants, DP redundancy, thrusters and short contracts.
- **Passenger ships:** huge power plants, many engineers, and hotel systems (air conditioning, fresh water, sewage) on a city scale.

## Certificates and documents

- **Certificate of competency, chief engineer unlimited** (STCW III/2, 3,000 kW or more) — revalidated every **five years**. For 750–3,000 kW there is a separate certificate under III/3.
- **Flag endorsements** (STCW I/10) for the flags you serve under.
- **Medical certificate** — valid for at most **two years**.
- **Basic Training refreshers** every five years; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ERM** (engine-room resource management), **High Voltage** at management level, and type-specific courses for electronically controlled engines where the company uses them.
- For tankers and gas carriers — the **advanced cargo** courses; for gas-fuelled ships — **IGF**.

## What it takes

Under **STCW Regulation III/2**, the chief engineer's certificate for ships of 3,000 kW or more requires the officer-of-the-watch certificate (III/1) and at least **36 months** of approved sea service, of which at least **12 months** must be served as an engineer officer in a position of responsibility while qualified to serve as second engineer. On top come your administration's exams and the management-level courses.

In practice a company wants years as second engineer on the same type of plant, a clean record with inspections, and the trust of its technical superintendents. Most chief engineers are promoted inside the fleet.

## The path

Engine cadet → fourth engineer → third engineer → second engineer → **chief engineer**. With steady contracts it often takes **8–12 years** from cadet to chief, faster on some fleets and slower on others.

## Contracts and rotation

Chief engineers often sail shorter contracts than the rest of the crew — on many fleets **three to four months**, on others longer. MLC 2006 limits the time on board before repatriation to **less than 12 months**, and the rest-hour minimums — **10 hours in 24** and **77 in seven days** — apply to the chief engineer too, even during a long breakdown.

## Interview questions for a chief engineer

1. **"What was the biggest breakdown you handled, and how?"** Diagnosis, decision, report, prevention.
2. **"How do you prepare for bunkering and check the fuel?"** Procedure, sampling, quantity disputes.
3. **"How do you comply with the sulphur limits when entering an ECA?"** Fuel changeover, records, timing.
4. **"What did your last PSC or vetting inspection find in the engine room?"**
5. **"How do you manage spares within budget?"** Critical spares, planning, the superintendent.
6. **"Scavenge fire / crankcase explosion: what are the signs and what do you do?"**

## Common mistakes

- **Applying for a plant you have never run** — a first chief engineer's contract is almost always on a type you know as second.
- **A CV without engine makes and models.** For this rank they are the first thing a superintendent reads.
- **Missing High Voltage or type-specific courses** when the fleet needs them.
- **No references** from a superintendent or a previous chief.

## FAQ

**How long does it take to become a chief engineer?**
Often 8–12 years from engine cadet, depending on the fleet and how steadily you sail.

**What is the difference between III/2 and III/3?**
III/2 is for ships with propulsion power of 3,000 kW or more; III/3 covers 750–3,000 kW.

**Does the chief engineer keep a watch?**
Usually not; on small ships the chief engineer may share duties.

**Is the chief engineer equal to the master?**
The master has overall command of the ship; the chief engineer heads the engine department and is usually the second most senior officer on board.

## Pay and jobs

The chief engineer is usually paid on a level close to the master's; the gap depends on the vessel type and the company. The current range from real vacancies is on the [chief engineer jobs page](/jobs/rank/chief-engineer); a comparison by rank is on our [salaries page](/salaries).

## Your CV

Crewing desks read a chief engineer's CV for engine makes and models, power, vessel types and inspection results. The [maritime CV](/maritime-cv) puts them first.

*Requirements follow STCW, MARPOL and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Старший механик** — «дед» или «чиф» в машине, «C/E» в судовой роли — возглавляет машинную службу и отвечает за каждый механизм на борту: главный двигатель, генераторы, котлы, насосы, рулевую машину, топливо и всё, что заставляет судно двигаться и жить. На палубе командует капитан, внизу решает стармех. В гайде — чем он занимается, типичный день, отличия по типам судов, диплом, собеседование и путь от второго механика.

## Чем занимается стармех

- **Ответственность за все механизмы.** Безопасная и экономичная работа пропульсивной установки, выработки электроэнергии, вспомогательных систем и аварийного оборудования.
- **Плановое обслуживание.** Система планово-предупредительного обслуживания компании, переборки, освидетельствования класса и состояние каждого механизма — стармех принимает работы и докладывает техническому суперинтенданту.
- **Топливо и масла.** Планы и процедуры бункеровки, качество топлива и пробы, отчёты о расходе и выполнение MARPOL: журнал нефтяных операций, сепаратор льяльных вод (15 ppm) и лимиты серы по Приложению VI — 0,50% в целом в море и 0,10% в районах контроля выбросов.
- **Запчасти и бюджет.** Заказы запчастей и снабжения, часто в рамках бюджета, согласованного с офисом.
- **Машинная команда.** Второй, третий и четвёртый механики, электромеханик, фиттеры, мотористы и вайперы: кто что делает, обучение, часы труда и отдыха.
- **Безопасность.** Пожарные риски машинного отделения, аварийный дизель-генератор и пожарный насос, закрытые помещения и огневые работы, роли машинной команды на учениях.
- **Инспекции.** Port state control, флаг, класс, а на танкерах — вэттинг внимательно смотрят машинное отделение; отвечает за него стармех.

## Типичный день

- **Утро:** обход машинного отделения, журнал и ночные тревоги, затем совещание со вторым механиком о работах на день. На многих судах — ещё и короткая встреча с капитаном.
- **День:** переписка с суперинтендантом, заказы запчастей, записи по обслуживанию, контроль больших работ.
- **Полдень:** цифры по топливу и расходу для полуденного отчёта.
- **Вечер:** ночные распоряжения по машине и вахтенному механику.

Приходы и отходы, бункеровки, блэкауты и поломки отменяют всё: на маневрах стармех в ЦПУ и на связи в любое время.

## Отличия по типам судов

- **Контейнеровозы:** очень большие двухтактные двигатели, высокие скорости и жёсткое расписание; в порту мало времени на обслуживание.
- **Танкеры:** грузовые насосы (паровые или электрические), инертный газ и котлы; вэттинг проверяет и машину.
- **Газовозы (LNG):** двухтопливные двигатели или паровые турбины на старых судах, работа с boil-off, установки высокого напряжения — и подготовка IGF/IGC.
- **Балкеры:** более простые установки, долгие рейсы и стармех, который умеет растянуть запчасти.
- **Оффшор:** дизель-электрические установки, резервирование для DP, подруливающие устройства и короткие контракты.
- **Пассажирские суда:** огромные энергоустановки, много механиков и гостиничные системы — кондиционирование, пресная вода, сточные воды — в масштабе города.

## Дипломы и документы

- **Диплом старшего механика без ограничений** (ПДНВ III/2, 3000 кВт и более) — подтверждается каждые **пять лет**. Для 750–3000 кВт — отдельный диплом по правилу III/3.
- **Подтверждения флага** (ПДНВ I/10) для флагов, под которыми работаете.
- **Медицинское свидетельство** — не более **двух лет**.
- **Переподготовка по Basic Training** каждые пять лет; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ERM** (управление ресурсами машинного отделения), **High Voltage** уровня управления и курсы на тип для двигателей с электронным управлением, если они есть в компании.
- Для танкеров и газовозов — **расширенная грузовая подготовка**; для судов на газовом топливе — **IGF**.

## Что для этого нужно

По **правилу III/2 ПДНВ (STCW)** для диплома старшего механика на суда мощностью 3000 кВт и более нужен диплом вахтенного механика (III/1) и не менее **36 месяцев** одобренного стажа, из которых не менее **12 месяцев** — в должности механика с ответственностью при наличии квалификации второго механика. Сверху — экзамены администрации и курсы уровня управления.

На практике компании нужны годы вторым механиком на установке того же типа, чистая история инспекций и доверие технических суперинтендантов. Большинство стармехов повышают внутри флота.

## Путь

Машинный кадет → четвёртый механик → третий механик → второй механик → **старший механик**. При регулярных контрактах путь от кадета до стармеха часто занимает **8–12 лет**: на одних флотах быстрее, на других медленнее.

## Контракты и ротация

У стармехов контракты часто короче, чем у остального экипажа: во многих компаниях **три-четыре месяца**, в других дольше. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**, а минимум отдыха — **10 часов за 24** и **77 за семь дней** — касается и стармеха, даже во время долгой поломки.

## Вопросы на собеседовании

1. **«Какую самую серьёзную поломку вы устраняли и как?»** Диагностика, решение, доклад, профилактика.
2. **«Как вы готовитесь к бункеровке и проверяете топливо?»** Процедура, пробы, споры о количестве.
3. **«Как вы соблюдаете лимиты серы при входе в район ECA?»** Переход на другое топливо, записи, время.
4. **«Что нашла последняя PSC или вэттинг в машинном отделении?»**
5. **«Как вы управляете запчастями в рамках бюджета?»** Критические запчасти, планирование, суперинтендант.
6. **«Пожар в подпоршневом пространстве / взрыв в картере: признаки и ваши действия?»**

## Частые ошибки

- **Заявка на установку, с которой вы не работали.** Первый контракт стармехом почти всегда на типе, который вы знаете как второй механик.
- **CV без марок и моделей двигателей.** Для этой должности суперинтендант читает их первыми.
- **Нет High Voltage или курсов на тип**, когда флоту они нужны.
- **Нет рекомендаций** от суперинтенданта или прежнего стармеха.

## Частые вопросы

**Сколько лет нужно, чтобы стать стармехом?**
Часто 8–12 лет от машинного кадета — зависит от флота и регулярности контрактов.

**Чем III/2 отличается от III/3?**
III/2 — для судов с мощностью главной установки 3000 кВт и более; III/3 — для 750–3000 кВт.

**Стоит ли стармех вахту?**
Обычно нет; на небольших судах стармех может совмещать обязанности.

**Стармех равен капитану?**
Общее командование судном у капитана; стармех возглавляет машинную службу и обычно второй по старшинству офицер на борту.

## Зарплата и вакансии

Зарплата стармеха обычно близка к капитанской; разница зависит от типа судна и компании. Актуальный диапазон по реальным вакансиям — на странице [вакансий старшего механика](/ru/jobs/rank/chief-engineer), сравнение по должностям — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV стармеха крюинг смотрит марки и модели двигателей, мощность, типы судов и результаты инспекций. [CV моряка](/ru/maritime-cv) ставит их в начало.

*Требования — по ПДНВ (STCW), MARPOL и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Старший механік** — «дід» чи «чіф» у машині, «C/E» у судновій ролі — очолює машинну службу й відповідає за кожен механізм на борту: головний двигун, генератори, котли, насоси, стернову машину, паливо й усе, що змушує судно рухатися й жити. На палубі командує капітан, унизу вирішує стармех. У гайді — чим він займається, типовий день, відмінності за типами суден, диплом, співбесіда й шлях від другого механіка.

## Чим займається стармех

- **Відповідальність за всі механізми.** Безпечна й економна робота пропульсивної установки, вироблення електроенергії, допоміжних систем і аварійного обладнання.
- **Планове обслуговування.** Система планово-попереджувального обслуговування компанії, перебирання, огляди класу й стан кожного механізму — стармех приймає роботи й доповідає технічному суперінтенданту.
- **Паливо й оливи.** Плани й процедури бункерування, якість палива й проби, звіти про витрату й виконання MARPOL: журнал нафтових операцій, сепаратор лляльних вод (15 ppm) і ліміти сірки за Додатком VI — 0,50% загалом у морі та 0,10% у районах контролю викидів.
- **Запчастини й бюджет.** Замовлення запчастин і постачання, часто в межах бюджету, погодженого з офісом.
- **Машинна команда.** Другий, третій і четвертий механіки, електромеханік, фітери, мотористи й вайпери: хто що робить, навчання, години праці й відпочинку.
- **Безпека.** Пожежні ризики машинного відділення, аварійний дизель-генератор і пожежний насос, закриті приміщення й вогневі роботи, ролі машинної команди на навчаннях.
- **Інспекції.** Port state control, прапор, клас, а на танкерах — веттинг уважно дивляться машинне відділення; відповідає за нього стармех.

## Типовий день

- **Ранок:** обхід машинного відділення, журнал і нічні тривоги, потім нарада з другим механіком про роботи на день. На багатьох суднах — ще й коротка зустріч із капітаном.
- **День:** листування із суперінтендантом, замовлення запчастин, записи з обслуговування, контроль великих робіт.
- **Полудень:** цифри щодо палива й витрати для полуденного звіту.
- **Вечір:** нічні розпорядження щодо машини й вахтового механіка.

Приходи й відходи, бункерування, блекаути й поломки скасовують усе: на маневрах стармех у ЦПК і на зв'язку будь-коли.

## Відмінності за типами суден

- **Контейнеровози:** дуже великі двотактні двигуни, високі швидкості й жорсткий розклад; у порту мало часу на обслуговування.
- **Танкери:** вантажні насоси (парові чи електричні), інертний газ і котли; веттинг перевіряє й машину.
- **Газовози (LNG):** двопаливні двигуни або парові турбіни на старих суднах, робота з boil-off, установки високої напруги — і підготовка IGF/IGC.
- **Балкери:** простіші установки, довгі рейси й стармех, який уміє розтягнути запчастини.
- **Офшор:** дизель-електричні установки, резервування для DP, підрулювальні пристрої й короткі контракти.
- **Пасажирські судна:** величезні енергоустановки, багато механіків і готельні системи — кондиціювання, прісна вода, стічні води — у масштабі міста.

## Дипломи й документи

- **Диплом старшого механіка без обмежень** (ПДНВ III/2, 3000 кВт і більше) — підтверджується кожні **п'ять років**. Для 750–3000 кВт — окремий диплом за правилом III/3.
- **Підтвердження прапора** (ПДНВ I/10) для прапорів, під якими працюєте.
- **Медичне свідоцтво** — не більше **двох років**.
- **Перепідготовка з Basic Training** кожні п'ять років; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ERM** (управління ресурсами машинного відділення), **High Voltage** рівня управління й курси на тип для двигунів з електронним керуванням, якщо вони є в компанії.
- Для танкерів і газовозів — **розширена вантажна підготовка**; для суден на газовому паливі — **IGF**.

## Що для цього потрібно

За **правилом III/2 ПДНВ (STCW)** для диплома старшого механіка на судна потужністю 3000 кВт і більше потрібен диплом вахтового механіка (III/1) і щонайменше **36 місяців** схваленого стажу, з яких щонайменше **12 місяців** — на посаді механіка з відповідальністю за наявності кваліфікації другого механіка. Зверху — іспити адміністрації та курси рівня управління.

На практиці компанії потрібні роки другим механіком на установці того самого типу, чиста історія інспекцій і довіра технічних суперінтендантів. Більшість стармехів підвищують усередині флоту.

## Шлях

Машинний кадет → четвертий механік → третій механік → другий механік → **старший механік**. За регулярних контрактів шлях від кадета до стармеха часто займає **8–12 років**: на одних флотах швидше, на інших повільніше.

## Контракти й ротація

У стармехів контракти часто коротші, ніж в іншого екіпажу: у багатьох компаніях **три-чотири місяці**, в інших довше. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**, а мінімум відпочинку — **10 годин за 24** і **77 за сім днів** — стосується й стармеха, навіть під час довгої поломки.

## Питання на співбесіді

1. **«Яку найсерйознішу поломку ви усували і як?»** Діагностика, рішення, доповідь, профілактика.
2. **«Як ви готуєтеся до бункерування й перевіряєте паливо?»** Процедура, проби, суперечки щодо кількості.
3. **«Як ви дотримуєтеся лімітів сірки під час входу в район ECA?»** Перехід на інше паливо, записи, час.
4. **«Що знайшла остання PSC чи веттинг у машинному відділенні?»**
5. **«Як ви керуєте запчастинами в межах бюджету?»** Критичні запчастини, планування, суперінтендант.
6. **«Пожежа в підпоршневому просторі / вибух у картері: ознаки та ваші дії?»**

## Часті помилки

- **Заявка на установку, з якою ви не працювали.** Перший контракт стармехом майже завжди на типі, який ви знаєте як другий механік.
- **CV без марок і моделей двигунів.** Для цієї посади суперінтендант читає їх першими.
- **Немає High Voltage чи курсів на тип**, коли флоту вони потрібні.
- **Немає рекомендацій** від суперінтенданта чи попереднього стармеха.

## Часті питання

**Скільки років потрібно, щоб стати стармехом?**
Часто 8–12 років від машинного кадета — залежить від флоту й регулярності контрактів.

**Чим III/2 відрізняється від III/3?**
III/2 — для суден із потужністю головної установки 3000 кВт і більше; III/3 — для 750–3000 кВт.

**Чи несе стармех вахту?**
Зазвичай ні; на невеликих суднах стармех може суміщати обов'язки.

**Стармех рівний капітанові?**
Загальне командування судном у капітана; стармех очолює машинну службу й зазвичай другий за старшинством офіцер на борту.

## Зарплата й вакансії

Зарплата стармеха зазвичай близька до капітанської; різниця залежить від типу судна й компанії. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій старшого механіка](/ua/jobs/rank/chief-engineer), порівняння за посадами — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV стармеха крюїнг дивиться марки й моделі двигунів, потужність, типи суден і результати інспекцій. [CV моряка](/ua/maritime-cv) ставить їх на початок.

*Вимоги — за ПДНВ (STCW), MARPOL і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Starszy mechanik** — „chief” w maszynowni, „C/E” na liście załogi — kieruje działem maszynowym i odpowiada za każde urządzenie na burcie: silnik główny, generatory, kotły, pompy, maszynę sterową, paliwo i wszystko, co sprawia, że statek płynie i żyje. Na pokładzie dowodzi kapitan, na dole decyduje starszy mechanik. W poradniku: czym się zajmuje, typowy dzień, różnice według typu statku, dyplom, rozmowa i droga od drugiego mechanika.

## Czym zajmuje się starszy mechanik

- **Odpowiedzialność za wszystkie urządzenia.** Bezpieczna i ekonomiczna praca układu napędowego, wytwarzania energii, systemów pomocniczych i urządzeń awaryjnych.
- **Planowa konserwacja.** System planowej konserwacji firmy, remonty, przeglądy klasyfikacyjne i stan każdego urządzenia — starszy mechanik odbiera prace i raportuje do inspektora technicznego armatora.
- **Paliwo i smary.** Plany i procedury bunkrowania, jakość paliwa i próbki, raporty zużycia oraz zgodność z MARPOL: księga zapisów olejowych, separator wód zęzowych (15 ppm) i limity siarki z Załącznika VI — 0,50% ogólnie na morzu i 0,10% w obszarach kontroli emisji.
- **Części i budżet.** Zamówienia części zamiennych i zaopatrzenia, często w ramach budżetu uzgodnionego z biurem.
- **Zespół maszynowy.** Drugi, trzeci i czwarty mechanik, elektroautomatyk, fitterzy, motorzyści i wiperzy: kto co robi, szkolenia, godziny pracy i odpoczynku.
- **Bezpieczeństwo.** Zagrożenia pożarowe w maszynowni, awaryjny zespół prądotwórczy i pompa pożarowa, przestrzenie zamknięte i prace pożarowo niebezpieczne, role zespołu maszynowego w ćwiczeniach.
- **Inspekcje.** Port state control, bandera, towarzystwo klasyfikacyjne, a na tankowcach vetting dokładnie oglądają maszynownię; odpowiada za nią starszy mechanik.

## Typowy dzień

- **Rano:** obchód maszynowni, dziennik i nocne alarmy, potem narada z drugim mechanikiem o pracach na dzień. Na wielu statkach także krótkie spotkanie z kapitanem.
- **W ciągu dnia:** korespondencja z inspektorem, zamówienia części, zapisy konserwacji, kontrola dużych prac.
- **Południe:** dane o paliwie i zużyciu do raportu południowego.
- **Wieczór:** nocne polecenia dla maszynowni i mechanika dyżurnego.

Wejścia i wyjścia z portu, bunkrowania, blackouty i awarie zmieniają wszystko: podczas manewrów starszy mechanik jest w centrali manewrowo-kontrolnej i jest dostępny o każdej porze.

## Różnice według typu statku

- **Kontenerowce:** bardzo duże silniki dwusuwowe, duże prędkości i napięty rozkład; mało czasu w porcie na konserwację.
- **Tankowce:** pompy ładunkowe (parowe lub elektryczne), gaz obojętny i kotły; vetting sprawdza także maszynownię.
- **Gazowce (LNG):** silniki dwupaliwowe lub turbiny parowe na starszych statkach, obsługa boil-off, instalacje wysokiego napięcia — i szkolenia IGF/IGC.
- **Masowce:** prostsze siłownie, długie podróże i starszy mechanik, który potrafi rozłożyć części na długo.
- **Offshore:** napęd spalinowo-elektryczny, redundancja dla DP, pędniki i krótkie kontrakty.
- **Statki pasażerskie:** ogromne siłownie, wielu mechaników i systemy hotelowe — klimatyzacja, woda słodka, ścieki — w skali miasta.

## Dyplomy i dokumenty

- **Dyplom starszego mechanika bez ograniczeń** (STCW III/2, 3000 kW i więcej) — odnawiany co **pięć lat**. Dla 750–3000 kW jest osobny dyplom z prawidła III/3.
- **Potwierdzenia bandery** (STCW I/10) dla bander, pod którymi pływasz.
- **Świadectwo zdrowia** — ważne najwyżej **dwa lata**.
- **Kursy odnawiające Basic Training** co pięć lat; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ERM** (zarządzanie zasobami maszynowni), **High Voltage** na poziomie zarządzania i kursy typowe dla silników sterowanych elektronicznie, jeśli firma je ma.
- Na tankowce i gazowce — **zaawansowane szkolenie ładunkowe**; na statki zasilane gazem — **IGF**.

## Czego to wymaga

Zgodnie z **prawidłem III/2 STCW** dyplom starszego mechanika na statkach o mocy 3000 kW i więcej wymaga dyplomu oficera wachtowego w dziale maszynowym (III/1) i co najmniej **36 miesięcy** zatwierdzonej praktyki, z czego co najmniej **12 miesięcy** na odpowiedzialnym stanowisku mechanika przy posiadanych kwalifikacjach drugiego mechanika. Do tego egzaminy administracji i kursy poziomu zarządzania.

W praktyce firma oczekuje lat jako drugi mechanik na siłowni tego samego typu, czystej historii inspekcji i zaufania inspektorów technicznych. Większość starszych mechaników awansuje wewnątrz floty.

## Ścieżka

Kadet mechanik → czwarty mechanik → trzeci mechanik → drugi mechanik → **starszy mechanik**. Przy regularnych kontraktach droga od kadeta do starszego mechanika trwa często **8–12 lat**: w jednych flotach szybciej, w innych wolniej.

## Kontrakty i rotacja

Starsi mechanicy mają często krótsze kontrakty niż reszta załogi: w wielu firmach **trzy-cztery miesiące**, w innych dłużej. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**, a minimum odpoczynku — **10 godzin na 24** i **77 na siedem dni** — dotyczy także starszego mechanika, nawet podczas długiej awarii.

## Pytania na rozmowie

1. **„Jaką największą awarię Pan usuwał i jak?”** Diagnoza, decyzja, raport, zapobieganie.
2. **„Jak przygotowuje się Pan do bunkrowania i sprawdza paliwo?”** Procedura, próbki, spory o ilość.
3. **„Jak spełnia Pan limity siarki przy wejściu do strefy ECA?”** Przejście na inne paliwo, zapisy, czas.
4. **„Co wykazała ostatnia PSC lub vetting w maszynowni?”**
5. **„Jak zarządza Pan częściami w ramach budżetu?”** Części krytyczne, planowanie, inspektor.
6. **„Pożar w przestrzeni podtłokowej / wybuch w skrzyni korbowej: objawy i Pana działania?”**

## Częste błędy

- **Aplikowanie na siłownię, na której nie pracowałeś.** Pierwszy kontrakt jako starszy mechanik jest prawie zawsze na typie znanym z pracy jako drugi.
- **CV bez marek i modeli silników.** Na tym stanowisku inspektor czyta je najpierw.
- **Brak High Voltage lub kursów typowych**, gdy flota ich potrzebuje.
- **Brak referencji** od inspektora lub poprzedniego starszego mechanika.

## Najczęstsze pytania

**Ile lat trzeba, żeby zostać starszym mechanikiem?**
Często 8–12 lat od kadeta mechanika — zależy od floty i regularności kontraktów.

**Czym różni się III/2 od III/3?**
III/2 dotyczy statków o mocy napędu 3000 kW i więcej; III/3 — od 750 do 3000 kW.

**Czy starszy mechanik pełni wachtę?**
Zwykle nie; na małych statkach może łączyć obowiązki.

**Czy starszy mechanik jest równy kapitanowi?**
Ogólne dowództwo nad statkiem ma kapitan; starszy mechanik kieruje działem maszynowym i jest zwykle drugim co do starszeństwa oficerem na burcie.

## Wynagrodzenie i oferty

Płaca starszego mechanika jest zwykle zbliżona do kapitańskiej; różnica zależy od typu statku i firmy. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla starszych mechaników](/pl/jobs/rank/chief-engineer), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV starszego mechanika agencja patrzy na marki i modele silników, moc, typy statków i wyniki inspekcji. [CV marynarza](/pl/maritime-cv) stawia je na początku.

*Wymagania według STCW, MARPOL i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Engine', 'guide',
  'linear-gradient(135deg,#0e2a45,#8a3d1d)',
  true, '2026-10-11 09:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Chief engineer on a ship: duties, requirements and how to become one');

-- ── 53. Second Engineer ──────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Second engineer on a ship: duties, requirements and the step to chief',
    'ru', 'Второй механик на судне: обязанности, требования и путь к стармеху',
    'ua', 'Другий механік на судні: обов''язки, вимоги та шлях до стармеха',
    'pl', 'Drugi mechanik na statku: obowiązki, wymagania i droga do starszego mechanika'),
  jsonb_build_object(
    'en', $en$The **second engineer** — "second" in the engine room — runs the engine department day to day and is the chief engineer's deputy. If the chief engineer decides what the plant needs, the second engineer makes it happen: the day's jobs, the big overhauls, the engine crew and the main engine itself. It is also the rank from which chief engineers are made. This guide covers the duties, a typical day, the certificate, the interview and the step up.

## What the second engineer does

- **Organises the engine room.** Plans the day's work for the third and fourth engineers, fitters, oilers and wipers, and checks it is done right and safely.
- **The main engine.** On most ships the main engine and its systems are the second engineer's responsibility: overhauls of pistons, liners, injectors and exhaust valves, performance readings, and the planned maintenance records.
- **Planned maintenance system.** Keeps the jobs on schedule, records the running hours, and orders the spares the next overhauls will need.
- **Watchkeeping or duty.** On ships with a manned engine room the second engineer often keeps the **04:00–08:00 and 16:00–20:00** watch; on ships with an unattended machinery space (UMS) the engineers work by day and take turns as duty engineer at night.
- **Bunkering.** Often runs the bunkering operation under the chief engineer: tanks, soundings, sampling and the oil record book.
- **Safety.** Permits for hot work and enclosed spaces in the engine room, the engine team's roles in drills, and the condition of the fire-fighting equipment below.
- **Deputy.** Takes over if the chief engineer cannot act.

## A typical day

- **07:30–08:00:** the plan with the chief engineer, then a toolbox talk with the engine crew.
- **08:00–17:00:** maintenance — usually the second engineer is in the middle of the biggest job of the day.
- **Evening:** records, spare-part lists, the plan for tomorrow; on UMS ships, the duty engineer round before the engine room is left unattended.

Manoeuvres, bunkering and breakdowns come at any hour, and the second engineer is usually the first person the chief engineer calls.

## Differences by vessel type

- **Container ships:** large two-stroke engines, high loads and short port stays — overhauls have to fit into tight windows.
- **Tankers:** cargo pumps, boilers and inert gas plants on top of the main engine.
- **Gas carriers:** dual-fuel engines or steam plants, gas handling systems, high voltage.
- **Bulk carriers:** simpler plants and long voyages; time for maintenance, but fewer spares.
- **Offshore:** diesel-electric plants, thrusters and DP redundancy; often a DP-related induction.

## Certificates and documents

- **Certificate of competency, second engineer** (STCW III/2, 3,000 kW or more) — revalidated every **five years**; for 750–3,000 kW, III/3.
- **Flag endorsements** (STCW I/10).
- **Medical certificate** — valid for at most **two years**.
- **Basic Training refreshers** every five years; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ERM**, **High Voltage** (management level on many ships), type-specific courses for electronically controlled engines.
- For tankers and gas carriers — the **cargo** courses; for gas-fuelled ships — **IGF**.

## What it takes

Under **STCW Regulation III/2**, the second engineer's certificate for ships of 3,000 kW or more requires the officer-of-the-watch certificate (III/1) and at least **12 months** of approved sea service as assistant engineer officer or engineer officer — in practice, time as third engineer. Your administration's exams and the management-level courses come on top.

## The path

Fourth engineer → third engineer → **second engineer** → chief engineer. For the chief engineer's certificate STCW III/2 asks for at least 36 months of approved sea service, of which at least 12 months in a position of responsibility while qualified as second engineer.

## Contracts and rotation

Second engineers usually sail **four to six months**. MLC 2006 limits the time on board before repatriation to **less than 12 months**; the rest-hour minimums — **10 hours in 24** and **77 in seven days** — matter a lot for a rank that is always called first.

## Interview questions for a second engineer

1. **"Describe the last main engine overhaul you led."** Unit, findings, measurements, time taken.
2. **"How do you plan maintenance around port stays?"**
3. **"Purifier not separating — what do you check?"** Temperature, gravity disc, throughput, the bowl.
4. **"What are the signs of a scavenge fire, and what do you do?"**
5. **"How do you organise a bunkering?"** Tanks, soundings, samples, communication, spill prevention.
6. **"Blackout at sea — your actions?"** Emergency generator, restoring power, finding the cause.

## Common mistakes

- **A CV without engine makes, models and power.**
- **Claiming main engine overhauls you only watched.** Superintendents ask about clearances and measurements.
- **Missing High Voltage** when the ship has a high-voltage plant.
- **Not showing leadership** — a second engineer is judged on how the engine team works.

## FAQ

**How long from third to second engineer?**
Usually one or two contracts as third engineer, once the second engineer's certificate is in hand.

**Does the second engineer keep a watch?**
On manned engine rooms often the 04–08 watch; on UMS ships engineers work days and take turns on duty.

**What is the difference between second engineer and first engineer?**
On some fleets the second engineer is called "first engineer" — it is the same rank.

**Can I be a second engineer with a III/3 certificate?**
Only on ships of 750–3,000 kW; larger ships need III/2.

## Pay and jobs

A clear step up from third engineer, and close to chief officer level on many fleets. The current range from real vacancies is on the [second engineer jobs page](/jobs/rank/2nd-engineer); a comparison by rank on our [salaries page](/salaries).

## Your CV

Crewing desks look for engine makes and models, power, vessel types and the overhauls you led. The [maritime CV](/maritime-cv) lays them out where a superintendent looks first.

*Requirements follow STCW and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Второй механик** — «второй» в машине — руководит машинной службой изо дня в день и замещает стармеха. Если стармех решает, что нужно установке, то второй механик делает так, чтобы это случилось: работы на день, крупные переборки, машинная команда и сам главный двигатель. Это ещё и должность, из которой вырастают стармехи. В гайде — обязанности, типичный день, диплом, собеседование и следующий шаг.

## Чем занимается второй механик

- **Организует машинное отделение.** Планирует работы на день для третьего и четвёртого механиков, фиттеров, мотористов и вайперов и проверяет, что всё сделано правильно и безопасно.
- **Главный двигатель.** На большинстве судов ГД и его системы — зона второго механика: переборки поршней, втулок, форсунок и выпускных клапанов, снятие параметров, записи по плановому обслуживанию.
- **Система планового обслуживания.** Держит работы в графике, ведёт моточасы и заказывает запчасти для следующих переборок.
- **Вахта или дежурство.** На судах с вахтенным обслуживанием второй механик часто стоит вахту **с 04:00 до 08:00 и с 16:00 до 20:00**; на судах с безвахтенным машинным отделением (UMS) механики работают днём и по очереди дежурят ночью.
- **Бункеровка.** Часто ведёт бункеровку под руководством стармеха: танки, замеры, пробы, журнал нефтяных операций.
- **Безопасность.** Допуски на огневые работы и вход в закрытые помещения в машине, роли машинной команды на учениях, состояние противопожарного оборудования внизу.
- **Заместитель.** Принимает дела, если стармех не может действовать.

## Типичный день

- **07:30–08:00:** план со стармехом, затем инструктаж машинной команды.
- **08:00–17:00:** обслуживание — обычно второй механик в центре самой большой работы дня.
- **Вечер:** записи, списки запчастей, план на завтра; на UMS-судах — обход дежурного механика перед тем, как машину оставят без вахты.

Маневры, бункеровки и поломки бывают в любое время, и второго механика стармех обычно зовёт первым.

## Отличия по типам судов

- **Контейнеровозы:** большие двухтактные двигатели, высокие нагрузки и короткие стоянки — переборки нужно вписать в узкие окна.
- **Танкеры:** грузовые насосы, котлы и установки инертного газа в дополнение к ГД.
- **Газовозы:** двухтопливные двигатели или паротурбинные установки, системы обработки газа, высокое напряжение.
- **Балкеры:** более простые установки и долгие рейсы; время на обслуживание есть, запчастей меньше.
- **Оффшор:** дизель-электрические установки, подруливающие устройства и резервирование для DP; часто вводный курс по DP.

## Дипломы и документы

- **Диплом второго механика** (ПДНВ III/2, 3000 кВт и более) — подтверждается каждые **пять лет**; для 750–3000 кВт — III/3.
- **Подтверждения флага** (ПДНВ I/10).
- **Медицинское свидетельство** — не более **двух лет**.
- **Переподготовка по Basic Training** каждые пять лет; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ERM**, **High Voltage** (на многих судах — уровня управления), курсы на тип для двигателей с электронным управлением.
- Для танкеров и газовозов — **грузовые** курсы; для судов на газовом топливе — **IGF**.

## Что для этого нужно

По **правилу III/2 ПДНВ (STCW)** для диплома второго механика на суда мощностью 3000 кВт и более нужен диплом вахтенного механика (III/1) и не менее **12 месяцев** одобренного стажа в качестве механика или его помощника — на практике третьим механиком. Сверху — экзамены администрации и курсы уровня управления.

## Путь

Четвёртый механик → третий механик → **второй механик** → старший механик. Для диплома стармеха правило III/2 требует не менее 36 месяцев одобренного стажа, из них не менее 12 — в должности с ответственностью при квалификации второго механика.

## Контракты и ротация

Вторые механики обычно работают **четыре–шесть месяцев**. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**; минимум отдыха — **10 часов за 24** и **77 за семь дней** — особенно важен для должности, которую всегда зовут первой.

## Вопросы на собеседовании

1. **«Расскажите о последней переборке ГД, которой вы руководили».** Цилиндр, что нашли, замеры, сколько заняло.
2. **«Как вы планируете обслуживание под стоянки в порту?»**
3. **«Сепаратор не сепарирует — что проверяете?»** Температура, регулировочная шайба, производительность, барабан.
4. **«Признаки пожара в подпоршневом пространстве и ваши действия?»**
5. **«Как вы организуете бункеровку?»** Танки, замеры, пробы, связь, предотвращение разлива.
6. **«Блэкаут в море — ваши действия?»** Аварийный генератор, восстановление питания, поиск причины.

## Частые ошибки

- **CV без марок, моделей и мощности двигателей.**
- **Заявлять переборки ГД, на которых вы только присутствовали.** Суперинтенданты спрашивают про зазоры и замеры.
- **Нет High Voltage**, когда на судне установка высокого напряжения.
- **Не показать руководство** — второго механика оценивают по тому, как работает машинная команда.

## Частые вопросы

**Сколько времени от третьего до второго механика?**
Обычно один-два контракта третьим механиком после получения диплома второго механика.

**Стоит ли второй механик вахту?**
При вахтенном обслуживании часто вахту 04–08; на UMS-судах механики работают днём и дежурят по очереди.

**Чем второй механик отличается от first engineer?**
На некоторых флотах второго механика называют «first engineer» — это та же должность.

**Можно ли быть вторым механиком с дипломом III/3?**
Только на судах мощностью 750–3000 кВт; на более мощных нужен III/2.

## Зарплата и вакансии

Заметный шаг вверх от третьего механика и во многих компаниях уровень, близкий к старпому. Актуальный диапазон по реальным вакансиям — на странице [вакансий второго механика](/ru/jobs/rank/2nd-engineer), сравнение по должностям — на странице [зарплат](/ru/salaries).

## Ваше CV

Крюинг ищет в CV марки и модели двигателей, мощность, типы судов и переборки, которыми вы руководили. [CV моряка](/ru/maritime-cv) ставит их туда, куда суперинтендант смотрит первым.

*Требования — по ПДНВ (STCW) и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Другий механік** — «другий» у машині — керує машинною службою щодня й заміщає стармеха. Якщо стармех вирішує, що потрібно установці, то другий механік робить так, щоб це сталося: роботи на день, великі перебирання, машинна команда й сам головний двигун. Це ще й посада, з якої виростають стармехи. У гайді — обов'язки, типовий день, диплом, співбесіда й наступний крок.

## Чим займається другий механік

- **Організовує машинне відділення.** Планує роботи на день для третього й четвертого механіків, фітерів, мотористів і вайперів і перевіряє, що все зроблено правильно й безпечно.
- **Головний двигун.** На більшості суден ГД і його системи — зона другого механіка: перебирання поршнів, втулок, форсунок і випускних клапанів, зняття параметрів, записи з планового обслуговування.
- **Система планового обслуговування.** Тримає роботи в графіку, веде мотогодини й замовляє запчастини для наступних перебирань.
- **Вахта чи чергування.** На суднах із вахтовим обслуговуванням другий механік часто несе вахту **з 04:00 до 08:00 і з 16:00 до 20:00**; на суднах із безвахтовим машинним відділенням (UMS) механіки працюють удень і по черзі чергують уночі.
- **Бункерування.** Часто веде бункерування під керівництвом стармеха: танки, заміри, проби, журнал нафтових операцій.
- **Безпека.** Допуски на вогневі роботи й вхід у закриті приміщення в машині, ролі машинної команди на навчаннях, стан протипожежного обладнання внизу.
- **Заступник.** Приймає справи, якщо стармех не може діяти.

## Типовий день

- **07:30–08:00:** план зі стармехом, потім інструктаж машинної команди.
- **08:00–17:00:** обслуговування — зазвичай другий механік у центрі найбільшої роботи дня.
- **Вечір:** записи, списки запчастин, план на завтра; на UMS-суднах — обхід чергового механіка перед тим, як машину залишать без вахти.

Маневри, бункерування й поломки бувають будь-коли, і другого механіка стармех зазвичай кличе першим.

## Відмінності за типами суден

- **Контейнеровози:** великі двотактні двигуни, високі навантаження й короткі стоянки — перебирання треба вписати у вузькі вікна.
- **Танкери:** вантажні насоси, котли й установки інертного газу на додачу до ГД.
- **Газовози:** двопаливні двигуни або паротурбінні установки, системи обробки газу, висока напруга.
- **Балкери:** простіші установки й довгі рейси; час на обслуговування є, запчастин менше.
- **Офшор:** дизель-електричні установки, підрулювальні пристрої й резервування для DP; часто вступний курс із DP.

## Дипломи й документи

- **Диплом другого механіка** (ПДНВ III/2, 3000 кВт і більше) — підтверджується кожні **п'ять років**; для 750–3000 кВт — III/3.
- **Підтвердження прапора** (ПДНВ I/10).
- **Медичне свідоцтво** — не більше **двох років**.
- **Перепідготовка з Basic Training** кожні п'ять років; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ERM**, **High Voltage** (на багатьох суднах — рівня управління), курси на тип для двигунів з електронним керуванням.
- Для танкерів і газовозів — **вантажні** курси; для суден на газовому паливі — **IGF**.

## Що для цього потрібно

За **правилом III/2 ПДНВ (STCW)** для диплома другого механіка на судна потужністю 3000 кВт і більше потрібен диплом вахтового механіка (III/1) і щонайменше **12 місяців** схваленого стажу як механік чи його помічник — на практиці третім механіком. Зверху — іспити адміністрації та курси рівня управління.

## Шлях

Четвертий механік → третій механік → **другий механік** → старший механік. Для диплома стармеха правило III/2 вимагає щонайменше 36 місяців схваленого стажу, з них щонайменше 12 — на посаді з відповідальністю за кваліфікації другого механіка.

## Контракти й ротація

Другі механіки зазвичай працюють **чотири–шість місяців**. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**; мінімум відпочинку — **10 годин за 24** і **77 за сім днів** — особливо важливий для посади, яку завжди кличуть першою.

## Питання на співбесіді

1. **«Розкажіть про останнє перебирання ГД, яким ви керували».** Циліндр, що знайшли, заміри, скільки зайняло.
2. **«Як ви плануєте обслуговування під стоянки в порту?»**
3. **«Сепаратор не сепарує — що перевіряєте?»** Температура, регулювальна шайба, продуктивність, барабан.
4. **«Ознаки пожежі в підпоршневому просторі та ваші дії?»**
5. **«Як ви організовуєте бункерування?»** Танки, заміри, проби, зв'язок, запобігання розливу.
6. **«Блекаут у морі — ваші дії?»** Аварійний генератор, відновлення живлення, пошук причини.

## Часті помилки

- **CV без марок, моделей і потужності двигунів.**
- **Заявляти перебирання ГД, на яких ви лише були присутні.** Суперінтенданти питають про зазори й заміри.
- **Немає High Voltage**, коли на судні установка високої напруги.
- **Не показати керівництво** — другого механіка оцінюють за тим, як працює машинна команда.

## Часті питання

**Скільки часу від третього до другого механіка?**
Зазвичай один-два контракти третім механіком після отримання диплома другого механіка.

**Чи несе другий механік вахту?**
За вахтового обслуговування часто вахту 04–08; на UMS-суднах механіки працюють удень і чергують по черзі.

**Чим другий механік відрізняється від first engineer?**
На деяких флотах другого механіка називають «first engineer» — це та сама посада.

**Чи можна бути другим механіком із дипломом III/3?**
Лише на суднах потужністю 750–3000 кВт; на потужніших потрібен III/2.

## Зарплата й вакансії

Помітний крок угору від третього механіка й у багатьох компаніях рівень, близький до старпома. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій другого механіка](/ua/jobs/rank/2nd-engineer), порівняння за посадами — на сторінці [зарплат](/ua/salaries).

## Ваше CV

Крюїнг шукає в CV марки й моделі двигунів, потужність, типи суден і перебирання, якими ви керували. [CV моряка](/ua/maritime-cv) ставить їх туди, куди суперінтендант дивиться першим.

*Вимоги — за ПДНВ (STCW) і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Drugi mechanik** — „drugi” w maszynowni — prowadzi dział maszynowy na co dzień i zastępuje starszego mechanika. Jeśli starszy mechanik decyduje, czego potrzebuje siłownia, to drugi mechanik sprawia, że to się dzieje: prace na dzień, duże remonty, zespół maszynowy i sam silnik główny. To także stanowisko, z którego wyrastają starsi mechanicy. W poradniku: obowiązki, typowy dzień, dyplom, rozmowa i następny krok.

## Czym zajmuje się drugi mechanik

- **Organizuje maszynownię.** Planuje prace na dzień dla trzeciego i czwartego mechanika, fitterów, motorzystów i wiperów i sprawdza, czy wykonano je dobrze i bezpiecznie.
- **Silnik główny.** Na większości statków silnik główny i jego systemy to strefa drugiego mechanika: remonty tłoków, tulei, wtryskiwaczy i zaworów wydechowych, pomiary parametrów, zapisy planowej konserwacji.
- **System planowej konserwacji.** Pilnuje harmonogramu prac, prowadzi motogodziny i zamawia części na kolejne remonty.
- **Wachta lub dyżur.** Na statkach z obsadzaną maszynownią drugi mechanik często pełni wachtę **04:00–08:00 i 16:00–20:00**; na statkach z maszynownią bezwachtową (UMS) mechanicy pracują w dzień i na zmianę pełnią dyżury nocne.
- **Bunkrowanie.** Często prowadzi bunkrowanie pod nadzorem starszego mechanika: zbiorniki, sondowania, próbki, księga zapisów olejowych.
- **Bezpieczeństwo.** Zezwolenia na prace pożarowo niebezpieczne i wejście do przestrzeni zamkniętych w maszynowni, role zespołu w ćwiczeniach, stan sprzętu przeciwpożarowego na dole.
- **Zastępca.** Przejmuje obowiązki, gdy starszy mechanik nie może działać.

## Typowy dzień

- **07:30–08:00:** plan ze starszym mechanikiem, potem odprawa zespołu maszynowego.
- **08:00–17:00:** konserwacja — zwykle drugi mechanik jest w środku największej pracy dnia.
- **Wieczór:** zapisy, listy części, plan na jutro; na statkach UMS — obchód mechanika dyżurnego przed pozostawieniem maszynowni bez wachty.

Manewry, bunkrowania i awarie zdarzają się o każdej porze, a drugiego mechanika starszy wzywa zwykle jako pierwszego.

## Różnice według typu statku

- **Kontenerowce:** duże silniki dwusuwowe, wysokie obciążenia i krótkie postoje — remonty trzeba zmieścić w wąskich oknach.
- **Tankowce:** pompy ładunkowe, kotły i instalacje gazu obojętnego oprócz silnika głównego.
- **Gazowce:** silniki dwupaliwowe lub siłownie parowe, systemy obsługi gazu, wysokie napięcie.
- **Masowce:** prostsze siłownie i długie podróże; jest czas na konserwację, ale mniej części.
- **Offshore:** napęd spalinowo-elektryczny, pędniki i redundancja DP; często szkolenie wprowadzające z DP.

## Dyplomy i dokumenty

- **Dyplom drugiego mechanika** (STCW III/2, 3000 kW i więcej) — odnawiany co **pięć lat**; dla 750–3000 kW — III/3.
- **Potwierdzenia bandery** (STCW I/10).
- **Świadectwo zdrowia** — ważne najwyżej **dwa lata**.
- **Kursy odnawiające Basic Training** co pięć lat; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ERM**, **High Voltage** (na wielu statkach na poziomie zarządzania), kursy typowe dla silników sterowanych elektronicznie.
- Na tankowce i gazowce — kursy **ładunkowe**; na statki zasilane gazem — **IGF**.

## Czego to wymaga

Zgodnie z **prawidłem III/2 STCW** dyplom drugiego mechanika na statkach o mocy 3000 kW i więcej wymaga dyplomu oficera wachtowego w dziale maszynowym (III/1) i co najmniej **12 miesięcy** zatwierdzonej praktyki jako mechanik lub asystent mechanika — w praktyce jako trzeci mechanik. Do tego egzaminy administracji i kursy poziomu zarządzania.

## Ścieżka

Czwarty mechanik → trzeci mechanik → **drugi mechanik** → starszy mechanik. Dyplom starszego mechanika według prawidła III/2 wymaga co najmniej 36 miesięcy zatwierdzonej praktyki, w tym co najmniej 12 na odpowiedzialnym stanowisku przy kwalifikacjach drugiego mechanika.

## Kontrakty i rotacja

Drudzy mechanicy pływają zwykle **cztery–sześć miesięcy**. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**; minimum odpoczynku — **10 godzin na 24** i **77 na siedem dni** — jest szczególnie ważne na stanowisku, które wzywa się zawsze pierwsze.

## Pytania na rozmowie

1. **„Proszę opisać ostatni remont silnika głównego, którym Pan kierował”.** Cylinder, ustalenia, pomiary, czas.
2. **„Jak planuje Pan konserwację pod postoje w porcie?”**
3. **„Wirówka nie separuje — co Pan sprawdza?”** Temperatura, tarcza regulacyjna, wydajność, bęben.
4. **„Objawy pożaru w przestrzeni podtłokowej i Pana działania?”**
5. **„Jak organizuje Pan bunkrowanie?”** Zbiorniki, sondowania, próbki, łączność, zapobieganie rozlewom.
6. **„Blackout na morzu — co Pan robi?”** Awaryjny zespół prądotwórczy, przywrócenie zasilania, szukanie przyczyny.

## Częste błędy

- **CV bez marek, modeli i mocy silników.**
- **Deklarowanie remontów silnika, przy których byłeś tylko obecny.** Inspektorzy pytają o luzy i pomiary.
- **Brak High Voltage**, gdy statek ma instalację wysokiego napięcia.
- **Brak pokazania kierowania ludźmi** — drugiego mechanika ocenia się po tym, jak pracuje zespół maszynowy.

## Najczęstsze pytania

**Ile trwa droga od trzeciego do drugiego mechanika?**
Zwykle jeden lub dwa kontrakty jako trzeci mechanik po uzyskaniu dyplomu drugiego mechanika.

**Czy drugi mechanik pełni wachtę?**
Przy obsadzanej maszynowni często wachtę 04–08; na statkach UMS mechanicy pracują w dzień i dyżurują na zmianę.

**Czym różni się drugi mechanik od first engineer?**
W niektórych flotach drugiego mechanika nazywa się „first engineer” — to to samo stanowisko.

**Czy można być drugim mechanikiem z dyplomem III/3?**
Tylko na statkach o mocy 750–3000 kW; na większych potrzebny jest III/2.

## Wynagrodzenie i oferty

Wyraźny krok w górę względem trzeciego mechanika i w wielu firmach poziom zbliżony do starszego oficera. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla drugich mechaników](/pl/jobs/rank/2nd-engineer), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

Agencja szuka w CV marek i modeli silników, mocy, typów statków i remontów, którymi kierowałeś. [CV marynarza](/pl/maritime-cv) stawia je tam, gdzie inspektor patrzy najpierw.

*Wymagania według STCW i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Engine', 'guide',
  'linear-gradient(135deg,#0e2a45,#9b4a2c)',
  true, '2026-10-11 09:10:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Second engineer on a ship: duties, requirements and the step to chief');

-- ── 54. Third Engineer ───────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Third engineer on a ship: duties, watch, requirements and promotion',
    'ru', 'Третий механик на судне: обязанности, вахта, требования и повышение',
    'ua', 'Третій механік на судні: обов''язки, вахта, вимоги та підвищення',
    'pl', 'Trzeci mechanik na statku: obowiązki, wachta, wymagania i awans'),
  jsonb_build_object(
    'en', $en$The **third engineer** keeps the ship's electricity flowing. On most ships the generators and their engines are the third engineer's machines, together with a share of the auxiliary plant — the boilers, compressors or purifiers, depending on the company. It is the rank where an engineer stops being the newest officer below and starts being responsible for systems the whole ship depends on. This guide covers the duties, the watch, a typical day, the certificate, the interview and the step to second engineer.

## What the third engineer does

- **Generators.** Running, load sharing, maintenance and overhauls of the auxiliary engines that drive the generators; records of running hours and performance.
- **Auxiliary machinery.** Depending on the company: boilers, air compressors, fuel and lube oil purifiers, fresh water generator, pumps.
- **Watchkeeping or duty.** On manned engine rooms the third engineer often keeps the **00:00–04:00 and 12:00–16:00** watch; on UMS ships engineers work by day and take turns as duty engineer at night, answering every alarm.
- **Planned maintenance.** Carries out and records the jobs on their machinery in the planned maintenance system.
- **Bunkering and transfers.** Often assists with bunkering, soundings and internal fuel transfers.
- **Safety.** Engine-room rounds, fire-fighting equipment below, and the engine team's roles in drills.

## A typical day

- **Manned engine room:** 00:00–04:00 and 12:00–16:00 on watch, with maintenance on own machinery outside the watch.
- **UMS ship:** 08:00–17:00 day work with the second engineer and the crew, then — on duty days — the evening round and alarms through the night.

Manoeuvres, bunkering and breakdowns come at any hour; a generator problem is usually the third engineer's first call.

## Differences by vessel type

- **Container ships:** large generators feeding reefer containers — power demand that never stops.
- **Tankers:** boilers and steam systems for cargo heating and pumps are often part of the job.
- **Gas carriers:** dual-fuel generators, high voltage, and gas safety systems.
- **Offshore:** diesel-electric plants where the generators are the propulsion — load management matters for DP.
- **Passenger ships:** many generators and big hotel loads; often several third engineers.

## Certificates and documents

- **Certificate of competency, officer in charge of an engineering watch** (STCW III/1, 750 kW or more) — revalidated every **five years**.
- **Flag endorsements** (STCW I/10).
- **Medical certificate** — valid for at most **two years**.
- **Basic Training refreshers** every five years; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ERM**, **High Voltage** where the ship has it; for tankers and gas carriers the basic cargo courses; for gas-fuelled ships **IGF**.

## What it takes

Under **STCW Regulation III/1**, the officer in charge of an engineering watch must be at least **18** and have combined workshop skill training and at least **12 months** of approved sea service as part of an approved training programme with a training record book — or at least **36 months** otherwise, of which at least 30 in the engine department — including at least **six months** of engine-room watchkeeping under supervision. The third engineer holds the same certificate as the fourth; experience is what separates them.

## The path

Fourth engineer → **third engineer** → second engineer. The step to second engineer needs the III/2 certificate and at least 12 months of approved sea service as an engineer officer.

## Contracts and rotation

Third engineers usually sail **four to six months**, sometimes longer. MLC 2006 limits time on board before repatriation to **less than 12 months**; the rest-hour minimums — **10 hours in 24** and **77 in seven days** — apply even after a night of alarms on a UMS duty.

## Interview questions for a third engineer

1. **"How do you parallel a generator onto the switchboard?"** Voltage, frequency, synchroscope, load sharing.
2. **"A generator trips at sea — what do you do?"** Standby start, preferential trips, finding the cause.
3. **"Boiler low water level alarm — your actions?"**
4. **"Purifier overflowing — what do you check?"**
5. **"What do you check on an engine-room round?"** Pressures, temperatures, leaks, bilges, levels.
6. **"What does the oily water separator do, and what is the limit?"** 15 ppm under MARPOL Annex I.

## Common mistakes

- **A CV that lists ships but not machinery** — generator makes and models matter for this rank.
- **No High Voltage course** when applying to ships that need it.
- **Weak electrical basics.** Generator questions come in every interview.
- **Courses expiring mid-contract.**

## FAQ

**Do the third and fourth engineers need different certificates?**
No. Both hold the STCW III/1 certificate; the difference is experience and duties.

**Does the third engineer keep a watch?**
On manned engine rooms yes, often the 00–04 watch; on UMS ships the third engineer takes turns as duty engineer.

**How long until promotion to second engineer?**
Usually after one or two contracts, once the second engineer's certificate is in hand.

**What does UMS mean?**
Unattended machinery space: the engine room runs without a watch at night, and the duty engineer answers alarms.

## Pay and jobs

A step up from fourth engineer, and a big one again to second engineer. The current range from real vacancies is on the [third engineer jobs page](/jobs/rank/3rd-engineer); a comparison by rank on our [salaries page](/salaries).

## Your CV

Crewing desks read a third engineer's CV for engine and generator makes, power, vessel types and certificates with dates. The [maritime CV](/maritime-cv) puts them on one page.

*Requirements follow STCW, MARPOL and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Третий механик** отвечает за то, чтобы на судне было электричество. На большинстве судов дизель-генераторы — его механизмы, вместе с частью вспомогательной установки: котлами, компрессорами или сепараторами — в зависимости от компании. На этой должности механик перестаёт быть самым новым офицером внизу и начинает отвечать за системы, от которых зависит всё судно. В гайде — обязанности, вахта, типичный день, диплом, собеседование и шаг ко второму механику.

## Чем занимается третий механик

- **Генераторы.** Работа, распределение нагрузки, обслуживание и переборки дизелей, которые вращают генераторы; учёт моточасов и параметров.
- **Вспомогательные механизмы.** В зависимости от компании: котлы, воздушные компрессоры, топливные и масляные сепараторы, опреснитель, насосы.
- **Вахта или дежурство.** При вахтенном обслуживании третий механик часто стоит вахту **с 00:00 до 04:00 и с 12:00 до 16:00**; на UMS-судах механики работают днём и по очереди дежурят ночью, отвечая на каждую тревогу.
- **Плановое обслуживание.** Выполняет и записывает работы по своим механизмам в системе планового обслуживания.
- **Бункеровка и перекачки.** Часто помогает при бункеровке, замерах и внутренних перекачках топлива.
- **Безопасность.** Обходы машинного отделения, противопожарное оборудование внизу, роли машинной команды на учениях.

## Типичный день

- **Вахтенное машинное отделение:** с 00:00 до 04:00 и с 12:00 до 16:00 на вахте, обслуживание своих механизмов вне вахты.
- **UMS-судно:** с 08:00 до 17:00 дневные работы со вторым механиком и командой, а в дни дежурства — вечерний обход и тревоги ночью.

Маневры, бункеровки и поломки — в любое время; при проблеме с генератором первым обычно зовут третьего механика.

## Отличия по типам судов

- **Контейнеровозы:** мощные генераторы питают рефконтейнеры — нагрузка, которая не прекращается.
- **Танкеры:** котлы и паровые системы для подогрева груза и насосов часто входят в работу.
- **Газовозы:** двухтопливные генераторы, высокое напряжение и системы газовой безопасности.
- **Оффшор:** дизель-электрические установки, где генераторы и есть движение, — управление нагрузкой важно для DP.
- **Пассажирские суда:** много генераторов и большая гостиничная нагрузка; часто несколько третьих механиков.

## Дипломы и документы

- **Диплом вахтенного механика** (ПДНВ III/1, 750 кВт и более) — подтверждается каждые **пять лет**.
- **Подтверждения флага** (ПДНВ I/10).
- **Медицинское свидетельство** — не более **двух лет**.
- **Переподготовка по Basic Training** каждые пять лет; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ERM**, **High Voltage**, если на судне есть высокое напряжение; для танкеров и газовозов — начальные грузовые курсы; для судов на газовом топливе — **IGF**.

## Что для этого нужно

По **правилу III/1 ПДНВ (STCW)** вахтенный механик должен быть не младше **18 лет** и иметь подготовку в мастерских и не менее **12 месяцев** одобренного стажа в рамках одобренной программы подготовки с книжкой регистрации — или не менее **36 месяцев** иначе, из них не менее 30 в машинной службе, — включая не менее **шести месяцев** вахты в машинном отделении под наблюдением. У третьего механика тот же диплом, что и у четвёртого; различает их опыт.

## Путь

Четвёртый механик → **третий механик** → второй механик. Для шага ко второму механику нужен диплом III/2 и не менее 12 месяцев одобренного стажа механиком.

## Контракты и ротация

Третьи механики обычно работают **четыре–шесть месяцев**, иногда дольше. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**; минимум отдыха — **10 часов за 24** и **77 за семь дней** — действует и после ночи тревог на UMS-дежурстве.

## Вопросы на собеседовании

1. **«Как включить генератор на параллельную работу?»** Напряжение, частота, синхроскоп, распределение нагрузки.
2. **«В море отключился генератор — ваши действия?»** Пуск резервного, отключение неответственных потребителей, поиск причины.
3. **«Тревога по низкому уровню воды в котле — ваши действия?»**
4. **«Сепаратор выбрасывает топливо — что проверяете?»**
5. **«Что вы проверяете при обходе машинного отделения?»** Давления, температуры, протечки, льяла, уровни.
6. **«Что делает сепаратор льяльных вод и какой предел?»** 15 ppm по Приложению I MARPOL.

## Частые ошибки

- **CV со списком судов, но без механизмов** — для этой должности важны марки и модели генераторов.
- **Нет курса High Voltage**, когда подаётесь на суда, где он нужен.
- **Слабая электрическая база.** Вопросы по генераторам есть на каждом собеседовании.
- **Курсы, истекающие посреди контракта.**

## Частые вопросы

**Нужны ли третьему и четвёртому механику разные дипломы?**
Нет. У обоих диплом по правилу III/1 ПДНВ; разница — в опыте и обязанностях.

**Стоит ли третий механик вахту?**
При вахтенном обслуживании да, часто 00–04; на UMS-судах третий механик дежурит по очереди.

**Когда повышение до второго механика?**
Обычно после одного-двух контрактов, когда на руках диплом второго механика.

**Что значит UMS?**
Безвахтенное машинное отделение: ночью машина работает без вахты, а на тревоги отвечает дежурный механик.

## Зарплата и вакансии

Шаг вверх от четвёртого механика и ещё один большой — ко второму. Актуальный диапазон по реальным вакансиям — на странице [вакансий третьего механика](/ru/jobs/rank/3rd-engineer), сравнение по должностям — на странице [зарплат](/ru/salaries).

## Ваше CV

В CV третьего механика крюинг смотрит марки двигателей и генераторов, мощность, типы судов и сертификаты со сроками. [CV моряка](/ru/maritime-cv) собирает их на одной странице.

*Требования — по ПДНВ (STCW), MARPOL и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Третій механік** відповідає за те, щоб на судні була електрика. На більшості суден дизель-генератори — його механізми, разом із частиною допоміжної установки: котлами, компресорами чи сепараторами — залежно від компанії. На цій посаді механік перестає бути найновішим офіцером унизу й починає відповідати за системи, від яких залежить усе судно. У гайді — обов'язки, вахта, типовий день, диплом, співбесіда й крок до другого механіка.

## Чим займається третій механік

- **Генератори.** Робота, розподіл навантаження, обслуговування й перебирання дизелів, що обертають генератори; облік мотогодин і параметрів.
- **Допоміжні механізми.** Залежно від компанії: котли, повітряні компресори, паливні й оливні сепаратори, опріснювач, насоси.
- **Вахта чи чергування.** За вахтового обслуговування третій механік часто несе вахту **з 00:00 до 04:00 і з 12:00 до 16:00**; на UMS-суднах механіки працюють удень і по черзі чергують уночі, відповідаючи на кожну тривогу.
- **Планове обслуговування.** Виконує й записує роботи зі своїх механізмів у системі планового обслуговування.
- **Бункерування й перекачування.** Часто допомагає під час бункерування, замірів і внутрішніх перекачувань палива.
- **Безпека.** Обходи машинного відділення, протипожежне обладнання внизу, ролі машинної команди на навчаннях.

## Типовий день

- **Вахтове машинне відділення:** з 00:00 до 04:00 і з 12:00 до 16:00 на вахті, обслуговування своїх механізмів поза вахтою.
- **UMS-судно:** з 08:00 до 17:00 денні роботи з другим механіком і командою, а в дні чергування — вечірній обхід і тривоги вночі.

Маневри, бункерування й поломки — будь-коли; за проблеми з генератором першим зазвичай кличуть третього механіка.

## Відмінності за типами суден

- **Контейнеровози:** потужні генератори живлять рефконтейнери — навантаження, яке не припиняється.
- **Танкери:** котли й парові системи для підігріву вантажу й насосів часто входять у роботу.
- **Газовози:** двопаливні генератори, висока напруга й системи газової безпеки.
- **Офшор:** дизель-електричні установки, де генератори і є рухом, — керування навантаженням важливе для DP.
- **Пасажирські судна:** багато генераторів і велике готельне навантаження; часто кілька третіх механіків.

## Дипломи й документи

- **Диплом вахтового механіка** (ПДНВ III/1, 750 кВт і більше) — підтверджується кожні **п'ять років**.
- **Підтвердження прапора** (ПДНВ I/10).
- **Медичне свідоцтво** — не більше **двох років**.
- **Перепідготовка з Basic Training** кожні п'ять років; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ERM**, **High Voltage**, якщо на судні є висока напруга; для танкерів і газовозів — початкові вантажні курси; для суден на газовому паливі — **IGF**.

## Що для цього потрібно

За **правилом III/1 ПДНВ (STCW)** вахтовий механік має бути не молодшим **18 років** і мати підготовку в майстернях і щонайменше **12 місяців** схваленого стажу в межах схваленої програми підготовки з книжкою реєстрації — або щонайменше **36 місяців** інакше, з них щонайменше 30 у машинній службі, — зокрема щонайменше **шість місяців** вахти в машинному відділенні під наглядом. У третього механіка той самий диплом, що й у четвертого; розрізняє їх досвід.

## Шлях

Четвертий механік → **третій механік** → другий механік. Для кроку до другого механіка потрібен диплом III/2 і щонайменше 12 місяців схваленого стажу механіком.

## Контракти й ротація

Треті механіки зазвичай працюють **чотири–шість місяців**, іноді довше. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**; мінімум відпочинку — **10 годин за 24** і **77 за сім днів** — діє й після ночі тривог на UMS-чергуванні.

## Питання на співбесіді

1. **«Як увімкнути генератор на паралельну роботу?»** Напруга, частота, синхроскоп, розподіл навантаження.
2. **«У морі вимкнувся генератор — ваші дії?»** Пуск резервного, вимкнення невідповідальних споживачів, пошук причини.
3. **«Тривога за низьким рівнем води в котлі — ваші дії?»**
4. **«Сепаратор викидає паливо — що перевіряєте?»**
5. **«Що ви перевіряєте під час обходу машинного відділення?»** Тиски, температури, протікання, льяла, рівні.
6. **«Що робить сепаратор лляльних вод і яка межа?»** 15 ppm за Додатком I MARPOL.

## Часті помилки

- **CV зі списком суден, але без механізмів** — для цієї посади важливі марки й моделі генераторів.
- **Немає курсу High Voltage**, коли подаєтеся на судна, де він потрібен.
- **Слабка електрична база.** Питання щодо генераторів є на кожній співбесіді.
- **Курси, що спливають посеред контракту.**

## Часті питання

**Чи потрібні третьому й четвертому механікові різні дипломи?**
Ні. В обох диплом за правилом III/1 ПДНВ; різниця — у досвіді й обов'язках.

**Чи несе третій механік вахту?**
За вахтового обслуговування так, часто 00–04; на UMS-суднах третій механік чергує по черзі.

**Коли підвищення до другого механіка?**
Зазвичай після одного-двох контрактів, коли на руках диплом другого механіка.

**Що означає UMS?**
Безвахтове машинне відділення: уночі машина працює без вахти, а на тривоги відповідає черговий механік.

## Зарплата й вакансії

Крок угору від четвертого механіка й ще один великий — до другого. Актуальний діапазон за реальними вакансіями — на сторінці [вакансій третього механіка](/ua/jobs/rank/3rd-engineer), порівняння за посадами — на сторінці [зарплат](/ua/salaries).

## Ваше CV

У CV третього механіка крюїнг дивиться марки двигунів і генераторів, потужність, типи суден і сертифікати зі строками. [CV моряка](/ua/maritime-cv) збирає їх на одній сторінці.

*Вимоги — за ПДНВ (STCW), MARPOL і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Trzeci mechanik** dba o to, żeby na statku był prąd. Na większości statków zespoły prądotwórcze to jego urządzenia, razem z częścią siłowni pomocniczej: kotłami, sprężarkami lub wirówkami — zależnie od firmy. Na tym stanowisku mechanik przestaje być najnowszym oficerem na dole i zaczyna odpowiadać za systemy, od których zależy cały statek. W poradniku: obowiązki, wachta, typowy dzień, dyplom, rozmowa i krok do drugiego mechanika.

## Czym zajmuje się trzeci mechanik

- **Generatory.** Praca, rozdział obciążenia, konserwacja i remonty silników napędzających prądnice; zapisy motogodzin i parametrów.
- **Urządzenia pomocnicze.** Zależnie od firmy: kotły, sprężarki powietrza, wirówki paliwa i oleju, wytwornica wody słodkiej, pompy.
- **Wachta lub dyżur.** Przy obsadzanej maszynowni trzeci mechanik często pełni wachtę **00:00–04:00 i 12:00–16:00**; na statkach UMS mechanicy pracują w dzień i na zmianę dyżurują w nocy, odpowiadając na każdy alarm.
- **Planowa konserwacja.** Wykonuje i zapisuje prace przy swoich urządzeniach w systemie planowej konserwacji.
- **Bunkrowanie i przepompowania.** Często pomaga przy bunkrowaniu, sondowaniach i wewnętrznych przepompowaniach paliwa.
- **Bezpieczeństwo.** Obchody maszynowni, sprzęt przeciwpożarowy na dole, role zespołu maszynowego w ćwiczeniach.

## Typowy dzień

- **Maszynownia obsadzana:** 00:00–04:00 i 12:00–16:00 na wachcie, konserwacja swoich urządzeń poza wachtą.
- **Statek UMS:** 08:00–17:00 prace dzienne z drugim mechanikiem i załogą, a w dni dyżuru — wieczorny obchód i alarmy w nocy.

Manewry, bunkrowania i awarie — o każdej porze; przy problemie z generatorem zwykle najpierw wzywa się trzeciego mechanika.

## Różnice według typu statku

- **Kontenerowce:** duże generatory zasilają kontenery chłodzone — obciążenie, które nigdy się nie kończy.
- **Tankowce:** kotły i systemy parowe do podgrzewania ładunku i pomp często wchodzą w zakres pracy.
- **Gazowce:** generatory dwupaliwowe, wysokie napięcie i systemy bezpieczeństwa gazowego.
- **Offshore:** napęd spalinowo-elektryczny, w którym generatory są napędem — zarządzanie obciążeniem liczy się dla DP.
- **Statki pasażerskie:** wiele generatorów i duże obciążenie hotelowe; często kilku trzecich mechaników.

## Dyplomy i dokumenty

- **Dyplom oficera wachtowego w dziale maszynowym** (STCW III/1, 750 kW i więcej) — odnawiany co **pięć lat**.
- **Potwierdzenia bandery** (STCW I/10).
- **Świadectwo zdrowia** — ważne najwyżej **dwa lata**.
- **Kursy odnawiające Basic Training** co pięć lat; **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**.
- **ERM**, **High Voltage**, jeśli statek ma wysokie napięcie; na tankowce i gazowce — podstawowe kursy ładunkowe; na statki zasilane gazem — **IGF**.

## Czego to wymaga

Zgodnie z **prawidłem III/1 STCW** oficer wachtowy w dziale maszynowym musi mieć co najmniej **18 lat**, szkolenie warsztatowe i co najmniej **12 miesięcy** zatwierdzonej praktyki w ramach zatwierdzonego programu szkolenia z książką praktyk — albo co najmniej **36 miesięcy** w inny sposób, w tym co najmniej 30 w dziale maszynowym — w tym co najmniej **sześć miesięcy** wacht w maszynowni pod nadzorem. Trzeci mechanik ma ten sam dyplom co czwarty; różni ich doświadczenie.

## Ścieżka

Czwarty mechanik → **trzeci mechanik** → drugi mechanik. Krok do drugiego mechanika wymaga dyplomu III/2 i co najmniej 12 miesięcy zatwierdzonej praktyki jako mechanik.

## Kontrakty i rotacja

Trzeci mechanicy pływają zwykle **cztery–sześć miesięcy**, czasem dłużej. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**; minimum odpoczynku — **10 godzin na 24** i **77 na siedem dni** — obowiązuje także po nocy alarmów na dyżurze UMS.

## Pytania na rozmowie

1. **„Jak włączyć generator do pracy równoległej?”** Napięcie, częstotliwość, synchronoskop, rozdział obciążenia.
2. **„Na morzu wyłączył się generator — co Pan robi?”** Start rezerwowego, odłączenie odbiorów nieistotnych, szukanie przyczyny.
3. **„Alarm niskiego poziomu wody w kotle — Pana działania?”**
4. **„Wirówka wyrzuca paliwo — co Pan sprawdza?”**
5. **„Co sprawdza Pan podczas obchodu maszynowni?”** Ciśnienia, temperatury, przecieki, zęzy, poziomy.
6. **„Do czego służy odolejacz wód zęzowych i jaki jest limit?”** 15 ppm według Załącznika I MARPOL.

## Częste błędy

- **CV z listą statków, ale bez urządzeń** — na tym stanowisku liczą się marki i modele generatorów.
- **Brak kursu High Voltage**, gdy aplikujesz na statki, które go wymagają.
- **Słabe podstawy elektryki.** Pytania o generatory padają na każdej rozmowie.
- **Kursy wygasające w trakcie kontraktu.**

## Najczęstsze pytania

**Czy trzeci i czwarty mechanik potrzebują różnych dyplomów?**
Nie. Obaj mają dyplom z prawidła III/1 STCW; różnią się doświadczeniem i obowiązkami.

**Czy trzeci mechanik pełni wachtę?**
Przy obsadzanej maszynowni tak, często 00–04; na statkach UMS trzeci mechanik dyżuruje na zmianę.

**Kiedy awans na drugiego mechanika?**
Zwykle po jednym lub dwóch kontraktach, gdy masz już dyplom drugiego mechanika.

**Co znaczy UMS?**
Maszynownia bezwachtowa: w nocy siłownia pracuje bez wachty, a na alarmy odpowiada mechanik dyżurny.

## Wynagrodzenie i oferty

Krok w górę względem czwartego mechanika i kolejny duży — do drugiego. Aktualny przedział z prawdziwych ofert jest na stronie [ofert dla trzecich mechaników](/pl/jobs/rank/3rd-engineer), a porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

W CV trzeciego mechanika agencja patrzy na marki silników i generatorów, moc, typy statków i certyfikaty z datami. [CV marynarza](/pl/maritime-cv) zbiera je na jednej stronie.

*Wymagania według STCW, MARPOL i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Engine', 'guide',
  'linear-gradient(135deg,#0e2a45,#13647a)',
  true, '2026-10-11 09:20:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Third engineer on a ship: duties, watch, requirements and promotion');

-- ── 55. Fourth Engineer ──────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'Fourth engineer on a ship: the first engineer officer''s job and how to get it',
    'ru', 'Четвёртый механик на судне: первая офицерская должность в машине и как её получить',
    'ua', 'Четвертий механік на судні: перша офіцерська посада в машині та як її отримати',
    'pl', 'Czwarty mechanik na statku: pierwsze stanowisko oficerskie w maszynowni i jak je zdobyć'),
  jsonb_build_object(
    'en', $en$The **fourth engineer** — also called junior engineer or assistant engineer — is the first officer's rank an engine cadet reaches: the moment you hold your own watch or duty in the engine room. It is also the rank with the hardest first step, because every company wants an engineer with experience and nobody has it at the start. This guide covers the duties, a typical day, the certificate, the courses, the interview and how to get the first contract.

## What the fourth engineer does

- **Watchkeeping or duty.** On manned engine rooms the fourth engineer often keeps the **08:00–12:00 and 20:00–24:00** watch; on UMS ships engineers work by day and the fourth engineer joins the duty rotation once the chief engineer is satisfied.
- **Own machinery.** Usually a set of auxiliary machines: purifiers, pumps, air compressors, the sewage plant, the fresh water generator, the oily water separator, the incinerator — it depends on the company.
- **Maintenance.** Work on the main engine and generators together with the second and third engineers; the big overhauls are where a fourth engineer learns the most.
- **Records.** Soundings, running hours, the planned maintenance entries for own machinery.
- **Helping with bunkering and transfers**, and with spare parts and stores.
- **Safety.** Engine-room fire-fighting equipment, rounds, and the engine team's roles in drills.

## A typical day

- **Manned engine room:** 08:00–12:00 and 20:00–24:00 on watch, with maintenance on own machinery outside the watch.
- **UMS ship:** 08:00–17:00 day work with the second engineer and the crew — often the dirtiest jobs of the day — and, on duty days, the evening round and alarms through the night.

The first weeks are about learning the plant: every pipe, valve and alarm, where the emergency stops are, and how this engine room behaves.

## Certificates and documents

- **Certificate of competency, officer in charge of an engineering watch** (STCW III/1, 750 kW or more) — revalidated every **five years**.
- **Medical certificate** — valid for at most **two years**.
- **Basic Training** (refreshed every five years), **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**, **Security Awareness / Designated Security Duties**.
- **ERM**; **High Voltage** where the ship has it; for tankers and gas carriers the basic cargo courses.
- **Flag endorsement** (STCW I/10) if the ship's flag did not issue your certificate.

## What it takes

Under **STCW Regulation III/1**, you must be at least **18** and have combined workshop skill training and at least **12 months** of approved sea service as part of an approved training programme with a training record book — or at least **36 months** otherwise, of which at least 30 in the engine department — including at least **six months** of engine-room watchkeeping under supervision. Then come the exams of your maritime administration.

## The first contract

1. **Stay with the company you were a cadet with.** It is the most common way in — they know your work and your training record.
2. **Accept the plant that is hiring.** Bulk carriers and general cargo take juniors more often than tankers and gas carriers.
3. **Show your cadet time in detail**: vessel types, engine makes, the overhauls you took part in, the machinery you looked after.
4. **Keep every course valid** before you apply — a missing course is the most common reason for a fast "no".
5. **Consider "junior engineer" or "assistant engineer" roles** — they count as engine-room experience.

## Contracts and rotation

Junior engineers usually sail **four to six months**, sometimes longer. MLC 2006 limits time on board before repatriation to **less than 12 months**, and the minimum rest — **10 hours in 24** and **77 in seven days** — applies from your first day as an officer.

## Interview questions for a fourth engineer

1. **"How does a purifier work, and what does the gravity disc do?"**
2. **"What do you check on an engine-room round?"** Pressures, temperatures, leaks, bilges, levels.
3. **"What is the limit for the oily water separator?"** 15 ppm under MARPOL Annex I.
4. **"How do you start an air compressor and what protects it?"**
5. **"What do you do when the fire alarm sounds in the engine room?"** Your muster duties, the emergency stops, the fixed system.
6. **"What did you do as a cadet?"** Specific machinery and specific jobs.

## Common mistakes

- **Waiting for the perfect first ship.** The first contract is about the experience, not the vessel type.
- **A CV that hides the cadet sea time** or lists it without machinery.
- **Courses that expire mid-contract.**
- **Paying for a placement.** An honest agency is paid by the shipowner.

## FAQ

**Is the fourth engineer an officer?**
Yes — the fourth engineer holds the STCW III/1 certificate and is the junior engineer officer.

**What is the difference between fourth engineer and third engineer?**
The same certificate; the third has more experience and usually looks after the generators.

**How long until promotion to third engineer?**
Usually after one or two contracts as fourth engineer.

**Can I become an engineer without a maritime academy?**
STCW allows the III/1 certificate after 36 months of service without an approved programme — a longer route, through the engine ratings.

## Pay and jobs

Fourth engineer is the entry level for engine officers; the step to third engineer usually comes after one or two contracts. Look at the [third engineer jobs](/jobs/rank/3rd-engineer) to see where the path leads, and at [engine cadet jobs](/jobs/rank/engine-cadet) if you are still before the certificate. Compare ranks on our [salaries page](/salaries).

## Your CV

For a junior engineer, the [maritime CV](/maritime-cv) matters more than for anyone: it shows the cadet sea service, the machinery and the courses with their dates on one page.

*Requirements follow STCW, MARPOL and MLC 2006; your flag state may add its own. Check them with your maritime administration.*$en$,
    'ru', $ru$**Четвёртый механик** — его ещё называют младшим механиком или junior/assistant engineer — первая офицерская должность, до которой доходит машинный кадет: момент, когда у вас своя вахта или дежурство в машине. И должность с самым трудным первым шагом: каждой компании нужен механик с опытом, а в начале его нет ни у кого. В гайде — обязанности, типичный день, диплом, курсы, собеседование и как получить первый контракт.

## Чем занимается четвёртый механик

- **Вахта или дежурство.** При вахтенном обслуживании четвёртый механик часто стоит вахту **с 08:00 до 12:00 и с 20:00 до 24:00**; на UMS-судах механики работают днём, а четвёртый включается в график дежурств, когда стармех в нём уверен.
- **Свои механизмы.** Обычно часть вспомогательных механизмов: сепараторы, насосы, воздушные компрессоры, установка очистки сточных вод, опреснитель, сепаратор льяльных вод, инсинератор — зависит от компании.
- **Обслуживание.** Работы на главном двигателе и генераторах вместе со вторым и третьим механиками; на больших переборках четвёртый механик учится больше всего.
- **Записи.** Замеры, моточасы, записи планового обслуживания по своим механизмам.
- **Помощь при бункеровке и перекачках**, с запчастями и снабжением.
- **Безопасность.** Противопожарное оборудование машинного отделения, обходы, роли машинной команды на учениях.

## Типичный день

- **Вахтенное машинное отделение:** с 08:00 до 12:00 и с 20:00 до 24:00 на вахте, обслуживание своих механизмов вне вахты.
- **UMS-судно:** с 08:00 до 17:00 дневные работы со вторым механиком и командой — часто самые грязные работы дня, — а в дни дежурства вечерний обход и тревоги ночью.

Первые недели уходят на изучение установки: каждой трубы, клапана и тревоги, где аварийные остановки и как ведёт себя именно это машинное отделение.

## Дипломы и документы

- **Диплом вахтенного механика** (ПДНВ III/1, 750 кВт и более) — подтверждается каждые **пять лет**.
- **Медицинское свидетельство** — не более **двух лет**.
- **Basic Training** (переподготовка каждые пять лет), **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**, **Security Awareness / Designated Security Duties**.
- **ERM**; **High Voltage**, если на судне есть высокое напряжение; для танкеров и газовозов — начальные грузовые курсы.
- **Подтверждение флага** (ПДНВ I/10), если ваш диплом выдан не государством флага судна.

## Что для этого нужно

По **правилу III/1 ПДНВ (STCW)** нужно быть не младше **18 лет** и иметь подготовку в мастерских и не менее **12 месяцев** одобренного стажа в рамках одобренной программы подготовки с книжкой регистрации — или не менее **36 месяцев** иначе, из них не менее 30 в машинной службе, — включая не менее **шести месяцев** вахты в машинном отделении под наблюдением. Затем — экзамены морской администрации.

## Первый контракт

1. **Оставайтесь в компании, где были кадетом.** Это самый частый путь: там знают вашу работу и книжку подготовки.
2. **Соглашайтесь на ту установку, где берут.** Балкеры и генгруз берут младших чаще, чем танкеры и газовозы.
3. **Подробно покажите кадетский стаж**: типы судов, марки двигателей, переборки, в которых участвовали, механизмы, за которые отвечали.
4. **Держите все курсы действующими** до подачи — недостающий курс самая частая причина быстрого «нет».
5. **Рассмотрите должности «junior engineer» или «assistant engineer»** — они засчитываются как опыт в машине.

## Контракты и ротация

Младшие механики обычно работают **четыре–шесть месяцев**, иногда дольше. MLC 2006 ограничивает время на борту до репатриации **сроком меньше 12 месяцев**, а минимум отдыха — **10 часов за 24** и **77 за семь дней** — действует с первого дня в офицерской должности.

## Вопросы на собеседовании

1. **«Как работает сепаратор и для чего регулировочная шайба?»**
2. **«Что вы проверяете при обходе машинного отделения?»** Давления, температуры, протечки, льяла, уровни.
3. **«Какой предел для сепаратора льяльных вод?»** 15 ppm по Приложению I MARPOL.
4. **«Как запустить воздушный компрессор и что его защищает?»**
5. **«Что вы делаете по пожарной тревоге в машинном отделении?»** Ваши обязанности по расписанию, аварийные остановки, стационарная система.
6. **«Что вы делали кадетом?»** Конкретные механизмы и конкретные работы.

## Частые ошибки

- **Ждать идеальное первое судно.** Первый контракт — ради опыта, а не ради типа судна.
- **CV, в котором кадетский стаж спрятан** или указан без механизмов.
- **Курсы, истекающие посреди контракта.**
- **Платить за трудоустройство.** Честному агентству платит судовладелец.

## Частые вопросы

**Четвёртый механик — офицер?**
Да: у четвёртого механика диплом по правилу III/1 ПДНВ, это младший механик-офицер.

**Чем четвёртый механик отличается от третьего?**
Диплом тот же; у третьего больше опыта, и он обычно отвечает за генераторы.

**Когда повышение до третьего механика?**
Обычно после одного-двух контрактов четвёртым механиком.

**Можно ли стать механиком без морской академии?**
ПДНВ допускает диплом III/1 после 36 месяцев стажа без одобренной программы — более долгий путь через машинный рядовой состав.

## Зарплата и вакансии

Четвёртый механик — начальный уровень для механиков-офицеров; шаг к третьему механику обычно приходит после одного-двух контрактов. Посмотрите [вакансии третьего механика](/ru/jobs/rank/3rd-engineer), чтобы увидеть, куда ведёт путь, и [вакансии машинного кадета](/ru/jobs/rank/engine-cadet), если вы ещё до диплома. Сравнение должностей — на странице [зарплат](/ru/salaries).

## Ваше CV

Для младшего механика [CV моряка](/ru/maritime-cv) важнее, чем для кого-либо: оно показывает кадетский стаж, механизмы и курсы со сроками на одной странице.

*Требования — по ПДНВ (STCW), MARPOL и MLC 2006; государство флага может добавлять свои. Уточняйте в морской администрации.*$ru$,
    'ua', $ua$**Четвертий механік** — його ще називають молодшим механіком або junior/assistant engineer — перша офіцерська посада, до якої доходить машинний кадет: момент, коли у вас своя вахта чи чергування в машині. І посада з найважчим першим кроком: кожній компанії потрібен механік із досвідом, а на початку його немає ні в кого. У гайді — обов'язки, типовий день, диплом, курси, співбесіда і як отримати перший контракт.

## Чим займається четвертий механік

- **Вахта чи чергування.** За вахтового обслуговування четвертий механік часто несе вахту **з 08:00 до 12:00 і з 20:00 до 24:00**; на UMS-суднах механіки працюють удень, а четвертий входить у графік чергувань, коли стармех у ньому впевнений.
- **Свої механізми.** Зазвичай частина допоміжних механізмів: сепаратори, насоси, повітряні компресори, установка очищення стічних вод, опріснювач, сепаратор лляльних вод, інсинератор — залежить від компанії.
- **Обслуговування.** Роботи на головному двигуні й генераторах разом із другим і третім механіками; на великих перебираннях четвертий механік навчається найбільше.
- **Записи.** Заміри, мотогодини, записи планового обслуговування своїх механізмів.
- **Допомога під час бункерування й перекачувань**, із запчастинами й постачанням.
- **Безпека.** Протипожежне обладнання машинного відділення, обходи, ролі машинної команди на навчаннях.

## Типовий день

- **Вахтове машинне відділення:** з 08:00 до 12:00 і з 20:00 до 24:00 на вахті, обслуговування своїх механізмів поза вахтою.
- **UMS-судно:** з 08:00 до 17:00 денні роботи з другим механіком і командою — часто найбрудніші роботи дня, — а в дні чергування вечірній обхід і тривоги вночі.

Перші тижні йдуть на вивчення установки: кожної труби, клапана й тривоги, де аварійні зупинки і як поводиться саме це машинне відділення.

## Дипломи й документи

- **Диплом вахтового механіка** (ПДНВ III/1, 750 кВт і більше) — підтверджується кожні **п'ять років**.
- **Медичне свідоцтво** — не більше **двох років**.
- **Basic Training** (перепідготовка кожні п'ять років), **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**, **Security Awareness / Designated Security Duties**.
- **ERM**; **High Voltage**, якщо на судні є висока напруга; для танкерів і газовозів — початкові вантажні курси.
- **Підтвердження прапора** (ПДНВ I/10), якщо ваш диплом видала не держава прапора судна.

## Що для цього потрібно

За **правилом III/1 ПДНВ (STCW)** потрібно бути не молодшим **18 років** і мати підготовку в майстернях і щонайменше **12 місяців** схваленого стажу в межах схваленої програми підготовки з книжкою реєстрації — або щонайменше **36 місяців** інакше, з них щонайменше 30 у машинній службі, — зокрема щонайменше **шість місяців** вахти в машинному відділенні під наглядом. Потім — іспити морської адміністрації.

## Перший контракт

1. **Залишайтеся в компанії, де були кадетом.** Це найчастіший шлях: там знають вашу роботу й книжку підготовки.
2. **Погоджуйтеся на ту установку, де беруть.** Балкери й генвантаж беруть молодших частіше, ніж танкери й газовози.
3. **Детально покажіть кадетський стаж**: типи суден, марки двигунів, перебирання, у яких брали участь, механізми, за які відповідали.
4. **Тримайте всі курси чинними** до подання — відсутній курс найчастіша причина швидкого «ні».
5. **Розгляньте посади «junior engineer» або «assistant engineer»** — вони зараховуються як досвід у машині.

## Контракти й ротація

Молодші механіки зазвичай працюють **чотири–шість місяців**, іноді довше. MLC 2006 обмежує час на борту до репатріації **строком менше 12 місяців**, а мінімум відпочинку — **10 годин за 24** і **77 за сім днів** — діє з першого дня на офіцерській посаді.

## Питання на співбесіді

1. **«Як працює сепаратор і для чого регулювальна шайба?»**
2. **«Що ви перевіряєте під час обходу машинного відділення?»** Тиски, температури, протікання, льяла, рівні.
3. **«Яка межа для сепаратора лляльних вод?»** 15 ppm за Додатком I MARPOL.
4. **«Як запустити повітряний компресор і що його захищає?»**
5. **«Що ви робите за пожежною тривогою в машинному відділенні?»** Ваші обов'язки за розкладом, аварійні зупинки, стаціонарна система.
6. **«Що ви робили кадетом?»** Конкретні механізми й конкретні роботи.

## Часті помилки

- **Чекати ідеальне перше судно.** Перший контракт — заради досвіду, а не заради типу судна.
- **CV, у якому кадетський стаж сховано** або вказано без механізмів.
- **Курси, що спливають посеред контракту.**
- **Платити за працевлаштування.** Чесному агентству платить судновласник.

## Часті питання

**Четвертий механік — офіцер?**
Так: у четвертого механіка диплом за правилом III/1 ПДНВ, це молодший механік-офіцер.

**Чим четвертий механік відрізняється від третього?**
Диплом той самий; у третього більше досвіду, і він зазвичай відповідає за генератори.

**Коли підвищення до третього механіка?**
Зазвичай після одного-двох контрактів четвертим механіком.

**Чи можна стати механіком без морської академії?**
ПДНВ допускає диплом III/1 після 36 місяців стажу без схваленої програми — довший шлях через машинний рядовий склад.

## Зарплата й вакансії

Четвертий механік — початковий рівень для механіків-офіцерів; крок до третього механіка зазвичай приходить після одного-двох контрактів. Перегляньте [вакансії третього механіка](/ua/jobs/rank/3rd-engineer), щоб побачити, куди веде шлях, і [вакансії машинного кадета](/ua/jobs/rank/engine-cadet), якщо ви ще до диплома. Порівняння посад — на сторінці [зарплат](/ua/salaries).

## Ваше CV

Для молодшого механіка [CV моряка](/ua/maritime-cv) важливіше, ніж для будь-кого: воно показує кадетський стаж, механізми й курси зі строками на одній сторінці.

*Вимоги — за ПДНВ (STCW), MARPOL і MLC 2006; держава прапора може додавати свої. Уточнюйте в морській адміністрації.*$ua$,
    'pl', $pl$**Czwarty mechanik** — nazywany też młodszym mechanikiem albo junior/assistant engineer — to pierwsze stanowisko oficerskie, do którego dochodzi kadet mechanik: moment, gdy masz własną wachtę lub dyżur w maszynowni. I stanowisko z najtrudniejszym pierwszym krokiem: każda firma chce mechanika z doświadczeniem, a na początku nikt go nie ma. W poradniku: obowiązki, typowy dzień, dyplom, kursy, rozmowa i jak zdobyć pierwszy kontrakt.

## Czym zajmuje się czwarty mechanik

- **Wachta lub dyżur.** Przy obsadzanej maszynowni czwarty mechanik często pełni wachtę **08:00–12:00 i 20:00–24:00**; na statkach UMS mechanicy pracują w dzień, a czwarty wchodzi do grafiku dyżurów, gdy starszy mechanik jest go pewien.
- **Własne urządzenia.** Zwykle część urządzeń pomocniczych: wirówki, pompy, sprężarki powietrza, oczyszczalnia ścieków, wytwornica wody słodkiej, odolejacz wód zęzowych, spalarka — zależy od firmy.
- **Konserwacja.** Prace przy silniku głównym i generatorach razem z drugim i trzecim mechanikiem; przy dużych remontach czwarty mechanik uczy się najwięcej.
- **Zapisy.** Sondowania, motogodziny, wpisy planowej konserwacji dla swoich urządzeń.
- **Pomoc przy bunkrowaniu i przepompowaniach**, częściach i zaopatrzeniu.
- **Bezpieczeństwo.** Sprzęt przeciwpożarowy w maszynowni, obchody, role zespołu maszynowego w ćwiczeniach.

## Typowy dzień

- **Maszynownia obsadzana:** 08:00–12:00 i 20:00–24:00 na wachcie, konserwacja swoich urządzeń poza wachtą.
- **Statek UMS:** 08:00–17:00 prace dzienne z drugim mechanikiem i załogą — często najbrudniejsze prace dnia — a w dni dyżuru wieczorny obchód i alarmy w nocy.

Pierwsze tygodnie to nauka siłowni: każdej rury, zaworu i alarmu, gdzie są wyłączniki awaryjne i jak zachowuje się właśnie ta maszynownia.

## Dyplomy i dokumenty

- **Dyplom oficera wachtowego w dziale maszynowym** (STCW III/1, 750 kW i więcej) — odnawiany co **pięć lat**.
- **Świadectwo zdrowia** — ważne najwyżej **dwa lata**.
- **Basic Training** (odnawiany co pięć lat), **Advanced Fire Fighting**, **Medical First Aid**, **PSCRB**, **Security Awareness / Designated Security Duties**.
- **ERM**; **High Voltage**, jeśli statek ma wysokie napięcie; na tankowce i gazowce — podstawowe kursy ładunkowe.
- **Potwierdzenie bandery** (STCW I/10), jeśli Twój dyplom nie został wydany przez państwo bandery statku.

## Czego to wymaga

Zgodnie z **prawidłem III/1 STCW** trzeba mieć co najmniej **18 lat**, szkolenie warsztatowe i co najmniej **12 miesięcy** zatwierdzonej praktyki w ramach zatwierdzonego programu szkolenia z książką praktyk — albo co najmniej **36 miesięcy** w inny sposób, w tym co najmniej 30 w dziale maszynowym — w tym co najmniej **sześć miesięcy** wacht w maszynowni pod nadzorem. Potem egzaminy administracji morskiej.

## Pierwszy kontrakt

1. **Zostań w firmie, w której byłeś kadetem.** To najczęstsza droga: znają tam Twoją pracę i książkę praktyk.
2. **Przyjmij siłownię, na którą biorą.** Masowce i drobnicowce przyjmują młodszych częściej niż tankowce i gazowce.
3. **Pokaż szczegółowo praktykę kadecką**: typy statków, marki silników, remonty, w których brałeś udział, urządzenia, za które odpowiadałeś.
4. **Pilnuj ważności wszystkich kursów** przed aplikowaniem — brakujący kurs to najczęstszy powód szybkiego „nie”.
5. **Rozważ stanowiska „junior engineer” lub „assistant engineer”** — liczą się jako doświadczenie w maszynowni.

## Kontrakty i rotacja

Młodsi mechanicy pływają zwykle **cztery–sześć miesięcy**, czasem dłużej. MLC 2006 ogranicza czas na burcie przed repatriacją do **mniej niż 12 miesięcy**, a minimum odpoczynku — **10 godzin na 24** i **77 na siedem dni** — obowiązuje od pierwszego dnia na stanowisku oficerskim.

## Pytania na rozmowie

1. **„Jak działa wirówka i do czego służy tarcza regulacyjna?”**
2. **„Co sprawdza Pan podczas obchodu maszynowni?”** Ciśnienia, temperatury, przecieki, zęzy, poziomy.
3. **„Jaki jest limit dla odolejacza wód zęzowych?”** 15 ppm według Załącznika I MARPOL.
4. **„Jak uruchomić sprężarkę powietrza i co ją zabezpiecza?”**
5. **„Co Pan robi na alarm pożarowy w maszynowni?”** Obowiązki według rozkładu alarmowego, wyłączniki awaryjne, instalacja stała.
6. **„Co robił Pan jako kadet?”** Konkretne urządzenia i konkretne prace.

## Częste błędy

- **Czekanie na idealny pierwszy statek.** Pierwszy kontrakt jest po to, by zdobyć doświadczenie, a nie typ statku.
- **CV, w którym praktyka kadecka jest ukryta** albo podana bez urządzeń.
- **Kursy wygasające w trakcie kontraktu.**
- **Płacenie za zatrudnienie.** Uczciwej agencji płaci armator.

## Najczęstsze pytania

**Czy czwarty mechanik jest oficerem?**
Tak: czwarty mechanik ma dyplom z prawidła III/1 STCW i jest młodszym oficerem mechanikiem.

**Czym różni się czwarty mechanik od trzeciego?**
Dyplom jest ten sam; trzeci ma więcej doświadczenia i zwykle odpowiada za generatory.

**Kiedy awans na trzeciego mechanika?**
Zwykle po jednym lub dwóch kontraktach jako czwarty mechanik.

**Czy można zostać mechanikiem bez akademii morskiej?**
STCW dopuszcza dyplom III/1 po 36 miesiącach praktyki bez zatwierdzonego programu — dłuższa droga przez załogę maszynową.

## Wynagrodzenie i oferty

Czwarty mechanik to poziom wejściowy dla oficerów mechaników; awans na trzeciego przychodzi zwykle po jednym lub dwóch kontraktach. Zobacz [oferty dla trzecich mechaników](/pl/jobs/rank/3rd-engineer), żeby zobaczyć, dokąd prowadzi ścieżka, i [oferty dla kadetów mechaników](/pl/jobs/rank/engine-cadet), jeśli jesteś jeszcze przed dyplomem. Porównanie stanowisk — na stronie [wynagrodzeń](/pl/salaries).

## Twoje CV

Dla młodszego mechanika [CV marynarza](/pl/maritime-cv) ma większe znaczenie niż dla kogokolwiek: pokazuje praktykę kadecką, urządzenia i kursy z datami na jednej stronie.

*Wymagania według STCW, MARPOL i MLC 2006; państwo bandery może dodawać własne. Sprawdź je w administracji morskiej.*$pl$),
  'Engine', 'guide',
  'linear-gradient(135deg,#0e2a45,#1d6fa5)',
  true, '2026-10-11 09:30:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'Fourth engineer on a ship: the first engineer officer''s job and how to get it');

-- ── Covers ───────────────────────────────────────────────────────────────────
UPDATE news_articles SET cover_url = v.url FROM (VALUES
 ('Chief engineer on a ship: duties, requirements and how to become one', 'https://seajobs.pro/guides/chief-engineer.png?v=1'),
 ('Second engineer on a ship: duties, requirements and the step to chief', 'https://seajobs.pro/guides/second-engineer.png?v=1'),
 ('Third engineer on a ship: duties, watch, requirements and promotion', 'https://seajobs.pro/guides/third-engineer.png?v=1'),
 ('Fourth engineer on a ship: the first engineer officer''s job and how to get it', 'https://seajobs.pro/guides/fourth-engineer.png?v=1')
) AS v(t, url)
WHERE news_articles.title->>'en' = v.t AND coalesce(news_articles.cover_url, '') = '';
