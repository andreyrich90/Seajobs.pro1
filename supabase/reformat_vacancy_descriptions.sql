-- Reformat imported vacancy descriptions into structured markdown
-- (intro paragraph + Requirements bullet list + How-to-apply section).
-- Idempotent: matches by title, so absent vacancies are simply skipped.
-- Run once in the Supabase SQL Editor.

UPDATE vacancies SET description = 'OJ Crew is hiring AB / CROP-qualified candidates for a Construction Support Vessel working on US offshore wind projects. Joining 17 July 2026 for a 6-week rotation, rate negotiable.

## Requirements
- valid rank-related STCW certificates
- CROP Stage 3
- a valid Medical Certificate
- good English
- a US visa with annotation for transit/travel to the OCS for wind activities
- BOSIET
- CA-EBS
- the GWO Sea Survival module

## How to apply
Apply directly through SeaJobs.pro — your CV and certificates go straight to the crewing manager.'
  WHERE title = 'AB (CROP) — Construction Support Vessel, US Offshore Wind';

UPDATE vacancies SET description = 'Select Offshore is recruiting an AB for a jack-up rig operating in EU waters. Joining 15 July 2026 for 5-week rotations.

## Requirements
- GWO Working at Heights
- HUET
- Chester Step test
- a valid UK work permit

## How to apply
Apply directly through SeaJobs.pro — your profile is sent straight to the crewing desk.'
  WHERE title = 'AB — Jack-Up Rig, EU';

UPDATE vacancies SET description = 'Select Offshore has an urgent short-notice opening for a 2nd/3rd Engineer on an OSV — mobilisation tonight or tomorrow morning. 4-week rotation.

Ideal for candidates who can travel on very short notice and hold valid STCW certification.

## How to apply
Apply directly through SeaJobs.pro — your profile is forwarded immediately to the crewing manager.'
  WHERE title = '2nd/3rd Engineer — OSV, Urgent Short Notice';

UPDATE vacancies SET description = 'Select Offshore has an opening for a 4th Engineer on a CL MPSV based in Curaçao. Joining 11 June 2026 for a 5-week rotation.

## Requirements
- High Voltage training
- Basic Safety Training (STCW)

## How to apply
Apply directly through SeaJobs.pro — your profile is sent straight to the crewing manager.'
  WHERE title = '4th Engineer — MPSV, Caribbean (Curaçao)';

UPDATE vacancies SET description = 'EDT Offshore is looking for an experienced 2nd Officer / DPO to join an MPSV on North Europe projects, based out of Aberdeen, Scotland. Start date ASAP.

Previous ROV experience and a valid UK work permit are required.

## How to apply
Apply directly through SeaJobs.pro — your CV and cover letter go straight to the crewing manager.'
  WHERE title = '2nd Officer / DPO — MPSV, North Europe (Aberdeen)';

UPDATE vacancies SET description = 'TOS People is recruiting a Steward/Stewardess for a DP2 Fall Pipe Rock Installation Vessel operating in European waters. Joining 17 June 2026 for a 6 weeks on / 6 weeks off rotation, Polish contract.

## How to apply
Apply directly through SeaJobs.pro — your profile is sent straight to the crewing manager.'
  WHERE title = 'Steward/Stewardess — Rock Installation Vessel (DP2), Europe';

UPDATE vacancies SET description = 'TOS People urgently requires a Master with ASD tug and barge towing experience for operations in Gabon. Joining 22 June 2026 for an 8 weeks on / 8 weeks off rotation.

## How to apply
Apply directly through SeaJobs.pro — your CV is sent straight to the crewing manager.'
  WHERE title = 'Master — ASD Tug & Barge, Gabon';

UPDATE vacancies SET description = 'Stödig Ship Management Poland is looking for a 2nd Officer to join the small general cargo vessel WILSON GIJON (General Cargo Ship, Bahamas flag, built 1993, GT 2506, DWT 3689) trading in Europe. 3-month rotation, joining ASAP.

Relevant rank experience and valid STCW documents required.

