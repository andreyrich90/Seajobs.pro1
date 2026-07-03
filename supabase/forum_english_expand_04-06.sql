-- Maritime English series — expanded posts 4-6 (≈4x more content).
-- Updates already-inserted rows (guarded seeds would skip them). Idempotent.
-- Run in the Supabase SQL Editor.

-- ── 4. Английский для повара и стюарда ───────────────────────────────────────
UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Повар и стюард — лицо быта на судне. Они общаются с многонациональным экипажем, принимают провизию в порту, ведут учёт и отвечают за санитарию. Английский тут очень практичный: продукты, приготовление, приёмка, меню и диеты. Разберём подробно.

## Помещения и оборудование (galley & equipment)

- **Galley** — камбуз. **Mess room / crew mess / officers' mess** — столовая / для команды / для офицеров.
- **Pantry** — буфетная. **Provision store** — провизионка. **Dry store** — сухая кладовая.
- **Fridge / chiller** — холодильник. **Freezer / cold room** — морозильник / морозильная камера.
- **Stove / oven / deep fryer** — плита / духовка / фритюрница.
- **Mixer / blender / slicer** — миксер / блендер / слайсер.
- **Pot / pan / tray / knife / chopping board** — кастрюля / сковорода / противень / нож / доска.

## Продукты (food & provisions)

- **Meat / beef / pork / poultry / chicken** — мясо / говядина / свинина / птица / курица.
- **Fish / seafood** — рыба / морепродукты.
- **Vegetables / potatoes / onions / carrots** — овощи / картофель / лук / морковь.
- **Fruit / apples / bananas** — фрукты / яблоки / бананы.
- **Dairy / milk / cheese / butter / eggs** — молочное / молоко / сыр / масло / яйца.
- **Flour / rice / pasta / sugar / salt** — мука / рис / макароны / сахар / соль.
- **Fresh / frozen / canned / dry** — свежий / замороженный / консервированный / сухой.

## Приготовление (cooking verbs)

- **To boil / to fry / to bake / to roast** — варить / жарить / печь / запекать.
- **To grill / to steam / to stew** — грилить / готовить на пару / тушить.
- **To chop / to slice / to peel / to mix** — рубить / нарезать / чистить / смешивать.
- **To season / to marinate** — приправить / замариновать.
- **Raw / cooked / well done / medium** — сырое / готовое / хорошо прожарено / средне.

## Приёмка провизии (taking provisions)

- **Delivery / supply / ship chandler** — поставка / снабжение / шипчандлер.
- **Order list / requisition / provision list** — заявка / список провизии.
- **Quantity / weight / carton / case / pack** — количество / вес / коробка / ящик / упаковка.
- **Expiry date / best before / shelf life** — срок годности / годен до / срок хранения.
- **To check / to count / to weigh / to sign for** — проверить / посчитать / взвесить / расписаться.
- **Shortage / missing / damaged / rejected** — недостача / не хватает / повреждено / отбраковано.

Фраза при приёмке:
> "The delivery is short by five kilos of beef, and two cartons of milk are past their expiry date. I reject them and note it on the delivery sheet."

## Меню и питание (menu)

- **Breakfast / lunch / dinner / supper** — завтрак / обед / ужин / поздний ужин.
- **Starter / main course / dessert / side dish** — закуска / основное / десерт / гарнир.
- **Soup / salad / bread / gravy / sauce** — суп / салат / хлеб / подлива / соус.
- **Portion / serving / helping** — порция.
- **Night meal** — ночная еда для вахтенных.

## Диеты и особые требования (diets)

- **Halal / no pork** — халяль / без свинины (критично для смешанного экипажа!).
- **Vegetarian / vegan** — вегетарианское / веганское.
- **Allergy / gluten-free / lactose-free** — аллергия / без глютена / без лактозы.
- Всегда уточняйте: **"Do you have any dietary requirements or allergies?"**

## Санитария и безопасность (hygiene)

- **Galley hygiene / food safety** — гигиена камбуза / безопасность продуктов.
- **Clean / disinfect / wash your hands** — чистить / дезинфицировать / мыть руки.
- **Food poisoning / expiry / cross-contamination** — отравление / просрочка / перекрёстное загрязнение.
- **Temperature control / thawing** — контроль температуры / разморозка.

## Мини-диалог

