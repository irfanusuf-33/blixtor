
"use client";

import { use, useState, useRef, useEffect, Suspense } from "react";
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

  // Editable Form & Meta State
  const [metaData, setMetaData] = useState({
    fullName: searchParams.get("name") || "Jabbar Shaik",
    email: searchParams.get("email") || `partnerships@${orgSlug.toLowerCase().replace(/[^a-z0-9]/g, "")}.edu.au`,
    organization: searchParams.get("org") || formattedOrgName || "Australian Sovereign College Pty Ltd",
    position: searchParams.get("pos") || "Managing Director",
    signedDate: searchParams.get("date") || "10/09/2026",
    signedTime: searchParams.get("time") || "11:42 AM AEST",
    documentId: `BLX-MOU-2026-${Math.abs(orgSlug.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)).toString().slice(0, 6)}`,
  });

  // Edit details modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempEditForm, setTempEditForm] = useState({ ...metaData });

  // Digital signature modal state
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [signatureMode, setSignatureMode] = useState<"draw" | "type">("draw");
  const [typedSignText, setTypedSignText] = useState(metaData.fullName);
  const [selectedFont, setSelectedFont] = useState<"font-signature-1" | "font-signature-2" | "font-signature-3">("font-signature-1");
  const [signatureImage, setSignatureImage] = useState<string | null>(null);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Agreement confirmation state
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Zoom & View state
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const totalPages = 6;

  // Initialize typed signature default to current full name
  useEffect(() => {
    if (!signatureImage && metaData.fullName) {
      setTypedSignText(metaData.fullName);
    }
  }, [metaData.fullName, signatureImage]);

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#18034a";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Save Signature from Modal
  const handleApplySignature = () => {
    if (signatureMode === "draw") {
      const canvas = canvasRef.current;
      if (canvas && hasDrawn) {
        const dataUrl = canvas.toDataURL("image/png");
        setSignatureImage(dataUrl);
      }
    } else {
      // Create an offscreen canvas to render the typed font cleanly to image
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 120;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#18034a";
        let fontStyle = "italic 36px serif";
        if (selectedFont === "font-signature-1") fontStyle = "italic 40px 'Brush Script MT', 'Dancing Script', cursive, serif";
        if (selectedFont === "font-signature-2") fontStyle = "italic 36px 'Segoe Script', 'Great Vibes', cursive, serif";
        if (selectedFont === "font-signature-3") fontStyle = "italic 38px 'Lucida Handwriting', cursive, serif";
        
        ctx.font = fontStyle;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(typedSignText || metaData.fullName, 200, 60);
        setSignatureImage(canvas.toDataURL("image/png"));
      }
    }
    setIsSignModalOpen(false);
  };

  // Save Edited Details
  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setMetaData({ ...tempEditForm });
    setIsEditModalOpen(false);
  };

  // Submit and Confirm Agreement
  const handleSubmitAgreement = () => {
    if (!isAgreed) {
      alert("Please check the authorization box confirming you are authorized to sign this agreement.");
      return;
    }
    setIsSubmitted(true);
    setShowSuccessToast(true);
    alert(`Form submitted successfully! A certified counter-signed agreement copy has been recorded and dispatched to ${metaData.email}.`);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Reusable PDF Page Header
  const PageHeader = () => (
    <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#5a2df5] flex items-center justify-center text-white font-black text-xs shadow-sm">
          B
        </div>
        <div>
          <span className="text-xs font-extrabold text-[#18034a] tracking-tight block">
            blixtor<span className="text-[#5a2df5]">.com.au</span>
          </span>
          <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-semibold block">
            Education Directory &amp; Growth
          </span>
        </div>
      </div>

      <div className="text-right">
        <span className="text-[11px] font-bold text-neutral-800 tracking-wide uppercase block">
          Partnership Memorandum of Understanding
        </span>
        <span className="text-[9px] text-neutral-400 font-mono block">
          Doc Ref: {metaData.documentId}
        </span>
      </div>
    </div>
  );

  // Reusable PDF Page Footer
  const PageFooter = ({ pageNumber }: { pageNumber: number }) => (
    <div className="mt-auto pt-4 border-t border-neutral-200 flex items-center justify-between text-[10px] text-neutral-400">
      <div className="flex items-center gap-2 font-medium">
        <span className="text-[#5a2df5] font-semibold">blixtor.com.au</span>
        <span>•</span>
        <span>Commercial in Confidence</span>
      </div>

      <div className="font-semibold text-neutral-600 truncate max-w-[240px]">
        {metaData.organization}
      </div>

      <div className="font-mono font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
        Page {pageNumber} of {totalPages}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#323639] py-8 px-2 sm:px-6 lg:px-8 print:bg-white print:p-0">
      <div className="max-w-[920px] mx-auto">
        {/* =========================================================================
            STICKY PDF NAVIGATION & ACTION TOOLBAR (Hidden on Print)
        ========================================================================== */}
        <aside aria-label="PDF Controls" className="sticky top-4 z-40 bg-[#1e2022]/95 backdrop-blur-md text-white rounded-2xl p-3 sm:p-4 mb-8 shadow-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-3">
            <Link
              href={`/our-partners/agreements/mou/${orgSlug}?name=${encodeURIComponent(metaData.fullName)}&email=${encodeURIComponent(metaData.email)}&org=${encodeURIComponent(metaData.organization)}&pos=${encodeURIComponent(metaData.position)}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-neutral-200 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back</span>
            </Link>

            <div className="h-4 w-px bg-white/20 hidden sm:block" />

            <div className="text-xs">
              <span className="font-bold text-neutral-200 block truncate max-w-[170px] sm:max-w-[240px]">
                Blixtor_Listing_Partnership_MOU.pdf
              </span>
              <span className="text-[10px] text-neutral-400">
                {totalPages} Pages • {isSubmitted ? "Fully Submitted & Certified" : "Draft Ready to Sign"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Edit Details Button */}
            <button
              type="button"
              onClick={() => {
                setTempEditForm({ ...metaData });
                setIsEditModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-neutral-200 border border-white/10 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-[#a78bfa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Details</span>
            </button>

            {/* Digital Sign Button Shortcut */}
            <button
              type="button"
              onClick={() => setIsSignModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-xs font-bold text-amber-300 border border-amber-500/30 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>{signatureImage ? "Change Sign" : "Add Signature"}</span>
            </button>

            {/* Zoom Controls */}
            <div className="hidden md:flex items-center bg-white/10 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => Math.max(75, prev - 10))}
                className="px-2 py-1 hover:bg-white/10 rounded text-neutral-300 font-bold"
                title="Zoom Out"
              >
                -
              </button>
              <span className="px-1.5 text-neutral-300 font-mono text-[11px] min-w-[40px] text-center">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => Math.min(125, prev + 10))}
                className="px-2 py-1 hover:bg-white/10 rounded text-neutral-300 font-bold"
                title="Zoom In"
              >
                +
              </button>
            </div>

            {/* Print / Download Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5a2df5] hover:bg-[#6b42f6] text-xs font-bold text-white shadow-md shadow-[#5a2df5]/30 transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print / PDF</span>
            </button>
          </div>
        </aside>

        {/* PDF Document Pages Container */}
        <div
          className="space-y-8 transition-transform origin-top duration-200 print:space-y-0 print:transform-none"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {/* =========================================================================
              PAGE 1 OF 6: AGREEMENT HEADING, PARTIES, SERVICES, FEES & PAYMENT TERMS
          ========================================================================== */}
          <section className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 min-h-[1050px] flex flex-col justify-between text-neutral-800 border border-neutral-200/80 print:shadow-none print:border-none print:rounded-none print:p-8 print:break-after-page print:min-h-screen">
            <div>
              <PageHeader />

              {/* Title Section */}
              <div className="text-center my-6 pb-6 border-b border-neutral-200">
                <div className="inline-block px-3 py-1 rounded bg-[#5a2df5]/10 text-[#5a2df5] text-[10px] font-bold uppercase tracking-widest mb-2">
                  Standard Terms of Listing Partnership
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#18034a] tracking-tight">
                  MEMORANDUM OF UNDERSTANDING (MOU)
                </h1>
                <p className="text-xs text-neutral-500 font-medium mt-1">
                  Course Listing, Student Acquisition, and Digital Prospect Routing Framework
                </p>
              </div>

              {/* Parties to Agreement */}
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-2 flex items-center justify-between">
                  <span>1. Parties to the Agreement</span>
                  <button
                    type="button"
                    onClick={() => {
                      setTempEditForm({ ...metaData });
                      setIsEditModalOpen(true);
                    }}
                    className="text-[10px] text-[#5a2df5] font-semibold hover:underline print:hidden cursor-pointer"
                  >
                    ✎ Edit Party Info
                  </button>
                </h2>
                <p className="text-xs text-neutral-600 mb-3">
                  This Memorandum of Understanding (&ldquo;Agreement&rdquo;) is entered into and made effective as of the execution date, by and between:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200">
                    <strong className="block text-neutral-900 font-bold text-[11px] uppercase tracking-wider mb-1">
                      Party A: Platform Operator
                    </strong>
                    <p className="font-semibold text-neutral-800">Blixtor Pty Ltd (ACN 648 119 203)</p>
                    <p className="text-neutral-500">Trading as Blixtor.com.au</p>
                    <p className="text-neutral-500">Level 24, 300 Barangaroo Ave, Sydney NSW 2000</p>
                    <p className="text-neutral-500 font-mono text-[11px]">partnerships@blixtor.com.au</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-purple-50/50 border border-purple-200/80 relative group">
                    <strong className="block text-[#5a2df5] font-bold text-[11px] uppercase tracking-wider mb-1">
                      Party B: Training Provider / Organization
                    </strong>
                    <p className="font-bold text-neutral-900">{metaData.organization}</p>
                    <p className="text-neutral-600">Authorized Signatory: <span className="font-medium text-neutral-800">{metaData.fullName}</span></p>
                    <p className="text-neutral-600">Position: <span className="font-medium text-neutral-800">{metaData.position}</span></p>
                    <p className="text-neutral-600 font-mono text-[11px]">{metaData.email}</p>
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="mb-6 text-xs text-neutral-700 leading-relaxed space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-2">
                  2. Services &amp; Platform Deployment
                </h2>
                <p>
                  Blixtor operates an Australian digital education marketplace connecting prospective learners with registered training organisations, higher education institutes, and course providers. Under this Agreement, Blixtor shall provide the following core listing services:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                  <li><strong>Course Profile Placement:</strong> Comprehensive publication of Provider&rsquo;s approved course titles, curriculum outlines, delivery modes, and career outcomes across Blixtor&rsquo;s searchable directory.</li>
                  <li><strong>Lead Capture &amp; Pre-Qualification:</strong> Intake of prospective student enquiries with mandatory verification of Australian residency status, contact validity, and prerequisite eligibility.</li>
                  <li><strong>Automated Influx Routing:</strong> Seamless routing of genuine prospective learner records directly into the Provider&rsquo;s nominated CRM endpoint or secure email inbox.</li>
                </ul>
              </div>

              {/* Fees and Payment Terms */}
              <div className="text-xs text-neutral-700 leading-relaxed space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-2">
                  3. Fees and Payment Terms
                </h2>
                <p>
                  3.1 <strong>Performance-Based Model:</strong> The Provider incurs zero upfront onboarding charges, fixed monthly retainers, or directory maintenance fees. Remuneration is calculated strictly on a Pay-Per-Qualified-Enquiry basis in accordance with the agreed category tier schedule.
                </p>
                <p>
                  3.2 <strong>Invoicing Cycle:</strong> Itemised tax invoices will be issued monthly on the 1st business day of each calendar month for all verified student enquiries generated during the preceding period.
                </p>
                <p>
                  3.3 <strong>Settlement Terms:</strong> Invoices are payable within 14 calendar days from the invoice issuance date via electronic funds transfer (EFT) or automated credit card billing.
                </p>
                <p>
                  3.4 <strong>Invalid Lead Credits:</strong> The Provider maintains the right to dispute any enquiry with invalid contact details or automated spam within seven (7) business days of delivery for immediate credit offset.
                </p>
              </div>
            </div>

            <PageFooter pageNumber={1} />
          </section>

          {/* =========================================================================
              PAGE 2 OF 6: LISTING CONTENT, LEAD DELIVERY, TERMINATION, CONFIDENTIALITY, CONTRACTOR
          ========================================================================== */}
          <section className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 min-h-[1050px] flex flex-col justify-between text-neutral-800 border border-neutral-200/80 print:shadow-none print:border-none print:rounded-none print:p-8 print:break-after-page print:min-h-screen">
            <div>
              <PageHeader />

              <div className="space-y-5 text-xs text-neutral-700 leading-relaxed">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-1.5">
                    4. Listing Content &amp; Regulatory Accuracy
                  </h2>
                  <p className="mb-2">
                    4.1 <strong>Provider Warranty:</strong> The Provider warrants that all course details, pricing structures, entry requirements, government funding eligibility (Smart and Skilled, Fee-Free TAFE, VET Student Loans), and national course codes provided to Blixtor are accurate, compliant, and up-to-date.
                  </p>
                  <p className="mb-2">
                    4.2 <strong>ASQA / TEQSA Compliance:</strong> Both Parties agree to comply strictly with the <em>Standards for RTOs 2015</em>, the <em>National Vocational Education and Training Regulator Act 2011</em>, and Australian Consumer Law regarding transparent advertising of educational services.
                  </p>
                  <p>
                    4.3 <strong>Content Updates:</strong> The Provider shall notify Blixtor in writing within two (2) business days of any fundamental changes to course scope, suspension of RTO registration, or tuition adjustments.
                  </p>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-1.5">
                    5. Lead Delivery &amp; System Integration
                  </h2>
                  <p className="mb-2">
                    5.1 <strong>Transmission Channels:</strong> Student enquiries will be securely transmitted in real-time via HTTPS REST API Webhooks, direct CRM integration (Salesforce, HubSpot, JobReady, VETtrak), or encrypted email notifications.
                  </p>
                  <p>
                    5.2 <strong>Exclusivity of Enquiry:</strong> Blixtor guarantees that each generated enquiry is delivered exclusively to the Provider for the specific course selected by the student, and is never co-mingled, recycled, or sold simultaneously to competing institutions.
                  </p>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-1.5">
                    6. Term &amp; Termination
                  </h2>
                  <p className="mb-2">
                    6.1 <strong>Term:</strong> This Agreement commences upon electronic execution and continues on a flexible rolling monthly term until terminated in accordance with this clause.
                  </p>
                  <p className="mb-2">
                    6.2 <strong>Termination for Convenience:</strong> Either Party may terminate this Agreement at any time, without penalty or lock-in liability, by providing fourteen (14) calendar days written notice to the other Party.
                  </p>
                  <p>
                    6.3 <strong>Immediate Termination for Cause:</strong> Either Party may immediately terminate this Agreement if the other Party breaches any material term and fails to remedy such breach within seven (7) days of notice, or undergoes liquidation/insolvency.
                  </p>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-1.5">
                    7. Confidentiality &amp; Proprietary Rights
                  </h2>
                  <p className="mb-2">
                    7.1 <strong>Confidential Information:</strong> Each Party undertakes to maintain strict confidentiality regarding all non-public operational data, lead volumes, pricing arrangements, technical architectures, and business methodologies disclosed during the term.
                  </p>
                  <p>
                    7.2 <strong>Non-Disclosure:</strong> Neither Party shall disclose Confidential Information to any third party without prior written consent, except where required by applicable Australian court order or regulatory authority.
                  </p>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-1.5">
                    8. Independent Contractor Status
                  </h2>
                  <p>
                    The relationship between Blixtor and the Provider is that of independent contractors. Nothing in this Agreement shall be construed as creating an employer-employee relationship, agency, partnership, joint venture, or fiduciary affiliation between the Parties. Neither Party has the authority to bind the other in any manner whatsoever.
                  </p>
                </div>
              </div>
            </div>

            <PageFooter pageNumber={2} />
          </section>

          {/* =========================================================================
              PAGE 3 OF 6: RESTRICTIONS ON LEAD USE, LEGAL LIABILITY & DISCLAIMERS
          ========================================================================== */}
          <section className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 min-h-[1050px] flex flex-col justify-between text-neutral-800 border border-neutral-200/80 print:shadow-none print:border-none print:rounded-none print:p-8 print:break-after-page print:min-h-screen">
            <div>
              <PageHeader />

              <div className="space-y-4 text-xs text-neutral-700 leading-relaxed">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-1.5">
                    9. Restrictions on Lead Use &amp; Privacy Compliance
                  </h2>
                  <p className="mb-1.5">
                    9.1 <strong>Single Organization Restriction:</strong> Enquiries delivered by Blixtor are licensed strictly for internal recruitment and enrolment follow-up by the Provider. The Provider shall not broker, resell, syndicate, rent, or distribute prospect contact data to third-party marketing entities or affiliates.
                  </p>
                  <p className="mb-1.5">
                    9.2 <strong>Spam Act 2003 &amp; Do Not Call Register:</strong> The Provider must comply with the <em>Spam Act 2003 (Cth)</em> and <em>Do Not Call Register Act 2006</em>, ensuring all student communications provide clear opt-out / unsubscribe mechanisms and accurate sender identification.
                  </p>
                  <p>
                    9.3 <strong>Data Retention &amp; Security:</strong> The Provider shall maintain adequate cybersecurity safeguards to prevent unauthorized access or disclosure of student records in compliance with the <em>Privacy Act 1988 (Cth)</em>.
                  </p>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-1.5">
                    10. Legal Liability &amp; Disclaimers
                  </h2>

                  <div className="space-y-2.5 pl-2 border-l-2 border-purple-200">
                    <div>
                      <strong className="text-neutral-900 font-bold block">10.1 No Guarantee of Result / Enrolment Conversions</strong>
                      <p className="text-neutral-600">
                        While Blixtor employs high-intent targeting and strict validation mechanisms, Blixtor does not guarantee that delivered enquiries will convert into matriculated or paid course enrolments. Conversion success remains dependent upon the Provider&rsquo;s admissions speed, course pricing, student intake capacities, and sales counseling quality.
                      </p>
                    </div>

                    <div>
                      <strong className="text-neutral-900 font-bold block">10.2 Lead Behaviour &amp; Accuracy</strong>
                      <p className="text-neutral-600">
                        Blixtor relies on the accuracy of prospective student submissions. Blixtor is not liable for instances where a prospect alters their career intent, enters inaccurate personal context, fails to answer communications, or declines enrolment upon further consultation.
                      </p>
                    </div>

                    <div>
                      <strong className="text-neutral-900 font-bold block">10.3 Client / Provider Responsibilities</strong>
                      <p className="text-neutral-600">
                        The Provider bears sole responsibility for prompt outreach to student enquiries, student admission vetting, verifying student visas or USI credentials, delivering training packages, and managing student academic progress.
                      </p>
                    </div>

                    <div>
                      <strong className="text-neutral-900 font-bold block">10.4 Limitation of Liability</strong>
                      <p className="text-neutral-600">
                        To the maximum extent permitted by Australian law, neither Party shall be liable for indirect, incidental, special, consequential, or punitive damages (including loss of profits, goodwill, or business opportunity). Blixtor&rsquo;s aggregate liability arising under this Agreement shall not exceed the total fees paid by the Provider to Blixtor in the three (3) months preceding the claim.
                      </p>
                    </div>

                    <div>
                      <strong className="text-neutral-900 font-bold block">10.5 Force Majeure</strong>
                      <p className="text-neutral-600">
                        Neither Party shall be held liable for failure or delay in performance resulting from causes beyond reasonable control, including natural disasters, acts of government, civil disturbances, power outages, major telecommunication failures, or denial of service attacks.
                      </p>
                    </div>

                    <div>
                      <strong className="text-neutral-900 font-bold block">10.6 Indemnity &amp; Hold Harmless</strong>
                      <p className="text-neutral-600">
                        The Provider agrees to defend, indemnify, and hold harmless Blixtor and its officers against any third-party claims, fines, damages, or legal costs arising from the Provider&rsquo;s breach of accreditation standards, false course representations, or failure to deliver educational services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <PageFooter pageNumber={3} />
          </section>

          {/* =========================================================================
              PAGE 4 OF 6: AMENDMENT OF TERMS, IP, DATA PRIVACY & GOVERNING LAW
          ========================================================================== */}
          <section className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 min-h-[1050px] flex flex-col justify-between text-neutral-800 border border-neutral-200/80 print:shadow-none print:border-none print:rounded-none print:p-8 print:break-after-page print:min-h-screen">
            <div>
              <PageHeader />

              <div className="space-y-5 text-xs text-neutral-700 leading-relaxed">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-1.5">
                    11. Amendment of Terms &amp; Variations
                  </h2>
                  <p className="mb-2">
                    11.1 <strong>Mutual Agreement:</strong> No modification, addendum, or variation of this Memorandum of Understanding shall be effective unless formulated in writing and mutually signed or acknowledged electronically by authorized representatives of both Parties.
                  </p>
                  <p className="mb-2">
                    11.2 <strong>Platform Policy Adjustments:</strong> Blixtor reserves the right to periodically update general platform security protocols, API delivery endpoints, and user verification tools. Blixtor shall provide fourteen (14) days prior electronic notice for any operational modifications that materially affect the Provider.
                  </p>
                  <p>
                    11.3 <strong>Fee Adjustments:</strong> Any proposed adjustment to per-lead category pricing shall require written notification and the express consent of the Provider prior to the commencement of the relevant billing period.
                  </p>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-1.5">
                    12. Intellectual Property &amp; Trademark License
                  </h2>
                  <p className="mb-2">
                    12.1 <strong>Limited Marketing License:</strong> The Provider hereby grants Blixtor a non-exclusive, revocable, royalty-free license to display the Provider&rsquo;s official name, logo, course guides, campus imagery, and registered trademarks on Blixtor.com.au for the sole purpose of promoting the Provider&rsquo;s courses to prospective students.
                  </p>
                  <p className="mb-2">
                    12.2 <strong>Ownership Retained:</strong> All trademarks, course content, and curriculum copyrights remain the exclusive intellectual property of the Provider. All software, search algorithms, lead management interfaces, and platform branding remain the exclusive intellectual property of Blixtor.
                  </p>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-1.5">
                    13. Data Privacy &amp; Australian Privacy Principles
                  </h2>
                  <p className="mb-2">
                    13.1 Both Parties agree to adhere strictly to the <em>Privacy Act 1988 (Cth)</em> and the Australian Privacy Principles (APPs) with respect to all personal information collected, processed, transferred, or stored in connection with this Agreement.
                  </p>
                  <p>
                    13.2 Blixtor captures prospective student consent in accordance with Australian law prior to transferring personal contact records to the Provider.
                  </p>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-1.5">
                    14. Dispute Resolution &amp; Governing Law
                  </h2>
                  <p className="mb-2">
                    14.1 <strong>Amicable Resolution:</strong> In the event of any dispute or claim arising out of or in connection with this Agreement, the Parties agree to engage in good faith executive discussions within ten (10) business days of written notice.
                  </p>
                  <p className="mb-2">
                    14.2 <strong>Mediation:</strong> If the dispute cannot be settled amicably within thirty (30) days, it shall be referred to mediation conducted by the Australian Disputes Centre (ADC) in Sydney, NSW.
                  </p>
                  <p>
                    14.3 <strong>Jurisdiction:</strong> This Agreement is governed by and construed in accordance with the laws of the State of New South Wales, Australia. The Parties submit to the non-exclusive jurisdiction of the courts of New South Wales.
                  </p>
                </div>
              </div>
            </div>

            <PageFooter pageNumber={4} />
          </section>

          {/* =========================================================================
              PAGE 5 OF 6: AGREEMENT SUMMARY & ENTIRE AGREEMENT
          ========================================================================== */}
          <section className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 min-h-[1050px] flex flex-col justify-between text-neutral-800 border border-neutral-200/80 print:shadow-none print:border-none print:rounded-none print:p-8 print:break-after-page print:min-h-screen">
            <div>
              <PageHeader />

              <div className="space-y-6 text-xs text-neutral-700 leading-relaxed">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-2">
                    15. Entire Agreement &amp; Integration
                  </h2>
                  <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 text-neutral-800">
                    <p className="font-semibold mb-2">
                      This Memorandum of Understanding (MOU) constitutes the entire and sole agreement between Blixtor Pty Ltd and {metaData.organization} regarding the listing of courses and generation of student enquiries on Blixtor.com.au.
                    </p>
                    <p className="text-neutral-600">
                      This Agreement supersedes and replaces all prior oral or written discussions, representations, promises, understandings, email exchanges, and previous agreements between the Parties concerning the subject matter hereof.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-2">
                    16. Severability &amp; Non-Waiver
                  </h2>
                  <p className="mb-2">
                    16.1 <strong>Severability:</strong> If any provision of this Agreement is held to be invalid, illegal, or unenforceable by any court or administrative body of competent jurisdiction, such invalidity shall not affect the remaining provisions of this Agreement, which shall continue in full force and effect.
                  </p>
                  <p>
                    16.2 <strong>No Waiver:</strong> The failure or delay by either Party to enforce any right or remedy under this Agreement shall not be construed as a waiver of that right or remedy or any subsequent breach.
                  </p>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-2">
                    17. Counterparts &amp; Digital Execution
                  </h2>
                  <p>
                    This Agreement may be executed in any number of counterparts, each of which when executed shall constitute a duplicate original, but all the counterparts shall together constitute the one agreement. Execution by digital signature, electronic confirmation, or certified cryptographic transmission shall be deemed legally binding under the <em>Electronic Transactions Act 1999 (Cth)</em>.
                  </p>
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] mb-2">
                    18. Official Notice &amp; Operational Directory
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200">
                      <strong className="block text-neutral-900 font-bold mb-1">Blixtor Legal &amp; Notices:</strong>
                      <p className="text-neutral-600">Blixtor Operations &amp; Legal Counsel</p>
                      <p className="text-neutral-600">Email: legal@blixtor.com.au</p>
                      <p className="text-neutral-600">Enquiries: partnerships@blixtor.com.au</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200">
                      <strong className="block text-neutral-900 font-bold mb-1">Partner Operational Contact:</strong>
                      <p className="text-neutral-600">Attn: {metaData.fullName}</p>
                      <p className="text-neutral-600">Title: {metaData.position}</p>
                      <p className="text-neutral-600 font-mono text-[11px]">Email: {metaData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <PageFooter pageNumber={5} />
          </section>

          {/* =========================================================================
              PAGE 6 OF 6: EXECUTED AS AN AGREEMENT (EDITABLE SCREENSHOT SECTION)
          ========================================================================== */}
          <section className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 min-h-[1050px] flex flex-col justify-between text-neutral-800 border border-neutral-200/80 print:shadow-none print:border-none print:rounded-none print:p-8 print:min-h-screen">
            <div>
              <PageHeader />

              {/* Execution Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest border border-emerald-200 mb-2">
                  ✓ Section 19 • Formal Execution Record
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#18034a] tracking-tight uppercase">
                  EXECUTED AS AN AGREEMENT
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  IN WITNESS WHEREOF, the Parties hereto have caused this Memorandum of Understanding to be executed by their duly authorized representatives as of the dates specified below.
                </p>
              </div>

              {/* Redesigned Premium Execution Block (from user screenshot) */}
              <div className="relative bg-[#faf8f5] rounded-2xl border-l-4 border-l-[#5a2df5] border-y border-r border-neutral-200 p-6 sm:p-8 mb-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {/* Left Column: Blixtor Signatory */}
                  <div className="space-y-4">
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#18034a] leading-snug">
                      Signed for and on behalf of Webwise Pty Ltd (Get Course / Blixtor)
                    </h3>

                    {/* Signature Preview */}
                    <div className="h-24 flex items-center justify-start py-2 border-b border-neutral-300">
                      <svg
                        className="w-44 h-16 text-[#18034a]"
                        viewBox="0 0 200 80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 50 C 35 20, 50 15, 60 45 C 70 70, 75 10, 90 35 C 105 55, 110 25, 130 30 C 145 35, 160 40, 180 32 M45 40 L160 38" />
                      </svg>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-baseline justify-between border-b border-neutral-200/80 pb-1.5">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider w-20">
                          Signature
                        </span>
                        <span className="text-neutral-500 font-mono text-[11px]">Digitally Certified (SSL)</span>
                      </div>

                      <div className="flex items-baseline justify-between border-b border-neutral-200/80 pb-1.5">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider w-20">
                          Name
                        </span>
                        <span className="font-bold text-neutral-900 text-sm">Thom Gardner</span>
                      </div>

                      <div className="flex items-baseline justify-between border-b border-neutral-200/80 pb-1.5">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider w-20">
                          Position
                        </span>
                        <span className="font-semibold text-neutral-800">DBA / Head of Systems</span>
                      </div>

                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider w-20">
                          Date
                        </span>
                        <span className="font-mono font-bold text-neutral-900">04/09/2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Organization Signatory (CLICKABLE / EDITABLE) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs sm:text-sm font-extrabold text-[#18034a] leading-snug">
                        Signed for and on behalf of {metaData.organization}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setTempEditForm({ ...metaData });
                          setIsEditModalOpen(true);
                        }}
                        className="text-[10px] font-bold text-[#5a2df5] hover:underline shrink-0 ml-2 print:hidden cursor-pointer"
                      >
                        ✎ Edit
                      </button>
                    </div>

                    {/* Clickable Signature Box */}
                    <div
                      onClick={() => setIsSignModalOpen(true)}
                      className="group h-24 flex items-center justify-center p-3 rounded-xl bg-purple-50/70 hover:bg-purple-100/80 border-2 border-dashed border-[#5a2df5]/50 hover:border-[#5a2df5] text-center cursor-pointer transition-all duration-200 relative overflow-hidden"
                      title="Click to draw or type digital signature"
                    >
                      {signatureImage ? (
                        <div className="flex flex-col items-center justify-center h-full w-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={signatureImage}
                            alt="Digital Signature"
                            className="max-h-14 max-w-[220px] object-contain"
                          />
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-1">
                            ✓ Signature Applied • Click to Change
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-1">
                          <div className="w-7 h-7 rounded-full bg-[#5a2df5]/10 text-[#5a2df5] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                          <span className="text-xs sm:text-sm font-extrabold text-[#5a2df5] tracking-wide">
                            Add signature
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            Click to draw or type signature
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-baseline justify-between border-b border-neutral-200/80 pb-1.5">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider w-20">
                          Signature
                        </span>
                        <span className="text-neutral-500 font-mono text-[11px]">
                          {signatureImage ? "Verified Cryptographic Seal" : "Pending Signature"}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between border-b border-neutral-200/80 pb-1.5">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider w-20">
                          Name
                        </span>
                        <span className="font-bold text-neutral-900 text-sm">{metaData.fullName}</span>
                      </div>

                      <div className="flex items-baseline justify-between border-b border-neutral-200/80 pb-1.5">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider w-20">
                          Position
                        </span>
                        <span className="font-semibold text-neutral-800">{metaData.position}</span>
                      </div>

                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider w-20">
                          Date
                        </span>
                        <span className="font-mono font-bold text-neutral-900">{metaData.signedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cryptographic Verification Audit Card */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-600 space-y-2 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono">
                  <span><strong>Audit Certificate Ref:</strong> {metaData.documentId}</span>
                  <span className="text-emerald-700 font-bold">SHA-256 Validated • Tamper-Proof</span>
                </div>
                <p className="text-[10px] text-neutral-400">
                  This document was electronically generated and signed in compliance with the Electronic Transactions Act 1999 (Cth). Counterparts and electronic copies are legally binding upon execution.
                </p>
              </div>

              {/* =========================================================================
                  SIGN & CONFIRM AUTHORIZATION CHECKBOX & SUBMIT SECTION
              ========================================================================== */}
              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 text-neutral-800 space-y-4 print:hidden">
                <label className="flex items-start gap-3 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#5a2df5] border-neutral-300 focus:ring-[#5a2df5] cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm font-medium text-neutral-800 leading-relaxed group-hover:text-neutral-900">
                    I am authorised to sign for <strong className="text-[#5a2df5]">{metaData.organization}</strong>, I have read this agreement and agree to be bound by it. My electronic signature has the same effect as a handwritten one.
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-purple-100">
                  <div className="text-xs text-neutral-500">
                    {signatureImage ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Signature ready for execution
                      </span>
                    ) : (
                      <span className="text-amber-600 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                        Click signature box to attach your digital signature
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmitAgreement}
                    disabled={!isAgreed}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-bold text-sm sm:text-base shadow-lg transition-all duration-300 ${
                      isAgreed
                        ? "bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] bg-[length:200%_100%] hover:bg-[100%_0] text-white shadow-[#5a2df5]/30 hover:shadow-xl hover:shadow-[#5a2df5]/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                        : "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
                    }`}
                  >
                    <span>Sign and Confirm</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <PageFooter pageNumber={6} />
          </section>
        </div>
      </div>

      {/* =========================================================================
          MODAL 1: EDIT DETAILS MODAL
      ========================================================================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-purple-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#5a2df5]/10 text-[#5a2df5] flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#18034a]">Edit Signatory Details</h3>
                  <p className="text-xs text-neutral-500">Updates will reflect live across the 6-page agreement</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDetails} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={tempEditForm.fullName}
                  onChange={(e) => setTempEditForm({ ...tempEditForm, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#5a2df5] focus:ring-2 focus:ring-[#5a2df5]/20 text-sm outline-hidden font-medium text-neutral-900"
                  placeholder="e.g. Jabbar Shaik"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Business Email
                </label>
                <input
                  type="email"
                  required
                  value={tempEditForm.email}
                  onChange={(e) => setTempEditForm({ ...tempEditForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#5a2df5] focus:ring-2 focus:ring-[#5a2df5]/20 text-sm outline-hidden font-mono text-neutral-900"
                  placeholder="e.g. j.shaik@sovereign.edu.au"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Organization / RTO Name
                </label>
                <input
                  type="text"
                  required
                  value={tempEditForm.organization}
                  onChange={(e) => setTempEditForm({ ...tempEditForm, organization: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#5a2df5] focus:ring-2 focus:ring-[#5a2df5]/20 text-sm outline-hidden font-medium text-neutral-900"
                  placeholder="e.g. Australian Sovereign College Pty Ltd"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Signatory Position / Title
                </label>
                <input
                  type="text"
                  required
                  value={tempEditForm.position}
                  onChange={(e) => setTempEditForm({ ...tempEditForm, position: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#5a2df5] focus:ring-2 focus:ring-[#5a2df5]/20 text-sm outline-hidden font-medium text-neutral-900"
                  placeholder="e.g. Managing Director / CEO"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Execution Date
                </label>
                <input
                  type="text"
                  required
                  value={tempEditForm.signedDate}
                  onChange={(e) => setTempEditForm({ ...tempEditForm, signedDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#5a2df5] focus:ring-2 focus:ring-[#5a2df5]/20 text-sm outline-hidden font-mono text-neutral-900"
                  placeholder="e.g. 10/09/2026"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#5a2df5] hover:bg-[#6b42f6] text-xs font-bold text-white shadow-md shadow-[#5a2df5]/20 transition-all cursor-pointer"
                >
                  Save &amp; Update Agreement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: DIGITAL SIGNATURE DRAW / TYPE MODAL
      ========================================================================== */}
      {isSignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-purple-100">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#5a2df5]/10 text-[#5a2df5] flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#18034a]">Create Digital Signature</h3>
                  <p className="text-xs text-neutral-500">Sign for {metaData.organization}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSignModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-neutral-100 mb-4">
              <button
                type="button"
                onClick={() => setSignatureMode("draw")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  signatureMode === "draw"
                    ? "bg-white text-[#5a2df5] shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                ✍ Draw Signature
              </button>
              <button
                type="button"
                onClick={() => setSignatureMode("type")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  signatureMode === "type"
                    ? "bg-white text-[#5a2df5] shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                ⌨ Type Signature
              </button>
            </div>

            {/* Mode 1: DRAW CANVAS */}
            {signatureMode === "draw" ? (
              <div className="space-y-3">
                <div className="relative border-2 border-dashed border-purple-200 rounded-2xl bg-neutral-50 p-2 overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={440}
                    height={160}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-40 bg-white rounded-xl touch-none cursor-crosshair shadow-inner"
                  />
                  {!hasDrawn && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-neutral-300 text-xs font-medium">
                      Draw your signature here with mouse or touch
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Ink Color: Midnight Purple (Certified)</span>
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="text-xs font-bold text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                  >
                    Clear Drawing
                  </button>
                </div>
              </div>
            ) : (
              /* Mode 2: TYPE SIGNATURE */
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Signatory Name
                  </label>
                  <input
                    type="text"
                    value={typedSignText}
                    onChange={(e) => setTypedSignText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#5a2df5] focus:ring-2 focus:ring-[#5a2df5]/20 text-sm outline-hidden font-medium text-neutral-900"
                    placeholder="Type name here"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                    Choose Script Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedFont("font-signature-1")}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedFont === "font-signature-1"
                          ? "border-[#5a2df5] bg-[#5a2df5]/10 text-[#5a2df5] ring-2 ring-[#5a2df5]/20"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}
                    >
                      <span className="font-serif italic text-base block truncate">
                        {typedSignText || "Signature 1"}
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-1">Cursive Script</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedFont("font-signature-2")}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedFont === "font-signature-2"
                          ? "border-[#5a2df5] bg-[#5a2df5]/10 text-[#5a2df5] ring-2 ring-[#5a2df5]/20"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}
                    >
                      <span className="font-mono italic text-base block truncate">
                        {typedSignText || "Signature 2"}
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-1">Modern Script</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedFont("font-signature-3")}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedFont === "font-signature-3"
                          ? "border-[#5a2df5] bg-[#5a2df5]/10 text-[#5a2df5] ring-2 ring-[#5a2df5]/20"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}
                    >
                      <span className="font-sans italic font-bold text-base block truncate">
                        {typedSignText || "Signature 3"}
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-1">Classic Script</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-6 mt-4 flex items-center justify-end gap-3 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setIsSignModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplySignature}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#5627ed] to-[#794dfc] hover:opacity-95 text-xs font-bold text-white shadow-md shadow-[#5a2df5]/25 transition-all cursor-pointer"
              >
                Apply Signature to Document
              </button>
            </div>
          </div>
        </div>
      )}
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
        <main className="min-h-screen bg-[#323639] py-16 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#5a2df5] border-t-transparent animate-spin" />
        </main>
      }
    >
      <DetailedMouContent params={params} />
    </Suspense>
  );
}

