import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const testEmail = 'teste-e2e@saxtools.test';
const testPassword = 'senha123456';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (err) => errors.push(err.message));
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

console.log('1) Login...');
await page.goto(`${BASE}/login`);
await page.fill('#email', testEmail);
await page.fill('#password', testPassword);
await page.click('button[type=submit]');
await page.waitForURL((url) => url.pathname === '/dashboard', { timeout: 15000 });
await page.waitForSelector('text=Meu Perfil');
console.log('   OK, URL:', page.url());
await shot('02-dashboard-perfil');

console.log('2) Favoritando um método...');
await page.goto(`${BASE}/metodos/virtuosismo-tecnico`);
await page.click('text=Favoritar');
await page.waitForSelector('text=Favoritado', { timeout: 10000 });
await shot('03-metodo-favoritado');

console.log('3) Favoritando um exercício...');
await page.goto(`${BASE}/exercicios/long-tones-fundamentacao-do-som`);
await page.click('text=Favoritar');
await page.waitForSelector('text=Favoritado', { timeout: 10000 });

console.log('4) Checando /dashboard/favoritos...');
await page.goto(`${BASE}/dashboard/favoritos`);
await page.waitForSelector('text=Virtuosismo Técnico');
await page.waitForSelector('text=Long Tones');
await shot('04-dashboard-favoritos');

console.log('5) Checando /dashboard/historico...');
await page.goto(`${BASE}/dashboard/historico`);
await page.waitForSelector('text=Virtuosismo Técnico');
await shot('05-dashboard-historico');

console.log('6) Editando nome no perfil...');
await page.goto(`${BASE}/dashboard`);
await page.fill('#full_name', 'Nome Editado E2E');
await page.click('button:has-text("Salvar")');
await page.waitForSelector('text=Salvo!');
await shot('06-perfil-editado');
await page.reload();
await page.waitForSelector('text=Nome Editado E2E');
console.log('   Nome persistiu após reload: OK');

console.log('7) Desfavoritando o método (toggle de volta)...');
await page.goto(`${BASE}/metodos/virtuosismo-tecnico`);
await page.click('text=Favoritado');
await page.waitForSelector('text=Favoritar', { timeout: 10000 });
console.log('   Toggle de remoção: OK');

console.log('8) Logout...');
const navResponse = await page.goto(`${BASE}/dashboard`);
console.log('   Nav status:', navResponse?.status(), 'URL:', page.url());
await shot('debug-header');
const bodyText = await page.locator('body').innerText().catch(() => '(falhou ler body)');
console.log('   Body text (primeiros 500 chars):', bodyText.slice(0, 500));
await page.waitForSelector('header', { timeout: 15000 });
const headerText = await page.locator('header').innerText();
console.log('   Header text:', JSON.stringify(headerText));
await page.click('header button');
await page.click('text=Sair');
await page.waitForURL(BASE + '/');
await shot('07-apos-logout');

console.log('9) Tentando acessar /dashboard deslogado (deve redirecionar para /login)...');
await page.goto(`${BASE}/dashboard`);
await page.waitForURL(/\/login/);
await shot('08-dashboard-bloqueado');
console.log('   Redirect para login: OK');

console.log('\nTODOS OS PASSOS OK');
console.log('Console/page errors capturados:', errors.length ? errors : 'nenhum');
await browser.close();
