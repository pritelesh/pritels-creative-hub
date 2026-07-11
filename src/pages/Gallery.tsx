import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search, Filter } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlurImage from "@/components/BlurImage";
import ProjectDetailsDialog from "@/components/ProjectDetailsDialog";
import { useTheme } from "@/hooks/useTheme";
import FloatingCard from "@/components/FloatingCard";
import { portfolioProjects, type PortfolioProject } from "@/lib/projects";

const projects: PortfolioProject[] = portfolioProjects;

// Extract unique categories from the real data
const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Optimized filtering
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter = filter === "All" || project.category === filter;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           project.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const openProjectDetails = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("project", project.slug);
      return next;
    }, { replace: true });
  };

  useEffect(() => {
    const requestedSlug = searchParams.get("project");
    const matchedProject = projects.find((project) => project.slug === requestedSlug) ?? null;

    if (matchedProject) {
      setSelectedProject(matchedProject);
      setIsDialogOpen(true);
      const card = cardRefs.current[matchedProject.slug];
      card?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setSelectedProject(null);
      setIsDialogOpen(false);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar isDark={isDark} onToggleTheme={toggle} />
      
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 rounded-[2rem] border border-border/40 bg-[var(--neu-bg)]/70 p-8 shadow-[12px_12px_30px_rgba(15,23,42,0.08),-12px_-12px_30px_rgba(255,255,255,0.6)] backdrop-blur-xl sm:p-10"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-muted-foreground">Archives</p>
            <h1 className="heading-display mb-6 text-5xl text-foreground md:text-7xl">Complete Gallery</h1>
            <div className="mb-8 h-1.5 w-24 rounded-full bg-foreground" />
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Explore the complete collection of my digital work, including web development,
              creative design, video production, and social media branding.
            </p>
          </motion.div>

          <div className="sticky top-24 z-30 mb-10 rounded-[1.75rem] border border-border/40 bg-[var(--neu-bg)]/80 p-4 shadow-[10px_10px_24px_rgba(15,23,42,0.08),-10px_-10px_24px_rgba(255,255,255,0.65)] backdrop-blur-md sm:p-6 lg:mb-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md group">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground" />
                <input 
                  type="text" 
                  placeholder="Search projects or categories..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-border/50 bg-secondary/30 py-3.5 pl-12 pr-6 text-sm text-foreground shadow-inner placeholder:text-muted-foreground/60 transition-all focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="mr-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
                  <Filter size={12} /> Filter:
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-300 ${
                      filter === cat
                        ? "scale-105 border-foreground/30 bg-foreground text-background shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
                        : "border-border/50 bg-background/70 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 text-sm font-medium text-muted-foreground">
            Showing <span className="text-foreground">{filteredProjects.length}</span> of {projects.length} results
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  ref={(node) => {
                    cardRefs.current[project.slug] = node;
                  }}
                  key={`${project.title}-${i}`}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.45) }}
                >
                  <FloatingCard 
                    index={i} 
                    className={`group h-full overflow-hidden rounded-[1.75rem] border bg-card/40 shadow-[12px_12px_28px_rgba(15,23,42,0.12),-12px_-12px_28px_rgba(255,255,255,0.7)] backdrop-blur-sm transition-all duration-500 ${
                      selectedProject?.slug === project.slug
                        ? "border-amber-400/40 ring-2 ring-amber-400/20"
                        : "border-border/30 hover:border-foreground/20"
                    }`}
                  >
                    <div className="relative overflow-hidden bg-secondary/10 p-3 sm:p-4">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                        {project.image ? (
                          <BlurImage 
                            src={project.image} 
                            alt={project.title} 
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            containerClassName="h-full w-full"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-secondary/5 transition-colors group-hover:bg-secondary/10">
                            <span className="select-none font-heading text-6xl font-bold uppercase text-muted-foreground/30">{project.category[0]}</span>
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-5 sm:p-6">
                          <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">{project.category}</p>
                          <h3 className="mb-4 max-w-[14rem] font-heading text-lg font-semibold text-foreground sm:text-xl">
                            {project.title}
                          </h3>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openProjectDetails(project);
                            }}
                            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-background transition-all duration-300 hover:scale-[1.02] active:scale-95"
                          >
                            <ExternalLink size={12} /> View Project
                          </button>
                        </div>
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
      <ProjectDetailsDialog
        project={selectedProject}
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setSearchParams((prev) => {
              const next = new URLSearchParams(prev);
              next.delete("project");
              return next;
            }, { replace: true });
          }
        }}
      />
    </div>
  );
};

export default Gallery;
