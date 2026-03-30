import { motion } from "framer-motion";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center justify-center w-14 h-8 rounded-full border border-border bg-card transition-colors duration-500 group"
      aria-label="Toggle theme"
    >
      {/* Lamp base / track */}
      <motion.div
        className="absolute w-6 h-6 rounded-full flex items-center justify-center"
        animate={{ x: isDark ? 10 : -10 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Bulb */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative z-10">
          {/* Bulb shape */}
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"
            fill={isDark ? "#FACC15" : "hsl(var(--muted-foreground))"}
            className="transition-all duration-500"
          />
          {/* Bulb base */}
          <rect x="9" y="19" width="6" height="1" rx="0.5" fill={isDark ? "#EAB308" : "hsl(var(--muted-foreground))"} className="transition-all duration-500" />
          <rect x="9" y="21" width="6" height="1" rx="0.5" fill={isDark ? "#EAB308" : "hsl(var(--muted-foreground))"} className="transition-all duration-500" />
        </svg>
        {/* Glow effect in dark mode */}
        {isDark && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: "radial-gradient(circle, rgba(250,204,21,0.4) 0%, transparent 70%)",
              width: 32,
              height: 32,
              left: -6,
              top: -6,
            }}
          />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
