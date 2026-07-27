import Image from "next/image";
import Link from "next/link";
import {
  SectionHeading,
  SiteFooter,
  SiteHeader,
} from "../_components/site-shell";

export default function ServicesPage() {
  return (
    <main className="w-full overflow-hidden bg-white">
      <SiteHeader active="services" />

      {/* ===== Hero ===== */}
      <section
        className={`relative overflow-hidden min-h-[620px] px-[30px] grid grid-cols-[minmax(0,652px)_minmax(0,1fr)] items-center gap-[34px]
        bg-[#e7ddff]
        max-[850px]:grid-cols-1 max-[850px]:gap-5 max-[850px]:px-[30px] max-[850px]:py-[52px] max-[850px]:pb-[35px]
        max-[650px]:min-h-0 max-[650px]:px-[18px] max-[650px]:py-[52px] max-[650px]:pb-[30px]`}
        aria-labelledby="services-title"
      >
        <div className="relative z-[1]">
          <p
            className={`w-[552px] max-w-full mb-[22px] text-[#5b2df2] [font-family:var(--font-poppins),Arial,sans-serif] text-[45px] font-light italic leading-[1.4]
            max-[650px]:w-auto max-[650px]:min-h-0 max-[650px]:text-[clamp(34px,10vw,45px)]`}
            id="services-title"
          >
            <span className="block">
              <em className="not-italic [font:inherit]">Comprehensive</em>
            </span>
            <span className="block">
              <strong className="text-black [font-family:var(--font-poppins),Arial,sans-serif] text-[45px] font-semibold not-italic">
                Sales &{" "}
              </strong>
              <em className="not-italic font-semibold">Marketing</em>
            </span>
            <span className="block">
              <em className="not-italic font-semibold">Services</em>
            </span>
          </p>

          <p
            className={`w-[658px] max-w-full min-h-0 m-0 text-black [font-family:var(--font-poppins),Arial,sans-serif] text-[20px] font-medium leading-[1.7]
              max-[650px]:w-auto max-[650px]:min-h-0 max-[650px]:text-base max-[650px]:leading-[1.25]`}
          >
            Explore our range of tailored sales and marketing services, designed
            to help your business build a stronger brand, attract the right
            customers, and achieve sustainable growth.
          </p>

          <div className="flex gap-4 mt-8 max-[650px]:gap-[10px] max-[650px]:mt-[25px]">
            <Link
              className={`inline-flex items-center justify-center gap-[10px] h-[48px] rounded-[11px] [font-family:var(--font-poppins),Arial,sans-serif]
                text-base px-[18px] font-normal transition-[transform,box-shadow] duration-200
                hover:-translate-y-[2px] hover:shadow-[0_5px_12px_#3a1bb838]
                bg-[#5a2df5] text-white
                max-[650px]:h-[42px] max-[650px]:px-[14px] max-[650px]:text-[13px]`}
              href="/contact"
            >
              Request a Free Qoute
            </Link>
            <Link
              className={`inline-flex items-center justify-center gap-[10px] h-[48px] rounded-[11px] [font-family:var(--font-poppins),Arial,sans-serif]
                text-base px-[18px] font-normal transition-[transform,box-shadow] duration-200
                hover:-translate-y-[2px] hover:shadow-[0_5px_12px_#3a1bb838]
                border border-[#5a2df5] text-[#5a2df5] bg-transparent
                max-[650px]:h-[42px] max-[650px]:px-[14px] max-[650px]:text-[13px]`}
              href="/"
            >
              Contact Our Team
            </Link>
          </div>
        </div>

        <div className="relative z-[1] w-full max-w-[700px] justify-self-end max-[850px]:justify-self-center max-[650px]:max-w-[400px]">
          <div className="relative w-full">
            <Image
              className="w-full h-auto block"
              src="/secondpageimage.svg"
              alt="Business growth, strategy, and partnership illustration"
              width={607}
              height={514}
              priority
            />
          </div>
        </div>
      </section>

      {/* ===== Our Services ===== */}
      <section className="bg-white pt-[70px] pb-[80px] px-[30px] max-[650px]:px-[18px] max-[650px]:py-[46px]">
        <SectionHeading
          className="mb-[60px] max-[650px]:mb-10"
          headingClassName="text-[38px] max-[650px]:text-xl"
          spanSizeClassName="w-[90px]"
        >
          Our Services
        </SectionHeading>

        <div className="max-w-[1300px] mx-auto flex flex-col gap-[64px] max-[650px]:gap-10">
          {/* Row 1 — image left, text right */}
          <div className="flex items-stretch gap-[60px] max-[850px]:flex-col max-[850px]:gap-6">
            <div
              className="flex-1 min-h-[300px] rounded-lg overflow-hidden"
              style={{
                backgroundImage: "url('/businessdevelopment.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="flex-1">
              <h3 className="text-[38px] font-bold mb-3 text-black">
                <span className="text-[#5a2df5]">Business</span> Development
              </h3>
              <p className="text-[20px] leading-[1.5] text-[#3B2A6B]">
                Unlock new opportunities and accelerate your business growth
                with <span className="text-[#5a2df5]">Blixtor's</span> Business
                Development Services. We help business identify growth
                opportunities, strengthen their market presence, and build
                strategic partnerships that create lasting value by
                understanding your business goals, target audience, and
                competitive landscape, we develop customized strategies that
                support sustainable success. Our approach combines market
                research, strategic planning, and practical experties to improve
                business performance, expand market reach, and uncover new
                revenue opportunities. Whether you're launching a new venture,
                entering new markets, or scaling an established business,{" "}
                <span className="text-[#5a2df5]">Blixtor</span> provides the
                guidance and support needed to overcome challenges, seize new
                opportunities, and achieve measurable results. Together, we help
                you build a stronger, more competitive business with confidence
                .
              </p>
            </div>
          </div>

          {/* Row 2 — text left, image right */}
          <div className="flex items-stretch gap-[60px] max-[850px]:flex-col max-[850px]:gap-6">
            <div className="flex-1 max-[850px]:order-2">
              <h3 className="text-[38px] font-bold mb-3 text-black">
                <span className="text-[#5a2df5]">Marketing </span> Products
                &amp; Services
              </h3>
              <p className="text-[20px] leading-[1.5] text-[#3B2A6B]">
                At <span className="text-[#5a2df5]">Blixtor</span>, we help
                businesses effectively market their products and services
                through strategic, results-driven solutions. Our team develops
                tailored marketing strategies that increase brand awareness,
                attract the right audience, and drive customer engagement across
                multiple channels. From digital marketing and content creation
                to social media management, SEO, and paid advertising, we ensure
                your offerings reach the people who matter most. By combining
                creativity with data-driven insights, we create campaigns that
                strengthen your brand, generate qualified leads, and improve
                conversion rates. Whether you're launching a new product or
                promoting an existing service, Blixtor delivers marketing
                solutions that support sustainable growth and long-term business
                success.
              </p>
            </div>
            <div
              className="flex-1 min-h-[300px] rounded-lg overflow-hidden max-[850px]:order-1"
              style={{
                backgroundImage: "url('/marketing.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>

          {/* Row 3 — image left, text right */}
          <div className="flex items-stretch gap-[60px] max-[850px]:flex-col max-[850px]:gap-6">
            <div
              className="flex-1 min-h-[300px] rounded-lg overflow-hidden"
              style={{
                backgroundImage: "url('/sales.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="flex-1">
              <h3 className="text-[38px] font-bold mb-3 text-black">
                <span className="text-[#5a2df5]">Sales &amp; Growth</span> of
                Products and Services
              </h3>
              <p className="text-[20px] leading-[1.5] text-[#3B2A6B]">
                Drive higher sales and sustainable business growth with{" "}
                <span className="text-[#5a2df5]">Blixtor's</span> strategic
                sales and growth solutions. We help businesses increase the
                visibility of their products and services, attract qualified
                customers, and convert opportunities into long-term revenue. By
                combining market research, customer insights, and data-driven
                strategies, we create tailored plans that strengthen your sales
                process and maximize business performance. Whether you're
                launching a new offering, expanding into new markets, or looking
                to boost existing sales, our team provides the expertise and
                support needed to achieve measurable results. At{" "}
                <span className="text-[#5a2df5]">Blixtor</span>, we focus on
                building scalable growth strategies that enhance customer
                engagement, improve conversions, and position your business for
                long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trusted Partners ===== */}
      <section className="bg-white pb-[70px] px-[30px] max-[650px]:px-[18px] max-[650px]:pb-[46px]">
        <SectionHeading
          className="mb-[40px] max-[650px]:mb-8"
          headingClassName="text-[34px] max-[650px]:text-lg"
          spanSizeClassName="w-[90px]"
        >
          Trusted Partners
        </SectionHeading>

        <div className="flex flex-wrap items-center justify-center gap-x-[60px] gap-y-6 max-w-[800px] mx-auto max-[650px]:gap-x-8">
          <Image
            src="/trustedpartners.svg"
            alt="Trusted partner logos: Australian Sovereign College, Indigo Polytechnic, RTO Specialist"
            width={700}
            height={140}
            className="h-auto w-full max-w-[500px] object-contain max-[650px]:max-w-[420px]"
          />
        </div>
      </section>

      {/*cta*/}
      <section
        style={{
          backgroundImage: "url('/Group 6.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={`relative mx-[30px] mb-12 h-[410px] overflow-hidden rounded-[8px] text-center text-white
        max-[650px]:mx-[18px] max-[650px]:mb-[30px] max-[650px]:h-auto max-[650px]:min-h-[360px] max-[650px]:px-4 max-[650px]:py-[44px]`}
        id="contact"
      >
        <div className="relative z-[1] mx-auto flex h-full max-w-[758px] flex-col items-center justify-start pt-[70px] max-[650px]:pt-0">
          <SectionHeading
            className="mb-[15px] max-[650px]:mb-3"
            headingClassName="text-white text-[26px] max-[650px]:text-[18px]"
            spanSizeClassName="w-[109px] max-[650px]:w-[54px]"
            leftBgClassName="bg-[linear-gradient(90deg,transparent_0%,#7b49ff_24%,#ffffff_100%)]"
            rightBgClassName="bg-[linear-gradient(90deg,#ffffff_0%,#7b49ff_76%,transparent_100%)]"
          >
            Embark on Your Adventure
          </SectionHeading>

          <h2 className="m-0 mb-[10px] max-w-[695px] text-[36px] font-bold leading-[1.15] max-[650px]:text-[24px]">
            Ready to Strengthen Your Organisation?
          </h2>

          <p className="mb-[45px] max-w-[759px] text-[16px] leading-[1.7] text-[#eee8ff] max-[650px]:mb-8 max-[650px]:text-[13px] max-[650px]:leading-[1.6]">
            Partner with Blixtor to simplify compliance, attract the right
            talent, and accelerate business growth.
          </p>

          <Link
            className={`inline-flex h-[47px] w-[238px] max-w-full items-center justify-center gap-[15px] rounded-[10px] [font-family:var(--font-poppins),Arial,sans-serif]
            whitespace-nowrap bg-[#5a2df5] px-[10px] text-[18px] font-medium text-white transition-[transform,box-shadow] duration-200
            hover:-translate-y-[2px] hover:shadow-[0_5px_12px_#3a1bb838]
            max-[650px]:h-[44px] max-[650px]:w-auto max-[650px]:min-w-[220px] max-[650px]:gap-2 max-[650px]:px-4 max-[650px]:text-[13px]`}
            href="/contact"
          >
            <span className="truncate">Book a Consultation</span>
            <Image
              src="/Phone.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
              className="h-5 w-5 shrink-0 max-[650px]:h-[17px] max-[650px]:w-[17px]"
            />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
