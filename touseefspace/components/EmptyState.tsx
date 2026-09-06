import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles } from "lucide-react";

export interface EmptyStateProps {
  /** Optional badge text shown at the top (defaults to "Space in development") */
  badge?: string;
  /** Primary title of the empty state */
  title?: string;
  /** Supporting message explaining the state */
  description?: string;
  /** Optional custom icon element */
  icon?: React.ReactNode;
  /** Label for the primary CTA button */
  actionLabel?: string;
  /** Destination for the primary CTA button */
  actionHref?: string;
  /** Optional label for secondary button */
  secondaryLabel?: string;
  /** Optional destination for secondary button */
  secondaryHref?: string;
  /** Additional container classes */
  className?: string;
}

/**
 * Apple HIG-inspired empty / under-development state.
 * Employs translucent frosted glass, continuous squircle geometry,
 * restrained typography, and tactile pill buttons.
 */
export default function EmptyState({
  badge = "Space in development",
  title = "Content is currently being curated.",
  description = "New entries and case studies are actively being drafted in Sanity CMS. Check back shortly, or explore other spaces.",
  icon,
  actionLabel = "Return Home",
  actionHref = "/",
  secondaryLabel = "Explore Projects",
  secondaryHref = "/projects",
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-3xl border border-(--border-card) bg-(--bg-surface)/60 backdrop-blur-xl p-8 sm:p-14 text-center relative overflow-hidden transition-all duration-300 hover:border-(--border-strong) ${className}`}
    >
      {/* Subtle ambient gradient sheen */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-linear-to-b from-white/3 to-transparent pointer-events-none rounded-full blur-xl" />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        {/* Icon Pill */}
        <div className="mb-6 h-14 w-14 rounded-2xl bg-(--bg-subtle)/80 border border-(--border-subtle) flex items-center justify-center text-(--ink-primary) shadow-sm">
          {icon || <Compass className="h-6 w-6 stroke-[1.75] text-(--ink-primary)" />}
        </div>

        {/* Status Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border border-(--border-subtle) bg-(--bg-subtle)/50 text-(--ink-muted) mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-(--ink-muted) animate-pulse" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--ink-primary)">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-(--ink-secondary)">
          {description}
        </p>

        {/* Actions */}
        {(actionLabel || secondaryLabel) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {actionLabel && actionHref && (
              <Link
                href={actionHref}
                className="inline-flex items-center gap-2 rounded-xl bg-(--btn-primary-bg) px-5 py-2.5 text-sm font-semibold text-(--btn-primary-fg) transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-xs"
              >
                <span>{actionLabel}</span>
                <ArrowRight size={14} />
              </Link>
            )}

            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-xl border border-(--border-subtle) bg-(--bg-subtle)/60 px-5 py-2.5 text-sm font-medium text-(--ink-primary) transition-all duration-200 hover:bg-(--bg-subtle) hover:border-(--border-strong) active:scale-[0.98]"
              >
                <span>{secondaryLabel}</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
