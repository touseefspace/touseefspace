"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Experience", href: "/experiences" },
  { name: "Skills", href: "/skills" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* WCAG 2.2 AA Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-(--ink-primary) focus:text-(--bg-primary) focus:font-semibold focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>

      <header className="fixed top-0 z-40 w-full border-b border-(--border-subtle) bg-(--header-bg) backdrop-blur-md transition-colors duration-200">
        <div className="page-shell flex h-16 items-center justify-between">
          {/* Brand Logo - Enlarged, Unboxed, with colored space wordmark */}
          <Link
            href="/"
            className="group relative flex items-center gap-2.5 transition-opacity hover:opacity-85"
            aria-label="touseefspace - Home"
          >
            <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center shrink-0">
              {/* Dark mode logo (bgless white) */}
              <Image
                src="/favicon_io_bgless_whitelogo/android-chrome-192x192.png"
                alt="touseefspace logo"
                width={36}
                height={36}
                className="dark-only object-contain transition-transform duration-200 group-hover:scale-105"
                priority
              />
              {/* Light mode logo (bgless dark) */}
              <Image
                src="/favicon_io_bgless_darklogo/android-chrome-192x192.png"
                alt="touseefspace logo"
                width={36}
                height={36}
                className="light-only object-contain transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </div>
            <span className="font-semibold tracking-tight text-(--ink-primary) text-sm sm:text-base">
              touseef<span className="brand-space font-medium">space</span>
            </span>
          </Link>

          {/* Center Navigation Links - Desktop Classic */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-9"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-xs font-mono tracking-wider uppercase transition-colors hover:text-(--ink-primary) ${
                    isActive
                      ? "font-semibold text-(--ink-primary)"
                      : "text-(--ink-muted)"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-(--ink-primary) rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="https://github.com/touseefspace"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-(--ink-muted) hover:text-(--ink-primary) transition-colors hidden sm:flex items-center gap-1"
              aria-label="GitHub Profile"
            >
              GitHub <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>

            <Link
              href="/contact"
              className="hidden sm:inline-flex btn-nav-cta"
            >
              Let's Talk <span aria-hidden="true">→</span>
            </Link>

            {/* Visual separator */}
            <span className="h-3.5 w-px bg-(--border-subtle) mx-0.5" aria-hidden="true" />

            {/* Dark / Light Mode Switcher */}
            <ThemeToggle />

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-subtle) bg-(--bg-subtle) text-(--ink-primary) transition-colors hover:bg-(--bg-surface-elevated)"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-(--border-subtle) bg-(--header-bg) backdrop-blur-xl px-4 py-6 transition-all duration-200">
            <div className="page-shell flex flex-col gap-4">
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-sm font-mono tracking-wider uppercase text-(--ink-primary) hover:opacity-75 transition-opacity"
                  >
                    <span>{item.name}</span>
                    <span className="text-xs text-(--ink-muted)">→</span>
                  </Link>
                ))}
              </nav>

              <div className="pt-4 border-t border-(--border-subtle) flex flex-col gap-3">
                <Link
                  href="https://github.com/touseefspace"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs font-mono text-(--ink-muted) hover:text-(--ink-primary) py-1"
                >
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 flex h-9 w-full items-center justify-center gap-2 rounded-full border border-(--border-strong) bg-(--ink-primary) text-xs font-medium text-(--bg-primary)"
                >
                  Let's Talk <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
