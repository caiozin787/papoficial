import { Play, Clock } from 'lucide-react';

interface VideoCardProps {
  videoId: string;
  title: string;
  author: string;
  duration: string;
  thumbnail?: string;
  onPlay: (videoId: string) => void;
}

export function VideoCard({ videoId, title, author, duration, thumbnail, onPlay }: VideoCardProps) {
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="group rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onPlay(videoId)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xl hover:scale-110"
          >
            <Play className="h-8 w-8 ml-1" fill="currentColor" />
          </button>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
          <Clock className="h-3 w-3" />
          {duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{author}</p>
        
        <button
          onClick={() => onPlay(videoId)}
          className="mt-2 w-full rounded-lg border border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Assistir
        </button>
      </div>
    </div>
  );
}
