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
    projectRoutes = projects.map((p: any) => {
      const slug = typeof p.slug === "string" ? p.slug : p.slug?.current || p.id;
      return {
        url: `${baseUrl}/projects/${slug}`,
        lastModified: p._updatedAt ? new Date(p._updatedAt) : now,
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
    postRoutes = posts.map((post: any) => {
      const slug = typeof post.slug === "string" ? post.slug : post.slug?.current || post.id;
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: post._updatedAt || post.publishedAt ? new Date(post._updatedAt || post.publishedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      };
    });
  } catch {
    // Fallback gracefully handled
  }

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
