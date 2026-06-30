// Gera partituras reais (1 página A4, VexFlow) para peças do catálogo que ainda não tinham
// PDF, e substitui 2 PDFs incorretos já existentes (partes de trompete/banda de metais
// erradamente associadas a peças de saxofone). Peças de domínio público são adaptações
// simplificadas e identificadas como tal; peças "Sax Tools" são composições originais.
import { chromium } from 'playwright';
import { Client } from 'pg';
import { mkdirSync, readFileSync } from 'fs';

const VEXFLOW_SRC = readFileSync('./node_modules/vexflow/build/cjs/vexflow.js', 'utf-8');

const LEVEL_LABELS = { iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado', jazz: 'Jazz', gospel: 'Gospel', estudos: 'Estudos' };
const INSTRUMENT_LABELS = { sax_alto: 'Sax Alto', sax_tenor: 'Sax Tenor', sax_soprano: 'Sax Soprano', sax_baritono: 'Sax Barítono' };

const n = (keys, duration, opts = {}) => ({ keys: keys.split(' '), duration, ...opts });
const r = (duration) => ({ keys: ['b/4'], duration, rest: true });

// slug -> { systems: [{ label?, notes }] }
const SCORES = {
  'ave-maria': { systems: [
    { notes: [n('g/4', 'q'), n('c/5', 'q'), n('e/5', 'q'), n('g/5', 'h'), n('f/5', 'q'), n('e/5', 'q'), n('d/5', 'h')] },
    { notes: [n('c/5', 'q'), n('e/5', 'q'), n('g/5', 'q'), n('c/6', 'h'), n('b/5', 'q'), n('a/5', 'q'), n('g/5', 'w')] },
  ] },
  'blues-original': { systems: [
    { label: 'Tema (call)', notes: [n('bb/4', '8'), n('db/5', '8', { accidental: 'b' }), n('eb/5', '8', { accidental: 'b' }), n('e/5', '8', { accidental: 'n' }), n('eb/5', '8', { accidental: 'b' }), n('db/5', '8', { accidental: 'b' }), n('bb/4', 'q'), r('q')] },
    { label: 'Resposta', notes: [n('f/5', '8'), n('eb/5', '8', { accidental: 'b' }), n('db/5', '8', { accidental: 'b' }), n('bb/4', '8'), n('ab/4', '8', { accidental: 'b' }), n('bb/4', 'q'), n('bb/4', 'h')] },
  ] },
  'capriccio-no-24': { systems: [
    { label: 'Tema (adaptação)', notes: [n('a/4', '8'), n('c/5', '8'), n('a/4', '8'), n('e/4', '8'), n('a/4', '8'), n('c/5', '8'), n('e/5', '8'), n('a/5', '8')] },
    { notes: [n('g/5', '8', { accidental: '#' }), n('f/5', '8'), n('e/5', '8'), n('d/5', '8'), n('c/5', '8'), n('b/4', '8'), n('a/4', 'q')] },
  ] },
  'czardas': { systems: [
    { label: 'Lento', notes: [n('d/5', 'q'), n('eb/5', 'q', { accidental: 'b' }), n('d/5', 'q'), n('c/5', 'q')] },
    { notes: [n('bb/4', 'h', { accidental: 'b' }), n('a/4', 'q'), n('bb/4', 'q', { accidental: 'b' }), n('g/4', 'w')] },
  ] },
  'estudo-1-articulacao': { systems: [
    { notes: ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'f/4', 'e/4', 'd/4'].map((k) => n(k, 'q', { stacc: true })) },
    { notes: [n('c/4', 'h', { stacc: true }), n('e/4', 'h', { stacc: true }), n('g/4', 'h', { stacc: true }), n('c/5', 'h', { stacc: true })] },
  ] },
  'estudo-12-tecnica-avancada': { systems: [
    { notes: [n('f/4', '16', { accidental: '#' }), n('g/4', '16', { accidental: '#' }), n('a/4', '16'), n('b/4', '16'), n('c/5', '16', { accidental: '#' }), n('d/5', '16'), n('e/5', '16'), n('f/5', '16', { accidental: '#' })] },
    { notes: [n('e/5', '16'), n('d/5', '16'), n('c/5', '16', { accidental: '#' }), n('b/4', '16'), n('a/4', '16'), n('g/4', '16', { accidental: '#' }), n('f/4', 'q', { accidental: '#' })] },
  ] },
  'estudo-5-intervalos': { systems: [
    { notes: [n('g/4', 'q'), n('b/4', 'q', { text: '3ª' }), n('g/4', 'q'), n('d/5', 'q', { text: '5ª' })] },
    { notes: [n('g/4', 'q'), n('g/5', 'q', { text: '8ª' }), n('g/4', 'q'), n('c/5', 'q', { text: '4ª' })] },
  ] },
  'estudo-em-bebop': { systems: [
    { notes: [n('c/5', '8'), n('b/4', '8'), n('a/4', '8'), n('ab/4', '8', { accidental: 'b', text: 'cromatismo' }), n('g/4', '8'), n('f/4', '8'), n('e/4', '8'), n('d/4', '8')] },
    { notes: [n('c/4', 'q'), r('8'), n('e/4', '8'), n('g/4', '8'), n('c/5', 'h')] },
  ] },
  'gospel-solo-avancado': { systems: [
    { notes: [n('bb/4', 'q'), n('d/5', 'q'), n('f/5', 'q'), n('ab/5', 'q', { accidental: 'b' })] },
    { notes: [n('g/5', 'h'), n('f/5', 'q'), n('d/5', 'q'), n('bb/4', 'h')] },
  ] },
  'greensleeves': { systems: [
    { label: 'Adaptação', notes: [n('d/5', 'q'), n('g/4', 'q'), n('a/4', 'q'), n('b/4', 'q'), n('c/5', 'q'), n('b/4', 'q'), n('a/4', 'h')] },
    { notes: [n('g/4', 'q'), n('b/4', 'q'), n('d/5', 'q'), n('e/5', 'q'), n('d/5', 'h'), n('b/4', 'h')] },
  ] },
  'hino-de-adoracao': { systems: [
    { notes: [n('d/5', 'h'), n('a/4', 'q'), n('b/4', 'q'), n('c/5', 'h', { accidental: '#' }), n('d/5', 'h')] },
    { notes: [n('e/5', 'q'), n('d/5', 'q'), n('c/5', 'q', { accidental: '#' }), n('b/4', 'q'), n('a/4', 'w')] },
  ] },
  'louvor-instrumental': { systems: [
    { notes: [n('eb/5', 'q', { accidental: 'b' }), n('g/5', 'q'), n('bb/5', 'q', { accidental: 'b' }), n('ab/5', 'q', { accidental: 'b' })] },
    { notes: [n('g/5', 'h'), n('f/5', 'q'), n('eb/5', 'q', { accidental: 'b' }), n('d/5', 'q'), n('eb/5', 'h', { accidental: 'b' })] },
  ] },
  'meditation-thais': { systems: [
    { label: 'Espressivo', notes: [n('d/5', 'h'), n('e/5', 'q'), n('f/5', 'q', { accidental: '#' }), n('g/5', 'h'), n('a/5', 'h')] },
    { notes: [n('f/5', 'q', { accidental: '#' }), n('e/5', 'q'), n('d/5', 'w')] },
  ] },
  'ode-a-alegria': { systems: [
    { notes: [n('a/4', 'q'), n('a/4', 'q'), n('bb/4', 'q', { accidental: 'b' }), n('c/5', 'q'), n('c/5', 'q'), n('bb/4', 'q', { accidental: 'b' }), n('a/4', 'q'), n('g/4', 'q')] },
    { notes: [n('f/4', 'q'), n('f/4', 'q'), n('g/4', 'q'), n('a/4', 'q'), n('a/4', 'q', { dot: true }), n('g/4', '8'), n('g/4', 'h')] },
  ] },
  'swing-facil': { systems: [
    { notes: [n('f/4', 'q'), n('a/4', 'q'), n('c/5', 'q'), n('a/4', 'q')] },
    { notes: [n('bb/4', 'q', { accidental: 'b' }), n('g/4', 'q'), n('f/4', 'h')] },
  ] },
  'amazing-grace': { systems: [
    { label: 'Adaptação', notes: [n('f/4', 'q'), n('bb/4', 'h'), n('d/5', 'q'), n('bb/4', 'q'), n('f/5', 'h'), n('d/5', 'q'), n('bb/4', 'q')] },
    { notes: [n('c/5', 'q'), n('bb/4', 'h', { dot: true }), r('q'), n('bb/4', 'w')] },
  ] },
  'au-clair-de-la-lune': { systems: [
    { notes: [n('c/4', 'q'), n('c/4', 'q'), n('c/4', 'q'), n('d/4', 'q'), n('e/4', 'h')] },
    { notes: [n('d/4', 'q'), n('c/4', 'q'), n('e/4', 'q'), n('d/4', 'q'), n('d/4', 'h'), n('c/4', 'w')] },
  ] },
};

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildHtml(sc) {
  const score = SCORES[sc.slug];

  return `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: Georgia, 'Times New Roman', serif; color:#241405; }
  .page { padding: 50px 55px 70px; position: relative; min-height: 100vh; }
  .top { text-align:center; border-bottom: 2px solid #8B4513; padding-bottom: 16px; margin-bottom: 26px; }
  .brand { font-family: Arial, Helvetica, sans-serif; font-size:13px; font-weight:800; color:#8B4513; letter-spacing:0.04em; margin-bottom: 14px; }
  h1 { font-size:26px; margin: 0 0 6px; }
  .composer { font-size:13px; font-style: italic; color:#5a4530; margin-bottom: 10px; }
  .meta { font-family: Arial, Helvetica, sans-serif; font-size:11px; color:#8B4513; }
  .meta span { margin: 0 8px; }
  .score-label { font-family: Arial, Helvetica, sans-serif; font-size:11px; color:#8B4513; font-weight:700; margin-bottom: 2px; }
  .score-wrap { margin-bottom: 10px; }
  .footer { position:absolute; bottom: 22px; left:55px; right:55px; font-family: Arial, Helvetica, sans-serif; font-size:9.5px; color:#a8916f; display:flex; justify-content:space-between; border-top:1px solid #E8DCCB; padding-top:8px; }
</style>
</head>
<body>
  <div class="page">
    <div class="top">
      <div class="brand">♪ SAX TOOLS</div>
      <h1>${escapeHtml(sc.title)}</h1>
      <div class="composer">${escapeHtml(sc.composer)}</div>
      <div class="meta">
        <span>Tom: ${escapeHtml(sc.key)}</span>
        <span>${escapeHtml(INSTRUMENT_LABELS[sc.instrument] ?? sc.instrument)}</span>
        <span>${escapeHtml(LEVEL_LABELS[sc.level] ?? sc.level)}</span>
      </div>
    </div>
    <div id="score"></div>
    <div class="footer">
      <span>Sax Tools — Partitura</span>
      <span>saxtools.pt</span>
    </div>
  </div>
  <script>
    var module = { exports: {} };
    var exports = module.exports;
    ${VEXFLOW_SRC}
    window.VF = module.exports.Vex ? module.exports.Vex.Flow : module.exports;
  </script>
</body>
</html>`;
}

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
const { rows: scores } = await client.query(
  `select * from scores where slug = any($1::text[])`,
  [Object.keys(SCORES)]
);
await client.end();

