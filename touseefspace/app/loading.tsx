import React from "react";
import { HomeSkeleton } from "@/components/Skeletons";

/**
 * Root transition fallback loader.
 * Renders the high-fidelity HomeSkeleton so root-level route transitions
 * and initial landing states match the home page editorial sections.
 */
export default function Loading() {
  return <HomeSkeleton />;
}
