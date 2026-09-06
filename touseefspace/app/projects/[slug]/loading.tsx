import React from "react";
import { CaseStudySkeleton } from "@/components/Skeletons";

/**
 * Route-level loading state for /projects/[slug] before redirect to /work/[slug].
 */
export default function ProjectsSlugLoading() {
  return <CaseStudySkeleton />;
}
