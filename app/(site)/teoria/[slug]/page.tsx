import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Download, ArrowLeft, Dumbbell, Clock } from 'lucide-react';
import { TheoryCard } from '@/components/content/TheoryCard';
import { getTheoryBySlug, getRelatedTheories, getRelatedExerciseIds, THEORY_CATEGORY_LABELS } from '@/lib/theories';
import { getExercisesByIds } from '@/lib/exercises';
import { getCurrentUser } from '@/lib/auth';
import { logActivity } from '@/lib/history';
import { isCompleted } from '@/lib/progress';
import { CompleteButton } from '@/components/content/CompleteButton';

export default async function TheoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theory = await getTheoryBySlug(slug);
  if (!theory || !theory.published) notFound();

  const user = await getCurrentUser();
  if (user) await logActivity(user.id, 'theory', theory.id);
  const completed = user ? await isCompleted(user.id, 'theory', theory.id) : false;

  const related = await getRelatedTheories(theory.id);
  const relatedExerciseIds = await getRelatedExerciseIds(theory.id);
  const relatedExercises = await getExercisesByIds(relatedExerciseIds);
  const paragraphs = theory.content.split('\n\n').filter(Boolean);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/teoria" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar para Teoria Musical
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            {THEORY_CATEGORY_LABELS[theory.category]}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{theory.title}</h1>
        <p className="text-lg text-foreground/70 mb-6">{theory.description}</p>

        {theory.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={theory.cover_image_url}
            alt={theory.title}
            className="w-full h-56 md:h-72 object-cover rounded-xl border border-border mb-8 shadow-sm"
          />
        )}

        <div className="mb-6">
          <CompleteButton
            type="theory"
            contentId={theory.id}
            userId={user?.id ?? null}
            initialCompleted={completed}
            actionLabel="Marcar teoria como concluída"
            completedLabel="Teoria concluída"
          />
        </div>

        {theory.pdf_url && (
          <a
            href={theory.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-8 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Download className="h-4 w-4" />
            Baixar PDF
          </a>
        )}

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-foreground/80 leading-relaxed">{p}</p>
          ))}
        </div>

        {relatedExercises.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">Exercícios relacionados</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedExercises.map((ex) => (
                <Link
                  key={ex.id}
                  href={`/exercicios/${ex.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all"
                >
                  <Dumbbell className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-card-foreground mb-1">{ex.title}</h3>
                    <p className="text-xs text-muted-foreground">{ex.description}</p>
                    {ex.estimated_minutes && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {ex.estimated_minutes} min
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">Teorias relacionadas</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <TheoryCard key={r.id} theory={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
