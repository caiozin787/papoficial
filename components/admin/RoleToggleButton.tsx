'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ShieldOff, Loader2 } from 'lucide-react';

export function RoleToggleButton({
  userId,
  role,
  disabled,
  action,
}: {
  userId: string;
  role: 'student' | 'admin';
  disabled?: boolean;
  action: (userId: string, currentRole: 'student' | 'admin') => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    const message =
      role === 'admin'
        ? 'Remover acesso de admin desse usuário?'
        : 'Tornar esse usuário admin? Ele vai ter acesso total ao painel.';
    if (!confirm(message)) return;
    setIsLoading(true);
    await action(userId, role);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      title={disabled ? 'Você não pode alterar seu próprio acesso' : role === 'admin' ? 'Remover admin' : 'Tornar admin'}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        role === 'admin' ? 'text-destructive hover:bg-destructive/10' : 'text-primary hover:bg-primary/10'
      }`}
    >
      {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : role === 'admin' ? <ShieldOff className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
      {role === 'admin' ? 'Remover admin' : 'Tornar admin'}
    </button>
  );
}
