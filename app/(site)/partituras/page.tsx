import Link from 'next/link';
import { FileText, Search } from 'lucide-react';
import { ScoreCard } from '@/components/content/ScoreCard';
import { getScores, SCORE_CATEGORY_LABELS, INSTRUMENT_LABELS, type ScoreCategory, type Instrument } from '@/lib/scores';
import { CONTENT_LEVELS, CONTENT_LEVEL_LABELS, type ContentLevel } from '@/lib/content-levels';

const CATEGORIES: ScoreCategory[] = ['iniciante', 'intermediario', 'avancado', 'jazz', 'gospel', 'estudos'];
const INSTRUMENTS: Instrument[] = ['sax_alto', 'sax_tenor', 'sax_soprano', 'sax_baritono'];

interface Filters {
  categoria?: string;
  nivel?: string;
  instrumento?: string;
  busca?: string;
}

function buildHref(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.categoria) params.set('categoria', filters.categoria);
  if (filters.nivel) params.set('nivel', filters.nivel);
  if (filters.instrumento) params.set('instrumento', filters.instrumento);
  if (filters.busca) params.set('busca', filters.busca);
  const qs = params.toString();
  return qs ? `/partituras?${qs}` : '/partituras';
}

export default async function ScoresPage({ searchParams }: { searchParams: Promise<Filters> }) {
  const { categoria, nivel, instrumento, busca } = await searchParams;
  const activeCategory = CATEGORIES.includes(categoria as ScoreCategory) ? (categoria as ScoreCategory) : undefined;
  const activeLevel = CONTENT_LEVELS.includes(nivel as ContentLevel) ? (nivel as ContentLevel) : undefined;
  const activeInstrument = INSTRUMENTS.includes(instrumento as Instrument) ? (instrumento as Instrument) : undefined;

  const scores = await getScores({ category: activeCategory, level: activeLevel, instrument: activeInstrument, search: busca });
  const base: Filters = { categoria, nivel, instrumento, busca };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <FileText className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Partituras</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Biblioteca organizada de partituras para saxofone, com visualização online.
        </p>
      </div>

      <form action="/partituras" method="get" className="max-w-md mx-auto mb-8 relative">
        {categoria && <input type="hidden" name="categoria" value={categoria} />}
        {nivel && <input type="hidden" name="nivel" value={nivel} />}
        {instrumento && <input type="hidden" name="instrumento" value={instrumento} />}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          name="busca"
          defaultValue={busca ?? ''}
          placeholder="Buscar por título ou compositor..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </form>

      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        <Link href={buildHref({ ...base, categoria: undefined })} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeCategory ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
          Todas categorias
        </Link>
        {CATEGORIES.map((cat) => (
          <Link key={cat} href={buildHref({ ...base, categoria: cat })} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
            {SCORE_CATEGORY_LABELS[cat]}
          </Link>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        <Link href={buildHref({ ...base, nivel: undefined })} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!activeLevel ? 'bg-accent text-accent-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
          Todos níveis
        </Link>
        {CONTENT_LEVELS.map((lvl) => (
          <Link key={lvl} href={buildHref({ ...base, nivel: lvl })} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeLevel === lvl ? 'bg-accent text-accent-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
            {CONTENT_LEVEL_LABELS[lvl]}
          </Link>
        ))}
      </div>

      <div className="mb-10 flex flex-wrap gap-2 justify-center">
        <Link href={buildHref({ ...base, instrumento: undefined })} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!activeInstrument ? 'bg-secondary text-secondary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
          Todos instrumentos
        </Link>
        {INSTRUMENTS.map((inst) => (
          <Link key={inst} href={buildHref({ ...base, instrumento: inst })} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeInstrument === inst ? 'bg-secondary text-secondary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
            {INSTRUMENT_LABELS[inst]}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {scores.map((score) => (
          <ScoreCard key={score.id} score={score} />
        ))}
      </div>

      {scores.length === 0 && (
        <p className="text-center text-muted-foreground">Nenhuma partitura encontrada com esses filtros.</p>
      )}
    </div>
  );
}
