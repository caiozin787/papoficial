import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Music, Gauge, Clock } from 'lucide-react';
import { AudioPlayer } from '@/components/content/AudioPlayer';
import { YoutubePlayer } from '@/components/content/YoutubePlayer';
import { PdfViewer } from '@/components/content/PdfViewer';
import { FavoriteButton } from '@/components/content/FavoriteButton';
import { getPlaybackBySlug, PLAYBACK_STYLE_LABELS } from '@/lib/playbacks';
import { CONTENT_LEVEL_LABELS, CONTENT_LEVEL_COLORS } from '@/lib/content-levels';
import { getCurrentUser } from '@/lib/auth';
import { isFavorited } from '@/lib/favorites';
import { logActivity } from '@/lib/history';

function formatDuration(seconds: number | null): string | null {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default async function PlaybackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const playback = await getPlaybackBySlug(slug);
  if (!playback || !playback.published) notFound();

  const user = await getCurrentUser();
  const favorited = user ? await isFavorited(user.id, 'playback', playback.id) : false;
  if (user) await logActivity(user.id, 'playback', playback.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/playalong" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar para Play Along
        </Link>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
            {PLAYBACK_STYLE_LABELS[playback.style]}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CONTENT_LEVEL_COLORS[playback.level]}`}>
            {CONTENT_LEVEL_LABELS[playback.level]}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{playback.title}</h1>
        <p className="text-lg text-foreground/70 mb-6">{playback.description}</p>

        <div className="flex items-center gap-6 mb-8 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-2">
            <Music className="h-4 w-4 text-primary" />
            Tom: <strong>{playback.key}</strong>
          </span>
          <span className="inline-flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" />
            <strong>{playback.bpm}</strong> BPM
          </span>
          {formatDuration(playback.duration_seconds) && (
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              {formatDuration(playback.duration_seconds)}
            </span>
          )}
        </div>

        <div className="mb-10">
          <FavoriteButton type="playback" contentId={playback.id} userId={user?.id ?? null} initialFavorited={favorited} />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Playback</h2>
            {playback.audio_url ? <AudioPlayer audioUrl={playback.audio_url} /> : <YoutubePlayer youtubeId={playback.youtube_id} />}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Cifra</h2>
            <PdfViewer pdfUrl={playback.chord_chart_url} />
          </div>
        </div>
      </div>
    </div>
  );
}
