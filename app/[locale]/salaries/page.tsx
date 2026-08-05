import { connection } from "next/server";
import { getSalaryStats } from "@/lib/salaryStatsCached";
import SalariesClient from "./SalariesClient";

export const dynamic = "force-dynamic";

export default async function SalariesPage() {
  await connection(); // render per request, not at build time
  // The 5,000-row salary scan is cached for 15 minutes (see salaryStatsCached);
  // it used to run on every request and dominated TTFB/LCP.
  const salaryStats = await getSalaryStats();

  return <SalariesClient stats={salaryStats} />;
}
