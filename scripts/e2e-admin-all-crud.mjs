import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const adminEmail = 'admin-e2e@saxtools.test';
const adminPassword = 'senha123456';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
page.on('response', async (res) => {
  if (res.status() >= 400) {
    let body = '';
    try { body = await res.text(); } catch {}
    console.log(`   [HTTP ${res.status()}] ${res.url()} -> ${body.slice(0, 300)}`);
  }
});

async function fillSelect(name, value) {
  await page.selectOption(`select[name=${name}]`, value);
}

console.log('Login como admin...');
await page.goto(`${BASE}/login`);
await page.fill('#email', adminEmail);
await page.fill('#password', adminPassword);
await page.click('button[type=submit]');
await page.waitForURL((url) => url.pathname === '/dashboard', { timeout: 15000 });

const entities = [
  {
    name: 'Métodos',
    listPath: '/admin/metodos',
    fill: async () => {
      await page.fill('#title', 'Método de Teste E2E');
      await page.fill('#slug', 'metodo-de-teste-e2e');
      await page.fill('#author', 'Autor Teste');
      await fillSelect('category', 'tecnica');
      await fillSelect('level', 'iniciante');
      await page.fill('#description', 'Descrição de teste.');
    },
    publicPath: '/metodos/metodo-de-teste-e2e',
  },
  {
    name: 'Exercícios',
    listPath: '/admin/exercicios',
    fill: async () => {
      await page.fill('#title', 'Exercício de Teste E2E');
      await page.fill('#slug', 'exercicio-de-teste-e2e');
      await fillSelect('category', 'tecnica');
      await fillSelect('level', 'iniciante');
      await page.fill('#description', 'Objetivo de teste.');
    },
    publicPath: '/exercicios/exercicio-de-teste-e2e',
  },
  {
    name: 'Playbacks',
    listPath: '/admin/playbacks',
    fill: async () => {
      await page.fill('#title', 'Playback de Teste E2E');
      await page.fill('#slug', 'playback-de-teste-e2e');
      await fillSelect('style', 'jazz');
      await fillSelect('level', 'iniciante');
      await page.fill('#key', 'C');
      await page.fill('#bpm', '120');
      await page.fill('#description', 'Descrição de teste.');
    },
    publicPath: '/playalong/playback-de-teste-e2e',
  },
  {
    name: 'Partituras',
    listPath: '/admin/partituras',
    fill: async () => {
      await page.fill('#title', 'Partitura de Teste E2E');
      await page.fill('#slug', 'partitura-de-teste-e2e');
      await page.fill('#composer', 'Compositor Teste');
      await fillSelect('category', 'estudos');
      await fillSelect('level', 'iniciante');
      await fillSelect('instrument', 'sax_alto');
      await page.fill('#key', 'C');
    },
    publicPath: '/partituras/partitura-de-teste-e2e',
  },
];

for (const entity of entities) {
  console.log(`\n=== ${entity.name} ===`);

  console.log('  Criando...');
  await page.goto(`${BASE}${entity.listPath}/novo`);
  await entity.fill();
  await page.click('button:has-text("Salvar")');
  await page.waitForURL((url) => url.pathname === entity.listPath, { timeout: 10000 });
  console.log('  Criado, voltou para a lista: OK');

  console.log('  Confirmando no site público...');
  const res = await page.goto(`${BASE}${entity.publicPath}`);
  if (res.status() !== 200) throw new Error(`Esperava 200 em ${entity.publicPath}, recebeu ${res.status()}`);
  console.log('  Visível no site público: OK');

  console.log('  Editando...');
  await page.goto(`${BASE}${entity.listPath}`);
  const rows = page.locator('tbody tr');
  const count = await rows.count();
  let edited = false;
  for (let i = 0; i < count; i++) {
    const text = await rows.nth(i).innerText();
    if (text.includes('Teste E2E')) {
      await rows.nth(i).locator('a[title="Editar"]').click();
      edited = true;
      break;
    }
  }
  if (!edited) throw new Error(`Não achou a linha de ${entity.name} para editar`);
  await page.waitForSelector('#title');
  await page.fill('#title', (await page.inputValue('#title')) + ' (editado)');
  await page.click('button:has-text("Salvar")');
  await page.waitForURL((url) => url.pathname === entity.listPath, { timeout: 10000 });
  await page.waitForSelector('text=(editado)');
  console.log('  Edição persistida: OK');

  console.log('  Excluindo...');
  page.once('dialog', (dialog) => dialog.accept());
  const rows2 = page.locator('tbody tr');
  const count2 = await rows2.count();
  let deleted = false;
  for (let i = 0; i < count2; i++) {
    const text = await rows2.nth(i).innerText();
    if (text.includes('(editado)')) {
      await rows2.nth(i).locator('button[title="Excluir"]').click();
      deleted = true;
      break;
    }
  }
  if (!deleted) throw new Error(`Não achou a linha de ${entity.name} para excluir`);
  await page.waitForTimeout(1500);
  const stillThere = await page.locator('text=(editado)').count();
  if (stillThere > 0) throw new Error(`${entity.name} não foi excluído!`);
  console.log('  Excluído: OK');

  const res2 = await page.goto(`${BASE}${entity.publicPath}`);
  if (res2.status() !== 404) throw new Error(`Esperava 404 em ${entity.publicPath} após exclusão, recebeu ${res2.status()}`);
  console.log('  404 no site público após exclusão: OK');
}

console.log('\nTODOS OS CRUDs OK (Métodos, Exercícios, Playbacks, Partituras)');
await browser.close();
