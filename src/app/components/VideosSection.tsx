import { useState } from 'react';
import { VideoCard } from './VideoCard';
import { VideoModal } from './VideoModal';

// Vídeos reais de saxofone do YouTube
const videos = [
  {
    videoId: '9SDT5XVKiG4',
    title: 'Como Tocar Saxofone - Aula 1 para Iniciantes',
    author: 'Aprenda Saxofone',
    duration: '15:42',
  },
  {
    videoId: 'JpX2U9lf2yg',
    title: 'Escalas Pentatônicas no Saxofone Alto - Tutorial Completo',
    author: 'Sax School Brasil',
    duration: '12:18',
  },
  {
    videoId: 'kxopViU98Xo',
    title: 'Summertime - George Gershwin (Saxofone Alto)',
    author: 'Jazz Classics',
    duration: '8:30',
  },
  {
    videoId: 'TLV4_xaYynY',
    title: 'Técnicas de Respiração para Saxofonistas',
    author: 'Masterclass Sax',
    duration: '14:25',
  },
  {
    videoId: 'CXIr4gKPXCE',
    title: 'Improvisação em Blues para Saxofone - Passo a Passo',
    author: 'Blues Sax Academy',
    duration: '18:35',
  },
  {
    videoId: 'vq8G81oOHhY',
    title: 'Bossa Nova no Saxofone Tenor - Garota de Ipanema',
    author: 'Brazilian Sax',
    duration: '6:45',
  },
];

export function VideosSection() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  return (
    <>
      <section id="videos" className="py-16 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Vídeo-Aulas
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Aprenda com professores experientes através de vídeo-aulas detalhadas 
              sobre técnica, improvisação e teoria musical.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <VideoCard
                key={index}
                videoId={video.videoId}
                title={video.title}
                author={video.author}
                duration={video.duration}
                onPlay={setSelectedVideoId}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-transparent px-6 py-3 text-base font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              Ver Todos os Vídeos
            </button>
          </div>
        </div>
      </section>

      <VideoModal 
        videoId={selectedVideoId} 
        onClose={() => setSelectedVideoId(null)} 
      />
    </>
  );
}