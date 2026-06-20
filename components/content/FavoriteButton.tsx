'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { FAVORITE_TABLE_MAP, type FavoritableType } from '@/lib/favorites-shared';

interface FavoriteButtonProps {
  type: FavoritableType;
  contentId: string;
  userId: string | null;
  initialFavorited: boolean;
}

export function FavoriteButton({ type, contentId, userId, initialFavorited }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!userId) {
    return (
      <Link
        href="/login"
        title="Entre para favoritar"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors"
      >
        <Heart className="h-4 w-4" />
        Favoritar
      </Link>
    );
  }

  const toggle = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { table, column } = FAVORITE_TABLE_MAP[type];

    if (favorited) {
      await supabase.from(table).delete().eq('user_id', userId).eq(column, contentId);
    } else {
      await supabase.from(table).insert({ user_id: userId, [column]: contentId });
    }

    setFavorited(!favorited);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
        favorited ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-foreground/80 hover:border-primary/50 hover:text-primary'
      }`}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />}
      {favorited ? 'Favoritado' : 'Favoritar'}
    </button>
  );
}
