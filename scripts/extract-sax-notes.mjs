// Extrai notas individuais de saxofone de uma gravação contínua (uma nota -> silêncio ->
// próxima nota, em qualquer ordem). Deteta a altura de cada nota por autocorrelação,
// corta, normaliza o volume e exporta um ficheiro .wav por nota, pronto a usar em
// apresentacao/notas-sax/. Uso:
//   node scripts/extract-sax-notes.mjs <ficheiro-de-entrada.mp3-ou-wav> [pasta-de-saida]
import { execFileSync, spawnSync } from 'child_process';
import { readFileSync, mkdirSync, rmSync, readdirSync, unlinkSync, writeFileSync } from 'fs';
import path from 'path';

const [, , inputArg, outDirArg] = process.argv;
if (!inputArg) {
  console.error('Uso: node scripts/extract-sax-notes.mjs <ficheiro-de-entrada> [pasta-de-saida]');
  process.exit(1);
}
const OUT_DIR = outDirArg || './apresentacao/notas-sax';
const WORK_DIR = './relatorio/_notas_work';
mkdirSync(WORK_DIR, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

let FFMPEG = 'ffmpeg';
// fall back to the bundled ffmpeg used elsewhere in this project (imageio_ffmpeg)
const BUNDLED_FFMPEG = 'C:\\Users\\fabia\\AppData\\Local\\Programs\\Python\\Python310\\lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe';
try { execFileSync(BUNDLED_FFMPEG, ['-version'], { stdio: 'ignore' }); FFMPEG = BUNDLED_FFMPEG; } catch {}

const MIN_MIDI = 58; // Bb3
const MAX_MIDI = 90; // F#6
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
function midiToName(midi) {
  return NOTE_NAMES[((midi % 12) + 12) % 12] + (Math.floor(midi / 12) - 1);
}
function noteToFileName(note) {
  return note.replace('#', 's') + '.wav';
}

function readWav(p) {
  const buf = readFileSync(p);
  const sampleRate = buf.readUInt32LE(24);
  let offset = 12, dataOffset = -1, dataSize = 0;
  while (offset < buf.length) {
    const id = buf.toString('ascii', offset, offset + 4);
    const size = buf.readUInt32LE(offset + 4);
    if (id === 'data') { dataOffset = offset + 8; dataSize = size; break; }
    offset += 8 + size + (size % 2);
  }
  const n = dataSize / 2;
  const samples = new Float32Array(n);
  for (let i = 0; i < n; i++) samples[i] = buf.readInt16LE(dataOffset + i * 2) / 32768;
  return { samples, sampleRate };
}

function detectPitch(buffer, sampleRate, minFreq = 100, maxFreq = 1700) {
  const n = buffer.length;
  let rms = 0;
  for (let i = 0; i < n; i++) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / n);
  if (rms < 0.006) return { freq: -1, rms, clarity: 0 };
  const minLag = Math.floor(sampleRate / maxFreq), maxLag = Math.ceil(sampleRate / minFreq);
  let bestLag = -1, bestCorr = -Infinity;
  const corrs = new Float64Array(maxLag - minLag + 1);
  for (let lag = minLag; lag <= maxLag; lag++) {
    let sum = 0, normA = 0, normB = 0;
    const count = n - lag;
    for (let i = 0; i < count; i++) { sum += buffer[i] * buffer[i + lag]; normA += buffer[i] * buffer[i]; normB += buffer[i + lag] * buffer[i + lag]; }
    const norm = Math.sqrt(normA * normB) || 1e-9;
    const nc = sum / norm;
    corrs[lag - minLag] = nc;
    if (nc > bestCorr) { bestCorr = nc; bestLag = lag; }
  }
  if (bestLag <= minLag || bestLag >= maxLag) return { freq: -1, rms, clarity: bestCorr };
  const i0 = bestLag - minLag;
  const y1 = corrs[i0 - 1], y2 = corrs[i0], y3 = corrs[i0 + 1];
  const denom = y1 - 2 * y2 + y3;
  const shift = denom !== 0 ? 0.5 * (y1 - y3) / denom : 0;
  return { freq: sampleRate / (bestLag + shift), rms, clarity: bestCorr };
}
function freqToMidi(freq) { return Math.round(69 + 12 * Math.log2(freq / 440)); }

