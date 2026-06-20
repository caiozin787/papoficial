import { createClient } from '@/lib/supabase/server';

export type CompletableType = 'theory' | 'method' | 'exercise';

export async function isCompleted(userId: string, type: CompletableType, contentId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('completions')
    .select('id')
    .eq('user_id', userId)
    .eq('content_type', type)
    .eq('content_id', contentId)
    .maybeSingle();
  return !!data;
}

export async function getCompletionCounts(userId: string): Promise<Record<CompletableType, number>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('completions').select('content_type').eq('user_id', userId);
  if (error) throw error;

  const counts: Record<CompletableType, number> = { theory: 0, method: 0, exercise: 0 };
  for (const row of data ?? []) counts[row.content_type as CompletableType]++;
  return counts;
}

export async function getPublishedContentCounts(): Promise<Record<CompletableType, number>> {
  const supabase = await createClient();
  const [theories, methods, exercises] = await Promise.all([
    supabase.from('theories').select('id', { count: 'exact', head: true }).eq('published', true),
    supabase.from('methods').select('id', { count: 'exact', head: true }).eq('published', true),
    supabase.from('exercises').select('id', { count: 'exact', head: true }).eq('published', true),
  ]);

  return {
    theory: theories.count ?? 0,
    method: methods.count ?? 0,
    exercise: exercises.count ?? 0,
  };
}

export interface RecentCompletion {
  content_id: string;
  completed_at: string;
}

export async function getRecentCompletions(userId: string, type: CompletableType, limit = 5): Promise<RecentCompletion[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('completions')
    .select('content_id, completed_at')
    .eq('user_id', userId)
    .eq('content_type', type)
    .order('completed_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}
