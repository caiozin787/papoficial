import { noteNameFromIndex, rootToIndex, isFlatKey } from './notes';

/** Graus do campo harmônico maior e relativo menor natural, com tríade e tétrade. */
const MAJOR_DEGREES = [
  { roman: 'I', interval: 0, triad: 'Maior', seventh: 'Maior 7 (maj7)' },
  { roman: 'ii', interval: 2, triad: 'Menor', seventh: 'Menor 7 (m7)' },
  { roman: 'iii', interval: 4, triad: 'Menor', seventh: 'Menor 7 (m7)' },
  { roman: 'IV', interval: 5, triad: 'Maior', seventh: 'Maior 7 (maj7)' },
  { roman: 'V', interval: 7, triad: 'Maior', seventh: 'Dominante 7 (7)' },
  { roman: 'vi', interval: 9, triad: 'Menor', seventh: 'Menor 7 (m7)' },
  { roman: 'vii°', interval: 11, triad: 'Diminuto', seventh: 'Meio-diminuto (m7b5)' },
];

const MINOR_DEGREES = [
  { roman: 'i', interval: 0, triad: 'Menor', seventh: 'Menor 7 (m7)' },
  { roman: 'ii°', interval: 2, triad: 'Diminuto', seventh: 'Meio-diminuto (m7b5)' },
  { roman: 'III', interval: 3, triad: 'Maior', seventh: 'Maior 7 (maj7)' },
  { roman: 'iv', interval: 5, triad: 'Menor', seventh: 'Menor 7 (m7)' },
  { roman: 'v', interval: 7, triad: 'Menor', seventh: 'Menor 7 (m7)' },
  { roman: 'VI', interval: 8, triad: 'Maior', seventh: 'Maior 7 (maj7)' },
  { roman: 'VII', interval: 10, triad: 'Maior', seventh: 'Dominante 7 (7)' },
];

export interface DiatonicChord {
  degree: number;
  roman: string;
  root: string;
  triadQuality: string;
  seventhQuality: string;
}

export function getDiatonicChords(root: string, mode: 'Maior' | 'Menor' = 'Maior'): DiatonicChord[] {
  const rootIndex = rootToIndex(root);
  const preferFlats = isFlatKey(root);
  const degrees = mode === 'Maior' ? MAJOR_DEGREES : MINOR_DEGREES;

  return degrees.map((d, i) => ({
    degree: i + 1,
    roman: d.roman,
    root: noteNameFromIndex(rootIndex + d.interval, preferFlats),
    triadQuality: d.triad,
    seventhQuality: d.seventh,
  }));
}
