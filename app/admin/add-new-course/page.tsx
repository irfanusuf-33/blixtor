"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface UnitOfCompetency {
  unitCode: string;
  unitName: string;
}

export interface CourseFormData {
  // Step 1: Basic Information
  title: string;
  externalSku: string;
  careerCategory: string;
  shortDescription: string;

  // Step 2: Accreditation & Competencies
  qualificationLevel: string;
  nationalCode: string;
  recognition: "Nationally Recognised" | "CPD Endorsed" | "Non-Accredited";
  unitsOfCompetency: UnitOfCompetency[];

  // Step 3: Delivery & Pricing
  deliveryMode: string;
  duration: string;
  fullFee: string;
  paymentPlanWeekly: string;

  // Step 4: Media & Enrollment Setup
  coverImageUrl: string;
  prerequisites: string;
  publicationStatus: "Draft" | "Pending_Approval" | "Active";
}

const INITIAL_FORM_DATA: CourseFormData = {
  title: "",
  externalSku: "",
  careerCategory: "Business & Management",
  shortDescription: "",

  qualificationLevel: "Certificate III",
  nationalCode: "",
  recognition: "Nationally Recognised",
  unitsOfCompetency: [
    { unitCode: "BSBPMG430", unitName: "Undertake project work" },
    { unitCode: "BSBOPS304", unitName: "Deliver and monitor a service to customers" },
  ],

  deliveryMode: "Online",
  duration: "12 Months",
  fullFee: "",
  paymentPlanWeekly: "",

  coverImageUrl: "",
  prerequisites: "",
  publicationStatus: "Draft",
};

const STEP_DEFINITIONS = [
  {
    stepNumber: 1,
    stepName: "Basic Information",
    description: "General metadata and primary identifiers for the course",
  },
  {
    stepNumber: 2,
    stepName: "Accreditation & Competencies",
    description: "Government codes, qualifications, and curriculum structure",
  },
  {
    stepNumber: 3,
    stepName: "Delivery & Pricing",
    description: "Study modes, course duration, and tuition costs",
  },
  {
    stepNumber: 4,
    stepName: "Media & Enrollment Setup",
    description: "Images, student prerequisites, and publication status",
  },
];

