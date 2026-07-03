-- Maritime English series — expanded posts 7-10 (≈4x more content).
-- Updates already-inserted rows (guarded seeds would skip them). Idempotent.
-- Run in the Supabase SQL Editor.

-- ── 7. VHF-радиообмен ────────────────────────────────────────────────────────
UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Радиообмен идёт по строгим правилам, чтобы вас поняли даже при плохой слышимости и сильном акценте. Разберём служебные слова (procedure words), фонетический алфавит, три уровня срочности и готовые шаблоны вызовов — от обычного до Mayday.

## Служебные слова (procedure words)

- **Over** — приём (я закончил, жду ответа).
- **Out** — конец связи (ответа не жду). Никогда не говорят "over and out".
- **Roger** — принято, понял. **Copy / Copied** — принял информацию.
- **Say again** — повторите (НЕ "repeat" — у него другое значение в командах).
- **I say again** — повторяю (когда сами повторяете важное).
- **Stand by** — ждите на связи. **Wait one** — подождите минуту.
- **Affirmative / Negative** — да / нет.
- **Correction** — исправление (ошибся, даю верный вариант).
- **Read back** — повторите принятое дословно. **How do you read me?** — как слышите?
- **This is...** — вас вызывает... (называете судно). **Go ahead** — говорите.

## Фонетический алфавит (обязательно наизусть)

Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.

Цифры называют по одной: 1300 → "one-three-zero-zero". Позывной или название по буквам: NEPTUNE → "November Echo Papa Tango Uniform November Echo".

## Каналы (channels)

- **Channel 16** — канал вызова и бедствия (Ch 16).
- **Working channel** — рабочий канал. **Switch to channel...** — перейдите на канал...
- **Loud and clear** — громко и чётко. **Weak signal / broken** — слабый / прерывистый сигнал.

## Три уровня срочности (priority)

- **Mayday** — сигнал бедствия: угроза жизни или гибель судна. Абсолютный приоритет, повторяется три раза.
- **Pan-Pan** (пан-пан) — срочность: серьёзная проблема, но пока не бедствие (например, потеря управления, больной на борту).
- **Sécurité** (сэкюритэ) — безопасность: навигационное или метеопредупреждение.

## Обычный вызов (routine call)

> "Port Control, Port Control, this is motor vessel Neptune, Neptune, over."
> "Motor vessel Neptune, this is Port Control, go ahead, over."
> "Port Control, request permission to enter, my ETA is one-four-three-zero, over."
> "Neptune, permission granted, proceed to berth number five, over."
> "Proceed to berth number five, Neptune, roger, out."

## Сигнал бедствия Mayday (структура)

Порядок: Mayday ×3 → название судна ×3 → позиция → характер бедствия → нужна помощь → число людей → over.

> "Mayday, Mayday, Mayday. This is Neptune, Neptune, Neptune. My position is six-zero degrees one-two minutes North, zero-zero-five degrees East. I have a fire in the engine room. I require immediate assistance. Twenty persons on board. Over."

## Срочность Pan-Pan (пример)

> "Pan-Pan, Pan-Pan, Pan-Pan. All stations, this is Neptune. I have lost engine power and I am not under command. My position is... I request navigational warning to vessels in my area. Over."

## Полезные фразы

- **Request permission to...** — прошу разрешения...
- **What are your intentions?** — каковы ваши намерения?
- **I intend to...** — я намерен...
- **Nothing further, out** — больше нечего добавить, конец связи.

Учите радиообмен — это спасает жизни. Вакансии для моряков всех рангов — на **seajobs.pro**.$ru$,
  'en', $en$Radio traffic follows strict rules so that you are understood even with poor reception and a strong accent. Here are the procedure words, the phonetic alphabet, the three levels of urgency and ready-made call templates — from routine to Mayday.

## Procedure words

- **Over** — I have finished and expect a reply.
- **Out** — end of contact, no reply expected. Never say "over and out".
- **Roger** — received and understood. **Copy / Copied** — I received the information.
- **Say again** — please repeat (NOT "repeat" — that means something else in commands).
- **I say again** — I am repeating something important.
- **Stand by** — wait on the channel. **Wait one** — wait a moment.
- **Affirmative / Negative** — yes / no.
- **Correction** — I made an error, here is the correct version.
- **Read back** — repeat what you received word for word. **How do you read me?** — how well do you hear me?
- **This is...** — identifies the calling station. **Go ahead** — start speaking.

