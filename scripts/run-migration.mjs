import { readFileSync } from 'fs';
import { Client } from 'pg';

const file = process.argv[2];
if (!file) {
  console.error('Uso: node --env-file=.env scripts/run-migration.mjs <arquivo.sql>');
  process.exit(1);
}

const sql = readFileSync(file, 'utf-8');
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

await client.connect();
try {
  await client.query(sql);
  console.log(`OK: ${file} aplicado com sucesso.`);
} finally {
  await client.end();
}
