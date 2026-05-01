import BlurImage from "./BlurImage";

interface GalleryItem {
  id: string;
  image: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  { id: "1", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", alt: "Project 1" },
  { id: "2", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop", alt: "Project 2" },
  { id: "3", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", alt: "Project 3" },
  { id: "4", image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2564&auto=format&fit=crop", alt: "Project 4" },
  { id: "5", image: "https://images.unsplash.com/photo-1507238692062-5a04ce65bbde?q=80&w=2564&auto=format&fit=crop", alt: "Project 5" },
  { id: "6", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop", alt: "Project 6" },
];

const SimpleGallery = () => {
  return (
    <section className="py-24 bg-[var(--neu-bg)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold mb-4 tracking-tight">Gallery</h2>
          <p className="text-muted-foreground text-lg">A selection of project snapshots and creative experiments.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {galleryItems.map((item) => (
            <div key={item.id} className="relative aspect-square overflow-hidden rounded-[2rem] neu-flat group">
              <BlurImage 
                src={item.image}
                alt={item.alt}
                containerClassName="absolute inset-0"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimpleGallery;
