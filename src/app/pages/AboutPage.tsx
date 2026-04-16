import { Award, Users, Music, Target, Heart, Sparkles } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-secondary/20 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 mb-6">
                Nossa História
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Criado por saxofonistas, para saxofonistas
              </h1>
              <p className="text-lg md:text-xl text-foreground/70">
                Sax Tools nasceu da paixão pela música e da necessidade de recursos práticos e 
                acessíveis para estudantes e profissionais do saxofone.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">Nossa Missão</h3>
                <p className="text-foreground/70">
                  Democratizar o acesso a ferramentas de qualidade e conteúdo educacional de 
                  alto nível para saxofonistas de todos os níveis.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">Nossos Valores</h3>
                <p className="text-foreground/70">
                  Excelência musical, acessibilidade, comunidade e paixão pela educação são 
                  os pilares que guiam cada decisão que tomamos.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">Nossa Visão</h3>
                <p className="text-foreground/70">
                  Ser a plataforma de referência mundial para saxofonistas, oferecendo as 
                  melhores ferramentas e recursos para aprendizado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-20 bg-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              {/* Image Placeholder */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <div className="text-center space-y-4 p-8">
                      <div className="w-32 h-32 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center mx-auto border-4 border-primary/30">
                        <Music className="h-16 w-16 text-primary" />
                      </div>
                      <p className="text-base text-foreground/60 font-medium">
                        Equipe Sax Tools
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Uma jornada de 15 anos de dedicação
                </h2>
                
                <p className="text-lg text-foreground/70">
                  Fundado em 2019 por músicos com mais de 15 anos de experiência no ensino e 
                  performance, o projeto já ajudou milhares de saxofonistas a evoluírem em sua 
                  jornada musical.
                </p>

                <p className="text-base text-foreground/70">
                  Combinamos tecnologia moderna com metodologias comprovadas de ensino musical. 
                  Cada ferramenta, playback e vídeo-aula é cuidadosamente desenvolvido por 
                  profissionais experientes que entendem as necessidades reais dos estudantes.
                </p>

                <p className="text-base text-foreground/70">
                  Nossa equipe é composta por saxofonistas profissionais, professores renomados 
                  e desenvolvedores apaixonados por música. Juntos, trabalhamos incansavelmente 
                  para criar a melhor experiência de aprendizado possível.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground mt-1">Playbacks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground mt-1">Vídeo-aulas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary">10k+</div>
                    <div className="text-sm text-muted-foreground mt-1">Usuários</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Values */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                O que nos torna especiais
              </h2>
              <p className="text-lg text-foreground/70">
                Características que diferenciam o Sax Tools de outras plataformas
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">Metodologia Comprovada</h4>
                  <p className="text-sm text-muted-foreground">
                    Técnicas validadas por professores e músicos profissionais com décadas de experiência
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">Comunidade Ativa</h4>
                  <p className="text-sm text-muted-foreground">
                    Mais de 10 mil músicos compartilhando experiências, dicas e aprendizado
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 text-accent flex-shrink-0">
                  <Music className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">Atualização Constante</h4>
                  <p className="text-sm text-muted-foreground">
                    Novos playbacks, exercícios e conteúdos adicionados semanalmente
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">Foco no Saxofone</h4>
                  <p className="text-sm text-muted-foreground">
                    Ferramentas especializadas desenvolvidas especificamente para saxofonistas
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 text-accent flex-shrink-0">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">Suporte Dedicado</h4>
                  <p className="text-sm text-muted-foreground">
                    Equipe pronta para ajudar você em cada etapa da sua jornada musical
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">Tecnologia de Ponta</h4>
                  <p className="text-sm text-muted-foreground">
                    Plataforma moderna, rápida e acessível em qualquer dispositivo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
