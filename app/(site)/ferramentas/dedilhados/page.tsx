'use client';

import { useState } from 'react';
import { Hand, Volume2 } from 'lucide-react';
import { FINGERINGS } from '@/lib/theory/fingerings';
import { ALL_ROOTS, rootToIndex, midiFromRootOctave, frequencyFromMidi } from '@/lib/theory/notes';
import { SAX_INSTRUMENTS, TRANSPOSITION_SEMITONES, type SaxInstrument } from '@/lib/theory/transposition';
import { playNote } from '@/lib/audio/play-tone';

function parseWrittenNote(note: string): { root: string; octave: number } | null {
  const match = note.match(/^([A-G][b#]?)(\d)$/);
  if (!match) return null;
  return { root: match[1], octave: Number(match[2]) };
}

function concertFrequencyForNote(note: string, instrument: SaxInstrument): number {
  const parsed = parseWrittenNote(note);
  if (!parsed) return 440;
  const writtenMidi = midiFromRootOctave(rootToIndex(parsed.root), parsed.octave);
  return frequencyFromMidi(writtenMidi - TRANSPOSITION_SEMITONES[instrument]);
}

function concertNameForNote(note: string, instrument: SaxInstrument): string {
  const parsed = parseWrittenNote(note);
  if (!parsed) return note;
  const writtenMidi = midiFromRootOctave(rootToIndex(parsed.root), parsed.octave);
  const concertMidi = writtenMidi - TRANSPOSITION_SEMITONES[instrument];
  const concertOctave = Math.floor(concertMidi / 12) - 1;
  const concertPitchClass = ALL_ROOTS[((concertMidi % 12) + 12) % 12];
  return `${concertPitchClass}${concertOctave}`;
}

export default function FingeringChartPage() {
  const [instrument, setInstrument] = useState<SaxInstrument>(SAX_INSTRUMENTS[0]);

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
        {SAX_INSTRUMENTS.map((inst) => (
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
          posição dos dedos sobre as chaves. O som de cada carta já está na afinação certa do {instrument.toLowerCase()}.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FINGERINGS.map((fingering) => (
          <button
            key={fingering.note}
            onClick={() => playNote(concertFrequencyForNote(fingering.note, instrument))}
            className="text-left bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xl font-bold text-primary">{fingering.note}</div>
                <div className="text-xs text-muted-foreground">{fingering.label}</div>
                <div className="text-xs text-muted-foreground/70 mt-0.5">
                  soa como {concertNameForNote(fingering.note, instrument)}
                </div>
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
