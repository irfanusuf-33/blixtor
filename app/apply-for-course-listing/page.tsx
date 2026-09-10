"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "../_components/site-shell";

// Custom animated counter hook for smooth count-up effect
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, end, duration]);

  return { count, elementRef };
}

// Stats Card with Animated Counter
function StatCard({
  targetNumber,
  prefix = "",
  suffix = "",
  staticValue,
  label,
  sublabel,
  icon,
}: {
  targetNumber?: number;
  prefix?: string;
  suffix?: string;
  staticValue?: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}) {
  const { count, elementRef } = useCountUp(targetNumber ?? 0, 2200);

  return (
    <div
      ref={elementRef}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-purple-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(90,45,245,0.12)] hover:border-[#5a2df5]/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
    >
      {/* Top hover accent beam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a2df5] via-[#8e5eff] to-[#a78bfa] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Icon & Category pill */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#5a2df5]/10 text-[#5a2df5] group-hover:bg-[#5a2df5] group-hover:text-white transition-all duration-300">
            {icon}
          </div>
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            Verified Metric
          </span>
        </div>

        {/* Counter Number / Static Value */}
        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#11111b] mb-1">
          {staticValue ? (
            <span className="bg-[linear-gradient(135deg,#11111b_0%,#5a2df5_100%)] bg-clip-text text-transparent">
              {staticValue}
            </span>
          ) : (
            <span className="bg-[linear-gradient(135deg,#11111b_0%,#5a2df5_100%)] bg-clip-text text-transparent">
              {prefix}
              {count.toLocaleString()}
              {suffix}
            </span>
          )}
        </div>

        {/* Label */}
        <h3 className="text-base font-bold text-neutral-800 group-hover:text-[#5a2df5] transition-colors duration-200 mb-1">
          {label}
        </h3>
      </div>

      {/* Subtext description */}
      <p className="text-xs text-neutral-500 leading-relaxed pt-3 border-t border-neutral-100 mt-2">
        {sublabel}
      </p>
    </div>
  );
}

const STEPS_DATA = [
  {
    step: "01",
    title: "Get in Touch",
    heading: "1. Connect & Initial Consultation",
    description:
      "Submit your training organization or institution details. Our dedicated partnership team will consult with you to understand your course offerings, target student demographics, and enrolment goals.",
    badge: "Fast Onboarding",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Verification Process",
    heading: "2. Accreditation & Quality Audit",
    description:
      "We review your RTO scope, national registration credentials (ASQA/TEQSA/equivalent), and course quality standards to ensure all listings meet strict Australian regulatory frameworks and learner trust.",
    badge: "Compliance Check",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "List Courses",
    heading: "3. Seamless Course Onboarding",
    description:
      "Our content specialists and marketing strategists create high-converting course landing pages with optimized curriculum outlines, career outcomes, delivery modes, and rich metadata to maximize search visibility.",
    badge: "Zero Setup Cost",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "We Send You Enquiries",
    heading: "4. Targeted Student Enquiry Generation",
    description:
      "Through targeted search, social, and programmatic education funnels, we connect high-intent, pre-qualified students searching for your exact qualifications directly into your admissions pipeline in real time.",
    badge: "Real-Time Leads",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Student Enrolment",
    heading: "5. High-Conversion Student Enrolments",
    description:
      "Your course advisors and admissions staff contact warm prospective students to conduct suitability assessments, answer curriculum questions, and guide qualified learners into active enrolled cohorts.",
    badge: "Maximise Yield",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    step: "06",
    title: "You Pay for Results",
    heading: "6. Performance-Based Pay-Per-Result",
    description:
      "Eliminate wasted marketing budgets and upfront risk. You only pay for verified, genuine student leads delivered. No lock-in contracts, no hidden monthly maintenance fees—pure performance transparency.",
    badge: "Zero Upfront Risk",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export const partnershipModels = [
  {
    title: "Listing Partner",
    description:
      "Expand your reach with an additional stream of prospective students. Showcase your courses to learners actively exploring their options and pay only for genuine enquiries.",
    benefits: [
      "Simple, fixed pricing for every qualified enquiry",
      "Pay only for genuine and contactable leads",
      "No monthly commitments or long-term contracts",
      "Enquiries delivered directly to your CRM",
      "A flexible channel to complement your existing marketing",
    ],
  },
  {
    title: "Growth Partner",
    subtitle: "For Serious Growth",
    description:
      "Accelerate your student acquisition with a dedicated growth strategy. We manage and optimise your acquisition efforts around your enrolment goals to deliver consistent, measurable results.",
    benefits: [
      "End-to-end management of your acquisition campaigns",
      "Focused on achieving your target cost per enrolment",
      "Data-driven strategies designed for sustainable growth",
      "Dedicated team focused on your growth",
      "Clear and transparent performance reporting",
    ],
  },
];

export const FAQ_DATA = [
  {
    question: "How much does it cost to list our courses with Blixtor?",
    answer:
      "Listing your courses on Blixtor is 100% free with zero upfront setup charges, onboarding fees, or monthly retainers. You only pay for verified, genuine student enquiries delivered to your admissions team on a transparent, performance-based pay-per-lead model.",
  },
  {
    question: "How are prospective student enquiries delivered to our team?",
    answer:
      "Enquiries are delivered instantaneously in real time. We integrate directly with major education CRMs (including Salesforce, HubSpot, Zoho, JobReady, aXcelerate, and more) via direct API, secure webhooks, or encrypted email notifications so your admissions team can follow up immediately.",
  },
  {
    question: "Are we locked into any long-term contracts or commitments?",
    answer:
      "No. There are zero lock-in contracts or mandatory commitments. You retain complete flexibility to adjust volume, pause campaigns, or scale your lead intake according to your upcoming cohort capacity and enrollment deadlines.",
  },
  {
    question: "What types of courses and qualification levels can we list?",
    answer:
      "You can list all accredited and recognized qualification levels—including Certificate I through Certificate IV, Diplomas, Advanced Diplomas, Graduate Certificates, Bachelor/Master degrees, and accredited micro-credentials. We support 100% Online, Blended, and Campus + Workplace Placement delivery modes.",
  },
  {
    question: "How quickly can our course listings go live and start generating leads?",
    answer:
      "Once your registration details and RTO/institution accreditation are verified (typically within 24 hours), our editorial team creates and optimizes your course landing pages. Your listings can be live and generating prospective student enquiries within 48 to 72 business hours.",
  },
  {
    question: "How does Blixtor verify lead quality and prospective student intent?",
    answer:
      "Every enquiry undergoes automated verification (email deliverability, phone number validation, and duplicate prevention) combined with student qualification filters. Your team only receives reachable, high-intent prospective learners actively seeking course information.",
  },
  {
    question: "Can we set volume caps on the number of leads we receive?",
    answer:
      "Yes. You have full control to configure custom weekly or monthly lead caps per course or discipline, ensuring lead delivery aligns precisely with your admissions bandwidth and upcoming intake limits.",
  },
  {
    question: "What reporting and dedicated account management is included?",
    answer:
      "All partner providers receive a dedicated education account manager, real-time lead delivery logs, and periodic conversion performance reviews to help maximize enrolment outcomes.",
  },
];

export default function ApplyForCourseListing() {
  const [formData, setFormData] = useState({
    providerName: "",
    contactName: "",
    email: "",
    phone: "",
    providerType: "RTO (Registered Training Organisation)",
    courseCount: "1 - 5 Courses",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate swift submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <main className="w-full overflow-hidden bg-white">
      {/* =========================================================================
          SECTION 1: HERO SECTION
          Heading: "Bring Your Courses To Students Ready To Learn"
          Button: "Apply For Listing"
      ========================================================================== */}
      <section
        className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,#ebe3ff_0%,#f6f2ff_45%,#ffffff_100%)] pt-12 pb-16 sm:pt-16 sm:pb-24 px-6 sm:px-10 lg:px-16"
        aria-labelledby="provider-hero-heading"
      >
        {/* Ambient Glowing Orbs */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 w-[580px] h-[580px] rounded-full bg-[radial-gradient(circle,rgba(168,135,255,0.28)_0%,rgba(90,45,245,0)_70%)] blur-3xl -z-10 animate-pulse-subtle"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 left-[-15%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(215,198,255,0.35)_0%,rgba(240,230,255,0)_70%)] blur-3xl -z-10"
          aria-hidden="true"
        />

        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-10">
          {/* Left Column: Heading, Description & Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start max-lg:items-center max-lg:text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200/90 shadow-xs mb-6 transition-all duration-300 hover:border-purple-300 hover:bg-white hover:shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5a2df5] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5a2df5]" />
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#5a2df5]">
                Course Provider &amp; RTO Partnership Program
              </span>
            </div>

            {/* Main Heading */}
            <h1
              id="provider-hero-heading"
              className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold tracking-tight text-[#11111b] leading-[1.12] mb-6 max-w-[740px]"
            >
              Bring Your Courses To Students{" "}
              <span className="bg-[linear-gradient(135deg,#5a2df5_0%,#8e5eff_50%,#5a2df5_100%)] bg-clip-text text-transparent italic">
                Ready To Learn
              </span>
            </h1>

            {/* Description */}
            <p className="text-neutral-600 text-base sm:text-lg lg:text-[19px] font-normal leading-relaxed max-w-[650px] mb-8">
              Partner with Blixtor to scale your student enrolments with zero upfront
              advertising risk. We connect registered training organizations (RTOs) and accredited
              education providers with verified, high-intent learners across Australia on a pure
              performance model.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="#apply-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl sm:rounded-full bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] bg-[length:200%_100%] hover:bg-[100%_0] text-white text-base font-semibold shadow-lg shadow-[#5a2df5]/30 hover:shadow-xl hover:shadow-[#5a2df5]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <span>Apply For Listing</span>
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
              </a>

              <a
                href="#steps-flow"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl sm:rounded-full bg-white hover:bg-purple-50 text-neutral-800 text-base font-semibold border border-purple-200/80 shadow-xs hover:border-[#5a2df5]/40 transition-all duration-200"
              >
                <span>How It Works</span>
                <svg className="w-4 h-4 text-[#5a2df5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Highlight Badges */}
            <div className="flex items-center flex-wrap gap-4 pt-8 mt-8 border-t border-purple-100/80 text-xs sm:text-sm font-medium text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Zero Upfront Setup Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5a2df5]" />
                <span>Pay-Per-Qualified-Lead</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>Nationwide Australian Reach</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Feature Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#5a2df5]/25 via-[#a78bfa]/20 to-transparent rounded-3xl blur-2xl -z-10" />

            <div className="w-full max-w-[460px] flex flex-col gap-4">
              {/* Card 1: Provider Dashboard Card */}
              <div className="animate-float bg-white/95 backdrop-blur-xl p-6 rounded-2xl border border-purple-200/80 shadow-[0_12px_36px_rgba(90,45,245,0.1)]">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5a2df5] text-white flex items-center justify-center font-bold text-sm">
                      AU
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">
                        National Education Network
                      </h4>
                      <p className="text-xs text-neutral-500">Live Provider Feed</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active Influx
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/60 border border-purple-100/80">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-neutral-800">
                        Diploma of Leadership &amp; Management
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        Pre-screened enquiry delivered
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-[#5a2df5]">
                      Just now
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/60 border border-purple-100/80">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-neutral-800">
                        Certificate III in Individual Support
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        High-intent student prospect
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-[#5a2df5]">
                      2m ago
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/60 border border-purple-100/80">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-neutral-800">
                        Certificate IV in Fitness (Personal Trainer)
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        Verified student application
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-[#5a2df5]">
                      5m ago
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-xs text-neutral-500">
                  <span>Enquiry Quality Rate:</span>
                  <strong className="text-neutral-900 font-bold">94.8% Validated</strong>
                </div>
              </div>

              {/* Floating Mini Badge */}
              <div
                style={{ animationDelay: "1.8s" }}
                className="animate-float self-end mr-4 -mt-2 bg-neutral-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border border-neutral-700/60"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold leading-none">Pay For Results Only</p>
                  <p className="text-[10px] text-neutral-400">100% Risk Free Model</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: STATS SECTION WITH ANIMATED COUNTERS
          Metrics:
          - Total Enquiries (150,000+)
          - Total Courses Listed (1,200+)
          - Active Partners (85+)
          - Operations At (AU / Australia-wide)
          - Payment Mode (Per Lead / Pay-Per-Result)
      ========================================================================== */}
      <section
        className="py-16 sm:py-20 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-white via-[#faf8ff] to-white border-y border-purple-100/70"
        aria-labelledby="stats-heading"
      >
        <div className="max-w-[1360px] mx-auto">
          <SectionHeading
            className="mb-3"
            headingClassName="text-[30px] sm:text-[36px] font-extrabold text-[#11111b]"
            spanSizeClassName="w-[70px] sm:w-[100px]"
          >
            Network Scale &amp; Performance
          </SectionHeading>

          <p className="text-center text-neutral-600 text-base sm:text-lg max-w-[660px] mx-auto mb-12">
            Delivering measurable growth, verified student acquisitions, and proven results
            for Australia&apos;s leading education providers.
          </p>

          {/* Grid of 5 Stat Cards with Animated Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
            {/* Stat 1: Total Enquiries */}
            <StatCard
              targetNumber={150000}
              suffix="+"
              label="Total Enquiries"
              sublabel="High-intent prospective student enquiries generated across our network."
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />

            {/* Stat 2: Total Courses Listed */}
            <StatCard
              targetNumber={1200}
              suffix="+"
              label="Courses Listed"
              sublabel="Accredited diplomas, certificates, and skill sets live across 49+ disciplines."
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />

            {/* Stat 3: Active Partners */}
            <StatCard
              targetNumber={85}
              suffix="+"
              label="Active Partners"
              sublabel="Top-tier Australian RTOs, TAFEs, universities, and specialized academies."
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />

            {/* Stat 4: Operations At */}
            <StatCard
              staticValue="AU"
              label="Operations (AU)"
              sublabel="Operating nationwide across NSW, VIC, QLD, WA, SA, TAS, ACT &amp; NT."
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            {/* Stat 5: Payment Mode */}
            <StatCard
              staticValue="Per Lead"
              label="Pay-Per-Result"
              sublabel="Zero fixed fees or monthly retainers. Only pay for verified student leads."
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: STEPS INVOLVED
          Flow:
          1. Get in touch
          2. Verification process
          3. List courses
          4. We sent you enquiries
          5. Student enrolment
          6. You pay for the results
      ========================================================================== */}
      <section
        id="steps-flow"
        className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-white"
        aria-labelledby="steps-heading"
      >
        <div className="max-w-[1360px] mx-auto">
          {/* Section Heading with Strategic Marketing Focus */}
          <SectionHeading
            className="mb-4"
            headingClassName="text-[32px] sm:text-[38px] font-extrabold text-[#11111b]"
            spanSizeClassName="w-[80px] sm:w-[110px]"
          >
            How Our Partnership Works
          </SectionHeading>

          <p className="text-center text-neutral-600 text-base sm:text-lg max-w-[720px] mx-auto mb-14 sm:mb-16">
            A frictionless, performance-driven 6-step lifecycle designed to turn prospective student interest
            into confirmed course enrolments with zero upfront marketing risk.
          </p>

          {/* 6 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {STEPS_DATA.map((item, index) => {
              return (
                <div
                  key={item.step}
                  className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white border border-purple-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(90,45,245,0.12)] hover:border-[#5a2df5]/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                >
                  {/* Top Step Number Header */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5a2df5]/10 to-[#8e5eff]/20 text-[#5a2df5] group-hover:bg-[#5a2df5] group-hover:text-white transition-all duration-300">
                        {item.icon}
                      </span>
                      <span className="text-2xl font-extrabold text-neutral-300 group-hover:text-[#5a2df5] transition-colors duration-200">
                        {item.step}
                      </span>
                    </div>

                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-[#5a2df5] border border-purple-200/60 group-hover:bg-[#5a2df5]/10 transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Heading */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#11111b] group-hover:text-[#5a2df5] transition-colors duration-200 mb-3">
                      {item.heading}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Step Footer with Flow Indicator */}
                  <div className="pt-4 mt-5 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-400 group-hover:text-[#5a2df5] transition-colors">
                    <span>Lifecycle Phase {index + 1} of 6</span>
                    <span className="text-base font-bold">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: PARTNERSHIP MODELS
          Featuring Listing Partner & Growth Partner models
      ========================================================================== */}
      <section
        id="partnership-models"
        className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-[#faf8ff] via-white to-[#faf8ff] border-t border-purple-100/80"
        aria-labelledby="partnership-models-heading"
      >
        <div className="max-w-[1360px] mx-auto">
          <SectionHeading
            className="mb-4"
            headingClassName="text-[32px] sm:text-[38px] font-extrabold text-[#11111b]"
            spanSizeClassName="w-[80px] sm:w-[110px]"
          >
            Partnership Models
          </SectionHeading>

          <p className="text-center text-neutral-600 text-base sm:text-lg max-w-[700px] mx-auto mb-14">
            Select the engagement framework tailored to your enrolment objectives—from pay-per-lead
            course visibility to a fully managed, data-driven student acquisition engine.
          </p>

          {/* 2 Models Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1140px] mx-auto items-stretch">
            {partnershipModels.map((model) => {
              const isGrowth = model.title === "Growth Partner";
              return (
                <div
                  key={model.title}
                  className={`group relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 ${
                    isGrowth
                      ? "bg-gradient-to-b from-white via-[#fcfaff] to-[#f7f2ff] border-2 border-[#5a2df5] shadow-[0_12px_40px_rgba(90,45,245,0.15)] hover:shadow-[0_20px_50px_rgba(90,45,245,0.22)] hover:-translate-y-1.5"
                      : "bg-white border border-purple-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(90,45,245,0.1)] hover:border-[#5a2df5]/50 hover:-translate-y-1.5"
                  }`}
                >
                  {/* Top Badge Tag */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide ${
                        isGrowth
                          ? "bg-[#5a2df5] text-white shadow-sm shadow-[#5a2df5]/30"
                          : "bg-purple-100/80 text-[#5a2df5]"
                      }`}
                    >
                      {isGrowth ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{model.subtitle || "For Serious Growth"}</span>
                        </>
                      ) : (
                        <span>Performance Model</span>
                      )}
                    </span>

                    <span className="text-xs font-semibold text-neutral-400">
                      {isGrowth ? "Comprehensive" : "On-Demand"}
                    </span>
                  </div>

                  <div>
                    {/* Model Title */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#11111b] mb-3 tracking-tight">
                      {model.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-8">
                      {model.description}
                    </p>

                    {/* Inclusions List */}
                    <div className="pt-6 border-t border-purple-100/80 mb-8">
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-4">
                        Key Inclusions &amp; Advantages:
                      </h4>

                      <ul className="space-y-3.5">
                        {model.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-neutral-700 leading-snug">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <a
                    href="#apply-form"
                    className={`w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 ${
                      isGrowth
                        ? "bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] bg-[length:200%_100%] hover:bg-[100%_0] text-white shadow-md shadow-[#5a2df5]/25 hover:shadow-lg hover:shadow-[#5a2df5]/40"
                        : "bg-purple-50 hover:bg-[#5a2df5] text-[#5a2df5] hover:text-white border border-purple-200/80 hover:border-transparent"
                    }`}
                  >
                    <span>{isGrowth ? "Apply for Growth Partnership" : "Apply as Listing Partner"}</span>
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
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PARTNER APPLICATION FORM
          Direct on-page submission for training providers and RTOs
      ========================================================================== */}
      <section
        id="apply-form"
        className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,#f5f0ff_0%,#ffffff_100%)] border-t border-purple-100/80"
        aria-labelledby="apply-form-heading"
      >
        <div className="max-w-[960px] mx-auto">
          <SectionHeading
            className="mb-3"
            headingClassName="text-[30px] sm:text-[36px] font-extrabold text-[#11111b]"
            spanSizeClassName="w-[70px] sm:w-[100px]"
          >
            Apply For Course Listing
          </SectionHeading>

          <p className="text-center text-neutral-600 text-base sm:text-lg max-w-[620px] mx-auto mb-10">
            Submit your provider details below to start receiving pre-screened student enquiries.
            Our partnership team will get in touch within 1 business day.
          </p>

          <div className="bg-white p-7 sm:p-10 rounded-3xl border border-purple-200/90 shadow-xl shadow-purple-950/5">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-extrabold text-neutral-900 mb-2">
                  Application Received!
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base max-w-md mb-6">
                  Thank you for submitting your course listing application. An education partnership
                  manager will review your details and contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#5a2df5] text-white text-sm font-semibold hover:bg-[#481ecc] transition-all"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Provider Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                      Provider / RTO Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.providerName}
                      onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
                      placeholder="e.g. Australian Institute of Technology"
                      className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-3 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Contact Person */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-3 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="partnerships@provider.edu.au"
                      className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-3 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                      Direct Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 1300 000 000 / 0400 000 000"
                      className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-3 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Provider Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                      Provider Category
                    </label>
                    <select
                      value={formData.providerType}
                      onChange={(e) => setFormData({ ...formData, providerType: e.target.value })}
                      className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-3 focus:ring-[#5a2df5]/10 text-neutral-900 cursor-pointer"
                    >
                      <option value="RTO (Registered Training Organisation)">
                        RTO (Registered Training Organisation)
                      </option>
                      <option value="Higher Education / University">
                        Higher Education / University
                      </option>
                      <option value="Non-Accredited / Professional Short Courses">
                        Non-Accredited / Professional Short Courses
                      </option>
                      <option value="Industry Association / CPD Provider">
                        Industry Association / CPD Provider
                      </option>
                      <option value="Other Provider">Other Provider</option>
                    </select>
                  </div>

                  {/* Estimated Course Count */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                      Estimated Courses to List
                    </label>
                    <select
                      value={formData.courseCount}
                      onChange={(e) => setFormData({ ...formData, courseCount: e.target.value })}
                      className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-3 focus:ring-[#5a2df5]/10 text-neutral-900 cursor-pointer"
                    >
                      <option value="1 - 5 Courses">1 - 5 Courses</option>
                      <option value="6 - 15 Courses">6 - 15 Courses</option>
                      <option value="16 - 30 Courses">16 - 30 Courses</option>
                      <option value="30+ Courses">30+ Courses</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                    Course Scope &amp; Target Qualifications
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your qualification areas (e.g., Aged Care, Leadership, Beauty, Agriculture) and your delivery modes..."
                    className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-3 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-13 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] bg-[length:200%_100%] hover:bg-[100%_0] text-white text-base font-bold shadow-lg shadow-[#5a2df5]/25 hover:shadow-xl hover:shadow-[#5a2df5]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Partner Application</span>
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M17 17V7H7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FREQUENTLY ASKED QUESTIONS (FAQ)
      ========================================================================== */}
      <section
        id="faq"
        className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-white border-t border-purple-100/80"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-[960px] mx-auto">
          <SectionHeading
            className="mb-4"
            headingClassName="text-[32px] sm:text-[38px] font-extrabold text-[#11111b]"
            spanSizeClassName="w-[80px] sm:w-[110px]"
          >
            Frequently Asked Questions
          </SectionHeading>

          <p className="text-center text-neutral-600 text-base sm:text-lg max-w-[650px] mx-auto mb-12">
            Everything you need to know about listing your courses, lead qualification,
            CRM delivery, and performance pricing models.
          </p>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#5a2df5]/50 bg-gradient-to-r from-purple-50/40 via-white to-purple-50/20 shadow-md shadow-[#5a2df5]/5"
                      : "border-purple-100/90 bg-white hover:border-purple-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#11111b] leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-[#5a2df5] text-white rotate-180"
                          : "bg-purple-100/80 text-[#5a2df5]"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[300px] opacity-100 px-5 sm:px-6 pb-6" : "max-h-0 opacity-0 px-5 sm:px-6 py-0"
                    }`}
                  >
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pt-2 border-t border-purple-100/70">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FOOTER CTA
      ========================================================================== */}
      <section
        style={{
          backgroundImage: "url('/Group 6.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative mx-6 sm:mx-10 lg:mx-16 mb-16 h-auto min-h-[360px] overflow-hidden rounded-2xl text-center text-white px-6 py-14 max-w-[1360px] mx-auto"
      >
        <div className="relative z-[1] mx-auto flex h-full max-w-[760px] flex-col items-center justify-center">
          <SectionHeading
            className="mb-4"
            headingClassName="text-white text-[22px] sm:text-[26px]"
            spanSizeClassName="w-[70px] sm:w-[100px]"
            leftBgClassName="bg-[linear-gradient(90deg,transparent_0%,#7b49ff_24%,#ffffff_100%)]"
            rightBgClassName="bg-[linear-gradient(90deg,#ffffff_0%,#7b49ff_76%,transparent_100%)]"
          >
            Ready to Accelerate Enrolments?
          </SectionHeading>

          <h2 className="m-0 mb-3 text-2xl sm:text-3xl font-bold leading-tight">
            Partner with Blixtor to Fill Your Course Intakes
          </h2>

          <p className="mb-8 text-sm sm:text-base leading-relaxed text-[#eee8ff] max-w-[620px]">
            Zero fixed fees, zero setup risks. Start receiving pre-screened student enquiries tailored
            to your specific course capacity.
          </p>

          <Link
            className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#5a2df5] px-7 text-base font-semibold text-white shadow-lg shadow-[#5a2df5]/30 hover:bg-[#481ecc] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
            href="/contact"
          >
            <span>Talk to a Partnership Advisor</span>
            <Image
              src="/Phone.svg"
              alt=""
              width={18}
              height={18}
              aria-hidden="true"
              className="h-[18px] w-[18px] shrink-0"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}