import Image from "next/image";
import { Metadata } from "next";
import { getSkillCategories } from "@/lib/queries";
import { Suspense } from "react";
import { SkillsSkeleton } from "@/components/Skeletons";
import EmptyState from "@/components/EmptyState";
import { Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills & Stack | touseefspace",
  description: "A practical stack for building and shipping. Technologies grouped by interface work, backend systems, cloud, AI, and tools.",
};

export default function SkillsPage() {
  return (
    <div className="page-shell relative pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="max-w-3xl">
        <p className="section-label">Skills</p>
        <h1 className="mt-4 text-3xl font-bold text-(--ink-primary) md:text-5xl tracking-tight">
          A practical stack for building and shipping.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-(--ink-secondary)">
          Technologies grouped by the way they show up in real projects: interface work, backend systems, cloud, AI, and tools.
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

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {skillCategories.length > 0 ? (
        skillCategories.map((category: any) => (
          <section 
            key={category.id} 
            className="group rounded-3xl p-6 sm:p-7 bg-(--bg-surface) border border-(--border-card) shadow-xs transition-all duration-300 hover:border-(--border-strong) hover:shadow-md"
          >
            <div className="flex items-center gap-3.5 pb-3 border-b border-(--border-subtle)">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-(--bg-subtle)/70 border border-(--border-subtle) text-(--ink-primary)">
                {category.iconDark?.url ? (
                  <img src={category.iconDark.url} alt="" className="h-5 w-5 object-contain" />
                ) : (
                  <div className="h-2 w-2 bg-(--ink-primary) rounded-full" />
                )}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-(--ink-primary) tracking-tight">{category.title}</h2>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {category.skills?.map((skill: any) => (
                <div 
                  key={skill.id} 
                  className="group/skill rounded-2xl border border-(--border-subtle) bg-(--bg-subtle)/40 p-3.5 transition-all duration-200 hover:bg-(--bg-subtle) hover:border-(--border-strong) hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2.5">
                    {skill.iconDark?.url && (
                      <Image
                        src={skill.iconDark.url}
                        alt=""
                        aria-hidden="true"
                        width={22}
                        height={22}
                        className="h-5 w-5 rounded-sm object-contain shrink-0"
                      />
                    )}
                    <span className="min-w-0 text-xs sm:text-sm font-medium text-(--ink-primary) truncate">{skill.name}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2.5">
                    <div 
                      role="progressbar"
                      aria-valuenow={skill.proficiency || 0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} proficiency: ${skill.proficiency || 0}%`}
                      className="h-1 flex-1 rounded-full bg-(--border-subtle) overflow-hidden"
                    >
                      <div className="h-full rounded-full bg-(--ink-primary) transition-all duration-500" style={{ width: `${skill.proficiency || 0}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-(--ink-muted) tabular-nums group-hover/skill:text-(--ink-primary) transition-colors">{skill.proficiency || 0}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="lg:col-span-2">
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
      )}
    </div>
  );
}
