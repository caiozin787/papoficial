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
    style: str(formData, 'style'),
    key: str(formData, 'key'),
    bpm: num(formData, 'bpm'),
    level: str(formData, 'level'),
    chord_chart_url: nullableStr(formData, 'chord_chart_url'),
    audio_url: nullableStr(formData, 'audio_url'),
    youtube_id: nullableStr(formData, 'youtube_id'),
    duration_seconds: nullableNum(formData, 'duration_seconds'),
    published: bool(formData, 'published'),
  };
}

export async function createPlayback(formData: FormData): Promise<{ error?: string } | void> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from('playbacks').insert(buildPayload(formData));
  if (error) return { error: error.message };
  redirect('/admin/playbacks');
}

export async function updatePlayback(id: string, formData: FormData): Promise<{ error?: string } | void> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from('playbacks')
    .update({ ...buildPayload(formData), updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return { error: error.message };
  redirect('/admin/playbacks');
}

export async function deletePlayback(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from('playbacks').delete().eq('id', id);
}
