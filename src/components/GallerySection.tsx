import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingCard from "./FloatingCard";

const categories = ["All", "Web", "Video", "Design"];

const projects = [
  { title: "Leisure Holidays Website", category: "Web" },
  { title: "J&J Global Branding", category: "Design" },
  { title: "Chobicode Promo Video", category: "Video" },
  { title: "Polash Computer Site", category: "Web" },
  { title: "Product Photography Edit", category: "Design" },
  { title: "Corporate Reel", category: "Video" },
];

const GallerySection = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="gallery" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <div>
              <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-2">My Work Showcase</h2>
              <div className="w-12 h-1 bg-foreground rounded-full" />
            </div>
            <Link
              to="/gallery"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              View Full Gallery →
            </Link>
          </div>
        </motion.div>

        <div className="flex gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                filter === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card/60 backdrop-blur-sm text-muted-foreground border-border/50 hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <FloatingCard index={i} className="group overflow-hidden hover:border-foreground/30 transition-all duration-300">
                <div className="bg-secondary/50 aspect-[4/3] flex items-center justify-center">
                  <span className="font-heading text-muted-foreground text-sm">{project.category}</span>
                </div>
                <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                  <h3 className="font-heading font-semibold text-primary-foreground text-sm mb-3">
                    {project.title}
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground text-primary text-xs font-medium hover:scale-105 transition-transform">
                    <ExternalLink size={14} /> View Project
                  </button>
                </div>
              </FloatingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
