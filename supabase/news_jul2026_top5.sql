-- Top-5 maritime news (03.07.2026) — professional rewrites for the News section.
-- Bilingual ru+en (ua/pl can be added via the admin "translate" button).
-- Idempotent — each INSERT is guarded by the Russian title. Run once in the
-- Supabase SQL Editor.

-- ── 1. Seafarer Workforce Report 2026 ────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'ru', 'Морякам официально не хватает 39 тысяч офицеров — вышел Seafarer Workforce Report 2026',
    'en', 'The industry is officially short 39,000 officers — Seafarer Workforce Report 2026 is out'),
  jsonb_build_object(
    'ru', $ru$BIMCO и Международная палата судоходства (ICS) опубликовали свежий отчёт о кадрах в морской отрасли — и цифры говорят сами за себя. Уже в 2026 году мировому флоту не хватает **39 100 дипломированных офицеров**, а к 2030 году отрасли понадобится ещё **113 735 офицеров** сверх нынешней численности.

Сегодня на 85 148 торговых судах по всему миру работают около 2,57 млн моряков. Спрос на дипломированных специалистов вырос на 35% по сравнению с отчётом 2021 года: на офицеров — плюс 23%, на рядовой состав — плюс 46%. При этом по рядовым позициям рынок насыщен — отчёт фиксирует профицит почти в 57 тысяч человек.

Чтобы закрыть разрыв, каждый год до 2030-го в профессию должны приходить почти 23 тысячи новых офицеров. Авторы отчёта призывают администрации флагов системно следить за набором и удержанием кадров, продвигать морское образование и честно рассказывать о карьерных треках — включая переход на береговые должности.

## Что это значит для моряка

Вывод простой: диплом и ценз сейчас стоят дороже, чем когда-либо, — рынок работает на соискателя-офицера. Если вы давно откладывали следующий диплом, самое время заняться им: спрос на офицеров будет только расти.

Свежие вакансии для офицеров всех уровней — в разделе вакансий на **seajobs.pro**.$ru$,
    'en', $en$BIMCO and the International Chamber of Shipping (ICS) have published their new maritime workforce report — and the numbers speak for themselves. Already in 2026 the world fleet is short of **39,100 STCW-certified officers**, and by 2030 the industry will need an additional **113,735 officers** on top of today's numbers.

Around 2.57 million seafarers currently crew 85,148 merchant ships worldwide. Demand for certified seafarers has grown 35% since the 2021 report: officers up 23%, ratings up 46%. The ratings market, meanwhile, is saturated — the report records a surplus of almost 57,000 people.

To close the gap, nearly 23,000 new officers must join the profession every year until 2030. The authors urge flag administrations to monitor recruitment and retention closely, promote maritime education and present career paths honestly — including the transition to shore-based roles.

## What it means for seafarers

The takeaway is simple: a CoC and sea time are worth more now than ever — this is an officer's market. If you have been postponing your next certificate, now is the time: demand for officers will only grow.

Fresh officer vacancies at every level — in the jobs section on **seajobs.pro**.$en$),
  'Industry',
  'linear-gradient(135deg,#0c4a6e,#155e75)',
  true, '2026-07-03 08:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'ru' = 'Морякам официально не хватает 39 тысяч офицеров — вышел Seafarer Workforce Report 2026');

-- ── 2. Ормузский пролив ──────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'ru', 'Ормузский пролив: 14 погибших моряков, эвакуация 2 500 человек приостановлена после новой атаки',
    'en', 'Strait of Hormuz: 14 seafarers dead, evacuation of 2,500 paused after new attack'),
  jsonb_build_object(
    'ru', $ru$Кризис в Ормузском проливе остаётся главной болью отрасли. По данным IMO, с конца февраля зафиксировано **46 атак на торговые суда, погибли 14 моряков**. ООН успела эвакуировать из Персидского залива около **2 500 застрявших моряков**, но после атаки на контейнеровоз Ever Lovely у побережья Омана 25 июня операция была поставлена на паузу — план вывезти ещё 11 тысяч человек завис в воздухе.

Тем временем в Таиланд репатриированы останки трёх моряков балкера Mayuree Naree, погибших при атаке ещё 11 марта — семьи ждали этого больше трёх месяцев.

## Осторожная надежда

Дипломатия даёт осторожную надежду: подписан предварительный меморандум и объявлено 60-дневное окно переговоров. Но судоходные компании пока не спешат возвращать суда на маршрут: гарантий безопасного прохода по-прежнему никто не даёт.

## Что проверить в контракте

Морякам, рассматривающим контракты с заходами в регион, стоит внимательно читать условия о военных зонах (war zone clause): размер надбавки, право на досрочное списание при заходе в опасный район и покрытие страховки. Это не формальность — это ваши деньги и ваша безопасность.$ru$,
    'en', $en$The Strait of Hormuz crisis remains the industry's biggest pain point. According to the IMO, **46 attacks on merchant ships** have been recorded since late February, and **14 seafarers have been killed**. The UN managed to evacuate around **2,500 stranded seafarers** from the Persian Gulf, but after the container ship Ever Lovely was attacked off Oman on 25 June the operation was paused — leaving the plan to bring out another 11,000 people in limbo.

Meanwhile, the remains of three seafarers from the bulker Mayuree Naree, killed in the attack of 11 March, have been repatriated to Thailand — their families waited more than three months.

## Cautious hope

Diplomacy offers cautious hope: a preliminary memorandum has been signed and a 60-day negotiation window announced. But shipping companies are in no rush to return their vessels to the route: no one can yet guarantee safe passage.

## What to check in your contract

Seafarers considering contracts calling in the region should read the war zone clauses carefully: the size of the bonus, the right to sign off before entering a high-risk area, and the insurance cover. This is not a formality — it is your money and your safety.$en$),
  'Safety',
  'linear-gradient(135deg,#7c2d12,#9a3412)',
  true, '2026-07-03 09:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'ru' = 'Ормузский пролив: 14 погибших моряков, эвакуация 2 500 человек приостановлена после новой атаки');

