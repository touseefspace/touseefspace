import { SiGithub } from "react-icons/si";
import ProjectSpotlightList from "@/components/ProjectSpotlightList";
import Link from "next/link";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { Metadata } from "next";
import { getProjects } from "@/lib/queries";
import { Suspense } from "react";
import { ProjectsSkeleton } from "@/components/Skeletons";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Projects | touseefspace",
  description: "A focused view of products and experiments across SaaS, automation, machine learning, and full-stack web development built by Touseef Ahmed.",
};

export default function ProjectsPage() {
  return (
    <div className="page-shell relative pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="max-w-3xl">
        <p className="section-label">Selected work</p>
        <h1 className="mt-4 text-3xl font-bold text-(--ink-primary) md:text-5xl tracking-tight">
          Projects built around real workflows.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          A focused view of products and experiments across SaaS, automation, machine learning, and full-stack web development.
        </p>
      </div>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectListContainer />
      </Suspense>
    </div>
  );
}

async function ProjectListContainer() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="mt-12">
        <EmptyState
          badge="Curating Projects"
          title="Case studies currently being assembled."
          description="Detailed production architectures, system designs, and metrics are being drafted and published. Explore the open source repositories or reach out directly in the meantime."
          icon={<FolderGit2 className="h-6 w-6 stroke-[1.75]" />}
          actionLabel="Return Home"
          actionHref="/"
          secondaryLabel="Get in Touch"
          secondaryHref="/contact"
        />
      </div>
    );
  }

  return (
    <>
      <ProjectSpotlightList projects={projects as any} />
      
      {/* GitHub CTA */}
      <div className="mt-20 border-t border-(--border-subtle) pt-12 flex flex-col items-center text-center">
        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-(--bg-subtle) border border-(--border-subtle) mb-5">
          <SiGithub size={22} className="text-(--ink-primary)" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold text-(--ink-primary)">Want to see the raw source?</h2>
        <p className="mt-2 text-sm text-(--ink-muted) max-w-md">
          For all my smaller experiments, open-source contributions, and technical history, visit my GitHub profile.
        </p>
        <Link 
          href="https://github.com/touseefspace" 
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-(--ink-primary) hover:underline transition-all"
        >
          Browse all projects on GitHub <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
