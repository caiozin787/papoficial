'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUser } from '@/lib/auth';

const MAX_AVATAR_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

export async function uploadAvatar(formData: FormData): Promise<{ error?: string; avatarUrl?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: 'Não autenticado.' };

  const file = formData.get('avatar');
  if (!(file instanceof File) || file.size === 0) return { error: 'Nenhuma imagem selecionada.' };
  if (!ALLOWED_TYPES.includes(file.type)) return { error: 'Formato não suportado. Use PNG, JPG, WEBP ou GIF.' };
  if (file.size > MAX_AVATAR_BYTES) return { error: 'Imagem muito grande (máximo 4 MB).' };

  const admin = createAdminClient();
  const path = `${user.id}/avatar`;
  const { error: uploadError } = await admin.storage.from('avatars').upload(path, await file.arrayBuffer(), {
    contentType: file.type,
    upsert: true,
  });
  if (uploadError) return { error: 'Falha ao enviar a imagem: ' + uploadError.message };

  const { data } = admin.storage.from('avatars').getPublicUrl(path);
  const avatarUrl = `${data.publicUrl}?v=${Date.now()}`;

  const supabase = await createClient();
  const { error: updateError } = await supabase.from('profiles').update({ avatar_url: avatarUrl }).eq('id', user.id);
  if (updateError) return { error: 'Falha ao guardar a foto no perfil: ' + updateError.message };

  revalidatePath('/dashboard');
  return { avatarUrl };
}
