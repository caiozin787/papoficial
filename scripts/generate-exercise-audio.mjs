// Gera áudios de apoio reais (síntese, sem nenhuma gravação de terceiros) para os 24
// exercícios — clique de metrônomo, demonstração de escala/arpejo, tom de referência ou
// "vamp" de acordes — conforme o material necessário de cada exercício.
import { writeFileSync, mkdirSync } from 'fs';

const SR = 44100;

// ---------- WAV ----------
function writeWav(path, samples) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    const v = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE(Math.round(v * 32767), 44 + i * 2);
  }
  writeFileSync(path, buf);
}

function concat(arrays) {
  const total = arrays.reduce((s, a) => s + a.length, 0);
  const out = new Float32Array(total);
  let o = 0;
  for (const a of arrays) { out.set(a, o); o += a.length; }
  return out;
}

function silence(sec) { return new Float32Array(Math.round(sec * SR)); }

function midiFreq(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }

// Tom puro com envelope (attack/release) para evitar cliques.
function tone(freq, durSec, { amp = 0.35, attack = 0.015, release = 0.05 } = {}) {
  const n = Math.round(durSec * SR);
  const out = new Float32Array(n);
  const aN = Math.round(attack * SR), rN = Math.round(release * SR);
  for (let i = 0; i < n; i++) {
    let env = 1;
    if (i < aN) env = i / aN;
    else if (i > n - rN) env = (n - i) / rN;
    out[i] = Math.sin((2 * Math.PI * freq * i) / SR) * amp * env;
  }
  return out;
}

// Clique percussivo de metrônomo (tom curto de decaimento rápido).
function click(freq, amp) {
  const dur = 0.045;
  const n = Math.round(dur * SR);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const env = Math.exp(-i / (SR * 0.012));
    out[i] = Math.sin((2 * Math.PI * freq * i) / SR) * amp * env;
  }
  return out;
}

function metronomeTrack(bpm, bars = 6, beatsPerBar = 4) {
  const beatDur = 60 / bpm;
  const parts = [];
  for (let b = 0; b < bars; b++) {
    for (let beat = 0; beat < beatsPerBar; beat++) {
      const c = beat === 0 ? click(1500, 0.5) : click(1000, 0.32);
      const pad = silence(beatDur - c.length / SR);
      parts.push(c, pad);
    }
  }
  return concat(parts);
}

function referenceTone(midi, repeats = 3) {
  const parts = [];
  for (let i = 0; i < repeats; i++) {
    parts.push(tone(midiFreq(midi), 2.2, { amp: 0.3 }));
    if (i < repeats - 1) parts.push(silence(0.6));
  }
  return concat(parts);
}

function noteSequence(midiList, noteDur = 0.32, amp = 0.32) {
  return concat(midiList.map((m) => tone(midiFreq(m), noteDur, { amp })));
}

function chordVamp(chords, repeats = 2, noteDur = 0.28) {
  // chords: array of arrays of MIDI notes (tocadas em sequência ascendente, como um arpejo lento)
  const parts = [];
  for (let r = 0; r < repeats; r++) {
    for (const chord of chords) {
      parts.push(noteSequence(chord, noteDur, 0.3));
      parts.push(silence(0.15));
    }
  }
  return concat(parts);
}

// ---------- Escalas/acordes em MIDI (Dó central = 60) ----------
const C_MAJOR = [60, 62, 64, 65, 67, 69, 71, 72];
const C_MAJOR_UP_DOWN = [...C_MAJOR, ...[...C_MAJOR].reverse()];
const C_MAJOR_2OCT = [...C_MAJOR, 74, 76, 77, 79, 81, 83, 84];
const C_MAJOR_2OCT_UPDOWN = [...C_MAJOR_2OCT, ...[...C_MAJOR_2OCT].reverse()];
const C_MAJOR_THIRDS = [60, 64, 62, 65, 64, 67, 65, 69, 67, 71, 69, 72, 71, 74, 72]; // 1-3,2-4,3-5...
const A_NAT_MINOR = [69, 71, 72, 74, 76, 77, 79, 81];
const A_HARM_MINOR = [69, 71, 72, 74, 76, 77, 80, 81];
const A_MEL_MINOR = [69, 71, 72, 74, 76, 78, 80, 81];
const C_TRIAD_2OCT = [60, 64, 67, 72, 76, 79, 84];
const C_TRIAD_2OCT_UPDOWN = [...C_TRIAD_2OCT, ...[...C_TRIAD_2OCT].reverse()];
const CMAJ7 = [60, 64, 67, 71, 72];
const DM7 = [62, 65, 69, 72, 74];
const G7 = [67, 71, 74, 77, 79];

