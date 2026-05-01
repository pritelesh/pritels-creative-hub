import { motion } from "framer-motion";
import { Code, Palette, Users } from "lucide-react";
import { cn } from "@/lib/utils";

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={group.span}
            >
              <div className={cn("p-8 h-full neu-flat rounded-3xl transition-transform duration-500 hover:scale-[1.02]", group.span)}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="neu-pressed p-2 rounded-xl">
                    <group.icon size={20} className="text-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-lg">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider neu-button text-muted-foreground hover:text-foreground cursor-default transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
