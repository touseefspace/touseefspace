import { GraduationCap, Briefcase as BriefcaseIcon } from "lucide-react";
import ExperienceList from "@/components/ExperienceList";
import { Metadata } from "next";
import { getExperiences } from "@/lib/queries";
import { Suspense } from "react";
import { ExperiencesSkeleton } from "@/components/Skeletons";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Experience | touseefspace",
  description: "A chronicle of technical growth, from foundational computer science to professional full-stack delivery by Touseef Ahmed.",
};

export default function ExperiencePage() {
  return (
    <div className="page-shell relative pt-24 pb-14 md:pt-32 md:pb-24">
      {/* Editorial Header */}
      <div className="max-w-4xl mb-12 md:mb-16">
        <p className="section-label mb-4">Trajectory</p>
        <h1 className="text-3xl font-bold text-(--ink-primary) md:text-5xl tracking-tight leading-[1.05] mb-6">
          The Journey <br/> So Far.
        </h1>
        <p className="text-base md:text-lg leading-relaxed text-(--ink-secondary) max-w-2xl">
          A chronicle of technical growth, from foundational computer science to professional full-stack delivery.
        </p>
      </div>

      <Suspense fallback={<ExperiencesSkeleton />}>
        <ExperiencesContainer />
      </Suspense>
    </div>
  );
}

async function ExperiencesContainer() {
  const experiences = await getExperiences();

  const workExp = experiences.filter((e: any) => e.category === "work");
  const eduExp = experiences.filter((e: any) => e.category === "education");

  if (workExp.length === 0 && eduExp.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          badge="Curating Career Timeline"
          title="Trajectory details under assembly."
          description="Career milestones, technical contributions, and educational records are being synchronized from Sanity CMS. Explore current projects or get in touch in the meantime."
          icon={<BriefcaseIcon className="h-6 w-6 stroke-[1.75]" />}
          actionLabel="View Projects"
          actionHref="/projects"
          secondaryLabel="Get in Touch"
          secondaryHref="/contact"
        />
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {/* Work Experience Section */}
      {workExp.length > 0 && (
        <section className="grid md:grid-cols-12 gap-10 md:gap-8">
          {/* Left Header - Sticky */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="md:sticky md:top-28 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-(--bg-subtle)/70 flex items-center justify-center text-(--ink-primary) border border-(--border-subtle)">
                <BriefcaseIcon size={18} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-(--ink-primary) tracking-tight">Professional Experience</h2>
              <p className="text-sm text-(--ink-muted) leading-relaxed max-w-55">
                Real-world delivery, freelance consulting, and engineering projects.
              </p>
            </div>
          </div>
          
          {/* Right Timeline */}
          <div className="md:col-span-8 lg:col-span-9 relative border-l border-(--border-subtle) pl-6 md:pl-12 ml-4 md:ml-0">
            <ExperienceList experiences={workExp as any} />
          </div>
        </section>
      )}

      {/* Education Section */}
      {eduExp.length > 0 && (
        <section className="grid md:grid-cols-12 gap-10 md:gap-8">
          {/* Left Header - Sticky */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="md:sticky md:top-28 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-(--bg-subtle)/70 flex items-center justify-center text-(--ink-primary) border border-(--border-subtle)">
                <GraduationCap size={18} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-(--ink-primary) tracking-tight">Academic Foundations</h2>
              <p className="text-sm text-(--ink-muted) leading-relaxed max-w-55">
                Formal computer science education and specialized focus areas.
              </p>
            </div>
          </div>

          {/* Right Timeline */}
          <div className="md:col-span-8 lg:col-span-9 relative border-l border-(--border-subtle) pl-6 md:pl-12 ml-4 md:ml-0">
            <ExperienceList experiences={eduExp as any} />
          </div>
        </section>
      )}
    </div>
  );
}
