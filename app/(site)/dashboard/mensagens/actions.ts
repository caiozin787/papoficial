'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth';
import { searchUsers, type UserSearchResult } from '@/lib/messages';

export async function searchUsersAction(query: string): Promise<UserSearchResult[]> {
  return searchUsers(query);
}

export async function sendMessage(recipientId: string, content: string): Promise<{ error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: 'Não autenticado.' };
  const trimmed = content.trim();
  if (!trimmed) return {};

  const supabase = await createClient();
  const { error } = await supabase.from('messages').insert({ sender_id: user.id, recipient_id: recipientId, content: trimmed });
  if (error) return { error: error.message };

  revalidatePath('/dashboard/mensagens');
  return {};
}
