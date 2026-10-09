-- The seafarer's handbook, part 4 (category = 'handbook'): the ISM Code and
-- the ISPS Code, in the same format as parts 1–3. ISM links to the SOLAS
-- article (chapter IX); ISPS to the SOLAS (chapter XI-2) and STCW (VI/5,
-- VI/6) articles, at their canonical per-language URLs.
--
-- Facts, ISM Code (adopted 1993, mandatory under SOLAS IX from 1 July 1998
-- for passenger ships, tankers, gas carriers, bulk carriers and HSC cargo
-- craft of 500 GT+, from 1 July 2002 for other cargo ships and MODUs of
-- 500 GT+; Herald of Free Enterprise 1987, Scandinavian Star 1990): the
-- objectives of 1.2, the sixteen sections, the DPA (4), the master's
-- overriding authority (5.2), familiarisation (6), critical equipment (10.3),
-- internal audits at most every 12 months (12.1), DOC and SMC up to 5 years,
-- DOC annual verification within 3 months of the anniversary, SMC
-- intermediate verification, interim DOC 12 months / SMC 6 months,
-- definitions of observation, non-conformity and major non-conformity (1.1).
-- ISPS Code (SOLAS XI-2, adopted Dec 2002, in force 1 July 2004; Part A
-- mandatory, Part B guidance; passenger ships, cargo ships of 500 GT+ and
-- MODUs on international voyages, port facilities): three security levels,
-- the port's higher level applies to the ship, CSO / SSO / PFSO, SSA, SSP
-- with confidential parts, ISSC 5 years (interim 6 months), declaration of
-- security, SSAS (XI-2/6: covert, bridge plus one more point, no alarm on
-- board), drills every 3 months and within a week after a 25% crew change,
-- exercises yearly with at most 18 months between, records, STCW VI/5 and
-- VI/6; XI-1 IMO number and Continuous Synopsis Record.
--
-- en + ru + ua + pl. Covers are set at the end — run after the deploy that
-- adds public/handbook/{ism,isps}.png.
-- Idempotent — guarded by the English title.

