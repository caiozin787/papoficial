import Link from 'next/link';
import { FileText, Star, Music } from 'lucide-react';
import { SCORE_CATEGORY_LABELS, INSTRUMENT_LABELS, isTierScoreCategory, type Score } from '@/lib/scores';
import { CONTENT_LEVEL_LABELS, CONTENT_LEVEL_COLORS } from '@/lib/content-levels';

export function ScoreCard({ score }: { score: Score }) {
  return (
    <Link
      href={`/partituras/${score.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/50 transition-all"
    >
      {score.popular && (
        <div className="absolute top-3 right-3 z-10 rounded-full bg-accent p-1.5 shadow-md" title="Partitura popular">
          <Star className="h-3.5 w-3.5 text-accent-foreground fill-current" />
        </div>
      )}

      {score.preview_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={score.preview_image_url} alt={score.title} className="h-32 w-full object-cover" />
      )}

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {!isTierScoreCategory(score.category) && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {SCORE_CATEGORY_LABELS[score.category]}
            </span>
          )}
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CONTENT_LEVEL_COLORS[score.level]}`}>
            {CONTENT_LEVEL_LABELS[score.level]}
          </span>
        </div>

        <div className="flex items-start gap-3 mb-2">
          <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-base font-semibold text-card-foreground">{score.title}</h3>
            <p className="text-xs text-muted-foreground">{score.composer}</p>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground pt-3">
          <span className="inline-flex items-center gap-1">
            <Music className="h-3.5 w-3.5" />
            {score.key}
          </span>
          <span>{INSTRUMENT_LABELS[score.instrument]}</span>
          {score.pages && <span>{score.pages} pág.</span>}
        </div>
      </div>
    </Link>
  );
}
