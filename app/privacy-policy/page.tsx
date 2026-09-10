"use client";

import { useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "overview", title: "1. Overview & Scope" },
  { id: "collection", title: "2. Information We Collect" },
  { id: "collection-methods", title: "3. How We Collect Information" },
  { id: "purposes", title: "4. Purpose & Use of Data" },
  { id: "storage-mongodb", title: "5. Storage & MongoDB Infrastructure" },
  { id: "security-turnstile", title: "6. Security & Cloudflare Turnstile" },
  { id: "disclosure", title: "7. Disclosure to Partners & Providers" },
  { id: "cookies", title: "8. Cookies & Telemetry" },
  { id: "retention", title: "9. Data Retention & Deletion" },
  { id: "rights", title: "10. Your Rights & Access Requests" },
  { id: "complaints", title: "11. Complaints & OAIC Guidance" },
  { id: "contact", title: "12. Privacy Officer Contact" },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9ff] py-10 sm:py-16 px-4 sm:px-6 lg:px-10">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(90,45,245,0.06)_0%,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none fixed bottom-1/4 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(142,94,255,0.05)_0%,transparent_70%)] blur-3xl" />

      <div className="max-w-[1240px] mx-auto">
        {/* Page Breadcrumb & Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200/90 shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-neutral-800 tracking-wide">
              Privacy Act 1988 (Cth) &amp; APP Compliant
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#11111b] tracking-tight leading-tight mb-3">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            This policy outlines how Blixtor Pty Ltd collects, secures, processes, and protects your personal data when navigating Blixtor.com.au.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-400 font-medium">
            <span>Last Updated: <strong>10 September 2026</strong></span>
            <span>•</span>
            <span>Version: <strong>3.2 (Production)</strong></span>
            <span>•</span>
            <button
              type="button"
              onClick={handlePrint}
              className="text-[#5a2df5] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print Policy</span>
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Sticky TOC + Legal Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =========================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
          ========================================================================== */}
          <aside className="lg:col-span-4 sticky top-24 hidden lg:block">
            <div className="bg-white rounded-3xl p-6 border border-purple-100/90 shadow-[0_10px_35px_rgba(90,45,245,0.04)] space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
                Table of Contents
              </h2>

              <nav className="space-y-1">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer block ${
                      activeSection === sec.id
                        ? "bg-[#5a2df5]/10 text-[#5a2df5] font-bold border-l-3 border-[#5a2df5]"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-purple-100/80 text-[11px] text-neutral-500 space-y-2">
                <p className="font-semibold text-neutral-800">Need specific compliance assistance?</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-[#5a2df5] font-bold hover:underline"
                >
                  <span>Contact Data Privacy Officer</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* =========================================================================
              RIGHT COLUMN: LEGAL POLICY DOCUMENT
          ========================================================================== */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-7 sm:p-12 border border-purple-100/90 shadow-[0_12px_45px_rgba(90,45,245,0.05)] text-neutral-800 space-y-10 leading-relaxed text-xs sm:text-sm">
            {/* Section 1: Overview & Scope */}
            <section id="overview" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                1. Overview &amp; Scope
              </h2>
              <p>
                Blixtor Pty Ltd (ACN 648 119 203, &ldquo;Blixtor&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to safeguarding the privacy of individuals who interact with our educational marketplace, course comparison services, and business consultancy offerings via <strong>blixtor.com.au</strong> (&ldquo;Platform&rdquo;).
              </p>
              <p>
                This Privacy Policy is prepared in strict accordance with the <em>Privacy Act 1988 (Cth)</em>, the <em>Australian Privacy Principles (APPs)</em>, the <em>Spam Act 2003 (Cth)</em>, and the <em>Do Not Call Register Act 2006 (Cth)</em>. It explains how we collect, hold, process, disclose, and secure your personal information.
              </p>
            </section>

            {/* Section 2: Information We Collect */}
            <section id="collection" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                2. Information We Collect
              </h2>
              <p>Depending on your interaction with the Platform, we may collect the following categories of personal information:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
                <li><strong>Prospective Student Information:</strong> Full name, email address, mobile phone number, postal code / state, study mode preference (online, on-campus, blended), citizenship / residency status, educational background, and specific courses of interest.</li>
                <li><strong>Training Provider &amp; Partner Information:</strong> Representative name, corporate email address, organisation / RTO name, position / title, phone number, and agreement signatory details.</li>
                <li><strong>Technical &amp; Telemetry Data:</strong> IP address, device type, browser specifications, operating system, referrer URL, timestamps, and interaction logs.</li>
                <li><strong>Communications Data:</strong> Inquiries, customer support messages, feedback responses, and webinar/event registrations.</li>
              </ul>
            </section>

            {/* Section 3: How We Collect Information */}
            <section id="collection-methods" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                3. How We Collect Information
              </h2>
              <p>We collect personal information through lawful and fair means, primarily directly from you:</p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                <li>When you submit a course inquiry, download a course brochure, or request a callback.</li>
                <li>When training providers submit a course listing application or sign partnership MOUs.</li>
                <li>When you contact our support team via email, contact forms, or phone.</li>
                <li>Automatically via secure cookies, server logs, and automated bot-protection tools (Cloudflare Turnstile) upon navigating our website.</li>
              </ul>
            </section>

            {/* Section 4: Purpose & Use of Data */}
            <section id="purposes" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                4. Purpose &amp; Use of Personal Information
              </h2>
              <p>We only collect and process personal data for legitimate business functions, including:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <strong className="block text-xs font-bold text-neutral-900 mb-1">Student Course Routing</strong>
                  <p className="text-neutral-600 text-xs">Connecting learners with the accredited RTO or university offering the specific course inquired about.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <strong className="block text-xs font-bold text-neutral-900 mb-1">Service &amp; Account Delivery</strong>
                  <p className="text-neutral-600 text-xs">Managing partner listings, administrative access, permissions, and agreement records.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <strong className="block text-xs font-bold text-neutral-900 mb-1">Security &amp; Abuse Prevention</strong>
                  <p className="text-neutral-600 text-xs">Detecting bot submissions, unauthorized access, and malicious traffic via Cloudflare Turnstile.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <strong className="block text-xs font-bold text-neutral-900 mb-1">Regulatory Compliance</strong>
                  <p className="text-neutral-600 text-xs">Adhering to ASQA, TEQSA, consumer protection standards, and tax accounting requirements.</p>
                </div>
              </div>
            </section>

            {/* Section 5: Storage & MongoDB Infrastructure */}
            <section id="storage-mongodb" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100 flex items-center justify-between">
                <span>5. Data Storage &amp; Database Infrastructure</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200">
                  MongoDB Atlas
                </span>
              </h2>
              <p>
                All structured customer data, partner records, lead inquiries, and authentication metadata are stored securely in dedicated <strong>MongoDB</strong> database clusters.
              </p>
              <div className="space-y-2 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <div>
                    <strong className="text-neutral-900">Encryption at Rest &amp; in Transit:</strong>
                    <p className="text-neutral-600 text-xs mt-0.5">Database storage is encrypted using industry-standard AES-256 encryption at rest, and all client-to-database connections enforce Transport Layer Security (TLS 1.3 / SSL).</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <div>
                    <strong className="text-neutral-900">Geographic Data Sovereignty:</strong>
                    <p className="text-neutral-600 text-xs mt-0.5">Database instances are hosted within secure Australian cloud data regions (e.g. Sydney / Melbourne), ensuring compliance with Australian data sovereignty expectations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <div>
                    <strong className="text-neutral-900">Strict Role-Based Access Control (RBAC):</strong>
                    <p className="text-neutral-600 text-xs mt-0.5">Access to raw databases is strictly restricted to vetted operational personnel via multi-factor authentication (MFA) and IP allowlisting.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Security & Cloudflare Turnstile */}
            <section id="security-turnstile" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100 flex items-center justify-between">
                <span>6. Spam Protection &amp; Cloudflare Turnstile</span>
                <span className="text-[10px] font-mono bg-purple-50 text-[#5a2df5] px-2.5 py-1 rounded-md border border-purple-200">
                  Privacy-Preserving
                </span>
              </h2>
              <p>
                To safeguard our forms against automated spam, bot submissions, and credential stuffing without intrusive image puzzles, we utilize <strong>Cloudflare Turnstile</strong>.
              </p>
              <p>
                Unlike legacy CAPTCHA services, Cloudflare Turnstile respects visitor privacy by validating human authenticity without tracking users across non-Blixtor websites or harvesting personal identities for behavioral ad profiling. Cloudflare processes non-identifying telemetry (e.g. browser signals and challenge response tokens) strictly to prevent automated exploitation.
              </p>
            </section>

            {/* Section 7: Disclosure to Partners & Providers */}
            <section id="disclosure" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                7. Disclosure to Third Parties &amp; Education Providers
              </h2>
              <p>
                We do not sell, rent, or trade your personal information to third-party data brokers. We disclose your information only under the following circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
                <li><strong>Nominated Education Providers:</strong> When you request information on a specific course, your enquiry details are routed exclusively to the relevant registered training organization or higher education provider offering that course.</li>
                <li><strong>Essential Service Providers:</strong> Trusted infrastructure providers who assist in operating our platform (e.g. database hosting on MongoDB Atlas, Cloudflare protection, transactional email gateways) bound by strict confidentiality agreements.</li>
                <li><strong>Legal &amp; Regulatory Mandates:</strong> Where disclosure is required by law, subpoena, or Australian regulatory enforcement bodies.</li>
              </ul>
            </section>

            {/* Section 8: Cookies & Telemetry */}
            <section id="cookies" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                8. Cookies &amp; Digital Analytics
              </h2>
              <p>
                We use strictly necessary and functional cookies to ensure platform navigation, remember your course filter selections, maintain security tokens, and analyze aggregate traffic patterns. You may configure your browser settings to refuse cookies; however, some interactive platform features may function with reduced capabilities.
              </p>
            </section>

            {/* Section 9: Data Retention & Deletion */}
            <section id="retention" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                9. Data Retention &amp; Deletion
              </h2>
              <p>
                We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required to comply with statutory accounting, legal audit, and dispute resolution requirements.
              </p>
              <p>
                When personal data is no longer needed, it is securely destroyed or de-identified in accordance with Australian Privacy Principle 11.2.
              </p>
            </section>

            {/* Section 10: Your Rights & Access Requests */}
            <section id="rights" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                10. Your Rights &amp; Access Requests
              </h2>
              <p>Under the Australian Privacy Principles, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                <li>Request access to the personal information Blixtor holds about you.</li>
                <li>Request corrections to any inaccurate, incomplete, or outdated information.</li>
                <li>Opt-out of promotional marketing communications at any time via the unsubscribe links provided.</li>
                <li>Request the deletion of your enquiry data, subject to lawful record-keeping requirements.</li>
              </ul>
              <p className="text-xs text-neutral-500 pt-1">
                To exercise any of these rights, please email our Privacy Officer at <strong className="text-[#5a2df5]">privacy@blixtor.com.au</strong>. We respond to verified access requests within thirty (30) days.
              </p>
            </section>

            {/* Section 11: Complaints & OAIC Guidance */}
            <section id="complaints" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                11. Privacy Complaints &amp; Regulatory Recourse
              </h2>
              <p>
                If you believe Blixtor has breached the Australian Privacy Principles or mishandled your data, please contact our Data Privacy Officer in writing. We will investigate your complaint and provide a formal written response within thirty (30) business days.
              </p>
              <p>
                If you are dissatisfied with our response, you may escalate your complaint to the <strong>Office of the Australian Information Commissioner (OAIC)</strong>:
              </p>
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                <p><strong>Website:</strong> <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-[#5a2df5] hover:underline">www.oaic.gov.au</a></p>
                <p><strong>Phone:</strong> 1300 363 992</p>
                <p><strong>Post:</strong> GPO Box 5218, Sydney NSW 2001</p>
              </div>
            </section>

            {/* Section 12: Privacy Officer Contact */}
            <section id="contact" className="scroll-mt-28 space-y-4 pt-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                12. Data Privacy Officer Contact
              </h2>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 to-white border border-purple-200 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#5a2df5]">Blixtor Data Protection &amp; Governance</p>
                <strong className="text-base text-neutral-900 block font-bold">Blixtor Pty Ltd (Privacy Officer)</strong>
                <p className="text-neutral-600 text-xs">Level 24, International Towers, 300 Barangaroo Avenue, Sydney NSW 2000, Australia</p>
                <p className="text-xs text-neutral-600">
                  Email: <a href="mailto:privacy@blixtor.com.au" className="text-[#5a2df5] font-semibold hover:underline font-mono">privacy@blixtor.com.au</a>
                </p>
                <p className="text-xs text-neutral-600">
                  General Inquiries: <a href="mailto:hello@blixtor.com.au" className="text-[#5a2df5] font-semibold hover:underline font-mono">hello@blixtor.com.au</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}