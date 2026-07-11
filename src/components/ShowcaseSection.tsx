import WorkShowcasePanels from "./WorkShowcasePanels";

interface ShowcaseProject {
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
}

const projects: ShowcaseProject[] = [
  {
    title: "E-Commerce Platform Redesign",
    description: "A complete overhaul of a legacy e-commerce platform using Next.js and TailwindCSS.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    category: "Full Stack",
    link: "#"
  },
  {
    title: "AI Image Generator",
    description: "A fun experimental app that generates images from text using the OpenAI API.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    category: "AI",
    link: "#"
  },
  {
    title: "SaaS Dashboard",
    description: "A complex data visualization dashboard for a leading B2B SaaS company.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    category: "UI/UX",
    link: "#"
  },
  {
    title: "Crypto Wallet App",
    description: "A secure and intuitive mobile-first crypto wallet application interface with real-time charts.",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2564&auto=format&fit=crop",
    category: "Mobile",
    link: "#"
  }
];

const ShowcaseSection = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--neu-bg)] py-24 md:py-36">
      <div className="mx-auto mb-16 w-full max-w-7xl px-6 text-center md:mb-20 md:px-12">
        <div className="mb-4 flex items-center justify-center gap-3 text-muted-foreground">
          <div className="h-[1px] w-10 bg-muted-foreground/30" />
          <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Featured Projects</p>
          <div className="h-[1px] w-10 bg-muted-foreground/30" />
        </div>
        <h2 className="mb-6 text-5xl font-heading font-extrabold tracking-tighter text-foreground md:text-7xl">
          Featured Work<span className="text-primary/50">.</span>
        </h2>
        <p className="mx-auto max-w-2xl text-xl leading-relaxed font-medium text-muted-foreground opacity-80 md:text-2xl">
          Handpicked highlights from my most impactful digital builds.
        </p>
      </div>

      <WorkShowcasePanels projects={projects} />
    </section>
  );
};

export default ShowcaseSection;
