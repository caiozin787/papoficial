import { createClient } from '@/lib/supabase/server';

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
}

export interface ConversationSummary {
  otherUserId: string;
  otherUserName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface UserSearchResult {
  id: string;
  full_name: string | null;
}

export async function getConversations(userId: string): Promise<ConversationSummary[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('messages')
    .select('id, sender_id, recipient_id, content, read_at, created_at')
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order('created_at', { ascending: false });
  if (error) throw error;

  const byOtherUser = new Map<string, { lastMessage: string; lastMessageAt: string; unreadCount: number }>();
  for (const msg of data ?? []) {
    const otherUserId = msg.sender_id === userId ? msg.recipient_id : msg.sender_id;
    const isUnread = msg.recipient_id === userId && !msg.read_at;
    const existing = byOtherUser.get(otherUserId);
    if (!existing) {
      byOtherUser.set(otherUserId, { lastMessage: msg.content, lastMessageAt: msg.created_at, unreadCount: isUnread ? 1 : 0 });
    } else if (isUnread) {
      existing.unreadCount++;
    }
  }

  const otherUserIds = [...byOtherUser.keys()];
  if (otherUserIds.length === 0) return [];

  const { data: profiles } = await supabase.rpc('get_profile_names', { user_ids: otherUserIds });
  const nameById = new Map<string, string>((profiles ?? []).map((p: { id: string; full_name: string | null }) => [p.id, p.full_name ?? 'Usuário']));

  return otherUserIds
    .map((otherUserId) => ({
      otherUserId,
      otherUserName: nameById.get(otherUserId) ?? 'Usuário',
      ...byOtherUser.get(otherUserId)!,
    }))
    .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
}

export async function getThread(userId: string, otherUserId: string): Promise<Message[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function markThreadAsRead(userId: string, otherUserId: string): Promise<void> {
  const supabase = await createClient();
  await supabase
    .from('messages')
    .update({ read_at: new Date().toISOString() })
    .eq('recipient_id', userId)
    .eq('sender_id', otherUserId)
    .is('read_at', null);
}

export async function getOtherUserName(otherUserId: string): Promise<string> {
  const supabase = await createClient();
  const { data } = await supabase.rpc('get_profile_names', { user_ids: [otherUserId] });
  return data?.[0]?.full_name ?? 'Usuário';
}

export async function searchUsers(query: string): Promise<UserSearchResult[]> {
  if (!query.trim()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('search_users', { query });
  if (error) throw error;
  return data ?? [];
}

export async function getSupportUserId(): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('get_support_user_id');
  if (error) throw error;
  return data ?? null;
}
