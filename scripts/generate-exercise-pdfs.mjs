// Gera uma "ficha de exercício" em PDF (1 página A4) para cada exercício, com objetivo,
// tempo/material, uma PARTITURA REAL (VexFlow — clave, notas e ritmos verdadeiros, não
// apenas nomes de notas em caixas) e um guia "como praticar" escrito especificamente para
// cada exercício.
import { chromium } from 'playwright';
import { Client } from 'pg';
import { mkdirSync, readFileSync } from 'fs';

const VEXFLOW_SRC = readFileSync('./node_modules/vexflow/build/cjs/vexflow.js', 'utf-8');

const CATEGORY_LABELS = { tecnica: 'Técnica', escalas: 'Escalas', improvisacao: 'Improvisação', leitura: 'Leitura' };
const LEVEL_LABELS = { iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado' };

const STEPS = {
  'articulacao-staccato-basica': [
    'Toque uma nota longa e estável antes de começar, para preparar a embocadura.',
    'Isole uma única nota e repita-a em staccato, com paragens claras entre os sons.',
    'Use o metrónomo a 70 bpm e toque uma nota staccato por tempo.',
    'Suba o andamento 5 bpm de cada vez, só depois de soar uniforme.',
  ],
  'articulacao-dupla-passagens-rapidas': [
    'Pratique a sílaba "du-gu" falando, sem o saxofone, num pulso constante.',
    'Aplique "du-gu" ao fragmento de escala da partitura, devagar.',
    'Repita o mesmo fragmento subindo um pouco o andamento.',
    'Suba o andamento progressivamente até à passagem completa em tempo real.',
  ],
  'long-tones-fundamentacao-do-som': [
    'Afine a primeira nota com o afinador antes de sustentar.',
    'Sustenha cada nota da partitura por 4 tempos, com fluxo de ar constante.',
    'Avance nota a nota, sempre com a mesma qualidade de som.',
    'Ouça-se com atenção: o som deve manter-se igual do início ao fim de cada nota.',
  ],
  'long-tones-crescendo-decrescendo': [
    'Sustenha a primeira nota e cresça o volume gradualmente, como indicado.',
    'Sem parar, diminua o volume gradualmente na segunda nota.',
    'Mantenha a afinação estável mesmo quando o volume muda.',
    'Repita subindo cromaticamente pela extensão confortável do instrumento.',
  ],
  'velocidade-escalas-semicolcheias': [
    'Toque a escala da partitura em semicolcheias, devagar.',
    'Identifique os dedos mais lentos e isole essas passagens.',
    'Suba o metrónomo em incrementos de 5 bpm, só avançando quando estiver uniforme.',
    'Pratique sempre subindo e descendo a escala.',
  ],
  'velocidade-saltos-intervalares': [
    'Toque os dois extremos de cada salto separadamente, devagar.',
    'Junte os saltos da partitura a um andamento lento, sem perder a precisão.',
    'Aumente o andamento gradualmente, mantendo a afinação da nota de chegada.',
    'Varie o tamanho dos intervalos para ganhar confiança em saltos diferentes.',
  ],
  'arpejos-triades-duas-oitavas': [
    'Toque a tríade numa oitava, subindo, devagar.',
    'Estenda o mesmo padrão para a segunda oitava, como na partitura.',
    'Use o metrónomo e mantenha as notas com duração igual.',
    'Repita em diferentes tonalidades quando estiver confortável.',
  ],
  'arpejos-tetrades-maj7-m7-dom7': [
    'Toque o arpejo de Cmaj7 isoladamente, como na partitura.',
    'Repita o mesmo processo para Dm7 e depois para G7.',
    'Toque a sequência Cmaj7 → Dm7 → G7 em tempo, sem pausas entre eles.',
    'Aumente o andamento gradualmente com o metrónomo.',
  ],
  'escalas-maiores-todas-tonalidades': [
    'Toque a escala de Dó Maior subindo e descendo, como na partitura.',
    'Avance para tonalidades com um sustenido ou bemol antes de seguir para as seguintes.',
    'Mantenha o mesmo andamento em todas até estarem uniformes.',
    'Use o metrónomo e suba o andamento progressivamente.',
  ],
  'escalas-maiores-em-tercas': [
    'Toque a escala normal primeiro, para fixar bem as notas.',
    'Aplique o padrão de terças da partitura devagar.',
    'Mantenha o pulso constante mesmo com os saltos de terça.',
    'Repita subindo e descendo, depois experimente noutra tonalidade.',
  ],
  'escalas-menores-natural-harmonica': [
    'Toque a escala menor natural da partitura, subindo.',
    'Toque a escala menor harmónica, prestando atenção ao 7º grau elevado.',
    'Alterne entre as duas para sentir bem a diferença sonora.',
    'Pratique ambas com metrónomo, num andamento confortável.',
  ],
  'escala-menor-melodica-em-jazz': [
    'Toque a escala menor melódica da partitura (6º e 7º graus elevados).',
    'Toque a escala menor natural a descer, para comparar.',
    'Use um playback ou um som fixo na tónica como referência harmónica.',
    'Aplique a escala sobre um acorde menor com sétima maior.',
  ],
  'construindo-frases-2-compassos': [
    'Toque a frase de exemplo da partitura sobre o playback.',
    'Repare como a frase termina numa nota estável do acorde.',
    'Crie a sua própria frase de 2 compassos com a mesma ideia.',
    'Repita variando o ritmo da frase, mantendo a mesma duração.',
  ],
  'frases-com-motivos-repetidos': [
    'Toque o motivo de exemplo na partitura, exatamente como está escrito.',
    'Repare como o mesmo motivo é repetido um grau acima.',
    'Grave-se e ouça se o motivo se mantém reconhecível ao deslocá-lo.',
    'Experimente repetir o motivo a partir de mais notas da escala.',
  ],
  'improvisando-sobre-ii-v-i': [
    'Toque a linha de notas-guia da partitura sobre o playback.',
    'Identifique a 3ª e a 7ª de cada acorde marcadas na partitura.',
    'Construa frases curtas que liguem as notas-guia de um acorde ao seguinte.',
    'Repita o ciclo várias vezes, variando a frase a cada passagem.',
  ],
  'ii-v-i-todas-tonalidades': [
    'Domine bem o ii-V-I em Dó Maior (1º sistema da partitura).',
    'Aplique o mesmo raciocínio de notas-guia na tonalidade de Ré (2º sistema).',
    'Use o playback para testar cada tonalidade em contexto real.',
    'Continue o ciclo por outras tonalidades, com calma.',
  ],
  'patterns-3-notas-escala-maior': [
    'Toque o pattern de exemplo na partitura, exatamente como está escrito.',
    'Repare como o mesmo pattern se repete a partir do grau seguinte.',
    'Use o playback de apoio para manter o pulso constante.',
    'Experimente tocar o mesmo pattern a descer a escala também.',
  ],
  'patterns-bebop-sobre-dominante': [
    'Aprenda o pattern da partitura isoladamente, sem o playback, bem lento.',
    'Identifique a nota cromática de passagem (entre o 7º grau e a tónica).',
    'Aplique o pattern sobre o acorde G7 com o playback.',
    'Aumente o andamento gradualmente, mantendo a articulação clara.',
  ],
  'primeira-vista-melodias-curtas': [
    'Olhe a melodia inteira antes de tocar, identificando saltos e ritmos difíceis.',
    'Confirme mentalmente a fórmula de compasso e a tonalidade.',
    'Toque do início ao fim sem parar, mesmo que erre alguma nota.',
    'Repita a mesma melodia uma segunda vez — já deve sair mais fluente.',
  ],
  'primeira-vista-repertorio-de-banda': [
    'Confirme a clave, a tonalidade (1 bemol) e a fórmula de compasso antes de começar.',
    'Localize as zonas de maior dificuldade rítmica ou de afinação.',
    'Toque a parte do início ao fim, mantendo o tempo do clique.',
    'Repita com uma parte diferente do naipe para ganhar versatilidade.',
  ],
  'leitura-ritmica-seminimas-colcheias': [
    'Bata o ritmo da partitura com a mão antes de tocar, contando em voz alta.',
    'Toque o padrão rítmico numa só nota, seguindo o clique.',
    'Repita até o ritmo soar natural, sem hesitações.',
    'Aplique o mesmo ritmo a uma pequena melodia.',
  ],
  'leitura-ritmica-sincopes': [
    'Identifique visualmente onde estão as síncopes na partitura.',
    'Bata o ritmo com a mão, marcando bem o contratempo.',
    'Toque o padrão numa só nota, apoiado no metrónomo.',
    'Aplique o mesmo ritmo numa melodia curta.',
  ],
  'solfejo-intervalos-simples': [
    'Ouça a primeira nota de cada par como referência.',
    'Cante cada intervalo da partitura a partir da primeira nota, sem tocar.',
    'Confirme a nota tocando-a depois de cantar.',
    'Repita os mesmos intervalos, sempre a partir da mesma referência.',
  ],
  'solfejo-ritmico-com-nomes-de-notas': [
    'Ouça a referência e mantenha o pulso com o metrónomo.',
    'Cante a melodia da partitura dizendo o nome de cada nota, sem tocar.',
    'Verifique se o ritmo cantado corresponde exatamente ao escrito.',
    'Repita aumentando ligeiramente o andamento.',
  ],
};

// Partituras reais (VexFlow) por exercício — clave de sol (parte escrita de saxofone).
// Cada nota: { keys: ['c/4'], duration: 'q'|'8'|'16'|'h'|'w', rest?, accidental?: '#'|'b'|'n',
// dot?, stacc?, text? }. `systems`: 1 ou 2 pautas (ex.: comparar escala natural vs. harmónica).
const n = (keys, duration, opts = {}) => ({ keys: keys.split(' '), duration, ...opts });
const r = (duration) => ({ keys: ['b/4'], duration, rest: true });

const SCORES = {
  'articulacao-staccato-basica': { systems: [{ notes: Array.from({ length: 8 }, () => n('g/4', 'q', { stacc: true })) }] },
  'articulacao-dupla-passagens-rapidas': { systems: [{ notes: ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'f/4', 'e/4', 'd/4'].map((k) => n(k, '16')) }] },
  'long-tones-fundamentacao-do-som': { systems: [{ notes: [n('bb/3', 'w', { accidental: 'b' }), n('c/4', 'w'), n('d/4', 'w'), n('eb/4', 'w', { accidental: 'b' })] }] },
  'long-tones-crescendo-decrescendo': { systems: [{ notes: [n('c/4', 'w', { text: 'cresc.' }), n('d/4', 'w', { text: 'decresc.' })] }] },
  'velocidade-escalas-semicolcheias': { systems: [{ notes: ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5', 'c/5', 'b/4', 'a/4', 'g/4', 'f/4', 'e/4', 'd/4', 'c/4'].map((k) => n(k, '16')) }] },
  'velocidade-saltos-intervalares': { systems: [{ notes: ['c/4', 'g/4', 'd/4', 'a/4', 'e/4', 'b/4', 'f/4', 'c/5'].map((k) => n(k, 'q')) }] },
  'arpejos-triades-duas-oitavas': { systems: [
    { label: 'Subindo', notes: ['c/4', 'e/4', 'g/4', 'c/5', 'e/5', 'g/5', 'c/6'].map((k) => n(k, 'q')) },
    { label: 'Descendo', notes: ['c/6', 'g/5', 'e/5', 'c/5', 'g/4', 'e/4', 'c/4'].map((k) => n(k, 'q')) },
  ] },
  'arpejos-tetrades-maj7-m7-dom7': { systems: [{ notes: [
    n('c/4', 'q', { text: 'Cmaj7' }), n('e/4', 'q'), n('g/4', 'q'), n('b/4', 'q'),
    n('d/4', 'q', { text: 'Dm7' }), n('f/4', 'q'), n('a/4', 'q'), n('c/5', 'q'),
    n('g/4', 'q', { text: 'G7' }), n('b/4', 'q'), n('d/5', 'q'), n('f/5', 'q'),
  ] }] },
  'escalas-maiores-todas-tonalidades': { systems: [
    { label: 'Subindo', notes: ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'].map((k) => n(k, '8')) },
    { label: 'Descendo', notes: ['c/5', 'b/4', 'a/4', 'g/4', 'f/4', 'e/4', 'd/4', 'c/4'].map((k) => n(k, '8')) },
  ] },
  'escalas-maiores-em-tercas': { systems: [{ notes: ['c/4', 'e/4', 'd/4', 'f/4', 'e/4', 'g/4', 'f/4', 'a/4'].map((k) => n(k, '8')) }] },
  'escalas-menores-natural-harmonica': { systems: [
    { label: 'Lá natural', notes: ['a/4', 'b/4', 'c/5', 'd/5', 'e/5', 'f/5', 'g/5', 'a/5'].map((k) => n(k, '8')) },
    { label: 'Lá harmónica', notes: [n('a/4', '8'), n('b/4', '8'), n('c/5', '8'), n('d/5', '8'), n('e/5', '8'), n('f/5', '8'), n('g/5', '8', { accidental: '#' }), n('a/5', '8')] },
  ] },
  'escala-menor-melodica-em-jazz': { systems: [{ notes: [n('a/4', '8'), n('b/4', '8'), n('c/5', '8'), n('d/5', '8'), n('e/5', '8'), n('f/5', '8', { accidental: '#' }), n('g/5', '8', { accidental: '#' }), n('a/5', '8')] }] },
  'construindo-frases-2-compassos': { systems: [{ notes: [n('c/5', 'q', { text: 'Cmaj7' }), n('b/4', '8'), n('a/4', '8'), n('g/4', 'q'), n('e/4', 'h')] }] },
  'frases-com-motivos-repetidos': { systems: [{ notes: [
    n('c/4', '8', { text: 'Motivo' }), n('d/4', '8'), n('e/4', '8'), r('8'),
    n('d/4', '8', { text: 'Repetido 1 grau acima' }), n('e/4', '8'), n('f/4', '8'), r('8'),
  ] }] },
  'improvisando-sobre-ii-v-i': { systems: [{ notes: [n('d/4', 'h', { text: 'Dm7 (3ª)' }), n('f/4', 'h'), n('g/4', 'h', { text: 'G7 (3ª)' }), n('b/4', 'h'), n('c/5', 'w', { text: 'Cmaj7' })] }] },
  'ii-v-i-todas-tonalidades': { systems: [
    { label: 'Dó Maior', notes: [n('d/4', 'h', { text: 'Dm7' }), n('f/4', 'h'), n('g/4', 'h', { text: 'G7' }), n('b/4', 'h'), n('c/5', 'w', { text: 'Cmaj7' })] },
    { label: 'Ré Maior', notes: [n('e/4', 'h', { text: 'Em7' }), n('g/4', 'h'), n('a/4', 'h', { text: 'A7' }), n('c/5', 'h', { accidental: '#' }), n('d/5', 'w', { text: 'Dmaj7' })] },
  ] },
  'patterns-3-notas-escala-maior': { systems: [{ notes: [
    n('c/4', '8'), n('d/4', '8'), n('e/4', '8'), r('8'),
    n('d/4', '8'), n('e/4', '8'), n('f/4', '8'), r('8'),
    n('e/4', '8'), n('f/4', '8'), n('g/4', '8'), r('8'),
  ] }] },
  'patterns-bebop-sobre-dominante': { systems: [{ notes: ['g/4', 'a/4', 'b/4', 'c/5', 'd/5', 'e/5', 'f/5'].map((k) => n(k, '8')).concat([n('f/5', '8', { accidental: '#', text: 'cromatismo' }), n('g/5', '8')]) }] },
  'primeira-vista-melodias-curtas': { systems: [{ notes: [n('c/4', 'q'), n('e/4', 'q'), n('d/4', '8'), n('f/4', '8'), n('e/4', 'q'), n('g/4', 'q'), n('f/4', '8'), n('e/4', '8'), n('d/4', 'q'), n('c/4', 'q'), n('e/4', '8'), n('d/4', '8'), n('c/4', 'h')] }] },
  'primeira-vista-repertorio-de-banda': { systems: [{ notes: [n('f/4', 'q'), n('g/4', '8'), n('a/4', '8'), n('bb/4', 'q', { accidental: 'b', dot: true }), n('c/5', '8'), n('bb/4', 'q', { accidental: 'b' }), n('a/4', 'q'), n('g/4', '8'), n('f/4', '8'), n('f/4', 'h')] }] },
  'leitura-ritmica-seminimas-colcheias': { systems: [{ notes: [n('b/4', 'q'), n('b/4', 'q'), n('b/4', '8'), n('b/4', '8'), n('b/4', 'q'), n('b/4', 'q'), n('b/4', '8'), n('b/4', '8'), n('b/4', '8'), n('b/4', '8'), n('b/4', 'q'), n('b/4', 'q')] }] },
  'leitura-ritmica-sincopes': { systems: [{ notes: [r('8'), n('b/4', '8'), n('b/4', 'q'), n('b/4', '8'), n('b/4', '8'), n('b/4', 'q'), r('8'), n('b/4', '8'), n('b/4', 'q'), n('b/4', 'q')] }] },
  'solfejo-intervalos-simples': { systems: [{ notes: [n('c/4', 'q'), n('e/4', 'q', { text: '3ª' }), n('c/4', 'q'), n('g/4', 'q', { text: '5ª' }), n('c/4', 'q'), n('c/5', 'q', { text: '8ª' }), n('c/4', 'q'), n('f/4', 'q', { text: '4ª' })] }] },
  'solfejo-ritmico-com-nomes-de-notas': { systems: [{ notes: [n('c/4', 'q'), n('d/4', 'q'), n('e/4', '8'), n('d/4', '8'), n('c/4', 'q'), n('d/4', 'h')] }] },
};

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildHtml(ex) {
  const steps = STEPS[ex.slug] ?? [];
  const score = SCORES[ex.slug];

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
  h1 { font-size:25px; margin: 6px 0 18px; color:#241405; }
  .meta-grid { display:flex; gap:14px; margin-bottom:18px; }
  .meta-card { flex:1; border:1px solid #E8DCCB; border-radius:10px; padding:10px 14px; }
  .meta-label { font-size:10px; color:#8B4513; text-transform:uppercase; font-weight:700; margin-bottom:4px; letter-spacing:0.03em; }
  .meta-value { font-size:12.5px; line-height:1.35; }
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
        <span class="badge">${escapeHtml(CATEGORY_LABELS[ex.category])}</span>
        ${ex.subcategory ? `<span class="badge">${escapeHtml(ex.subcategory)}</span>` : ''}
        <span class="badge level">${escapeHtml(LEVEL_LABELS[ex.level])}</span>
      </div>
    </div>
    <h1>${escapeHtml(ex.title)}</h1>
    <div class="meta-grid">
      <div class="meta-card"><div class="meta-label">Objetivo</div><div class="meta-value">${escapeHtml(ex.description)}</div></div>
      <div class="meta-card"><div class="meta-label">Tempo estimado</div><div class="meta-value">${ex.estimated_minutes ? ex.estimated_minutes + ' minutos' : 'Não informado'}</div></div>
      <div class="meta-card"><div class="meta-label">Material necessário</div><div class="meta-value">${escapeHtml(ex.materials_needed ?? 'Não informado')}</div></div>
    </div>
    ${score ? `<div class="section-title">Partitura</div><div id="score"></div>` : ''}
    <div class="section-title">Como praticar</div>
    <ol class="steps">${steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
    <div class="footer">
      <span>Sax Tools — Ficha de Exercício</span>
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
const { rows: exercises } = await client.query('select * from exercises order by category, subcategory, level');
await client.end();

mkdirSync('./relatorio/pdf_exercicios', { recursive: true });

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
page.on('pageerror', (err) => console.log('PAGE EXCEPTION:', err.message));

for (const ex of exercises) {
  const score = SCORES[ex.slug];
  await page.setContent(buildHtml(ex), { waitUntil: 'load' });

  if (score) {
    const result = await page.evaluate(({ score }) => {
      try {
        const VF = window.VF;
        const { Renderer, Stave, StaveNote, Voice, Formatter, Beam, Annotation, Accidental, Articulation, Dot } = VF;
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
            if (spec.dot) Dot.buildAndAttach([note], { all: true });
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
      console.log('SCORE ERROR', ex.slug, result.error);
      continue;
    }
  }

  const pdfPath = `./relatorio/pdf_exercicios/${ex.slug}.pdf`;
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
  console.log('OK', ex.slug);
}

await browser.close();
