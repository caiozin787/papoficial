'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth';
import {
  searchUsers, getConversations, getThread, markThreadAsRead, getSupportUserId,
  type UserSearchResult, type ConversationSummary, type Message,
} from '@/lib/messages';

export async function searchUsersAction(query: string): Promise<UserSearchResult[]> {
  return searchUsers(query);
}

export async function getConversationsAction(): Promise<ConversationSummary[]> {
  const user = await getCurrentUser();
  if (!user) return [];
  return getConversations(user.id);
}

export async function getThreadAction(otherUserId: string): Promise<Message[]> {
  const user = await getCurrentUser();
  if (!user) return [];
  return getThread(user.id, otherUserId);
}

export async function markThreadAsReadAction(otherUserId: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) return;
  await markThreadAsRead(user.id, otherUserId);
}

export async function getSupportUserIdAction(): Promise<string | null> {
  return getSupportUserId();
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
