import { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Radio, Music, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';

interface Playback {
  id: number;
  title: string;
  key: string;
  tempo: number;
  duration: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  youtubeId?: string;
}

const playbacksByStyle: Record<string, Playback[]> = {
  jazz: [
    { id: 1, title: 'Autumn Leaves', key: 'Gm', tempo: 120, duration: '3:45', difficulty: 'Intermediário', youtubeId: 'r-Z8KuwI7Gc' },
    { id: 2, title: 'All The Things You Are', key: 'Ab', tempo: 140, duration: '4:20', difficulty: 'Avançado', youtubeId: 'JPhhlWeeT4U' },
    { id: 3, title: 'Blue Bossa', key: 'Cm', tempo: 130, duration: '3:30', difficulty: 'Intermediário', youtubeId: 'VCEAPJRHqNY' },
    { id: 4, title: 'Summertime', key: 'Dm', tempo: 90, duration: '3:15', difficulty: 'Iniciante', youtubeId: 'MIDOEoNPqlE' },
    { id: 5, title: 'Take Five', key: 'Ebm', tempo: 174, duration: '5:24', difficulty: 'Avançado', youtubeId: 'vmDDOFXSgAs' },
  ],
  blues: [
    { id: 6, title: 'Blues in Bb', key: 'Bb', tempo: 120, duration: '4:00', difficulty: 'Iniciante', youtubeId: 'zfHxJHk1pV0' },
    { id: 7, title: 'Blues in F', key: 'F', tempo: 110, duration: '3:45', difficulty: 'Iniciante', youtubeId: 'Z7xQ_g74xAs' },
    { id: 8, title: 'Minor Blues in Gm', key: 'Gm', tempo: 100, duration: '4:15', difficulty: 'Intermediário', youtubeId: '3V3aJzCHJqQ' },
    { id: 9, title: 'Shuffle Blues in C', key: 'C', tempo: 140, duration: '3:30', difficulty: 'Intermediário', youtubeId: 'fKrjn23Ffbw' },
    { id: 10, title: 'Slow Blues in Eb', key: 'Eb', tempo: 70, duration: '5:00', difficulty: 'Iniciante', youtubeId: 'rY8TZkAC_RY' },
  ],
  bossa: [
    { id: 11, title: 'Girl from Ipanema', key: 'F', tempo: 125, duration: '3:50', difficulty: 'Intermediário', youtubeId: 'c5QfXjsoNe4' },
    { id: 12, title: 'Águas de Março', key: 'D', tempo: 140, duration: '3:20', difficulty: 'Avançado', youtubeId: 'E1tOV7y94DY' },
    { id: 13, title: 'Desafinado', key: 'F', tempo: 130, duration: '4:10', difficulty: 'Intermediário', youtubeId: 'bXSmXVd69TY' },
    { id: 14, title: 'Corcovado', key: 'Ab', tempo: 95, duration: '4:30', difficulty: 'Intermediário', youtubeId: 'mbNPb62r3jk' },
    { id: 15, title: 'Samba de Uma Nota Só', key: 'F', tempo: 150, duration: '3:15', difficulty: 'Iniciante', youtubeId: 'Qx6v3qSiXy8' },
  ],
  ballad: [
    { id: 16, title: 'My Funny Valentine', key: 'Cm', tempo: 60, duration: '4:45', difficulty: 'Intermediário', youtubeId: '3V3aJzCHJqQ' },
    { id: 17, title: 'Body and Soul', key: 'Db', tempo: 65, duration: '5:20', difficulty: 'Avançado', youtubeId: 'EbqE_g-ZxOE' },
    { id: 18, title: 'Misty', key: 'Eb', tempo: 70, duration: '4:00', difficulty: 'Intermediário', youtubeId: 'x94BIIcsTTA' },
    { id: 19, title: 'In a Sentimental Mood', key: 'F', tempo: 68, duration: '4:30', difficulty: 'Avançado', youtubeId: 'sCQfTNOC5aE' },
  ],
  funk: [
    { id: 20, title: 'Funk Groove in Gm', key: 'Gm', tempo: 110, duration: '4:00', difficulty: 'Intermediário', youtubeId: 'RqYxMn9sF-M' },
    { id: 21, title: 'Funky Sax in Dm', key: 'Dm', tempo: 120, duration: '3:45', difficulty: 'Intermediário', youtubeId: 'JqOi4hSry-4' },
    { id: 22, title: 'Soul Funk in Em', key: 'Em', tempo: 100, duration: '5:00', difficulty: 'Avançado', youtubeId: 'HkP4fr2K7Fo' },
  ],
  rock: [
    { id: 23, title: 'Rock Ballad in Am', key: 'Am', tempo: 85, duration: '4:20', difficulty: 'Iniciante', youtubeId: 'fKrjn23Ffbw' },
    { id: 24, title: 'Classic Rock in E', key: 'E', tempo: 130, duration: '3:30', difficulty: 'Intermediário', youtubeId: 'Z7xQ_g74xAs' },
    { id: 25, title: 'Rock Shuffle in A', key: 'A', tempo: 140, duration: '4:00', difficulty: 'Intermediário', youtubeId: 'zfHxJHk1pV0' },
  ]
};

const difficultyColors = {
  'Iniciante': 'bg-green-500/10 text-green-700 border-green-500/20',
  'Intermediário': 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  'Avançado': 'bg-red-500/10 text-red-700 border-red-500/20'
};

export function PlaybacksPage() {
  const [currentStyle, setCurrentStyle] = useState('jazz');
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [currentPlayback, setCurrentPlayback] = useState<Playback | null>(null);

  const handlePlay = (playback: Playback) => {
    if (playingId === playback.id) {
      // Se já está tocando, fecha o player
      setPlayingId(null);
      setCurrentPlayback(null);
    } else {
      // Abre o player com o novo playback
      setPlayingId(playback.id);
      setCurrentPlayback(playback);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Radio className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Playbacks Profissionais
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Explore mais de 500 playbacks em diversos estilos. Selecione o seu favorito e toque junto com a banda virtual.
            </p>
          </div>

          {/* YouTube Player Modal */}
          {currentPlayback && (
            <div className="max-w-6xl mx-auto mb-8">
              <div className="bg-card rounded-lg border border-border p-4 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-card-foreground text-lg">
                      {currentPlayback.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="font-medium">Tom: {currentPlayback.key}</span>
                      <span>•</span>
                      <span>{currentPlayback.tempo} BPM</span>
                      <span>•</span>
                      <Badge 
                        variant="outline" 
                        className={difficultyColors[currentPlayback.difficulty]}
                      >
                        {currentPlayback.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setPlayingId(null);
                      setCurrentPlayback(null);
                    }}
                    variant="ghost"
                    size="icon"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${currentPlayback.youtubeId}?autoplay=1`}
                    title={currentPlayback.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}

          {/* Style Tabs */}
          <div className="max-w-6xl mx-auto">
            <Tabs value={currentStyle} onValueChange={setCurrentStyle} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
                <TabsTrigger value="jazz">Jazz</TabsTrigger>
                <TabsTrigger value="blues">Blues</TabsTrigger>
                <TabsTrigger value="bossa">Bossa Nova</TabsTrigger>
                <TabsTrigger value="ballad">Ballads</TabsTrigger>
                <TabsTrigger value="funk">Funk/Soul</TabsTrigger>
                <TabsTrigger value="rock">Rock</TabsTrigger>
              </TabsList>

              {Object.entries(playbacksByStyle).map(([style, playbacks]) => (
                <TabsContent key={style} value={style} className="space-y-4">
                  {playbacks.map((playback) => (
                    <div
                      key={playback.id}
                      className={`bg-card rounded-lg border transition-all duration-300 p-6 shadow-sm hover:shadow-md ${
                        playingId === playback.id 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                            playingId === playback.id 
                              ? 'bg-primary text-white' 
                              : 'bg-primary/10 text-primary'
                          }`}>
                            <Music className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-card-foreground mb-1">
                              {playback.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="font-medium">Tom: {playback.key}</span>
                              <span>•</span>
                              <span>{playback.tempo} BPM</span>
                              <span>•</span>
                              <span>{playback.duration}</span>
                            </div>
                            <div className="mt-2">
                              <Badge 
                                variant="outline" 
                                className={difficultyColors[playback.difficulty]}
                              >
                                {playback.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={() => handlePlay(playback)}
                          variant={playingId === playback.id ? "secondary" : "default"}
                          className="flex-shrink-0"
                        >
                          {playingId === playback.id ? (
                            <>
                              <X className="w-4 h-4 mr-2" />
                              Fechar Player
                            </>
                          ) : (
                            <>
                              <Music className="w-4 h-4 mr-2" />
                              Abrir Player
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>

            {/* Info Box */}
            <div className="mt-8 p-6 bg-accent/5 rounded-lg border border-accent/20">
              <h3 className="font-semibold text-accent mb-2 flex items-center gap-2">
                <Music className="w-5 h-5" />
                Dica de Uso
              </h3>
              <p className="text-sm text-foreground/70">
                Clique em "Abrir Player" para tocar o playback diretamente na página. 
                Pratique junto e desenvolva sua técnica de improvisação e interpretação musical. 
                O player permanecerá fixo no topo enquanto você navega pelos outros playbacks.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}