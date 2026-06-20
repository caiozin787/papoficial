import Link from 'next/link';
import { Music2, BookOpen, BookMarked, Dumbbell, ArrowRight } from 'lucide-react';
import { Hero } from '@/components/Hero';

const features = [
  { icon: Music2, title: 'Ferramentas', description: 'Escalas, metrônomo, afinador, círculo das quintas e muito mais', href: '/ferramentas' },
  { icon: BookOpen, title: 'Teoria Musical', description: 'Fundamentos, escalas, harmonia e leitura explicados de forma direta', href: '/teoria' },
  { icon: BookMarked, title: 'Métodos', description: 'Apostilas estruturadas do iniciante ao avançado', href: '/metodos' },
  { icon: Dumbbell, title: 'Exercícios', description: 'Prática objetiva de técnica, escalas, improvisação e leitura', href: '/exercicios' },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comece a Explorar</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Acesse nossas ferramentas interativas e comece a praticar agora mesmo
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-foreground/70 mb-4">{feature.description}</p>
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
    </>
  );
}
