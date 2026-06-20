import Link from 'next/link';
import { BookOpen, BookMarked, Dumbbell, Radio, FileText, History as HistoryIcon } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getRecentActivity, type ActivityContentType } from '@/lib/history';
import { getTheoriesByIds } from '@/lib/theories';
import { getMethodsByIds } from '@/lib/methods';
import { getExercisesByIds } from '@/lib/exercises';
import { getPlaybacksByIds } from '@/lib/playbacks';
import { getScoresByIds } from '@/lib/scores';

const TYPE_META: Record<ActivityContentType, { label: string; basePath: string; icon: typeof BookOpen }> = {
  theory: { label: 'Teoria', basePath: '/teoria', icon: BookOpen },
  method: { label: 'Método', basePath: '/metodos', icon: BookMarked },
  exercise: { label: 'Exercício', basePath: '/exercicios', icon: Dumbbell },
  playback: { label: 'Play Along', basePath: '/playalong', icon: Radio },
  score: { label: 'Partitura', basePath: '/partituras', icon: FileText },
  tool: { label: 'Ferramenta', basePath: '/ferramentas', icon: BookOpen },
};

export default async function HistoryPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const activity = await getRecentActivity(user.id);

  const idsByType: Record<string, string[]> = {};
  for (const entry of activity) {
    idsByType[entry.content_type] = idsByType[entry.content_type] ?? [];
    idsByType[entry.content_type].push(entry.content_id);
  }

  const [theories, methods, exercises, playbacks, scores] = await Promise.all([
    getTheoriesByIds(idsByType.theory ?? []),
    getMethodsByIds(idsByType.method ?? []),
    getExercisesByIds(idsByType.exercise ?? []),
    getPlaybacksByIds(idsByType.playback ?? []),
    getScoresByIds(idsByType.score ?? []),
  ]);

  const titleAndSlugById = new Map<string, { title: string; slug: string }>();
  for (const t of theories) titleAndSlugById.set(t.id, { title: t.title, slug: t.slug });
  for (const m of methods) titleAndSlugById.set(m.id, { title: m.title, slug: m.slug });
  for (const e of exercises) titleAndSlugById.set(e.id, { title: e.title, slug: e.slug });
  for (const p of playbacks) titleAndSlugById.set(p.id, { title: p.title, slug: p.slug });
  for (const s of scores) titleAndSlugById.set(s.id, { title: s.title, slug: s.slug });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Histórico</h1>

      {activity.length === 0 && (
        <p className="text-muted-foreground">Você ainda não acessou nenhum conteúdo. Seu histórico aparece aqui conforme você navega pela plataforma.</p>
      )}

      <div className="space-y-3">
        {activity.map((entry) => {
          const meta = TYPE_META[entry.content_type];
          const content = titleAndSlugById.get(entry.content_id);
          if (!content) return null;
          const Icon = meta.icon;

          return (
            <Link
              key={`${entry.content_type}-${entry.content_id}`}
              href={`${meta.basePath}/${content.slug}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-card-foreground">{content.title}</p>
                <p className="text-xs text-muted-foreground">{meta.label}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <HistoryIcon className="h-3.5 w-3.5" />
                {new Date(entry.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
