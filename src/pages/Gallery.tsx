import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlurImage from "@/components/BlurImage";
import { useTheme } from "@/hooks/useTheme";
import FloatingCard from "@/components/FloatingCard";

import projectsData from "../data/projects.json";

// Define project type for typescript
interface Project {
  title: string;
  category: string;
  image?: string;
  link?: string;
}

const projects: Project[] = projectsData;

// Extract unique categories from the real data
const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { isDark, toggle } = useTheme();

  // Optimized filtering
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter = filter === "All" || project.category === filter;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           project.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar isDark={isDark} onToggleTheme={toggle} />
      
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground mb-4">Archives</p>
            <h1 className="heading-display text-5xl md:text-7xl text-foreground mb-6">Complete Gallery</h1>
            <div className="w-24 h-1.5 bg-foreground rounded-full mb-8" />
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Explore the complete collection of my digital work, including web development, 
              creative design, video production, and social media branding.
            </p>
          </motion.div>

          {/* Controls: Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-8 mb-16 items-start lg:items-center justify-between border-b border-border/40 pb-12 sticky top-24 z-30 bg-background/80 backdrop-blur-md pt-4 px-2 -mx-2 rounded-xl">
            {/* Search Bar */}
            <div className="relative w-full lg:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
              <input 
                type="text" 
                placeholder="Search projects or categories..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary/30 border border-border/50 rounded-full py-3.5 pl-12 pr-6 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition-all shadow-inner"
              />
            </div>

            {/* Category Pills */}
            <div className="flex gap-2.5 flex-wrap items-center">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-2 flex items-center gap-2">
                <Filter size={12} /> Filter:
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                    filter === cat
                      ? "bg-foreground text-background border-foreground shadow-[0_5px_15px_rgba(0,0,0,0.1)] scale-105"
                      : "bg-background text-muted-foreground border-border/50 hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8 text-sm text-muted-foreground font-medium">
            Showing <span className="text-foreground">{filteredProjects.length}</span> of {projects.length} results
          </div>

          {/* The Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  key={`${project.title}-${i}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.5) }}
                >
                  <FloatingCard 
                    index={i} 
                    className="group h-full overflow-hidden border-border/30 hover:border-foreground/20 transition-all duration-500 shadow-xl backdrop-blur-sm bg-card/40"
                  >
                    <div className="relative aspect-square overflow-hidden bg-secondary/10">
                      {project.image ? (
                        <BlurImage 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          containerClassName="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/5 group-hover:bg-secondary/10 transition-colors">
                          <span className="font-heading text-muted-foreground/30 text-6xl font-bold uppercase select-none">{project.category[0]}</span>
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-background/90 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-2">{project.category}</p>
                        <h3 className="font-heading font-bold text-foreground text-center px-6 mb-6 line-clamp-2">
                          {project.title}
                        </h3>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-[10px] font-bold hover:scale-105 active:scale-95 transition-all duration-300">
                          <ExternalLink size={12} /> View Project
                        </button>
                      </div>
                    </div>
                  </FloatingCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-muted-foreground text-lg mb-4">No projects found matching your criteria.</p>
              <button 
                onClick={() => {setFilter("All"); setSearchQuery("");}}
                className="text-foreground font-bold underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
