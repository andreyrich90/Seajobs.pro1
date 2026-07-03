-- Maritime English series — expanded posts 1-3 (≈4x more content).
-- Updates already-inserted rows (guarded seeds would skip them). Idempotent.
-- Run in the Supabase SQL Editor.

-- ── 1. Английский для матросов ───────────────────────────────────────────────
UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Матросу не нужен идеальный английский — нужен рабочий: понимать команды, докладывать, называть инструменты и нормально общаться в международном экипаже. Разберём подробно, слоями — от палубы до руля, со словами, фразами и диалогами. Учите блоками, а не всё сразу.

## Кто есть кто на палубе (deck ratings)

- **AB — Able Seaman / Able Seafarer** — матрос 1 класса, квалифицированный, стоит на руле и на вахте.
- **OS — Ordinary Seaman** — матрос 2 класса, начальная позиция.
- **Bosun (Boatswain)** — боцман, старший над рядовой палубной командой, раздаёт работу.
- **Deckhand / deck rating** — рядовой палубной команды (общее слово).
- **Day worker** — работает только днём. **Watchkeeper** — стоит ходовые вахты.
- **Pumpman** — насосчик (на танкерах).

## Части судна и палубы (parts of the ship)

- **Bow / stem** — нос. **Stern** — корма. **Amidships** — середина.
- **Port side** — левый борт. **Starboard side** — правый борт.
- **Forecastle (fo'c'sle)** — бак. **Poop deck** — ют.
- **Main deck** — главная палуба. **Weather deck** — открытая палуба.
- **Hull** — корпус. **Bulkhead** — переборка. **Hatch / hatch cover** — люк / крышка трюма.
- **Accommodation** — надстройка (жилая). **Bridge** — мостик. **Engine room** — машинное отделение.
- **Ballast tank** — балластный танк. **Bilge** — льяло, трюмная вода.

## Инструменты и материалы (tools & materials)

- **Chipping hammer** — молоток для обивки ржавчины. **Needle gun** — игольчатый пистолет.
- **Scraper** — скребок. **Wire brush** — металлическая щётка. **Grinder** — болгарка.
- **Paint / primer / topcoat** — краска / грунт / финишный слой. **Thinner** — растворитель.
- **Brush / roller** — кисть / валик. **Sandpaper** — наждачка.
- **Rust** — ржавчина. **Grease** — смазка. **Rag** — ветошь.
- **Shackle** — скоба. **Turnbuckle** — талреп. **Wire / rope / chain** — трос / конец / цепь.

## Палубные работы — что говорит боцман (commands)

Боцман командует короткими фразами в повелительном наклонении. Отвечай "Yes, Bosun" и повторяй задачу.

- **Chip the rust off / de-rust this area** — обей ржавчину здесь.
- **Sand it down / grind it** — зачисти наждачкой / болгаркой.
- **Apply the primer, then the topcoat** — нанеси грунт, потом финиш.
- **Coil the rope / flake out the line** — смотай / разложи конец.
- **Secure the cargo / lash it down** — закрепи груз.
- **Sound the tanks** — замерь уровни в танках.
- **Wash down the deck** — окати палубу.
- **Rig the gangway / rig the pilot ladder** — выставь трап / лоцманский трап.

## Швартовка — оборудование и команды (mooring)

Оборудование:

- **Mooring line / headline / stern line / spring / breast line** — швартовы (носовой, кормовой, шпринг, прижимной).
- **Heaving line** — бросательный конец. **Monkey fist** — груз на его конце.
- **Bollard / bitts** — кнехты. **Fairlead / roller** — клюз / роульс. **Winch / drum** — лебёдка / барабан.
- **Fender** — кранец. **Gangway** — трап.

Команды с мостика на бак/корму:

- **Stand by fore and aft** — приготовиться на баке и корме.
- **Send the heaving line** — подай бросательный.
- **Send one headline and one spring** — подай носовой и шпринг.
- **Slack away / heave in / hold on** — потрави / выбирай / задержи.
- **Make fast** — закрепи. **All fast fore and aft** — всё закреплено.
- **Let go / let go everything** — отдай / отдай всё.

