'use client';

import { useState } from 'react';
import { Loader2, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const supabase = createClient();
    const { error } = await supabase.from('newsletter_subscribers').insert({ email });

    if (error && error.code !== '23505') {
      setStatus('error');
      return;
    }

    setStatus('done');
    setEmail('');
  };

  if (status === 'done') {
    return (
      <p className="flex items-center gap-2 text-sm text-primary font-medium">
        <Check className="h-4 w-4" />
        Subscrito! Obrigado.
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          className="flex-1 rounded-lg border border-border bg-input-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'OK'}
        </button>
      </form>
      {status === 'error' && <p className="text-xs text-red-600 mt-2">Não foi possível subscrever.</p>}
    </div>
  );
}
