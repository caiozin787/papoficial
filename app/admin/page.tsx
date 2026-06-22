import Link from 'next/link';
import { BookOpen, BookMarked, Dumbbell, Radio, FileText, Users, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { getUserCount, getRecentSignups, getTopFavorites, topFavoriteHref } from '@/lib/admin-stats';

const CARDS = [
  { table: 'theories', label: 'Teorias', href: '/admin/teorias', icon: BookOpen },
  { table: 'methods', label: 'Métodos', href: '/admin/metodos', icon: BookMarked },
  { table: 'exercises', label: 'Exercícios', href: '/admin/exercicios', icon: Dumbbell },
  { table: 'playbacks', label: 'Playbacks', href: '/admin/playbacks', icon: Radio },
  { table: 'scores', label: 'Partituras', href: '/admin/partituras', icon: FileText },
] as const;

const CONTENT_TYPE_LABELS = { method: 'Método', exercise: 'Exercício', playback: 'Playback', score: 'Partitura' } as const;

export default async function AdminHomePage() {
  const supabase = await createClient();

  const [counts, userCount, recentSignups, topFavorites] = await Promise.all([
    Promise.all(CARDS.map((card) => supabase.from(card.table).select('id', { count: 'exact', head: true }))),
    getUserCount(),
    getRecentSignups(5),
    getTopFavorites(5),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Visão Geral</h1>
      <p className="text-muted-foreground mb-8">Gerencie todo o conteúdo da plataforma a partir daqui.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <Link
          href="/admin/usuarios"
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{userCount}</div>
            <div className="text-sm text-muted-foreground">Usuários</div>
          </div>
        </Link>

        {CARDS.map((card, i) => (
          <Link
            key={card.table}
            href={card.href}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
              <card.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{counts[i].count ?? 0}</div>
              <div className="text-sm text-muted-foreground">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold text-card-foreground mb-4">Conteúdo mais favoritado</h2>
          {topFavorites.length === 0 ? (
            <p className="text-sm text-muted-foreground">Ainda não há favoritos registrados.</p>
          ) : (
            <ul className="space-y-3">
              {topFavorites.map((item) => (
                <li key={`${item.content_type}-${item.content_id}`} className="flex items-center justify-between gap-3">
                  <Link href={topFavoriteHref(item)} className="flex items-center gap-2 text-sm text-card-foreground hover:text-primary transition-colors truncate">
                    <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground flex-shrink-0">
                      {CONTENT_TYPE_LABELS[item.content_type]}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </Link>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent flex-shrink-0">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {item.favorite_count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold text-card-foreground mb-4">Cadastros recentes</h2>
          {recentSignups.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum cadastro ainda.</p>
          ) : (
            <ul className="space-y-3">
              {recentSignups.map((u) => (
                <li key={u.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-card-foreground truncate">{u.full_name ?? 'Sem nome'}</span>
                  <span className="text-muted-foreground flex-shrink-0">{new Date(u.created_at).toLocaleDateString('pt-PT')}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
