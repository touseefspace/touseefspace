"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, X, Check, Sparkles, Terminal, Compass, BookOpen } from "lucide-react";

interface TagOption {
  tag: string;
  count: number;
}

interface BlogFiltersProps {
  activeType?: string; // 'technical' | 'experience' | 'essay'
  activeTag?: string;
  formatCounts: {
    all: number;
    technical: number;
    experience: number;
    essay: number;
  };
  availableTags: TagOption[];
  totalFilteredCount: number;
  totalPostsCount: number;
  children?: React.ReactNode;
}

export default function BlogFilters({
  activeType,
  activeTag,
  formatCounts,
  availableTags,
  totalFilteredCount,
  totalPostsCount,
  children,
}: BlogFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close popover on escape key or outside click
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const isFilteringActive = Boolean(activeType || activeTag);

  const formats = [
    { id: "all", label: "All Formats", count: formatCounts.all, icon: Sparkles },
    { id: "technical", label: "Engineering", count: formatCounts.technical, icon: Terminal },
    { id: "experience", label: "Field Notes", count: formatCounts.experience, icon: Compass },
    { id: "essay", label: "Essays", count: formatCounts.essay, icon: BookOpen },
  ];

  // Helper to compute query URLs
  const createFilterUrl = (type?: string, tag?: string) => {
    const params = new URLSearchParams();
    if (type && type !== "all") {
      params.set("type", type);
    }
    if (tag) {
      params.set("tag", tag);
    }
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  const handleSelectFormat = (fmtId: string) => {
    const targetType = fmtId === "all" || fmtId === activeType ? undefined : fmtId;
    router.push(createFilterUrl(targetType, activeTag), { scroll: false });
  };

  const handleSelectTag = (tag: string) => {
    const targetTag = tag.toLowerCase() === activeTag?.toLowerCase() ? undefined : tag;
    router.push(createFilterUrl(activeType, targetTag), { scroll: false });
  };

  const filterBtnClass = isFilteringActive
    ? "bg-sky-600 hover:bg-sky-500 text-white border-sky-400/40 shadow-xl shadow-sky-600/30 ring-2 ring-sky-400/30"
    : "bg-[#0284c7] hover:bg-[#0369a1] text-white border-sky-400/40 shadow-xl shadow-[#0284c7]/30";

  const activeFormatLabel =
    activeType === "experience"
      ? "Field Notes"
      : activeType === "essay"
      ? "Essays"
      : activeType === "technical"
      ? "Engineering"
      : null;

  // Reusable popover content for both desktop and mobile
  const popoverContent = (
    <div
      role="dialog"
      aria-label="Filter blog dispatches"
      className="p-2 rounded-2xl bg-(--bg-surface) dark:bg-[#1c1c1e] border border-(--border-card) dark:border-white/15 shadow-2xl space-y-3"
    >
      {/* Header */}
      <div className="px-2.5 py-1.5 flex items-center justify-between border-b border-(--border-subtle)">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-medium tracking-wider text-(--ink-muted) uppercase">
            Filter Dispatches
          </span>
          <span className="text-[10px] font-mono text-(--ink-muted)">
            ({totalFilteredCount} of {totalPostsCount})
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isFilteringActive && (
            <button
              type="button"
              onClick={() => {
                router.push("/blog", { scroll: false });
                setIsOpen(false);
              }}
              className="text-[11px] font-mono text-(--ink-muted) hover:text-(--ink-primary) transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-(--ink-muted) hover:text-(--ink-primary) p-0.5 rounded-md transition-colors cursor-pointer"
            aria-label="Close filter menu"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Section A: Post Format */}
      <div className="space-y-1">
        <div className="px-2.5 text-[10px] font-mono text-(--ink-muted) uppercase tracking-wider">
          Format
        </div>
        {formats.map((fmt) => {
          const isSelected = (!activeType && fmt.id === "all") || activeType === fmt.id;
          const IconComponent = fmt.icon;

          return (
            <button
              key={fmt.id}
              type="button"
              onClick={() => handleSelectFormat(fmt.id)}
              className={`w-full px-2.5 py-1.5 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                isSelected
                  ? "bg-(--bg-subtle) font-semibold text-(--ink-primary)"
                  : "text-(--ink-secondary) hover:bg-(--bg-subtle)/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <IconComponent
                  size={14}
                  className={isSelected ? "text-(--ink-primary)" : "text-(--ink-muted)"}
                />
                <span className="text-xs">{fmt.label}</span>
                <span className="text-[10px] font-mono text-(--ink-muted)">
                  ({fmt.count})
                </span>
              </div>
              {isSelected && <Check size={14} className="text-(--ink-primary) shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Section B: Topics / Tags */}
      {availableTags.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-(--border-subtle)">
          <div className="px-2.5 text-[10px] font-mono text-(--ink-muted) uppercase tracking-wider">
            Topics
          </div>
          <div className="px-2 flex flex-wrap gap-1.5 max-h-40 overflow-y-auto no-scrollbar">
            {availableTags.map(({ tag, count }) => {
              const isSelected = activeTag?.toLowerCase() === tag.toLowerCase();

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleSelectTag(tag)}
                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-mono transition-all cursor-pointer ${
                    isSelected ? "tag-filter-active" : "tag-filter-inactive"
                  }`}
                >
                  <span>#{tag}</span>
                  <span className="text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* 1. Global Backdrop Overlay (Placed at z-40 so anything at z-50 is 100% crisp and unblurred) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-[1px] transition-opacity animate-in fade-in duration-150"
        />
      )}

      {/* 2. Desktop Reserved Space & Line (Permanently allocated row, no layout shift) */}
      <div className="hidden sm:flex items-center justify-between border-b border-(--border-subtle) py-3 mt-4 sm:mt-5 min-h-14">
        {/* Left: Filtered by Section */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-[11px] font-mono text-(--ink-muted) uppercase tracking-wider select-none">
            Filtered by:
          </span>

          {isFilteringActive ? (
            <div className="flex items-center gap-2 flex-wrap">
              {activeFormatLabel && (
                <Link
                  href={createFilterUrl(undefined, activeTag)}
                  scroll={false}
                  className="inline-flex items-center gap-1.5 rounded-full border border-(--border-card) bg-(--bg-subtle) px-3 py-1 text-xs font-mono text-(--ink-primary) hover:border-(--border-strong) transition-colors shadow-2xs"
                >
                  <span>{activeFormatLabel}</span>
                  <X size={12} className="text-(--ink-muted) hover:text-(--ink-primary)" />
                </Link>
              )}

              {activeTag && (
                <Link
                  href={createFilterUrl(activeType, undefined)}
                  scroll={false}
                  className="inline-flex items-center gap-1.5 rounded-full border border-(--border-card) bg-(--bg-subtle) px-3 py-1 text-xs font-mono text-(--ink-primary) hover:border-(--border-strong) transition-colors shadow-2xs"
                >
                  <span>#{activeTag}</span>
                  <X size={12} className="text-(--ink-muted) hover:text-(--ink-primary)" />
                </Link>
              )}

              <Link
                href="/blog"
                scroll={false}
                className="text-xs font-mono text-(--ink-muted) hover:text-(--ink-primary) underline ml-1"
              >
                Clear all
              </Link>
            </div>
          ) : (
            <span className="text-xs font-mono text-(--ink-muted)">
              All Dispatches <span className="opacity-60">({totalPostsCount} articles)</span>
            </span>
          )}
        </div>

        {/* Right: Reserved space placeholder so the border line width is complete and stable */}
        <div className="w-11 h-11 shrink-0" aria-hidden="true" />
      </div>

      {/* 3. Desktop Sticky Filter Button (sm and up) - Floats over all articles during scroll */}
      <div className="hidden sm:flex sticky top-20 z-50 justify-end w-full pointer-events-none -mt-15 mb-6 sm:mb-8">
        <div className="relative pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Filter blog dispatches"
            title="Filter dispatches"
            className={`relative z-50 h-11 w-11 rounded-full border shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer ${filterBtnClass}`}
          >
            {isOpen ? (
              <X size={18} className="transition-transform duration-150" />
            ) : (
              <SlidersHorizontal size={18} className="transition-transform duration-150" />
            )}

            {/* Active badge pulse */}
            {isFilteringActive && !isOpen && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 ring-2 ring-white dark:ring-black" />
              </span>
            )}
          </button>

          {/* Desktop Floating Dropdown Popover (opens downward, z-50 in front of backdrop) */}
          {isOpen && (
            <div className="absolute top-full mt-2 right-0 z-50 w-76 sm:w-84 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150">
              {popoverContent}
            </div>
          )}
        </div>
      </div>

      {/* 4. Mobile Floating Filter Button Container (bottom-right fixed, z-50) */}
      <div className="sm:hidden fixed bottom-6 right-6 z-50">
        <div className="relative pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Filter blog dispatches"
            title="Filter dispatches"
            className={`relative z-50 h-12 w-12 rounded-full border shadow-xl hover:shadow-2xl flex items-center justify-center transition-all active:scale-95 cursor-pointer ${filterBtnClass}`}
          >
            {isOpen ? (
              <X size={18} className="transition-transform duration-150" />
            ) : (
              <SlidersHorizontal size={18} className="transition-transform duration-150" />
            )}

            {/* Active badge pulse */}
            {isFilteringActive && !isOpen && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 ring-2 ring-white dark:ring-black" />
              </span>
            )}
          </button>

          {/* Mobile Popover Menu (opens upward from bottom button, z-50 in front of backdrop) */}
          {isOpen && (
            <div className="absolute bottom-16 right-0 z-50 w-72 p-0 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-150">
              {popoverContent}
            </div>
          )}
        </div>
      </div>

      {/* 5. Page Content (Featured Post, Posts Grid, Empty State) */}
      {children}
    </div>
  );
}

// Mobile-only inline pill bar for active filters
export function MobileActiveFilterPills({
  activeType,
  activeTag,
}: {
  activeType?: string;
  activeTag?: string;
}) {
  if (!activeType && !activeTag) return null;

  const activeFormatLabel =
    activeType === "experience"
      ? "Field Notes"
      : activeType === "essay"
      ? "Essays"
      : activeType === "technical"
      ? "Engineering"
      : null;

  const createFilterUrl = (type?: string, tag?: string) => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (tag) params.set("tag", tag);
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  return (
    <div className="sm:hidden mt-4 flex flex-wrap items-center gap-2">
      <span className="text-[11px] font-mono text-(--ink-muted) uppercase tracking-wider select-none">
        Filtered by:
      </span>

      {activeFormatLabel && (
        <Link
          href={createFilterUrl(undefined, activeTag)}
          scroll={false}
          className="inline-flex items-center gap-1.5 rounded-full border border-(--border-card) bg-(--bg-subtle) px-3 py-1 text-xs font-mono text-(--ink-primary) hover:border-(--border-strong) transition-colors shadow-2xs"
        >
          <span>{activeFormatLabel}</span>
          <X size={12} className="text-(--ink-muted) hover:text-(--ink-primary)" />
        </Link>
      )}

      {activeTag && (
        <Link
          href={createFilterUrl(activeType, undefined)}
          scroll={false}
          className="inline-flex items-center gap-1.5 rounded-full border border-(--border-card) bg-(--bg-subtle) px-3 py-1 text-xs font-mono text-(--ink-primary) hover:border-(--border-strong) transition-colors shadow-2xs"
        >
          <span>#{activeTag}</span>
          <X size={12} className="text-(--ink-muted) hover:text-(--ink-primary)" />
        </Link>
      )}

      <Link
        href="/blog"
        scroll={false}
        className="text-xs font-mono text-(--ink-muted) hover:text-(--ink-primary) underline ml-1"
      >
        Clear all
      </Link>
    </div>
  );
}
