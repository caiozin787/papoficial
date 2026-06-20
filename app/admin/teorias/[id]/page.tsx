import { notFound } from 'next/navigation';
import { ContentForm } from '@/components/admin/ContentForm';
import { getTheoryById } from '@/lib/theories';
import { THEORY_FIELDS } from '../fields';
import { updateTheory } from '../actions';

export default async function EditTheoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const theory = await getTheoryById(id);
  if (!theory) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Editar Teoria</h1>
      <ContentForm backHref="/admin/teorias" action={updateTheory.bind(null, id)} fields={THEORY_FIELDS} initialValues={theory} />
    </div>
  );
}
