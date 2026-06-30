import { readFileSync, readdirSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const DIR = './apresentacao/notas-sax';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const files = readdirSync(DIR).filter((f) => f.endsWith('.wav'));
const manifest = [];

for (const file of files) {
  const storagePath = `sax-samples/${file}`;
  const buf = readFileSync(`${DIR}/${file}`);
  const { error } = await supabase.storage.from('audio').upload(storagePath, buf, {
    contentType: 'audio/wav',
    upsert: true,
  });
  if (error) {
    console.error('FAILED', file, error.message);
    continue;
  }
  const { data } = supabase.storage.from('audio').getPublicUrl(storagePath);
  manifest.push({ note: file.replace('.wav', ''), url: data.publicUrl });
  console.log('OK', file, '->', data.publicUrl);
}

console.log('\nmanifest:');
console.log(JSON.stringify(manifest, null, 2));
