import Image from "next/image";
import Link from "next/link";
import { SectionHeading, SiteFooter, SiteHeader } from "../_components/site-shell";

export default function ContactPage() {
  return (
    <main className="max-w-[1220px] mx-auto overflow-hidden bg-white">
      <SiteHeader active="contact" />

      {/* ===== Hero ===== */}
      <section
        className={`relative overflow-hidden min-h-[520px] px-[30px] grid grid-cols-[552px_minmax(0,1fr)] items-center gap-[34px]
          bg-[radial-gradient(ellipse_45%_55%_at_53%_110%,#ae79f5_0%,#b98bfa_30%,transparent_75%),linear-gradient(106deg,#e9e3ff_0%,#e7ddff_60%,#e6dcff_100%)]
          max-[850px]:grid-cols-1 max-[850px]:gap-5 max-[850px]:px-[30px] max-[850px]:py-[52px] max-[850px]:pb-[35px]
          max-[650px]:min-h-0 max-[650px]:px-[18px] max-[650px]:py-[52px] max-[650px]:pb-[30px]`}
        aria-labelledby="contact-title"
      >
        <div className="relative z-[1]">
          <p
            className={`w-[552px] mb-[22px] text-[#5b2df2] [font-family:var(--font-poppins),Arial,sans-serif] text-[45px] font-light italic leading-[1.4]
              max-[650px]:w-auto max-[650px]:min-h-0 max-[650px]:text-[clamp(34px,10vw,45px)]`}
            id="contact-title"
          >
            <span className="block">
              <em className="not-italic [font:inherit]">Let&apos;s </em>
              <strong className="text-black [font-family:var(--font-poppins),Arial,sans-serif] text-[45px] font-semibold not-italic">
                Talk
              </strong>
            </span>
            <span className="block">
              <strong className="text-black [font-family:var(--font-poppins),Arial,sans-serif] text-[45px] font-semibold not-italic">
                About Your{" "}
              </strong>
              <em className="not-italic font-semibold">Next Move</em>
            </span>
            <em className="not-italic font-semibold">Today</em>
          </p>

          <p
            className={`w-[658px] max-w-full min-h-0 m-0 text-black [font-family:var(--font-poppins),Arial,sans-serif] text-[15px] font-medium leading-[1.7]
              max-[650px]:w-auto max-[650px]:min-h-0 max-[650px]:text-base max-[650px]:leading-[1.25]`}
          >
            Reach out to Blixtor to discuss your goals, current challenges, and the kind of support that would help you move faster.
          </p>

          <div className="flex gap-4 mt-8 max-[650px]:gap-[10px] max-[650px]:mt-[25px]">
            <Link
              className={`inline-flex items-center justify-center gap-[10px] h-10 rounded-[11px] [font-family:var(--font-poppins),Arial,sans-serif]
                text-base px-[10px] font-normal transition-[transform,box-shadow] duration-200
                hover:-translate-y-[2px] hover:shadow-[0_5px_12px_#3a1bb838]
                bg-[#5a2df5] text-white
                max-[650px]:h-[38px] max-[650px]:text-[13px]`}
              href="mailto:hello@blixtor.com"
            >
              Email Us
            </Link>
            <Link
              className={`inline-flex items-center justify-center gap-[10px] h-10 rounded-[11px] [font-family:var(--font-poppins),Arial,sans-serif]
                text-base px-[10px] font-normal transition-[transform,box-shadow] duration-200
                hover:-translate-y-[2px] hover:shadow-[0_5px_12px_#3a1bb838]
                border border-[#5a2df5] text-[#5a2df5] bg-transparent
                max-[650px]:h-[38px] max-[650px]:text-[13px]`}
              href="/services"
            >
              View Services
            </Link>
          </div>
        </div>

        <div className="relative z-[1] w-full max-w-[607px] justify-self-end max-[850px]:justify-self-center max-[650px]:max-w-[400px]">
          <Image
            className="w-full h-auto block"
            src="/boosting-e-commerce-sales-with-digital-strategy 1.png"
            alt="Digital strategy for e-commerce growth"
            width={703}
            height={439}
            priority
          />
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        className={`relative overflow-hidden text-center text-white rounded-sm mx-[30px] mb-12 px-5 pt-[46px] pb-[37px]
          bg-[linear-gradient(115deg,#190069,#4610d8)]
          before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(90deg,transparent_0_18px,#6d3cf41c_19px_21px)]
          max-[650px]:mx-[18px] max-[650px]:mb-[30px]`}
      >
        <div className="relative z-[1]">
          <SectionHeading
            className="mb-[14px]"
            headingClassName="text-white text-[17px]"
            spanBgClassName="bg-[#8f6eff]"
          >
            Embark on Your Adventure
          </SectionHeading>
          <h2 className="m-0 text-[17px]">Ready to Strengthen Your Organisation?</h2>
          <p className="text-[9px] my-[11px] mb-[22px]">For your Blixtor to inspire clarity, confidence, and content.</p>
          <Link
            className={`inline-flex items-center justify-center gap-[10px] rounded-[11px] [font-family:var(--font-poppins),Arial,sans-serif]
              font-normal transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[0_5px_12px_#3a1bb838]
              bg-[#5a2df5] text-white text-[8px] px-[13px] py-[9px]`}
            href="mailto:hello@blixtor.com"
          >
            Book a Consultation <b>↗</b>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
