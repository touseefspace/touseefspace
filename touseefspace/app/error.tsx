"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Home, RotateCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Custom Error boundary adhering to Apple HIG:
 * - Frosted translucent glass floating over LiquidBackground.
 * - Calm error recovery with tactile 'Try Again' and 'Return Home' options.
 * - Non-intrusive diagnostic disclosure for developer convenience.
 */
export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log exception for telemetry / diagnostics
    console.error("Application runtime error caught by boundary:", error);
  }, [error]);

  return (
    <div className="page-shell relative min-h-[75vh] flex items-center justify-center pt-24 pb-20 sm:pt-32 sm:pb-28 bg-transparent">
      <div className="w-full max-w-xl text-center">
        <div className="relative rounded-3xl border border-(--border-card) bg-(--bg-surface)/70 backdrop-blur-xl p-8 sm:p-14 overflow-hidden shadow-lg">
          {/* Subtle Ambient Sheen */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-rose-500/5 blur-2xl pointer-events-none rounded-full" />

          {/* Icon Container */}
          <div className="relative z-10 mx-auto mb-6 h-16 w-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-xs">
            <AlertCircle className="h-7 w-7 stroke-[1.5]" />
          </div>

          {/* Status Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider border border-(--border-subtle) bg-(--bg-subtle)/50 text-(--ink-muted) mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            <span>Runtime Exception · Handled</span>
          </div>

          {/* Heading */}
          <h1 className="relative z-10 text-2xl sm:text-3xl font-bold tracking-tight text-(--ink-primary)">
            Something unexpected occurred.
          </h1>

          {/* Description */}
          <p className="relative z-10 mt-3 text-sm sm:text-base leading-relaxed text-(--ink-secondary) max-w-md mx-auto">
            A rendering exception was caught safely. You can attempt to refresh the component state or return to the main dashboard.
          </p>

          {/* Action Buttons */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-(--btn-primary-bg) px-5 py-2.5 text-sm font-semibold text-(--btn-primary-fg) transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-xs cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Try Again</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-(--border-subtle) bg-(--bg-subtle)/60 px-5 py-2.5 text-sm font-medium text-(--ink-primary) transition-all duration-200 hover:bg-(--bg-subtle) hover:border-(--border-strong) active:scale-[0.98]"
            >
              <Home size={15} />
              <span>Return Home</span>
            </Link>
          </div>

          {/* Collapsible Diagnostic Details in Development */}
          {process.env.NODE_ENV === "development" && (
            <div className="relative z-10 mt-8 text-left border-t border-(--border-subtle) pt-6">
              <details className="group">
                <summary className="cursor-pointer text-xs font-mono text-(--ink-muted) hover:text-(--ink-primary) transition-colors select-none flex items-center justify-between">
                  <span>Diagnostic Details</span>
                  <span className="text-[10px] text-(--ink-faint) group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-3 p-3.5 rounded-xl bg-(--bg-subtle)/60 border border-(--border-subtle) font-mono text-xs text-(--ink-secondary) overflow-x-auto space-y-1">
                  <p className="text-rose-400 font-semibold">{error.name}: {error.message}</p>
                  {error.digest && (
                    <p className="text-(--ink-muted) text-[11px]">Digest: {error.digest}</p>
                  )}
                  {error.stack && (
                    <pre className="text-[10px] text-(--ink-faint) pt-2 whitespace-pre-wrap">{error.stack.slice(0, 500)}...</pre>
                  )}
                </div>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
