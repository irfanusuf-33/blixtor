"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteFooter, SiteHeader } from "../_components/site-shell";

type FormFeedback = {
  type: "success" | "error";
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    message: "",
    termsAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FormFeedback | null>(null);

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
          message: result.message,
        });
      } else {
        setFeedback({
          type: "error",
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setFeedback({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      <SiteHeader active="contact" />

      {/* =========================
          CONTACT SECTION
      ========================== */}
      <section
        className="
          w-full
          px-[2.5vw]
          pt-[clamp(50px,5vw,90px)]
          pb-[clamp(60px,6vw,100px)]
        "
      >
        <div
          className="
            mx-auto
            grid
            w-full
            grid-cols-[minmax(0,0.97fr)_minmax(0,1.03fr)]
            items-stretch
            gap-[clamp(18px,2vw,40px)]
            max-[900px]:grid-cols-1
          "
        >
          {/* =========================
              LEFT SIDE
          ========================== */}
          <div className="flex min-w-0 flex-col">
            {/* Heading */}
            <h2
              className="
                mb-[clamp(20px,2vw,34px)]
                font-[var(--font-poppins),Arial,sans-serif]
                text-[clamp(34px,3.2vw,58px)]
                font-light
                leading-[1.25]
                tracking-[-0.05em]
                text-black
              "
            >
              <span className="block">
                Get in{" "}
                <span className="font-semibold italic text-[#5a2df5]">
                  Touch
                </span>
              </span>

              <span className="mt-[clamp(10px,1vw,18px)] block italic tracking-[-0.055em]">
                <span className="font-semibold">We&apos;d</span>{" "}
                <span className="font-medium text-[#5a2df5]">Love</span>{" "}
                <span className="font-light">to Hear From</span>
              </span>

              <span className="mt-[clamp(10px,1vw,18px)] block font-semibold italic text-[#5a2df5]">
                You
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                mb-[clamp(35px,4vw,65px)]
                max-w-[700px]
                text-[clamp(14px,1.15vw,20px)]
                leading-[1.5]
                text-black
              "
            >
              Every organisation is unique, and so are its challenges. Reach out
              to us with your questions, project requirements, or consultation
              requests. Our experts will respond promptly with the guidance you
              need.
            </p>

            {/* Image */}
            <div
              className="
                relative
                mt-auto
                aspect-[600/365]
                min-h-[280px]
                w-full
                overflow-hidden
                rounded-[clamp(4px,0.4vw,8px)]
                bg-[#e7ddff]
              "
            >
              <Image
                src="/lastpageimage.svg"
                alt="Blixtor team member ready to assist with your inquiry"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* =========================
              RIGHT SIDE FORM
          ========================== */}
          <div
            className="
              flex
              min-w-0
              flex-col
              rounded-[clamp(7px,0.5vw,12px)]
              border
              border-[#e5e0f5]
              px-[clamp(18px,1.5vw,30px)]
              pb-[clamp(18px,1.5vw,30px)]
              pt-[clamp(20px,1.8vw,34px)]
              shadow-[0_1px_8px_rgba(17,17,27,0.04)]
            "
          >
            {/* Form Heading */}
            <h3
              className="
                mb-[clamp(10px,1vw,18px)]
                text-[clamp(32px,2.6vw,46px)]
                font-semibold
                italic
                leading-[1.2]
                tracking-[-0.03em]
                text-black
              "
            >
              Let&apos;s Start a Conversation
            </h3>

            {/* Form Description */}
            <p
              className="
                mb-[clamp(28px,3vw,52px)]
                max-w-[800px]
                text-[clamp(12px,1vw,18px)]
                leading-[1.5]
                text-black
              "
            >
              Tell us about your business and goals. Our team will get back to
              you with tailored solutions to help you grow.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
              {/* First Name */}
              <div className="mb-[clamp(14px,1.3vw,24px)]">
                <label
                  htmlFor="firstName"
                  className="
                    mb-[clamp(6px,0.6vw,10px)]
                    block
                    text-[clamp(18px,1.6vw,24px)]
                    font-medium
                    text-black
                  "
                >
                  First Name <span className="text-[#5a2df5]">*</span>
                </label>

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
                  className="
                    h-[clamp(36px,3vw,52px)]
                    w-full
                    rounded-[6px]
                    border
                    border-[#d8d7e3]
                    bg-[#f9f9fc]
                    px-[clamp(10px,0.8vw,16px)]
                    text-[clamp(12px,0.9vw,16px)]
                    outline-none
                    transition-colors
                    focus:border-[#5a2df5]
                  "
                />
              </div>

              {/* Email */}
              <div className="mb-[clamp(14px,1.3vw,24px)]">
                <label
                  htmlFor="email"
                  className="
                    mb-[clamp(6px,0.6vw,10px)]
                    block
                    text-[clamp(18px,1.6vw,24px)]
                    font-medium
                    text-black
                  "
                >
                  Email <span className="text-[#5a2df5]">*</span>
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
                  className="
                    h-[clamp(36px,3vw,52px)]
                    w-full
                    rounded-[6px]
                    border
                    border-[#d8d7e3]
                    bg-[#f9f9fc]
                    px-[clamp(10px,0.8vw,16px)]
                    text-[clamp(12px,0.9vw,16px)]
                    outline-none
                    transition-colors
                    focus:border-[#5a2df5]
                  "
                />
              </div>

              {/* Phone Number */}
              <div className="mb-[clamp(14px,1.3vw,24px)]">
                <label
                  htmlFor="phone"
                  className="
                    mb-[clamp(6px,0.6vw,10px)]
                    block
                    text-[clamp(18px,1.6vw,24px)]
                    font-medium
                    text-black
                  "
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
                  className="
                    h-[clamp(36px,3vw,52px)]
                    w-full
                    rounded-[6px]
                    border
                    border-[#d8d7e3]
                    bg-[#f9f9fc]
                    px-[clamp(10px,0.8vw,16px)]
                    text-[clamp(12px,0.9vw,16px)]
                    outline-none
                    transition-colors
                    focus:border-[#5a2df5]
                  "
                />
              </div>

              {/* Message */}
              <div className="mb-[clamp(14px,1.3vw,24px)]">
                <label
                  htmlFor="message"
                  className="
                    mb-[clamp(6px,0.6vw,10px)]
                    block
                    text-[clamp(18px,1.6vw,24px)]
                    font-medium
                    text-black
                  "
                >
                  Message <span className="text-[#5a2df5]">*</span>
                </label>

                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="
                    h-[clamp(100px,8vw,160px)]
                    w-full
                    resize-none
                    rounded-[6px]
                    border
                    border-[#d8d7e3]
                    bg-[#f9f9fc]
                    px-[clamp(10px,0.8vw,16px)]
                    py-[clamp(8px,0.6vw,12px)]
                    text-[clamp(12px,0.9vw,16px)]
                    outline-none
                    transition-colors
                    focus:border-[#5a2df5]
                  "
                />
              </div>

              {/* Terms */}
              <label
                className="
                  flex
                  items-center
                  gap-[6px]
                  text-[clamp(10px,0.75vw,14px)]
                  text-[#b6b6c2]
                "
              >
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
                  className="
                    h-[clamp(11px,0.8vw,15px)]
                    w-[clamp(11px,0.8vw,15px)]
                    rounded-[3px]
                    border
                    border-[#d8d7e3]
                    accent-[#5a2df5]
                  "
                />

                <span>
                  I agree with{" "}
                  <a href="#" className="underline underline-offset-1">
                    Terms &amp; Conditions
                  </a>{" "}
                  <span className="text-[#5a2df5]">*</span>
                </span>
              </label>

              {/* Button */}
              <button
                type="submit"
                disabled={!isFormComplete || isSubmitting}
                className="
                  mt-[clamp(24px,2.5vw,40px)]
                  h-[clamp(40px,3.2vw,54px)]
                  w-full
                  rounded-full
                  bg-[#5d2bf6]
                  text-[clamp(18px,1.6vw,22px)]
                  font-semibold
                  text-white
                  transition-transform
                  duration-200
                  hover:-translate-y-[2px]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:translate-y-0
                "
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {feedback && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-feedback-title"
        >
          <div className="w-full max-w-[430px] rounded-[12px] border border-[#e5e0f5] bg-white p-[clamp(22px,2vw,30px)] text-center shadow-[0_18px_50px_rgba(17,17,27,0.18)]">
            <div
              className="
                mx-auto
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#efe9ff]
                text-[30px]
                font-semibold
                text-[#5a2df5]
              "
              aria-hidden="true"
            >
              {feedback.type === "success" ? "OK" : "!"}
            </div>

            <h4
              id="contact-feedback-title"
              className="mb-3 text-[clamp(24px,2vw,32px)] font-semibold italic leading-[1.2] tracking-[-0.03em] text-black"
            >
              {feedback.type === "success"
                ? "Message Sent"
                : "Message Not Sent"}
            </h4>

            <p className="mx-auto mb-6 max-w-[330px] text-[clamp(13px,1vw,16px)] leading-[1.6] text-black">
              {feedback.message}
            </p>

            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="
                h-[44px]
                min-w-[150px]
                rounded-full
                bg-[#5d2bf6]
                px-6
                text-[16px]
                font-semibold
                text-white
                transition-transform
                duration-200
                hover:-translate-y-[2px]
              "
            >
              Close
            </button>
          </div>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}
