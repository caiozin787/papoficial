'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Youtube, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
      PlayerState: { PLAYING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
}

let apiLoadPromise: Promise<void> | null = null;

/** Carrega o script da API do YouTube uma única vez, mesmo se vários players existirem na página. */
function loadYoutubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiLoadPromise) return apiLoadPromise;

  apiLoadPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);
  });
  return apiLoadPromise;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function YoutubePlayer({ youtubeId }: { youtubeId: string | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!youtubeId || !containerRef.current) return;
    let cancelled = false;

    loadYoutubeApi().then(() => {
      if (cancelled || !containerRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: youtubeId,
        playerVars: { controls: 0, disablekb: 1, playsinline: 1 },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: { data: number }) => setIsPlaying(e.data === window.YT!.PlayerState.PLAYING),
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      setReady(false);
      setIsPlaying(false);
      setCurrentTime(0);
    };
  }, [youtubeId]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      setCurrentTime(player.getCurrentTime());
      setDuration(player.getDuration());
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!youtubeId) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 py-10 text-center">
        <Youtube className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Áudio ainda não disponível para este conteúdo.</p>
      </div>
    );
  }

  const toggle = () => {
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCurrentTime(value);
    playerRef.current?.seekTo(value, true);
  };

  return (
    <div className="relative rounded-xl border border-border bg-card p-4 shadow-sm">
      {/* Player real do YouTube, presente na página (necessário pra tocar o áudio) mas sem exibir o vídeo. */}
      <div ref={containerRef} className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none" />

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          disabled={!ready}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors flex-shrink-0"
        >
          {!ready ? <Loader2 className="h-4 w-4 animate-spin" /> : isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.5}
            value={currentTime}
            onChange={handleSeek}
            disabled={!ready}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 text-[11px] text-muted-foreground mt-2">
        <Youtube className="h-3 w-3" />
        Áudio via YouTube
      </div>
    </div>
  );
}
