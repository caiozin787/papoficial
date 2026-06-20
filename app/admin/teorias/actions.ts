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
function num(formData: FormData, key: string): number {
  return Number(formData.get(key) ?? 0) || 0;
}
function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === 'on';
}

function buildPayload(formData: FormData) {
  return {
    slug: str(formData, 'slug'),
    title: str(formData, 'title'),
    description: str(formData, 'description'),
    content: str(formData, 'content'),
    category: str(formData, 'category'),
    pdf_url: nullableStr(formData, 'pdf_url'),
    cover_image_url: nullableStr(formData, 'cover_image_url'),
    order_index: num(formData, 'order_index'),
    published: bool(formData, 'published'),
  };
}

export async function createTheory(formData: FormData): Promise<{ error?: string } | void> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from('theories').insert(buildPayload(formData));
  if (error) return { error: error.message };
  redirect('/admin/teorias');
}

export async function updateTheory(id: string, formData: FormData): Promise<{ error?: string } | void> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from('theories')
    .update({ ...buildPayload(formData), updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return { error: error.message };
  redirect('/admin/teorias');
}

export async function deleteTheory(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from('theories').delete().eq('id', id);
}