Объявление меню:
> Cook: "Today's lunch: chicken soup, beef stew with rice, and a vegetarian pasta. Dinner at eighteen hundred: grilled fish, potatoes and salad."
> Crew: "Any halal option?"
> Cook: "Yes, the chicken and the vegetarian dishes are halal."

Хороший кок ценится на вес золота. Вакансии Cook / Chief Cook / Steward — на **seajobs.pro**.$ru$,
  'en', $en$The cook and steward are the face of daily life on board. They deal with a multinational crew, take provisions in port, keep records and are responsible for hygiene. The English here is very practical: food, cooking, receiving, menu and diets. Let's go through it in detail.

## Galley & equipment

- **Galley / mess room / crew mess / officers' mess** — where food is cooked and eaten.
- **Pantry / provision store / dry store** — the storage spaces.
- **Fridge / chiller / freezer / cold room** — cooling and freezing.
- **Stove / oven / deep fryer** — the cooking appliances.
- **Mixer / blender / slicer** — the prep machines.
- **Pot / pan / tray / knife / chopping board** — the utensils.

## Food & provisions

- **Meat / beef / pork / poultry / chicken** — the meats.
- **Fish / seafood** — from the sea.
- **Vegetables / potatoes / onions / carrots** — the vegetables.
- **Fruit / apples / bananas** — the fruit.
- **Dairy / milk / cheese / butter / eggs** — the dairy group.
- **Flour / rice / pasta / sugar / salt** — the staples.
- **Fresh / frozen / canned / dry** — the four storage states.

## Cooking verbs

- **To boil / to fry / to bake / to roast** — the heat methods.
- **To grill / to steam / to stew** — more methods.
- **To chop / to slice / to peel / to mix** — the prep verbs.
- **To season / to marinate** — flavouring.
- **Raw / cooked / well done / medium** — the doneness scale.

## Taking provisions

- **Delivery / supply / ship chandler** — the supply chain.
- **Order list / requisition / provision list** — the paperwork.
- **Quantity / weight / carton / case / pack** — the units.
- **Expiry date / best before / shelf life** — freshness terms.
- **To check / to count / to weigh / to sign for** — the receiving verbs.
- **Shortage / missing / damaged / rejected** — problems on delivery.

Receiving phrase:
> "The delivery is short by five kilos of beef, and two cartons of milk are past their expiry date. I reject them and note it on the delivery sheet."

## Menu

- **Breakfast / lunch / dinner / supper** — the meals.
- **Starter / main course / dessert / side dish** — the courses.
- **Soup / salad / bread / gravy / sauce** — the extras.
- **Portion / serving / helping** — the amount per person.
- **Night meal** — food left for the watchkeepers.

## Diets & special requirements

- **Halal / no pork** — essential for a mixed crew.
- **Vegetarian / vegan** — meat-free diets.
- **Allergy / gluten-free / lactose-free** — health requirements.
- Always ask: **"Do you have any dietary requirements or allergies?"**

## Hygiene & safety

- **Galley hygiene / food safety** — the standards.
- **Clean / disinfect / wash your hands** — the routine.
- **Food poisoning / expiry / cross-contamination** — the risks.
- **Temperature control / thawing** — keeping food safe.

## Mini-dialogue

Announcing the menu:
> Cook: "Today's lunch: chicken soup, beef stew with rice, and a vegetarian pasta. Dinner at eighteen hundred: grilled fish, potatoes and salad."
> Crew: "Any halal option?"
> Cook: "Yes, the chicken and the vegetarian dishes are halal."

A good cook is worth their weight in gold. Cook / Chief Cook / Steward vacancies are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Английский для повара и стюарда: камбуз, провизия и меню — нужные слова и фразы';

-- ── 5. Собеседование на английском ───────────────────────────────────────────
UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Собеседование с судовладельцем или крюингом часто идёт на английском — по телефону, Skype или Zoom. Это не экзамен на знание языка, а проверка, что вы понимаете вопросы и можете внятно ответить. Разберём частые вопросы по блокам, с готовыми ответами-шаблонами. Выучите их — и половина стресса уйдёт.

## Знакомство (about yourself)

- **"Tell me about yourself."** — Расскажите о себе.
> "My name is Ivan Petrov. I am an Able Seaman with four years of experience, mostly on bulk carriers and general cargo vessels. My last contract finished two weeks ago."

