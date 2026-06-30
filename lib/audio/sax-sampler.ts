import { getAudioContext } from './audio-context';

/**
 * Gravações reais de saxofone (uma nota sustentada por ficheiro), usadas como base para
 * tocar qualquer nota dentro do alcance do instrumento. Quando a nota pedida não tem
 * gravação própria, usa-se a amostra mais próxima e ajusta-se a altura (playbackRate).
 */
const BASE_URL = 'https://xnfxxahrhwietfbyjdxj.supabase.co/storage/v1/object/public/audio/sax-samples/';

// Sobe sempre que as gravações forem substituídas, para evitar que o navegador sirva do
// cache uma versão antiga de um ficheiro com o mesmo nome (ex.: G4.wav de uma gravação
// anterior, com a oitava errada).
const SAMPLES_VERSION = '2';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function noteNameToMidi(name: string): number {
  const m = name.match(/^([A-G]#?)(-?\d+)$/);
  if (!m) throw new Error(`Nome de nota inválido: ${name}`);
  const [, pitch, octaveStr] = m;
  const octave = parseInt(octaveStr, 10);
  return (octave + 1) * 12 + NOTE_NAMES.indexOf(pitch);
}

function freqToMidi(frequency: number): number {
  return 69 + 12 * Math.log2(frequency / 440);
}

// Notas disponíveis (gravações reais). Conforme mais notas forem gravadas, basta
// acrescentar aqui o nome do ficheiro correspondente em sax-samples/<nota>.wav.
const AVAILABLE_NOTES = [
  'A#3', 'B3', 'C4', 'C#4', 'D#4', 'E4', 'F#4', 'G4', 'G#4', 'A4', 'A#4',
  'C5', 'C#5', 'D#5', 'F5', 'F#5', 'G5', 'G#5',
  'C6', 'C#6', 'E6',
];

const SAMPLES = AVAILABLE_NOTES.map((note) => ({ note, midi: noteNameToMidi(note) })).sort((a, b) => a.midi - b.midi);

function nearestSample(targetMidi: number) {
  let best = SAMPLES[0];
  let bestDist = Infinity;
  for (const s of SAMPLES) {
    const dist = Math.abs(s.midi - targetMidi);
    if (dist < bestDist) { bestDist = dist; best = s; }
  }
  return best;
}

// "#" não é seguro num URL (é interpretado como fragmento), por isso os ficheiros usam
// "s" em vez de "#" no nome (ex.: nota "C#4" -> ficheiro "Cs4.wav").
function noteToFileName(note: string): string {
  return note.replace('#', 's') + '.wav';
}

const bufferCache = new Map<string, Promise<AudioBuffer>>();

function loadSample(note: string): Promise<AudioBuffer> {
  let cached = bufferCache.get(note);
  if (!cached) {
    cached = fetch(BASE_URL + noteToFileName(note) + '?v=' + SAMPLES_VERSION)
      .then((res) => res.arrayBuffer())
      .then((data) => getAudioContext().decodeAudioData(data));
    bufferCache.set(note, cached);
  }
  return cached;
}

/** Começa a carregar todas as amostras em paralelo (chamar cedo, ex. ao montar a ferramenta). */
export function preloadSaxSamples(): void {
  for (const s of SAMPLES) loadSample(s.note);
}

/**
 * Toca uma nota usando a gravação real mais próxima, ajustando a altura via playbackRate.
 * Mantém o mesmo envelope de amplitude (ataque/sustain/release) das outras ferramentas.
 */
export async function playSampledNote(frequency: number, durationSec = 0.6, volume = 0.5): Promise<void> {
  const targetMidi = freqToMidi(frequency);
  const sample = nearestSample(targetMidi);
  const buffer = await loadSample(sample.note);

  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const attack = Math.min(0.03, durationSec * 0.15);
  const release = Math.min(0.12, durationSec * 0.3);

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.value = 2 ** ((targetMidi - sample.midi) / 12);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + attack);
  gain.gain.setValueAtTime(volume, now + Math.max(attack, durationSec - release));
  gain.gain.linearRampToValueAtTime(0, now + durationSec);

  source.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
  source.stop(now + durationSec + 0.05);
}
