import { buildNote, type PlayableNote } from './notes';

/** Fórmulas de acordes em semitons a partir da fundamental. */
export const CHORD_FORMULAS: Record<string, number[]> = {
  // Tríades
  Maior: [0, 4, 7],
  Menor: [0, 3, 7],
  Diminuto: [0, 3, 6],
  Aumentado: [0, 4, 8],
  // Tétrades
  'Maior 7 (maj7)': [0, 4, 7, 11],
  'Menor 7 (m7)': [0, 3, 7, 10],
  'Dominante 7 (7)': [0, 4, 7, 10],
  'Meio-diminuto (m7b5)': [0, 3, 6, 10],
  'Diminuto 7 (dim7)': [0, 3, 6, 9],
  'Menor-maior 7 (mMaj7)': [0, 3, 7, 11],
  // Com tensões (extensões)
  'Dominante 9 (9)': [0, 4, 7, 10, 14],
  'Maior 9 (maj9)': [0, 4, 7, 11, 14],
  'Menor 9 (m9)': [0, 3, 7, 10, 14],
  'Dominante 11 (11)': [0, 4, 7, 10, 14, 17],
  'Dominante 13 (13)': [0, 4, 7, 10, 14, 17, 21],
};

export const TRIAD_TYPES = ['Maior', 'Menor', 'Diminuto', 'Aumentado'];
export const SEVENTH_TYPES = [
  'Maior 7 (maj7)',
  'Menor 7 (m7)',
  'Dominante 7 (7)',
  'Meio-diminuto (m7b5)',
  'Diminuto 7 (dim7)',
  'Menor-maior 7 (mMaj7)',
];
export const EXTENDED_TYPES = ['Dominante 9 (9)', 'Maior 9 (maj9)', 'Menor 9 (m9)', 'Dominante 11 (11)', 'Dominante 13 (13)'];

export interface ChordTone extends PlayableNote {
  intervalLabel: string;
}

const INTERVAL_LABELS: Record<number, string> = {
  0: '1', 3: 'b3', 4: '3', 6: 'b5', 7: '5', 8: '#5', 9: '6/13',
  10: 'b7', 11: '7', 14: '9', 17: '11', 21: '13',
};

export function buildChord(root: string, chordType: string, startOctave = 4): ChordTone[] {
  const intervals = CHORD_FORMULAS[chordType] ?? CHORD_FORMULAS.Maior;
  return intervals.map((interval) => ({
    ...buildNote(root, interval, startOctave),
    intervalLabel: INTERVAL_LABELS[interval] ?? `${interval}`,
  }));
}

/** Acorde estendido tocado como arpejo, repetindo a fundamental uma oitava acima ao final. */
export function buildArpeggio(root: string, chordType: string, startOctave = 4, octaves = 1): ChordTone[] {
  const base = buildChord(root, chordType, startOctave);
  const result: ChordTone[] = [];
  for (let o = 0; o < octaves; o++) {
    for (const tone of base) {
      result.push({ ...tone, midi: tone.midi + 12 * o, frequency: tone.frequency * Math.pow(2, o) });
    }
  }
  const last = base[0];
  result.push({ ...last, midi: last.midi + 12 * octaves, frequency: last.frequency * Math.pow(2, octaves) });
  return result;
}
