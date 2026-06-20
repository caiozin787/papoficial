import { redirect } from 'next/navigation';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { getCurrentProfile } from '@/lib/auth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  if (!profile) redirect('/login');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <DashboardTabs />
        {children}
      </div>
    </div>
  );
}
