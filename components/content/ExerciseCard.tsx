import Link from 'next/link';
import { Dumbbell, Clock } from 'lucide-react';
import { EXERCISE_CATEGORY_LABELS, type Exercise } from '@/lib/exercises';
import { CONTENT_LEVEL_LABELS, CONTENT_LEVEL_COLORS } from '@/lib/content-levels';

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link
      href={`/exercicios/${exercise.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all"
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
          {EXERCISE_CATEGORY_LABELS[exercise.category]}
        </span>
        {exercise.subcategory && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-foreground/70 font-medium">
            {exercise.subcategory}
          </span>
        )}
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CONTENT_LEVEL_COLORS[exercise.level]}`}>
          {CONTENT_LEVEL_LABELS[exercise.level]}
        </span>
      </div>

      <div className="flex items-start gap-3 mb-2">
        <Dumbbell className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <h3 className="text-base font-semibold text-card-foreground">{exercise.title}</h3>
      </div>

      <p className="text-sm text-muted-foreground flex-1">{exercise.description}</p>

      {exercise.estimated_minutes && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {exercise.estimated_minutes} min
        </div>
      )}
    </Link>
  );
}
