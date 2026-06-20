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
    description: str(formData, 'description'),
    category: str(formData, 'category'),
    subcategory: nullableStr(formData, 'subcategory'),
    level: str(formData, 'level'),
    estimated_minutes: nullableNum(formData, 'estimated_minutes'),
    materials_needed: nullableStr(formData, 'materials_needed'),
    pdf_url: nullableStr(formData, 'pdf_url'),
    audio_url: nullableStr(formData, 'audio_url'),
    published: bool(formData, 'published'),
  };
}

export async function createExercise(formData: FormData): Promise<{ error?: string } | void> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from('exercises').insert(buildPayload(formData));
  if (error) return { error: error.message };
  redirect('/admin/exercicios');
}

export async function updateExercise(id: string, formData: FormData): Promise<{ error?: string } | void> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from('exercises')
    .update({ ...buildPayload(formData), updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return { error: error.message };
  redirect('/admin/exercicios');
}

export async function deleteExercise(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from('exercises').delete().eq('id', id);
}
