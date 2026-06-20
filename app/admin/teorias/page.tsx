import { DataTable } from '@/components/admin/DataTable';
import { getTheories, THEORY_CATEGORY_LABELS } from '@/lib/theories';
import { deleteTheory } from './actions';

export default async function AdminTheoriesPage() {
  const theories = await getTheories();

  return (
    <DataTable
      title="Teorias"
      basePath="/admin/teorias"
      deleteAction={deleteTheory}
      rows={theories}
      columns={[
        { key: 'title', label: 'Título' },
        { key: 'category', label: 'Categoria', render: (t) => THEORY_CATEGORY_LABELS[t.category] },
        { key: 'published', label: 'Publicado', render: (t) => (t.published ? 'Sim' : 'Não') },
      ]}
    />
  );
}
