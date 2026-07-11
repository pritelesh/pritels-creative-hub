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

  const hasValidSrc = Boolean(src && src.trim());

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  const shouldShowFallback = !hasValidSrc || error || !isLoaded;

  return (
    <div className={cn("relative overflow-hidden bg-muted/10", containerClassName)}>
      {/* Placeholder / Skeleton */}
      <AnimatePresence>
        {shouldShowFallback && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-background/20 to-muted/20" />
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/70">
                Preview unavailable
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Image */}
      {hasValidSrc && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            filter: isLoaded ? "blur(0px)" : "blur(20px)",
            scale: isLoaded ? 1 : 1.05
          }}
          transition={{ 
            duration: 0.5, 
            ease: [0.4, 0, 0.2, 1] 
          }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            "w-full h-full object-cover will-change-transform",
            className
          )}
        />
      )}
    </div>
  );
};

export default BlurImage;
