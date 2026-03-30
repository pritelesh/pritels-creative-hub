import { motion } from "framer-motion";
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

// Only showing a curated selection for the home page showcase
const showcaseProjects: Project[] = projectsData.slice(0, 8);

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-20 gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">Selected Works</p>
              <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-4">My Work Showcase</h2>
              <div className="w-20 h-1 bg-foreground rounded-full" />
            </div>
            <Link
              to="/gallery"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              <span className="underline underline-offset-8 decoration-border/50 group-hover:decoration-foreground transition-all">View Full Gallery</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>

        <div className="relative flex flex-col gap-[10vh]">
          {showcaseProjects.map((project, i) => {
            return (
              <div 
                key={`${project.title}-${i}`} 
                className="sticky top-24 pt-12 md:pt-24"
                style={{ top: `${96 + i * 20}px` }} // Incremental offset for stacking effect
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <FloatingCard 
                    index={i} 
                    className="group/card overflow-hidden border-border/40 hover:border-foreground/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl bg-card/90"
                  >
                    <div className="flex flex-col md:flex-row min-h-[300px] md:min-h-[450px]">
                      {/* Image Container */}
                      <div className="w-full md:w-[60%] relative overflow-hidden bg-secondary/20">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            loading="lazy" 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="font-heading text-muted-foreground/30 text-8xl font-bold uppercase select-none">{project.category[0]}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                      </div>

                      {/* Content Container */}
                      <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-center">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4">{project.category}</p>
                        <h3 className="font-heading font-bold text-foreground text-3xl md:text-4xl mb-6 leading-tight">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-10">
                          {/* Mock tools for professional look */}
                          {['Modern UI', 'Responsive', 'Creative'].map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-medium bg-secondary text-secondary-foreground border border-border/50">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button className="flex items-center gap-3 w-fit px-8 py-4 rounded-full bg-foreground text-background text-xs font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-foreground/10 hover:shadow-foreground/20">
                          <span>View Project</span>
                          <ExternalLink size={14} /> 
                        </button>
                      </div>
                    </div>
                  </FloatingCard>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center"
        >
          <Link 
            to="/gallery" 
            className="inline-block px-10 py-5 rounded-full border border-border text-foreground font-heading font-bold text-sm hover:bg-foreground hover:text-background transition-all duration-500"
          >
            Explore Complete Archive ({projectsData.length}+ Projects)
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
