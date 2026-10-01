import { getSalaryStats } from "@/lib/salaryStatsCached";
import SalariesClient from "./SalariesClient";


// Statistics over months of vacancies. Half an hour does not move them.
export const revalidate = 1800;

export default async function SalariesPage() {
  // The 5,000-row salary scan is cached for 15 minutes (see salaryStatsCached);
  // it used to run on every request and dominated TTFB/LCP.
  const salaryStats = await getSalaryStats();

  return <SalariesClient stats={salaryStats} />;
}
