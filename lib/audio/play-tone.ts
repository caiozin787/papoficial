import { getAudioContext } from './audio-context';

/** Toca um beep simples (metrônomo, cliques). Duração curta, envelope com decaimento. */
export function playClick(frequency: number, volume = 0.8, durationSec = 0.1): void {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + durationSec);
}

/** Toca uma nota sustentada (escalas, arpejos, treino auditivo) com fade-out suave. */
export function playNote(frequency: number, durationSec = 0.6, volume = 0.5): void {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'triangle';
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
  gain.gain.setValueAtTime(volume, ctx.currentTime + durationSec - 0.08);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + durationSec);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + durationSec);
}

/** Toca várias notas em sequência (escalas, arpejos), respeitando o BPM informado. */
export function playSequence(frequencies: number[], bpm: number, onNoteIndex?: (index: number) => void): { stop: () => void } {
  const noteDuration = 60 / bpm;
  let cancelled = false;
  const timeouts: ReturnType<typeof setTimeout>[] = [];

  frequencies.forEach((freq, i) => {
    const timeout = setTimeout(() => {
      if (cancelled) return;
      onNoteIndex?.(i);
      playNote(freq, noteDuration * 0.9);
    }, i * noteDuration * 1000);
    timeouts.push(timeout);
  });

  return {
    stop: () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    },
  };
}

/** Toca um conjunto de notas simultaneamente (acordes). */
export function playChordTones(frequencies: number[], durationSec = 1.2, volume = 0.35): void {
  frequencies.forEach((freq) => playNote(freq, durationSec, volume));
}
