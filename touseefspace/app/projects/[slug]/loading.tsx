import React from "react";
import { CaseStudySkeleton } from "@/components/Skeletons";

/**
 * Route-level loading state for /projects/[slug] case study pages.
 */
export default function ProjectsSlugLoading() {
  return <CaseStudySkeleton />;
}
