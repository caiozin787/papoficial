import { createClient } from '@/lib/supabase/server';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'student' | 'admin';
  created_at: string;
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).maybeSingle();
  return profile;
}
