import React from "react";

/**
 * Premium projects skeleton loader.
 * Renders pulse placeholders mimicking the ProjectSpotlightList layout.
 */
export function ProjectsSkeleton() {
  return (
    <div className="mt-8 space-y-12 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className="glass-line rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden bg-(--bg-surface) border border-(--border-subtle)"
        >
          {/* Accent glow line mock */}
          <div className="absolute top-0 left-0 w-full h-px bg-(--border-subtle)" />
          
          {/* Project Image Placeholder */}
          <div className="relative h-20 w-20 md:h-32 md:w-32 shrink-0 rounded-2xl bg-(--bg-subtle) border border-(--border-subtle)" />

          {/* Project Details */}
          <div className="flex-1 space-y-4 w-full">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="h-6 w-48 bg-(--bg-subtle) rounded-md" />
                <div className="h-4 w-28 bg-(--bg-subtle) rounded-md" />
              </div>
              
              {/* Tech Icon Badges */}
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-8 w-8 rounded-xl bg-(--bg-subtle) border border-(--border-subtle)" />
                ))}
              </div>
            </div>

            {/* Description Lines */}
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-(--bg-subtle) rounded" />
              <div className="h-4 w-5/6 bg-(--bg-subtle) rounded" />
              <div className="h-4 w-2/3 bg-(--bg-subtle) rounded" />
            </div>

            {/* Links and CTA Row */}
            <div className="pt-4 flex items-center justify-between border-t border-(--border-subtle)">
              <div className="h-4 w-32 bg-(--bg-subtle) rounded" />
              <div className="h-8 w-24 bg-(--bg-subtle) border border-(--border-subtle) rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Premium experiences timeline skeleton loader.
 * Renders pulse timeline entries matching the Resume Trajectory.
 */
