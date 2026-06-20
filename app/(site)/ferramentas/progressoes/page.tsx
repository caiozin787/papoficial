'use client';

import { useMemo, useRef, useState } from 'react';
import { Repeat, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_ROOTS } from '@/lib/theory/notes';
import { PROGRESSION_TEMPLATES, generateProgression, type ProgressionTemplate } from '@/lib/theory/progressions';
import { playChordTones } from '@/lib/audio/play-tone';

const CATEGORIES: ProgressionTemplate['category'][] = ['II-V-I', 'Gospel', 'Jazz', 'Pop'];

export default function ProgressionsPage() {
  const [category, setCategory] = useState<ProgressionTemplate['category']>('II-V-I');
  const templatesInCategory = PROGRESSION_TEMPLATES.filter((t) => t.category === category);
  const [templateName, setTemplateName] = useState(templatesInCategory[0].name);
  const [key, setKey] = useState('C');
  const [activeChord, setActiveChord] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const template = templatesInCategory.find((t) => t.name === templateName) ?? templatesInCategory[0];
  const progression = useMemo(() => generateProgression(key, template), [key, template]);

  const handleCategoryChange = (newCategory: ProgressionTemplate['category']) => {
    setCategory(newCategory);
    const first = PROGRESSION_TEMPLATES.find((t) => t.category === newCategory);
    if (first) setTemplateName(first.name);
  };

  const stopPlayback = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setIsPlaying(false);
    setActiveChord(-1);
  };

  const playAll = () => {
    stopPlayback();
    setIsPlaying(true);
    const chordDurationMs = 900;
    progression.forEach((chord, i) => {
      const t = setTimeout(() => {
        setActiveChord(i);
        playChordTones(chord.tones.map((tone) => tone.frequency), chordDurationMs / 1000);
        if (i === progression.length - 1) {
          timeoutsRef.current.push(setTimeout(() => { setIsPlaying(false); setActiveChord(-1); }, chordDurationMs));
        }
      }, i * chordDurationMs);
      timeoutsRef.current.push(t);
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <Repeat className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Gerador de Progressões</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Gere progressões harmônicas comuns em qualquer tom: II-V-I, Gospel, Jazz e Pop.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">Progressão</label>
              <Select value={templateName} onValueChange={setTemplateName}>
                <SelectTrigger>
                  <SelectValue>{templateName}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {templatesInCategory.map((t) => (
                    <SelectItem key={t.name} value={t.name}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-card-foreground">Tom</label>
              <Select value={key} onValueChange={setKey}>
                <SelectTrigger>
                  <SelectValue>{key}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {ALL_ROOTS.map((root) => (
                    <SelectItem key={root} value={root}>{root}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">{templateName} em {key}</h2>
            <Button size="sm" variant={isPlaying ? 'destructive' : 'default'} onClick={isPlaying ? stopPlayback : playAll}>
              {isPlaying ? <><Pause className="w-4 h-4 mr-2" />Parar</> : <><Play className="w-4 h-4 mr-2" />Tocar Sequência</>}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {progression.map((chord, i) => (
              <button
                key={i}
                onClick={() => playChordTones(chord.tones.map((t) => t.frequency))}
                className={`flex flex-col items-center justify-center w-28 h-28 rounded-lg border-2 transition-all duration-200 ${
                  activeChord === i ? 'bg-primary border-primary scale-105' : 'bg-primary/5 border-primary/20 hover:border-primary hover:bg-primary/10'
                }`}
              >
                <span className={`text-xs mb-1 ${activeChord === i ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{chord.roman}</span>
                <span className={`text-2xl font-bold ${activeChord === i ? 'text-primary-foreground' : 'text-primary'}`}>{chord.symbol}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-sm text-foreground/70">
              <strong className="text-accent">💡 Dica:</strong> Toque os arpejos de cada acorde da progressão para
              treinar a transição entre eles. Use o Gerador de Arpejos para praticar cada acorde isoladamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
