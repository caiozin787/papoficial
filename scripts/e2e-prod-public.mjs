import { chromium } from 'playwright';

const BASE = 'https://papoficial.vercel.app';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();

const errors = [];
page.on('pageerror', (err) => errors.push(err.message));
page.on('console', (msg) => { if (msg.type() === 'error') errors.push('console: ' + msg.text()); });

const routes = [
  '/', '/sobre', '/contato', '/login', '/cadastro',
  '/ferramentas',
  '/ferramentas/afinador', '/ferramentas/metronomo', '/ferramentas/escalas',
  '/ferramentas/circulo-das-quintas', '/ferramentas/progressoes', '/ferramentas/arpejos',
  '/ferramentas/dedilhados', '/ferramentas/treino-auditivo',
  '/teoria', '/metodos', '/exercicios', '/playalong', '/partituras',
];

const results = [];
for (const route of routes) {
  errors.length = 0;
  const res = await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 20000 }).catch(e => ({ status: () => 'FETCH_ERROR: ' + e.message }));
  const status = typeof res.status === 'function' ? res.status() : res.status;
  const brokenImgs = await page.$$eval('img', els => els.filter(el => el.naturalWidth === 0).map(el => el.src)).catch(() => []);
  results.push({ route, status, errors: [...errors], brokenImgs });
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
