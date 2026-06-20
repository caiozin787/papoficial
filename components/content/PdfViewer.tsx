import { FileX, ExternalLink } from 'lucide-react';

export function PdfViewer({ pdfUrl }: { pdfUrl: string | null }) {
  if (!pdfUrl) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
        <FileX className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">PDF ainda não disponível para este conteúdo.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden shadow-lg">
      <div className="flex items-center justify-between bg-muted/50 px-4 py-2 border-b border-border">
        <span className="text-sm font-medium text-foreground">Visualização</span>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
          Abrir em nova aba
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
      <iframe src={pdfUrl} title="Visualização do PDF" className="w-full h-[600px] bg-white" />
    </div>
  );
}
