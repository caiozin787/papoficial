import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const [, , url, outPath] = process.argv;
if (!url || !outPath) {
  console.error('Uso: node scripts/download-imslp-pdf.mjs <url> <arquivo-saida.pdf>');
  process.exit(1);
}

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();

const responsePromise = page.waitForResponse((res) => res.headers()['content-type']?.includes('application/pdf'), { timeout: 30000 });
await page.goto(url, { waitUntil: 'domcontentloaded' }).catch(() => {});
const response = await responsePromise;
const buffer = await response.body();
writeFileSync(outPath, buffer);
console.log(`OK: ${buffer.length} bytes salvos em ${outPath}`);

await browser.close();
