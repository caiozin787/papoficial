import Link from 'next/link';
import { Radio, Music, Gauge, Clock } from 'lucide-react';
import { PLAYBACK_STYLE_LABELS, type Playback } from '@/lib/playbacks';
import { CONTENT_LEVEL_LABELS, CONTENT_LEVEL_COLORS } from '@/lib/content-levels';

function formatDuration(seconds: number | null): string | null {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function PlaybackCard({ playback }: { playback: Playback }) {
  return (
    <Link
      href={`/playalong/${playback.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all"
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
          {PLAYBACK_STYLE_LABELS[playback.style]}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CONTENT_LEVEL_COLORS[playback.level]}`}>
          {CONTENT_LEVEL_LABELS[playback.level]}
        </span>
      </div>

      <div className="flex items-start gap-3 mb-2">
        <Radio className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <h3 className="text-base font-semibold text-card-foreground">{playback.title}</h3>
      </div>

      <p className="text-sm text-muted-foreground flex-1 mb-3">{playback.description}</p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Music className="h-3.5 w-3.5" />
          {playback.key}
        </span>
        <span className="inline-flex items-center gap-1">
          <Gauge className="h-3.5 w-3.5" />
          {playback.bpm} BPM
        </span>
        {formatDuration(playback.duration_seconds) && (
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatDuration(playback.duration_seconds)}
          </span>
        )}
      </div>
    </Link>
  );
}
