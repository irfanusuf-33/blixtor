"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface StudentLead {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  location: string;
  courseTitle: string;
  category: string;
  level: string;
  status: "New" | "Contacted" | "Qualified" | "Enrolled" | "Lost";
  advisor: string;
  createdAt: string;
  intentScore: number;
}

const INITIAL_LEADS: StudentLead[] = [
  {
    id: "lead-1001",
    studentName: "Chloe Davenport",
    email: "chloe.davenport@gmail.com",
    phone: "0412 884 921",
    location: "Sydney, NSW",
    courseTitle: "Diploma of Leadership and Management",
    category: "Business & Management",
    level: "Diploma",
    status: "New",
    advisor: "Liam Walker",
    createdAt: "10 mins ago",
    intentScore: 96,
  },
  {
    id: "lead-1002",
    studentName: "Marcus Bennett",
    email: "m.bennett94@outlook.com",
    phone: "0423 711 054",
    location: "Melbourne, VIC",
    courseTitle: "Certificate III in Individual Support (Ageing)",
    category: "Aged Care & Disability",
    level: "Certificate III",
    status: "Contacted",
    advisor: "Sarah Jenkins",
    createdAt: "35 mins ago",
    intentScore: 92,
  },
  {
    id: "lead-1003",
    studentName: "Emily Zhao",
    email: "emily.zhao@yahoo.com.au",
    phone: "0439 120 488",
    location: "Brisbane, QLD",
    courseTitle: "Certificate IV in Fitness (Personal Trainer)",
    category: "Health & Fitness",
    level: "Certificate IV",
    status: "Qualified",
    advisor: "Liam Walker",
    createdAt: "2 hours ago",
    intentScore: 88,
  },
  {
    id: "lead-1004",
    studentName: "Daniel Cooper",
    email: "d.cooper88@hotmail.com",
    phone: "0401 559 312",
    location: "Perth, WA",
    courseTitle: "Certificate III in Animal Care Services",
    category: "Animal Care & Welfare",
    level: "Certificate III",
    status: "Enrolled",
    advisor: "Sarah Jenkins",
    createdAt: "5 hours ago",
    intentScore: 100,
  },
  {
    id: "lead-1005",
    studentName: "Sophie Taylor",
    email: "sophie.t@icloud.com",
    phone: "0429 804 167",
    location: "Adelaide, SA",
    courseTitle: "Advanced Diploma of Marketing and Communication",
    category: "Marketing & Digital",
    level: "Advanced Diploma",
    status: "Contacted",
    advisor: "Elena Rostova",
    createdAt: "Yesterday",
    intentScore: 85,
  },
  {
    id: "lead-1006",
    studentName: "Jackson Miller",
    email: "jmiller_perth@gmail.com",
    phone: "0418 290 334",
    location: "Hobart, TAS",
    courseTitle: "Diploma of Beauty Therapy",
    category: "Beauty & Wellness",
    level: "Diploma",
    status: "New",
    advisor: "Elena Rostova",
    createdAt: "Yesterday",
    intentScore: 90,
  },
];

const TOP_PERFORMING_COURSES = [
  {
    title: "Diploma of Leadership & Management",
    code: "BSB50420",
    leadsThisMonth: 342,
    enrolled: 94,
    conversionRate: "27.5%",
    revenue: "$26,790",
  },
  {
    title: "Certificate III in Individual Support",
    code: "CHC33021",
    leadsThisMonth: 289,
    enrolled: 81,
    conversionRate: "28.0%",
    revenue: "$22,680",
  },
  {
    title: "Certificate IV in Fitness",
    code: "SIS40221",
    leadsThisMonth: 215,
    enrolled: 54,
    conversionRate: "25.1%",
    revenue: "$17,280",
  },
  {
    title: "Certificate III in Animal Care Services",
    code: "ACM30121",
    leadsThisMonth: 184,
    enrolled: 49,
    conversionRate: "26.6%",
    revenue: "$14,700",
  },
];

const CATEGORY_STATS = [
  { name: "Business & Management", percentage: 32, count: 457, color: "bg-[#5a2df5]" },
  { name: "Aged Care & Community", percentage: 26, count: 371, color: "bg-[#8e5eff]" },
  { name: "Health & Fitness", percentage: 18, count: 257, color: "bg-[#06b6d4]" },
  { name: "Animal Care & Welfare", percentage: 14, count: 200, color: "bg-[#10b981]" },
  { name: "Beauty & Marketing", percentage: 10, count: 143, color: "bg-[#f59e0b]" },
];

