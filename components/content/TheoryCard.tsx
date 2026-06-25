import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { THEORY_CATEGORY_LABELS, type Theory } from '@/lib/theories';

export function TheoryCard({ theory }: { theory: Theory }) {
  return (
    <Link
      href={`/teoria/${theory.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/50 transition-all"
    >
      {theory.card_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={theory.card_image_url} alt={theory.title} className="h-32 w-full object-cover" />
      )}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            {THEORY_CATEGORY_LABELS[theory.category]}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-card-foreground mb-2">{theory.title}</h3>
        <p className="text-sm text-muted-foreground flex-1">{theory.description}</p>
        <div className="mt-4 text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          Ler mais
          <span className="transition-all">→</span>
        </div>
      </div>
    </Link>
  );
}
