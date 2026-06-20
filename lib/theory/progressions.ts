import { getDiatonicChords, type DiatonicChord } from './harmonic-field';
import { buildChord, type ChordTone } from './chords';

export interface ProgressionTemplate {
  category: 'II-V-I' | 'Gospel' | 'Jazz' | 'Pop';
  name: string;
  mode: 'Maior' | 'Menor';
  /** Graus do campo harmônico, 1-indexados, podem repetir. */
  degrees: number[];
  useSeventh: boolean;
}

export const PROGRESSION_TEMPLATES: ProgressionTemplate[] = [
  { category: 'II-V-I', name: 'ii-V-I (maior)', mode: 'Maior', degrees: [2, 5, 1], useSeventh: true },
  { category: 'II-V-I', name: 'ii-V-i (menor)', mode: 'Menor', degrees: [2, 5, 1], useSeventh: true },
  { category: 'Gospel', name: 'I-vi-ii-V (turnaround)', mode: 'Maior', degrees: [1, 6, 2, 5], useSeventh: true },
  { category: 'Gospel', name: 'I-IV-I-V (hino tradicional)', mode: 'Maior', degrees: [1, 4, 1, 5], useSeventh: false },
  { category: 'Jazz', name: 'ii-V-I', mode: 'Maior', degrees: [2, 5, 1], useSeventh: true },
  { category: 'Jazz', name: 'iii-vi-ii-V', mode: 'Maior', degrees: [3, 6, 2, 5], useSeventh: true },
  { category: 'Jazz', name: 'I-vi-ii-V (rhythm changes A)', mode: 'Maior', degrees: [1, 6, 2, 5], useSeventh: true },
  { category: 'Pop', name: 'I-V-vi-IV', mode: 'Maior', degrees: [1, 5, 6, 4], useSeventh: false },
  { category: 'Pop', name: 'vi-IV-I-V', mode: 'Maior', degrees: [6, 4, 1, 5], useSeventh: false },
  { category: 'Pop', name: 'I-IV-V', mode: 'Maior', degrees: [1, 4, 5], useSeventh: false },
];

export interface ProgressionChord {
  roman: string;
  symbol: string;
  diatonic: DiatonicChord;
  tones: ChordTone[];
}

export function generateProgression(key: string, template: ProgressionTemplate): ProgressionChord[] {
  const field = getDiatonicChords(key, template.mode);
  return template.degrees.map((degree) => {
    const diatonic = field[degree - 1];
    const quality = template.useSeventh ? diatonic.seventhQuality : diatonic.triadQuality;
    const symbol = `${diatonic.root}${chordSuffix(quality)}`;
    return { roman: diatonic.roman, symbol, diatonic, tones: buildChord(diatonic.root, quality) };
  });
}

function chordSuffix(quality: string): string {
  const suffixes: Record<string, string> = {
    Maior: '', Menor: 'm', Diminuto: 'dim', Aumentado: 'aug',
    'Maior 7 (maj7)': 'maj7', 'Menor 7 (m7)': 'm7', 'Dominante 7 (7)': '7',
    'Meio-diminuto (m7b5)': 'm7b5', 'Diminuto 7 (dim7)': 'dim7', 'Menor-maior 7 (mMaj7)': 'm(maj7)',
  };
  return suffixes[quality] ?? '';
}
