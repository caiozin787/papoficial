import { createClient } from '@/lib/supabase/server';
import type { ContentLevel } from '@/lib/content-levels';

export type ExerciseCategory = 'tecnica' | 'escalas' | 'improvisacao' | 'leitura';

export const EXERCISE_CATEGORY_LABELS: Record<ExerciseCategory, string> = {
  tecnica: 'Técnica',
  escalas: 'Escalas',
  improvisacao: 'Improvisação',
  leitura: 'Leitura',
};

export interface Exercise {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ExerciseCategory;
  subcategory: string | null;
  level: ContentLevel;
  estimated_minutes: number | null;
  materials_needed: string | null;
  pdf_url: string | null;
  audio_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getExercises(filters?: { category?: ExerciseCategory; level?: ContentLevel }): Promise<Exercise[]> {
  const supabase = await createClient();
  let query = supabase.from('exercises').select('*').order('category').order('subcategory').order('level');
  if (filters?.category) query = query.eq('category', filters.category);
  if (filters?.level) query = query.eq('level', filters.level);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getExerciseById(id: string): Promise<Exercise | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('exercises').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getExerciseBySlug(slug: string): Promise<Exercise | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('exercises').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getExercisesByIds(ids: string[]): Promise<Exercise[]> {
  if (ids.length === 0) return [];
  const supabase = await createClient();
  const { data, error } = await supabase.from('exercises').select('*').in('id', ids);
  if (error) throw error;
  return data ?? [];
}
