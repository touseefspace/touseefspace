import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";
import { getSocialLinks } from "@/lib/queries";
import { Suspense } from "react";
import { SocialsSkeleton } from "@/components/Skeletons";
import { BrandIcon } from "@/components/ui/BrandIcons";

export const metadata: Metadata = {
  title: "Contact | touseefspace",
  description: "Get in touch with Touseef Ahmed for collaborations, projects, or just to say hello.",
};

export default function ContactPage() {
  return (
    <div className="page-shell relative pt-24 pb-14 md:pt-32 md:pb-20 animate-fade-in">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-(--ink-primary) mb-4">
          Contact
        </h1>
        <p className="text-lg text-(--ink-secondary) leading-relaxed">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {socialLinks.map((social, idx) => {
        const darkObj = typeof social.iconDark === "object" && social.iconDark !== null ? social.iconDark : null;
        const iconDarkUrl = darkObj?.url || darkObj?.asset?.url || (typeof social.iconDark === "string" ? social.iconDark : null);
        const socialKey = social._id || social.id || social.name || social.url || `social-${idx}`;

        return (
          <a
            key={socialKey}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.name} (${social.username || "Open link"})`}
            className="group relative flex items-center justify-between gap-4 rounded-2xl border border-(--border-card) bg-(--bg-surface) p-5 backdrop-blur-md transition-all duration-200 hover:border-(--border-strong) hover:bg-(--bg-subtle)/60 hover:shadow-xs"
          >
            <div className="flex items-center gap-4 min-w-0">
              {/* Unboxed Social Icon */}
              <div className="shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                {iconDarkUrl ? (
                  <Image 
                    src={iconDarkUrl} 
                    alt="" 
                    width={28}
                    height={28}
                    unoptimized
                    aria-hidden="true" 
                    className="h-7 w-7 object-contain" 
                  />
                ) : (
                  <BrandIcon 
                    name={social.name}
                    url={social.url} 
                    size={32} 
                  />
                )}
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-(--ink-primary) transition-colors">{social.name}</h2>
                <p className="text-xs text-(--ink-muted) truncate mt-0.5">{social.username || "View profile"}</p>
              </div>
            </div>
            
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-(--ink-muted) transition-all duration-200 group-hover:text-(--ink-primary) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        );
      })}
    </div>
  );
}
