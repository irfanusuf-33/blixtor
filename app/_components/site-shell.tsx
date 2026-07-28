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
      className={`flex items-center justify-center gap-[21px] max-[650px]:gap-3 ${className}`}
    >
      <span
        className={`hidden sm:block h-[3px] rounded-full ${spanSizeClassName} ${leftBg}`}
      />
      <h2
        className={`m-0 text-[#15151d] text-[30px] font-bold text-center ${headingClassName}`}
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
    "relative text-black text-2xl font-semibold inline-block " +
    "after:content-[''] after:absolute after:left-0 after:-bottom-[5px] after:h-[2px] after:w-full after:bg-black " +
    "max-[650px]:text-[17px]";
  const navLinkInactive =
    "text-[#c5bcbc] text-xl font-normal max-[650px]:text-[17px]";

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
        className="flex items-center gap-[36px] [font-family:var(--font-poppins),Arial,sans-serif] text-base max-[650px]:gap-[12px] max-[650px]:text-[15px]"
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
          className="inline-flex items-center justify-center gap-2 px-4 py-[12px] min-w-[150px] h-[46px] bg-[#5627ed] text-white rounded-[7px] text-base font-normal whitespace-nowrap max-[650px]:min-w-0 max-[650px]:h-[38px] max-[650px]:px-[12px] max-[650px]:py-[8px] max-[650px]:text-sm"
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
    <footer
      className="
        relative
        min-h-[308px]
        overflow-hidden
        bg-[linear-gradient(90deg,#4a347f_0%,#44239a_22%,#32108d_54%,#280576_78%,#24006c_100%)]
        px-[30px]
        pt-[30px]
        pb-[11px]
        text-white
        max-[650px]:min-h-0
        max-[650px]:px-[18px]
        max-[650px]:pt-[22px]
        max-[650px]:pb-[22px]
      "
    >
      <div
        className="
          relative
          flex
          min-h-[267px]
          items-start
          justify-between
          gap-8
          max-[650px]:min-h-0
          max-[650px]:flex-col
          max-[650px]:gap-5
        "
      >
        {/* =========================
            LOGO + GRADIENT
        ========================== */}
        <div
          className="
            relative
            flex
            w-[min(55vw,717px)]
            items-start
            justify-start
            overflow-visible
            rounded-full
            bg-[radial-gradient(ellipse_at_center,rgba(211,194,255,0.6)_0%,rgba(211,194,255,0.5)_20%,rgba(156,126,255,0.38)_40%,rgba(98,57,231,0.2)_60%,rgba(60,22,181,0.08)_78%,rgba(41,8,122,0)_92%)]
            bg-[length:100%_100%]
            bg-no-repeat
            max-[650px]:w-[280px]
          "
        >
          <Image
            src="/Light 1 1 (1).svg"
            alt="Blixtor"
            width={717}
            height={199}
            className="
              relative
              z-10
              h-auto
              w-full
              max-w-full
            "
            priority
          />
        </div>

        {/* =========================
            COMPANY LINKS
        ========================== */}
        <div
          className="
            shrink-0
            pt-[30px]
            text-right
            max-[650px]:pt-0
            max-[650px]:text-left
          "
        >
          <p
            className="
              mb-4
              text-[24px]
              font-semibold
              leading-none
              text-[#c9b8ff]
              max-[650px]:mb-3
              max-[650px]:text-[18px]
            "
          >
            Company
          </p>

          <div
            className="
              flex
              flex-col
              gap-[10px]
              text-[20px]
              leading-[1.5]
              max-[650px]:gap-2
              max-[650px]:text-[15px]
            "
          >
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

        {/* =========================
            COPYRIGHT
        ========================== */}
        <div
          className="
            flex
            items-center
            gap-[13px]
            text-white/95
            max-[650px]:mt-4
            sm:absolute
            sm:bottom-0
            sm:left-0
          "
        >
          <span
            className="
              flex
              h-[23px]
              w-[25px]
              items-center
              justify-center
              rounded-full
              border
              border-white/90
              text-[13px]
              leading-none
            "
          >
            C
          </span>

          <small
            className="
              text-[14px]
              font-normal
              tracking-[0.01em]
              max-[650px]:text-[11px]
            "
          >
            2025 Square UI . All Rights Reserved
          </small>
        </div>
      </div>
    </footer>
  );
}
