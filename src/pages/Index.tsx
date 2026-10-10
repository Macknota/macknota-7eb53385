import { usePortfolio } from "@/hooks/usePortfolio";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import HighlightsSection from "@/components/portfolio/HighlightsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import AboutSection from "@/components/portfolio/AboutSection";
import WorkWithMeSection from "@/components/portfolio/WorkWithMeSection";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  // Content renders straight from the bundled defaults; saved edits replace it
  // once they load, so there is no blocking spinner.
  const { data } = usePortfolio();

  return (
    <div className="min-h-screen bg-background">
      <Navbar data={data} />
      <main>
        <HeroSection data={data} />
        <HighlightsSection data={data} />
        <ProjectsSection data={data} />
        <ExperienceSection data={data} />
        <SkillsSection data={data} />
        <AboutSection data={data} />
        <WorkWithMeSection data={data} />
      </main>
      <Footer data={data} />
    </div>
  );
};

export default Index;
