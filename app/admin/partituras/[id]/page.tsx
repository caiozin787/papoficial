import { notFound } from 'next/navigation';
import { ContentForm } from '@/components/admin/ContentForm';
import { getScoreById } from '@/lib/scores';
import { SCORE_FIELDS } from '../fields';
import { updateScore } from '../actions';

export default async function EditScorePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const score = await getScoreById(id);
  if (!score) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Editar Partitura</h1>
      <ContentForm backHref="/admin/partituras" action={updateScore.bind(null, id)} fields={SCORE_FIELDS} initialValues={score} />
    </div>
  );
}