- **"What is your rank / position?"** — Ваша должность?
> "I am applying as Able Seaman, and I also have lashing experience on RoRo vessels."

## Опыт работы (experience)

- **"What was your last vessel?"** — Какое последнее судно?
> "A 25,000 DWT bulk carrier under Panama flag. I worked as AB for four months, deck watch and maintenance."

- **"What types of vessels have you worked on?"** — На каких типах судов работали?
> "Mainly bulk carriers and general cargo, and one contract on a container ship."

- **"How many years in rank do you have?"** — Сколько лет в должности?
> "About three years in rank as AB."

## Документы (documents)

- **"Are all your documents valid?"** — Все документы действующие?
> "Yes. My CoC, STCW certificates and medical are valid. My US C1/D visa is valid until 2028."

- **"When can you join / when are you available?"** — Когда готовы к посадке?
> "I am available immediately / I can join within two weeks."

## Профессиональные и ситуационные (technical / situational)

- **"What would you do in case of fire on board?"** — Что при пожаре?
> "I would raise the alarm, report to the bridge, and act according to the muster list and the vessel's procedures."

- **"What would you do if you saw a man overboard?"** — Человек за бортом?
> "I would shout 'man overboard', throw a lifebuoy, keep pointing at the person and inform the bridge immediately."

- **"What is your experience with mooring / lashing / watchkeeping?"** — Опыт швартовки / крепления / вахты?
> "I have handled mooring lines fore and aft, and I have lashing experience on RoRo cargo."

## Личные вопросы (personal / HR)

- **"Why did you leave your last company?"** — Почему ушли?
> "My contract simply finished, and I was looking for a different vessel type." (никогда не ругайте прошлого капитана или компанию!)

- **"What are your strengths / weaknesses?"** — Сильные / слабые стороны?
> "I am reliable and I work well in a team. I am still improving my technical English, and I study it every contract."

- **"Why do you want to work for us?"** — Почему хотите к нам?
> "I know your company operates modern bulk carriers with good conditions, and I want stable, long-term cooperation."

## Если не поняли вопрос (это нормально!)

- **"Could you repeat that, please?"** — Повторите, пожалуйста.
- **"Sorry, could you speak a bit slower?"** — Можно помедленнее?
- **"Do you mean...?"** — Вы имеете в виду...?

## Вопросы, которые задать самому (ask them too)

- **"What is the rotation / contract length?"** — Какая ротация / срок контракта?
- **"What is the salary and is overtime included?"** — Какая зарплата и включён ли овертайм?
- **"Which flag is the vessel and what is the trading area?"** — Флаг и район плавания?

## Три золотых правила

1. Говорите **медленно и понятно**, а не быстро и красиво.
2. Отвечайте **конкретно**: тип судна, срок, должность, цифры.
3. **Никогда не врите** на технических вопросах — это проверяется на борту в первый же день.

Готовы пройти интервью? Актуальные вакансии от судовладельцев — на **seajobs.pro**.$ru$,
  'en', $en$The interview with an owner or crewing agency is often in English — by phone, Skype or Zoom. It is not a language exam, but a check that you understand the questions and can answer clearly. Here are the frequent questions by topic, with ready-made answer templates. Learn them and half the stress disappears.

## About yourself

- **"Tell me about yourself."**
> "My name is Ivan Petrov. I am an Able Seaman with four years of experience, mostly on bulk carriers and general cargo vessels. My last contract finished two weeks ago."

- **"What is your rank / position?"**
> "I am applying as Able Seaman, and I also have lashing experience on RoRo vessels."

## Experience

- **"What was your last vessel?"**
> "A 25,000 DWT bulk carrier under Panama flag. I worked as AB for four months, deck watch and maintenance."

- **"What types of vessels have you worked on?"**
> "Mainly bulk carriers and general cargo, and one contract on a container ship."

- **"How many years in rank do you have?"**
> "About three years in rank as AB."

## Documents

- **"Are all your documents valid?"**
> "Yes. My CoC, STCW certificates and medical are valid. My US C1/D visa is valid until 2028."

- **"When can you join / when are you available?"**
> "I am available immediately / I can join within two weeks."

## Technical / situational

- **"What would you do in case of fire on board?"**
> "I would raise the alarm, report to the bridge, and act according to the muster list and the vessel's procedures."

