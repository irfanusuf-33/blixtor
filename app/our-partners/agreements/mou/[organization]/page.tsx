"use client";

import { use, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function MouMetaContent({
  params,
}: {
  params: Promise<{ organization: string }>;
}) {
  const unwrappedParams = use(params);
  const searchParams = useSearchParams();

  // Format organization name from URL slug or query param
  const orgSlug = unwrappedParams.organization || "partner-institute";
  const formattedOrgName = decodeURIComponent(orgSlug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // Extracted or fallback meta values
  const metaData = {
    fullName: searchParams.get("name") || "Johnathan Vance",
    email: searchParams.get("email") || `partnerships@${orgSlug.toLowerCase().replace(/[^a-z0-9]/g, "")}.edu.au`,
    organization: searchParams.get("org") || formattedOrgName || "Australian Sovereign College",
    position: searchParams.get("pos") || "Chief Executive Officer / Director",
    signedDate: searchParams.get("date") || "10 September 2026",
    signedTime: searchParams.get("time") || "11:42 AM AEST (UTC+10)",
    documentId: `BLX-MOU-2026-${Math.abs(orgSlug.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)).toString().slice(0, 6)}`,
  };

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Build target detailed link preserving query params
  const detailedLinkParams = new URLSearchParams();
  if (searchParams.get("name")) detailedLinkParams.set("name", searchParams.get("name")!);
  if (searchParams.get("email")) detailedLinkParams.set("email", searchParams.get("email")!);
  if (searchParams.get("org")) detailedLinkParams.set("org", searchParams.get("org")!);
  if (searchParams.get("pos")) detailedLinkParams.set("pos", searchParams.get("pos")!);
  const queryString = detailedLinkParams.toString();
  const detailedHref = `/our-partners/agreements/mou/${orgSlug}/detailed${queryString ? `?${queryString}` : ""}`;

  return (
    <main className="min-h-screen bg-[#faf9ff] py-12 px-4 sm:px-6 lg:px-10 flex flex-col justify-center">
      <div className="max-w-[760px] w-full mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs font-medium text-neutral-400">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#5a2df5] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/our-partners/agreements/mou" className="hover:text-[#5a2df5] transition-colors">
              MOU Agreements
            </Link>
            <span>/</span>
            <span className="text-[#5a2df5] font-semibold">Signed Record</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Signed &amp; Active</span>
          </div>
        </div>

        {/* Certificate Card */}
        <div className="bg-white rounded-3xl border border-purple-100 shadow-[0_12px_40px_rgba(90,45,245,0.06)] overflow-hidden">
          {/* Header Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-[#5627ed] via-[#8e5eff] to-[#a78bfa]" />

          <div className="p-6 sm:p-10 space-y-8">
            {/* Header / Certificate Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-100/80">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#5a2df5]/10 text-[#5a2df5] flex items-center justify-center font-bold text-xl shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#11111b] tracking-tight">
                    Signed Agreement Record
                  </h1>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Ref ID: {metaData.documentId}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-neutral-400 block uppercase font-bold tracking-wider">
                  Agreement Type
                </span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                  Listing Partnership MOU
                </span>
              </div>
            </div>

            {/* Meta Details Grid */}
            <div>
              <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Signatory &amp; Organisation Meta Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 hover:border-purple-200 transition-colors">
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase tracking-wider mb-1">
                    Full Name
                  </span>
                  <strong className="text-sm sm:text-base font-bold text-neutral-900 block">
                    {metaData.fullName}
                  </strong>
                </div>

                {/* Email */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 hover:border-purple-200 transition-colors">
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase tracking-wider mb-1">
                    Email Address
                  </span>
                  <strong className="text-sm sm:text-base font-bold text-neutral-900 font-mono block truncate">
                    {metaData.email}
                  </strong>
                </div>

                {/* Organization */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 hover:border-purple-200 transition-colors">
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase tracking-wider mb-1">
                    Organization / RTO
                  </span>
                  <strong className="text-sm sm:text-base font-bold text-neutral-900 block">
                    {metaData.organization}
                  </strong>
                </div>

                {/* Position */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 hover:border-purple-200 transition-colors">
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase tracking-wider mb-1">
                    Position / Title
                  </span>
                  <strong className="text-sm sm:text-base font-bold text-neutral-900 block">
                    {metaData.position}
                  </strong>
                </div>
              </div>
            </div>

            {/* When Agreement Was Signed Section */}
            <div>
              <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Execution Timestamp
              </h2>

              <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/50 border border-purple-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5a2df5] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block font-medium">Agreement Signed On</span>
                    <strong className="text-sm sm:text-base font-bold text-neutral-900">
                      {metaData.signedDate} at {metaData.signedTime}
                    </strong>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-purple-200/80 text-xs font-semibold text-[#5a2df5] self-start sm:self-auto">
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Digitally Verified</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-xs sm:text-sm font-semibold text-neutral-700 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{copied ? "Link Copied!" : "Copy Record Link"}</span>
              </button>

              <Link
                href={detailedHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] bg-[length:200%_100%] hover:bg-[100%_0] text-white text-sm sm:text-base font-bold shadow-lg shadow-[#5a2df5]/25 hover:shadow-xl hover:shadow-[#5a2df5]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <span>View Your Signed Agreement</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 17V7H7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Support Info */}
        <p className="mt-6 text-center text-xs text-neutral-400">
          A copy of this digital agreement certificate has been registered. For queries, contact{" "}
          <Link href="mailto:partnerships@blixtor.com.au" className="text-[#5a2df5] hover:underline font-medium">
            partnerships@blixtor.com.au
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function MouMetaPage({
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
      <MouMetaContent params={params} />
    </Suspense>
  );
}