"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { SlidersHorizontal, Check, X } from "lucide-react";

interface SkillIconSource {
  url?: string;
  asset?: {
    url?: string;
  };
}

interface SkillItem {
  id?: string;
  _id?: string;
  _key?: string;
  name: string;
  skill?: string;
  proficiency?: number;
  iconDark?: SkillIconSource | string | null;
  iconLight?: SkillIconSource | string | null;
  categoryTitle?: string;
}

interface SkillCategory {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  iconDark?: SkillIconSource | string | null;
  iconLight?: SkillIconSource | string | null;
  skills?: SkillItem[];
}

type SkillTier = "all" | "core" | "proficient" | "familiar";

interface TierConfig {
  key: "core" | "proficient" | "familiar";
  label: string;
  shortLabel: string;
  range: string;
  desc: string;
  colorHex: string;
  dotClass: string;
  borderClass: string;
  badgeBgClass: string;
  badgeTextClass: string;
  glowClass: string;
  tileBgClass: string;
}

const TIER_CONFIGS: Record<"core" | "proficient" | "familiar", TierConfig> = {
  core: {
    key: "core",
    label: "Core Daily Driver",
    shortLabel: "Core",
    range: "90%+",
    desc: "Primary architectural weapons used daily in production.",
    colorHex: "#10b981",
    dotClass: "bg-emerald-500",
    borderClass: "hover:border-emerald-500/80 border-emerald-500/30",
    badgeBgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
    badgeTextClass: "text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    glowClass: "group-hover:shadow-[0_0_16px_rgba(16,185,129,0.3)]",
    tileBgClass: "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-500/20",
  },
  proficient: {
    key: "proficient",
    label: "Proficient Range",
    shortLabel: "Proficient",
    range: "80% - 89%",
    desc: "Production-proven systems, backend services, APIs, and databases.",
    colorHex: "#8b5cf6",
    dotClass: "bg-violet-500",
    borderClass: "hover:border-violet-500/80 border-violet-500/30",
    badgeBgClass: "bg-violet-500/10 dark:bg-violet-500/20",
    badgeTextClass: "text-violet-600 dark:text-violet-400 border-violet-500/30",
    glowClass: "group-hover:shadow-[0_0_16px_rgba(139,92,246,0.3)]",
    tileBgClass: "bg-violet-500/10 dark:bg-violet-500/15 border-violet-500/30 hover:border-violet-500/60 hover:bg-violet-500/20",
  },
  familiar: {
    key: "familiar",
    label: "Ecosystem & Tools",
    shortLabel: "Familiar",
    range: "< 80%",
    desc: "Supplemental platforms, workflow automation, and developer utilities.",
    colorHex: "#f59e0b",
    dotClass: "bg-amber-500",
    borderClass: "hover:border-amber-500/80 border-amber-500/30",
    badgeBgClass: "bg-amber-500/10 dark:bg-amber-500/20",
    badgeTextClass: "text-amber-600 dark:text-amber-400 border-amber-500/30",
    glowClass: "group-hover:shadow-[0_0_16px_rgba(245,158,11,0.3)]",
    tileBgClass: "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/20",
  },
};

function getSkillTier(proficiency?: number): "core" | "proficient" | "familiar" {
  const p = proficiency || 0;
  if (p >= 90) return "core";
  if (p >= 80) return "proficient";
  return "familiar";
}

interface InspectedSkillToast {
  id: number;
  skill: SkillItem;
  tierKey: "core" | "proficient" | "familiar";
  tierLabel: string;
  isDimmed: boolean;
}

