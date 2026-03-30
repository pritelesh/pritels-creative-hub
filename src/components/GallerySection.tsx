import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import FloatingCard from "./FloatingCard";

import projectsData from "../data/projects.json";

// Define project type for typescript
interface Project {
  title: string;
  category: string;
  image?: string;
  link?: string;
}

const projects: Project[] = projectsData;

const GallerySection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "center",
      skipSnaps: false,
      dragFree: false
    }, 
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">Portfolio Highlights</p>
              <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-4">My Work Showcase</h2>
              <div className="w-20 h-1 bg-foreground rounded-full" />
            </div>
            <Link
              to="/gallery"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              <span>View Full Gallery</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>

        <div className="relative group/carousel">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-6">
              {projects.map((project, i) => (
                <div 
                  key={`${project.title}-${i}`}
                  className="flex-[0_0_90%] min-w-0 pl-4 md:flex-[0_0_60%] md:pl-6 lg:flex-[0_0_45%]"
                >
                  <motion.div
                    animate={{ 
                      scale: selectedIndex === i ? 1 : 0.95,
                      opacity: selectedIndex === i ? 1 : 0.5
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                  >
                    <FloatingCard 
                      index={i} 
                      className="group/card h-full overflow-hidden border-border/50 hover:border-foreground/30 transition-all duration-500 shadow-2xl backdrop-blur-sm"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-secondary/30">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            loading="lazy" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                            <span className="font-heading text-muted-foreground text-sm uppercase tracking-widest">{project.category}</span>
                          </div>
                        )}
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 transform translate-y-4 group-hover/card:translate-y-0">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{project.category}</p>
                          <h3 className="font-heading font-bold text-foreground text-xl md:text-2xl mb-6 text-center px-6">
                            {project.title}
                          </h3>
                          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-xs font-bold hover:scale-105 active:scale-95 transition-all duration-300">
                            <ExternalLink size={14} /> 
                            <span>View Case Study</span>
                          </button>
                        </div>
                      </div>
                    </FloatingCard>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-foreground hover:text-background z-20 hidden md:flex disabled:opacity-30"
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-foreground hover:text-background z-20 hidden md:flex disabled:opacity-30"
            disabled={!nextBtnEnabled}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1 transition-all duration-500 rounded-full ${
                index === selectedIndex 
                  ? "w-12 bg-foreground" 
                  : "w-2 bg-border hover:bg-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
