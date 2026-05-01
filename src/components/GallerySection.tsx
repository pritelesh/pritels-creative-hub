import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import BlurImage from "./BlurImage";
import { cn } from "@/lib/utils";
import projectsData from "../data/projects.json";

interface Project {
  title: string;
  category: string;
  image?: string;
  link?: string;
  description?: string;
}

const showcaseProjects: Project[] = (projectsData as any[]).slice(0, 8).map(p => ({
  ...p,
  description: p.category === "Web" 
    ? "Premium web application with a focus on user experience and performance." 
    : "A modern digital experience crafted with cutting-edge technologies."
}));

const GallerySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPressed, setIsPressed] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % showcaseProjects.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + showcaseProjects.length) % showcaseProjects.length);
  }, []);

  // Auto-advance every 8s for a relaxed feel
  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x < -60) handleNext();
    else if (info.offset.x > 60) handlePrev();
  };

  const getXOffset = () => {
    if (typeof window === "undefined") return 360;
    if (window.innerWidth < 640) return 220;
    if (window.innerWidth < 1024) return 320;
    return 420;
  };

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-[var(--neu-bg)] overflow-hidden">
      {/* Section Header */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3 text-muted-foreground mb-4">
            <div className="w-10 h-[1px] bg-muted-foreground/30" />
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Tactile Experience</p>
            <div className="w-10 h-[1px] bg-muted-foreground/30" />
          </div>
          <h2 className="heading-display text-4xl md:text-6xl text-foreground mb-6">
            My Work Showcase
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium opacity-80">
            A curated selection of my finest digital experiences.
          </p>
        </motion.div>
      </div>

      {/* Neumorphic Carousel Container */}
      <div className="relative h-[480px] sm:h-[550px] md:h-[650px] w-full flex items-center justify-center perspective-2000">
        <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
          {showcaseProjects.map((project, index) => {
            let position = index - activeIndex;

            // Wrap positions for circular navigation
            if (position < -(showcaseProjects.length / 2)) position += showcaseProjects.length;
            if (position > showcaseProjects.length / 2) position -= showcaseProjects.length;

            const isActive = position === 0;
            const isAdjacent = Math.abs(position) === 1;
            const xOffset = getXOffset();

            return (
              <motion.div
                key={`${project.title}-${index}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                onMouseDown={() => setIsPressed(index)}
                onMouseUp={() => setIsPressed(null)}
                onTouchStart={() => setIsPressed(index)}
                onTouchEnd={() => setIsPressed(null)}
                animate={{
                  x: position * xOffset,
                  scale: isActive ? 1.05 : isAdjacent ? 0.88 : 0.75,
                  z: isActive ? 100 : 0,
                  rotateY: position * -10,
                  opacity: isActive ? 1 : isAdjacent ? 0.6 : 0,
                  zIndex: isActive ? 50 : isAdjacent ? 20 : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "group absolute w-[72vw] max-w-[340px] sm:max-w-[420px] md:max-w-[500px]",
                  "h-[380px] sm:h-[450px] md:h-[580px] rounded-[2.5rem] overflow-hidden transition-shadow duration-300",
                  isActive ? (isPressed === index ? "neu-pressed" : "neu-flat") : "shadow-none",
                  !isActive && "cursor-pointer"
                )}
                style={{
                  boxShadow: isActive && isPressed !== index 
                    ? "25px 25px 50px var(--neu-shadow-dark), -25px -25px 50px var(--neu-shadow-light)" 
                    : undefined
                }}
                onClick={() => !isActive && setActiveIndex(index)}
              >
                {/* Image Container with Soft Shadow */}
                <div className="relative w-full h-full p-4">
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                    {project.image ? (
                      <BlurImage
                        src={project.image}
                        alt={project.title}
                        containerClassName="absolute inset-0"
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-1000",
                          isActive ? "scale-100 group-hover:scale-110" : "scale-110"
                        )}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
                        <span className="text-muted-foreground/20 text-8xl font-extrabold font-heading">
                          {index + 1}
                        </span>
                      </div>
                    )}

                    {/* Content Overlay */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-0"
                    )} />
                    
                    <div className={cn(
                      "absolute inset-0 p-8 md:p-10 flex flex-col justify-end text-white transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-0"
                    )}>
                      {/* Category Badge */}
                      <div className="absolute top-8 left-8">
                        <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                          {project.category}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.4em]">
                          Project {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="text-2xl md:text-4xl font-extrabold mb-2 tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-white/70 text-xs md:text-sm font-medium mb-6 max-w-xs leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-[10px] uppercase tracking-widest rounded-full hover:scale-105 transition-all w-fit pointer-events-auto"
                          >
                            View Project <ArrowRight size={14} />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Neumorphic Navigation Buttons */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-12 pointer-events-none z-[60]">
          <button
            onClick={handlePrev}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full neu-button flex items-center justify-center text-foreground pointer-events-auto hover:scale-110 active:scale-95 transition-all"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full neu-button flex items-center justify-center text-foreground pointer-events-auto hover:scale-110 active:scale-95 transition-all"
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="mt-12 flex flex-col items-center gap-10">
        <div className="flex gap-4">
          {showcaseProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-500",
                i === activeIndex
                  ? "w-10 bg-foreground neu-flat"
                  : "w-2.5 bg-foreground/20 hover:bg-foreground/40 neu-button"
              )}
            />
          ))}
        </div>

        <Link
          to="/gallery"
          className="group flex items-center gap-3 px-10 py-5 rounded-full neu-button text-[11px] font-bold uppercase tracking-widest text-foreground hover:scale-105 active:scale-95 transition-all"
        >
          <span>Explore Full Gallery</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default GallerySection;
