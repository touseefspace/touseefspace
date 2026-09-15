import React from "react";
import { ExperiencesSkeleton } from "@/components/Skeletons";

export default function ExperiencesLoading() {
  return (
    <div className="page-shell relative pt-24 pb-14 md:pt-32 md:pb-24">
      {/* Editorial Header */}
      <div className="max-w-4xl mb-12 md:mb-16">
        <p className="section-label mb-4">Trajectory</p>
        <h1 className="text-3xl font-bold text-(--ink-primary) md:text-5xl tracking-tight leading-tight mb-6">
          The Journey So Far.
        </h1>
        <p className="text-base md:text-lg leading-relaxed text-(--ink-secondary) max-w-2xl">
          A chronicle of technical growth, from foundational computer science to professional full-stack delivery.
        </p>
      </div>

      <ExperiencesSkeleton />
    </div>
  );
}
