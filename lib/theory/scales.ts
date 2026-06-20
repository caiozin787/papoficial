import { buildNote, type PlayableNote } from './notes';

/** Intervalos em semitons a partir da tônica. */
export const SCALE_FORMULAS: Record<string, number[]> = {
  'Maior (Jônio)': [0, 2, 4, 5, 7, 9, 11],
  'Menor Natural (Eólio)': [0, 2, 3, 5, 7, 8, 10],
  'Menor Harmônica': [0, 2, 3, 5, 7, 8, 11],
  'Menor Melódica': [0, 2, 3, 5, 7, 9, 11],
  'Pentatônica Maior': [0, 2, 4, 7, 9],
  'Pentatônica Menor': [0, 3, 5, 7, 10],
  Blues: [0, 3, 5, 6, 7, 10],
  Dórico: [0, 2, 3, 5, 7, 9, 10],
  Frígio: [0, 1, 3, 5, 7, 8, 10],
  Lídio: [0, 2, 4, 6, 7, 9, 11],
  Mixolídio: [0, 2, 4, 5, 7, 9, 10],
  Lócrio: [0, 1, 3, 5, 6, 8, 10],
};

export const SCALE_TYPES = Object.keys(SCALE_FORMULAS);

export interface ScaleDegree extends PlayableNote {
  degree: number;
}

/** Monta a escala completa (graus + nota de oitava final) com frequência real para reprodução. */
export function buildScale(root: string, scaleType: string, startOctave = 4): ScaleDegree[] {
  const intervals = SCALE_FORMULAS[scaleType] ?? SCALE_FORMULAS['Maior (Jônio)'];
  const degrees = intervals.map((interval, i) => ({
    degree: i + 1,
    ...buildNote(root, interval, startOctave),
  }));
  degrees.push({ degree: intervals.length + 1, ...buildNote(root, 12, startOctave) });
  return degrees;
}
