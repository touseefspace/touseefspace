"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Zap,
  ExternalLink,
} from "lucide-react";
import { urlForImage } from "@/sanity/image";

interface Metric {
  value: string;
  label: string;
}

interface Project {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  client?: string;
  role?: string;
  period?: string;
  summary: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  metrics?: Metric[];
  image?: any;
  technologies?: { name: string; icon?: any }[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function SelectedWorkSection({
  projects = [],
}: {
  projects: Project[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const lastWheelTime = useRef<number>(0);

  // Circular loop navigation (1 -> 2 -> 3 -> 1, or 1 -> 3 -> 2 -> 1)
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.closest("#selected-work")) {
        if (e.key === "ArrowLeft") {
          handlePrev();
        } else if (e.key === "ArrowRight") {
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects.length]);

  // Only handle explicit horizontal trackpad swipes; NEVER intercept vertical page scrolling (deltaY)
  const handleWheel = (e: React.WheelEvent) => {
    // If the movement is predominantly vertical (e.g. mouse wheel scrolling down), let browser scroll normally
    if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) return;

    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;

    // Only trigger on clear intentional horizontal swipe gestures
    if (Math.abs(e.deltaX) > 45) {
      if (e.deltaX > 45) {
        handleNext();
      } else {
        handlePrev();
      }
      lastWheelTime.current = now;
    }
  };

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStart(null);
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  const formattedCount = String(projects.length).padStart(2, "0");
  const formattedActive = String(activeIndex + 1).padStart(2, "0");

  return (
    <section
      id="selected-work"
      className="w-full focus:outline-none"
      tabIndex={0}
      aria-label="Selected Work 3D Showcase"
    >
      {/* Section Header */}
      <div className="max-w-2xl">
        <div className="flex items-center gap-2.5">
          <span className="section-label">02 / Selected work</span>
          <span className="h-1 w-1 rounded-full bg-(--ink-muted) opacity-50" />
          <span className="font-mono text-xs text-(--ink-muted)">
            Flagship Systems
          </span>
        </div>
        <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-(--ink-primary)">
          Systems built around real workflows.
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-(--ink-secondary)">
          High-impact software engineering focused on deterministic state, operational performance, and real-time reliability.
        </p>
      </div>

      {/* Center-Top Counter Status Pill */}
      <div className="mt-8 sm:mt-10 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-(--border-subtle) bg-(--bg-surface)/80 px-4 py-1 backdrop-blur-md font-mono text-xs text-(--ink-muted) shadow-xs select-none">
          <span className="text-(--ink-primary) font-semibold">{formattedActive}</span>
          <span className="opacity-40">/</span>
          <span>{formattedCount}</span>
        </div>
      </div>

      {/* 3D Circular Perspective Viewport */}
      <div
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative mt-4 sm:mt-6 w-full h-155 sm:h-160 md:h-165 flex items-center justify-center perspective-[1400px]"
      >
        {/* Spatial Spotlight Glow Behind the Center Stage */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="h-96 w-96 rounded-full bg-linear-to-tr from-sky-500/10 via-emerald-500/5 to-transparent blur-3xl opacity-60 dark:opacity-40" />
        </div>

        {/* Left Flank Navigation Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous system"
          title="Previous system (Circular)"
          className="absolute left-1 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-(--border-subtle) bg-(--bg-surface)/85 hover:bg-(--bg-surface) hover:border-(--border-strong) backdrop-blur-md text-(--ink-primary) shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Flank Navigation Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next system"
          title="Next system (Circular)"
          className="absolute right-1 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-(--border-subtle) bg-(--bg-surface)/85 hover:bg-(--bg-surface) hover:border-(--border-strong) backdrop-blur-md text-(--ink-primary) shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>

        {/* Circular 3D Carousel Stage */}
        <div className="relative w-full h-full flex items-center justify-center transform-3d">
          {projects.map((project, index) => {
            const n = projects.length;
            // Calculate shortest signed distance on the circular ring
            let diff = (index - activeIndex) % n;
            if (diff > n / 2) diff -= n;
            if (diff < -n / 2) diff += n;

            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;
            const isFar = Math.abs(diff) > 1;

            // 3D positioning along a circular cylinder
            let xPos = "0%";
            let zPos = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (isLeft) {
              // Positioned behind to the left
              xPos = "-56%";
              zPos = -180;
              rotateY = 20;
              scale = 0.86;
              opacity = 0.55;
              zIndex = 10;
            } else if (isRight) {
              // Positioned behind to the right
              xPos = "56%";
              zPos = -180;
              rotateY = -20;
              scale = 0.86;
              opacity = 0.55;
              zIndex = 10;
            } else if (isFar) {
              // Deep back in the loop
              xPos = diff > 0 ? "105%" : "-105%";
              zPos = -340;
              rotateY = diff > 0 ? -35 : 35;
              scale = 0.72;
              opacity = 0;
              zIndex = 0;
            }

            return (
              <motion.div
                key={project._id || project.id || project.slug}
                onClick={() => {
                  if (!isCenter) setActiveIndex(index);
                }}
                animate={{
                  x: xPos,
                  z: zPos,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                  mass: 0.8,
                }}
                style={{
                  zIndex,
                  pointerEvents: isFar ? "none" : "auto",
                  cursor: isCenter ? "default" : "pointer",
                }}
                className={`absolute w-[90%] sm:w-135 md:w-145 rounded-[28px] overflow-hidden border transition-all duration-300 transform-3d backface-hidden isolate select-none ${
                  isCenter
                    ? "border-(--border-strong) bg-(--bg-surface) shadow-2xl shadow-black/25 dark:shadow-black/70 ring-1 ring-white/15"
                    : "border-(--border-card) dark:border-white/10 bg-(--bg-surface) shadow-xl shadow-black/15 hover:border-(--border-strong) hover:opacity-80"
                }`}
              >
                {/* Muted background veil for cards in the back: preserves rounded border outline */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-(--bg-primary)/45 pointer-events-none rounded-[28px] z-20 transition-opacity duration-300" />
                )}

                <StageCardContent
                  project={project}
                  index={index + 1}
                  isCenter={isCenter}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stage Bottom Navigation & Circular Indicators */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-(--border-subtle) pt-6">
        {/* Pagination Pill Indicators */}
        <div className="flex items-center gap-1">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Jump to system ${i + 1} of ${projects.length}`}
              className="h-10 w-10 flex items-center justify-center cursor-pointer -mx-1"
            >
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-(--ink-primary)"
                    : "w-2 bg-(--border-strong) hover:bg-(--ink-muted)"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Archive Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--ink-muted) hover:text-(--ink-primary) transition-colors"
        >
          All projects archive <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function StageCardContent({
  project,
  index,
  isCenter,
}: {
  project: Project;
  index: number;
  isCenter: boolean;
}) {
  const imageAssetUrl =
    urlForImage(project.image)?.width(1200).url() ||
    (typeof project.image === "string" ? project.image : project.image?.url) ||
    "/placeholders/aunvu-dashboard.svg";

  const imageAlt = project.image?.alt || `${project.title} Preview`;
  const formattedIndex = String(index).padStart(2, "0");

  const heroMetric =
    project.metrics && project.metrics.length > 0 ? project.metrics[0] : null;

  return (
    <div className="flex flex-col p-5 sm:p-7 md:p-8 h-full rounded-[28px]">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-(--border-subtle)">
        <div className="flex items-center gap-2 font-mono text-[11px] text-(--ink-muted) uppercase tracking-wider">
          <span className="font-bold text-(--ink-primary)">{formattedIndex}</span>
          <span>·</span>
          <span className="truncate max-w-45 sm:max-w-55">
            {project.client || "Client Architecture"}
          </span>
          {project.period && (
            <>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{project.period}</span>
            </>
          )}
        </div>

        {heroMetric && (
          <div className="shrink-0 flex items-center gap-1 rounded-full border border-emerald-600/30 dark:border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
            <Zap size={11} className="text-emerald-700 dark:text-emerald-400" />
            <span>{heroMetric.value}</span>
            <span className="hidden sm:inline opacity-80 font-normal">
              {heroMetric.label}
            </span>
          </div>
        )}
      </div>

      {/* Title & 1-Line Elevator Pitch */}
      <div className="mt-4 space-y-1.5">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-(--ink-primary) truncate">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-(--ink-secondary) line-clamp-2 leading-relaxed">
          {project.summary}
        </p>
      </div>

      {/* Visual Window Mockup */}
      <div className="mt-4 relative rounded-2xl border border-(--border-subtle) bg-(--bg-subtle) overflow-hidden group/mockup">
        {/* Window Chrome Top Header */}
        <div className="h-6 bg-(--bg-surface) border-b border-(--border-subtle) px-3 flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-(--ink-muted) opacity-30" />
          <div className="h-2 w-2 rounded-full bg-(--ink-muted) opacity-30" />
          <div className="h-2 w-2 rounded-full bg-(--ink-muted) opacity-30" />
          <span className="ml-2 font-mono text-[10px] text-(--ink-muted) opacity-60 truncate">
            {project.slug}.sys
          </span>
        </div>

        <Link
          href={`/work/${project.slug}`}
          tabIndex={isCenter ? 0 : -1}
          className="relative block aspect-16/10 w-full overflow-hidden bg-black/5 dark:bg-black/40"
        >
          <Image
            src={imageAssetUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 90vw, 580px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover/mockup:scale-103"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/mockup:opacity-100 transition-opacity flex items-end justify-end p-3">
            <span className="rounded-lg bg-black/75 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white flex items-center gap-1">
              Case Study <ArrowUpRight size={12} />
            </span>
          </div>
        </Link>
      </div>

      {/* Bottom Bar: Stack & Action Button */}
      <div className="mt-5 flex items-center justify-between gap-3 pt-2">
        {/* Technologies Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-hidden max-h-7">
          {project.technologies?.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-(--border-subtle) bg-(--bg-subtle) text-(--ink-muted)"
            >
              {tech.name}
            </span>
          ))}
          {(project.technologies?.length || 0) > 3 && (
            <span className="text-[10px] font-mono text-(--ink-muted)">
              +{(project.technologies?.length || 0) - 3}
            </span>
          )}
        </div>

        {/* Direct Case Study CTA */}
        <div className="shrink-0 flex items-center gap-2">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              tabIndex={isCenter ? 0 : -1}
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg border border-(--border-subtle) text-(--ink-muted) hover:text-(--ink-primary) hover:border-(--border-strong) transition-colors"
              title="Live Demo"
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink size={13} aria-hidden="true" />
            </Link>
          )}
          <Link
            href={`/work/${project.slug}`}
            tabIndex={isCenter ? 0 : -1}
            aria-label={`Explore ${project.title} case study`}
            className="btn-primary h-8 px-3.5 text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 shadow-xs"
          >
            <span>Explore</span>
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
