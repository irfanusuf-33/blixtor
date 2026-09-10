"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both your email address and password.");
      return;
    }

    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      // For demonstration, navigate to the main admin dashboard
      router.push("/admin");
    }, 1000);
  };

  return (
    <main className="relative min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,#ece4ff_0%,#f8f5ff_50%,#ffffff_100%)] overflow-hidden">
      {/* Ambient background glow decoration */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(168,135,255,0.25)_0%,rgba(90,45,245,0)_70%)] blur-3xl -z-10 animate-pulse-subtle"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(215,198,255,0.3)_0%,rgba(90,45,245,0)_70%)] blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-[460px] mx-auto">
        {/* Main Login Card */}
        <div className="relative bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-purple-100/90 shadow-[0_20px_50px_rgba(90,45,245,0.08)]">
          {/* Top Decorative Gradient Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5a2df5] via-[#8e5eff] to-[#a78bfa] rounded-t-3xl" />

          {/* Header Brand & Heading */}
          <div className="flex flex-col items-center text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center mb-6 transition-transform duration-200 hover:scale-105"
              aria-label="Blixtor Home"
            >
              <Image
                src="/Dark 1 1.svg"
                alt="Blixtor"
                width={150}
                height={46}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5a2df5]/10 text-[#5a2df5] text-xs font-bold tracking-wide mb-3 border border-[#5a2df5]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5a2df5] animate-ping" />
              <span>Admin &amp; CRM Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#11111b] tracking-tight mb-2">
              Sign In to Your Account
            </h1>

            <p className="text-xs sm:text-sm text-neutral-500 max-w-[320px]">
              Access course listings, incoming student enquiries, and institutional analytics.
            </p>
          </div>

          {/* Error Alert Box */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-in fade-in duration-200"
            >
              <svg className="w-4 h-4 shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="admin-email"
                className="text-xs font-bold text-neutral-800 uppercase tracking-wider"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@blixtor.com.au"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/15 text-neutral-900 placeholder:text-neutral-400 transition-all"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="admin-password"
                  className="text-xs font-bold text-neutral-800 uppercase tracking-wider"
                >
                  Password
                </label>
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-[#5a2df5] hover:text-[#481ecc] hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-4 focus:ring-[#5a2df5]/15 text-neutral-900 placeholder:text-neutral-400 transition-all"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 text-xs font-medium text-neutral-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-purple-300 text-[#5a2df5] focus:ring-[#5a2df5] accent-[#5a2df5] cursor-pointer"
                />
                <span>Remember this device</span>
              </label>

              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                256-Bit SSL Encrypted
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] bg-[length:200%_100%] hover:bg-[100%_0] text-white text-sm sm:text-base font-bold shadow-lg shadow-[#5a2df5]/25 hover:shadow-xl hover:shadow-[#5a2df5]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
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
                </>
              )}
            </button>
          </form>

          {/* Footer Assistance */}
          <div className="mt-8 pt-6 border-t border-purple-100/80 text-center text-xs text-neutral-500">
            <span>Need admin access or experiencing issues? </span>
            <Link
              href="/contact"
              className="font-bold text-[#5a2df5] hover:underline"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Bottom Security Notice */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-neutral-400">
          <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Authorized administrative personnel only. IP logged for security.</span>
        </div>
      </div>
    </main>
  );
}