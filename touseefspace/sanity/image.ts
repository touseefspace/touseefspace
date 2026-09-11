import { createImageUrlBuilder, type ImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./client";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "52hp81x4",
  dataset: dataset || "production",
});

export type SanityImageSource =
  | Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0]
  | { url?: string; asset?: { url?: string; _id?: string }; _ref?: string }
  | string;

export const urlForImage = (source: SanityImageSource | null | undefined): ImageUrlBuilder | undefined => {
  if (!source || typeof source === "string" || (!("asset" in source) && !("_ref" in source))) {
    return undefined;
  }
  return imageBuilder.image(source).auto("format").fit("max");
};

/**
 * Robustly resolves an image URL from any source:
 * 1. String path (e.g. "/placeholders/dashboard.svg" or "https://...")
 * 2. Object with .url (e.g. { url: "..." })
 * 3. Expanded Sanity asset object (e.g. { asset: { url: "..." } })
 * 4. Sanity image reference object (via urlForImage builder)
 */
export function resolveSanityImageUrl(source: SanityImageSource | null | undefined, width?: number): string | null {
  if (!source) return null;
  if (typeof source === "string") return source;
  if ("url" in source && typeof source.url === "string") return source.url;
  if (
    "asset" in source &&
    source.asset &&
    typeof source.asset === "object" &&
    "url" in source.asset &&
    typeof source.asset.url === "string"
  ) {
    return source.asset.url;
  }

  try {
    const builder = urlForImage(source);
    if (builder) {
      return width ? builder.width(width).url() : builder.url();
    }
  } catch {
    // If builder fails, fall back to null
  }

  return null;
}


