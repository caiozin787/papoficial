import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ToolCard } from '../components/ToolCard';
import { Music2, Clock, Radio, Download, BookOpen, Headphones } from 'lucide-react';

const tools = [
  {
    icon: Music2,
    title: 'Escalas Interativas',
    description: 'Pratique escalas maiores, menores, pentatônicas e modos com visualização de digitação.',
    badge: 'Popular',
    href: '/ferramentas/escalas'
  },
  {
    icon: Clock,
    title: 'Metrônomo Pro',
    description: 'Metrônomo digital com subdivisões, acentos personalizáveis e tempos compostos.',
    href: '/ferramentas/metronomo'
  },
  {
    icon: Radio,
    title: 'Playbacks',
    description: 'Mais de 500 playbacks profissionais em diversos estilos: jazz, blues, bossa nova e mais.',
    badge: 'Novo',
    href: '/ferramentas/playbacks'
  },
  {
    icon: Download,
    title: 'Partituras',
    description: 'Biblioteca de partituras para saxofone com diferentes níveis de dificuldade.',
    href: '/ferramentas/partituras'
  },
  {
    icon: BookOpen,
    title: 'Teoria Musical',
    description: 'Material didático completo sobre harmonia, escalas e progressões. Baixe PDFs e estude.',
    href: '/teoria',
  },
  {
    icon: Headphones,
    title: 'Afinador',
    description: 'Afinador cromático preciso com análise visual de frequência em tempo real.',
    href: '/ferramentas/afinador'
  },
];

export function ToolsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ferramentas Completas
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Tudo que você precisa para praticar, estudar e evoluir no saxofone,
              disponível em um só lugar.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <ToolCard
                key={index}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                badge={tool.badge}
                href={tool.href}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}