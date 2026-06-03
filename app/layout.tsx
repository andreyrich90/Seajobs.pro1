import "./globals.css";
import { LangProvider } from "@/components/LangProvider";

export const metadata = {
  title: "SeaJobs.pro — Maritime Jobs for Seafarers",
  description: "Find maritime jobs worldwide. Platform for seafarers and crewing companies. Search vacancies by rank, vessel type, salary.",
  keywords: "maritime jobs, seafarer jobs, crewing, maritime career, ship jobs",
  openGraph: {
    title: "SeaJobs.pro — Maritime Jobs",
    description: "Find maritime jobs worldwide for seafarers",
    type: "website",
    siteName: "SeaJobs.pro",
  },
  twitter: {
    card: "summary",
    title: "SeaJobs.pro — Maritime Jobs",
    description: "Find maritime jobs worldwide for seafarers",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-navy text-foam font-body">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
