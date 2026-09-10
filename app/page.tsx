import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "./_components/site-shell";

const benefits = [
  ["/Group 2.svg", "Industry Specialists"],
  ["/Group 3.svg", "End-to-End Support"],
  ["/Group 4.svg", "Results-Driven Approach"],
  ["/Group 5.svg", "Dedicated Consultants"],
];

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-white">
      {/* ===== Hero ===== */}
      <section
        className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,#ebe3ff_0%,#f6f2ff_45%,#ffffff_100%)] pt-10 pb-16 sm:pt-14 sm:pb-24 px-6 sm:px-10 lg:px-16"
        aria-labelledby="hero-title"
      >
        {/* Ambient background glow decoration */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(168,135,255,0.22)_0%,rgba(90,45,245,0)_70%)] blur-3xl -z-10 animate-pulse-subtle"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-[-10%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(215,198,255,0.3)_0%,rgba(240,230,255,0)_70%)] blur-2xl -z-10"
          aria-hidden="true"
        />

        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start max-lg:items-center max-lg:text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-200/80 shadow-xs mb-6 transition-all duration-300 hover:border-purple-300 hover:bg-white">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5a2df5] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5a2df5]" />
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#5a2df5]">
                Strategic Business Growth & Advisory
              </span>
            </div>

            {/* Consistent & Impactful Heading */}
            <h1
              id="hero-title"
              className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-tight text-[#11111b] leading-[1.12] mb-6 max-w-[700px]"
            >
              Empowering Businesses to{" "}
              <span className="bg-[linear-gradient(135deg,#5a2df5_0%,#8e5eff_50%,#5a2df5_100%)] bg-clip-text text-transparent italic">
                Grow, Scale &amp; Succeed
              </span>
            </h1>

            {/* Subheading / Description */}
            <p className="text-neutral-600 text-base sm:text-lg lg:text-[19px] font-normal leading-relaxed max-w-[620px] mb-6 sm:mb-8">
              Partner with Blixtor to increase your market presence, attract high-value
              customers, and unlock sustainable business growth through tailored
              sales and marketing strategies.
            </p>

            {/* Search Bar */}
            <form
              action="/services"
              method="GET"
              className="w-full max-w-[620px] mb-5 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-purple-200/80 shadow-lg shadow-purple-950/5 focus-within:border-[#5a2df5] focus-within:ring-4 focus-within:ring-[#5a2df5]/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-all duration-300"
            >
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
                  name="q"
                  placeholder="Search courses, services, industries..."
                  className="w-full px-3 py-2 bg-transparent text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  aria-label="Search services or courses"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl sm:rounded-full bg-[#5a2df5] hover:bg-[#481ecc] text-white text-sm sm:text-base font-semibold shadow-md shadow-[#5a2df5]/25 hover:shadow-lg hover:shadow-[#5a2df5]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shrink-0"
              >
                <span>Search</span>
                <Image
                  src="/Arrow up-right.svg"
                  alt=""
                  width={15}
                  height={15}
                  aria-hidden="true"
                  className="brightness-0 invert"
                />
              </button>
            </form>

            {/* Popular Search Suggestions */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-8 max-lg:justify-center">
              <span className="font-semibold text-neutral-600">Popular:</span>
              {["Marketing Strategy", "Sales Growth", "Qualifications", "Consulting"].map(
                (term) => (
                  <Link
                    key={term}
                    href={`/services?q=${encodeURIComponent(term)}`}
                    className="px-2.5 py-1 rounded-full bg-white/70 hover:bg-white text-neutral-700 hover:text-[#5a2df5] border border-purple-100/90 shadow-2xs hover:border-[#5a2df5]/40 transition-colors"
                  >
                    {term}
                  </Link>
                )
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 max-lg:justify-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-[#5a2df5] hover:bg-[#481ecc] text-white text-[15px] sm:text-base font-semibold tracking-wide shadow-lg shadow-[#5a2df5]/25 hover:shadow-xl hover:shadow-[#5a2df5]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <span>Get a Free Consultation</span>
                <Image
                  src="/Arrow up-right.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className="brightness-0 invert transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-white/80 hover:bg-white text-neutral-800 hover:text-[#5a2df5] border border-purple-200/80 hover:border-[#5a2df5]/40 text-[15px] sm:text-base font-semibold backdrop-blur-sm shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <span>Explore All Services</span>
              </Link>
            </div>

            {/* Key Value Metrics / Trust Badges */}
            <div className="pt-8 sm:pt-10 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-neutral-500 max-lg:justify-center">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5a2df5]/10 text-[#5a2df5] font-bold text-xs">
                  ✓
                </span>
                <span>Tailored Growth Plans</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5a2df5]/10 text-[#5a2df5] font-bold text-xs">
                  ✓
                </span>
                <span>End-to-End Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5a2df5]/10 text-[#5a2df5] font-bold text-xs">
                  ✓
                </span>
                <span>Proven Results</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Illustration with Smooth Float Animation */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] lg:max-w-none group">
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(168,135,255,0.3)_0%,transparent_70%)] blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative animate-float">
                <Image
                  className="w-full h-auto drop-shadow-xl transition-transform duration-500 hover:scale-[1.02]"
                  src="/magnific_remove-the-background_iA4QWQ23uK 1.svg"
                  alt="Strategic business growth, marketing and consulting illustration"
                  width={607}
                  height={514}
                  priority
                />
              </div>
            </div>
          </div>
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
      <section className="bg-white pt-[104px] pb-[48px] px-[30px] max-[650px]:px-[18px] max-[650px]:pt-[58px] max-[650px]:pb-[38px]">
        <SectionHeading
          className="mb-[132px] max-[650px]:mb-10"
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

          <div className="about-copy w-[620px] max-w-full pt-0 -mt-[8px] max-[1100px]:w-full">
            <p className="mb-0 text-[16px] font-medium leading-[1.55] text-[#17171f] max-[950px]:text-[14px] max-[950px]:leading-[1.6]">
              At{" "}
              <strong className="font-semibold text-[#5a2df5]">Blixtor</strong>,{" "}
              we help businesses unlock their full potential through innovative
              sales and marketing strategies. By combining creativity, market
              insights, and data-driven solutions, we enable brands to increase
              visibility, attract the right customers, and drive sustainable
              growth. Whether you&apos;re launching a new business, expanding
              into new markets, or looking to improve your sales performance,
              our team delivers tailored strategies that align with your goals.
              From branding and digital marketing to lead generation and sales
              optimization, we focus on creating measurable results that help
              your business grow with confidence. We believe every business is
              unique, which is why we take a personalized approach to every
              project. Our commitment is to build long-term partnerships,
              deliver exceptional value, and empower businesses to achieve
              lasting success.
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
            className="mb-[22px] max-[650px]:mb-3"
            headingClassName="text-white text-[26px] max-[650px]:text-[18px]"
            spanSizeClassName="w-[109px] max-[650px]:w-[54px]"
            leftBgClassName="bg-[linear-gradient(90deg,transparent_0%,#7b49ff_24%,#ffffff_100%)]"
            rightBgClassName="bg-[linear-gradient(90deg,#ffffff_0%,#7b49ff_76%,transparent_100%)]"
          >
            Embark on Your Adventure
          </SectionHeading>

          <h2 className="m-0 mb-[10px] max-w-[780px] text-[28px] font-bold leading-[1.15] max-[650px]:text-[24px]">
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
    </main>
  );
}
