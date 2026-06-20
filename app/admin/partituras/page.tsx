import { DataTable } from '@/components/admin/DataTable';
import { getScores, SCORE_CATEGORY_LABELS, INSTRUMENT_LABELS } from '@/lib/scores';
import { CONTENT_LEVEL_LABELS } from '@/lib/content-levels';
import { deleteScore } from './actions';

export default async function AdminScoresPage() {
  const scores = await getScores();

  return (
    <DataTable
      title="Partituras"
      basePath="/admin/partituras"
      deleteAction={deleteScore}
      rows={scores}
      columns={[
        { key: 'title', label: 'Título' },
        { key: 'composer', label: 'Compositor' },
        { key: 'category', label: 'Categoria', render: (s) => SCORE_CATEGORY_LABELS[s.category] },
        { key: 'level', label: 'Nível', render: (s) => CONTENT_LEVEL_LABELS[s.level] },
        { key: 'instrument', label: 'Instrumento', render: (s) => INSTRUMENT_LABELS[s.instrument] },
        { key: 'published', label: 'Publicado', render: (s) => (s.published ? 'Sim' : 'Não') },
      ]}
    />
  );
}
