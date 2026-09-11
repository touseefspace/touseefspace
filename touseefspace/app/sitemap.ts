import type { MetadataRoute } from "next";
import { getProjects, getPosts } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://touseefspace.com";
  const now = new Date();

  // Core Static Navigation Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  // Dynamic Case Studies
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectRoutes = projects.map((p) => {
      const slug = typeof p.slug === "string" ? p.slug : p.id;
      const updatedAt = (p as { _updatedAt?: string })._updatedAt;
      return {
        url: `${baseUrl}/projects/${slug}`,
        lastModified: updatedAt ? new Date(updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      };
    });
  } catch {
    // Fallback gracefully handled
  }

  // Dynamic Engineering Articles
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    postRoutes = posts.map((post) => {
      const slug = typeof post.slug === "string" ? post.slug : post.id || "";
      const updatedAt = (post as { _updatedAt?: string })._updatedAt;
      const dateStr = updatedAt || post.publishedAt;
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: dateStr ? new Date(dateStr) : now,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      };
    });
  } catch {
    // Fallback gracefully handled
  }

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
