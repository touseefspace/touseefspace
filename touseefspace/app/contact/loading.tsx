import React from "react";
import { SocialsSkeleton } from "@/components/Skeletons";

/**
 * Route-level loading state for /contact page.
 */
export default function ContactLoading() {
  return (
    <div className="page-shell relative pt-24 pb-14 md:pt-32 md:pb-20 bg-transparent">
      <div className="max-w-2xl">
        <p className="section-label">Contact</p>
        <h1 className="mt-4 text-3xl font-bold text-(--ink-primary) md:text-5xl tracking-tight leading-[1.05]">
          Let&apos;s connect.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          I&apos;m currently open to new projects and collaborations. Reach out through any of these channels.
        </p>
      </div>

      <SocialsSkeleton />
    </div>
  );
}
