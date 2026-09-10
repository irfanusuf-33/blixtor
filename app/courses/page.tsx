"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "../_components/site-shell";

export const filterOptions = {
  career: [
    { name: "Business & Management", count: 147 },
    { name: "Health & Community Services", count: 73 },
    { name: "Education & Teaching", count: 48 },
    { name: "Hospitality & Cookery", count: 24 },
    { name: "Mental Health", count: 24 },
    { name: "Aged Care & Disability", count: 22 },
    { name: "Animal Care Courses", count: 18 },
    { name: "Fitness and Nutrition Courses", count: 11 },
    { name: "Beauty, Lifestyle & Leisure", count: 7 },
    { name: "Agriculture Courses", count: 6 },
    { name: "AI, Cyber & Software", count: 5 },
    { name: "Cattle Farming Courses", count: 5 },
    { name: "Photography Courses", count: 5 },
    { name: "Horse Care Courses", count: 4 },
    { name: "Beauty Therapy Courses", count: 4 },
    { name: "Wildlife Courses", count: 4 },
    { name: "Eyelash Courses", count: 3 },
    { name: "Photography", count: 3 },
    { name: "Digital Marketing Courses Online", count: 3 },
    { name: "Human Resources Courses", count: 3 },
    { name: "Management Courses", count: 3 },
    { name: "Farm Management Courses", count: 3 },
    { name: "Nail Art and Design Courses", count: 3 },
    { name: "Vet Assistant Courses", count: 3 },
    { name: "Zoology Courses", count: 3 },
    { name: "Fitness, Health & Nutrition", count: 2 },
    { name: "TESOL & Languages", count: 2 },
    { name: "Eyebrow Technician Courses", count: 2 },
    { name: "Aged Care Courses", count: 1 },
    { name: "Animal Health and Veterinary Care", count: 1 },
    { name: "Travel, Tourism & Aviation", count: 1 },
    { name: "Criminal Psychology & Forensic Science", count: 1 },
    { name: "Criminology & Forensic Psychology", count: 1 },
    { name: "Criminology & Forensic Science", count: 1 },
    { name: "Accounting Courses", count: 1 },
    { name: "Leadership Courses", count: 1 },
    { name: "Logistics Courses", count: 1 },
    { name: "Marketing Courses", count: 1 },
    { name: "Child Care Courses", count: 1 },
    { name: "Events Management Courses", count: 1 },
    { name: "Fitness Courses", count: 1 },
    { name: "Animal Behaviour Courses", count: 1 },
    { name: "Bookkeeping Courses", count: 1 },
    { name: "Creative Courses", count: 1 },
    { name: "Dog Grooming Course", count: 1 },
    { name: "Gardening and Landscaping Courses", count: 1 },
    { name: "Horticulture Courses", count: 1 },
    { name: "Landscaping Courses", count: 1 },
    { name: "Marine Studies Courses", count: 1 },
  ],
  level: [
    "Certificate III",
    "Certificate IV",
    "Diploma",
    "Advanced Diploma",
    "Short Course",
    "Advanced Certificate",
    "CPD Endorsed",
    "Certificate",
  ],
  delivery: ["Online", "Online + Placement", "Blended"],
  recognition: ["Nationally recognised only"],
};

export interface Course {
  id: string;
  title: string;
  description: string;
  tags: string[];
  level: string;
  career: string;
  delivery: string;
  isRecognised: boolean;
  duration: string;
  code?: string;
  rating: number;
  reviewsCount: number;
}

