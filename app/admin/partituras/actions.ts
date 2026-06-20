'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/admin-auth';

function str(formData: FormData, key: string): string {
  return ((formData.get(key) as string) ?? '').trim();
}
function nullableStr(formData: FormData, key: string): string | null {
  const v = str(formData, key);
  return v === '' ? null : v;
}
function nullableNum(formData: FormData, key: string): number | null {
  const v = str(formData, key);
  return v === '' ? null : Number(v) || null;
}
function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === 'on';
}

function buildPayload(formData: FormData) {
  return {
    slug: str(formData, 'slug'),
    title: str(formData, 'title'),
    composer: str(formData, 'composer'),
    category: str(formData, 'category'),
    level: str(formData, 'level'),
    key: str(formData, 'key'),
    instrument: str(formData, 'instrument'),
    pdf_url: nullableStr(formData, 'pdf_url'),
    preview_image_url: nullableStr(formData, 'preview_image_url'),
    pages: nullableNum(formData, 'pages'),
    popular: bool(formData, 'popular'),
    published: bool(formData, 'published'),
  };
}

export async function createScore(formData: FormData): Promise<{ error?: string } | void> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from('scores').insert(buildPayload(formData));
  if (error) return { error: error.message };
  redirect('/admin/partituras');
}

export async function updateScore(id: string, formData: FormData): Promise<{ error?: string } | void> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from('scores')
    .update({ ...buildPayload(formData), updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return { error: error.message };
  redirect('/admin/partituras');
}

export async function deleteScore(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from('scores').delete().eq('id', id);
}
