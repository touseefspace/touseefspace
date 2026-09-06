"use client";

import React from "react";
import { Cpu, Terminal, Database, Code2 } from "lucide-react";

interface BlogCoverPlaceholderProps {
  title: string;
  tags?: string[];
}

export default function BlogCoverPlaceholder({
  title,
  tags = [],
}: BlogCoverPlaceholderProps) {
  const primaryTag = tags[0] || "Architecture";

  // Pick an iconic symbol based on tags
  const Icon = primaryTag.toLowerCase().includes("ai")
    ? Cpu
    : primaryTag.toLowerCase().includes("data") || primaryTag.toLowerCase().includes("postgre")
    ? Database
    : primaryTag.toLowerCase().includes("next")
    ? Terminal
    : Code2;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-(--border-card) bg-linear-to-br from-(--bg-subtle) via-(--bg-surface) to-(--bg-primary) p-6 sm:p-10 flex flex-col justify-between group shadow-xs">
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
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-(--ink-muted) border-b border-(--border-subtle) pb-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="uppercase tracking-wider font-semibold text-(--ink-secondary)">
            SYS.SPEC // {primaryTag}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline opacity-60">ARCH // 2026.R1</span>
          <span className="rounded bg-(--bg-subtle) border border-(--border-subtle) px-2 py-0.5 text-[10px]">
            SCHEMATIC
          </span>
        </div>
      </div>

      {/* Center Symbolic Blueprint Node */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-4 sm:py-6">
        <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-(--bg-surface) border border-(--border-strong) shadow-sm group-hover:scale-105 transition-transform duration-500">
          <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-(--ink-primary) opacity-80" />
          <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-emerald-500/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md -z-10" />
        </div>
        <div className="mt-4 max-w-lg">
          <p className="font-mono text-xs text-(--ink-muted) uppercase tracking-widest">
            Engineering Documentation
          </p>
          <h3 className="mt-1 text-sm sm:text-base font-bold text-(--ink-primary) line-clamp-1 opacity-90">
            {title}
          </h3>
        </div>
      </div>

      {/* Bottom Architectural Legend Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-(--border-subtle) pt-3 font-mono text-[10px] text-(--ink-muted)">
        <div className="flex items-center gap-2">
          <span>LATENCY: &lt;150ms</span>
          <span>·</span>
          <span>INTEGRITY: 99.9%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-(--ink-muted)" />
          <span>VERIFIED SPEC</span>
        </div>
      </div>
    </div>
  );
}
