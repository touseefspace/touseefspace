import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
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
    <div className="page-shell relative pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="max-w-2xl">
        <p className="section-label">Contact</p>
        <h1 className="mt-4 text-3xl font-bold text-(--ink-primary) md:text-5xl tracking-tight leading-[1.05]">
          Let's connect.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          I'm currently open to new projects and collaborations. Reach out through any of these channels.
        </p>
      </div>

      <Suspense fallback={<SocialsSkeleton />}>
        <SocialsContainer />
      </Suspense>
    </div>
  );
}

async function SocialsContainer() {
  // Fetch Cached Socials
  const socials = await getSocialLinks();

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {socials?.map((social: any) => (
        <Link 
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${social.name} (${social.username || "Open link"})`}
          className="group relative flex items-center justify-between gap-4 rounded-2xl border border-(--border-card) bg-(--bg-surface) p-5 backdrop-blur-md transition-all duration-200 hover:border-(--border-strong) hover:bg-(--bg-subtle)/60 hover:shadow-xs"
        >
          <div className="flex items-center gap-4 min-w-0">
            {/* Unboxed Social Icon */}
            <div className="shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
              {social.iconDark?.url ? (
                <img src={social.iconDark.url} alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
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
        </Link>
      ))}
    </div>
  );
}
