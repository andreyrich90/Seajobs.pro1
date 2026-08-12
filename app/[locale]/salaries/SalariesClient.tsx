"use client";

import { TrendingUp, Award, Ship, GraduationCap, Building2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SalaryStatsWidget from "@/components/SalaryStats";
import { useLang } from "@/components/LangProvider";
import { T, type Lang } from "@/lib/i18n";
import type { SalaryStats } from "@/lib/salaryStats";

const EMPTY: Record<string, string> = {
  en: "No salary data yet — check back once more vacancies are published.",
  ru: "Пока нет данных по зарплатам — загляните позже, когда появятся вакансии.",
  ua: "Поки немає даних по зарплатах — завітайте пізніше, коли з'являться вакансії.",
  pl: "Brak danych o zarobkach — zajrzyj później, gdy pojawi się więcej ofert.",
  ro: "Încă nu există date despre salarii — reveniți când vor apărea mai multe joburi.",
};

// Original explainer copy below the table so /salaries is a real content page,
// not just a widget. Localised in all five languages.
type Item = { t: string; d: string };
type QA = { q: string; a: string };
type SalCopy = {
  intro: string;
  factorsTitle: string; factors: Item[];
  readTitle: string; readPoints: string[];
  faqTitle: string; faq: QA[];
  cta: string;
};

const SAL: Record<Lang, SalCopy> = {
  en: {
    intro: "This page shows what seafarers actually earn on SeaJobs.pro, aggregated from the salaries on current vacancies. Instead of a vague “negotiable”, you can compare real pay ranges by rank and vessel type and benchmark any offer before you sign.",
    factorsTitle: "What determines a seafarer's salary",
    factors: [
      { t: "Rank", d: "The single biggest factor. A Master or Chief Engineer earns several times what a rating does." },
      { t: "Vessel type", d: "Tankers, gas carriers and offshore units pay a premium over dry cargo for the same rank." },
      { t: "Certificates & experience", d: "Tanker and DP endorsements, and time already served in rank, push an offer up." },
      { t: "Company & trade", d: "Established operators and demanding trading areas pay more than the market average." },
    ],
    readTitle: "How to read the table",
    readPoints: [
      "Figures are the salary range (min–max) across current vacancies, per month.",
      "Offshore is shown per day, because that is how offshore rotations are usually paid.",
      "Every currency is converted to EUR; use the €/$ toggle to switch to US dollars.",
      "Tap any figure to open the role guide and the current vacancies for that rank.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Are these salaries guaranteed?", a: "No. They are indicative ranges taken from real vacancies on the portal, meant for comparison. Always check the exact figure on the vacancy you apply to." },
      { q: "Why is the pay in euros?", a: "Vacancies are quoted in a mix of currencies, so we convert everything to EUR for a like-for-like comparison. You can switch to USD with the toggle." },
      { q: "Which vessel pays the most for my rank?", a: "For most ranks, gas carriers and offshore units sit at the top, followed by tankers, then dry cargo. Compare across the columns for your rank." },
    ],
    cta: "Browse current vacancies",
  },
  ru: {
    intro: "На этой странице показано, сколько моряки реально зарабатывают на SeaJobs.pro — данные собраны из зарплат в актуальных вакансиях. Вместо расплывчатого «договорная» вы можете сравнить реальные вилки по рангу и типу судна и оценить любое предложение до подписания.",
    factorsTitle: "От чего зависит зарплата моряка",
    factors: [
      { t: "Ранг", d: "Главный фактор. Капитан или старший механик зарабатывает в несколько раз больше рядового." },
      { t: "Тип судна", d: "Танкеры, газовозы и офшор платят больше, чем сухогрузы, за ту же должность." },
      { t: "Сертификаты и опыт", d: "Танкерные и DP-подтверждения и уже наработанный ценз поднимают предложение." },
      { t: "Компания и район", d: "Крупные операторы и сложные районы плавания платят выше среднего по рынку." },
    ],
    readTitle: "Как читать таблицу",
    readPoints: [
      "Цифры — это вилка зарплат (мин–макс) по актуальным вакансиям, за месяц.",
      "Офшор показан за день, потому что офшорные вахты обычно так и оплачиваются.",
      "Все валюты пересчитаны в EUR; переключателем €/$ можно перейти на доллары.",
      "Нажмите на любую цифру — откроются гайд по должности и текущие вакансии на этот ранг.",
    ],
    faqTitle: "Частые вопросы",
    faq: [
      { q: "Эти зарплаты гарантированы?", a: "Нет. Это ориентировочные диапазоны из реальных вакансий портала — для сравнения. Всегда сверяйтесь с точной цифрой в вакансии, на которую откликаетесь." },
      { q: "Почему зарплата в евро?", a: "Вакансии указаны в разных валютах, поэтому мы приводим всё к EUR для честного сравнения. Переключателем можно перейти на USD." },
      { q: "На каком судне платят больше для моей должности?", a: "Для большинства рангов сверху идут газовозы и офшор, затем танкеры, потом сухогрузы. Сравнивайте по колонкам для вашей должности." },
    ],
    cta: "Смотреть актуальные вакансии",
  },
  ua: {
    intro: "На цій сторінці показано, скільки моряки реально заробляють на SeaJobs.pro — дані зібрано із зарплат у актуальних вакансіях. Замість розпливчастого «договірна» ви можете порівняти реальні вилки за рангом і типом судна й оцінити будь-яку пропозицію до підписання.",
    factorsTitle: "Від чого залежить зарплата моряка",
    factors: [
      { t: "Ранг", d: "Головний фактор. Капітан або старший механік заробляє в кілька разів більше за рядового." },
      { t: "Тип судна", d: "Танкери, газовози й офшор платять більше, ніж суховантажі, за ту саму посаду." },
      { t: "Сертифікати й досвід", d: "Танкерні та DP-підтвердження й уже напрацьований ценз піднімають пропозицію." },
      { t: "Компанія й район", d: "Великі оператори й складні райони плавання платять вище за середній ринок." },
    ],
    readTitle: "Як читати таблицю",
    readPoints: [
      "Цифри — це вилка зарплат (мін–макс) за актуальними вакансіями, за місяць.",
      "Офшор показано за день, бо офшорні вахти зазвичай так і оплачуються.",
      "Усі валюти перераховано в EUR; перемикачем €/$ можна перейти на долари.",
      "Натисніть на будь-яку цифру — відкриються гайд по посаді й поточні вакансії на цей ранг.",
    ],
    faqTitle: "Часті запитання",
    faq: [
      { q: "Ці зарплати гарантовані?", a: "Ні. Це орієнтовні діапазони з реальних вакансій порталу — для порівняння. Завжди звіряйтеся з точною цифрою у вакансії, на яку відгукуєтесь." },
      { q: "Чому зарплата в євро?", a: "Вакансії вказано в різних валютах, тому ми зводимо все до EUR для чесного порівняння. Перемикачем можна перейти на USD." },
      { q: "На якому судні платять більше для моєї посади?", a: "Для більшості рангів згори йдуть газовози й офшор, потім танкери, далі суховантажі. Порівнюйте по колонках для вашої посади." },
    ],
    cta: "Дивитися актуальні вакансії",
  },
  pl: {
    intro: "Ta strona pokazuje, ile marynarze faktycznie zarabiają na SeaJobs.pro — dane pochodzą z wynagrodzeń w aktualnych ofertach. Zamiast niejasnego „do uzgodnienia” możesz porównać realne widełki według stanowiska i typu statku i ocenić każdą ofertę przed podpisaniem.",
    factorsTitle: "Co decyduje o wynagrodzeniu marynarza",
    factors: [
      { t: "Stanowisko", d: "Największy czynnik. Kapitan lub starszy mechanik zarabia kilka razy więcej niż załoga." },
      { t: "Typ statku", d: "Zbiornikowce, gazowce i offshore płacą więcej niż drobnica za to samo stanowisko." },
      { t: "Certyfikaty i doświadczenie", d: "Uprawnienia zbiornikowcowe i DP oraz staż na stanowisku podnoszą ofertę." },
      { t: "Firma i rejon", d: "Duzi operatorzy i wymagające rejony płacą powyżej średniej rynkowej." },
    ],
    readTitle: "Jak czytać tabelę",
    readPoints: [
      "Liczby to widełki wynagrodzeń (min–maks) z aktualnych ofert, miesięcznie.",
      "Offshore podano za dzień, bo tak zwykle rozlicza się rotacje offshore.",
      "Każdą walutę przeliczono na EUR; przełącznikiem €/$ przejdziesz na dolary.",
      "Kliknij dowolną liczbę, aby otworzyć poradnik stanowiska i aktualne oferty.",
    ],
    faqTitle: "Najczęstsze pytania",
    faq: [
      { q: "Czy te wynagrodzenia są gwarantowane?", a: "Nie. To orientacyjne widełki z realnych ofert portalu, do porównania. Zawsze sprawdzaj dokładną kwotę w ofercie, na którą aplikujesz." },
      { q: "Dlaczego wynagrodzenie jest w euro?", a: "Oferty są w różnych walutach, więc przeliczamy wszystko na EUR dla uczciwego porównania. Przełącznikiem przejdziesz na USD." },
      { q: "Który statek płaci najwięcej na moim stanowisku?", a: "Dla większości stanowisk na czele są gazowce i offshore, potem zbiornikowce, dalej drobnica. Porównuj kolumny dla swojego stanowiska." },
    ],
    cta: "Zobacz aktualne oferty",
  },
  ro: {
    intro: "Această pagină arată cât câștigă de fapt marinarii pe SeaJobs.pro — datele sunt adunate din salariile joburilor curente. În loc de un „negociabil” vag, poți compara intervale reale de plată după funcție și tipul navei și poți evalua orice ofertă înainte de a semna.",
    factorsTitle: "Ce determină salariul unui marinar",
    factors: [
      { t: "Funcția", d: "Cel mai important factor. Un comandant sau șef mecanic câștigă de câteva ori mai mult decât un nebrevetat." },
      { t: "Tipul navei", d: "Tancurile, navele de gaz și offshore plătesc mai mult decât marfa uscată pentru aceeași funcție." },
      { t: "Certificate și experiență", d: "Atestatele de tanc și DP și vechimea în funcție cresc oferta." },
      { t: "Compania și zona", d: "Operatorii consacrați și zonele solicitante plătesc peste media pieței." },
    ],
    readTitle: "Cum se citește tabelul",
    readPoints: [
      "Cifrele sunt intervalul salarial (min–max) din joburile curente, pe lună.",
      "Offshore este afișat pe zi, pentru că așa se plătesc de obicei rotațiile offshore.",
      "Fiecare monedă este convertită în EUR; cu butonul €/$ treci la dolari.",
      "Apasă orice cifră pentru a deschide ghidul funcției și joburile curente.",
    ],
    faqTitle: "Întrebări frecvente",
    faq: [
      { q: "Aceste salarii sunt garantate?", a: "Nu. Sunt intervale orientative din joburi reale de pe portal, pentru comparație. Verifică mereu suma exactă pe jobul la care aplici." },
      { q: "De ce sunt salariile în euro?", a: "Joburile sunt în monede diferite, așa că le convertim în EUR pentru o comparație corectă. Cu butonul poți trece la USD." },
      { q: "Ce navă plătește cel mai mult pentru funcția mea?", a: "Pentru majoritatea funcțiilor, în frunte sunt navele de gaz și offshore, apoi tancurile, apoi marfa uscată. Compară pe coloane pentru funcția ta." },
    ],
    cta: "Vezi joburile curente",
  },
};