export default function CrmDashboard() {
  const [leads, setLeads] = useState<StudentLead[]>(INITIAL_LEADS);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Status metrics
  const totalLeads = 1428;
  const coursesAddedThisMonth = 24;
  const enrolledCount = 386;
  const pipelineValue = "$184,500";

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lead.studentName.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.courseTitle.toLowerCase().includes(q) ||
        lead.location.toLowerCase().includes(q);

      const matchesStatus =
        selectedStatusFilter === "ALL" || lead.status === selectedStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, selectedStatusFilter]);

  // Lead status updater
  const handleStatusChange = (leadId: string, newStatus: StudentLead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    setToastMessage(`Lead status updated to ${newStatus}.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <main className="min-h-screen bg-[#faf9ff] py-8 sm:py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1360px] mx-auto space-y-8">
        {/* =========================================================
            HEADER & HERO GREETING BAR
        ========================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#18034a] via-[#2d0f7a] to-[#4018a7] text-white shadow-xl shadow-purple-950/15 relative overflow-hidden">
          {/* Ambient Background Glows */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-purple-200 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Enterprise CRM Portal • Live Operational Feed</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              Welcome back, Admin
            </h1>

            <p className="text-xs sm:text-sm text-[#d5cbf8] max-w-xl">
              Track student lead influx, review monthly course additions, monitor admissions
              conversions, and manage your institutional education network.
            </p>
          </div>

          {/* Top Quick Actions */}
          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <Link
              href="/admin/add-new-course"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5a2df5] hover:bg-[#481ecc] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#5a2df5]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add New Course</span>
            </Link>

            <Link
              href="/admin/add-user"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Add Staff User</span>
            </Link>

            <Link
              href="/admin/list-courses"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all"
            >
              <span>Catalog ({coursesAddedThisMonth})</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                ✓
              </span>
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-emerald-700 hover:text-black font-bold text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* =========================================================
            KEY METRICS & KPI CARDS ROW
        ========================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* KPI 1: Total Leads */}
          <div className="group relative p-6 rounded-3xl bg-white border border-purple-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(90,45,245,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Total Student Leads
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#5a2df5]/10 text-[#5a2df5] flex items-center justify-center group-hover:bg-[#5a2df5] group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>

            <div className="text-3xl font-extrabold text-[#11111b] tracking-tight mb-2">
              {totalLeads.toLocaleString()}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-bold bg-emerald-50 text-emerald-700">
                ↑ +18.4%
              </span>
              <span className="text-neutral-400 font-medium">vs last month</span>
            </div>
          </div>

          {/* KPI 2: Courses Added This Month */}
          <div className="group relative p-6 rounded-3xl bg-white border border-purple-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(90,45,245,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Courses Added (This Month)
              </span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>

            <div className="text-3xl font-extrabold text-[#5a2df5] tracking-tight mb-2">
              +{coursesAddedThisMonth}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-bold bg-purple-50 text-[#5a2df5]">
                +6 this week
              </span>
              <span className="text-neutral-400 font-medium">New catalog items</span>
            </div>
          </div>

          {/* KPI 3: Total Enrolments */}
          <div className="group relative p-6 rounded-3xl bg-white border border-purple-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(90,45,245,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Confirmed Enrolments
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="text-3xl font-extrabold text-emerald-600 tracking-tight mb-2">
              {enrolledCount}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-bold bg-emerald-50 text-emerald-700">
                27.1% Conversion
              </span>
              <span className="text-neutral-400 font-medium">Lead to student</span>
            </div>
          </div>

          {/* KPI 4: Pipeline / CPL Value */}
          <div className="group relative p-6 rounded-3xl bg-white border border-purple-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(90,45,245,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Estimated Pipeline Value
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="text-3xl font-extrabold text-[#11111b] tracking-tight mb-2">
              {pipelineValue} <span className="text-xs font-bold text-neutral-400">AUD</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-bold bg-blue-50 text-blue-700">
                85 Active RTOs
              </span>
              <span className="text-neutral-400 font-medium">National network</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            TWO-COLUMN SECTION: TOP COURSES & INFLUX BREAKDOWN
        ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Top Influx Courses Table (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 p-6 sm:p-7 rounded-3xl bg-white border border-purple-100/90 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100">
              <div>
                <h2 className="text-lg font-bold text-[#11111b]">
                  Top Influx Qualifications This Month
                </h2>
                <p className="text-xs text-neutral-400">
                  Courses generating the highest volume of verified student leads
                </p>
              </div>

              <Link
                href="/admin/list-courses"
                className="text-xs font-bold text-[#5a2df5] hover:underline"
              >
                View Full Catalog →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs font-bold text-neutral-400 uppercase tracking-wider pb-3">
                    <th className="pb-3">Course Title</th>
                    <th className="pb-3 text-center">Leads (MTD)</th>
                    <th className="pb-3 text-center">Enrolled</th>
                    <th className="pb-3 text-center">Conversion</th>
                    <th className="pb-3 text-right">Value (AUD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-50">
                  {TOP_PERFORMING_COURSES.map((course) => (
                    <tr key={course.code} className="hover:bg-purple-50/30 transition-colors">
                      <td className="py-3.5 pr-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-neutral-900 text-xs sm:text-sm leading-snug">
                            {course.title}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-400">
                            {course.code}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center font-extrabold text-[#5a2df5] text-xs sm:text-sm">
                        {course.leadsThisMonth}
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-emerald-600 text-xs sm:text-sm">
                        {course.enrolled}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700">
                          {course.conversionRate}
                        </span>
                      </td>
                      <td className="py-3.5 pl-3 text-right font-extrabold text-neutral-900 text-xs sm:text-sm">
                        {course.revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lead Distribution by Discipline (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-purple-100/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-100">
                <div>
                  <h2 className="text-lg font-bold text-[#11111b]">Lead Distribution</h2>
                  <p className="text-xs text-neutral-400">Breakdown by career discipline</p>
                </div>
                <span className="text-xs font-bold text-[#5a2df5] bg-purple-50 px-2.5 py-1 rounded-full">
                  100% Volume
                </span>
              </div>

              {/* Progress Distribution Stack */}
              <div className="w-full h-3 rounded-full bg-neutral-100 flex overflow-hidden mb-6">
                {CATEGORY_STATS.map((cat) => (
                  <div
                    key={cat.name}
                    className={`${cat.color} h-full`}
                    style={{ width: `${cat.percentage}%` }}
                    title={`${cat.name}: ${cat.percentage}%`}
                  />
                ))}
              </div>

              {/* Category Legend List */}
              <div className="space-y-3">
                {CATEGORY_STATS.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                      <span className="font-semibold text-neutral-700">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-neutral-900">{cat.count}</span>
                      <span className="text-neutral-400 text-[11px]">({cat.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-purple-100 flex items-center justify-between text-xs text-neutral-500">
              <span>National Lead Growth:</span>
              <strong className="text-emerald-600 font-bold">+22.4% MoM</strong>
            </div>
          </div>
        </div>

        {/* =========================================================
            LIVE CRM STUDENT LEAD QUEUE
        ========================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-purple-100/90 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-purple-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-[#11111b]">
                  Live Student Enquiry Stream
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5a2df5]/10 text-[#5a2df5]">
                  {filteredLeads.length} Leads
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Pre-qualified student enquiries ready for admissions follow-up and CRM delivery
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center flex-wrap gap-2.5">
              {/* Search Lead */}
              <div className="relative min-w-[220px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or course..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] text-neutral-900 placeholder:text-neutral-400"
                />
                <svg
                  className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Status Tabs */}
              <div className="flex items-center bg-purple-50/70 p-1 rounded-xl border border-purple-100 text-xs font-semibold">
                {["ALL", "New", "Contacted", "Qualified", "Enrolled"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedStatusFilter(status)}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      selectedStatusFilter === status
                        ? "bg-white text-[#5a2df5] shadow-2xs font-bold"
                        : "text-neutral-600 hover:text-black"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-purple-50/50 text-xs font-bold text-neutral-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4 rounded-l-xl min-w-[200px]">Student Prospect</th>
                  <th className="py-3.5 px-4 min-w-[240px]">Target Qualification</th>
                  <th className="py-3.5 px-4 min-w-[130px]">Location</th>
                  <th className="py-3.5 px-4 min-w-[120px]">Advisor</th>
                  <th className="py-3.5 px-4 text-center min-w-[100px]">Intent Score</th>
                  <th className="py-3.5 px-4 text-center min-w-[130px]">Status</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl min-w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100/70">
                {filteredLeads.map((lead) => {
                  return (
                    <tr key={lead.id} className="hover:bg-purple-50/25 transition-colors group">
                      {/* Student Prospect */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-neutral-900 group-hover:text-[#5a2df5] transition-colors text-sm">
                            {lead.studentName}
                          </span>
                          <span className="text-xs text-neutral-500 font-mono">{lead.email}</span>
                          <span className="text-[11px] text-neutral-400">{lead.phone}</span>
                        </div>
                      </td>

                      {/* Target Course */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-neutral-800 text-xs sm:text-sm leading-snug">
                            {lead.courseTitle}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-semibold text-[#5a2df5] bg-purple-50 px-2 py-0.5 rounded">
                              {lead.category}
                            </span>
                            <span className="text-[10px] text-neutral-400">{lead.createdAt}</span>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-4 px-4 text-xs font-semibold text-neutral-700">
                        {lead.location}
                      </td>

                      {/* Assigned Advisor */}
                      <td className="py-4 px-4">
                        <span className="text-xs font-medium text-neutral-800 bg-neutral-100 px-2.5 py-1 rounded-lg">
                          {lead.advisor}
                        </span>
                      </td>

                      {/* Intent Score */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-extrabold ${
                            lead.intentScore >= 90
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {lead.intentScore}%
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4 text-center">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value as StudentLead["status"])
                          }
                          className={`text-xs font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            lead.status === "New"
                              ? "bg-purple-50 text-[#5a2df5] border-purple-200"
                              : lead.status === "Contacted"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : lead.status === "Qualified"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : lead.status === "Enrolled"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-neutral-100 text-neutral-600 border-neutral-200"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Enrolled">Enrolled</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            alert(
                              `Opening Student Lead Profile: ${lead.studentName}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nCourse: ${lead.courseTitle}\nAssigned Advisor: ${lead.advisor}`
                            );
                          }}
                          className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-[#5a2df5] text-[#5a2df5] hover:text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          View Lead
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}