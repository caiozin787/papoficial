import { Download, BookOpen, FileText } from 'lucide-react';

interface TheoryCardProps {
  title: string;
  description: string;
  category: string;
  color: string;
  downloadUrl?: string;
}

export function TheoryCard({ title, description, category, color, downloadUrl }: TheoryCardProps) {
  const handleDownload = () => {
    if (downloadUrl) {
      // Aqui você pode adicionar a lógica de download quando tiver os arquivos
      console.log('Download:', downloadUrl);
    } else {
      alert('Material em breve! Adicione o PDF na pasta /public/materials/');
    }
  };

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Colored Header */}
      <div
        className="h-48 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
        <BookOpen className="h-20 w-20 text-white/90 relative z-10" />

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-white">{category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
            <FileText className="h-4 w-4 text-foreground/70" />
          </button>
        </div>
      </div>
    </div>
  );
}
