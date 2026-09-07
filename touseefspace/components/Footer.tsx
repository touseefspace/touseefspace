"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Mail } from "lucide-react";
import React, { useState, useEffect } from "react";
import { BrandIcon } from "@/components/ui/BrandIcons";

const footerNavLinks = [
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Experience", href: "/experiences" },
  { name: "Skills", href: "/skills" },
  { name: "Contact", href: "/contact" },
];

export function Footer({ socialLinks = [] }: { socialLinks?: any[] }) {
  const displayLinks = socialLinks;
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative z-20 mt-20 border-t border-(--border-subtle) bg-(--footer-bg) backdrop-blur-xl text-(--ink-primary) py-14 sm:py-16 transition-colors duration-200">
      <div className="page-shell">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8 items-start">
          {/* Brand & Purpose */}
          <div className="max-w-sm space-y-3.5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-(--ink-primary) hover:opacity-85 transition-opacity"
              aria-label="touseefspace - Home"
            >
              <div className="relative flex h-7 w-7 items-center justify-center shrink-0">
                <Image
                  src="/favicon_io_bgless_whitelogo/android-chrome-192x192.png"
                  alt="touseefspace logo"
                  width={28}
                  height={28}
                  style={{ width: "28px", height: "28px" }}
                  loading="lazy"
                  className="dark-only object-contain"
                />
                <Image
                  src="/favicon_io_bgless_darklogo/android-chrome-192x192.png"
                  alt="touseefspace logo"
                  width={28}
                  height={28}
                  style={{ width: "28px", height: "28px" }}
                  loading="lazy"
                  className="light-only object-contain"
                />
              </div>
              <span>
                touseef<span className="brand-space font-semibold">space</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-(--ink-muted)">
              Designing and engineering calm digital spaces from messy workflows. Focused on custom web applications, AI systems, and practical utility.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs font-mono text-(--ink-muted)">
              <MapPin className="h-3.5 w-3.5 text-(--ink-muted)" aria-hidden="true" />
              <span>United Arab Emirates</span>
              <span className="mx-1 h-1 w-1 rounded-full bg-(--ink-muted) opacity-40" aria-hidden="true" />
              <span>{currentYear}</span>
            </div>
          </div>

          {/* Navigation Directory */}
          <div className="space-y-3.5">
            <p className="font-mono text-xs uppercase tracking-widest text-(--ink-muted)">
              Navigation
            </p>
            <nav aria-label="Footer navigation" className="flex flex-col gap-2">
              {footerNavLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-(--ink-secondary) hover:text-(--ink-primary) transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Direct Line & Socials */}
          <div className="space-y-3.5">
            <p className="font-mono text-xs uppercase tracking-widest text-(--ink-muted)">
              Direct Channel
            </p>
            <div className="space-y-2 text-sm text-(--ink-secondary)">
              <Link
                href="mailto:hello@touseefspace.com"
                className="inline-flex items-center gap-2 hover:text-(--ink-primary) transition-colors"
              >
                <Mail className="h-4 w-4 text-(--ink-muted)" aria-hidden="true" />
                <span>hello@touseefspace.com</span>
              </Link>
            </div>

            <p className="font-mono text-xs uppercase tracking-widest text-(--ink-muted) pt-2">
              Presence
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {displayLinks.map((link) => {
                const iconUrl = link.iconDark?.url || link.iconDark?.asset?.url || (typeof link.iconDark === "string" ? link.iconDark : null);
                return (
                  <Link
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-200 hover:scale-110"
                    aria-label={link.name}
                  >
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt=""
                        aria-hidden="true"
                        className="h-7 w-7 object-contain"
                      />
                    ) : (
                      <div className="flex items-center justify-center" aria-hidden="true">
                        <BrandIcon
                          name={link.name}
                          url={link.url}
                          size={28}
                        />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-(--border-subtle) flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-(--ink-muted)">
          <p>© {currentYear} touseefspace. All rights reserved.</p>
          <p>Built with Next.js · Powered by Sanity.</p>
        </div>
      </div>
    </footer>
  );
}
