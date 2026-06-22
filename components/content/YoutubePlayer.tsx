import { Youtube } from 'lucide-react';

export function YoutubePlayer({ youtubeId }: { youtubeId: string | null }) {
  if (!youtubeId) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 py-10 text-center">
        <Youtube className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Vídeo ainda não disponível para este conteúdo.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-2 shadow-sm overflow-hidden">
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="Vídeo do YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
