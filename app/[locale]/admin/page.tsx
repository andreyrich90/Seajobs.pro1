"use client";
export const dynamic = "force-dynamic";
import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
export default function AdminPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/admin/dashboard"); }, [router]);
  return null;
}
