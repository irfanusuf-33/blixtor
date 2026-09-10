"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "../_components/site-shell";

export interface CareerCategory {
    code: string;
    category: string;
    courses_count: number;
    slug: string;
    group?: string;
}

export const coursesByCareerList: CareerCategory[] = [
    {
        code: "AC",
        category: "Animal Care & Welfare",
        courses_count: 18,
        slug: "animal-care-welfare",
        group: "Animals & Veterinary",
    },
    {
        code: "FN",
        category: "Fitness & Personal Nutrition",
        courses_count: 11,
        slug: "fitness-personal-nutrition",
        group: "Health & Fitness",
    },
    {
        code: "AG",
        category: "Agricultural Studies",
        courses_count: 6,
        slug: "agricultural-studies",
        group: "Agriculture & Nature",
    },
    {
        code: "CF",
        category: "Cattle & Livestock Farming",
        courses_count: 5,
        slug: "cattle-livestock-farming",
        group: "Agriculture & Nature",
    },
    {
        code: "PC",
        category: "Photography & Digital Imaging",
        courses_count: 5,
        slug: "photography-digital-imaging",
        group: "Creative & Design",
    },
    {
        code: "BT",
        category: "Beauty Therapy & Esthetics",
        courses_count: 4,
        slug: "beauty-therapy-esthetics",
        group: "Beauty & Wellness",
    },
    {
        code: "HC",
        category: "Equine & Horse Care",
        courses_count: 4,
        slug: "equine-horse-care",
        group: "Animals & Veterinary",
    },
    {
        code: "WC",
        category: "Wildlife Conservation & Management",
        courses_count: 4,
        slug: "wildlife-conservation-management",
        group: "Animals & Veterinary",
    },
    {
        code: "DM",
        category: "Digital Marketing Strategy",
        courses_count: 3,
        slug: "digital-marketing-strategy",
        group: "Marketing & Digital",
    },
    {
        code: "EC",
        category: "Lash Extension & Styling",
        courses_count: 3,
        slug: "lash-extension-styling",
        group: "Beauty & Wellness",
    },
    {
        code: "FM",
        category: "Farm Operations & Management",
        courses_count: 3,
        slug: "farm-operations-management",
        group: "Agriculture & Nature",
    },
    {
        code: "HR",
        category: "Human Resource Management",
        courses_count: 3,
        slug: "human-resource-management",
        group: "Business & Leadership",
    },
    {
        code: "MC",
        category: "Business & Leadership Management",
        courses_count: 3,
        slug: "business-leadership-management",
        group: "Business & Leadership",
    },
    {
        code: "NA",
        category: "Nail Technology & Design",
        courses_count: 3,
        slug: "nail-technology-design",
        group: "Beauty & Wellness",
    },
    {
        code: "VA",
        category: "Veterinary Assisting",
        courses_count: 3,
        slug: "veterinary-assisting",
        group: "Animals & Veterinary",
    },
    {
        code: "ZC",
        category: "Zoology & Animal Science",
        courses_count: 3,
        slug: "zoology-animal-science",
        group: "Animals & Veterinary",
    },
    {
        code: "ET",
        category: "Brow Styling & Microblading",
        courses_count: 2,
        slug: "brow-styling-microblading",
        group: "Beauty & Wellness",
    },
    {
        code: "ACC",
        category: "Accounting & Financial Management",
        courses_count: 1,
        slug: "accounting-financial-management",
        group: "Business & Leadership",
    },
    {
        code: "AGC",
        category: "Aged Care & Senior Support",
        courses_count: 1,
        slug: "aged-care-senior-support",
        group: "Health & Care",
    },
    {
        code: "AB",
        category: "Animal Behavior & Training",
        courses_count: 1,
        slug: "animal-behavior-training",
        group: "Animals & Veterinary",
    },
    {
        code: "BC",
        category: "Bookkeeping & Financial Records",
        courses_count: 1,
        slug: "bookkeeping-financial-records",
        group: "Business & Leadership",
    },
    {
        code: "CC",
        category: "Early Childhood Education",
        courses_count: 1,
        slug: "early-childhood-education",
        group: "Education & Care",
    },
    {
        code: "CR",
        category: "Creative Arts & Design",
        courses_count: 1,
        slug: "creative-arts-design",
        group: "Creative & Design",
    },
    {
        code: "DG",
        category: "Professional Dog Grooming",
        courses_count: 1,
        slug: "professional-dog-grooming",
        group: "Animals & Veterinary",
    },
    {
        code: "EM",
        category: "Event Planning & Management",
        courses_count: 1,
        slug: "event-planning-management",
        group: "Business & Leadership",
    },
    {
        code: "FC",
        category: "Physical Fitness Training",
        courses_count: 1,
        slug: "physical-fitness-training",
        group: "Health & Fitness",
    },
    {
        code: "GL",
        category: "Gardening & Landscape Design",
        courses_count: 1,
        slug: "gardening-landscape-design",
        group: "Agriculture & Nature",
    },
    {
        code: "HC",
        category: "Horticulture Science",
        courses_count: 1,
        slug: "horticulture-science",
        group: "Agriculture & Nature",
    },
    {
        code: "LS",
        category: "Landscape Architecture",
        courses_count: 1,
        slug: "landscape-architecture",
        group: "Agriculture & Nature",
    },
    {
        code: "LD",
        category: "Organizational Leadership",
        courses_count: 1,
        slug: "organizational-leadership",
        group: "Business & Leadership",
    },
    {
        code: "LG",
        category: "Logistics & Supply Chain",
        courses_count: 1,
        slug: "logistics-supply-chain",
        group: "Business & Leadership",
    },
    {
        code: "MS",
        category: "Marine Biology & Oceanography",
        courses_count: 1,
        slug: "marine-biology-oceanography",
        group: "Agriculture & Nature",
    },
    {
        code: "MKT",
        category: "Brand & Product Marketing",
        courses_count: 1,
        slug: "brand-product-marketing",
        group: "Marketing & Digital",
    },
];

