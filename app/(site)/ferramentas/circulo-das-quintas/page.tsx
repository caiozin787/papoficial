'use client';

import { useState } from 'react';
import { CircleDot, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CIRCLE_OF_FIFTHS, accidentalsLabel } from '@/lib/theory/circle-of-fifths';
import { getDiatonicChords } from '@/lib/theory/harmonic-field';
import { buildChord } from '@/lib/theory/chords';
import { playChordTones } from '@/lib/audio/play-tone';

const RADIUS = 160;

export default function CircleOfFifthsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = CIRCLE_OF_FIFTHS[selectedIndex];
  const diatonicChords = getDiatonicChords(selected.major, 'Maior');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <CircleDot className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Círculo das Quintas</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Selecione uma tonalidade para ver sua relativa, os acidentes e o campo harmônico.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="relative" style={{ width: RADIUS * 2 + 80, height: RADIUS * 2 + 80 }}>
          {CIRCLE_OF_FIFTHS.map((key, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const x = RADIUS * Math.cos(angle);
            const y = RADIUS * Math.sin(angle);
            const isSelected = index === selectedIndex;
            return (
              <button
                key={key.major}
                onClick={() => setSelectedIndex(index)}
                className={`absolute flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-200 -translate-x-1/2 -translate-y-1/2 ${
                  isSelected ? 'bg-primary border-primary text-primary-foreground scale-110 shadow-lg' : 'bg-card border-border hover:border-primary/50'
                }`}
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
              >
                <span className="text-lg font-bold">{key.major}</span>
                <span className="text-[10px] opacity-70">{key.minor}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-xl border border-border p-6 shadow-lg mb-6">
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{selected.major}</div>
              <div className="text-sm text-muted-foreground mt-1">Tom Maior</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">{selected.minor}</div>
              <div className="text-sm text-muted-foreground mt-1">Relativa Menor</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{accidentalsLabel(selected.accidentals)}</div>
              <div className="text-sm text-muted-foreground mt-1">Armadura de clave</div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
          <h3 className="font-semibold text-card-foreground mb-4">Campo Harmônico de {selected.major} Maior</h3>
          <div className="grid sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {diatonicChords.map((chord) => (
              <button
                key={chord.degree}
                onClick={() => playChordTones(buildChord(chord.root, chord.triadQuality).map((t) => t.frequency))}
                className="group flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-border bg-primary/5 hover:border-primary hover:bg-primary/10 transition-all p-3"
              >
                <span className="text-xs text-muted-foreground">{chord.roman}</span>
                <span className="text-base font-bold text-primary">{chord.root}{chord.triadQuality === 'Menor' ? 'm' : chord.triadQuality === 'Diminuto' ? 'dim' : ''}</span>
                <Play className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
