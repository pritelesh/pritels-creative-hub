import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, Lock, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BlurImage from "./BlurImage";

import projectsData from "../data/projects.json";

// Define project type for typescript
interface Project {
  title: string;
  category: string;
  image?: string;
  link?: string;
}

const showcaseProjects: Project[] = projectsData.slice(0, 10);

const GallerySection = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automated 3-second cycle
  useEffect(() => {
    if (!isRevealed) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseProjects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isRevealed]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % showcaseProjects.length);
  }, []);

  return (
    <section id="gallery" className="relative py-16 md:py-32 bg-background overflow-hidden min-h-fit md:min-h-[700px]">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8 z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <div className="w-10 h-[1px] bg-border" />
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Showcase Experience</p>
            </div>
            <h2 className="heading-display text-4xl md:text-6xl text-foreground">My Work Showcase</h2>
            <div className="w-20 h-1 bg-foreground mt-6 rounded-full" />
          </motion.div>
          <Link
            to="/gallery"
            className="group flex items-center gap-3 text-[10px] md:text-xs font-bold text-muted-foreground hover:text-foreground transition-all duration-300 pb-2 border-b border-border/40 hover:border-foreground w-fit"
          >
            <span>EXPLORE FULL ARCHIVE</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="relative flex-1 rounded-[2.5rem] overflow-hidden border border-border/30 bg-card/10 backdrop-blur-sm min-h-fit md:min-h-[500px]">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              /* LOCKED COVER STATE */
              <motion.div
                key="locked-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/40 backdrop-blur-2xl"
              >
                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="text-center p-12"
                >
                  <div className="relative mb-10 mx-auto w-24 h-24 flex items-center justify-center">
                    <motion.div
                       animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                       transition={{ duration: 2, repeat: Infinity }}
                       className="absolute inset-0 bg-foreground rounded-full"
                    />
                    <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center text-background shadow-xl shadow-foreground/20">
                      <Lock size={24} />
                    </div>
                  </div>
                  <h3 className="heading-display text-2xl md:text-3xl text-foreground mb-6">Experience is Hidden</h3>
                  <p className="text-muted-foreground mb-12 max-w-sm mx-auto leading-relaxed text-sm">
                    Unlock the showcase to explore a curated selection of my most professional work and digital journeys.
                  </p>
                  <button 
                    onClick={() => setIsRevealed(true)}
                    className="group relative flex items-center gap-4 px-10 py-5 rounded-full bg-foreground text-background text-[11px] font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-foreground/20"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <Eye size={16} />
                    <span>CLICK TO VIEW SHOWCASE</span>
                  </button>
                </motion.div>
                
                {/* Visual texture for locked state */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
                   <div className="grid grid-cols-6 gap-4 p-8 w-full h-full grayscale blur-sm">
                      {showcaseProjects.map((_, i) => (
                         <div key={i} className="aspect-[4/3] bg-foreground rounded-xl" />
                      ))}
                   </div>
                </div>
              </motion.div>
            ) : (
              /* REVEALED CAROUSEL STATE */
              <motion.div
                key="revealed-carousel"
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex flex-col md:flex-row"
                  >
                    {/* Project Image Gallery (70%) */}
                    <div className="w-full md:w-[65%] min-h-[300px] md:h-full relative group/img overflow-hidden shrink-0">
                       <div className="absolute inset-0 bg-background/20 z-10 pointer-events-none" />
                        {showcaseProjects[currentIndex].image ? (
                          <BlurImage 
                            src={showcaseProjects[currentIndex].image} 
                            alt={showcaseProjects[currentIndex].title}
                            className="w-full h-full object-cover md:grayscale md:group-hover/img:grayscale-0 transition-all duration-700" 
                            containerClassName="w-full h-full"
                          />
                       ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                             <span className="text-muted-foreground/10 text-9xl font-bold font-heading">{currentIndex + 1}</span>
                          </div>
                       )}
                       
                       {/* Floating Badge */}
                       <div className="absolute top-8 left-8 z-20 flex items-center gap-3 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/40">
                          <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground">Active Selection</span>
                       </div>
                    </div>

                    {/* Project Info Panel (30%) */}
                    <div className="w-full md:w-[35%] h-full p-6 md:p-16 flex flex-col justify-center bg-card border-t md:border-t-0 md:border-l border-border/30">
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.3 }}
                       >
                          <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-muted-foreground mb-6 md:mb-8">Selected Case 0{currentIndex + 1}</p>
                          <h3 className="heading-display text-3xl md:text-5xl text-foreground mb-4 md:mb-8 leading-tight">
                            {showcaseProjects[currentIndex].title}
                          </h3>
                          
                          <div className="h-0.5 w-12 bg-foreground mb-6 md:mb-12" />
                          
                          <p className="text-foreground/80 text-sm md:text-sm leading-relaxed mb-8 md:mb-12">
                            A showcase of technical expertise and creative vision in <span className="text-foreground font-semibold underline decoration-foreground/30 underline-offset-8">{showcaseProjects[currentIndex].category}</span>. Built for maximum user impact.
                          </p>

                          <div className="flex flex-col gap-6">
                             <button className="flex items-center gap-4 group/btn w-fit">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground group-hover:underline transition-all underline-offset-4">Read Full Case Study</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                             </button>
                             <div className="pt-6 border-t border-border/30">
                                 <span className="text-[9px] font-bold uppercase text-foreground/60 tracking-[0.3em]">Vertical: {showcaseProjects[currentIndex].category}</span>
                             </div>
                          </div>
                       </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Bar (Autoplay Timer) */}
                <div className="absolute bottom-0 left-0 right-0 h-1 z-30 flex">
                   {showcaseProjects.map((_, i) => (
                      <div key={i} className="flex-1 bg-border/20 overflow-hidden relative h-full">
                         {i === currentIndex && (
                            <motion.div
                               initial={{ x: "-100%" }}
                               animate={{ x: "0%" }}
                               transition={{ duration: 3, ease: "linear" }}
                               className="absolute inset-0 bg-foreground"
                            />
                         )}
                         {i < currentIndex && <div className="absolute inset-0 bg-foreground/30" />}
                      </div>
                   ))}
                </div>

                {/* Manual Controls */}
                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 flex gap-4">
                   <div className="flex items-center gap-4 px-4 py-3 md:px-6 md:py-4 rounded-full bg-background/90 backdrop-blur-md border border-border/60 shadow-xl scale-90 md:scale-100">
                      <button 
                        onClick={() => setCurrentIndex((prev) => (prev - 1 + showcaseProjects.length) % showcaseProjects.length)}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                      >
                         <ArrowRight size={18} className="rotate-180" />
                      </button>
                      <div className="text-[10px] font-bold text-foreground w-12 text-center">
                        0{currentIndex + 1} <span className="text-muted-foreground/50 mx-1">/</span> 10
                      </div>
                      <button 
                        onClick={handleNext}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                      >
                         <ArrowRight size={18} />
                      </button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
