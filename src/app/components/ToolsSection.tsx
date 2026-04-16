import { Music2, Clock, Radio, Download, BookOpen, Headphones } from 'lucide-react';
import { ToolCard } from './ToolCard';

const tools = [
  {
    icon: Music2,
    title: 'Escalas Interativas',
    description: 'Pratique escalas maiores, menores, pentatônicas e modos com visualização de digitação.',
    badge: 'Popular'
  },
  {
    icon: Clock,
    title: 'Metrônomo Pro',
    description: 'Metrônomo digital com subdivisões, acentos personalizáveis e tempos compostos.',
  },
  {
    icon: Radio,
    title: 'Playbacks',
    description: 'Mais de 500 playbacks profissionais em diversos estilos: jazz, blues, bossa nova e mais.',
    badge: 'Novo'
  },
  {
    icon: Download,
    title: 'Partituras',
    description: 'Biblioteca de partituras para saxofone com diferentes níveis de dificuldade.',
  },
  {
    icon: BookOpen,
    title: 'Teoria Musical',
    description: 'Exercícios de harmonia, análise de acordes e progressões para saxofonistas.',
  },
  {
    icon: Headphones,
    title: 'Afinador',
    description: 'Afinador cromático preciso com análise visual de frequência em tempo real.',
  },
];

export function ToolsSection() {
  return (
    <section id="ferramentas" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ferramentas Completas
          </h2>
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