Доклады с поста: **Ready fore and aft**, **All lines are fast**, **All clear** (концы убраны от винта).

## Якорь (anchor)

- **Anchor / windlass / cable (chain) / brake** — якорь / брашпиль / якорь-цепь / тормоз.
- **Shackle** — смычка (мера длины цепи, ≈27 м).
- **Stand by the anchor** — приготовиться к отдаче якоря.
- **Let go the anchor** — отдать якорь. **Heave up the anchor** — выбрать якорь.
- **How is the cable?** — как смотрит цепь? Ответы: **up and down** (вертикально), **brought up** (судно на якоре стало).

## Команды на руле (helm / wheel orders)

Всегда **повторяй команду**, выполняй, потом докладывай.

- **Midships** — прямо руль. **Steady / steady as she goes** — так держать.
- **Port five / ten / fifteen / twenty** — лево 5/10/15/20°.
- **Starboard five / ten / fifteen / twenty** — право 5/10/15/20°.
- **Hard-a-port / hard-a-starboard** — лево / право на борт.
- **Ease to five / ten** — уменьшить перекладку. **Meet her** — одерживать.
- **Steer one-eight-five** — держать курс 185 (цифры по одной).

## Числа, курсы и время

Цифры называют по одной: 130 → "one-three-zero", курс 090 → "zero-nine-zero". Время — 24 часа: 13:00 → "one-three-zero-zero (thirteen hundred)".

## Как переспросить (это нормально!)

- **Say again, please** — повторите.
- **Please speak slower** — помедленнее, пожалуйста.
- **I don't understand** — я не понял.
- **Understood / Roger / Copy** — понял / принял.

## Мини-диалоги

Боцман даёт работу:
> Bosun: "Today you chip and paint number two hatch. First de-rust, then primer."
> AB: "Yes, Bosun. De-rust and primer on number two hatch."

На швартовке:
> Bridge: "Fore station, send one headline and one spring."
> Fore: "One headline and one spring, roger." ... "Headline is fast."

На руле:
> Officer: "Port ten."
> AB: "Port ten... ten of port wheel on."
> Officer: "Steady."
> AB: "Steady... course one-eight-five."

## Частые ошибки

- Не повторять команду руля — грубое нарушение, не только невежливость.
- Молчать, когда не понял. Лучше переспросить, чем сделать не то.
- Путать port (лево) и starboard (право). Запомните: "port" и "left" — оба короткие.
- Стоять в **snap-back zone** (зоне отскока лопнувшего троса) — опасно для жизни.

Хотите проверить английский в деле? Ищите вакансии для матросов на **seajobs.pro** — в каждом объявлении видно требования к языку и опыту.$ru$,
  'en', $en$A deck rating does not need perfect English — just working English: understand orders, report back, name the tools and get on with a multinational crew. Let's go through it in layers, from the deck to the helm, with words, phrases and dialogues. Learn it in blocks, not all at once.

## Who is who on deck (deck ratings)

- **AB — Able Seaman / Able Seafarer** — a qualified rating, stands helm and watch.
- **OS — Ordinary Seaman** — the entry-level rating.
- **Bosun (Boatswain)** — the senior of the deck ratings, hands out the work.
- **Deckhand / deck rating** — a general word for a deck crew member.
- **Day worker** — works daytime only. **Watchkeeper** — stands sea watches.
- **Pumpman** — handles cargo pumps (on tankers).

## Parts of the ship

- **Bow / stem** — the front. **Stern** — the back. **Amidships** — the middle.
- **Port side / starboard side** — left / right (facing forward).
- **Forecastle (fo'c'sle)** — the forward deck. **Poop deck** — the after deck.
- **Main deck / weather deck** — the open decks.
- **Hull / bulkhead** — the body / an internal wall. **Hatch / hatch cover** — hold opening / lid.
- **Accommodation / bridge / engine room** — living block / command / machinery.
- **Ballast tank / bilge** — trim tanks / the lowest space with drain water.

## Tools & materials

