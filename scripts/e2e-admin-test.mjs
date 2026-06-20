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

async function shot(name) {
  await page.screenshot({ path: `tmp-shots/${name}.png`, fullPage: false });
}

console.log('1) Login como admin...');
await page.goto(`${BASE}/login`);
await page.fill('#email', adminEmail);
await page.fill('#password', adminPassword);
await page.click('button[type=submit]');
await page.waitForURL((url) => url.pathname === '/dashboard', { timeout: 15000 });

console.log('2) Acessando /admin...');
await page.goto(`${BASE}/admin`);
await page.waitForSelector('text=Visão Geral', { timeout: 10000 });
await shot('admin-01-overview');

console.log('3) Lista de Teorias...');
await page.goto(`${BASE}/admin/teorias`);
await page.waitForSelector('text=Escala Maior');
await shot('admin-02-teorias-lista');

console.log('4) Criando nova teoria...');
await page.goto(`${BASE}/admin/teorias/novo`);
await page.fill('#title', 'Teoria de Teste E2E');
await page.fill('#slug', 'teoria-de-teste-e2e');
await page.selectOption('#category', 'fundamentos');
await page.fill('#description', 'Descrição de teste criada via e2e.');
await page.fill('#content', 'Conteúdo de teste.\n\nSegundo parágrafo.');
await page.click('button:has-text("Salvar")');
await page.waitForURL((url) => url.pathname === '/admin/teorias', { timeout: 10000 });
await page.waitForSelector('text=Teoria de Teste E2E');
console.log('   Criada com sucesso, aparece na lista.');

console.log('5) Confirmando que aparece no site público (/teoria)...');
await page.goto(`${BASE}/teoria/teoria-de-teste-e2e`);
await page.waitForSelector('text=Teoria de Teste E2E');
await shot('admin-03-teoria-no-site');
console.log('   Visível no site público: OK');

console.log('6) Editando a teoria...');
await page.goto(`${BASE}/admin/teorias`);
const row = page.locator('tr', { hasText: 'Teoria de Teste E2E' });
await row.locator('a[title="Editar"]').click();
await page.waitForSelector('#title');
await page.fill('#title', 'Teoria de Teste E2E (editada)');
await page.click('button:has-text("Salvar")');
await page.waitForURL((url) => url.pathname === '/admin/teorias', { timeout: 10000 });
await page.waitForSelector('text=Teoria de Teste E2E (editada)');
console.log('   Edição persistida: OK');

console.log('7) Excluindo a teoria de teste...');
page.once('dialog', (dialog) => dialog.accept());
const row2 = page.locator('tr', { hasText: 'Teoria de Teste E2E (editada)' });
await row2.locator('button[title="Excluir"]').click();
await page.waitForTimeout(1500);
const stillThere = await page.locator('text=Teoria de Teste E2E (editada)').count();
if (stillThere > 0) throw new Error('Teoria não foi excluída!');
console.log('   Excluída com sucesso: OK');

console.log('8) Confirmando 404 no site público após exclusão...');
const res = await page.goto(`${BASE}/teoria/teoria-de-teste-e2e`);
console.log('   Status:', res.status());
if (res.status() !== 404) throw new Error('Esperava 404 após exclusão');

console.log('9) Tentando acessar /admin como usuário não-admin (deve redirecionar)...');
await page.goto(`${BASE}/login`);
// volta pro login (sessão de admin ainda ativa); vamos só checar logout + tentativa anônima
await page.context().clearCookies();
await page.goto(`${BASE}/admin`);
await page.waitForURL((url) => url.pathname === '/login', { timeout: 10000 });
console.log('   Bloqueado para anônimo: OK');

console.log('\nTODOS OS PASSOS OK');
await browser.close();
