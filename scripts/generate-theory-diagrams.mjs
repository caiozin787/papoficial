// Gera diagramas SVG explicativos (não fotográficos) para os 14 artigos de Teoria Musical.
// Cores seguem o tema do site (marrom/âmbar + teal), sem depender de nenhuma imagem externa.
import { writeFileSync, mkdirSync } from 'fs';

const BG = '#FFFBF5';
const INK = '#3D2817';
const PRIMARY = '#8B4513';
const SECONDARY = '#F5E6D3';
const ACCENT = '#14B8A6';
const WARN = '#C2410C';
const W = 1000, H = 460;

const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

// O título não é desenhado dentro da imagem: a página já mostra o título da teoria
// junto ao banner, e texto colado ao topo do SVG era cortado pelo "object-cover".
function svgWrap(title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${body}
</svg>`;
}

function rect(x, y, w, h, fill, stroke = PRIMARY, sw = 2, rx = 10) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function text(x, y, s, { size = 20, weight = 600, color = INK, anchor = 'middle' } = {}) {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(s)}</text>`;
}

function caption(s, y = H - 28) {
  return text(W / 2, y, s, { size: 18, weight: 500, color: PRIMARY });
}

/**
 * Tira horizontal cromática de 13 caixas (0..12 semitons a partir da tónica).
 * highlightSet: Set de semitons (0-11) a destacar a teal; 0 é sempre a tónica (marrom).
 * degreeLabels: mapa semitone -> texto a mostrar abaixo da caixa destacada (grau, etc.)
 */
function chromaticStrip({ highlightSet = new Set([0]), degreeLabels = {}, extraNoteColor = null, extraNoteLabel = '', y = 150, rootOffset = 0 }) {
  const n = 13;
  const boxW = 64, gap = 10;
  const totalW = n * boxW + (n - 1) * gap;
  const startX = (W - totalW) / 2;
  let body = '';
  for (let i = 0; i < n; i++) {
    const semitone = i % 12;
    const x = startX + i * (boxW + gap);
    const isRoot = i === 0 || i === 12;
    const isHighlighted = highlightSet.has(semitone);
    let fill = SECONDARY, stroke = PRIMARY;
    if (isRoot) { fill = PRIMARY; }
    else if (extraNoteColor && degreeLabels[i] === extraNoteLabel) { fill = extraNoteColor; }
    else if (isHighlighted) { fill = ACCENT; }
    body += rect(x, y, boxW, 70, fill, stroke, 2, 10);
    const textColor = (isRoot || (isHighlighted && fill !== SECONDARY)) ? '#FFFFFF' : INK;
    body += text(x + boxW / 2, y + 30, CHROMATIC[(semitone + rootOffset) % 12], { size: 19, weight: 700, color: textColor });
    body += text(x + boxW / 2, y + 53, String(i), { size: 13, weight: 400, color: textColor });
    if (degreeLabels[i] !== undefined) {
      body += text(x + boxW / 2, y + 100, degreeLabels[i], { size: 17, weight: 700, color: PRIMARY });
    }
  }
  return body;
}

function legendRow(items, y) {
  // items: [{ color, label }]
  const gap = 36;
  let totalW = 0;
  const widths = items.map((it) => 26 + 8 + it.label.length * 9 + gap);
  totalW = widths.reduce((a, b) => a + b, 0) - gap;
  let x = (W - totalW) / 2;
  let body = '';
  for (let i = 0; i < items.length; i++) {
    body += `<rect x="${x}" y="${y - 16}" width="22" height="22" rx="5" fill="${items[i].color}" stroke="${PRIMARY}" stroke-width="1.5"/>`;
    body += text(x + 30, y, items[i].label, { size: 16, weight: 500, color: INK, anchor: 'start' });
    x += widths[i];
  }
  return body;
}

const diagrams = {};