- **Chipping hammer / needle gun** — for removing rust.
- **Scraper / wire brush / grinder** — for cleaning and grinding.
- **Paint / primer / topcoat / thinner** — the coating chain.
- **Brush / roller / sandpaper** — for applying and smoothing.
- **Rust / grease / rag** — corrosion / lubricant / cloth.
- **Shackle / turnbuckle / wire / rope / chain** — securing hardware.

## Deck work — what the bosun says (commands)

The bosun gives short orders in the imperative. Answer "Yes, Bosun" and repeat the task.

- **Chip the rust off / de-rust this area** — remove the rust here.
- **Sand it down / grind it** — smooth it.
- **Apply the primer, then the topcoat** — coat it in order.
- **Coil the rope / flake out the line** — stow / lay out the line.
- **Secure the cargo / lash it down** — hold the cargo in place.
- **Sound the tanks** — measure the levels.
- **Wash down the deck** — hose the deck.
- **Rig the gangway / rig the pilot ladder** — set up access.

## Mooring — equipment and commands

Equipment:

- **Mooring line / headline / stern line / spring / breast line** — the lines.
- **Heaving line / monkey fist** — the light line and its weighted end.
- **Bollard / bitts / fairlead / roller / winch / drum** — the mooring gear.
- **Fender / gangway** — hull protection / access.

Bridge to stations:

- **Stand by fore and aft** — be ready at both ends.
- **Send the heaving line** — throw the light line ashore.
- **Send one headline and one spring** — pass specific lines.
- **Slack away / heave in / hold on** — pay out / take up / stop and hold.
- **Make fast / all fast fore and aft** — secured.
- **Let go / let go everything** — release the lines.

Reports from stations: **Ready fore and aft**, **All lines are fast**, **All clear** (clear of the propeller).

## Anchor

- **Anchor / windlass / cable (chain) / brake** — the anchor gear.
- **Shackle** — a length of chain (about 27 m).
- **Stand by the anchor** — be ready to let go.
- **Let go the anchor / heave up the anchor** — drop / recover.
- **How is the cable?** — replies: **up and down** (vertical), **brought up** (the ship is riding to anchor).

## Helm / wheel orders

Always **repeat the order**, act, then report.

- **Midships / steady / steady as she goes** — rudder to zero / hold the heading.
- **Port / Starboard five / ten / fifteen / twenty** — rudder degrees.
- **Hard-a-port / hard-a-starboard** — full rudder.
- **Ease to five / ten / meet her** — reduce the angle / check the swing.
- **Steer one-eight-five** — steer 185 (digits one by one).

## Numbers, courses and time

Say digits one by one: 130 → "one-three-zero", course 090 → "zero-nine-zero". Time is 24-hour: 13:00 → "one-three-zero-zero (thirteen hundred)".

## How to ask again (it's fine!)

- **Say again, please.**
- **Please speak slower.**
- **I don't understand.**
- **Understood / Roger / Copy.**

## Mini-dialogues

The bosun assigns work:
> Bosun: "Today you chip and paint number two hatch. First de-rust, then primer."
> AB: "Yes, Bosun. De-rust and primer on number two hatch."

At mooring:
> Bridge: "Fore station, send one headline and one spring."
> Fore: "One headline and one spring, roger." ... "Headline is fast."

At the helm:
> Officer: "Port ten."
> AB: "Port ten... ten of port wheel on."
> Officer: "Steady."
> AB: "Steady... course one-eight-five."

## Common mistakes

- Not repeating a helm order — a serious fault, not just impoliteness.
- Staying silent when you didn't understand. Better to ask than to do the wrong thing.
- Mixing up port (left) and starboard (right). Remember: "port" and "left" are both short words.
- Standing in the **snap-back zone** (where a parted line whips back) — life-threatening.

Want to put your English to work? Find deck-rating vacancies on **seajobs.pro** — every ad shows the language and experience required.$en$)
WHERE title->>'ru' = 'Английский для матросов: палубные работы, швартовка и руль — слова и фразы с разбором';

-- ── 2. Английский для штурманов ──────────────────────────────────────────────
UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Штурман говорит по-английски постоянно: сдаёт и принимает вахту, командует рулевым, ведёт радиообмен с VTS и лоцманом, работает по МППСС, докладывает капитану. Ошибка в слове здесь может стоить очень дорого. Собрали расширенный рабочий словарь и фразы.

