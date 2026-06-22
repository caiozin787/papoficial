import { createClient } from '@/lib/supabase/server';
import type { ContentLevel } from '@/lib/content-levels';

export type PlaybackStyle = 'jazz' | 'blues' | 'gospel' | 'pop' | 'bossa_nova' | 'soul';
export type TempoRange = 'lento' | 'medio' | 'rapido';

export const PLAYBACK_STYLE_LABELS: Record<PlaybackStyle, string> = {
  jazz: 'Jazz',
  blues: 'Blues',
  gospel: 'Gospel',
  pop: 'Pop',
  bossa_nova: 'Bossa Nova',
  soul: 'Soul',
};

export const TEMPO_RANGE_LABELS: Record<TempoRange, string> = {
  lento: 'Lento (até 90 BPM)',
  medio: 'Médio (91–130 BPM)',
  rapido: 'Rápido (131+ BPM)',
};

export interface Playback {
  id: string;
  slug: string;
  title: string;
  description: string;
  style: PlaybackStyle;
  key: string;
  bpm: number;
  level: ContentLevel;
  chord_chart_url: string | null;
  audio_url: string | null;
  youtube_id: string | null;
  duration_seconds: number | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlaybackFilters {
  style?: PlaybackStyle;
  level?: ContentLevel;
  key?: string;
  tempoRange?: TempoRange;
}

export async function getPlaybacks(filters?: PlaybackFilters): Promise<Playback[]> {
  const supabase = await createClient();
  let query = supabase.from('playbacks').select('*').order('style').order('title');
  if (filters?.style) query = query.eq('style', filters.style);
  if (filters?.level) query = query.eq('level', filters.level);
  if (filters?.key) query = query.eq('key', filters.key);
  if (filters?.tempoRange === 'lento') query = query.lte('bpm', 90);
  if (filters?.tempoRange === 'medio') query = query.gte('bpm', 91).lte('bpm', 130);
  if (filters?.tempoRange === 'rapido') query = query.gte('bpm', 131);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getPlaybacksByIds(ids: string[]): Promise<Playback[]> {
  if (ids.length === 0) return [];
  const supabase = await createClient();
  const { data, error } = await supabase.from('playbacks').select('*').in('id', ids);
  if (error) throw error;
  return data ?? [];
}

export async function getPlaybackById(id: string): Promise<Playback | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('playbacks').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getPlaybackBySlug(slug: string): Promise<Playback | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('playbacks').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getDistinctKeys(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('playbacks').select('key');
  if (error) throw error;
  return Array.from(new Set((data ?? []).map((r) => r.key))).sort();
}
