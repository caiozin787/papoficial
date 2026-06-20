import { notFound } from 'next/navigation';
import { ContentForm } from '@/components/admin/ContentForm';
import { getPlaybackById } from '@/lib/playbacks';
import { PLAYBACK_FIELDS } from '../fields';
import { updatePlayback } from '../actions';

export default async function EditPlaybackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const playback = await getPlaybackById(id);
  if (!playback) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Editar Playback</h1>
      <ContentForm backHref="/admin/playbacks" action={updatePlayback.bind(null, id)} fields={PLAYBACK_FIELDS} initialValues={playback} />
    </div>
  );
}
