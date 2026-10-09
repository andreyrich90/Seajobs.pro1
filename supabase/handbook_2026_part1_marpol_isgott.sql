-- The seafarer's handbook (category = 'handbook', served under /handbook):
-- MARPOL and ISGOTT, written around what interviews and CES tests ask. Uses
-- the "::" summary box, "!!" key-number cards and "??"/"=>" self-check blocks
-- of lib/markdown.tsx.
--
-- Facts: MARPOL 73/78 (in force 2 October 1983) — Annex I regs 14/15/17/34
-- (15 ppm en route through oil filtering equipment with alarm and automatic
-- stop; tanker cargo area > 50 nm, 30 l/nm, 1/30,000; ORB codes A–I, kept
-- 3 years), Annex IV reg 11 (3 nm / 12 nm at 4 knots / approved plant),
-- Annex V as revised in force 2013 with the 2018 categories A–K (food waste
-- 3 nm comminuted to 25 mm / 12 nm; special areas; 500 m from platforms;
-- GRB kept 2 years), Annex VI reg 14 (0.50% since 2020, 0.10% in ECAs, the
-- Mediterranean ECA effective 1 May 2025, carriage ban), reg 13 (Tier III
-- from 2016 / 2021), BDN 3 years and sample 12 months. ISGOTT 6th edition
-- (OCIMF/ICS/IAPH, 2020): flammable range ~1–10%, ~11% O2, purge below 2%
-- HC, entry 21% O2 / 1% LFL / 50% OEL, 1 m/s initial rate (max 7 m/s),
-- 30-minute settling, insulating flange instead of a bonding cable, checklist
-- codes R/A/P; SOLAS II-2/4.5.5 (5% delivered, 8% in tanks, 8,000 DWT for
-- new tankers). No salary figures.
--
-- en + ru + ua + pl. Covers are set at the end — run after the deploy that
-- adds public/handbook/{marpol,isgott}.png.
-- Idempotent — guarded by the English title.

