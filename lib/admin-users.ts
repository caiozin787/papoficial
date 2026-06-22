import { createClient } from '@/lib/supabase/server';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: 'student' | 'admin';
  created_at: string;
}

export async function getAllUsersForAdmin(): Promise<AdminUser[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('admin_list_users');
  if (error) throw error;
  return data ?? [];
}
