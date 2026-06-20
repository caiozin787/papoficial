import { createClient } from '@/lib/supabase/server';
import { FAVORITE_TABLE_MAP, type FavoritableType } from '@/lib/favorites-shared';

export async function isFavorited(userId: string, type: FavoritableType, contentId: string): Promise<boolean> {
  const { table, column } = FAVORITE_TABLE_MAP[type];
  const supabase = await createClient();
  const { data } = await supabase.from(table).select(column).eq('user_id', userId).eq(column, contentId).maybeSingle();
  return !!data;
}

export async function getFavoriteIds(userId: string, type: FavoritableType): Promise<string[]> {
  const { table, column } = FAVORITE_TABLE_MAP[type];
  const supabase = await createClient();
  const { data, error } = await supabase.from(table).select(column).eq('user_id', userId);
  if (error) throw error;
  return (data ?? []).map((row) => (row as Record<string, string>)[column]);
}
