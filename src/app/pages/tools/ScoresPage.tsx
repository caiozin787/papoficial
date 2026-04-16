import { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Download, FileText, Search, Star } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface Score {
  id: number;
  title: string;
  composer: string;
  style: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  pages: number;
  popular?: boolean;
}

const scores: Score[] = [
  { id: 1, title: 'Girl from Ipanema', composer: 'Tom Jobim', style: 'Bossa Nova', difficulty: 'Intermediário', pages: 2, popular: true },
  { id: 2, title: 'Summertime', composer: 'George Gershwin', style: 'Jazz', difficulty: 'Iniciante', pages: 2, popular: true },
  { id: 3, title: 'Careless Whisper', composer: 'George Michael', style: 'Pop', difficulty: 'Intermediário', pages: 3, popular: true },
  { id: 4, title: 'Take Five', composer: 'Dave Brubeck', style: 'Jazz', difficulty: 'Avançado', pages: 4 },
  { id: 5, title: 'Autumn Leaves', composer: 'Joseph Kosma', style: 'Jazz', difficulty: 'Intermediário', pages: 2, popular: true },
  { id: 6, title: 'Desafinado', composer: 'Tom Jobim', style: 'Bossa Nova', difficulty: 'Intermediário', pages: 3 },
  { id: 7, title: 'What a Wonderful World', composer: 'Louis Armstrong', style: 'Jazz', difficulty: 'Iniciante', pages: 2 },
  { id: 8, title: 'My Funny Valentine', composer: 'Rodgers & Hart', style: 'Ballad', difficulty: 'Intermediário', pages: 2 },
  { id: 9, title: 'Blue Bossa', composer: 'Kenny Dorham', style: 'Jazz', difficulty: 'Intermediário', pages: 2 },
  { id: 10, title: 'Fly Me to the Moon', composer: 'Bart Howard', style: 'Jazz', difficulty: 'Iniciante', pages: 2 },
  { id: 11, title: 'All of Me', composer: 'Gerald Marks', style: 'Jazz', difficulty: 'Intermediário', pages: 3 },
  { id: 12, title: 'Águas de Março', composer: 'Tom Jobim', style: 'Bossa Nova', difficulty: 'Avançado', pages: 4 },
  { id: 13, title: 'Baker Street', composer: 'Gerry Rafferty', style: 'Rock', difficulty: 'Intermediário', pages: 3, popular: true },
  { id: 14, title: 'Corcovado', composer: 'Tom Jobim', style: 'Bossa Nova', difficulty: 'Intermediário', pages: 2 },
  { id: 15, title: 'Beyond the Sea', composer: 'Charles Trenet', style: 'Jazz', difficulty: 'Iniciante', pages: 2 },
  { id: 16, title: 'Giant Steps', composer: 'John Coltrane', style: 'Jazz', difficulty: 'Avançado', pages: 3 },
  { id: 17, title: 'Misty', composer: 'Erroll Garner', style: 'Ballad', difficulty: 'Intermediário', pages: 2 },
  { id: 18, title: 'Pink Panther Theme', composer: 'Henry Mancini', style: 'Jazz', difficulty: 'Iniciante', pages: 2 },
];

const difficultyColors = {
  'Iniciante': 'bg-green-500/10 text-green-700 border-green-500/20',
  'Intermediário': 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  'Avançado': 'bg-red-500/10 text-red-700 border-red-500/20'
};

export function ScoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredScores = scores.filter(score => {
    const matchesSearch = score.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         score.composer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         score.style.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || score.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleDownload = (score: Score) => {
    alert(`Download da partitura "${score.title}" iniciado!\n\nEsta é uma demonstração. Na versão completa, o PDF seria baixado automaticamente.`);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Biblioteca de Partituras
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Acesse nossa biblioteca de partituras para saxofone. Selecione o nível e a peça para começar sua prática.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar por título, compositor ou estilo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Difficulty Tabs */}
          <div className="max-w-6xl mx-auto">
            <Tabs value={selectedDifficulty} onValueChange={setSelectedDifficulty} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="Iniciante">Iniciante</TabsTrigger>
                <TabsTrigger value="Intermediário">Intermediário</TabsTrigger>
                <TabsTrigger value="Avançado">Avançado</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedDifficulty} className="space-y-4">
                {filteredScores.length === 0 ? (
                  <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Nenhuma partitura encontrada com os filtros selecionados.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredScores.map((score) => (
                      <div
                        key={score.id}
                        className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-card-foreground mb-1 flex items-center gap-2">
                              {score.title}
                              {score.popular && (
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-1">
                              {score.composer}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {score.style}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <Badge 
                            variant="outline" 
                            className={difficultyColors[score.difficulty]}
                          >
                            {score.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {score.pages} {score.pages === 1 ? 'página' : 'páginas'}
                          </span>
                        </div>

                        <Button
                          onClick={() => handleDownload(score)}
                          className="w-full"
                          variant="outline"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Baixar PDF
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Info Box */}
            <div className="mt-8 p-6 bg-accent/5 rounded-lg border border-accent/20">
              <h3 className="font-semibold text-accent mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Como usar
              </h3>
              <p className="text-sm text-foreground/70">
                Baixe as partituras em PDF e pratique no seu próprio ritmo. As partituras estão organizadas 
                por nível de dificuldade para facilitar sua progressão. Para iniciantes, recomendamos começar 
                com peças mais simples e gradualmente aumentar o desafio.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