## Оборудование мостика (bridge equipment)

- **Radar / ARPA** — радар / система автосопровождения целей.
- **ECDIS** — электронная картография. **Chart** — карта. **Chart table** — штурманский стол.
- **Gyro compass / magnetic compass** — гирокомпас / магнитный компас.
- **Autopilot** — авторулевой. **Hand steering** — ручное управление.
- **GPS / AIS** — спутниковое место / система опознавания судов.
- **Echo sounder** — эхолот. **Speed log** — лаг (измеритель скорости).
- **VHF radio** — УКВ-радиостанция. **Telegraph** — машинный телеграф.
- **Rudder angle indicator** — указатель положения руля.

## Вахта: приём и сдача (taking over / handing over)

Что передать при смене: курс, скорость, режим руля, движение вокруг, погода, задачи капитана, особые указания.

- **To take over the watch** — принять вахту. **To hand over** — сдать.
- **Standing orders / night orders** — постоянные / ночные распоряжения капитана.
- **Traffic** — движение судов вокруг. **Target** — цель (на радаре).
- **CPA / TCPA** — минимальная дистанция сближения / время до неё.

Фраза при приёме:
> "I have the watch. Course one-two-zero, speed twelve knots, autopilot, two targets on the starboard bow, CPA one mile, visibility good, no special orders."

## Навигация и маневрирование (navigation)

- **Course / heading / bearing** — курс / текущий курс / пеленг.
- **Fix / position / DR (dead reckoning)** — обсервация / место / счислимое место.
- **Waypoint / route / leg** — путевая точка / маршрут / участок.
- **To alter course to port/starboard** — изменить курс влево/вправо.
- **To reduce / increase speed** — снизить / увеличить скорость.
- **Under keel clearance (UKC)** — запас воды под килем. **Squat** — проседание на мелководье.
- **Set and drift** — снос течением (направление и скорость).

## МППСС — расхождение судов (COLREGs)

- **Give-way vessel** — судно, уступающее дорогу. **Stand-on vessel** — сохраняющее курс и скорость.
- **Crossing / overtaking / head-on situation** — пересечение / обгон / встречное расхождение.
- **To keep clear / to pass astern** — держаться в стороне / пройти за кормой.
- **Risk of collision** — опасность столкновения. **Close-quarters situation** — опасное сближение.
- **Restricted visibility** — ограниченная видимость. **Sound signal** — звуковой сигнал.

Пример намерения:
> "A vessel is crossing from starboard. She is the stand-on vessel. I am the give-way vessel and I will alter to starboard to pass astern of her."

## Лоцман (pilot)

- **Pilot on board (POB) / pilot boarding ground** — лоцман на борту / точка приёма лоцмана.
- **Pilot ladder / combination ladder** — лоцманский / комбинированный трап.
- **Pilot card / master-pilot exchange** — карточка лоцмана / обмен информацией капитан-лоцман.
- Лоцман даёт команды на руль и в машину — вы дублируете их рулевому и следите.

## Якорная стоянка (anchoring)

- **Stand by the anchor / walk out the anchor** — приготовить / вытравить якорь.
- **Let go the port/starboard anchor** — отдать левый/правый якорь.
- **Pay out to three shackles** — потравить до трёх смычек.
- **The anchor is holding / dragging** — якорь держит / ползёт.

## VTS и радиообмен (traffic service)

- **VTS (Vessel Traffic Service)** — служба движения судов.
- **To report / to request permission** — доложить / запросить разрешение.
- **ETA / ETD** — расчётное время прибытия / отхода.

> "VTS, this is motor vessel Neptune, my ETA at the pilot station is one-four-three-zero, request permission to proceed inbound, over."

## Погода (weather)

- **Wind force / gale / swell** — сила ветра / шторм / зыбь.
- **Visibility good / moderate / poor** — видимость хорошая / средняя / плохая.
- **Fog / rain / heavy seas** — туман / дождь / сильное волнение.

## Доклад капитану

