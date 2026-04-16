import { Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent border border-accent/20">
              Recursos para Saxofonistas
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Aprimore sua técnica com{' '}
              <span className="text-primary">Sax Tools</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl">
              A plataforma completa com ferramentas interativas, playbacks profissionais e 
              vídeo-aulas para saxofonistas de todos os níveis. Pratique escalas, desenvolva 
              seu ritmo e explore novos repertórios.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl">
                <Play className="h-5 w-5" />
                Começar Agora
              </button>
              
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary bg-transparent px-6 py-3 text-base font-medium text-primary hover:bg-primary/5 transition-colors">
                Explorar Ferramentas
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-foreground/60">Playbacks</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-foreground/60">Vídeo-aulas</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-foreground/60">Usuários</div>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative lg:h-[500px] h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl shadow-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center mx-auto border-4 border-primary/30">
                    <Play className="h-12 w-12 md:h-16 md:w-16 text-primary" fill="currentColor" />
                  </div>
                  <p className="text-sm md:text-base text-foreground/60 font-medium">
                    Assista ao vídeo de introdução
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
    </section>
  );
}
