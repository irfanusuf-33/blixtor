import Image from "next/image";
import Link from "next/link";
import {
  SectionHeading,
  SiteFooter,
  SiteHeader,
} from "../_components/site-shell";

export default function ContactPage() {
  return (
    <main className="w-full overflow-hidden bg-white">
      <SiteHeader active="contact" />

      {/* ===== Get in Touch ===== */}
      <section className="px-[30px] pt-[40px] pb-[70px] max-[650px]:px-[18px] max-[650px]:pt-[24px] max-[650px]:pb-[46px]">
        <div className="grid grid-cols-2 gap-[60px] items-start max-[900px]:grid-cols-1 max-[900px]:gap-8">
          {/* Left — heading, text, image */}
          <div>
            <h2 className="text-[60px] font-bold leading-[1.05] mb-6 mt-[60px] text-black max-[650px]:text-[38px] max-[650px]:mt-6">
              Get in{" "}
              <span className="text-[#5a2df5] italic font-semibold">Touch</span>
              <br />
              We&apos;d{" "}
              <span className="text-[#5a2df5] italic font-semibold">
                Love
              </span>{" "}
              to Hear From
              <br />
              <span className="text-[#5a2df5] italic font-semibold">You</span>
            </h2>

            <p className="text-[19px] leading-[1.6] text-[#3B2A6B] mb-6 max-w-[560px]">
              Every organisation is unique, and so are its challenges. Reach out
              to us with your questions, project requirements, or consultation
              requests. Our experts will respond promptly with the guidance you
              need.
            </p>

            <div className="relative w-full aspect-[600/480] rounded-lg overflow-hidden bg-[#e7ddff]">
              <Image
                className="object-cover"
                src="/lastpageimage.svg"
                alt="Blixtor team member ready to assist with your inquiry"
                fill
              />
            </div>
          </div>

          {/* Right — form card */}
          <div className="mt-[60px] border border-[#e5e0f5] rounded-lg p-[44px] max-[650px]:p-6">
            <h3 className="text-[38px] font-semibold italic mb-3 text-black">
              Let&apos;s Start a Conversation
            </h3>
            <p className="text-[18px] leading-[1.6] text-[#6b6b7a] mb-6">
              Tell us about your business and goals. Our team will get back to
              you with tailored solutions to help you grow.
            </p>

            <form className="flex flex-col gap-5">
              <div>
                <label className="block text-[18px] font-medium mb-2 text-black">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full h-[54px] rounded-md border border-[#e0dcf0] bg-[#f7f6fb] px-4 text-[18px] outline-none focus:border-[#5a2df5]"
                />
              </div>

              <div>
                <label className="block text-[18px] font-medium mb-2 text-black">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full h-[54px] rounded-md border border-[#e0dcf0] bg-[#f7f6fb] px-4 text-[18px] outline-none focus:border-[#5a2df5]"
                />
              </div>

              <div>
                <label className="block text-[18px] font-medium mb-2 text-black">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full h-[54px] rounded-md border border-[#e0dcf0] bg-[#f7f6fb] px-4 text-[18px] outline-none focus:border-[#5a2df5]"
                />
              </div>

              <div>
                <label className="block text-[18px] font-medium mb-2 text-black">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full rounded-md border border-[#e0dcf0] bg-[#f7f6fb] px-4 py-3 text-[18px] outline-none focus:border-[#5a2df5] resize-none"
                />
              </div>

              <label className="flex items-center gap-2 text-[16px] text-[#6b6b7a]">
                <input type="checkbox" className="h-5 w-5" />I agree with{" "}
                <a href="#" className="underline">
                  Terms &amp; Conditions
                </a>
              </label>

              <button
                type="submit"
                className="w-full h-[58px] rounded-full bg-[#5a2df5] text-white font-semibold text-[19px] transition-transform duration-200 hover:-translate-y-[2px]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
