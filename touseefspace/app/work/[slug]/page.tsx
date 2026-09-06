import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers, Calendar, User, Building, ArrowRight } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/queries";
import { urlForImage } from "@/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | touseefspace",
    };
  }

  const description =
    project.summary ||
    project.problem ||
    `A detailed case study on ${project.title} — custom software architecture, systems engineering, and measurable operational outcomes by Touseef Ahmed.`;

  return {
    title: `${project.title} — Case Study | touseefspace`,
    description,
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study | touseefspace`,
      description,
      url: `https://touseefspace.com/work/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | touseefspace`,
      description,
      creator: "@touseefspace",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const imageUrl =
    urlForImage(project.image)?.width(1600).url() ||
    (typeof project.image === "string" ? project.image : project.image?.url) ||
    "/placeholders/aunvu-dashboard.svg";

  return (
    <article className="page-shell pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* Top Breadcrumb */}
      <nav className="mb-10">
        <Link
          href="/#selected-work"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-(--ink-muted) hover:text-(--ink-primary) transition-colors group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          Back to Selected Work
        </Link>
      </nav>

      {/* Case Study Header */}
      <header className="max-w-4xl space-y-6">
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-(--ink-muted)">
          <span className="section-label">Case study</span>
          <span className="h-1 w-1 rounded-full bg-(--ink-muted) opacity-50" />
          <span>{project.client || "Client System"}</span>
          {project.period && (
            <>
              <span className="h-1 w-1 rounded-full bg-(--ink-muted) opacity-50" />
              <span>{project.period}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-(--ink-primary) leading-[1.1]">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed text-(--ink-secondary)">
          {project.summary}
        </p>

        {/* Metadata Details Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-(--border-subtle) font-mono text-xs">
          {project.client && (
            <div>
              <span className="text-(--ink-muted) block mb-1">CLIENT / DOMAIN</span>
              <span className="text-(--ink-primary) font-semibold">{project.client}</span>
            </div>
          )}
          {project.role && (
            <div>
              <span className="text-(--ink-muted) block mb-1">ENGINEERING ROLE</span>
              <span className="text-(--ink-primary) font-semibold">{project.role}</span>
            </div>
          )}
          {project.period && (
            <div>
              <span className="text-(--ink-muted) block mb-1">TIMELINE</span>
              <span className="text-(--ink-primary) font-semibold">{project.period}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Explore live app for ${project.title}`}
              className="btn-primary h-10 px-5 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5"
            >
              Explore Live App <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title} on GitHub`}
              className="btn-secondary h-10 px-5 text-xs font-medium rounded-xl inline-flex items-center gap-1.5"
            >
              Source Code <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          )}
          <Link
            href="/contact"
            className="btn-secondary h-10 px-5 text-xs font-medium rounded-xl inline-flex items-center gap-1.5"
          >
            Discuss a Similar Project <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </header>

      {/* Hero Visual Container */}
      <div className="mt-12 overflow-hidden rounded-3xl border border-(--border-card) bg-(--bg-surface) shadow-md">
        <div className="relative aspect-video sm:aspect-21/9 w-full">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Quantified Metrics Highlight */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {project.metrics.map((m: any, i: number) => (
            <div
              key={i}
              className="rounded-2xl border border-(--border-card) bg-(--bg-surface) p-6 text-center space-y-1"
            >
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-(--ink-secondary)">
                {m.label}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Problem, Solution, Outcome Narrative Section */}
      <section className="mt-16 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Problem Breakdown */}
          {project.problem && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="rounded bg-rose-500/10 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-rose-400 border border-rose-500/20 inline-block">
                  The Operational Friction & Bottleneck
                </h2>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
                {project.problem}
              </p>
            </div>
          )}

          {/* Solution Breakdown */}
          {project.solution && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="rounded bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/20 inline-block">
                  Key Engineered Solutions & Architecture
                </h2>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
                {project.solution}
              </p>
            </div>
          )}

          {/* Outcome Breakdown */}
          {project.outcome && (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Measurable Business Impact
                </h2>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-(--ink-primary) font-medium">
                {project.outcome}
              </p>
            </div>
          )}

          {/* Portable Text Body (Full Case Study Writeup) */}
          {project.body && (
            <div className="pt-8 border-t border-(--border-subtle)">
              <PortableTextRenderer value={project.body} />
            </div>
          )}
        </div>

        {/* Sidebar: Stack & Key Features */}
        <aside className="lg:col-span-4 space-y-8" aria-label="Project details">
          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="rounded-2xl border border-(--border-card) bg-(--bg-surface) p-6 space-y-4">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-(--ink-muted)">
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: any, i: number) => (
                  <span key={i} className="tech-tag text-xs">
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Features List */}
          {project.features && project.features.length > 0 && (
            <div className="rounded-2xl border border-(--border-card) bg-(--bg-surface) p-6 space-y-4">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-(--ink-muted)">
                Key Engineered Capabilities
              </h2>
              <ul className="space-y-3 text-sm text-(--ink-secondary)">
                {project.features.map((feature: any, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{typeof feature === "string" ? feature : feature.feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Box */}
          <div className="rounded-2xl border border-(--border-card) bg-(--bg-subtle) p-6 space-y-3">
            <h2 className="text-base font-bold text-(--ink-primary)">
              Building something similar?
            </h2>
            <p className="text-xs sm:text-sm text-(--ink-muted) leading-relaxed">
              I collaborate with businesses to eliminate operational clutter and build custom software spaces.
            </p>
            <Link
              href="/contact"
              className="btn-primary w-full h-10 text-xs font-semibold rounded-xl inline-flex items-center justify-center gap-1.5 mt-2"
            >
              Start a Conversation <ArrowRight size={14} />
            </Link>
          </div>
        </aside>
      </section>

      {/* Footer Navigation */}
      <footer className="mt-20 pt-10 border-t border-(--border-subtle) flex items-center justify-between">
        <Link
          href="/#selected-work"
          className="inline-flex items-center gap-2 text-sm font-semibold text-(--ink-muted) hover:text-(--ink-primary) transition-colors"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to Homepage
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-(--ink-primary) hover:underline"
        >
          Browse All Projects <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </footer>
    </article>
  );
}
