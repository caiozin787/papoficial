import { createClient } from '@/lib/supabase/server';

export interface TopFavorite {
  content_type: 'method' | 'exercise' | 'playback' | 'score';
  content_id: string;
  favorite_count: number;
  title: string;
  slug: string;
}

export interface RecentSignup {
  id: string;
  full_name: string | null;
  created_at: string;
}

export async function getUserCount(): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase.from('profiles').select('id', { count: 'exact', head: true });
  return count ?? 0;
}

export async function getRecentSignups(limit = 5): Promise<RecentSignup[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function getTopFavorites(limit = 5): Promise<TopFavorite[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('admin_top_favorites', { limit_count: limit });
  if (error) throw error;
  return data ?? [];
}

const CONTENT_BASE_PATH: Record<TopFavorite['content_type'], string> = {
  method: '/metodos',
  exercise: '/exercicios',
  playback: '/playalong',
  score: '/partituras',
};

export function topFavoriteHref(item: TopFavorite): string {
  return `${CONTENT_BASE_PATH[item.content_type]}/${item.slug}`;
}