- **Nothing to report, sir.** — без замечаний.
- **Vessel crossing from starboard, CPA half a mile, request permission to alter course.** — судно справа, разрешите изменить курс.

Готовы к позиции офицера? Смотрите вакансии 2nd/3rd Officer на **seajobs.pro** — фильтр по рангу и типу судна экономит время.$ru$,
  'en', $en$A deck officer speaks English constantly: handing over and taking the watch, conning the helmsman, working the radio with VTS and the pilot, applying the COLREGs, reporting to the Master. One wrong word here can be very costly. Here is an expanded working vocabulary with phrases.

## Bridge equipment

- **Radar / ARPA** — radar / automatic target tracking.
- **ECDIS / chart / chart table** — electronic charts / paper chart / plotting table.
- **Gyro compass / magnetic compass** — the two compasses.
- **Autopilot / hand steering** — automatic / manual steering.
- **GPS / AIS** — satellite position / vessel identification.
- **Echo sounder / speed log** — depth / speed measurement.
- **VHF radio / telegraph** — radio / engine order telegraph.
- **Rudder angle indicator** — shows the rudder position.

## Taking over / handing over the watch

What to pass on: course, speed, steering mode, traffic, weather, the Master's orders, special instructions.

- **To take over / hand over the watch** — start / end your duty.
- **Standing orders / night orders** — the Master's written instructions.
- **Traffic / target** — vessels around / a radar contact.
- **CPA / TCPA** — closest point of approach / time to it.

Handover phrase:
> "I have the watch. Course one-two-zero, speed twelve knots, autopilot, two targets on the starboard bow, CPA one mile, visibility good, no special orders."

## Navigation and manoeuvring

- **Course / heading / bearing** — intended track / compass heading / direction to an object.
- **Fix / position / DR (dead reckoning)** — determined / current / estimated position.
- **Waypoint / route / leg** — a point / the plan / a segment.
- **To alter course to port/starboard** — change heading.
- **To reduce / increase speed** — the speed verbs.
- **Under keel clearance (UKC) / squat** — depth margin / sinkage in shallow water.
- **Set and drift** — the current's direction and rate.

## COLREGs — avoiding collision

- **Give-way vessel / stand-on vessel** — who keeps clear / who holds course.
- **Crossing / overtaking / head-on situation** — the three encounters.
- **To keep clear / to pass astern** — stay away / go behind.
- **Risk of collision / close-quarters situation** — the danger terms.
- **Restricted visibility / sound signal** — poor visibility / fog signal.

Stating your intention:
> "A vessel is crossing from starboard. She is the stand-on vessel. I am the give-way vessel and I will alter to starboard to pass astern of her."

## Pilot

- **Pilot on board (POB) / pilot boarding ground** — pilot aboard / boarding area.
- **Pilot ladder / combination ladder** — the access ladders.
- **Pilot card / master-pilot exchange** — the information handover.
- The pilot gives helm and engine orders — you relay them to the helmsman and monitor.

## Anchoring

- **Stand by the anchor / walk out the anchor** — prepare / lower it under power.
- **Let go the port/starboard anchor** — drop it.
- **Pay out to three shackles** — veer the cable.
- **The anchor is holding / dragging** — secure / slipping.

## VTS and radio

- **VTS (Vessel Traffic Service)** — the shore traffic service.
- **To report / to request permission** — the core radio verbs.
- **ETA / ETD** — estimated time of arrival / departure.

> "VTS, this is motor vessel Neptune, my ETA at the pilot station is one-four-three-zero, request permission to proceed inbound, over."

## Weather

- **Wind force / gale / swell** — wind strength / storm / long waves.
- **Visibility good / moderate / poor** — the visibility scale.
- **Fog / rain / heavy seas** — the conditions.

## Reporting to the Master

- **Nothing to report, sir.**
- **Vessel crossing from starboard, CPA half a mile, request permission to alter course.**

Ready for an officer position? Browse 2nd/3rd Officer vacancies on **seajobs.pro** — filter by rank and vessel type to save time.$en$)
WHERE title->>'ru' = 'Английский для штурманов: мостик, вахта и навигация — фразы, которые нужны каждый день';