// 1. Notas Musicais — a escala cromática completa, tónica em destaque
diagrams['notas-musicais'] = svgWrap('As 12 Notas da Escala Cromática', [
  chromaticStrip({ highlightSet: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), y: 140 }),
  legendRow([{ color: PRIMARY, label: 'Tónica (Dó)' }, { color: ACCENT, label: 'Outras notas' }], 320),
  caption('Entre a maioria das notas há um tom inteiro — exceto Mi-Fá e Si-Dó, que têm apenas um semitom.'),
].join('\n'));

// 2. Intervalos Musicais
diagrams['intervalos-musicais'] = svgWrap('Intervalos a partir de Dó', [
  chromaticStrip({
    highlightSet: new Set([1, 2, 3, 4, 5, 7, 8, 9, 10, 11]),
    degreeLabels: { 1: '2ªm', 2: '2ªM', 3: '3ªm', 4: '3ªM', 5: '4ªJ', 7: '5ªJ', 8: '6ªm', 9: '6ªM', 10: '7ªm', 11: '7ªM', 12: '8ª' },
    y: 140,
  }),
  caption('O número de semitons entre duas notas define o nome do intervalo (ex.: 4 semitons = 3ª Maior).'),
].join('\n'));

// 3. Como as Escalas são Formadas — fórmula T-T-st-T-T-T-st
diagrams['formacao-de-escalas'] = svgWrap('Fórmula da Escala Maior', [
  chromaticStrip({ highlightSet: new Set([2, 4, 5, 7, 9, 11]), degreeLabels: { 0: 'T', 2: 'T', 4: 'st', 5: 'T', 7: 'T', 9: 'T', 11: 'st' }, y: 140 }),
  caption('T = tom inteiro (2 semitons)   ·   st = semitom (1 semitom)'),
].join('\n'));

// 4. Escala Maior — graus 1-7
diagrams['escala-maior'] = svgWrap('Escala Maior — Graus', [
  chromaticStrip({ highlightSet: new Set([2, 4, 5, 7, 9, 11]), degreeLabels: { 0: '1', 2: '2', 4: '3', 5: '4', 7: '5', 9: '6', 11: '7', 12: '8' }, y: 140 }),
  caption('Dó Maior: Dó Ré Mi Fá Sol Lá Si Dó — a fórmula T-T-st-T-T-T-st aplicada a partir de Dó.'),
].join('\n'));

// 5. Escalas Menores — natural, harmônica, melódica (a partir de Lá, rootOffset 9)
function minorRow(label, highlightSet, y) {
  return text(30, y - 14, label, { size: 16, weight: 700, color: PRIMARY, anchor: 'start' }) +
    chromaticStrip({ highlightSet, y, rootOffset: 9 });
}
diagrams['escalas-menores'] = svgWrap('Três Escalas Menores (a partir de Lá)', [
  minorRow('Natural', new Set([2, 3, 5, 7, 8, 10]), 110),
  minorRow('Harmônica', new Set([2, 3, 5, 7, 8, 11]), 230),
  minorRow('Melódica', new Set([2, 3, 5, 7, 9, 11]), 350),
  caption('A diferença está nos graus 6 e 7 — repare como mudam de fileira para fileira.', H - 16),
].join('\n'));

// 6. Escala Pentatônica
diagrams['escala-pentatonica'] = svgWrap('Escala Pentatônica Maior', [
  chromaticStrip({ highlightSet: new Set([2, 4, 7, 9]), degreeLabels: { 0: '1', 2: '2', 4: '3', 7: '5', 9: '6' }, y: 140 }),
  caption('Só 5 notas: graus 1, 2, 3, 5 e 6 da escala maior — sem o 4º e o 7º grau, os mais "tensos".'),
].join('\n'));

// 7. Escala Blues
diagrams['escala-blues'] = svgWrap('Escala Blues', [
  chromaticStrip({
    highlightSet: new Set([3, 5, 6, 7, 10]),
    degreeLabels: { 0: '1', 3: 'b3', 5: '4', 6: 'b5', 7: '5', 10: 'b7' },
    extraNoteColor: WARN, extraNoteLabel: 'b5',
    y: 140,
  }),
  legendRow([{ color: ACCENT, label: 'Pentatônica menor' }, { color: WARN, label: '"Blue note" (5ª diminuta)' }], 320),
].join('\n'));

