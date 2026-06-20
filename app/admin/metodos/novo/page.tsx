import { ContentForm } from '@/components/admin/ContentForm';
import { METHOD_FIELDS } from '../fields';
import { createMethod } from '../actions';

export default function NewMethodPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Novo Método</h1>
      <ContentForm backHref="/admin/metodos" action={createMethod} fields={METHOD_FIELDS} initialValues={{ published: true }} />
    </div>
  );
}