console.log('1/5 decoding + cleaning audio...');
execFileSync(FFMPEG, ['-y', '-i', inputArg, '-ac', '1', '-ar', '44100', '-c:a', 'pcm_s16le', `${WORK_DIR}/full.wav`], { stdio: 'ignore' });
execFileSync(FFMPEG, ['-y', '-i', `${WORK_DIR}/full.wav`, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11,highpass=f=80', `${WORK_DIR}/norm.wav`], { stdio: 'ignore' });
execFileSync(FFMPEG, ['-y', '-i', `${WORK_DIR}/norm.wav`, '-ar', '44100', `${WORK_DIR}/norm44.wav`], { stdio: 'ignore' });

console.log('2/5 detecting pitch contour...');
const { samples, sampleRate } = readWav(`${WORK_DIR}/norm44.wav`);
const winSec = 0.08, hopSec = 0.04;
const winSize = Math.floor(sampleRate * winSec), hop = Math.floor(sampleRate * hopSec);
const frames = [];
for (let i = 0; i + winSize <= samples.length; i += hop) {
  const { freq, clarity } = detectPitch(samples.subarray(i, i + winSize), sampleRate);
  // keep the RAW midi (no range-folding here) -- autocorrelation sometimes locks onto an
  // octave-below subharmonic, so we group by pitch CLASS first and vote on the octave
  // afterwards, instead of blindly forcing every reading into the expected range.
  frames.push({ t: i / sampleRate, midi: freq > 0 && clarity > 0.85 ? freqToMidi(freq) : null });
}

console.log('3/5 segmenting notes...');
const pitchClass = (m) => ((m % 12) + 12) % 12;
const events = [];
let cur = null;
const maxBridgeFrames = Math.round(0.5 / hopSec);
for (let i = 0; i < frames.length; i++) {
  const m = frames[i].midi;
  if (m !== null) {
    if (cur && pitchClass(cur.lastClass) === pitchClass(m) && i - cur.lastIdx <= maxBridgeFrames) {
      cur.lastIdx = i; cur.lastClass = m; cur.endT = frames[i].t; cur.count++;
      cur.octaveVotes[m] = (cur.octaveVotes[m] || 0) + 1;
    } else {
      if (cur) events.push(cur);
      cur = { lastClass: m, startT: frames[i].t, endT: frames[i].t, lastIdx: i, count: 1, octaveVotes: { [m]: 1 } };
    }
  }
}
if (cur) events.push(cur);
// resolve each event's final octave by majority vote among the exact midi values seen
for (const e of events) {
  const entries = Object.entries(e.octaveVotes).map(([midi, n]) => [Number(midi), n]);
  entries.sort((a, b) => b[1] - a[1]);
  e.midi = entries[0][0];
}

const cleaned = events.filter((e) => e.count > 2);
const merged = [];
for (const e of cleaned) {
  const prev = merged[merged.length - 1];
  if (prev && prev.midi === e.midi && e.startT - prev.endT <= 0.6) { prev.endT = e.endT; prev.count += e.count; }
  else merged.push({ ...e });
}
const MIN_FRAMES = Math.max(2, Math.round(0.35 / hopSec));
const finalEvents = merged.filter((e) => e.count >= MIN_FRAMES);

// keep longest instance per unique note
const byNote = {};
for (const e of finalEvents) {
  const name = midiToName(e.midi);
  if (!byNote[name] || (e.endT - e.startT) > (byNote[name].endT - byNote[name].startT)) byNote[name] = { ...e, note: name };
}
const allUnique = Object.values(byNote);
const uniqueEvents = allUnique.filter((e) => e.midi >= MIN_MIDI && e.midi <= MAX_MIDI);
const outOfRange = allUnique.filter((e) => e.midi < MIN_MIDI || e.midi > MAX_MIDI);
console.log(`  found ${uniqueEvents.length} unique notes in range:`, uniqueEvents.map((e) => e.note).sort().join(' '));
if (outOfRange.length) {
  console.log(`  (${outOfRange.length} notes detected outside Bb3-F#6, not exported):`, outOfRange.map((e) => e.note).join(' '));
}

console.log('4/5 trimming + normalizing...');
for (const e of uniqueEvents) {
  const padStart = 0.04, padEnd = 0.08;
  const start = Math.max(0, e.startT - padStart);
  const dur = (e.endT - e.startT) + padStart + padEnd;
  const fadeOutStart = Math.max(0.05, dur - 0.12);
  const tmpPath = `${WORK_DIR}/_tmp_${e.note.replace('#', 's')}.wav`;
  const outPath = path.join(OUT_DIR, noteToFileName(e.note));

  execFileSync(FFMPEG, [
    '-y', '-ss', start.toFixed(3), '-t', dur.toFixed(3), '-i', `${WORK_DIR}/norm44.wav`,
    '-af', `afade=t=in:st=0:d=0.03,afade=t=out:st=${fadeOutStart.toFixed(3)}:d=0.12`,
    '-ar', '44100', '-ac', '1', tmpPath,
  ], { stdio: 'ignore' });

  const probe = spawnSync(FFMPEG, ['-i', tmpPath, '-af', 'volumedetect', '-f', 'null', 'NUL']);
  const m = (probe.stderr || '').toString().match(/max_volume:\s*(-?\d+(\.\d+)?)\s*dB/);
  const maxDb = m ? parseFloat(m[1]) : 0;
  const gain = (-2.0 - maxDb).toFixed(2);

  execFileSync(FFMPEG, ['-y', '-i', tmpPath, '-af', `volume=${gain}dB`, '-ar', '44100', '-ac', '1', outPath], { stdio: 'ignore' });
  console.log(`  ${e.note} -> ${outPath}`);
}
for (const f of readdirSync(WORK_DIR)) if (f.startsWith('_tmp_')) unlinkSync(path.join(WORK_DIR, f));

console.log('5/5 checking against the full expected range (Bb3-F#6)...');
const expected = [];
for (let m = MIN_MIDI; m <= MAX_MIDI; m++) expected.push(midiToName(m));
const haveSet = new Set(readdirSync(OUT_DIR).filter((f) => f.endsWith('.wav')).map((f) => {
  const base = f.replace('.wav', '');
  const m2 = base.match(/^([A-G])s(\d)$/);
  return m2 ? `${m2[1]}#${m2[2]}` : base;
}));
const missing = expected.filter((n) => !haveSet.has(n));
console.log(`\nTotal now in ${OUT_DIR}: ${haveSet.size} / 33`);
console.log('Still missing:', missing.length ? missing.join(' ') : '(none -- complete!)');

writeFileSync(`${WORK_DIR}/last_run_report.json`, JSON.stringify({ found: [...haveSet].sort(), missing }, null, 2));
console.log('\ndone.');
