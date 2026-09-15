import React from "react";
import { SkillsSkeleton } from "@/components/Skeletons";

export default function SkillsLoading() {
  return (
    <div className="page-shell relative pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="max-w-3xl">
        <p className="section-label">Skills & Competency</p>
        <h1 className="mt-4 text-3xl font-bold text-(--ink-primary) md:text-5xl tracking-tight">
          A practical stack for building and shipping.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          Technologies grouped by operational depth: core production drivers, scalable systems, and tooling ecosystems.
        </p>
      </div>

      <SkillsSkeleton />
    </div>
  );
}