-- ── H1. MARPOL ────────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'MARPOL in plain words: the six annexes, the key numbers and interview questions',
    'ru', 'MARPOL простыми словами: шесть приложений, ключевые цифры и вопросы на собеседовании',
    'ua', 'MARPOL простими словами: шість додатків, ключові цифри та питання на співбесіді',
    'pl', 'MARPOL w prostych słowach: sześć załączników, kluczowe liczby i pytania na rozmowie'),
  jsonb_build_object(
    'en', $en$MARPOL is the convention behind the oily water separator, the colour-coded garbage bins and the fuel changeover before an emission control area. Every seafarer works under it every day, and almost every crewing interview for an engine or deck post touches it. This page gives the six annexes, the numbers that are asked most often, the mistakes that get ships detained and seafarers prosecuted, and a set of questions to test yourself before the interview.

:: **In short**
:: - MARPOL 73/78 is the IMO convention against pollution from ships. Six annexes: oil, noxious liquids, packaged goods, sewage, garbage, air.
:: - The numbers asked most: 15 ppm, 3 and 12 nautical miles, 0.50% and 0.10% sulphur.
:: - Plastics never go overboard — anywhere, in any form.
:: - Record books are evidence: the Oil Record Book is kept for 3 years, the Garbage Record Book for 2.

## What MARPOL is

The International Convention for the Prevention of Pollution from Ships was adopted at IMO in 1973. It did not come into force on its own: after a series of tanker accidents a Protocol was added in 1978, and the two texts work as one instrument, in force since 2 October 1983 — hence "MARPOL 73/78". It applies to ships flying the flag of a party, and port state control checks it in the ports of every party, whatever the flag.

The convention itself is short; the substance is in six annexes. Each annex has its own certificate, its own record book or plan, and its own list of special areas where the rules are stricter.

## The six annexes

1. **Annex I — Oil.** Oily water from machinery spaces, cargo residues on tankers, the Oil Record Book, SOPEP and the IOPP Certificate. In force since 1983.
2. **Annex II — Noxious liquid substances in bulk.** Chemical tankers: cargoes are graded X, Y, Z and OS by hazard; Cargo Record Book and the P&A Manual.
3. **Annex III — Harmful substances in packaged form.** Packing, marking, labelling and documents — in practice through the IMDG Code.
4. **Annex IV — Sewage.** Treatment plant, holding tank, distances from land; the ISPP Certificate.
5. **Annex V — Garbage.** A general ban on discharge with narrow exceptions, placards, a Garbage Management Plan and the Garbage Record Book.
6. **Annex VI — Air pollution.** Sulphur in fuel, NOx from engines, ozone-depleting substances and energy efficiency (EEXI, CII); the IAPP and IEE Certificates.

## Key numbers

!! 15 ppm | oil in water: the most a machinery-space discharge may contain
!! 50 nm | from land: the minimum for a tanker's cargo-area discharge
!! 30 l/nm | the highest instantaneous oil discharge rate for a tanker
!! 3 / 12 nm | comminuted / unground food waste, outside special areas
!! 0.50% | the global sulphur limit in fuel since 1 January 2020
!! 0.10% | the sulphur limit inside emission control areas (ECA)

## Annex I: what the engine room must know

Bilge water from machinery spaces may go overboard only when all of these hold at once: the ship is en route; the oil content of the effluent is 15 ppm or less without dilution; it passes through approved oil filtering equipment — the oily water separator with a 15 ppm alarm and an automatic stopping device; and on a tanker it does not come from the cargo pump-room bilges and is not mixed with cargo residues. In the Antarctic area nothing may be discharged at all. Whatever cannot go overboard — sludge, oily residues — is burnt in the incinerator or delivered ashore, and every movement is recorded.

The **Oil Record Book Part I** covers machinery-space operations and is carried by every ship of 400 GT and above and every oil tanker of 150 GT and above; **Part II** covers cargo and ballast operations and is carried by tankers only. Entries are made under code letters A to I — for example C for collecting and disposing of oil residues (sludge), D for non-automatic discharge or disposal of bilge water, H for bunkering. The officer in charge of the operation signs each entry, the master signs each completed page, and the book stays on board for three years after the last entry.

On tankers the cargo-area rules are different. Outside special areas oily water from cargo tanks may be discharged only more than 50 nautical miles from the nearest land, en route, at no more than 30 litres of oil per nautical mile, with the total not exceeding 1/30,000 of the last cargo for tankers built after 1979, and with the oil discharge monitoring system (ODME) and slop tanks in use. Inside special areas — nothing. Annex I special areas are the Mediterranean, Baltic, Black and Red Seas, the Gulfs area, the Gulf of Aden, North West European waters, the Oman area of the Arabian Sea, Southern South African waters and the Antarctic.

> A "magic pipe" — a hose or a spool piece that bypasses the separator — is the classic way seafarers end up in court. In the United States such cases end in multi-million fines for the company and criminal charges for the chief engineer and for anyone who signed false entries. "I was ordered to" is not a defence. The right move is to refuse and report — to the master, the company's DPA or the flag state.

## Annex V: what everyone on board must know

Since 2013 Annex V works as a general prohibition: anything not expressly permitted is forbidden. Never overboard: plastics of any kind (synthetic ropes, fishing nets, garbage bags and the ash from burning them included), cooking oil, incinerator ash, domestic and operational waste, electronic waste.

What is permitted outside special areas, with the ship en route and as far from land as practicable:

- food waste comminuted to 25 mm or less — at least 3 nautical miles from land; unground food waste — at least 12 miles;
- cargo residues that are not harmful to the marine environment — at least 12 miles;
- animal carcasses — as far from land as possible.

Inside the Annex V special areas — the Mediterranean, Baltic, Black and Red Seas, the Gulfs area, the North Sea, the Antarctic and the Wider Caribbean — only comminuted food waste may go, and only at 12 miles or more, plus some narrow cases for cargo residues. Within 500 metres of an offshore platform nothing may go except comminuted food waste, and only when the platform is more than 12 miles from land. When garbage of different kinds is mixed, the stricter rule applies to the whole lot.

The **Garbage Record Book** sorts garbage into categories: A plastics, B food waste, C domestic waste, D cooking oil, E incinerator ash, F operational waste, G animal carcasses, H fishing gear, I e-waste, J cargo residues not harmful to the marine environment, K cargo residues that are harmful. Every discharge, incineration and delivery ashore gets a line: date, time, position, category, estimated volume, signature. The book is kept for two years. Ships of 12 metres and longer display placards; ships of 100 GT and above, or certified to carry 15 persons or more, carry a Garbage Management Plan.

## Annexes IV and VI in brief

**Sewage.** Effluent from an approved treatment plant may be discharged anywhere, provided it leaves no visible floating solids and does not discolour the water. Comminuted and disinfected sewage — at least 3 miles from land. Untreated sewage from a holding tank — at least 12 miles, en route at 4 knots or more and at a moderate rate. The Baltic is a special area with strict rules for passenger ships.

**Air.** Sulphur in fuel is limited to 0.50% worldwide and 0.10% in emission control areas: the Baltic, the North Sea, the North American and US Caribbean areas, and since 1 May 2025 the Mediterranean. A ship without a scrubber may not even carry non-compliant fuel for its own use. Before entering an ECA the ship changes over to compliant fuel by a written procedure, and the time, position and quantity in each tank are logged. The bunker delivery note stays on board for three years, the MARPOL fuel sample for at least twelve months. NOx Tier III applies in NOx emission control areas to engines on newer ships — from 2016 in North America and the US Caribbean, from 2021 in the North and Baltic Seas.

## Certificates and documents port state control asks for

- the IOPP Certificate (Annex I) with its Supplement — Form A for ships other than tankers, Form B for tankers;
- the NLS Certificate (Annex II) on chemical tankers;
- the ISPP Certificate (Annex IV), the IAPP and IEE Certificates (Annex VI), an EIAPP Certificate for each diesel engine over 130 kW;
- the Oil Record Book Parts I and II, the Cargo Record Book, the Garbage Record Book, the ozone-depleting substances record book, the fuel changeover log;
- SOPEP (or SMPEP on ships carrying noxious liquids) on the bridge with an up-to-date contact list, and the pollution-response locker on deck;
- the Garbage Management Plan and the placards.

Most certificates are issued for up to five years and endorsed at annual and intermediate surveys.

## What they ask at the interview

The questions depend on the rank, but these come up again and again:

- **Engine ratings and junior engineers:** how the separator works and what happens when the 15 ppm alarm goes off (the automatic stopping device stops the discharge overboard — usually a three-way valve returns the water to the bilge tank); how you sound the bilge and sludge tanks; who makes entries in the Oil Record Book.
- **Chief and second engineers:** ORB codes; the sludge balance — what was generated, what was burnt and what went ashore, which port state control compares with the receipts and the incinerator's capacity; the ECA changeover; the ODS record book; what an inspector checks in the engine room.
- **Deck officers:** garbage rules and special areas, what goes into the Garbage Record Book, what is in SOPEP and how the drill runs; on tankers — the cargo-area discharge criteria and the ODME.
- **Everyone:** "What will you do if you see a bypass around the separator?" The only right answer: stop, report it to the master and the company's DPA, and refuse to sign a false entry.

## Common mistakes

1. Taking 15 ppm to mean "pump anywhere". The ship must be en route, the equipment approved and working, and the Antarctic is closed entirely.
2. "Biodegradable" bags overboard. Plastic is plastic: the ban has no exceptions by type.
3. Food waste close to the coast, or unground in a special area.
4. Correction fluid or torn-out pages in a record book. Strike a wrong entry through with one line, write the correct one and sign it. Missing pages and figures that do not match the tank soundings are the first thing an inspector looks for.
5. Signing an entry for an operation you did not do or did not see.
6. No changeover record at the ECA boundary — time, position and tank quantities have to be there.

## Test yourself

?? What is the maximum oil content for discharging machinery-space bilge water?
=> 15 ppm, without dilution, through approved oil filtering equipment with an alarm and an automatic stopping device, with the ship en route.
?? May comminuted food waste go overboard in the Mediterranean?
=> Yes — if it is ground to 25 mm or less, at least 12 nautical miles from land, with the ship en route. Unground food waste may not.
?? How long is the Oil Record Book kept on board? And the Garbage Record Book?
=> Three years after the last entry for the ORB, two years for the Garbage Record Book.
?? What is the sulphur limit in fuel outside and inside an ECA?
=> 0.50% by mass outside, 0.10% inside emission control areas.
?? Which annex covers sewage, and which covers air pollution?
=> Annex IV covers sewage, Annex VI air pollution.
?? Under which Garbage Record Book category is used cooking oil entered?
=> Category D.

## Who on board needs this

Everyone — but the engine room most of all: [chief engineers](/jobs/rank/chief-engineer), [second engineers](/jobs/rank/2nd-engineer), [third engineers](/jobs/rank/3rd-engineer), [motormen](/jobs/rank/motorman) and [oilers](/jobs/rank/oiler). On [tankers](/jobs/vessel/tanker) and [chemical tankers](/jobs/vessel/chemical-tanker) the deck officers who run the cargo need Annexes I and II in detail — first of all the [chief officer](/jobs/rank/chief-officer).

Put the environmental training and the engine-room experience into your [maritime CV](/maritime-cv): crewing managers look for both.

*Source: MARPOL 73/78, consolidated edition, with the amendments in force at the time of writing. The discharge rules carry conditions not listed here; on board the ship's own plans and the current text of the convention prevail. This page is a study aid, not a legal text.*$en$,
    'ru', $ru$MARPOL — это конвенция, из-за которой на судне стоит сепаратор льяльных вод, мусор раскладывают по цветным бакам, а перед районом контроля выбросов переходят на другое топливо. Моряк работает по ней каждый день, и почти на любом собеседовании в крюинге на машинную или палубную должность о ней спросят. Здесь — шесть приложений, цифры, которые спрашивают чаще всего, ошибки, из-за которых суда задерживают, а моряков судят, и вопросы для самопроверки перед собеседованием.

:: **Коротко**
:: - MARPOL 73/78 — конвенция ИМО о предотвращении загрязнения с судов. Шесть приложений: нефть, вредные жидкие вещества, упакованные грузы, сточные воды, мусор, воздух.
:: - Чаще всего спрашивают: 15 ppm, 3 и 12 морских миль, 0,50% и 0,10% серы.
:: - Пластик за борт нельзя никогда — ни в каком районе и ни в каком виде.
:: - Журналы — это доказательство: журнал нефтяных операций хранят 3 года, журнал операций с мусором — 2.

## Что такое MARPOL

Международную конвенцию по предотвращению загрязнения с судов приняли в ИМО в 1973 году. Сама по себе она так и не вступила в силу: после серии аварий танкеров в 1978 году к ней добавили Протокол, и оба текста работают как один документ — в силе со 2 октября 1983 года. Отсюда и «MARPOL 73/78». Конвенция действует для судов под флагом государств-участников, а портовый контроль проверяет её в портах любого участника, независимо от флага.

Сам текст конвенции короткий, всё главное — в шести приложениях. У каждого приложения свой сертификат, свой журнал или план и свой список особых районов, где правила строже.

## Шесть приложений

1. **Приложение I — нефть.** Нефтесодержащие воды из машинного отделения, остатки груза на танкерах, журнал нефтяных операций (Oil Record Book), SOPEP и свидетельство IOPP. В силе с 1983 года.
2. **Приложение II — вредные жидкие вещества наливом.** Химовозы: грузы делят на категории X, Y, Z и OS по степени опасности; журнал грузовых операций (Cargo Record Book) и руководство P&A Manual.
3. **Приложение III — вредные вещества в упаковке.** Упаковка, маркировка, этикетки и документы — на практике через Кодекс IMDG.
4. **Приложение IV — сточные воды.** Установка очистки, сборный танк, расстояния от берега; свидетельство ISPP.
5. **Приложение V — мусор.** Общий запрет сброса с узкими исключениями, плакаты, план управления мусором и журнал операций с мусором (Garbage Record Book).
6. **Приложение VI — загрязнение воздуха.** Сера в топливе, NOx от двигателей, озоноразрушающие вещества и энергоэффективность (EEXI, CII); свидетельства IAPP и IEE.

## Главные цифры

!! 15 ppm | нефти в воде — максимум при сбросе из машинного отделения
!! 50 миль | от берега — минимум для сброса из грузовой зоны танкера
!! 30 л/милю | наибольшая мгновенная интенсивность сброса нефти с танкера
!! 3 / 12 миль | измельчённые / неизмельчённые пищевые отходы вне особых районов
!! 0,50% | мировой лимит серы в топливе с 1 января 2020 года
!! 0,10% | лимит серы в районах контроля выбросов (ECA)

## Приложение I: что должна знать машинная команда

Льяльные воды из машинного отделения можно сбрасывать за борт только при выполнении всех условий сразу: судно на ходу; содержание нефти в стоке — не больше 15 ppm без разбавления; сток идёт через одобренное фильтрующее оборудование — сепаратор с сигнализатором 15 ppm и устройством автоматической остановки сброса; на танкере вода не из льял грузового насосного отделения и не смешана с остатками груза. В районе Антарктики сбрасывать нельзя ничего. Всё, что за борт не идёт, — шлам и нефтеостатки — сжигают в инсинераторе или сдают на берег, и каждое перемещение записывают.

**Журнал нефтяных операций, часть I** — операции в машинном отделении. Его ведут все суда от 400 GT и все нефтяные танкеры от 150 GT. **Часть II** — грузовые и балластные операции, только на танкерах. Записи делают по кодам от A до I: например, C — сбор и удаление нефтеостатков (шлама), D — неавтоматический сброс или удаление льяльных вод, H — бункеровка. Каждую запись подписывает лицо командного состава, отвечающее за операцию, каждую заполненную страницу — капитан. Журнал хранят на борту три года после последней записи.

У танкеров для грузовой зоны правила другие. Вне особых районов нефтесодержащую воду из грузовых танков можно сбрасывать только дальше 50 морских миль от ближайшего берега, на ходу, не больше 30 литров нефти на милю, а всего — не более 1/30 000 последнего груза для танкеров постройки после 1979 года; система автоматического замера и контроля сброса (ODME) и отстойные танки должны работать. В особых районах — ничего. Особые районы Приложения I: Средиземное, Балтийское, Чёрное и Красное моря, район Заливов, Аденский залив, северо-западные европейские воды, Оманский район Аравийского моря, южные воды Южной Африки и Антарктика.

> «Волшебная труба» — шланг или вставка в обход сепаратора — классический путь моряка в суд. В США такие дела заканчиваются многомиллионными штрафами для компании и уголовными обвинениями для стармеха и всех, кто подписал ложные записи. «Мне приказали» — не оправдание. Правильно — отказаться и сообщить: капитану, назначенному лицу компании (DPA) или флагу.

## Приложение V: что должен знать каждый на борту

С 2013 года Приложение V работает как общий запрет: всё, что прямо не разрешено, запрещено. За борт никогда: пластик в любом виде (включая синтетические тросы, сети, мешки для мусора и золу от их сжигания), отработанное кулинарное масло, зола инсинератора, бытовые и эксплуатационные отходы, электроника.

Что разрешено вне особых районов — на ходу и как можно дальше от берега:

- пищевые отходы, измельчённые до 25 мм и меньше, — не ближе 3 миль от берега; неизмельчённые — не ближе 12 миль;
- остатки груза, не вредные для морской среды, — не ближе 12 миль;
- туши животных — как можно дальше от берега.

В особых районах Приложения V — Средиземное, Балтийское, Чёрное и Красное моря, район Заливов, Северное море, Антарктика и Большой Карибский район — можно сбрасывать только измельчённые пищевые отходы и только дальше 12 миль, плюс несколько узких случаев для остатков груза. В пределах 500 метров от морской платформы нельзя ничего, кроме измельчённых пищевых отходов, и то если платформа дальше 12 миль от берега. Если мусор разных видов смешан, ко всей партии применяют самое строгое правило.

**Журнал операций с мусором** делит мусор на категории: A — пластик, B — пищевые отходы, C — бытовые отходы, D — кулинарное масло, E — зола инсинератора, F — эксплуатационные отходы, G — туши животных, H — орудия лова, I — электронные отходы, J — остатки груза, не вредные для морской среды, K — вредные остатки груза. Каждый сброс, сжигание и сдача на берег — отдельная строка: дата, время, координаты, категория, примерный объём, подпись. Журнал хранят два года. На судах длиной от 12 метров висят плакаты, на судах от 100 GT или с разрешённым числом людей на борту от 15 должен быть план управления мусором.

## Приложения IV и VI коротко

**Сточные воды.** Сток из одобренной установки очистки можно сбрасывать где угодно, если он не оставляет видимых плавающих частиц и не меняет цвет воды. Измельчённые и обеззараженные — не ближе 3 миль от берега. Неочищенные из сборного танка — не ближе 12 миль, на ходу со скоростью не меньше 4 узлов и с умеренной интенсивностью. Балтика — особый район со строгими правилами для пассажирских судов.

**Воздух.** Сера в топливе ограничена 0,50% по всему миру и 0,10% в районах контроля выбросов: на Балтике, в Северном море, в Северо-Американском районе и районе Карибского моря США, а с 1 мая 2025 года — в Средиземном море. Судну без скруббера запрещено даже иметь на борту несоответствующее топливо для собственного использования. Перед входом в ECA переходят на соответствующее топливо по письменной процедуре и записывают время, координаты и количество в каждом танке. Бункерную накладную хранят три года, пробу топлива MARPOL — не меньше двенадцати месяцев. Требования NOx Tier III в районах контроля выбросов NOx действуют для двигателей на более новых судах: с 2016 года в Северной Америке и Карибском районе США, с 2021 года в Северном и Балтийском морях.

## Сертификаты и документы, которые спросит портовый контроль

- свидетельство IOPP (Приложение I) с дополнением — форма A для нетанкеров, форма B для танкеров;
- свидетельство NLS (Приложение II) на химовозах;
- свидетельство ISPP (Приложение IV), свидетельства IAPP и IEE (Приложение VI), свидетельство EIAPP на каждый дизель мощнее 130 кВт;
- журнал нефтяных операций части I и II, журнал грузовых операций, журнал операций с мусором, журнал озоноразрушающих веществ, журнал перехода на другое топливо;
- SOPEP (или SMPEP на судах с вредными жидкими веществами) на мостике с актуальным списком контактов и рундук с оборудованием для ликвидации разливов на палубе;
- план управления мусором и плакаты.

Большинство свидетельств выдают на срок до пяти лет и подтверждают на ежегодных и промежуточных освидетельствованиях.

## Что спрашивают на собеседовании

Вопросы зависят от должности, но эти звучат снова и снова:

- **Машинная команда и младшие механики:** как работает сепаратор и что происходит, когда срабатывает сигнализатор 15 ppm (устройство автоматической остановки прекращает сброс за борт — обычно трёхходовой клапан возвращает воду в льяльный танк); как замеряют льяльный и шламовый танки; кто делает записи в журнал нефтяных операций.
- **Стармех и второй механик:** коды журнала; баланс шлама — сколько образовалось, сколько сожгли и сколько сдали, а портовый контроль сверяет это с квитанциями и производительностью инсинератора; переход на топливо для ECA; журнал озоноразрушающих веществ; что инспектор смотрит в машинном отделении.
- **Палубные помощники:** правила по мусору и особые районы, что пишут в журнал операций с мусором, что входит в SOPEP и как проходит учение; на танкерах — критерии сброса из грузовой зоны и ODME.
- **Все:** «Что вы сделаете, если увидите обход сепаратора?» Единственный правильный ответ: остановить, доложить капитану и DPA компании и отказаться подписывать ложную запись.

## Частые ошибки

1. Понимать 15 ppm как «качай где хочешь». Судно должно быть на ходу, оборудование — одобренным и исправным, а Антарктика закрыта полностью.
2. «Биоразлагаемые» пакеты за борт. Пластик есть пластик: исключений по виду нет.
3. Пищевые отходы у самого берега или неизмельчёнными в особом районе.
4. Корректор или вырванные листы в журнале. Ошибочную запись зачёркивают одной линией, пишут правильную и подписывают. Недостающие страницы и цифры, которые не сходятся с замерами танков, инспектор ищет первыми.
5. Подпись под записью об операции, которую вы не делали и не видели.
6. Нет записи о переходе на другое топливо на границе ECA — время, координаты и количество по танкам должны быть.

## Проверь себя

?? Какое максимальное содержание нефти при сбросе льяльных вод из машинного отделения?
=> 15 ppm без разбавления, через одобренное фильтрующее оборудование с сигнализатором и устройством автоматической остановки, судно на ходу.
?? Можно ли сбрасывать измельчённые пищевые отходы в Средиземном море?
=> Да — если они измельчены до 25 мм и меньше, не ближе 12 морских миль от берега и судно на ходу. Неизмельчённые — нельзя.
?? Сколько хранят на борту журнал нефтяных операций? А журнал операций с мусором?
=> Журнал нефтяных операций — три года после последней записи, журнал операций с мусором — два года.
?? Какой лимит серы в топливе вне ECA и внутри?
=> 0,50% по массе вне районов и 0,10% в районах контроля выбросов.
?? Какое приложение про сточные воды, а какое про загрязнение воздуха?
=> Сточные воды — Приложение IV, воздух — Приложение VI.
?? По какой категории в журнал операций с мусором записывают отработанное кулинарное масло?
=> Категория D.

## Кому на борту это нужно

Всем — но в первую очередь машинной команде: [старшим механикам](/ru/jobs/rank/chief-engineer), [вторым механикам](/ru/jobs/rank/2nd-engineer), [третьим механикам](/ru/jobs/rank/3rd-engineer), [мотористам](/ru/jobs/rank/motorman) и [ойлерам](/ru/jobs/rank/oiler). На [танкерах](/ru/jobs/vessel/tanker) и [химовозах](/ru/jobs/vessel/chemical-tanker) палубным помощникам, которые ведут грузовые операции, Приложения I и II нужны в деталях — прежде всего [старпому](/ru/jobs/rank/chief-officer).

Экологическую подготовку и опыт в машинном отделении впишите в [резюме моряка](/ru/maritime-cv): крюинг смотрит на то и другое.

*Источник: MARPOL 73/78, сводное издание, с поправками, действующими на момент написания. У правил сброса есть условия, не перечисленные здесь; на борту действуют судовые планы и актуальный текст конвенции. Эта страница — пособие для подготовки, а не юридический текст.*$ru$,
    'ua', $ua$MARPOL — це конвенція, через яку на судні стоїть сепаратор лляльних вод, сміття розкладають по кольорових баках, а перед районом контролю викидів переходять на інше паливо. Моряк працює за нею щодня, і майже на кожній співбесіді в крюїнгу на машинну чи палубну посаду про неї запитають. Тут — шість додатків, цифри, про які питають найчастіше, помилки, через які судна затримують, а моряків судять, і питання для самоперевірки перед співбесідою.

:: **Коротко**
:: - MARPOL 73/78 — конвенція ІМО про запобігання забрудненню з суден. Шість додатків: нафта, шкідливі рідкі речовини, упаковані вантажі, стічні води, сміття, повітря.
:: - Найчастіше питають: 15 ppm, 3 і 12 морських миль, 0,50% і 0,10% сірки.
:: - Пластик за борт не можна ніколи — у жодному районі й у жодному вигляді.
:: - Журнали — це доказ: журнал нафтових операцій зберігають 3 роки, журнал операцій зі сміттям — 2.

## Що таке MARPOL

Міжнародну конвенцію із запобігання забрудненню з суден ухвалили в ІМО у 1973 році. Сама по собі вона так і не набула чинності: після низки аварій танкерів у 1978 році до неї додали Протокол, і обидва тексти працюють як один документ — чинний з 2 жовтня 1983 року. Звідси й «MARPOL 73/78». Конвенція діє для суден під прапором держав-учасниць, а портовий контроль перевіряє її в портах будь-якої учасниці, незалежно від прапора.

Сам текст конвенції короткий, усе головне — у шести додатках. Кожен додаток має свій сертифікат, свій журнал або план і свій перелік особливих районів, де правила суворіші.

## Шість додатків

1. **Додаток I — нафта.** Нафтовмісні води з машинного відділення, залишки вантажу на танкерах, журнал нафтових операцій (Oil Record Book), SOPEP і свідоцтво IOPP. Чинний з 1983 року.
2. **Додаток II — шкідливі рідкі речовини наливом.** Хімовози: вантажі поділяють на категорії X, Y, Z і OS за ступенем небезпеки; журнал вантажних операцій (Cargo Record Book) і посібник P&A Manual.
3. **Додаток III — шкідливі речовини в упаковці.** Пакування, маркування, етикетки й документи — на практиці через Кодекс IMDG.
4. **Додаток IV — стічні води.** Установка очищення, збірний танк, відстані від берега; свідоцтво ISPP.
5. **Додаток V — сміття.** Загальна заборона скидання з вузькими винятками, плакати, план управління сміттям і журнал операцій зі сміттям (Garbage Record Book).
6. **Додаток VI — забруднення повітря.** Сірка в паливі, NOx від двигунів, озоноруйнівні речовини та енергоефективність (EEXI, CII); свідоцтва IAPP та IEE.

## Головні цифри

!! 15 ppm | нафти у воді — максимум при скиданні з машинного відділення
!! 50 миль | від берега — мінімум для скидання з вантажної зони танкера
!! 30 л/милю | найбільша миттєва інтенсивність скидання нафти з танкера
!! 3 / 12 миль | подрібнені / неподрібнені харчові відходи поза особливими районами
!! 0,50% | світовий ліміт сірки в паливі з 1 січня 2020 року
!! 0,10% | ліміт сірки в районах контролю викидів (ECA)

## Додаток I: що має знати машинна команда

Лляльні води з машинного відділення можна скидати за борт лише тоді, коли виконано всі умови одночасно: судно на ходу; вміст нафти в стоці — не більше 15 ppm без розведення; стік іде через схвалене фільтрувальне обладнання — сепаратор із сигналізатором 15 ppm і пристроєм автоматичної зупинки скидання; на танкері вода не з льял вантажного насосного відділення й не змішана із залишками вантажу. В районі Антарктики скидати не можна нічого. Усе, що за борт не йде, — шлам і нафтозалишки — спалюють в інсинераторі або здають на берег, і кожне переміщення записують.

**Журнал нафтових операцій, частина I** — операції в машинному відділенні. Його ведуть усі судна від 400 GT і всі нафтові танкери від 150 GT. **Частина II** — вантажні та баластні операції, лише на танкерах. Записи роблять за кодами від A до I: наприклад, C — збирання та видалення нафтозалишків (шламу), D — неавтоматичне скидання або видалення лляльних вод, H — бункерування. Кожен запис підписує особа командного складу, відповідальна за операцію, кожну заповнену сторінку — капітан. Журнал зберігають на борту три роки після останнього запису.

У танкерів для вантажної зони правила інші. Поза особливими районами нафтовмісну воду з вантажних танків можна скидати лише далі ніж 50 морських миль від найближчого берега, на ходу, не більше 30 літрів нафти на милю, а загалом — не більше 1/30 000 останнього вантажу для танкерів, збудованих після 1979 року; система автоматичного вимірювання й контролю скидання (ODME) і відстійні танки мають працювати. В особливих районах — нічого. Особливі райони Додатка I: Середземне, Балтійське, Чорне й Червоне моря, район Заток, Аденська затока, північно-західні європейські води, Оманський район Аравійського моря, південні води Південної Африки та Антарктика.

> «Чарівна труба» — шланг або вставка в обхід сепаратора — класичний шлях моряка до суду. У США такі справи закінчуються багатомільйонними штрафами для компанії та кримінальними обвинуваченнями для старшого механіка й усіх, хто підписав неправдиві записи. «Мені наказали» — не виправдання. Правильно — відмовитися й повідомити: капітану, призначеній особі компанії (DPA) або прапору.

## Додаток V: що має знати кожен на борту

З 2013 року Додаток V працює як загальна заборона: усе, що прямо не дозволено, заборонено. За борт ніколи: пластик у будь-якому вигляді (зокрема синтетичні троси, сітки, мішки для сміття та попіл від їх спалювання), відпрацьована кулінарна олія, попіл інсинератора, побутові й експлуатаційні відходи, електроніка.

Що дозволено поза особливими районами — на ходу й якомога далі від берега:

- харчові відходи, подрібнені до 25 мм і менше, — не ближче 3 миль від берега; неподрібнені — не ближче 12 миль;
- залишки вантажу, не шкідливі для морського середовища, — не ближче 12 миль;
- туші тварин — якомога далі від берега.

В особливих районах Додатка V — Середземне, Балтійське, Чорне й Червоне моря, район Заток, Північне море, Антарктика та Великий Карибський район — можна скидати лише подрібнені харчові відходи й лише далі 12 миль, плюс кілька вузьких випадків для залишків вантажу. У межах 500 метрів від морської платформи не можна нічого, крім подрібнених харчових відходів, і то якщо платформа далі 12 миль від берега. Якщо сміття різних видів змішане, до всієї партії застосовують найсуворіше правило.

**Журнал операцій зі сміттям** поділяє сміття на категорії: A — пластик, B — харчові відходи, C — побутові відходи, D — кулінарна олія, E — попіл інсинератора, F — експлуатаційні відходи, G — туші тварин, H — знаряддя лову, I — електронні відходи, J — залишки вантажу, не шкідливі для морського середовища, K — шкідливі залишки вантажу. Кожне скидання, спалювання та здача на берег — окремий рядок: дата, час, координати, категорія, орієнтовний обсяг, підпис. Журнал зберігають два роки. На суднах завдовжки від 12 метрів висять плакати, на суднах від 100 GT або з дозволеною кількістю людей на борту від 15 має бути план управління сміттям.

## Додатки IV і VI коротко

**Стічні води.** Стік зі схваленої установки очищення можна скидати будь-де, якщо він не залишає видимих плавучих частинок і не змінює колір води. Подрібнені й знезаражені — не ближче 3 миль від берега. Неочищені зі збірного танка — не ближче 12 миль, на ходу зі швидкістю не менше 4 вузлів і з помірною інтенсивністю. Балтика — особливий район із суворими правилами для пасажирських суден.

**Повітря.** Сірку в паливі обмежено 0,50% по всьому світу й 0,10% у районах контролю викидів: на Балтиці, у Північному морі, у Північноамериканському районі та районі Карибського моря США, а з 1 травня 2025 року — у Середземному морі. Судну без скрубера заборонено навіть мати на борту невідповідне паливо для власного використання. Перед входом в ECA переходять на відповідне паливо за письмовою процедурою й записують час, координати та кількість у кожному танку. Бункерну накладну зберігають три роки, пробу палива MARPOL — не менше дванадцяти місяців. Вимоги NOx Tier III у районах контролю викидів NOx діють для двигунів на новіших суднах: з 2016 року в Північній Америці та Карибському районі США, з 2021 року в Північному й Балтійському морях.

## Сертифікати й документи, які запитає портовий контроль

- свідоцтво IOPP (Додаток I) з додатком — форма A для нетанкерів, форма B для танкерів;
- свідоцтво NLS (Додаток II) на хімовозах;
- свідоцтво ISPP (Додаток IV), свідоцтва IAPP та IEE (Додаток VI), свідоцтво EIAPP на кожен дизель потужністю понад 130 кВт;
- журнал нафтових операцій частини I та II, журнал вантажних операцій, журнал операцій зі сміттям, журнал озоноруйнівних речовин, журнал переходу на інше паливо;
- SOPEP (або SMPEP на суднах зі шкідливими рідкими речовинами) на містку з актуальним списком контактів і рундук з обладнанням для ліквідації розливів на палубі;
- план управління сміттям і плакати.

Більшість свідоцтв видають на строк до п'яти років і підтверджують на щорічних і проміжних оглядах.

## Що питають на співбесіді

Питання залежать від посади, але ці звучать знову й знову:

- **Машинна команда й молодші механіки:** як працює сепаратор і що стається, коли спрацьовує сигналізатор 15 ppm (пристрій автоматичної зупинки припиняє скидання за борт — зазвичай триходовий клапан повертає воду в лляльний танк); як заміряють лляльний і шламовий танки; хто робить записи в журнал нафтових операцій.
- **Старший і другий механік:** коди журналу; баланс шламу — скільки утворилося, скільки спалили й скільки здали, а портовий контроль звіряє це з квитанціями та продуктивністю інсинератора; перехід на паливо для ECA; журнал озоноруйнівних речовин; що інспектор дивиться в машинному відділенні.
- **Палубні помічники:** правила щодо сміття й особливі райони, що пишуть у журнал операцій зі сміттям, що входить до SOPEP і як проходить навчання; на танкерах — критерії скидання з вантажної зони та ODME.
- **Усі:** «Що ви зробите, якщо побачите обхід сепаратора?» Єдина правильна відповідь: зупинити, доповісти капітану й DPA компанії та відмовитися підписувати неправдивий запис.

## Типові помилки

1. Розуміти 15 ppm як «качай де хочеш». Судно має бути на ходу, обладнання — схваленим і справним, а Антарктика закрита повністю.
2. «Біорозкладні» пакети за борт. Пластик є пластик: винятків за видом немає.
3. Харчові відходи біля самого берега або неподрібнені в особливому районі.
4. Коректор чи вирвані аркуші в журналі. Помилковий запис закреслюють однією лінією, пишуть правильний і підписують. Відсутні сторінки та цифри, що не сходяться із замірами танків, інспектор шукає першими.
5. Підпис під записом про операцію, яку ви не робили й не бачили.
6. Немає запису про перехід на інше паливо на межі ECA — час, координати й кількість по танках мають бути.

## Перевір себе

?? Який максимальний вміст нафти при скиданні лляльних вод з машинного відділення?
=> 15 ppm без розведення, через схвалене фільтрувальне обладнання із сигналізатором і пристроєм автоматичної зупинки, судно на ходу.
?? Чи можна скидати подрібнені харчові відходи в Середземному морі?
=> Так — якщо вони подрібнені до 25 мм і менше, не ближче 12 морських миль від берега й судно на ходу. Неподрібнені — не можна.
?? Скільки зберігають на борту журнал нафтових операцій? А журнал операцій зі сміттям?
=> Журнал нафтових операцій — три роки після останнього запису, журнал операцій зі сміттям — два роки.
?? Який ліміт сірки в паливі поза ECA і всередині?
=> 0,50% за масою поза районами й 0,10% у районах контролю викидів.
?? Який додаток про стічні води, а який про забруднення повітря?
=> Стічні води — Додаток IV, повітря — Додаток VI.
?? За якою категорією в журнал операцій зі сміттям записують відпрацьовану кулінарну олію?
=> Категорія D.

## Кому на борту це потрібно

Усім — але насамперед машинній команді: [старшим механікам](/ua/jobs/rank/chief-engineer), [другим механікам](/ua/jobs/rank/2nd-engineer), [третім механікам](/ua/jobs/rank/3rd-engineer), [мотористам](/ua/jobs/rank/motorman) та [ойлерам](/ua/jobs/rank/oiler). На [танкерах](/ua/jobs/vessel/tanker) і [хімовозах](/ua/jobs/vessel/chemical-tanker) палубним помічникам, які ведуть вантажні операції, Додатки I та II потрібні в деталях — передусім [старпому](/ua/jobs/rank/chief-officer).

Екологічну підготовку й досвід у машинному відділенні впишіть у [резюме моряка](/ua/maritime-cv): крюїнг дивиться і на те, і на інше.

*Джерело: MARPOL 73/78, зведене видання, з поправками, чинними на момент написання. Правила скидання мають умови, не перелічені тут; на борту діють суднові плани й актуальний текст конвенції. Ця сторінка — посібник для підготовки, а не юридичний текст.*$ua$,
    'pl', $pl$MARPOL to konwencja, przez którą na statku stoi separator wód zęzowych, śmieci trafiają do kolorowych pojemników, a przed obszarem kontroli emisji przechodzi się na inne paliwo. Marynarz pracuje według niej codziennie i niemal na każdej rozmowie w agencji crewingowej na stanowisko w maszynowni lub na pokładzie padnie o nią pytanie. Tutaj znajdziesz sześć załączników, liczby, o które pytają najczęściej, błędy, przez które statki są zatrzymywane, a marynarze stają przed sądem, oraz pytania do sprawdzenia się przed rozmową.

:: **W skrócie**
:: - MARPOL 73/78 to konwencja IMO o zapobieganiu zanieczyszczaniu morza przez statki. Sześć załączników: ropa, szkodliwe substancje ciekłe, ładunki w opakowaniach, ścieki, śmieci, powietrze.
:: - Najczęściej pytają o: 15 ppm, 3 i 12 mil morskich, 0,50% i 0,10% siarki.
:: - Plastik nigdy nie idzie za burtę — w żadnym rejonie i w żadnej postaci.
:: - Dzienniki są dowodem: dziennik operacji olejowych przechowuje się 3 lata, dziennik operacji ze śmieciami — 2.

## Czym jest MARPOL

Międzynarodową konwencję o zapobieganiu zanieczyszczaniu morza przez statki przyjęto w IMO w 1973 roku. Sama nie weszła w życie: po serii katastrof tankowców w 1978 roku dodano do niej Protokół i oba teksty działają jako jeden dokument — obowiązujący od 2 października 1983 roku. Stąd „MARPOL 73/78”. Konwencja obowiązuje statki pod banderą państw-stron, a inspekcja państwa portu sprawdza ją w portach każdej strony, niezależnie od bandery.

Sam tekst konwencji jest krótki — wszystko, co ważne, jest w sześciu załącznikach. Każdy ma własne świadectwo, własny dziennik lub plan i własną listę obszarów specjalnych, gdzie zasady są ostrzejsze.

## Sześć załączników

1. **Załącznik I — ropa.** Wody zaolejone z maszynowni, pozostałości ładunku na tankowcach, dziennik operacji olejowych (Oil Record Book), SOPEP i świadectwo IOPP. Obowiązuje od 1983 roku.
2. **Załącznik II — szkodliwe substancje ciekłe przewożone luzem.** Chemikaliowce: ładunki dzieli się na kategorie X, Y, Z i OS według zagrożenia; dziennik ładunkowy (Cargo Record Book) i podręcznik P&A Manual.
3. **Załącznik III — substancje szkodliwe w opakowaniach.** Pakowanie, oznakowanie, etykiety i dokumenty — w praktyce przez Kodeks IMDG.
4. **Załącznik IV — ścieki.** Oczyszczalnia, zbiornik ścieków, odległości od lądu; świadectwo ISPP.
5. **Załącznik V — śmieci.** Ogólny zakaz zrzutu z wąskimi wyjątkami, tablice informacyjne, plan postępowania ze śmieciami i dziennik operacji ze śmieciami (Garbage Record Book).
6. **Załącznik VI — zanieczyszczenie powietrza.** Siarka w paliwie, NOx z silników, substancje zubożające warstwę ozonową i efektywność energetyczna (EEXI, CII); świadectwa IAPP i IEE.

## Najważniejsze liczby

!! 15 ppm | oleju w wodzie — maksimum przy zrzucie z maszynowni
!! 50 Mm | od lądu — minimum przy zrzucie z rejonu ładunkowego tankowca
!! 30 l/Mm | największa chwilowa intensywność zrzutu oleju z tankowca
!! 3 / 12 Mm | rozdrobnione / nierozdrobnione odpady żywnościowe poza obszarami specjalnymi
!! 0,50% | światowy limit siarki w paliwie od 1 stycznia 2020 roku
!! 0,10% | limit siarki w obszarach kontroli emisji (ECA)

## Załącznik I: co musi wiedzieć maszynownia

Wody zęzowe z maszynowni wolno zrzucać za burtę tylko wtedy, gdy wszystkie warunki są spełnione jednocześnie: statek jest w drodze; zawartość oleju w ścieku nie przekracza 15 ppm bez rozcieńczania; ściek przechodzi przez zatwierdzone urządzenia filtrujące — separator z alarmem 15 ppm i urządzeniem automatycznie zatrzymującym zrzut; na tankowcu woda nie pochodzi z zęz przepompowni ładunkowej i nie jest zmieszana z pozostałościami ładunku. W obszarze Antarktyki nie wolno zrzucać niczego. Wszystko, co nie idzie za burtę — szlam i pozostałości olejowe — spala się w spalarce albo zdaje na ląd, a każdą operację się zapisuje.

**Dziennik operacji olejowych, część I** obejmuje operacje w maszynowni. Prowadzą go wszystkie statki od 400 GT i wszystkie tankowce olejowe od 150 GT. **Część II** to operacje ładunkowe i balastowe — tylko na tankowcach. Wpisy robi się według kodów od A do I: na przykład C — zbieranie i usuwanie pozostałości olejowych (szlamu), D — nieautomatyczny zrzut lub usuwanie wód zęzowych, H — bunkrowanie. Każdy wpis podpisuje oficer odpowiedzialny za operację, każdą zapełnioną stronę — kapitan. Dziennik przechowuje się na statku trzy lata od ostatniego wpisu.

Na tankowcach dla rejonu ładunkowego obowiązują inne zasady. Poza obszarami specjalnymi zaolejoną wodę ze zbiorników ładunkowych wolno zrzucać tylko dalej niż 50 mil morskich od najbliższego lądu, w drodze, nie więcej niż 30 litrów oleju na milę, a łącznie nie więcej niż 1/30 000 ostatniego ładunku w przypadku tankowców zbudowanych po 1979 roku; system monitorowania i kontroli zrzutu (ODME) i zbiorniki osadowe muszą działać. W obszarach specjalnych — nic. Obszary specjalne Załącznika I to Morze Śródziemne, Bałtyk, Morze Czarne i Czerwone, rejon Zatok, Zatoka Adeńska, wody północno-zachodniej Europy, rejon Omanu na Morzu Arabskim, wody południowej Afryki Południowej i Antarktyka.

> „Magiczna rura” — wąż albo wstawka omijająca separator — to klasyczna droga marynarza do sądu. W Stanach Zjednoczonych takie sprawy kończą się wielomilionowymi karami dla armatora i zarzutami karnymi dla starszego mechanika oraz każdego, kto podpisał fałszywe wpisy. „Kazano mi” nie jest usprawiedliwieniem. Właściwie jest odmówić i zgłosić: kapitanowi, osobie wyznaczonej armatora (DPA) albo administracji bandery.

## Załącznik V: co musi wiedzieć każdy na statku

Od 2013 roku Załącznik V działa jako ogólny zakaz: wszystko, czego wprost nie dozwolono, jest zabronione. Nigdy za burtę: plastik w każdej postaci (w tym liny syntetyczne, sieci, worki na śmieci i popiół z ich spalania), zużyty olej spożywczy, popiół ze spalarki, odpady bytowe i eksploatacyjne, elektronika.

Co wolno poza obszarami specjalnymi — w drodze i jak najdalej od lądu:

- odpady żywnościowe rozdrobnione do 25 mm lub mniej — nie bliżej niż 3 mile od lądu; nierozdrobnione — nie bliżej niż 12 mil;
- pozostałości ładunku nieszkodliwe dla środowiska morskiego — nie bliżej niż 12 mil;
- padłe zwierzęta — jak najdalej od lądu.

W obszarach specjalnych Załącznika V — Morze Śródziemne, Bałtyk, Morze Czarne i Czerwone, rejon Zatok, Morze Północne, Antarktyka i Wielki Region Karaibski — wolno zrzucać tylko rozdrobnione odpady żywnościowe i tylko dalej niż 12 mil, plus kilka wąskich przypadków dla pozostałości ładunku. W promieniu 500 metrów od platformy morskiej nie wolno nic poza rozdrobnionymi odpadami żywnościowymi, i to tylko gdy platforma jest dalej niż 12 mil od lądu. Jeśli śmieci różnych rodzajów są zmieszane, do całości stosuje się najostrzejszą zasadę.

**Dziennik operacji ze śmieciami** dzieli śmieci na kategorie: A — plastik, B — odpady żywnościowe, C — odpady bytowe, D — olej spożywczy, E — popiół ze spalarki, F — odpady eksploatacyjne, G — padłe zwierzęta, H — narzędzia połowowe, I — odpady elektroniczne, J — pozostałości ładunku nieszkodliwe dla środowiska morskiego, K — szkodliwe pozostałości ładunku. Każdy zrzut, spalenie i zdanie na ląd to osobny wiersz: data, godzina, pozycja, kategoria, szacowana objętość, podpis. Dziennik przechowuje się dwa lata. Na statkach o długości od 12 metrów wiszą tablice informacyjne, a statki od 100 GT lub z uprawnieniem do przewozu co najmniej 15 osób muszą mieć plan postępowania ze śmieciami.

## Załączniki IV i VI w skrócie

**Ścieki.** Ściek z zatwierdzonej oczyszczalni wolno zrzucać wszędzie, jeśli nie zostawia widocznych pływających zanieczyszczeń i nie zmienia barwy wody. Rozdrobnione i zdezynfekowane — nie bliżej niż 3 mile od lądu. Nieoczyszczone ze zbiornika — nie bliżej niż 12 mil, w drodze z prędkością co najmniej 4 węzłów i z umiarkowaną intensywnością. Bałtyk to obszar specjalny z ostrymi zasadami dla statków pasażerskich.

**Powietrze.** Siarkę w paliwie ograniczono do 0,50% na całym świecie i do 0,10% w obszarach kontroli emisji: na Bałtyku, Morzu Północnym, w obszarze Ameryki Północnej i obszarze Morza Karaibskiego USA, a od 1 maja 2025 roku na Morzu Śródziemnym. Statek bez scrubbera nie może nawet mieć na pokładzie niezgodnego paliwa do własnego użytku. Przed wejściem do ECA przechodzi się na zgodne paliwo według pisemnej procedury i zapisuje godzinę, pozycję oraz ilość w każdym zbiorniku. Kwit bunkrowy przechowuje się trzy lata, próbkę paliwa MARPOL — co najmniej dwanaście miesięcy. Wymagania NOx Tier III w obszarach kontroli emisji NOx dotyczą silników na nowszych statkach: od 2016 roku w Ameryce Północnej i na Karaibach USA, od 2021 roku na Morzu Północnym i Bałtyku.

## Świadectwa i dokumenty, o które zapyta inspekcja państwa portu

- świadectwo IOPP (Załącznik I) z suplementem — formularz A dla statków innych niż tankowce, formularz B dla tankowców;
- świadectwo NLS (Załącznik II) na chemikaliowcach;
- świadectwo ISPP (Załącznik IV), świadectwa IAPP i IEE (Załącznik VI), świadectwo EIAPP dla każdego silnika wysokoprężnego powyżej 130 kW;
- dziennik operacji olejowych części I i II, dziennik ładunkowy, dziennik operacji ze śmieciami, dziennik substancji zubożających warstwę ozonową, zapis zmiany paliwa;
- SOPEP (lub SMPEP na statkach ze szkodliwymi substancjami ciekłymi) na mostku z aktualną listą kontaktów oraz skrzynia ze sprzętem do zwalczania rozlewów na pokładzie;
- plan postępowania ze śmieciami i tablice informacyjne.

Większość świadectw wydaje się na okres do pięciu lat i potwierdza na przeglądach corocznych i pośrednich.

## O co pytają na rozmowie

Pytania zależą od stanowiska, ale te wracają ciągle:

- **Załoga maszynowni i młodsi mechanicy:** jak działa separator i co się dzieje, gdy zadziała alarm 15 ppm (urządzenie automatycznie zatrzymuje zrzut za burtę — zwykle zawór trójdrogowy kieruje wodę z powrotem do zbiornika zęzowego); jak mierzy się zbiornik zęzowy i szlamowy; kto robi wpisy w dzienniku operacji olejowych.
- **Starszy i drugi mechanik:** kody dziennika; bilans szlamu — ile powstało, ile spalono i ile zdano, a inspekcja porównuje to z pokwitowaniami i wydajnością spalarki; zmiana paliwa przed ECA; dziennik substancji zubożających ozon; co inspektor sprawdza w maszynowni.
- **Oficerowie pokładowi:** zasady dotyczące śmieci i obszary specjalne, co wpisuje się do dziennika operacji ze śmieciami, co zawiera SOPEP i jak przebiega ćwiczenie; na tankowcach — kryteria zrzutu z rejonu ładunkowego i ODME.
- **Wszyscy:** „Co zrobisz, gdy zobaczysz obejście separatora?” Jedyna dobra odpowiedź: zatrzymać, zgłosić kapitanowi i DPA armatora i odmówić podpisania fałszywego wpisu.

## Typowe błędy

1. Rozumienie 15 ppm jako „pompuj gdzie chcesz”. Statek musi być w drodze, sprzęt zatwierdzony i sprawny, a Antarktyka jest zamknięta całkowicie.
2. „Biodegradowalne” worki za burtę. Plastik to plastik: zakaz nie ma wyjątków według rodzaju.
3. Odpady żywnościowe tuż przy brzegu albo nierozdrobnione w obszarze specjalnym.
4. Korektor lub wyrwane kartki w dzienniku. Błędny wpis skreśla się jedną linią, pisze poprawny i podpisuje. Brakujące strony i liczby niezgodne z pomiarami zbiorników inspektor sprawdza w pierwszej kolejności.
5. Podpis pod wpisem o operacji, której nie wykonywałeś i nie widziałeś.
6. Brak zapisu zmiany paliwa na granicy ECA — godzina, pozycja i ilości w zbiornikach muszą być.

## Sprawdź się

?? Jaka jest maksymalna zawartość oleju przy zrzucie wód zęzowych z maszynowni?
=> 15 ppm bez rozcieńczania, przez zatwierdzone urządzenia filtrujące z alarmem i urządzeniem automatycznie zatrzymującym zrzut, statek w drodze.
?? Czy wolno zrzucać rozdrobnione odpady żywnościowe na Morzu Śródziemnym?
=> Tak — jeśli są rozdrobnione do 25 mm lub mniej, nie bliżej niż 12 mil morskich od lądu i statek jest w drodze. Nierozdrobnionych — nie.
?? Jak długo przechowuje się na statku dziennik operacji olejowych? A dziennik operacji ze śmieciami?
=> Dziennik operacji olejowych — trzy lata od ostatniego wpisu, dziennik operacji ze śmieciami — dwa lata.
?? Jaki jest limit siarki w paliwie poza ECA i wewnątrz?
=> 0,50% masowo poza obszarami i 0,10% w obszarach kontroli emisji.
?? Który załącznik dotyczy ścieków, a który zanieczyszczenia powietrza?
=> Ścieki — Załącznik IV, powietrze — Załącznik VI.
?? Pod jaką kategorią wpisuje się do dziennika operacji ze śmieciami zużyty olej spożywczy?
=> Kategoria D.

## Komu na statku to potrzebne

Wszystkim — ale przede wszystkim maszynowni: [starszym mechanikom](/pl/jobs/rank/chief-engineer), [drugim mechanikom](/pl/jobs/rank/2nd-engineer), [trzecim mechanikom](/pl/jobs/rank/3rd-engineer), [motorzystom](/pl/jobs/rank/motorman) i [olejarzom](/pl/jobs/rank/oiler). Na [tankowcach](/pl/jobs/vessel/tanker) i [chemikaliowcach](/pl/jobs/vessel/chemical-tanker) oficerowie pokładowi prowadzący operacje ładunkowe muszą znać Załączniki I i II szczegółowo — przede wszystkim [starszy oficer](/pl/jobs/rank/chief-officer).

Szkolenia środowiskowe i doświadczenie z maszynowni wpisz do [CV marynarza](/pl/maritime-cv): agencje crewingowe patrzą na jedno i drugie.

*Źródło: MARPOL 73/78, wydanie skonsolidowane, z poprawkami obowiązującymi w chwili pisania. Zasady zrzutu mają warunki, których tu nie wymieniono; na statku obowiązują plany statkowe i aktualny tekst konwencji. Ta strona to pomoc do nauki, a nie tekst prawny.*$pl$),
  'MARPOL', 'handbook',
  'linear-gradient(135deg,#0e2a45,#1d6fa5)',
  true, '2026-10-09 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'MARPOL in plain words: the six annexes, the key numbers and interview questions');

