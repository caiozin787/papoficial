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
function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === 'on';
}

function buildPayload(formData: FormData) {
  return {
    slug: str(formData, 'slug'),
    title: str(formData, 'title'),
    description: str(formData, 'description'),
    author: str(formData, 'author'),
    category: str(formData, 'category'),
    level: str(formData, 'level'),
    cover_image_url: nullableStr(formData, 'cover_image_url'),
    pdf_url: nullableStr(formData, 'pdf_url'),
    published: bool(formData, 'published'),
  };
}

export async function createMethod(formData: FormData): Promise<{ error?: string } | void> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from('methods').insert(buildPayload(formData));
  if (error) return { error: error.message };
  redirect('/admin/metodos');
}

export async function updateMethod(id: string, formData: FormData): Promise<{ error?: string } | void> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from('methods')
    .update({ ...buildPayload(formData), updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return { error: error.message };
  redirect('/admin/metodos');
}

export async function deleteMethod(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from('methods').delete().eq('id', id);
}
