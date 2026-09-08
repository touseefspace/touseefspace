import { createImageUrlBuilder, type ImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./client";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "52hp81x4",
  dataset: dataset || "production",
});

export const urlForImage = (source: any): ImageUrlBuilder | undefined => {
  if (!source || (!source.asset && !source._ref)) {
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
export function resolveSanityImageUrl(source: any, width?: number): string | null {
  if (!source) return null;
  if (typeof source === "string") return source;
  if (source.url && typeof source.url === "string") return source.url;
  if (source.asset?.url && typeof source.asset.url === "string") return source.asset.url;

  try {
    const builder = urlForImage(source);
    if (builder) {
      return width ? builder.width(width).url() : builder.url();
    }
  } catch {
    // If builder fails, fall back to any direct url
  }

  return source.asset?.url || source.url || null;
}


