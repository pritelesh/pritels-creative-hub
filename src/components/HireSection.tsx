import { motion, Variants } from "framer-motion";
import { Mail, Linkedin, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import FloatingCard from "./FloatingCard";
import { toast } from "sonner";
import { useForm } from "@formspree/react";

const HireSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, handleSubmit] = useForm("xwvwblpv");

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Thanks for reaching out!", {
        description: "I've got your message and I'll reply to you soon. Stay tuned!",
        icon: <CheckCircle2 className="text-green-500" />
      });
      setForm({ name: "", email: "", message: "" });
    }
    if (state.errors && Object.keys(state.errors).length > 0) {
      toast.error("Oops! Something went wrong.", {
        description: "Please try again later or contact me via LinkedIn.",
        icon: <AlertCircle className="text-red-500" />
      });
    }
  }, [state.succeeded, state.errors]);

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
            <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-2">Offer for Work</h2>
            <div className="w-12 h-1 bg-foreground mb-8 rounded-full" />
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Have a project in mind or a professional opportunity? Let's discuss how we can work together to bring your vision to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="p-6 rounded-3xl neu-flat transition-transform duration-300 hover:scale-[1.02] group">
                <a href="mailto:priteleshnel@gmail.com" className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full neu-button flex items-center justify-center group-hover:neu-pressed transition-all duration-300">
                    <Mail size={22} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                    <p className="text-sm font-bold text-foreground">priteleshnel@gmail.com</p>
                  </div>
                </a>
              </div>
              
              <div className="p-6 rounded-3xl neu-flat transition-transform duration-300 hover:scale-[1.02] group">
                <a 
                  href="https://www.linkedin.com/in/pritelesh-nel-303533297/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-5"
                >
                  <div className="w-12 h-12 rounded-full neu-button flex items-center justify-center group-hover:neu-pressed transition-all duration-300">
                    <Linkedin size={22} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">LinkedIn</p>
                    <p className="text-sm font-bold text-foreground">Pritelesh Nel</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.form
              variants={itemVariants}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl neu-pressed text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl neu-pressed text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl neu-pressed text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                className="group w-full flex items-center justify-center gap-3 py-4 rounded-full neu-button text-foreground text-sm font-bold transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:scale-100"
              >
                {state.submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : state.succeeded ? (
                  <CheckCircle2 size={16} className="text-green-500" />
                ) : (
                  <Send size={16} />
                )}
                <span>{state.submitting ? "Sending..." : state.succeeded ? "Message Sent!" : "Send Message"}</span>
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HireSection;
