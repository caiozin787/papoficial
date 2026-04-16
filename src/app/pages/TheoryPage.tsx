import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TheoryCard } from '../components/TheoryCard';
import { BookOpen, Filter } from 'lucide-react';
import { useState } from 'react';

const theoryMaterials = [
  {
    title: 'Intervalos Musicais',
    description: 'Aprenda sobre intervalos maiores, menores, aumentados e diminutos. Essencial para harmonia.',
    category: 'Fundamentos',
    color: '#D97706', // amber-600
  },
  {
    title: 'Escalas Maiores',
    description: 'Construção e aplicação das escalas maiores. Padrões de tons e semitons.',
    category: 'Escalas',
    color: '#059669', // emerald-600
  },
  {
    title: 'Escalas Menores',
    description: 'Escalas menores natural, harmônica e melódica. Diferenças e usos.',
    category: 'Escalas',
    color: '#0891B2', // cyan-600
  },
  {
    title: 'Modos Gregos',
    description: 'Jônico, Dórico, Frígio, Lídio, Mixolídio, Eólio e Lócrio explicados.',
    category: 'Escalas',
    color: '#7C3AED', // violet-600
  },
  {
    title: 'Formação de Acordes',
    description: 'Como construir tríades e tétrades. Acordes maiores, menores e diminutos.',
    category: 'Harmonia',
    color: '#DC2626', // red-600
  },
  {
    title: 'Progressões Harmônicas',
    description: 'Progressões comuns: I-IV-V, II-V-I e outras. Análise harmônica.',
    category: 'Harmonia',
    color: '#EA580C', // orange-600
  },
  {
    title: 'Notas de Tensão',
    description: '9ª, 11ª, 13ª e suas aplicações em acordes estendidos.',
    category: 'Harmonia',
    color: '#0D9488', // teal-600
  },
  {
    title: 'Cifras e Símbolos',
    description: 'Leitura de cifras americanas e símbolos harmônicos usados no jazz.',
    category: 'Leitura',
    color: '#4F46E5', // indigo-600
  },
  {
    title: 'Fórmulas de Compasso',
    description: 'Compassos simples, compostos e irregulares. Como ler e executar.',
    category: 'Ritmo',
    color: '#DB2777', // pink-600
  },
  {
    title: 'Articulações',
    description: 'Staccato, legato, marcato e outras articulações para saxofone.',
    category: 'Técnica',
    color: '#65A30D', // lime-600
  },
  {
    title: 'Transposição',
    description: 'Como transpor melodias para diferentes tonalidades. Essencial para saxofonistas.',
    category: 'Fundamentos',
    color: '#0284C7', // sky-600
  },
  {
    title: 'Improvisação Blues',
    description: 'Escalas blues, blue notes e frases características do blues.',
    category: 'Improvisação',
    color: '#7C2D12', // orange-900
  },
];

const categories = ['Todos', 'Fundamentos', 'Escalas', 'Harmonia', 'Ritmo', 'Leitura', 'Técnica', 'Improvisação'];

export function TheoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredMaterials =
    selectedCategory === 'Todos'
      ? theoryMaterials
      : theoryMaterials.filter((material) => material.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Teoria Musical
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Material didático completo sobre teoria musical aplicada ao saxofone.
              Baixe os PDFs e estude no seu ritmo.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2 text-foreground/70">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filtrar por:</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-foreground/70 hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Materials Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMaterials.map((material, index) => (
              <TheoryCard
                key={index}
                title={material.title}
                description={material.description}
                category={material.category}
                color={material.color}
              />
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-12 max-w-3xl mx-auto p-6 bg-secondary/20 border border-border rounded-xl">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Como adicionar seus materiais
            </h3>
            <p className="text-sm text-foreground/70 mb-3">
              Para adicionar seus PDFs de teoria musical ao site:
            </p>
            <ol className="text-sm text-foreground/70 space-y-2 ml-4 list-decimal">
              <li>Crie uma pasta chamada <code className="px-2 py-1 bg-muted rounded text-primary">public/materials</code> na raiz do projeto</li>
              <li>Adicione seus arquivos PDF com nomes descritivos (ex: intervalos-musicais.pdf)</li>
              <li>Atualize o arquivo <code className="px-2 py-1 bg-muted rounded text-primary">TheoryPage.tsx</code> adicionando o campo <code className="px-2 py-1 bg-muted rounded text-primary">downloadUrl</code> em cada material</li>
              <li>Exemplo: <code className="px-2 py-1 bg-muted rounded text-primary">downloadUrl: '/materials/intervalos-musicais.pdf'</code></li>
            </ol>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
