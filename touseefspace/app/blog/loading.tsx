import React from "react";
import { BlogSkeleton } from "@/components/Skeletons";

export default function BlogLoading() {
  return (
    <div className="page-shell relative pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="section-label">Writing & Dispatches</span>
          <span className="h-1 w-1 rounded-full bg-(--ink-muted) opacity-50" />
          <span className="font-mono text-xs text-(--ink-muted)">Stories & Dispatches</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-(--ink-primary)">
          Systems, stories, and life lessons.
        </h1>

        <p className="text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          Observations from building software, lessons learned along the journey, and essays on craft, curiosity, and life.
        </p>
      </div>

      <div className="mt-8 sm:mt-10">
        <BlogSkeleton />
      </div>
    </div>
  );
}