const TEMPO = { iniciante: 70, intermediario: 92, avancado: 116 };

const audios = {};

// --- Técnica ---
audios['articulacao-staccato-basica'] = metronomeTrack(TEMPO.iniciante);
audios['articulacao-dupla-passagens-rapidas'] = metronomeTrack(TEMPO.avancado);
audios['long-tones-fundamentacao-do-som'] = metronomeTrack(60, 8);
audios['long-tones-crescendo-decrescendo'] = referenceTone(70); // Bb3 (concert) ~ referência de afinação
audios['velocidade-escalas-semicolcheias'] = metronomeTrack(TEMPO.intermediario);
audios['velocidade-saltos-intervalares'] = metronomeTrack(TEMPO.avancado);

// --- Escalas (demonstração tocada do próprio padrão) ---
audios['arpejos-triades-duas-oitavas'] = concat([noteSequence(C_TRIAD_2OCT_UPDOWN), silence(0.4), noteSequence(C_TRIAD_2OCT_UPDOWN)]);
audios['arpejos-tetrades-maj7-m7-dom7'] = chordVamp([CMAJ7, DM7, G7], 2, 0.3);
audios['escalas-maiores-todas-tonalidades'] = concat([noteSequence(C_MAJOR_UP_DOWN), silence(0.4), noteSequence(C_MAJOR_UP_DOWN)]);
audios['escalas-maiores-em-tercas'] = concat([noteSequence(C_MAJOR_THIRDS, 0.28), silence(0.3), noteSequence([...C_MAJOR_THIRDS].reverse(), 0.28)]);
audios['escalas-menores-natural-harmonica'] = concat([noteSequence([...A_NAT_MINOR, ...[...A_NAT_MINOR].reverse()]), silence(0.5), noteSequence([...A_HARM_MINOR, ...[...A_HARM_MINOR].reverse()])]);
audios['escala-menor-melodica-em-jazz'] = concat([noteSequence([...A_MEL_MINOR, ...[...A_MEL_MINOR].reverse()]), silence(0.4), noteSequence([...A_MEL_MINOR, ...[...A_MEL_MINOR].reverse()])]);

// --- Improvisação (vamp do acorde / playback simples, ou clique quando o material pede gravador) ---
audios['construindo-frases-2-compassos'] = chordVamp([CMAJ7], 4, 0.35);
audios['frases-com-motivos-repetidos'] = metronomeTrack(TEMPO.avancado);
audios['improvisando-sobre-ii-v-i'] = chordVamp([DM7, G7, CMAJ7], 2, 0.3);
audios['ii-v-i-todas-tonalidades'] = chordVamp([DM7, G7, CMAJ7], 3, 0.28);
audios['patterns-3-notas-escala-maior'] = chordVamp([CMAJ7], 4, 0.35);
audios['patterns-bebop-sobre-dominante'] = chordVamp([G7], 4, 0.3);

// --- Leitura (clique de apoio ao pulso, ou tom de referência para solfejo sem instrumento) ---
audios['primeira-vista-melodias-curtas'] = metronomeTrack(TEMPO.intermediario);
audios['primeira-vista-repertorio-de-banda'] = metronomeTrack(TEMPO.avancado);
audios['leitura-ritmica-seminimas-colcheias'] = metronomeTrack(TEMPO.iniciante);
audios['leitura-ritmica-sincopes'] = metronomeTrack(TEMPO.intermediario);
audios['solfejo-intervalos-simples'] = referenceTone(60);
audios['solfejo-ritmico-com-nomes-de-notas'] = metronomeTrack(TEMPO.intermediario);

mkdirSync('./relatorio/audio_exercicios', { recursive: true });
for (const [slug, samples] of Object.entries(audios)) {
  writeWav(`./relatorio/audio_exercicios/${slug}.wav`, samples);
}
console.log('Gerados', Object.keys(audios).length, 'áudios em ./relatorio/audio_exercicios/');
