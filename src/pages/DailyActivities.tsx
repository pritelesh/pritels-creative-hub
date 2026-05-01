import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import FilterSystem from "@/components/FilterSystem";
import SimpleGallery from "@/components/SimpleGallery";

// ── Blog post data ────────────────────────────────────────────────────────────
interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  videoId: string;
  thumbnail: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building an AI-Powered Landing Page",
    date: "Mar 30, 2026",
    category: "AI Websites",
    description:
      "A walkthrough of how I designed and developed a fully AI-generated landing page using modern tools and prompt engineering techniques.",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Shopify Store for a Fashion Brand",
    date: "Mar 28, 2026",
    category: "Shopify",
    description:
      "Setting up a premium Shopify theme for a clothing brand — custom sections, metafields, and a smooth checkout experience.",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "My Portfolio v3 — Design Process",
    date: "Mar 25, 2026",
    category: "Portfolio",
    description:
      "A deep dive into the design decisions behind my latest portfolio redesign — neumorphism, motion, and modern typography.",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Practicing Framer Motion Animations",
    date: "Mar 22, 2026",
    category: "Practice",
    description:
      "Daily animation practice — building scroll-triggered reveals, 3D card flips, and stagger effects with Framer Motion.",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1507238692062-5a04ce65bbde?q=80&w=2564&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "AI Chatbot UI — React + OpenAI",
    date: "Mar 20, 2026",
    category: "AI Websites",
    description:
      "Building a polished AI chat interface with streaming responses, message history, and a clean minimal UI.",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Shopify Dropshipping Store Setup",
    date: "Mar 18, 2026",
    category: "Shopify",
    description:
      "End-to-end walkthrough of setting up a dropshipping store — from niche selection to the first product launch.",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2564&auto=format&fit=crop",
  },
];

const FILTERS = ["All", "AI Websites", "Shopify", "Portfolio", "Practice"];

// ── Component ─────────────────────────────────────────────────────────────────
const DailyActivities = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesFilter =
        activeFilter === "All" || post.category === activeFilter;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--neu-bg)" }}
    >
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 w-full border-b border-foreground/5 backdrop-blur-xl bg-[var(--neu-bg)]/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-extrabold font-heading tracking-tight text-foreground">
              Daily Activities
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Build Log
            </p>
          </div>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground mb-4">
          What I Build Every Day
        </p>
        <h2 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight text-foreground mb-6 leading-tight">
          My Daily Build Log
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          A running log of everything I create, experiment with, and ship —
          websites, AI tools, Shopify stores, and daily coding practice.
        </p>
      </section>

      {/* ── Filter + Posts ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <FilterSystem
          filters={FILTERS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-xl font-medium">
              No activities found.
            </p>
            <button
              onClick={() => {
                setActiveFilter("All");
                setSearchQuery("");
              }}
              className="mt-6 px-8 py-3 rounded-full neu-button text-sm font-bold text-foreground hover:scale-105 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        )}
      </section>

      {/* ── Gallery ── */}
      <SimpleGallery />
    </div>
  );
};

export default DailyActivities;