// 8. Campo Harmônico
function chordBox(x, y, w, h, roman, chordName, quality) {
  const fill = quality === 'maj' ? PRIMARY : quality === 'min' ? ACCENT : SECONDARY;
  const textColor = quality === 'dim' ? INK : '#FFFFFF';
  return rect(x, y, w, h, fill, PRIMARY, 2, 12) +
    text(x + w / 2, y + 38, roman, { size: 22, weight: 700, color: textColor }) +
    text(x + w / 2, y + 68, chordName, { size: 18, weight: 500, color: textColor });
}
{
  const chords = [
    ['I', 'C', 'maj'], ['ii', 'Dm', 'min'], ['iii', 'Em', 'min'], ['IV', 'F', 'maj'],
    ['V', 'G', 'maj'], ['vi', 'Am', 'min'], ['vii°', 'Bdim', 'dim'],
  ];
  const boxW = 118, gap = 12, boxH = 90;
  const totalW = chords.length * boxW + (chords.length - 1) * gap;
  const startX = (W - totalW) / 2;
  let body = '';
  chords.forEach(([roman, name, q], i) => {
    body += chordBox(startX + i * (boxW + gap), 150, boxW, boxH, roman, name, q);
  });
  body += legendRow([{ color: PRIMARY, label: 'Maior' }, { color: ACCENT, label: 'menor' }, { color: SECONDARY, label: 'diminuto' }], 300);
  body += caption('Campo harmônico de Dó Maior — os acordes que nascem naturalmente da escala.');
  diagrams['campo-harmonico'] = svgWrap('Campo Harmônico de Dó Maior', body);
}

// 9. Formação de Acordes (tríades empilhadas em terças)
{
  function stack(xCenter, label, notesBottomToTop, intervalsBottomToTop) {
    let body = text(xCenter, 105, label, { size: 19, weight: 700, color: PRIMARY });
    const noteH = 56, boxW = 130;
    const n = notesBottomToTop.length;
    const bottomY = 130 + (n - 1) * noteH;
    const ys = notesBottomToTop.map((_, i) => bottomY - i * noteH);
    notesBottomToTop.forEach((note, i) => {
      const y = ys[i];
      body += rect(xCenter - boxW / 2, y, boxW, noteH - 8, i === 0 ? PRIMARY : ACCENT, PRIMARY, 2, 10);
      body += text(xCenter, y + (noteH - 8) / 2 + 7, note, { size: 19, weight: 700, color: '#FFFFFF' });
    });
    for (let i = 0; i < n - 1; i++) {
      const yLowerTop = ys[i];
      const yUpperBottom = ys[i + 1] + (noteH - 8);
      body += text(xCenter + boxW / 2 + 36, (yLowerTop + yUpperBottom) / 2 + 6, intervalsBottomToTop[i], { size: 15, weight: 600, color: PRIMARY, anchor: 'start' });
    }
    return body;
  }
  const body = stack(330, 'Tríade (C)', ['C', 'E', 'G'], ['3ªM', '3ªm']) +
    stack(680, 'Tétrade (Cmaj7)', ['C', 'E', 'G', 'B'], ['3ªM', '3ªm', '3ªM']) +
    caption('A raiz fica na base — cada nova nota é uma 3ª acima da anterior.', H - 20);
  diagrams['formacao-de-acordes'] = svgWrap('Formação de Acordes por Terças', body);
}