## Phonetic alphabet (learn by heart)

Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.

Digits one by one: 1300 → "one-three-zero-zero". Spell a name: NEPTUNE → "November Echo Papa Tango Uniform November Echo".

## Channels

- **Channel 16** — the calling and distress channel (Ch 16).
- **Working channel** — the channel you move to. **Switch to channel...** — change channel.
- **Loud and clear** — perfect reception. **Weak signal / broken** — poor / intermittent.

## Three levels of urgency

- **Mayday** — distress: grave and imminent danger to life or the ship. Absolute priority, spoken three times.
- **Pan-Pan** — urgency: a serious problem, but not yet distress (e.g. loss of control, a sick person on board).
- **Sécurité** — safety: a navigational or weather warning.

## Routine call

> "Port Control, Port Control, this is motor vessel Neptune, Neptune, over."
> "Motor vessel Neptune, this is Port Control, go ahead, over."
> "Port Control, request permission to enter, my ETA is one-four-three-zero, over."
> "Neptune, permission granted, proceed to berth number five, over."
> "Proceed to berth number five, Neptune, roger, out."

## Mayday distress call (structure)

Order: Mayday ×3 → ship name ×3 → position → nature of distress → assistance required → persons on board → over.

> "Mayday, Mayday, Mayday. This is Neptune, Neptune, Neptune. My position is six-zero degrees one-two minutes North, zero-zero-five degrees East. I have a fire in the engine room. I require immediate assistance. Twenty persons on board. Over."

## Pan-Pan urgency (example)

> "Pan-Pan, Pan-Pan, Pan-Pan. All stations, this is Neptune. I have lost engine power and I am not under command. My position is... I request a navigational warning to vessels in my area. Over."

## Useful phrases

- **Request permission to...** — asking to do something.
- **What are your intentions?** — asking another vessel's plan.
- **I intend to...** — stating your plan.
- **Nothing further, out** — no more to add, ending contact.

Learn radio work — it saves lives. Vacancies for all ranks are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'VHF-радиообмен на английском: procedure words и фразы (Mayday, Pan-Pan, Over, Roger)';

-- ── 8. Швартовные команды ────────────────────────────────────────────────────
UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Швартовка — момент, где недопонимание опасно для рук и ног. Команды короткие, стандартные, и их дублируют по рации между мостиком, баком и кормой. Разберём оборудование, все команды, доклады и — отдельно — безопасность.

## Швартовы (mooring lines)

- **Headline** — продольный носовой. **Stern line** — продольный кормовой.
- **Spring (fore spring / aft spring)** — шпринг (не даёт двигаться вперёд/назад).
- **Breast line** — прижимной (держит борт у причала).
- **Mooring line / rope / wire** — швартов / конец / стальной трос.
- **Eye / bight** — огон (петля) / шлаг.

## Оборудование (equipment)

- **Bollard / bitts** — кнехты (на причале / на судне).
- **Fairlead / Panama lead / roller** — клюз / панамский клюз / роульс.
- **Winch / warping drum / brake** — лебёдка / турачка / тормоз.
- **Heaving line / monkey fist** — бросательный конец / груз на его конце.
- **Fender / rat guard** — кранец / щит от крыс.
- **Gangway / accommodation ladder** — трап.

## Команды с мостика на посты (commands)

- **Stand by fore and aft** — приготовиться на баке и корме.
- **Send the heaving line ashore** — подать бросательный на берег.
- **Send one headline / send two springs / send one breast line** — подать конкретные концы.
- **Slack away the headline** — потравить носовой.
- **Heave in / heave away / heave tight** — выбирать / выбрать втугую.
- **Hold on / check the line** — задержать / придержать конец.
- **Make fast** — закрепить. **Make fast fore and aft** — закрепить нос и корму.
- **Ease the spring** — ослабить шпринг.
- **Single up to headline and spring** — оставить по одному носовому и шпрингу (перед отходом).
- **Let go headline / let go everything** — отдать носовой / отдать всё.

## Доклады с поста на мостик (reports)

- **Stand by** — на месте, готов.
- **Ready fore and aft** — готово на баке и корме.
- **Headline is fast / all lines are fast** — носовой закреплён / все концы закреплены.
- **All gone / all clear** — всё отдано / всё чисто (концы убраны от винта).
- **Two shackles in the water** — (при якоре) две смычки вытравлено.

