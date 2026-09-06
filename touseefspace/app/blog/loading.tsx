import React from "react";
import { BlogSkeleton } from "@/components/Skeletons";

export default function BlogLoading() {
  return (
    <div className="page-shell relative pt-24 pb-20 sm:pt-32 sm:pb-28 bg-transparent">
      {/* Header */}
      <div className="max-w-3xl space-y-4 mb-10">
        <div className="flex items-center gap-2.5">
          <span className="section-label">Writing & Dispatches</span>
          <span className="h-1 w-1 rounded-full bg-(--ink-muted) opacity-50" />
          <span className="font-mono text-xs text-(--ink-muted)">Engineering Thoughts</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-(--ink-primary)">
          Systems, architectures, and practical AI.
        </h1>

        <p className="text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          Notes on turning messy business workflows into reliable software, event-driven ledgers, and practical LLM extraction pipelines.
        </p>
      </div>

      <BlogSkeleton />
    </div>
  );
}
