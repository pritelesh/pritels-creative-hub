import { motion, Variants } from "framer-motion";
import { Mail, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import FloatingCard from "./FloatingCard";

const HireSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section id="hire" className="py-24 bg-secondary/30 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-2">Hire Me</h2>
            <div className="w-12 h-1 bg-foreground mb-8 rounded-full" />
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Looking for a creative developer or video editor? Let's work together to bring your vision to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <FloatingCard index={0} className="p-5 hover:border-foreground/30 transition-all duration-300 group">
                <a href="mailto:priteleshnel@gmail.com" className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                    <p className="text-sm font-medium text-foreground">priteleshnel@gmail.com</p>
                  </div>
                </a>
              </FloatingCard>
              
              <FloatingCard index={1} className="p-5 hover:border-foreground/30 transition-all duration-300 group">
                <a 
                  href="https://www.linkedin.com/in/pritelesh-nel-303533297/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-5"
                >
                  <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-[#0077B5] group-hover:text-white transition-colors duration-300">
                    <Linkedin size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">LinkedIn</p>
                    <p className="text-sm font-medium text-foreground">Pritelesh Nel</p>
                  </div>
                </a>
              </FloatingCard>
            </motion.div>

            <motion.form
              variants={itemVariants}
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-4 rounded-2xl bg-card/60 backdrop-blur-md border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/10 transition-all shadow-inner"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-4 rounded-2xl bg-card/60 backdrop-blur-md border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/10 transition-all shadow-inner"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-4 rounded-2xl bg-card/60 backdrop-blur-md border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-foreground/10 transition-all resize-none shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background text-sm font-bold overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-foreground/10"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Send size={16} /> 
                <span>Send Message</span>
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HireSection;
