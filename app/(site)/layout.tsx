import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingChat } from '@/components/chat/FloatingChat';
import { getCurrentProfile } from '@/lib/auth';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();

  return (
    <div className="flex min-h-screen flex-col">
      <Header profile={profile} />
      <main className="flex-1 bg-background">{children}</main>
      <Footer />
      {profile && <FloatingChat currentUserId={profile.id} />}
    </div>
  );
}
