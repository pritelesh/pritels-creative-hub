import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center md:justify-start"
        >
          <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border-2 border-border shadow-2xl">
            <img
              src={profileImg}
              alt="Pritelash Bhowmik Nel"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Welcome to my portfolio
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Pritelash Bhowmik Nel
          </h1>
          <p className="text-lg text-muted-foreground mb-2 font-medium">
            Admin & Creative Lead at <span className="text-foreground">Chobicode</span>
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
            I create modern websites, engaging video content, and digital experiences using design, development, and AI tools.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href="#gallery"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:scale-105 hover:bg-primary-foreground hover:text-primary border border-primary transition-all duration-300"
            >
              View Work
            </a>
            <a
              href="#hire"
              className="px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:scale-105 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Hire Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