## How to apply
Apply directly through SeaJobs.pro — your CV and certificates go straight to the crewing manager.'
  WHERE title = '2nd Officer — Small General Cargo (WILSON GIJON), Europe — ASAP';

UPDATE vacancies SET description = 'Stödig Ship Management Poland requires a Steward / Stewardess for a jack-up installation vessel (Malta flag). Short 4-week contract, joining ASAP.

Previous catering experience on board is required.

## How to apply
Apply directly through SeaJobs.pro — your profile is sent straight to the crewing desk.'
  WHERE title = 'Steward / Stewardess — Jack-Up Installation Vessel — ASAP';

UPDATE vacancies SET description = 'Stödig Ship Management Poland is hiring a Cook for a jack-up installation vessel (Malta flag). 4-week contract, joining ASAP.

Previous galley experience required.

## How to apply
Apply directly through SeaJobs.pro — your profile is sent straight to the crewing desk.'
  WHERE title = 'Cook — Jack-Up Installation Vessel — ASAP';

UPDATE vacancies SET description = 'OSM Poland (OSM Thome) is recruiting a 3rd Engineer for the research vessel OCEAN WARRIOR (IMO 9791262, built 2016, Netherlands flag). Short 4-6 week trip from Spain to the USA, joining around 24 June 2026.

Experience in rank required.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = '3rd Engineer — Research Vessel (Ocean Warrior), Spain → USA';

UPDATE vacancies SET description = 'OSM Poland (OSM Thome) urgently needs a Chief Engineer for the new-build oil/chemical tanker ATHENIAN FAITH (built 2026, DWT 18,500 MT, length 150 m, MAN-B&W). 4-month contract, joining 26 June 2026, 15,150 USD/month (paid on board).

## Requirements
- valid STCW CoC Chief Engineer Unlimited (Reg. III/2)
- Advanced Oil & Chemical Tanker Cargo Operations certificates (STCW A-V/1-1
- A-V/1-2)
- minimum 12-24 months on oil/chemical tankers preferred
- strong knowledge of marine diesel engines
- cargo operations support

## How to apply
Apply directly through SeaJobs.pro — your CV and certificates go straight to the crewing manager.'
  WHERE title = 'URGENT Chief Engineer — New-Build Oil/Chemical Tanker (Athenian Faith)';

UPDATE vacancies SET description = 'MAG - Morska Agencja Gdynia is hiring an AB for the Ro-Ro cargo ship PRECISION (IMO 9506239, Malta flag, built 2012) on the Liverpool - Dublin run. 6-week contract, joining 01 July 2026, 4,596.15 GBP/month.

All documents in line with STCW required; previous AB experience on Ro-Ro vessels.

## How to apply
Apply directly through SeaJobs.pro — your application is forwarded straight to the crewing manager (ref: AB FOR PRECISION).'
  WHERE title = 'AB — Ro-Ro Cargo Ship (PRECISION), Liverpool — Dublin';

UPDATE vacancies SET description = 'Inter Marine is recruiting a 2nd Engineer for a container vessel, joining in the port of Gdynia for trading between Spain and West Africa. 6-week contract, joining around 10 July 2026, 8,250 USD/month.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = '2nd Engineer — Container Vessel, Spain — West Africa';

UPDATE vacancies SET description = 'EURO Shipping Services Ltd urgently needs a Master for a general cargo coaster trading worldwide. 4 months (±1 month) contract, joining ASAP, 6,850 EUR/month.

Only candidates with GC experience — minimum 3 contracts in this rank with the same owner. Documents in line with STCW, US visa welcome, references/opinions appreciated.

## How to apply
Apply directly through SeaJobs.pro — your CV, diploma and passport/visa copy go straight to the crewing manager.'
  WHERE title = 'URGENT Master — General Cargo (Coaster), Worldwide';

UPDATE vacancies SET description = 'EURO Shipping Services Ltd is looking for a single Chief Engineer for a multi-purpose dry cargo coaster trading worldwide. 4 months (±1 month) contract, joining about end of July, 6,800 EUR/month.

