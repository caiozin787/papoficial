import { Music } from 'lucide-react';

export function AudioPlayer({ audioUrl }: { audioUrl: string | null }) {
  if (!audioUrl) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 py-10 text-center">
        <Music className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Áudio ainda não disponível para este conteúdo.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <audio controls className="w-full" src={audioUrl}>
        Seu navegador não suporta reprodução de áudio.
      </audio>
    </div>
  );
}
