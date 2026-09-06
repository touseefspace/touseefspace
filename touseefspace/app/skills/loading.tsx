import React from "react";
import { SkillsSkeleton } from "@/components/Skeletons";

export default function SkillsLoading() {
  return (
    <div className="page-shell relative pt-24 pb-14 md:pt-32 md:pb-20 bg-transparent">
      <div className="max-w-3xl space-y-4">
        <p className="section-label">Skills</p>
        <h1 className="mt-4 text-3xl font-bold text-(--ink-primary) md:text-5xl tracking-tight">
          A practical stack for building and shipping.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          Technologies grouped by the way they show up in real projects: interface work, backend systems, cloud, AI, and tools.
        </p>
      </div>

      <SkillsSkeleton />
    </div>
  );
}
