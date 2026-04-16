import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { VideoCard } from '../components/VideoCard';
import { VideoModal } from '../components/VideoModal';
import { useState } from 'react';

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

export function VideosPage() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Vídeo-Aulas
            </h1>
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
            <p className="text-foreground/60">
              Novos vídeos adicionados semanalmente
            </p>
          </div>
        </div>
      </main>

      <VideoModal
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />

      <Footer />
    </div>
  );
}
