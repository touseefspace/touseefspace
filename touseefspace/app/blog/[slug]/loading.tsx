import React from "react";
import { BlogPostSkeleton } from "@/components/Skeletons";

/**
 * Route-level loading state for /blog/[slug] article pages.
 */
export default function BlogPostLoading() {
  return <BlogPostSkeleton />;
}
