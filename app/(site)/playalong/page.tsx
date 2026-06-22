import Link from 'next/link';
import { Radio } from 'lucide-react';
import { PlaybackCard } from '@/components/content/PlaybackCard';
import { getPlaybacks, getDistinctKeys, PLAYBACK_STYLE_LABELS, TEMPO_RANGE_LABELS, type PlaybackStyle, type TempoRange } from '@/lib/playbacks';
import { CONTENT_LEVELS, CONTENT_LEVEL_LABELS, type ContentLevel } from '@/lib/content-levels';

const STYLES: PlaybackStyle[] = ['jazz', 'blues', 'gospel', 'pop', 'bossa_nova', 'soul'];
const TEMPO_RANGES: TempoRange[] = ['lento', 'medio', 'rapido'];

interface Filters {
  estilo?: string;
  nivel?: string;
  tom?: string;
  andamento?: string;
}

function buildHref(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.estilo) params.set('estilo', filters.estilo);
  if (filters.nivel) params.set('nivel', filters.nivel);
  if (filters.tom) params.set('tom', filters.tom);
  if (filters.andamento) params.set('andamento', filters.andamento);
  const qs = params.toString();
  return qs ? `/playalong?${qs}` : '/playalong';
}

export default async function PlayAlongPage({ searchParams }: { searchParams: Promise<Filters> }) {
  const { estilo, nivel, tom, andamento } = await searchParams;
  const activeStyle = STYLES.includes(estilo as PlaybackStyle) ? (estilo as PlaybackStyle) : undefined;
  const activeLevel = CONTENT_LEVELS.includes(nivel as ContentLevel) ? (nivel as ContentLevel) : undefined;
  const activeTempo = TEMPO_RANGES.includes(andamento as TempoRange) ? (andamento as TempoRange) : undefined;
  const allKeys = await getDistinctKeys();
  const activeKey = allKeys.includes(tom ?? '') ? tom : undefined;

  const playbacks = await getPlaybacks({ style: activeStyle, level: activeLevel, key: activeKey, tempoRange: activeTempo });

  const base: Filters = { estilo, nivel, tom, andamento };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <Radio className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Play Along</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Toque junto com playbacks de Jazz, Blues, Gospel, Pop e Bossa Nova.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        <Link href={buildHref({ ...base, estilo: undefined })} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeStyle ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
          Todos estilos
        </Link>
        {STYLES.map((s) => (
          <Link key={s} href={buildHref({ ...base, estilo: s })} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeStyle === s ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
            {PLAYBACK_STYLE_LABELS[s]}
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

      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        <Link href={buildHref({ ...base, andamento: undefined })} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!activeTempo ? 'bg-secondary text-secondary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
          Qualquer andamento
        </Link>
        {TEMPO_RANGES.map((t) => (
          <Link key={t} href={buildHref({ ...base, andamento: t })} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeTempo === t ? 'bg-secondary text-secondary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
            {TEMPO_RANGE_LABELS[t]}
          </Link>
        ))}
      </div>

      <div className="mb-10 flex flex-wrap gap-2 justify-center">
        <Link href={buildHref({ ...base, tom: undefined })} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!activeKey ? 'bg-secondary text-secondary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
          Todos os tons
        </Link>
        {allKeys.map((k) => (
          <Link key={k} href={buildHref({ ...base, tom: k })} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeKey === k ? 'bg-secondary text-secondary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
            {k}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {playbacks.map((playback) => (
          <PlaybackCard key={playback.id} playback={playback} />
        ))}
      </div>

      {playbacks.length === 0 && (
        <p className="text-center text-muted-foreground">Nenhum playback encontrado com esses filtros.</p>
      )}
    </div>
  );
}
