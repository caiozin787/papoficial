import { Music2, Clock, Headphones, CircleDot, Repeat, Waves, Hand, Ear } from 'lucide-react';
import { ToolCard } from '@/components/ToolCard';

const tools = [
  { icon: Headphones, title: 'Afinador', description: 'Afinador cromático com detecção de frequência em tempo real via microfone.', href: '/ferramentas/afinador' },
  { icon: Clock, title: 'Metrónomo', description: 'BPM ajustável, subdivisões, compassos e acentuação.', href: '/ferramentas/metronomo' },
  { icon: Music2, title: 'Escalas Interativas', description: 'Escolha tom e escala, veja os graus e ouça a reprodução.', href: '/ferramentas/escalas' },
  { icon: CircleDot, title: 'Círculo das Quintas', description: 'Tonalidades, relativas menores e campos harmônicos interativos.', href: '/ferramentas/circulo-das-quintas' },
  { icon: Repeat, title: 'Gerador de Progressões', description: 'II-V-I, Gospel, Jazz e Pop em qualquer tom.', href: '/ferramentas/progressoes' },
  { icon: Waves, title: 'Gerador de Arpejos', description: 'Tríades, tétrades e acordes com tensões.', href: '/ferramentas/arpejos' },
  { icon: Hand, title: 'Tabela de Dedilhados', description: 'Dedilhado padrão para sax alto, tenor e soprano.', href: '/ferramentas/dedilhados' },
  { icon: Ear, title: 'Treino Auditivo', description: 'Reconhecimento de intervalos, acordes e escalas.', href: '/ferramentas/treino-auditivo' },
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Ferramentas Completas</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Tudo que você precisa para praticar, estudar e evoluir no saxofone, disponível em um só lugar.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.href} icon={tool.icon} title={tool.title} description={tool.description} badge={tool.badge} href={tool.href} />
        ))}
      </div>
    </div>
  );
}