-- ── H1. ISM ───────────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'ISM Code in plain words: the safety management system, the DPA, non-conformities and interview questions',
    'ru', 'Кодекс ISM (МКУБ) простыми словами: СУБ, назначенное лицо, несоответствия и вопросы на собеседовании',
    'ua', 'Кодекс ISM (МКУБ) простими словами: СУБ, призначена особа, невідповідності та питання на співбесіді',
    'pl', 'Kodeks ISM w prostych słowach: system zarządzania bezpieczeństwem, osoba wyznaczona, niezgodności i pytania na rozmowie'),
  jsonb_build_object(
    'en', $en$The ISM Code is the reason every ship has a thick safety management manual, a checklist for almost every job, and a person ashore called the DPA whom anyone on board may call. It turns safety from a matter of luck and individual habits into a system that the company writes down, the crew follows and auditors check. Senior officers are asked about it at almost every interview, and ratings meet it daily in permits to work, toolbox talks and near-miss reports. This page sets out what the Code requires, the numbers and terms that come up most, what a non-conformity is, the mistakes that turn a small finding into a detention, and questions to test yourself.

:: **In short**
:: - The ISM Code is the International Management Code for the Safe Operation of Ships and for Pollution Prevention, mandatory under SOLAS chapter IX since 1998.
:: - The company writes a safety management system; the ship carries a Safety Management Certificate, the company a Document of Compliance — both valid for up to five years.
:: - The DPA is the person ashore with direct access to top management whom anyone on board can contact.
:: - The master has the overriding authority to take any decision for safety and pollution prevention.

## What the ISM Code is and where it came from

In the late 1980s a series of disasters showed that ships were sinking not for lack of rules, but for lack of management. The ferry Herald of Free Enterprise capsized in 1987 after leaving port with her bow doors open; the investigation found no clear system, ashore or on board, for making sure they were shut. The fire on the Scandinavian Star in 1990 showed the same gaps in training and organisation.

IMO adopted the ISM Code in 1993 and made it mandatory through SOLAS chapter IX: from 1 July 1998 for passenger ships, tankers, gas carriers, bulk carriers and high-speed cargo craft of 500 GT and above, and from 1 July 2002 for all other cargo ships and mobile offshore drilling units of 500 GT and above. The Code is short — sixteen sections — because it does not tell a company what to do on board. It tells the company to decide, write it down, train people, check that it works, and improve it.

## The objectives

The Code wants every company to:

- provide safe practices in ship operation and a safe working environment;
- assess all identified risks to its ships, personnel and the environment and establish appropriate safeguards;
- continuously improve the safety management skills of personnel ashore and on board, including preparing for emergencies.

## The sixteen sections

1. **General:** definitions and objectives.
2. **Safety and environmental protection policy.**
3. **Company responsibilities and authority:** who in the company answers for the ship.
4. **Designated person(s) ashore** — the DPA.
5. **Master's responsibility and authority.**
6. **Resources and personnel:** qualified crew, familiarisation, training, a working language.
7. **Shipboard operations:** procedures, plans and instructions for key operations.
8. **Emergency preparedness:** procedures, drills and exercises.
9. **Reports and analysis of non-conformities, accidents and hazardous occurrences** — near misses included.
10. **Maintenance of the ship and equipment:** planned maintenance, critical equipment.
11. **Documentation:** control of manuals and forms.
12. **Company verification, review and evaluation:** internal audits.
13. **Certification and periodical verification.**
14. **Interim certification.**
15. **Verification.**
16. **Forms of certificates.**

## Key numbers

!! 1998 / 2002 | mandatory: tankers, bulkers, passenger ships first, then all others of 500 GT and above
!! 5 years | validity of the DOC and the SMC
!! 12 months | longest interval between internal audits on board and ashore
!! 3 months | window either side of the anniversary for the annual DOC verification
!! 6 months | validity of an interim SMC (12 months for an interim DOC)
!! 16 | sections of the Code

## The DPA and the master

**The designated person ashore (section 4)** is the link between the company and the people on board. The DPA has direct access to the highest level of management and monitors the safety and pollution-prevention side of every ship. Anyone on board — not only the master — may contact the DPA, and the contact details are posted on the ship. If you see something dangerous that nobody on board will deal with, the DPA is the person to call.

**The master (section 5)** implements the company's policy on board, motivates the crew, issues orders and instructions, checks that the requirements are observed, and reviews the system and reports its deficiencies to the company. Above all, the system must state clearly that the master has the **overriding authority** and responsibility to make decisions with respect to safety and pollution prevention, and to request the company's assistance when needed. No charterer, no schedule and no office instruction outranks that.

## Certificates and audits

- **Document of Compliance (DOC)** — issued to the company for the ship types it operates; valid for up to five years and verified every year, within three months either side of its anniversary. A copy is kept on board.
- **Safety Management Certificate (SMC)** — issued to the ship; valid for up to five years, with an intermediate verification between the second and third anniversaries.
- **Interim certificates** — an interim DOC for up to 12 months for a new company or a new ship type; an interim SMC for up to 6 months for a new ship or a ship that has changed hands.
- **Internal audits** — on board and ashore, at intervals of no more than 12 months, by people independent of the area they audit.

## Non-conformities and observations

These are the terms auditors use, and senior officers are expected to know them exactly:

- **Observation** — a statement of fact made during an audit and backed by objective evidence. Not a failure in itself, but a warning.
- **Non-conformity** — a situation where objective evidence shows that a specified requirement is not fulfilled: a procedure not followed, a record missing, a drill not held.
- **Major non-conformity** — an identifiable deviation that poses a serious threat to the safety of personnel or the ship or a serious risk to the environment and needs immediate corrective action, or the lack of effective and systematic implementation of a requirement of the Code. A major non-conformity can stop a certificate from being issued or keep a ship in port.

For each finding the ship and the company agree a corrective action and a date, and the next audit checks that it worked. The same logic runs on board every day: near misses and hazardous occurrences are reported and analysed, because yesterday's near miss is tomorrow's accident.

## What the system looks like on board

- the safety management manual in the working language, with procedures for every key operation — mooring, bunkering, cargo, entry into enclosed spaces, hot work, working aloft and overside;
- **risk assessments** and **permits to work** for hazardous jobs, and **toolbox talks** before them;
- **familiarisation** for every new crew member before taking up duties, and for anyone moved to a new safety-related job;
- **planned maintenance**, with the critical equipment — the equipment whose sudden failure could cause a hazardous situation — identified and tested regularly, standby systems included;
- emergency procedures and a drill programme;
- near-miss and accident reports, safety committee meetings, the master's review of the system.

## What they ask at the interview

- **Masters and chief officers:** what the DPA is and when you would call them; the master's overriding authority — give an example; the difference between an observation, a non-conformity and a major non-conformity; DOC and SMC validity and verifications; how often internal audits are held; what you do with a non-conformity found by port state control; how you run a master's review.
- **Chief and second engineers:** critical equipment and how the planned maintenance system treats it; testing standby equipment; permits to work for hot work and for isolating machinery.
- **Junior officers and ratings:** the permit-to-work system; a toolbox talk; how to report a near miss and why; familiarisation after joining; your right to stop a job you believe is unsafe — most companies write that right into their system.

## Common mistakes

1. Treating the system as paperwork: checklists ticked after the job instead of before it. An auditor compares the times in the records with the log book.
2. Not reporting near misses for fear of blame. The Code exists so that lessons are learned before someone is hurt; a ship with no near-miss reports looks like a ship that hides them.
3. Starting hot work, enclosed space entry or work aloft without the permit and the toolbox talk because "it is a five-minute job".
4. Not knowing the DPA's number, or believing only the master may call.
5. Carrying out a corrective action on paper only. The next audit checks whether the problem is actually gone.
6. Following a company or charterer instruction that endangers the ship. The master's overriding authority is there to be used.

## Test yourself

?? What is the DPA and who may contact them?
=> The designated person ashore: the link between ship and company, with direct access to the highest level of management. Anyone on board may contact the DPA.
?? What is the difference between a non-conformity and a major non-conformity?
=> A non-conformity is a requirement not fulfilled, shown by objective evidence. A major one poses a serious threat to people, the ship or the environment and needs immediate action, or shows the system is not implemented effectively and systematically.
?? How long are the DOC and the SMC valid?
=> Up to five years. The DOC is verified every year; the SMC has an intermediate verification between the second and third anniversaries.
?? How often must internal audits be carried out?
=> At intervals of no more than 12 months, on board and ashore.
?? Who has the final say on board on safety and pollution prevention?
=> The master, under the overriding authority the safety management system must give them.
?? What is critical equipment under section 10?
=> Equipment and systems whose sudden failure may cause a hazardous situation. The company identifies them and tests them, standby arrangements included, regularly.

## Who on board needs this

Most of all the people who run the system: the [master](/jobs/rank/master), the [chief officer](/jobs/rank/chief-officer) and the [chief engineer](/jobs/rank/chief-engineer), who are asked about ISM at every interview for a senior post. The [second engineer](/jobs/rank/2nd-engineer) answers for planned maintenance; every [able seaman](/jobs/rank/able-seaman) and [bosun](/jobs/rank/bosun) works under its permits every day. The legal frame is SOLAS chapter IX — see [SOLAS in plain words](/handbook/solas-in-plain-words-drills-life-saving-appliances-and-interview-questions-2cbdb6d6-b0fa-498a-9c32-68bd9b95e096).

Write the ship types and the companies you sailed with into your [maritime CV](/maritime-cv): a crewing manager judges how well you know a safety management system by where you have worked.

*Source: the International Safety Management (ISM) Code, as amended, and SOLAS chapter IX. Each company's own safety management system adds the detail; on board, it is that system that applies. This page is a study aid, not a legal text.*$en$,
    'ru', $ru$Кодекс ISM (МКУБ) — причина, по которой на каждом судне есть толстое руководство по управлению безопасностью, чек-лист почти на любую работу и человек на берегу — назначенное лицо (DPA), которому может позвонить любой на борту. Он превращает безопасность из дела везения и личных привычек в систему, которую компания записывает, экипаж выполняет, а аудиторы проверяют. Старший комсостав спрашивают о нём почти на каждом собеседовании, а рядовой состав сталкивается с ним каждый день — в нарядах-допусках, инструктажах перед работой и отчётах о потенциально опасных ситуациях. Здесь — что требует кодекс, цифры и термины, о которых спрашивают чаще всего, что такое несоответствие, ошибки, из-за которых мелкое замечание превращается в задержание судна, и вопросы для самопроверки.

:: **Коротко**
:: - Кодекс ISM — Международный кодекс по управлению безопасной эксплуатацией судов и предотвращением загрязнения, обязателен по главе IX SOLAS с 1998 года.
:: - Компания пишет систему управления безопасностью (СУБ); у судна есть Свидетельство об управлении безопасностью, у компании — Документ о соответствии, оба до пяти лет.
:: - Назначенное лицо (DPA) — человек на берегу с прямым выходом на высшее руководство, к которому может обратиться любой на борту.
:: - У капитана — преимущественное право принимать любые решения ради безопасности и предотвращения загрязнения.

## Что такое Кодекс ISM и откуда он взялся

В конце 1980-х серия катастроф показала, что суда гибнут не из-за нехватки правил, а из-за отсутствия управления. Паром Herald of Free Enterprise опрокинулся в 1987 году, выйдя из порта с открытыми носовыми воротами; расследование не нашло ни на берегу, ни на борту чёткой системы, которая гарантировала бы, что ворота закрыты. Пожар на пароме Scandinavian Star в 1990 году показал те же провалы в подготовке и организации.

ИМО приняла Кодекс ISM в 1993 году и сделала его обязательным через главу IX SOLAS: с 1 июля 1998 года — для пассажирских судов, танкеров, газовозов, навалочных судов и высокоскоростных грузовых судов от 500 GT, с 1 июля 2002 года — для всех остальных грузовых судов и плавучих буровых установок от 500 GT. Кодекс короткий — шестнадцать разделов, — потому что он не говорит компании, что делать на борту. Он говорит компании решить, записать, обучить людей, проверить, что это работает, и улучшать.

## Цели

Кодекс требует, чтобы каждая компания:

- обеспечивала безопасную практику эксплуатации судов и безопасные условия труда;
- оценивала все выявленные риски для своих судов, людей и окружающей среды и устанавливала надлежащие меры защиты;
- постоянно совершенствовала навыки управления безопасностью персонала на берегу и на борту, включая готовность к аварийным ситуациям.

## Шестнадцать разделов

1. **Общие положения:** определения и цели.
2. **Политика в области безопасности и защиты окружающей среды.**
3. **Обязанности и ответственность компании:** кто в компании отвечает за судно.
4. **Назначенное лицо (лица)** — DPA.
5. **Обязанности и ответственность капитана.**
6. **Ресурсы и персонал:** квалифицированный экипаж, ознакомление, подготовка, рабочий язык.
7. **Операции на судне:** процедуры, планы и инструкции для ключевых операций.
8. **Готовность к аварийным ситуациям:** процедуры, тренировки и учения.
9. **Сообщения о несоответствиях, авариях и опасных происшествиях и их анализ** — включая потенциально опасные ситуации (near miss).
10. **Техническое обслуживание судна и оборудования:** плановое обслуживание, критическое оборудование.
11. **Документация:** управление руководствами и формами.
12. **Проверка, анализ и оценка компанией:** внутренние аудиты.
13. **Освидетельствование и периодическая проверка.**
14. **Временные документы.**
15. **Проверка.**
16. **Формы документов.**

## Главные цифры

!! 1998 / 2002 | обязателен: сначала танкеры, балкеры, пассажирские суда, потом все остальные от 500 GT
!! 5 лет | срок действия ДСК и СвУБ
!! 12 месяцев | наибольший интервал между внутренними аудитами на судне и на берегу
!! 3 месяца | окно до и после годовщины для ежегодной проверки ДСК
!! 6 месяцев | срок временного СвУБ (12 месяцев — у временного ДСК)
!! 16 | разделов в кодексе

## Назначенное лицо и капитан

**Назначенное лицо на берегу (раздел 4)** — связующее звено между компанией и людьми на борту. У DPA есть прямой доступ к высшему руководству, и он следит за безопасностью и предотвращением загрязнения на каждом судне. Обратиться к DPA может любой на борту — не только капитан, — а его контакты вывешены на судне. Если вы видите опасность, которой на борту никто не занимается, — звонить нужно ему.

**Капитан (раздел 5)** проводит политику компании на борту, мотивирует экипаж, отдаёт приказы и распоряжения, проверяет выполнение требований, анализирует систему и сообщает компании о её недостатках. И главное: система должна ясно устанавливать, что у капитана есть **преимущественное право** и ответственность принимать решения в отношении безопасности и предотвращения загрязнения, а также запрашивать помощь компании, когда нужно. Ни фрахтователь, ни график, ни распоряжение из офиса не стоят выше этого.

## Документы и аудиты

- **Документ о соответствии (ДСК, DOC)** — выдаётся компании на типы судов, которые она эксплуатирует; действует до пяти лет и проверяется ежегодно, в пределах трёх месяцев до и после годовщины. Копия хранится на борту.
- **Свидетельство об управлении безопасностью (СвУБ, SMC)** — выдаётся судну; действует до пяти лет, с промежуточной проверкой между второй и третьей годовщиной.
- **Временные документы** — временный ДСК до 12 месяцев для новой компании или нового типа судна; временное СвУБ до 6 месяцев для нового судна или судна, сменившего владельца.
- **Внутренние аудиты** — на судне и на берегу, с интервалом не больше 12 месяцев, людьми, не зависящими от проверяемого участка.

## Несоответствия и наблюдения

Это термины аудиторов, и старший комсостав должен знать их точно:

- **Наблюдение** — изложение факта, сделанное во время аудита и подтверждённое объективными данными. Само по себе не нарушение, но предупреждение.
- **Несоответствие** — ситуация, когда объективные данные показывают, что установленное требование не выполнено: процедуру не соблюли, записи нет, учение не провели.
- **Значительное несоответствие** — явное отклонение, которое создаёт серьёзную угрозу безопасности людей или судна или серьёзный риск для окружающей среды и требует немедленных корректирующих действий, либо отсутствие эффективного и систематического выполнения требования кодекса. Из-за значительного несоответствия могут не выдать свидетельство или задержать судно в порту.

По каждому замечанию судно и компания согласуют корректирующее действие и срок, а следующий аудит проверяет, сработало ли оно. Та же логика работает на борту каждый день: о потенциально опасных ситуациях и опасных происшествиях сообщают и их разбирают, потому что вчерашний near miss — это завтрашняя авария.

## Как система выглядит на борту

- руководство по управлению безопасностью на рабочем языке с процедурами для каждой ключевой операции — швартовки, бункеровки, грузовых операций, входа в замкнутые помещения, огневых работ, работ на высоте и за бортом;
- **оценка рисков** и **наряды-допуски** на опасные работы и **инструктаж** перед ними;
- **ознакомление** каждого нового члена экипажа до начала его обязанностей и любого, кого перевели на новую работу, связанную с безопасностью;
- **плановое техническое обслуживание** с выделенным критическим оборудованием — тем, внезапный отказ которого может привести к опасной ситуации, — и его регулярной проверкой, включая резервные системы;
- аварийные процедуры и программа учений;
- отчёты о near miss и авариях, заседания комитета по безопасности, анализ системы капитаном.

## Что спрашивают на собеседовании

- **Капитаны и старпомы:** что такое DPA и когда вы ему позвоните; преимущественное право капитана — приведите пример; разница между наблюдением, несоответствием и значительным несоответствием; сроки и проверки ДСК и СвУБ; как часто проводят внутренние аудиты; что вы делаете с несоответствием, которое нашёл портовый контроль; как проводите анализ системы капитаном.
- **Стармехи и вторые механики:** критическое оборудование и как его учитывает система планового обслуживания; проверка резервного оборудования; наряды-допуски на огневые работы и на вывод механизмов из работы.
- **Младшие помощники и рядовой состав:** система нарядов-допусков; инструктаж перед работой; как сообщить о near miss и зачем; ознакомление после прибытия; ваше право остановить работу, которую вы считаете опасной, — большинство компаний прописывает его в своей системе.

## Частые ошибки

1. Относиться к системе как к бумагам: галочки в чек-листе после работы, а не до неё. Аудитор сравнивает время в записях с судовым журналом.
2. Не сообщать о near miss из страха, что накажут. Кодекс существует, чтобы уроки извлекали до того, как кто-то пострадает; судно без единого такого отчёта выглядит как судно, которое их скрывает.
3. Начинать огневые работы, вход в замкнутое помещение или работу на высоте без наряда-допуска и инструктажа, потому что «это на пять минут».
4. Не знать номер DPA или думать, что звонить ему может только капитан.
5. Выполнить корректирующее действие только на бумаге. Следующий аудит проверит, ушла ли проблема на самом деле.
6. Выполнить указание компании или фрахтователя, которое ставит судно под угрозу. Преимущественное право капитана существует, чтобы им пользоваться.

## Проверь себя

?? Кто такой DPA и кто может к нему обратиться?
=> Назначенное лицо на берегу: связующее звено между судном и компанией с прямым доступом к высшему руководству. Обратиться к нему может любой на борту.
?? Чем несоответствие отличается от значительного несоответствия?
=> Несоответствие — невыполненное требование, подтверждённое объективными данными. Значительное — создаёт серьёзную угрозу людям, судну или среде и требует немедленных действий либо показывает, что система не выполняется эффективно и систематически.
?? Сколько действуют ДСК и СвУБ?
=> До пяти лет. ДСК проверяют ежегодно; у СвУБ есть промежуточная проверка между второй и третьей годовщиной.
?? Как часто проводят внутренние аудиты?
=> С интервалом не больше 12 месяцев, на судне и на берегу.
?? У кого на борту последнее слово по безопасности и предотвращению загрязнения?
=> У капитана — по преимущественному праву, которое ему должна предоставить система управления безопасностью.
?? Что такое критическое оборудование по разделу 10?
=> Оборудование и системы, внезапный отказ которых может привести к опасной ситуации. Компания их выделяет и регулярно проверяет, включая резервные системы.

## Кому на борту это нужно

Прежде всего тем, кто ведёт систему: [капитану](/ru/jobs/rank/master), [старпому](/ru/jobs/rank/chief-officer) и [стармеху](/ru/jobs/rank/chief-engineer) — о ISM их спрашивают на каждом собеседовании на старшую должность. [Второй механик](/ru/jobs/rank/2nd-engineer) отвечает за плановое обслуживание; каждый [матрос AB](/ru/jobs/rank/able-seaman) и [боцман](/ru/jobs/rank/bosun) работает по его нарядам-допускам каждый день. Правовая основа — глава IX SOLAS, см. [SOLAS простыми словами](/ru/handbook/solas-prostymi-slovami-ucheniya-spasatelnye-sredstva-i-voprosy-na-sobesedovanii-2cbdb6d6-b0fa-498a-9c32-68bd9b95e096).

Впишите в [резюме моряка](/ru/maritime-cv) типы судов и компании, в которых работали: по ним крюинг судит, насколько хорошо вы знаете систему управления безопасностью.

*Источник: Международный кодекс по управлению безопасностью (МКУБ) с поправками и глава IX SOLAS. Подробности добавляет система управления безопасностью каждой компании; на борту действует именно она. Эта страница — пособие для подготовки, а не юридический текст.*$ru$,
    'ua', $ua$Кодекс ISM (МКУБ) — причина, через яку на кожному судні є товстий посібник з управління безпекою, чек-лист майже на будь-яку роботу й людина на березі — призначена особа (DPA), якій може зателефонувати будь-хто на борту. Він перетворює безпеку зі справи везіння й особистих звичок на систему, яку компанія записує, екіпаж виконує, а аудитори перевіряють. Старший командний склад питають про нього майже на кожній співбесіді, а рядовий склад стикається з ним щодня — у нарядах-допусках, інструктажах перед роботою та звітах про потенційно небезпечні ситуації. Тут — що вимагає кодекс, цифри й терміни, про які питають найчастіше, що таке невідповідність, помилки, через які дрібне зауваження перетворюється на затримання судна, і питання для самоперевірки.

:: **Коротко**
:: - Кодекс ISM — Міжнародний кодекс з управління безпечною експлуатацією суден і запобіганням забрудненню, обов'язковий за розділом IX SOLAS з 1998 року.
:: - Компанія пише систему управління безпекою (СУБ); судно має Свідоцтво про управління безпекою, компанія — Документ про відповідність, обидва до п'яти років.
:: - Призначена особа (DPA) — людина на березі з прямим виходом на вище керівництво, до якої може звернутися будь-хто на борту.
:: - Капітан має переважне право ухвалювати будь-які рішення заради безпеки й запобігання забрудненню.

## Що таке Кодекс ISM і звідки він узявся

Наприкінці 1980-х серія катастроф показала, що судна гинуть не через брак правил, а через відсутність управління. Пором Herald of Free Enterprise перекинувся в 1987 році, вийшовши з порту з відчиненими носовими воротами; розслідування не знайшло ні на березі, ні на борту чіткої системи, яка гарантувала б, що ворота зачинені. Пожежа на поромі Scandinavian Star у 1990 році показала ті самі провали в підготовці й організації.

ІМО ухвалила Кодекс ISM у 1993 році й зробила його обов'язковим через розділ IX SOLAS: з 1 липня 1998 року — для пасажирських суден, танкерів, газовозів, навалочних суден і високошвидкісних вантажних суден від 500 GT, з 1 липня 2002 року — для всіх інших вантажних суден і плавучих бурових установок від 500 GT. Кодекс короткий — шістнадцять розділів, — бо він не каже компанії, що робити на борту. Він каже компанії вирішити, записати, навчити людей, перевірити, що це працює, і вдосконалювати.

## Цілі

Кодекс вимагає, щоб кожна компанія:

- забезпечувала безпечну практику експлуатації суден і безпечні умови праці;
- оцінювала всі виявлені ризики для своїх суден, людей і довкілля та встановлювала належні заходи захисту;
- постійно вдосконалювала навички управління безпекою персоналу на березі й на борту, зокрема готовність до аварійних ситуацій.

## Шістнадцять розділів

1. **Загальні положення:** визначення й цілі.
2. **Політика у сфері безпеки й захисту довкілля.**
3. **Обов'язки й відповідальність компанії:** хто в компанії відповідає за судно.
4. **Призначена особа (особи)** — DPA.
5. **Обов'язки й відповідальність капітана.**
6. **Ресурси й персонал:** кваліфікований екіпаж, ознайомлення, підготовка, робоча мова.
7. **Операції на судні:** процедури, плани й інструкції для ключових операцій.
8. **Готовність до аварійних ситуацій:** процедури, тренування й навчання.
9. **Повідомлення про невідповідності, аварії й небезпечні події та їх аналіз** — зокрема потенційно небезпечні ситуації (near miss).
10. **Технічне обслуговування судна й обладнання:** планове обслуговування, критичне обладнання.
11. **Документація:** управління посібниками й формами.
12. **Перевірка, аналіз і оцінка компанією:** внутрішні аудити.
13. **Сертифікація й періодична перевірка.**
14. **Тимчасові документи.**
15. **Перевірка.**
16. **Форми документів.**

## Головні цифри

!! 1998 / 2002 | обов'язковий: спершу танкери, балкери, пасажирські судна, потім усі інші від 500 GT
!! 5 років | строк дії DOC і SMC
!! 12 місяців | найбільший інтервал між внутрішніми аудитами на судні й на березі
!! 3 місяці | вікно до й після річниці для щорічної перевірки DOC
!! 6 місяців | строк тимчасового SMC (12 місяців — у тимчасового DOC)
!! 16 | розділів у кодексі

## Призначена особа й капітан

**Призначена особа на березі (розділ 4)** — сполучна ланка між компанією й людьми на борту. DPA має прямий доступ до вищого керівництва й стежить за безпекою та запобіганням забрудненню на кожному судні. Звернутися до DPA може будь-хто на борту — не лише капітан, — а його контакти вивішені на судні. Якщо ви бачите небезпеку, якою на борту ніхто не займається, — телефонувати треба йому.

**Капітан (розділ 5)** проводить політику компанії на борту, мотивує екіпаж, віддає накази й розпорядження, перевіряє виконання вимог, аналізує систему й повідомляє компанії про її недоліки. І головне: система має чітко встановлювати, що капітан має **переважне право** й відповідальність ухвалювати рішення щодо безпеки й запобігання забрудненню, а також просити допомоги компанії, коли треба. Ні фрахтувальник, ні графік, ні розпорядження з офісу не стоять вище за це.

## Документи й аудити

- **Документ про відповідність (DOC)** — видається компанії на типи суден, які вона експлуатує; чинний до п'яти років і перевіряється щороку, у межах трьох місяців до й після річниці. Копія зберігається на борту.
- **Свідоцтво про управління безпекою (SMC)** — видається судну; чинне до п'яти років, з проміжною перевіркою між другою й третьою річницею.
- **Тимчасові документи** — тимчасовий DOC до 12 місяців для нової компанії чи нового типу судна; тимчасове SMC до 6 місяців для нового судна або судна, що змінило власника.
- **Внутрішні аудити** — на судні й на березі, з інтервалом не більше 12 місяців, людьми, незалежними від ділянки, яку перевіряють.

## Невідповідності й спостереження

Це терміни аудиторів, і старший командний склад має знати їх точно:

- **Спостереження** — викладення факту, зроблене під час аудиту й підтверджене об'єктивними даними. Саме по собі не порушення, але попередження.
- **Невідповідність** — ситуація, коли об'єктивні дані показують, що встановлену вимогу не виконано: процедури не дотрималися, запису немає, навчання не провели.
- **Значна невідповідність** — явне відхилення, що створює серйозну загрозу безпеці людей чи судна або серйозний ризик для довкілля й вимагає негайних коригувальних дій, або відсутність ефективного й систематичного виконання вимоги кодексу. Через значну невідповідність можуть не видати свідоцтво чи затримати судно в порту.

Щодо кожного зауваження судно й компанія погоджують коригувальну дію та строк, а наступний аудит перевіряє, чи вона спрацювала. Та сама логіка працює на борту щодня: про потенційно небезпечні ситуації й небезпечні події повідомляють і їх розбирають, бо вчорашній near miss — це завтрашня аварія.

## Як система виглядає на борту

- посібник з управління безпекою робочою мовою з процедурами для кожної ключової операції — швартування, бункерування, вантажних операцій, входу в замкнені приміщення, вогневих робіт, робіт на висоті й за бортом;
- **оцінка ризиків** і **наряди-допуски** на небезпечні роботи та **інструктаж** перед ними;
- **ознайомлення** кожного нового члена екіпажу до початку його обов'язків і будь-кого, кого перевели на нову роботу, пов'язану з безпекою;
- **планове технічне обслуговування** з виокремленим критичним обладнанням — тим, раптова відмова якого може призвести до небезпечної ситуації, — і його регулярною перевіркою, зокрема резервних систем;
- аварійні процедури й програма навчань;
- звіти про near miss і аварії, засідання комітету з безпеки, аналіз системи капітаном.

## Що питають на співбесіді

- **Капітани й старпоми:** що таке DPA і коли ви йому зателефонуєте; переважне право капітана — наведіть приклад; різниця між спостереженням, невідповідністю й значною невідповідністю; строки й перевірки DOC і SMC; як часто проводять внутрішні аудити; що ви робите з невідповідністю, яку знайшов портовий контроль; як проводите аналіз системи капітаном.
- **Стармехи й другі механіки:** критичне обладнання і як його враховує система планового обслуговування; перевірка резервного обладнання; наряди-допуски на вогневі роботи й на виведення механізмів з роботи.
- **Молодші помічники й рядовий склад:** система нарядів-допусків; інструктаж перед роботою; як повідомити про near miss і навіщо; ознайомлення після прибуття; ваше право зупинити роботу, яку ви вважаєте небезпечною, — більшість компаній прописує його у своїй системі.

## Типові помилки

1. Ставитися до системи як до паперів: галочки в чек-листі після роботи, а не до неї. Аудитор порівнює час у записах із судновим журналом.
2. Не повідомляти про near miss через страх покарання. Кодекс існує, щоб уроки виносили до того, як хтось постраждає; судно без жодного такого звіту виглядає як судно, що їх приховує.
3. Починати вогневі роботи, вхід у замкнене приміщення чи роботу на висоті без наряду-допуску та інструктажу, бо «це на п'ять хвилин».
4. Не знати номер DPA або думати, що телефонувати йому може лише капітан.
5. Виконати коригувальну дію лише на папері. Наступний аудит перевірить, чи проблема справді зникла.
6. Виконати вказівку компанії чи фрахтувальника, яка ставить судно під загрозу. Переважне право капітана існує, щоб ним користуватися.

## Перевір себе

?? Хто такий DPA і хто може до нього звернутися?
=> Призначена особа на березі: сполучна ланка між судном і компанією з прямим доступом до вищого керівництва. Звернутися до неї може будь-хто на борту.
?? Чим невідповідність відрізняється від значної невідповідності?
=> Невідповідність — невиконана вимога, підтверджена об'єктивними даними. Значна — створює серйозну загрозу людям, судну чи довкіллю й вимагає негайних дій або показує, що система не виконується ефективно й систематично.
?? Скільки чинні DOC і SMC?
=> До п'яти років. DOC перевіряють щороку; у SMC є проміжна перевірка між другою й третьою річницею.
?? Як часто проводять внутрішні аудити?
=> З інтервалом не більше 12 місяців, на судні й на березі.
?? У кого на борту останнє слово щодо безпеки й запобігання забрудненню?
=> У капітана — за переважним правом, яке йому має надати система управління безпекою.
?? Що таке критичне обладнання за розділом 10?
=> Обладнання й системи, раптова відмова яких може призвести до небезпечної ситуації. Компанія їх виокремлює й регулярно перевіряє, зокрема резервні системи.

## Кому на борту це потрібно

Насамперед тим, хто веде систему: [капітану](/ua/jobs/rank/master), [старпому](/ua/jobs/rank/chief-officer) і [стармеху](/ua/jobs/rank/chief-engineer) — про ISM їх питають на кожній співбесіді на старшу посаду. [Другий механік](/ua/jobs/rank/2nd-engineer) відповідає за планове обслуговування; кожен [матрос AB](/ua/jobs/rank/able-seaman) і [боцман](/ua/jobs/rank/bosun) працює за його нарядами-допусками щодня. Правова основа — розділ IX SOLAS, див. [SOLAS простими словами](/ua/handbook/solas-prostimi-slovami-navchannya-ryatuvalni-zasobi-ta-pitannya-na-spivbesidi-2cbdb6d6-b0fa-498a-9c32-68bd9b95e096).

Впишіть у [резюме моряка](/ua/maritime-cv) типи суден і компанії, у яких працювали: за ними крюїнг судить, наскільки добре ви знаєте систему управління безпекою.

*Джерело: Міжнародний кодекс з управління безпекою (МКУБ) з поправками й розділ IX SOLAS. Подробиці додає система управління безпекою кожної компанії; на борту діє саме вона. Ця сторінка — посібник для підготовки, а не юридичний текст.*$ua$,
    'pl', $pl$Kodeks ISM to powód, dla którego na każdym statku jest gruba księga systemu zarządzania bezpieczeństwem, lista kontrolna niemal do każdej pracy i człowiek na lądzie — osoba wyznaczona (DPA), do której może zadzwonić każdy na statku. Zamienia bezpieczeństwo ze sprawy szczęścia i osobistych nawyków w system, który armator spisuje, załoga stosuje, a audytorzy sprawdzają. Starszych oficerów pyta się o niego niemal na każdej rozmowie, a załoga szeregowa styka się z nim codziennie — w zezwoleniach na pracę, odprawach przed pracą i zgłoszeniach zdarzeń potencjalnie niebezpiecznych. Tutaj znajdziesz, czego wymaga kodeks, liczby i pojęcia, o które pytają najczęściej, czym jest niezgodność, błędy, przez które drobna uwaga zamienia się w zatrzymanie statku, oraz pytania do sprawdzenia się.

:: **W skrócie**
:: - Kodeks ISM to Międzynarodowy kodeks zarządzania bezpieczną eksploatacją statków i zapobieganiem zanieczyszczaniu, obowiązkowy na mocy rozdziału IX SOLAS od 1998 roku.
:: - Armator pisze system zarządzania bezpieczeństwem; statek ma Certyfikat zarządzania bezpieczeństwem, armator — Dokument zgodności, oba ważne do pięciu lat.
:: - Osoba wyznaczona (DPA) to człowiek na lądzie z bezpośrednim dostępem do najwyższego kierownictwa, do którego może się zwrócić każdy na statku.
:: - Kapitan ma nadrzędne uprawnienie do podejmowania każdej decyzji dla bezpieczeństwa i zapobiegania zanieczyszczeniom.

## Czym jest Kodeks ISM i skąd się wziął

Pod koniec lat 80. seria katastrof pokazała, że statki toną nie z braku przepisów, ale z braku zarządzania. Prom Herald of Free Enterprise przewrócił się w 1987 roku, wychodząc z portu z otwartymi wrotami dziobowymi; dochodzenie nie znalazło ani na lądzie, ani na statku jasnego systemu, który zapewniałby, że wrota są zamknięte. Pożar na promie Scandinavian Star w 1990 roku pokazał te same luki w szkoleniu i organizacji.

IMO przyjęła Kodeks ISM w 1993 roku i uczyniła go obowiązkowym przez rozdział IX SOLAS: od 1 lipca 1998 roku dla statków pasażerskich, tankowców, gazowców, masowców i szybkich jednostek towarowych od 500 GT, od 1 lipca 2002 roku dla wszystkich pozostałych statków towarowych i przewoźnych platform wiertniczych od 500 GT. Kodeks jest krótki — szesnaście części — bo nie mówi armatorowi, co robić na statku. Mówi armatorowi: zdecyduj, spisz, przeszkol ludzi, sprawdź, czy to działa, i ulepszaj.

## Cele

Kodeks wymaga, by każdy armator:

- zapewniał bezpieczne praktyki eksploatacji statków i bezpieczne środowisko pracy;
- oceniał wszystkie rozpoznane zagrożenia dla swoich statków, ludzi i środowiska i ustanawiał odpowiednie zabezpieczenia;
- stale doskonalił umiejętności zarządzania bezpieczeństwem personelu na lądzie i na statku, w tym gotowość na wypadek sytuacji awaryjnych.

## Szesnaście części

1. **Postanowienia ogólne:** definicje i cele.
2. **Polityka bezpieczeństwa i ochrony środowiska.**
3. **Obowiązki i uprawnienia armatora:** kto u armatora odpowiada za statek.
4. **Osoba (osoby) wyznaczona** — DPA.
5. **Obowiązki i uprawnienia kapitana.**
6. **Zasoby i personel:** wykwalifikowana załoga, zapoznanie, szkolenie, język roboczy.
7. **Operacje na statku:** procedury, plany i instrukcje dla kluczowych operacji.
8. **Gotowość na wypadek sytuacji awaryjnych:** procedury, ćwiczenia i treningi.
9. **Zgłaszanie i analiza niezgodności, wypadków i zdarzeń niebezpiecznych** — w tym zdarzeń potencjalnie niebezpiecznych (near miss).
10. **Utrzymanie statku i urządzeń:** obsługa planowa, urządzenia krytyczne.
11. **Dokumentacja:** nadzór nad podręcznikami i formularzami.
12. **Weryfikacja, przegląd i ocena przez armatora:** audyty wewnętrzne.
13. **Certyfikacja i weryfikacja okresowa.**
14. **Certyfikacja tymczasowa.**
15. **Weryfikacja.**
16. **Wzory certyfikatów.**

## Najważniejsze liczby

!! 1998 / 2002 | obowiązkowy: najpierw tankowce, masowce, statki pasażerskie, potem wszystkie inne od 500 GT
!! 5 lat | ważność DOC i SMC
!! 12 miesięcy | najdłuższy odstęp między audytami wewnętrznymi na statku i na lądzie
!! 3 miesiące | okno przed i po rocznicy na coroczną weryfikację DOC
!! 6 miesięcy | ważność tymczasowego SMC (12 miesięcy — tymczasowego DOC)
!! 16 | części kodeksu

## Osoba wyznaczona i kapitan

**Osoba wyznaczona na lądzie (część 4)** łączy armatora z ludźmi na statku. DPA ma bezpośredni dostęp do najwyższego kierownictwa i nadzoruje bezpieczeństwo oraz zapobieganie zanieczyszczeniom na każdym statku. Zwrócić się do DPA może każdy na statku — nie tylko kapitan — a jej dane kontaktowe wiszą na statku. Jeśli widzisz zagrożenie, którym nikt na statku się nie zajmuje, dzwonisz właśnie do niej.

**Kapitan (część 5)** wprowadza politykę armatora na statku, motywuje załogę, wydaje rozkazy i polecenia, sprawdza przestrzeganie wymagań, przegląda system i zgłasza armatorowi jego braki. A przede wszystkim system musi jasno stwierdzać, że kapitan ma **nadrzędne uprawnienie** i odpowiedzialność za podejmowanie decyzji dotyczących bezpieczeństwa i zapobiegania zanieczyszczeniom oraz za zwracanie się do armatora o pomoc, gdy jest potrzebna. Ani czarterujący, ani harmonogram, ani polecenie z biura nie stoją ponad tym.

## Certyfikaty i audyty

- **Dokument zgodności (DOC)** — wydawany armatorowi na typy statków, które eksploatuje; ważny do pięciu lat i weryfikowany co roku, w ciągu trzech miesięcy przed i po rocznicy. Kopia jest na statku.
- **Certyfikat zarządzania bezpieczeństwem (SMC)** — wydawany statkowi; ważny do pięciu lat, z weryfikacją pośrednią między drugą a trzecią rocznicą.
- **Certyfikaty tymczasowe** — tymczasowy DOC do 12 miesięcy dla nowego armatora lub nowego typu statku; tymczasowy SMC do 6 miesięcy dla nowego statku lub statku, który zmienił właściciela.
- **Audyty wewnętrzne** — na statku i na lądzie, w odstępach nie dłuższych niż 12 miesięcy, przez osoby niezależne od audytowanego obszaru.

## Niezgodności i obserwacje

To pojęcia audytorów i starsi oficerowie powinni znać je dokładnie:

- **Obserwacja** — stwierdzenie faktu dokonane w czasie audytu i poparte obiektywnymi dowodami. Samo w sobie nie jest uchybieniem, ale ostrzeżeniem.
- **Niezgodność** — sytuacja, w której obiektywne dowody wskazują, że określone wymaganie nie jest spełnione: procedury nie przestrzegano, brak zapisu, ćwiczenia nie przeprowadzono.
- **Poważna niezgodność** — wyraźne odstępstwo stanowiące poważne zagrożenie dla bezpieczeństwa ludzi lub statku albo poważne ryzyko dla środowiska i wymagające natychmiastowych działań korygujących, albo brak skutecznego i systematycznego wdrożenia wymagania kodeksu. Z powodu poważnej niezgodności można nie wydać certyfikatu albo zatrzymać statek w porcie.

Do każdej uwagi statek i armator ustalają działanie korygujące i termin, a kolejny audyt sprawdza, czy zadziałało. Ta sama logika działa na statku codziennie: zdarzenia potencjalnie niebezpieczne i niebezpieczne zgłasza się i analizuje, bo wczorajszy near miss to jutrzejszy wypadek.

## Jak system wygląda na statku

- księga systemu zarządzania bezpieczeństwem w języku roboczym z procedurami dla każdej kluczowej operacji — cumowania, bunkrowania, operacji ładunkowych, wejścia do przestrzeni zamkniętych, prac gorących, prac na wysokości i za burtą;
- **ocena ryzyka** i **zezwolenia na pracę** przy pracach niebezpiecznych oraz **odprawa** przed nimi;
- **zapoznanie** każdego nowego członka załogi przed objęciem obowiązków i każdego przeniesionego do nowej pracy związanej z bezpieczeństwem;
- **obsługa planowa** z wyodrębnionymi urządzeniami krytycznymi — tymi, których nagła awaria może spowodować niebezpieczną sytuację — i ich regularnym sprawdzaniem, w tym systemów rezerwowych;
- procedury awaryjne i program ćwiczeń;
- zgłoszenia near miss i wypadków, posiedzenia komitetu bezpieczeństwa, przegląd systemu przez kapitana.

## O co pytają na rozmowie

- **Kapitanowie i starsi oficerowie:** kim jest DPA i kiedy do niej zadzwonisz; nadrzędne uprawnienie kapitana — podaj przykład; różnica między obserwacją, niezgodnością i poważną niezgodnością; ważność i weryfikacje DOC i SMC; jak często przeprowadza się audyty wewnętrzne; co robisz z niezgodnością wykrytą przez inspekcję państwa portu; jak przeprowadzasz przegląd systemu przez kapitana.
- **Starsi i drudzy mechanicy:** urządzenia krytyczne i jak traktuje je system obsługi planowej; sprawdzanie urządzeń rezerwowych; zezwolenia na prace gorące i na wyłączenie maszyn z ruchu.
- **Młodsi oficerowie i załoga szeregowa:** system zezwoleń na pracę; odprawa przed pracą; jak zgłosić near miss i po co; zapoznanie po zaokrętowaniu; twoje prawo do przerwania pracy, którą uważasz za niebezpieczną — większość armatorów wpisuje je do swojego systemu.

## Typowe błędy

1. Traktowanie systemu jak papierologii: odhaczanie listy kontrolnej po pracy, a nie przed nią. Audytor porównuje godziny w zapisach z dziennikiem okrętowym.
2. Niezgłaszanie near miss ze strachu przed karą. Kodeks istnieje po to, by wyciągać wnioski, zanim ktoś ucierpi; statek bez żadnego takiego zgłoszenia wygląda jak statek, który je ukrywa.
3. Rozpoczynanie prac gorących, wejścia do przestrzeni zamkniętej czy pracy na wysokości bez zezwolenia i odprawy, bo „to na pięć minut”.
4. Nieznajomość numeru DPA albo przekonanie, że dzwonić może tylko kapitan.
5. Wykonanie działania korygującego tylko na papierze. Kolejny audyt sprawdzi, czy problem naprawdę zniknął.
6. Wykonanie polecenia armatora lub czarterującego, które naraża statek. Nadrzędne uprawnienie kapitana istnieje po to, by z niego korzystać.

## Sprawdź się

?? Kim jest DPA i kto może się do niej zwrócić?
=> Osoba wyznaczona na lądzie: łącznik między statkiem a armatorem z bezpośrednim dostępem do najwyższego kierownictwa. Zwrócić się do niej może każdy na statku.
?? Czym niezgodność różni się od poważnej niezgodności?
=> Niezgodność to niespełnione wymaganie potwierdzone obiektywnymi dowodami. Poważna stanowi poważne zagrożenie dla ludzi, statku lub środowiska i wymaga natychmiastowego działania albo wskazuje, że system nie jest wdrożony skutecznie i systematycznie.
?? Jak długo ważne są DOC i SMC?
=> Do pięciu lat. DOC weryfikuje się co roku; SMC ma weryfikację pośrednią między drugą a trzecią rocznicą.
?? Jak często przeprowadza się audyty wewnętrzne?
=> W odstępach nie dłuższych niż 12 miesięcy, na statku i na lądzie.
?? Kto ma na statku ostatnie słowo w sprawach bezpieczeństwa i zapobiegania zanieczyszczeniom?
=> Kapitan — na mocy nadrzędnego uprawnienia, które musi mu dawać system zarządzania bezpieczeństwem.
?? Czym są urządzenia krytyczne według części 10?
=> Urządzenia i systemy, których nagła awaria może spowodować niebezpieczną sytuację. Armator je wyodrębnia i regularnie sprawdza, łącznie z systemami rezerwowymi.

## Komu na statku to potrzebne

Przede wszystkim tym, którzy prowadzą system: [kapitanowi](/pl/jobs/rank/master), [starszemu oficerowi](/pl/jobs/rank/chief-officer) i [starszemu mechanikowi](/pl/jobs/rank/chief-engineer) — o ISM pyta się ich na każdej rozmowie na starsze stanowisko. [Drugi mechanik](/pl/jobs/rank/2nd-engineer) odpowiada za obsługę planową; każdy [starszy marynarz AB](/pl/jobs/rank/able-seaman) i [bosman](/pl/jobs/rank/bosun) pracuje codziennie na jego zezwoleniach. Podstawa prawna to rozdział IX SOLAS, zobacz [SOLAS w prostych słowach](/pl/handbook/solas-w-prostych-slowach-cwiczenia-srodki-ratunkowe-i-pytania-na-rozmowie-2cbdb6d6-b0fa-498a-9c32-68bd9b95e096).

Wpisz do [CV marynarza](/pl/maritime-cv) typy statków i armatorów, u których pływałeś: po nich agencja crewingowa ocenia, jak dobrze znasz system zarządzania bezpieczeństwem.

*Źródło: Międzynarodowy kodeks zarządzania bezpieczeństwem (ISM) wraz z poprawkami i rozdział IX SOLAS. Szczegóły dodaje system zarządzania bezpieczeństwem każdego armatora; na statku obowiązuje właśnie on. Ta strona to pomoc do nauki, a nie tekst prawny.*$pl$),
  'ISM', 'handbook',
  'linear-gradient(135deg,#0e2a45,#2a6f97)',
  true, '2026-10-09 16:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'ISM Code in plain words: the safety management system, the DPA, non-conformities and interview questions');

