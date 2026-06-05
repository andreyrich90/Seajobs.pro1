"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide when registering, including your name, email address, and role (seafarer or company). Seafarers may also provide additional profile information such as nationality, rank, work experience, and certificates. Companies may provide business name, location, and website.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your information to operate the platform, facilitate connections between seafarers and companies, send relevant notifications about applications and job status, and improve our services. We do not sell your personal information to third parties.",
  },
  {
    title: "3. Profile Visibility",
    body: "Seafarer profiles (name, rank, experience, certificates) may be visible to registered crewing companies. Sensitive information such as phone numbers and dates of birth are not displayed publicly. You can control your profile content at any time from your dashboard.",
  },
  {
    title: "4. Email Communications",
    body: "We may send you email notifications related to your account activity, such as application status updates and new messages. These are transactional emails necessary for the operation of the service. You can manage notification preferences in your account settings.",
  },
  {
    title: "5. Data Storage & Security",
    body: "Your data is stored on secure servers provided by Supabase (hosted on AWS infrastructure in the EU). We implement industry-standard security measures including encrypted connections (HTTPS/TLS), secure authentication, and row-level security policies.",
  },
  {
    title: "6. Cookies",
    body: "We use minimal session cookies necessary for authentication. We do not use tracking cookies or third-party advertising cookies. Your language preference is stored in your browser's local storage.",
  },
  {
    title: "7. Your Rights (GDPR)",
    body: "If you are located in the European Union, you have the right to access, correct, or delete your personal data. You may request a copy of your data or ask us to delete your account by contacting us through the platform's contact form.",
  },
  {
    title: "8. Data Retention",
    body: "We retain your account data for as long as your account is active. If you delete your account, your personal data is removed within 30 days, except where retention is required by law. Application history may be retained in anonymized form for statistical purposes.",
  },
  {
    title: "9. Contact",
    body: "For any privacy-related questions or requests, please contact us through the contact form on our homepage. We will respond within 5 business days.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <h1 className="font-display text-4xl font-semibold text-white">Privacy Policy</h1>
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
