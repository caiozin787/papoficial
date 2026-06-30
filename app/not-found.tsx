import Link from 'next/link';
import { Music, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background px-4">
      <div className="max-w-md text-center space-y-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <Music className="h-9 w-9 text-primary" />
          <span className="text-xl font-semibold text-foreground">Sax Tools</span>
        </Link>

        <div>
          <p className="text-7xl font-bold text-primary">404</p>
          <h1 className="text-2xl font-bold text-foreground mt-4">Página não encontrada</h1>
          <p className="text-foreground/70 mt-2">
            A página que procuras não existe ou foi movida. Verifica o endereço ou volta para o
            início.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
        >
          <Home className="h-5 w-5" />
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