-- ── 3. A.P. Moller Holding / Ocean Yield ─────────────────────────────────────
INSERT INTO news_articles (title, body, tag, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'ru', 'Семья Maersk выкупает Ocean Yield: более 70 судов меняют владельца',
    'en', 'The Maersk family buys Ocean Yield: 70+ vessels change hands'),
  jsonb_build_object(
    'ru', $ru$A.P. Moller Holding — инвестиционная компания семьи Мёрск — 2 июля объявила о покупке 100% норвежской Ocean Yield у фонда KKR. Это одна из крупнейших сделок года в судоходстве: Ocean Yield владеет долями более чем в **70 современных судах** — газовозы, контейнеровозы, танкеры (нефть, продукты, химия) и балкеры.

При KKR компания вложила в развитие флота свыше $3 млрд и почти удвоила портфель долгосрочных контрактов — до $5+ млрд. Особый интерес покупателя — СПГ-сегмент: на него приходится почти половина инвестиций Ocean Yield, всего 30 судов. Сделка ожидает стандартных регуляторных одобрений; KKR останется стратегическим партнёром через совместную инвестицию в CapeOmega Gas Transportation.

## Почему это важно морякам

Такие сделки — индикатор здоровья отрасли: когда «старые деньги» судоходства скупают лизинговые платформы с современным флотом, это ставка на длинный цикл. Современные газовозы и танкеры — это новые рабочие места с хорошими ставками, особенно для механиков и офицеров с газовым опытом. Если вы думали о переходе в СПГ-сегмент — рынок подтверждает: направление растёт.$ru$,
    'en', $en$A.P. Moller Holding — the Maersk family's investment company — announced on 2 July that it is acquiring 100% of Norway's Ocean Yield from funds managed by KKR. It is one of the year's biggest deals in shipping: Ocean Yield holds interests in more than **70 modern vessels** — gas carriers, container ships, tankers (crude, product, chemical) and bulk carriers.

Under KKR, the company invested over $3 billion in fleet growth and nearly doubled its long-term contracted backlog to $5+ billion. The buyer's particular interest is the LNG segment: it accounts for almost half of Ocean Yield's investments — 30 vessels in total. The deal awaits customary regulatory approvals; KKR remains a strategic partner through the joint investment in CapeOmega Gas Transportation.

## Why it matters to seafarers

Deals like this are a health indicator for the industry: when shipping's "old money" buys leasing platforms with modern fleets, it is a bet on the long cycle. Modern gas carriers and tankers mean new jobs at good rates — especially for engineers and officers with gas experience. If you have been considering a move into LNG, the market has just confirmed: the segment is growing.$en$),
  'Market',
  'linear-gradient(135deg,#1e293b,#334155)',
  true, '2026-07-03 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'ru' = 'Семья Maersk выкупает Ocean Yield: более 70 судов меняют владельца');

-- ── 4. Обучение альтернативным топливам ──────────────────────────────────────
INSERT INTO news_articles (title, body, tag, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'ru', 'До 800 тысяч моряков придётся переучиваться: отрасль готовит стандарты для аммиака, метанола и водорода',
    'en', 'Up to 800,000 seafarers will need retraining: standards coming for ammonia, methanol and hydrogen'),
  jsonb_build_object(
    'ru', $ru$Целевая группа Maritime Just Transition (проект IMO, ICS и ITF) продвигает первые в истории учебные стандарты для экипажей судов на альтернативном топливе — **аммиаке, метаноле и водороде**. Проект типовых руководств уже согласован подкомитетом IMO по подготовке моряков (HTW) и одобрен Комитетом по безопасности на море; полноценные официальные требования — на подходе.

Масштаб переобучения беспрецедентный: по оценкам исследователей, к 2030 году работе с новыми видами топлива придётся обучить **от 300 до 800 тысяч моряков**. Учебные модули выходят поэтапно: первым готов метанол, за ним следуют аммиак и водород. Материалы рассчитаны и на рядовой состав, и на старших офицеров, плюс отдельные пособия для инструкторов.

## Что это значит на практике

Сертификат по работе с метанолом или аммиаком в ближайшие годы станет тем же, чем в своё время стали танкерные допуски, — билетом в самый высокооплачиваемый сегмент флота. Судов на новом топливе всё больше, а обученных экипажей мало. Кто переучится раньше, тот и займёт лучшие контракты.$ru$,
    'en', $en$The Maritime Just Transition Task Force (an IMO, ICS and ITF initiative) is driving the first-ever training standards for crews of ships running on alternative fuels — **ammonia, methanol and hydrogen**. The draft generic guidelines have been agreed by the IMO's HTW sub-committee and approved by the Maritime Safety Committee; full official requirements are on the way.

The scale of retraining is unprecedented: researchers estimate that **300,000 to 800,000 seafarers** will need to be trained on the new fuels by 2030. Training modules are being released in stages: methanol first, with ammonia and hydrogen to follow. The materials cover both ratings and senior officers, with dedicated instructor handbooks.

## What it means in practice

In the coming years a methanol or ammonia endorsement will become what tanker certificates once were — a ticket into the fleet's best-paid segment. Ships on new fuels are multiplying, while trained crews are scarce. Those who retrain first will take the best contracts.$en$),
  'Technology',
  'linear-gradient(135deg,#14532d,#166534)',
  true, '2026-07-03 11:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'ru' = 'До 800 тысяч моряков придётся переучиваться: отрасль готовит стандарты для аммиака, метанола и водорода');

-- ── 5. Инцидент в Корфу ──────────────────────────────────────────────────────
INSERT INTO news_articles (title, body, tag, cover_gradient, is_published, published_at)
SELECT
  jsonb_build_object(
    'ru', 'Корфу: лопнувшие швартовы, пассажирка в воде и капитан в полиции',
    'en', 'Corfu: parted mooring lines, a passenger in the water and a captain at the police station'),
  jsonb_build_object(
    'ru', $ru$Инцидент, который обсуждает весь круизный флот. Вечером 30 июня в порту Корфу (Греция) при сильном ветре у круизного лайнера под багамским флагом **лопнули швартовые концы**. Судно сместилось от причала в тот момент, когда по трапу возвращались пассажиры с экскурсий, — 56-летняя туристка из Новой Зеландии не удержалась на ходящем трапе и упала в воду.

Женщину быстро подняли экипаж и портовые рабочие — она отделалась ушибами и была доставлена в больницу. Береговая охрана Греции задержала 56-летнего капитана-итальянца: ему вменяют создание угрозы жизни. Круизная компания, впрочем, настаивает: капитан лишь дал показания «по стандартной процедуре» и под арестом не находился.

## Два урока для моряков

Первый — о том, почему за натяжением швартовов при штормовом прогнозе следят непрерывно, а трап при подвижках судна убирают немедленно.

Второй — о личной уголовной ответственности капитана в иностранном порту: даже когда виноват ветер, отвечать перед местным судом приходится человеку на мостике. Ещё один аргумент выбирать компании, которые обеспечивают экипажу юридическую поддержку (P&I, программы защиты моряков).$ru$,
    'en', $en$An incident the whole cruise fleet is talking about. On the evening of 30 June, in the Port of Corfu (Greece), strong winds caused the **mooring lines of a Bahamas-flagged cruise ship to part**. The vessel shifted off the quay just as passengers were returning up the gangway from shore excursions — a 56-year-old tourist from New Zealand lost her balance on the moving gangway and fell into the water.

The crew and port workers pulled her out quickly — she escaped with bruises and was taken to hospital. The Hellenic Coast Guard detained the ship's 56-year-old Italian captain on charges of exposing a person to life-threatening danger. The cruise line, however, insists the captain merely gave a statement "as per standard protocol" and was never under arrest.

## Two lessons for seafarers

First — why mooring line tension is monitored continuously in heavy weather, and why the gangway is pulled in the moment the ship starts to move.

Second — the master's personal criminal liability in a foreign port: even when the wind is to blame, it is the person on the bridge who answers to the local court. One more argument for choosing companies that provide legal support to their crews (P&I cover, seafarer defence programmes).$en$),
  'Safety',
  'linear-gradient(135deg,#3b0764,#4c1d95)',
  true, '2026-07-03 12:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title->>'ru' = 'Корфу: лопнувшие швартовы, пассажирка в воде и капитан в полиции');
