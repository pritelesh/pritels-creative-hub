import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMouseParallax } from "@/hooks/useFloating";
import BlurImage from "./BlurImage";
import { Download } from "lucide-react";

const heroImages = [
  "/hero1/ChatGPT Image Feb 17, 2026, 06_19_34 PM.png",
  "/hero1/ChatGPT Image Feb 18, 2026, 01_57_45 AM.png",
  "/hero1/ChatGPT Image Feb 18, 2026, 12_21_52 AM.png",
  "/hero1/ChatGPT Image Feb 18, 2026, 12_49_31 AM.png",
  "/hero1/ChatGPT Image Feb 25, 2026, 11_22_31 PM.png",
  "/hero1/ChatGPT Image Feb 25, 2026, 11_37_29 PM.png",
  "/hero1/ChatGPT Image Mar 5, 2026, 01_03_17 AM.png",
  "/hero1/ChatGPT Image Mar 5, 2026, 01_06_54 AM.png",
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
              <BlurImage
                key={currentImageIndex}
                src={heroImages[currentImageIndex]}
                alt="Pritelesh Bhowmik Nel"
                className="absolute inset-0 w-full h-full object-cover object-top"
                containerClassName="absolute inset-0"
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
          className="text-center md:text-left mt-8 md:mt-0"
        >
          <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 opacity-80">
            Frontend Developer · Software Engineer
          </p>
          <h1 className="heading-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[1.1] tracking-tight">
            Pritelesh Bhowmik Nel
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-4 font-medium">
            Admin & Creative Lead at <span className="text-foreground">Chobicode</span>
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto md:mx-0 opacity-90">
            I create modern websites, engaging video content, and digital experiences using design, development, and AI tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start flex-wrap">
            <a
              href="#gallery"
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300 border border-primary text-center shadow-lg shadow-primary/20"
            >
              View Work
            </a>
            <a
              href="#hire"
              className="hire-pulse px-8 py-4 rounded-full border border-border text-foreground font-bold text-xs uppercase tracking-widest hover:scale-105 hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-center"
            >
              Hire Me
            </a>
            <a
              href="/CV-pdf/Pritelesh Bhowmik Nel - Resume.pdf.pdf"
              download="Pritelesh_Bhowmik_Nel_CV.pdf"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-primary/60 text-primary font-bold text-xs uppercase tracking-widest hover:scale-105 hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-center shadow-md shadow-primary/10 group"
            >
              <Download size={14} className="group-hover:animate-bounce" />
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
