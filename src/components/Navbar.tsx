import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Gallery", href: "#gallery" },
  { label: "Hire Me", href: "#hire" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isGalleryPage = location.pathname === "/gallery";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-heading text-lg font-bold tracking-tight text-foreground">
          Pritelash<span className="text-muted-foreground">.dev</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
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
          <li>
            <Link
              to="/gallery"
              className="text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform duration-300"
            >
              Full Gallery
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-4 space-y-3">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => handleClick(l.href)}
              className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </button>
          ))}
          <Link
            to="/gallery"
            onClick={() => setOpen(false)}
            className="block text-sm font-medium text-foreground"
          >
            Full Gallery
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
