import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookMarked, User } from 'lucide-react';
import { PdfViewer } from '@/components/content/PdfViewer';
import { FavoriteButton } from '@/components/content/FavoriteButton';
import { getMethodBySlug, METHOD_CATEGORY_LABELS, isTierCategory } from '@/lib/methods';
import { CONTENT_LEVEL_LABELS, CONTENT_LEVEL_COLORS } from '@/lib/content-levels';
import { getCurrentUser } from '@/lib/auth';
import { isFavorited } from '@/lib/favorites';
import { logActivity } from '@/lib/history';
import { isCompleted } from '@/lib/progress';
import { CompleteButton } from '@/components/content/CompleteButton';

export default async function MethodDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const method = await getMethodBySlug(slug);
  if (!method || !method.published) notFound();

  const user = await getCurrentUser();
  const favorited = user ? await isFavorited(user.id, 'method', method.id) : false;
  const completed = user ? await isCompleted(user.id, 'method', method.id) : false;
  if (user) await logActivity(user.id, 'method', method.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/metodos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar para Métodos
        </Link>

        <div className="grid md:grid-cols-[240px_1fr] gap-8 mb-10">
          <div className="aspect-[4/3] md:aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
            {method.cover_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={method.cover_image_url} alt={method.title} className="h-full w-full object-cover" />
            ) : (
              <BookMarked className="h-12 w-12 text-primary/60" />
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {!isTierCategory(method.category) && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  {METHOD_CATEGORY_LABELS[method.category]}
                </span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CONTENT_LEVEL_COLORS[method.level]}`}>
                {CONTENT_LEVEL_LABELS[method.level]}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{method.title}</h1>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <User className="h-4 w-4" />
              {method.author}
            </div>

            <p className="text-lg text-foreground/70 mb-6">{method.description}</p>

            <div className="mt-auto flex flex-wrap gap-3">
              <FavoriteButton type="method" contentId={method.id} userId={user?.id ?? null} initialFavorited={favorited} />
              <CompleteButton
                type="method"
                contentId={method.id}
                userId={user?.id ?? null}
                initialCompleted={completed}
                actionLabel="Marcar método como concluído"
                completedLabel="Método concluído"
              />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-4">Visualização online</h2>
        <PdfViewer pdfUrl={method.pdf_url} />
      </div>
    </div>
  );
}
