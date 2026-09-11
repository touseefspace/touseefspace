import React from "react";
import Link from "next/link";
import { Compass, FileCode2, Home, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Space Not Found | touseefspace",
  description: "The page you are looking for does not exist or has been relocated.",
};

/**
 * Custom 404 Not Found page adhering to Apple HIG:
 * - Translucent frosted card floating gracefully over LiquidBackground.
 * - Restrained typography and continuous squircle corners.
 * - Helpful, clear departure routes.
 */
export default function NotFound() {
  return (
    <div className="page-shell relative min-h-[75vh] flex items-center justify-center pt-24 pb-20 sm:pt-32 sm:pb-28 bg-transparent">
      <div className="w-full max-w-xl text-center">
        {/* Floating Frosted Glass Card */}
        <div className="relative rounded-3xl border border-(--border-card) bg-(--bg-surface)/70 backdrop-blur-xl p-8 sm:p-14 overflow-hidden shadow-lg">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-white/4 blur-2xl pointer-events-none rounded-full" />

          {/* Minimalist Radar / 404 Icon Container */}
          <div className="relative z-10 mx-auto mb-6 h-16 w-16 rounded-2xl bg-(--bg-subtle)/80 border border-(--border-subtle) flex items-center justify-center text-(--ink-primary) shadow-xs">
            <Compass className="h-7 w-7 stroke-[1.5] text-(--ink-primary) animate-[spin_20s_linear_infinite]" />
          </div>

          {/* Section Indicator */}
          <div className="relative z-10 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider border border-(--border-subtle) bg-(--bg-subtle)/50 text-(--ink-muted) mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-(--accent-warm) animate-pulse" />
            <span>404 · Signal Lost</span>
          </div>

          {/* Heading */}
          <h1 className="relative z-10 text-3xl sm:text-4xl font-bold tracking-tight text-(--ink-primary)">
            This space doesn&apos;t exist.
          </h1>

          {/* Supporting Text */}
          <p className="relative z-10 mt-3 text-sm sm:text-base leading-relaxed text-(--ink-secondary) max-w-md mx-auto">
            The link may be outdated, the project slug could have moved, or this page is still being assembled.
          </p>

          {/* Direct Navigation Actions */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="btn-primary h-9! sm:h-10! px-4! sm:px-5! text-xs! sm:text-sm font-semibold rounded-xl inline-flex items-center gap-2 shadow-xs"
            >
              <Home size={15} />
              <span>Return Home</span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-(--border-subtle) bg-(--bg-subtle)/60 px-4! sm:px-5 py-2! sm:py-2.5 text-xs! sm:text-sm font-medium text-(--ink-primary) transition-all duration-200 hover:bg-(--bg-subtle) hover:border-(--border-strong) active:scale-[0.98]"
            >
              <FileCode2 size={15} />
              <span>View Projects</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-(--border-subtle) bg-(--bg-subtle)/60 px-4! sm:px-5 py-2! sm:py-2.5 text-xs! sm:text-sm font-medium text-(--ink-primary) transition-all duration-200 hover:bg-(--bg-subtle) hover:border-(--border-strong) active:scale-[0.98]"
            >
              <Mail size={15} />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
