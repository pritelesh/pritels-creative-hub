import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import FloatingCard from "./FloatingCard";

const experiences = [
  {
    role: "Admin & Creative Lead",
    company: "Chobicode",
    period: "Nov 2024 – Present",
    points: [
      "Led web and media projects from concept to delivery",
      "Developed WordPress and Shopify solutions for international clients",
      "Delivered creative direction for digital and brand-focused projects",
      "Collaborated closely with clients on content and campaign needs",
    ],
  },
  {
    role: "Admin",
    company: "Klemton Contracting Services",
    period: "Mar 2023 – Jul 2024",
    points: [
      "Managed workflow accuracy and compliance documentation",
      "Coordinated vendors and supported quality oversight",
      "Maintained organized processes across property preservation operations",
    ],
  },
  {
    role: "Head of Processing",
    company: "NextGen ITS",
    period: "Nov 2021 – Mar 2023",
    points: [
      "Led processing operations with strong quality control standards",
      "Partnered with US-based clients through direct communication",
      "Mentored team members while supporting operational consistency",
    ],
  },
  {
    role: "Operations & Team Management",
    company: "H-Group & LiveinBD",
    period: "2018 – 2020",
    points: [
      "Managed service delivery across operational teams",
      "Supported marketing campaigns and brand growth initiatives",
      "Tracked team performance against business goals and KPIs",
      "Strengthened day-to-day execution through leadership and coordination",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-foreground/30 md:hidden" />
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground md:hidden">My Career</p>
          </div>
          <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-foreground rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/40 -translate-x-1/2" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -100 : 100, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1] // Custom smooth ease-out
                }}
                className={`relative mb-16 md:mb-24 md:w-1/2 ${isLeft ? "md:pr-20 md:ml-0 md:text-right" : "md:pl-20 md:ml-auto"} pl-10 md:pl-0`}
              >
                {/* Timeline dot */}
                <div className={`absolute top-8 w-4 h-4 rounded-full bg-foreground border-4 border-background shadow-[0_0_20px_rgba(0,0,0,0.3)] z-20 left-4 -translate-x-1/2 ${isLeft ? "md:left-full" : "md:left-0"}`} />

                <div className={`neu-flat p-8 rounded-3xl transition-all duration-500 hover:scale-[1.02] cursor-default`}>
                  <div className={`flex items-center gap-2 mb-3 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                    <div className="neu-pressed p-1.5 rounded-lg">
                      <Briefcase size={14} className="text-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground font-bold tracking-widest uppercase">{exp.period}</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-foreground text-xl mb-1">{exp.role}</h3>
                  <p className="text-sm font-bold text-foreground/70 mb-6">{exp.company}</p>
                  <ul className={`space-y-3 ${isLeft ? "md:flex md:flex-col md:items-end" : ""}`}>
                    {exp.points.map((point, j) => (
                      <li key={j} className={`text-sm text-muted-foreground flex items-start gap-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" />
                        <span className="font-medium leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
