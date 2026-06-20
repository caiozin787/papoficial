import { createClient } from '@/lib/supabase/server';
import type { ContentLevel } from '@/lib/content-levels';

export type ScoreCategory = 'iniciante' | 'intermediario' | 'avancado' | 'jazz' | 'gospel' | 'estudos';
export type Instrument = 'sax_alto' | 'sax_tenor' | 'sax_soprano' | 'sax_baritono';

export const SCORE_CATEGORY_LABELS: Record<ScoreCategory, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
  jazz: 'Jazz',
  gospel: 'Gospel',
  estudos: 'Estudos',
};

export const INSTRUMENT_LABELS: Record<Instrument, string> = {
  sax_alto: 'Sax Alto',
  sax_tenor: 'Sax Tenor',
  sax_soprano: 'Sax Soprano',
  sax_baritono: 'Sax Barítono',
};

const TIER_CATEGORIES: ScoreCategory[] = ['iniciante', 'intermediario', 'avancado'];
export function isTierScoreCategory(category: ScoreCategory): boolean {
  return TIER_CATEGORIES.includes(category);
}

export interface Score {
  id: string;
  slug: string;
  title: string;
  composer: string;
  category: ScoreCategory;
  level: ContentLevel;
  key: string;
  instrument: Instrument;
  pdf_url: string | null;
  preview_image_url: string | null;
  pages: number | null;
  popular: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ScoreFilters {
  category?: ScoreCategory;
  level?: ContentLevel;
  instrument?: Instrument;
  search?: string;
}

export async function getScores(filters?: ScoreFilters): Promise<Score[]> {
  const supabase = await createClient();
  let query = supabase.from('scores').select('*').order('popular', { ascending: false }).order('title');
  if (filters?.category) query = query.eq('category', filters.category);
  if (filters?.level) query = query.eq('level', filters.level);
  if (filters?.instrument) query = query.eq('instrument', filters.instrument);
  if (filters?.search) {
    const term = filters.search.replace(/[%,]/g, '');
    query = query.or(`title.ilike.%${term}%,composer.ilike.%${term}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getScoresByIds(ids: string[]): Promise<Score[]> {
  if (ids.length === 0) return [];
  const supabase = await createClient();
  const { data, error } = await supabase.from('scores').select('*').in('id', ids);
  if (error) throw error;
  return data ?? [];
}

export async function getScoreById(id: string): Promise<Score | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('scores').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getScoreBySlug(slug: string): Promise<Score | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('scores').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
}
