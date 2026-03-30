import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

const categories = ["All", "Web", "Video", "Design"];

const projects = [
  { title: "Leisure Holidays Website", category: "Web" },
  { title: "J&J Global Branding", category: "Design" },
  { title: "Chobicode Promo Video", category: "Video" },
  { title: "Polash Computer Site", category: "Web" },
  { title: "Product Photography Edit", category: "Design" },
  { title: "Corporate Reel", category: "Video" },
  { title: "E-commerce Store", category: "Web" },
  { title: "Social Media Kit", category: "Design" },
  { title: "Event Highlight Video", category: "Video" },
];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const { isDark, toggle } = useTheme();
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <Navbar isDark={isDark} onToggleTheme={toggle} />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="heading-display text-4xl md:text-5xl text-foreground mb-2">Gallery</h1>
          <div className="w-12 h-1 bg-foreground mb-10 rounded-full" />

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
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm hover:border-foreground/30 transition-all duration-300"
              >
                <div className="bg-secondary/50 aspect-[4/3] flex items-center justify-center">
                  <span className="font-heading text-muted-foreground text-sm">{project.category}</span>
                </div>
                <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-heading font-semibold text-primary-foreground text-sm mb-3">
                    {project.title}
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground text-primary text-xs font-medium hover:scale-105 transition-transform">
                    <ExternalLink size={14} /> View Project
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Gallery;
