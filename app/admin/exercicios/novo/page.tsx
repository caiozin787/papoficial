import { ContentForm } from '@/components/admin/ContentForm';
import { EXERCISE_FIELDS } from '../fields';
import { createExercise } from '../actions';

export default function NewExercisePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Novo Exercício</h1>
      <ContentForm backHref="/admin/exercicios" action={createExercise} fields={EXERCISE_FIELDS} initialValues={{ published: true }} />
    </div>
  );
}
