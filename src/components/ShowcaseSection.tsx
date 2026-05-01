import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import BlurImage from "./BlurImage";
import { cn } from "@/lib/utils";

interface ShowcaseProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
}

const projects: ShowcaseProject[] = [
  {
    id: "1",
    title: "E-Commerce Platform Redesign",
    description: "A complete overhaul of a legacy e-commerce platform using Next.js and TailwindCSS.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    category: "Full Stack",
    link: "#"
  },
  {
    id: "2",
    title: "AI Image Generator",
    description: "A fun experimental app that generates images from text using the OpenAI API.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    category: "AI",
    link: "#"
  },
  {
    id: "3",
    title: "SaaS Dashboard",
    description: "A complex data visualization dashboard for a leading B2B SaaS company.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    category: "UI/UX",
    link: "#"
  },
  {
    id: "4",
    title: "Crypto Wallet App",
    description: "A secure and intuitive mobile-first crypto wallet application interface with real-time charts.",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2564&auto=format&fit=crop",
    category: "Mobile",
    link: "#"
  }
];

const ShowcaseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50) {
      handleNext();
    } else if (info.offset.x > 50) {
      handlePrev();
    }
  };

  return (
    <section className="relative py-32 bg-[var(--neu-bg)] overflow-hidden perspective-2000">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
        <div className="flex items-center justify-center gap-3 text-muted-foreground mb-4">
          <div className="w-10 h-[1px] bg-muted-foreground/30" />
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Featured Projects</p>
          <div className="w-10 h-[1px] bg-muted-foreground/30" />
        </div>
        <h2 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter mb-6 text-foreground">
          Featured Work<span className="text-primary/50">.</span>
        </h2>
        <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium opacity-80">
          Handpicked highlights from my most impactful digital builds.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative h-[550px] md:h-[700px] w-full flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
          <AnimatePresence initial={false}>
            {projects.map((project, index) => {
              // Calculate relative position
              let position = index - activeIndex;
              if (position < -1) position += projects.length;
              if (position > 1) position -= projects.length;

              const isActive = position === 0;
              const isLeft = position === -1;
              const isRight = position === 1;
              const isHidden = !isActive && !isLeft && !isRight;

              // Adjust spacing based on screen width
              const xOffset = typeof window !== 'undefined' && window.innerWidth < 768 ? 240 : 400;

              return (
                <motion.div
                  key={project.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    x: position * xOffset, // Card spacing
                    scale: isActive ? 1 : 0.75,
                    z: isActive ? 100 : 0,
                    rotateY: position * 15, // Slight rotation for depth
                    opacity: isHidden ? 0 : isActive ? 1 : 0.5,
                    zIndex: isActive ? 50 : 10,
                    filter: isActive ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={cn(
                    "absolute w-[80vw] max-w-[400px] md:max-w-[500px] h-[450px] md:h-[600px] rounded-[3rem] overflow-hidden neu-flat cursor-grab active:cursor-grabbing transition-shadow duration-500",
                    isActive ? "shadow-[25px_25px_50px_rgba(0,0,0,0.15),-25px_-25px_50px_rgba(255,255,255,0.9)]" : "shadow-none"
                  )}
                  onClick={() => !isActive && setActiveIndex(index)}
                >
                  {/* Background Image */}
                  <BlurImage 
                    src={project.image}
                    alt={project.title}
                    containerClassName="absolute inset-0"
                    className="transition-transform duration-1000 ease-out group-hover:scale-110 pointer-events-none"
                  />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 pointer-events-none" />
                  <div className={cn(
                    "absolute inset-0 bg-black/40 transition-opacity duration-500 pointer-events-none",
                    isActive ? "opacity-0 hover:opacity-100" : "opacity-50"
                  )} />
                  
                  {/* Content Container */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end text-white pointer-events-none">
                    {/* Top Badge */}
                    <div className="absolute top-10 left-10">
                      <span className="inline-block px-5 py-2 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Description (Visible when active) */}
                    <div className={cn(
                      "transition-all duration-700",
                      isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    )}>
                      <h3 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-white/70 line-clamp-2 mb-8 text-base font-medium max-w-sm">
                        {project.description}
                      </p>
                      <a 
                        href={project.link}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-2xl pointer-events-auto"
                      >
                        View Project <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-[60] pointer-events-none">
          <button 
            onClick={handlePrev}
            className="w-14 h-14 md:w-20 md:h-20 rounded-full neu-button flex items-center justify-center text-foreground pointer-events-auto hover:scale-110 active:neu-pressed transition-all"
            aria-label="Previous Project"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={handleNext}
            className="w-14 h-14 md:w-20 md:h-20 rounded-full neu-button flex items-center justify-center text-foreground pointer-events-auto hover:scale-110 active:neu-pressed transition-all"
            aria-label="Next Project"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-12">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              i === activeIndex ? "w-12 bg-foreground" : "w-2 bg-foreground/20 hover:bg-foreground/40"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default ShowcaseSection;
