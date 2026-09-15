import React from "react";
import { ProjectsSkeleton } from "@/components/Skeletons";

export default function ProjectsLoading() {
  return (
    <div className="page-shell relative pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="max-w-3xl">
        <p className="section-label">Selected work</p>
        <h1 className="mt-4 text-3xl font-bold text-(--ink-primary) md:text-5xl tracking-tight">
          Projects built around real workflows.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          A focused view of products and experiments across SaaS, automation, machine learning, and full-stack web development.
        </p>
      </div>

      <ProjectsSkeleton />
    </div>
  );
}
