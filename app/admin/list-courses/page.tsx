"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface AdminCourseItem {
  id: string;
  title: string;
  externalSku: string;
  careerCategory: string;
  qualificationLevel: string;
  nationalCode?: string;
  recognition: "Nationally Recognised" | "CPD Endorsed" | "Non-Accredited";
  deliveryMode: string;
  duration: string;
  fullFee: number;
  paymentPlanWeekly?: number;
  publicationStatus: "Active" | "Pending_Approval" | "Draft";
  enquiriesCount: number;
  lastUpdated: string;
  coverImageUrl?: string;
}

const INITIAL_COURSES: AdminCourseItem[] = [
  {
    id: "crs-001",
    title: "Diploma of Leadership and Management",
    externalSku: "MCIE-BSB50420-2026",
    careerCategory: "Business & Management",
    qualificationLevel: "Diploma",
    nationalCode: "BSB50420",
    recognition: "Nationally Recognised",
    deliveryMode: "Online",
    duration: "12 - 18 Months",
    fullFee: 2850,
    paymentPlanWeekly: 55,
    publicationStatus: "Active",
    enquiriesCount: 142,
    lastUpdated: "2026-09-08",
  },
  {
    id: "crs-002",
    title: "Certificate III in Individual Support (Ageing & Disability)",
    externalSku: "ASC-CHC33021-2026",
    careerCategory: "Aged Care & Disability",
    qualificationLevel: "Certificate III",
    nationalCode: "CHC33021",
    recognition: "Nationally Recognised",
    deliveryMode: "Online + Placement",
    duration: "12 Months",
    fullFee: 2400,
    paymentPlanWeekly: 50,
    publicationStatus: "Active",
    enquiriesCount: 98,
    lastUpdated: "2026-09-05",
  },
  {
    id: "crs-003",
    title: "Certificate IV in Fitness (Personal Trainer)",
    externalSku: "FIT-SIS40221-2026",
    careerCategory: "Health & Community Services",
    qualificationLevel: "Certificate IV",
    nationalCode: "SIS40221",
    recognition: "Nationally Recognised",
    deliveryMode: "Blended",
    duration: "12 Months",
    fullFee: 3200,
    paymentPlanWeekly: 65,
    publicationStatus: "Active",
    enquiriesCount: 88,
    lastUpdated: "2026-09-02",
  },
  {
    id: "crs-004",
    title: "Advanced Diploma of Marketing and Communication",
    externalSku: "DIG-BSB60520-2026",
    careerCategory: "Business & Management",
    qualificationLevel: "Advanced Diploma",
    nationalCode: "BSB60520",
    recognition: "Nationally Recognised",
    deliveryMode: "Online",
    duration: "18 Months",
    fullFee: 4100,
    paymentPlanWeekly: 80,
    publicationStatus: "Pending_Approval",
    enquiriesCount: 19,
    lastUpdated: "2026-09-09",
  },
  {
    id: "crs-005",
    title: "Certificate III in Beauty Services (Lash & Brow)",
    externalSku: "BEA-SHB30121-2026",
    careerCategory: "Hospitality & Cookery",
    qualificationLevel: "Certificate III",
    nationalCode: "SHB30121",
    recognition: "Nationally Recognised",
    deliveryMode: "Online",
    duration: "6 Months",
    fullFee: 1850,
    paymentPlanWeekly: 40,
    publicationStatus: "Draft",
    enquiriesCount: 0,
    lastUpdated: "2026-09-10",
  },
];