## Отход от причала (unberthing)

- **Single up** — оставить по одному концу.
- **Let go fore spring / let go aft** — отдать носовой шпринг / отдать корму.
- **Let go all lines** — отдать все.
- **All gone forward / all gone aft** — на носу / корме всё отдано.

## Безопасность (важно!)

- **Snap-back zone** — зона отскока лопнувшего троса. Никогда не стой в ней.
- **The line is under tension / the line parted** — трос под нагрузкой / трос лопнул.
- **Mind your hands / mind the line / stand clear** — берегите руки / следите за концом / отойди.
- **Take a turn / surge the line** — взять шлаг на кнехт / потравить с проскальзыванием.

## Мини-диалог

> Bridge: "Fore station, send one headline and one spring."
> Fore: "One headline and one spring, roger." ... "Headline is fast, spring is fast."
> Bridge: "Heave tight the spring, make fast."
> Fore: "Heave tight and make fast, roger. All fast forward."

Опытный швартовщик — ценный член команды. Вакансии для матросов и боцманов — на **seajobs.pro**.$ru$,
  'en', $en$Mooring is the moment where a misunderstanding is dangerous for hands and legs. The commands are short and standard, and they are relayed by radio between the bridge, the forward and the after stations. Here are the equipment, all the commands, the reports and — separately — safety.

## Mooring lines

- **Headline / stern line** — the fore-and-aft lines.
- **Spring (fore spring / aft spring)** — stops the ship moving ahead/astern.
- **Breast line** — holds the ship in alongside.
- **Mooring line / rope / wire** — the lines and steel wires.
- **Eye / bight** — the loop / a loop in the line.

## Equipment

- **Bollard / bitts** — the mooring posts (shore / ship).
- **Fairlead / Panama lead / roller** — the line guides.
- **Winch / warping drum / brake** — the mooring machinery.
- **Heaving line / monkey fist** — the light line and its weighted end.
- **Fender / rat guard** — hull protection / rodent guard.
- **Gangway / accommodation ladder** — access.

## Bridge to stations (commands)

- **Stand by fore and aft** — be ready at both ends.
- **Send the heaving line ashore** — throw the light line to the dock.
- **Send one headline / send two springs / send one breast line** — pass specific lines.
- **Slack away the headline** — pay out.
- **Heave in / heave away / heave tight** — take up / take up firmly.
- **Hold on / check the line** — stop and hold / ease the strain gradually.
- **Make fast / make fast fore and aft** — secure the lines.
- **Ease the spring** — reduce the tension.
- **Single up to headline and spring** — reduce to one line each before leaving.
- **Let go headline / let go everything** — release lines.

## Reports from stations

- **Stand by** — in position, ready.
- **Ready fore and aft** — ready at both ends.
- **Headline is fast / all lines are fast** — secured.
- **All gone / all clear** — all released / clear of the propeller.
- **Two shackles in the water** — (anchor) two shackles veered.

## Unberthing

- **Single up** — reduce to one line each.
- **Let go fore spring / let go aft** — release specific lines.
- **Let go all lines** — release everything.
- **All gone forward / all gone aft** — released at each end.

## Safety (important!)

- **Snap-back zone** — where a parted line whips back. Never stand in it.
- **The line is under tension / the line parted** — loaded / broke.
- **Mind your hands / mind the line / stand clear** — the warnings.
- **Take a turn / surge the line** — put a turn on the bitts / let it slip under control.

## Mini-dialogue

> Bridge: "Fore station, send one headline and one spring."
> Fore: "One headline and one spring, roger." ... "Headline is fast, spring is fast."
> Bridge: "Heave tight the spring, make fast."
> Fore: "Heave tight and make fast, roger. All fast forward."

An experienced mooring hand is a valued crew member. Deck-rating and bosun vacancies are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Швартовные команды на английском: слова и фразы для бака и кормы';

-- ── 9. Грузовые операции и бункеровка ────────────────────────────────────────
UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Погрузка, выгрузка и бункеровка — это работа с терминалом, сюрвейером, докерами и баржой, часто на английском. Ошибки дорого стоят: перелив топлива, повреждённый груз, неверная осадка. Разберём словарь и фразы по палубе, грузу и бункеровке.

## Грузовые операции (cargo operations)

