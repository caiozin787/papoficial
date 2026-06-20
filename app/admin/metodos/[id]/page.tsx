import { notFound } from 'next/navigation';
import { ContentForm } from '@/components/admin/ContentForm';
import { getMethodById } from '@/lib/methods';
import { METHOD_FIELDS } from '../fields';
import { updateMethod } from '../actions';

export default async function EditMethodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const method = await getMethodById(id);
  if (!method) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Editar Método</h1>
      <ContentForm backHref="/admin/metodos" action={updateMethod.bind(null, id)} fields={METHOD_FIELDS} initialValues={method} />
    </div>
  );
}
