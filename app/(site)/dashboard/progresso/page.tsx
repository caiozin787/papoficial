import Link from 'next/link';
import { Flame, CheckCircle2, Dumbbell, Clock } from 'lucide-react';
import { ProgressBar } from '@/components/dashboard/ProgressBar';
import { getCurrentUser } from '@/lib/auth';
import { getCompletionCounts, getPublishedContentCounts, getRecentCompletions } from '@/lib/progress';
import { getStreak } from '@/lib/streak';
import { getExercisesByIds } from '@/lib/exercises';

export default async function ProgressPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [streak, completed, total, recentExerciseCompletions] = await Promise.all([
    getStreak(user.id),
    getCompletionCounts(user.id),
    getPublishedContentCounts(),
    getRecentCompletions(user.id, 'exercise', 5),
  ]);

  const recentExercises = await getExercisesByIds(recentExerciseCompletions.map((c) => c.content_id));
  const exerciseById = new Map(recentExercises.map((e) => [e.id, e]));
  const orderedRecentExercises = recentExerciseCompletions
    .map((c) => ({ exercise: exerciseById.get(c.content_id), completedAt: c.completed_at }))
    .filter((row): row is { exercise: NonNullable<typeof row.exercise>; completedAt: string } => !!row.exercise);

  const totalCompleted = completed.theory + completed.method + completed.exercise;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Progresso</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{streak}</div>
            <div className="text-xs text-muted-foreground">dias consecutivos estudando</div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{totalCompleted}</div>
            <div className="text-xs text-muted-foreground">conteúdos concluídos no total</div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
            <Dumbbell className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{completed.exercise}</div>
            <div className="text-xs text-muted-foreground">exercícios realizados</div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-6 mb-10">
        <ProgressBar label="Teorias concluídas" completed={completed.theory} total={total.theory} />
        <ProgressBar label="Métodos concluídos" completed={completed.method} total={total.method} />
        <ProgressBar label="Exercícios realizados" completed={completed.exercise} total={total.exercise} />
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-4">Últimos exercícios realizados</h2>
      {orderedRecentExercises.length === 0 ? (
        <p className="text-muted-foreground">Nenhum exercício concluído ainda — marque um exercício como realizado para vê-lo aqui.</p>
      ) : (
        <div className="space-y-3">
          {orderedRecentExercises.map(({ exercise, completedAt }) => (
            <Link
              key={exercise.id}
              href={`/exercicios/${exercise.slug}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-700 flex-shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-card-foreground">{exercise.title}</p>
                <p className="text-xs text-muted-foreground">{exercise.subcategory}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {new Date(completedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