export default function SkillsProficiencyClient({
  categories,
}: {
  categories: SkillCategory[];
}) {
  const [activeTier, setActiveTier] = useState<SkillTier>("all");
  const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<InspectedSkillToast | null>(null);

  // Auto-dismiss toast after 4 seconds (matching perimeter animation)
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Flatten and calculate telemetry counts across all skills
  const { allSkills, tierCounts } = useMemo(() => {
    const list: SkillItem[] = [];
    const counts = { core: 0, proficient: 0, familiar: 0 };

    categories.forEach((cat) => {
      (cat.skills || []).forEach((s) => {
        const item = { ...s, categoryTitle: cat.title };
        list.push(item);
        const tier = getSkillTier(s.proficiency);
        counts[tier]++;
      });
    });

    return { allSkills: list, tierCounts: counts };
  }, [categories]);

  // Categories with skills sorted by proficiency
  const processedCategories = useMemo(() => {
    return categories
      .map((cat) => {
        const sorted = (cat.skills || [])
          .map((s) => ({ ...s, categoryTitle: cat.title }))
          .sort((a, b) => (b.proficiency || 0) - (a.proficiency || 0));

        return { ...cat, skills: sorted };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [categories]);

  // Handle clicking on any skill icon to inspect
  const handleSkillClick = (skill: SkillItem, isDimmed: boolean) => {
    const tier = getSkillTier(skill.proficiency);
    const config = TIER_CONFIGS[tier];
    setToast((prev) => ({
      id: (prev?.id ?? 0) + 1,
      skill,
      tierKey: tier,
      tierLabel: config.shortLabel,
      isDimmed,
    }));
  };

  // Active filter button styles (matching brand-space blue #0284c7 with white icon by default, tier color when selected)
  const filterBtnClass =
    activeTier === "core"
      ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400/40 shadow-lg shadow-emerald-600/30"
      : activeTier === "proficient"
      ? "bg-violet-600 hover:bg-violet-500 text-white border-violet-400/40 shadow-lg shadow-violet-600/30"
      : activeTier === "familiar"
      ? "bg-amber-600 hover:bg-amber-500 text-white border-amber-400/40 shadow-lg shadow-amber-600/30"
      : "bg-[#0284c7] hover:bg-[#0369a1] text-white border-sky-400/40 shadow-lg shadow-[#0284c7]/30";

  return (
    <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5 w-full min-w-0">
      
      {/* Keyframe animation for toast perimeter countdown */}
      <style>{`
        @keyframes toastBorderErase {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 100; }
        }
      `}</style>

      {/* Desktop Sticky Filter Button (sm and up) */}
      <div className="hidden sm:flex sticky top-20 z-30 justify-end w-full pointer-events-none mb-2 sm:mb-3">
        <div className="relative pointer-events-auto">
          <button
            type="button"
            onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            aria-expanded={filterMenuOpen}
            aria-label="Filter skills"
            title="Filter skills"
            className={`relative h-11 w-11 sm:h-12 sm:w-12 rounded-full border shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer ${filterBtnClass}`}
          >
            {filterMenuOpen ? (
              <X size={18} className="transition-transform duration-150" />
            ) : (
              <SlidersHorizontal size={18} className="transition-transform duration-150" />
            )}
          </button>

          {/* Backdrop overlay when open */}
          {filterMenuOpen && (
            <div
              onClick={() => setFilterMenuOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-[1px] transition-opacity animate-in fade-in duration-150"
            />
          )}

          {/* Floating Dropdown Popover (opens downward on desktop) */}
          {filterMenuOpen && (
            <div
              role="dialog"
              aria-label="Filter skills by proficiency tier"
              className="absolute top-full mt-2 right-0 z-50 w-56 p-1.5 rounded-2xl bg-(--bg-surface)/95 dark:bg-[#1e1e20]/95 backdrop-blur-2xl border border-(--border-card) dark:border-white/15 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150"
            >
              <div className="px-3 py-1.5 flex items-center justify-between border-b border-(--border-subtle)">
                <span className="text-[10px] font-mono font-medium tracking-wider text-(--ink-muted) uppercase">
                  Filter by Tier
                </span>
                <button
                  type="button"
                  onClick={() => setFilterMenuOpen(false)}
                  className="text-(--ink-muted) hover:text-(--ink-primary) p-0.5 rounded-md transition-colors cursor-pointer"
                  aria-label="Close filter menu"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Option: All */}
              <button
                type="button"
                onClick={() => {
                  setActiveTier("all");
                  setFilterMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                  activeTier === "all"
                    ? "bg-(--bg-subtle) font-semibold text-(--ink-primary)"
                    : "text-(--ink-secondary) hover:bg-(--bg-subtle)/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs">All Skills</span>
                  <span className="text-[10px] font-mono text-(--ink-muted)">({allSkills.length})</span>
                </div>
                {activeTier === "all" && <Check size={14} className="text-(--ink-primary) shrink-0" />}
              </button>

              {/* Option: Core */}
              <button
                type="button"
                onClick={() => {
                  setActiveTier(activeTier === "core" ? "all" : "core");
                  setFilterMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                  activeTier === "core"
                    ? "bg-(--bg-subtle) font-semibold text-(--ink-primary)"
                    : "text-(--ink-secondary) hover:bg-(--bg-subtle)/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20 shrink-0" />
                  <span className="text-xs">Core</span>
                  <span className="text-[10px] font-mono text-(--ink-muted)">({tierCounts.core})</span>
                </div>
                {activeTier === "core" && <Check size={14} className="text-emerald-500 shrink-0" />}
              </button>

              {/* Option: Proficient */}
              <button
                type="button"
                onClick={() => {
                  setActiveTier(activeTier === "proficient" ? "all" : "proficient");
                  setFilterMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                  activeTier === "proficient"
                    ? "bg-(--bg-subtle) font-semibold text-(--ink-primary)"
                    : "text-(--ink-secondary) hover:bg-(--bg-subtle)/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-500 ring-2 ring-violet-500/20 shrink-0" />
                  <span className="text-xs">Proficient</span>
                  <span className="text-[10px] font-mono text-(--ink-muted)">({tierCounts.proficient})</span>
                </div>
                {activeTier === "proficient" && <Check size={14} className="text-violet-500 shrink-0" />}
              </button>

              {/* Option: Familiar */}
              <button
                type="button"
                onClick={() => {
                  setActiveTier(activeTier === "familiar" ? "all" : "familiar");
                  setFilterMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                  activeTier === "familiar"
                    ? "bg-(--bg-subtle) font-semibold text-(--ink-primary)"
                    : "text-(--ink-secondary) hover:bg-(--bg-subtle)/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500 ring-2 ring-amber-500/20 shrink-0" />
                  <span className="text-xs">Familiar</span>
                  <span className="text-[10px] font-mono text-(--ink-muted)">({tierCounts.familiar})</span>
                </div>
                {activeTier === "familiar" && <Check size={14} className="text-amber-500 shrink-0" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Floating Filter Button (bottom-right on mobile screens) */}
      <div className="sm:hidden fixed bottom-6 right-6 z-40">
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            aria-expanded={filterMenuOpen}
            aria-label="Filter skills"
            title="Filter skills"
            className={`relative h-12 w-12 rounded-full border shadow-xl hover:shadow-2xl flex items-center justify-center transition-all active:scale-95 cursor-pointer ${filterBtnClass}`}
          >
            {filterMenuOpen ? (
              <X size={18} className="transition-transform duration-150" />
            ) : (
              <SlidersHorizontal size={18} className="transition-transform duration-150" />
            )}
          </button>

          {/* Backdrop overlay */}
          {filterMenuOpen && (
            <div
              onClick={() => setFilterMenuOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-[1px] transition-opacity animate-in fade-in duration-150"
            />
          )}

          {/* Mobile Popover Menu (opens upward from bottom button) */}
          {filterMenuOpen && (
            <div
              role="dialog"
              aria-label="Filter skills by proficiency tier"
              className="absolute bottom-15 right-0 z-50 w-56 p-1.5 rounded-2xl bg-(--bg-surface)/95 dark:bg-[#1e1e20]/95 backdrop-blur-2xl border border-(--border-card) dark:border-white/15 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-150"
            >
              <div className="px-3 py-1.5 flex items-center justify-between border-b border-(--border-subtle)">
                <span className="text-[10px] font-mono font-medium tracking-wider text-(--ink-muted) uppercase">
                  Filter by Tier
                </span>
                <button
                  type="button"
                  onClick={() => setFilterMenuOpen(false)}
                  className="text-(--ink-muted) hover:text-(--ink-primary) p-0.5 rounded-md transition-colors cursor-pointer"
                  aria-label="Close filter menu"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Option: All */}
              <button
                type="button"
                onClick={() => {
                  setActiveTier("all");
                  setFilterMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                  activeTier === "all"
                    ? "bg-(--bg-subtle) font-semibold text-(--ink-primary)"
                    : "text-(--ink-secondary) hover:bg-(--bg-subtle)/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs">All Skills</span>
                  <span className="text-[10px] font-mono text-(--ink-muted)">({allSkills.length})</span>
                </div>
                {activeTier === "all" && <Check size={14} className="text-(--ink-primary) shrink-0" />}
              </button>

              {/* Option: Core */}
              <button
                type="button"
                onClick={() => {
                  setActiveTier(activeTier === "core" ? "all" : "core");
                  setFilterMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                  activeTier === "core"
                    ? "bg-(--bg-subtle) font-semibold text-(--ink-primary)"
                    : "text-(--ink-secondary) hover:bg-(--bg-subtle)/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20 shrink-0" />
                  <span className="text-xs">Core</span>
                  <span className="text-[10px] font-mono text-(--ink-muted)">({tierCounts.core})</span>
                </div>
                {activeTier === "core" && <Check size={14} className="text-emerald-500 shrink-0" />}
              </button>

              {/* Option: Proficient */}
              <button
                type="button"
                onClick={() => {
                  setActiveTier(activeTier === "proficient" ? "all" : "proficient");
                  setFilterMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                  activeTier === "proficient"
                    ? "bg-(--bg-subtle) font-semibold text-(--ink-primary)"
                    : "text-(--ink-secondary) hover:bg-(--bg-subtle)/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-500 ring-2 ring-violet-500/20 shrink-0" />
                  <span className="text-xs">Proficient</span>
                  <span className="text-[10px] font-mono text-(--ink-muted)">({tierCounts.proficient})</span>
                </div>
                {activeTier === "proficient" && <Check size={14} className="text-violet-500 shrink-0" />}
              </button>

              {/* Option: Familiar */}
              <button
                type="button"
                onClick={() => {
                  setActiveTier(activeTier === "familiar" ? "all" : "familiar");
                  setFilterMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                  activeTier === "familiar"
                    ? "bg-(--bg-subtle) font-semibold text-(--ink-primary)"
                    : "text-(--ink-secondary) hover:bg-(--bg-subtle)/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500 ring-2 ring-amber-500/20 shrink-0" />
                  <span className="text-xs">Familiar</span>
                  <span className="text-[10px] font-mono text-(--ink-muted)">({tierCounts.familiar})</span>
                </div>
                {activeTier === "familiar" && <Check size={14} className="text-amber-500 shrink-0" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Responsive Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full min-w-0">
        {processedCategories.map((category) => (
          <div
            key={category.id || category._id || category.title}
            className="rounded-3xl border border-(--border-card) bg-(--bg-surface) p-4 sm:p-5 shadow-xs flex flex-col min-w-0 w-full relative overflow-visible transition-all duration-200 space-y-3"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-(--border-subtle) min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-(--ink-primary) tracking-tight truncate">
                {category.title}
              </h3>
              <span className="text-[10px] font-mono text-(--ink-muted) bg-(--bg-subtle) px-2 py-0.5 rounded-full border border-(--border-subtle) shrink-0">
                {category.skills.length}
              </span>
            </div>

            {/* Compact Icon Tray with Spotlight Heatmap Dimming */}
            <div className="flex-1 flex flex-wrap content-start items-start gap-2 sm:gap-2.5 w-full min-w-0 pt-0.5">
              {category.skills.map((skill: SkillItem) => {
                const tier = getSkillTier(skill.proficiency);
                const isMatch = activeTier === "all" || tier === activeTier;

                return (
                  <CompactIconTile
                    key={skill.id || skill._key || skill.name}
                    skill={skill}
                    isDimmed={!isMatch}
                    onSelect={() => handleSkillClick(skill, !isMatch)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Skill Inspector Toast (aligned with filter icon on mobile, centered on desktop) */}
      {toast && (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className="fixed bottom-9 right-20 left-4 max-w-sm sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:bottom-8 sm:w-80 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="relative flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl bg-(--bg-surface)/95 dark:bg-[#1a1a1c]/95 backdrop-blur-2xl shadow-2xl text-xs text-(--ink-primary) border border-transparent overflow-hidden">
            {/* SVG Timed Perimeter Border Countdown */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl overflow-visible">
              <rect
                key={toast.id}
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="16"
                fill="none"
                strokeWidth="1.5"
                pathLength="100"
                className={
                  toast.tierKey === "core"
                    ? "stroke-emerald-500/80 dark:stroke-emerald-400/80"
                    : toast.tierKey === "proficient"
                    ? "stroke-violet-500/80 dark:stroke-violet-400/80"
                    : "stroke-amber-500/80 dark:stroke-amber-400/80"
                }
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: 0,
                  animation: "toastBorderErase 4s linear forwards",
                }}
              />
            </svg>

            {/* Subtle background hairline base border */}
            <div className="absolute inset-0 rounded-2xl border border-(--border-subtle) pointer-events-none" />

            {/* Left: Icon, Name, and Proficiency */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="h-8 w-8 rounded-lg bg-(--bg-subtle) border border-(--border-subtle) p-1.5 flex items-center justify-center shrink-0">
                <SkillIcon skill={toast.skill} className="h-full w-full object-contain" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-bold text-(--ink-primary) text-xs sm:text-sm truncate">
                    {toast.skill.name}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-md border shrink-0 ${
                    TIER_CONFIGS[toast.tierKey].badgeBgClass
                  } ${TIER_CONFIGS[toast.tierKey].badgeTextClass}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${TIER_CONFIGS[toast.tierKey].dotClass}`} />
                    {toast.skill.proficiency}%
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Only the cross (X) button */}
            <button
              type="button"
              onClick={() => setToast(null)}
              title="Close"
              aria-label="Close"
              className="h-7 w-7 rounded-xl bg-(--bg-subtle) hover:bg-(--bg-surface-elevated) text-(--ink-muted) hover:text-(--ink-primary) flex items-center justify-center transition-all active:scale-90 cursor-pointer shrink-0"
            >
              <X size={13} className="stroke-[2.2]" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

/**
 * Compact Icon Squircle with 3-Tier Color Pip, Spotlight Dimming & Selection State
 */
function CompactIconTile({
  skill,
  isDimmed,
  onSelect,
}: {
  skill: SkillItem;
  isDimmed?: boolean;
  onSelect: () => void;
}) {
  const tier = getSkillTier(skill.proficiency);
  const config = TIER_CONFIGS[tier];

  return (
    <div
      className={`relative group shrink-0 transition-all duration-300 hover:z-20 ${
        isDimmed ? "opacity-25 grayscale hover:opacity-100 hover:grayscale-0" : "opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-label={`${skill.name} - ${config.shortLabel} (${skill.proficiency}%)`}
        className={`relative h-11 w-11 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl ${config.tileBgClass} border p-2 sm:p-2.5 flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-0 ${config.glowClass} hover:scale-110 active:scale-95`}
      >
        {/* Technology Brand Icon */}
        <SkillIcon skill={skill} className="h-full w-full object-contain pointer-events-none" />
      </button>
    </div>
  );
}

/**
 * Robust Skill Icon component with dark/light mode asset handling
 */
function SkillIcon({ skill, className }: { skill: SkillItem; className?: string }) {
  const darkObj = typeof skill.iconDark === "object" && skill.iconDark !== null ? skill.iconDark : null;
  const lightObj = typeof skill.iconLight === "object" && skill.iconLight !== null ? skill.iconLight : null;

  const iconDarkUrl =
    darkObj?.url ||
    darkObj?.asset?.url ||
    (typeof skill.iconDark === "string" ? skill.iconDark : null);
  const iconLightUrl =
    lightObj?.url ||
    lightObj?.asset?.url ||
    (typeof skill.iconLight === "string" ? skill.iconLight : null);

  const isGitHub = skill.name === "GitHub" || skill.skill === "GitHub";

  if (iconLightUrl && iconDarkUrl && iconLightUrl !== iconDarkUrl) {
    return (
      <>
        <Image
          src={iconLightUrl}
          alt=""
          width={28}
          height={28}
          unoptimized
          aria-hidden="true"
          className={`${className} dark:hidden`}
        />
        <Image
          src={iconDarkUrl}
          alt=""
          width={28}
          height={28}
          unoptimized
          aria-hidden="true"
          className={`${className} hidden dark:block`}
        />
      </>
    );
  }

  const singleUrl = iconDarkUrl || iconLightUrl;
  if (singleUrl) {
    return (
      <Image
        src={singleUrl}
        alt=""
        width={28}
        height={28}
        unoptimized
        aria-hidden="true"
        className={`${className} ${isGitHub ? "dark:invert" : ""}`}
      />
    );
  }

  return (
    <span className="text-xs font-bold text-(--ink-muted) select-none">
      {skill.name ? skill.name.charAt(0) : "•"}
    </span>
  );
}


