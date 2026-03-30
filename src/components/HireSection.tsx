import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { useState } from "react";

const HireSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section id="hire" className="py-24 bg-secondary/50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-2">Hire Me</h2>
          <div className="w-12 h-1 bg-foreground mb-8 rounded-full" />
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-lg">
            Looking for a creative developer or video editor? Let's work together to bring your vision to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <a
              href="mailto:pritelash@example.com"
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-foreground/20 transition-colors duration-300"
            >
              <Mail size={20} className="text-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">pritelash@example.com</p>
              </div>
            </a>
            <a
              href="tel:+880123456789"
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-foreground/20 transition-colors duration-300"
            >
              <Phone size={20} className="text-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">+880 123 456 789</p>
              </div>
            </a>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors resize-none"
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:scale-105 hover:bg-primary-foreground hover:text-primary border border-primary transition-all duration-300"
            >
              <Send size={16} /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default HireSection;