- **To load / to discharge** — грузить / выгружать.
- **Cargo hold / tank / hatch** — трюм / танк / грузовой люк.
- **Loading rate / discharge rate** — темп погрузки / выгрузки.
- **To commence / to stop / to resume** — начать / остановить / возобновить.
- **Deadweight (DWT) / cargo quantity** — дедвейт / количество груза.
- **Bulk / general / containerised / liquid cargo** — навалочный / генеральный / контейнерный / наливной груз.

## Остойчивость и осадка (stability & draft)

- **Draft / draught (forward / aft / mean)** — осадка (нос / корма / средняя).
- **Trim / list** — дифферент / крен.
- **Ballast / deballast** — принимать / откачивать балласт.
- **Even keel** — на ровный киль. **Stress / bending moment** — напряжения / изгибающий момент.
- **Loading plan / sequence** — грузовой план / очерёдность.

## Люди на терминале (people)

- **Stevedore / longshoreman** — докер. **Foreman** — бригадир докеров.
- **Surveyor** — сюрвейер. **Tally / tally clerk** — счёт мест / тальман.
- **Terminal / berth / quay** — терминал / причал / набережная.

## Документы (documents)

- **Bill of lading (B/L)** — коносамент. **Cargo manifest** — грузовой манифест.
- **Stowage plan** — план размещения груза. **Mate's receipt** — штурманская расписка.
- **Damage report / letter of protest** — акт о повреждении / письмо-протест.

## Крепление груза (securing)

- **Lashing / securing** — крепление. **Lashing gear / turnbuckle / chain** — крепёж / талреп / цепь.
- **Twist lock** — фитинг для контейнеров. **Dunnage** — сепарация (подкладки).
- **The cargo shifted** — груз сместился.

## Бункеровка (bunkering)

- **Bunker / bunkering / bunker fuel** — топливо / приём топлива.
- **Barge / bunker barge** — бункеровочная баржа. **Hose / manifold** — шланг / приёмный коллектор.
- **Connect / disconnect the hose** — присоединить / отсоединить шланг.
- **Commence / stop pumping** — начать / прекратить перекачку.
- **Sounding / ullage** — замер уровня (снизу) / пустота (сверху) в танке.
- **Flow rate / pressure** — расход / давление.
- **Topping up / final trim** — дозаливка / доведение до нормы.
- **Overflow / spill** — перелив / разлив (авария!). **Bunker sample** — проба топлива.
- **SOPEP** — судовой план ликвидации разливов нефти. **Scupper plug** — пробка шпигата.

## Согласование перед бункеровкой (pre-transfer)

Перед стартом согласуют расход, сигналы, аварийную остановку. Фраза:
> "Stand by to commence bunkering. Agreed rate two hundred cubic metres per hour, maximum pressure four bar. Emergency stop signal is three long blasts. Communication on channel six. Confirm, please."

## Мини-диалог (грузовые)

> Officer: "Commence loading, slow rate please, we start the sequence."
> Terminal: "Commencing slow rate, roger."
> Officer: "Increase to full loading rate."
> ... "Stop loading, hold number three is full."

Знание процедур на английском ценят на каждом судне. Вакансии на танкеры, балкеры и контейнеровозы — на **seajobs.pro**.$ru$,
  'en', $en$Loading, discharging and bunkering mean working with the terminal, the surveyor, the stevedores and the barge, often in English. Mistakes are costly: a fuel overflow, damaged cargo, the wrong draft. Here is the vocabulary and the phrases for deck, cargo and bunkering.

## Cargo operations

- **To load / to discharge** — the two core verbs.
- **Cargo hold / tank / hatch** — where cargo goes and its opening.
- **Loading rate / discharge rate** — the flow speed.
- **To commence / to stop / to resume** — controlling the operation.
- **Deadweight (DWT) / cargo quantity** — capacity / amount loaded.
- **Bulk / general / containerised / liquid cargo** — the cargo types.

## Stability & draft

- **Draft / draught (forward / aft / mean)** — how deep the ship sits.
- **Trim / list** — fore-aft / sideways inclination.
- **Ballast / deballast** — adjusting weight for stability.
- **Even keel** — level. **Stress / bending moment** — hull loads.
- **Loading plan / sequence** — the order of loading.

## People at the terminal

