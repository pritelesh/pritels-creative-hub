import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  threshold?: number;
}

const BlurImage = ({ 
  src, 
  alt, 
  className, 
  containerClassName,
  threshold = 0.5 
}: BlurImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-muted/10", containerClassName)}>
      {/* Placeholder / Skeleton */}
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full h-full bg-secondary/20 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/10 text-muted-foreground text-xs font-medium uppercase tracking-widest">
          Failed to load
        </div>
      )}

      {/* Main Image */}
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          filter: isLoaded ? "blur(0px)" : "blur(20px)",
          scale: isLoaded ? 1 : 1.1
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.4, 0, 0.2, 1] 
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "w-full h-full object-cover",
          className,
          !isLoaded && "invisible" // Hide until browser starts rendering to prevent "halfs"
        )}
        style={{
          // Visibility toggle to help browser optimizations if needed
          visibility: isLoaded ? "visible" : "visible",
        }}
      />
    </div>
  );
};

export default BlurImage;
