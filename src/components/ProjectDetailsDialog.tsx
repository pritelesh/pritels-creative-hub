import { ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BlurImage from "./BlurImage";

import type { PortfolioProject } from "@/lib/projects";

export type ProjectDetailsDialogProject = PortfolioProject;

interface ProjectDetailsDialogProps {
  project: ProjectDetailsDialogProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDetailsDialog = ({ project, open, onOpenChange }: ProjectDetailsDialogProps) => {
  if (!project) return null;

  const projectImages = project.files?.length ? project.files : project.image ? [project.image] : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl border border-white/10 bg-[var(--neu-bg)]/95 p-0 text-foreground shadow-[0_40px_120px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="overflow-hidden rounded-[1.75rem]">
          <div className="relative min-h-56 w-full bg-muted/10 p-3 sm:min-h-72 sm:p-4">
            {projectImages.length ? (
              <div className="grid max-h-[420px] w-full grid-cols-1 gap-3 overflow-y-auto rounded-[1.25rem] bg-background/40 p-2 sm:grid-cols-2 sm:max-h-[520px] sm:p-3">
                {projectImages.map((image, index) => (
                  <div key={`${project.id}-${index}`} className="overflow-hidden rounded-[1rem] border border-border/30 shadow-[8px_8px_20px_rgba(15,23,42,0.08),-8px_-8px_20px_rgba(255,255,255,0.7)]">
                    <BlurImage
                      src={image}
                      alt={`${project.title} preview ${index + 1}`}
                      containerClassName="h-40 w-full sm:h-48"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full min-h-48 w-full items-center justify-center rounded-[1.25rem] bg-muted/20">
                <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Project Preview</p>
              </div>
            )}
          </div>

          <div className="space-y-5 p-6 sm:p-8">
            <DialogHeader className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-400">
                  {project.category}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  Project Overview
                </span>
              </div>
              <DialogTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {project.title}
              </DialogTitle>
              <DialogDescription className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                {project.description ?? "A polished digital experience crafted with attention to detail, performance, and a strong visual identity."}
              </DialogDescription>
            </DialogHeader>

            {project.link ? (
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-background transition-transform duration-300 hover:scale-[1.02]"
                >
                  Visit Project <ExternalLink size={14} />
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;
