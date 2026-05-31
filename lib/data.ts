export type Job = {
  id: number;
  rank: string;
  vessel: string;
  salary: number;
  duration: string;
  joining: string;
  company: string;
  flag: string;
  location: string;
  logo: string;
  hot?: boolean;
};

export const JOBS: Job[] = [
  { id: 1, rank: "Chief Officer", vessel: "LNG", salary: 11500, duration: "4+1", joining: "2026-06-12", company: "Hanseatic Crewing", flag: "🇩🇪", location: "Hamburg", logo: "HC", hot: true },
  { id: 2, rank: "2nd Engineer", vessel: "Tanker", salary: 9200, duration: "6", joining: "2026-06-20", company: "Aegean Marine", flag: "🇬🇷", location: "Piraeus", logo: "AM" },
  { id: 3, rank: "Master", vessel: "Bulk Carrier", salary: 13800, duration: "4", joining: "2026-07-01", company: "Nordic Fleet", flag: "🇳🇴", location: "Oslo", logo: "NF", hot: true },
  { id: 4, rank: "AB", vessel: "Container", salary: 2400, duration: "6+1", joining: "2026-06-08", company: "Rotterdam Crew", flag: "🇳🇱", location: "Rotterdam", logo: "RC" },
  { id: 5, rank: "ETO", vessel: "Cruise", salary: 5600, duration: "4", joining: "2026-06-25", company: "Adriatic Crew", flag: "🇮🇹", location: "Genoa", logo: "AC" },
  { id: 6, rank: "Chief Engineer", vessel: "Offshore", salary: 14200, duration: "5/5", joining: "2026-07-10", company: "Maersk Crewing", flag: "🇩🇰", location: "Copenhagen", logo: "MC", hot: true },
];
