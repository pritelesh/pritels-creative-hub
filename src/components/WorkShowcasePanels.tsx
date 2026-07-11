import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurImage from "./BlurImage";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import { type PortfolioProject } from "@/lib/projects";
import { cn } from "@/lib/utils";

export type WorkShowcasePanelProject = PortfolioProject;

interface WorkShowcasePanelsProps {
  projects: WorkShowcasePanelProject[];
}

const getExpandedGrow = (count: number) => {
  if (count <= 3) return 2.4;
  if (count === 4) return 3.2;
  return 3.6;
};

const WorkShowcasePanels = ({ projects }: WorkShowcasePanelsProps) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const visibleProjects = useMemo(
    () => projects.slice(0, Math.min(5, projects.length)),
    [projects]
  );

  if (!visibleProjects.length) return null;

  const expandedGrow = getExpandedGrow(visibleProjects.length);

  const getPrimaryLabel = (project: PortfolioProject) => {
    if (!project.link) return "View Details";
    if (project.category.toLowerCase().includes("brand")) return "View Case Study";
    return "View Project";
  };

  const getSecondaryLabel = () => "Read Story";

  const openProjectDetails = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        className="flex h-[520px] gap-3 rounded-[2rem] border border-white/10 bg-black/20 p-2 backdrop-blur-xl sm:h-[580px] lg:h-[640px]"
        onMouseLeave={() => setActiveIndex(null)}
      >
        {visibleProjects.map((project, index) => {
          const isActive = activeIndex === index;
          const isCollapsed = activeIndex !== null && !isActive;

          return (
            <motion.div
              key={`${project.title}-${index}`}
              role="button"
              tabIndex={0}
              aria-label={isActive ? `Collapse ${project.title}` : `Open ${project.title}`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => {
                setActiveIndex(index);
                navigate(`/gallery?project=${project.slug}`);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveIndex(index);
                  navigate(`/gallery?project=${project.slug}`);
                }
              }}
              initial={false}
              animate={{
                flexGrow: activeIndex === null ? 1 : isActive ? expandedGrow : 1,
                opacity: isCollapsed ? 0.7 : 1,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group relative flex-1 overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/30 text-left shadow-[16px_16px_40px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70",
                isActive ? "border-amber-400/40 shadow-[0_0_0_1px_rgba(251,191,36,0.2),20px_20px_50px_rgba(0,0,0,0.35)]" : "hover:border-amber-400/35"
              )}
            >
              <BlurImage
                src={project.image ?? ""}
                alt={project.title}
                containerClassName="absolute inset-0"
                className={cn(
                  "h-full w-full object-cover transition duration-700 ease-out",
                  isActive ? "scale-110" : "scale-100"
                )}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10" />
              <div className={cn("absolute inset-0 transition-all duration-500", isActive ? "bg-black/15" : "bg-black/35")} />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/80 backdrop-blur-md">
                  {project.category}
                </span>
                <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm">
                  0{index + 1}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-7">
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 0 : 1,
                    y: isActive ? 16 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70">
                    <span className="h-px w-6 bg-amber-400/80" />
                    Project {index + 1}
                  </div>
                  <h3 className="max-w-[12rem] text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">
                    {project.title}
                  </h3>
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 18,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:p-6 md:p-7"
                >
                  <div className="max-w-[16rem] space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-300/90">
                      <Sparkles size={12} />
                      Featured build
                    </div>
                    <p className="text-sm leading-6 text-white/75">
                      {project.description ?? "A polished digital experience crafted with performance and clarity in mind."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.link ? (
                      <button
                        type="button"
                        aria-hidden={!isActive}
                        tabIndex={isActive ? 0 : -1}
                        onClick={(event) => {
                          event.stopPropagation();
                          openProjectDetails(project);
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-950 transition-transform duration-300 hover:scale-[1.02]"
                      >
                        {getPrimaryLabel(project)} <ArrowRight size={14} />
                      </button>
                    ) : null}
                    <button
                      type="button"
                      aria-hidden={!isActive}
                      tabIndex={isActive ? 0 : -1}
                      onClick={(event) => {
                        event.stopPropagation();
                        openProjectDetails(project);
                      }}
                      className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
                    >
                      {getSecondaryLabel()}
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ProjectDetailsDialog
        project={selectedProject}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default WorkShowcasePanels;
