import { Calendar } from 'lucide-react';
import { ProfileForm } from '@/components/dashboard/ProfileForm';
import { AvatarUpload } from '@/components/dashboard/AvatarUpload';
import { getCurrentUser, getCurrentProfile } from '@/lib/auth';

export default async function DashboardProfilePage() {
  const user = await getCurrentUser();
  const profile = await getCurrentProfile();
  if (!user || !profile) return null;

  const createdAt = new Date(profile.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground mb-8">Meu Perfil</h1>

      <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <AvatarUpload avatarUrl={profile.avatar_url} />
          <div>
            <p className="text-lg font-semibold text-foreground">{profile.full_name || 'Sem nome'}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
              <Calendar className="h-3.5 w-3.5" />
              Membro desde {createdAt}
            </div>
          </div>
        </div>

        <ProfileForm userId={user.id} initialName={profile.full_name ?? ''} />
      </div>
    </div>
  );
}
