'use client';

import { useRef, useState } from 'react';
import { Waves, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ALL_ROOTS } from '@/lib/theory/notes';
import { TRIAD_TYPES, SEVENTH_TYPES, EXTENDED_TYPES, buildArpeggio } from '@/lib/theory/chords';
import { playSequence } from '@/lib/audio/play-tone';

const GROUPS: { label: string; types: string[] }[] = [
  { label: 'Tríades', types: TRIAD_TYPES },
  { label: 'Tétrades', types: SEVENTH_TYPES },
  { label: 'Extensões', types: EXTENDED_TYPES },
];

export default function ArpeggiosPage() {
  const [root, setRoot] = useState('C');
  const [chordType, setChordType] = useState(TRIAD_TYPES[0]);
  const [octaves, setOctaves] = useState(1);
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const stopRef = useRef<{ stop: () => void } | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const arpeggio = buildArpeggio(root, chordType, 4, octaves);

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
    const frequencies = arpeggio.map((n) => n.frequency);
    stopRef.current = playSequence(frequencies, bpm, setActiveIndex);
    const totalMs = (frequencies.length * 60 * 1000) / bpm;
    timeoutRef.current = setTimeout(() => { setIsPlaying(false); setActiveIndex(-1); }, totalMs);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <Waves className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Gerador de Arpejos</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Tríades, tétrades e acordes com tensões — escolha a fundamental e ouça o arpejo.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">Fundamental</label>
              <Select value={root} onValueChange={(v) => { stopPlayback(); setRoot(v); }}>
                <SelectTrigger>
                  <SelectValue>{root}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {ALL_ROOTS.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">Tipo de Acorde</label>
              <Select value={chordType} onValueChange={(v) => { stopPlayback(); setChordType(v); }}>
                <SelectTrigger>
                  <SelectValue>{chordType}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {GROUPS.map((group) => (
                    <SelectGroupItems key={group.label} label={group.label} types={group.types} />
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">Oitavas</label>
              <div className="flex gap-2">
                {[1, 2].map((o) => (
                  <Button key={o} variant={octaves === o ? 'default' : 'outline'} size="sm" onClick={() => { stopPlayback(); setOctaves(o); }}>
                    {o} oitava{o > 1 ? 's' : ''}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-card-foreground">Reprodução: {bpm} BPM</label>
              <Button size="sm" variant={isPlaying ? 'destructive' : 'default'} onClick={togglePlay}>
                {isPlaying ? <><Pause className="w-4 h-4 mr-2" />Parar</> : <><Play className="w-4 h-4 mr-2" />Tocar Arpejo</>}
              </Button>
            </div>
            <Slider value={[bpm]} onValueChange={(v) => setBpm(v[0])} min={40} max={240} step={1} className="w-full" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">{root} {chordType}</h2>

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
          <div className="flex flex-wrap justify-center gap-4">
            {arpeggio.map((tone, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center w-20 h-24 rounded-lg border-2 transition-all duration-300 ${
                  activeIndex === index ? 'bg-primary border-primary scale-110' : 'bg-primary/5 border-primary/20 hover:border-primary hover:bg-primary/10'
                }`}
              >
                <div className={`text-2xl font-bold mb-1 ${activeIndex === index ? 'text-primary-foreground' : 'text-primary'}`}>{tone.name}</div>
                <div className={`text-xs ${activeIndex === index ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{tone.intervalLabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectGroupItems({ label, types }: { label: string; types: string[] }) {
  return (
    <>
      <div className="px-2 py-1.5 text-xs text-muted-foreground">{label}</div>
      {types.map((type) => (
        <SelectItem key={type} value={type}>{type}</SelectItem>
      ))}
    </>
  );
}
