import HomeScrollShowcase from "@/components/HomeScrollShowcase";
import { Metadata } from "next";
import { getProjects, getExperiences, getSkillCategories, getHomeGlobalData } from "@/lib/queries";

export const metadata: Metadata = {
  title: "touseefspace | AI Systems and Software Developer",
  description: "The portfolio and digital space of Touseef Ahmed. Focused on AI systems, Next.js, and reliable software.",
};

export default function Home() {
  return <HomeContainer />;
}

async function HomeContainer() {
  // Fetch Cached Featured Projects (Spotlight)
  const projects = await getProjects(true);

  // Fetch Cached Latest Experience
  const experiences = await getExperiences(1);

  // Fetch Cached Skills for the toolbelt
  const skillCategories = await getSkillCategories();

  // Fetch Cached Home Global Data
  const homeData = await getHomeGlobalData();

  return (
    <HomeScrollShowcase 
      featuredProjects={projects} 
      activeExperience={experiences[0] || null}
      skillCategories={skillCategories}
      homeData={homeData}
    />
  );
}