- **Stevedore / longshoreman / foreman** — the dock workers and their boss.
- **Surveyor / tally (clerk)** — inspects / counts the cargo.
- **Terminal / berth / quay** — the shore facilities.

## Documents

- **Bill of lading (B/L) / cargo manifest** — the cargo paperwork.
- **Stowage plan / mate's receipt** — placement / receipt of cargo.
- **Damage report / letter of protest** — recording problems.

## Securing cargo

- **Lashing / securing** — holding cargo in place.
- **Lashing gear / turnbuckle / chain** — the securing hardware.
- **Twist lock / dunnage** — container fitting / packing material.
- **The cargo shifted** — it moved during the voyage.

## Bunkering

- **Bunker / bunkering / bunker fuel** — the fuel and the operation.
- **Barge (bunker barge) / hose / manifold** — the transfer equipment.
- **Connect / disconnect the hose** — the connection verbs.
- **Commence / stop pumping** — controlling the transfer.
- **Sounding / ullage** — level from the bottom / empty space from the top.
- **Flow rate / pressure** — the transfer parameters.
- **Topping up / final trim** — finishing the tank levels.
- **Overflow / spill** — a pollution emergency. **Bunker sample** — the fuel sample.
- **SOPEP / scupper plug** — the pollution plan / deck drain plug.

## Pre-transfer agreement

Before starting, agree the rate, the signals and the emergency stop. Phrase:
> "Stand by to commence bunkering. Agreed rate two hundred cubic metres per hour, maximum pressure four bar. Emergency stop signal is three long blasts. Communication on channel six. Confirm, please."

## Mini-dialogue (cargo)

> Officer: "Commence loading, slow rate please, we start the sequence."
> Terminal: "Commencing slow rate, roger."
> Officer: "Increase to full loading rate."
> ... "Stop loading, hold number three is full."

Knowing the procedures in English is valued on every ship. Tanker, bulker and container vacancies are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Грузовые операции и бункеровка на английском: словарь и фразы для палубы и машины';

-- ── 10. Аварийные ситуации и безопасность ────────────────────────────────────
UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$В аварии нет времени подбирать слова. Эти термины и команды нужно знать на автомате — от них зависит жизнь. Разберём тревоги, учения, команды, спасательное и противопожарное оборудование, первую помощь и объявления по трансляции.

## Тревоги и сигналы (alarms & signals)

- **General alarm** — общесудовая тревога: семь коротких + один длинный сигнал.
- **Fire alarm** — пожарная тревога. **Abandon ship** — оставление судна.
- **Man overboard (MOB)** — человек за бортом.
- **Muster / muster station / muster list** — сбор / место сбора / расписание по тревогам.
- **Emergency stations** — по местам стоять (по аварийному расписанию).

## Учения (drills)

- **Fire drill** — учебная пожарная тревога. **Boat drill / abandon ship drill** — шлюпочная тревога.
- **Enclosed space rescue drill** — учение по спасению из замкнутого пространства.
- **Head count / roll call** — перекличка (все ли на месте).
- **This is a drill** — это учение (обязательно объявляют, чтобы не было паники).

## Команды и доклады (commands & reports)

- **Raise the alarm / sound the alarm** — поднять / дать тревогу.
- **Report to your muster station** — прибыть на место сбора.
- **All crew accounted for** — весь экипаж на месте. **One person missing** — одного не хватает.
- **Fight the fire / boundary cooling** — тушить пожар / охлаждать переборки.
- **Close the fire doors / stop ventilation** — закрыть противопожарные двери / остановить вентиляцию.
- **Is anyone injured? / send the first aid party** — есть пострадавшие? / выслать группу первой помощи.
- **Prepare the lifeboats / lower the lifeboat** — приготовить / спустить шлюпку.

## Противопожарное оборудование (fire fighting / FFA)

- **Fire extinguisher (foam / CO2 / dry powder)** — огнетушитель (пенный / углекислотный / порошковый).
- **Fire hose / nozzle / hydrant** — пожарный рукав / ствол / гидрант.
- **Fire main / fire pump** — пожарная магистраль / насос.
- **Breathing apparatus (SCBA)** — дыхательный аппарат. **Fireman's outfit** — снаряжение пожарного.
- **Fire blanket / EEBD** — кошма / аварийный дыхательный аппарат для эвакуации.

## Спасательное оборудование (life-saving / LSA)