// Alias for backwards/alternate naming compatibility
export const courseByCategoryList = coursesByCareerList;

const FILTER_GROUPS = [
    "All",
    "Animals & Veterinary",
    "Business & Leadership",
    "Agriculture & Nature",
    "Beauty & Wellness",
    "Health & Fitness",
    "Marketing & Digital",
    "Creative & Design",
];

export default function CareersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("All");

    const totalCourses = useMemo(() => {
        return coursesByCareerList.reduce((acc, curr) => acc + curr.courses_count, 0);
    }, []);

    const filteredCategories = useMemo(() => {
        return coursesByCareerList.filter((item) => {
            const matchesSearch =
                item.category.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                item.code.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                (item.group && item.group.toLowerCase().includes(searchQuery.toLowerCase().trim()));

            const matchesGroup =
                selectedGroup === "All" ||
                item.group === selectedGroup ||
                (selectedGroup === "Health & Fitness" && item.group === "Health & Care");

            return matchesSearch && matchesGroup;
        });
    }, [searchQuery, selectedGroup]);

    return (
        <main className="w-full overflow-hidden bg-white">
            {/* =========================================================================
          HERO SECTION
          Features animated ambient glowing orbs, animated badge, responsive layout,
          dynamic stat counters, search input & floating interactive cards
      ========================================================================== */}
            <section
                className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,#ece4ff_0%,#f8f5ff_45%,#ffffff_100%)] pt-12 pb-16 sm:pt-16 sm:pb-24 px-6 sm:px-10 lg:px-16"
                aria-labelledby="careers-hero-title"
            >
                {/* Animated Background Glowing Orbs */}
                <div
                    className="pointer-events-none absolute -top-36 -right-24 w-[580px] h-[580px] rounded-full bg-[radial-gradient(circle,rgba(168,135,255,0.28)_0%,rgba(90,45,245,0)_70%)] blur-3xl -z-10 animate-pulse-subtle"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute top-1/2 left-[-15%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(215,198,255,0.35)_0%,rgba(240,230,255,0)_70%)] blur-3xl -z-10"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute bottom-0 right-[20%] w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(90,45,245,0.12)_0%,rgba(90,45,245,0)_70%)] blur-2xl -z-10"
                    aria-hidden="true"
                />

                <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
                    {/* Left Column: Heading, Animated Pill, Description, Quick Stats */}
                    <div className="lg:col-span-7 flex flex-col items-start max-lg:items-center max-lg:text-center">
                        {/* Animated Pill Badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200/90 shadow-xs mb-6 transition-all duration-300 hover:border-purple-300 hover:bg-white hover:shadow-sm">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5a2df5] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5a2df5]" />
                            </span>
                            <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#5a2df5]">
                                Accelerate Your Future • Explore {coursesByCareerList.length} Career Disciplines
                            </span>
                        </div>

                        {/* Main Hero Heading */}
                        <h1
                            id="careers-hero-title"
                            className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold tracking-tight text-[#11111b] leading-[1.12] mb-6 max-w-[720px]"
                        >
                            Explore In-Demand{" "}
                            <span className="bg-[linear-gradient(135deg,#5a2df5_0%,#8e5eff_50%,#5a2df5_100%)] bg-clip-text text-transparent italic">
                                Careers &amp; Courses
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-neutral-600 text-base sm:text-lg lg:text-[19px] font-normal leading-relaxed max-w-[640px] mb-8">
                            Discover accredited pathways, practical qualifications, and expert-curated modules
                            designed to elevate your skills and open doors to rewarding career opportunities.
                        </p>

                        {/* Search Input Bar */}
                        <div className="w-full max-w-[620px] mb-8 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-purple-200/90 shadow-lg shadow-purple-950/5 focus-within:border-[#5a2df5] focus-within:ring-4 focus-within:ring-[#5a2df5]/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-all duration-300">
                            <div className="flex items-center flex-1 px-3 sm:pl-4">
                                <svg
                                    className="w-5 h-5 text-[#8e5eff] shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by career title, field, or code (e.g. Animal, Marketing, AC)..."
                                    className="w-full px-3 py-2 bg-transparent text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                                    aria-label="Search career categories"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                                        aria-label="Clear search"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            <a
                                href="#career-tiles"
                                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl sm:rounded-full bg-[#5a2df5] hover:bg-[#481ecc] text-white text-sm sm:text-base font-semibold shadow-md shadow-[#5a2df5]/25 hover:shadow-lg hover:shadow-[#5a2df5]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shrink-0"
                            >
                                <span>Browse {filteredCategories.length} Categories</span>
                                <Image
                                    src="/Arrow up-right.svg"
                                    alt=""
                                    width={15}
                                    height={15}
                                    aria-hidden="true"
                                    className="brightness-0 invert"
                                />
                            </a>
                        </div>

                        {/* Key Highlight Metric Counters */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-2 w-full max-w-[580px] border-t border-purple-100/80">
                            <div className="flex flex-col">
                                <span className="text-2xl sm:text-3xl font-extrabold text-[#11111b] tracking-tight">
                                    {coursesByCareerList.length}+
                                </span>
                                <span className="text-xs sm:text-sm font-medium text-neutral-500">
                                    Career Fields
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl sm:text-3xl font-extrabold text-[#5a2df5] tracking-tight">
                                    {totalCourses}+
                                </span>
                                <span className="text-xs sm:text-sm font-medium text-neutral-500">
                                    Available Courses
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl sm:text-3xl font-extrabold text-[#11111b] tracking-tight">
                                    100%
                                </span>
                                <span className="text-xs sm:text-sm font-medium text-neutral-500">
                                    Self-Paced &amp; Flexible
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Hero Visual Showcase with Floating Animation Cards */}
                    <div className="lg:col-span-5 relative flex items-center justify-center">
                        {/* Soft Ambient Glow backdrop behind cards */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#5a2df5]/20 via-[#a78bfa]/20 to-transparent rounded-3xl blur-2xl -z-10" />

                        {/* Stacked Animated Cards container */}
                        <div className="w-full max-w-[460px] flex flex-col gap-4 relative">
                            {/* Floating Card 1: Top Category */}
                            <div className="animate-float bg-white/95 backdrop-blur-xl p-5 rounded-2xl border border-purple-200/80 shadow-[0_10px_30px_rgba(90,45,245,0.08)] transition-all duration-300 hover:shadow-xl hover:border-[#5a2df5]/40">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Top Enrolled
                                    </span>
                                    <span className="text-xs font-bold text-[#5a2df5] bg-[#5a2df5]/10 px-2.5 py-0.5 rounded-md">
                                        18 Courses
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900 mb-1">
                                    Animal Care &amp; Welfare
                                </h3>
                                <p className="text-xs text-neutral-500 line-clamp-2">
                                    Comprehensive veterinary, grooming, and welfare training programs.
                                </p>
                            </div>

                            {/* Floating Card 2: Growth Category with Delayed Animation */}
                            <div
                                style={{ animationDelay: "1.5s" }}
                                className="animate-float ml-4 sm:ml-8 bg-white/95 backdrop-blur-xl p-5 rounded-2xl border border-purple-200/80 shadow-[0_10px_30px_rgba(90,45,245,0.08)] transition-all duration-300 hover:shadow-xl hover:border-[#5a2df5]/40"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-[#5a2df5] border border-purple-200/60">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#5a2df5]" />
                                        High Growth
                                    </span>
                                    <span className="text-xs font-bold text-[#5a2df5] bg-[#5a2df5]/10 px-2.5 py-0.5 rounded-md">
                                        11 Courses
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900 mb-1">
                                    Fitness &amp; Personal Nutrition
                                </h3>
                                <p className="text-xs text-neutral-500 line-clamp-2">
                                    Specialized health science, personal training, and nutritional coaching.
                                </p>
                            </div>

                            {/* Floating Card 3: Business & Strategy */}
                            <div
                                style={{ animationDelay: "2.5s" }}
                                className="animate-float -ml-2 bg-white/95 backdrop-blur-xl p-5 rounded-2xl border border-purple-200/80 shadow-[0_10px_30px_rgba(90,45,245,0.08)] transition-all duration-300 hover:shadow-xl hover:border-[#5a2df5]/40"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        Industry Standard
                                    </span>
                                    <span className="text-xs font-bold text-[#5a2df5] bg-[#5a2df5]/10 px-2.5 py-0.5 rounded-md">
                                        Multi-Level
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900 mb-1">
                                    Business &amp; Leadership Management
                                </h3>
                                <p className="text-xs text-neutral-500 line-clamp-2">
                                    Executive management, organizational strategy, and leadership qualifications.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================================
          COURSES BY CAREER LIST SECTION
          Displays all career categories in interactive tiles with responsive design,
          filter pills, course counts, code badges, and direct links.
      ========================================================================== */}
            <section
                id="career-tiles"
                className="pt-16 pb-20 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-white via-[#faf8ff] to-white"
                aria-labelledby="career-catalog-title"
            >
                <div className="max-w-[1360px] mx-auto">
                    {/* Section Heading with decorative lines */}
                    <SectionHeading
                        className="mb-4"
                        headingClassName="text-[32px] sm:text-[38px] font-extrabold text-[#11111b]"
                        spanSizeClassName="w-[80px] sm:w-[110px]"
                    >
                        Explore Courses by Career
                    </SectionHeading>

                    <p className="text-center text-neutral-600 text-base sm:text-lg max-w-[680px] mx-auto mb-10">
                        Select a career category below to view all available courses, certification paths,
                        and enrollment options.
                    </p>

                    {/* Filter Pills */}
                    <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mb-10">
                        {FILTER_GROUPS.map((group) => {
                            const active = selectedGroup === group;
                            return (
                                <button
                                    key={group}
                                    type="button"
                                    onClick={() => setSelectedGroup(group)}
                                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${active
                                        ? "bg-[#5a2df5] text-white shadow-md shadow-[#5a2df5]/25 scale-105"
                                        : "bg-white text-neutral-700 border border-purple-100/90 hover:border-purple-300 hover:bg-purple-50/50"
                                        }`}
                                >
                                    {group}
                                </button>
                            );
                        })}
                    </div>

                    {/* Results Summary Bar */}
                    <div className="flex items-center justify-between flex-wrap gap-3 pb-6 mb-8 border-b border-purple-100/80">
                        <span className="text-sm font-semibold text-neutral-700">
                            Showing{" "}
                            <span className="text-[#5a2df5] font-bold">{filteredCategories.length}</span> of{" "}
                            {coursesByCareerList.length} Categories
                        </span>

                        {searchQuery && (
                            <span className="text-xs sm:text-sm text-neutral-500">
                                Filtered by &ldquo;<strong className="text-neutral-800">{searchQuery}</strong>&rdquo;
                            </span>
                        )}
                    </div>

                    {/* Tiles Grid */}
                    {filteredCategories.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                            {filteredCategories.map((item) => {
                                return (
                                    <Link
                                        key={item.slug}
                                        href={`/careers/${item.slug}`}
                                        className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-purple-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(90,45,245,0.12)] hover:border-[#5a2df5]/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Top gradient accent line on hover */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a2df5] via-[#8e5eff] to-[#a78bfa] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div>
                                            {/* Badge Row: Code Icon + Courses Count */}
                                            <div className="flex items-center justify-between gap-2 mb-4">
                                                <span className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-[#5a2df5]/10 to-[#8e5eff]/20 text-[#5a2df5] font-extrabold text-sm tracking-wide border border-purple-200/50 group-hover:scale-105 group-hover:bg-[#5a2df5] group-hover:text-white transition-all duration-300">
                                                    {item.code}
                                                </span>

                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-[#5a2df5] border border-purple-200/60 group-hover:bg-[#5a2df5]/15 transition-colors duration-200">
                                                    <span>
                                                        {item.courses_count}{" "}
                                                        {item.courses_count === 1 ? "Course" : "Courses"}
                                                    </span>
                                                </span>
                                            </div>

                                            {/* Category Title */}
                                            <h3 className="text-lg font-bold text-[#11111b] group-hover:text-[#5a2df5] transition-colors duration-200 leading-snug mb-2">
                                                {item.category}
                                            </h3>

                                            {/* Group tag if available */}
                                            {item.group && (
                                                <p className="text-xs text-neutral-400 font-medium mb-4">
                                                    {item.group}
                                                </p>
                                            )}
                                        </div>

                                        {/* Bottom CTA Link text with animated arrow */}
                                        <div className="pt-4 mt-2 border-t border-neutral-100 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#5a2df5]">
                                            <span>View Programs</span>
                                            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100/70 text-[#5a2df5] group-hover:bg-[#5a2df5] group-hover:text-white transition-all duration-300">
                                                <svg
                                                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M7 17L17 7M17 17V7H7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-purple-50/40 rounded-2xl border border-dashed border-purple-200">
                            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-[#5a2df5] mb-4">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-neutral-800 mb-1">
                                No career categories found
                            </h3>
                            <p className="text-sm text-neutral-500 max-w-sm mb-5">
                                We couldn&apos;t find any categories matching &ldquo;{searchQuery}&rdquo;. Try adjusting your search query or clear the filter.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedGroup("All");
                                }}
                                className="px-5 py-2.5 rounded-full bg-[#5a2df5] text-white text-sm font-semibold hover:bg-[#481ecc] transition-all"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* =========================================================================
          CALL TO ACTION SECTION
          Consistent with Blixtor's theme and brand identity
      ========================================================================== */}
            <section
                style={{
                    backgroundImage: "url('/Group 6.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
                className="relative mx-6 sm:mx-10 lg:mx-16 mb-16 h-auto min-h-[380px] overflow-hidden rounded-2xl text-center text-white px-6 py-14 max-w-[1360px] mx-auto"
                id="career-advisor-cta"
            >
                <div className="relative z-[1] mx-auto flex h-full max-w-[760px] flex-col items-center justify-center">
                    <SectionHeading
                        className="mb-4"
                        headingClassName="text-white text-[22px] sm:text-[26px]"
                        spanSizeClassName="w-[70px] sm:w-[100px]"
                        leftBgClassName="bg-[linear-gradient(90deg,transparent_0%,#7b49ff_24%,#ffffff_100%)]"
                        rightBgClassName="bg-[linear-gradient(90deg,#ffffff_0%,#7b49ff_76%,transparent_100%)]"
                    >
                        Need Guidance?
                    </SectionHeading>

                    <h2 className="m-0 mb-3 text-2xl sm:text-3xl font-bold leading-tight">
                        Not Sure Which Career Pathway Is Right for You?
                    </h2>

                    <p className="mb-8 text-sm sm:text-base leading-relaxed text-[#eee8ff] max-w-[620px]">
                        Speak with one of our expert advisors to help match your personal strengths,
                        goals, and previous experience with the right qualification.
                    </p>

                    <Link
                        className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#5a2df5] px-7 text-base font-semibold text-white shadow-lg shadow-[#5a2df5]/30 hover:bg-[#481ecc] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
                        href="/contact"
                    >
                        <span>Speak with a Consultant</span>
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