import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Footer } from '../components/Footer';
import { Music2, Video, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Music2,
    title: 'Ferramentas',
    description: 'Escalas, metrônomo, afinador, playbacks e muito mais',
    href: '/ferramentas',
  },
  {
    icon: Video,
    title: 'Vídeo-Aulas',
    description: 'Aprenda com professores experientes',
    href: '/videos',
  },
  {
    icon: MessageCircle,
    title: 'Chat de Dúvidas',
    description: 'Tire suas dúvidas diretamente com instrutores',
    href: '/chat',
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />

        {/* Quick Access Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Comece a Explorar
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Acesse nossas ferramentas, vídeo-aulas e tire suas dúvidas
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  to={feature.href}
                  className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/70 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Acessar
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
