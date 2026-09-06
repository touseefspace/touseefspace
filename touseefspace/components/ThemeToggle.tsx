"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  const applyFavicon = (activeTheme: "dark" | "light") => {
    try {
      const iconLinks = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
      const targetFavicon = activeTheme === "light"
        ? "/favicon_io_bglight_darklogo/favicon-32x32.png"
        : "/favicon_io_bgdark_whitelogo/favicon-32x32.png";
      iconLinks.forEach((link) => {
        link.href = targetFavicon;
      });
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    setMounted(true);
    const currentTheme =
      (document.documentElement.getAttribute("data-theme") as "dark" | "light") ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(currentTheme);
    applyFavicon(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    applyFavicon(nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (e) {
      // ignore in restricted environments
    }
    window.dispatchEvent(new CustomEvent("theme-change", { detail: nextTheme }));
  };

  if (!mounted) {
    return (
      <div
        className="h-8 w-8 rounded-md border border-(--border-strong) opacity-0 shrink-0"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="group relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-(--border-strong) bg-transparent text-(--ink-muted) hover:border-(--ink-primary) hover:text-(--ink-primary) transition-all cursor-pointer"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 transition-transform group-hover:rotate-45 text-(--ink-primary)" />
      ) : (
        <Moon className="h-4 w-4 transition-transform group-hover:-rotate-12 text-(--ink-primary)" />
      )}
    </button>
  );
}
