
"use client";

import { use, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function DetailedMouContent({
  params,
}: {
  params: Promise<{ organization: string }>;
}) {
  const unwrappedParams = use(params);
  const searchParams = useSearchParams();

  const orgSlug = unwrappedParams.organization || "partner-institute";
  const formattedOrgName = decodeURIComponent(orgSlug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const metaData = {
    fullName: searchParams.get("name") || "Johnathan Vance",
    email: searchParams.get("email") || `partnerships@${orgSlug.toLowerCase().replace(/[^a-z0-9]/g, "")}.edu.au`,
    organization: searchParams.get("org") || formattedOrgName || "Australian Sovereign College",
    position: searchParams.get("pos") || "Chief Executive Officer / Director",
    signedDate: searchParams.get("date") || "10 September 2026",
    signedTime: searchParams.get("time") || "11:42 AM AEST (UTC+10)",
    documentId: `BLX-MOU-2026-${Math.abs(orgSlug.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)).toString().slice(0, 6)}`,
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9ff] py-10 px-4 sm:px-6 lg:px-10 print:bg-white print:p-0">
      <div className="max-w-[880px] mx-auto">
        {/* Top Control Bar (Hidden on Print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-purple-100/90 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <Link href={`/our-partners/agreements/mou/${orgSlug}`} className="inline-flex items-center gap-1.5 text-[#5a2df5] hover:underline font-bold">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Metadata Record</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-purple-200/80 hover:bg-purple-50 text-xs sm:text-sm font-bold text-[#5a2df5] shadow-xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>

        {/* Document Sheet */}
        <div className="bg-white rounded-3xl border border-purple-100 shadow-[0_12px_40px_rgba(90,45,245,0.06)] p-8 sm:p-14 text-neutral-800 print:shadow-none print:border-none print:p-0">
          {/* Header */}
          <div className="border-b border-neutral-200 pb-8 mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#5a2df5]/10 text-[#5a2df5] text-xs font-bold uppercase tracking-wider mb-3">
                Official Memorandum of Understanding
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Course Listing &amp; Student Acquisition Partnership Agreement
              </h1>
              <p className="text-xs text-neutral-500 font-mono mt-1">
                Agreement Document Ref: {metaData.documentId}
              </p>
            </div>

            <div className="shrink-0 text-left sm:text-right">
              <span className="text-[11px] font-bold uppercase text-neutral-400 block tracking-wider">Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Fully Executed
              </span>
            </div>
          </div>

          {/* Parties Overview */}
          <div className="bg-purple-50/50 rounded-2xl border border-purple-100 p-6 mb-8 text-xs sm:text-sm leading-relaxed">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-3">
              Parties to the Agreement
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <strong className="block text-neutral-900 font-bold mb-1">Party A (Platform Operator):</strong>
                <p className="text-neutral-600">Blixtor Pty Ltd (ACN 648 119 203)</p>
                <p className="text-neutral-600">Level 24, 300 Barangaroo Avenue, Sydney NSW 2000</p>
                <p className="text-neutral-600 font-mono">partnerships@blixtor.com.au</p>
              </div>

              <div>
                <strong className="block text-neutral-900 font-bold mb-1">Party B (Training Provider / RTO):</strong>
                <p className="text-neutral-900 font-semibold">{metaData.organization}</p>
                <p className="text-neutral-600">Signatory: {metaData.fullName} ({metaData.position})</p>
                <p className="text-neutral-600 font-mono">{metaData.email}</p>
              </div>
            </div>
          </div>

          {/* Legal Body Clauses */}
          <div className="space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <section>
              <h3 className="text-base font-bold text-neutral-900 mb-2">1. Purpose &amp; Scope</h3>
              <p>
                This Memorandum of Understanding (MOU) establishes the cooperative framework between Blixtor Pty Ltd and{" "}
                <strong>{metaData.organization}</strong> (&ldquo;Provider&rdquo;) for listing accredited vocational courses, qualifications, and skill sets on the Blixtor platform to generate high-intent student enquiries.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-neutral-900 mb-2">2. Commercial Terms &amp; Lead Settlement</h3>
              <p className="mb-2">
                The Provider agrees to operate on a pure Pay-Per-Qualified-Enquiry structure. No monthly retaining fee, onboarding fee, or fixed lock-in contract shall be levied against the Provider.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                <li>Enquiries are validated for Australian contactability, residency, and course pre-requisite verification.</li>
                <li>Invoicing occurs on the 1st of every calendar month with 14-day standard payment terms.</li>
                <li>Disputed leads (invalid contact number, bot submissions) may be submitted within 7 business days for instant credits.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-bold text-neutral-900 mb-2">3. Compliance &amp; Standards (ASQA / TEQSA)</h3>
              <p>
                Both parties confirm strict adherence to the Standards for RTOs 2015, Education Services for Overseas Students (ESOS) Act, and Australian Consumer Law. Blixtor agrees to accurately represent course outcomes, fees, and government subsidy eligibility without deceptive marketing practices.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-neutral-900 mb-2">4. Term &amp; Termination</h3>
              <p>
                This agreement commences upon digital execution and remains active indefinitely until terminated by either party with fourteen (14) days written notice via email.
              </p>
            </section>
          </div>

          {/* Execution Signatures Section */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-6">
              Execution &amp; Digital Signatures
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Provider Signature */}
              <div className="p-6 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 space-y-3">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Signed on behalf of {metaData.organization}
                </span>

                <div className="py-2 border-b border-neutral-300 font-serif italic text-lg sm:text-xl text-neutral-900">
                  {metaData.fullName}
                </div>

                <div className="space-y-1 text-xs text-neutral-600">
                  <p><strong className="text-neutral-800">Name:</strong> {metaData.fullName}</p>
                  <p><strong className="text-neutral-800">Title:</strong> {metaData.position}</p>
                  <p><strong className="text-neutral-800">Email:</strong> {metaData.email}</p>
                  <p><strong className="text-neutral-800">Signed On:</strong> {metaData.signedDate} at {metaData.signedTime}</p>
                </div>
              </div>

              {/* Blixtor Signature */}
              <div className="p-6 rounded-2xl bg-[#5a2df5]/5 border border-[#5a2df5]/20 space-y-3">
                <span className="text-[11px] font-bold text-[#5a2df5] uppercase tracking-wider block">
                  Signed on behalf of Blixtor Pty Ltd
                </span>

                <div className="py-2 border-b border-purple-200 font-serif italic text-lg sm:text-xl text-[#5a2df5]">
                  Antigravity Operations Executive
                </div>

                <div className="space-y-1 text-xs text-neutral-600">
                  <p><strong className="text-neutral-800">Name:</strong> Antigravity Director of Partnerships</p>
                  <p><strong className="text-neutral-800">Title:</strong> Managing Director &amp; Head of Partnerships</p>
                  <p><strong className="text-neutral-800">Email:</strong> partnerships@blixtor.com.au</p>
                  <p><strong className="text-neutral-800">Countersigned On:</strong> {metaData.signedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DetailedMou({
  params,
}: {
  params: Promise<{ organization: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#faf9ff] py-16 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#5a2df5] border-t-transparent animate-spin" />
        </main>
      }
    >
      <DetailedMouContent params={params} />
    </Suspense>
  );
}