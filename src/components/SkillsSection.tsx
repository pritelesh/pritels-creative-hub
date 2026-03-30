import { motion } from "framer-motion";

const skills = [
  { name: "WordPress", desc: "Custom themes, plugins, and full site builds" },
  { name: "Shopify", desc: "E-commerce storefronts and Liquid customization" },
  { name: "React", desc: "Component-driven SPAs with modern tooling" },
  { name: "Tailwind CSS", desc: "Utility-first styling for rapid UI development" },
  { name: "Video Editing", desc: "Professional editing with DaVinci Resolve" },
  { name: "Graphic Design", desc: "Brand identity, social media, and print design" },
  { name: "AI Tools", desc: "ChatGPT, Midjourney, DALL·E, Runway ML" },
  { name: "Blender", desc: "3D modeling and rendering exploration" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-2">Skills</h2>
          <div className="w-12 h-1 bg-foreground mb-12 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-foreground/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:tracking-wide transition-all duration-300">
                {skill.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
