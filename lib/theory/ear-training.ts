import { buildNote, type PlayableNote } from './notes';
import { CHORD_FORMULAS } from './chords';
import { SCALE_FORMULAS } from './scales';

export const EAR_TRAINING_INTERVALS: { name: string; semitones: number }[] = [
  { name: '2ª menor', semitones: 1 },
  { name: '2ª Maior', semitones: 2 },
  { name: '3ª menor', semitones: 3 },
  { name: '3ª Maior', semitones: 4 },
  { name: '4ª Justa', semitones: 5 },
  { name: '4ª Aumentada / 5ª Diminuta', semitones: 6 },
  { name: '5ª Justa', semitones: 7 },
  { name: '6ª menor', semitones: 8 },
  { name: '6ª Maior', semitones: 9 },
  { name: '7ª menor', semitones: 10 },
  { name: '7ª Maior', semitones: 11 },
  { name: '8ª (Oitava)', semitones: 12 },
];

export const EAR_TRAINING_CHORDS = ['Maior', 'Menor', 'Diminuto', 'Aumentado', 'Maior 7 (maj7)', 'Menor 7 (m7)', 'Dominante 7 (7)'];

export const EAR_TRAINING_SCALES = ['Maior (Jônio)', 'Menor Natural (Eólio)', 'Pentatônica Maior', 'Pentatônica Menor', 'Blues'];

const ROOT_POOL = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export interface IntervalQuestion {
  type: 'interval';
  root: PlayableNote;
  target: PlayableNote;
  answer: string;
  options: string[];
}

export function generateIntervalQuestion(): IntervalQuestion {
  const rootName = randomItem(ROOT_POOL);
  const root = buildNote(rootName, 0, 4);
  const correct = randomItem(EAR_TRAINING_INTERVALS);
  const target = buildNote(rootName, correct.semitones, 4);
  const options = shuffledOptions(correct.name, EAR_TRAINING_INTERVALS.map((i) => i.name));
  return { type: 'interval', root, target, answer: correct.name, options };
}

export interface ChordQuestion {
  type: 'chord';
  root: PlayableNote;
  tones: PlayableNote[];
  answer: string;
  options: string[];
}

export function generateChordQuestion(): ChordQuestion {
  const rootName = randomItem(ROOT_POOL);
  const root = buildNote(rootName, 0, 4);
  const quality = randomItem(EAR_TRAINING_CHORDS);
  const intervals = CHORD_FORMULAS[quality];
  const tones = intervals.map((iv) => buildNote(rootName, iv, 4));
  const options = shuffledOptions(quality, EAR_TRAINING_CHORDS);
  return { type: 'chord', root, tones, answer: quality, options };
}

export interface ScaleQuestion {
  type: 'scale';
  root: PlayableNote;
  tones: PlayableNote[];
  answer: string;
  options: string[];
}

export function generateScaleQuestion(): ScaleQuestion {
  const rootName = randomItem(ROOT_POOL);
  const root = buildNote(rootName, 0, 4);
  const scaleType = randomItem(EAR_TRAINING_SCALES);
  const intervals = SCALE_FORMULAS[scaleType];
  const tones = intervals.map((iv) => buildNote(rootName, iv, 4));
  const options = shuffledOptions(scaleType, EAR_TRAINING_SCALES);
  return { type: 'scale', root, tones, answer: scaleType, options };
}

function shuffledOptions(correct: string, pool: string[]): string[] {
  const others = pool.filter((p) => p !== correct);
  const distractors = shuffle(others).slice(0, 3);
  return shuffle([correct, ...distractors]);
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
