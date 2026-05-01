import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "B.Sc in Computer Science & Engineering",
    institution: "Atish Dipankar University of Science & Technology",
    period: "2014 – 2018",
  },
  {
    degree: "Higher Secondary Certificate (HSC) — Science",
    institution: "Kishoregonj Model College",
    period: "",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Arjat Atarzan High School",
    period: "",
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24 bg-secondary/30">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-2">Education</h2>
          <div className="w-12 h-1 bg-foreground mb-12 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="p-8 h-full neu-flat rounded-3xl transition-transform duration-500 hover:scale-[1.02] cursor-default flex flex-col">
                <div className="neu-pressed p-2.5 rounded-xl w-fit mb-4">
                  <GraduationCap size={20} className="text-foreground" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-base mb-2">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground font-medium mb-4">{edu.institution}</p>
                {edu.period && (
                  <p className="text-xs text-muted-foreground/60 font-bold uppercase tracking-wider mt-auto">{edu.period}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
