import { Play } from 'lucide-react';
import Link from 'next/link';
import { HeroVideo } from './HeroVideo';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent border border-accent/20">
              Recursos para Saxofonistas
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Aprimore sua técnica com{' '}
              <span className="text-primary">Sax Tools</span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl">
              A plataforma completa com ferramentas interativas, métodos, exercícios e
              playbacks para saxofonistas de todos os níveis. Pratique escalas, desenvolva
              seu ritmo e explore novos repertórios.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/ferramentas"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              >
                <Play className="h-5 w-5" />
                Começar Agora
              </Link>

              <Link
                href="/ferramentas"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary bg-transparent px-6 py-3 text-base font-medium text-primary hover:bg-primary/5 transition-colors"
              >
                Explorar Ferramentas
              </Link>
            </div>

            <div className="flex gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">8</div>
                <div className="text-sm text-foreground/60">Ferramentas</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-foreground/60">Gratuito</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">∞</div>
                <div className="text-sm text-foreground/60">Prática</div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[500px] h-[300px]">
            <HeroVideo />
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
    </section>
  );
}
