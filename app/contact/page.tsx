"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type FormFeedback = {
  type: "success" | "error";
  message: string;
};

const INQUIRY_TOPICS = [
  { id: "listing", label: "Course Listing", icon: "📚" },
  { id: "growth", label: "Growth Partnership", icon: "🚀" },
  { id: "leads", label: "Student Enquiries", icon: "🎓" },
  { id: "crm", label: "CRM & Tech Support", icon: "⚡" },
  { id: "general", label: "General Questions", icon: "💬" },
];

const FAQS = [
  {
    question: "How quickly will your team get back to me?",
    answer: "Our Sydney-based partnership team responds to all partner and general inquiries within 2 to 4 business hours during standard AEST operating times.",
  },
  {
    question: "How does the course listing process work for new providers?",
    answer: "Once you connect with us, we will verify your course scope (ASQA/TEQSA/VET), configure your automated CRM delivery endpoints, and have your courses live within 48 to 72 hours.",
  },
  {
    question: "Is there any upfront cost or lock-in contract to speak with Blixtor?",
    answer: "None at all. All initial consultations, market demand analyses, and listing assessments are completely free with zero lock-in commitments.",
  },
  {
    question: "Can I integrate Blixtor enquiries directly into my existing CRM?",
    answer: "Yes! Blixtor natively integrates with Salesforce, HubSpot, JobReady, VETtrak, and custom HTTPS webhooks for instantaneous student record transmission.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    message: "",
    termsAccepted: false,
  });

  const [selectedTopic, setSelectedTopic] = useState<string>("listing");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FormFeedback | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sydneyTime, setSydneyTime] = useState<string>("");

  // Update Sydney AEST Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-AU", {
          timeZone: "Australia/Sydney",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setSydneyTime(timeStr);
      } catch {
        setSydneyTime("Sydney AEST");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleTopicSelect = (topicId: string, topicLabel: string) => {
    setSelectedTopic(topicId);
    if (!formData.message || formData.message.startsWith("[Inquiry:")) {
      setFormData((prev) => ({
        ...prev,
        message: `[Inquiry: ${topicLabel}] `,
      }));
    }
  };

  const handleCopy = (text: string, type: "email" | "phone") => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    }
  };

  const isFormComplete =
    formData.firstName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.message.trim() !== "" &&
    formData.termsAccepted;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFormComplete || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setFormData({
          firstName: "",
          email: "",
          phone: "",
          message: "",
          termsAccepted: false,
        });

        setFeedback({
          type: "success",
          message: result.message || "Thank you for reaching out! Our team will contact you shortly.",
        });
      } else {
        setFeedback({
          type: "error",
          message: result.message || "Unable to send your message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setFeedback({
        type: "error",
        message: "Something went wrong. Please check your network connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#faf9ff] relative">
      {/* Dynamic Ambient Background Elements */}
      <div className="pointer-events-none absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(90,45,245,0.08)_0%,rgba(90,45,245,0)_70%)] blur-3xl animate-pulse-subtle" />
      <div className="pointer-events-none absolute top-1/3 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(142,94,255,0.07)_0%,rgba(142,94,255,0)_70%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(86,39,237,0.06)_0%,rgba(86,39,237,0)_70%)] blur-3xl" />

      {/* =========================================================================
          HERO & CONTACT MAIN SECTION
      ========================================================================== */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-16 sm:pb-24">
        {/* Top Header Badge & Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-200/90 shadow-xs mb-4 hover:border-[#5a2df5]/50 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold text-neutral-800 tracking-wide">
              Online • Avg. Response Under 2 Hours
            </span>
            {sydneyTime && (
              <span className="text-[11px] text-[#5a2df5] font-mono font-semibold pl-1.5 border-l border-neutral-200">
                Sydney {sydneyTime}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#11111b] tracking-tight leading-[1.15] mb-4">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-[#5627ed] via-[#8e5eff] to-[#5627ed] bg-[length:200%_auto] bg-clip-text text-transparent italic">
              Exceptional
            </span>{" "}
            Together
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Whether you&apos;re looking to list courses, accelerate student acquisitions, or explore tailored growth strategies, our Sydney team is ready to assist.
          </p>

          {/* Quick Topic Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mr-1 hidden sm:inline-block">
              I want to discuss:
            </span>
            {INQUIRY_TOPICS.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleTopicSelect(topic.id, topic.label)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedTopic === topic.id
                    ? "bg-[#5a2df5] text-white shadow-md shadow-[#5a2df5]/25 scale-105"
                    : "bg-white text-neutral-700 border border-neutral-200 hover:border-purple-300 hover:bg-purple-50/50"
                }`}
              >
                <span>{topic.icon}</span>
                <span>{topic.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* =========================================================================
              LEFT COLUMN: CONTACT INFO, DIRECT CHANNELS & PROOF
          ========================================================================== */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Cards */}
            <div className="space-y-3.5">
              {/* Email Tile */}
              <div className="group relative bg-white rounded-2xl p-5 border border-purple-100/90 shadow-[0_4px_20px_rgba(90,45,245,0.04)] hover:shadow-lg hover:shadow-[#5a2df5]/10 hover:border-purple-300 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-purple-50 group-hover:bg-[#5a2df5] text-[#5a2df5] group-hover:text-white flex items-center justify-center transition-colors duration-300 shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                        Direct Email Inquiries
                      </span>
                      <strong className="text-sm sm:text-base font-bold text-neutral-900 font-mono block">
                        hello@blixtor.com.au
                      </strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy("hello@blixtor.com.au", "email")}
                    className="p-2 rounded-lg bg-neutral-50 hover:bg-purple-100 text-neutral-500 hover:text-[#5a2df5] text-xs font-semibold transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Phone Tile */}
              <div className="group relative bg-white rounded-2xl p-5 border border-purple-100/90 shadow-[0_4px_20px_rgba(90,45,245,0.04)] hover:shadow-lg hover:shadow-[#5a2df5]/10 hover:border-purple-300 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-purple-50 group-hover:bg-[#5a2df5] text-[#5a2df5] group-hover:text-white flex items-center justify-center transition-colors duration-300 shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                        Australia Toll-Free Phone
                      </span>
                      <strong className="text-sm sm:text-base font-bold text-neutral-900 font-mono block">
                        1300 BLIXTOR (1300 254 986)
                      </strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy("1300 254 986", "phone")}
                    className="p-2 rounded-lg bg-neutral-50 hover:bg-purple-100 text-neutral-500 hover:text-[#5a2df5] text-xs font-semibold transition-colors cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedPhone ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Office Location Tile */}
              <div className="bg-white rounded-2xl p-5 border border-purple-100/90 shadow-[0_4px_20px_rgba(90,45,245,0.04)]">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-[#5a2df5] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                      Sydney Headquarters
                    </span>
                    <strong className="text-sm sm:text-base font-bold text-neutral-900 block leading-snug">
                      Level 24, International Towers
                    </strong>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      300 Barangaroo Avenue, Sydney NSW 2000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Team / Office Card */}
            <div className="relative rounded-2xl overflow-hidden border border-purple-100/90 bg-gradient-to-br from-[#18034a] to-[#2e0f7e] p-6 text-white shadow-xl">
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-xs">
                  <span>★ Trusted by 80+ Australian Institutions</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold leading-snug">
                  Transforming Student Acquisition for Modern Australian Education Providers
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                  Join leading RTOs, TAFEs, and higher-ed providers already growing their high-intent student enquiries with Blixtor.
                </p>
              </div>

              {/* Decorative Subtle Image */}
              <div className="relative mt-4 h-36 w-full rounded-xl overflow-hidden opacity-85">
                <Image
                  src="/lastpageimage.svg"
                  alt="Blixtor Education Consultancy"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: INTERACTIVE HIGH-PERFORMANCE FORM
          ========================================================================== */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-purple-100/90 p-7 sm:p-10 shadow-[0_16px_50px_rgba(90,45,245,0.06)] relative overflow-hidden">
              {/* Top Accent Gradient Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5627ed] via-[#8e5eff] to-[#5627ed]" />

              <div className="mb-6 pb-6 border-b border-purple-100">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#11111b] tracking-tight">
                  Send Us a Message
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Fill in your details below and a dedicated consultant will connect with you promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* First & Last Name Input */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5"
                  >
                    Your Name <span className="text-[#5a2df5]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        })
                      }
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full h-12 px-4 rounded-xl border border-neutral-200/90 bg-neutral-50/50 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 outline-hidden transition-all focus:bg-white focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10"
                    />
                  </div>
                </div>

                {/* Grid for Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5"
                    >
                      Business Email <span className="text-[#5a2df5]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      placeholder="s.jenkins@institution.edu.au"
                      className="w-full h-12 px-4 rounded-xl border border-neutral-200/90 bg-neutral-50/50 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 outline-hidden transition-all focus:bg-white focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 font-mono text-xs sm:text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5"
                    >
                      Phone Number <span className="text-[#5a2df5]">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value.replace(/[^0-9+()\- ]/g, ""),
                        })
                      }
                      placeholder="+61 400 123 456"
                      className="w-full h-12 px-4 rounded-xl border border-neutral-200/90 bg-neutral-50/50 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 outline-hidden transition-all focus:bg-white focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 font-mono text-xs sm:text-sm"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
                    >
                      How can we help you? <span className="text-[#5a2df5]">*</span>
                    </label>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {formData.message.length} chars
                    </span>
                  </div>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    placeholder="Tell us about your organization, courses, student acquisition targets, or any specific questions..."
                    className="w-full p-4 rounded-xl border border-neutral-200/90 bg-neutral-50/50 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 outline-hidden transition-all resize-none focus:bg-white focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10"
                  />
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <input
                      type="checkbox"
                      required
                      checked={formData.termsAccepted}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          termsAccepted: e.target.checked,
                        })
                      }
                      className="mt-0.5 h-4 w-4 rounded-md border-neutral-300 text-[#5a2df5] focus:ring-[#5a2df5] cursor-pointer"
                    />
                    <span className="text-xs text-neutral-600 leading-relaxed group-hover:text-neutral-900">
                      I agree to Blixtor&apos;s{" "}
                      <Link href="/terms" className="text-[#5a2df5] font-semibold hover:underline">
                        Terms &amp; Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#5a2df5] font-semibold hover:underline">
                        Privacy Policy
                      </Link>
                      . <span className="text-[#5a2df5]">*</span>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormComplete || isSubmitting}
                  className="w-full h-13 rounded-xl bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] bg-[length:200%_100%] hover:bg-[100%_0] text-white text-base font-bold shadow-lg shadow-[#5a2df5]/25 hover:shadow-xl hover:shadow-[#5a2df5]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Your Message</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-neutral-400">
                  🔒 Encrypted 256-bit SSL Transmission • Zero spam guarantee
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FAQ ACCORDION SECTION
        ========================================================================== */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-purple-100/90 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5a2df5] block mb-1">
              Need Instant Answers?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11111b] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-purple-100/80 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-neutral-900 hover:text-[#5a2df5] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`w-6 h-6 rounded-full bg-purple-50 text-[#5a2df5] flex items-center justify-center text-xs shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-[#5a2df5] text-white" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-purple-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODAL: FEEDBACK POPUP
      ========================================================================== */}
      {feedback && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-3xl border border-purple-100 bg-white p-7 sm:p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div
              className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold ${
                feedback.type === "success"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {feedback.type === "success" ? "✓" : "!"}
            </div>

            <h3 className="text-xl font-extrabold text-[#11111b] mb-2">
              {feedback.type === "success" ? "Inquiry Dispatched!" : "Submission Notice"}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
              {feedback.message}
            </p>

            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="w-full h-11 rounded-xl bg-[#5a2df5] hover:bg-[#6b42f6] text-sm font-bold text-white shadow-md shadow-[#5a2df5]/25 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
