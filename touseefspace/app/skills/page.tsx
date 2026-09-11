import { Metadata } from "next";
import { getSkillCategories } from "@/lib/queries";
import { Suspense } from "react";
import { SkillsSkeleton } from "@/components/Skeletons";
import EmptyState from "@/components/EmptyState";
import { Cpu } from "lucide-react";
import SkillsProficiencyClient from "@/components/SkillsProficiencyClient";

export const metadata: Metadata = {
  title: "Skills & Stack | touseefspace",
  description: "A practical stack for building and shipping. Technologies grouped by interface work, backend systems, cloud, AI, and tools.",
};

export default function SkillsPage() {
  return (
    <div className="page-shell relative pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="max-w-3xl">
        <p className="section-label">Skills & Competency</p>
        <h1 className="mt-4 text-3xl font-bold text-(--ink-primary) md:text-5xl tracking-tight">
          A practical stack for building and shipping.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          Technologies grouped by operational depth: core production drivers, scalable systems, and tooling ecosystems.
        </p>
      </div>

      <Suspense fallback={<SkillsSkeleton />}>
        <SkillsContainer />
      </Suspense>
    </div>
  );
}

async function SkillsContainer() {
  // Fetch Cached Skill Categories from Sanity
  const skillCategories = await getSkillCategories();

  if (!skillCategories || skillCategories.length === 0) {
    return (
      <div className="mt-10">
        <EmptyState
          badge="Curating Technical Stack"
          title="Skills and technologies under review."
          description="Toolchains, libraries, and architectural proficiencies are being synchronized from Sanity CMS. Explore the active work or connect directly in the meantime."
          icon={<Cpu className="h-6 w-6 stroke-[1.75]" />}
          actionLabel="View Projects"
          actionHref="/projects"
          secondaryLabel="Get in Touch"
          secondaryHref="/contact"
        />
      </div>
    );
  }

  return <SkillsProficiencyClient categories={skillCategories} />;
}
