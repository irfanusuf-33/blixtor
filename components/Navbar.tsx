"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-purple-100/60 py-3"
          : "bg-white/95 backdrop-blur-sm border-b border-transparent py-4 sm:py-5"
        }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group relative flex items-center shrink-0 transition-transform duration-200 hover:scale-[1.02]"
          aria-label="Blixtor home"
        >
          <Image
            className="w-[124px] sm:w-[145px] h-auto transition-opacity duration-200"
            src="/Dark 1 1.svg"
            alt="Blixtor"
            width={164}
            height={50}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          aria-label="Primary navigation"
        >
          <div className="flex items-center gap-1 sm:gap-2 bg-neutral-50/80 p-1 rounded-full border border-neutral-200/60 shadow-inner">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-2 rounded-full text-[15px] font-medium transition-all duration-200 ${active
                      ? "text-black font-semibold bg-white shadow-sm"
                      : "text-neutral-600 hover:text-black hover:bg-white/50"
                    }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#5627ed] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Browse Courses & CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="group relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] bg-[length:200%_100%] hover:bg-[100%_0] text-white text-[14px] sm:text-[15px] font-semibold tracking-wide shadow-md shadow-[#5627ed]/25 hover:shadow-lg hover:shadow-[#5627ed]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Browse Courses</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white text-[14px] sm:text-[15px] font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Contact Us</span>
              <Image
                src="/Arrow up-right.svg"
                alt=""
                width={15}
                height={15}
                aria-hidden="true"
                className="brightness-0 invert transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-100/90 text-neutral-800 hover:bg-neutral-200/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5627ed]"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <div className="relative w-5 h-4 flex flex-col justify-between items-center">
            <span
              className={`w-full h-[2px] bg-neutral-800 rounded-full transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`w-full h-[2px] bg-neutral-800 rounded-full transition-all duration-200 ease-in-out ${
                mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-full h-[2px] bg-neutral-800 rounded-full transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-[420px] opacity-100 border-b border-purple-100/80 bg-white/95 backdrop-blur-lg shadow-xl"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-5 flex flex-col gap-3">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  active
                    ? "bg-[#5627ed]/10 text-[#5627ed] font-semibold"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-black"
                }`}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="w-2 h-2 rounded-full bg-[#5627ed]" />
                )}
              </Link>
            );
          })}

          <Link
            href="/courses"
            className="flex items-center justify-center gap-2 mt-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] text-white text-base font-semibold shadow-md shadow-[#5627ed]/20 transition-all duration-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Browse Courses</span>
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
          </Link>

          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-black text-white text-base font-semibold shadow-sm transition-all duration-200"
          >
            <span>Contact Us</span>
            <Image
              src="/Arrow up-right.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
              className="brightness-0 invert"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}