-- ── H2. ISGOTT ────────────────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'en', 'ISGOTT in plain words: gas, static, the ship/shore checklist and interview questions',
    'ru', 'ISGOTT простыми словами: газ, статика, чек-лист судно–берег и вопросы на собеседовании',
    'ua', 'ISGOTT простими словами: газ, статика, чек-лист судно–берег і питання на співбесіді',
    'pl', 'ISGOTT w prostych słowach: gaz, elektryczność statyczna, lista kontrolna statek–ląd i pytania na rozmowie'),
  jsonb_build_object(
    'en', $en$ISGOTT — the International Safety Guide for Oil Tankers and Terminals — is the book every oil tanker and every oil terminal works by. It is not a convention, yet a vetting inspector, a terminal and a tanker company all treat it as if it were one. If you are going to a tanker, expect questions from it at the interview. This page covers the parts asked most: what the guide is, petroleum gas and its numbers, static electricity, the ship/shore safety checklist and enclosed spaces — with questions to test yourself at the end.

:: **In short**
:: - ISGOTT is published by OCIMF together with ICS and IAPH. The current, sixth edition came out in 2020.
:: - It is a guide, not a law — but terminals, oil-major vetting (SIRE) and company safety systems make it binding in practice.
:: - Key numbers: no more than 8% oxygen in inerted tanks; 21% oxygen and no more than 1% LFL for tank entry; 1 m/s at the start of loading.
:: - The ship/shore safety checklist is completed together with the terminal and re-checked while the cargo is moving.

## What ISGOTT is and why it matters

The first edition appeared in 1978. The guide is written by OCIMF (the Oil Companies International Marine Forum) with the International Chamber of Shipping (ICS) and the International Association of Ports and Harbors (IAPH). It is not an IMO instrument and has no force of law by itself. In practice that changes nothing: a terminal will not start cargo without the ship/shore safety checklist, a SIRE vetting inspector checks the ship's practice against it, and the company's safety management system refers to it on almost every tanker page. On board a tanker ISGOTT is mandatory in everything but name.

The sixth edition (2020) reorganised the book and expanded the guidance on gas detection, on toxic substances such as hydrogen sulphide and benzene, and on entry into enclosed spaces. The ship/shore safety checklist was restructured too.

## Petroleum gas: why tanks explode

Hydrocarbon gas burns only within a narrow band — roughly 1% to 10% by volume in air. Below the lower flammable limit (LFL) the mixture is too lean, above the upper limit (UFL) too rich; but ventilating a "too rich" tank with air drives it straight through the flammable band. The other side of the triangle is oxygen: with less than about 11% oxygen by volume no mixture of hydrocarbon gas and air can burn at all. That is what the inert gas system is for:

- the system must deliver inert gas with no more than 5% oxygen by volume;
- cargo tanks are kept at 8% oxygen or less and under positive pressure;
- before gas-freeing, tanks are purged with inert gas until the hydrocarbons are below 2% by volume — only then is air let in, so the mixture never becomes flammable on the way.

Inert gas is required by SOLAS on new oil and chemical tankers of 8,000 DWT and above. Hydrocarbon gas is heavier than air: it lies on deck, in pump rooms and in any low space, which is why vapour is not "gone" just because the wind has dropped.

!! 1–10% | flammable range of hydrocarbon gas in air, by volume
!! ≈11% | oxygen below which hydrocarbon gas cannot burn
!! ≤5% | oxygen in the inert gas the system delivers
!! ≤8% | oxygen in inerted cargo tanks, under positive pressure
!! <2% | hydrocarbons after purging, before air is let in
!! 21% | oxygen for tank entry, with hydrocarbons at 1% LFL or less

## Static electricity

Oil moving through pipes and filters picks up an electrical charge. Some products — static accumulators, typically clean products such as gasoil, kerosene and gasoline — hold that charge for a long time; crude oil usually does not. A single spark in the vapour space of a tank that is not inerted is enough. The rules ISGOTT gives:

- at the start of loading, the speed in the pipe to each tank is kept to 1 m/s until the inlet is covered and splashing has stopped; then the rate can be raised (to no more than 7 m/s);
- after a static accumulator is loaded into a tank that is not inerted, wait 30 minutes before dipping, ullaging or sampling with metal equipment;
- everything lowered into a tank is bonded; no synthetic rope for sampling, no loose metal objects;
- the cargo connection carries an insulating flange or a single non-conductive length of hose, which stops stray currents between ship and shore — a ship/shore bonding cable is no longer recommended.

## The ship/shore safety checklist

The checklist is completed jointly by the ship's responsible officer and the terminal's representative before cargo starts. In the sixth edition it is split by stage: what each side checks before arrival, checks after mooring, the pre-transfer conference with the agreed plan, and repetitive checks during the operation. Some items carry a code:

- **R** — re-check during the operation at the interval agreed in the checklist;
- **A** — the agreement or procedure must be in writing;
- **P** — if the answer is "no", the operation may go ahead only with the permission of the competent authority.

Typical items: moorings and fendering, safe access, communications and the stop signal, the emergency shutdown (ESD) agreed and tested, scuppers plugged, unused cargo and bunker connections blanked, the inert gas system working and pressure recorded, fire hoses and extinguishers ready, smoking and naked-light rules, the ship able to move under its own power. A signature here is not a formality: if an item is not met, cargo does not start, and if conditions change, cargo stops.

## Enclosed spaces and toxic gases

Cargo tanks, the pump room, cofferdams, void spaces and ballast tanks are all enclosed spaces. Entry is by permit only, after ventilation and testing at several levels: 21% oxygen by volume, hydrocarbons at 1% LFL or less, toxic gases below 50% of their occupational exposure limit. A standby person stays at the entrance, communications are agreed, rescue equipment is laid out, and everyone inside carries a personal gas detector. Atmospheres change: test immediately before entry and keep monitoring while people are inside.

A large share of the people who die in enclosed spaces are the ones who rushed in to help. A rescue starts with the alarm and breathing apparatus — never with a dash into the tank.

Two gases deserve a separate word. **Hydrogen sulphide (H2S)** comes with sour crude and some products; at high concentrations it deadens the sense of smell, so "I can't smell it any more" means danger, not safety. **Benzene** is a carcinogen found in gasoline, naphtha and some crudes; exposure is limited by closed operations and protective equipment.

## What they ask at the interview

- **Ratings on tankers (AB, pumpman, OS):** what LFL and UFL are, what protective equipment is worn for cargo work, what the ship/shore checklist is, what you do if you smell gas on deck, how an enclosed space entry is organised.
- **Junior officers:** oxygen limits for inert gas, the order of purging and gas-freeing, the initial loading rate and why it exists, the 30-minute rule, who signs the checklist and what R, A and P mean.
- **Chief officers:** the cargo plan and the pre-transfer conference, emergency stop and ESD, topping off, which cargoes are static accumulators, vapour emission control, vetting observations related to ISGOTT.
- **Engineers on tankers:** the inert gas plant (flue gas or a generator), the deck water seal and the non-return valve — they stop cargo vapour from flowing back towards the engine room — and the pressure/vacuum breaker.

## Common mistakes

1. Treating ISGOTT as theory for the office. Terminals and vetting inspectors question the deck watch, not only the officers.
2. Ticking the checklist without checking. Every "yes" is the signer's personal responsibility.
3. Ullaging straight after loading kerosene into a tank that is not inerted — forgetting the 30 minutes.
4. Entering a "gas-free" tank on the strength of a morning reading.
5. Going in after a collapsed colleague without breathing apparatus.
6. Mixing up % LFL and % by volume. 1% LFL is one hundredth of the lower limit — for typical hydrocarbon gas about 0.01% by volume, a hundred times less than "1%".

## Test yourself

?? Who publishes ISGOTT, and which edition is current?
=> OCIMF together with ICS and IAPH. The sixth edition, published in 2020.
?? What oxygen content must be kept in inerted cargo tanks?
=> No more than 8% by volume, under positive pressure. The inert gas itself is delivered with 5% oxygen or less.
?? Why is the loading rate held at 1 m/s at the start?
=> To limit the static charge while the inlet is uncovered and the product splashes — the most dangerous phase in a tank that is not inerted.
?? What atmosphere is required before entering a cargo tank?
=> 21% oxygen by volume, hydrocarbons at 1% LFL or less, toxic gases below 50% of their exposure limit — measured at several levels, with a permit and a standby person at the entrance.
?? What does the letter R mean in the ship/shore safety checklist?
=> The item is re-checked during the operation at the interval agreed in the checklist.
?? A colleague has collapsed in the pump room. What do you do?
=> Raise the alarm, do not go in without breathing apparatus, start the rescue with the team under the ship's plan and keep the ventilation running.

## Who on board needs this

Everyone on a [tanker](/jobs/vessel/tanker) or a [chemical tanker](/jobs/vessel/chemical-tanker) — from the [able seaman](/jobs/rank/able-seaman) and the [bosun](/jobs/rank/bosun) to the [chief officer](/jobs/rank/chief-officer) and the [master](/jobs/rank/master); for engineers such as the [second engineer](/jobs/rank/2nd-engineer), the inert gas plant above all. ISGOTT does not replace the tanker endorsements — basic and advanced training for tanker cargo operations under STCW V/1-1 are still required; it is the book the practice is learned from.

*Source: ISGOTT, sixth edition (OCIMF, ICS, IAPH, 2020), and SOLAS chapter II-2 for inert gas. Figures are given as the guide states them; on board, the company's procedures and the terminal's rules apply. This page is a study aid, not a substitute for the book.*$en$,
    'ru', $ru$ISGOTT — Международное руководство по безопасности для нефтяных танкеров и терминалов — книга, по которой работает каждый нефтяной танкер и каждый нефтяной терминал. Это не конвенция, но инспектор по вэттингу, терминал и танкерная компания относятся к нему так, будто это закон. Если идёте на танкер, на собеседовании по нему спросят. Здесь — то, о чём спрашивают чаще всего: что это за руководство, нефтяной газ и его цифры, статическое электричество, чек-лист безопасности судно–берег и замкнутые помещения, а в конце — вопросы для самопроверки.

:: **Коротко**
:: - ISGOTT выпускает OCIMF вместе с ICS и IAPH. Действующее, шестое издание вышло в 2020 году.
:: - Это руководство, а не закон, — но терминалы, вэттинг нефтяных мейджоров (SIRE) и системы управления безопасностью компаний делают его обязательным на практике.
:: - Главные цифры: кислорода в инертизированных танках не больше 8%; для входа в танк 21% кислорода и не больше 1% НКПР; 1 м/с в начале погрузки.
:: - Чек-лист судно–берег заполняют вместе с терминалом и перепроверяют, пока идёт груз.

## Что такое ISGOTT и почему это важно

Первое издание вышло в 1978 году. Руководство пишет OCIMF (Международный морской форум нефтяных компаний) вместе с Международной палатой судоходства (ICS) и Международной ассоциацией портов и гаваней (IAPH). Это не документ ИМО, и силы закона сам по себе он не имеет. На практике это ничего не меняет: терминал не начнёт грузовые операции без чек-листа судно–берег, инспектор SIRE сверяет с ним практику судна, а система управления безопасностью компании ссылается на него почти на каждой «танкерной» странице. На борту танкера ISGOTT обязателен во всём, кроме названия.

Шестое издание (2020) перестроило книгу и расширило разделы о газовом контроле, о токсичных веществах — сероводороде и бензоле — и о входе в замкнутые помещения. Чек-лист судно–берег тоже переделали.

## Нефтяной газ: почему взрываются танки

Углеводородный газ горит только в узком диапазоне — примерно от 1% до 10% по объёму в воздухе. Ниже нижнего концентрационного предела распространения пламени (НКПР, LFL) смесь слишком бедная, выше верхнего (ВКПР, UFL) — слишком богатая; но если «богатый» танк вентилировать воздухом, смесь проходит прямо через опасную зону. Вторая сторона треугольника — кислород: при содержании кислорода меньше примерно 11% по объёму никакая смесь углеводородного газа с воздухом гореть не может. Для этого и нужна система инертных газов:

- система должна подавать инертный газ с содержанием кислорода не больше 5% по объёму;
- в грузовых танках держат не больше 8% кислорода и избыточное давление;
- перед дегазацией танки продувают инертным газом, пока углеводородов не станет меньше 2% по объёму, — только после этого подают воздух, и смесь по пути не становится горючей.

По СОЛАС инертный газ обязателен на новых нефтяных танкерах и химовозах дедвейтом от 8 000 тонн. Углеводородный газ тяжелее воздуха: он лежит на палубе, в насосных и в любых низких местах, поэтому пары не «ушли» только потому, что стих ветер.

!! 1–10% | диапазон воспламенения углеводородного газа в воздухе, по объёму
!! ≈11% | кислорода — ниже углеводородный газ гореть не может
!! ≤5% | кислорода в инертном газе, который подаёт система
!! ≤8% | кислорода в инертизированных грузовых танках, под давлением
!! <2% | углеводородов после продувки, до подачи воздуха
!! 21% | кислорода для входа в танк, углеводородов не больше 1% НКПР

## Статическое электричество

Нефтепродукт, проходя по трубам и фильтрам, накапливает электрический заряд. Некоторые продукты — накопители статики, обычно светлые: газойль, керосин, бензин — держат заряд долго; сырая нефть, как правило, нет. Одной искры в газовом пространстве неинертизированного танка достаточно. Правила ISGOTT:

- в начале погрузки скорость в трубопроводе к каждому танку держат не выше 1 м/с, пока приёмный патрубок не покроется и не прекратится разбрызгивание; потом интенсивность можно поднять (не выше 7 м/с);
- после погрузки накопителя статики в неинертизированный танк ждут 30 минут, прежде чем замерять, брать пробы или опускать металлический инструмент;
- всё, что опускают в танк, заземляют; никаких синтетических тросов для проб и никаких незакреплённых металлических предметов;
- на грузовом соединении стоит изолирующий фланец или один непроводящий отрезок шланга — он останавливает блуждающие токи между судном и берегом; кабель «судно–берег» больше не рекомендуется.

## Чек-лист безопасности судно–берег

Чек-лист заполняют вместе ответственный помощник судна и представитель терминала до начала грузовых операций. В шестом издании он разбит по этапам: что каждая сторона проверяет до подхода, проверки после швартовки, совещание перед началом перекачки с согласованным планом и повторные проверки во время операции. Часть пунктов помечена кодом:

- **R** — перепроверять во время операции с периодичностью, согласованной в чек-листе;
- **A** — договорённость или процедура должна быть письменной;
- **P** — при ответе «нет» операцию можно вести только с разрешения компетентного органа.

Типичные пункты: швартовы и кранцы, безопасный доступ на борт, связь и сигнал остановки, согласованная и проверенная аварийная остановка (ESD), закрытые шпигаты, заглушённые неиспользуемые грузовые и бункерные соединения, работающая система инертных газов с записанным давлением, готовые пожарные рукава и огнетушители, правила курения и открытого огня, готовность судна отойти своим ходом. Подпись здесь — не формальность: если пункт не выполнен, груз не начинают, а если условия изменились — останавливают.

## Замкнутые помещения и токсичные газы

Грузовые танки, насосное отделение, коффердамы, пустые пространства и балластные танки — всё это замкнутые помещения. Вход только по разрешению, после вентиляции и замеров на нескольких уровнях: кислород 21% по объёму, углеводороды не больше 1% НКПР, токсичные газы ниже 50% от предельно допустимой концентрации. У входа стоит наблюдающий, связь согласована, спасательное оборудование выложено, у каждого внутри — персональный газоанализатор. Атмосфера меняется: замер делают непосредственно перед входом и продолжают контроль, пока люди внутри.

Заметная часть погибших в замкнутых помещениях — те, кто бросился на помощь. Спасение начинается с тревоги и дыхательного аппарата, а не с рывка в танк.

Отдельно о двух газах. **Сероводород (H2S)** бывает в сернистой нефти и некоторых продуктах; при высоких концентрациях он отключает обоняние, поэтому «уже не пахнет» означает опасность, а не безопасность. **Бензол** — канцероген в бензине, нафте и некоторых сортах нефти; воздействие ограничивают закрытыми операциями и средствами защиты.

## Что спрашивают на собеседовании

- **Рядовой состав на танкерах (AB, помпмен, OS):** что такое НКПР и ВКПР, какие средства защиты нужны при грузовых работах, что такое чек-лист судно–берег, что делать, если на палубе чувствуется газ, как организован вход в замкнутое помещение.
- **Младшие помощники:** пределы кислорода для инертного газа, порядок продувки и дегазации, начальная скорость погрузки и зачем она нужна, правило 30 минут, кто подписывает чек-лист и что значат R, A и P.
- **Старпомы:** грузовой план и совещание перед перекачкой, аварийная остановка и ESD, догрузка танков, какие грузы — накопители статики, система отвода паров, замечания вэттинга, связанные с ISGOTT.
- **Механики на танкерах:** установка инертных газов (дымовые газы или генератор), палубный водяной затвор и невозвратный клапан — они не дают парам груза пойти обратно к машинному отделению, — и клапан давления/вакуума.

## Частые ошибки

1. Считать ISGOTT теорией «для офиса». Терминалы и вэттинг-инспекторы спрашивают и вахтенных матросов, а не только помощников.
2. Ставить галочки в чек-листе без проверки. Каждое «да» — личная ответственность того, кто подписал.
3. Замерять сразу после погрузки керосина в неинертизированный танк — забыв о 30 минутах.
4. Входить в «дегазированный» танк по утреннему замеру.
5. Лезть за упавшим товарищем без дыхательного аппарата.
6. Путать % НКПР и % по объёму. 1% НКПР — это сотая часть нижнего предела, для обычного углеводородного газа около 0,01% по объёму, в сто раз меньше, чем «1%».

## Проверь себя

?? Кто выпускает ISGOTT и какое издание действует?
=> OCIMF вместе с ICS и IAPH. Шестое издание, вышедшее в 2020 году.
?? Какое содержание кислорода нужно держать в инертизированных грузовых танках?
=> Не больше 8% по объёму, с избыточным давлением. Сам инертный газ подаётся с содержанием кислорода не больше 5%.
?? Зачем в начале погрузки скорость ограничивают 1 м/с?
=> Чтобы ограничить статический заряд, пока патрубок не покрыт и продукт разбрызгивается, — это самая опасная фаза в неинертизированном танке.
?? Какая атмосфера нужна перед входом в грузовой танк?
=> Кислород 21% по объёму, углеводороды не больше 1% НКПР, токсичные газы ниже 50% от предельной концентрации — замеры на нескольких уровнях, с разрешением и наблюдающим у входа.
?? Что означает буква R в чек-листе судно–берег?
=> Пункт перепроверяют во время операции с периодичностью, согласованной в чек-листе.
?? Товарищ упал в насосном отделении. Ваши действия?
=> Поднять тревогу, не входить без дыхательного аппарата, начать спасение командой по судовому плану и не выключать вентиляцию.

## Кому на борту это нужно

Всем на [танкере](/ru/jobs/vessel/tanker) или [химовозе](/ru/jobs/vessel/chemical-tanker) — от [матроса AB](/ru/jobs/rank/able-seaman) и [боцмана](/ru/jobs/rank/bosun) до [старпома](/ru/jobs/rank/chief-officer) и [капитана](/ru/jobs/rank/master); механикам, например [второму механику](/ru/jobs/rank/2nd-engineer), — прежде всего установка инертных газов. ISGOTT не заменяет танкерные подтверждения: базовая и расширенная подготовка по грузовым операциям на танкерах по правилу V/1-1 ПДНВ всё равно нужна, а ISGOTT — книга, по которой учат практику.

*Источник: ISGOTT, шестое издание (OCIMF, ICS, IAPH, 2020), и глава II-2 СОЛАС для инертного газа. Цифры приведены так, как их даёт руководство; на борту действуют процедуры компании и правила терминала. Эта страница — пособие для подготовки, а не замена книги.*$ru$,
    'ua', $ua$ISGOTT — Міжнародний посібник з безпеки для нафтових танкерів і терміналів — книга, за якою працює кожен нафтовий танкер і кожен нафтовий термінал. Це не конвенція, але інспектор з ветингу, термінал і танкерна компанія ставляться до нього так, ніби це закон. Якщо йдете на танкер, на співбесіді за ним запитають. Тут — те, про що питають найчастіше: що це за посібник, нафтовий газ і його цифри, статична електрика, чек-лист безпеки судно–берег і замкнені приміщення, а наприкінці — питання для самоперевірки.

:: **Коротко**
:: - ISGOTT видає OCIMF разом з ICS та IAPH. Чинне, шосте видання вийшло у 2020 році.
:: - Це посібник, а не закон, — але термінали, ветинг нафтових мейджорів (SIRE) і системи управління безпекою компаній роблять його обов'язковим на практиці.
:: - Головні цифри: кисню в інертизованих танках не більше 8%; для входу в танк 21% кисню й не більше 1% НКМП; 1 м/с на початку навантаження.
:: - Чек-лист судно–берег заповнюють разом із терміналом і перевіряють знову, поки йде вантаж.

## Що таке ISGOTT і чому це важливо

Перше видання вийшло в 1978 році. Посібник пише OCIMF (Міжнародний морський форум нафтових компаній) разом із Міжнародною палатою судноплавства (ICS) та Міжнародною асоціацією портів і гаваней (IAPH). Це не документ ІМО, і сили закону сам по собі він не має. На практиці це нічого не змінює: термінал не почне вантажні операції без чек-листа судно–берег, інспектор SIRE звіряє з ним практику судна, а система управління безпекою компанії посилається на нього майже на кожній «танкерній» сторінці. На борту танкера ISGOTT обов'язковий у всьому, крім назви.

Шосте видання (2020) перебудувало книгу й розширило розділи про газовий контроль, про токсичні речовини — сірководень і бензол — та про вхід у замкнені приміщення. Чек-лист судно–берег теж переробили.

## Нафтовий газ: чому вибухають танки

Вуглеводневий газ горить лише у вузькому діапазоні — приблизно від 1% до 10% за об'ємом у повітрі. Нижче нижньої концентраційної межі поширення полум'я (НКМП, LFL) суміш надто бідна, вище верхньої (ВКМП, UFL) — надто багата; але якщо «багатий» танк вентилювати повітрям, суміш проходить просто через небезпечну зону. Друга сторона трикутника — кисень: за вмісту кисню менше приблизно 11% за об'ємом жодна суміш вуглеводневого газу з повітрям горіти не може. Для цього й потрібна система інертних газів:

- система має подавати інертний газ із вмістом кисню не більше 5% за об'ємом;
- у вантажних танках тримають не більше 8% кисню й надлишковий тиск;
- перед дегазацією танки продувають інертним газом, доки вуглеводнів не стане менше 2% за об'ємом, — лише після цього подають повітря, і суміш дорогою не стає горючою.

За СОЛАС інертний газ обов'язковий на нових нафтових танкерах і хімовозах дедвейтом від 8 000 тонн. Вуглеводневий газ важчий за повітря: він лежить на палубі, у насосних і в будь-яких низьких місцях, тому пари не «пішли» лише тому, що вщух вітер.

!! 1–10% | діапазон займання вуглеводневого газу в повітрі, за об'ємом
!! ≈11% | кисню — нижче вуглеводневий газ горіти не може
!! ≤5% | кисню в інертному газі, який подає система
!! ≤8% | кисню в інертизованих вантажних танках, під тиском
!! <2% | вуглеводнів після продування, до подачі повітря
!! 21% | кисню для входу в танк, вуглеводнів не більше 1% НКМП

## Статична електрика

Нафтопродукт, проходячи трубами й фільтрами, накопичує електричний заряд. Деякі продукти — накопичувачі статики, зазвичай світлі: газойль, гас, бензин — тримають заряд довго; сира нафта, як правило, ні. Однієї іскри в газовому просторі неінертизованого танка досить. Правила ISGOTT:

- на початку навантаження швидкість у трубопроводі до кожного танка тримають не вище 1 м/с, доки приймальний патрубок не покриється й не припиниться розбризкування; потім інтенсивність можна підняти (не вище 7 м/с);
- після навантаження накопичувача статики в неінертизований танк чекають 30 хвилин, перш ніж робити заміри, брати проби чи опускати металевий інструмент;
- усе, що опускають у танк, заземлюють; жодних синтетичних тросів для проб і жодних незакріплених металевих предметів;
- на вантажному з'єднанні стоїть ізолювальний фланець або один непровідний відрізок шланга — він зупиняє блукаючі струми між судном і берегом; кабель «судно–берег» більше не рекомендується.

## Чек-лист безпеки судно–берег

Чек-лист заповнюють разом відповідальний помічник судна й представник терміналу до початку вантажних операцій. У шостому виданні його поділено за етапами: що кожна сторона перевіряє до підходу, перевірки після швартування, нарада перед початком перекачування з погодженим планом і повторні перевірки під час операції. Частину пунктів позначено кодом:

- **R** — перевіряти знову під час операції з періодичністю, погодженою в чек-листі;
- **A** — домовленість або процедура має бути письмовою;
- **P** — за відповіді «ні» операцію можна вести лише з дозволу компетентного органу.

Типові пункти: швартови й кранці, безпечний доступ на борт, зв'язок і сигнал зупинки, погоджена й перевірена аварійна зупинка (ESD), закриті шпігати, заглушені невикористовувані вантажні та бункерні з'єднання, справна система інертних газів із записаним тиском, готові пожежні рукави й вогнегасники, правила куріння та відкритого вогню, готовність судна відійти своїм ходом. Підпис тут — не формальність: якщо пункт не виконано, вантаж не починають, а якщо умови змінилися — зупиняють.

## Замкнені приміщення й токсичні гази

Вантажні танки, насосне відділення, кофердами, порожні простори та баластні танки — усе це замкнені приміщення. Вхід лише за дозволом, після вентиляції й замірів на кількох рівнях: кисень 21% за об'ємом, вуглеводні не більше 1% НКМП, токсичні гази нижче 50% від гранично допустимої концентрації. Біля входу стоїть спостерігач, зв'язок погоджено, рятувальне обладнання викладено, у кожного всередині — персональний газоаналізатор. Атмосфера змінюється: замір роблять безпосередньо перед входом і продовжують контроль, поки люди всередині.

Помітна частина загиблих у замкнених приміщеннях — ті, хто кинувся на допомогу. Рятування починається з тривоги й дихального апарата, а не з ривка в танк.

Окремо про два гази. **Сірководень (H2S)** буває в сірчистій нафті та деяких продуктах; за високих концентрацій він вимикає нюх, тому «вже не пахне» означає небезпеку, а не безпеку. **Бензол** — канцероген у бензині, лігроїні та деяких сортах нафти; вплив обмежують закритими операціями й засобами захисту.

## Що питають на співбесіді

- **Рядовий склад на танкерах (AB, помпмен, OS):** що таке НКМП і ВКМП, які засоби захисту потрібні під час вантажних робіт, що таке чек-лист судно–берег, що робити, якщо на палубі відчувається газ, як організовано вхід у замкнене приміщення.
- **Молодші помічники:** межі кисню для інертного газу, порядок продування й дегазації, початкова швидкість навантаження й навіщо вона, правило 30 хвилин, хто підписує чек-лист і що означають R, A та P.
- **Старпоми:** вантажний план і нарада перед перекачуванням, аварійна зупинка та ESD, довантаження танків, які вантажі — накопичувачі статики, система відведення парів, зауваження ветингу, пов'язані з ISGOTT.
- **Механіки на танкерах:** установка інертних газів (димові гази або генератор), палубний водяний затвор і зворотний клапан — вони не дають парам вантажу піти назад до машинного відділення, — і клапан тиску/вакууму.

## Типові помилки

1. Вважати ISGOTT теорією «для офісу». Термінали й ветинг-інспектори питають і вахтових матросів, а не лише помічників.
2. Ставити галочки в чек-листі без перевірки. Кожне «так» — особиста відповідальність того, хто підписав.
3. Робити заміри одразу після навантаження гасу в неінертизований танк — забувши про 30 хвилин.
4. Входити в «дегазований» танк за ранковим заміром.
5. Лізти по товариша, що впав, без дихального апарата.
6. Плутати % НКМП і % за об'ємом. 1% НКМП — це сота частина нижньої межі, для звичайного вуглеводневого газу близько 0,01% за об'ємом, у сто разів менше, ніж «1%».

## Перевір себе

?? Хто видає ISGOTT і яке видання чинне?
=> OCIMF разом з ICS та IAPH. Шосте видання, що вийшло у 2020 році.
?? Який вміст кисню треба тримати в інертизованих вантажних танках?
=> Не більше 8% за об'ємом, із надлишковим тиском. Сам інертний газ подається з вмістом кисню не більше 5%.
?? Навіщо на початку навантаження швидкість обмежують 1 м/с?
=> Щоб обмежити статичний заряд, поки патрубок не покритий і продукт розбризкується, — це найнебезпечніша фаза в неінертизованому танку.
?? Яка атмосфера потрібна перед входом у вантажний танк?
=> Кисень 21% за об'ємом, вуглеводні не більше 1% НКМП, токсичні гази нижче 50% від граничної концентрації — заміри на кількох рівнях, з дозволом і спостерігачем біля входу.
?? Що означає літера R у чек-листі судно–берег?
=> Пункт перевіряють знову під час операції з періодичністю, погодженою в чек-листі.
?? Товариш упав у насосному відділенні. Ваші дії?
=> Підняти тривогу, не входити без дихального апарата, почати рятування командою за судновим планом і не вимикати вентиляцію.

## Кому на борту це потрібно

Усім на [танкері](/ua/jobs/vessel/tanker) чи [хімовозі](/ua/jobs/vessel/chemical-tanker) — від [матроса AB](/ua/jobs/rank/able-seaman) і [боцмана](/ua/jobs/rank/bosun) до [старпома](/ua/jobs/rank/chief-officer) і [капітана](/ua/jobs/rank/master); механікам, наприклад [другому механіку](/ua/jobs/rank/2nd-engineer), — насамперед установка інертних газів. ISGOTT не замінює танкерних підтверджень: базова й розширена підготовка з вантажних операцій на танкерах за правилом V/1-1 ПДНВ однаково потрібна, а ISGOTT — книга, за якою вчать практику.

*Джерело: ISGOTT, шосте видання (OCIMF, ICS, IAPH, 2020), і розділ II-2 СОЛАС для інертного газу. Цифри наведено так, як їх дає посібник; на борту діють процедури компанії й правила терміналу. Ця сторінка — посібник для підготовки, а не заміна книги.*$ua$,
    'pl', $pl$ISGOTT — Międzynarodowy przewodnik bezpieczeństwa dla tankowców olejowych i terminali — to książka, według której pracuje każdy tankowiec olejowy i każdy terminal naftowy. Nie jest konwencją, ale inspektor vettingowy, terminal i armator tankowców traktują go tak, jakby był prawem. Jeśli idziesz na tankowiec, na rozmowie padną z niego pytania. Tutaj jest to, o co pytają najczęściej: czym jest przewodnik, gaz naftowy i jego liczby, elektryczność statyczna, lista kontrolna bezpieczeństwa statek–ląd i przestrzenie zamknięte — a na końcu pytania do sprawdzenia się.

:: **W skrócie**
:: - ISGOTT wydaje OCIMF razem z ICS i IAPH. Obecne, szóste wydanie ukazało się w 2020 roku.
:: - To przewodnik, nie prawo — ale terminale, vetting koncernów naftowych (SIRE) i systemy zarządzania bezpieczeństwem armatorów czynią go obowiązkowym w praktyce.
:: - Kluczowe liczby: tlenu w zinertyzowanych zbiornikach nie więcej niż 8%; do wejścia do zbiornika 21% tlenu i nie więcej niż 1% LFL; 1 m/s na początku załadunku.
:: - Listę kontrolną statek–ląd wypełnia się razem z terminalem i sprawdza ponownie, dopóki płynie ładunek.

## Czym jest ISGOTT i dlaczego to ważne

Pierwsze wydanie ukazało się w 1978 roku. Przewodnik pisze OCIMF (Oil Companies International Marine Forum) razem z Międzynarodową Izbą Żeglugi (ICS) i Międzynarodowym Stowarzyszeniem Portów (IAPH). To nie jest dokument IMO i sam w sobie nie ma mocy prawa. W praktyce nic to nie zmienia: terminal nie zacznie operacji ładunkowych bez listy kontrolnej statek–ląd, inspektor SIRE porównuje z nim praktykę statku, a system zarządzania bezpieczeństwem armatora odsyła do niego niemal na każdej „tankowcowej” stronie. Na tankowcu ISGOTT jest obowiązkowy we wszystkim poza nazwą.

Szóste wydanie (2020) przebudowało książkę i rozszerzyło rozdziały o pomiarach gazów, o substancjach toksycznych — siarkowodorze i benzenie — oraz o wchodzeniu do przestrzeni zamkniętych. Przerobiono też listę kontrolną statek–ląd.

## Gaz naftowy: dlaczego zbiorniki wybuchają

Gaz węglowodorowy pali się tylko w wąskim zakresie — mniej więcej od 1% do 10% objętościowo w powietrzu. Poniżej dolnej granicy palności (LFL) mieszanina jest zbyt uboga, powyżej górnej (UFL) — zbyt bogata; ale jeśli „bogaty” zbiornik wentyluje się powietrzem, mieszanina przechodzi prosto przez strefę niebezpieczną. Drugi bok trójkąta to tlen: przy zawartości tlenu poniżej około 11% objętościowo żadna mieszanina gazu węglowodorowego z powietrzem nie może się palić. Do tego służy instalacja gazu obojętnego:

- instalacja musi dostarczać gaz obojętny o zawartości tlenu nie większej niż 5% objętościowo;
- w zbiornikach ładunkowych utrzymuje się nie więcej niż 8% tlenu i nadciśnienie;
- przed odgazowaniem zbiorniki przedmuchuje się gazem obojętnym, aż węglowodorów będzie mniej niż 2% objętościowo — dopiero wtedy wpuszcza się powietrze i mieszanina po drodze nie staje się palna.

Według SOLAS gaz obojętny jest obowiązkowy na nowych tankowcach olejowych i chemikaliowcach o nośności od 8000 ton. Gaz węglowodorowy jest cięższy od powietrza: zalega na pokładzie, w przepompowniach i w każdym niskim miejscu, dlatego opary nie „zniknęły” tylko dlatego, że ucichł wiatr.

!! 1–10% | zakres palności gazu węglowodorowego w powietrzu, objętościowo
!! ≈11% | tlenu — poniżej gaz węglowodorowy nie może się palić
!! ≤5% | tlenu w gazie obojętnym dostarczanym przez instalację
!! ≤8% | tlenu w zinertyzowanych zbiornikach ładunkowych, pod nadciśnieniem
!! <2% | węglowodorów po przedmuchaniu, przed wpuszczeniem powietrza
!! 21% | tlenu do wejścia do zbiornika, węglowodorów nie więcej niż 1% LFL

## Elektryczność statyczna

Produkt naftowy płynący rurami i przez filtry gromadzi ładunek elektryczny. Niektóre produkty — akumulatory ładunku, zwykle produkty jasne: olej napędowy, nafta lotnicza, benzyna — utrzymują go długo; ropa naftowa zazwyczaj nie. Jedna iskra w przestrzeni gazowej niezinertyzowanego zbiornika wystarczy. Zasady ISGOTT:

- na początku załadunku prędkość w rurociągu do każdego zbiornika utrzymuje się na poziomie nie wyższym niż 1 m/s, dopóki wlot nie zostanie przykryty i nie ustanie rozbryzgiwanie; potem wydajność można zwiększyć (nie więcej niż 7 m/s);
- po załadowaniu akumulatora ładunku do niezinertyzowanego zbiornika czeka się 30 minut, zanim zacznie się pomiary, pobieranie próbek lub opuszczanie metalowych przyrządów;
- wszystko, co opuszcza się do zbiornika, jest uziemione; żadnych lin syntetycznych do próbek i żadnych luźnych przedmiotów metalowych;
- na połączeniu ładunkowym jest kołnierz izolujący albo jeden nieprzewodzący odcinek węża — zatrzymuje on prądy błądzące między statkiem a lądem; kabel łączący statek z lądem nie jest już zalecany.

## Lista kontrolna bezpieczeństwa statek–ląd

Listę wypełniają wspólnie odpowiedzialny oficer statku i przedstawiciel terminalu przed rozpoczęciem operacji ładunkowych. W szóstym wydaniu podzielono ją na etapy: co każda strona sprawdza przed podejściem, kontrole po zacumowaniu, naradę przed przeładunkiem z uzgodnionym planem i powtarzane kontrole w trakcie operacji. Część punktów ma kod:

- **R** — sprawdzać ponownie w trakcie operacji w odstępach uzgodnionych w liście;
- **A** — uzgodnienie lub procedura musi być na piśmie;
- **P** — przy odpowiedzi „nie” operację można prowadzić tylko za zgodą właściwego organu.

Typowe punkty: cumy i odbijacze, bezpieczne wejście na statek, łączność i sygnał zatrzymania, uzgodnione i sprawdzone awaryjne zatrzymanie (ESD), zaślepione szpigaty, zaślepione nieużywane połączenia ładunkowe i bunkrowe, działająca instalacja gazu obojętnego z zapisanym ciśnieniem, gotowe węże pożarowe i gaśnice, zasady palenia i otwartego ognia, gotowość statku do odejścia o własnych siłach. Podpis nie jest formalnością: jeśli punkt nie jest spełniony, ładunku się nie zaczyna, a jeśli warunki się zmieniły — zatrzymuje.

## Przestrzenie zamknięte i gazy toksyczne

Zbiorniki ładunkowe, przepompownia, koferdamy, przestrzenie puste i zbiorniki balastowe to przestrzenie zamknięte. Wejście tylko na zezwolenie, po wentylacji i pomiarach na kilku poziomach: tlen 21% objętościowo, węglowodory nie więcej niż 1% LFL, gazy toksyczne poniżej 50% najwyższego dopuszczalnego stężenia. Przy wejściu stoi obserwator, łączność jest uzgodniona, sprzęt ratowniczy przygotowany, a każdy w środku ma osobisty detektor gazów. Atmosfera się zmienia: pomiar robi się tuż przed wejściem i kontroluje dalej, dopóki ludzie są w środku.

Znaczna część ofiar w przestrzeniach zamkniętych to ci, którzy rzucili się na pomoc. Ratunek zaczyna się od alarmu i aparatu oddechowego, a nie od skoku do zbiornika.

Osobno o dwóch gazach. **Siarkowodór (H2S)** występuje w ropie kwaśnej i niektórych produktach; przy wysokich stężeniach wyłącza węch, więc „już nie czuć” oznacza niebezpieczeństwo, a nie bezpieczeństwo. **Benzen** to substancja rakotwórcza w benzynie, benzynie ciężkiej i niektórych gatunkach ropy; narażenie ogranicza się zamkniętymi operacjami i środkami ochrony.

## O co pytają na rozmowie

- **Załoga szeregowa na tankowcach (AB, pompiarz, OS):** czym są LFL i UFL, jakie środki ochrony są potrzebne przy pracach ładunkowych, czym jest lista kontrolna statek–ląd, co zrobić, gdy na pokładzie czuć gaz, jak organizuje się wejście do przestrzeni zamkniętej.
- **Młodsi oficerowie:** limity tlenu dla gazu obojętnego, kolejność przedmuchiwania i odgazowania, początkowa prędkość załadunku i po co jest, zasada 30 minut, kto podpisuje listę kontrolną i co znaczą R, A i P.
- **Starsi oficerowie:** plan ładunkowy i narada przed przeładunkiem, zatrzymanie awaryjne i ESD, dopełnianie zbiorników, które ładunki są akumulatorami ładunku, odprowadzanie oparów, uwagi z vettingu związane z ISGOTT.
- **Mechanicy na tankowcach:** instalacja gazu obojętnego (spaliny lub generator), pokładowe zamknięcie wodne i zawór zwrotny — nie pozwalają oparom ładunku cofnąć się w stronę maszynowni — oraz zawór nadciśnieniowo-podciśnieniowy.

## Typowe błędy

1. Traktowanie ISGOTT jako teorii „dla biura”. Terminale i inspektorzy vettingowi pytają także marynarzy z wachty, nie tylko oficerów.
2. Odhaczanie listy kontrolnej bez sprawdzania. Każde „tak” to osobista odpowiedzialność podpisującego.
3. Pomiar zaraz po załadowaniu nafty do niezinertyzowanego zbiornika — z pominięciem 30 minut.
4. Wejście do „odgazowanego” zbiornika na podstawie porannego pomiaru.
5. Wejście po kolegę, który upadł, bez aparatu oddechowego.
6. Mylenie % LFL z % objętościowym. 1% LFL to setna część dolnej granicy — dla typowego gazu węglowodorowego około 0,01% objętościowo, sto razy mniej niż „1%”.

## Sprawdź się

?? Kto wydaje ISGOTT i które wydanie obowiązuje?
=> OCIMF razem z ICS i IAPH. Szóste wydanie, opublikowane w 2020 roku.
?? Jaką zawartość tlenu trzeba utrzymywać w zinertyzowanych zbiornikach ładunkowych?
=> Nie więcej niż 8% objętościowo, przy nadciśnieniu. Sam gaz obojętny jest dostarczany z zawartością tlenu nie większą niż 5%.
?? Po co na początku załadunku ogranicza się prędkość do 1 m/s?
=> Żeby ograniczyć ładunek statyczny, dopóki wlot nie jest przykryty, a produkt się rozbryzguje — to najniebezpieczniejsza faza w niezinertyzowanym zbiorniku.
?? Jaka atmosfera jest wymagana przed wejściem do zbiornika ładunkowego?
=> Tlen 21% objętościowo, węglowodory nie więcej niż 1% LFL, gazy toksyczne poniżej 50% najwyższego dopuszczalnego stężenia — pomiary na kilku poziomach, z zezwoleniem i obserwatorem przy wejściu.
?? Co oznacza litera R w liście kontrolnej statek–ląd?
=> Punkt sprawdza się ponownie w trakcie operacji w odstępach uzgodnionych w liście.
?? Kolega upadł w przepompowni. Co robisz?
=> Podnosisz alarm, nie wchodzisz bez aparatu oddechowego, zaczynasz akcję ratowniczą z zespołem według planu statku i nie wyłączasz wentylacji.

## Komu na statku to potrzebne

Wszystkim na [tankowcu](/pl/jobs/vessel/tanker) lub [chemikaliowcu](/pl/jobs/vessel/chemical-tanker) — od [marynarza AB](/pl/jobs/rank/able-seaman) i [bosmana](/pl/jobs/rank/bosun) po [starszego oficera](/pl/jobs/rank/chief-officer) i [kapitana](/pl/jobs/rank/master); mechanikom, na przykład [drugiemu mechanikowi](/pl/jobs/rank/2nd-engineer), przede wszystkim instalacja gazu obojętnego. ISGOTT nie zastępuje uprawnień tankowcowych: przeszkolenie podstawowe i zaawansowane z operacji ładunkowych na tankowcach według prawidła V/1-1 STCW i tak jest wymagane, a ISGOTT to książka, z której uczy się praktyki.

*Źródło: ISGOTT, szóste wydanie (OCIMF, ICS, IAPH, 2020), i rozdział II-2 SOLAS w zakresie gazu obojętnego. Liczby podano tak, jak podaje je przewodnik; na statku obowiązują procedury armatora i zasady terminalu. Ta strona to pomoc do nauki, a nie zamiennik książki.*$pl$),
  'ISGOTT', 'handbook',
  'linear-gradient(135deg,#0e2a45,#8a6d1d)',
  true, '2026-10-09 10:30:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'en' = 'ISGOTT in plain words: gas, static, the ship/shore checklist and interview questions');

-- ── Covers ───────────────────────────────────────────────────────────────────
UPDATE news_articles SET cover_url = v.url FROM (VALUES
 ('MARPOL in plain words: the six annexes, the key numbers and interview questions', 'https://seajobs.pro/handbook/marpol.png?v=1'),
 ('ISGOTT in plain words: gas, static, the ship/shore checklist and interview questions', 'https://seajobs.pro/handbook/isgott.png?v=1')
) AS v(t, url)
WHERE news_articles.title->>'en' = v.t AND coalesce(news_articles.cover_url, '') = '';
