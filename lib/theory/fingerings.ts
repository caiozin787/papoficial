/**
 * Dedilhado padrão (sistema Boehm) por nota escrita. É o mesmo para sax alto, tenor e
 * soprano — o que muda entre os instrumentos é a transposição (qual nota concreta sai),
 * não a digitação em si. Cobre o registro fundamental: Si♭3 grave até Fá#5.
 */
export interface Fingering {
  note: string;
  label: string;
  octaveKey: boolean;
  keys: string[];
}

export const FINGERINGS: Fingering[] = [
  { note: 'Bb3', label: 'Si♭ grave', octaveKey: false, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2', 'RH3', 'Si♭ grave (mindinho esq.)', 'Dó grave (mindinho dir.)'] },
  { note: 'B3', label: 'Si grave', octaveKey: false, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2', 'RH3', 'Si grave (mindinho esq.)', 'Dó grave (mindinho dir.)'] },
  { note: 'C4', label: 'Dó grave', octaveKey: false, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2', 'RH3', 'Dó grave (mindinho dir.)'] },
  { note: 'C#4', label: 'Dó# grave', octaveKey: false, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2', 'RH3', 'Dó# grave (mindinho esq.)'] },
  { note: 'D4', label: 'Ré grave', octaveKey: false, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2', 'RH3'] },
  { note: 'Eb4', label: 'Mi♭ grave', octaveKey: false, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2', 'RH3', 'Mi♭ grave (mindinho dir.)'] },
  { note: 'E4', label: 'Mi grave', octaveKey: false, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2'] },
  { note: 'F4', label: 'Fá grave', octaveKey: false, keys: ['LH1', 'LH2', 'LH3', 'RH1'] },
  { note: 'F#4', label: 'Fá# grave', octaveKey: false, keys: ['LH1', 'LH2', 'LH3'] },
  { note: 'G4', label: 'Sol grave', octaveKey: false, keys: ['LH1', 'LH2'] },
  { note: 'G#4', label: 'Sol# grave', octaveKey: false, keys: ['LH1', 'Sol# (mindinho esq.)'] },
  { note: 'A4', label: 'Lá grave', octaveKey: false, keys: ['LH1'] },
  { note: 'Bb4', label: 'Si♭ médio (bis)', octaveKey: false, keys: ['LH1', 'LH2', 'Bis Si♭ (lateral, indicador dir.)'] },
  { note: 'B4', label: 'Si médio', octaveKey: true, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2', 'RH3', 'Si grave (mindinho esq.)', 'Dó grave (mindinho dir.)'] },
  { note: 'C5', label: 'Dó médio', octaveKey: true, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2', 'RH3', 'Dó grave (mindinho dir.)'] },
  { note: 'C#5', label: 'Dó# médio', octaveKey: true, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2', 'RH3', 'Dó# grave (mindinho esq.)'] },
  { note: 'D5', label: 'Ré agudo', octaveKey: true, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2', 'RH3'] },
  { note: 'Eb5', label: 'Mi♭ agudo', octaveKey: true, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2', 'RH3', 'Mi♭ grave (mindinho dir.)'] },
  { note: 'E5', label: 'Mi agudo', octaveKey: true, keys: ['LH1', 'LH2', 'LH3', 'RH1', 'RH2'] },
  { note: 'F5', label: 'Fá agudo', octaveKey: true, keys: ['LH1', 'LH2', 'LH3', 'RH1'] },
  { note: 'F#5', label: 'Fá# agudo', octaveKey: true, keys: ['LH1', 'LH2', 'LH3'] },
];
