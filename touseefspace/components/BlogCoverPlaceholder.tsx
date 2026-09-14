"use client";

import React from "react";
import { Cpu, Terminal, Database, Code2, Compass, BookOpen } from "lucide-react";

interface BlogCoverPlaceholderProps {
  title: string;
  tags?: string[];
  postType?: string;
  compact?: boolean;
}

export default function BlogCoverPlaceholder({
  title,
  tags = [],
  postType = "technical",
  compact = false,
}: BlogCoverPlaceholderProps) {
  const primaryTag = tags[0] || (postType === "experience" ? "Field Notes" : postType === "essay" ? "Reflections" : "Architecture");
  const normalizedTag = primaryTag.toLowerCase();

  // Pick an iconic symbol based on postType and tags
  const isExperience = postType === "experience" || normalizedTag.includes("travel") || normalizedTag.includes("exp");
  const isEssay = postType === "essay" || normalizedTag.includes("life") || normalizedTag.includes("essay");

  const Icon = isExperience
    ? Compass
    : isEssay
    ? BookOpen
    : normalizedTag.includes("ai")
    ? Cpu
    : normalizedTag.includes("data") || normalizedTag.includes("postgre")
    ? Database
    : normalizedTag.includes("next")
    ? Terminal
    : Code2;

  const hudLabel = isExperience
    ? `EXP.NOTE // ${primaryTag}`
    : isEssay
    ? `ESSAY // ${primaryTag}`
    : `SYS.SPEC // ${primaryTag}`;

  const hudCategory = isExperience
    ? "FIELD NOTES"
    : isEssay
    ? "DISPATCH"
    : "SCHEMATIC";

  return (
    <div
      className={`relative ${
        compact ? "aspect-16/10 sm:aspect-2/1 p-4 sm:p-5" : "aspect-video p-6 sm:p-10"
      } w-full overflow-hidden rounded-3xl border border-(--border-card) bg-linear-to-br from-(--bg-subtle) via-(--bg-surface) to-(--bg-primary) flex flex-col justify-between group shadow-xs`}
    >
      {/* Background Architectural Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Schematic HUD Bar */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-(--ink-muted) border-b border-(--border-subtle) pb-2.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="uppercase tracking-wider font-semibold text-(--ink-secondary)">
            {hudLabel}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {!compact && <span className="hidden sm:inline opacity-60">ARCH // 2026.R1</span>}
          <span className="rounded bg-(--bg-subtle) border border-(--border-subtle) px-2 py-0.5 text-[10px]">
            {hudCategory}
          </span>
        </div>
      </div>

      {/* Center Symbolic Blueprint Node */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2 sm:py-4">
        <div
          className={`relative flex ${
            compact ? "h-11 w-11 sm:h-13 sm:w-13 rounded-2xl" : "h-16 w-16 sm:h-20 sm:w-20 rounded-2xl sm:rounded-3xl"
          } items-center justify-center bg-(--bg-surface) border border-(--border-strong) shadow-sm group-hover:scale-105 transition-transform duration-500`}
        >
          <Icon className={`${compact ? "h-5 w-5 sm:h-6 sm:w-6" : "h-8 w-8 sm:h-10 sm:w-10"} text-(--ink-primary) opacity-80`} />
          <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-emerald-500/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md -z-10" />
        </div>
        <div className="mt-3 max-w-lg px-2">
          <p className="font-mono text-[10px] sm:text-xs text-(--ink-muted) uppercase tracking-widest">
            {isExperience ? "Field Experience" : isEssay ? "Personal Essay" : "Engineering Documentation"}
          </p>
          <h3 className={`mt-1 ${compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"} font-bold text-(--ink-primary) line-clamp-1 opacity-90`}>
            {title}
          </h3>
        </div>
      </div>

      {/* Bottom Architectural Legend Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-(--border-subtle) pt-2.5 font-mono text-[10px] text-(--ink-muted)">
        <div className="flex items-center gap-2">
          <span>{isExperience ? "SOURCE: DIRECT" : isEssay ? "TOPIC: ESSAY" : "LATENCY: <150ms"}</span>
          <span>·</span>
          <span>INTEGRITY: 99.9%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-(--ink-muted)" />
          <span>{isExperience ? "OBSERVATION" : isEssay ? "ESSAY" : "VERIFIED SPEC"}</span>
        </div>
      </div>
    </div>
  );
}