- **"What would you do if you saw a man overboard?"**
> "I would shout 'man overboard', throw a lifebuoy, keep pointing at the person and inform the bridge immediately."

- **"What is your experience with mooring / lashing / watchkeeping?"**
> "I have handled mooring lines fore and aft, and I have lashing experience on RoRo cargo."

## Personal / HR

- **"Why did you leave your last company?"**
> "My contract simply finished, and I was looking for a different vessel type." (never criticise a former captain or company!)

- **"What are your strengths / weaknesses?"**
> "I am reliable and I work well in a team. I am still improving my technical English, and I study it every contract."

- **"Why do you want to work for us?"**
> "I know your company operates modern bulk carriers with good conditions, and I want stable, long-term cooperation."

## If you don't understand (it's fine!)

- **"Could you repeat that, please?"**
- **"Sorry, could you speak a bit slower?"**
- **"Do you mean...?"**

## Questions to ask them

- **"What is the rotation / contract length?"**
- **"What is the salary and is overtime included?"**
- **"Which flag is the vessel and what is the trading area?"**

## Three golden rules

1. Speak **slowly and clearly**, not fast and fancy.
2. Answer **specifically**: vessel type, duration, rank, numbers.
3. **Never lie** on technical questions — it is checked on board on day one.

Ready to interview? Current owner vacancies are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Собеседование на английском: типичные вопросы крюинга и как отвечать (с примерами)';

