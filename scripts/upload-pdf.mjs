import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const [, , localPath, storagePath] = process.argv;
if (!localPath || !storagePath) {
  console.error('Uso: node --env-file=.env scripts/upload-pdf.mjs <arquivo-local> <caminho-no-bucket>');
  process.exit(1);
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const fileBuffer = readFileSync(localPath);
const { error } = await supabase.storage.from('pdfs').upload(storagePath, fileBuffer, {
  contentType: 'application/pdf',
  upsert: true,
});

if (error) {
  console.error('Falha no upload:', error.message);
  process.exit(1);
}

const { data } = supabase.storage.from('pdfs').getPublicUrl(storagePath);
console.log('OK:', data.publicUrl);
