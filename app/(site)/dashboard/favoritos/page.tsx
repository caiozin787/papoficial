import { MethodCard } from '@/components/content/MethodCard';
import { ExerciseCard } from '@/components/content/ExerciseCard';
import { PlaybackCard } from '@/components/content/PlaybackCard';
import { ScoreCard } from '@/components/content/ScoreCard';
import { getCurrentUser } from '@/lib/auth';
import { getFavoriteIds } from '@/lib/favorites';
import { getMethodsByIds } from '@/lib/methods';
import { getExercisesByIds } from '@/lib/exercises';
import { getPlaybacksByIds } from '@/lib/playbacks';
import { getScoresByIds } from '@/lib/scores';

export default async function FavoritesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [methodIds, exerciseIds, playbackIds, scoreIds] = await Promise.all([
    getFavoriteIds(user.id, 'method'),
    getFavoriteIds(user.id, 'exercise'),
    getFavoriteIds(user.id, 'playback'),
    getFavoriteIds(user.id, 'score'),
  ]);

  const [methods, exercises, playbacks, scores] = await Promise.all([
    getMethodsByIds(methodIds),
    getExercisesByIds(exerciseIds),
    getPlaybacksByIds(playbackIds),
    getScoresByIds(scoreIds),
  ]);

  const hasAny = methods.length + exercises.length + playbacks.length + scores.length > 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Favoritos</h1>

      {!hasAny && <p className="text-muted-foreground">Você ainda não favoritou nada. Explore os módulos e clique em "Favoritar".</p>}

      {methods.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4">Métodos</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {methods.map((m) => <MethodCard key={m.id} method={m} />)}
          </div>
        </section>
      )}

      {exercises.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4">Exercícios</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exercises.map((e) => <ExerciseCard key={e.id} exercise={e} />)}
          </div>
        </section>
      )}

      {playbacks.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4">Play Along</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {playbacks.map((p) => <PlaybackCard key={p.id} playback={p} />)}
          </div>
        </section>
      )}

      {scores.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4">Partituras</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {scores.map((s) => <ScoreCard key={s.id} score={s} />)}
          </div>
        </section>
      )}
    </div>
  );
}
