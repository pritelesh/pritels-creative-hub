import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Gallery", href: "#gallery" },
  { label: "Hire Me", href: "#hire" },
];

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Navbar = ({ isDark, onToggleTheme }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isGalleryPage = location.pathname === "/gallery";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    if (isGalleryPage) {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-border shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-heading text-lg font-bold tracking-tight text-foreground">
          Pritelesh<span className="text-muted-foreground">.dev</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => handleClick(l.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <Link
            to="/gallery"
            className="text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform duration-300"
          >
            Full Gallery
          </Link>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 pb-4 space-y-3">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => handleClick(l.href)}
              className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </button>
          ))}
          <Link to="/gallery" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground">
            Full Gallery
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
