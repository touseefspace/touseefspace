"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, Code, Sparkles, Terminal } from "lucide-react";

interface HeroProps {
  heroData?: {
    portrait?: {
      url?: string;
    };
    title?: string;
    description?: string;
  };
}

const proofPoints = [
  {
    label: "Specialization",
    value: "Custom Web Apps & AI Systems",
    icon: Code,
  },
  {
    label: "Core Focus",
    value: "Business Operations & Cloud Apps",
    icon: Terminal,
  },
  {
    label: "Location & Status",
    value: "United Arab Emirates · Open for Projects",
    icon: Sparkles,
  },
];

export default function HeroSection({ heroData }: HeroProps) {
  const headline =
    heroData?.title &&
    heroData.title !== "Full stack developer building calm, useful digital systems." &&
    heroData.title !== "I turn messy workflows into simple, reliable software." &&
    heroData.title !== "I turn messy workflows into simple, reliable software spaces." &&
    heroData.title !== "I turn messy workflows into simple & reliable software or AI based automations." &&
    heroData.title !== "I turn messy workflows into simple & reliable software spaces or AI based automations."
      ? heroData.title
      : "I turn messy workflows into simple & reliable software spaces.";

  const strapline =
    heroData?.description && !heroData.description.includes("make work feel lighter")
      ? heroData.description
      : "Developing custom web applications and AI systems engineered to eliminate operational clutter — giving ambitious teams the space to scale with calm, dependable reliability.";

  // Use uploaded touseef.png as the default portrait
  const portraitUrl = heroData?.portrait?.url || "/touseef.png";

  return (
    <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16">
      <div className="page-shell">
        {/* Top Eyebrow */}
        <div className="flex items-center gap-3">
          <span className="section-label">01 / Overview</span>
          <span className="h-1 w-1 rounded-full bg-(--ink-muted) opacity-50" />
          <span className="font-mono text-xs text-(--ink-muted)">United Arab Emirates</span>
        </div>

        {/* Main Grid: Headline & Composition */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-(--ink-primary) sm:text-5xl lg:text-6xl leading-[1.08]">
              {headline}
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-(--ink-secondary) max-w-2xl font-normal">
              Developing custom web applications and AI systems engineered to eliminate operational clutter — giving ambitious teams the{" "}
              <span className="inline-block rounded px-1.5 py-0.5 font-medium bg-(--ink-primary) text-(--bg-primary)">
                space
              </span>{" "}
              to scale with calm, dependable reliability.
            </p>

            {/* Action Group */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a href="/projects" className="btn-primary">
                See Projects <ArrowDown className="h-4 w-4" />
              </a>
              <a href="/contact" className="btn-secondary">
                Let's Talk <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Column: High-Craft Portrait Showcase */}
          <div className="relative mx-auto w-full max-w-105">
            {portraitUrl ? (
              <div className="relative h-96 sm:h-105 w-full overflow-hidden rounded-2xl border border-(--border-subtle) bg-(--bg-surface) shadow-md group transition-colors">
                <Image
                  src={portraitUrl}
                  alt="Touseef Ahmed"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center transition-all duration-700 group-hover:scale-[1.02]"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 border-t border-(--border-subtle) bg-(--header-bg) p-4 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-semibold text-(--ink-primary)">Touseef Ahmed</span>
                  </div>
                  <span className="text-[11px] font-mono text-(--ink-muted)">AI Systems & Software Developer</span>
                </div>
              </div>
            ) : (
              /* Fallback Editorial Card without the removed tag */
              <div className="relative h-80 sm:h-90 w-full overflow-hidden rounded-xl border border-(--border-subtle) bg-(--bg-surface) p-6 sm:p-7 flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between border-b border-(--border-subtle) pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-(--ink-primary)" />
                    <span className="font-mono text-xs uppercase tracking-widest text-(--ink-muted)">
                      Engineering Philosophy
                    </span>
                  </div>
                  <span className="font-mono text-xs text-(--ink-faint)">2026</span>
                </div>

                <div className="space-y-4 py-6">
                  <p className="text-sm sm:text-base leading-relaxed text-(--ink-secondary)">
                    "Good engineering removes friction. Great engineering creates quiet space where complex operations feel simple, dependable, and effortless."
                  </p>
                </div>

                <div className="border-t border-(--border-subtle) pt-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-(--ink-muted)">Operational Availability</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-500 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open for Projects
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Proof Points Strip */}
        <div className="mt-14 sm:mt-18 grid gap-4 sm:grid-cols-3">
          {proofPoints.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="group rounded-lg border border-(--border-subtle) bg-(--bg-surface) p-5 transition-colors hover:border-(--border-strong)"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-(--ink-muted)" />
                  <p className="font-mono text-xs uppercase tracking-widest text-(--ink-muted)">
                    {item.label}
                  </p>
                </div>
                <p className="mt-2 text-sm font-medium text-(--ink-primary)">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
