"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import MessagesView from "@/components/MessagesView";

export default function AdminChatsPage() {
  return (
    <Suspense fallback={null}>
      <MessagesView role="admin" />
    </Suspense>
  );
}
