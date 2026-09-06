"use client";

import React, { useRef } from "react";
import { Calendar, MapPin, Download, ExternalLink } from "lucide-react";

interface Experience {
  id: string;
  role: string;
  company: string;
  time: string;
  location?: string;
  category?: "work" | "education";
  description?: string;
  logo?: {
    url: string;
  };
  tasks?: {
    task: string;
  }[];
  skillStack?: {
    skill: string;
    icon?: {
      url: string;
    };
  }[];
  attachments?: {
    label: string;
    file: {
      url: string;
    };
  }[];
}

export default function ExperienceList({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {experiences.length > 0 ? (
        experiences.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} />
        ))
      ) : (
        <div className="glass-line rounded-3xl p-12 flex flex-col items-center justify-center text-center border-dashed border-(--border-subtle) bg-(--bg-surface)">
          <div className="h-16 w-16 rounded-full bg-(--bg-subtle) flex items-center justify-center mb-6">
            <Calendar className="h-8 w-8 text-(--ink-muted)" />
          </div>
          <h3 className="text-xl font-bold text-(--ink-primary) mb-2">No experiences found</h3>
          <p className="max-w-md text-sm text-(--ink-muted) leading-relaxed">
            Create entries in the Experiences collection in your Payload admin panel to see your trajectory here.
          </p>
        </div>
      )}
    </div>
  );
}

function ExperienceCard({ exp }: { exp: Experience }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="experience-card group relative p-6 sm:p-8 md:p-9 rounded-3xl border border-(--border-card) bg-(--bg-surface) shadow-xs transition-all duration-300 hover:border-(--border-strong) hover:shadow-md"
    >
      {/* Spotlight Glow */}
      <div className="spotlight-glow" />

      {/* Timeline Dot */}
      <div className="absolute left-[-31px] md:left-[-55px] top-7 h-3.5 w-3.5 rounded-full bg-(--bg-primary) border-2 border-(--ink-primary) z-10 transition-transform duration-200 group-hover:scale-125" />

      <div className="grid lg:grid-cols-10 gap-8 relative z-10">
        <div className="lg:col-span-6 space-y-6">
          <div className="flex gap-4 sm:gap-5">
            {/* Logo */}
            <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-2xl bg-(--bg-subtle) border border-(--border-subtle) p-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs">
              {exp.logo?.url ? (
                <img src={exp.logo.url} alt={exp.company} className="h-full w-full object-contain" />
              ) : (
                <span className="text-xl font-bold text-(--ink-muted)">{exp.company.charAt(0)}</span>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-(--ink-primary) sm:text-xl md:text-2xl tracking-tight leading-tight mb-1">
                {exp.role}
              </h3>
              <div className="flex flex-col gap-1">
                <p className="text-(--ink-primary) font-semibold text-sm md:text-base">
                  {exp.company}
                </p>
                {exp.location && (
                  <span className="flex items-center gap-1.5 text-xs font-mono text-(--ink-muted)">
                    <MapPin size={12}/> {exp.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {exp.description && (
              <p className="text-sm md:text-base text-(--ink-secondary) leading-relaxed italic border-l-2 border-(--border-strong) pl-4">
                {exp.description}
              </p>
            )}

            {exp.tasks && exp.tasks.length > 0 && (
              <div className="grid gap-2.5">
                {exp.tasks.map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm md:text-base text-(--ink-secondary) leading-relaxed group/item">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--ink-muted) group-hover/item:bg-(--ink-primary) transition-colors" />
                    {item.task}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Details Column (Desktop Only) */}
        <div className="lg:col-span-4 lg:pl-6 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-(--ink-muted) bg-(--bg-subtle)/70 px-3.5 py-1.5 rounded-full border border-(--border-subtle) w-fit">
            <Calendar size={13}/> {exp.time}
          </div>

          {/* Tech Stack */}
          {exp.skillStack && exp.skillStack.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-(--ink-muted) border-b border-(--border-subtle) pb-1.5">Technologies Used</p>
              <div className="flex flex-wrap gap-2">
                {exp.skillStack.map((skill, i) => (
                  <div key={i} className="tech-tag">
                    {skill.icon?.url && (
                      <img src={skill.icon.url} alt="" className="h-3.5 w-3.5 object-contain" />
                    )}
                    <span>{skill.skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attachments */}
          {exp.attachments && exp.attachments.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-(--ink-muted) border-b border-(--border-subtle) pb-1.5">Supporting Files</p>
              <div className="grid gap-2">
                {exp.attachments.map((att, i) => (
                  <a 
                    key={i}
                    href={att.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-(--bg-subtle)/60 border border-(--border-subtle) text-(--ink-primary) text-xs font-medium hover:border-(--border-strong) hover:bg-(--bg-subtle) transition-all duration-200 group/att"
                  >
                    <div className="flex items-center gap-2.5">
                      <Download size={13} />
                      {att.label}
                    </div>
                    <ExternalLink size={12} className="opacity-60 group-hover/att:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
