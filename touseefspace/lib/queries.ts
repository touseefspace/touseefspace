import { cacheLife, cacheTag } from "next/cache";
import { client } from "@/sanity/client";
import {
  PROJECTS_QUERY,
  FEATURED_PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  EXPERIENCES_QUERY,
  SKILL_CATEGORIES_QUERY,
  SOCIAL_LINKS_QUERY,
  HOME_PAGE_QUERY,
} from "@/sanity/queries";
import {
  placeholderProjects,
  placeholderExperiences,
  placeholderSkillCategories,
  placeholderSocialLinks,
  placeholderHomeData,
  placeholderPosts,
} from "./placeholders";

const isDev = process.env.NODE_ENV === "development";

/**
 * Fetch all social links, cached for up to weeks in production, seconds in dev.
 * Falls back to placeholder links if CMS is empty or offline.
 */
export async function getSocialLinks() {
  "use cache";
  cacheTag("social-links");
  cacheLife((isDev ? "seconds" : "weeks") as any);

  try {
    const socials = await client.fetch(SOCIAL_LINKS_QUERY);
    if (socials && socials.length > 0) {
      return socials;
    }
  } catch {
    console.warn("[Sanity] Network query unavailable for social links, using cached local fallback.");
  }

  return placeholderSocialLinks;
}

export function cleanUrl(url?: string | null): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (trimmed.length === 0) return null;
  if (trimmed.includes("touseefspace.vercel.app")) return null;
  return trimmed;
}

function normalizeProject(project: any) {
  if (!project) return project;
  return {
    ...project,
    liveUrl: cleanUrl(project.liveUrl),
    githubUrl: cleanUrl(project.githubUrl),
    technologies: Array.isArray(project.technologies)
      ? project.technologies.filter((t: any) => Boolean(t && (t.name || t.skill)))
      : [],
  };
}

function normalizeExperience(exp: any) {
  if (!exp) return exp;
  return {
    ...exp,
    skillStack: Array.isArray(exp.skillStack)
      ? exp.skillStack.filter((s: any) => Boolean(s && (s.skill || s.name)))
      : [],
  };
}

/**
 * Fetch projects from Sanity, cached for days.
 * Falls back to placeholder projects if CMS is empty or offline.
 */
export async function getProjects(featuredOnly?: boolean) {
  "use cache";
  cacheTag("projects");
  cacheLife((isDev ? "seconds" : "days") as any);

  try {
    const query = featuredOnly ? FEATURED_PROJECTS_QUERY : PROJECTS_QUERY;
    const projects = await client.fetch(query);
    if (projects && projects.length > 0) {
      return projects.map(normalizeProject);
    }
  } catch {
    console.warn("[Sanity] Network query unavailable for projects, using cached local fallback.");
  }

  if (featuredOnly) {
    return placeholderProjects.filter((p) => p.featured).map(normalizeProject);
  }
  return placeholderProjects.map(normalizeProject);
}

/**
 * Fetch a single project by slug.
 */
export async function getProjectBySlug(slug: string) {
  "use cache";
  cacheTag("projects");
  cacheLife((isDev ? "seconds" : "days") as any);

  // Normalize legacy slug aliases if needed
  const targetSlug = slug === "aunvu-erp" ? "wholesale-distribution-erp-platform" : slug;

  try {
    const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug: targetSlug });
    if (project) {
      return normalizeProject(project);
    }
  } catch {
    console.warn(`[Sanity] Network query unavailable for project ${slug}, using cached local fallback.`);
  }

  const fallback = placeholderProjects.find(
    (p) => p.slug === targetSlug || (p as any).aliases?.includes(slug)
  );
  return fallback ? normalizeProject(fallback) : null;
}

/**
 * Fetch blog posts from Sanity, cached for days.
 * Falls back to placeholder posts if CMS is empty or offline.
 */
export async function getPosts() {
  "use cache";
  cacheTag("posts");
  cacheLife((isDev ? "seconds" : "days") as any);

  try {
    const posts = await client.fetch(POSTS_QUERY);
    if (posts && posts.length > 0) {
      return posts;
    }
  } catch {
    console.warn("[Sanity] Network query unavailable for blog posts, using cached local fallback.");
  }

  return placeholderPosts;
}

/**
 * Fetch a single blog post by slug.
 */
export async function getPostBySlug(slug: string) {
  "use cache";
  cacheTag("posts");
  cacheLife((isDev ? "seconds" : "days") as any);

  try {
    const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });
    if (post) {
      return post;
    }
  } catch {
    console.warn(`[Sanity] Network query unavailable for blog post ${slug}, using cached local fallback.`);
  }

  return placeholderPosts.find((p) => p.slug === slug) || null;
}

/**
 * Fetch experiences from Sanity, cached for days.
 * Falls back to placeholder experiences if CMS is empty or offline.
 */
export async function getExperiences(limit?: number) {
  "use cache";
  cacheTag("experiences");
  cacheLife((isDev ? "seconds" : "days") as any);

  try {
    const experiences = await client.fetch(EXPERIENCES_QUERY);
    if (experiences && experiences.length > 0) {
      const normalized = experiences.map(normalizeExperience);
      return limit ? normalized.slice(0, limit) : normalized;
    }
  } catch {
    console.warn("[Sanity] Network query unavailable for experiences, using cached local fallback.");
  }

  if (limit) {
    return placeholderExperiences.slice(0, limit).map(normalizeExperience);
  }
  return placeholderExperiences.map(normalizeExperience);
}

/**
 * Fetch skill categories and nested skills, cached for weeks.
 * Falls back to placeholder skill categories if CMS is empty or offline.
 */
export async function getSkillCategories() {
  "use cache";
  cacheTag("skill-categories");
  cacheLife((isDev ? "seconds" : "weeks") as any);

  try {
    const skillCategories = await client.fetch(SKILL_CATEGORIES_QUERY);
    if (skillCategories && skillCategories.length > 0) {
      return skillCategories;
    }
  } catch {
    console.warn("[Sanity] Network query unavailable for skill categories, using cached local fallback.");
  }

  return placeholderSkillCategories;
}

/**
 * Fetch home page global singleton data, cached for days.
 * Falls back to placeholder home data if CMS is unconfigured or offline.
 */
export async function getHomeGlobalData() {
  "use cache";
  cacheTag("home-global");
  cacheLife((isDev ? "seconds" : "days") as any);

  try {
    const homeData = await client.fetch(HOME_PAGE_QUERY);
    if (homeData && (homeData.title || homeData.portrait)) {
      return {
        hero: {
          title: homeData.title,
          role: homeData.role || "AI Systems and Software Developer",
          description: homeData.description,
          portrait: homeData.portrait,
        },
      };
    }
  } catch {
    console.warn("[Sanity] Network query unavailable for home data, using cached local fallback.");
  }

  return placeholderHomeData;
}
