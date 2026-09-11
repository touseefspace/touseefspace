"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React from "react";
import SelectedWorkSection from "./SelectedWorkSection";

import type { Project, Experience, SkillCategory, Skill } from "@/lib/types";

interface HomeDataProps {
  hero?: {
    title?: string;
    role?: string;
    description?: string;
    portrait?: unknown;
    location?: string;
  };
  location?: string;
  portrait?: {
    asset?: { url?: string };
    url?: string;
  } | string;
  role?: string;
  title?: string;
  description?: string;
}

export default function HomeScrollShowcase({
  featuredProjects: cmsProjects,
  activeExperience: cmsExperience,
  skillCategories: cmsSkillCategories,
  homeData
}: {
  featuredProjects?: Project[];
  activeExperience?: Experience | null;
  skillCategories?: SkillCategory[];
  homeData?: HomeDataProps | null;
}) {
  // Hero content defaults - supports both root homeData and legacy nested .hero
  const heroData = homeData?.hero || homeData || {};
  const portraitObj = (heroData as Record<string, unknown>).portrait as
    | { asset?: { url?: string }; url?: string }
    | string
    | undefined;
  const portraitUrl =
    (typeof portraitObj === "object" && portraitObj?.asset?.url) ||
    (typeof portraitObj === "object" && portraitObj?.url) ||
    (typeof portraitObj === "string" ? portraitObj : null) ||
    "/touseef.png";
  const heroRole = heroData.role || "AI Systems & Software Developer";
  const heroLocation = heroData.location || "United Arab Emirates";
  const heroTitle =
    heroData.title || "I turn messy workflows into simple & reliable software spaces.";
  const heroDescription =
    heroData.description ||
    "Developing custom web applications and AI systems engineered to eliminate operational clutter — giving ambitious teams the space to scale with calm, dependable reliability.";

  // Data Normalization - Memoized to prevent unnecessary effect resets
  const featuredProjects = React.useMemo(() => {
    return cmsProjects?.length ? cmsProjects : [];
  }, [cmsProjects]);

  const activeExperience = cmsExperience || null;

  const highlightedSkills: Skill[] = (cmsSkillCategories && cmsSkillCategories.length > 0)
    ? cmsSkillCategories.flatMap((cat) => cat.skills?.slice(0, 2) || []).slice(0, 8)
    : [];

  return (
    <div className="relative pt-14 sm:pt-16">
      {/* Bounded, fixed-height responsive Hero Section */}
      <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl">
            {/* Top Eyebrow */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="section-label">01 / Overview</span>
              <span className="h-1 w-1 rounded-full bg-(--ink-muted) opacity-50" />
              <span className="font-mono text-xs text-(--ink-muted)">{heroLocation}</span>
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tight text-(--ink-primary) sm:text-5xl lg:text-5xl">
              {heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
              {heroDescription}
            </p>
            <div className="mt-8 flex flex-row items-center gap-2.5 sm:gap-3.5">
              <Link href="/projects" className="btn-primary flex-1 sm:flex-initial text-xs sm:text-sm px-3.5 sm:px-5 text-center justify-center">
                View projects <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              </Link>
              <Link href="/contact" className="btn-secondary flex-1 sm:flex-initial text-xs sm:text-sm px-3.5 sm:px-5 text-center justify-center whitespace-nowrap">
                Let&apos;s Talk
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-105">
            <div className="relative h-96 sm:h-105 w-full overflow-hidden rounded-2xl border border-(--border-card) bg-(--bg-surface) shadow-md group transition-colors">
              {portraitUrl ? (
                <>
                  <Image
                    src={portraitUrl}
                    alt="Touseef Ahmed"
                    fill={true}
                    sizes="(max-width: 480px) 345px, (max-width: 768px) 400px, 420px"
                    quality={85}
                    className="object-cover object-center transition-all duration-700 group-hover:scale-[1.02]"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 border-t border-(--border-subtle) bg-(--header-bg) p-4 backdrop-blur-md flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-semibold text-(--ink-primary)">Touseef Ahmed</span>
                    </div>
                    <span className="text-[11px] font-mono text-(--ink-muted)">{heroRole}</span>
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-(--bg-surface)">
                  <span className="font-mono text-sm text-(--ink-muted)">Portrait placeholder</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Phase 5 Selected Work (Standalone 3D Perspective Carousel Stage) */}
      <div className="page-shell relative py-12 sm:py-16">
        <SelectedWorkSection projects={featuredProjects} />
      </div>

      {/* Guided Stream for Section 03 (Experience) & Section 04 (Toolbelt) */}
      <section className="page-shell relative grid gap-8 py-16 sm:py-20 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="relative hidden lg:block">
          <div className="absolute left-8 top-0 h-full w-px bg-(--border-subtle)" />
          <div className="absolute left-8 top-0 h-32 w-px bg-(--ink-primary)/40" />
        </div>

        <div className="grid gap-20 sm:gap-24">

          {/* Section 03: Experience */}
          {activeExperience ? (
            <article className="grid gap-6 lg:grid-cols-[0.85fr_minmax(0,1fr)]">
              <div>
                <p className="section-label">03 / Experience</p>
                <h2 className="text-2xl font-bold text-(--ink-primary) sm:text-3xl md:text-4xl">
                  {activeExperience.role}
                </h2>
              </div>
              <div className="group rounded-3xl p-6 md:p-7 max-w-2xl bg-(--bg-surface) border border-(--border-card) shadow-xs transition-all duration-300 hover:border-(--border-strong) hover:shadow-md">
                <div className="flex items-start gap-4">
                  {activeExperience.logo?.url && (
                    <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0 rounded-xl overflow-hidden bg-(--bg-subtle) border border-(--border-subtle) p-2 shadow-xs">
                      <Image
                        src={activeExperience.logo.url}
                        alt={activeExperience.company}
                        fill
                        sizes="(max-width: 768px) 40px, 48px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-(--ink-primary) truncate">
                      {activeExperience.company}
                    </p>
                    <p className="mt-1 text-sm text-(--ink-muted)">
                      {activeExperience.period}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-(--ink-secondary)">
                  {activeExperience.tasks?.slice(0, 3).map((item: string | { task?: string }, i: number) => (
                    <li key={i} className="border-l-2 border-(--border-strong) pl-3">
                      {typeof item === "string" ? item : (item.task || "")}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-end">
                  <Link
                    href="/experiences"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-(--ink-primary) hover:underline transition-all group/link"
                  >
                    View career trajectory
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ) : (
            <article className="grid gap-6 lg:grid-cols-[0.85fr_minmax(0,1fr)]">
              <div>
                <p className="section-label">03 / Experience</p>
                <h2 className="text-2xl font-bold text-(--ink-primary) sm:text-3xl md:text-4xl opacity-30">
                  Career trajectory.
                </h2>
              </div>
              <div className="rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-dashed border-(--border-card) max-w-2xl bg-(--bg-surface)">
                <p className="text-sm font-semibold text-(--ink-muted) uppercase tracking-wider">
                  Experience needed
                </p>
                <p className="mt-2 text-xs text-(--ink-faint)">
                  Populate the Experiences collection in Sanity to show your journey.
                </p>
              </div>
            </article>
          )}

          {/* Section 04: Toolbelt */}
          {highlightedSkills.length > 0 ? (
            <article className="grid gap-6 lg:grid-cols-[0.85fr_minmax(0,1fr)]">
              <div>
                <p className="section-label">04 / Toolbelt</p>
                <h2 className="mt-3 text-2xl font-bold text-(--ink-primary) sm:text-3xl md:text-4xl">
                  Product thinking with technical range.
                </h2>
              </div>
              <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-2xl">
                {highlightedSkills.map((skill, i: number) => {
                  const iconSrc =
                    skill.iconDark?.url ||
                    (typeof skill.icon === "string" ? skill.icon : skill.icon?.url) ||
                    "";
                  const skillTitle = (skill.name as string) || (skill.skill as string) || "";
                  return (
                    <div
                      key={i}
                      title={skillTitle}
                      className="group aspect-square flex items-center justify-center rounded-2xl sm:rounded-3xl p-3 sm:p-4 transition-all duration-200 bg-(--bg-surface) border border-(--border-card) shadow-xs hover:border-(--border-strong) hover:bg-(--bg-subtle) hover:scale-105"
                    >
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-md transition-all group-hover:scale-105">
                        {iconSrc ? (
                          <Image
                            src={iconSrc}
                            alt={skillTitle}
                            width={56}
                            height={56}
                            className={`h-full w-full object-contain ${
                              skillTitle === "GitHub" ? "dark:invert" : ""
                            }`}
                          />
                        ) : (
                          <span className="text-xs font-bold text-(--ink-muted)">
                            {skillTitle.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          ) : (
            <article className="grid gap-6 lg:grid-cols-[0.85fr_minmax(0,1fr)]">
              <div>
                <p className="section-label">04 / Toolbelt</p>
                <h2 className="mt-3 text-2xl font-bold text-(--ink-primary) sm:text-3xl md:text-4xl opacity-30">
                  Technical range.
                </h2>
              </div>
              <div className="rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-dashed border-(--border-card) max-w-2xl bg-(--bg-surface)">
                <p className="text-sm font-semibold text-(--ink-muted) uppercase tracking-wider">
                  Skills required
                </p>
                <p className="mt-2 text-xs text-(--ink-faint)">
                  Add Skill Categories and link skills to see your toolbelt in action.
                </p>
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  );
}
