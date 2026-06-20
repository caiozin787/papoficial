import { ContentForm } from '@/components/admin/ContentForm';
import { SCORE_FIELDS } from '../fields';
import { createScore } from '../actions';

export default function NewScorePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Nova Partitura</h1>
      <ContentForm backHref="/admin/partituras" action={createScore} fields={SCORE_FIELDS} initialValues={{ published: true }} />
    </div>
  );
}