export default function ListCourses() {
  const [courses, setCourses] = useState<AdminCourseItem[]>(INITIAL_COURSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [deleteModalCourse, setDeleteModalCourse] = useState<AdminCourseItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Status metrics summary
  const totalCourses = courses.length;
  const activeCourses = courses.filter((c) => c.publicationStatus === "Active").length;
  const pendingCourses = courses.filter((c) => c.publicationStatus === "Pending_Approval").length;
  const draftCourses = courses.filter((c) => c.publicationStatus === "Draft").length;
  const totalEnquiries = courses.reduce((acc, c) => acc + c.enquiriesCount, 0);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.externalSku.toLowerCase().includes(q) ||
        course.careerCategory.toLowerCase().includes(q) ||
        (course.nationalCode && course.nationalCode.toLowerCase().includes(q));

      const matchesStatus =
        selectedStatus === "ALL" || course.publicationStatus === selectedStatus;

      const matchesCategory =
        selectedCategory === "ALL" || course.careerCategory === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [courses, searchQuery, selectedStatus, selectedCategory]);

  // Actions
  const handleDeleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setDeleteModalCourse(null);
    setToastMessage("Course deleted successfully.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStatusToggle = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const newStatus = c.publicationStatus === "Active" ? "Draft" : "Active";
        return { ...c, publicationStatus: newStatus };
      })
    );
    setToastMessage("Course status updated.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <main className="min-h-screen bg-[#faf9ff] py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1360px] mx-auto">
        {/* Breadcrumb & Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-purple-100/90">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-1">
              <Link href="/admin" className="hover:text-[#5a2df5] transition-colors">
                Admin Portal
              </Link>
              <span>/</span>
              <span className="text-[#5a2df5]">Created Courses</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#11111b] tracking-tight">
              Course Catalog &amp; Listings
            </h1>

            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Review, manage, update, and track student enquiries for your created qualification offerings.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-purple-200/80 text-xs sm:text-sm font-semibold text-neutral-700 hover:border-[#5a2df5] hover:text-[#5a2df5] transition-all shadow-xs"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/add-new-course"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] bg-[length:200%_100%] hover:bg-[100%_0] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#5a2df5]/25 hover:shadow-lg hover:shadow-[#5a2df5]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>+ Add New Course</span>
            </Link>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs">
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

        {/* Quick Metric KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-purple-100/90 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Total Courses
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#11111b]">
                {totalCourses}
              </span>
              <span className="text-xs text-neutral-500 font-medium">Catalog items</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-purple-100/90 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Active Listings
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                {activeCourses}
              </span>
              <span className="text-xs text-neutral-500 font-medium">Live on site</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-purple-100/90 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Pending Review
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">
                {pendingCourses}
              </span>
              <span className="text-xs text-neutral-500 font-medium">In validation</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-purple-100/90 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold text-[#5a2df5] uppercase tracking-wider">
              Total Enquiries
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#5a2df5]">
                {totalEnquiries}
              </span>
              <span className="text-xs text-neutral-500 font-medium">Student leads</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100/90 shadow-xs mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course title, SKU, national code (e.g. BSB50420)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-3 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Status and Category Selectors */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Status Filter Tabs */}
            <div className="flex items-center bg-purple-50/70 p-1 rounded-xl border border-purple-100 text-xs font-semibold">
              {[
                { key: "ALL", label: "All" },
                { key: "Active", label: "Active" },
                { key: "Pending_Approval", label: "Pending" },
                { key: "Draft", label: "Drafts" },
              ].map((st) => (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => setSelectedStatus(st.key)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedStatus === st.key
                      ? "bg-white text-[#5a2df5] shadow-xs font-bold"
                      : "text-neutral-600 hover:text-black"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-purple-50/50 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] text-neutral-700 cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="Business & Management">Business &amp; Management</option>
              <option value="Aged Care & Disability">Aged Care &amp; Disability</option>
              <option value="Health & Community Services">Health &amp; Community</option>
              <option value="Hospitality & Cookery">Hospitality &amp; Cookery</option>
            </select>
          </div>
        </div>

        {/* Courses Table Card */}
        <div className="bg-white rounded-3xl border border-purple-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="bg-purple-50/60 border-b border-purple-100 text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  <th className="py-4 px-6 min-w-[280px]">Course Details &amp; SKU</th>
                  <th className="py-4 px-5 min-w-[160px]">Qualification &amp; Code</th>
                  <th className="py-4 px-5 min-w-[150px]">Delivery &amp; Duration</th>
                  <th className="py-4 px-5 min-w-[140px]">Tuition Fee</th>
                  <th className="py-4 px-5 min-w-[130px] text-center">Status</th>
                  <th className="py-4 px-5 min-w-[110px] text-center">Enquiries</th>
                  <th className="py-4 px-6 text-right min-w-[130px]">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-purple-100/70">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => {
                    const isActive = course.publicationStatus === "Active";
                    const isPending = course.publicationStatus === "Pending_Approval";

                    return (
                      <tr
                        key={course.id}
                        className="hover:bg-purple-50/30 transition-colors group"
                      >
                        {/* Course Title, SKU, Category */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-neutral-900 group-hover:text-[#5a2df5] transition-colors leading-snug">
                              {course.title}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] font-mono font-medium text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                                {course.externalSku}
                              </span>
                              <span className="text-[11px] text-[#5a2df5] font-semibold bg-purple-50 px-2 py-0.5 rounded-full">
                                {course.careerCategory}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Level & National Code */}
                        <td className="py-4 px-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-neutral-800 text-xs">
                              {course.qualificationLevel}
                            </span>
                            <span className="text-[11px] text-neutral-400 font-mono">
                              {course.nationalCode || "Non-Accredited"}
                            </span>
                          </div>
                        </td>

                        {/* Delivery & Duration */}
                        <td className="py-4 px-5">
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-neutral-800">
                              {course.deliveryMode}
                            </span>
                            <span className="text-[11px] text-neutral-400 font-medium">
                              {course.duration}
                            </span>
                          </div>
                        </td>

                        {/* Tuition Fee */}
                        <td className="py-4 px-5">
                          <div className="flex flex-col">
                            <span className="text-xs font-extrabold text-[#11111b]">
                              ${course.fullFee.toLocaleString()} AUD
                            </span>
                            {course.paymentPlanWeekly && (
                              <span className="text-[11px] text-neutral-400 font-medium">
                                ~${course.paymentPlanWeekly}/wk
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-5 text-center">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                              isActive
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : isPending
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-neutral-100 text-neutral-600 border border-neutral-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive
                                  ? "bg-emerald-500 animate-pulse"
                                  : isPending
                                  ? "bg-amber-500"
                                  : "bg-neutral-400"
                              }`}
                            />
                            <span>{course.publicationStatus.replace("_", " ")}</span>
                          </span>
                        </td>

                        {/* Enquiries */}
                        <td className="py-4 px-5 text-center">
                          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-xl bg-purple-50 text-[#5a2df5] font-extrabold text-xs">
                            {course.enquiriesCount}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Toggle Publish Quick Status */}
                            <button
                              type="button"
                              onClick={() => handleStatusToggle(course.id)}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-[#5a2df5] hover:bg-purple-50 transition-colors"
                              title={isActive ? "Unpublish to Draft" : "Publish Live"}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>

                            {/* Public Preview Link */}
                            <Link
                              href="/courses"
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                              title="View Public Course Page"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </Link>

                            {/* Delete Course */}
                            <button
                              type="button"
                              onClick={() => setDeleteModalCourse(course)}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Course"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  /* Empty Search Results */
                  <tr>
                    <td colSpan={7} className="py-12 px-6 text-center text-neutral-400">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-purple-50 text-[#5a2df5] flex items-center justify-center mb-3">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-bold text-neutral-800 mb-1">
                          No matching courses found
                        </h4>
                        <p className="text-xs text-neutral-500 max-w-sm mb-4">
                          Try adjusting your search terms or filter selection.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery("");
                            setSelectedStatus("ALL");
                            setSelectedCategory("ALL");
                          }}
                          className="px-4 py-2 rounded-xl bg-purple-50 text-[#5a2df5] text-xs font-semibold hover:bg-purple-100"
                        >
                          Clear Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Summary Bar */}
          <div className="p-4 sm:p-5 bg-purple-50/40 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
            <span>
              Showing <strong className="text-neutral-800">{filteredCourses.length}</strong> of{" "}
              <strong>{courses.length}</strong> total created courses
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-neutral-400">
                Last synchronized: Today at 12:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModalCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-purple-100">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Delete Course Listing?
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                Are you sure you want to remove{" "}
                <strong className="text-neutral-900">&ldquo;{deleteModalCourse.title}&rdquo;</strong> (SKU: {deleteModalCourse.externalSku}) from the catalog? This action will archive active student enquiry routes.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteModalCourse(null)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 text-xs sm:text-sm font-semibold hover:bg-neutral-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCourse(deleteModalCourse.id)}
                  className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs sm:text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}