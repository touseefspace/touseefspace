import { ArrowUpRight, Globe } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";
import { getSocialLinks } from "@/lib/queries";
import { Suspense } from "react";
import { SocialsSkeleton } from "@/components/Skeletons";

export const metadata: Metadata = {
  title: "Contact | touseefspace",
  description: "Get in touch with Touseef Ahmed for collaborations, projects, or just to say hello.",
};

export default function ContactPage() {
  return (
    <div className="page-shell relative pt-24 pb-14 md:pt-32 md:pb-20 animate-fade-in">
      <div className="max-w-2xl">
        <p className="section-label">Contact</p>
        <h1 className="mt-4 text-3xl font-bold text-(--ink-primary) md:text-5xl tracking-tight leading-[1.05]">
          Let&apos;s connect.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
      </div>

      <div className="mt-12">
        <Suspense fallback={<SocialsSkeleton />}>
          <SocialLinksList />
        </Suspense>
      </div>
    </div>
  );
}

async function SocialLinksList() {
  const socialLinks = await getSocialLinks();

  if (!socialLinks || socialLinks.length === 0) {
    return (
      <div className="text-(--ink-muted) italic">
        No contact links available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {socialLinks.map((social, idx) => {
        const darkObj = typeof social.iconDark === "object" && social.iconDark !== null ? social.iconDark : null;
        const lightObj = typeof social.iconLight === "object" && social.iconLight !== null ? social.iconLight : null;
        const iconDarkUrl = darkObj?.url || darkObj?.asset?.url || (typeof social.iconDark === "string" ? social.iconDark : null);
        const iconLightUrl = lightObj?.url || lightObj?.asset?.url || (typeof social.iconLight === "string" ? social.iconLight : null);
        const socialKey = social._id || social.id || social.name || social.url || `social-${idx}`;

        return (
          <a
            key={socialKey}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.name} (${social.username || "Open link"})`}
            className="group relative flex items-center justify-between gap-2.5 sm:gap-4 rounded-2xl border border-(--border-card) bg-(--bg-surface) p-3.5 sm:p-5 backdrop-blur-md transition-all duration-200 hover:border-(--border-strong) hover:bg-(--bg-subtle)/60 hover:shadow-xs"
          >
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              {/* Unboxed Social Icon */}
              <div className="shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                {iconLightUrl && iconDarkUrl && iconLightUrl !== iconDarkUrl ? (
                  <>
                    <Image 
                      src={iconLightUrl} 
                      alt="" 
                      width={28}
                      height={28}
                      unoptimized
                      aria-hidden="true" 
                      className="h-6 w-6 sm:h-7 sm:w-7 object-contain dark:hidden" 
                    />
                    <Image 
                      src={iconDarkUrl} 
                      alt="" 
                      width={28}
                      height={28}
                      unoptimized
                      aria-hidden="true" 
                      className="h-6 w-6 sm:h-7 sm:w-7 object-contain hidden dark:block" 
                    />
                  </>
                ) : (iconDarkUrl || iconLightUrl) ? (
                  <Image 
                    src={(iconDarkUrl || iconLightUrl)!} 
                    alt="" 
                    width={28}
                    height={28}
                    unoptimized
                    aria-hidden="true" 
                    className="h-6 w-6 sm:h-7 sm:w-7 object-contain" 
                  />
                ) : (
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-(--bg-subtle) border border-(--border-subtle) flex items-center justify-center">
                    <Globe size={16} className="text-(--ink-muted)" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-sm font-semibold text-(--ink-primary) transition-colors truncate">{social.name}</h2>
                <p className="text-[11px] sm:text-xs text-(--ink-muted) truncate mt-0.5">{social.username || "View profile"}</p>
              </div>
            </div>
            
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-(--ink-muted) transition-all duration-200 group-hover:text-(--ink-primary) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        );
      })}
    </div>
  );
}
