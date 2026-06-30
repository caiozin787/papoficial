import { Award, Users, Music, Target, Heart, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
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
                Ser a plataforma de referência para saxofonistas, oferecendo as melhores
                ferramentas e recursos para aprendizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/home/hero-video-poster.png"
                  alt="Equipe Sax Tools"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Uma plataforma pensada para a sua evolução
              </h2>
              <p className="text-lg text-foreground/70">
                Combinamos tecnologia moderna com metodologias comprovadas de ensino musical.
                Cada ferramenta é cuidadosamente desenvolvida por quem entende as necessidades
                reais dos estudantes de saxofone.
              </p>
              <p className="text-base text-foreground/70">
                Nossa equipe é composta por saxofonistas, professores e desenvolvedores
                apaixonados por música, trabalhando para criar a melhor experiência de
                aprendizado possível.
              </p>
            </div>
          </div>
        </div>
      </section>

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
            {[
              { icon: Award, title: 'Metodologia Comprovada', desc: 'Técnicas validadas por professores e músicos profissionais' },
              { icon: Users, title: 'Comunidade Ativa', desc: 'Construindo um espaço para músicos compartilharem experiências' },
              { icon: Music, title: 'Atualização Constante', desc: 'Novas ferramentas e conteúdos adicionados regularmente' },
              { icon: Target, title: 'Foco no Saxofone', desc: 'Ferramentas especializadas desenvolvidas especificamente para saxofonistas' },
              { icon: Heart, title: 'Suporte Dedicado', desc: 'Equipe pronta para ajudar você em cada etapa da sua jornada musical' },
              { icon: Sparkles, title: 'Tecnologia de Ponta', desc: 'Plataforma moderna, rápida e acessível em qualquer dispositivo' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
