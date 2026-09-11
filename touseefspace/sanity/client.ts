import { createClient } from "next-sanity";

const isDev = process.env.NODE_ENV === "development";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "52hp81x4";
// Default to 'development' in dev mode to prevent accidental live data mutation
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || (isDev ? "development" : "production");
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-01";

// Helpful safety diagnostics in development
if (isDev && typeof window === "undefined") {
  if (dataset === "production") {
    console.warn(
      "\x1b[33m%s\x1b[0m",
      "[Sanity Client] ⚠️ WARNING: Running in development mode but connected to PRODUCTION dataset! Set NEXT_PUBLIC_SANITY_DATASET='development' in .env.local to avoid mutating live data."
    );
  } else {
    console.info(
      "\x1b[32m%s\x1b[0m",
      `[Sanity Client] Connected to dataset: "${dataset}" (${isDev ? "dev sandbox" : "production live"})`
    );
  }
}

/**
 * Client for frontend rendering. In development, automatically uses drafts
 * with SANITY_TOKEN so unpublished draft edits appear immediately.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: isDev ? "drafts" : "published",
  token: isDev ? process.env.SANITY_TOKEN : undefined,
});

/**
 * Authenticated client with write access for migrations, mutations, and drafts.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  perspective: "drafts",
});
