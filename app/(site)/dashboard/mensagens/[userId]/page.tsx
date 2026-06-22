import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getThread, getOtherUserName, markThreadAsRead } from '@/lib/messages';
import { MessageThread } from '@/components/dashboard/MessageThread';
import { sendMessage } from '../actions';

export default async function MessageThreadPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId: otherUserId } = await params;
  const user = await getCurrentUser();
  if (!user) return null;
  if (otherUserId === user.id) notFound();

  const [messages, otherUserName] = await Promise.all([getThread(user.id, otherUserId), getOtherUserName(otherUserId)]);
  await markThreadAsRead(user.id, otherUserId);

  return (
    <div>
      <Link href="/dashboard/mensagens" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" />
        Voltar para Mensagens
      </Link>

      <h1 className="text-2xl font-bold text-foreground mb-6">{otherUserName}</h1>

      <MessageThread
        currentUserId={user.id}
        otherUserId={otherUserId}
        initialMessages={messages}
        sendMessageAction={sendMessage}
      />
    </div>
  );
}
