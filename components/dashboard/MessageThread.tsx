'use client';

import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Message } from '@/lib/messages';

export function MessageThread({
  currentUserId,
  otherUserId,
  initialMessages,
  sendMessageAction,
  compact = false,
}: {
  currentUserId: string;
  otherUserId: string;
  initialMessages: Message[];
  sendMessageAction: (recipientId: string, content: string) => Promise<{ error?: string }>;
  /** Sem borda/cantos/altura fixa própria — pra caber dentro de outro container (ex.: o chat flutuante). */
  compact?: boolean;
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // O chat flutuante reaproveita esta mesma instância ao trocar de conversa e busca o
  // histórico de forma assíncrona depois de já ter montado — sem isso, a tela nunca
  // mostraria as mensagens carregadas (useState só usa o valor inicial na montagem).
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const supabase = createClient();
    let channel: ReturnType<typeof supabase.channel> | null = null;
    let cancelled = false;

    // O cliente do navegador (@supabase/ssr) restaura a sessão de forma assíncrona a partir
    // dos cookies; se inscrever no canal antes disso, o Realtime avalia a política de RLS sem
    // o auth.uid() certo e nenhum evento chega (mesmo o canal entrando em status "SUBSCRIBED").
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled || !session) return;
      supabase.realtime.setAuth(session.access_token);
      channel = supabase
        .channel(`messages-${currentUserId}-${otherUserId}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          (payload) => {
            const incoming = payload.new as Message;
            if (incoming.recipient_id !== currentUserId || incoming.sender_id !== otherUserId) return;
            setMessages((prev) => (prev.some((m) => m.id === incoming.id) ? prev : [...prev, incoming]));
          },
        )
        .subscribe();
    });

    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
    };
  }, [currentUserId, otherUserId]);

  const handleSend = async () => {
    const content = draft.trim();
    if (!content || isSending) return;
    setIsSending(true);
    setDraft('');

    const optimistic: Message = {
      id: `optimistic-${Date.now()}`,
      sender_id: currentUserId,
      recipient_id: otherUserId,
      content,
      read_at: null,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);

    const result = await sendMessageAction(otherUserId, content);
    if (result.error) {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      setDraft(content);
    }
    setIsSending(false);
  };

  return (
    <div className={compact ? 'flex flex-col h-full' : 'bg-card rounded-xl border border-border shadow-sm flex flex-col h-[60vh]'}>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">Diga olá para começar a conversa.</p>
        )}
        {messages.map((m) => {
          const isOwn = m.sender_id === currentUserId;
          return (
            <div key={m.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                  isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{m.content}</p>
                <p className={`text-[10px] mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {new Date(m.created_at).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-border p-3 flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Escreva uma mensagem..."
          className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          onClick={handleSend}
          disabled={!draft.trim() || isSending}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors flex-shrink-0"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
