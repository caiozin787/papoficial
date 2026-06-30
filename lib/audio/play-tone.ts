import { getAudioContext } from './audio-context';
import { playSampledNote, preloadSaxSamples } from './sax-sampler';

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

let noiseBuffer: AudioBuffer | null = null;

/** Buffer de ruído branco curto, reutilizado para o "chiado" de palheta/respiração no ataque da nota. */
function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (!noiseBuffer) {
    const length = Math.ceil(ctx.sampleRate * 0.05);
    noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

/**
 * Toca uma nota sustentada (escalas, arpejos, treino auditivo). Usa gravações reais de
 * saxofone como base (ver sax-sampler.ts), com a amostra mais próxima ajustada de altura
 * para a nota pedida. Se as gravações ainda não tiverem carregado (ex. sem rede), recorre
 * ao timbre sintetizado abaixo como reserva.
 */
let preloadStarted = false;

export function playNote(frequency: number, durationSec = 0.6, volume = 0.5): void {
  if (!preloadStarted) {
    preloadStarted = true;
    preloadSaxSamples();
  }
  playSampledNote(frequency, durationSec, volume).catch(() => {
    playSynthesizedNote(frequency, durationSec, volume);
  });
}

/** Preserva o timbre sintetizado anterior (dente-de-serra + vibrato) como reserva. */
function playSynthesizedNote(frequency: number, durationSec = 0.6, volume = 0.5): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const attack = Math.min(0.04, durationSec * 0.15);
  const release = Math.min(0.1, durationSec * 0.25);

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0;
  masterGain.connect(ctx.destination);

  // Filtro de corpo: brilhante no ataque (palheta "abrindo"), mais quente no sustain.
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.Q.value = 1.2;
  filter.frequency.setValueAtTime(Math.min(frequency * 10, 4200), now);
  filter.frequency.linearRampToValueAtTime(Math.min(frequency * 5, 2200), now + attack + 0.05);
  filter.connect(masterGain);

  // Vibrato sutil (LFO modulando a frequência dos osciladores principais).
  const vibrato = ctx.createOscillator();
  vibrato.frequency.value = 5.5;
  const vibratoGain = ctx.createGain();
  vibratoGain.gain.value = 15; // profundidade em cents — sutil, mas audível
  vibrato.connect(vibratoGain);

  // Oscilador principal (dente-de-serra: harmônicos ricos, base "encorpada").
  const osc1 = ctx.createOscillator();
  osc1.type = 'sawtooth';
  osc1.frequency.value = frequency;
  vibratoGain.connect(osc1.detune);
  osc1.connect(filter);

  // Segundo oscilador, levemente destonado: dá corpo/"chorus" natural de instrumento de sopro.
  const osc2 = ctx.createOscillator();
  osc2.type = 'sawtooth';
  osc2.frequency.value = frequency;
  osc2.detune.value = 9;
  vibratoGain.connect(osc2.detune);
  const osc2Gain = ctx.createGain();
  osc2Gain.gain.value = 0.5;
  osc2.connect(osc2Gain);
  osc2Gain.connect(filter);

  // Chiado de respiração/palheta no ataque (ruído filtrado, bem curto e discreto).
  const noise = ctx.createBufferSource();
  noise.buffer = getNoiseBuffer(ctx);
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 2800;
  noiseFilter.Q.value = 0.7;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(volume * 0.25, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);

  // Envelope de amplitude geral (ataque rápido, sustain, release suave).
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(volume, now + attack);
  masterGain.gain.setValueAtTime(volume, now + Math.max(attack, durationSec - release));
  masterGain.gain.linearRampToValueAtTime(0, now + durationSec);

  const stopTime = now + durationSec + 0.02;
  vibrato.start(now);
  osc1.start(now);
  osc2.start(now);
  noise.start(now);
  vibrato.stop(stopTime);
  osc1.stop(stopTime);
  osc2.stop(stopTime);
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