// 10. Progressões Harmônicas Comuns
{
  function progressionRow(y, label, chords) {
    const boxW = 110, gap = 50, boxH = 70;
    const totalW = chords.length * boxW + (chords.length - 1) * gap;
    const startX = (W - totalW) / 2;
    let body = text(startX - 20, y + boxH / 2 + 6, label, { size: 16, weight: 700, color: PRIMARY, anchor: 'end' });
    chords.forEach((c, i) => {
      const x = startX + i * (boxW + gap);
      body += rect(x, y, boxW, boxH, i === chords.length - 1 ? PRIMARY : SECONDARY, PRIMARY, 2, 10);
      body += text(x + boxW / 2, y + boxH / 2 + 7, c, { size: 19, weight: 700, color: i === chords.length - 1 ? '#FFFFFF' : INK });
      if (i < chords.length - 1) {
        body += `<line x1="${x + boxW}" y1="${y + boxH / 2}" x2="${x + boxW + gap - 8}" y2="${y + boxH / 2}" stroke="${PRIMARY}" stroke-width="2.5" marker-end="url(#arrow)"/>`;
      }
    });
    return body;
  }
  const defs = `<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${PRIMARY}"/></marker></defs>`;
  const body = defs +
    progressionRow(120, '', ['Dm7', 'G7', 'Cmaj7']) +
    progressionRow(230, '', ['C', 'Am', 'Dm', 'G']) +
    progressionRow(340, '', ['C', 'G', 'Am', 'F']);
  // labels at left, aligned per row
  const extraLabels = text(60, 165, 'ii–V–I', { size: 15, weight: 700, color: PRIMARY, anchor: 'start' }) +
    text(60, 275, 'I–vi–ii–V', { size: 15, weight: 700, color: PRIMARY, anchor: 'start' }) +
    text(60, 385, 'I–V–vi–IV', { size: 15, weight: 700, color: PRIMARY, anchor: 'start' });
  diagrams['progressoes-harmonicas'] = svgWrap('Progressões Harmônicas Comuns', body + extraLabels);
}

// 11. Tensões e Acordes Estendidos
{
  const degrees = [['13', 'A', true], ['11', 'F', true], ['9', 'D', true], ['7', 'B', false], ['5', 'G', false], ['3', 'E', false], ['1', 'C', false]];
  const boxW = 150, boxH = 38, gap = 5;
  const startY = 82;
  let body = '';
  degrees.forEach(([deg, note, tension], i) => {
    const y = startY + i * (boxH + gap);
    body += rect(W / 2 - boxW / 2, y, boxW, boxH, tension ? ACCENT : PRIMARY, PRIMARY, 2, 10);
    body += text(W / 2 - boxW / 2 - 20, y + boxH / 2 + 6, deg, { size: 18, weight: 700, color: PRIMARY, anchor: 'end' });
    body += text(W / 2, y + boxH / 2 + 6, note, { size: 18, weight: 700, color: '#FFFFFF' });
  });
  body += legendRow([{ color: PRIMARY, label: 'Tríade/sétima (acorde base)' }, { color: ACCENT, label: 'Tensões (9ª, 11ª, 13ª)' }], H - 25);
  diagrams['tensoes-harmonicas'] = svgWrap('Acorde Estendido (Cmaj13)', body);
}

