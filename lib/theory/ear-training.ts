import { buildNote, type PlayableNote } from './notes';
import { CHORD_FORMULAS } from './chords';
import { SCALE_FORMULAS } from './scales';

export const EAR_TRAINING_CHORDS = ['Maior', 'Menor', 'Diminuto', 'Aumentado', 'Maior 7 (maj7)', 'Menor 7 (m7)', 'Dominante 7 (7)'];

export const EAR_TRAINING_SCALES = ['Maior (Jônio)', 'Menor Natural (Eólio)', 'Pentatônica Maior', 'Pentatônica Menor', 'Blues'];

const ROOT_POOL = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export interface NoteQuestion {
  type: 'note';
  note: PlayableNote;
  answer: string;
  options: string[];
}

/** Toca uma única nota aleatória; a pessoa precisa identificar de ouvido qual nota é. */
export function generateNoteQuestion(): NoteQuestion {
  const rootName = randomItem(ROOT_POOL);
  const note = buildNote(rootName, 0, 4);
  const options = shuffledOptions(rootName, ROOT_POOL);
  return { type: 'note', note, answer: rootName, options };
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
