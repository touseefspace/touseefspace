import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "52hp81x4";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-01";

const isDev = process.env.NODE_ENV === "development";

/**
 * Client for frontend rendering. In development, automatically uses previewDrafts
 * with SANITY_TOKEN so unpublished draft edits appear immediately.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: isDev ? "previewDrafts" : "published",
  token: isDev ? process.env.SANITY_TOKEN : undefined,
});

/**
 * Authenticated client with write access for migrations, mutations, and preview drafts.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  perspective: "previewDrafts",
});
