import { ALL_ROOTS, rootToIndex, midiFromRootOctave, frequencyFromMidi } from './notes';

/**
 * Transposição dos saxofones: quantos semitons a nota concertante (o que realmente soa) fica
 * ABAIXO da nota escrita/digitada. Alto e barítono são afinados em Mi♭ (6ª Maior = 9 semitons);
 * soprano e tenor são afinados em Si♭ (2ª Maior = 2 semitons) — o tenor soa ainda uma oitava
 * abaixo do soprano, por isso 14 em vez de 2.
 */
export const SAX_INSTRUMENTS = ['Sax Alto', 'Sax Tenor', 'Sax Soprano'] as const;
export type SaxInstrument = (typeof SAX_INSTRUMENTS)[number];

export const TRANSPOSITION_SEMITONES: Record<SaxInstrument, number> = {
  'Sax Alto': 9,
  'Sax Tenor': 14,
  'Sax Soprano': 2,
};

/** Frequência concertante real (o que sai do instrumento) para uma nota escrita/digitada. */
export function writtenToConcertFrequency(root: string, octave: number, instrument: SaxInstrument): number {
  const writtenMidi = midiFromRootOctave(rootToIndex(root), octave);
  const concertMidi = writtenMidi - TRANSPOSITION_SEMITONES[instrument];
  return frequencyFromMidi(concertMidi);
}

/** Nome (sem oitava) que o instrumento escolhido usaria pra ler/digitar uma altura concertante dada. */
export function concertToWrittenName(concertRoot: string, instrument: SaxInstrument): string {
  const index = (rootToIndex(concertRoot) + TRANSPOSITION_SEMITONES[instrument]) % 12;
  return ALL_ROOTS[index];
}

/** Nome + oitava que o instrumento escolhido usaria pra ler/digitar uma altura concertante dada. */
export function concertToWritten(concertRoot: string, concertOctave: number, instrument: SaxInstrument): { root: string; octave: number } {
  const concertMidi = midiFromRootOctave(rootToIndex(concertRoot), concertOctave);
  const writtenMidi = concertMidi + TRANSPOSITION_SEMITONES[instrument];
  return { root: ALL_ROOTS[((writtenMidi % 12) + 12) % 12], octave: Math.floor(writtenMidi / 12) - 1 };
}
