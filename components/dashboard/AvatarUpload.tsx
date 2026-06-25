'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User as UserIcon, Camera, Loader2 } from 'lucide-react';
import { uploadAvatar } from '@/app/(site)/dashboard/actions';

export function AvatarUpload({ avatarUrl }: { avatarUrl: string | null }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(avatarUrl);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setPreview(URL.createObjectURL(file));
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const result = await uploadAvatar(formData);

      if (result.error) {
        setError(result.error);
        setPreview(avatarUrl);
      } else if (result.avatarUrl) {
        setPreview(result.avatarUrl);
        router.refresh();
      }
    } catch {
      setError('Falha ao enviar a imagem. Tente uma foto menor.');
      setPreview(avatarUrl);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isSaving}
        className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary border border-border"
        aria-label="Alterar foto de perfil"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Foto de perfil" className="h-full w-full object-cover" />
        ) : (
          <UserIcon className="h-10 w-10" />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          {isSaving ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : <Camera className="h-5 w-5 text-white" />}
        </span>
      </button>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isSaving}
        className="text-xs font-medium text-primary hover:underline disabled:opacity-50"
      >
        {avatarUrl || preview ? 'Trocar foto' : 'Adicionar foto'}
      </button>
      {error && <p className="text-xs text-destructive max-w-[10rem] text-center">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
