import { createClient } from '@/lib/supabase/server';

export type ActivityContentType = 'theory' | 'method' | 'exercise' | 'playback' | 'score' | 'tool';

export async function logActivity(userId: string, contentType: ActivityContentType, contentId: string, action: 'viewed' | 'completed' = 'viewed') {
  const supabase = await createClient();
  await supabase.from('activity_log').insert({ user_id: userId, content_type: contentType, content_id: contentId, action });
}

export interface ActivityEntry {
  content_type: ActivityContentType;
  content_id: string;
  created_at: string;
}

/** Últimas atividades, deduplicadas por conteúdo (mantém só o acesso mais recente de cada item). */
export async function getRecentActivity(userId: string, limit = 30): Promise<ActivityEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('activity_log')
    .select('content_type, content_id, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit * 3);
  if (error) throw error;

  const seen = new Set<string>();
  const deduped: ActivityEntry[] = [];
  for (const row of data ?? []) {
    const key = `${row.content_type}:${row.content_id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(row);
    if (deduped.length >= limit) break;
  }
  return deduped;
}
