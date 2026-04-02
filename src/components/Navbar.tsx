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
      className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 w-full flex justify-center pt-4 pointer-events-none`}
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

        <div className="flex items-center gap-4 md:hidden">
          <div className="scale-110">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
          <button 
            onClick={() => setOpen(!open)} 
            className="p-3 text-foreground active:scale-90 transition-transform bg-foreground/5 rounded-full"
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 left-4 right-4 md:hidden bg-background/99 backdrop-blur-3xl border border-border/60 p-8 rounded-[2.5rem] shadow-2xl pointer-events-auto space-y-4"
          >
            <div className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => handleClick(l.href)}
                className="block w-full py-4 px-6 rounded-2xl text-left text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all border border-transparent hover:border-border/40"
              >
                {l.label}
              </button>
            ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
