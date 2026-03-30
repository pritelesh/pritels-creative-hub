import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

import projectsData from "../data/projects.json";

// Define project type for typescript
interface Project {
  title: string;
  category: string;
  image?: string;
  link?: string;
}

const showcaseProjects: Project[] = projectsData.slice(0, 5);

const GallerySection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const flipPage = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentPage((prev) => (prev + newDirection + showcaseProjects.length) % showcaseProjects.length);
  };

  // Variants for the page flip animation
  const variants = {
    initial: (direction: number) => ({
      rotateY: direction > 0 ? 110 : -110,
      opacity: 0,
      scale: 0.9,
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -110 : 110,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section id="gallery" className="py-24 bg-background overflow-hidden selection:bg-foreground/10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground animate-in fade-in slide-in-from-left-2 duration-500">
              <BookOpen size={16} className="text-foreground" />
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Showcase Volume 01</p>
            </div>
            <h2 className="heading-display text-4xl md:text-6xl text-foreground">My Work Showcase</h2>
            <div className="w-24 h-1.5 bg-foreground rounded-full" />
          </div>
          <Link
            to="/gallery"
            className="group flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-foreground transition-all duration-300 pb-2 border-b-2 border-border/30 hover:border-foreground"
          >
            <span>Browse Full Archive</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* 3D Visual Book Component */}
        <div className="relative h-[550px] md:h-[650px] perspective-2000 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1], // Custom cinematic easing
              }}
              // Drag functionality for mobile flipping
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100) flipPage(-1);
                else if (info.offset.x < -100) flipPage(1);
              }}
              className="absolute w-full max-w-5xl h-full transform-style-3d shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] rounded-3xl overflow-hidden bg-card border border-border/40 backdrop-blur-xl"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Book Cover / Project Preview Layer */}
                <div className="w-full md:w-1/2 relative bg-secondary/20 overflow-hidden group/cover">
                  {showcaseProjects[currentPage].image ? (
                    <img
                      src={showcaseProjects[currentPage].image}
                      alt={showcaseProjects[currentPage].title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/cover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/5">
                      <span className="text-foreground/5 text-[15rem] font-bold select-none">{currentPage + 1}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50">
                    <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">Project Live</span>
                  </div>
                </div>

                {/* Content Page Layer */}
                <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center relative bg-card h-full">
                  {/* Subtle Spine Detail */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/10 to-transparent hidden md:block" />
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border/20 hidden md:block" />

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-8"
                  >
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-muted-foreground mb-4">Edition 0{currentPage + 1}</p>
                      <h3 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                        {showcaseProjects[currentPage].title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                      A premium transformation focused on <span className="text-foreground font-semibold underline decoration-foreground/20 underline-offset-4">{showcaseProjects[currentPage].category}</span>. Built with modern patterns and creative execution.
                    </p>

                    <div className="flex flex-wrap items-center gap-6 pt-4">
                      <button className="flex items-center gap-3 px-10 py-5 rounded-full bg-foreground text-background text-[11px] font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-foreground/20 group/cta">
                        <span>Read Case Study</span>
                        <ExternalLink size={14} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                      </button>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground border-l-2 border-border pl-6 py-1">
                        {showcaseProjects[currentPage].category}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute mt-[650px] md:mt-0 md:right-[-80px] flex md:flex-col gap-5 z-50">
            <button
              aria-label="Previous Project"
              onClick={() => flipPage(-1)}
              className="w-14 h-14 rounded-full border border-border bg-background/90 backdrop-blur-xl flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-500 shadow-2xl active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              aria-label="Next Project"
              onClick={() => flipPage(1)}
              className="w-14 h-14 rounded-full border border-border bg-background/90 backdrop-blur-xl flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-500 shadow-2xl active:scale-90"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Dynamic Pagination */}
        <div className="flex justify-center items-center gap-4 mt-32 md:mt-16">
          <span className="text-[10px] font-bold text-muted-foreground">01</span>
          <div className="flex gap-2">
            {showcaseProjects.map((_, i) => (
              <button
                key={i}
                aria-label={`Page ${i + 1}`}
                onClick={() => {
                  setDirection(i > currentPage ? 1 : -1);
                  setCurrentPage(i);
                }}
                className={`h-1.5 transition-all duration-700 rounded-full ${
                  i === currentPage ? "w-14 bg-foreground" : "w-4 bg-border hover:bg-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-muted-foreground">0{showcaseProjects.length}</span>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
