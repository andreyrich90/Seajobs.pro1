"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

export default function SeafarerIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/seafarer/dashboard");
  }, [router]);

  return null;
}
