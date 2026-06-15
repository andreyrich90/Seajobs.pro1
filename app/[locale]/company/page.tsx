"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

export default function CompanyPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/company/dashboard"); }, [router]);
  return null;
}
