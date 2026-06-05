"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using SeaJobs.pro, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform. These terms apply to all visitors, seafarers, and company users of the platform.",
  },
  {
    title: "2. Platform Use",
    body: "SeaJobs.pro provides a digital marketplace connecting seafarers with crewing agencies. You may use the platform to create a profile, apply for vacancies, and communicate with potential employers. You agree not to misuse the platform, post false information, or engage in any fraudulent activity.",
  },
  {
    title: "3. User Accounts",
    body: "You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate, current, and complete information during registration and to keep your profile updated. SeaJobs.pro reserves the right to suspend or terminate accounts that violate these terms.",
  },
  {
    title: "4. Seafarer Profiles",
    body: "When you create a seafarer profile, certain information may be visible to registered crewing companies. You control what information you include in your profile. SeaJobs.pro is not responsible for how companies use information displayed on your public profile.",
  },
  {
    title: "5. Company Accounts",
    body: "Companies must provide accurate information about their business. Posting fraudulent job listings or collecting personal data for purposes other than legitimate recruitment is strictly prohibited and may result in permanent account termination.",
  },
  {
    title: "6. Intellectual Property",
    body: "All content on SeaJobs.pro, including logos, designs, and text, is the property of SeaJobs.pro and protected by applicable intellectual property laws. You may not reproduce or distribute any content without prior written permission.",
  },
  {
    title: "7. Limitation of Liability",
    body: "SeaJobs.pro acts as an intermediary platform and is not responsible for the hiring decisions of companies or the accuracy of job listings. We do not guarantee employment outcomes and are not liable for any damages arising from your use of the platform.",
  },
  {
    title: "8. Changes to Terms",
    body: "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Continued use of the platform after changes constitutes acceptance of the updated terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <h1 className="font-display text-4xl font-semibold text-white">Terms of Service</h1>
          <p className="mt-3 text-mist">Last updated: June 2025</p>

          <div className="mt-10 flex flex-col gap-8">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-lg font-semibold text-white mb-3">{s.title}</h2>
                <p className="text-mist leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
