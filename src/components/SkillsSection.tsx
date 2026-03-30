import { motion } from "framer-motion";
import { Code, Palette, Users } from "lucide-react";
import FloatingCard from "./FloatingCard";

const skillGroups = [
  {
    title: "Development",
    icon: Code,
    skills: ["React", "Next.js", "Tailwind CSS", "WordPress", "Shopify", "Git & GitHub", "VS Code", "Vercel / Netlify", "Postman"],
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Creative & AI",
    icon: Palette,
    skills: ["DaVinci Resolve", "3D Blender", "Figma", "Spline", "Dribbble", "Stitch", "ChatGPT", "Gemini", "Grok", "Lovable", "Emigrant"],
    span: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Admin & Management",
    icon: Users,
    skills: ["Project Management", "Client Relations", "CRM Tools", "Team Leadership"],
    span: "md:col-span-3",
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-2">Skills & Tech Stack</h2>
          <div className="w-12 h-1 bg-foreground mb-12 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={group.span}
            >
              <FloatingCard index={i} className="p-6 h-full hover:border-foreground/30 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <group.icon size={20} className="text-foreground" />
                  <h3 className="font-heading font-semibold text-foreground">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </FloatingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
