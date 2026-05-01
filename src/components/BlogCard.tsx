import { useState } from "react";
import { Play } from "lucide-react";
import BlurImage from "./BlurImage";

interface BlogCardProps {
  title: string;
  date: string;
  category: string;
  description: string;
  videoId: string; // YouTube Video ID
  thumbnail: string;
}

const BlogCard = ({
  title,
  date,
  category,
  description,
  videoId,
  thumbnail,
}: BlogCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className="flex flex-col neu-flat rounded-3xl overflow-hidden group transition-transform duration-500 hover:-translate-y-2">
      {/* Media Section */}
      <div className="relative aspect-video w-full bg-muted overflow-hidden shrink-0">
        {!isPlaying ? (
          <div className="absolute inset-0 cursor-pointer group" onClick={() => setIsPlaying(true)}>
            <BlurImage 
              src={thumbnail}
              alt={title}
              containerClassName="absolute inset-0"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transform transition-transform group-hover:scale-110">
                <Play className="text-white ml-1 w-8 h-8 fill-white" />
              </div>
            </div>
          </div>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold px-4 py-1.5 neu-pressed text-foreground rounded-full">
            {category}
          </span>
          <span className="text-sm font-medium text-muted-foreground">{date}</span>
        </div>

        <h3 className="text-2xl font-bold font-heading leading-tight mb-4 text-foreground tracking-tight">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 mb-6">
          {description}
        </p>

        <div className="mt-auto pt-4">
           <button className="w-full py-3 neu-button rounded-full text-sm font-bold uppercase tracking-widest text-foreground hover:scale-[1.02] transition-transform">
             Watch Full Project
           </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