- **Lifejacket / lifebuoy** — спасжилет / спасательный круг.
- **Immersion suit** — гидрокостюм. **Lifeboat / liferaft** — шлюпка / плот.
- **EPIRB / SART** — аварийный радиобуй / радиолокационный ответчик.
- **Line-throwing appliance / pyrotechnics (flares)** — линемёт / пиротехника (фальшфейеры).
- **Muster list / embarkation station** — расписание / место посадки в шлюпки.

## Первая помощь (first aid)

- **Injured / unconscious / bleeding / burn / fracture** — пострадавший / без сознания / кровотечение / ожог / перелом.
- **Casualty / stretcher / CPR** — пострадавший / носилки / сердечно-лёгочная реанимация.
- **Call for medical assistance** — вызвать медицинскую помощь.

## Объявление по трансляции (PA announcement)

Фраза, которую нельзя перепутать:
> "Attention all crew. Fire in the engine room. This is NOT a drill. Report to your muster stations immediately."

Или наоборот:
> "Attention all crew. Fire drill, fire drill. This is a drill. Report to your muster stations."

## Мини-диалог (перекличка на сборе)

> Officer: "Muster complete? Report."
> Bosun: "Deck party all present."
> Second Engineer: "Engine party all present, one person missing — the wiper."
> Officer: "Send a search party for the wiper, last seen in the engine room."

Безопасность — общий язык моряков всего мира. Вакансии от судовладельцев, которые серьёзно относятся к безопасности, — на **seajobs.pro**.$ru$,
  'en', $en$In an emergency there is no time to search for words. These terms and commands must be automatic — lives depend on them. Here are the alarms, drills, commands, life-saving and fire-fighting equipment, first aid and public-address announcements.

## Alarms & signals

- **General alarm** — seven short blasts plus one long.
- **Fire alarm / abandon ship** — the two most serious.
- **Man overboard (MOB).**
- **Muster / muster station / muster list** — assembly / where / who goes where.
- **Emergency stations** — take your emergency positions.

## Drills

- **Fire drill / boat drill (abandon ship drill)** — the routine exercises.
- **Enclosed space rescue drill** — confined-space rescue practice.
- **Head count / roll call** — checking everyone is present.
- **This is a drill** — always announced to avoid panic.

## Commands & reports

- **Raise the alarm / sound the alarm** — start the alarm.
- **Report to your muster station** — assemble.
- **All crew accounted for / one person missing** — the head-count result.
- **Fight the fire / boundary cooling** — attack / cool the surrounding structure.
- **Close the fire doors / stop ventilation** — contain the fire.
- **Is anyone injured? / send the first aid party** — casualties / medical response.
- **Prepare the lifeboats / lower the lifeboat** — abandon-ship actions.

## Fire fighting (FFA)

- **Fire extinguisher (foam / CO2 / dry powder)** — the portable types.
- **Fire hose / nozzle / hydrant** — the water attack gear.
- **Fire main / fire pump** — the pressurised system.
- **Breathing apparatus (SCBA) / fireman's outfit** — the personal fire gear.
- **Fire blanket / EEBD** — smothering / emergency escape breathing device.

## Life-saving (LSA)

- **Lifejacket / lifebuoy** — personal / throwing float.
- **Immersion suit / lifeboat / liferaft** — survival craft and suit.
- **EPIRB / SART** — the distress-locating beacons.
- **Line-throwing appliance / pyrotechnics (flares)** — the signalling gear.
- **Muster list / embarkation station** — the plan / where you board the boats.

## First aid

- **Injured / unconscious / bleeding / burn / fracture** — the conditions.
- **Casualty / stretcher / CPR** — the person / carrier / resuscitation.
- **Call for medical assistance** — get help.

## PA announcement

The phrase you must not confuse:
> "Attention all crew. Fire in the engine room. This is NOT a drill. Report to your muster stations immediately."

Or the opposite:
> "Attention all crew. Fire drill, fire drill. This is a drill. Report to your muster stations."

## Mini-dialogue (roll call at muster)

> Officer: "Muster complete? Report."
> Bosun: "Deck party all present."
> Second Engineer: "Engine party all present, one person missing — the wiper."
> Officer: "Send a search party for the wiper, last seen in the engine room."

Safety is the common language of seafarers everywhere. Vacancies from owners who take safety seriously are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Аварийный английский: тревоги, учения и команды в чрезвычайной ситуации';