-- ── 6. Команды на руле и в машину (SMCP) ─────────────────────────────────────
UPDATE forum_topics SET content = jsonb_build_object(
  'ru', $ru$Это не «разговорный» английский, а стандартные морские команды (IMO Standard Marine Communication Phrases, SMCP). Они одинаковы во всём мире, и импровизировать здесь нельзя — только точные формулировки. Разберём команды на руль, в машину, буксирные и швартовные, с правилами и примерами.

## Зачем нужен SMCP

Экипаж многонациональный, слышимость на мостике и по радио плохая. Одинаковые, заранее выученные фразы = ноль недопонимания в стрессовой ситуации при маневрировании, швартовке или расхождении. Ошибка в команде руля может стоить очень дорого.

## Команды на руль (helm / wheel orders)

- **Midships** — прямо руль (0°).
- **Port five / ten / fifteen / twenty / twenty-five** — лево на столько-то градусов.
- **Starboard five / ten / fifteen / twenty / twenty-five** — право на столько-то градусов.
- **Hard-a-port / Hard-a-starboard** — лево / право на борт (максимум).
- **Ease to five / ten / fifteen** — уменьшить угол перекладки.
- **Steady** — одерживать. **Steady as she goes** — держать тот курс, каким идём сейчас.
- **Meet her** — одерживать поворот (парировать рыскание).
- **Nothing to port / nothing to starboard** — не уклоняться влево / вправо от курса.

Рулевой **всегда повторяет команду**, выполняет и докладывает: "Port ten — ten of port wheel on."

## Команды на курс (course orders)

- **Steer one-eight-five** — держать курс 185°.
- Цифры называют по одной: 185 → "one-eight-five", 090 → "zero-nine-zero". Никогда "one hundred eighty-five".
- **Steer the course** — держать заданный курс.

## Команды в машину — телеграф (engine orders)

- **Full ahead / Half ahead / Slow ahead / Dead slow ahead** — полный / средний / малый / самый малый вперёд.
- **Stop engine** — стоп машина.
- **Dead slow astern / Slow astern / Half astern / Full astern** — назад с той же градацией.
- **Emergency full ahead / astern** — самый полный вперёд / назад (аварийно).
- **Finished with engines (F.W.E.)** — машина больше не нужна (по окончании маневрирования).
- **Stand by engine** — машина в готовности (перед маневрированием).

## Буксиры (tug orders)

- **Make fast the tug forward / aft** — закрепить буксир на носу / корме.
- **Tug, push / pull** — буксир, толкай / тяни.
- **Slack the towline / hold on** — потравить буксирный трос / задержать.
- **Let go the tug** — отдать буксир.

## Швартовные команды (mooring)

- **Stand by fore and aft** — готовность на баке и корме.
- **Send the heaving line** — подать бросательный.
- **Make fast / let go** — закрепить / отдать.
- **Heave in / slack away / hold on** — выбирать / травить / задержать.

## Приём/сдача управления и доклады

- **I have the con** — я управляю судном (беру управление).
- **You have the con** — вы управляете.
- Важно чётко передавать управление: только один человек «имеет con» в каждый момент.

## Мини-диалог (швартовка с лоцманом)

> Pilot: "Dead slow ahead."
> Officer (в телеграф): "Dead slow ahead." (дублирует рулевому/машине)
> Pilot: "Port twenty."
> Helmsman: "Port twenty — twenty of port wheel on."
> Pilot: "Midships. Steady."
> Helmsman: "Midships. Steady — course three-one-five."

## Частые ошибки

- Называть числа целиком ("ninety" вместо "zero-nine-zero").
- Не повторять команду (repeat back — обязательно).
- Путать "ease" (уменьшить угол) и "midships" (руль прямо).
- Говорить "over and out" по радио — так не говорят никогда.

Прокачиваете вахтенные навыки? Вакансии для рулевых, матросов и офицеров — на **seajobs.pro**.$ru$,
  'en', $en$This is not "conversational" English but standard marine orders (IMO Standard Marine Communication Phrases, SMCP). They are identical worldwide, and improvisation is not allowed — only the exact wording. Here are the helm, engine, tug and mooring orders, with the rules and examples.

## Why SMCP exists

The crew is multinational and the sound on the bridge and radio is poor. Identical, pre-learned phrases = zero misunderstanding in the stress of manoeuvring, mooring or avoiding collision. A wrong helm order can be very costly.

## Helm / wheel orders

- **Midships** — rudder to 0°.
- **Port five / ten / fifteen / twenty / twenty-five** — rudder to that many degrees left.
- **Starboard five / ten / fifteen / twenty / twenty-five** — that many degrees right.
- **Hard-a-port / Hard-a-starboard** — full rudder.
- **Ease to five / ten / fifteen** — reduce the rudder angle.
- **Steady** — check the swing. **Steady as she goes** — keep the present heading.
- **Meet her** — counter the swing.
- **Nothing to port / nothing to starboard** — do not go left / right of the course.

The helmsman **always repeats the order**, acts, and reports: "Port ten — ten of port wheel on."

## Course orders

- **Steer one-eight-five** — steer 185°.
- Digits one by one: 185 → "one-eight-five", 090 → "zero-nine-zero". Never "one hundred eighty-five".
- **Steer the course** — keep the ordered heading.

## Engine orders (telegraph)

- **Full ahead / Half ahead / Slow ahead / Dead slow ahead** — the ahead steps.
- **Stop engine.**
- **Dead slow astern / Slow astern / Half astern / Full astern** — the astern steps.
- **Emergency full ahead / astern** — maximum power in emergency.
- **Finished with engines (F.W.E.)** — the engine is no longer needed.
- **Stand by engine** — engine on standby before manoeuvring.

## Tug orders

- **Make fast the tug forward / aft** — secure the tug.
- **Tug, push / pull** — the tug directions.
- **Slack the towline / hold on** — pay out / stop.
- **Let go the tug** — release the tug.

## Mooring orders

- **Stand by fore and aft** — be ready at both ends.
- **Send the heaving line** — throw the light line ashore.
- **Make fast / let go** — secure / release.
- **Heave in / slack away / hold on** — take up / pay out / stop.

## Handing over the con and reports

- **I have the con** — I am controlling the ship.
- **You have the con** — you are controlling.
- Hand over clearly: only one person "has the con" at any moment.

## Mini-dialogue (berthing with a pilot)

> Pilot: "Dead slow ahead."
> Officer (to the telegraph): "Dead slow ahead." (relays to helmsman/engine)
> Pilot: "Port twenty."
> Helmsman: "Port twenty — twenty of port wheel on."
> Pilot: "Midships. Steady."
> Helmsman: "Midships. Steady — course three-one-five."

## Common mistakes

- Saying full numbers ("ninety" instead of "zero-nine-zero").
- Not repeating the order (repeat back is mandatory).
- Confusing "ease" (reduce the angle) with "midships" (rudder to zero).
- Saying "over and out" on the radio — it is never said.

Building your watchkeeping skills? Helmsman, rating and officer vacancies are on **seajobs.pro**.$en$)
WHERE title->>'ru' = 'Команды на руле и в машину (SMCP): стандартные фразы, которые обязан знать каждый';
