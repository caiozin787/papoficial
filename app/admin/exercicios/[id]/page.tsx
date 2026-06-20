import { notFound } from 'next/navigation';
import { ContentForm } from '@/components/admin/ContentForm';
import { getExerciseById } from '@/lib/exercises';
import { EXERCISE_FIELDS } from '../fields';
import { updateExercise } from '../actions';

export default async function EditExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exercise = await getExerciseById(id);
  if (!exercise) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Editar Exercício</h1>
      <ContentForm backHref="/admin/exercicios" action={updateExercise.bind(null, id)} fields={EXERCISE_FIELDS} initialValues={exercise} />
    </div>
  );
}
