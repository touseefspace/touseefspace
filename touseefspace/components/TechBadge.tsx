import React from "react";
import Image from "next/image";
import { resolveSanityImageUrl, type SanityImageSource } from "@/sanity/image";
import type { Technology } from "@/lib/types";

interface TechBadgeProps {
  tech: Technology | {
    name?: string;
    skill?: string;
    icon?: unknown;
    iconDark?: unknown;
    iconLight?: unknown;
  };
  className?: string;
}

export default function TechBadge({ tech, className = "" }: TechBadgeProps) {
  const name = tech.name || tech.skill || "";
  if (!name) return null;

  const darkObj =
    typeof tech.iconDark === "object" && tech.iconDark !== null
      ? (tech.iconDark as { url?: string; asset?: { url?: string } })
      : null;
  const lightObj =
    typeof tech.iconLight === "object" && tech.iconLight !== null
      ? (tech.iconLight as { url?: string; asset?: { url?: string } })
      : null;

  const baseIconUrl = tech.icon ? resolveSanityImageUrl(tech.icon as SanityImageSource, 48) : null;

  const iconDarkUrl =
    darkObj?.url ||
    darkObj?.asset?.url ||
    (typeof tech.iconDark === "string" ? tech.iconDark : null) ||
    baseIconUrl;

  const iconLightUrl =
    lightObj?.url ||
    lightObj?.asset?.url ||
    (typeof tech.iconLight === "string" ? tech.iconLight : null) ||
    baseIconUrl;

  const isGitHub = name.toLowerCase() === "github";

  return (
    <span className={`tech-tag ${className}`.trim()}>
      {iconLightUrl && iconDarkUrl && iconLightUrl !== iconDarkUrl ? (
        <>
          <Image
            src={iconLightUrl}
            alt=""
            width={14}
            height={14}
            unoptimized
            aria-hidden="true"
            className="h-3.5 w-3.5 object-contain shrink-0 dark:hidden"
          />
          <Image
            src={iconDarkUrl}
            alt=""
            width={14}
            height={14}
            unoptimized
            aria-hidden="true"
            className="h-3.5 w-3.5 object-contain shrink-0 hidden dark:block"
          />
        </>
      ) : iconDarkUrl || iconLightUrl ? (
        <Image
          src={(iconDarkUrl || iconLightUrl)!}
          alt=""
          width={14}
          height={14}
          unoptimized
          aria-hidden="true"
          className={`h-3.5 w-3.5 object-contain shrink-0 ${isGitHub ? "dark:invert" : ""}`}
        />
      ) : null}
      <span>{name}</span>
    </span>
  );
}
