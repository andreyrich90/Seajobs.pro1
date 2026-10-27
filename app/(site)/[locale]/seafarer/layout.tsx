import { T } from "@/lib/i18n";
import type { Lang } from "@/lib/langs";
import { DictProvider } from "@/components/DictProvider";
import SeafarerShell from "./SeafarerShell";

export const dynamic = "force-dynamic";

// The cabinet reads the whole dictionary, so it hands it down here: the
// locale layout passes only the strings public pages need (publicDict in
// lib/i18n.ts), which keeps every cached page lighter. The guard, sidebar and
// the rest of the shell live in SeafarerShell.tsx, a client component.
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <DictProvider dict={T[locale as Lang] ?? T.en}>
      <SeafarerShell>{children}</SeafarerShell>
    </DictProvider>
  );
}