-- ── 3. Английский для механиков ──────────────────────────────────────────────
UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$В машине английский нужен не для красоты, а чтобы понять чек-лист, разобрать неисправность с суперинтендантом, заказать запчасть и безопасно работать. Разберём подробно: оборудование, инструменты, действия, поломки и доклады.

## Машинное отделение (engine room)

- **Main engine (M/E)** — главный двигатель. **Auxiliary engine (A/E)** — вспомогательный.
- **Generator / alternator** — генератор. **Shaft generator** — валогенератор.
- **Boiler** — котёл. **Economizer** — утилькотёл.
- **Purifier / separator** — сепаратор. **Clarifier** — очиститель.
- **Pump** — насос. **Compressor** — компрессор. **Cooler / heat exchanger** — охладитель / теплообменник.
- **Air bottle / air receiver** — пусковой баллон. **Filter / strainer** — фильтр / грубый фильтр.

## Системы (systems)

- **Fuel oil (FO) / diesel oil (DO) / lube oil (LO)** — тяжёлое топливо / дизтопливо / масло.
- **Fresh water / sea water cooling** — пресноводное / забортное охлаждение.
- **Bilge system / ballast system** — осушительная / балластная система.
- **Starting air / control air** — пусковой / управляющий воздух.
- **Exhaust gas** — выхлопные газы. **Scavenge air** — продувочный воздух.

## Части двигателя (engine parts)

- **Piston / cylinder liner / cylinder head** — поршень / втулка / крышка цилиндра.
- **Crankshaft / connecting rod / bearing** — коленвал / шатун / подшипник.
- **Valve (inlet / exhaust)** — клапан (впускной / выпускной).
- **Injector / fuel pump** — форсунка / топливный насос.
- **Turbocharger** — турбонагнетатель. **Gasket / O-ring / seal** — прокладка / кольцо / сальник.

## Инструменты (tools)

- **Spanner / wrench** — гаечный ключ. **Socket / ratchet** — головка / трещотка.
- **Torque wrench** — динамометрический ключ. **Allen key** — шестигранник.
- **Screwdriver / pliers / hammer** — отвёртка / пассатижи / молоток.
- **Grinder / drill** — болгарка / дрель. **Feeler gauge / micrometer** — щуп / микрометр.
- **Grease gun** — шприц для смазки.

## Действия и глаголы (verbs)

- **To overhaul** — перебрать, провести ремонт. **To dismantle / to assemble** — разобрать / собрать.
- **To tighten / to loosen** — затянуть / ослабить. **To replace / to renew** — заменить.
- **To top up / to drain** — долить / слить. **To bleed the air** — стравить воздух.
- **To calibrate / to adjust** — откалибровать / отрегулировать.
- **To take clearance / take readings** — замерить зазор / снять показания.

## Неисправности (troubleshooting)

- **Leak / leakage** — течь. *The fuel pump is leaking.*
- **Overheating / high temperature** — перегрев / высокая температура.
- **Low pressure / high pressure** — низкое / высокое давление.
- **Vibration / abnormal noise / knocking** — вибрация / посторонний шум / стук.
- **Blackout** — обесточивание судна. **Scavenge fire** — пожар в продувочном коллекторе.
- **Worn out / cracked / seized** — изношено / треснуло / заклинило.
- **Spare part / requisition** — запчасть / заявка на снабжение.

## Вахта в машине (engine watch)

- **UMS (Unmanned Machinery Space)** — режим безвахтенного обслуживания.
- **Engine room log / round** — машинный журнал / обход.
- **Alarm / trip / shutdown** — тревога / срабатывание защиты / аварийный останов.
- **Standby / manoeuvring** — режим готовности / маневрирование (вахта у телеграфа).

## Безопасность (safety)

- **Permit to work** — наряд-допуск. **Enclosed space entry** — вход в замкнутое пространство.
- **Lockout / tagout** — блокировка механизма перед работой.
- **Hot work** — огневые работы. **PPE (personal protective equipment)** — СИЗ.

## Доклад о неисправности (шаблон)

