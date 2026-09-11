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
import type {
  Project,
  Experience,
  Technology,
  ExperienceSkill,
  SocialLink,
  Post,
  SkillCategory,
} from "./types";

const isDev = process.env.NODE_ENV === "development";

function applyCacheLife(profile: "days" | "weeks") {
  if (isDev) {
    cacheLife("seconds");
  } else if (profile === "weeks") {
    cacheLife("weeks");
  } else {
    cacheLife("days");
  }
}

/**
 * Fetch all social links, cached for up to weeks in production, seconds in dev.
 * Falls back to placeholder links if CMS is empty or offline.
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  "use cache";
  cacheTag("social-links");
  applyCacheLife("weeks");

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

function normalizeProject(project: Partial<Project> & Record<string, unknown>): Project {
  if (!project) return project as unknown as Project;
  const id = String(project.id || project._id || "");
  const slug =
    typeof project.slug === "string"
      ? project.slug
      : (project.slug as { current?: string } | undefined)?.current || id;

  return {
    ...project,
    id,
    slug,
    title: (project.title as string) || "",
    liveUrl: cleanUrl(project.liveUrl as string | null | undefined),
    githubUrl: cleanUrl(project.githubUrl as string | null | undefined),
    technologies: Array.isArray(project.technologies)
      ? (project.technologies as Technology[]).filter((t) => Boolean(t && (t.name || t.skill)))
      : [],
  };
}

function normalizeExperience(exp: Partial<Experience> & Record<string, unknown>): Experience {
  if (!exp) return exp as unknown as Experience;
  return {
    ...exp,
    id: String(exp.id || exp._id || ""),
    role: (exp.role as string) || "",
    company: (exp.company as string) || "",
    period: (exp.period as string) || "",
    skillStack: Array.isArray(exp.skillStack)
      ? (exp.skillStack as ExperienceSkill[]).filter((s) => Boolean(s && (s.skill || s.name)))
      : [],
  };
}

/**
 * Fetch projects from Sanity, cached for days.
 * Falls back to placeholder projects if CMS is empty or offline.
 */
export async function getProjects(featuredOnly?: boolean): Promise<Project[]> {
  "use cache";
  cacheTag("projects");
  applyCacheLife("days");

  try {
    const query = featuredOnly ? FEATURED_PROJECTS_QUERY : PROJECTS_QUERY;
    const projects = await client.fetch(query);
    if (projects && projects.length > 0) {
      return projects.map((p: Record<string, unknown>) => normalizeProject(p));
    }
  } catch {
    console.warn("[Sanity] Network query unavailable for projects, using cached local fallback.");
  }

  if (featuredOnly) {
    return placeholderProjects.filter((p) => p.featured).map((p) => normalizeProject(p));
  }
  return placeholderProjects.map((p) => normalizeProject(p));
}

/**
 * Fetch a single project by slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  "use cache";
  cacheTag("projects");
  applyCacheLife("days");

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
    (p) => p.slug === targetSlug || p.aliases?.includes(slug)
  );
  return fallback ? normalizeProject(fallback) : null;
}

/**
 * Fetch blog posts from Sanity, cached for days.
 * Falls back to placeholder posts if CMS is empty or offline.
 */
export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheTag("posts");
  applyCacheLife("days");

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
export async function getPostBySlug(slug: string): Promise<Post | null> {
  "use cache";
  cacheTag("posts");
  applyCacheLife("days");

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
export async function getExperiences(limit?: number): Promise<Experience[]> {
  "use cache";
  cacheTag("experiences");
  applyCacheLife("days");

  try {
    const experiences = await client.fetch(EXPERIENCES_QUERY);
    if (experiences && experiences.length > 0) {
      const normalized = experiences.map((e: Record<string, unknown>) => normalizeExperience(e));
      return limit ? normalized.slice(0, limit) : normalized;
    }
  } catch {
    console.warn("[Sanity] Network query unavailable for experiences, using cached local fallback.");
  }

  if (limit) {
    return placeholderExperiences.slice(0, limit).map((e) => normalizeExperience(e));
  }
  return placeholderExperiences.map((e) => normalizeExperience(e));
}

/**
 * Fetch skill categories and nested skills, cached for weeks.
 * Falls back to placeholder skill categories if CMS is empty or offline.
 */
export async function getSkillCategories(): Promise<SkillCategory[]> {
  "use cache";
  cacheTag("skill-categories");
  applyCacheLife("weeks");

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
export async function getHomeGlobalData(): Promise<{
  hero: {
    title?: string;
    role?: string;
    description?: string;
    portrait?: unknown;
  };
}> {
  "use cache";
  cacheTag("home-global");
  applyCacheLife("days");

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