C/E diploma up to 3,000 kW accepted; minimum 2 contracts in this rank on GC.

## How to apply
Apply directly through SeaJobs.pro — your CV and diploma scan go straight to the crewing manager.'
  WHERE title = 'Chief Engineer (Single) — General Cargo (Coaster), Worldwide';

UPDATE vacancies SET description = 'EURO Shipping Services Ltd needs a single Chief Engineer for a new-build multi-purpose dry cargo coaster, worldwide trading. 4 months (±1 month) contract, joining about end of July, 6,800 EUR/month.

C/E diploma up to 3,000 kW accepted; minimum 2 contracts in this rank on GC.

## How to apply
Apply directly through SeaJobs.pro — your CV and diploma scan go straight to the crewing manager.'
  WHERE title = 'Chief Engineer (Single) — New-Build General Cargo (Coaster), Worldwide';

UPDATE vacancies SET description = 'EURO Shipping Services Ltd is recruiting an ETO for a bulk carrier trading worldwide. 4 months (±1 month, owner option) contract, joining about end of July, 5,750 EUR/month.

Main engine HMM MAN-B&W 6S46 MC-C (7,860 kW), bow thruster 680 kW, three auxiliary engines ZJMD MAN-B&W 5L 23/30H (650 kW) and 1 x SISU 620 DSRG (120 kW).

## Requirements
- minimum 2 last contracts with the same owner
- all documents valid

## How to apply
Apply directly through SeaJobs.pro — your CV and Record of Service (last 5 years) go straight to the crewing manager.'
  WHERE title = 'ETO — Bulk Carrier, Worldwide';

UPDATE vacancies SET description = 'Marlow Navigation Poland is hiring a Flying ETO for car carriers / PCC (EMS Highway, ISAR Highway, Weser Highway, Schelde Highway) on European port calls. Permanent contract, paid on & off, joining ASAP, 4,550 EUR/month.

## Requirements
- experience in rank
- a valid ETO licence

## How to apply
Apply directly through SeaJobs.pro — your CV and certificates go straight to the crewing manager.'
  WHERE title = 'ETO — Car Carrier / PCC, Permanent Contract (Marlow)';

UPDATE vacancies SET description = 'Marlow Navigation Poland is looking for a Chief Officer for the coaster MV Scot Ranger (GBR flag, built 2021, LOA 89.98 m, 3,457 GT) on European port calls. 5-week contract, joining ASAP, 5,900 GBP/month (paid on board only).

Timber experience is a must and experience in rank required.

## How to apply
Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.'
  WHERE title = 'Chief Officer — Timber Coaster (Scot Ranger), Europe';

UPDATE vacancies SET description = 'Dohle Marine Services Europe is recruiting a 2nd Officer for the container vessel m/v Baldur, trading around Papua New Guinea, Solomon Islands, Vanuatu and New Zealand. 4-month contract, joining 03 November 2026, 4,500 USD/month.

Experience in rank and a working command of English required.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = '2nd Officer — Container Ship (m/v Baldur), Pacific';

UPDATE vacancies SET description = 'Dohle Marine Services Europe is hiring a 2nd Engineer for the container vessel m/v Rita trading worldwide. 4-month contract, joining 03 November 2026, 8,600 USD/month.

Experience in rank and a working command of English required.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = '2nd Engineer — Container Ship (m/v Rita), Worldwide';

UPDATE vacancies SET description = 'Hartmann Crew Consultants requires an AB or OS for the tug EMS Power on the Germany - Poland route. 1-month contract, joining 05 July 2026.

Pay: 2,500 EUR/month for AB, 2,000 EUR/month for OS.

## How to apply
Apply directly through SeaJobs.pro — your application goes straight to the crewing manager.'
  WHERE title = 'AB / OS — Tug (EMS Power), Germany — Poland';

UPDATE vacancies SET description = 'Hartmann Crew Consultants is looking for a Chief Engineer for a 35k bulk carrier (MAN-ME-B main engine, Daihatsu auxiliaries, 3 cranes) trading worldwide. 3-4 month contract, joining beginning/mid July, 9,200 EUR/month (negotiable).

