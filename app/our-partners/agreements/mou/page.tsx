"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "../../../_components/site-shell";

export default function MouPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    position: "",
    authorizedConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.authorizedConsent) {
      alert("Please confirm you are an authorized representative of the organization.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#faf9ff] py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1080px] mx-auto">
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-purple-100/90">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <Link href="/" className="hover:text-[#5a2df5] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/apply-for-course-listing" className="hover:text-[#5a2df5] transition-colors">
              Our Partners
            </Link>
            <span>/</span>
            <span className="text-[#5a2df5]">Listing Agreement (MOU)</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Official Execution Portal • Document Ref: BLX-MOU-2026</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5a2df5]/10 text-[#5a2df5] text-xs font-bold tracking-wide mb-4 border border-[#5a2df5]/20">
            <span>Official Partner Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#11111b] tracking-tight leading-[1.18] mb-4">
            Memorandum of Understanding (MOU)
            <span className="block text-[#5a2df5] italic text-2xl sm:text-3xl lg:text-[34px] font-semibold mt-1">
              Course Listing &amp; Student Acquisition Partnership
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            This Memorandum of Understanding outlines the mutual cooperation, verified student enquiry
            generation standards, and performance terms between Blixtor and participating education providers.
          </p>
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="bg-white rounded-3xl border border-purple-200 p-8 sm:p-12 text-center shadow-xl max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 text-2xl font-bold">
              ✓
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
              MOU Successfully Signed &amp; Dispatched
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11111b] mb-3">
              Agreement Executed
            </h2>

            <p className="text-sm text-neutral-600 leading-relaxed max-w-md mx-auto mb-6">
              Thank you, <strong>{formData.fullName}</strong>. A certified, counter-signed PDF copy of this
              Listing Agreement (MOU) along with your execution timestamp has been sent to{" "}
              <strong className="text-[#5a2df5]">{formData.email}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-neutral-600 text-left mb-8 max-w-md mx-auto space-y-1.5">
              <div className="flex justify-between">
                <span className="font-semibold text-neutral-500">Signatory:</span>
                <span className="font-bold text-neutral-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-neutral-500">Organisation:</span>
                <span className="font-bold text-neutral-900">{formData.organization}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-neutral-500">Position:</span>
                <span className="font-bold text-neutral-900">{formData.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-neutral-500">Agreement Copy:</span>
                <span className="text-emerald-700 font-bold">Sent to email inbox</span>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-[#5a2df5] text-white text-sm font-bold shadow-md shadow-[#5a2df5]/25 hover:bg-[#481ecc] transition-all"
            >
              Return to Homepage
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {/* =========================================================
                PART 1: AGREEMENT PREVIEW ("HALF DETAILS / KEY TERMS")
            ========================================================== */}
            <div className="bg-white rounded-3xl border border-purple-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
              {/* Document Header Ribbon */}
              <div className="bg-gradient-to-r from-[#18034a] via-[#2f1082] to-[#4c1ba6] text-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-purple-200 uppercase">
                    Document Excerpt • Summary Version
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    Partnership Agreement Overview &amp; Core Clauses
                  </h2>
                </div>

                <Link
                  href="/our-partners/agreements/mou/detailed"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-200 hover:text-white bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/20 transition-colors self-start sm:self-auto"
                >
                  <span>Read Full Agreement</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>

              {/* Agreement Clauses Summary (Preview) */}
              <div className="p-6 sm:p-8 space-y-6 text-neutral-700">
                {/* Clause 1 */}
                <div className="pb-5 border-b border-purple-100/80">
                  <h3 className="text-sm font-bold text-[#11111b] mb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#5a2df5]/10 text-[#5a2df5] text-xs font-extrabold flex items-center justify-center">
                      1
                    </span>
                    <span>Purpose &amp; Scope of Collaboration</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-7">
                    This agreement establishes a non-exclusive partnership where Blixtor features and markets
                    the Provider&apos;s approved accredited and vocational courses across its digital discovery channels,
                    delivering pre-qualified, high-intent prospective student enquiries directly to the Provider.
                  </p>
                </div>

                {/* Clause 2 */}
                <div className="pb-5 border-b border-purple-100/80">
                  <h3 className="text-sm font-bold text-[#11111b] mb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#5a2df5]/10 text-[#5a2df5] text-xs font-extrabold flex items-center justify-center">
                      2
                    </span>
                    <span>Performance Model &amp; Invoicing</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-7">
                    The partnership operates strictly on a <strong>Pay-Per-Verified-Lead</strong> basis. There are zero upfront
                    listing fees, onboarding fees, or monthly retainers. The Provider only incurs fees for validated,
                    reachable student leads that meet the agreed qualification criteria specified in Schedule A.
                  </p>
                </div>

                {/* Clause 3 */}
                <div className="pb-5 border-b border-purple-100/80">
                  <h3 className="text-sm font-bold text-[#11111b] mb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#5a2df5]/10 text-[#5a2df5] text-xs font-extrabold flex items-center justify-center">
                      3
                    </span>
                    <span>Quality Assurance &amp; Regulatory Compliance</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-7">
                    Both parties commit to upholding the Standards for RTOs 2015, the Australian Consumer Law, and
                    applicable ASQA/TEQSA guidelines. Blixtor will accurately represent course curriculum, entry requirements,
                    and fee disclosures based solely on information provided by the Partner.
                  </p>
                </div>

                {/* Clause 4 */}
                <div>
                  <h3 className="text-sm font-bold text-[#11111b] mb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#5a2df5]/10 text-[#5a2df5] text-xs font-extrabold flex items-center justify-center">
                      4
                    </span>
                    <span>Flexibility &amp; Term of Agreement</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-7">
                    This agreement carries <strong>zero lock-in commitment</strong>. Either party may modify volume caps,
                    pause active campaigns, or terminate collaboration at any time by providing written notice via email.
                  </p>
                </div>

                {/* Document preview fade banner */}
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-dashed border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#5a2df5] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Showing core operational excerpt. Complete schedules &amp; execution clauses will be dispatched upon signing.
                    </span>
                  </div>
                  <Link
                    href="/our-partners/agreements/mou/detailed"
                    className="font-bold text-[#5a2df5] hover:underline shrink-0"
                  >
                    View Detailed MOU →
                  </Link>
                </div>
              </div>
            </div>

            {/* =========================================================
                PART 2: DIGITAL SIGNATURE & EXECUTION FORM
            ========================================================== */}
            <div className="bg-white rounded-3xl border border-purple-200/90 shadow-xl shadow-purple-950/5 p-7 sm:p-10">
              <div className="pb-6 mb-8 border-b border-purple-100/80">
                <div className="flex items-center gap-2 text-xs font-bold text-[#5a2df5] mb-1">
                  <span>Signatory Execution</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#11111b]">
                  Execute Agreement &amp; Confirm Partnership
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Complete your signatory credentials below. Once submitted, an executed, counter-signed PDF copy
                  will be dispatched directly to your designated email address.
                </p>
              </div>

              {/* Informative Note Box */}
              <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-purple-50/80 via-white to-purple-50/40 border border-purple-200/80 text-xs sm:text-sm text-neutral-700 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#5a2df5] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ℹ
                </div>
                <div>
                  <strong className="text-neutral-900 font-bold block mb-0.5">
                    Email Dispatch Notice:
                  </strong>
                  <span>
                    A complete, counter-signed legal copy of this Memorandum of Understanding and certificate of execution
                    will be automatically sent to the email address provided below for your institution&apos;s records.
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="signatory-name"
                      className="text-xs font-bold text-neutral-800 uppercase tracking-wide"
                    >
                      Full Name *
                    </label>
                    <input
                      id="signatory-name"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Johnathan Vance"
                      className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="signatory-email"
                      className="text-xs font-bold text-neutral-800 uppercase tracking-wide"
                    >
                      Business Email Address *
                    </label>
                    <input
                      id="signatory-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="j.vance@institute.edu.au"
                      className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Organization (RTO Name) */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="signatory-org"
                      className="text-xs font-bold text-neutral-800 uppercase tracking-wide"
                    >
                      Organisation / RTO Name *
                    </label>
                    <input
                      id="signatory-org"
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Australian Institute of Technology (RTO #41234)"
                      className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Position */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="signatory-position"
                      className="text-xs font-bold text-neutral-800 uppercase tracking-wide"
                    >
                      Position / Title (e.g. CEO, Director) *
                    </label>
                    <input
                      id="signatory-position"
                      type="text"
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="e.g. Chief Executive Officer / Director"
                      className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                {/* Authorized Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 p-4 rounded-2xl bg-purple-50/40 border border-purple-200/70 cursor-pointer transition-colors hover:bg-purple-50/70">
                    <input
                      type="checkbox"
                      required
                      checked={formData.authorizedConsent}
                      onChange={(e) =>
                        setFormData({ ...formData, authorizedConsent: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 rounded border-purple-300 text-[#5a2df5] focus:ring-[#5a2df5] accent-[#5a2df5] cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm text-neutral-700 leading-relaxed select-none">
                      I confirm that I am an authorized representative of{" "}
                      <strong>{formData.organization.trim() || "the designated organization"}</strong>{" "}
                      with the legal capacity to execute this Memorandum of Understanding. I acknowledge that an official
                      agreement copy will be sent to the provided email address upon submission.
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>256-Bit SSL Encrypted Digital Execution</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-13 px-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] bg-[length:200%_100%] hover:bg-[100%_0] text-white text-sm sm:text-base font-bold shadow-lg shadow-[#5a2df5]/25 hover:shadow-xl hover:shadow-[#5a2df5]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing &amp; Dispatching Agreement...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign &amp; Execute Agreement</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M17 17V7H7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}