import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const testEmail = 'teste-e2e@saxtools.test';
const testPassword = 'senha123456';

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

console.log('1) Login...');
await page.goto(`${BASE}/login`);
await page.fill('#email', testEmail);
await page.fill('#password', testPassword);
await page.click('button[type=submit]');
await page.waitForURL((url) => url.pathname === '/dashboard', { timeout: 15000 });

console.log('2) Progresso inicial (deve ser tudo zero)...');
await page.goto(`${BASE}/dashboard/progresso`);
await page.waitForSelector('text=dias consecutivos estudando');
await shot('progress-01-inicial');

console.log('3) Marcando uma teoria como concluída...');
await page.goto(`${BASE}/teoria/escala-maior`);
await page.click('text=Marcar teoria como concluída');
await page.waitForSelector('text=Teoria concluída', { timeout: 10000 });

console.log('4) Marcando um método como concluído...');
await page.goto(`${BASE}/metodos/primeiros-passos-no-saxofone`);
await page.click('text=Marcar método como concluído');
await page.waitForSelector('text=Método concluído', { timeout: 10000 });

console.log('5) Marcando um exercício como realizado...');
await page.goto(`${BASE}/exercicios/long-tones-fundamentacao-do-som`);
await page.click('text=Marcar exercício como realizado');
await page.waitForSelector('text=Exercício realizado', { timeout: 10000 });

console.log('6) Checando /dashboard/progresso atualizado...');
await page.goto(`${BASE}/dashboard/progresso`);
await page.waitForSelector('text=1 / 14'); // teorias: 1 de 14
await page.waitForSelector('text=1 / 19'); // métodos: 1 de 19 (18 seed + 1 real PDF)
await page.waitForSelector('text=1 / 24'); // exercícios: 1 de 24
await page.waitForSelector('text=Long Tones'); // aparece em "últimos exercícios realizados"
const streakText = await page.locator('text=dias consecutivos estudando').locator('..').innerText();
console.log('   Streak card:', JSON.stringify(streakText));
if (!streakText.startsWith('1')) throw new Error(`Streak esperado "1", recebido: ${streakText}`);
await shot('progress-02-apos-conclusoes');

console.log('7) Desmarcando a teoria (toggle de volta)...');
await page.goto(`${BASE}/teoria/escala-maior`);
await page.click('text=Teoria concluída');
await page.waitForSelector('text=Marcar teoria como concluída', { timeout: 10000 });

console.log('8) Confirmando que a contagem de teorias voltou pra 0...');
await page.goto(`${BASE}/dashboard/progresso`);
await page.waitForSelector('text=0 / 14');

console.log('\nTODOS OS PASSOS OK');
await browser.close();
