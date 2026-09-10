"use client";

import { useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "agreement", title: "1. Acceptance of Terms" },
  { id: "eligibility", title: "2. Eligibility & Capacity" },
  { id: "services", title: "3. Scope of Services & Marketplace Role" },
  { id: "course-info", title: "4. Course Information & Disclaimers" },
  { id: "user-obligations", title: "5. User Obligations & Conduct" },
  { id: "partner-terms", title: "6. Training Provider & Partner Rules" },
  { id: "ip-rights", title: "7. Intellectual Property Rights" },
  { id: "fees-billing", title: "8. Fees, Payments & Invoicing" },
  { id: "third-party", title: "9. Third-Party Links & Integrations" },
  { id: "liability", title: "10. Limitation of Liability & ACL" },
  { id: "indemnification", title: "11. Indemnification" },
  { id: "termination", title: "12. Suspension & Termination" },
  { id: "disputes", title: "13. Dispute Resolution & Governing Law" },
  { id: "contact-legal", title: "14. Legal & Regulatory Notices" },
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState<string>("agreement");

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
            <span className="w-2 h-2 rounded-full bg-[#5a2df5] animate-pulse" />
            <span className="text-xs font-bold text-neutral-800 tracking-wide">
              Australian Consumer Law (ACL) &amp; Commercial Terms
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#11111b] tracking-tight leading-tight mb-3">
            Terms of Service
          </h1>

          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            Please read these terms carefully before accessing or using the Blixtor marketplace, course inquiry features, partner portals, and consultancy services.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-400 font-medium">
            <span>Last Updated: <strong>10 September 2026</strong></span>
            <span>•</span>
            <span>Version: <strong>2.8 (Production)</strong></span>
            <span>•</span>
            <button
              type="button"
              onClick={handlePrint}
              className="text-[#5a2df5] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print Terms</span>
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
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer block ${activeSection === sec.id
                        ? "bg-[#5a2df5]/10 text-[#5a2df5] font-bold border-l-3 border-[#5a2df5]"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                      }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-purple-100/80 text-[11px] text-neutral-500 space-y-2">
                <p className="font-semibold text-neutral-800">Have legal or compliance questions?</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-[#5a2df5] font-bold hover:underline"
                >
                  <span>Contact Legal Operations</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* =========================================================================
              RIGHT COLUMN: LEGAL TERMS DOCUMENT
          ========================================================================== */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-7 sm:p-12 border border-purple-100/90 shadow-[0_12px_45px_rgba(90,45,245,0.05)] text-neutral-800 space-y-10 leading-relaxed text-xs sm:text-sm">
            {/* Section 1: Acceptance of Terms */}
            <section id="agreement" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                1. Acceptance of Terms &amp; Binding Agreement
              </h2>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;Student&rdquo;, &ldquo;Client&rdquo;, or &ldquo;Partner&rdquo;) and <strong>Blixtor Pty Ltd</strong> (ACN 648 119 203, &ldquo;Blixtor&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), governing your access to and use of <strong>blixtor.com.au</strong> and all associated websites, subdomains, APIs, widgets, and services (collectively, the &ldquo;Platform&rdquo;).
              </p>
              <p>
                By accessing, browsing, submitting inquiries through, or creating an account on the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <Link href="/privacy-policy" className="text-[#5a2df5] font-semibold hover:underline">Privacy Policy</Link>. If you do not agree to these Terms, you must immediately discontinue using our Platform.
              </p>
            </section>

            {/* Section 2: Eligibility & Capacity */}
            <section id="eligibility" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                2. Eligibility &amp; Legal Capacity
              </h2>
              <p>
                By using our Platform, you represent and warrant that:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
                <li>You are at least 18 years of age, or if you are between 15 and 17 years old, you have obtained the explicit consent of your parent or legal guardian.</li>
                <li>You possess the legal authority and capacity to enter into a binding contract under the laws of New South Wales and the Commonwealth of Australia.</li>
                <li>If you are accessing the Platform on behalf of an educational institution, registered training organisation (RTO), or commercial enterprise, you are duly authorized to bind that entity to these Terms.</li>
              </ul>
            </section>

            {/* Section 3: Scope of Services & Marketplace Role */}
            <section id="services" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                3. Scope of Services &amp; Marketplace Role
              </h2>
              <p>
                Blixtor operates as an educational marketplace, digital aggregator, lead referral service, and strategic growth facilitator.
              </p>
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs space-y-2">
                <strong className="text-neutral-900 block font-bold">Intermediary Clarification:</strong>
                <p className="text-neutral-600">
                  Unless explicitly specified otherwise, <strong>Blixtor is not a Registered Training Organisation (RTO) or higher education provider</strong>. Blixtor connects prospective students with independent, third-party Australian education providers (including accredited TAFEs, universities, colleges, and enterprise training partners). Any enrolment contract, tuition payment, curriculum delivery, or academic assessment is entered into solely between the student and the nominated provider.
                </p>
              </div>
            </section>

            {/* Section 4: Course Information & Disclaimers */}
            <section id="course-info" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                4. Course Information &amp; Listing Disclaimers
              </h2>
              <p>
                While Blixtor makes reasonable commercial efforts to ensure that course descriptions, indicative fees, intake dates, qualification codes (e.g. ASQA/CRICOS accredited courses), and entry prerequisites are accurate and up-to-date:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
                <li>Course pricing, government funding eligibility (such as Smart and Skilled or VET Student Loans), course timetables, and units of competency are established independently by education providers and are subject to change without notice.</li>
                <li>Course completion does not guarantee employment, visa grant, professional licensing, or salary benchmarks.</li>
                <li>Users are strongly advised to independently verify all academic prerequisites, credit transfers, and refund policies directly with the education provider prior to formal enrolment.</li>
              </ul>
            </section>

            {/* Section 5: User Obligations & Conduct */}
            <section id="user-obligations" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                5. User Obligations &amp; Acceptable Use
              </h2>
              <p>In accessing or submitting forms through our Platform, you agree that you will not:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
                <li>Submit false, misleading, fraudulent, or impersonated contact details, phone numbers, or academic credentials.</li>
                <li>Use automated bots, web scrapers, spiders, or extraction scripts to harvest data, course catalogs, or partner listings without prior written consent from Blixtor.</li>
                <li>Attempt to circumvent security controls, rate limits, or human verification barriers, including Cloudflare Turnstile token validation.</li>
                <li>Engage in any activity that transmits malware, interferes with platform uptime, or imposes an unreasonable load on our MongoDB database infrastructure or cloud networks.</li>
                <li>Use the Platform for unlawful unsolicited marketing or spam transmissions in violation of the <em>Spam Act 2003 (Cth)</em>.</li>
              </ul>
            </section>

            {/* Section 6: Training Provider & Partner Rules */}
            <section id="partner-terms" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                6. Training Provider &amp; Partner Obligations
              </h2>
              <p>
                Educational institutions and training providers who partner with Blixtor or receive student leads agree that:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
                <li>They maintain valid, active accreditation with the relevant Australian regulatory authorities (e.g. ASQA, TEQSA, CRICOS) for all advertised courses.</li>
                <li>Student leads delivered by Blixtor are confidential, proprietary, and licensed for single-institution contact only; leads may not be resold, sub-licensed, or shared with third-party lead brokers.</li>
                <li>Institutions must execute formal commercial agreements or Memorandums of Understanding (MoU) with Blixtor governing specific lead delivery volumes, cost-per-lead (CPL) fees, dispute handling, and payment terms.</li>
              </ul>
            </section>

            {/* Section 7: Intellectual Property Rights */}
            <section id="ip-rights" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                7. Intellectual Property Rights
              </h2>
              <p>
                All content, software, user interfaces, branding, visual designs, graphic assets, database structures, algorithms, text, and trademarks displayed on the Platform are the exclusive property of Blixtor Pty Ltd or its licensed partners, protected under the <em>Copyright Act 1968 (Cth)</em> and international intellectual property treaties.
              </p>
              <p>
                You are granted a limited, revocable, non-transferable, and non-exclusive license to access and view Platform content for personal, non-commercial course comparison purposes. No portion of the Platform may be reproduced, modified, republished, or commercially exploited without express written permission.
              </p>
            </section>

            {/* Section 8: Fees, Payments & Invoicing */}
            <section id="fees-billing" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                8. Fees, Payments &amp; Invoicing
              </h2>
              <p>
                <strong>For Prospective Students:</strong> Navigating the Blixtor comparison directory, submitting course inquiries, and receiving preliminary course counseling from Blixtor is completely free of charge.
              </p>
              <p>
                <strong>For Enterprise Clients &amp; Partners:</strong> Fees for listing management, featured placements, lead generation campaigns, and consultancy are invoiced in Australian Dollars (AUD) and are exclusive of Australian Goods and Services Tax (GST) unless explicitly noted. Payment terms, overdue interest rates, and invoice schedules are governed by your individual Partner Agreement.
              </p>
            </section>

            {/* Section 9: Third-Party Links & Integrations */}
            <section id="third-party" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                9. Third-Party Links &amp; Integrations
              </h2>
              <p>
                Our Platform may contain hyperlinks to external websites operated by educational institutions, regulatory bodies, government funding schemes, or payment gateways. Blixtor exercises no control over the content, terms, security, or privacy practices of these external sites and accepts no responsibility for damages arising from your engagement with third-party destinations.
              </p>
            </section>

            {/* Section 10: Limitation of Liability & ACL */}
            <section id="liability" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                10. Limitation of Liability &amp; Australian Consumer Law
              </h2>
              <p>
                Under the Australian Consumer Law (ACL), certain statutory guarantees and consumer warranties are implied into contracts for the supply of goods or services that cannot be excluded, restricted, or modified (&ldquo;Non-Excludable Consumer Guarantees&rdquo;).
              </p>
              <p>
                Except where prohibited by the ACL:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
                <li>The Platform and its content are provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis without warranties of any kind, whether express or implied.</li>
                <li>Blixtor shall not be liable for any indirect, incidental, consequential, special, or punitive damages, including loss of profits, data loss, business interruption, or educational rejection.</li>
                <li>To the maximum extent permitted by law, Blixtor&rsquo;s aggregate liability arising out of or in connection with your use of the Platform is strictly capped at the total amount paid by you to Blixtor in the twelve (12) months preceding the claim, or AUD $100.00 (whichever is lower).</li>
              </ul>
            </section>

            {/* Section 11: Indemnification */}
            <section id="indemnification" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                11. Indemnification
              </h2>
              <p>
                You agree to defend, indemnify, and hold harmless Blixtor Pty Ltd, its directors, officers, employees, contractors, agents, and licensors from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable legal fees) arising from:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                <li>Your breach or violation of these Terms or any applicable law.</li>
                <li>Your misuse of the Platform or submission of unauthorized or infringing content.</li>
                <li>Any dispute between you and an education provider or third party encountered through Blixtor.</li>
              </ul>
            </section>

            {/* Section 12: Suspension & Termination */}
            <section id="termination" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                12. Suspension &amp; Termination
              </h2>
              <p>
                Blixtor reserves the right, at its sole discretion and without prior notice or liability, to suspend, restrict, or terminate your access to all or part of the Platform if you breach these Terms, engage in fraudulent behavior, or disrupt the operation of our platform services.
              </p>
            </section>

            {/* Section 13: Dispute Resolution & Governing Law */}
            <section id="disputes" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                13. Dispute Resolution &amp; Governing Law
              </h2>
              <p>
                These Terms are governed by, and construed in accordance with, the laws of the State of <strong>New South Wales, Australia</strong>.
              </p>
              <p>
                In the event of any dispute arising out of or in connection with these Terms, the parties agree to first attempt in good faith to resolve the dispute through amicable commercial negotiations. If the dispute is not resolved within thirty (30) days of formal written notice, the parties submit to the non-exclusive jurisdiction of the courts of New South Wales and the Commonwealth of Australia.
              </p>
            </section>

            {/* Section 14: Legal & Regulatory Notices */}
            <section id="contact-legal" className="scroll-mt-28 space-y-4 pt-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#11111b] tracking-tight pb-2 border-b border-purple-100">
                14. Legal &amp; Regulatory Notices
              </h2>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 to-white border border-purple-200 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#5a2df5]">Legal &amp; Regulatory Affairs</p>
                <strong className="text-base text-neutral-900 block font-bold">Blixtor Pty Ltd (Legal Operations)</strong>
                <p className="text-neutral-600 text-xs">Level 24, International Towers, 300 Barangaroo Avenue, Sydney NSW 2000, Australia</p>
                <p className="text-neutral-600 text-xs font-mono">ACN: 648 119 203 | ABN: Registered in Australia</p>
                <p className="text-xs text-neutral-600 pt-1">
                  Legal Enquiries: <a href="mailto:legal@blixtor.com.au" className="text-[#5a2df5] font-semibold hover:underline font-mono">legal@blixtor.com.au</a>
                </p>
                <p className="text-xs text-neutral-600">
                  General Support: <a href="mailto:support@blixtor.com.au" className="text-[#5a2df5] font-semibold hover:underline font-mono">support@blixtor.com.au</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}