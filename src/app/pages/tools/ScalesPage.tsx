import { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Music2, Play, Pause } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Slider } from '../../components/ui/slider';

interface Note {
  name: string;
  finger: string;
}

const scalesData: Record<string, Record<string, Note[]>> = {
  'C': {
    'Maior': [
      { name: 'C', finger: '0' },
      { name: 'D', finger: '1' },
      { name: 'E', finger: '2' },
      { name: 'F', finger: '3' },
      { name: 'G', finger: '4' },
      { name: 'A', finger: '5' },
      { name: 'B', finger: '6' },
      { name: 'C', finger: '7' }
    ],
    'Menor Natural': [
      { name: 'C', finger: '0' },
      { name: 'D', finger: '1' },
      { name: 'Eb', finger: '2' },
      { name: 'F', finger: '3' },
      { name: 'G', finger: '4' },
      { name: 'Ab', finger: '5' },
      { name: 'Bb', finger: '6' },
      { name: 'C', finger: '7' }
    ],
    'Pentatônica': [
      { name: 'C', finger: '0' },
      { name: 'D', finger: '1' },
      { name: 'E', finger: '2' },
      { name: 'G', finger: '4' },
      { name: 'A', finger: '5' },
      { name: 'C', finger: '7' }
    ],
    'Dórico': [
      { name: 'C', finger: '0' },
      { name: 'D', finger: '1' },
      { name: 'Eb', finger: '2' },
      { name: 'F', finger: '3' },
      { name: 'G', finger: '4' },
      { name: 'A', finger: '5' },
      { name: 'Bb', finger: '6' },
      { name: 'C', finger: '7' }
    ],
    'Mixolídio': [
      { name: 'C', finger: '0' },
      { name: 'D', finger: '1' },
      { name: 'E', finger: '2' },
      { name: 'F', finger: '3' },
      { name: 'G', finger: '4' },
      { name: 'A', finger: '5' },
      { name: 'Bb', finger: '6' },
      { name: 'C', finger: '7' }
    ]
  },
  'G': {
    'Maior': [
      { name: 'G', finger: '0' },
      { name: 'A', finger: '1' },
      { name: 'B', finger: '2' },
      { name: 'C', finger: '3' },
      { name: 'D', finger: '4' },
      { name: 'E', finger: '5' },
      { name: 'F#', finger: '6' },
      { name: 'G', finger: '7' }
    ],
    'Menor Natural': [
      { name: 'G', finger: '0' },
      { name: 'A', finger: '1' },
      { name: 'Bb', finger: '2' },
      { name: 'C', finger: '3' },
      { name: 'D', finger: '4' },
      { name: 'Eb', finger: '5' },
      { name: 'F', finger: '6' },
      { name: 'G', finger: '7' }
    ],
    'Pentatônica': [
      { name: 'G', finger: '0' },
      { name: 'A', finger: '1' },
      { name: 'B', finger: '2' },
      { name: 'D', finger: '4' },
      { name: 'E', finger: '5' },
      { name: 'G', finger: '7' }
    ]
  },
  'D': {
    'Maior': [
      { name: 'D', finger: '0' },
      { name: 'E', finger: '1' },
      { name: 'F#', finger: '2' },
      { name: 'G', finger: '3' },
      { name: 'A', finger: '4' },
      { name: 'B', finger: '5' },
      { name: 'C#', finger: '6' },
      { name: 'D', finger: '7' }
    ],
    'Pentatônica': [
      { name: 'D', finger: '0' },
      { name: 'E', finger: '1' },
      { name: 'F#', finger: '2' },
      { name: 'A', finger: '4' },
      { name: 'B', finger: '5' },
      { name: 'D', finger: '7' }
    ]
  },
  'F': {
    'Maior': [
      { name: 'F', finger: '0' },
      { name: 'G', finger: '1' },
      { name: 'A', finger: '2' },
      { name: 'Bb', finger: '3' },
      { name: 'C', finger: '4' },
      { name: 'D', finger: '5' },
      { name: 'E', finger: '6' },
      { name: 'F', finger: '7' }
    ],
    'Pentatônica': [
      { name: 'F', finger: '0' },
      { name: 'G', finger: '1' },
      { name: 'A', finger: '2' },
      { name: 'C', finger: '4' },
      { name: 'D', finger: '5' },
      { name: 'F', finger: '7' }
    ]
  }
};

const keys = ['C', 'D', 'F', 'G'];
const scaleTypes = ['Maior', 'Menor Natural', 'Pentatônica', 'Dórico', 'Mixolídio'];

export function ScalesPage() {
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedType, setSelectedType] = useState('Maior');
  const [bpm, setBpm] = useState([120]);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentScale = scalesData[selectedKey]?.[selectedType] || scalesData['C']['Maior'];
  const availableTypes = Object.keys(scalesData[selectedKey] || {});

  return (
    <div className="min-h-screen">
      <Header />

      <main className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Music2 className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Escalas Interativas
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Escolha uma escala para praticar. Visualize a digitação e pratique com o auxílio do metrônomo.
            </p>
          </div>

          {/* Controls */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-card-foreground">Tonalidade</label>
                  <Select value={selectedKey} onValueChange={setSelectedKey}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {keys.map((key) => (
                        <SelectItem key={key} value={key}>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-card-foreground">Tipo de Escala</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Metronome */}
              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-card-foreground">
                    Metrônomo: {bpm[0]} BPM
                  </label>
                  <Button
                    size="sm"
                    variant={isPlaying ? "destructive" : "default"}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Parar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Iniciar
                      </>
                    )}
                  </Button>
                </div>
                <Slider
                  value={bpm}
                  onValueChange={setBpm}
                  min={40}
                  max={240}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Scale Visualization */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Escala de {selectedKey} {selectedType}
            </h2>
            
            <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
              <div className="flex flex-wrap justify-center gap-4">
                {currentScale.map((note, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center w-20 h-24 rounded-lg bg-primary/5 border-2 border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    <div className="text-2xl font-bold text-primary mb-1">
                      {note.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Dedo {note.finger}
                    </div>
                  </div>
                ))}
              </div>

              {/* Practice Tips */}
              <div className="mt-8 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <h3 className="font-semibold text-accent mb-2">💡 Dica de Prática</h3>
                <p className="text-sm text-foreground/70">
                  Comece devagar e aumente gradualmente o BPM. Pratique primeiro em movimento ascendente,
                  depois descendente, e finalmente em padrões variados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
