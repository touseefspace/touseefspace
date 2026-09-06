import { revalidateTag } from "next/cache";

/**
 * Reusable Payload CMS hook to revalidate a specific Next.js cache tag.
 * Leverages the Next.js 16 revalidateTag(tag, 'max') invalidation profile.
 */
export const revalidateTagHook = (tag: string) => {
  return () => {
    try {
      revalidateTag(tag, "max");
      console.log(`[Cache Revalidation] Tag "${tag}" successfully invalidated (max profile).`);
    } catch (error) {
      console.error(`[Cache Revalidation] Error invalidating tag "${tag}":`, error);
    }
  };
};

/**
 * Reusable Payload CMS hook to revalidate multiple Next.js cache tags.
 */
export const revalidateTagsHook = (tags: string[]) => {
  return () => {
    for (const tag of tags) {
      try {
        revalidateTag(tag, "max");
        console.log(`[Cache Revalidation] Tag "${tag}" successfully invalidated (max profile).`);
      } catch (error) {
        console.error(`[Cache Revalidation] Error invalidating tag "${tag}":`, error);
      }
    }
  };
};