> "The number two generator is overheating. The cooling water outlet temperature is high, and I can hear abnormal noise. I suspect the cooler is fouled. Request permission to stop it and clean the cooler."

## Заявка на запчасть (requisition)

> "We need to order two fuel injectors and one set of cylinder head gaskets for the main engine, maker MAN B&W, before the next port."

Ищете контракт механика? Вакансии Chief / 2nd / 3rd / 4th Engineer и ETO — на **seajobs.pro**.$ru$,
  'en', $en$In the engine room English is not decoration — you need it to read a checklist, discuss a fault with the superintendent, order a spare and work safely. Here is a detailed breakdown: equipment, tools, actions, faults and reports.

## Engine room

- **Main engine (M/E) / auxiliary engine (A/E)** — the propulsion and support engines.
- **Generator / alternator / shaft generator** — electrical power sources.
- **Boiler / economizer** — steam generation / exhaust-gas boiler.
- **Purifier / separator / clarifier** — fuel and oil cleaning.
- **Pump / compressor / cooler (heat exchanger)** — fluid and air machinery.
- **Air bottle (receiver) / filter (strainer)** — starting air / filtration.

## Systems

- **Fuel oil (FO) / diesel oil (DO) / lube oil (LO)** — heavy fuel / diesel / lubricating oil.
- **Fresh water / sea water cooling** — the two cooling circuits.
- **Bilge system / ballast system** — drainage / trimming.
- **Starting air / control air** — for starting / for controls.
- **Exhaust gas / scavenge air** — outgoing gas / charge air.

## Engine parts

- **Piston / cylinder liner / cylinder head** — the combustion parts.
- **Crankshaft / connecting rod / bearing** — the moving assembly.
- **Valve (inlet / exhaust)** — the gas-exchange valves.
- **Injector / fuel pump** — the fuel delivery.
- **Turbocharger / gasket / O-ring / seal** — boosting and sealing.

## Tools

- **Spanner (wrench) / socket / ratchet** — the basics.
- **Torque wrench / Allen key** — controlled tightening / hex bolts.
- **Screwdriver / pliers / hammer** — general hand tools.
- **Grinder / drill / feeler gauge / micrometer** — cutting and measuring.
- **Grease gun** — for lubrication points.

## Verbs

- **To overhaul** — strip and recondition. **To dismantle / to assemble** — take apart / put together.
- **To tighten / to loosen / to replace / to renew** — the fitting verbs.
- **To top up / to drain / to bleed the air** — fluid handling.
- **To calibrate / to adjust** — set correctly.
- **To take clearance / take readings** — measure gaps / record values.

## Troubleshooting

- **Leak / leakage** — *the fuel pump is leaking.*
- **Overheating / high temperature** — abnormal heat.
- **Low pressure / high pressure** — pressure faults.
- **Vibration / abnormal noise / knocking** — mechanical symptoms.
- **Blackout** — total loss of electrical power. **Scavenge fire** — a fire in the scavenge space.
- **Worn out / cracked / seized** — the wear states.
- **Spare part / requisition** — the part / the order for it.

## Engine watch

- **UMS (Unmanned Machinery Space)** — unattended running mode.
- **Engine room log / round** — the record / the inspection walk.
- **Alarm / trip / shutdown** — warning / protective action / emergency stop.
- **Standby / manoeuvring** — readiness / bridge-controlled manoeuvres.

## Safety

- **Permit to work** — the work authorization. **Enclosed space entry** — the confined-space procedure.
- **Lockout / tagout** — isolating machinery before work.
- **Hot work / PPE** — welding-type work / personal protective equipment.

## Reporting a fault (template)

> "The number two generator is overheating. The cooling water outlet temperature is high, and I can hear abnormal noise. I suspect the cooler is fouled. Request permission to stop it and clean the cooler."

## Ordering a spare (requisition)

> "We need to order two fuel injectors and one set of cylinder head gaskets for the main engine, maker MAN B&W, before the next port."

Looking for an engine contract? Chief / 2nd / 3rd / 4th Engineer and ETO vacancies are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Английский для механиков: машинное отделение, инструменты и поломки — словарь с пояснениями';
