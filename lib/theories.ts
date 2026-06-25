import { createClient } from '@/lib/supabase/server';

export type TheoryCategory = 'fundamentos' | 'escalas' | 'harmonia' | 'leitura';

export const THEORY_CATEGORY_LABELS: Record<TheoryCategory, string> = {
  fundamentos: 'Fundamentos',
  escalas: 'Escalas',
  harmonia: 'Harmonia',
  leitura: 'Leitura Musical',
};

export interface Theory {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: TheoryCategory;
  pdf_url: string | null;
  cover_image_url: string | null;
  card_image_url: string | null;
  order_index: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getTheories(category?: TheoryCategory): Promise<Theory[]> {
  const supabase = await createClient();
  let query = supabase.from('theories').select('*').order('category').order('order_index');
  if (category) query = query.eq('category', category);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getTheoriesByIds(ids: string[]): Promise<Theory[]> {
  if (ids.length === 0) return [];
  const supabase = await createClient();
  const { data, error } = await supabase.from('theories').select('*').in('id', ids);
  if (error) throw error;
  return data ?? [];
}

export async function getTheoryById(id: string): Promise<Theory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('theories').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getTheoryBySlug(slug: string): Promise<Theory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('theories').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getRelatedExerciseIds(theoryId: string): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('theory_exercises').select('exercise_id').eq('theory_id', theoryId);
  if (error) throw error;
  return (data ?? []).map((r) => r.exercise_id);
}

export async function getTheoriesForExercise(exerciseId: string): Promise<Theory[]> {
  const supabase = await createClient();
  const { data: relations, error: relError } = await supabase
    .from('theory_exercises')
    .select('theory_id')
    .eq('exercise_id', exerciseId);
  if (relError) throw relError;

  const theoryIds = (relations ?? []).map((r) => r.theory_id);
  if (theoryIds.length === 0) return [];

  const { data, error } = await supabase.from('theories').select('*').in('id', theoryIds);
  if (error) throw error;
  return data ?? [];
}

export async function getRelatedTheories(theoryId: string): Promise<Theory[]> {
  const supabase = await createClient();
  const { data: relations, error: relError } = await supabase
    .from('theory_relations')
    .select('related_theory_id')
    .eq('theory_id', theoryId);
  if (relError) throw relError;

  const relatedIds = (relations ?? []).map((r) => r.related_theory_id);
  if (relatedIds.length === 0) return [];

  const { data, error } = await supabase.from('theories').select('*').in('id', relatedIds);
  if (error) throw error;
  return data ?? [];
}
