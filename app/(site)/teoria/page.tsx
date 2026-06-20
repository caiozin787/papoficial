import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { TheoryCard } from '@/components/content/TheoryCard';
import { getTheories, THEORY_CATEGORY_LABELS, type TheoryCategory } from '@/lib/theories';

const CATEGORIES: TheoryCategory[] = ['fundamentos', 'escalas', 'harmonia', 'leitura'];

export default async function TheoryPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const { categoria } = await searchParams;
  const activeCategory = CATEGORIES.includes(categoria as TheoryCategory) ? (categoria as TheoryCategory) : undefined;
  const theories = await getTheories(activeCategory);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <BookOpen className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Teoria Musical</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Material didático sobre fundamentos, escalas, harmonia e leitura musical aplicados ao saxofone.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap gap-2 justify-center">
        <Link
          href="/teoria"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !activeCategory ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'
          }`}
        >
          Todos
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/teoria?categoria=${cat}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'
            }`}
          >
            {THEORY_CATEGORY_LABELS[cat]}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {theories.map((theory) => (
          <TheoryCard key={theory.id} theory={theory} />
        ))}
      </div>

      {theories.length === 0 && (
        <p className="text-center text-muted-foreground">Nenhuma teoria encontrada nessa categoria ainda.</p>
      )}
    </div>
  );
}
