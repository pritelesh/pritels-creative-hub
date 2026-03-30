import { motion } from "framer-motion";
import { useMouseParallax } from "@/hooks/useFloating";
import { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

const FloatingCard = ({ children, className = "", index = 0 }: FloatingCardProps) => {
  const mouse = useMouseParallax(5);
  const floatDelay = index * 0.4;

  return (
    <motion.div
      className={`backdrop-blur-md bg-card/60 border border-border/50 rounded-2xl ${className}`}
      style={{
        x: mouse.x * (0.5 + index * 0.1),
        y: mouse.y * (0.5 + index * 0.1),
      }}
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingCard;