export default function AddNewCourse() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CourseFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Field change handler
  const handleChange = (
    field: keyof CourseFormData,
    value: any
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Unit of Competency helpers
  const handleAddUnit = () => {
    setFormData((prev) => ({
      ...prev,
      unitsOfCompetency: [
        ...prev.unitsOfCompetency,
        { unitCode: "", unitName: "" },
      ],
    }));
  };

  const handleUnitChange = (index: number, key: keyof UnitOfCompetency, val: string) => {
    setFormData((prev) => {
      const updated = [...prev.unitsOfCompetency];
      updated[index] = { ...updated[index], [key]: val };
      return { ...prev, unitsOfCompetency: updated };
    });
  };

  const handleRemoveUnit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      unitsOfCompetency: prev.unitsOfCompetency.filter((_, i) => i !== index),
    }));
  };

  // Validation per step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) {
        newErrors.title = "Course title is required.";
      } else if (formData.title.length < 5) {
        newErrors.title = "Title must be at least 5 characters.";
      } else if (formData.title.length > 150) {
        newErrors.title = "Title cannot exceed 150 characters.";
      }

      if (!formData.externalSku.trim()) {
        newErrors.externalSku = "Vendor SKU / Course code is required.";
      }

      if (!formData.careerCategory) {
        newErrors.careerCategory = "Please select a career category.";
      }

      if (!formData.shortDescription.trim()) {
        newErrors.shortDescription = "Short summary is required.";
      } else if (formData.shortDescription.length > 300) {
        newErrors.shortDescription = "Summary cannot exceed 300 characters.";
      }
    } else if (step === 2) {
      if (!formData.qualificationLevel) {
        newErrors.qualificationLevel = "Please select a qualification level.";
      }
      if (!formData.recognition) {
        newErrors.recognition = "Please select recognition status.";
      }
    } else if (step === 3) {
      if (!formData.deliveryMode) {
        newErrors.deliveryMode = "Please select a delivery mode.";
      }
      if (!formData.duration.trim()) {
        newErrors.duration = "Estimated duration is required.";
      }
      if (!formData.fullFee || Number(formData.fullFee) < 0) {
        newErrors.fullFee = "Valid total course fee (AUD) is required.";
      }
    } else if (step === 4) {
      if (!formData.coverImageUrl.trim()) {
        newErrors.coverImageUrl = "Banner image URL is required.";
      } else if (
        !formData.coverImageUrl.startsWith("http://") &&
        !formData.coverImageUrl.startsWith("https://") &&
        !formData.coverImageUrl.startsWith("/")
      ) {
        newErrors.coverImageUrl = "Please enter a valid URL (starting with https:// or /).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step Navigation
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepClick = (stepNum: number) => {
    if (stepNum < currentStep) {
      setCurrentStep(stepNum);
    } else {
      if (validateStep(currentStep)) {
        setCurrentStep(stepNum);
      }
    }
  };

  // Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#faf9ff] py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1180px] mx-auto">
        {/* Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-purple-100/90">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-1">
              <Link href="/admin" className="hover:text-[#5a2df5] transition-colors">
                Admin Portal
              </Link>
              <span>/</span>
              <Link href="/admin/list-courses" className="hover:text-[#5a2df5] transition-colors">
                Courses
              </Link>
              <span>/</span>
              <span className="text-[#5a2df5]">Add New Course</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#11111b] tracking-tight">
              Add New Course
            </h1>

            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Create and publish an accredited or vocational course into the national catalog.
            </p>
          </div>

          <Link
            href="/admin/list-courses"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-purple-200/80 text-xs sm:text-sm font-semibold text-neutral-700 hover:border-[#5a2df5] hover:text-[#5a2df5] transition-all shadow-xs self-start sm:self-auto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Course List</span>
          </Link>
        </div>

        {/* Success Modal / State */}
        {isSubmitted ? (
          <div className="bg-white rounded-3xl border border-purple-200 p-8 sm:p-12 text-center shadow-xl max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 text-2xl font-bold">
              ✓
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-[#5a2df5] mb-3">
              Status: {formData.publicationStatus}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11111b] mb-2">
              Course Created Successfully!
            </h2>

            <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
              <strong>{formData.title}</strong> has been registered with SKU{" "}
              <code className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-800 font-mono">
                {formData.externalSku}
              </code>
              .
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData(INITIAL_FORM_DATA);
                  setCurrentStep(1);
                  setIsSubmitted(false);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#5a2df5] text-white text-sm font-semibold hover:bg-[#481ecc] transition-all"
              >
                + Add Another Course
              </button>

              <Link
                href="/courses"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-50 text-[#5a2df5] text-sm font-semibold hover:bg-purple-100 transition-all border border-purple-200"
              >
                View Live Catalog
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* =========================================================
                STEPPER PROGRESS BAR (4 STEPS)
            ========================================================== */}
            <div className="bg-white p-5 sm:p-7 rounded-3xl border border-purple-100/90 shadow-xs">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STEP_DEFINITIONS.map((step) => {
                  const isActive = currentStep === step.stepNumber;
                  const isCompleted = currentStep > step.stepNumber;

                  return (
                    <button
                      key={step.stepNumber}
                      type="button"
                      onClick={() => handleStepClick(step.stepNumber)}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl text-left transition-all cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-purple-50 via-white to-purple-50/40 border border-[#5a2df5]/50 shadow-xs"
                          : isCompleted
                          ? "hover:bg-purple-50/40 opacity-90"
                          : "opacity-60 hover:opacity-80"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-9 h-9 rounded-xl font-bold text-sm shrink-0 transition-all ${
                          isCompleted
                            ? "bg-emerald-500 text-white shadow-xs"
                            : isActive
                            ? "bg-[#5a2df5] text-white shadow-md shadow-[#5a2df5]/30 ring-4 ring-[#5a2df5]/15"
                            : "bg-purple-100 text-[#5a2df5]"
                        }`}
                      >
                        {isCompleted ? "✓" : step.stepNumber}
                      </div>

                      <div className="flex flex-col overflow-hidden">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">
                          Step {step.stepNumber} of 4
                        </span>
                        <span
                          className={`text-xs sm:text-sm font-bold truncate ${
                            isActive ? "text-[#5a2df5]" : "text-neutral-800"
                          }`}
                        >
                          {step.stepName}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step Progress Line */}
              <div className="w-full bg-purple-100 h-1.5 rounded-full mt-5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#5a2df5] to-[#8e5eff] h-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* =========================================================
                STEPPER FORM CONTAINER
            ========================================================== */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-7 sm:p-10 rounded-3xl border border-purple-100/90 shadow-[0_10px_36px_rgba(90,45,245,0.05)]"
            >
              {/* Step Title & Description */}
              <div className="pb-6 mb-8 border-b border-purple-100/80">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-[#5a2df5] text-white">
                    Step {currentStep}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#11111b]">
                    {STEP_DEFINITIONS[currentStep - 1].stepName}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-neutral-500">
                  {STEP_DEFINITIONS[currentStep - 1].description}
                </p>
              </div>

              {/* =========================================================
                  STEP 1: BASIC INFORMATION
              ========================================================== */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Course Title */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="e.g., Certificate III in Individual Support"
                      className={`px-4 py-3 text-sm rounded-xl bg-purple-50/40 border focus:outline-none focus:ring-4 transition-all text-neutral-900 placeholder:text-neutral-400 ${
                        errors.title
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-purple-200/80 focus:border-[#5a2df5] focus:ring-[#5a2df5]/10"
                      }`}
                    />
                    {errors.title && (
                      <span className="text-xs text-red-600 font-medium">{errors.title}</span>
                    )}
                    <span className="text-[11px] text-neutral-400">
                      Must be between 5 and 150 characters. ({formData.title.length}/150)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* External SKU */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                        Vendor SKU / Course Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.externalSku}
                        onChange={(e) => handleChange("externalSku", e.target.value)}
                        placeholder="e.g., MCIE-CHC33021-2026"
                        className={`px-4 py-3 text-sm rounded-xl bg-purple-50/40 border focus:outline-none focus:ring-4 transition-all text-neutral-900 placeholder:text-neutral-400 ${
                          errors.externalSku
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-purple-200/80 focus:border-[#5a2df5] focus:ring-[#5a2df5]/10"
                        }`}
                      />
                      {errors.externalSku && (
                        <span className="text-xs text-red-600 font-medium">{errors.externalSku}</span>
                      )}
                    </div>

                    {/* Career Category */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                        Career Category *
                      </label>
                      <select
                        value={formData.careerCategory}
                        onChange={(e) => handleChange("careerCategory", e.target.value)}
                        className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 text-neutral-900 cursor-pointer"
                      >
                        <option value="Aged Care & Disability">Aged Care & Disability</option>
                        <option value="Business & Management">Business & Management</option>
                        <option value="Health & Community Services">Health & Community Services</option>
                        <option value="Education & Teaching">Education & Teaching</option>
                        <option value="Hospitality & Cookery">Hospitality & Cookery</option>
                        <option value="Animal Care & Welfare">Animal Care & Welfare</option>
                      </select>
                    </div>
                  </div>

                  {/* Short Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                      Short Summary *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.shortDescription}
                      onChange={(e) => handleChange("shortDescription", e.target.value)}
                      placeholder="Provide a 2-3 sentence overview of what students will learn..."
                      className={`px-4 py-3 text-sm rounded-xl bg-purple-50/40 border focus:outline-none focus:ring-4 transition-all text-neutral-900 placeholder:text-neutral-400 ${
                        errors.shortDescription
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-purple-200/80 focus:border-[#5a2df5] focus:ring-[#5a2df5]/10"
                      }`}
                    />
                    <div className="flex justify-between items-center text-[11px] text-neutral-400">
                      {errors.shortDescription ? (
                        <span className="text-xs text-red-600 font-medium">
                          {errors.shortDescription}
                        </span>
                      ) : (
                        <span>Brief summary for catalog previews and search results.</span>
                      )}
                      <span>{formData.shortDescription.length}/300</span>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  STEP 2: ACCREDITATION & COMPETENCIES
              ========================================================== */}
              {currentStep === 2 && (
                <div className="space-y-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Qualification Level */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                        Qualification Level *
                      </label>
                      <select
                        value={formData.qualificationLevel}
                        onChange={(e) => handleChange("qualificationLevel", e.target.value)}
                        className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 text-neutral-900 cursor-pointer"
                      >
                        <option value="Certificate III">Certificate III</option>
                        <option value="Certificate IV">Certificate IV</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Advanced Diploma">Advanced Diploma</option>
                        <option value="Short Course">Short Course</option>
                        <option value="CPD Endorsed">CPD Endorsed</option>
                      </select>
                    </div>

                    {/* National Qualification Code */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                        National Qualification Code (VET/TGA)
                      </label>
                      <input
                        type="text"
                        value={formData.nationalCode}
                        onChange={(e) => handleChange("nationalCode", e.target.value)}
                        placeholder="e.g., CHC33021 (Leave blank if non-accredited)"
                        className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  {/* Recognition Status (Radio Buttons) */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                      Recognition Status *
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(
                        ["Nationally Recognised", "CPD Endorsed", "Non-Accredited"] as const
                      ).map((rec) => {
                        const checked = formData.recognition === rec;
                        return (
                          <label
                            key={rec}
                            className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                              checked
                                ? "bg-purple-50/70 border-[#5a2df5] shadow-xs text-[#5a2df5]"
                                : "bg-white border-purple-100 hover:border-purple-300 text-neutral-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name="recognition"
                              value={rec}
                              checked={checked}
                              onChange={() => handleChange("recognition", rec)}
                              className="text-[#5a2df5] focus:ring-[#5a2df5] accent-[#5a2df5] cursor-pointer"
                            />
                            <span className="text-xs font-bold">{rec}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Units of Competency (Dynamic Array of Objects) */}
                  <div className="pt-4 border-t border-purple-100/80">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900">
                          Units of Competency / Modules
                        </h3>
                        <p className="text-xs text-neutral-400">
                          Add the core and elective units associated with this qualification.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddUnit}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-[#5a2df5] hover:bg-purple-100 text-xs font-bold border border-purple-200 transition-colors"
                      >
                        + Add Unit
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.unitsOfCompetency.map((unit, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-purple-50/30 rounded-2xl border border-purple-100"
                        >
                          <span className="text-xs font-bold text-neutral-400 w-6 text-center">
                            #{index + 1}
                          </span>

                          <div className="w-1/3 min-w-[120px]">
                            <input
                              type="text"
                              value={unit.unitCode}
                              onChange={(e) =>
                                handleUnitChange(index, "unitCode", e.target.value)
                              }
                              placeholder="e.g., CHCADV001"
                              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] text-neutral-900 font-mono"
                            />
                          </div>

                          <div className="flex-1">
                            <input
                              type="text"
                              value={unit.unitName}
                              onChange={(e) =>
                                handleUnitChange(index, "unitName", e.target.value)
                              }
                              placeholder="e.g., Facilitate interests of clients"
                              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] text-neutral-900"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveUnit(index)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="Remove unit"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}

                      {formData.unitsOfCompetency.length === 0 && (
                        <div className="text-center py-6 border border-dashed border-purple-200 rounded-2xl text-xs text-neutral-400">
                          No units added yet. Click &ldquo;+ Add Unit&rdquo; to insert modules.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  STEP 3: DELIVERY & PRICING
              ========================================================== */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Delivery Mode */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                        Delivery Mode *
                      </label>
                      <select
                        value={formData.deliveryMode}
                        onChange={(e) => handleChange("deliveryMode", e.target.value)}
                        className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 text-neutral-900 cursor-pointer"
                      >
                        <option value="Online">Online</option>
                        <option value="Blended">Blended</option>
                        <option value="Online + Placement">Online + Placement</option>
                        <option value="On Campus">On Campus</option>
                      </select>
                    </div>

                    {/* Estimated Duration */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                        Estimated Duration *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.duration}
                        onChange={(e) => handleChange("duration", e.target.value)}
                        placeholder="e.g., 32 Weeks or 12 Months"
                        className={`px-4 py-3 text-sm rounded-xl bg-purple-50/40 border focus:outline-none focus:ring-4 transition-all text-neutral-900 placeholder:text-neutral-400 ${
                          errors.duration
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-purple-200/80 focus:border-[#5a2df5] focus:ring-[#5a2df5]/10"
                        }`}
                      />
                      {errors.duration && (
                        <span className="text-xs text-red-600 font-medium">{errors.duration}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Total Course Fee */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                        Total Course Fee (AUD) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-neutral-400">
                          $
                        </span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          required
                          value={formData.fullFee}
                          onChange={(e) => handleChange("fullFee", e.target.value)}
                          placeholder="e.g., 2400.00"
                          className={`w-full pl-8 pr-4 py-3 text-sm rounded-xl bg-purple-50/40 border focus:outline-none focus:ring-4 transition-all text-neutral-900 placeholder:text-neutral-400 ${
                            errors.fullFee
                              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                              : "border-purple-200/80 focus:border-[#5a2df5] focus:ring-[#5a2df5]/10"
                          }`}
                        />
                      </div>
                      {errors.fullFee && (
                        <span className="text-xs text-red-600 font-medium">{errors.fullFee}</span>
                      )}
                    </div>

                    {/* Weekly Payment Option */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                        Weekly Payment Option (AUD)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-neutral-400">
                          $
                        </span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.paymentPlanWeekly}
                          onChange={(e) => handleChange("paymentPlanWeekly", e.target.value)}
                          placeholder="e.g., 50.00"
                          className="w-full pl-8 pr-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
                        />
                      </div>
                      <span className="text-[11px] text-neutral-400">
                        Optional flexible payment plan estimate per week.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  STEP 4: MEDIA & ENROLLMENT SETUP
              ========================================================== */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Course Banner Image URL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                      Course Banner Image URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.coverImageUrl}
                      onChange={(e) => handleChange("coverImageUrl", e.target.value)}
                      placeholder="https://assets.yourdomain.com/images/course-banner.jpg"
                      className={`px-4 py-3 text-sm rounded-xl bg-purple-50/40 border focus:outline-none focus:ring-4 transition-all text-neutral-900 placeholder:text-neutral-400 ${
                        errors.coverImageUrl
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-purple-200/80 focus:border-[#5a2df5] focus:ring-[#5a2df5]/10"
                      }`}
                    />
                    {errors.coverImageUrl && (
                      <span className="text-xs text-red-600 font-medium">
                        {errors.coverImageUrl}
                      </span>
                    )}
                  </div>

                  {/* Prerequisites */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                      Entry Requirements &amp; Prerequisites
                    </label>
                    <textarea
                      rows={3}
                      value={formData.prerequisites}
                      onChange={(e) => handleChange("prerequisites", e.target.value)}
                      placeholder="e.g., Must be 18+ years old, completion of Year 10 English or equivalent LLN test..."
                      className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Publication Status */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                      Publishing Action *
                    </label>
                    <select
                      value={formData.publicationStatus}
                      onChange={(e) =>
                        handleChange("publicationStatus", e.target.value as any)
                      }
                      className="px-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/10 text-neutral-900 cursor-pointer"
                    >
                      <option value="Draft">Draft (Save internally)</option>
                      <option value="Pending_Approval">Pending Approval (Submit to Reviewers)</option>
                      <option value="Active">Active (Publish Live Immediately)</option>
                    </select>
                  </div>

                  {/* Course Summary Card Preview */}
                  <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200/70 mt-6">
                    <span className="text-xs font-bold text-[#5a2df5] uppercase tracking-wider block mb-3">
                      Course Verification Summary
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-neutral-400 block">Title:</span>
                        <strong className="text-neutral-800 truncate block">
                          {formData.title || "Untitled"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 block">Level:</span>
                        <strong className="text-neutral-800">{formData.qualificationLevel}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 block">Mode:</span>
                        <strong className="text-neutral-800">{formData.deliveryMode}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 block">Total Fee:</span>
                        <strong className="text-[#5a2df5]">
                          {formData.fullFee ? `$${formData.fullFee} AUD` : "Not specified"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  STEPPER FOOTER BUTTONS
              ========================================================== */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-purple-100/80">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    currentStep === 1
                      ? "opacity-30 cursor-not-allowed text-neutral-400"
                      : "bg-purple-50 text-neutral-700 hover:bg-purple-100 hover:text-black cursor-pointer"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous Step</span>
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-[#5a2df5] hover:bg-[#481ecc] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#5a2df5]/25 hover:shadow-lg hover:shadow-[#5a2df5]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                  >
                    <span>Next: {STEP_DEFINITIONS[currentStep].stepName}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] bg-[length:200%_100%] hover:bg-[100%_0] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#5a2df5]/30 hover:shadow-xl hover:shadow-[#5a2df5]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Publishing Course...</span>
                      </>
                    ) : (
                      <>
                        <span>Publish Course</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M17 17V7H7" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}