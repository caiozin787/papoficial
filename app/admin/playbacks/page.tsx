import { DataTable } from '@/components/admin/DataTable';
import { getPlaybacks, PLAYBACK_STYLE_LABELS } from '@/lib/playbacks';
import { CONTENT_LEVEL_LABELS } from '@/lib/content-levels';
import { deletePlayback } from './actions';

export default async function AdminPlaybacksPage() {
  const playbacks = await getPlaybacks();

  return (
    <DataTable
      title="Playbacks"
      basePath="/admin/playbacks"
      deleteAction={deletePlayback}
      rows={playbacks}
      columns={[
        { key: 'title', label: 'Título' },
        { key: 'style', label: 'Estilo', render: (p) => PLAYBACK_STYLE_LABELS[p.style] },
        { key: 'key', label: 'Tom' },
        { key: 'bpm', label: 'BPM' },
        { key: 'level', label: 'Nível', render: (p) => CONTENT_LEVEL_LABELS[p.level] },
        { key: 'published', label: 'Publicado', render: (p) => (p.published ? 'Sim' : 'Não') },
      ]}
    />
  );
}
