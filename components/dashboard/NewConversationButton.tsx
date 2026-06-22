'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, X } from 'lucide-react';
import { searchUsersAction } from '@/app/(site)/dashboard/mensagens/actions';
import type { UserSearchResult } from '@/lib/messages';

export function NewConversationButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    const found = await searchUsersAction(value);
    setResults(found);
    setIsLoading(false);
  };

  const handleSelect = (userId: string) => {
    setOpen(false);
    setQuery('');
    setResults([]);
    router.push(`/dashboard/mensagens/${userId}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
      >
        {open ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        Nova conversa
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-lg border border-border bg-card shadow-lg z-20 p-3">
          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar pelo nome..."
              className="w-full rounded-md border border-border bg-background pl-8 pr-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {isLoading && <p className="text-xs text-muted-foreground px-1">Buscando...</p>}

          {!isLoading && query && results.length === 0 && (
            <p className="text-xs text-muted-foreground px-1">Nenhum usuário encontrado.</p>
          )}

          <ul className="max-h-48 overflow-y-auto">
            {results.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => handleSelect(r.id)}
                  className="w-full text-left px-2 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                >
                  {r.full_name ?? 'Usuário'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