export function ExperiencesSkeleton() {
  return (
    <div className="space-y-20 animate-pulse">
      {[1, 2].map((section) => (
        <section key={section} className="grid md:grid-cols-12 gap-10 md:gap-8">
          {/* Left Column (Sticky info mock) */}
          <div className="md:col-span-4 lg:col-span-3 space-y-4">
            <div className="h-11 w-11 rounded-xl bg-(--bg-subtle) border border-(--border-subtle)" />
            <div className="h-7 w-44 bg-(--bg-subtle) rounded-md" />
            <div className="h-4 w-36 bg-(--bg-subtle) rounded" />
            <div className="h-4 w-24 bg-(--bg-subtle) rounded" />
          </div>

          {/* Right Column (Timeline items) */}
          <div className="md:col-span-8 lg:col-span-9 relative border-l border-(--border-subtle) pl-6 md:pl-12 ml-4 md:ml-0 space-y-12">
            {[1, 2].map((item) => (
              <div key={item} className="relative">
                {/* Timeline node circle */}
                <div className="absolute -left-8.75 md:-left-14.75 top-1.5 h-4 w-4 rounded-full bg-(--bg-primary) border-2 border-(--border-strong) flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-(--ink-muted)" />
                </div>

                <div className="space-y-4">
                  {/* Title and Date Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="h-6 w-52 bg-(--bg-subtle) rounded-md" />
                      <div className="h-4 w-32 bg-(--bg-subtle) rounded mt-2" />
                    </div>
                    <div className="h-4 w-24 bg-(--bg-subtle) rounded" />
                  </div>

                  {/* Tasks bullet lines */}
                  <div className="space-y-2.5 pt-2">
                    <div className="h-4 w-full bg-(--bg-subtle) border-l-2 border-(--border-strong) pl-3 rounded-r" />
                    <div className="h-4 w-11/12 bg-(--bg-subtle) border-l-2 border-(--border-subtle) pl-3 rounded-r" />
                    <div className="h-4 w-4/5 bg-(--bg-subtle) border-l-2 border-(--border-subtle) pl-3 rounded-r" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/**
 * Premium skills toolbelt skeleton loader.
 * Renders pulse grid categories and proficiency progress bars.
 */
export function SkillsSkeleton() {
  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-2 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <section key={i} className="glass-line rounded-3xl p-5 md:p-6 space-y-6 bg-(--bg-surface) border border-(--border-subtle)">
          {/* Header Row */}
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-(--bg-subtle) border border-(--border-subtle)" />
            <div className="h-6 w-36 bg-(--bg-subtle) rounded-md" />
          </div>

          {/* Skill Pill Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((j) => (
              <div key={j} className="rounded-2xl border border-(--border-subtle) bg-(--bg-subtle) p-3 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded bg-(--border-subtle) shrink-0" />
                  <div className="h-4 w-16 bg-(--border-subtle) rounded" />
                </div>
                {/* Proficiency track loader */}
                <div className="flex items-center gap-3">
                  <div className="h-1 flex-1 rounded-full bg-(--border-subtle)" />
                  <div className="h-3 w-6 bg-(--border-subtle)" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/**
 * Premium social links skeleton loader.
 * Renders grid badges mimicking the socials layout.
 */
export function SocialsSkeleton() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="glass-line rounded-2xl p-5 flex items-center gap-4 bg-(--bg-surface) border border-(--border-subtle)">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-(--bg-subtle) border border-(--border-subtle)" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-24 bg-(--bg-subtle)" />
            <div className="h-3 w-32 bg-(--bg-subtle)" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * High-fidelity home page scroll showcase skeleton loader.
 * Matches profiles, rotate sliders, timeline highlights, and docks.
 */
export function HomeSkeleton() {
  return (
    <div className="pt-14 sm:pt-16 animate-pulse">
      {/* 1. Hero Showcase Block */}
      <section className="relative pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          {/* Hero text side */}
          <div className="max-w-3xl space-y-5">
            <div className="h-4 w-36 bg-(--bg-subtle) rounded" />
            <div className="space-y-3">
              <div className="h-10 w-5/6 bg-(--bg-subtle) rounded-xl" />
              <div className="h-10 w-4/5 bg-(--bg-subtle) rounded-xl" />
            </div>
            <div className="h-5 w-full bg-(--bg-subtle) rounded-md pt-2" />
            <div className="h-5 w-4/5 bg-(--bg-subtle) rounded-md" />
            <div className="pt-4 flex gap-3">
              <div className="h-10 w-28 bg-(--bg-subtle) rounded-lg" />
              <div className="h-10 w-40 bg-(--bg-subtle) border border-(--border-subtle) rounded-lg" />
            </div>
          </div>

          {/* Profile photo / Card side */}
          <div className="relative mx-auto w-full max-w-105">
            <div className="h-80 sm:h-90 overflow-hidden rounded-xl border border-(--border-subtle) bg-(--bg-surface) flex items-center justify-center p-8">
              <div className="text-center space-y-4">
                <div className="h-10 w-10 rounded-full bg-(--bg-subtle) mx-auto border border-(--border-subtle)" />
                <div className="h-4 w-32 bg-(--bg-subtle) rounded mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Spotlight + Experience + Toolbelt Section */}
      <section className="page-shell relative grid gap-8 py-16 sm:py-20 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="hidden lg:block relative">
          <div className="absolute left-8 top-0 h-full w-px bg-(--border-subtle)" />
        </div>

        <div className="grid gap-20">
          {/* Spotlight Card Skeleton */}
          <div className="grid gap-6 lg:grid-cols-[0.85fr_minmax(0,1fr)]">
            <div className="space-y-4 pt-4">
              <div className="h-4 w-28 bg-(--bg-subtle) rounded" />
              <div className="h-8 w-48 bg-(--bg-subtle) rounded-md" />
            </div>
            <div className="glass-line rounded-3xl p-6 md:p-8 flex flex-col justify-between h-72 max-w-2xl space-y-6 bg-(--bg-surface) border border-(--border-subtle)">
              <div className="flex gap-5 items-start">
                <div className="h-16 w-16 rounded-xl bg-(--bg-subtle) border border-(--border-subtle) shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-12 bg-(--bg-subtle) rounded" />
                  <div className="h-5 w-44 bg-(--bg-subtle) rounded" />
                  <div className="h-4 w-full bg-(--bg-subtle) rounded" />
                </div>
              </div>
              <div className="pt-4 border-t border-(--border-subtle) flex justify-between items-center">
                <div className="h-8 w-28 bg-(--bg-subtle) rounded-full" />
                <div className="h-4 w-24 bg-(--bg-subtle) rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Editorial Blog & Notes skeleton loader.
 * Renders pulse placeholders matching the blog index layout.
 */
export function BlogSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Featured Spotlight Card */}
      <div className="rounded-3xl border border-(--border-subtle) bg-(--bg-surface)/70 backdrop-blur-md p-6 sm:p-10">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-5 w-16 bg-(--bg-subtle) rounded" />
              <div className="h-4 w-24 bg-(--bg-subtle) rounded" />
            </div>
            <div className="h-9 sm:h-11 w-4/5 bg-(--bg-subtle) rounded-xl" />
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-(--bg-subtle) rounded" />
              <div className="h-4 w-5/6 bg-(--bg-subtle) rounded" />
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-16 bg-(--bg-subtle) rounded-full" />
              <div className="h-6 w-20 bg-(--bg-subtle) rounded-full" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-16/10 w-full rounded-2xl bg-(--bg-subtle) border border-(--border-subtle)" />
          </div>
        </div>
      </div>

      {/* Grid of Remaining Posts */}
      <div className="grid gap-8 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-3xl border border-(--border-subtle) bg-(--bg-surface)/70 backdrop-blur-md p-6 sm:p-8 space-y-6"
          >
            <div className="space-y-3">
              <div className="h-4 w-28 bg-(--bg-subtle) rounded" />
              <div className="h-6 w-3/4 bg-(--bg-subtle) rounded-lg" />
              <div className="space-y-2 pt-1">
                <div className="h-4 w-full bg-(--bg-subtle) rounded" />
                <div className="h-4 w-4/5 bg-(--bg-subtle) rounded" />
              </div>
            </div>
            <div className="pt-6 border-t border-(--border-subtle) flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-5 w-14 bg-(--bg-subtle) rounded-full" />
                <div className="h-5 w-16 bg-(--bg-subtle) rounded-full" />
              </div>
              <div className="h-4 w-16 bg-(--bg-subtle) rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Editorial Case Study detail skeleton loader.
 * Matches the layout of /work/[slug]:
 * - Top breadcrumb
 * - Client / domain meta bar & big headline
 * - Action buttons row
 * - 16:9 hero media card
 * - Problem & solution two-column breakdown
 * - Next project teaser
 */
export function CaseStudySkeleton() {
  return (
    <article className="page-shell pt-24 pb-20 sm:pt-32 sm:pb-28 animate-pulse space-y-12">
      {/* Top Breadcrumb */}
      <div className="h-4 w-36 bg-(--bg-subtle) rounded" />

      {/* Case Study Header */}
      <header className="max-w-4xl space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="h-4 w-24 bg-(--bg-subtle) rounded-full" />
          <span className="h-1 w-1 rounded-full bg-(--border-subtle)" />
          <div className="h-4 w-28 bg-(--bg-subtle) rounded" />
          <span className="h-1 w-1 rounded-full bg-(--border-subtle)" />
          <div className="h-4 w-20 bg-(--bg-subtle) rounded" />
        </div>

        <div className="space-y-3">
          <div className="h-10 sm:h-14 w-4/5 bg-(--bg-subtle) rounded-2xl" />
          <div className="h-10 sm:h-14 w-3/5 bg-(--bg-subtle) rounded-2xl" />
        </div>

        <div className="space-y-2 pt-1 max-w-3xl">
          <div className="h-5 w-full bg-(--bg-subtle) rounded" />
          <div className="h-5 w-4/5 bg-(--bg-subtle) rounded" />
        </div>

        {/* Metadata Details Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-(--border-subtle)">
          {[1, 2, 3].map((m) => (
            <div key={m} className="space-y-2">
              <div className="h-3 w-20 bg-(--bg-subtle) rounded" />
              <div className="h-4 w-32 bg-(--bg-subtle) rounded" />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          <div className="h-10 w-36 bg-(--bg-subtle) rounded-xl" />
          <div className="h-10 w-32 bg-(--bg-subtle) rounded-xl" />
        </div>
      </header>

      {/* Hero Media Canvas */}
      <div className="aspect-video w-full rounded-2xl sm:rounded-3xl border border-(--border-subtle) bg-(--bg-surface) flex items-center justify-center">
        <div className="h-12 w-12 rounded-2xl bg-(--bg-subtle)" />
      </div>

      {/* Case Study Content Grid */}
      <div className="grid gap-12 lg:grid-cols-12 pt-6">
        {/* Left / Center narrative (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          <section className="rounded-3xl border border-(--border-subtle) bg-(--bg-surface)/60 p-6 sm:p-8 space-y-4">
            <div className="h-6 w-32 bg-(--bg-subtle) rounded" />
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-(--bg-subtle) rounded" />
              <div className="h-4 w-5/6 bg-(--bg-subtle) rounded" />
              <div className="h-4 w-4/5 bg-(--bg-subtle) rounded" />
            </div>
          </section>

          <section className="rounded-3xl border border-(--border-subtle) bg-(--bg-surface)/60 p-6 sm:p-8 space-y-4">
            <div className="h-6 w-40 bg-(--bg-subtle) rounded" />
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-(--bg-subtle) rounded" />
              <div className="h-4 w-11/12 bg-(--bg-subtle) rounded" />
              <div className="h-4 w-3/4 bg-(--bg-subtle) rounded" />
            </div>
          </section>
        </div>

        {/* Right sidebar info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-(--border-subtle) bg-(--bg-surface)/60 p-6 space-y-4">
            <div className="h-5 w-24 bg-(--bg-subtle) rounded" />
            <div className="flex flex-wrap gap-2 pt-2">
              {[1, 2, 3, 4, 5, 6].map((k) => (
                <div key={k} className="h-7 w-16 bg-(--bg-subtle) rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Editorial Blog Post detail skeleton loader.
 * Matches the layout of /blog/[slug]:
 * - Top breadcrumb
 * - Date, read time, and tags
 * - Article headline & lead excerpt
 * - Author profile badge
 * - Featured cover image
 * - 12-col Apple HIG grid: 8-col reading content + 4-col sticky TOC
 */
export function BlogPostSkeleton() {
  return (
    <div className="page-shell pt-24 pb-20 sm:pt-32 sm:pb-28 animate-pulse space-y-10">
      {/* Top Breadcrumb */}
      <div className="h-4 w-36 bg-(--bg-subtle) rounded" />

      {/* 12-Column Grid */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Column (8 cols): Primary Reading Measure */}
        <div className="lg:col-span-8 space-y-10">
          {/* Header */}
          <header className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-4 w-28 bg-(--bg-subtle) rounded" />
              <span className="h-1 w-1 rounded-full bg-(--border-subtle)" />
              <div className="h-4 w-16 bg-(--bg-subtle) rounded" />
              <span className="h-1 w-1 rounded-full bg-(--border-subtle)" />
              <div className="h-5 w-20 bg-(--bg-subtle) rounded-full" />
            </div>

            <div className="space-y-3">
              <div className="h-10 sm:h-12 w-full bg-(--bg-subtle) rounded-2xl" />
              <div className="h-10 sm:h-12 w-4/5 bg-(--bg-subtle) rounded-2xl" />
            </div>

            <div className="space-y-2 pt-2">
              <div className="h-5 w-full bg-(--bg-subtle) rounded" />
              <div className="h-5 w-5/6 bg-(--bg-subtle) rounded" />
            </div>

            {/* Author Bio Snippet */}
            <div className="flex items-center gap-3.5 pt-4 border-t border-(--border-subtle)">
              <div className="h-11 w-11 rounded-full bg-(--bg-subtle)" />
              <div className="space-y-1.5">
                <div className="h-4 w-28 bg-(--bg-subtle) rounded" />
                <div className="h-3 w-40 bg-(--bg-subtle) rounded" />
              </div>
            </div>
          </header>

          {/* Featured Cover Image */}
          <div className="aspect-16/10 w-full rounded-2xl sm:rounded-3xl border border-(--border-subtle) bg-(--bg-surface) flex items-center justify-center">
            <div className="h-12 w-12 rounded-2xl bg-(--bg-subtle)" />
          </div>

          {/* Body Prose Paragraph Placeholders */}
          <div className="space-y-6 pt-4">
            <div className="space-y-2.5">
              <div className="h-4 w-full bg-(--bg-subtle) rounded" />
              <div className="h-4 w-11/12 bg-(--bg-subtle) rounded" />
              <div className="h-4 w-4/5 bg-(--bg-subtle) rounded" />
            </div>

            <div className="h-7 w-64 bg-(--bg-subtle) rounded-lg pt-2" />

            <div className="space-y-2.5">
              <div className="h-4 w-full bg-(--bg-subtle) rounded" />
              <div className="h-4 w-5/6 bg-(--bg-subtle) rounded" />
              <div className="h-4 w-full bg-(--bg-subtle) rounded" />
              <div className="h-4 w-3/4 bg-(--bg-subtle) rounded" />
            </div>

            {/* Code / Callout Mock */}
            <div className="h-36 w-full rounded-2xl bg-(--bg-surface) border border-(--border-subtle) p-6 space-y-3">
              <div className="h-3 w-24 bg-(--bg-subtle) rounded" />
              <div className="h-3 w-3/4 bg-(--bg-subtle) rounded" />
              <div className="h-3 w-1/2 bg-(--bg-subtle) rounded" />
            </div>
          </div>
        </div>

        {/* Right Sidebar (4 cols): Sticky Table of Contents & Share */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-28">
          <div className="rounded-3xl border border-(--border-subtle) bg-(--bg-surface)/60 p-6 space-y-5">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-(--bg-subtle)" />
              <div className="h-4 w-32 bg-(--bg-subtle) rounded" />
            </div>
            <div className="space-y-3 pt-2 border-t border-(--border-subtle)">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-3.5 w-4/5 bg-(--bg-subtle) rounded" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

