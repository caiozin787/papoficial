export const CHROMATIC_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const CHROMATIC_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

/** 12 tonalidades usadas nos seletores de ferramenta — grafia mais comum na prática. */
export const ALL_ROOTS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'] as const;
export type Root = (typeof ALL_ROOTS)[number];

const ROOT_TO_INDEX: Record<string, number> = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6,
  G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
};

export function rootToIndex(root: string): number {
  const index = ROOT_TO_INDEX[root];
  if (index === undefined) throw new Error(`Tonalidade desconhecida: ${root}`);
  return index;
}

/** Tonalidades com bemol (e F) preferem grafia em bemóis; o resto usa sustenidos. */
export function isFlatKey(root: string): boolean {
  return root.includes('b') || root === 'F';
}

export function noteNameFromIndex(chromaticIndex: number, preferFlats: boolean): string {
  const normalized = ((chromaticIndex % 12) + 12) % 12;
  return (preferFlats ? CHROMATIC_FLAT : CHROMATIC_SHARP)[normalized];
}

export function midiFromRootOctave(rootIndex: number, octave: number, semitoneOffset = 0): number {
  return 12 * (octave + 1) + rootIndex + semitoneOffset;
}

export function frequencyFromMidi(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export interface PlayableNote {
  name: string;
  midi: number;
  frequency: number;
}

export function buildNote(root: string, semitoneOffset: number, octave = 4): PlayableNote {
  const rootIndex = rootToIndex(root);
  const preferFlats = isFlatKey(root);
  const midi = midiFromRootOctave(rootIndex, octave, semitoneOffset);
  const name = noteNameFromIndex(rootIndex + semitoneOffset, preferFlats);
  return { name, midi, frequency: frequencyFromMidi(midi) };
}

/** Converte uma frequência captada (afinador) na nota mais próxima + desvio em cents. */
export function frequencyToNote(frequency: number): { note: string; octave: number; cents: number; midi: number } {
  const midiFloat = 69 + 12 * Math.log2(frequency / 440);
  const midi = Math.round(midiFloat);
  const cents = Math.round((midiFloat - midi) * 100);
  const octave = Math.floor(midi / 12) - 1;
  const note = CHROMATIC_SHARP[((midi % 12) + 12) % 12];
  return { note, octave, cents, midi };
}