## Requirements
- experience in C/E rank
- US visa
- experience with electronic engines

## How to apply
Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.'
  WHERE title = 'Chief Engineer — Bulk Carrier 35k, Worldwide';

UPDATE vacancies SET description = 'Stan Shipping Agency is recruiting a Chief Officer for the general cargo ship SNAEFELL RIVER (IMO 8906224, Isle of Man flag, built 1989, GT 852, DWT 1,300) sailing Isle of Man / Ireland / UK. 4-week contract, joining 05 July 2026, rate 200 GBP/day on board incl. travel days.

## How to apply
Apply directly through SeaJobs.pro — your CV and references go straight to the crewing manager.'
  WHERE title = 'Chief Officer — General Cargo (Snaefell River), Isle of Man / Ireland / UK';

UPDATE vacancies SET description = 'OJ Crew HR Management is seeking an experienced Cook to join a reefer vessel trading worldwide. 4 months (±1 month) contract, joining beginning of July, 2,400 USD/month.

## Requirements
- valid STCW documents
- a valid Medical certificate

## How to apply
Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.'
  WHERE title = 'Cook — Reefer Vessel, Worldwide';

UPDATE vacancies SET description = 'OJ Crew HR Management is looking for an experienced Single Engineer to join a general cargo vessel (DWT 3,931, GT 2,978, MAK engine, Netherlands flag) trading in Europe. 8-week contract, joining 05 July 2026, 8,500-9,000 EUR/month (negotiable).

## Requirements
- Chief Engineer CoC or 2nd Engineer Dutch CoC is an advantage
- valid STCW documentation
- valid Medical certificate
- very good English

## How to apply
Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.'
  WHERE title = 'Single Engineer — General Cargo / MPP, Europe';

UPDATE vacancies SET description = 'OJ Crew HR Management is recruiting a Chief Officer to join a PCC / car carrier trading worldwide. 4 months (±1 month) contract, joining around mid August, 8,500 USD/month.

Experience in rank on PCC required.

## How to apply
Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.'
  WHERE title = 'Chief Officer — Car Carrier / PCC, Worldwide';

UPDATE vacancies SET description = 'OJ Crew HR Management is seeking an experienced Cook to join a pure car carrier (PCC) trading worldwide. 4-month contract, joining 05 July 2026, 2,400 USD basic wage + 100 USD bakery bonus.

## Requirements
- valid STCW documents
- a valid Medical certificate

## How to apply
Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.'
  WHERE title = 'Cook — Pure Car Carrier (PCC), Worldwide';

UPDATE vacancies SET description = 'MMS - Marine Manning Service is recruiting a 3rd Officer for the container vessel MSC Jubilee trading worldwide. 4-month contract, joining 01 July in China or 04-07 July in Vietnam, around 3,800 USD/month.

Minimum 2 contracts for 3rd Off preferred.

## How to apply
Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.'
  WHERE title = '3rd Officer — Container Ship (MSC Jubilee), Worldwide';

UPDATE vacancies SET description = 'Chipolbrok is hiring an ETO for MPP / heavy-lift general cargo vessels with cranes up to 350 MT (DWT 28,000-62,000) trading worldwide. 4 months (±1 month) contract, joining TBA June/July 2026, 7,400 USD/month + bonus up to 1,400 USD.

Direct employment with the owner, private medical care, cargo-related extra work paid separately.

## Requirements
- minimum 2 contracts as ETO
- vessels with MacGregor cranes

## How to apply
Apply directly through SeaJobs.pro — your CV goes straight to the crewing manager.'
  WHERE title = 'ETO — General Cargo / Heavy Lift (MacGregor cranes), Worldwide';

UPDATE vacancies SET description = 'Inter Marine is hiring an AB for a PSV vessel on a temporary/extra-crew offshore project in the Europe/Black Sea region. 5-week (±1 week) contract, joining 16 July 2026, 215 EUR/day.

