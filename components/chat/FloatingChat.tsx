'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X, ArrowLeft, Headset, Search, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { sendMessage, getConversationsAction, getThreadAction, markThreadAsReadAction, getSupportUserIdAction, searchUsersAction } from '@/app/(site)/dashboard/mensagens/actions';
import { MessageThread } from '@/components/dashboard/MessageThread';
import type { ConversationSummary, Message, UserSearchResult } from '@/lib/messages';

type View = 'list' | 'search' | { thread: { userId: string; name: string } };

export function FloatingChat({ currentUserId }: { currentUserId: string }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('list');
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [supportUserId, setSupportUserId] = useState<string | null>(null);
  const [threadMessages, setThreadMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);

  const unreadTotal = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  const refreshConversations = async () => {
    const [convos, support] = await Promise.all([getConversationsAction(), getSupportUserIdAction()]);
    setConversations(convos);
    setSupportUserId(support);
  };

  useEffect(() => {
    refreshConversations();
  }, []);

  // Mantém o contador de não lidas atualizado mesmo com o painel fechado.
  useEffect(() => {
    const supabase = createClient();
    let channel: ReturnType<typeof supabase.channel> | null = null;
    let cancelled = false;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled || !session) return;
      supabase.realtime.setAuth(session.access_token);
      channel = supabase
        .channel(`floating-chat-${currentUserId}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages', filter: `recipient_id=eq.${currentUserId}` },
          () => refreshConversations(),
        )
        .subscribe();
    });

    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
    };
  }, [currentUserId]);

  const openThread = async (otherUserId: string, name: string) => {
    setThreadMessages([]);
    setView({ thread: { userId: otherUserId, name } });
    const messages = await getThreadAction(otherUserId);
    setThreadMessages(messages);
    await markThreadAsReadAction(otherUserId);
    refreshConversations();
  };

  const handleSearch = async (value: string) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    setSearchResults(await searchUsersAction(value));
  };

  const backToList = () => {
    setView('list');
    setSearchQuery('');
    setSearchResults([]);
    refreshConversations();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden" style={{ height: 480 }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary text-primary-foreground">
            {typeof view === 'object' ? (
              <button onClick={backToList} className="inline-flex items-center gap-2 text-sm font-medium">
                <ArrowLeft className="h-4 w-4" />
                {view.thread.name}
              </button>
            ) : view === 'search' ? (
              <button onClick={backToList} className="inline-flex items-center gap-2 text-sm font-medium">
                <ArrowLeft className="h-4 w-4" />
                Nova conversa
              </button>
            ) : (
              <span className="text-sm font-semibold">Mensagens</span>
            )}
            <button onClick={() => setOpen(false)} aria-label="Fechar chat">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className={typeof view === 'object' ? 'flex-1 overflow-hidden' : 'flex-1 overflow-y-auto'}>
            {view === 'list' && (
              <div>
                <div className="p-3 flex gap-2 border-b border-border">
                  {supportUserId && supportUserId !== currentUserId && (
                    <button
                      onClick={() => openThread(supportUserId, 'Equipe Sax Tools')}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary text-primary px-2 py-2 text-xs font-medium hover:bg-primary/5 transition-colors"
                    >
                      <Headset className="h-3.5 w-3.5" />
                      Falar com a equipe
                    </button>
                  )}
                  <button
                    onClick={() => setView('search')}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-2 py-2 text-xs font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Nova conversa
                  </button>
                </div>

                {conversations.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8 px-4">Nenhuma conversa ainda.</p>
                ) : (
                  <ul className="divide-y divide-border">
                    {conversations.map((c) => (
                      <li key={c.otherUserId}>
                        <button
                          onClick={() => openThread(c.otherUserId, c.otherUserName)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                            <MessageCircle className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-card-foreground block truncate">{c.otherUserName}</span>
                            <span className="text-xs text-muted-foreground block truncate">{c.lastMessage}</span>
                          </div>
                          {c.unreadCount > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold px-1.5 flex-shrink-0">
                              {c.unreadCount}
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {view === 'search' && (
              <div className="p-3">
                <div className="relative mb-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Buscar pelo nome..."
                    className="w-full rounded-md border border-border bg-background pl-8 pr-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <ul>
                  {searchResults.map((r) => (
                    <li key={r.id}>
                      <button
                        onClick={() => openThread(r.id, r.full_name ?? 'Usuário')}
                        className="w-full text-left px-2 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                      >
                        {r.full_name ?? 'Usuário'}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {typeof view === 'object' && (
              <MessageThread
                key={view.thread.userId}
                currentUserId={currentUserId}
                otherUserId={view.thread.userId}
                initialMessages={threadMessages}
                sendMessageAction={sendMessage}
                compact
              />
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir chat"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 transition-colors"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && unreadTotal > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold px-1.5">
            {unreadTotal}
          </span>
        )}
      </button>
    </div>
  );
}
