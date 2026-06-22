'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/admin-auth';

export async function toggleUserRole(userId: string, currentRole: 'student' | 'admin'): Promise<void> {
  const admin = await requireAdmin();
  if (userId === admin.id) return; // não permite remover o próprio acesso por engano
  const newRole = currentRole === 'admin' ? 'student' : 'admin';
  const supabase = await createClient();
  await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
  revalidatePath('/admin/usuarios');
}