const FACTOR_ICONS = [Award, Ship, GraduationCap, Building2];

export default function SalariesClient({ stats }: { stats: SalaryStats }) {
  const { lang } = useLang();
  const t = T[lang];
  const c = SAL[lang] ?? SAL.en;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
        <div className="mb-6 flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brass/15">
            <TrendingUp size={22} className="text-brassInk" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t.salaries_title}
            </h1>
            <p className="mt-1 max-w-2xl text-base text-mist">{t.salaries_sub}</p>
          </div>
        </div>

        {stats.hasData ? (
          <SalaryStatsWidget stats={stats} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-card p-10 text-center text-mist">
            {EMPTY[lang] ?? EMPTY.en}
          </div>
        )}

        {/* Explainer — makes /salaries a real content page */}
        <section className="mt-10 space-y-10">
          <p className="max-w-3xl text-[15px] leading-relaxed text-mist">{c.intro}</p>

          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-white">{c.factorsTitle}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {c.factors.map((f, i) => {
                const Icon = FACTOR_ICONS[i] ?? Award;
                return (
                  <div key={f.t} className="flex gap-3.5 rounded-2xl border border-white/10 bg-card p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brass/15 text-brassInk">
                      <Icon size={19} />
                    </span>
                    <span>
                      <span className="block font-semibold text-white">{f.t}</span>
                      <span className="mt-0.5 block text-sm text-mist leading-relaxed">{f.d}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-white">{c.readTitle}</h2>
            <ul className="space-y-2.5">
              {c.readPoints.map((p, i) => (
                <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-mist">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass2" /> {p}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-white">{c.faqTitle}</h2>
            <div className="space-y-3">
              {c.faq.map((qa, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-card p-5">
                  <h3 className="font-semibold text-white">{qa.q}</h3>
                  <p className="mt-1.5 text-sm text-mist leading-relaxed">{qa.a}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
          >
            {c.cta}
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
