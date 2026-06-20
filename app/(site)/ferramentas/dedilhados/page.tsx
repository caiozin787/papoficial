'use client';

import { useState } from 'react';
import { Hand, Volume2 } from 'lucide-react';
import { FINGERINGS, FINGERING_INSTRUMENTS } from '@/lib/theory/fingerings';
import { buildNote } from '@/lib/theory/notes';
import { playNote } from '@/lib/audio/play-tone';

function frequencyForNote(note: string): number {
  const match = note.match(/^([A-G]b?)(\d)$/);
  if (!match) return 440;
  const [, root, octave] = match;
  return buildNote(root, 0, Number(octave)).frequency;
}

export default function FingeringChartPage() {
  const [instrument, setInstrument] = useState<(typeof FINGERING_INSTRUMENTS)[number]>(FINGERING_INSTRUMENTS[0]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <Hand className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Tabela de Dedilhados</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Dedilhado padrão (sistema Boehm) de Si♭ grave a Fá# agudo.
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {FINGERING_INSTRUMENTS.map((inst) => (
          <button
            key={inst}
            onClick={() => setInstrument(inst)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              instrument === inst ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'
            }`}
          >
            {inst}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mb-8 p-4 bg-accent/5 rounded-lg border border-accent/20">
        <p className="text-sm text-foreground/70">
          <strong className="text-accent">Importante:</strong> a digitação é a mesma para {instrument.toLowerCase()} e para os
          demais saxofones — o que muda entre eles é a nota concreta que sai do instrumento (transposição), não a
          posição dos dedos sobre as chaves.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FINGERINGS.map((fingering) => (
          <button
            key={fingering.note}
            onClick={() => playNote(frequencyForNote(fingering.note))}
            className="text-left bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xl font-bold text-primary">{fingering.note}</div>
                <div className="text-xs text-muted-foreground">{fingering.label}</div>
              </div>
              <Volume2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {fingering.octaveKey && (
                <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">8ª (octave)</span>
              )}
              {fingering.keys.map((key, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{key}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