Experience in rank required.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = 'AB — PSV Vessel, Offshore Project (Black Sea), Joining 16 July';

UPDATE vacancies SET description = 'Stödig Ship Management Poland is recruiting an AB for the general cargo vessel m/v ENNY (Danish DIS flag) trading in Europe. 6 weeks on / 6 weeks off rotation, joining around 20 June 2026, 2,900 EUR/month (paid on board).

Experience on a similar vessel and a permanent-employment commitment required.

## How to apply
Apply directly through SeaJobs.pro — your CV and certificates go straight to the crewing manager.'
  WHERE title = 'AB — General Cargo (m/v Enny), Europe, Permanent';

UPDATE vacancies SET description = 'OSM Poland (OSM Thome) is recruiting a Steward/Stewardess for a Construction Service Operation Vessel (CSOV, Taiwan flag, accommodation for up to 120 pax) working on an offshore project in Taiwan with embarkation from Vietnam. 8 weeks on / 8 weeks off contract, joining 19 August 2026, 4,200 USD/month (on board only).

## Requirements
- STCW Basic Safety Certificate
- Proficiency in Designated Security Duties
- valid Health Certificate
- Hepatitis A
- Typhoid
- Yellow Fever vaccinations

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = 'Steward/Stewardess — CSOV, Taiwan Project';

UPDATE vacancies SET description = 'OSM Poland (OSM Thome) is recruiting a 2nd Officer for the chemical/oil products tanker FURE VANGUARD (IMO 9963360, Isle of Man flag, built 2024), currently carrying jet fuel from the UK to RAF bases in Cyprus. 2-month contract, joining 30 June 2026, 5,150 USD/month (paid on board only).

## Requirements
- experience in rank
- IGF Basic certificate

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = '2nd Officer — Chemical/Oil Tanker (Fure Vanguard), Europe';

UPDATE vacancies SET description = 'Dohle Marine Services Europe is recruiting a 2nd Engineer for the container vessel m/v AMALTHEA (IMO 9397913, Portugal flag, GT 42,609, DWT 52,788, built 2009) trading to Saudi Arabia, Jordan and Egypt. 4-month contract, joining 05 August 2026, 8,600 USD/month.

Working command of English required.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = '2nd Engineer — Container Ship (m/v Amalthea), Middle East';

UPDATE vacancies SET description = 'Dohle Marine Services Europe is recruiting a 3rd Officer for the container vessel m/v VENETIA (IMO 9400203, GT 42,609, DWT 52,788, built 2018) trading to China, Malaysia, Singapore and South Africa. 4-month contract, joining 25 July 2026, 3,780 USD/month.

Working command of English required.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = '3rd Officer — Container Ship (m/v Venetia), Asia / Africa';

UPDATE vacancies SET description = 'Dohle Marine Services Europe is recruiting a 3rd Engineer for the container vessel MV PANDA 007 (IMO 9280598, Portugal flag, GT 65,247, DWT 73,235, built 2004) trading to Spain, Slovenia, Malaysia and China. 4-month contract, joining 25 August 2026, 4,500 USD/month.

Working command of English required.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = '3rd Engineer — Container Ship (MV Panda 007), Worldwide';

UPDATE vacancies SET description = 'I.E.S Marine is recruiting an Engine Cadet for an LNG carrier trading worldwide, joining September 2026. 3-month contract.

Open only to maritime academy students/graduates — the owner plans a longer-term career path, offering a 4th Engineer position after two cadet contracts. Salary details available in the office.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = 'Engine Cadet — LNG Carrier, Worldwide';

UPDATE vacancies SET description = 'I.E.S Marine urgently needs an AB or OS for a tug (built 1986) on the Gdynia–Europe route. 3-4 week contract, joining 29-30 June 2026 in Gdynia, 2,100 EUR/month.

## Requirements
- AB or OS certificate of competency
- experience as AB

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = 'AB / OS — Tug, Gdynia — Europe (Urgent)';

