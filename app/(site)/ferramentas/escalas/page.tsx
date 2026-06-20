'use client';

import { useRef, useState } from 'react';
import { Music2, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ALL_ROOTS } from '@/lib/theory/notes';
import { SCALE_TYPES, buildScale } from '@/lib/theory/scales';
import { playSequence } from '@/lib/audio/play-tone';

export default function ScalesPage() {
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedType, setSelectedType] = useState(SCALE_TYPES[0]);
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const stopRef = useRef<{ stop: () => void } | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentScale = buildScale(selectedKey, selectedType);

  const stopPlayback = () => {
    stopRef.current?.stop();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsPlaying(false);
    setActiveIndex(-1);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }
    setIsPlaying(true);
    const frequencies = currentScale.map((n) => n.frequency);
    stopRef.current = playSequence(frequencies, bpm, setActiveIndex);
    const totalMs = (frequencies.length * 60 * 1000) / bpm;
    timeoutRef.current = setTimeout(() => {
      setIsPlaying(false);
      setActiveIndex(-1);
    }, totalMs);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <Music2 className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Escalas Interativas</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Escolha uma escala, ouça a reprodução e visualize os graus para praticar.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">Tonalidade</label>
              <Select value={selectedKey} onValueChange={(v) => { stopPlayback(); setSelectedKey(v); }}>
                <SelectTrigger>
                  <SelectValue>{selectedKey}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {ALL_ROOTS.map((key) => (
                    <SelectItem key={key} value={key}>{key}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">Tipo de Escala</label>
              <Select value={selectedType} onValueChange={(v) => { stopPlayback(); setSelectedType(v); }}>
                <SelectTrigger>
                  <SelectValue>{selectedType}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {SCALE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-card-foreground">Reprodução: {bpm} BPM</label>
              <Button size="sm" variant={isPlaying ? 'destructive' : 'default'} onClick={togglePlay}>
                {isPlaying ? <><Pause className="w-4 h-4 mr-2" />Parar</> : <><Play className="w-4 h-4 mr-2" />Tocar Escala</>}
              </Button>
            </div>
            <Slider value={[bpm]} onValueChange={(v) => setBpm(v[0])} min={40} max={240} step={1} className="w-full" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
          Escala de {selectedKey} {selectedType}
        </h2>

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
          <div className="flex flex-wrap justify-center gap-4">
            {currentScale.map((note, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center w-20 h-24 rounded-lg border-2 transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-primary border-primary scale-110'
                    : 'bg-primary/5 border-primary/20 hover:border-primary hover:bg-primary/10'
                }`}
              >
                <div className={`text-2xl font-bold mb-1 ${activeIndex === index ? 'text-primary-foreground' : 'text-primary'}`}>
                  {note.name}
                </div>
                <div className={`text-xs ${activeIndex === index ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  Grau {note.degree}
                </div>
              </div>
            ))}
          </div>

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
  );
}
