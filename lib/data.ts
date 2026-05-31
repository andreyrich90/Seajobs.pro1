export type Job = {
  id: number;
  rank: string;
  vessel: string;
  salary: number;
  currency: "USD" | "EUR";
  duration: string;
  joining: string;
  company: string;
  flag: string;
  location: string;
  logo: string;
  hot?: boolean;
};

export const JOBS: Job[] = [
  { id: 1, rank: "Chief Officer", vessel: "LNG", salary: 11500, currency: "USD", duration: "4+1", joining: "2026-06-12", company: "Hanseatic Crewing", flag: "🇩🇪", location: "Hamburg", logo: "HC", hot: true },
  { id: 2, rank: "2nd Engineer", vessel: "Tanker", salary: 9200, currency: "EUR", duration: "6", joining: "2026-06-20", company: "Aegean Marine", flag: "🇬🇷", location: "Piraeus", logo: "AM" },
  { id: 3, rank: "Master", vessel: "Bulk Carrier", salary: 13800, currency: "USD", duration: "4", joining: "2026-07-01", company: "Nordic Fleet", flag: "🇳🇴", location: "Oslo", logo: "NF", hot: true },
  { id: 4, rank: "AB", vessel: "Container", salary: 2400, currency: "EUR", duration: "6+1", joining: "2026-06-08", company: "Rotterdam Crew", flag: "🇳🇱", location: "Rotterdam", logo: "RC" },
  { id: 5, rank: "ETO", vessel: "Cruise", salary: 5600, currency: "EUR", duration: "4", joining: "2026-06-25", company: "Adriatic Crew", flag: "🇮🇹", location: "Genoa", logo: "AC" },
  { id: 6, rank: "Chief Engineer", vessel: "Offshore", salary: 14200, currency: "USD", duration: "5/5", joining: "2026-07-10", company: "Maersk Crewing", flag: "🇩🇰", location: "Copenhagen", logo: "MC", hot: true },
];
export type NewsItem = {
  id: number;
  title: Record<string, string>;
  tag: string;
  date: string;
  gradient: string;
};

export const NEWS: NewsItem[] = [
  {
    id: 1,
    title: {
      ua: "IMO оновлює вимоги STCW щодо годин відпочинку у 2026",
      pl: "IMO aktualizuje wymogi STCW dotyczące godzin odpoczynku w 2026",
      ru: "IMO обновляет требования STCW к часам отдыха в 2026",
      en: "IMO updates STCW rest-hour requirements for 2026",
    },
    tag: "Regulation",
    date: "2026-05-24",
    gradient: "linear-gradient(135deg,#0c4a6e,#155e75)",
  },
  {
    id: 2,
    title: {
      ua: "Зарплати офіцерів зросли на 8% через дефіцит екіпажів",
      pl: "Pensje oficerów wzrosły o 8% z powodu niedoboru załóg",
      ru: "Зарплаты офицеров выросли на 8% из-за дефицита экипажей",
      en: "Officer salaries rise 8% amid global crew shortage",
    },
    tag: "Market",
    date: "2026-05-20",
    gradient: "linear-gradient(135deg,#7c2d12,#9a3412)",
  },
  {
    id: 3,
    title: {
      ua: "Новим суднам на зеленому паливі потрібно 4000 інженерів",
      pl: "Nowe statki na zielone paliwo potrzebują 4000 inżynierów",
      ru: "Новым судам на зелёном топливе нужно 4000 инженеров",
      en: "New green-fuel vessels need 4,000 trained engineers",
    },
    tag: "Industry",
    date: "2026-05-15",
    gradient: "linear-gradient(135deg,#14532d,#166534)",
  },
];
