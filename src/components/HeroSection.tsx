import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMouseParallax } from "@/hooks/useFloating";

const heroImages = [
  "/hero1/241750112_533589251066328_8032423070292839440_n.jpg",
  "/hero1/ChatGPT Image Feb 17, 2026, 06_19_34 PM.png",
  "/hero1/ChatGPT Image Feb 18, 2026, 01_57_45 AM.png",
  "/hero1/ChatGPT Image Feb 18, 2026, 12_12_06 AM.png",
  "/hero1/ChatGPT Image Feb 18, 2026, 12_21_52 AM.png",
  "/hero1/ChatGPT Image Feb 18, 2026, 12_43_45 AM.png",
  "/hero1/ChatGPT Image Feb 18, 2026, 12_49_31 AM.png",
  "/hero1/ChatGPT Image Feb 25, 2026, 11_22_31 PM.png",
  "/hero1/ChatGPT Image Feb 25, 2026, 11_37_29 PM.png",
  "/hero1/ChatGPT Image Mar 5, 2026, 01_03_17 AM.png",
  "/hero1/ChatGPT Image Mar 5, 2026, 01_06_54 AM.png",
  "/hero1/ChatGPT Image Mar 5, 2026, 01_08_07 AM.png",
  "/hero1/ChatGPT Image Mar 5, 2026, 01_09_25 AM.png",
];

const HeroSection = () => {
  const mouse = useMouseParallax(8);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center md:justify-start"
          style={{ x: mouse.x * 0.3, y: mouse.y * 0.3 }}
        >
          <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border border-border/50 shadow-2xl backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={heroImages[currentImageIndex]}
                alt="Pritelesh Bhowmik Nel"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
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
            Frontend Developer · Software Engineer
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Pritelesh Bhowmik Nel
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
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:scale-105 transition-all duration-300 border border-primary"
            >
              View Work
            </a>
            <a
              href="#hire"
              className="hire-pulse px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:scale-105 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
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
