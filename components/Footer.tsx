import Image from "next/image";
import Link from "next/link";

interface FooterSection {
    title: string;
    links: { label: string; href: string }[];
}

const FOOTER_SECTIONS: FooterSection[] = [
    {
        title: "Explore",
        links: [
            { label: "All Courses", href: "https://blixtor.com.au/courses" },
            { label: "Careers", href: "https://blixtor.com.au/industries" },
            { label: "Providers", href: "https://blixtor.com.au/providers" },
            { label: "Qualification Guides", href: "https://blixtor.com.au/qualifications" },
            { label: "Skill Set Guides", href: "https://blixtor.com.au/skill-sets" },
            { label: "Accredited Course Guides", href: "https://blixtor.com.au/accredited-courses" },
            { label: "RPL", href: "https://blixtor.com.au/rpl" },
            { label: "Blog", href: "https://blixtor.com.au/blog" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "https://blixtor.com.au/about" },
            { label: "Contact", href: "/contact" },
            { label: "List Your Courses", href: "/apply-for-course-listing" },
            { label: "Testimonials", href: "https://blixtor.com.au/testimonials" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy", href: "https://blixtor.com.au/privacy" },
            { label: "Terms", href: "https://blixtor.com.au/terms" },
            { label: "Cookies", href: "https://blixtor.com.au/cookies" },
            { label: "Refunds", href: "https://blixtor.com.au/refund" },
            { label: "Data Protection", href: "https://blixtor.com.au/data-protection" },
        ],
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-[linear-gradient(140deg,#18034a_0%,#2e0f7e_45%,#3f18a6_75%,#1c0456_100%)] text-white pt-16 pb-8 px-6 sm:px-10 lg:px-16 print:hidden">
            {/* Ambient background glow decoration */}
            <div
                className="pointer-events-none absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(142,94,255,0.25)_0%,rgba(96,39,255,0)_70%)] blur-2xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute bottom-0 right-0 w-[520px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(86,39,237,0.18)_0%,rgba(40,10,120,0)_75%)] blur-3xl"
                aria-hidden="true"
            />

            <div className="relative max-w-[1360px] mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-white/10">
                    {/* Left Column: Brand & Logo */}
                    <div className="lg:col-span-4 flex flex-col items-start space-y-5">
                        <Link
                            href="/"
                            className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02]"
                            aria-label="Blixtor home"
                        >
                            <div className="relative p-2 -ml-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg shadow-purple-950/40">
                                <Image
                                    src="/Light 1 1 (1).svg"
                                    alt="Blixtor"
                                    width={240}
                                    height={66}
                                    className="h-10 sm:h-12 w-auto object-contain"
                                    priority
                                />
                            </div>
                        </Link>

                        <p className="text-[#d5cbf8] text-[15px] leading-relaxed max-w-[360px]">
                            Empowering individuals and organizations with strategic growth, accredited knowledge, and world-class guidance.
                        </p>

                        <div className="pt-2 flex items-center gap-3 text-sm text-[#baa7f5]">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white text-xs font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Trusted Growth Partner
                            </span>
                        </div>
                    </div>

                    {/* Right Columns: Structured Navigation Links */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
                        {FOOTER_SECTIONS.map((section) => (
                            <div key={section.title} className="flex flex-col space-y-4">
                                <h3 className="text-white text-lg font-bold tracking-tight pb-1 relative inline-block">
                                    {section.title}
                                    <span className="block mt-1 w-8 h-[2px] bg-[#8e5eff] rounded-full" />
                                </h3>

                                <ul className="space-y-2.5">
                                    {section.links.map((link) => {
                                        const isExternal = link.href.startsWith("http");
                                        return (
                                            <li key={link.label}>
                                                <Link
                                                    href={link.href}
                                                    target={isExternal ? "_blank" : undefined}
                                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                                    className="group inline-flex items-center text-[#c8bdf2] hover:text-white text-[14px] leading-snug transition-all duration-200 hover:translate-x-1"
                                                >
                                                    <span className="w-1 h-1 rounded-full bg-purple-400/40 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                    <span>{link.label}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Attribution */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a999df]">
                    <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-[11px] font-semibold text-white">
                            ©
                        </span>
                        <p>
                            {currentYear} <span className="text-white font-medium">Blixtor</span>. All rights reserved.
                        </p>
                    </div>

                    <p className="text-center sm:text-right text-[#9684d4]">
                        Designed for seamless learning & business acceleration.
                    </p>
                </div>
            </div>
        </footer>
    );
}