UPDATE vacancies SET description = 'I.E.S Marine is recruiting a 2nd Officer for a semi-submersible heavy-lift vessel (no DP, GT 17,825, DWT 17,113, length 174 m, built 2008) trading worldwide. 4-month contract, joining July 2026.

Only candidates with prior heavy-lift vessel experience will be considered.

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = '2nd Officer — Heavy Lift Semi-Sub, Worldwide';

UPDATE vacancies SET description = 'I.E.S Marine is recruiting a 2nd Engineer for a 4,254 TEU container vessel (Panama flag, GT 41,225, DWT 53,335, MAN-B&W main engine, built 2008) for a German owner, trading worldwide. 4-month contract, joining mid-July 2026, 7,600 EUR/month.

## Requirements
- 2nd Engineer experience on a similar vessel type
- MAN-B&W engine experience

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = '2nd Engineer — Container Ship 4,254 TEU, Worldwide';

UPDATE vacancies SET description = 'Phoenocean is recruiting a Motorman with a welding certificate for the RoRo vessel Palatine (CLDN owner) trading in Europe. 10/10-week rotation, joining 10 July 2026, 3,231.76 EUR/month plus 11.01 EUR/h overtime.

## Requirements
- valid STCW courses
- Rating Forming Part of an Engineering Watch (III/4)
- a valid welder''s certificate (SPAWACZ 111)

## How to apply
Apply directly through SeaJobs.pro — your CV and certificates go straight to the crewing manager.'
  WHERE title = 'Motorman (Welder) — RoRo Cargo, Europe';

UPDATE vacancies SET description = 'Phoenocean is recruiting a Chief Officer for the dual-fuel PCTC m/v Global Fuji (7,000 CEU capacity, Marshall Islands flag), sailing worldwide with a mixed Ukrainian/East European officer and Filipino crew. 3-4 month contract, joining 19 July 2026 in Zeebrugge, 10,250 USD/month (plus an optional 200 USD senior-licence bonus).

## Requirements
- experience on similar-size PCTC
- dual-fuel vessels
- full STCW documentation
- a valid US C1/D visa

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = 'Chief Officer — PCTC Dual Fuel 7,000 CEU, Worldwide';

UPDATE vacancies SET description = 'Phoenocean is recruiting a Steward/Stewardess for the RoRo vessel Palatine (Cobelfret owner) trading in Northern Europe. 10/10-week rotation, joining 10 July 2026, 2,713 EUR/month plus 9.18 EUR/h overtime (over 103 hours).

## Requirements
- full STCW documentation
- a valid HACCP certificate — RoRo-specific courses are not required

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = 'Steward/Stewardess — RoRo Cargo, Northern Europe';

UPDATE vacancies SET description = 'ECS Essberger Crewing Services is recruiting a 3rd Officer for a small chemical tanker trading in the Baltic, North and Mediterranean Sea. 2-month on/off rotation, joining July 2026, 4,105 EUR/month.

## Requirements
- tanker experience
- an Advanced Chemical/Oil Tanker endorsement

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = '3rd Officer — Chemical Tanker, Baltic / North / Mediterranean';

UPDATE vacancies SET description = 'Romor Crewing Agency is recruiting a Cook for a small coaster/general cargo vessel (Norwegian owner, GT 4,999, DWT 7,650, built 1997, 8-9 crew on board) trading in Europe. 2-month fixed-rotation contract, joining 03 July 2026, 3,685 USD/month.

## Requirements
- experience as Cook on small-DWT ships
- good English
- references

## How to apply
Apply directly through SeaJobs.pro — your CV is forwarded straight to the crewing manager.'
  WHERE title = 'Cook — Coaster / General Cargo, Europe';

UPDATE vacancies SET description = 'A reputable crewing agency is looking for an experienced 2nd Engineer to join a dry cargo vessel "Selecta" (built 2007, 14,030 DWT, Pielstick main engine). Mixed international crew.

Joining 10 June 2026 for a 6-month contract. Candidates must have a good command of English, at least 3 contracts in rank and 2 contracts on the same vessel type.

