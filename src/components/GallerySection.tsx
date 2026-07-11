import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import WorkShowcasePanels from "./WorkShowcasePanels";
import { portfolioProjects } from "@/lib/projects";

const showcaseProjects = portfolioProjects.slice(0, 5);

const GallerySection = () => {
  return (
    <section id="gallery" className="relative overflow-hidden bg-[var(--neu-bg)] py-24 md:py-32">
      <div className="mx-auto mb-16 w-full max-w-7xl px-6 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-4 flex items-center justify-center gap-3 text-muted-foreground">
            <div className="h-[1px] w-10 bg-muted-foreground/30" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Tactile Experience</p>
            <div className="h-[1px] w-10 bg-muted-foreground/30" />
          </div>
          <h2 className="heading-display mb-6 text-4xl text-foreground md:text-6xl">
            My Work Showcase
          </h2>
          <p className="mx-auto max-w-xl text-lg font-medium text-muted-foreground opacity-80">
            A curated selection of my finest digital experiences.
          </p>
        </motion.div>
      </div>

      <WorkShowcasePanels projects={showcaseProjects} />

      <div className="mt-12 flex justify-center">
        <Link
          to="/gallery"
          className="group flex items-center gap-3 rounded-full px-10 py-5 text-[11px] font-bold uppercase tracking-widest text-foreground transition-all hover:scale-105 active:scale-95 neu-button"
        >
          <span>Explore Full Gallery</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default GallerySection;
