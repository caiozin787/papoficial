import Link from 'next/link';
import { MessageCircle, Headset } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getConversations, getSupportUserId } from '@/lib/messages';
import { NewConversationButton } from '@/components/dashboard/NewConversationButton';

export default async function MessagesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [conversations, supportUserId] = await Promise.all([getConversations(user.id), getSupportUserId()]);

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <h1 className="text-2xl font-bold text-foreground">Mensagens</h1>
        <div className="flex items-center gap-3">
          {supportUserId && supportUserId !== user.id && (
            <Link
              href={`/dashboard/mensagens/${supportUserId}`}
              className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary px-4 py-2 text-sm font-medium hover:bg-primary/5 transition-colors"
            >
              <Headset className="h-4 w-4" />
              Falar com a equipe
            </Link>
          )}
          <NewConversationButton />
        </div>
      </div>

      {conversations.length === 0 ? (
        <p className="text-muted-foreground">
          Você ainda não tem conversas. Use "Falar com a equipe" pra tirar dúvidas, ou "Nova conversa" pra mandar mensagem pra outro usuário.
        </p>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm divide-y divide-border">
          {conversations.map((c) => (
            <Link
              key={c.otherUserId}
              href={`/dashboard/mensagens/${c.otherUserId}`}
              className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-card-foreground truncate">{c.otherUserName}</span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {new Date(c.lastMessageAt).toLocaleDateString('pt-PT')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{c.lastMessage}</p>
              </div>
              {c.unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold px-1.5 flex-shrink-0">
                  {c.unreadCount}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