Salary from $4,939/month.

## How to apply
Apply directly through SeaJobs.pro — your profile, sea service record and certificates will be sent straight to the crewing manager.'
  WHERE title = '2nd Engineer — Dry Cargo Vessel';

UPDATE vacancies SET description = 'Nyki Shipping Odessa is recruiting an AB-Welder for a general cargo vessel (8,100 DWT) trading in the Mediterranean Sea. All-Ukrainian crew, 6-month contract, joining 10 June 2026.

Good command of English and prior welding/AB experience required. Salary up to $1,900/month.

## How to apply
Apply through SeaJobs.pro and your CV goes straight to the crewing desk.'
  WHERE title = 'AB-Welder — General Cargo, Mediterranean';

UPDATE vacancies SET description = 'Looking to start your engine career? Nyki Shipping Odessa has an Engine Cadet position open on a container feeder vessel (8,250 DWT, MAK main engine, 3000 kW) operating in the North Sea. Mixed crew (Ukrainian, Russian, Filipino).

6-month contract from 10 June 2026, salary up to €500/month plus onboard training under supervision of senior engineers. Good English required.

## How to apply
Send your application directly to the crewing manager via SeaJobs.pro.'
  WHERE title = 'Engine Cadet — Container, North Sea';

UPDATE vacancies SET description = 'Uniteam Marine is hiring a 3rd Officer for a large container vessel (108,771 DWT, built 2010). 4-month contract, joining 10 June 2026.

Mixed international crew, good English required. Minimum 3 contracts in rank and 2 on the same vessel type — prior experience on a vessel of similar size/type is mandatory.

Salary from $3,500/month.

## How to apply
Apply via SeaJobs.pro — your profile is forwarded directly to the crewing department.'
  WHERE title = '3rd Officer — Large Container Vessel';

UPDATE vacancies SET description = 'Briese Crewing Ukraine is seeking a Chief Engineer for a general cargo vessel (5,200 DWT, built 2010, MAK main engine, 2000 kW) trading worldwide. 4-month contract starting 10 June 2026.

Mixed crew (Ukrainian/Russian/Filipino), good English. Minimum 1 contract in rank required.

Salary $6,000–7,500/month depending on experience.

## How to apply
Apply directly through SeaJobs.pro.'
  WHERE title = 'Chief Engineer — General Cargo, Worldwide';

UPDATE vacancies SET description = 'Briese Crewing Ukraine is recruiting an Ordinary Seaman for a general cargo vessel (3,300 DWT, built 2010), trading worldwide. 6-month contract, joining 10 June 2026.

Mixed crew, good English, no prior experience required — a great opportunity for newcomers. Includes extra overtime pay and lashing duties.

Salary from $1,307/month.

## How to apply
Apply through SeaJobs.pro.'
  WHERE title = 'Ordinary Seaman — General Cargo, Worldwide';

UPDATE vacancies SET description = 'Techmarine Crewing Agency is looking for a Chief Engineer for a heavy lift vessel (32,106 DWT, built 2012, Wartsila 7RT-flex50 main engine, 10,476 kW). 4+ month contract from 10 June 2026, mixed crew, good English.

Newcomers to the Chief Engineer rank are welcome to apply with at least 2–3 contracts as 2nd Engineer on similar vessels — Sulzer/Wartsila RT-flex experience is mandatory. Age limit 60.

Excellent salary: $11,300–11,800/month.

## How to apply
Apply directly through SeaJobs.pro.'
  WHERE title = 'Chief Engineer — Heavy Lift Vessel';

UPDATE vacancies SET description = 'Swan Marine Services is recruiting a Master for a Kamsarmax bulk carrier (82,000 DWT, built 2018, MAN B&W ME main engine, 9,700 kW). Worldwide trading, 5±1 month contract, joining 10 June 2026.

Fluent English required, age limit 55. Minimum 5 contracts in rank and on the same vessel type, with previous Master experience on bulkers (at least 4 contracts).

Re-joining bonus offered. Only Ukrainian candidates will be considered.