mkdirSync('./relatorio/pdf_partituras', { recursive: true });

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
page.on('pageerror', (err) => console.log('PAGE EXCEPTION:', err.message));

for (const sc of scores) {
  const score = SCORES[sc.slug];
  await page.setContent(buildHtml(sc), { waitUntil: 'load' });

  const result = await page.evaluate(({ score }) => {
    try {
      const VF = window.VF;
      const { Renderer, Stave, StaveNote, Voice, Formatter, Beam, Annotation, Accidental, Articulation, Dot } = VF;
      const container = document.getElementById('score');
      const width = 680;
      const staveHeight = 120;

      for (const system of score.systems) {
        const wrap = document.createElement('div');
        wrap.className = 'score-wrap';
        if (system.label) {
          const lbl = document.createElement('div');
          lbl.className = 'score-label';
          lbl.textContent = system.label;
          wrap.appendChild(lbl);
        }
        const div = document.createElement('div');
        wrap.appendChild(div);
        container.appendChild(wrap);

        const renderer = new Renderer(div, Renderer.Backends.SVG);
        renderer.resize(width + 30, staveHeight);
        const context = renderer.getContext();

        const stave = new Stave(10, 0, width);
        stave.addClef('treble');
        stave.setContext(context).draw();

        const notes = system.notes.map((spec) => {
          const duration = spec.duration + (spec.rest ? 'r' : '');
          const note = new StaveNote({ keys: spec.keys, duration });
          if (spec.accidental) note.addModifier(new Accidental(spec.accidental), 0);
          if (spec.dot) Dot.buildAndAttach([note], { all: true });
          if (spec.stacc) note.addModifier(new Articulation('a.').setPosition(3), 0);
          if (spec.text) {
            const ann = new Annotation(spec.text);
            ann.setFont('Arial', 10, 'italic');
            ann.setVerticalJustification(Annotation.VerticalJustify.TOP);
            note.addModifier(ann, 0);
          }
          return note;
        });

        const voice = new Voice({ numBeats: 64, beatValue: 4 }).setMode(Voice.Mode.SOFT);
        voice.addTickables(notes);
        new Formatter().joinVoices([voice]).format([voice], width - 60);
        voice.draw(context, stave);

        const beams = Beam.generateBeams(notes);
        beams.forEach((b) => b.setContext(context).draw());
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message + '\\n' + (e.stack || '') };
    }
  }, { score });

  if (!result.ok) {
    console.log('SCORE ERROR', sc.slug, result.error);
    continue;
  }

  const pdfPath = `./relatorio/pdf_partituras/${sc.slug}.pdf`;
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
  console.log('OK', sc.slug);
}

await browser.close();
