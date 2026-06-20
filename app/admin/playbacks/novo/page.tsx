import { ContentForm } from '@/components/admin/ContentForm';
import { PLAYBACK_FIELDS } from '../fields';
import { createPlayback } from '../actions';

export default function NewPlaybackPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Novo Playback</h1>
      <ContentForm backHref="/admin/playbacks" action={createPlayback} fields={PLAYBACK_FIELDS} initialValues={{ published: true }} />
    </div>
  );
}
