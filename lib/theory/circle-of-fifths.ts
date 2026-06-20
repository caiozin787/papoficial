export interface CircleKey {
  major: string;
  minor: string;
  /** Positivo = nº de sustenidos, negativo = nº de bemóis. */
  accidentals: number;
}

/** Ordem das quintas no sentido horário, começando em C (sem acidentes). */
export const CIRCLE_OF_FIFTHS: CircleKey[] = [
  { major: 'C', minor: 'Am', accidentals: 0 },
  { major: 'G', minor: 'Em', accidentals: 1 },
  { major: 'D', minor: 'Bm', accidentals: 2 },
  { major: 'A', minor: 'F#m', accidentals: 3 },
  { major: 'E', minor: 'C#m', accidentals: 4 },
  { major: 'B', minor: 'G#m', accidentals: 5 },
  { major: 'F#', minor: 'D#m', accidentals: 6 },
  { major: 'Db', minor: 'Bbm', accidentals: -5 },
  { major: 'Ab', minor: 'Fm', accidentals: -4 },
  { major: 'Eb', minor: 'Cm', accidentals: -3 },
  { major: 'Bb', minor: 'Gm', accidentals: -2 },
  { major: 'F', minor: 'Dm', accidentals: -1 },
];

export function accidentalsLabel(accidentals: number): string {
  if (accidentals === 0) return 'Nenhum acidente';
  const kind = accidentals > 0 ? 'sustenido' : 'bemol';
  const count = Math.abs(accidentals);
  return `${count} ${kind}${count > 1 ? 's' : ''}`;
}