-- ── H2. ISPS ──────────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'ISPS Code in plain words: security levels, the SSO, the gangway watch and interview questions',
    'ru', 'Кодекс ОСПС (ISPS) простыми словами: уровни охраны, SSO, вахта у трапа и вопросы на собеседовании',
    'ua', 'Кодекс ОСПЗ (ISPS) простими словами: рівні охорони, SSO, вахта біля трапа та питання на співбесіді',
    'pl', 'Kodeks ISPS w prostych słowach: poziomy ochrony, oficer ochrony statku, wachta przy trapie i pytania na rozmowie'),
  jsonb_build_object(
    'en', $en$The ISPS Code is why there is always someone at the gangway with a visitors' log, why the bridge and engine room doors are locked in port, and why the ship has a security officer and a plan most of the crew never sees in full. It came into force in 2004, in the wake of the attacks of 2001, and it now governs every international cargo ship of 500 GT and above and every passenger ship. Officers are asked about it at interviews, and the gangway watch is where ratings meet it every day. This page sets out how the Code works, the security levels, the roles and documents, what the gangway watch actually has to do, the mistakes that let the wrong person on board, and questions to test yourself.

:: **In short**
:: - The ISPS Code (International Ship and Port Facility Security Code) has been in force since 1 July 2004 under SOLAS chapter XI-2.
:: - Three security levels: 1 normal, 2 heightened, 3 exceptional. The flag sets the ship's level, the port state the port facility's.
:: - Every ship has a ship security officer (SSO), every company a company security officer (CSO), every port facility a PFSO.
:: - The ship security alert system sends a silent alarm ashore — it sounds nothing on board and alerts no other ships.

## What the ISPS Code is

After the attacks of 11 September 2001, IMO looked at how a ship could become a target, a weapon or a way to move people and goods illegally. In December 2002 a diplomatic conference added chapter XI-2 to SOLAS and adopted the ISPS Code; both came into force on 1 July 2004. Part A of the Code is mandatory; Part B is guidance, though many states apply much of it as if it were mandatory.

The Code applies to passenger ships, including high-speed passenger craft, on international voyages; to cargo ships, including high-speed craft, of 500 GT and above on international voyages; to mobile offshore drilling units; and to the port facilities that serve them. Its approach is risk management: assess the threat, plan the measures, set the level, practise.

Next to it, chapter XI-1 gives every ship an IMO number and a Continuous Synopsis Record — the ship's history of names, flags, owners and managers on board.

## Key numbers

!! 3 | security levels: normal, heightened, exceptional
!! 2004 | the ISPS Code in force (1 July)
!! 3 months | longest interval between security drills
!! 18 months | longest interval between security exercises (held every calendar year)
!! 2 | SSAS activation points at least: the bridge and one more
!! 500 GT | cargo ships on international voyages from this size are covered

## The three security levels

- **Level 1 — normal:** the minimum protective measures kept up at all times.
- **Level 2 — heightened:** additional measures for a period of time because the risk of a security incident has risen.
- **Level 3 — exceptional:** further, specific measures for a limited period when an incident is probable or imminent, even if the exact target cannot be identified. Instructions may come directly from the authorities.

The flag state sets the level for its ships, the port state for its port facilities. Before entering port the ship compares levels: if the port's level is higher, the ship raises its own to match; if the ship's level is higher, it does not lower it, and the two sides agree the measures.

## Roles and documents

- **Company security officer (CSO)** — ashore; arranges the ship security assessment, develops the plan and has it approved, organises audits and keeps contact with the ships.
- **Ship security officer (SSO)** — on board, accountable to the master; implements and maintains the plan, inspects the ship regularly, trains the crew, holds drills, reports security incidents and keeps the security equipment working. Often the chief officer; the certificate is STCW VI/5.
- **Port facility security officer (PFSO)** — ashore, for each port facility; the SSO's counterpart in port.
- **Ship security assessment (SSA)** — the CSO's study of the ship's vulnerabilities, made before the plan is written.
- **Ship security plan (SSP)** — approved by the flag and kept on board. It covers access control, restricted areas, handling of cargo and stores, monitoring, responses to threats and breaches, and the SSAS. Parts of it are confidential: they are shown to a port state control officer only with the flag's consent.
- **International Ship Security Certificate (ISSC)** — valid for up to five years, with an intermediate verification; an interim ISSC is issued for up to six months.
- **Declaration of security (DoS)** — an agreement between the ship and the port facility, or another ship, on which security measures each side will take. It is completed when the ship is at a higher level than the port facility or the other ship, when one side is not covered by the Code, after a security threat or incident, when the authorities require it, or when either side asks for one.

## The ship security alert system

The **SSAS** is a covert alarm required by SOLAS chapter XI-2. When activated, it sends an alert ashore — to the authority the flag has designated, usually including the company — giving the ship's identity and position and saying that its security is under threat. It does not sound on board and does not alert other ships, so that whoever is threatening the ship does not know the alarm has gone. It can be activated from the bridge and from at least one other place, and those places are known only to the people who need to know. It is tested under the plan, and a test is announced to the receivers first so it is not mistaken for a real alert.

## The gangway watch and access control

At level 1 the plan typically requires:

- checking the identity of **everyone** boarding and their reason for coming — agents, surveyors, chandlers, crew changes, pilots and port officials included;
- a visitors' log with names, organisations, times on and off, and visitor passes;
- searching persons, baggage and vehicles to the extent the plan sets, more at higher levels;
- restricted areas — bridge, engine room, steering gear, the cargo control room and others — locked or guarded;
- watching the deck and the water around the ship, especially at night;
- checking stores and cargo against the documents, and searching the ship for stowaways before departure.

At level 2 these measures tighten — fewer access points, more searches, escorts for visitors, extra patrols. At level 3 access may be limited to authorised people only, and the ship follows the authorities' instructions.

## Drills, exercises and training

- **Security drills** at least every three months, and within a week if more than a quarter of the crew has changed with people who have not taken part in a drill on that ship within the last three months.
- **Security exercises** — with the CSO, port facilities and authorities — at least once every calendar year, with no more than 18 months between them.
- **Training:** security awareness for every seafarer and designated security duties for those who have them (STCW VI/6); the SSO holds STCW VI/5.
- **Records** kept on board: training, drills and exercises, threats and incidents, breaches, changes of security level, communications on the ship's security, internal audits, maintenance of security equipment, and declarations of security.

In high-risk areas for piracy, companies add the industry's Best Management Practices — the citadel, barriers, watches and reporting to the regional centres — to the measures in the ship security plan.

## What they ask at the interview

- **Chief officers and masters:** the three levels and who sets them; what to do when the port's level is higher than the ship's; when a declaration of security is needed; what the SSAS does and why it is silent; the SSO's duties; drill and exercise intervals; what a port state control officer may and may not see in the plan.
- **Junior officers:** gangway procedures; restricted areas; a stowaway search before departure; what to do on finding an unidentified package.
- **Ratings:** checking ID at the gangway and the visitors' log; who may board without a check (nobody); reporting anything suspicious to the officer of the watch or the SSO.

## Common mistakes

1. Letting someone board without checking ID because they "look like the agent" or are in a hurry. Everyone is checked, every time.
2. Leaving restricted areas open in port — the engine room door propped open for ventilation, the bridge unlocked.
3. Telling outsiders where the SSAS buttons are, or showing them the plan. The confidential parts are confidential from everyone without a need to know.
4. Posting photos and the ship's schedule on social media. Routes, cargo and crew lists are information someone else may use.
5. Skipping the stowaway search before sailing because the stay was short. A stowaway found at sea becomes the ship's problem for weeks.
6. Mixing up the SSAS with a distress alert. A distress alert calls for help from everyone; the SSAS warns the shore and keeps silent on board.

## Test yourself

?? What are the three security levels and who sets them?
=> Level 1 normal, level 2 heightened, level 3 exceptional. The flag sets the ship's level, the port state the port facility's.
?? The port facility is at level 2 and your ship at level 1. What do you do?
=> Raise the ship to level 2 before entering port, or before any interface with the facility, and inform the PFSO.
?? What is a declaration of security, and when is it completed?
=> An agreement between ship and port facility (or another ship) on the security measures each will take. It is completed when the ship is at a higher level than the other side, when one side is not covered by the Code, after a threat or incident, when the authorities require it, or when either side asks.
?? What does the SSAS do?
=> It sends a covert alert ashore — to the authority the flag has designated, usually including the company — with the ship's identity and position. It sounds no alarm on board and alerts no other ships.
?? How often must security drills be held?
=> At least every three months, and within a week if more than 25% of the crew is new to the ship's drills.
?? Who may board without an ID check at level 1?
=> Nobody. The identity and the reason for the visit of everyone boarding are checked.

## Who on board needs this

Everyone who stands a watch in port — the [able seaman](/jobs/rank/able-seaman) and the [ordinary seaman](/jobs/rank/ordinary-seaman) at the gangway, the [bosun](/jobs/rank/bosun) who sets the watch — and above all the [chief officer](/jobs/rank/chief-officer), who is usually the SSO, and the [master](/jobs/rank/master). The [second](/jobs/rank/2nd-officer) and [third officer](/jobs/rank/3rd-officer) are the officers of the watch the gangway reports to. The training certificates are STCW VI/5 and VI/6 — see [STCW in plain words](/handbook/stcw-in-plain-words-regulations-ii-1-to-vi-6-sea-time-revalidation-and-hours-of-09ed56ce-402e-40a5-9885-180e01f44c8f); the legal frame is SOLAS chapter XI-2 — see [SOLAS in plain words](/handbook/solas-in-plain-words-drills-life-saving-appliances-and-interview-questions-2cbdb6d6-b0fa-498a-9c32-68bd9b95e096).

Put your security certificates — VI/6 and, for officers, VI/5 — with their dates into your [maritime CV](/maritime-cv).

*Source: the International Ship and Port Facility Security (ISPS) Code and SOLAS chapter XI-2. The detail of what your ship does lives in its ship security plan; on board, the plan and the SSO's instructions prevail. This page is a study aid, not a legal text.*$en$,
    'ru', $ru$Кодекс ОСПС (ISPS) — причина, по которой у трапа всегда стоит вахтенный с журналом посетителей, двери мостика и машинного отделения в порту заперты, а на судне есть лицо, ответственное за охрану, и план, который большая часть экипажа целиком никогда не видит. Он вступил в силу в 2004 году, после терактов 2001 года, и сегодня действует для каждого грузового судна от 500 GT в международных рейсах и для каждого пассажирского. Помощников спрашивают о нём на собеседовании, а рядовой состав встречается с ним каждый день на вахте у трапа. Здесь — как устроен кодекс, уровни охраны, роли и документы, что на самом деле должна делать вахта у трапа, ошибки, из-за которых на борт попадает не тот человек, и вопросы для самопроверки.

:: **Коротко**
:: - Кодекс ОСПС (Международный кодекс по охране судов и портовых средств) действует с 1 июля 2004 года по главе XI-2 SOLAS.
:: - Три уровня охраны: 1 — обычный, 2 — повышенный, 3 — исключительный. Уровень судна устанавливает флаг, уровень портового средства — государство порта.
:: - На каждом судне есть лицо командного состава, ответственное за охрану судна (SSO), в каждой компании — должностное лицо компании (CSO), на каждом портовом средстве — PFSO.
:: - Система охранного оповещения судна подаёт на берег скрытый сигнал — на борту ничего не звучит, другие суда его не получают.

## Что такое Кодекс ОСПС

После терактов 11 сентября 2001 года ИМО рассмотрела, как судно может стать целью, оружием или способом незаконно перемещать людей и грузы. В декабре 2002 года дипломатическая конференция добавила в SOLAS главу XI-2 и приняла Кодекс ОСПС; оба вступили в силу 1 июля 2004 года. Часть A кодекса обязательна; часть B — рекомендации, хотя многие государства применяют значительную её часть как обязательную.

Кодекс действует для пассажирских судов, включая высокоскоростные, в международных рейсах; для грузовых судов, включая высокоскоростные, от 500 GT в международных рейсах; для плавучих буровых установок; и для портовых средств, которые их обслуживают. Его подход — управление рисками: оценить угрозу, спланировать меры, установить уровень, тренироваться.

Рядом с ним глава XI-1 даёт каждому судну номер ИМО и журнал непрерывной регистрации истории судна — названия, флаги, владельцы и управляющие компании, который хранится на борту.

## Главные цифры

!! 3 | уровня охраны: обычный, повышенный, исключительный
!! 2004 | Кодекс ОСПС вступил в силу (1 июля)
!! 3 месяца | наибольший интервал между тренировками по охране
!! 18 месяцев | наибольший интервал между учениями по охране (ежегодными)
!! 2 | места включения тревоги SSAS минимум: мостик и ещё одно
!! 500 GT | грузовые суда в международных рейсах от этого размера подпадают под кодекс

## Три уровня охраны

- **Уровень 1 — обычный:** минимальные меры защиты, которые поддерживаются всегда.
- **Уровень 2 — повышенный:** дополнительные меры на определённый срок, потому что риск инцидента вырос.
- **Уровень 3 — исключительный:** дальнейшие особые меры на ограниченный срок, когда инцидент вероятен или неизбежен, даже если точную цель установить нельзя. Указания могут поступать прямо от властей.

Уровень для своих судов устанавливает государство флага, для портовых средств — государство порта. Перед входом в порт судно сравнивает уровни: если уровень порта выше, судно повышает свой до него; если уровень судна выше, оно его не понижает, и стороны согласуют меры.

## Роли и документы

- **Должностное лицо компании, ответственное за охрану (CSO)** — на берегу; организует оценку охраны судна, разрабатывает план и добивается его одобрения, организует проверки и держит связь с судами.
- **Лицо командного состава, ответственное за охрану судна (SSO)** — на борту, подчиняется капитану; выполняет и поддерживает план, регулярно осматривает судно, обучает экипаж, проводит тренировки, сообщает об инцидентах и следит за исправностью средств охраны. Часто это старпом; его свидетельство — правило VI/5 ПДНВ.
- **Должностное лицо портового средства (PFSO)** — на берегу, для каждого портового средства; коллега SSO в порту.
- **Оценка охраны судна (SSA)** — исследование уязвимостей судна, которое CSO делает до того, как пишется план.
- **План охраны судна (SSP)** — одобрен флагом и хранится на борту. В нём — контроль доступа, зоны ограниченного доступа, обработка грузов и снабжения, наблюдение, действия при угрозах и нарушениях и система охранного оповещения. Часть плана конфиденциальна: инспектору портового контроля её показывают только с согласия флага.
- **Международное свидетельство об охране судна (ISSC)** — действует до пяти лет, с промежуточной проверкой; временное свидетельство выдают на срок до шести месяцев.
- **Декларация об охране (DoS)** — договорённость между судном и портовым средством или другим судном о том, какие меры охраны принимает каждая сторона. Её оформляют, когда уровень судна выше, чем у портового средства или другого судна, когда одна из сторон не подпадает под кодекс, после угрозы или инцидента, когда этого требуют власти или когда об этом просит любая из сторон.

## Система охранного оповещения судна

**ССОО (SSAS)** — скрытая тревога, которую требует глава XI-2 SOLAS. При включении она посылает на берег сигнал — органу, который назначил флаг, обычно включая компанию, — с данными о судне, его местоположением и сообщением, что охрана судна под угрозой. Она не звучит на борту и не оповещает другие суда, чтобы тот, кто угрожает судну, не узнал, что тревога подана. Включить её можно с мостика и как минимум ещё из одного места, и эти места знают только те, кому положено. Её проверяют по плану, а о проверке заранее предупреждают получателей, чтобы её не приняли за настоящую тревогу.

## Вахта у трапа и контроль доступа

На уровне 1 план обычно требует:

- проверять личность **каждого**, кто поднимается на борт, и цель визита — включая агентов, сюрвейеров, шипчандлеров, сменный экипаж, лоцманов и представителей властей;
- вести журнал посетителей с именами, организациями, временем прибытия и ухода и выдавать пропуска;
- досматривать людей, багаж и транспорт в объёме, который задаёт план, а на более высоких уровнях — больше;
- держать запертыми или под охраной зоны ограниченного доступа — мостик, машинное отделение, румпельное отделение, пост управления грузовыми операциями и другие;
- наблюдать за палубой и водой вокруг судна, особенно ночью;
- сверять снабжение и груз с документами и перед отходом осматривать судно на предмет безбилетников.

На уровне 2 эти меры ужесточаются — меньше точек доступа, больше досмотров, сопровождение посетителей, дополнительные обходы. На уровне 3 доступ могут ограничить только уполномоченными лицами, и судно выполняет указания властей.

## Тренировки, учения и подготовка

- **Тренировки по охране** — не реже раза в три месяца, а также в течение недели, если сменилось больше четверти экипажа на людей, не участвовавших в тренировке на этом судне за последние три месяца.
- **Учения по охране** — с CSO, портовыми средствами и властями — не реже раза в календарный год и не больше 18 месяцев между ними.
- **Подготовка:** ознакомление с вопросами охраны для каждого моряка и подготовка для тех, у кого есть назначенные обязанности по охране (правило VI/6 ПДНВ); у SSO — свидетельство по правилу VI/5.
- **Записи** на борту: подготовка, тренировки и учения, угрозы и инциденты, нарушения, изменения уровня охраны, связь по вопросам охраны судна, внутренние проверки, обслуживание средств охраны и декларации об охране.

В районах высокого пиратского риска компании добавляют к мерам плана охраны отраслевые рекомендации Best Management Practices — цитадель, заграждения, вахты и сообщения в региональные центры.

## Что спрашивают на собеседовании

- **Старпомы и капитаны:** три уровня и кто их устанавливает; что делать, если уровень порта выше уровня судна; когда нужна декларация об охране; что делает ССОО и почему она беззвучна; обязанности SSO; интервалы тренировок и учений; что инспектор портового контроля может и не может видеть в плане.
- **Младшие помощники:** порядок у трапа; зоны ограниченного доступа; осмотр судна на безбилетников перед отходом; что делать, если найден неопознанный предмет.
- **Рядовой состав:** проверка документов у трапа и журнал посетителей; кто может подняться без проверки (никто); как сообщить о подозрительном вахтенному помощнику или SSO.

## Частые ошибки

1. Пропустить на борт человека без проверки документов, потому что он «похож на агента» или торопится. Проверяют всех и всегда.
2. Оставлять зоны ограниченного доступа открытыми в порту — дверь машинного отделения подпёрта для вентиляции, мостик не заперт.
3. Рассказывать посторонним, где кнопки ССОО, или показывать им план. Конфиденциальные части закрыты для всех, кому не нужно их знать.
4. Выкладывать в соцсети фото и график судна. Маршруты, грузы и списки экипажа — информация, которой может воспользоваться кто-то другой.
5. Пропустить осмотр на безбилетников перед отходом, потому что стоянка была короткой. Безбилетник, найденный в море, становится проблемой судна на недели.
6. Путать ССОО с сигналом бедствия. Сигнал бедствия зовёт на помощь всех; ССОО предупреждает берег и молчит на борту.

## Проверь себя

?? Какие три уровня охраны и кто их устанавливает?
=> Уровень 1 — обычный, 2 — повышенный, 3 — исключительный. Уровень судна устанавливает флаг, портового средства — государство порта.
?? Портовое средство на уровне 2, а ваше судно на уровне 1. Ваши действия?
=> Повысить уровень судна до 2 до входа в порт или до любого взаимодействия с портовым средством и сообщить PFSO.
?? Что такое декларация об охране и когда её оформляют?
=> Договорённость между судном и портовым средством (или другим судном) о мерах охраны каждой стороны. Её оформляют, когда уровень судна выше, чем у другой стороны, когда одна сторона не подпадает под кодекс, после угрозы или инцидента, когда требуют власти или когда об этом просит любая сторона.
?? Что делает ССОО?
=> Посылает скрытый сигнал на берег — органу, назначенному флагом, обычно включая компанию, — с данными о судне и его местоположением. На борту тревога не звучит, другие суда её не получают.
?? Как часто проводят тренировки по охране?
=> Не реже раза в три месяца, а также в течение недели, если больше 25% экипажа не участвовали в тренировках на этом судне.
?? Кто может подняться на борт без проверки документов на уровне 1?
=> Никто. Проверяют личность и цель визита каждого, кто поднимается на борт.

## Кому на борту это нужно

Всем, кто несёт вахту в порту, — [матросу AB](/ru/jobs/rank/able-seaman) и [матросу OS](/ru/jobs/rank/ordinary-seaman) у трапа, [боцману](/ru/jobs/rank/bosun), который расставляет вахту, — и прежде всего [старпому](/ru/jobs/rank/chief-officer), который обычно и есть SSO, и [капитану](/ru/jobs/rank/master). [Второй](/ru/jobs/rank/2nd-officer) и [третий помощник](/ru/jobs/rank/3rd-officer) — вахтенные помощники, которым докладывает вахта у трапа. Свидетельства по охране — правила VI/5 и VI/6 ПДНВ, см. [ПДНВ простыми словами](/ru/handbook/pdnv-stcw-prostymi-slovami-pravila-ii-1-vi-6-stazh-podtverzhdenie-diplomov-i-cha-09ed56ce-402e-40a5-9885-180e01f44c8f); правовая основа — глава XI-2 SOLAS, см. [SOLAS простыми словами](/ru/handbook/solas-prostymi-slovami-ucheniya-spasatelnye-sredstva-i-voprosy-na-sobesedovanii-2cbdb6d6-b0fa-498a-9c32-68bd9b95e096).

Впишите свидетельства по охране — VI/6, а для помощников и VI/5 — с датами в [резюме моряка](/ru/maritime-cv).

*Источник: Международный кодекс по охране судов и портовых средств (ОСПС) и глава XI-2 SOLAS. Подробности того, что делает ваше судно, — в его плане охраны; на борту действуют план и указания SSO. Эта страница — пособие для подготовки, а не юридический текст.*$ru$,
    'ua', $ua$Кодекс ОСПЗ (ISPS) — причина, через яку біля трапа завжди стоїть вахтовий із журналом відвідувачів, двері містка й машинного відділення в порту замкнені, а на судні є особа, відповідальна за охорону, і план, який більша частина екіпажу цілком ніколи не бачить. Він набув чинності в 2004 році, після терактів 2001 року, і сьогодні діє для кожного вантажного судна від 500 GT у міжнародних рейсах і для кожного пасажирського. Помічників питають про нього на співбесіді, а рядовий склад зустрічається з ним щодня на вахті біля трапа. Тут — як побудований кодекс, рівні охорони, ролі й документи, що насправді має робити вахта біля трапа, помилки, через які на борт потрапляє не та людина, і питання для самоперевірки.

:: **Коротко**
:: - Кодекс ОСПЗ (Міжнародний кодекс з охорони суден і портових засобів) чинний з 1 липня 2004 року за розділом XI-2 SOLAS.
:: - Три рівні охорони: 1 — звичайний, 2 — підвищений, 3 — винятковий. Рівень судна встановлює прапор, рівень портового засобу — держава порту.
:: - На кожному судні є особа командного складу, відповідальна за охорону судна (SSO), у кожній компанії — посадова особа компанії (CSO), на кожному портовому засобі — PFSO.
:: - Система охоронного оповіщення судна (SSAS) подає на берег прихований сигнал — на борту нічого не звучить, інші судна його не отримують.

## Що таке Кодекс ОСПЗ

Після терактів 11 вересня 2001 року ІМО розглянула, як судно може стати ціллю, зброєю чи способом незаконно переміщувати людей і вантажі. У грудні 2002 року дипломатична конференція додала до SOLAS розділ XI-2 й ухвалила Кодекс ОСПЗ; обидва набули чинності 1 липня 2004 року. Частина A кодексу обов'язкова; частина B — рекомендації, хоча багато держав застосовують значну її частину як обов'язкову.

Кодекс діє для пасажирських суден, зокрема високошвидкісних, у міжнародних рейсах; для вантажних суден, зокрема високошвидкісних, від 500 GT у міжнародних рейсах; для плавучих бурових установок; і для портових засобів, що їх обслуговують. Його підхід — управління ризиками: оцінити загрозу, спланувати заходи, встановити рівень, тренуватися.

Поряд із ним розділ XI-1 дає кожному судну номер ІМО й журнал безперервної реєстрації історії судна — назви, прапори, власники й керуючі компанії, — що зберігається на борту.

## Головні цифри

!! 3 | рівні охорони: звичайний, підвищений, винятковий
!! 2004 | Кодекс ОСПЗ набув чинності (1 липня)
!! 3 місяці | найбільший інтервал між тренуваннями з охорони
!! 18 місяців | найбільший інтервал між навчаннями з охорони (щорічними)
!! 2 | місця увімкнення тривоги SSAS щонайменше: місток і ще одне
!! 500 GT | вантажні судна в міжнародних рейсах від цього розміру підпадають під кодекс

## Три рівні охорони

- **Рівень 1 — звичайний:** мінімальні заходи захисту, які підтримуються завжди.
- **Рівень 2 — підвищений:** додаткові заходи на певний строк, бо ризик інциденту зріс.
- **Рівень 3 — винятковий:** подальші особливі заходи на обмежений строк, коли інцидент імовірний чи неминучий, навіть якщо точну ціль встановити не можна. Вказівки можуть надходити безпосередньо від влади.

Рівень для своїх суден встановлює держава прапора, для портових засобів — держава порту. Перед входом у порт судно порівнює рівні: якщо рівень порту вищий, судно підвищує свій до нього; якщо рівень судна вищий, воно його не знижує, і сторони погоджують заходи.

## Ролі й документи

- **Посадова особа компанії, відповідальна за охорону (CSO)** — на березі; організовує оцінку охорони судна, розробляє план і домагається його схвалення, організовує перевірки й тримає зв'язок із суднами.
- **Особа командного складу, відповідальна за охорону судна (SSO)** — на борту, підпорядковується капітанові; виконує й підтримує план, регулярно оглядає судно, навчає екіпаж, проводить тренування, повідомляє про інциденти й стежить за справністю засобів охорони. Часто це старпом; його свідоцтво — правило VI/5 ПДНВ.
- **Посадова особа портового засобу (PFSO)** — на березі, для кожного портового засобу; колега SSO в порту.
- **Оцінка охорони судна (SSA)** — дослідження вразливостей судна, яке CSO робить до того, як пишуть план.
- **План охорони судна (SSP)** — схвалений прапором і зберігається на борту. У ньому — контроль доступу, зони обмеженого доступу, обробка вантажів і постачання, спостереження, дії в разі загроз і порушень та система охоронного оповіщення. Частина плану конфіденційна: інспекторові портового контролю її показують лише за згодою прапора.
- **Міжнародне свідоцтво про охорону судна (ISSC)** — чинне до п'яти років, з проміжною перевіркою; тимчасове свідоцтво видають на строк до шести місяців.
- **Декларація про охорону (DoS)** — домовленість між судном і портовим засобом чи іншим судном про те, яких заходів охорони вживає кожна сторона. Її оформлюють, коли рівень судна вищий, ніж у портового засобу чи іншого судна, коли одна зі сторін не підпадає під кодекс, після загрози чи інциденту, коли цього вимагає влада або коли про це просить будь-яка зі сторін.

## Система охоронного оповіщення судна

**SSAS** — прихована тривога, якої вимагає розділ XI-2 SOLAS. Після увімкнення вона надсилає на берег сигнал — органу, який призначив прапор, зазвичай разом із компанією, — з даними про судно, його місцезнаходженням і повідомленням, що охорона судна під загрозою. Вона не звучить на борту й не оповіщає інші судна, щоб той, хто загрожує судну, не дізнався, що тривогу подано. Увімкнути її можна з містка й щонайменше ще з одного місця, і ці місця знають лише ті, кому належить. Її перевіряють за планом, а про перевірку заздалегідь попереджають одержувачів, щоб її не сприйняли за справжню тривогу.

## Вахта біля трапа й контроль доступу

На рівні 1 план зазвичай вимагає:

- перевіряти особу **кожного**, хто піднімається на борт, і мету візиту — зокрема агентів, сюрвеєрів, шипчандлерів, змінний екіпаж, лоцманів і представників влади;
- вести журнал відвідувачів з іменами, організаціями, часом прибуття й відходу та видавати перепустки;
- оглядати людей, багаж і транспорт в обсязі, який задає план, а на вищих рівнях — більше;
- тримати замкненими чи під охороною зони обмеженого доступу — місток, машинне відділення, румпельне відділення, пост керування вантажними операціями та інші;
- спостерігати за палубою й водою навколо судна, особливо вночі;
- звіряти постачання й вантаж із документами й перед відходом оглядати судно на наявність безквиткових пасажирів.

На рівні 2 ці заходи посилюються — менше точок доступу, більше оглядів, супровід відвідувачів, додаткові обходи. На рівні 3 доступ можуть обмежити лише уповноваженими особами, і судно виконує вказівки влади.

## Тренування, навчання й підготовка

- **Тренування з охорони** — не рідше ніж раз на три місяці, а також протягом тижня, якщо змінилося понад чверть екіпажу на людей, які не брали участі в тренуванні на цьому судні за останні три місяці.
- **Навчання з охорони** — з CSO, портовими засобами й владою — не рідше ніж раз на календарний рік і не більше 18 місяців між ними.
- **Підготовка:** ознайомлення з питаннями охорони для кожного моряка й підготовка для тих, хто має призначені обов'язки з охорони (правило VI/6 ПДНВ); у SSO — свідоцтво за правилом VI/5.
- **Записи** на борту: підготовка, тренування й навчання, загрози й інциденти, порушення, зміни рівня охорони, зв'язок з питань охорони судна, внутрішні перевірки, обслуговування засобів охорони й декларації про охорону.

У районах високого піратського ризику компанії додають до заходів плану охорони галузеві рекомендації Best Management Practices — цитадель, загородження, вахти й повідомлення до регіональних центрів.

## Що питають на співбесіді

- **Старпоми й капітани:** три рівні й хто їх встановлює; що робити, якщо рівень порту вищий за рівень судна; коли потрібна декларація про охорону; що робить SSAS і чому вона беззвучна; обов'язки SSO; інтервали тренувань і навчань; що інспектор портового контролю може й не може бачити в плані.
- **Молодші помічники:** порядок біля трапа; зони обмеженого доступу; огляд судна на безквиткових пасажирів перед відходом; що робити, якщо знайдено невідомий предмет.
- **Рядовий склад:** перевірка документів біля трапа й журнал відвідувачів; хто може піднятися без перевірки (ніхто); як повідомити про підозріле вахтовому помічникові чи SSO.

## Типові помилки

1. Пропустити на борт людину без перевірки документів, бо вона «схожа на агента» чи поспішає. Перевіряють усіх і завжди.
2. Залишати зони обмеженого доступу відчиненими в порту — двері машинного відділення підперті для вентиляції, місток не замкнений.
3. Розповідати стороннім, де кнопки SSAS, чи показувати їм план. Конфіденційні частини закриті для всіх, кому не потрібно їх знати.
4. Викладати в соцмережі фото й графік судна. Маршрути, вантажі й списки екіпажу — інформація, якою може скористатися хтось інший.
5. Пропустити огляд на безквиткових пасажирів перед відходом, бо стоянка була короткою. Безквитковий пасажир, знайдений у морі, стає проблемою судна на тижні.
6. Плутати SSAS із сигналом лиха. Сигнал лиха кличе на допомогу всіх; SSAS попереджає берег і мовчить на борту.

## Перевір себе

?? Які три рівні охорони й хто їх встановлює?
=> Рівень 1 — звичайний, 2 — підвищений, 3 — винятковий. Рівень судна встановлює прапор, портового засобу — держава порту.
?? Портовий засіб на рівні 2, а ваше судно на рівні 1. Ваші дії?
=> Підвищити рівень судна до 2 до входу в порт або до будь-якої взаємодії з портовим засобом і повідомити PFSO.
?? Що таке декларація про охорону й коли її оформлюють?
=> Домовленість між судном і портовим засобом (або іншим судном) про заходи охорони кожної сторони. Її оформлюють, коли рівень судна вищий, ніж в іншої сторони, коли одна сторона не підпадає під кодекс, після загрози чи інциденту, коли вимагає влада або коли про це просить будь-яка сторона.
?? Що робить SSAS?
=> Надсилає прихований сигнал на берег — органу, призначеному прапором, зазвичай разом із компанією, — з даними про судно та його місцезнаходженням. На борту тривога не звучить, інші судна її не отримують.
?? Як часто проводять тренування з охорони?
=> Не рідше ніж раз на три місяці, а також протягом тижня, якщо понад 25% екіпажу не брали участі в тренуваннях на цьому судні.
?? Хто може піднятися на борт без перевірки документів на рівні 1?
=> Ніхто. Перевіряють особу й мету візиту кожного, хто піднімається на борт.

## Кому на борту це потрібно

Усім, хто несе вахту в порту, — [матросу AB](/ua/jobs/rank/able-seaman) і [матросу OS](/ua/jobs/rank/ordinary-seaman) біля трапа, [боцману](/ua/jobs/rank/bosun), який розставляє вахту, — і насамперед [старпому](/ua/jobs/rank/chief-officer), який зазвичай і є SSO, та [капітану](/ua/jobs/rank/master). [Другий](/ua/jobs/rank/2nd-officer) і [третій помічник](/ua/jobs/rank/3rd-officer) — вахтові помічники, яким доповідає вахта біля трапа. Свідоцтва з охорони — правила VI/5 і VI/6 ПДНВ, див. [ПДНВ простими словами](/ua/handbook/pdnv-stcw-prostimi-slovami-pravila-ii-1-vi-6-stazh-pidtverdzhennya-diplomiv-i-go-09ed56ce-402e-40a5-9885-180e01f44c8f); правова основа — розділ XI-2 SOLAS, див. [SOLAS простими словами](/ua/handbook/solas-prostimi-slovami-navchannya-ryatuvalni-zasobi-ta-pitannya-na-spivbesidi-2cbdb6d6-b0fa-498a-9c32-68bd9b95e096).

Впишіть свідоцтва з охорони — VI/6, а для помічників і VI/5 — з датами в [резюме моряка](/ua/maritime-cv).

*Джерело: Міжнародний кодекс з охорони суден і портових засобів (ОСПЗ) і розділ XI-2 SOLAS. Подробиці того, що робить ваше судно, — у його плані охорони; на борту діють план і вказівки SSO. Ця сторінка — посібник для підготовки, а не юридичний текст.*$ua$,
    'pl', $pl$Kodeks ISPS to powód, dla którego przy trapie zawsze stoi wachtowy z książką odwiedzin, drzwi mostka i maszynowni są w porcie zamknięte, a na statku jest oficer ochrony i plan, którego większość załogi nigdy nie widzi w całości. Wszedł w życie w 2004 roku, po zamachach z 2001 roku, i dziś obejmuje każdy statek towarowy od 500 GT w podróży międzynarodowej i każdy statek pasażerski. Oficerów pyta się o niego na rozmowie, a załoga szeregowa spotyka go codziennie na wachcie przy trapie. Tutaj znajdziesz, jak działa kodeks, poziomy ochrony, role i dokumenty, co naprawdę musi robić wachta przy trapie, błędy, przez które na statek wchodzi niewłaściwa osoba, oraz pytania do sprawdzenia się.

:: **W skrócie**
:: - Kodeks ISPS (Międzynarodowy kodeks ochrony statku i obiektu portowego) obowiązuje od 1 lipca 2004 roku na mocy rozdziału XI-2 SOLAS.
:: - Trzy poziomy ochrony: 1 — normalny, 2 — podwyższony, 3 — wyjątkowy. Poziom statku ustala bandera, poziom obiektu portowego — państwo portu.
:: - Każdy statek ma oficera ochrony statku (SSO), każdy armator — oficera ochrony armatora (CSO), każdy obiekt portowy — PFSO.
:: - System alarmowania o zagrożeniu ochrony statku (SSAS) wysyła na ląd cichy alarm — na statku nic nie dzwoni, a inne statki go nie odbierają.

## Czym jest Kodeks ISPS

Po zamachach z 11 września 2001 roku IMO przeanalizowała, jak statek może stać się celem, bronią albo sposobem nielegalnego przemieszczania ludzi i towarów. W grudniu 2002 roku konferencja dyplomatyczna dodała do SOLAS rozdział XI-2 i przyjęła Kodeks ISPS; oba weszły w życie 1 lipca 2004 roku. Część A kodeksu jest obowiązkowa; część B to wytyczne, choć wiele państw stosuje znaczną jej część jak obowiązkową.

Kodeks obejmuje statki pasażerskie, w tym szybkie, w podróżach międzynarodowych; statki towarowe, w tym szybkie, od 500 GT w podróżach międzynarodowych; przewoźne platformy wiertnicze; oraz obiekty portowe, które je obsługują. Jego podejście to zarządzanie ryzykiem: ocenić zagrożenie, zaplanować środki, ustalić poziom, ćwiczyć.

Obok niego rozdział XI-1 nadaje każdemu statkowi numer IMO i zapis ciągłej historii statku — nazwy, bandery, właściciele i zarządcy — przechowywany na statku.

## Najważniejsze liczby

!! 3 | poziomy ochrony: normalny, podwyższony, wyjątkowy
!! 2004 | Kodeks ISPS wszedł w życie (1 lipca)
!! 3 miesiące | najdłuższy odstęp między ćwiczeniami z ochrony
!! 18 miesięcy | najdłuższy odstęp między ćwiczeniami całościowymi (corocznymi)
!! 2 | miejsca uruchomienia SSAS co najmniej: mostek i jeszcze jedno
!! 500 GT | statki towarowe w podróżach międzynarodowych od tej wielkości są objęte kodeksem

## Trzy poziomy ochrony

- **Poziom 1 — normalny:** minimalne środki ochrony utrzymywane przez cały czas.
- **Poziom 2 — podwyższony:** dodatkowe środki na pewien czas, bo wzrosło ryzyko incydentu.
- **Poziom 3 — wyjątkowy:** dalsze szczególne środki na ograniczony czas, gdy incydent jest prawdopodobny lub nieuchronny, nawet jeśli nie da się wskazać konkretnego celu. Polecenia mogą przychodzić bezpośrednio od władz.

Poziom dla swoich statków ustala państwo bandery, dla obiektów portowych — państwo portu. Przed wejściem do portu statek porównuje poziomy: jeśli poziom portu jest wyższy, statek podnosi swój do tego samego; jeśli poziom statku jest wyższy, nie obniża go, a strony uzgadniają środki.

## Role i dokumenty

- **Oficer ochrony armatora (CSO)** — na lądzie; organizuje ocenę stanu ochrony statku, opracowuje plan i doprowadza do jego zatwierdzenia, organizuje audyty i utrzymuje kontakt ze statkami.
- **Oficer ochrony statku (SSO)** — na statku, podlega kapitanowi; wdraża i utrzymuje plan, regularnie przegląda statek, szkoli załogę, prowadzi ćwiczenia, zgłasza incydenty i dba o sprawność urządzeń ochrony. Często to starszy oficer; jego świadectwo to prawidło VI/5 STCW.
- **Oficer ochrony obiektu portowego (PFSO)** — na lądzie, dla każdego obiektu portowego; odpowiednik SSO w porcie.
- **Ocena stanu ochrony statku (SSA)** — analiza słabych punktów statku, którą CSO wykonuje przed napisaniem planu.
- **Plan ochrony statku (SSP)** — zatwierdzony przez banderę i przechowywany na statku. Obejmuje kontrolę dostępu, strefy o ograniczonym dostępie, obsługę ładunku i zaopatrzenia, monitorowanie, reakcję na zagrożenia i naruszenia oraz system alarmowania. Część planu jest poufna: inspektorowi państwa portu pokazuje się ją tylko za zgodą bandery.
- **Międzynarodowy certyfikat ochrony statku (ISSC)** — ważny do pięciu lat, z weryfikacją pośrednią; certyfikat tymczasowy wydaje się na okres do sześciu miesięcy.
- **Deklaracja ochrony (DoS)** — uzgodnienie między statkiem a obiektem portowym albo innym statkiem, jakie środki ochrony podejmuje każda strona. Sporządza się ją, gdy statek ma wyższy poziom niż obiekt portowy lub drugi statek, gdy jedna ze stron nie jest objęta kodeksem, po zagrożeniu lub incydencie, gdy wymagają tego władze albo gdy prosi o to którakolwiek ze stron.

## System alarmowania o zagrożeniu ochrony statku

**SSAS** to ukryty alarm wymagany przez rozdział XI-2 SOLAS. Po uruchomieniu wysyła na ląd sygnał — do organu wyznaczonego przez banderę, zwykle łącznie z armatorem — z danymi statku, jego pozycją i informacją, że ochrona statku jest zagrożona. Nie dzwoni na statku i nie alarmuje innych statków, żeby ten, kto zagraża statkowi, nie wiedział, że alarm poszedł. Można go uruchomić z mostka i co najmniej z jeszcze jednego miejsca, a te miejsca znają tylko osoby, które muszą je znać. Testuje się go zgodnie z planem, a o teście uprzedza się odbiorców, żeby nie wzięli go za prawdziwy alarm.

## Wachta przy trapie i kontrola dostępu

Na poziomie 1 plan zwykle wymaga:

- sprawdzania tożsamości **każdego**, kto wchodzi na statek, i celu wizyty — także agentów, inspektorów, shipchandlerów, zmieniającej się załogi, pilotów i przedstawicieli władz;
- prowadzenia książki odwiedzin z nazwiskami, firmami, godzinami wejścia i wyjścia oraz wydawania przepustek;
- przeszukiwania osób, bagażu i pojazdów w zakresie ustalonym w planie, a na wyższych poziomach — szerzej;
- utrzymywania zamkniętych lub pilnowanych stref o ograniczonym dostępie — mostka, maszynowni, pomieszczenia maszyny sterowej, centrali ładunkowej i innych;
- obserwowania pokładu i wody wokół statku, zwłaszcza w nocy;
- sprawdzania zaopatrzenia i ładunku z dokumentami i przeszukania statku pod kątem pasażerów na gapę przed wyjściem z portu.

Na poziomie 2 środki się zaostrza — mniej punktów dostępu, więcej przeszukań, eskorta odwiedzających, dodatkowe obchody. Na poziomie 3 dostęp może zostać ograniczony wyłącznie do osób upoważnionych, a statek wykonuje polecenia władz.

## Ćwiczenia i szkolenia

- **Ćwiczenia z ochrony** — co najmniej raz na trzy miesiące, a także w ciągu tygodnia, jeśli wymieniono ponad jedną czwartą załogi na osoby, które nie brały udziału w ćwiczeniu na tym statku w ostatnich trzech miesiącach.
- **Ćwiczenia całościowe** — z CSO, obiektami portowymi i władzami — co najmniej raz w roku kalendarzowym i nie rzadziej niż co 18 miesięcy.
- **Szkolenia:** świadomość ochrony dla każdego marynarza i szkolenie dla osób z wyznaczonymi obowiązkami ochrony (prawidło VI/6 STCW); SSO ma świadectwo według prawidła VI/5.
- **Zapisy** na statku: szkolenia, ćwiczenia, zagrożenia i incydenty, naruszenia, zmiany poziomu ochrony, łączność w sprawach ochrony statku, audyty wewnętrzne, obsługa urządzeń ochrony i deklaracje ochrony.

W rejonach wysokiego ryzyka piractwa armatorzy dodają do środków planu ochrony branżowe zalecenia Best Management Practices — cytadelę, zapory, wachty i zgłoszenia do ośrodków regionalnych.

## O co pytają na rozmowie

- **Starsi oficerowie i kapitanowie:** trzy poziomy i kto je ustala; co zrobić, gdy poziom portu jest wyższy niż poziom statku; kiedy potrzebna jest deklaracja ochrony; co robi SSAS i dlaczego jest cichy; obowiązki SSO; odstępy między ćwiczeniami; co inspektor państwa portu może, a czego nie może zobaczyć w planie.
- **Młodsi oficerowie:** procedury przy trapie; strefy o ograniczonym dostępie; przeszukanie statku pod kątem pasażerów na gapę przed wyjściem; co zrobić po znalezieniu niezidentyfikowanego przedmiotu.
- **Załoga szeregowa:** sprawdzanie dokumentów przy trapie i książka odwiedzin; kto może wejść bez kontroli (nikt); jak zgłosić coś podejrzanego oficerowi wachtowemu lub SSO.

## Typowe błędy

1. Wpuszczenie kogoś bez sprawdzenia dokumentów, bo „wygląda na agenta” albo się spieszy. Sprawdza się wszystkich i zawsze.
2. Zostawianie stref o ograniczonym dostępie otwartych w porcie — drzwi maszynowni podparte dla wentylacji, mostek niezamknięty.
3. Mówienie obcym, gdzie są przyciski SSAS, albo pokazywanie im planu. Poufne części są zamknięte dla wszystkich, którzy nie muszą ich znać.
4. Publikowanie w mediach społecznościowych zdjęć i harmonogramu statku. Trasy, ładunki i listy załogi to informacje, z których może skorzystać ktoś inny.
5. Pominięcie przeszukania pod kątem pasażerów na gapę, bo postój był krótki. Pasażer na gapę znaleziony na morzu staje się problemem statku na tygodnie.
6. Mylenie SSAS z alarmem o niebezpieczeństwie. Alarm o niebezpieczeństwie wzywa pomocy od wszystkich; SSAS ostrzega ląd i milczy na statku.

## Sprawdź się

?? Jakie są trzy poziomy ochrony i kto je ustala?
=> Poziom 1 — normalny, 2 — podwyższony, 3 — wyjątkowy. Poziom statku ustala bandera, obiektu portowego — państwo portu.
?? Obiekt portowy jest na poziomie 2, a twój statek na poziomie 1. Co robisz?
=> Podnoszę poziom statku do 2 przed wejściem do portu lub przed jakąkolwiek współpracą z obiektem portowym i informuję PFSO.
?? Czym jest deklaracja ochrony i kiedy się ją sporządza?
=> Uzgodnieniem między statkiem a obiektem portowym (albo innym statkiem) co do środków ochrony każdej strony. Sporządza się ją, gdy statek ma wyższy poziom niż druga strona, gdy jedna strona nie jest objęta kodeksem, po zagrożeniu lub incydencie, gdy wymagają tego władze albo gdy prosi o to którakolwiek strona.
?? Co robi SSAS?
=> Wysyła ukryty sygnał na ląd — do organu wyznaczonego przez banderę, zwykle łącznie z armatorem — z danymi statku i jego pozycją. Na statku alarm nie dzwoni, a inne statki go nie odbierają.
?? Jak często przeprowadza się ćwiczenia z ochrony?
=> Co najmniej raz na trzy miesiące, a także w ciągu tygodnia, jeśli ponad 25% załogi nie brało udziału w ćwiczeniach na tym statku.
?? Kto może wejść na statek bez kontroli dokumentów na poziomie 1?
=> Nikt. Sprawdza się tożsamość i cel wizyty każdego, kto wchodzi na statek.

## Komu na statku to potrzebne

Wszystkim, którzy pełnią wachtę w porcie — [starszemu marynarzowi AB](/pl/jobs/rank/able-seaman) i [marynarzowi OS](/pl/jobs/rank/ordinary-seaman) przy trapie, [bosmanowi](/pl/jobs/rank/bosun), który ustawia wachtę — a przede wszystkim [starszemu oficerowi](/pl/jobs/rank/chief-officer), który zwykle jest SSO, i [kapitanowi](/pl/jobs/rank/master). [Drugi](/pl/jobs/rank/2nd-officer) i [trzeci oficer](/pl/jobs/rank/3rd-officer) to oficerowie wachtowi, którym melduje wachta przy trapie. Świadectwa z ochrony to prawidła VI/5 i VI/6 STCW, zobacz [STCW w prostych słowach](/pl/handbook/stcw-w-prostych-slowach-prawidla-ii-1-vi-6-staz-odnowienie-dyplomow-i-godziny-od-09ed56ce-402e-40a5-9885-180e01f44c8f); podstawa prawna to rozdział XI-2 SOLAS, zobacz [SOLAS w prostych słowach](/pl/handbook/solas-w-prostych-slowach-cwiczenia-srodki-ratunkowe-i-pytania-na-rozmowie-2cbdb6d6-b0fa-498a-9c32-68bd9b95e096).

Wpisz świadectwa z ochrony — VI/6, a oficerowie także VI/5 — z datami do [CV marynarza](/pl/maritime-cv).

*Źródło: Międzynarodowy kodeks ochrony statku i obiektu portowego (ISPS) i rozdział XI-2 SOLAS. Szczegóły tego, co robi twój statek, są w jego planie ochrony; na statku obowiązują plan i polecenia SSO. Ta strona to pomoc do nauki, a nie tekst prawny.*$pl$),
  'ISPS', 'handbook',
  'linear-gradient(135deg,#0e2a45,#a9491f)',
  true, '2026-10-09 16:30:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'ISPS Code in plain words: security levels, the SSO, the gangway watch and interview questions');

-- ── Covers ───────────────────────────────────────────────────────────────────
UPDATE news_articles SET cover_url = v.url FROM (VALUES
 ('ISM Code in plain words: the safety management system, the DPA, non-conformities and interview questions', 'https://seajobs.pro/handbook/ism.png?v=1'),
 ('ISPS Code in plain words: security levels, the SSO, the gangway watch and interview questions', 'https://seajobs.pro/handbook/isps.png?v=1')
) AS v(t, url)
WHERE news_articles.title->>'en' = v.t AND coalesce(news_articles.cover_url, '') = '';
