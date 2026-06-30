// Gera um "guia de estudo" em PDF (1 página A4) para os métodos próprios da Sax Tools que
// ainda não tinham PDF: objetivo, plano de estudo progressivo e um exemplo notado real (VexFlow).
import { chromium } from 'playwright';
import { Client } from 'pg';
import { mkdirSync, readFileSync } from 'fs';

const VEXFLOW_SRC = readFileSync('./node_modules/vexflow/build/cjs/vexflow.js', 'utf-8');

const LEVEL_LABELS = { iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado' };
const CATEGORY_LABELS = { iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado', tecnica: 'Técnica', improvisacao: 'Improvisação', leitura: 'Leitura' };

const PLANS = {
  'articulacao-avancada': [
    'Pratique o exemplo em legato (notas ligadas), sem nenhuma separação entre elas.',
    'Repita o mesmo exemplo agora todo em staccato, com paragens claras.',
    'Aplique articulação dupla ("du-gu") na passagem rápida, devagar com metrónomo.',
    'Suba o andamento progressivamente, mantendo a clareza de cada nota.',
    'Misture os três tipos de articulação numa única passagem, como indicado na partitura.',
  ],
  'escalas-e-arpejos-no-dia-a-dia': [
    'Escolha uma tonalidade por dia e toque a escala maior em duas oitavas.',
    'Continue com o arpejo da tríade na mesma tonalidade, como no exemplo.',
    'Combine escala e arpejo numa só frase, sem parar entre eles.',
    'Use o metrónomo e aumente o andamento apenas quando estiver limpo.',
    'No fim da semana, percorra todas as tonalidades praticadas em sequência.',
  ],
  'fundamentos-do-som': [
    'Afine a primeira nota com calma antes de sustentar.',
    'Sustenha cada nota do exemplo por 4 a 6 tempos, com fluxo de ar constante.',
    'Concentre-se em manter o mesmo timbre do início ao fim da nota.',
    'Avance nota a nota, sempre com a mesma qualidade de som.',
    'Grave-se uma vez por semana para ouvir a evolução do som.',
  ],
  'improvisacao-sobre-ii-v-i': [
    'Aprenda o vocabulário do exemplo isoladamente, sem o playback.',
    'Identifique as notas-guia (3ª e 7ª) de cada acorde na frase.',
    'Toque o exemplo sobre um playback de ii-V-I em Dó Maior.',
    'Transponha o mesmo vocabulário para outras tonalidades.',
    'Combine frases próprias com o vocabulário aprendido.',
  ],
  'leitura-a-primeira-vista-nivel-1': [
    'Olhe a melodia inteira antes de tocar: tonalidade, compasso e saltos.',
    'Bata o ritmo com a mão antes de tocar a melodia.',
    'Toque do início ao fim sem parar, mesmo que erre alguma nota.',
    'Repita a mesma melodia uma segunda vez — já deve sair mais fluente.',
    'Pratique uma melodia nova por dia, sempre com este processo.',
  ],
  'leitura-avancada-em-big-band': [
    'Confirme a clave, tonalidade e fórmula de compasso antes de começar.',
    'Localize os acentos e as indicações de dinâmica na partitura.',
    'Toque devagar respeitando todas as dinâmicas marcadas.',
    'Suba ao andamento real, mantendo o tempo do clique.',
    'Pratique a entrada e saída de cada frase como faria num naipe.',
  ],
  'linguagem-bebop-avancada': [
    'Aprenda a frase isoladamente, bem devagar, sem o playback.',
    'Identifique a nota cromática de passagem usada na frase.',
    'Aplique a frase sobre o acorde correspondente com o playback.',
    'Experimente encaixar a mesma frase numa progressão ii-V-I completa.',
    'Aumente o andamento gradualmente, mantendo a articulação bebop (legato/staccato alternados).',
  ],
  'long-tones-e-controle-de-ar': [
    'Inspire profundamente, sem levantar os ombros.',
    'Sustenha cada nota do exemplo o máximo de tempo possível com som estável.',
    'Cronometre a duração de cada nota e tente aumentar semana a semana.',
    'Mantenha a afinação estável do início ao fim, ajudado pelo afinador.',
    'Termine sempre com uma nota confortável, para não forçar a embocadura.',
  ],
  'preparacao-para-audicoes': [
    'Liste as escalas, arpejos e excertos exigidos na audição.',
    'Pratique o exemplo técnico abaixo a tempo lento, depois no andamento exigido.',
    'Grave-se a tocar o repertório completo, do início ao fim, sem parar.',
    'Ouça a gravação e anote os três pontos a melhorar primeiro.',
    'Simule a audição: toque uma vez só, como se fosse a avaliação real.',
  ],
  'primeiros-passos-na-improvisacao': [
    'Toque a escala pentatónica do exemplo, subindo e descendo.',
    'Use apenas essas 5 notas para criar frases curtas sobre um acorde fixo.',
    'Toque uma frase, pare, e responda com outra frase diferente.',
    'Experimente começar as frases em notas diferentes da escala.',
    'Grave-se a improvisar 1 minuto só com a pentatónica.',
  ],
  'repertorio-solo-avancado': [
    'Cante a frase do exemplo antes de tocar, para sentir a expressão musical.',
    'Toque a frase devagar, cuidando da dinâmica e do vibrato.',
    'Trabalhe as passagens tecnicamente difíceis isoladamente.',
    'Junte tudo num tempo confortável, com fraseado musical.',
    'Aproxime-se gradualmente do andamento e expressividade de concerto.',
  ],
  'ritmos-e-sincopes': [
    'Bata o ritmo do exemplo com a mão, contando em voz alta.',
    'Identifique visualmente onde estão as síncopes (notas fora do tempo forte).',
    'Toque o ritmo numa só nota, apoiado no metrónomo.',
    'Aplique o mesmo ritmo a uma pequena melodia conhecida.',
    'Pratique com o metrónomo só nos tempos 2 e 4, para sentir o contratempo.',
  ],
  'saxofone-para-criancas-e-adolescentes': [
    'Aprenda as notas da melodia uma a uma, com calma e sem pressa.',
    'Cante a melodia com o nome das notas antes de tocar.',
    'Toque a melodia devagar, repetindo as partes mais difíceis.',
    'Toque a melodia inteira como se fosse uma pequena apresentação.',
    'Celebre cada melodia aprendida — a prática deve ser divertida!',
  ],
};

const n = (keys, duration, opts = {}) => ({ keys: keys.split(' '), duration, ...opts });
const r = (duration) => ({ keys: ['b/4'], duration, rest: true });

const SCORES = {
  'articulacao-avancada': { systems: [{ notes: [
    n('c/4', 'q', { text: 'legato' }), n('d/4', 'q'), n('e/4', 'q'), n('f/4', 'q'),
    n('g/4', 'q', { text: 'staccato', stacc: true }), n('f/4', 'q', { stacc: true }), n('e/4', 'q', { stacc: true }), n('d/4', 'q', { stacc: true }),
    n('c/4', '16', { text: 'du-gu' }), n('d/4', '16'), n('e/4', '16'), n('f/4', '16'), n('g/4', '16'), n('f/4', '16'), n('e/4', '16'), n('d/4', '16'),
  ] }] },
  'escalas-e-arpejos-no-dia-a-dia': { systems: [
    { label: 'Escala', notes: ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'].map((k) => n(k, '8')) },
    { label: 'Arpejo', notes: ['c/4', 'e/4', 'g/4', 'c/5', 'g/4', 'e/4', 'c/4'].map((k) => n(k, 'q')) },
  ] },
  'fundamentos-do-som': { systems: [{ notes: [n('c/4', 'w'), n('d/4', 'w'), n('e/4', 'w'), n('f/4', 'w')] }] },
  'improvisacao-sobre-ii-v-i': { systems: [{ notes: [
    n('d/4', 'q', { text: 'Dm7' }), n('f/4', '8'), n('g/4', '8'), n('a/4', 'q'),
    n('g/4', 'q', { text: 'G7' }), n('f/4', '8'), n('e/4', '8'), n('d/4', '8', { accidental: '#' }),
    n('c/5', 'h', { text: 'Cmaj7' }),
  ] }] },
  'leitura-a-primeira-vista-nivel-1': { systems: [{ notes: [n('c/4', 'q'), n('d/4', 'q'), n('e/4', 'q'), n('d/4', 'q'), n('c/4', 'h'), r('q'), n('e/4', 'q'), n('c/4', 'h')] }] },
  'leitura-avancada-em-big-band': { systems: [{ notes: [
    n('f/4', 'q', { stacc: true, text: 'mf' }), n('g/4', '8'), n('a/4', '8'), n('bb/4', 'q', { accidental: 'b', text: 'f' }),
    r('8'), n('c/5', '8', { stacc: true }), n('bb/4', '8', { accidental: 'b', stacc: true }), n('a/4', '8', { stacc: true }), n('g/4', '8', { stacc: true }),
    n('f/4', 'h', { text: 'dim.' }),
  ] }] },
  'linguagem-bebop-avancada': { systems: [{ notes: ['g/4', 'a/4', 'b/4', 'c/5', 'd/5', 'e/5', 'f/5'].map((k) => n(k, '8')).concat([n('f/5', '8', { accidental: '#', text: 'cromatismo' }), n('g/5', 'q')]) }] },
  'long-tones-e-controle-de-ar': { systems: [{ notes: [n('bb/3', 'w', { accidental: 'b' }), n('c/4', 'w'), n('f/4', 'w'), n('bb/4', 'w', { accidental: 'b' })] }] },
  'preparacao-para-audicoes': { systems: [
    { label: 'Escala', notes: ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'].map((k) => n(k, '8')) },
    { label: 'Excerto técnico', notes: [n('c/5', 'q', { text: 'f' }), n('g/4', '8'), n('e/4', '8'), n('c/4', 'h')] },
  ] },
  'primeiros-passos-na-improvisacao': { systems: [{ notes: ['c/4', 'd/4', 'f/4', 'g/4', 'a/4', 'c/5', 'a/4', 'g/4', 'f/4', 'd/4', 'c/4'].map((k) => n(k, '8')) }] },
  'repertorio-solo-avancado': { systems: [{ notes: [n('e/5', 'h', { text: 'espressivo' }), n('d/5', 'q'), n('c/5', 'q'), n('b/4', 'h'), n('g/4', 'h')] }] },
  'ritmos-e-sincopes': { systems: [{ notes: [r('8'), n('b/4', '8'), n('b/4', 'q'), n('b/4', '8'), n('b/4', '8'), n('b/4', 'q'), r('8'), n('b/4', '8'), n('b/4', 'h')] }] },
  'saxofone-para-criancas-e-adolescentes': { systems: [{ notes: [n('e/4', 'q'), n('d/4', 'q'), n('c/4', 'q'), n('e/4', 'q'), n('d/4', 'q'), n('c/4', 'h'), n('c/4', 'q'), n('c/4', 'q'), n('c/4', 'q'), n('c/4', 'q'), n('d/4', 'q'), n('d/4', 'q'), n('d/4', 'q'), n('d/4', 'q'), n('e/4', 'q'), n('d/4', 'q'), n('c/4', 'h')] }] },
};

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildHtml(m) {
  const plan = PLANS[m.slug] ?? [];
  const score = SCORES[m.slug];

  return `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: Arial, Helvetica, sans-serif; color:#3D2817; }
  .page { padding: 40px 50px 70px; position: relative; min-height: 100vh; }
  .header { display:flex; align-items:center; justify-content:space-between; border-bottom: 3px solid #8B4513; padding-bottom:14px; margin-bottom:20px; }
  .logo { font-size:20px; font-weight:800; color:#8B4513; }
  .badges { display:flex; gap:6px; }
  .badge { font-size:11px; padding:4px 10px; border-radius:999px; background:#F5E6D3; color:#8B4513; font-weight:700; white-space:nowrap; }
  .badge.level { background:#FCE3D3; color:#B5481D; }
  h1 { font-size:25px; margin: 6px 0 4px; color:#241405; }
  .subtitle { font-size:12px; color:#8B4513; margin-bottom:16px; }
  .desc { font-size:12.5px; line-height:1.5; margin-bottom: 18px; }
  .section-title { font-size:14px; font-weight:700; color:#8B4513; margin: 16px 0 6px; }
  ol.steps { margin:0; padding-left:20px; }
  ol.steps li { margin-bottom:7px; font-size:12.5px; line-height:1.4; }
  .score-label { font-size:11px; color:#8B4513; font-weight:700; margin-bottom: 0; }
  .score-wrap { margin-bottom: 2px; }
  .footer { position:absolute; bottom: 22px; left:50px; right:50px; font-size:9.5px; color:#a8916f; display:flex; justify-content:space-between; border-top:1px solid #E8DCCB; padding-top:8px; }
</style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">♪ Sax Tools</div>
      <div class="badges">
        ${m.category && m.category !== m.level ? `<span class="badge">${escapeHtml(CATEGORY_LABELS[m.category] ?? m.category)}</span>` : ''}
        <span class="badge level">${escapeHtml(LEVEL_LABELS[m.level] ?? m.level)}</span>
      </div>
    </div>
    <h1>${escapeHtml(m.title)}</h1>
    <div class="subtitle">Guia de Estudo — Sax Tools</div>
    <div class="desc">${escapeHtml(m.description)}</div>
    ${score ? `<div class="section-title">Exemplo</div><div id="score"></div>` : ''}
    <div class="section-title">Plano de estudo</div>
    <ol class="steps">${plan.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
    <div class="footer">
      <span>Sax Tools — Guia de Estudo</span>
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
const { rows: methods } = await client.query(
  `select * from methods where slug = any($1::text[])`,
  [Object.keys(PLANS)]
);
await client.end();

mkdirSync('./relatorio/pdf_metodos', { recursive: true });

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
page.on('pageerror', (err) => console.log('PAGE EXCEPTION:', err.message));

for (const m of methods) {
  const score = SCORES[m.slug];
  await page.setContent(buildHtml(m), { waitUntil: 'load' });

  if (score) {
    const result = await page.evaluate(({ score }) => {
      try {
        const VF = window.VF;
        const { Renderer, Stave, StaveNote, Voice, Formatter, Beam, Annotation, Accidental, Articulation } = VF;
        const container = document.getElementById('score');
        const width = 700;
        const staveHeight = 110;

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
          renderer.resize(width, staveHeight);
          const context = renderer.getContext();

          const stave = new Stave(10, 0, width - 20);
          stave.addClef('treble');
          stave.setContext(context).draw();

          const notes = system.notes.map((spec) => {
            const duration = spec.duration + (spec.rest ? 'r' : '');
            const note = new StaveNote({ keys: spec.keys, duration });
            if (spec.accidental) note.addModifier(new Accidental(spec.accidental), 0);
            if (spec.stacc) note.addModifier(new Articulation('a.').setPosition(3), 0);
            if (spec.text) {
              const ann = new Annotation(spec.text);
              ann.setFont('Arial', 10, 'bold');
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
      console.log('SCORE ERROR', m.slug, result.error);
      continue;
    }
  }

  const pdfPath = `./relatorio/pdf_metodos/${m.slug}.pdf`;
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
  console.log('OK', m.slug);
}

await browser.close();
