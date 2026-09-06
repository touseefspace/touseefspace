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
                  className="dark-only object-contain"
                />
                <Image
                  src="/favicon_io_bgless_darklogo/android-chrome-192x192.png"
                  alt="touseefspace logo"
                  width={28}
                  height={28}
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
            <ul className="space-y-2.5">
              {footerNavLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="text-sm text-(--ink-secondary) hover:text-(--ink-primary) transition-colors font-mono"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="https://github.com/touseefspace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-(--ink-secondary) hover:text-(--ink-primary) transition-colors font-mono"
                >
                  GitHub <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="space-y-3.5">
            <p className="font-mono text-xs uppercase tracking-widest text-(--ink-muted)">
              Connect
            </p>
            <div>
              <a
                href="mailto:hello@touseefspace.com"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-(--ink-primary) hover:underline"
              >
                <Mail className="h-3.5 w-3.5 text-(--ink-muted)" aria-hidden="true" />
                hello@touseefspace.com
              </a>
            </div>
            <p className="text-xs text-(--ink-muted) leading-relaxed">
              Available for bespoke engineering, architecture consults, and high-impact digital products.
            </p>
            {/* Naturally Coloured Social Icons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {displayLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-200 hover:scale-110"
                  aria-label={link.name}
                >
                  {link.iconDark?.url ? (
                    <img
                      src={link.iconDark.url}
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
              ))}
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
