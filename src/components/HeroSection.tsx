import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMouseParallax } from "@/hooks/useFloating";
import BlurImage from "./BlurImage";
import { Download } from "lucide-react";

const heroImages = [
  "/hero1/hero-1.png",
  "/hero1/hero-2.png",
  "/hero1/hero-3.png",
  "/hero1/hero-4.png",
  "/hero1/hero-5.png",
  "/hero1/hero-6.png",
  "/hero1/hero-7.png",
  "/hero1/hero-8.png",
  "/hero1/hero-9.png",
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
          <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden neu-flat p-3">
             <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <BlurImage
                    key={currentImageIndex}
                    src={heroImages[currentImageIndex]}
                    alt="Pritelesh Bhowmik Nel"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    containerClassName="absolute inset-0"
                  />
                </AnimatePresence>
             </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center md:text-left mt-8 md:mt-0"
        >
          <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 opacity-80 font-bold">
            Frontend Developer · Software Engineer
          </p>
          <h1 className="heading-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[1.1] tracking-tight">
            Pritelesh Bhowmik Nel
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-4 font-bold">
            Admin & Creative Lead at <span className="text-foreground">Chobicode</span>
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-12 max-w-md mx-auto md:mx-0 opacity-90 font-medium">
            I create modern websites, engaging video content, and digital experiences using design, development, and AI tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start flex-wrap">
            <a
              href="#gallery"
              className="px-10 py-4 rounded-full neu-button text-foreground font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all duration-300 text-center"
            >
              View Work
            </a>
            <a
              href="#hire"
              className="hire-pulse px-10 py-4 rounded-full neu-button text-foreground font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all duration-300 text-center"
            >
              Hire Me
            </a>
            <a
              href="/CV-pdf/Pritelesh Bhowmik Nel - Resume.pdf.pdf"
              download="Pritelesh_Bhowmik_Nel_CV.pdf"
              className="flex items-center justify-center gap-2 px-10 py-4 rounded-full neu-button text-foreground font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all duration-300 text-center group"
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
