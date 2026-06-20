import { DataTable } from '@/components/admin/DataTable';
import { getExercises, EXERCISE_CATEGORY_LABELS } from '@/lib/exercises';
import { CONTENT_LEVEL_LABELS } from '@/lib/content-levels';
import { deleteExercise } from './actions';

export default async function AdminExercisesPage() {
  const exercises = await getExercises();

  return (
    <DataTable
      title="Exercícios"
      basePath="/admin/exercicios"
      deleteAction={deleteExercise}
      rows={exercises}
      columns={[
        { key: 'title', label: 'Título' },
        { key: 'category', label: 'Categoria', render: (e) => EXERCISE_CATEGORY_LABELS[e.category] },
        { key: 'level', label: 'Nível', render: (e) => CONTENT_LEVEL_LABELS[e.level] },
        { key: 'published', label: 'Publicado', render: (e) => (e.published ? 'Sim' : 'Não') },
      ]}
    />
  );
}
