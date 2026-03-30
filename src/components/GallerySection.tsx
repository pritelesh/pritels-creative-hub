import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingCard from "./FloatingCard";

import projectsData from "../data/projects.json";

// Define project type for typescript
interface Project {
  title: string;
  category: string;
  image?: string;
  link?: string;
}

// Showcasing a smaller selection for the cinematic horizontal scroll
const showcaseProjects: Project[] = projectsData.slice(0, 6);

const GallerySection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the horizontal translation
  // We move from 0 to -(total items - 1) * 100%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(showcaseProjects.length - 1) * 100}%`]);
  
  // Smooth out the scroll movement
  const springX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="gallery" className="relative h-[600vh] bg-background" ref={targetRef}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden">
        {/* Header - Stays at the top while scrolling */}
        <div className="w-full max-w-7xl mx-auto px-6 pt-24 pb-8 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">Portfolio Highlights</p>
              <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground">Selected Works</h2>
              <div className="w-24 h-1.5 bg-foreground mt-4 rounded-full" />
            </div>
            <Link
              to="/gallery"
              className="group flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-foreground transition-all duration-300 mb-2"
            >
              <span className="pb-1 border-b border-border/50 group-hover:border-foreground transition-all">Explore Full Archive</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-serif">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Horizontal Track */}
        <div className="flex-1 w-full flex items-center">
          <motion.div style={{ x: springX }} className="flex">
            {showcaseProjects.map((project, i) => (
              <div 
                key={`${project.title}-${i}`} 
                className="w-screen h-full flex items-center justify-center px-6 md:px-24 group/slide"
              >
                <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
                  {/* Image Part */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border/30 group/img"
                  >
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/10 flex items-center justify-center">
                        <span className="text-muted-foreground/20 text-9xl font-heading font-bold">{i+1}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                  </motion.div>

                  {/* Text Part */}
                  <div className="flex flex-col">
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.5em] text-muted-foreground mb-4">0{i+1} / Project</p>
                      <h3 className="heading-display text-4xl md:text-5xl lg:text-7xl text-foreground mb-6 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
                        A boutique digital experience crafted for <span className="text-foreground font-medium">{project.category}</span> enthusiasts, focusing on modern aesthetics and high-end usability.
                      </p>
                      <div className="flex gap-4">
                        <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background text-xs font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-foreground/10">
                          <span>Case Study</span>
                          <ExternalLink size={14} /> 
                        </button>
                        <div className="flex items-center px-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold border-l border-border/50">
                          {project.category}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="h-24 w-full flex flex-col items-center justify-center gap-4 py-8">
           <div className="w-48 h-[1px] bg-border/50 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-foreground"
                style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              />
           </div>
           <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">
              Scroll to Explore Portfolio
           </p>
        </div>
      </div>

      {/* Mobile Fallback - Hidden on Md+ screens */}
      {/* In a real scenario, you might want to conditionally render or use CSS to swap for better performance */}
    </section>
  );
};

export default GallerySection;