// 12. Figuras Rítmicas e Pausas — tabela com símbolos reais de nota/pausa (estilo "ficha de consulta")
function noteSymbol(cx, cy, type) {
  const rx = 8, ry = 5.8;
  const hollow = type === 'whole' || type === 'half';
  let s = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${hollow ? '#FFFFFF' : INK}" stroke="${INK}" stroke-width="2.2" transform="rotate(-20 ${cx} ${cy})"/>`;
  if (type === 'whole') return s;
  const stemX = cx + rx * 0.85;
  const stemTopY = cy - 24;
  s += `<line x1="${stemX}" y1="${cy - 1}" x2="${stemX}" y2="${stemTopY}" stroke="${INK}" stroke-width="2.2"/>`;
  const flagCount = { half: 0, quarter: 0, eighth: 1, sixteenth: 2, thirtysecond: 3 }[type];
  for (let f = 0; f < flagCount; f++) {
    const fy = stemTopY + f * 10;
    s += `<path d="M ${stemX},${fy} C ${stemX + 12},${fy + 3} ${stemX + 10},${fy + 8} ${stemX + 2},${fy + 9}" fill="${INK}"/>`;
  }
  return s;
}
function restSymbol(cx, cy, type) {
  if (type === 'whole') {
    return `<line x1="${cx - 16}" y1="${cy - 9}" x2="${cx + 16}" y2="${cy - 9}" stroke="${PRIMARY}" stroke-width="1.5" opacity="0.5"/>` +
      `<rect x="${cx - 11}" y="${cy - 9}" width="22" height="9" fill="${INK}"/>`;
  }
  if (type === 'half') {
    return `<line x1="${cx - 16}" y1="${cy + 9}" x2="${cx + 16}" y2="${cy + 9}" stroke="${PRIMARY}" stroke-width="1.5" opacity="0.5"/>` +
      `<rect x="${cx - 11}" y="${cy}" width="22" height="9" fill="${INK}"/>`;
  }
  if (type === 'quarter') {
    return `<path d="M ${cx - 2},${cy - 19} C ${cx + 9},${cy - 12} ${cx - 9},${cy - 4} ${cx + 6},${cy + 1} C ${cx - 7},${cy + 6} ${cx + 8},${cy + 13} ${cx - 1},${cy + 19}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  const hooks = { eighth: 1, sixteenth: 2, thirtysecond: 3 }[type];
  const topX = cx - 6, botX = cx + 7;
  let s = `<line x1="${topX}" y1="${cy - 18}" x2="${botX}" y2="${cy + 18}" stroke="${INK}" stroke-width="2.2"/>`;
  s += `<circle cx="${topX}" cy="${cy - 18}" r="3.3" fill="${INK}"/>`;
  for (let h = 0; h < hooks; h++) {
    const hy = cy - 18 + h * 10;
    const hx = topX + h * 3.6;
    s += `<path d="M ${hx},${hy} C ${hx - 15},${hy + 2} ${hx - 14},${hy + 7} ${hx - 4},${hy + 8}" fill="${INK}"/>`;
  }
  return s;
}
{
  const rows = [
    ['whole', 'Semibreve', '4'],
    ['half', 'Mínima', '2'],
    ['quarter', 'Semínima', '1'],
    ['eighth', 'Colcheia', '1/2'],
    ['sixteenth', 'Semicolcheia', '1/4'],
    ['thirtysecond', 'Fusa', '1/8'],
  ];
  const colNota = 150, colPausa = 330, colTempo = 500, colNome = 610;
  const startY = 76, rowH = 58, tableLeft = 90, tableRight = 870;
  let body = '';
  body += text(colNota, 56, 'NOTA', { size: 15, weight: 700, color: PRIMARY });
  body += text(colPausa, 56, 'PAUSA', { size: 15, weight: 700, color: PRIMARY });
  body += text(colTempo, 56, 'TEMPO', { size: 15, weight: 700, color: PRIMARY });
  body += text(colNome, 56, 'NOMENCLATURA', { size: 15, weight: 700, color: PRIMARY, anchor: 'start' });
  body += `<line x1="${tableLeft}" y1="68" x2="${tableRight}" y2="68" stroke="${PRIMARY}" stroke-width="2"/>`;
  [240, 420, 560].forEach((x) => {
    body += `<line x1="${x}" y1="68" x2="${x}" y2="${startY + rows.length * rowH}" stroke="${SECONDARY}" stroke-width="1.5"/>`;
  });
  rows.forEach(([type, name, tempo], i) => {
    const yTop = startY + i * rowH;
    const yc = yTop + rowH / 2;
    if (i % 2 === 1) body += rect(tableLeft, yTop, tableRight - tableLeft, rowH, SECONDARY, 'none', 0, 0);
    body += noteSymbol(colNota, yc, type);
    body += restSymbol(colPausa, yc, type);
    body += text(colTempo, yc + 6, tempo, { size: 18, weight: 700, color: PRIMARY });
    body += text(colNome, yc + 6, name, { size: 17, weight: 600, color: INK, anchor: 'start' });
  });
  body += `<rect x="${tableLeft}" y="${startY}" width="${tableRight - tableLeft}" height="${rows.length * rowH}" fill="none" stroke="${PRIMARY}" stroke-width="2"/>`;
  diagrams['figuras-ritmicas'] = svgWrap('Figuras Rítmicas e Pausas', body);
}

// 13. Fórmulas de Compasso
{
  function meterDiagram(xCenter, label, beats, strongIdx) {
    const boxW = 40, gap = 8, boxH = 60, y = 130;
    const totalW = beats * boxW + (beats - 1) * gap;
    const startX = xCenter - totalW / 2;
    let body = text(xCenter, 100, label, { size: 20, weight: 700, color: PRIMARY });
    for (let i = 0; i < beats; i++) {
      const x = startX + i * (boxW + gap);
      body += rect(x, y, boxW, boxH, strongIdx.includes(i) ? PRIMARY : SECONDARY, PRIMARY, 2, 8);
      body += text(x + boxW / 2, y + boxH / 2 + 7, String(i + 1), { size: 16, weight: 700, color: strongIdx.includes(i) ? '#FFFFFF' : INK });
    }
    return body;
  }
  const body = meterDiagram(84, '2/4', 2, [0]) +
    meterDiagram(256, '3/4', 3, [0]) +
    meterDiagram(476, '4/4', 4, [0, 2]) +
    meterDiagram(768, '6/8', 6, [0, 3]) +
    caption('As caixas em destaque marcam o tempo forte de cada compasso.', H - 60);
  diagrams['formulas-de-compasso'] = svgWrap('Fórmulas de Compasso', body);
}

// 14. Síncope e Contratempo
{
  const y = 160, boxW = 56, gap = 14;
  const beats = ['1', 'e', '2', 'e', '3', 'e', '4', 'e'];
  const totalW = beats.length * boxW + (beats.length - 1) * gap;
  const startX = (W - totalW) / 2;
  let body = '';
  beats.forEach((b, i) => {
    const x = startX + i * (boxW + gap);
    const onBeat = i % 2 === 0;
    body += rect(x, y, boxW, 60, onBeat ? SECONDARY : '#FFFFFF', PRIMARY, 1.5, 8);
    body += text(x + boxW / 2, y + 38, b, { size: 16, weight: 600, color: INK });
  });
  // contratempo hit on the "e" of beat 2 (index 3)
  const ctX = startX + 3 * (boxW + gap) + boxW / 2;
  body += `<circle cx="${ctX}" cy="${y - 30}" r="14" fill="${ACCENT}"/>`;
  body += text(ctX, y - 50, 'Contratempo', { size: 14, weight: 700, color: ACCENT });
  // sincope: nota inicia no contratempo do tempo 1 (índice 1) e é sustida até o tempo 3 (índice 4)
  const syX1 = startX + 1 * (boxW + gap) + boxW / 2;
  const syX2 = startX + 4 * (boxW + gap) + boxW / 2;
  body += `<path d="M ${syX1} ${y + 90} Q ${(syX1 + syX2) / 2} ${y + 130} ${syX2} ${y + 90}" fill="none" stroke="${WARN}" stroke-width="3"/>`;
  body += `<circle cx="${syX1}" cy="${y + 90}" r="6" fill="${WARN}"/><circle cx="${syX2}" cy="${y + 90}" r="6" fill="${WARN}"/>`;
  body += text((syX1 + syX2) / 2, y + 150, 'Síncope (a nota "amarra" os dois tempos)', { size: 14, weight: 700, color: WARN });
  diagrams['sincope-e-contratempo'] = svgWrap('Síncope e Contratempo', body);
}

mkdirSync('./relatorio/imagens_teoria', { recursive: true });
for (const [slug, svg] of Object.entries(diagrams)) {
  writeFileSync(`./relatorio/imagens_teoria/${slug}.svg`, svg, 'utf8');
}
console.log('Gerados', Object.keys(diagrams).length, 'diagramas em ./relatorio/imagens_teoria/');
console.log(Object.keys(diagrams).join('\n'));
