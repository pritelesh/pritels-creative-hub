import { motion } from "framer-motion";
import { Code, Video, Box, Globe, Briefcase } from "lucide-react";

const highlights = [
  { icon: Code, text: "Web Development — WordPress, Shopify, React, Tailwind CSS" },
  { icon: Video, text: "Video Editing — DaVinci Resolve" },
  { icon: Box, text: "3D Learning — Blender" },
  { icon: Globe, text: "Experience with USA-based property preservation companies" },
  { icon: Briefcase, text: "Clients: Leisure Holidays, J&J Global, Polash Computer" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-2">About Me</h2>
          <div className="w-12 h-1 bg-foreground mb-8 rounded-full" />
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            I'm a creative professional with hands-on experience in web development, video production, 
            and digital design. Currently serving as Admin & Creative Lead at Chobicode, I bring ideas to 
            life through clean code and compelling visuals. I've collaborated with international clients 
            and continuously push my skills into new domains like 3D and AI-powered tools.
          </p>
        </motion.div>

        <div className="space-y-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-6 p-6 rounded-2xl neu-flat transition-transform duration-300 hover:scale-[1.02] cursor-default"
            >
              <div className="neu-pressed p-3 rounded-xl">
                 <item.icon size={20} className="text-foreground shrink-0" />
              </div>
              <span className="text-sm md:text-base text-muted-foreground font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
