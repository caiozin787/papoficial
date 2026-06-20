import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Target, Clock, Wrench } from 'lucide-react';
import { PdfViewer } from '@/components/content/PdfViewer';
import { AudioPlayer } from '@/components/content/AudioPlayer';
import { FavoriteButton } from '@/components/content/FavoriteButton';
import { CompleteButton } from '@/components/content/CompleteButton';
import { getExerciseBySlug, EXERCISE_CATEGORY_LABELS } from '@/lib/exercises';
import { CONTENT_LEVEL_LABELS, CONTENT_LEVEL_COLORS } from '@/lib/content-levels';
import { getCurrentUser } from '@/lib/auth';
import { isFavorited } from '@/lib/favorites';
import { logActivity } from '@/lib/history';
import { isCompleted } from '@/lib/progress';

export default async function ExerciseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exercise = await getExerciseBySlug(slug);
  if (!exercise || !exercise.published) notFound();

  const user = await getCurrentUser();
  const favorited = user ? await isFavorited(user.id, 'exercise', exercise.id) : false;
  const completed = user ? await isCompleted(user.id, 'exercise', exercise.id) : false;
  if (user) await logActivity(user.id, 'exercise', exercise.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/exercicios" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar para Exercícios
        </Link>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
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

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{exercise.title}</h1>

        <div className="mb-8 flex flex-wrap gap-3">
          <FavoriteButton type="exercise" contentId={exercise.id} userId={user?.id ?? null} initialFavorited={favorited} />
          <CompleteButton
            type="exercise"
            contentId={exercise.id}
            userId={user?.id ?? null}
            initialCompleted={completed}
            actionLabel="Marcar exercício como realizado"
            completedLabel="Exercício realizado"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-card rounded-xl border border-border p-5">
            <Target className="h-5 w-5 text-primary mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Objetivo</div>
            <p className="text-sm text-foreground/80">{exercise.description}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <Clock className="h-5 w-5 text-primary mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Tempo estimado</div>
            <p className="text-sm text-foreground/80">{exercise.estimated_minutes ? `${exercise.estimated_minutes} minutos` : 'Não informado'}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <Wrench className="h-5 w-5 text-primary mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Material necessário</div>
            <p className="text-sm text-foreground/80">{exercise.materials_needed ?? 'Não informado'}</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Áudio de apoio</h2>
            <AudioPlayer audioUrl={exercise.audio_url} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Material em PDF</h2>
            <PdfViewer pdfUrl={exercise.pdf_url} />
          </div>
        </div>
      </div>
    </div>
  );
}
