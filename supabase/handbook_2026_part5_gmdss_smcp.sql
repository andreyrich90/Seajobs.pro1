-- The seafarer's handbook, part 5 (category = 'handbook'): GMDSS and SMCP,
-- in the same format as parts 1–4. Both rows carry a fixed id so the two
-- articles can link to each other at their canonical per-language URLs.
-- SMCP is written as a phrase reference and links to the existing guides on
-- maritime English, the Marlins test and the CES test (which keep the "why
-- and how to improve" query) instead of repeating them.
--
-- Facts, GMDSS (SOLAS chapter IV; 1988 amendments, phased in from 1992,
-- fully in force 1 February 1999; chapter IV modernised from 1 January 2024;
-- Iridium recognised 2018): the nine functions, sea areas A1–A4, carriage per
-- area (IV/7–11), SART and survival-craft VHF numbers (III/6), maintenance
-- methods (IV/15: one for A1/A2, two for A3/A4), DSC ch 70 / 2187.5 kHz / HF
-- 4207.5–16804.5 kHz, voice ch 16 / 2182 kHz / HF 4125–16420 kHz, MMSI and
-- MID, ship actions on receiving a DSC alert (no DSC acknowledgement or relay
-- unless an RCC asks), false-alert cancellation (A.814(19) broadcast), EPIRB
-- 406 MHz + 121.5 MHz homing, HRU at no more than 4 m, annual test and 5-year
-- shore maintenance (IV/15.9), SART 9 GHz / 12 dots / 96 h + 8 h, NAVTEX
-- 518 / 490 kHz and the A, B, D, L messages that cannot be rejected, GOC/ROC
-- (STCW IV/2), SRC/LRC.
-- SMCP (resolution A.918(22), Nov 2001, replacing the 1977 SMNV; STCW table
-- A-II/1): parts A and B, the eight message markers and the meaning of
-- INSTRUCTION, the standard responses, mistake/correction, numbers digit by
-- digit except rudder angles, ITU digit pronunciation, three-figure courses
-- and bearings, UTC, the phonetic alphabet, MAYDAY / PAN-PAN / SÉCURITÉ and
-- the distress phrases, SEELONCE MAYDAY / PRUDONCE / SEELONCE FEENEE, the
-- standard wheel and engine orders, berthing and anchoring phrases.
--
-- en + ru + ua + pl. Covers are set at the end — run after the deploy that
-- adds public/handbook/{gmdss,smcp}.png.
-- Idempotent — guarded by the id and the English title.

-- ── H1. GMDSS ─────────────────────────────────────────────────────────────────
INSERT INTO news_articles (id, title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  '8bda0946-1e5d-4e0c-9369-896823d11b2b'::uuid,
  jsonb_build_object(
    'en', 'GMDSS in plain words: sea areas, DSC, EPIRB and SART, false alerts and interview questions',
    'ru', 'ГМССБ (GMDSS) простыми словами: морские районы, ЦИВ, EPIRB и SART, ложная тревога и вопросы на собеседовании',
    'ua', 'ГМЗЛБ (GMDSS) простими словами: морські райони, ЦВВ, EPIRB і SART, хибна тривога та питання на співбесіді',
    'pl', 'GMDSS w prostych słowach: obszary morskie, DSC, EPIRB i SART, fałszywy alarm i pytania na rozmowie'),
  jsonb_build_object(
    'en', $en$The GMDSS is the reason a ship in trouble no longer depends on someone hearing a Morse key. One button on the bridge sends the ship's identity, position and the nature of the distress to every station in range, and a buoy that floats free when the ship sinks tells a satellite where it went down. Every SOLAS ship carries it, every deck officer holds a certificate to operate it, and it is one of the topics that come up at almost every interview. This page explains the sea areas, the equipment and the frequencies, how to send and receive a distress alert, what to do after a false alert, how EPIRB, SART and NAVTEX work in practice, the routine tests, the mistakes that cause trouble, and questions to test yourself.

:: **In short**
:: - The Global Maritime Distress and Safety System (GMDSS) is set out in SOLAS chapter IV and has been fully in force since 1 February 1999.
:: - The equipment a ship carries depends on its sea area: A1 (VHF coast stations), A2 (MF), A3 (satellite), A4 (the rest — the polar regions).
:: - Distress alerts are sent by digital selective calling (DSC): VHF channel 70, MF 2187.5 kHz, and five HF frequencies.
:: - An accidental alert is cancelled by voice on the matching distress channel — switching the set off does not cancel anything.

## What the GMDSS is

Before the GMDSS a ship in distress relied on a radio officer keeping watch in Morse and on other ships happening to hear. In 1988 IMO amended SOLAS to replace that with an automated system built on two ideas: shore authorities, not only nearby ships, are alerted at once, and the alert carries the ship's identity and position without anyone having to read them out. The system was phased in from 1992 and became fully mandatory on 1 February 1999, the day ships stopped keeping the Morse distress watch.

It applies to SOLAS ships: passenger ships and cargo ships of 300 GT and above on international voyages. Chapter IV was modernised from 1 January 2024 and now refers to any recognised mobile satellite service rather than a single provider: Inmarsat has been joined by Iridium, recognised by IMO in 2018.

The system has nine functions: distress alerting ship-to-shore, shore-to-ship and ship-to-ship; search and rescue coordinating communications; on-scene communications; locating signals; maritime safety information; general radiocommunications; and bridge-to-bridge communications.

## Key numbers

!! 4 | sea areas: A1, A2, A3 and A4
!! ch 70 | VHF digital selective calling — distress, urgency and safety alerts
!! 2187.5 kHz | the MF DSC distress frequency (voice on 2182 kHz)
!! 406 MHz | the EPIRB frequency, received by the COSPAS-SARSAT satellites
!! 518 kHz | international NAVTEX, broadcast in English
!! 12 dots | a SART's signal on an X-band radar screen

## The four sea areas

- **A1** — within range of at least one VHF coast station with continuous DSC watch; typically 20–30 miles from the coast station.
- **A2** — outside A1, within range of at least one MF coast station with continuous DSC watch; typically up to about 150 miles.
- **A3** — outside A1 and A2, within coverage of a recognised mobile satellite service. Inmarsat's geostationary satellites cover roughly from 70° N to 70° S; Iridium covers the poles as well.
- **A4** — everything outside A1, A2 and A3: in practice the polar regions, where only HF reaches.

The sea areas are declared by coastal states, so the same distance from land can be A1 off one coast and A2 off another. A ship's radio equipment is fitted for the areas it trades in and listed on its safety radio certificate.

## Equipment on board

**Every SOLAS ship**, wherever it trades:

- a **VHF radio** with DSC on channel 70 and radiotelephony on channels 16, 13 and 6, keeping a continuous DSC watch on channel 70;
- a **NAVTEX receiver** for maritime safety information, and an enhanced group call receiver where NAVTEX does not reach;
- a float-free **satellite EPIRB** on 406 MHz;
- **SARTs** — radar or AIS search and rescue transmitters: at least one on each side on ships of 500 GT and above, one on smaller cargo ships;
- **portable two-way VHF radiotelephones** for survival craft: at least three on passenger ships and on cargo ships of 500 GT and above, two on cargo ships of 300–500 GT.

**Added for the sea area:**

- **A2** — an MF radio installation with DSC on 2187.5 kHz and radiotelephony on 2182 kHz.
- **A3** — either a ship earth station of a recognised satellite service together with the MF installation, or an MF/HF installation with DSC.
- **A4** — an MF/HF installation with DSC on all distress and safety frequencies.

Ships in A1 and A2 keep the equipment working by one of three methods — duplication of equipment, shore-based maintenance or at-sea maintenance; ships in A3 and A4 by at least two of them. The radio installation runs from a reserve source of energy as well as the ship's mains.

## The distress frequencies

- **VHF:** channel 70 for DSC; channel 16 (156.8 MHz) for distress, urgency and safety voice traffic; channel 6 for on-scene communications with aircraft; channel 13 for bridge-to-bridge navigation safety.
- **MF:** 2187.5 kHz DSC, 2182 kHz voice.
- **HF DSC:** 4207.5, 6312, 8414.5, 12577 and 16804.5 kHz.
- **HF voice:** 4125, 6215, 8291, 12290 and 16420 kHz.
- **EPIRB:** 406 MHz to the satellites, with a 121.5 MHz homing signal for the rescuers.
- **SART:** 9 GHz — it answers the pulses of an X-band (3 cm) radar.

Every DSC set is programmed with the ship's MMSI — a nine-digit Maritime Mobile Service Identity whose first three digits identify the country. Coast station MMSIs begin with 00.

## Sending a distress alert

The master decides that the ship is in grave and imminent danger and needs immediate help. Then:

1. **Check the position** on the DSC controller. With a working GNSS feed it is automatic; without one it must be entered by hand, or the alert goes out with an old position.
2. **Select the nature of distress** if there is time — fire or explosion, flooding, collision, grounding, listing, sinking, disabled and adrift, abandoning ship, piracy, person overboard. If there is no time, the alert goes as "undesignated".
3. **Lift the cover and hold the DISTRESS button** for several seconds — most sets want about five — until the set confirms the alert has gone.
4. **Go to the voice channel** — channel 16 on VHF, 2182 kHz on MF — and make the MAYDAY call and message: MAYDAY three times, "this is" and the ship's name three times, the call sign and MMSI; then MAYDAY, the name, call sign and MMSI, the position, the nature of the distress, the assistance needed, the number of persons on board and anything else that helps, and OVER.
5. **Wait for the acknowledgement.** Until a coast station acknowledges, the DSC set repeats the alert automatically every few minutes.

A ship can also send the alert through its satellite terminal, and in the last resort the EPIRB sends one by itself.

## Receiving a distress alert

On VHF or MF:

1. Do not acknowledge the alert by DSC, and do not relay it by DSC, unless an RCC or a coast station tells you to.
2. Listen on channel 16 (or 2182 kHz) for the coast station's acknowledgement and the distress traffic — for about five minutes.
3. If no coast station has acknowledged and the ship in distress is close enough for you to help, acknowledge it by voice on channel 16 and inform the RCC or a coast station by any means.
4. Write everything in the radio log, tell the master and be ready to proceed.

On HF, ships do not acknowledge; the coast station does. If none has after about five minutes, inform the RCC.

The reason for the rule is simple: in the early years, ships acknowledging and relaying each other's alerts by DSC flooded the channel with automated traffic and hid the original alert.

## A false alert: what to do

False alerts are one of the GMDSS's biggest problems — someone presses the button in a drill, while cleaning or out of curiosity, and the rescue system starts working. What matters is cancelling at once:

1. **Do not switch the set off.** The alert has already gone; switching off only hides the acknowledgements from you.
2. **Stop the repetition** — reset the controller, or use its cancel function if it has one.
3. **Cancel by voice** on the distress channel of the band used — channel 16 on VHF, 2182 kHz on MF: "ALL STATIONS, ALL STATIONS, ALL STATIONS, THIS IS (name, call sign, MMSI), POSITION (...), CANCEL MY DISTRESS ALERT OF (date and time) UTC — MASTER (name)."
4. **Record it** in the radio log and tell the company.

For an EPIRB that has gone off by mistake: switch it off and inform the nearest RCC or coast station straight away. A false alert cancelled promptly is a routine matter; one left uncancelled sends people and aircraft to sea for nothing.

## EPIRB, SART and NAVTEX in practice

- **EPIRB** — stowed in a float-free bracket with a hydrostatic release unit (HRU). If the ship sinks, the HRU frees it at a depth of no more than four metres, it floats up, switches itself on and sends the ship's identity — and its position, if it has a GNSS receiver — to the COSPAS-SARSAT satellites. It can also be switched on by hand and taken into the liferaft. The lanyard must never be tied to the ship.
- **SART** — taken into the survival craft and switched on there. When a ship's or aircraft's X-band radar sweeps it, it shows on the screen as a line of 12 dots leading away from the SART's position; as the rescuer closes in, the dots turn into arcs and then concentric circles. Mounted at least a metre above the water it is seen from about five miles by a ship and much further by an aircraft. On standby its battery lasts 96 hours, then 8 hours of transmitting. An AIS-SART shows instead as a special target on AIS and on ECDIS.
- **NAVTEX** — prints navigational and meteorological warnings, search and rescue information and forecasts on 518 kHz in English (490 kHz carries national-language broadcasts), out to roughly 400 miles. Stations and message types can be selected, but navigational warnings (A), meteorological warnings (B), search and rescue information (D) and additional navigational warnings (L) cannot be switched off.

## Tests and the radio log

- **Daily:** the DSC internal test without transmitting; the reserve batteries' charge; the NAVTEX printer and its paper.
- **Weekly:** a DSC test call to a coast station on MF or HF where possible.
- **Monthly:** the EPIRB self-test and its HRU and battery dates; the SART self-test; the survival craft VHF sets and their batteries — tested on a working channel, never on 16 or 70.
- **Every 12 months:** the EPIRB tested; and at intervals of no more than five years, maintenance at an approved shore facility.

Everything goes into the GMDSS radio log: distress, urgency and safety traffic received and sent, the tests and their results, the position at least once a day, and any fault and its repair.

## Certificates: GOC and ROC

- **GOC** — General Operator's Certificate under STCW regulation IV/2: radio operator in all sea areas. Deck officers on SOLAS ships hold it.
- **ROC** — Restricted Operator's Certificate: sea area A1 only.
- **SRC and LRC** — short and long range certificates for non-SOLAS craft such as yachts. They do not replace the GOC.

Like other STCW certificates, the GOC is revalidated every five years. The ship's muster list names the officer with primary responsibility for radio communications during a distress — usually the master or one of the officers.

## What they ask at the interview

- **Masters and chief officers:** the sea areas and the equipment for each; the methods of keeping the equipment available; who acknowledges a distress alert and when; false alerts; what the safety radio certificate covers.
- **Second and third officers:** the DSC distress procedure step by step; the MAYDAY message; the distress frequencies; the daily, weekly and monthly tests; NAVTEX settings; how a SART looks on radar.
- **Ratings:** where the EPIRB, SARTs and portable VHFs are and who takes them to the boats; how to switch a SART on and where to hold it; never tying the EPIRB's lanyard.

## Common mistakes

1. Switching the set off after an accidental alert instead of cancelling it by voice.
2. Sending an alert with an old position because the GNSS feed failed and nobody looked.
3. Tying the EPIRB's lanyard to the bracket or the rail — the ship takes it down.
4. An expired HRU or battery on the EPIRB.
5. Testing the survival craft VHFs on channel 16.
6. Deselecting NAVTEX stations or messages "because the ECDIS shows the warnings anyway".
7. Holding the SART at the bottom of the liferaft — low down, the radar sees it from a fraction of the distance.

## Test yourself

?? What is sea area A3?
=> The area outside A1 and A2 within coverage of a recognised mobile satellite service — for Inmarsat, roughly from 70° N to 70° S.
?? On which frequencies are DSC distress alerts sent?
=> VHF channel 70, MF 2187.5 kHz, and HF 4207.5, 6312, 8414.5, 12577 and 16804.5 kHz.
?? You have pressed DISTRESS on the VHF by accident. What do you do?
=> Do not switch it off. Stop the repetition, then broadcast on channel 16 to all stations: the ship's name, call sign, MMSI and position, "cancel my distress alert of" the date and time UTC. Record it in the radio log.
?? How does a SART appear on a radar screen?
=> As a line of 12 dots leading away from the SART's position; as the ship approaches, they become arcs and then concentric circles. Only an X-band (3 cm) radar triggers it.
?? What happens to the EPIRB if the ship sinks?
=> The hydrostatic release frees it at a depth of no more than four metres; it floats to the surface, switches itself on and transmits on 406 MHz to the COSPAS-SARSAT satellites.
?? What is the difference between the GOC and the ROC?
=> The GOC covers all sea areas, A1 to A4; the ROC covers sea area A1 only.

## Who on board needs this

Every deck officer — the [master](/jobs/rank/master), the [chief officer](/jobs/rank/chief-officer), and the [second](/jobs/rank/2nd-officer) and [third officer](/jobs/rank/3rd-officer), who usually keep the radio log and run the tests — holds a GOC. The [ETO](/jobs/rank/eto) often looks after the equipment, and the [able seaman](/jobs/rank/able-seaman) and the [deck cadet](/jobs/rank/deck-cadet) need to know where the EPIRB, SARTs and portable VHFs are and what to do with them when abandoning ship. The radio certificate itself is STCW IV/2 — see [STCW in plain words](/handbook/stcw-in-plain-words-regulations-ii-1-to-vi-6-sea-time-revalidation-and-hours-of-09ed56ce-402e-40a5-9885-180e01f44c8f); the drills and life-saving appliances that go with it are in [SOLAS in plain words](/handbook/solas-in-plain-words-drills-life-saving-appliances-and-interview-questions-2cbdb6d6-b0fa-498a-9c32-68bd9b95e096), and the words of the MAYDAY message in [SMCP in plain words](/handbook/smcp-in-plain-words-mayday-and-pan-pan-message-markers-helm-and-engine-orders-an-210d240d-f93c-4c9f-b1a2-aa48b5000c4b).

Put your GOC with its number and expiry date into your [maritime CV](/maritime-cv).

*Source: SOLAS chapter IV, the ITU Radio Regulations and IMO guidance on distress alerts and their cancellation. Your ship's radio installation, its manuals and the master's instructions prevail on board. This page is a study aid, not a legal text.*$en$,
    'ru', $ru$ГМССБ — причина, по которой судно в беде больше не зависит от того, услышит ли кто-нибудь морзянку. Одна кнопка на мостике отправляет всем станциям в зоне действия название судна, его координаты и характер бедствия, а буй, который всплывает, когда судно тонет, сообщает спутнику, где это произошло. ГМССБ есть на каждом судне под SOLAS, у каждого судоводителя есть диплом оператора, и эта тема всплывает почти на каждом собеседовании. Здесь — морские районы, оборудование и частоты, как подать и как принять сигнал бедствия, что делать после ложной тревоги, как на практике работают EPIRB, SART и NAVTEX, регулярные проверки, ошибки, из-за которых бывают неприятности, и вопросы для самопроверки.

:: **Коротко**
:: - Глобальная морская система связи при бедствии и для обеспечения безопасности (ГМССБ, GMDSS) описана в главе IV SOLAS и полностью действует с 1 февраля 1999 года.
:: - Оборудование судна зависит от морского района: A1 (береговые станции УКВ), A2 (ПВ), A3 (спутник), A4 (всё остальное — полярные районы).
:: - Сигнал бедствия подают цифровым избирательным вызовом (ЦИВ, DSC): 70-й канал УКВ, 2187,5 кГц на ПВ и пять частот на КВ.
:: - Случайную тревогу отменяют голосом на соответствующем канале бедствия — выключение станции ничего не отменяет.

## Что такое ГМССБ

До ГМССБ судно в беде полагалось на радиста, который нёс вахту на телеграфе, и на то, что сигнал случайно услышат другие суда. В 1988 году ИМО внесла в SOLAS поправки, заменившие это автоматизированной системой, построенной на двух идеях: тревогу сразу получают береговые службы, а не только суда поблизости, и сигнал сам несёт название и координаты судна — их не нужно никому зачитывать. Систему вводили поэтапно с 1992 года, а полностью обязательной она стала 1 февраля 1999 года — в тот день суда перестали нести вахту на телеграфной частоте бедствия.

ГМССБ обязательна для судов под SOLAS: пассажирских и грузовых от 300 GT в международных рейсах. С 1 января 2024 года глава IV модернизирована и теперь говорит о любой признанной подвижной спутниковой службе, а не об одном операторе: к Inmarsat добавился Iridium, признанный ИМО в 2018 году.

У системы девять функций: передача сигнала бедствия судно–берег, берег–судно и судно–судно; связь для координации поиска и спасения; связь на месте бедствия; сигналы для определения местоположения; информация по безопасности мореплавания; общая радиосвязь; связь мостик–мостик.

## Главные цифры

!! 4 | морских района: A1, A2, A3 и A4
!! кан. 70 | ЦИВ на УКВ — вызовы бедствия, срочности и безопасности
!! 2187,5 кГц | частота бедствия ЦИВ на ПВ (голос — 2182 кГц)
!! 406 МГц | частота EPIRB, её принимают спутники КОСПАС-САРСАТ
!! 518 кГц | международный NAVTEX, на английском
!! 12 точек | сигнал SART на экране радара X-диапазона

## Четыре морских района

- **A1** — в зоне действия хотя бы одной береговой станции УКВ с непрерывной вахтой ЦИВ; обычно 20–30 миль от береговой станции.
- **A2** — за пределами A1, в зоне действия хотя бы одной береговой станции ПВ с непрерывной вахтой ЦИВ; обычно примерно до 150 миль.
- **A3** — за пределами A1 и A2, в зоне покрытия признанной подвижной спутниковой службы. Геостационарные спутники Inmarsat покрывают примерно от 70° с. ш. до 70° ю. ш.; Iridium покрывает и полюса.
- **A4** — всё, что за пределами A1, A2 и A3: на практике полярные районы, куда достаёт только КВ.

Морские районы объявляют прибрежные государства, поэтому одно и то же расстояние от берега у одного побережья может быть A1, а у другого — A2. Радиооборудование судна рассчитано на районы, где оно работает, и перечислено в его свидетельстве о безопасности по радиооборудованию.

## Оборудование на борту

**На каждом судне под SOLAS**, где бы оно ни работало:

- **УКВ-радиостанция** с ЦИВ на 70-м канале и радиотелефонией на 16-м, 13-м и 6-м каналах; непрерывная вахта ЦИВ на 70-м канале;
- **приёмник NAVTEX** для информации по безопасности мореплавания, а там, где NAVTEX не принимается, — приёмник расширенного группового вызова (РГВ, EGC);
- всплывающий **спутниковый EPIRB** (аварийный радиобуй) на 406 МГц;
- **SART** — радиолокационные или АИС-ответчики: минимум по одному с каждого борта на судах от 500 GT, один — на грузовых судах поменьше;
- **носимые УКВ-радиостанции** для спасательных средств: минимум три на пассажирских судах и на грузовых от 500 GT, две — на грузовых судах 300–500 GT.

**Добавляется по району:**

- **A2** — радиоустановка ПВ с ЦИВ на 2187,5 кГц и радиотелефонией на 2182 кГц.
- **A3** — либо судовая земная станция признанной спутниковой службы вместе с установкой ПВ, либо установка ПВ/КВ с ЦИВ.
- **A4** — установка ПВ/КВ с ЦИВ на всех частотах бедствия и безопасности.

Суда в районах A1 и A2 поддерживают работоспособность оборудования одним из трёх способов — дублированием оборудования, береговым техобслуживанием или техобслуживанием в море; суда в A3 и A4 — минимум двумя из них. Радиоустановка питается не только от судовой сети, но и от резервного источника энергии.

## Частоты бедствия

- **УКВ:** 70-й канал — ЦИВ; 16-й канал (156,8 МГц) — голосовой обмен при бедствии, срочности и для безопасности; 6-й — связь на месте бедствия с авиацией; 13-й — связь мостик–мостик по безопасности плавания.
- **ПВ:** 2187,5 кГц — ЦИВ, 2182 кГц — голос.
- **КВ, ЦИВ:** 4207,5, 6312, 8414,5, 12577 и 16804,5 кГц.
- **КВ, голос:** 4125, 6215, 8291, 12290 и 16420 кГц.
- **EPIRB:** 406 МГц на спутники и сигнал приводной частоты 121,5 МГц для спасателей.
- **SART:** 9 ГГц — отвечает на импульсы радара X-диапазона (3 см).

В каждую станцию ЦИВ заложен MMSI судна — девятизначный идентификатор морской подвижной службы, первые три цифры которого обозначают страну. MMSI береговых станций начинаются с 00.

## Как подать сигнал бедствия

Капитан решает, что судну грозит серьёзная и непосредственная опасность и нужна немедленная помощь. Дальше:

1. **Проверьте координаты** на пульте ЦИВ. При работающем приёмнике ГНСС они подставляются автоматически; без него их нужно ввести вручную, иначе сигнал уйдёт со старыми координатами.
2. **Выберите характер бедствия**, если есть время, — пожар или взрыв, затопление, столкновение, посадка на мель, крен, гибель судна, потеря хода и дрейф, оставление судна, пиратство, человек за бортом. Если времени нет, сигнал уходит как «неуточнённый».
3. **Поднимите крышку и удерживайте кнопку DISTRESS** несколько секунд — большинству станций нужно около пяти, — пока станция не подтвердит, что сигнал ушёл.
4. **Перейдите на голосовой канал** — 16-й на УКВ, 2182 кГц на ПВ — и передайте вызов и сообщение MAYDAY: трижды MAYDAY, «this is» и трижды название судна, позывной и MMSI; затем MAYDAY, название, позывной и MMSI, координаты, характер бедствия, какая помощь нужна, сколько людей на борту и всё остальное, что поможет, и OVER.
5. **Ждите подтверждения.** Пока береговая станция не подтвердит приём, станция ЦИВ сама повторяет сигнал каждые несколько минут.

Сигнал можно подать и через спутниковый терминал, а в крайнем случае EPIRB подаст его сам.

## Как принять сигнал бедствия

На УКВ или ПВ:

1. Не подтверждайте сигнал по ЦИВ и не ретранслируйте его по ЦИВ, если этого не просят СКЦ (спасательно-координационный центр, RCC) или береговая станция.
2. Слушайте 16-й канал (или 2182 кГц) — подтверждение береговой станции и обмен по бедствию — около пяти минут.
3. Если ни одна береговая станция не подтвердила приём, а судно в беде достаточно близко, чтобы вы могли помочь, подтвердите ему приём голосом на 16-м канале и сообщите в СКЦ или на береговую станцию любым способом.
4. Запишите всё в радиожурнал, доложите капитану и будьте готовы следовать к месту.

На КВ суда не подтверждают приём — это делает береговая станция. Если через пять минут никто не подтвердил, сообщите в СКЦ.

Причина правила простая: в первые годы суда, подтверждавшие и ретранслировавшие чужие сигналы по ЦИВ, забивали канал автоматическим трафиком, и исходный сигнал в нём терялся.

## Ложная тревога: что делать

Ложные сигналы — одна из главных проблем ГМССБ: кто-то нажимает кнопку на учениях, при уборке или из любопытства, и спасательная система начинает работать. Главное — отменить сразу:

1. **Не выключайте станцию.** Сигнал уже ушёл; выключив станцию, вы только перестанете слышать подтверждения.
2. **Остановите повтор** — сбросьте пульт или воспользуйтесь функцией отмены, если она есть.
3. **Отмените голосом** на канале бедствия того диапазона, на котором ушёл сигнал, — 16-й канал на УКВ, 2182 кГц на ПВ: «ALL STATIONS, ALL STATIONS, ALL STATIONS, THIS IS (название, позывной, MMSI), POSITION (...), CANCEL MY DISTRESS ALERT OF (дата и время) UTC — MASTER (фамилия)».
4. **Запишите** это в радиожурнал и сообщите компании.

Если по ошибке сработал EPIRB, выключите его и сразу сообщите в ближайший СКЦ или на береговую станцию. Ложная тревога, отменённая сразу, — рабочая ситуация; неотменённая отправляет людей и авиацию в море впустую.

## EPIRB, SART и NAVTEX на практике

- **EPIRB** — стоит во всплывающем кронштейне с гидростатическим разобщающим устройством (HRU). Если судно тонет, гидростат освобождает буй на глубине не больше четырёх метров, буй всплывает, сам включается и передаёт спутникам КОСПАС-САРСАТ опознавательные данные судна — и координаты, если в нём есть приёмник ГНСС. Его можно включить и вручную и взять с собой в плот. Линь буя никогда нельзя привязывать к судну.
- **SART** — его берут в спасательное средство и включают там. Когда его облучает радар X-диапазона судна или самолёта, на экране появляется линия из 12 точек, уходящая от места SART; по мере приближения спасателя точки превращаются в дуги, а затем в концентрические окружности. Если поднять его хотя бы на метр над водой, судно видит его примерно с пяти миль, самолёт — гораздо дальше. В режиме ожидания батареи хватает на 96 часов, потом ещё на 8 часов работы на передачу. АИС-SART вместо этого показывается особой целью на АИС и в ЭКНИС.
- **NAVTEX** — печатает навигационные и метеорологические предупреждения, информацию о поиске и спасании и прогнозы на 518 кГц на английском (на 490 кГц идут передачи на национальных языках), примерно на 400 миль. Станции и типы сообщений можно выбирать, но навигационные предупреждения (A), метеопредупреждения (B), информацию о поиске и спасании (D) и дополнительные навигационные предупреждения (L) отключить нельзя.

## Проверки и радиожурнал

- **Ежедневно:** внутренний тест ЦИВ без излучения; заряд резервных аккумуляторов; принтер NAVTEX и бумага.
- **Еженедельно:** тестовый вызов ЦИВ береговой станции на ПВ или КВ, где это возможно.
- **Ежемесячно:** самотест EPIRB и сроки его гидростата и батареи; самотест SART; носимые УКВ-станции и их батареи — на рабочем канале, никогда не на 16-м и не на 70-м.
- **Каждые 12 месяцев:** проверка EPIRB; не реже чем раз в пять лет — обслуживание на одобренной береговой базе.

Всё записывают в радиожурнал ГМССБ: принятый и переданный обмен по бедствию, срочности и безопасности, проверки и их результаты, место судна хотя бы раз в сутки, любые неисправности и их устранение.

## Дипломы: GOC и ROC

- **GOC** — диплом оператора ГМССБ (General Operator's Certificate) по правилу IV/2 ПДНВ: оператор во всех морских районах. Он есть у судоводителей на судах под SOLAS.
- **ROC** — ограниченный диплом оператора (Restricted Operator's Certificate): только морской район A1.
- **SRC и LRC** — дипломы ближней и дальней связи для судов не под SOLAS, например яхт. GOC они не заменяют.

Как и другие дипломы по ПДНВ, GOC подтверждают каждые пять лет. В судовом расписании по тревогам назначен помощник, который отвечает за радиосвязь при бедствии, — обычно капитан или один из помощников.

## Что спрашивают на собеседовании

- **Капитаны и старпомы:** морские районы и оборудование для каждого; способы обеспечения работоспособности оборудования; кто и когда подтверждает сигнал бедствия; ложные тревоги; что покрывает свидетельство о безопасности по радиооборудованию.
- **Вторые и третьи помощники:** порядок подачи сигнала бедствия по ЦИВ по шагам; сообщение MAYDAY; частоты бедствия; ежедневные, еженедельные и ежемесячные проверки; настройки NAVTEX; как SART выглядит на радаре.
- **Рядовой состав:** где стоят EPIRB, SART и носимые УКВ-станции и кто несёт их к шлюпкам; как включить SART и где его держать; что линь EPIRB нельзя привязывать.

## Частые ошибки

1. Выключить станцию после случайной тревоги вместо того, чтобы отменить её голосом.
2. Отправить сигнал со старыми координатами, потому что пропал сигнал ГНСС и никто не посмотрел.
3. Привязать линь EPIRB к кронштейну или к леерам — судно утащит буй за собой.
4. Просроченный гидростат или батарея EPIRB.
5. Проверять носимые УКВ-станции на 16-м канале.
6. Отключить станции или типы сообщений NAVTEX, «потому что предупреждения всё равно есть в ЭКНИС».
7. Держать SART на дне плота — низко над водой радар видит его в разы ближе.

## Проверь себя

?? Что такое морской район A3?
=> Район за пределами A1 и A2 в зоне покрытия признанной подвижной спутниковой службы — у Inmarsat примерно от 70° с. ш. до 70° ю. ш.
?? На каких частотах подают сигнал бедствия по ЦИВ?
=> 70-й канал УКВ, 2187,5 кГц на ПВ, а на КВ — 4207,5, 6312, 8414,5, 12577 и 16804,5 кГц.
?? Вы случайно нажали DISTRESS на УКВ. Ваши действия?
=> Не выключать станцию. Остановить повтор, затем передать на 16-м канале всем станциям: название, позывной, MMSI и координаты судна, «cancel my distress alert of», дату и время UTC. Записать в радиожурнал.
?? Как SART выглядит на экране радара?
=> Как линия из 12 точек, уходящая от места SART; по мере приближения они превращаются в дуги, а затем в концентрические окружности. Срабатывает он только от радара X-диапазона (3 см).
?? Что происходит с EPIRB, если судно тонет?
=> Гидростат освобождает его на глубине не больше четырёх метров; буй всплывает, сам включается и передаёт на 406 МГц спутникам КОСПАС-САРСАТ.
?? Чем GOC отличается от ROC?
=> GOC действует во всех морских районах, от A1 до A4; ROC — только в районе A1.

## Кому на борту это нужно

GOC есть у каждого судоводителя — у [капитана](/ru/jobs/rank/master), [старпома](/ru/jobs/rank/chief-officer), [второго](/ru/jobs/rank/2nd-officer) и [третьего помощника](/ru/jobs/rank/3rd-officer), которые обычно ведут радиожурнал и проверки. [Электромеханик (ETO)](/ru/jobs/rank/eto) часто отвечает за само оборудование, а [матросу AB](/ru/jobs/rank/able-seaman) и [палубному кадету](/ru/jobs/rank/deck-cadet) нужно знать, где стоят EPIRB, SART и носимые УКВ-станции и что с ними делать при оставлении судна. Сам диплом оператора — правило IV/2 ПДНВ, см. [ПДНВ простыми словами](/ru/handbook/pdnv-stcw-prostymi-slovami-pravila-ii-1-vi-6-stazh-podtverzhdenie-diplomov-i-cha-09ed56ce-402e-40a5-9885-180e01f44c8f); учения и спасательные средства, которые идут вместе с ним, — в [SOLAS простыми словами](/ru/handbook/solas-prostymi-slovami-ucheniya-spasatelnye-sredstva-i-voprosy-na-sobesedovanii-2cbdb6d6-b0fa-498a-9c32-68bd9b95e096), а слова сообщения MAYDAY — в [SMCP простыми словами](/ru/handbook/smcp-prostymi-slovami-mayday-i-pan-pan-markery-soobshcheniy-komandy-na-rul-i-v-m-210d240d-f93c-4c9f-b1a2-aa48b5000c4b).

Впишите GOC с номером и сроком действия в [резюме моряка](/ru/maritime-cv).

*Источник: глава IV SOLAS, Регламент радиосвязи МСЭ и рекомендации ИМО о сигналах бедствия и их отмене. На борту действуют радиоустановка вашего судна, её инструкции и указания капитана. Эта страница — пособие для подготовки, а не юридический текст.*$ru$,
    'ua', $ua$ГМЗЛБ — причина, через яку судно в біді більше не залежить від того, чи почує хтось морзянку. Одна кнопка на містку надсилає всім станціям у зоні дії назву судна, його координати й характер лиха, а буй, який спливає, коли судно тоне, повідомляє супутнику, де це сталося. ГМЗЛБ є на кожному судні під SOLAS, у кожного судноводія є диплом оператора, і ця тема виникає майже на кожній співбесіді. Тут — морські райони, обладнання й частоти, як подати і як прийняти сигнал лиха, що робити після хибної тривоги, як на практиці працюють EPIRB, SART і NAVTEX, регулярні перевірки, помилки, через які бувають неприємності, і питання для самоперевірки.

:: **Коротко**
:: - Глобальна морська система зв'язку при лихові та для забезпечення безпеки (ГМЗЛБ, GMDSS) описана в розділі IV SOLAS і повністю діє з 1 лютого 1999 року.
:: - Обладнання судна залежить від морського району: A1 (берегові станції УКХ), A2 (ПХ), A3 (супутник), A4 (усе інше — полярні райони).
:: - Сигнал лиха подають цифровим вибірковим викликом (ЦВВ, DSC): 70-й канал УКХ, 2187,5 кГц на ПХ і п'ять частот на КХ.
:: - Випадкову тривогу скасовують голосом на відповідному каналі лиха — вимкнення станції нічого не скасовує.

## Що таке ГМЗЛБ

До ГМЗЛБ судно в біді покладалося на радиста, який ніс вахту на телеграфі, і на те, що сигнал випадково почують інші судна. У 1988 році ІМО внесла до SOLAS поправки, які замінили це автоматизованою системою, побудованою на двох ідеях: тривогу одразу отримують берегові служби, а не лише судна поблизу, і сигнал сам несе назву й координати судна — їх не треба нікому зачитувати. Систему запроваджували поетапно з 1992 року, а повністю обов'язковою вона стала 1 лютого 1999 року — того дня судна перестали нести вахту на телеграфній частоті лиха.

ГМЗЛБ обов'язкова для суден під SOLAS: пасажирських і вантажних від 300 GT у міжнародних рейсах. З 1 січня 2024 року розділ IV модернізовано, і тепер він говорить про будь-яку визнану рухому супутникову службу, а не про одного оператора: до Inmarsat додався Iridium, визнаний ІМО у 2018 році.

Система має дев'ять функцій: передача сигналу лиха судно–берег, берег–судно і судно–судно; зв'язок для координації пошуку й рятування; зв'язок на місці лиха; сигнали для визначення місцезнаходження; інформація з безпеки мореплавства; загальний радіозв'язок; зв'язок місток–місток.

## Головні цифри

!! 4 | морські райони: A1, A2, A3 і A4
!! кан. 70 | ЦВВ на УКХ — виклики лиха, терміновості та безпеки
!! 2187,5 кГц | частота лиха ЦВВ на ПХ (голос — 2182 кГц)
!! 406 МГц | частота EPIRB, її приймають супутники КОСПАС-САРСАТ
!! 518 кГц | міжнародний NAVTEX, англійською
!! 12 точок | сигнал SART на екрані радара X-діапазону

## Чотири морські райони

- **A1** — у зоні дії хоча б однієї берегової станції УКХ з безперервною вахтою ЦВВ; зазвичай 20–30 миль від берегової станції.
- **A2** — за межами A1, у зоні дії хоча б однієї берегової станції ПХ з безперервною вахтою ЦВВ; зазвичай приблизно до 150 миль.
- **A3** — за межами A1 і A2, у зоні покриття визнаної рухомої супутникової служби. Геостаціонарні супутники Inmarsat покривають приблизно від 70° пн. ш. до 70° пд. ш.; Iridium покриває й полюси.
- **A4** — усе, що за межами A1, A2 і A3: на практиці полярні райони, куди дістає лише КХ.

Морські райони оголошують прибережні держави, тому та сама відстань від берега біля одного узбережжя може бути A1, а біля іншого — A2. Радіообладнання судна розраховане на райони, де воно працює, і перелічене в його свідоцтві про безпеку за радіообладнанням.

## Обладнання на борту

**На кожному судні під SOLAS**, хоч би де воно працювало:

- **УКХ-радіостанція** з ЦВВ на 70-му каналі й радіотелефонією на 16-му, 13-му і 6-му каналах; безперервна вахта ЦВВ на 70-му каналі;
- **приймач NAVTEX** для інформації з безпеки мореплавства, а там, де NAVTEX не приймається, — приймач розширеного групового виклику (РГВ, EGC);
- **супутниковий EPIRB** (аварійний радіобуй), що спливає, на 406 МГц;
- **SART** — радіолокаційні або АІС-відповідачі: щонайменше по одному з кожного борту на суднах від 500 GT, один — на менших вантажних суднах;
- **носимі УКХ-радіостанції** для рятувальних засобів: щонайменше три на пасажирських суднах і на вантажних від 500 GT, дві — на вантажних суднах 300–500 GT.

**Додається за районом:**

- **A2** — радіоустановка ПХ з ЦВВ на 2187,5 кГц і радіотелефонією на 2182 кГц.
- **A3** — або суднова земна станція визнаної супутникової служби разом з установкою ПХ, або установка ПХ/КХ з ЦВВ.
- **A4** — установка ПХ/КХ з ЦВВ на всіх частотах лиха й безпеки.

Судна в районах A1 і A2 підтримують працездатність обладнання одним із трьох способів — дублюванням обладнання, береговим техобслуговуванням або техобслуговуванням у морі; судна в A3 і A4 — щонайменше двома з них. Радіоустановка живиться не лише від суднової мережі, а й від резервного джерела енергії.

## Частоти лиха

- **УКХ:** 70-й канал — ЦВВ; 16-й канал (156,8 МГц) — голосовий обмін при лихові, терміновості й для безпеки; 6-й — зв'язок на місці лиха з авіацією; 13-й — зв'язок місток–місток з безпеки плавання.
- **ПХ:** 2187,5 кГц — ЦВВ, 2182 кГц — голос.
- **КХ, ЦВВ:** 4207,5, 6312, 8414,5, 12577 і 16804,5 кГц.
- **КХ, голос:** 4125, 6215, 8291, 12290 і 16420 кГц.
- **EPIRB:** 406 МГц на супутники й сигнал привідної частоти 121,5 МГц для рятувальників.
- **SART:** 9 ГГц — відповідає на імпульси радара X-діапазону (3 см).

У кожну станцію ЦВВ закладено MMSI судна — дев'ятизначний ідентифікатор морської рухомої служби, перші три цифри якого позначають країну. MMSI берегових станцій починаються з 00.

## Як подати сигнал лиха

Капітан вирішує, що судну загрожує серйозна й безпосередня небезпека і потрібна негайна допомога. Далі:

1. **Перевірте координати** на пульті ЦВВ. Коли приймач ГНСС працює, вони підставляються автоматично; без нього їх треба ввести вручну, інакше сигнал піде зі старими координатами.
2. **Виберіть характер лиха**, якщо є час, — пожежа або вибух, затоплення, зіткнення, посадка на мілину, крен, загибель судна, втрата ходу й дрейф, залишення судна, піратство, людина за бортом. Якщо часу немає, сигнал іде як «неуточнений».
3. **Підніміть кришку й утримуйте кнопку DISTRESS** кілька секунд — більшості станцій потрібно близько п'яти, — доки станція не підтвердить, що сигнал пішов.
4. **Перейдіть на голосовий канал** — 16-й на УКХ, 2182 кГц на ПХ — і передайте виклик і повідомлення MAYDAY: тричі MAYDAY, «this is» і тричі назву судна, позивний і MMSI; потім MAYDAY, назву, позивний і MMSI, координати, характер лиха, яка допомога потрібна, скільки людей на борту і все інше, що допоможе, та OVER.
5. **Чекайте на підтвердження.** Доки берегова станція не підтвердить приймання, станція ЦВВ сама повторює сигнал кожні кілька хвилин.

Сигнал можна подати й через супутниковий термінал, а в крайньому разі EPIRB подасть його сам.

## Як прийняти сигнал лиха

На УКХ або ПХ:

1. Не підтверджуйте сигнал через ЦВВ і не ретранслюйте його через ЦВВ, якщо цього не просять РКЦ (рятувально-координаційний центр, RCC) або берегова станція.
2. Слухайте 16-й канал (або 2182 кГц) — підтвердження берегової станції та обмін щодо лиха — близько п'яти хвилин.
3. Якщо жодна берегова станція не підтвердила приймання, а судно в біді досить близько, щоб ви могли допомогти, підтвердьте йому приймання голосом на 16-му каналі й повідомте РКЦ або берегову станцію будь-яким способом.
4. Запишіть усе в радіожурнал, доповідайте капітану й будьте готові йти до місця.

На КХ судна не підтверджують приймання — це робить берегова станція. Якщо за п'ять хвилин ніхто не підтвердив, повідомте РКЦ.

Причина правила проста: у перші роки судна, які підтверджували й ретранслювали чужі сигнали через ЦВВ, забивали канал автоматичним трафіком, і початковий сигнал у ньому губився.

## Хибна тривога: що робити

Хибні сигнали — одна з головних проблем ГМЗЛБ: хтось натискає кнопку на навчаннях, під час прибирання або з цікавості, і рятувальна система починає працювати. Головне — скасувати одразу:

1. **Не вимикайте станцію.** Сигнал уже пішов; вимкнувши станцію, ви лише перестанете чути підтвердження.
2. **Зупиніть повтор** — скиньте пульт або скористайтеся функцією скасування, якщо вона є.
3. **Скасуйте голосом** на каналі лиха того діапазону, на якому пішов сигнал, — 16-й канал на УКХ, 2182 кГц на ПХ: «ALL STATIONS, ALL STATIONS, ALL STATIONS, THIS IS (назва, позивний, MMSI), POSITION (...), CANCEL MY DISTRESS ALERT OF (дата й час) UTC — MASTER (прізвище)».
4. **Запишіть** це в радіожурнал і повідомте компанію.

Якщо помилково спрацював EPIRB, вимкніть його й одразу повідомте найближчий РКЦ або берегову станцію. Хибна тривога, скасована одразу, — робоча ситуація; нескасована відправляє людей і авіацію в море даремно.

## EPIRB, SART і NAVTEX на практиці

- **EPIRB** — стоїть у кронштейні, з якого спливає, з гідростатичним роз'єднувальним пристроєм (HRU). Якщо судно тоне, гідростат звільняє буй на глибині не більше чотирьох метрів, буй спливає, сам вмикається й передає супутникам КОСПАС-САРСАТ розпізнавальні дані судна — і координати, якщо в ньому є приймач ГНСС. Його можна ввімкнути й вручну та взяти з собою в пліт. Лінь буя ніколи не можна прив'язувати до судна.
- **SART** — його беруть у рятувальний засіб і вмикають там. Коли його опромінює радар X-діапазону судна або літака, на екрані з'являється лінія з 12 точок, що відходить від місця SART; у міру наближення рятувальника точки перетворюються на дуги, а потім на концентричні кола. Якщо підняти його хоча б на метр над водою, судно бачить його приблизно з п'яти миль, літак — набагато далі. У режимі очікування батареї вистачає на 96 годин, потім ще на 8 годин роботи на передачу. АІС-SART натомість показується особливою ціллю на АІС і в ЕКНІС.
- **NAVTEX** — друкує навігаційні й метеорологічні попередження, інформацію про пошук і рятування та прогнози на 518 кГц англійською (на 490 кГц ідуть передачі національними мовами), приблизно на 400 миль. Станції й типи повідомлень можна вибирати, але навігаційні попередження (A), метеопопередження (B), інформацію про пошук і рятування (D) і додаткові навігаційні попередження (L) вимкнути не можна.

## Перевірки й радіожурнал

- **Щодня:** внутрішній тест ЦВВ без випромінювання; заряд резервних акумуляторів; принтер NAVTEX і папір.
- **Щотижня:** тестовий виклик ЦВВ берегової станції на ПХ або КХ, де це можливо.
- **Щомісяця:** самотест EPIRB і терміни його гідростата й батареї; самотест SART; носимі УКХ-станції та їхні батареї — на робочому каналі, ніколи не на 16-му й не на 70-му.
- **Кожні 12 місяців:** перевірка EPIRB; не рідше ніж раз на п'ять років — обслуговування на схваленій береговій базі.

Усе записують у радіожурнал ГМЗЛБ: прийнятий і переданий обмін щодо лиха, терміновості й безпеки, перевірки та їхні результати, місце судна хоча б раз на добу, будь-які несправності та їх усунення.

## Дипломи: GOC і ROC

- **GOC** — диплом оператора ГМЗЛБ (General Operator's Certificate) за правилом IV/2 ПДНВ: оператор у всіх морських районах. Він є в судноводіїв на суднах під SOLAS.
- **ROC** — обмежений диплом оператора (Restricted Operator's Certificate): лише морський район A1.
- **SRC і LRC** — дипломи ближнього й далекого зв'язку для суден не під SOLAS, наприклад яхт. GOC вони не замінюють.

Як і інші дипломи за ПДНВ, GOC підтверджують кожні п'ять років. У судновому розкладі за тривогами призначено помічника, який відповідає за радіозв'язок при лихові, — зазвичай капітана або одного з помічників.

## Що питають на співбесіді

- **Капітани й старпоми:** морські райони й обладнання для кожного; способи забезпечення працездатності обладнання; хто і коли підтверджує сигнал лиха; хибні тривоги; що охоплює свідоцтво про безпеку за радіообладнанням.
- **Другі й треті помічники:** порядок подання сигналу лиха через ЦВВ по кроках; повідомлення MAYDAY; частоти лиха; щоденні, щотижневі й щомісячні перевірки; налаштування NAVTEX; як SART виглядає на радарі.
- **Рядовий склад:** де стоять EPIRB, SART і носимі УКХ-станції та хто несе їх до шлюпок; як увімкнути SART і де його тримати; що лінь EPIRB не можна прив'язувати.

## Типові помилки

1. Вимкнути станцію після випадкової тривоги замість того, щоб скасувати її голосом.
2. Відправити сигнал зі старими координатами, бо зник сигнал ГНСС і ніхто не подивився.
3. Прив'язати лінь EPIRB до кронштейна або леєрів — судно потягне буй за собою.
4. Прострочений гідростат або батарея EPIRB.
5. Перевіряти носимі УКХ-станції на 16-му каналі.
6. Вимкнути станції або типи повідомлень NAVTEX, «бо попередження все одно є в ЕКНІС».
7. Тримати SART на дні плота — низько над водою радар бачить його в рази ближче.

## Перевір себе

?? Що таке морський район A3?
=> Район за межами A1 і A2 у зоні покриття визнаної рухомої супутникової служби — в Inmarsat приблизно від 70° пн. ш. до 70° пд. ш.
?? На яких частотах подають сигнал лиха через ЦВВ?
=> 70-й канал УКХ, 2187,5 кГц на ПХ, а на КХ — 4207,5, 6312, 8414,5, 12577 і 16804,5 кГц.
?? Ви випадково натиснули DISTRESS на УКХ. Ваші дії?
=> Не вимикати станцію. Зупинити повтор, потім передати на 16-му каналі всім станціям: назву, позивний, MMSI і координати судна, «cancel my distress alert of», дату й час UTC. Записати в радіожурнал.
?? Як SART виглядає на екрані радара?
=> Як лінія з 12 точок, що відходить від місця SART; у міру наближення вони перетворюються на дуги, а потім на концентричні кола. Спрацьовує він лише від радара X-діапазону (3 см).
?? Що відбувається з EPIRB, якщо судно тоне?
=> Гідростат звільняє його на глибині не більше чотирьох метрів; буй спливає, сам вмикається й передає на 406 МГц супутникам КОСПАС-САРСАТ.
?? Чим GOC відрізняється від ROC?
=> GOC діє в усіх морських районах, від A1 до A4; ROC — лише в районі A1.

## Кому на борту це потрібно

GOC є в кожного судноводія — у [капітана](/ua/jobs/rank/master), [старпома](/ua/jobs/rank/chief-officer), [другого](/ua/jobs/rank/2nd-officer) і [третього помічника](/ua/jobs/rank/3rd-officer), які зазвичай ведуть радіожурнал і перевірки. [Електромеханік (ETO)](/ua/jobs/rank/eto) часто відповідає за саме обладнання, а [матросу AB](/ua/jobs/rank/able-seaman) і [палубному кадету](/ua/jobs/rank/deck-cadet) треба знати, де стоять EPIRB, SART і носимі УКХ-станції та що з ними робити під час залишення судна. Сам диплом оператора — правило IV/2 ПДНВ, див. [ПДНВ простими словами](/ua/handbook/pdnv-stcw-prostimi-slovami-pravila-ii-1-vi-6-stazh-pidtverdzhennya-diplomiv-i-go-09ed56ce-402e-40a5-9885-180e01f44c8f); навчання й рятувальні засоби, що йдуть разом із ним, — у [SOLAS простими словами](/ua/handbook/solas-prostimi-slovami-navchannya-ryatuvalni-zasobi-ta-pitannya-na-spivbesidi-2cbdb6d6-b0fa-498a-9c32-68bd9b95e096), а слова повідомлення MAYDAY — у [SMCP простими словами](/ua/handbook/smcp-prostimi-slovami-mayday-i-pan-pan-markeri-povidomlen-komandi-na-sterno-ta-v-210d240d-f93c-4c9f-b1a2-aa48b5000c4b).

Впишіть GOC з номером і терміном дії в [резюме моряка](/ua/maritime-cv).

*Джерело: розділ IV SOLAS, Регламент радіозв'язку МСЕ та рекомендації ІМО щодо сигналів лиха та їх скасування. На борту діють радіоустановка вашого судна, її інструкції та вказівки капітана. Ця сторінка — посібник для підготовки, а не юридичний текст.*$ua$,
    'pl', $pl$GMDSS to powód, dla którego statek w niebezpieczeństwie nie zależy już od tego, czy ktoś usłyszy alfabet Morse'a. Jeden przycisk na mostku wysyła do wszystkich stacji w zasięgu nazwę statku, jego pozycję i rodzaj niebezpieczeństwa, a pława, która wypływa, gdy statek tonie, mówi satelicie, gdzie to się stało. GMDSS jest na każdym statku podlegającym SOLAS, każdy oficer pokładowy ma świadectwo operatora, a temat pojawia się niemal na każdej rozmowie. Tutaj: obszary morskie, wyposażenie i częstotliwości, jak nadać i jak odebrać alarm o niebezpieczeństwie, co zrobić po fałszywym alarmie, jak w praktyce działają EPIRB, SART i NAVTEX, regularne testy, błędy, które kończą się kłopotami, i pytania do sprawdzenia się.

:: **W skrócie**
:: - Światowy Morski System Łączności Alarmowej i Bezpieczeństwa (GMDSS) jest opisany w rozdziale IV SOLAS i w pełni obowiązuje od 1 lutego 1999 roku.
:: - Wyposażenie statku zależy od obszaru morskiego: A1 (stacje brzegowe VHF), A2 (MF), A3 (satelita), A4 (cała reszta — rejony polarne).
:: - Alarm o niebezpieczeństwie nadaje się cyfrowym wywołaniem selektywnym (DSC): kanał 70 VHF, 2187,5 kHz na MF i pięć częstotliwości HF.
:: - Przypadkowy alarm odwołuje się głosem na odpowiednim kanale niebezpieczeństwa — wyłączenie radiostacji niczego nie odwołuje.

## Czym jest GMDSS

Przed GMDSS statek w niebezpieczeństwie polegał na radiooficerze pełniącym nasłuch telegraficzny i na tym, że sygnał przypadkiem usłyszą inne statki. W 1988 roku IMO wprowadziła do SOLAS poprawki, które zastąpiły to zautomatyzowanym systemem opartym na dwóch założeniach: alarm od razu dostają służby brzegowe, a nie tylko statki w pobliżu, i alarm sam niesie nazwę i pozycję statku — nikt nie musi ich odczytywać. System wprowadzano etapami od 1992 roku, a w pełni obowiązkowy stał się 1 lutego 1999 roku — tego dnia statki przestały prowadzić nasłuch na telegraficznej częstotliwości niebezpieczeństwa.

GMDSS obowiązuje statki podlegające SOLAS: pasażerskie i towarowe od 300 GT w podróżach międzynarodowych. Od 1 stycznia 2024 roku rozdział IV jest zmodernizowany i mówi o każdej uznanej ruchomej służbie satelitarnej, a nie o jednym operatorze: do Inmarsatu dołączył Iridium, uznany przez IMO w 2018 roku.

System ma dziewięć funkcji: alarmowanie statek–brzeg, brzeg–statek i statek–statek; łączność koordynującą poszukiwanie i ratownictwo; łączność na miejscu akcji; sygnały do lokalizacji; informacje o bezpieczeństwie żeglugi; ogólną łączność radiową; łączność mostek–mostek.

## Najważniejsze liczby

!! 4 | obszary morskie: A1, A2, A3 i A4
!! kan. 70 | DSC na VHF — wywołania w niebezpieczeństwie, pilne i bezpieczeństwa
!! 2187,5 kHz | częstotliwość niebezpieczeństwa DSC na MF (głos — 2182 kHz)
!! 406 MHz | częstotliwość EPIRB, odbierana przez satelity COSPAS-SARSAT
!! 518 kHz | międzynarodowy NAVTEX, po angielsku
!! 12 punktów | sygnał SART na ekranie radaru pasma X

## Cztery obszary morskie

- **A1** — w zasięgu co najmniej jednej stacji brzegowej VHF z ciągłym nasłuchem DSC; zwykle 20–30 mil od stacji brzegowej.
- **A2** — poza A1, w zasięgu co najmniej jednej stacji brzegowej MF z ciągłym nasłuchem DSC; zwykle do około 150 mil.
- **A3** — poza A1 i A2, w zasięgu uznanej ruchomej służby satelitarnej. Geostacjonarne satelity Inmarsatu obejmują mniej więcej od 70° N do 70° S; Iridium obejmuje także bieguny.
- **A4** — wszystko poza A1, A2 i A3: w praktyce rejony polarne, gdzie sięga tylko HF.

Obszary morskie ogłaszają państwa nadbrzeżne, więc ta sama odległość od lądu przy jednym wybrzeżu może być A1, a przy innym A2. Wyposażenie radiowe statku jest dobrane do obszarów, w których pływa, i wymienione w jego świadectwie bezpieczeństwa radiowego.

## Wyposażenie na statku

**Na każdym statku podlegającym SOLAS**, gdziekolwiek pływa:

- **radiostacja VHF** z DSC na kanale 70 i radiotelefonią na kanałach 16, 13 i 6; ciągły nasłuch DSC na kanale 70;
- **odbiornik NAVTEX** do informacji o bezpieczeństwie żeglugi, a tam, gdzie NAVTEX nie sięga, odbiornik rozszerzonego wywołania grupowego (EGC);
- wypływająca **satelitarna radiopława EPIRB** na 406 MHz;
- **SART** — transpondery radarowe lub AIS: co najmniej jeden na każdej burcie na statkach od 500 GT, jeden na mniejszych statkach towarowych;
- **przenośne radiotelefony VHF** dla środków ratunkowych: co najmniej trzy na statkach pasażerskich i towarowych od 500 GT, dwa na statkach towarowych 300–500 GT.

**Dodatkowo, zależnie od obszaru:**

- **A2** — urządzenie radiowe MF z DSC na 2187,5 kHz i radiotelefonią na 2182 kHz.
- **A3** — albo statkowa stacja uznanej służby satelitarnej razem z urządzeniem MF, albo urządzenie MF/HF z DSC.
- **A4** — urządzenie MF/HF z DSC na wszystkich częstotliwościach niebezpieczeństwa i bezpieczeństwa.

Statki w obszarach A1 i A2 zapewniają sprawność wyposażenia jedną z trzech metod — dublowaniem urządzeń, obsługą techniczną na lądzie albo obsługą techniczną na morzu; statki w A3 i A4 co najmniej dwiema z nich. Urządzenia radiowe są zasilane nie tylko z sieci statkowej, ale też z rezerwowego źródła energii.

## Częstotliwości niebezpieczeństwa

- **VHF:** kanał 70 — DSC; kanał 16 (156,8 MHz) — łączność głosowa w niebezpieczeństwie, pilna i bezpieczeństwa; kanał 6 — łączność na miejscu akcji z lotnictwem; kanał 13 — łączność mostek–mostek dla bezpieczeństwa żeglugi.
- **MF:** 2187,5 kHz — DSC, 2182 kHz — głos.
- **HF, DSC:** 4207,5, 6312, 8414,5, 12577 i 16804,5 kHz.
- **HF, głos:** 4125, 6215, 8291, 12290 i 16420 kHz.
- **EPIRB:** 406 MHz do satelitów i sygnał naprowadzający 121,5 MHz dla ratowników.
- **SART:** 9 GHz — odpowiada na impulsy radaru pasma X (3 cm).

W każdej radiostacji DSC zapisany jest MMSI statku — dziewięciocyfrowy numer identyfikacyjny ruchomej służby morskiej, którego pierwsze trzy cyfry oznaczają kraj. MMSI stacji brzegowych zaczynają się od 00.

## Jak nadać alarm o niebezpieczeństwie

Kapitan stwierdza, że statkowi grozi poważne i bezpośrednie niebezpieczeństwo i potrzebna jest natychmiastowa pomoc. Dalej:

1. **Sprawdź pozycję** na pulpicie DSC. Przy działającym odbiorniku GNSS wpisuje się sama; bez niego trzeba ją wpisać ręcznie, inaczej alarm pójdzie ze starą pozycją.
2. **Wybierz rodzaj niebezpieczeństwa**, jeśli jest czas — pożar lub wybuch, zalanie, kolizja, wejście na mieliznę, przechył, tonięcie, utrata napędu i dryf, opuszczanie statku, piractwo, człowiek za burtą. Jeśli czasu nie ma, alarm idzie jako „nieokreślony”.
3. **Podnieś osłonę i przytrzymaj przycisk DISTRESS** przez kilka sekund — większość urządzeń wymaga około pięciu — aż radiostacja potwierdzi, że alarm poszedł.
4. **Przejdź na kanał głosowy** — 16 na VHF, 2182 kHz na MF — i nadaj wywołanie i komunikat MAYDAY: trzy razy MAYDAY, „this is” i trzy razy nazwę statku, znak wywoławczy i MMSI; potem MAYDAY, nazwę, znak wywoławczy i MMSI, pozycję, rodzaj niebezpieczeństwa, potrzebną pomoc, liczbę osób na statku i wszystko inne, co pomoże, i OVER.
5. **Czekaj na potwierdzenie.** Dopóki stacja brzegowa nie potwierdzi odbioru, radiostacja DSC sama powtarza alarm co kilka minut.

Alarm można nadać też przez terminal satelitarny, a w ostateczności EPIRB nada go sam.

## Jak odebrać alarm o niebezpieczeństwie

Na VHF lub MF:

1. Nie potwierdzaj alarmu przez DSC i nie retransmituj go przez DSC, chyba że poprosi o to RCC (centrum koordynacji ratownictwa) albo stacja brzegowa.
2. Słuchaj kanału 16 (lub 2182 kHz) — potwierdzenia stacji brzegowej i korespondencji w niebezpieczeństwie — przez około pięć minut.
3. Jeśli żadna stacja brzegowa nie potwierdziła odbioru, a statek w niebezpieczeństwie jest na tyle blisko, że możesz pomóc, potwierdź mu odbiór głosem na kanale 16 i powiadom RCC lub stację brzegową w dowolny sposób.
4. Zapisz wszystko w dzienniku radiowym, zamelduj kapitanowi i przygotuj się do udzielenia pomocy.

Na HF statki nie potwierdzają odbioru — robi to stacja brzegowa. Jeśli po około pięciu minutach nikt tego nie zrobił, powiadom RCC.

Powód tej zasady jest prosty: w pierwszych latach statki, które potwierdzały i retransmitowały cudze alarmy przez DSC, zapychały kanał automatycznym ruchem, a pierwotny alarm w nim ginął.

## Fałszywy alarm: co robić

Fałszywe alarmy to jeden z największych problemów GMDSS: ktoś naciska przycisk na ćwiczeniach, przy sprzątaniu albo z ciekawości, a system ratowniczy rusza do pracy. Najważniejsze to odwołać go od razu:

1. **Nie wyłączaj radiostacji.** Alarm już poszedł; po wyłączeniu przestaniesz tylko słyszeć potwierdzenia.
2. **Zatrzymaj powtarzanie** — zresetuj pulpit albo użyj funkcji odwołania, jeśli jest.
3. **Odwołaj głosem** na kanale niebezpieczeństwa pasma, w którym poszedł alarm — kanał 16 na VHF, 2182 kHz na MF: „ALL STATIONS, ALL STATIONS, ALL STATIONS, THIS IS (nazwa, znak wywoławczy, MMSI), POSITION (...), CANCEL MY DISTRESS ALERT OF (data i godzina) UTC — MASTER (nazwisko)”.
4. **Zapisz** to w dzienniku radiowym i powiadom armatora.

Jeśli przez pomyłkę uruchomiła się EPIRB, wyłącz ją i od razu powiadom najbliższe RCC lub stację brzegową. Fałszywy alarm odwołany od razu to rutynowa sprawa; nieodwołany wysyła ludzi i samoloty w morze na próżno.

## EPIRB, SART i NAVTEX w praktyce

- **EPIRB** — stoi we wsporniku samouwalniającym ze zwalniakiem hydrostatycznym (HRU). Gdy statek tonie, zwalniak uwalnia pławę na głębokości nie większej niż cztery metry, pława wypływa, sama się włącza i nadaje do satelitów COSPAS-SARSAT dane identyfikacyjne statku — i pozycję, jeśli ma odbiornik GNSS. Można ją też włączyć ręcznie i zabrać do tratwy. Linki pławy nigdy nie wolno przywiązywać do statku.
- **SART** — zabiera się go do środka ratunkowego i tam włącza. Gdy omiata go radar pasma X statku lub samolotu, na ekranie pojawia się linia 12 punktów biegnąca od pozycji SART; w miarę zbliżania się ratownika punkty zmieniają się w łuki, a potem w koncentryczne okręgi. Podniesiony co najmniej metr nad wodę jest widoczny ze statku z około pięciu mil, z samolotu znacznie dalej. W trybie czuwania bateria wystarcza na 96 godzin, potem jeszcze na 8 godzin nadawania. AIS-SART pokazuje się zamiast tego jako specjalny cel na AIS i w ECDIS.
- **NAVTEX** — drukuje ostrzeżenia nawigacyjne i meteorologiczne, informacje o poszukiwaniu i ratownictwie oraz prognozy na 518 kHz po angielsku (na 490 kHz idą audycje w językach narodowych), w promieniu około 400 mil. Stacje i rodzaje komunikatów można wybierać, ale ostrzeżeń nawigacyjnych (A), ostrzeżeń meteorologicznych (B), informacji o poszukiwaniu i ratownictwie (D) i dodatkowych ostrzeżeń nawigacyjnych (L) wyłączyć nie można.

## Testy i dziennik radiowy

- **Codziennie:** wewnętrzny test DSC bez emisji; naładowanie akumulatorów rezerwowych; drukarka NAVTEX i papier.
- **Co tydzień:** testowe wywołanie DSC stacji brzegowej na MF lub HF, tam gdzie to możliwe.
- **Co miesiąc:** autotest EPIRB oraz daty ważności zwalniaka i baterii; autotest SART; przenośne radiotelefony VHF i ich baterie — na kanale roboczym, nigdy na 16 ani 70.
- **Co 12 miesięcy:** test EPIRB; nie rzadziej niż co pięć lat — obsługa w uznanym serwisie lądowym.

Wszystko trafia do dziennika radiowego GMDSS: odebrana i nadana korespondencja w niebezpieczeństwie, pilna i bezpieczeństwa, testy i ich wyniki, pozycja statku co najmniej raz na dobę, każda usterka i jej naprawa.

## Świadectwa: GOC i ROC

- **GOC** — świadectwo operatora ogólnego GMDSS (General Operator's Certificate) według prawidła IV/2 STCW: operator we wszystkich obszarach morskich. Mają je oficerowie pokładowi na statkach podlegających SOLAS.
- **ROC** — świadectwo operatora ograniczonego (Restricted Operator's Certificate): tylko obszar A1.
- **SRC i LRC** — świadectwa krótkiego i długiego zasięgu dla jednostek niepodlegających SOLAS, np. jachtów. Nie zastępują GOC.

Jak inne świadectwa STCW, GOC odnawia się co pięć lat. Rozkład alarmowy statku wskazuje osobę odpowiedzialną za łączność radiową w niebezpieczeństwie — zwykle kapitana lub jednego z oficerów.

## O co pytają na rozmowie

- **Kapitanowie i starsi oficerowie:** obszary morskie i wyposażenie dla każdego z nich; metody zapewnienia sprawności wyposażenia; kto i kiedy potwierdza alarm o niebezpieczeństwie; fałszywe alarmy; co obejmuje świadectwo bezpieczeństwa radiowego.
- **Drudzy i trzeci oficerowie:** procedura alarmu DSC krok po kroku; komunikat MAYDAY; częstotliwości niebezpieczeństwa; testy codzienne, cotygodniowe i comiesięczne; ustawienia NAVTEX; jak SART wygląda na radarze.
- **Załoga szeregowa:** gdzie są EPIRB, SART i przenośne VHF i kto zanosi je do łodzi; jak włączyć SART i gdzie go trzymać; że linki EPIRB nie wolno przywiązywać.

## Typowe błędy

1. Wyłączenie radiostacji po przypadkowym alarmie zamiast odwołania go głosem.
2. Wysłanie alarmu ze starą pozycją, bo zanikł sygnał GNSS i nikt nie spojrzał.
3. Przywiązanie linki EPIRB do wspornika lub relingu — statek pociągnie pławę za sobą.
4. Przeterminowany zwalniak lub bateria EPIRB.
5. Testowanie przenośnych VHF na kanale 16.
6. Wyłączenie stacji lub rodzajów komunikatów NAVTEX, „bo ostrzeżenia i tak są w ECDIS”.
7. Trzymanie SART na dnie tratwy — nisko nad wodą radar widzi go z wielokrotnie mniejszej odległości.

## Sprawdź się

?? Czym jest obszar morski A3?
=> Obszarem poza A1 i A2 w zasięgu uznanej ruchomej służby satelitarnej — dla Inmarsatu mniej więcej od 70° N do 70° S.
?? Na jakich częstotliwościach nadaje się alarm o niebezpieczeństwie przez DSC?
=> Kanał 70 VHF, 2187,5 kHz na MF, a na HF — 4207,5, 6312, 8414,5, 12577 i 16804,5 kHz.
?? Na VHF przypadkiem naciśnięto DISTRESS. Co robisz?
=> Nie wyłączam radiostacji. Zatrzymuję powtarzanie, potem nadaję na kanale 16 do wszystkich stacji: nazwę, znak wywoławczy, MMSI i pozycję statku, „cancel my distress alert of”, datę i godzinę UTC. Zapisuję to w dzienniku radiowym.
?? Jak SART wygląda na ekranie radaru?
=> Jak linia 12 punktów biegnąca od pozycji SART; w miarę zbliżania się zmieniają się w łuki, a potem w koncentryczne okręgi. Uruchamia go tylko radar pasma X (3 cm).
?? Co się dzieje z EPIRB, gdy statek tonie?
=> Zwalniak hydrostatyczny uwalnia ją na głębokości nie większej niż cztery metry; pława wypływa, sama się włącza i nadaje na 406 MHz do satelitów COSPAS-SARSAT.
?? Czym GOC różni się od ROC?
=> GOC obowiązuje we wszystkich obszarach morskich, od A1 do A4; ROC — tylko w obszarze A1.

## Komu na statku to potrzebne

GOC ma każdy oficer pokładowy — [kapitan](/pl/jobs/rank/master), [starszy oficer](/pl/jobs/rank/chief-officer), [drugi](/pl/jobs/rank/2nd-officer) i [trzeci oficer](/pl/jobs/rank/3rd-officer), którzy zwykle prowadzą dziennik radiowy i testy. [Elektroautomatyk (ETO)](/pl/jobs/rank/eto) często odpowiada za same urządzenia, a [starszy marynarz AB](/pl/jobs/rank/able-seaman) i [kadet pokładowy](/pl/jobs/rank/deck-cadet) muszą wiedzieć, gdzie są EPIRB, SART i przenośne VHF i co z nimi robić przy opuszczaniu statku. Samo świadectwo operatora to prawidło IV/2 STCW, zobacz [STCW w prostych słowach](/pl/handbook/stcw-w-prostych-slowach-prawidla-ii-1-vi-6-staz-odnowienie-dyplomow-i-godziny-od-09ed56ce-402e-40a5-9885-180e01f44c8f); ćwiczenia i środki ratunkowe, które idą z nim w parze, są w [SOLAS w prostych słowach](/pl/handbook/solas-w-prostych-slowach-cwiczenia-srodki-ratunkowe-i-pytania-na-rozmowie-2cbdb6d6-b0fa-498a-9c32-68bd9b95e096), a słowa komunikatu MAYDAY — w [SMCP w prostych słowach](/pl/handbook/smcp-w-prostych-slowach-mayday-i-pan-pan-znaczniki-komunikatow-komendy-sterowe-i-210d240d-f93c-4c9f-b1a2-aa48b5000c4b).

Wpisz GOC z numerem i datą ważności do [CV marynarza](/pl/maritime-cv).

*Źródło: rozdział IV SOLAS, Regulamin radiokomunikacyjny ITU oraz wytyczne IMO dotyczące alarmów o niebezpieczeństwie i ich odwoływania. Na statku obowiązują jego urządzenia radiowe, ich instrukcje i polecenia kapitana. Ta strona to pomoc do nauki, a nie tekst prawny.*$pl$),
  'GMDSS', 'handbook',
  'linear-gradient(135deg,#0e2a45,#1f7a6d)',
  true, '2026-10-10 10:00:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE id = '8bda0946-1e5d-4e0c-9369-896823d11b2b' OR title->>'en' = 'GMDSS in plain words: sea areas, DSC, EPIRB and SART, false alerts and interview questions');

-- ── H2. SMCP ──────────────────────────────────────────────────────────────────
INSERT INTO news_articles (id, title, body, tag, category, cover_gradient, is_published, published_at)
SELECT
  '210d240d-f93c-4c9f-b1a2-aa48b5000c4b'::uuid,
  jsonb_build_object(
    'en', 'SMCP in plain words: Mayday and Pan-Pan, message markers, helm and engine orders, and interview questions',
    'ru', 'SMCP простыми словами: Mayday и Pan-Pan, маркеры сообщений, команды на руль и в машину и вопросы на собеседовании',
    'ua', 'SMCP простими словами: Mayday і Pan-Pan, маркери повідомлень, команди на стерно та в машину й питання на співбесіді',
    'pl', 'SMCP w prostych słowach: Mayday i Pan-Pan, znaczniki komunikatów, komendy sterowe i maszynowe oraz pytania na rozmowie'),
  jsonb_build_object(
    'en', $en$SMCP is the English a ship actually runs on: the phrases the pilot, the VTS operator and the officer of the watch use so that a Filipino helmsman, a Ukrainian chief officer and a Dutch traffic centre understand each other the first time, over a bad VHF line. STCW requires every officer of the watch to know them, the Marlins and CES tests check them, and a master often tests them in the first minutes on board. This page is a phrase reference rather than an English course: how SMCP is built, the message markers, numbers, positions and times, MAYDAY, PAN-PAN and SÉCURITÉ, the standard wheel and engine orders, the phrases for berthing and anchoring, the mistakes that cause misunderstandings, and questions to test yourself.

:: **In short**
:: - The IMO Standard Marine Communication Phrases (SMCP) were adopted in 2001 and replaced the 1977 Standard Marine Navigational Vocabulary.
:: - STCW requires officers in charge of a navigational watch to use and understand them.
:: - Eight message markers — instruction, advice, warning, information, question, answer, request, intention — tell the listener what kind of message follows.
:: - Numbers are spoken digit by digit, courses and bearings always in three figures, times in UTC.

## What SMCP is

The IMO Assembly adopted the Standard Marine Communication Phrases in November 2001 by resolution A.918(22), replacing the Standard Marine Navigational Vocabulary of 1977. The idea is the one aviation adopted long before: a simplified English with fixed phrases, one meaning per phrase, no synonyms and no contractions, built for people whose first language is something else and for radio links that lose half the syllables.

STCW makes it a requirement. The competence table for officers in charge of a navigational watch (A-II/1) asks for English good enough to use charts and publications, to understand weather and safety messages, to communicate with other ships, coast stations and VTS centres and with a multilingual crew — "including the ability to use and understand the IMO Standard Marine Communication Phrases". Ratings forming part of a watch must understand orders and make themselves understood on watchkeeping matters, which on most ships means in English.

SMCP has two parts:

- **Part A** — what STCW requires: external communications (distress, urgency and safety traffic, search and rescue, VTS) and the on-board phrases used with a pilot on the bridge, including the standard wheel and engine orders.
- **Part B** — the rest of life on board: berthing and anchoring, tugs, drills, damage and fire, cargo, passenger care.

A general section in front of both sets out the procedure — spelling, numbers, positions, message markers and the standard answers.

## Key numbers

!! 2001 | SMCP adopted by IMO, resolution A.918(22)
!! 8 | message markers
!! 3 times | MAYDAY, PAN-PAN or SÉCURITÉ is said before the message
!! 3 figures | every course and bearing, from 000 to 359
!! 26 | letters in the phonetic alphabet, from Alfa to Zulu
!! 10 | cables in a nautical mile

## The message markers

In ship-to-shore traffic, and especially with VTS, a message can begin with a marker that says what kind of message it is. The marker is said first, then the message:

- **INSTRUCTION** — "Instruction. Do not overtake." Comes from an authority, such as a VTS centre or a naval vessel. The recipient must follow it, unless there are safety reasons against it, which are then reported to the sender.
- **ADVICE** — "Advice. Stand by on VHF channel one-two." Not obligatory, but to be considered very carefully.
- **WARNING** — "Warning. Obstruction in the fairway." Information about a danger; the listener takes note at once.
- **INFORMATION** — "Information. My present speed is one-two knots." Facts only.
- **QUESTION** — "Question. What is your present draft?"
- **ANSWER** — "Answer. My present draft is one-one decimal five metres." The reply to a question.
- **REQUEST** — "Request. I require two tugs." Asks for action or assistance — not for information; that is a question.
- **INTENTION** — "Intention. I will reduce my speed." Announces your own navigational action.

## The standard answers

- **Yes / No** — never alone: "Yes, I will reduce speed." "No, I will not enter the fairway." A full sentence, because over a bad line a lonely "yes" tells nobody what was agreed.
- **Stand by** — the information is not ready yet; give the time: "Stand by — five minutes."
- **No information** — it cannot be obtained.
- **Unable to comply** — and the reason: "Unable to comply. Engine broken down."
- **Say again** — the message was not heard properly. **Message not understood** — heard, but not understood.
- **Mistake … correction** — to correct yourself: "My present speed is one-four knots — mistake. Correction: my present speed is one-two, one-two knots."
- **Repeat** — to stress a vital part: "Do not overtake — repeat — do not overtake."
- **Over** — I have finished and expect a reply. **Out** — the conversation is over. "Over and out" contradicts itself.

SMCP also avoids "may" and "can", which blur permission and possibility. Instead of "May I enter the fairway?": "Question. Do I have permission to enter the fairway?" — "Answer. Yes, you have permission to enter the fairway."

## Numbers, positions and times

- **Numbers** are spoken digit by digit: 150 is "one-five-zero", 2.5 is "two decimal five" (or "two point five"). The one exception is the rudder angle in wheel orders: "starboard fifteen", not "one-five".
- **Pronunciation:** ZEERO, WUN, TOO, TREE, FOWER, FIFE, SIX, SEVEN, AIT, NINER. TREE, FIFE and NINER exist because "three", "five" and "nine" are the digits most often misheard.
- **Courses and bearings** — always three figures in the 360-degree notation from north, true unless stated otherwise: "course zero-four-five". Relative bearings are given from the bow: "the buoy is zero-three-zero degrees on your port bow".
- **Positions** — latitude and longitude in degrees and minutes, with north or south and east or west; or a bearing and distance from a well-defined mark, saying whether the bearing is from the mark or from the ship.
- **Distances** in nautical miles or cables, always with the unit. **Speed** in knots — through the water unless "over the ground" is said.
- **Times** in UTC, 24-hour, four figures: "one-four-three-zero UTC". Local time only when said so, typically in port.

**Spelling** uses the phonetic alphabet: Alfa, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu. Ship names and call signs are spelt when there is any doubt: "I spell: Kilo-India-Lima-Oscar".

## MAYDAY, PAN-PAN and SÉCURITÉ

- **MAYDAY** — distress: the ship or a person is in grave and imminent danger and needs immediate assistance. The call: MAYDAY three times, "this is" and the ship's name three times, call sign and MMSI. The message: MAYDAY, the name, call sign and MMSI, the position, the nature of the distress, the assistance required, the number of persons on board and any other information — then OVER.
- **PAN-PAN** — urgency: an urgent message about the safety of the ship or a person, but no grave and imminent danger — an engine failure near a lee shore, a seriously injured crew member who needs medical advice.
- **SÉCURITÉ** (say-cure-ee-tay) — safety: a navigational or meteorological warning — a buoy off station, a drifting container, a gale warning.

Each is said three times before the call. The words come from French — "m'aider" (help me), "panne" (breakdown) and "sécurité" (safety).

The distress phrases themselves are short and fixed: "I am on fire." "I am flooding." "I have collided with …" "I am aground." "I am listing — danger of capsizing." "I am sinking." "I am disabled and adrift." "I am abandoning vessel." "Person overboard." "I require assistance." "I require medical assistance."

During distress traffic the station controlling it can impose radio silence with **SEELONCE MAYDAY**. **PRUDONCE** means restricted working may resume; **SEELONCE FEENEE** means the distress traffic is over. Channel 16 is for distress, urgency, safety and calling — once contact is made, switch to a working channel: "Switch to VHF channel one-four."

## Wheel and engine orders

**Wheel orders:**

- "Midships" — rudder amidships.
- "Port five", "port ten", "port fifteen", "port twenty", "port twenty-five", "hard-a-port" — and the same to starboard.
- "Ease to five", "ease to ten", "ease to fifteen", "ease to twenty" — reduce the rudder angle to that figure.
- "Steady" — reduce the swing as quickly as possible. "Steady as she goes" — steer the course on the compass at the moment of the order.
- "Steer one-two-three" — a course to steer, in three figures.
- "Nothing to port" / "nothing to starboard" — do not let the ship go to that side of the ordered course.
- "Keep the buoy on port side", "Report if she does not answer the wheel", "Finished with wheel — no more steering".

The helmsman repeats every wheel order, the officer makes sure it has been carried out correctly and at once, and each order stands until it is countermanded. If the ship does not answer the wheel, the helmsman reports it immediately.

**Engine orders:** full ahead, half ahead, slow ahead, dead slow ahead, stop engine, dead slow astern, slow astern, half astern, full astern, emergency full ahead, emergency full astern; stand by engine; finished with engine. On ships with two engines the engine is named first: "starboard engine half astern". Engine orders are repeated back too.

## Berthing, anchoring and the pilot

- **Berthing:** "Stand by forward / aft." "Send out the head line / stern line / spring." "Heave in." "Slack away." "Hold on." "Make fast." "Single up to one head line and one spring forward." "Let go." "All fast" — the ship is secured.
- **Anchoring:** "Stand by port anchor." "Let go port anchor." "Walk out the anchor." "How is the cable leading?" — "The cable is leading ahead / astern / up and down." "The anchor is holding." "The anchor is dragging." "Heave up." "The anchor is aweigh."
- **Pilot:** "Pilot ladder rigged on starboard side, one metre above water." "What is your present draft?" "My maximum draft is eight decimal five metres."

Lookouts report in the same terms: what they see, where — right ahead, on the port bow, abeam to starboard — and how far, if they can judge it.

## What they ask at the interview

- **Officers:** the message markers and when each is used; a MAYDAY message for a given situation, said aloud; the difference between PAN-PAN and SÉCURITÉ; how to give a position and a time; what to do when a VTS instruction conflicts with safety; how to correct yourself on the radio.
- **Ratings:** the wheel orders — usually played or spoken, and you repeat and explain them; the engine orders; mooring and anchoring commands; a lookout report.
- **Everyone:** an interview in English about your last ship, your duties and an emergency you took part in. The tests — Marlins and CES — check SMCP vocabulary and listening.

## Common mistakes

1. Reading numbers as whole numbers. "Fifteen" and "fifty" are a frequent mix-up on a noisy channel; "one-five" and "five-zero" never are.
2. "Left" and "right" instead of "port" and "starboard" — and "rudder fifteen" without a side.
3. A bare "OK" or "yes" instead of a full answer.
4. Local time, kilometres or a bearing without saying whether it is true or relative.
5. Not repeating wheel orders, or repeating them without carrying them out.
6. "May I…?" and "Can you…?" instead of "Question. Do I have permission…?" and "Request…".
7. Conversations on channel 16, and "over and out".

## Test yourself

?? What are the eight message markers?
=> Instruction, advice, warning, information, question, answer, request and intention.
?? How do you say a course of 150 degrees and a distance of 2.5 miles?
=> "One-five-zero degrees" and "two decimal five miles" — every digit separately.
?? When do you use MAYDAY, PAN-PAN and SÉCURITÉ?
=> MAYDAY — grave and imminent danger, immediate assistance needed. PAN-PAN — an urgent message about the safety of the ship or a person. SÉCURITÉ — a navigational or meteorological warning.
?? How is a rudder angle of 15° to port ordered?
=> "Port fifteen" — in wheel orders the angle is said as a whole number. The helmsman repeats "port fifteen" and carries it out.
?? You gave a wrong figure in a radio message. How do you correct it?
=> Say "mistake", then "correction" and the right version: "…one-four knots — mistake. Correction: one-two, one-two knots."
?? A VTS centre says "Instruction. Do not overtake." What does the marker mean for you?
=> You must comply, unless there are safety reasons against it — and then you report those reasons to the VTS.

## Who on board needs this

Every officer of the watch — the [third](/jobs/rank/3rd-officer) and [second officer](/jobs/rank/2nd-officer), the [chief officer](/jobs/rank/chief-officer) and the [master](/jobs/rank/master), who talks to pilots and VTS; the [able seaman](/jobs/rank/able-seaman) and the [ordinary seaman](/jobs/rank/ordinary-seaman) at the wheel and on lookout; the [bosun](/jobs/rank/bosun) on the forecastle; and the [deck cadet](/jobs/rank/deck-cadet), whose first real test it often is. Why maritime English matters and how to improve it is in the guide [Maritime English and SMCP](/guides/maritime-english-and-smcp-why-it-matters-and-how-to-improve-1b39987f-afc4-4a6d-8ff8-4bc1150995aa); the tests that check it in [the Marlins test](/guides/the-marlins-english-test-for-seafarers-format-sections-and-how-to-prepare-8d005130-290d-4772-be5a-fc982cc2ec2d) and [the CES test](/guides/the-ces-test-crew-evaluation-system-what-it-checks-and-how-to-prepare-8cab65a8-a51a-4498-a36c-17ce88b08331). The radio side of distress traffic — DSC, channels, false alerts — is in [GMDSS in plain words](/handbook/gmdss-in-plain-words-sea-areas-dsc-epirb-and-sart-false-alerts-and-interview-que-8bda0946-1e5d-4e0c-9369-896823d11b2b).

Put your English level and test results into your [maritime CV](/maritime-cv) — crewing managers look for them first.

*Source: IMO Standard Marine Communication Phrases (resolution A.918(22)) and STCW table A-II/1. Your ship's procedures and the master's standing orders prevail on board. This page is a study aid, not a legal text.*$en$,
    'ru', $ru$SMCP — это английский, на котором на самом деле работает судно: фразы, которыми лоцман, оператор СУДС и вахтенный помощник говорят так, чтобы филиппинский рулевой, украинский старпом и голландский центр управления движением поняли друг друга с первого раза, по плохой УКВ-связи. ПДНВ требует их знать от каждого вахтенного помощника, тесты Marlins и CES их проверяют, а капитан нередко проверяет их в первые минуты на борту. Эта страница — справочник фраз, а не курс английского: как устроен SMCP, маркеры сообщений, цифры, координаты и время, MAYDAY, PAN-PAN и SÉCURITÉ, стандартные команды на руль и в машину, фразы для швартовки и постановки на якорь, ошибки, из-за которых возникают недоразумения, и вопросы для самопроверки.

:: **Коротко**
:: - Стандартные фразы ИМО для общения на море (SMCP) приняты в 2001 году и заменили Стандартный морской навигационный словарь 1977 года.
:: - ПДНВ требует, чтобы вахтенные помощники умели ими пользоваться и понимали их.
:: - Восемь маркеров сообщений — instruction, advice, warning, information, question, answer, request, intention — говорят слушателю, какое сообщение последует.
:: - Числа произносят по цифрам, курсы и пеленги — всегда тремя цифрами, время — по UTC.

## Что такое SMCP

Ассамблея ИМО приняла Стандартные фразы для общения на море в ноябре 2001 года резолюцией A.918(22); они заменили Стандартный морской навигационный словарь 1977 года. Идея та же, к которой авиация пришла задолго до этого: упрощённый английский с готовыми фразами, одним значением у каждой фразы, без синонимов и без сокращённых форм — для людей, у которых родной язык другой, и для радиосвязи, на которой теряется половина слогов.

ПДНВ делает это обязательным. Таблица компетентности вахтенных помощников (A-II/1) требует английского, достаточного, чтобы пользоваться картами и пособиями, понимать метеосообщения и сообщения о безопасности, общаться с другими судами, береговыми станциями и центрами СУДС и с многонациональным экипажем, — «включая умение использовать и понимать Стандартные фразы ИМО для общения на море». Рядовой состав, входящий в вахту, должен понимать команды и уметь объясниться по вопросам вахты — на большинстве судов это значит по-английски.

SMCP состоит из двух частей:

- **Часть A** — то, чего требует ПДНВ: внешняя связь (бедствие, срочность и безопасность, поиск и спасание, СУДС) и фразы на борту при лоцмане на мостике, включая стандартные команды на руль и в машину.
- **Часть B** — остальная жизнь на борту: швартовка и якорь, буксиры, тревоги, повреждения и пожар, груз, работа с пассажирами.

Общий раздел перед ними задаёт порядок: побуквенное произношение, числа, координаты, маркеры сообщений и стандартные ответы.

## Главные цифры

!! 2001 | SMCP приняты ИМО, резолюция A.918(22)
!! 8 | маркеров сообщений
!! 3 раза | MAYDAY, PAN-PAN или SÉCURITÉ перед сообщением
!! 3 цифры | у каждого курса и пеленга, от 000 до 359
!! 26 | букв фонетического алфавита, от Alfa до Zulu
!! 10 | кабельтовых в морской миле

## Маркеры сообщений

В связи судно–берег, а особенно с СУДС, сообщение может начинаться с маркера, который говорит, что это за сообщение. Сначала маркер, потом само сообщение:

- **INSTRUCTION** (указание) — «Instruction. Do not overtake». Исходит от того, у кого есть полномочия, — центра СУДС или военного корабля. Получатель обязан его выполнить, если только этому не мешают соображения безопасности, — тогда о них сообщают отправителю.
- **ADVICE** (совет) — «Advice. Stand by on VHF channel one-two». Не обязателен, но его нужно очень внимательно рассмотреть.
- **WARNING** (предупреждение) — «Warning. Obstruction in the fairway». Информация об опасности; слушатель сразу принимает её к сведению.
- **INFORMATION** (информация) — «Information. My present speed is one-two knots». Только факты.
- **QUESTION** (вопрос) — «Question. What is your present draft?»
- **ANSWER** (ответ) — «Answer. My present draft is one-one decimal five metres». Ответ на вопрос.
- **REQUEST** (просьба) — «Request. I require two tugs». Просьба о действии или помощи — не об информации: для неё есть question.
- **INTENTION** (намерение) — «Intention. I will reduce my speed». Сообщает о вашем собственном манёвре.

## Стандартные ответы

- **Yes / No** — никогда не одно слово: «Yes, I will reduce speed». «No, I will not enter the fairway». Полное предложение — потому что по плохой связи одинокое «yes» никому не говорит, о чём договорились.
- **Stand by** — информации пока нет; назовите время: «Stand by — five minutes».
- **No information** — получить её нельзя.
- **Unable to comply** — и причина: «Unable to comply. Engine broken down».
- **Say again** — сообщение плохо слышно. **Message not understood** — слышно, но непонятно.
- **Mistake … correction** — чтобы поправить себя: «My present speed is one-four knots — mistake. Correction: my present speed is one-two, one-two knots».
- **Repeat** — чтобы подчеркнуть важную часть: «Do not overtake — repeat — do not overtake».
- **Over** — передача окончена, жду ответа. **Out** — разговор окончен. «Over and out» противоречит само себе.

SMCP также избегает «may» и «can», в которых смешиваются разрешение и возможность. Вместо «May I enter the fairway?» — «Question. Do I have permission to enter the fairway?» — «Answer. Yes, you have permission to enter the fairway».

## Числа, координаты и время

- **Числа** произносят по цифрам: 150 — «one-five-zero», 2,5 — «two decimal five» (или «two point five»). Единственное исключение — угол перекладки руля в командах: «starboard fifteen», а не «one-five».
- **Произношение:** ZEERO, WUN, TOO, TREE, FOWER, FIFE, SIX, SEVEN, AIT, NINER. TREE, FIFE и NINER придуманы потому, что «three», «five» и «nine» путают чаще всего.
- **Курсы и пеленги** — всегда три цифры по круговой системе от севера, истинные, если не сказано иное: «course zero-four-five». Курсовые углы дают от носа: «the buoy is zero-three-zero degrees on your port bow».
- **Координаты** — широта и долгота в градусах и минутах, с указанием N или S и E или W; или пеленг и расстояние от хорошо заметного ориентира — с уточнением, пеленг от ориентира или от судна.
- **Расстояния** — в морских милях или кабельтовых, всегда с единицей. **Скорость** — в узлах, относительно воды, если не сказано «over the ground».
- **Время** — по UTC, в 24-часовом формате, четырьмя цифрами: «one-four-three-zero UTC». Местное — только если это сказано, обычно в порту.

**Побуквенное произношение** — по фонетическому алфавиту: Alfa, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu. Название судна и позывной передают по буквам при малейшем сомнении: «I spell: Kilo-India-Lima-Oscar».

## MAYDAY, PAN-PAN и SÉCURITÉ

- **MAYDAY** — бедствие: судну или человеку грозит серьёзная и непосредственная опасность и нужна немедленная помощь. Вызов: трижды MAYDAY, «this is» и трижды название судна, позывной и MMSI. Сообщение: MAYDAY, название, позывной и MMSI, координаты, характер бедствия, какая помощь нужна, сколько людей на борту и прочая информация — затем OVER.
- **PAN-PAN** — срочность: срочное сообщение о безопасности судна или человека, но без серьёзной и непосредственной опасности, — отказ двигателя у подветренного берега, тяжело травмированный член экипажа, которому нужна медицинская консультация.
- **SÉCURITÉ** (сэ-кю-ри-тэ) — безопасность: навигационное или метеорологическое предупреждение — буй не на месте, дрейфующий контейнер, штормовое предупреждение.

Каждое слово произносят трижды перед вызовом. Все три пришли из французского: «m'aider» (помогите мне), «panne» (поломка) и «sécurité» (безопасность).

Сами фразы бедствия короткие и неизменные: «I am on fire». «I am flooding». «I have collided with …» «I am aground». «I am listing — danger of capsizing». «I am sinking». «I am disabled and adrift». «I am abandoning vessel». «Person overboard». «I require assistance». «I require medical assistance».

Во время обмена по бедствию станция, которая им руководит, может объявить радиомолчание словами **SEELONCE MAYDAY**. **PRUDONCE** означает, что можно возобновить ограниченную работу, **SEELONCE FEENEE** — обмен по бедствию закончен. 16-й канал — для бедствия, срочности, безопасности и вызова; установив связь, переходите на рабочий канал: «Switch to VHF channel one-four».

## Команды на руль и в машину

**Команды на руль:**

- «Midships» — руль прямо.
- «Port five», «port ten», «port fifteen», «port twenty», «port twenty-five», «hard-a-port» — лево пять, десять, пятнадцать, двадцать, двадцать пять, лево на борт; так же и вправо.
- «Ease to five», «ease to ten», «ease to fifteen», «ease to twenty» — уменьшить перекладку руля до этого угла.
- «Steady» — как можно быстрее погасить поворот (одерживай). «Steady as she goes» — держать курс по компасу, который был в момент команды (так держать).
- «Steer one-two-three» — курс, которым идти, тремя цифрами.
- «Nothing to port» / «nothing to starboard» — не допускать ухода судна в эту сторону от заданного курса.
- «Keep the buoy on port side», «Report if she does not answer the wheel», «Finished with wheel — no more steering».

Рулевой повторяет каждую команду, помощник следит, чтобы она была выполнена правильно и сразу, а каждая команда действует, пока её не отменят. Если судно не слушается руля, рулевой докладывает об этом немедленно.

**Команды в машину:** full ahead, half ahead, slow ahead, dead slow ahead, stop engine, dead slow astern, slow astern, half astern, full astern, emergency full ahead, emergency full astern; stand by engine; finished with engine. На судах с двумя машинами сначала называют машину: «starboard engine half astern». Команды в машину тоже повторяют.

## Швартовка, якорь и лоцман

- **Швартовка:** «Stand by forward / aft». «Send out the head line / stern line / spring». «Heave in». «Slack away». «Hold on». «Make fast». «Single up to one head line and one spring forward». «Let go». «All fast» — судно ошвартовано.
- **Якорь:** «Stand by port anchor». «Let go port anchor». «Walk out the anchor». «How is the cable leading?» — «The cable is leading ahead / astern / up and down». «The anchor is holding». «The anchor is dragging». «Heave up». «The anchor is aweigh».
- **Лоцман:** «Pilot ladder rigged on starboard side, one metre above water». «What is your present draft?» «My maximum draft is eight decimal five metres».

Впередсмотрящий докладывает теми же словами: что видит, где — right ahead, on the port bow, abeam to starboard — и как далеко, если может оценить.

## Что спрашивают на собеседовании

- **Помощники:** маркеры сообщений и когда какой используется; сообщение MAYDAY для заданной ситуации — вслух; разница между PAN-PAN и SÉCURITÉ; как назвать координаты и время; что делать, если указание СУДС противоречит безопасности; как поправить себя в эфире.
- **Рядовой состав:** команды на руль — их обычно проигрывают или произносят, а вы повторяете и объясняете; команды в машину; команды на швартовке и постановке на якорь; доклад впередсмотрящего.
- **Все:** собеседование на английском о последнем судне, обязанностях и аварийной ситуации, в которой вы участвовали. Тесты Marlins и CES проверяют словарь SMCP и восприятие на слух.

## Частые ошибки

1. Читать числа целиком. «Fifteen» и «fifty» на шумном канале путают постоянно; «one-five» и «five-zero» — никогда.
2. «Left» и «right» вместо «port» и «starboard» — и «rudder fifteen» без указания борта.
3. Голое «OK» или «yes» вместо полного ответа.
4. Местное время, километры или пеленг без указания, истинный он или курсовой угол.
5. Не повторять команды на руль — или повторять, не выполняя.
6. «May I…?» и «Can you…?» вместо «Question. Do I have permission…?» и «Request…».
7. Разговоры на 16-м канале и «over and out».

## Проверь себя

?? Какие восемь маркеров сообщений есть в SMCP?
=> Instruction, advice, warning, information, question, answer, request и intention.
?? Как сказать курс 150 градусов и расстояние 2,5 мили?
=> «One-five-zero degrees» и «two decimal five miles» — каждую цифру отдельно.
?? Когда используют MAYDAY, PAN-PAN и SÉCURITÉ?
=> MAYDAY — серьёзная и непосредственная опасность, нужна немедленная помощь. PAN-PAN — срочное сообщение о безопасности судна или человека. SÉCURITÉ — навигационное или метеорологическое предупреждение.
?? Как дать команду переложить руль на 15° влево?
=> «Port fifteen» — в командах на руль угол произносят целым числом. Рулевой повторяет «port fifteen» и выполняет.
?? Вы назвали в эфире неверную цифру. Как поправиться?
=> Сказать «mistake», затем «correction» и правильный вариант: «…one-four knots — mistake. Correction: one-two, one-two knots».
?? Центр СУДС передаёт «Instruction. Do not overtake». Что этот маркер значит для вас?
=> Указание нужно выполнить, если только этому не мешают соображения безопасности, — а тогда сообщить о них СУДС.

## Кому на борту это нужно

Каждому вахтенному помощнику — [третьему](/ru/jobs/rank/3rd-officer) и [второму помощнику](/ru/jobs/rank/2nd-officer), [старпому](/ru/jobs/rank/chief-officer) и [капитану](/ru/jobs/rank/master), который говорит с лоцманами и СУДС; [матросу AB](/ru/jobs/rank/able-seaman) и [матросу OS](/ru/jobs/rank/ordinary-seaman) на руле и на посту впередсмотрящего; [боцману](/ru/jobs/rank/bosun) на баке; и [палубному кадету](/ru/jobs/rank/deck-cadet), для которого это часто первая настоящая проверка. Зачем нужен морской английский и как его подтянуть — в гайде [Морской английский и SMCP](/ru/guides/morskoy-angliyskiy-i-smcp-zachem-on-nuzhen-i-kak-podtyanut-1b39987f-afc4-4a6d-8ff8-4bc1150995aa); тесты, которые его проверяют, — в гайдах [Тест Marlins](/ru/guides/test-marlins-dlya-moryakov-format-razdely-i-kak-podgotovitsya-8d005130-290d-4772-be5a-fc982cc2ec2d) и [Тест CES](/ru/guides/test-ces-crew-evaluation-system-chto-proveryaet-i-kak-podgotovitsya-8cab65a8-a51a-4498-a36c-17ce88b08331). Радиосторона обмена при бедствии — ЦИВ, каналы, ложные тревоги — в статье [ГМССБ простыми словами](/ru/handbook/gmssb-gmdss-prostymi-slovami-morskie-rayony-tsiv-epirb-i-sart-lozhnaya-trevoga-i-8bda0946-1e5d-4e0c-9369-896823d11b2b).

Впишите уровень английского и результаты тестов в [резюме моряка](/ru/maritime-cv) — крюинг-менеджеры смотрят на них первыми.

*Источник: Стандартные фразы ИМО для общения на море (резолюция A.918(22)) и таблица A-II/1 ПДНВ. На борту действуют процедуры вашего судна и постоянные распоряжения капитана. Эта страница — пособие для подготовки, а не юридический текст.*$ru$,
    'ua', $ua$SMCP — це англійська, якою насправді працює судно: фрази, якими лоцман, оператор СКРС і вахтовий помічник говорять так, щоб філіппінський стерновий, український старпом і голландський центр керування рухом зрозуміли одне одного з першого разу, через поганий УКХ-зв'язок. ПДНВ вимагає їх знати від кожного вахтового помічника, тести Marlins і CES їх перевіряють, а капітан нерідко перевіряє їх у перші хвилини на борту. Ця сторінка — довідник фраз, а не курс англійської: як побудований SMCP, маркери повідомлень, цифри, координати й час, MAYDAY, PAN-PAN і SÉCURITÉ, стандартні команди на стерно та в машину, фрази для швартування й постановки на якір, помилки, через які виникають непорозуміння, і питання для самоперевірки.

:: **Коротко**
:: - Стандартні фрази ІМО для спілкування на морі (SMCP) ухвалені у 2001 році й замінили Стандартний морський навігаційний словник 1977 року.
:: - ПДНВ вимагає, щоб вахтові помічники вміли ними користуватися й розуміли їх.
:: - Вісім маркерів повідомлень — instruction, advice, warning, information, question, answer, request, intention — кажуть слухачеві, яке повідомлення буде далі.
:: - Числа вимовляють по цифрах, курси й пеленги — завжди трьома цифрами, час — за UTC.

## Що таке SMCP

Асамблея ІМО ухвалила Стандартні фрази для спілкування на морі в листопаді 2001 року резолюцією A.918(22); вони замінили Стандартний морський навігаційний словник 1977 року. Ідея та сама, до якої авіація дійшла задовго до цього: спрощена англійська з готовими фразами, одним значенням у кожної фрази, без синонімів і без скорочених форм — для людей, у яких рідна мова інша, і для радіозв'язку, на якому губиться половина складів.

ПДНВ робить це обов'язковим. Таблиця компетентності вахтових помічників (A-II/1) вимагає англійської, достатньої, щоб користуватися картами й посібниками, розуміти метеоповідомлення й повідомлення про безпеку, спілкуватися з іншими суднами, береговими станціями й центрами СКРС і з багатонаціональним екіпажем, — «включно з умінням використовувати й розуміти Стандартні фрази ІМО для спілкування на морі». Рядовий склад, що входить до вахти, має розуміти команди й уміти порозумітися з питань вахти — на більшості суден це означає англійською.

SMCP складається з двох частин:

- **Частина A** — те, чого вимагає ПДНВ: зовнішній зв'язок (лихо, терміновість і безпека, пошук і рятування, СКРС) і фрази на борту, коли на містку лоцман, включно зі стандартними командами на стерно та в машину.
- **Частина B** — решта життя на борту: швартування та якір, буксири, тривоги, пошкодження й пожежа, вантаж, робота з пасажирами.

Загальний розділ перед ними задає порядок: вимову по літерах, числа, координати, маркери повідомлень і стандартні відповіді.

## Головні цифри

!! 2001 | SMCP ухвалені ІМО, резолюція A.918(22)
!! 8 | маркерів повідомлень
!! 3 рази | MAYDAY, PAN-PAN або SÉCURITÉ перед повідомленням
!! 3 цифри | у кожного курсу й пеленга, від 000 до 359
!! 26 | літер фонетичного алфавіту, від Alfa до Zulu
!! 10 | кабельтових у морській милі

## Маркери повідомлень

У зв'язку судно–берег, а особливо з СКРС, повідомлення може починатися з маркера, який каже, що це за повідомлення. Спершу маркер, потім саме повідомлення:

- **INSTRUCTION** (вказівка) — «Instruction. Do not overtake». Походить від того, хто має повноваження, — центру СКРС чи військового корабля. Одержувач зобов'язаний її виконати, якщо тільки цьому не заважають міркування безпеки, — тоді про них повідомляють відправнику.
- **ADVICE** (порада) — «Advice. Stand by on VHF channel one-two». Не обов'язкова, але її треба дуже уважно розглянути.
- **WARNING** (попередження) — «Warning. Obstruction in the fairway». Інформація про небезпеку; слухач одразу бере її до уваги.
- **INFORMATION** (інформація) — «Information. My present speed is one-two knots». Лише факти.
- **QUESTION** (питання) — «Question. What is your present draft?»
- **ANSWER** (відповідь) — «Answer. My present draft is one-one decimal five metres». Відповідь на питання.
- **REQUEST** (прохання) — «Request. I require two tugs». Прохання про дію або допомогу — не про інформацію: для неї є question.
- **INTENTION** (намір) — «Intention. I will reduce my speed». Повідомляє про ваш власний маневр.

## Стандартні відповіді

- **Yes / No** — ніколи не одне слово: «Yes, I will reduce speed». «No, I will not enter the fairway». Повне речення — бо через поганий зв'язок самотнє «yes» нікому не каже, про що домовилися.
- **Stand by** — інформації поки немає; назвіть час: «Stand by — five minutes».
- **No information** — отримати її неможливо.
- **Unable to comply** — і причина: «Unable to comply. Engine broken down».
- **Say again** — повідомлення погано чути. **Message not understood** — чути, але незрозуміло.
- **Mistake … correction** — щоб виправити себе: «My present speed is one-four knots — mistake. Correction: my present speed is one-two, one-two knots».
- **Repeat** — щоб наголосити на важливій частині: «Do not overtake — repeat — do not overtake».
- **Over** — передачу закінчено, чекаю на відповідь. **Out** — розмову закінчено. «Over and out» суперечить саме собі.

SMCP також уникає «may» і «can», у яких змішуються дозвіл і можливість. Замість «May I enter the fairway?» — «Question. Do I have permission to enter the fairway?» — «Answer. Yes, you have permission to enter the fairway».

## Числа, координати й час

- **Числа** вимовляють по цифрах: 150 — «one-five-zero», 2,5 — «two decimal five» (або «two point five»). Єдиний виняток — кут перекладання стерна в командах: «starboard fifteen», а не «one-five».
- **Вимова:** ZEERO, WUN, TOO, TREE, FOWER, FIFE, SIX, SEVEN, AIT, NINER. TREE, FIFE і NINER придумали тому, що «three», «five» і «nine» плутають найчастіше.
- **Курси й пеленги** — завжди три цифри за коловою системою від півночі, істинні, якщо не сказано інше: «course zero-four-five». Курсові кути дають від носа: «the buoy is zero-three-zero degrees on your port bow».
- **Координати** — широта й довгота в градусах і хвилинах, із зазначенням N або S та E або W; або пеленг і відстань від добре помітного орієнтира — з уточненням, пеленг від орієнтира чи від судна.
- **Відстані** — у морських милях або кабельтових, завжди з одиницею. **Швидкість** — у вузлах, відносно води, якщо не сказано «over the ground».
- **Час** — за UTC, у 24-годинному форматі, чотирма цифрами: «one-four-three-zero UTC». Місцевий — лише якщо це сказано, зазвичай у порту.

**Вимова по літерах** — за фонетичним алфавітом: Alfa, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu. Назву судна й позивний передають по літерах за найменшого сумніву: «I spell: Kilo-India-Lima-Oscar».

## MAYDAY, PAN-PAN і SÉCURITÉ

- **MAYDAY** — лихо: судну або людині загрожує серйозна й безпосередня небезпека і потрібна негайна допомога. Виклик: тричі MAYDAY, «this is» і тричі назва судна, позивний і MMSI. Повідомлення: MAYDAY, назва, позивний і MMSI, координати, характер лиха, яка допомога потрібна, скільки людей на борту та інша інформація — потім OVER.
- **PAN-PAN** — терміновість: термінове повідомлення про безпеку судна або людини, але без серйозної й безпосередньої небезпеки, — відмова двигуна біля підвітряного берега, тяжко травмований член екіпажу, якому потрібна медична консультація.
- **SÉCURITÉ** (се-кю-рі-те) — безпека: навігаційне або метеорологічне попередження — буй не на місці, контейнер, що дрейфує, штормове попередження.

Кожне слово вимовляють тричі перед викликом. Усі три прийшли з французької: «m'aider» (допоможіть мені), «panne» (поломка) і «sécurité» (безпека).

Самі фрази лиха короткі й незмінні: «I am on fire». «I am flooding». «I have collided with …» «I am aground». «I am listing — danger of capsizing». «I am sinking». «I am disabled and adrift». «I am abandoning vessel». «Person overboard». «I require assistance». «I require medical assistance».

Під час обміну щодо лиха станція, яка ним керує, може оголосити радіомовчання словами **SEELONCE MAYDAY**. **PRUDONCE** означає, що можна відновити обмежену роботу, **SEELONCE FEENEE** — обмін щодо лиха закінчено. 16-й канал — для лиха, терміновості, безпеки й виклику; встановивши зв'язок, переходьте на робочий канал: «Switch to VHF channel one-four».

## Команди на стерно та в машину

**Команди на стерно:**

- «Midships» — стерно прямо.
- «Port five», «port ten», «port fifteen», «port twenty», «port twenty-five», «hard-a-port» — ліво п'ять, десять, п'ятнадцять, двадцять, двадцять п'ять, ліво на борт; так само й праворуч.
- «Ease to five», «ease to ten», «ease to fifteen», «ease to twenty» — зменшити перекладання стерна до цього кута.
- «Steady» — якнайшвидше погасити поворот. «Steady as she goes» — тримати курс за компасом, який був у момент команди (так тримати).
- «Steer one-two-three» — курс, яким іти, трьома цифрами.
- «Nothing to port» / «nothing to starboard» — не допускати відходу судна в цей бік від заданого курсу.
- «Keep the buoy on port side», «Report if she does not answer the wheel», «Finished with wheel — no more steering».

Стерновий повторює кожну команду, помічник стежить, щоб її виконали правильно й одразу, а кожна команда діє, доки її не скасують. Якщо судно не слухається стерна, стерновий доповідає про це негайно.

**Команди в машину:** full ahead, half ahead, slow ahead, dead slow ahead, stop engine, dead slow astern, slow astern, half astern, full astern, emergency full ahead, emergency full astern; stand by engine; finished with engine. На суднах із двома машинами спершу називають машину: «starboard engine half astern». Команди в машину теж повторюють.

## Швартування, якір і лоцман

- **Швартування:** «Stand by forward / aft». «Send out the head line / stern line / spring». «Heave in». «Slack away». «Hold on». «Make fast». «Single up to one head line and one spring forward». «Let go». «All fast» — судно ошвартоване.
- **Якір:** «Stand by port anchor». «Let go port anchor». «Walk out the anchor». «How is the cable leading?» — «The cable is leading ahead / astern / up and down». «The anchor is holding». «The anchor is dragging». «Heave up». «The anchor is aweigh».
- **Лоцман:** «Pilot ladder rigged on starboard side, one metre above water». «What is your present draft?» «My maximum draft is eight decimal five metres».

Вахтовий на посту спостереження доповідає тими самими словами: що бачить, де — right ahead, on the port bow, abeam to starboard — і як далеко, якщо може оцінити.

## Що питають на співбесіді

- **Помічники:** маркери повідомлень і коли який використовують; повідомлення MAYDAY для заданої ситуації — вголос; різниця між PAN-PAN і SÉCURITÉ; як назвати координати й час; що робити, якщо вказівка СКРС суперечить безпеці; як виправити себе в ефірі.
- **Рядовий склад:** команди на стерно — їх зазвичай програють або вимовляють, а ви повторюєте й пояснюєте; команди в машину; команди під час швартування й постановки на якір; доповідь із посту спостереження.
- **Усі:** співбесіда англійською про останнє судно, обов'язки й аварійну ситуацію, у якій ви брали участь. Тести Marlins і CES перевіряють словник SMCP і сприйняття на слух.

## Типові помилки

1. Читати числа цілими. «Fifteen» і «fifty» на галасливому каналі плутають постійно; «one-five» і «five-zero» — ніколи.
2. «Left» і «right» замість «port» і «starboard» — і «rudder fifteen» без зазначення борту.
3. Голе «OK» або «yes» замість повної відповіді.
4. Місцевий час, кілометри або пеленг без зазначення, істинний він чи курсовий кут.
5. Не повторювати команди на стерно — або повторювати, не виконуючи.
6. «May I…?» і «Can you…?» замість «Question. Do I have permission…?» і «Request…».
7. Розмови на 16-му каналі й «over and out».

## Перевір себе

?? Які вісім маркерів повідомлень є в SMCP?
=> Instruction, advice, warning, information, question, answer, request та intention.
?? Як сказати курс 150 градусів і відстань 2,5 милі?
=> «One-five-zero degrees» і «two decimal five miles» — кожну цифру окремо.
?? Коли використовують MAYDAY, PAN-PAN і SÉCURITÉ?
=> MAYDAY — серйозна й безпосередня небезпека, потрібна негайна допомога. PAN-PAN — термінове повідомлення про безпеку судна або людини. SÉCURITÉ — навігаційне або метеорологічне попередження.
?? Як дати команду перекласти стерно на 15° ліворуч?
=> «Port fifteen» — у командах на стерно кут вимовляють цілим числом. Стерновий повторює «port fifteen» і виконує.
?? Ви назвали в ефірі неправильну цифру. Як виправитися?
=> Сказати «mistake», потім «correction» і правильний варіант: «…one-four knots — mistake. Correction: one-two, one-two knots».
?? Центр СКРС передає «Instruction. Do not overtake». Що цей маркер означає для вас?
=> Вказівку треба виконати, якщо тільки цьому не заважають міркування безпеки, — а тоді повідомити про них СКРС.

## Кому на борту це потрібно

Кожному вахтовому помічнику — [третьому](/ua/jobs/rank/3rd-officer) і [другому помічнику](/ua/jobs/rank/2nd-officer), [старпому](/ua/jobs/rank/chief-officer) і [капітану](/ua/jobs/rank/master), який говорить із лоцманами й СКРС; [матросу AB](/ua/jobs/rank/able-seaman) і [матросу OS](/ua/jobs/rank/ordinary-seaman) на стерні та на посту спостереження; [боцману](/ua/jobs/rank/bosun) на баку; і [палубному кадету](/ua/jobs/rank/deck-cadet), для якого це часто перша справжня перевірка. Навіщо потрібна морська англійська і як її підтягнути — у гайді [Морська англійська мова та СМКФ](/ua/guides/morska-angliyska-mova-ta-smkf-chomu-tse-vazhlivo-i-yak-pokrashchiti-1b39987f-afc4-4a6d-8ff8-4bc1150995aa); тести, які її перевіряють, — у гайдах [Тест Marlins](/ua/guides/test-marlins-dlya-moryakiv-format-rozdili-ta-yak-pidgotuvatisya-8d005130-290d-4772-be5a-fc982cc2ec2d) і [Тест CES](/ua/guides/test-ces-crew-evaluation-system-shcho-pereviryaye-ta-yak-pidgotuvatisya-8cab65a8-a51a-4498-a36c-17ce88b08331). Радіобік обміну при лихові — ЦВВ, канали, хибні тривоги — у статті [ГМЗЛБ простими словами](/ua/handbook/gmzlb-gmdss-prostimi-slovami-morski-rayoni-tsvv-epirb-i-sart-khibna-trivoga-ta-p-8bda0946-1e5d-4e0c-9369-896823d11b2b).

Впишіть рівень англійської й результати тестів у [резюме моряка](/ua/maritime-cv) — крюїнг-менеджери дивляться на них першими.

*Джерело: Стандартні фрази ІМО для спілкування на морі (резолюція A.918(22)) і таблиця A-II/1 ПДНВ. На борту діють процедури вашого судна й постійні розпорядження капітана. Ця сторінка — посібник для підготовки, а не юридичний текст.*$ua$,
    'pl', $pl$SMCP to angielski, którym naprawdę pracuje statek: zwroty, których pilot, operator VTS i oficer wachtowy używają tak, żeby filipiński sternik, ukraiński starszy oficer i holenderskie centrum kontroli ruchu zrozumieli się za pierwszym razem, przez kiepskie połączenie VHF. STCW wymaga ich znajomości od każdego oficera wachtowego, testy Marlins i CES je sprawdzają, a kapitan często sprawdza je w pierwszych minutach na statku. Ta strona to słowniczek zwrotów, a nie kurs angielskiego: jak zbudowany jest SMCP, znaczniki komunikatów, liczby, pozycje i czas, MAYDAY, PAN-PAN i SÉCURITÉ, standardowe komendy sterowe i maszynowe, zwroty przy cumowaniu i kotwiczeniu, błędy prowadzące do nieporozumień i pytania do sprawdzenia się.

:: **W skrócie**
:: - Standardowe Zwroty IMO do Porozumiewania się na Morzu (SMCP) przyjęto w 2001 roku; zastąpiły Standardowe Morskie Słownictwo Nawigacyjne z 1977 roku.
:: - STCW wymaga, by oficerowie wachtowi umieli się nimi posługiwać i je rozumieli.
:: - Osiem znaczników komunikatów — instruction, advice, warning, information, question, answer, request, intention — mówi słuchaczowi, jaki komunikat nastąpi.
:: - Liczby wymawia się cyfra po cyfrze, kursy i namiary zawsze trzema cyframi, czas według UTC.

## Czym jest SMCP

Zgromadzenie IMO przyjęło Standardowe Zwroty do Porozumiewania się na Morzu w listopadzie 2001 roku rezolucją A.918(22); zastąpiły one Standardowe Morskie Słownictwo Nawigacyjne z 1977 roku. Pomysł jest ten sam, do którego lotnictwo doszło dużo wcześniej: uproszczony angielski z gotowymi zwrotami, jednym znaczeniem każdego zwrotu, bez synonimów i bez form skróconych — dla ludzi, których językiem ojczystym jest inny język, i dla łączności radiowej, na której ginie połowa sylab.

STCW czyni to obowiązkiem. Tabela kompetencji oficera wachtowego (A-II/1) wymaga angielskiego wystarczającego, by korzystać z map i publikacji, rozumieć komunikaty meteorologiczne i dotyczące bezpieczeństwa, porozumiewać się z innymi statkami, stacjami brzegowymi i centrami VTS oraz z wielonarodową załogą — „w tym umiejętności używania i rozumienia Standardowych Zwrotów IMO do Porozumiewania się na Morzu”. Załoga szeregowa wchodząca w skład wachty musi rozumieć polecenia i umieć się porozumieć w sprawach wachty — na większości statków znaczy to po angielsku.

SMCP ma dwie części:

- **Część A** — to, czego wymaga STCW: łączność zewnętrzna (niebezpieczeństwo, sprawy pilne i bezpieczeństwo, poszukiwanie i ratownictwo, VTS) oraz zwroty na mostku z pilotem, w tym standardowe komendy sterowe i maszynowe.
- **Część B** — reszta życia na statku: cumowanie i kotwiczenie, holowniki, alarmy, uszkodzenia i pożar, ładunek, obsługa pasażerów.

Część ogólna przed nimi ustala zasady: literowanie, liczby, pozycje, znaczniki komunikatów i standardowe odpowiedzi.

## Najważniejsze liczby

!! 2001 | SMCP przyjęte przez IMO, rezolucja A.918(22)
!! 8 | znaczników komunikatów
!! 3 razy | MAYDAY, PAN-PAN lub SÉCURITÉ przed komunikatem
!! 3 cyfry | w każdym kursie i namiarze, od 000 do 359
!! 26 | liter alfabetu fonetycznego, od Alfa do Zulu
!! 10 | kabli w mili morskiej

## Znaczniki komunikatów

W łączności statek–brzeg, a zwłaszcza z VTS, komunikat może zaczynać się od znacznika, który mówi, jaki to komunikat. Najpierw znacznik, potem sam komunikat:

- **INSTRUCTION** (polecenie) — „Instruction. Do not overtake”. Pochodzi od kogoś, kto ma uprawnienia — centrum VTS albo okrętu wojennego. Odbiorca musi je wykonać, chyba że sprzeciwiają się temu względy bezpieczeństwa — wtedy informuje o nich nadawcę.
- **ADVICE** (rada) — „Advice. Stand by on VHF channel one-two”. Nieobowiązkowa, ale trzeba ją bardzo starannie rozważyć.
- **WARNING** (ostrzeżenie) — „Warning. Obstruction in the fairway”. Informacja o niebezpieczeństwie; słuchacz od razu bierze ją pod uwagę.
- **INFORMATION** (informacja) — „Information. My present speed is one-two knots”. Same fakty.
- **QUESTION** (pytanie) — „Question. What is your present draft?”
- **ANSWER** (odpowiedź) — „Answer. My present draft is one-one decimal five metres”. Odpowiedź na pytanie.
- **REQUEST** (prośba) — „Request. I require two tugs”. Prośba o działanie lub pomoc — nie o informację: do tego służy question.
- **INTENTION** (zamiar) — „Intention. I will reduce my speed”. Zapowiada własny manewr.

## Standardowe odpowiedzi

- **Yes / No** — nigdy jako jedno słowo: „Yes, I will reduce speed”. „No, I will not enter the fairway”. Pełne zdanie — bo przy kiepskim połączeniu samotne „yes” nikomu nie mówi, na co się zgodzono.
- **Stand by** — informacji jeszcze nie ma; podaj czas: „Stand by — five minutes”.
- **No information** — nie da się jej uzyskać.
- **Unable to comply** — i powód: „Unable to comply. Engine broken down”.
- **Say again** — komunikat był źle słyszalny. **Message not understood** — słyszalny, ale niezrozumiały.
- **Mistake … correction** — żeby się poprawić: „My present speed is one-four knots — mistake. Correction: my present speed is one-two, one-two knots”.
- **Repeat** — żeby podkreślić ważną część: „Do not overtake — repeat — do not overtake”.
- **Over** — koniec nadawania, czekam na odpowiedź. **Out** — rozmowa skończona. „Over and out” przeczy samemu sobie.

SMCP unika też „may” i „can”, w których mieszają się pozwolenie i możliwość. Zamiast „May I enter the fairway?” — „Question. Do I have permission to enter the fairway?” — „Answer. Yes, you have permission to enter the fairway”.

## Liczby, pozycje i czas

- **Liczby** wymawia się cyfra po cyfrze: 150 to „one-five-zero”, 2,5 to „two decimal five” (albo „two point five”). Jedynym wyjątkiem jest kąt wychylenia steru w komendach: „starboard fifteen”, a nie „one-five”.
- **Wymowa:** ZEERO, WUN, TOO, TREE, FOWER, FIFE, SIX, SEVEN, AIT, NINER. TREE, FIFE i NINER wymyślono dlatego, że „three”, „five” i „nine” myli się najczęściej.
- **Kursy i namiary** — zawsze trzy cyfry w systemie 360-stopniowym od północy, rzeczywiste, jeśli nie powiedziano inaczej: „course zero-four-five”. Kąty kursowe podaje się od dziobu: „the buoy is zero-three-zero degrees on your port bow”.
- **Pozycje** — szerokość i długość w stopniach i minutach, z N lub S i E lub W; albo namiar i odległość od dobrze widocznego znaku — z zaznaczeniem, czy namiar jest od znaku, czy od statku.
- **Odległości** w milach morskich lub kablach, zawsze z jednostką. **Prędkość** w węzłach, względem wody, chyba że powiedziano „over the ground”.
- **Czas** według UTC, w formacie 24-godzinnym, czterema cyframi: „one-four-three-zero UTC”. Czas lokalny — tylko gdy tak powiedziano, zwykle w porcie.

**Literowanie** według alfabetu fonetycznego: Alfa, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu. Nazwę statku i znak wywoławczy literuje się przy najmniejszej wątpliwości: „I spell: Kilo-India-Lima-Oscar”.

## MAYDAY, PAN-PAN i SÉCURITÉ

- **MAYDAY** — niebezpieczeństwo: statkowi lub człowiekowi grozi poważne i bezpośrednie niebezpieczeństwo i potrzebna jest natychmiastowa pomoc. Wywołanie: trzy razy MAYDAY, „this is” i trzy razy nazwa statku, znak wywoławczy i MMSI. Komunikat: MAYDAY, nazwa, znak wywoławczy i MMSI, pozycja, rodzaj niebezpieczeństwa, potrzebna pomoc, liczba osób na statku i inne informacje — potem OVER.
- **PAN-PAN** — sprawa pilna: pilny komunikat o bezpieczeństwie statku lub człowieka, ale bez poważnego i bezpośredniego niebezpieczeństwa — awaria silnika przy brzegu zawietrznym, ciężko ranny członek załogi, który potrzebuje porady medycznej.
- **SÉCURITÉ** (se-kiu-ri-te) — bezpieczeństwo: ostrzeżenie nawigacyjne lub meteorologiczne — boja nie na pozycji, dryfujący kontener, ostrzeżenie sztormowe.

Każde słowo wymawia się trzy razy przed wywołaniem. Wszystkie trzy pochodzą z francuskiego: „m'aider” (pomóżcie mi), „panne” (awaria) i „sécurité” (bezpieczeństwo).

Same zwroty o niebezpieczeństwie są krótkie i stałe: „I am on fire”. „I am flooding”. „I have collided with …” „I am aground”. „I am listing — danger of capsizing”. „I am sinking”. „I am disabled and adrift”. „I am abandoning vessel”. „Person overboard”. „I require assistance”. „I require medical assistance”.

W czasie korespondencji w niebezpieczeństwie stacja, która nią kieruje, może nakazać ciszę radiową słowami **SEELONCE MAYDAY**. **PRUDONCE** oznacza, że można wznowić ograniczoną pracę, **SEELONCE FEENEE** — korespondencja w niebezpieczeństwie zakończona. Kanał 16 służy do niebezpieczeństwa, spraw pilnych, bezpieczeństwa i wywołań; po nawiązaniu łączności przejdź na kanał roboczy: „Switch to VHF channel one-four”.

## Komendy sterowe i maszynowe

**Komendy sterowe:**

- „Midships” — ster prosto.
- „Port five”, „port ten”, „port fifteen”, „port twenty”, „port twenty-five”, „hard-a-port” — lewo pięć, dziesięć, piętnaście, dwadzieścia, dwadzieścia pięć, lewo na burtę; tak samo w prawo.
- „Ease to five”, „ease to ten”, „ease to fifteen”, „ease to twenty” — zmniejszyć wychylenie steru do tego kąta.
- „Steady” — jak najszybciej zatrzymać zwrot. „Steady as she goes” — trzymać kurs według kompasu z chwili wydania komendy (tak trzymać).
- „Steer one-two-three” — kurs do sterowania, trzema cyframi.
- „Nothing to port” / „nothing to starboard” — nie dopuścić, by statek odszedł w tę stronę od zadanego kursu.
- „Keep the buoy on port side”, „Report if she does not answer the wheel”, „Finished with wheel — no more steering”.

Sternik powtarza każdą komendę, oficer pilnuje, by została wykonana prawidłowo i od razu, a każda komenda obowiązuje, dopóki jej nie odwołano. Jeśli statek nie słucha steru, sternik melduje to natychmiast.

**Komendy maszynowe:** full ahead, half ahead, slow ahead, dead slow ahead, stop engine, dead slow astern, slow astern, half astern, full astern, emergency full ahead, emergency full astern; stand by engine; finished with engine. Na statkach z dwiema maszynami najpierw wymienia się maszynę: „starboard engine half astern”. Komendy maszynowe też się powtarza.

## Cumowanie, kotwica i pilot

- **Cumowanie:** „Stand by forward / aft”. „Send out the head line / stern line / spring”. „Heave in”. „Slack away”. „Hold on”. „Make fast”. „Single up to one head line and one spring forward”. „Let go”. „All fast” — statek zacumowany.
- **Kotwica:** „Stand by port anchor”. „Let go port anchor”. „Walk out the anchor”. „How is the cable leading?” — „The cable is leading ahead / astern / up and down”. „The anchor is holding”. „The anchor is dragging”. „Heave up”. „The anchor is aweigh”.
- **Pilot:** „Pilot ladder rigged on starboard side, one metre above water”. „What is your present draft?” „My maximum draft is eight decimal five metres”.

Obserwator melduje tymi samymi słowami: co widzi, gdzie — right ahead, on the port bow, abeam to starboard — i jak daleko, jeśli potrafi ocenić.

## O co pytają na rozmowie

- **Oficerowie:** znaczniki komunikatów i kiedy którego używać; komunikat MAYDAY w zadanej sytuacji — na głos; różnica między PAN-PAN i SÉCURITÉ; jak podać pozycję i czas; co zrobić, gdy polecenie VTS koliduje z bezpieczeństwem; jak poprawić się na kanale.
- **Załoga szeregowa:** komendy sterowe — zwykle się je odtwarza lub wypowiada, a ty powtarzasz i wyjaśniasz; komendy maszynowe; komendy przy cumowaniu i kotwiczeniu; meldunek obserwatora.
- **Wszyscy:** rozmowa po angielsku o ostatnim statku, obowiązkach i sytuacji awaryjnej z własnego doświadczenia. Testy Marlins i CES sprawdzają słownictwo SMCP i rozumienie ze słuchu.

## Typowe błędy

1. Czytanie liczb w całości. „Fifteen” i „fifty” na zaszumionym kanale myli się stale; „one-five” i „five-zero” — nigdy.
2. „Left” i „right” zamiast „port” i „starboard” — i „rudder fifteen” bez podania burty.
3. Gołe „OK” albo „yes” zamiast pełnej odpowiedzi.
4. Czas lokalny, kilometry albo namiar bez zaznaczenia, czy jest rzeczywisty, czy to kąt kursowy.
5. Niepowtarzanie komend sterowych — albo powtarzanie bez wykonania.
6. „May I…?” i „Can you…?” zamiast „Question. Do I have permission…?” i „Request…”.
7. Pogawędki na kanale 16 i „over and out”.

## Sprawdź się

?? Jakie osiem znaczników komunikatów ma SMCP?
=> Instruction, advice, warning, information, question, answer, request i intention.
?? Jak powiedzieć kurs 150 stopni i odległość 2,5 mili?
=> „One-five-zero degrees” i „two decimal five miles” — każdą cyfrę osobno.
?? Kiedy używa się MAYDAY, PAN-PAN i SÉCURITÉ?
=> MAYDAY — poważne i bezpośrednie niebezpieczeństwo, potrzebna natychmiastowa pomoc. PAN-PAN — pilny komunikat o bezpieczeństwie statku lub człowieka. SÉCURITÉ — ostrzeżenie nawigacyjne lub meteorologiczne.
?? Jak wydać komendę wychylenia steru o 15° w lewo?
=> „Port fifteen” — w komendach sterowych kąt wymawia się jako całą liczbę. Sternik powtarza „port fifteen” i wykonuje.
?? Na kanale padła zła liczba. Jak się poprawić?
=> Powiedzieć „mistake”, potem „correction” i prawidłową wersję: „…one-four knots — mistake. Correction: one-two, one-two knots”.
?? Centrum VTS nadaje „Instruction. Do not overtake”. Co ten znacznik oznacza dla ciebie?
=> Polecenie trzeba wykonać, chyba że sprzeciwiają się temu względy bezpieczeństwa — wtedy trzeba o nich poinformować VTS.

## Komu na statku to potrzebne

Każdemu oficerowi wachtowemu — [trzeciemu](/pl/jobs/rank/3rd-officer) i [drugiemu oficerowi](/pl/jobs/rank/2nd-officer), [starszemu oficerowi](/pl/jobs/rank/chief-officer) i [kapitanowi](/pl/jobs/rank/master), który rozmawia z pilotami i VTS; [starszemu marynarzowi AB](/pl/jobs/rank/able-seaman) i [marynarzowi OS](/pl/jobs/rank/ordinary-seaman) za sterem i na obserwacji; [bosmanowi](/pl/jobs/rank/bosun) na dziobie; i [kadetowi pokładowemu](/pl/jobs/rank/deck-cadet), dla którego to często pierwszy prawdziwy sprawdzian. Po co jest angielski morski i jak go podciągnąć — w poradniku [Angielski morski i SMCP](/pl/guides/angielski-morski-i-smcp-dlaczego-to-wazne-i-jak-sie-doskonalic-1b39987f-afc4-4a6d-8ff8-4bc1150995aa); testy, które go sprawdzają — w poradnikach [Test Marlins](/pl/guides/test-marlins-dla-marynarzy-format-czesci-i-jak-sie-przygotowac-8d005130-290d-4772-be5a-fc982cc2ec2d) i [Test CES](/pl/guides/test-ces-crew-evaluation-system-co-sprawdza-i-jak-sie-przygotowac-8cab65a8-a51a-4498-a36c-17ce88b08331). Radiowa strona korespondencji w niebezpieczeństwie — DSC, kanały, fałszywe alarmy — jest w artykule [GMDSS w prostych słowach](/pl/handbook/gmdss-w-prostych-slowach-obszary-morskie-dsc-epirb-i-sart-falszywy-alarm-i-pytan-8bda0946-1e5d-4e0c-9369-896823d11b2b).

Wpisz poziom angielskiego i wyniki testów do [CV marynarza](/pl/maritime-cv) — menedżerowie crewingowi patrzą na nie najpierw.

*Źródło: Standardowe Zwroty IMO do Porozumiewania się na Morzu (rezolucja A.918(22)) i tabela A-II/1 STCW. Na statku obowiązują procedury twojego statku i stałe polecenia kapitana. Ta strona to pomoc do nauki, a nie tekst prawny.*$pl$),
  'SMCP', 'handbook',
  'linear-gradient(135deg,#0e2a45,#8a6a12)',
  true, '2026-10-10 10:30:00+00'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE id = '210d240d-f93c-4c9f-b1a2-aa48b5000c4b' OR title->>'en' = 'SMCP in plain words: Mayday and Pan-Pan, message markers, helm and engine orders, and interview questions');

-- ── Covers ───────────────────────────────────────────────────────────────────
UPDATE news_articles SET cover_url = v.url FROM (VALUES
 ('GMDSS in plain words: sea areas, DSC, EPIRB and SART, false alerts and interview questions', 'https://seajobs.pro/handbook/gmdss.png?v=1'),
 ('SMCP in plain words: Mayday and Pan-Pan, message markers, helm and engine orders, and interview questions', 'https://seajobs.pro/handbook/smcp.png?v=1')
) AS v(t, url)
WHERE news_articles.title->>'en' = v.t AND coalesce(news_articles.cover_url, '') = '';
