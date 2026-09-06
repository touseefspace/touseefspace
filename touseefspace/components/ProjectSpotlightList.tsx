"use client";

import React, { useRef } from "react";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";

interface Media {
  url: string;
  alt: string;
}

interface Project {
  id: string;
  title: string;
  slug?: string | { current?: string };
  image?: Media | string | null;
  githubUrl?: string;
  liveUrl?: string;
  period?: string;
  summary?: string;
  technologies?: { 
    name: string;
    icon?: Media | string | null;
  }[];
}

export default function ProjectSpotlightList({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-12 flex flex-col gap-8 md:gap-10" ref={containerRef}>
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
          />
        ))
      ) : (
        <div className="rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-(--bg-surface) border border-(--border-card)">
          <div className="h-14 w-14 rounded-2xl bg-(--bg-subtle) border border-(--border-subtle) flex items-center justify-center mb-5">
            <Sparkles className="h-7 w-7 text-(--ink-muted)" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-(--ink-primary) mb-2">No projects found</h2>
          <p className="max-w-md text-sm text-(--ink-muted) leading-relaxed">
            Create entries in the Projects collection in your Payload admin panel to see your work here.
          </p>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ 
  project, 
}: { 
  project: Project; 
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };

  const imageUrl = typeof project.image === "string" 
    ? project.image 
    : project.image?.url;
    
  const imageAlt = typeof project.image === "string" 
    ? project.title 
    : (project.image?.alt || project.title);

  const projectSlug =
    typeof project.slug === "string"
      ? project.slug
      : project.slug?.current || project.id;

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative rounded-3xl border border-(--border-card) bg-(--bg-surface) p-6 sm:p-8 md:p-9 shadow-xs transition-all duration-300 hover:border-(--border-strong) hover:shadow-md overflow-hidden"
    >
      <div className="spotlight-glow" />

      <div className="relative z-10 grid gap-6 lg:grid-cols-12 lg:gap-10 lg:items-center">
        {/* Left: Preview Window (Apple 16:10 Aspect Container) */}
        <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-(--border-subtle) bg-(--bg-subtle) transition-colors group-hover:border-(--border-strong)">
          {projectSlug ? (
            <Link
              href={`/work/${projectSlug}`}
              className="group/mockup relative aspect-16/10 w-full block overflow-hidden"
              aria-label={`Read ${project.title} case study`}
            >
              {imageUrl ? (
                <Image 
                  src={imageUrl} 
                  alt={imageAlt} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/mockup:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-(--bg-subtle)">
                  <span className="text-3xl font-bold text-(--ink-muted)">{project.title.charAt(0)}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/mockup:opacity-100 transition-opacity flex items-end justify-end p-3">
                <span className="rounded-lg bg-black/75 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white flex items-center gap-1">
                  Case Study <ArrowUpRight size={12} />
                </span>
              </div>
            </Link>
          ) : (
            <div className="relative aspect-16/10 w-full overflow-hidden">
              {imageUrl ? (
                <Image 
                  src={imageUrl} 
                  alt={imageAlt} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-(--bg-subtle)">
                  <span className="text-3xl font-bold text-(--ink-muted)">{project.title.charAt(0)}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Content Details */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {project.period && (
              <span className="font-mono text-xs uppercase tracking-wider text-(--ink-muted)">
                {project.period}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-(--ink-primary) leading-snug">
              {projectSlug ? (
                <Link href={`/work/${projectSlug}`} className="hover:underline">
                  {project.title}
                </Link>
              ) : (
                project.title
              )}
            </h2>
            {project.summary && (
              <p className="text-sm sm:text-base leading-relaxed text-(--ink-secondary)">
                {project.summary}
              </p>
            )}
          </div>

          {/* Tech Stack Badges */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech, index) => (
                <div key={index} className="tech-tag">
                  {tech.icon && (
                    <Image 
                      src={typeof tech.icon === "string" ? tech.icon : tech.icon.url} 
                      alt={tech.name}
                      width={14}
                      height={14}
                      className="h-3.5 w-3.5 object-contain"
                    />
                  )}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-(--border-subtle)">
            {projectSlug && (
              <Link 
                href={`/work/${projectSlug}`}
                aria-label={`Explore ${project.title} case study`}
                className="btn-primary h-9 px-4 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>Case Study</span> <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            )}
            {project.liveUrl && (
              <Link 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
                className="btn-secondary h-9 px-4 text-xs font-medium rounded-xl inline-flex items-center gap-1.5"
              >
                <span>View Live</span> <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            )}
            {project.githubUrl && (
              <Link 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View source code for ${project.title} on GitHub`}
                className="btn-secondary h-9 px-4 text-xs font-medium rounded-xl inline-flex items-center gap-1.5"
              >
                <SiGithub className="h-3.5 w-3.5" aria-hidden="true" /> <span>Source Code</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
