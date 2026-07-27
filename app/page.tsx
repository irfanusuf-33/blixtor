import Image from "next/image";
import Link from "next/link";
import {
  SectionHeading,
  SiteFooter,
  SiteHeader,
} from "./_components/site-shell";

const benefits = [
  ["/Group 2.svg", "Industry Specialists"],
  ["/Group 3.svg", "End-to-End Support"],
  ["/Group 4.svg", "Results-Driven Approach"],
  ["/Group 5.svg", "Dedicated Consultants"],
];

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-white">
      <SiteHeader active="home" />

      {/* ===== Hero ===== */}
      <section
        className={`relative overflow-hidden min-h-[620px] px-[30px] pb-[42px] grid grid-cols-[minmax(0,552px)_minmax(0,1fr)] items-center gap-[34px]
          bg-[radial-gradient(ellipse_45%_55%_at_53%_110%,#ae79f5_0%,#b98bfa_30%,transparent_75%),linear-gradient(106deg,#e9e3ff_0%,#e7ddff_60%,#e6dcff_100%)]
          max-[850px]:grid-cols-1 max-[850px]:gap-5 max-[850px]:px-[30px] max-[850px]:py-[60px] max-[850px]:pb-[54px]
          max-[650px]:min-h-0 max-[650px]:px-[18px] max-[650px]:py-[56px] max-[650px]:pb-[44px]`}
        aria-labelledby="hero-title"
      >
        <div className="relative z-[1] w-full max-[850px]:text-center">
          <p
            className={`w-full max-w-[552px] mb-[24px] text-[#5b2df2] [font-family:var(--font-poppins),Arial,sans-serif] text-[45px] font-light italic leading-[1.4]
              max-[850px]:mx-auto
              max-[650px]:text-[clamp(30px,9vw,45px)]`}
            id="hero-title"
          >
            <span className="block">
              <em className="italic text-[#5a2df5] [font:inherit]">
                Empowering{" "}
              </em>
              <strong className="text-black [font-family:var(--font-poppins),Arial,sans-serif] [font-size:inherit] font-semibold not-italic">
                Businesses
              </strong>
            </span>
            <span className="block">
              <strong className="text-black [font-family:var(--font-poppins),Arial,sans-serif] [font-size:inherit] font-semibold not-italic">
                to{" "}
              </strong>
              <em className="italic font-semibold text-[#5a2df5]">
                Grow, Scale &amp;
              </em>
            </span>
            <em className="italic font-semibold text-[#5a2df5]">Succeed</em>
          </p>

          <p
            className={`w-full max-w-[700px] m-0 text-black [font-family:var(--font-poppins),Arial,sans-serif] text-[18px] font-medium leading-[1.8]
              max-[850px]:mx-auto
              max-[650px]:text-[16px] max-[650px]:leading-[1.55]`}
          >
            Partner with Blixtor to increase your market presence, attract more
            customers, and unlock sustainable business growth through tailored
            sales and marketing strategies.
          </p>

          <div className="flex flex-wrap gap-4 mt-8 max-[850px]:justify-center max-[650px]:gap-[10px] max-[650px]:mt-[25px]">
            <Link
              className={`inline-flex items-center justify-center gap-[10px] h-10 rounded-[11px] [font-family:var(--font-poppins),Arial,sans-serif]
                text-base px-[10px] font-normal transition-[transform,box-shadow] duration-200
                hover:-translate-y-[2px] hover:shadow-[0_5px_12px_#3a1bb838]
                bg-[#5a2df5] text-white
                max-[650px]:h-[38px] max-[650px]:text-[13px]`}
              href="/contact"
            >
              Get a free Consultation
            </Link>
            <Link
              className={`inline-flex items-center justify-center gap-[10px] h-10 rounded-[11px] [font-family:var(--font-poppins),Arial,sans-serif]
                text-base px-[10px] font-normal transition-[transform,box-shadow] duration-200
                hover:-translate-y-[2px] hover:shadow-[0_5px_12px_#3a1bb838]
                border border-[#5a2df5] text-[#5a2df5] bg-transparent
                max-[650px]:h-[38px] max-[650px]:text-[13px]`}
              href="/services"
            >
              Explore Services
            </Link>
          </div>
        </div>

        <div className="relative z-[1] w-full max-w-[607px] justify-self-end max-[850px]:justify-self-center max-[850px]:max-w-[420px] max-[650px]:max-w-[320px]">
          <Image
            className="w-full h-auto block"
            src="/magnific_remove-the-background_iA4QWQ23uK 1.svg"
            alt="Business growth, strategy, and partnership illustration"
            width={607}
            height={514}
            priority
          />
        </div>
      </section>

      {/* ===== About ===== */}
      <section
        className="pt-[68px] px-[30px] pb-[62px] max-[650px]:px-[18px] max-[650px]:py-[46px]"
        id="about"
      >
        <SectionHeading
          className="w-full max-w-[515px] mx-auto mt-4 mb-[80px] max-[650px]:mb-10"
          headingClassName="text-[38px] max-[650px]:text-2xl"
          spanSizeClassName="flex-1 w-auto"
        >
          About Blixtor
        </SectionHeading>
        <div className="grid grid-cols-[minmax(0,1.12fr)_minmax(0,1.02fr)] gap-[50px] items-stretch max-[980px]:grid-cols-1 max-[980px]:gap-8">
          <div className="w-full h-full">
            <div className="relative w-full h-full min-h-[455px] overflow-hidden rounded-[12px] max-[980px]:min-h-[390px] max-[650px]:min-h-[300px]">
              <Image
                className="block h-full w-full rounded-[12px] object-cover"
                src="/boosting-e-commerce-sales-with-digital-strategy 1.svg"
                alt="Digital strategy for e-commerce growth"
                fill
              />
            </div>
          </div>

          <div className="flex h-full w-full flex-col justify-between">
            <div>
              <h3 className="mb-[38px] mt-[4px] max-w-[560px] text-black [font-family:var(--font-poppins),Arial,sans-serif] text-[34px] font-semibold leading-[1.35] max-[650px]:mb-6 max-[650px]:mt-0 max-[650px]:text-[26px]">
                Your Strategic Partner for Business Growth
              </h3>
              <p className="m-0 max-w-[640px] text-[#17171f] [font-family:var(--font-poppins),Arial,sans-serif] text-[16px] font-medium leading-[1.9] max-[650px]:text-[15px] max-[650px]:leading-[1.75]">
                At{" "}
                <strong className="font-semibold text-[#6027FF]">
                  Blixtor
                </strong>
                , we empower businesses to achieve sustainable growth through
                strategic sales, marketing, and business development solutions.
                We work closely with organizations to understand their goals,
                identify new opportunities, and develop tailored strategies that
                strengthen their market presence, attract the right customers,
                and increase revenue. By combining industry expertise with a
                result-driven approach, we help businesses overcome challenges,
                improve performance, and build a strong foundation for long-term
                success.
              </p>
            </div>

            <div className="mt-[20px] grid grid-cols-4 gap-[12px] max-[650px]:grid-cols-2 max-[650px]:gap-3">
              {[
                ["/Frame-25.svg", "industry expertise"],
                ["/Frame-26.svg", "tailored solutions"],
                ["/Frame-27.svg", "transparent communication"],
                ["/Frame-28.svg", "long-term partnership"],
              ].map(([src, alt]) => (
                <div key={alt} className="w-full">
                  <Image
                    src={src}
                    alt={alt}
                    width={703}
                    height={439}
                    className="h-auto w-full rounded-[10px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why choose us ===== */}
      <section
        className="bg-[#EFE9FF] pt-[48px] pb-[54px] px-[50px] max-[650px]:px-[18px] max-[650px]:py-[44px]"
        id="services"
      >
        <SectionHeading
          className="mb-2 text-3xl font-extrabold"
          headingClassName="text-[34px] max-[650px]:text-[28px]"
          spanSizeClassName="w-[109px]"
        >
          Why choose Blixtor
        </SectionHeading>
        <p className="text-center text-[22px] font-bold mb-14 -mt-2 max-[650px]:text-[18px] max-[650px]:mb-8">
          Why Leading RTOs Choose{" "}
          <strong className="font-semibold text-[#6027FF]"> Blixtor </strong>
        </p>

        <div className="grid grid-cols-4 gap-[21px] max-[850px]:grid-cols-2 max-[650px]:gap-3">
          {benefits.map(([src, title]) => (
            <article
              key={src}
              className="min-h-[140px] rounded-sm flex items-center justify-center px-3 py-5"
            >
              <Image
                src={src}
                alt={title}
                width={140}
                height={140}
                className="w-full h-auto object-contain"
              />
            </article>
          ))}
        </div>
      </section>

      {/* ===== Partner ===== */}
      <section className="bg-white pt-[90px] pb-[92px] px-[30px] max-[650px]:px-[18px] max-[650px]:py-[54px]">
        <SectionHeading
          className="mb-[60px] max-[650px]:mb-10"
          headingClassName="text-[30px] max-[650px]:text-xl"
          spanSizeClassName="w-[96px]"
        >
          Your Strategic Partner for Business Growth
        </SectionHeading>

        <div className="grid grid-cols-[560px_540px] gap-[58px] items-start justify-center max-w-[1158px] mx-auto min-h-[430px] max-[1100px]:grid-cols-1 max-[1100px]:gap-8 max-[1100px]:min-h-0">
          <div className="relative w-full aspect-[560/330] rounded-[12px] overflow-hidden">
            <Image
              className="object-cover"
              src="/terufilm_japan-building-9682225 1.svg"
              alt="Modern business district buildings"
              fill
            />
          </div>

          <div className="about-copy w-[540px] max-w-full pt-[6px] max-[1100px]:w-full">
            <p className="mb-0 text-[16px] font-medium leading-[1.55] text-[#17171f] max-[950px]:text-[14px] max-[950px]:leading-[1.6]">
              At{" "}
              <strong className="font-semibold text-[#5a2df5]">Blixtor</strong>,{" "}
              we help businesses unlock their full potential through innovative
              sales and marketing strategies. By combining creativity, market
              insights, and data-driven solutions, we enable brands to increase
              visibility, attract the right customers, and drive sustainable
              growth.
            </p>
            <p className="mb-0 text-[16px] font-medium leading-[1.55] text-[#17171f] max-[950px]:text-[14px] max-[950px]:leading-[1.6]">
              Whether you&apos;re launching a new business, expanding into new
              markets, or looking to improve your sales performance, our team
              delivers tailored strategies that align with your goals. From
              branding and digital marketing to lead generation and sales
              optimization, we focus on creating measurable results that help
              your business grow with confidence.
            </p>
            <p className="mb-0 text-[16px] font-medium leading-[1.55] text-[#17171f] max-[950px]:text-[14px] max-[950px]:leading-[1.6]">
              We believe every business is unique, which is why we take a
              personalized approach to every project. Our commitment is to build
              long-term partnerships, deliver exceptional value, and empower
              businesses to achieve lasting success.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}

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
