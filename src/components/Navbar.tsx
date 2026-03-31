import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Gallery", href: "#gallery" },
  { label: "Offer for Work", href: "#hire" },
];

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Navbar = ({ isDark, onToggleTheme }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    if (!isHomePage) {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full flex justify-center pt-4 pointer-events-none`}
    >
      <div 
        className={`max-w-6xl w-[92%] md:w-fit mx-auto px-6 flex items-center justify-between h-14 rounded-full border pointer-events-auto transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-border/50 shadow-lg shadow-black/5"
            : "bg-transparent border-transparent"
        }`}
      >
        <Link to="/" className="font-heading text-base font-bold tracking-tight text-foreground pr-8">
          Pritelesh<span className="text-muted-foreground font-light">.dev</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => handleClick(l.href)}
                  className="text-xs font-semibold px-4 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="w-[1px] h-4 bg-border/40 mx-4" />
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <button onClick={() => setOpen(!open)} className="p-2 text-foreground active:scale-90 transition-transform">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 right-6 md:hidden bg-background/95 backdrop-blur-2xl border border-border/40 p-6 rounded-[2rem] shadow-2xl pointer-events-auto space-y-2"
          >
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => handleClick(l.href)}
                className="block w-full py-3 px-4 rounded-xl text-left text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all"
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
