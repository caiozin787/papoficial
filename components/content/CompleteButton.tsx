'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { CompletableType } from '@/lib/progress';

interface CompleteButtonProps {
  type: CompletableType;
  contentId: string;
  userId: string | null;
  initialCompleted: boolean;
  actionLabel?: string;
  completedLabel?: string;
}

function todayDateOnly(): string {
  return new Date().toISOString().slice(0, 10);
}

export function CompleteButton({
  type,
  contentId,
  userId,
  initialCompleted,
  actionLabel = 'Marcar como concluído',
  completedLabel = 'Concluído',
}: CompleteButtonProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!userId) {
    return (
      <Link
        href="/login"
        title="Entre para marcar como concluído"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors"
      >
        <Circle className="h-4 w-4" />
        {actionLabel}
      </Link>
    );
  }

  const toggle = async () => {
    setIsLoading(true);
    const supabase = createClient();

    if (completed) {
      await supabase.from('completions').delete().eq('user_id', userId).eq('content_type', type).eq('content_id', contentId);
    } else {
      await supabase.from('completions').insert({ user_id: userId, content_type: type, content_id: contentId });
      await supabase.from('daily_study_log').upsert({ user_id: userId, study_date: todayDateOnly() }, { onConflict: 'user_id,study_date' });
    }

    setCompleted(!completed);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
        completed ? 'border-green-500 bg-green-500/10 text-green-700' : 'border-border bg-card text-foreground/80 hover:border-primary/50 hover:text-primary'
      }`}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : completed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
      {completed ? completedLabel : actionLabel}
    </button>
  );
}
