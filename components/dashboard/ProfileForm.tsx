'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

export function ProfileForm({ userId, initialName }: { userId: string; initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);

    const supabase = createClient();
    await supabase.from('profiles').update({ full_name: name }).eq('id', userId);

    setIsSaving(false);
    setSaved(true);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="full_name" className="block text-sm font-medium text-card-foreground">
          Nome
        </label>
        <input
          id="full_name"
          value={name}
          onChange={(e) => { setName(e.target.value); setSaved(false); }}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSaving}>
          {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Salvar
        </Button>
        {saved && <span className="text-sm text-green-600">Salvo!</span>}
      </div>
    </form>
  );
}
