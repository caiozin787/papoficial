import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { ExerciseCard } from '@/components/content/ExerciseCard';
import { getExercises, EXERCISE_CATEGORY_LABELS, type ExerciseCategory } from '@/lib/exercises';
import { CONTENT_LEVELS, CONTENT_LEVEL_LABELS, type ContentLevel } from '@/lib/content-levels';

const CATEGORIES: ExerciseCategory[] = ['tecnica', 'escalas', 'improvisacao', 'leitura'];

function buildHref(categoria?: string, nivel?: string) {
  const params = new URLSearchParams();
  if (categoria) params.set('categoria', categoria);
  if (nivel) params.set('nivel', nivel);
  const qs = params.toString();
  return qs ? `/exercicios?${qs}` : '/exercicios';
}

export default async function ExercisesPage({ searchParams }: { searchParams: Promise<{ categoria?: string; nivel?: string }> }) {
  const { categoria, nivel } = await searchParams;
  const activeCategory = CATEGORIES.includes(categoria as ExerciseCategory) ? (categoria as ExerciseCategory) : undefined;
  const activeLevel = CONTENT_LEVELS.includes(nivel as ContentLevel) ? (nivel as ContentLevel) : undefined;
  const exercises = await getExercises({ category: activeCategory, level: activeLevel });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <Dumbbell className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Exercícios</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Prática objetiva de técnica, escalas, improvisação e leitura — passo a passo.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        <Link href={buildHref(undefined, nivel)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeCategory ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
          Todas categorias
        </Link>
        {CATEGORIES.map((cat) => (
          <Link key={cat} href={buildHref(cat, nivel)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
            {EXERCISE_CATEGORY_LABELS[cat]}
          </Link>
        ))}
      </div>

      <div className="mb-10 flex flex-wrap gap-2 justify-center">
        <Link href={buildHref(categoria, undefined)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!activeLevel ? 'bg-accent text-accent-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
          Todos níveis
        </Link>
        {CONTENT_LEVELS.map((lvl) => (
          <Link key={lvl} href={buildHref(categoria, lvl)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeLevel === lvl ? 'bg-accent text-accent-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'}`}>
            {CONTENT_LEVEL_LABELS[lvl]}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>

      {exercises.length === 0 && (
        <p className="text-center text-muted-foreground">Nenhum exercício encontrado com esses filtros.</p>
      )}
    </div>
  );
}
