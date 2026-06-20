'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

export function DeleteButton({ id, action }: { id: string; action: (id: string) => Promise<void> }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (!confirm('Tem certeza que deseja excluir? Essa ação não pode ser desfeita.')) return;
    setIsLoading(true);
    await action(id);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      title="Excluir"
      className="inline-flex items-center justify-center h-8 w-8 rounded-md text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  );
}
