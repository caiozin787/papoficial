import { ContentForm } from '@/components/admin/ContentForm';
import { THEORY_FIELDS } from '../fields';
import { createTheory } from '../actions';

export default function NewTheoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Nova Teoria</h1>
      <ContentForm backHref="/admin/teorias" action={createTheory} fields={THEORY_FIELDS} initialValues={{ published: true }} />
    </div>
  );
}
