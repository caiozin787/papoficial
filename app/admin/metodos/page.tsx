import { DataTable } from '@/components/admin/DataTable';
import { getMethods, METHOD_CATEGORY_LABELS } from '@/lib/methods';
import { CONTENT_LEVEL_LABELS } from '@/lib/content-levels';
import { deleteMethod } from './actions';

export default async function AdminMethodsPage() {
  const methods = await getMethods();

  return (
    <DataTable
      title="Métodos"
      basePath="/admin/metodos"
      deleteAction={deleteMethod}
      rows={methods}
      columns={[
        { key: 'title', label: 'Título' },
        { key: 'author', label: 'Autor' },
        { key: 'category', label: 'Categoria', render: (m) => METHOD_CATEGORY_LABELS[m.category] },
        { key: 'level', label: 'Nível', render: (m) => CONTENT_LEVEL_LABELS[m.level] },
        { key: 'published', label: 'Publicado', render: (m) => (m.published ? 'Sim' : 'Não') },
      ]}
    />
  );
}
