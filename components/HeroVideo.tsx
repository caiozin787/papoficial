'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

const VIDEO_URL = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/videos/home/hero-video.mp4';
const POSTER_URL = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/images/home/hero-video-poster.png';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    videoRef.current?.play();
    setPlaying(true);
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl shadow-2xl overflow-hidden">
      {!playing && (
        <img
          src={POSTER_URL}
          alt="Pré-visualização do vídeo"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        controls={playing}
        playsInline
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className={`h-full w-full object-contain${playing ? '' : ' invisible'}`}
      />
      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Reproduzir vídeo"
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center border-4 border-primary/40">
            <Play className="h-12 w-12 md:h-16 md:w-16 text-white" fill="currentColor" />
          </div>
        </button>
      )}
    </div>
  );
}
