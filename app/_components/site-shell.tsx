import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type ActiveRoute = "home" | "services" | "contact";

export function SectionHeading({
  children,
  className = "",
  headingClassName = "",
  spanSizeClassName = "w-[109px]",
  spanBgClassName,
  leftBgClassName,
  rightBgClassName,
}: {
  children: ReactNode;
  className?: string;
  headingClassName?: string;
  spanSizeClassName?: string;
  spanBgClassName?: string;
  leftBgClassName?: string;
  rightBgClassName?: string;
}) {
  const leftBg =
    leftBgClassName ??
    spanBgClassName ??
    "bg-[linear-gradient(90deg,#170058_0%,#6027ff_15%,#6027ff_61%,#ffffff_100%)]";
  const rightBg =
    rightBgClassName ??
    spanBgClassName ??
    "bg-[linear-gradient(90deg,#ffffff_0%,#6027ff_15%,#6027ff_61%,#170058_100%)]";

  return (
    <div
      className={`flex items-center justify-center gap-[21px] mb-[25px] max-[650px]:gap-3 ${className}`}
    >
      <span
        className={`hidden sm:block h-[3px] rounded-full ${spanSizeClassName} ${leftBg}`}
      />
      <h2
        className={`m-0 text-[#15151d] text-[30px] font-bold text-center max-[650px]:text-2xl ${headingClassName}`}
      >
        {children}
      </h2>
      <span
        className={`hidden sm:block h-[3px] rounded-full ${spanSizeClassName} ${rightBg}`}
      />
    </div>
  );
}

export function SiteHeader({ active }: { active: ActiveRoute }) {
  const navLinkActive =
    "relative text-black text-xl font-semibold " +
    "after:content-[''] after:absolute after:left-0 after:-bottom-[5px] after:h-[2px] after:w-[59px] after:bg-black " +
    "max-[650px]:text-[15px] max-[650px]:after:w-[43px]";
  const navLinkInactive =
    "text-[#c5bcbc] text-lg font-normal max-[650px]:text-[15px]";

  return (
    <header className="h-[70px] px-[29px] flex items-center justify-between bg-white max-[650px]:h-16 max-[650px]:px-4">
      <Link
        className="flex items-center h-10 shrink-0"
        href="/"
        aria-label="Blixtor home"
      >
        <Image
          className="w-[137px] h-auto max-[650px]:w-[112px]"
          src="/Dark 1 1.svg"
          alt="Blixtor"
          width={164}
          height={50}
          priority
        />
      </Link>

      <nav
        className="flex items-center gap-[31px] [font-family:var(--font-poppins),Arial,sans-serif] text-base max-[650px]:gap-[10px] max-[650px]:text-[13px]"
        aria-label="Primary navigation"
      >
        <Link
          className={active === "home" ? navLinkActive : navLinkInactive}
          href="/"
        >
          Home
        </Link>
        <Link
          className={active === "services" ? navLinkActive : navLinkInactive}
          href="/services"
        >
          Services
        </Link>
        <Link
          className="inline-flex items-center justify-center gap-2 px-3 py-[10px] min-w-[130px] h-10 bg-[#5627ed] text-white rounded-[7px] text-sm font-normal whitespace-nowrap max-[650px]:min-w-0 max-[650px]:h-[34px] max-[650px]:px-[10px] max-[650px]:py-[7px] max-[650px]:text-xs"
          href="/contact"
        >
          <span className="text-white">Contact Us</span>
          <Image
            src="/Arrow up-right.svg"
            alt=""
            width={18}
            height={18}
            aria-hidden="true"
            className="max-[650px]:w-[14px] max-[650px]:h-[14px]"
          />
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative min-h-[308px] overflow-hidden bg-[linear-gradient(90deg,#4a347f_0%,#44239a_22%,#32108d_54%,#280576_78%,#24006c_100%)] px-[30px] pt-[30px] pb-[11px] text-white max-[650px]:min-h-[240px] max-[650px]:px-[18px] max-[650px]:pt-[22px] max-[650px]:pb-[14px]">
      <div className="pointer-events-none absolute left-[-36px] top-[10px] h-[286px] w-[1080px] rounded-full bg-[radial-gradient(ellipse_at_18%_44%,rgba(211,194,255,0.5)_0%,rgba(156,126,255,0.34)_20%,rgba(98,57,231,0.18)_38%,rgba(60,22,181,0.08)_54%,rgba(41,8,122,0)_72%)] max-[650px]:left-[-18px] max-[650px]:top-[18px] max-[650px]:h-[170px] max-[650px]:w-[420px]" />
      <div className="relative flex min-h-[267px] items-start justify-between gap-8 max-[650px]:min-h-[190px] max-[650px]:flex-col max-[650px]:gap-5">
        <Image
          src="/Light 1 1 (1).svg"
          alt="Blixtor"
          width={717}
          height={199}
          className="h-auto w-[717px] max-w-full max-[650px]:w-[320px]"
          priority
        />

        <div className="pt-[30px] text-right max-[650px]:pt-0 max-[650px]:text-left">
          <p className="mb-4 text-[24px] font-semibold leading-none max-[650px]:mb-3 max-[650px]:text-[18px]">
            Company
          </p>
          <div className="flex flex-col gap-[10px] text-[20px] leading-[1.5] max-[650px]:gap-2 max-[650px]:text-[15px]">
            <Link className="hover:underline" href="/">
              Home
            </Link>
            <Link className="hover:underline" href="/services">
              Services
            </Link>
            <Link className="hover:underline" href="/contact">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 flex items-center gap-[13px] text-white/95 max-[650px]:bottom-[2px]">
          <span className="flex h-[23px] w-[25px] items-center justify-center rounded-full border border-white/90 text-[13px] leading-none">
            C
          </span>
          <small className="text-[14px] font-normal tracking-[0.01em] max-[650px]:text-[11px]">
            2025 Square UI . All Rights Reserved
          </small>
        </div>
      </div>
    </footer>
  );
}
