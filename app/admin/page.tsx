import Link from 'next/link';
import { BookOpen, BookMarked, Dumbbell, Radio, FileText } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

const CARDS = [
  { table: 'theories', label: 'Teorias', href: '/admin/teorias', icon: BookOpen },
  { table: 'methods', label: 'Métodos', href: '/admin/metodos', icon: BookMarked },
  { table: 'exercises', label: 'Exercícios', href: '/admin/exercicios', icon: Dumbbell },
  { table: 'playbacks', label: 'Playbacks', href: '/admin/playbacks', icon: Radio },
  { table: 'scores', label: 'Partituras', href: '/admin/partituras', icon: FileText },
] as const;

export default async function AdminHomePage() {
  const supabase = await createClient();

  const counts = await Promise.all(
    CARDS.map((card) => supabase.from(card.table).select('id', { count: 'exact', head: true })),
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Visão Geral</h1>
      <p className="text-muted-foreground mb-8">Gerencie todo o conteúdo da plataforma a partir daqui.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}
