import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Music, FileStack, Star } from 'lucide-react';
import { PdfViewer } from '@/components/content/PdfViewer';
import { FavoriteButton } from '@/components/content/FavoriteButton';
import { getScoreBySlug, SCORE_CATEGORY_LABELS, INSTRUMENT_LABELS, isTierScoreCategory } from '@/lib/scores';
import { CONTENT_LEVEL_LABELS, CONTENT_LEVEL_COLORS } from '@/lib/content-levels';
import { getCurrentUser } from '@/lib/auth';
import { isFavorited } from '@/lib/favorites';
import { logActivity } from '@/lib/history';

export default async function ScoreDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const score = await getScoreBySlug(slug);
  if (!score || !score.published) notFound();

  const user = await getCurrentUser();
  const favorited = user ? await isFavorited(user.id, 'score', score.id) : false;
  if (user) await logActivity(user.id, 'score', score.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/partituras" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar para Partituras
        </Link>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {!isTierScoreCategory(score.category) && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {SCORE_CATEGORY_LABELS[score.category]}
            </span>
          )}
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CONTENT_LEVEL_COLORS[score.level]}`}>
            {CONTENT_LEVEL_LABELS[score.level]}
          </span>
          {score.popular && (
            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
              <Star className="h-3 w-3 fill-current" />
              Popular
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">{score.title}</h1>
        <p className="text-lg text-foreground/70 mb-6">{score.composer}</p>

        {score.preview_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={score.preview_image_url}
            alt={score.title}
            className="w-full h-56 md:h-72 object-cover rounded-xl border border-border mb-8 shadow-sm"
          />
        )}

        <div className="flex items-center gap-6 mb-8 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-2">
            <Music className="h-4 w-4 text-primary" />
            Tom: <strong>{score.key}</strong>
          </span>
          <span>{INSTRUMENT_LABELS[score.instrument]}</span>
          {score.pages && (
            <span className="inline-flex items-center gap-2">
              <FileStack className="h-4 w-4 text-primary" />
              {score.pages} páginas
            </span>
          )}
        </div>

        <div className="mb-10">
          <FavoriteButton type="score" contentId={score.id} userId={user?.id ?? null} initialFavorited={favorited} />
        </div>

        <h2 className="text-lg font-semibold text-foreground mb-3">Visualização</h2>
        <PdfViewer pdfUrl={score.pdf_url} />
      </div>
    </div>
  );
}
