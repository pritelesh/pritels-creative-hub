import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import FloatingCard from "./FloatingCard";

const experiences = [
  {
    role: "Admin & Creative Lead",
    company: "Chobicode",
    period: "Nov 2024 – Present",
    points: [
      "Managing web & media projects end-to-end",
      "WordPress & Shopify development for international clients",
      "Video content creation for Leisure Holidays, J&J Global",
      "Brand identity & creative direction",
    ],
  },
  {
    role: "Admin",
    company: "Klemton Contracting Services",
    period: "Mar 2023 – Jul 2024",
    points: [
      "US-based property preservation management",
      "Workflow accuracy & compliance documentation",
      "Vendor coordination & quality oversight",
    ],
  },
  {
    role: "Head of Processing",
    company: "NextGen ITS",
    period: "Nov 2021 – Mar 2023",
    points: [
      "Led processing team with quality control standards",
      "Direct communication with US-based clients",
      "Operational leadership & team mentorship",
    ],
  },
  {
    role: "Managerial Roles",
    company: "H-Group & LiveinBD",
    period: "2018 – 2020",
    points: [
      "Operational excellence in service delivery",
      "Marketing campaigns & brand growth",
      "Team management & KPI tracking",
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
        >
          <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-2">Work Journey</h2>
          <div className="w-12 h-1 bg-foreground mb-12 rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

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
                className={`relative mb-12 md:w-1/2 ${isLeft ? "md:pr-16 md:ml-0 md:text-right" : "md:pl-16 md:ml-auto"} pl-16 md:pl-0`}
              >
                {/* Timeline dot */}
                <div className={`absolute top-2 w-3.5 h-3.5 rounded-full bg-foreground border-2 border-background left-[18px] md:left-auto shadow-[0_0_10px_rgba(0,0,0,0.2)] z-10 ${isLeft ? "md:-right-[7px]" : "md:-left-[7px]"}`} />

                <FloatingCard index={i} className="p-6 hover:border-foreground/30 transition-all duration-300 hover:shadow-xl">
                  <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                    <Briefcase size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">{exp.period}</span>
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-xl mb-1">{exp.role}</h3>
                  <p className="text-sm font-medium text-foreground/80 mb-4">{exp.company}</p>
                  <ul className={`space-y-2 ${isLeft ? "md:flex md:flex-col md:items-end" : ""}`}>
                    {exp.points.map((point, j) => (
                      <li key={j} className={`text-sm text-muted-foreground flex items-start gap-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </FloatingCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
