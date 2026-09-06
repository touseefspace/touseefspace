import React from "react";
import { CaseStudySkeleton } from "@/components/Skeletons";

/**
 * Route-level loading state for /work/[slug] case study pages.
 */
export default function WorkCaseStudyLoading() {
  return <CaseStudySkeleton />;
}
