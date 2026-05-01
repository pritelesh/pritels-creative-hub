import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import GallerySection from "@/components/GallerySection";
// import ShowcaseSection from "@/components/ShowcaseSection";
import HireSection from "@/components/HireSection";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const { isDark, toggle } = useTheme();

  return (
    <>
      <Navbar isDark={isDark} onToggleTheme={toggle} />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <GallerySection />
      {/* <ShowcaseSection /> */}
      <HireSection />
      <Footer />
    </>
  );
};

export default Index;
