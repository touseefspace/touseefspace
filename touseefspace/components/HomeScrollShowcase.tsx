"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import SelectedWorkSection from "./SelectedWorkSection";

export default function HomeScrollShowcase({
  featuredProjects: cmsProjects,
  activeExperience: cmsExperience,
  skillCategories: cmsSkillCategories,
  homeData
}: {
  featuredProjects?: any[];
  activeExperience?: any;
  skillCategories?: any;
  homeData?: any;
}) {
  const [isMobile, setIsMobile] = useState(false);

  // Hero content defaults
  const heroData = homeData?.hero || {};
  const portraitUrl = heroData.portrait?.url || "/touseef.png";
  const heroTitle =
    heroData.title &&
    heroData.title !== "Full stack developer building calm, useful digital systems." &&
    heroData.title !== "I turn messy workflows into simple, reliable software." &&
    heroData.title !== "I turn messy workflows into simple, reliable software spaces." &&
    heroData.title !== "I turn messy workflows into simple & reliable software or AI based automations." &&
    heroData.title !== "I turn messy workflows into simple & reliable software spaces or AI based automations."
      ? heroData.title
      : "I turn messy workflows into simple & reliable software spaces.";
  const heroDescription =
    heroData.description && !heroData.description.includes("make work feel lighter")
      ? heroData.description
      : "Developing custom web applications and AI systems engineered to eliminate operational clutter — giving ambitious teams the space to scale with calm, dependable reliability.";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(
    heroScrollProgress,
    [0, 1],
    [0, isMobile ? 0 : -48]
  );

  const railScale = useTransform(heroScrollProgress, [0, 1], [0.12, 1]);

  // Data Normalization - Memoized to prevent unnecessary effect resets
  const featuredProjects = React.useMemo(() => {
    return cmsProjects?.length ? cmsProjects : [];
  }, [cmsProjects]);

  const activeExperience = cmsExperience || null;

  const highlightedSkills = cmsSkillCategories?.length > 0
    ? cmsSkillCategories.flatMap((cat: any) => cat.skills?.slice(0, 2) || []).slice(0, 8)
    : [];

  return (
    <div className="relative pt-14 sm:pt-16">
      {/* Bounded, fixed-height responsive Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-6 pb-12 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16"
      >
        <motion.div
          style={{
            y: heroY,
            willChange: "transform",
          }}
          className="page-shell grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
        >
          <div className="max-w-3xl">
            {/* Top Eyebrow */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="section-label">01 / Overview</span>
              <span className="h-1 w-1 rounded-full bg-(--ink-muted) opacity-50" />
              <span className="font-mono text-xs text-(--ink-muted)">United Arab Emirates</span>
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tight text-(--ink-primary) sm:text-5xl lg:text-5xl">
              {heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
              Developing custom web applications and AI systems engineered to eliminate operational clutter — giving ambitious teams the{" "}
              <span className="inline-block rounded px-1.5 py-0.5 font-medium bg-(--ink-primary) text-(--bg-primary)">
                space
              </span>{" "}
              to scale with calm, dependable reliability.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link href="/projects" className="btn-primary">
                View projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Start a conversation
              </Link>
            </div>
          </div>

          <motion.div className="relative mx-auto w-full max-w-105">
            <div className="relative h-96 sm:h-105 w-full overflow-hidden rounded-2xl border border-(--border-card) bg-(--bg-surface) shadow-md group transition-colors">
              {portraitUrl ? (
                <>
                  <Image
                    src={portraitUrl}
                    alt="Touseef Ahmed"
                    fill={true}
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-center transition-all duration-700 group-hover:scale-[1.02]"
                    priority
                    fetchPriority="high"
                  />
                  <div className="absolute inset-x-0 bottom-0 border-t border-(--border-subtle) bg-(--header-bg) p-4 backdrop-blur-md flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-semibold text-(--ink-primary)">Touseef Ahmed</span>
                    </div>
                    <span className="text-[11px] font-mono text-(--ink-muted)">AI Systems & Software Developer</span>
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-(--bg-surface)">
                  <span className="font-mono text-sm text-(--ink-muted)">Portrait placeholder</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 02: Phase 5 Selected Work (Standalone 3D Perspective Carousel Stage) */}
      <div className="page-shell relative py-12 sm:py-16">
        <SelectedWorkSection projects={featuredProjects} />
      </div>

      {/* Guided Stream for Section 03 (Experience) & Section 04 (Toolbelt) */}
      <section className="page-shell relative grid gap-8 py-16 sm:py-20 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="relative hidden lg:block">
          <div className="absolute left-8 top-0 h-full w-px bg-(--border-subtle)" />
          <motion.div
            style={{ scaleY: railScale }}
            className="absolute left-8 top-0 h-full w-px origin-top bg-(--ink-primary)"
          />
        </div>

        <div className="grid gap-20 sm:gap-24">

          {/* Section 03: Experience */}
          {activeExperience ? (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-6 lg:grid-cols-[0.85fr_minmax(0,1fr)]"
            >
              <div>
                <p className="section-label">03 / Experience</p>
                <h2 className="text-2xl font-bold text-(--ink-primary) sm:text-3xl md:text-4xl">
                  {activeExperience.role}
                </h2>
              </div>
              <div className="glass-line rounded-3xl p-5 md:p-6 max-w-2xl bg-(--bg-surface) border border-(--border-subtle)">
                <div className="flex items-start gap-4">
                  {activeExperience.logo?.url && (
                    <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0 rounded-xl overflow-hidden bg-(--bg-subtle) border border-(--border-subtle) p-2">
                      <Image
                        src={activeExperience.logo.url}
                        alt={activeExperience.company}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-(--ink-primary) truncate">
                      {activeExperience.company}
                    </p>
                    <p className="mt-1 text-sm text-(--ink-muted)">
                      {activeExperience.time} {activeExperience.location ? `· ${activeExperience.location}` : ""}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-(--ink-secondary)">
                  {activeExperience.tasks?.slice(0, 3).map((item: any, i: number) => (
                    <li key={i} className="border-l-2 border-(--border-strong) pl-3">
                      {item.task || item}
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
            </motion.article>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-6 lg:grid-cols-[0.85fr_minmax(0,1fr)]"
            >
              <div>
                <p className="section-label">03 / Experience</p>
                <h2 className="text-2xl font-bold text-(--ink-primary) sm:text-3xl md:text-4xl opacity-30">
                  Career trajectory.
                </h2>
              </div>
              <div className="glass-line rounded-3xl p-8 flex flex-col items-center justify-center text-center border-dashed border-(--border-subtle) max-w-2xl bg-(--bg-surface)">
                <p className="text-sm font-semibold text-(--ink-muted) uppercase tracking-wider">
                  Experience needed
                </p>
                <p className="mt-2 text-xs text-(--ink-faint)">
                  Populate the Experiences collection in Sanity to show your journey.
                </p>
              </div>
            </motion.article>
          )}

          {/* Section 04: Toolbelt */}
          {highlightedSkills.length > 0 ? (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-6 lg:grid-cols-[0.85fr_minmax(0,1fr)]"
            >
              <div>
                <p className="section-label">04 / Toolbelt</p>
                <h2 className="mt-3 text-2xl font-bold text-(--ink-primary) sm:text-3xl md:text-4xl">
                  Product thinking with technical range.
                </h2>
              </div>
              <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-2xl">
                {highlightedSkills.map((skill: any, i: number) => (
                  <div
                    key={i}
                    title={skill.name || skill.skill}
                    className="glass-line group aspect-square flex items-center justify-center rounded-2xl sm:rounded-3xl p-3 sm:p-4 transition-colors bg-(--bg-surface) border border-(--border-subtle) hover:bg-(--bg-subtle)"
                  >
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-md transition-all group-hover:scale-105">
                      {skill.iconDark?.url || skill.icon ? (
                        <Image
                          src={skill.iconDark?.url || skill.icon}
                          alt={skill.name || skill.skill}
                          width={56}
                          height={56}
                          className={`h-full w-full object-contain ${(skill.name === 'GitHub' || skill.skill === 'GitHub') ? 'dark:invert' : ''}`}
                        />
                      ) : (
                        <span className="text-xs font-bold text-(--ink-muted)">
                          {(skill.name || skill.skill)?.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-6 lg:grid-cols-[0.85fr_minmax(0,1fr)]"
            >
              <div>
                <p className="section-label">04 / Toolbelt</p>
                <h2 className="mt-3 text-2xl font-bold text-(--ink-primary) sm:text-3xl md:text-4xl opacity-30">
                  Technical range.
                </h2>
              </div>
              <div className="glass-line rounded-3xl p-8 flex flex-col items-center justify-center text-center border-dashed border-(--border-subtle) max-w-2xl bg-(--bg-surface)">
                <p className="text-sm font-semibold text-(--ink-muted) uppercase tracking-wider">
                  Skills required
                </p>
                <p className="mt-2 text-xs text-(--ink-faint)">
                  Add Skill Categories and link skills to see your toolbelt in action.
                </p>
              </div>
            </motion.article>
          )}
        </div>
      </section>
    </div>
  );
}
