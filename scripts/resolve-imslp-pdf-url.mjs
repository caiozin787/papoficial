import { chromium } from 'playwright';

const [, , imslpUrl] = process.argv;
if (!imslpUrl) {
  console.error('Uso: node scripts/resolve-imslp-pdf-url.mjs <url Special:ImagefromIndex>');
  process.exit(1);
}

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();

await page.goto(imslpUrl, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
await page.click('text=I understand').catch(() => {});
await page.waitForLoadState('networkidle').catch(() => {});
await page.click('text=Clique aqui para continuar').catch(() => {});
await page.waitForLoadState('networkidle').catch(() => {});

console.log(page.url());
await browser.close();
