import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { requireAdmin } from '@/lib/admin-auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-x-auto">{children}</main>
    </div>
  );
}