Salary $9,800–10,000/month.

## How to apply
Apply through SeaJobs.pro.'
  WHERE title = 'Master — Kamsarmax Bulk Carrier';

UPDATE vacancies SET description = 'Global Seaways Odessa has an opening for a 2nd Engineer on a bulk carrier (61,300 DWT, built 2015, MAN B&W ME main engine). 4-month contract, joining 13 June 2026.

Mixed crew, any English level accepted. Minimum 2 contracts in rank required.

No agency fee. Salary from $8,000/month.

## How to apply
Apply directly through SeaJobs.pro — your profile goes straight to the crewing manager.'
  WHERE title = '2nd Engineer — Bulk Carrier, No Agency Fee';

UPDATE vacancies SET description = 'Nika Maritime is recruiting a 2nd Officer for a general cargo vessel (2,287 DWT / 2,042 GT, built 1999, MAN B&W main engine, flag Antigua & Barbuda) trading in the European region. Joining in Belfast, UK, 13–15 June 2026, for a 4+2 month contract.

Mixed international crew, excellent English required, minimum 1 contract in rank. Salary from $3,000/month.

## How to apply
Apply directly through SeaJobs.pro — your profile, sea service record and certificates will be sent straight to the crewing manager.'
  WHERE title = '2nd Officer — General Cargo, Worldwide';

UPDATE vacancies SET description = 'Nika Maritime has an urgent opening for a Chief Officer on a general cargo vessel (2,287 DWT / 2,042 GT, built 1999, MAN B&W main engine, flag Antigua & Barbuda) trading in the European region. Joining in the Netherlands, 19–21 June 2026, for a 4+2 month contract.

Mixed international crew, excellent English required. Salary from $4,000/month.

## How to apply
Apply directly through SeaJobs.pro — your profile goes straight to the crewing manager.'
  WHERE title = 'Chief Officer — General Cargo, Worldwide';

UPDATE vacancies SET description = 'MS Crewing is looking for a Chief Engineer for a general cargo vessel (6,000 DWT, Yanmar main engine, 2,500 kW) trading in the Mediterranean Sea. 6-month contract, joining 17 June 2026.

Russian-speaking crew, good English required, age limit 62. Previous experience in rank and on the same vessel type is mandatory.

Salary from $7,000/month.

## How to apply
Apply directly through SeaJobs.pro — your profile is forwarded straight to the crewing desk.'
  WHERE title = 'Chief Engineer — General Cargo, Mediterranean';

UPDATE vacancies SET description = 'MS Crewing is recruiting a Welder for a bulk carrier (28,000 DWT, built 2014) trading worldwide. 6-month contract, joining 16 June 2026.

All-Ukrainian crew, any level of English accepted, prior welding experience in rank required. Salary from $2,500/month.

## How to apply
Apply directly through SeaJobs.pro — your application goes straight to the crewing manager.'
  WHERE title = 'Welder — Bulk Carrier, Worldwide';

UPDATE vacancies SET description = 'MS Crewing has an opening for an Ordinary Seaman on a bulk carrier (28,000 DWT, built 2014) trading worldwide. 6-month contract, joining 16 June 2026.

All-Ukrainian crew, any level of English accepted — a great opportunity for newcomers. Salary from $1,500/month.

## How to apply
Apply directly through SeaJobs.pro.'
  WHERE title = 'Ordinary Seaman — Bulk Carrier, Worldwide';

UPDATE vacancies SET description = 'Alpha Crew LTD is hiring a 2nd Officer / DPO for a Multi-Role Support Vessel (MPSV, DP2) operating in the North Sea. 2-month contract, joining 20 June 2026.

Mixed international crew, good English required. Previous experience in rank and on the same vessel type is mandatory.

## Requirements
- DP Unlimited certificate
- valid UK Work Permit
- ROV / North Sea experience. Day rate €340–350

## How to apply
Apply directly through SeaJobs.pro — your profile is sent straight to the crewing manager.'
  WHERE title = '2nd Officer / DPO — MRSV, North Sea';