export const coursesData: Course[] = [
  {
    id: "bsb50420",
    title: "Diploma of Leadership and Management",
    description:
      "Develop executive leadership, strategic planning, team management, and operational decision-making expertise tailored for corporate and enterprise environments.",
    tags: ["Leadership", "Business Strategy", "Operations", "Team Management"],
    level: "Diploma",
    career: "Business & Management",
    delivery: "Online",
    isRecognised: true,
    duration: "12 - 18 Months",
    code: "BSB50420",
    rating: 4.9,
    reviewsCount: 142,
  },
  {
    id: "chc33021",
    title: "Certificate III in Individual Support (Ageing & Disability)",
    description:
      "Gain essential person-centred care skills, clinical communication, and practical workplace training to provide high quality care in community and aged-care sectors.",
    tags: ["Aged Care", "Disability Support", "Community Care", "Healthcare"],
    level: "Certificate III",
    career: "Aged Care & Disability",
    delivery: "Online + Placement",
    isRecognised: true,
    duration: "12 Months (incl. 120hrs Placement)",
    code: "CHC33021",
    rating: 4.8,
    reviewsCount: 98,
  },
  {
    id: "acm30121",
    title: "Certificate III in Animal Care Services",
    description:
      "Learn daily care, animal hygiene, behavioural monitoring, feeding regimes, and workplace health and safety for veterinary clinics, kennels, and welfare shelters.",
    tags: ["Animal Welfare", "Veterinary Care", "Animal Husbandry", "Pet Care"],
    level: "Certificate III",
    career: "Animal Care Courses",
    delivery: "Online + Placement",
    isRecognised: true,
    duration: "9 - 12 Months",
    code: "ACM30121",
    rating: 4.9,
    reviewsCount: 114,
  },
  {
    id: "bsb40520",
    title: "Certificate IV in Leadership and Management",
    description:
      "Master frontline supervision, effective team communication, project administration, and customer service management to accelerate your career as a team leader.",
    tags: ["Frontline Management", "Supervision", "Communication", "Productivity"],
    level: "Certificate IV",
    career: "Management Courses",
    delivery: "Online",
    isRecognised: true,
    duration: "6 - 12 Months",
    code: "BSB40520",
    rating: 4.7,
    reviewsCount: 76,
  },
  {
    id: "sis40221",
    title: "Certificate IV in Fitness (Personal Trainer)",
    description:
      "Equip yourself with advanced anatomy knowledge, exercise programming, functional fitness assessments, and business essentials to operate as an accredited Personal Trainer.",
    tags: ["Personal Training", "Fitness Coaching", "Nutrition", "Exercise Science"],
    level: "Certificate IV",
    career: "Fitness and Nutrition Courses",
    delivery: "Blended",
    isRecognised: true,
    duration: "12 Months",
    code: "SIS40221",
    rating: 4.9,
    reviewsCount: 88,
  },
  {
    id: "shb50121",
    title: "Diploma of Beauty Therapy",
    description:
      "Comprehensive aesthetic training covering facial therapies, body treatments, laser safety, microdermabrasion, salon business operations, and client consultation.",
    tags: ["Skin Care", "Beauty Therapy", "Salon Management", "Esthetics"],
    level: "Diploma",
    career: "Beauty Therapy Courses",
    delivery: "Blended",
    isRecognised: true,
    duration: "12 - 18 Months",
    code: "SHB50121",
    rating: 4.8,
    reviewsCount: 65,
  },
  {
    id: "mkt-adv-dip",
    title: "Advanced Diploma of Marketing and Communication",
    description:
      "Formulate data-driven brand strategies, digital omnichannel campaigns, marketing analytics, customer acquisition funnels, and executive product positioning.",
    tags: ["Digital Marketing", "Brand Strategy", "Campaign Design", "Analytics"],
    level: "Advanced Diploma",
    career: "Digital Marketing Courses Online",
    delivery: "Online",
    isRecognised: true,
    duration: "18 Months",
    code: "BSB60520",
    rating: 4.9,
    reviewsCount: 52,
  },
  {
    id: "chc52021",
    title: "Diploma of Community Services",
    description:
      "Prepare for specialist leadership roles in social welfare, crisis intervention, community development programs, case management, and advocacy frameworks.",
    tags: ["Case Management", "Advocacy", "Social Welfare", "Community Outreach"],
    level: "Diploma",
    career: "Health & Community Services",
    delivery: "Online + Placement",
    isRecognised: true,
    duration: "18 - 24 Months",
    code: "CHC52021",
    rating: 4.8,
    reviewsCount: 89,
  },
  {
    id: "ahc30116",
    title: "Certificate III in Agriculture",
    description:
      "Develop practical skills in sustainable crop production, livestock handling, agricultural machinery operations, chemical applications, and soil management.",
    tags: ["Agribusiness", "Crop Production", "Livestock", "Farm Operations"],
    level: "Certificate III",
    career: "Agriculture Courses",
    delivery: "Blended",
    isRecognised: true,
    duration: "12 Months",
    code: "AHC30116",
    rating: 4.7,
    reviewsCount: 42,
  },
  {
    id: "chc30121",
    title: "Certificate III in Early Childhood Education and Care",
    description:
      "Learn foundational early childhood pedagogy, health and safety, play-based learning frameworks, and developmental support for infants and young children.",
    tags: ["Early Learning", "Child Development", "Pedagogy", "Safety"],
    level: "Certificate III",
    career: "Child Care Courses",
    delivery: "Online + Placement",
    isRecognised: true,
    duration: "12 Months",
    code: "CHC30121",
    rating: 4.9,
    reviewsCount: 164,
  },
  {
    id: "acm40418",
    title: "Certificate IV in Veterinary Nursing",
    description:
      "Master clinical veterinary procedures, surgical nursing assistance, diagnostic radiology, pharmacy dispensing, animal triage, and inpatient intensive care.",
    tags: ["Veterinary Nurse", "Clinical Care", "Animal Surgery", "Pathology"],
    level: "Certificate IV",
    career: "Vet Assistant Courses",
    delivery: "Online + Placement",
    isRecognised: true,
    duration: "18 Months (incl. 240hrs Clinical)",
    code: "ACM40418",
    rating: 5.0,
    reviewsCount: 130,
  },
  {
    id: "shb30121",
    title: "Certificate III in Beauty Services (Lash & Brow Specialisation)",
    description:
      "Master eyelash extension application, brow lamination, tinting, threading, and lash lifting techniques with comprehensive hygiene and client consultation training.",
    tags: ["Lash Extensions", "Brow Styling", "Lamination", "Beauty Service"],
    level: "Certificate III",
    career: "Eyelash Courses",
    delivery: "Online",
    isRecognised: true,
    duration: "6 Months",
    code: "SHB30121",
    rating: 4.8,
    reviewsCount: 58,
  },
  {
    id: "shb30321",
    title: "Certificate III in Nail Technology",
    description:
      "Gain professional skills in manicures, pedicures, acrylic and gel nail enhancements, intricate nail art techniques, electric filing, and salon hygiene standards.",
    tags: ["Nail Tech", "Acrylics", "Gel Systems", "Nail Art"],
    level: "Certificate III",
    career: "Nail Art and Design Courses",
    delivery: "Blended",
    isRecognised: true,
    duration: "6 - 9 Months",
    code: "SHB30321",
    rating: 4.7,
    reviewsCount: 47,
  },
  {
    id: "bsb50120",
    title: "Diploma of Business",
    description:
      "Build dynamic administrative, financial, project management, and business planning capabilities to direct enterprise growth and organizational transformation.",
    tags: ["Business Growth", "Financial Planning", "Project Management", "Operations"],
    level: "Diploma",
    career: "Business & Management",
    delivery: "Online",
    isRecognised: true,
    duration: "12 Months",
    code: "BSB50120",
    rating: 4.8,
    reviewsCount: 105,
  },
  {
    id: "cva-short-01",
    title: "Wildlife Conservation and Habitat Management",
    description:
      "Explore biodiversity preservation, native Australian wildlife rehabilitation, ecological monitoring, and national park habitat conservation frameworks.",
    tags: ["Ecology", "Conservation", "Wildlife Rehab", "Biodiversity"],
    level: "Short Course",
    career: "Wildlife Courses",
    delivery: "Online",
    isRecognised: false,
    duration: "8 Weeks (Self-paced)",
    code: "WLD-101",
    rating: 4.9,
    reviewsCount: 38,
  },
  {
    id: "fnc-adv-cert",
    title: "Advanced Certificate in Clinical Sports Nutrition",
    description:
      "Deep dive into macro/micronutrient biochemistry, athletic performance fueling, hydration protocols, metabolic adaptation, and evidence-based dietary planning.",
    tags: ["Sports Nutrition", "Dietary Planning", "Metabolism", "Athletic Performance"],
    level: "Advanced Certificate",
    career: "Fitness and Nutrition Courses",
    delivery: "Online",
    isRecognised: false,
    duration: "6 Months",
    code: "NUT-302",
    rating: 4.9,
    reviewsCount: 64,
  },
  {
    id: "dog-grooming-cert",
    title: "Professional Canine Stylist & Dog Grooming Certificate",
    description:
      "Hands-on expertise in breed-standard grooming, styling, coat maintenance, bathing, handling anxiety, scissor techniques, and setting up a profitable mobile grooming business.",
    tags: ["Dog Grooming", "Pet Styling", "Coat Care", "Animal Handling"],
    level: "Certificate",
    career: "Dog Grooming Course",
    delivery: "Blended",
    isRecognised: false,
    duration: "4 - 6 Months",
    code: "DOG-201",
    rating: 4.8,
    reviewsCount: 45,
  },
  {
    id: "cpd-hr-01",
    title: "Human Resources Strategic Workforce Management",
    description:
      "Accredited professional development program covering industrial relations, talent acquisition, dispute resolution, compensation models, and organizational psychology.",
    tags: ["HR Strategy", "Talent Acquisition", "Employment Law", "Culture"],
    level: "CPD Endorsed",
    career: "Human Resources Courses",
    delivery: "Online",
    isRecognised: false,
    duration: "10 Weeks",
    code: "CPD-HR401",
    rating: 4.9,
    reviewsCount: 51,
  },
  {
    id: "photo-dig-01",
    title: "Professional Digital Photography & Visual Storytelling",
    description:
      "Master exposure control, studio lighting techniques, Lightroom and Photoshop RAW editing, portraiture, and commercial product photography.",
    tags: ["Photography", "Lightroom", "Studio Lighting", "Commercial Editing"],
    level: "Certificate",
    career: "Photography Courses",
    delivery: "Online",
    isRecognised: false,
    duration: "3 - 6 Months",
    code: "PHT-104",
    rating: 4.7,
    reviewsCount: 39,
  },
  {
    id: "hort-land-01",
    title: "Horticultural Science and Landscape Design",
    description:
      "Plant botany, soil fertility, irrigation system design, landscape architecture principles, pest management, and ornamental plant propagation.",
    tags: ["Horticulture", "Landscape Design", "Botany", "Soil Science"],
    level: "Certificate III",
    career: "Horticulture Courses",
    delivery: "Online",
    isRecognised: true,
    duration: "12 Months",
    code: "AHC30716",
    rating: 4.8,
    reviewsCount: 33,
  },
];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]);
  const [nationallyRecognisedOnly, setNationallyRecognisedOnly] = useState(false);
  const [careerSearchFilter, setCareerSearchFilter] = useState("");
  const [showAllCareers, setShowAllCareers] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "rating" | "duration" | "title">("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered Career Options in Sidebar
  const displayedCareerOptions = useMemo(() => {
    const list = filterOptions.career.filter((item) =>
      item.name.toLowerCase().includes(careerSearchFilter.toLowerCase().trim())
    );
    if (!showAllCareers && !careerSearchFilter) {
      return list.slice(0, 8);
    }
    return list;
  }, [careerSearchFilter, showAllCareers]);

  // Toggle helpers
  const toggleCareer = (careerName: string) => {
    setSelectedCareers((prev) =>
      prev.includes(careerName)
        ? prev.filter((item) => item !== careerName)
        : [...prev, careerName]
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((item) => item !== level) : [...prev, level]
    );
  };

  const toggleDelivery = (delivery: string) => {
    setSelectedDelivery((prev) =>
      prev.includes(delivery)
        ? prev.filter((item) => item !== delivery)
        : [...prev, delivery]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCareers([]);
    setSelectedLevels([]);
    setSelectedDelivery([]);
    setNationallyRecognisedOnly(false);
    setCareerSearchFilter("");
  };

  const totalActiveFilters =
    selectedCareers.length +
    selectedLevels.length +
    selectedDelivery.length +
    (nationallyRecognisedOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  // Filtered & Sorted Courses
  const filteredCourses = useMemo(() => {
    let result = coursesData.filter((course) => {
      // Search query filter (matches title, description, tags, career)
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.career.toLowerCase().includes(q) ||
        course.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        (course.code && course.code.toLowerCase().includes(q));

      // Career filter
      const matchesCareer =
        selectedCareers.length === 0 || selectedCareers.includes(course.career);

      // Level filter
      const matchesLevel =
        selectedLevels.length === 0 || selectedLevels.includes(course.level);

      // Delivery filter
      const matchesDelivery =
        selectedDelivery.length === 0 || selectedDelivery.includes(course.delivery);

      // Recognition filter
      const matchesRecognition = !nationallyRecognisedOnly || course.isRecognised;

      return (
        matchesQuery &&
        matchesCareer &&
        matchesLevel &&
        matchesDelivery &&
        matchesRecognition
      );
    });

    // Sorting
    if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "title") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [
    searchQuery,
    selectedCareers,
    selectedLevels,
    selectedDelivery,
    nationallyRecognisedOnly,
    sortBy,
  ]);

  return (
    <main className="w-full overflow-hidden bg-white">
      {/* =========================================================================
          HERO SECTION
          Modern aesthetic with animated ambient gradients, ping badge, title,
          description, quick search bar and key statistics.
      ========================================================================== */}
      <section
        className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,#ebe3ff_0%,#f8f5ff_45%,#ffffff_100%)] pt-12 pb-16 sm:pt-16 sm:pb-24 px-6 sm:px-10 lg:px-16"
        aria-labelledby="courses-hero-heading"
      >
        {/* Ambient Glows */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(168,135,255,0.25)_0%,rgba(90,45,245,0)_70%)] blur-3xl -z-10 animate-pulse-subtle"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-[-10%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(215,198,255,0.3)_0%,rgba(240,230,255,0)_70%)] blur-2xl -z-10"
          aria-hidden="true"
        />

        <div className="max-w-[1360px] mx-auto text-center flex flex-col items-center">
          {/* Animated Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200/90 shadow-xs mb-6 transition-all duration-300 hover:border-purple-300 hover:bg-white hover:shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5a2df5] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5a2df5]" />
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#5a2df5]">
              Explore 450+ Accredited &amp; Career-Focused Programs
            </span>
          </div>

          {/* Heading */}
          <h1
            id="courses-hero-heading"
            className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#11111b] leading-[1.14] mb-6 max-w-[840px]"
          >
            Discover the Right Course for Your{" "}
            <span className="bg-[linear-gradient(135deg,#5a2df5_0%,#8e5eff_50%,#5a2df5_100%)] bg-clip-text text-transparent italic">
              Career Ambitions
            </span>
          </h1>

          {/* Description */}
          <p className="text-neutral-600 text-base sm:text-lg lg:text-[19px] font-normal leading-relaxed max-w-[700px] mb-8">
            Gain recognized qualifications, build real-world competencies, and learn at your
            own pace with our comprehensive catalog of online, blended, and placement-supported
            courses.
          </p>

          {/* Quick Search Bar */}
          <div className="w-full max-w-[650px] mb-8 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-purple-200/90 shadow-lg shadow-purple-950/5 focus-within:border-[#5a2df5] focus-within:ring-4 focus-within:ring-[#5a2df5]/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-all duration-300">
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
                placeholder="Search by title, level, keyword, or career pathway..."
                className="w-full px-3 py-2 bg-transparent text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                aria-label="Search courses"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label="Clear search query"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <a
              href="#courses-catalog"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl sm:rounded-full bg-[#5a2df5] hover:bg-[#481ecc] text-white text-sm sm:text-base font-semibold shadow-md shadow-[#5a2df5]/25 hover:shadow-lg hover:shadow-[#5a2df5]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shrink-0"
            >
              <span>Explore Programs</span>
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
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-4 w-full max-w-[800px] border-t border-purple-100/80">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#11111b] tracking-tight">
                450+
              </span>
              <span className="text-xs sm:text-sm font-medium text-neutral-500">
                Courses Available
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#5a2df5] tracking-tight">
                49+
              </span>
              <span className="text-xs sm:text-sm font-medium text-neutral-500">
                Specialized Sectors
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#11111b] tracking-tight">
                100%
              </span>
              <span className="text-xs sm:text-sm font-medium text-neutral-500">
                Flexible Online Delivery
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#5a2df5] tracking-tight">
                4.9/5
              </span>
              <span className="text-xs sm:text-sm font-medium text-neutral-500">
                Student Satisfaction
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          "FIND YOUR COURSES" SECTION
          Two-column layout:
          - Left sidebar: Comprehensive Filter Panel (Career, Level, Delivery, Recognition)
          - Right content: Courses Grid, Sorting & Result Counters
      ========================================================================== */}
      <section
        id="courses-catalog"
        className="pt-14 pb-20 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-white via-[#faf9ff] to-white"
        aria-labelledby="find-courses-heading"
      >
        <div className="max-w-[1360px] mx-auto">
          {/* Section Heading */}
          <SectionHeading
            className="mb-3"
            headingClassName="text-[32px] sm:text-[38px] font-extrabold text-[#11111b]"
            spanSizeClassName="w-[80px] sm:w-[110px]"
          >
            Find Your Courses
          </SectionHeading>

          <p className="text-center text-neutral-600 text-base sm:text-lg max-w-[660px] mx-auto mb-10">
            Use the filters on the left to narrow down courses by career discipline,
            qualification level, delivery method, and national accreditation status.
          </p>

          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden mb-6">
            <button
              type="button"
              onClick={() => setMobileFilterOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-white border border-purple-200/80 shadow-sm text-sm font-semibold text-neutral-900"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#5a2df5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filter Options</span>
                {totalActiveFilters > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-[#5a2df5] text-white font-bold">
                    {totalActiveFilters}
                  </span>
                )}
              </div>
              <span className="text-xs text-[#5a2df5] font-semibold">
                {mobileFilterOpen ? "Hide Filters ▲" : "Show Filters ▼"}
              </span>
            </button>
          </div>

          {/* Main Grid: Sidebar + Courses Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* =========================================================
                LEFT COLUMN: FILTER SIDEBAR
            ========================================================== */}
            <aside
              className={`lg:col-span-4 xl:col-span-3.5 flex flex-col gap-6 bg-white p-6 rounded-2xl border border-purple-100/90 shadow-sm transition-all duration-300 ${
                mobileFilterOpen ? "block" : "hidden lg:flex"
              }`}
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-100/80">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#11111b]">Filters</h3>
                  {totalActiveFilters > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#5a2df5]/10 text-[#5a2df5]">
                      {totalActiveFilters} active
                    </span>
                  )}
                </div>

                {totalActiveFilters > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-semibold text-[#5a2df5] hover:text-[#481ecc] hover:underline transition-colors"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Filter 1: Career Discipline (Searchable list with counts) */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-neutral-900 tracking-tight">
                  Career Pathway
                </label>

                <div className="relative">
                  <input
                    type="text"
                    value={careerSearchFilter}
                    onChange={(e) => setCareerSearchFilter(e.target.value)}
                    placeholder="Search careers..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-purple-50/40 border border-purple-200/70 focus:outline-none focus:border-[#5a2df5] text-neutral-800 placeholder:text-neutral-400"
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

                <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1">
                  {displayedCareerOptions.map((item) => {
                    const checked = selectedCareers.includes(item.name);
                    return (
                      <label
                        key={item.name}
                        className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                          checked
                            ? "bg-[#5a2df5]/10 text-[#5a2df5]"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCareer(item.name)}
                            className="rounded border-purple-300 text-[#5a2df5] focus:ring-[#5a2df5] accent-[#5a2df5] cursor-pointer"
                          />
                          <span className="line-clamp-1">{item.name}</span>
                        </div>
                        <span className="text-[11px] font-semibold text-neutral-400 shrink-0 ml-1">
                          {item.count}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {!careerSearchFilter && filterOptions.career.length > 8 && (
                  <button
                    type="button"
                    onClick={() => setShowAllCareers((prev) => !prev)}
                    className="text-xs font-semibold text-[#5a2df5] hover:underline self-start pt-1"
                  >
                    {showAllCareers
                      ? "Show less ▲"
                      : `+ View all ${filterOptions.career.length} careers ▼`}
                  </button>
                )}
              </div>

              {/* Filter 2: Qualification Level */}
              <div className="flex flex-col gap-3 pt-4 border-t border-purple-100/80">
                <label className="text-sm font-bold text-neutral-900 tracking-tight">
                  Qualification Level
                </label>
                <div className="flex flex-col gap-2">
                  {filterOptions.level.map((level) => {
                    const checked = selectedLevels.includes(level);
                    return (
                      <label
                        key={level}
                        className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                          checked
                            ? "bg-[#5a2df5]/10 text-[#5a2df5]"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleLevel(level)}
                            className="rounded border-purple-300 text-[#5a2df5] focus:ring-[#5a2df5] accent-[#5a2df5] cursor-pointer"
                          />
                          <span>{level}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Filter 3: Delivery Mode */}
              <div className="flex flex-col gap-3 pt-4 border-t border-purple-100/80">
                <label className="text-sm font-bold text-neutral-900 tracking-tight">
                  Study &amp; Delivery Mode
                </label>
                <div className="flex flex-col gap-2">
                  {filterOptions.delivery.map((delivery) => {
                    const checked = selectedDelivery.includes(delivery);
                    return (
                      <label
                        key={delivery}
                        className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                          checked
                            ? "bg-[#5a2df5]/10 text-[#5a2df5]"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleDelivery(delivery)}
                            className="rounded border-purple-300 text-[#5a2df5] focus:ring-[#5a2df5] accent-[#5a2df5] cursor-pointer"
                          />
                          <span>{delivery}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Filter 4: Recognition */}
              <div className="flex flex-col gap-3 pt-4 border-t border-purple-100/80">
                <label className="text-sm font-bold text-neutral-900 tracking-tight">
                  Accreditation
                </label>
                <label className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs font-medium text-neutral-800 hover:bg-neutral-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nationallyRecognisedOnly}
                    onChange={(e) => setNationallyRecognisedOnly(e.target.checked)}
                    className="rounded border-purple-300 text-[#5a2df5] focus:ring-[#5a2df5] accent-[#5a2df5] cursor-pointer"
                  />
                  <span>Nationally recognised only</span>
                </label>
              </div>
            </aside>

            {/* =========================================================
                RIGHT COLUMN: COURSES CATALOG & TOOLBAR
            ========================================================== */}
            <div className="lg:col-span-8 xl:col-span-8.5 flex flex-col gap-6">
              {/* Header Results Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-purple-100/90 shadow-xs">
                <div>
                  <h2 className="text-lg font-bold text-[#11111b]">
                    Available Programs
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Showing{" "}
                    <strong className="text-[#5a2df5]">{filteredCourses.length}</strong> of{" "}
                    {coursesData.length} matching courses
                  </p>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs text-neutral-500 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-50/50 border border-purple-200/80 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#5a2df5]/20 cursor-pointer"
                  >
                    <option value="featured">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="title">Title (A - Z)</option>
                  </select>
                </div>
              </div>

              {/* Active Filter Chips */}
              {totalActiveFilters > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-xs text-neutral-500 font-semibold">Active:</span>

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#5a2df5]/10 text-[#5a2df5]">
                      <span>&ldquo;{searchQuery}&rdquo;</span>
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="hover:text-black font-bold"
                      >
                        ×
                      </button>
                    </span>
                  )}

                  {selectedCareers.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-800 border border-purple-200/60"
                    >
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => toggleCareer(c)}
                        className="hover:text-black font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  {selectedLevels.map((lvl) => (
                    <span
                      key={lvl}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-800 border border-indigo-200/60"
                    >
                      <span>{lvl}</span>
                      <button
                        type="button"
                        onClick={() => toggleLevel(lvl)}
                        className="hover:text-black font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  {selectedDelivery.map((d) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                    >
                      <span>{d}</span>
                      <button
                        type="button"
                        onClick={() => toggleDelivery(d)}
                        className="hover:text-black font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  {nationallyRecognisedOnly && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200/60">
                      <span>Nationally Recognised</span>
                      <button
                        type="button"
                        onClick={() => setNationallyRecognisedOnly(false)}
                        className="hover:text-black font-bold"
                      >
                        ×
                      </button>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-semibold text-neutral-500 hover:text-[#5a2df5] underline ml-1"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Courses Grid */}
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredCourses.map((course) => (
                    <article
                      key={course.id}
                      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-purple-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(90,45,245,0.12)] hover:border-[#5a2df5]/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                    >
                      {/* Top Accent Hover Line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a2df5] via-[#8e5eff] to-[#a78bfa] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div>
                        {/* Top Meta Badges Row */}
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5a2df5]/10 text-[#5a2df5] border border-[#5a2df5]/20">
                            {course.level}
                          </span>

                          <div className="flex items-center gap-2">
                            {course.isRecognised && (
                              <span
                                title="Nationally Recognised Training"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              >
                                <svg className="w-3 h-3 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Recognised
                              </span>
                            )}

                            <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                              {course.delivery}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-[#11111b] group-hover:text-[#5a2df5] transition-colors duration-200 leading-snug mb-2">
                          {course.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-4">
                          {course.description}
                        </p>

                        {/* Tags Chips */}
                        <div className="flex items-center flex-wrap gap-1.5 mb-5">
                          {course.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50/70 text-neutral-600 border border-purple-100"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer: Duration & CTA */}
                      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-semibold text-neutral-400">
                            Duration
                          </span>
                          <span className="text-xs font-bold text-neutral-800">
                            {course.duration}
                          </span>
                        </div>

                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-100/70 text-[#5a2df5] font-semibold text-xs group-hover:bg-[#5a2df5] group-hover:text-white transition-all duration-300"
                        >
                          <span>Course Info</span>
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
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                /* Empty Search / Filter State */
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
                    No matching courses found
                  </h3>
                  <p className="text-sm text-neutral-500 max-w-sm mb-5">
                    Try clearing one or more filters, or search with different keywords to explore
                    available qualifications.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-5 py-2.5 rounded-full bg-[#5a2df5] text-white text-sm font-semibold hover:bg-[#481ecc] transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION SECTION
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
            Need Guidance?
          </SectionHeading>

          <h2 className="m-0 mb-3 text-2xl sm:text-3xl font-bold leading-tight">
            Need Personalised Course Consultation?
          </h2>

          <p className="mb-8 text-sm sm:text-base leading-relaxed text-[#eee8ff] max-w-[620px]">
            Speak with an education advisor to explore course structures, recognition of prior learning (RPL),
            and career outcome pathways.
          </p>

          <Link
            className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#5a2df5] px-7 text-base font-semibold text-white shadow-lg shadow-[#5a2df5]/30 hover:bg-[#481ecc] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
            href="/contact"
          >
            <span>Talk to an Advisor</span>
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