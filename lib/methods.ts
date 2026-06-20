import { createClient } from '@/lib/supabase/server';
import type { ContentLevel } from '@/lib/content-levels';

export type MethodCategory = 'iniciante' | 'intermediario' | 'avancado' | 'tecnica' | 'improvisacao' | 'leitura';

export const METHOD_CATEGORY_LABELS: Record<MethodCategory, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
  tecnica: 'Técnica',
  improvisacao: 'Improvisação',
  leitura: 'Leitura',
};

/** Categorias que são, na prática, o mesmo valor do nível — evita badge duplicado na UI. */
const TIER_CATEGORIES: MethodCategory[] = ['iniciante', 'intermediario', 'avancado'];
export function isTierCategory(category: MethodCategory): boolean {
  return TIER_CATEGORIES.includes(category);
}

export interface Method {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  category: MethodCategory;
  level: ContentLevel;
  cover_image_url: string | null;
  pdf_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getMethods(filters?: { category?: MethodCategory; level?: ContentLevel }): Promise<Method[]> {
  const supabase = await createClient();
  let query = supabase.from('methods').select('*').order('category').order('title');
  if (filters?.category) query = query.eq('category', filters.category);
  if (filters?.level) query = query.eq('level', filters.level);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getMethodsByIds(ids: string[]): Promise<Method[]> {
  if (ids.length === 0) return [];
  const supabase = await createClient();
  const { data, error } = await supabase.from('methods').select('*').in('id', ids);
  if (error) throw error;
  return data ?? [];
}

export async function getMethodById(id: string): Promise<Method | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('methods').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getMethodBySlug(slug: string): Promise<Method | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('methods').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
}
