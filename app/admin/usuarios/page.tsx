import { requireAdmin } from '@/lib/admin-auth';
import { getAllUsersForAdmin } from '@/lib/admin-users';
import { RoleToggleButton } from '@/components/admin/RoleToggleButton';
import { toggleUserRole } from './actions';

export default async function AdminUsersPage() {
  const admin = await requireAdmin();
  const users = await getAllUsersForAdmin();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Usuários</h1>
      <p className="text-muted-foreground mb-8">{users.length} usuário(s) cadastrado(s).</p>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Cadastro</th>
              <th className="px-4 py-3">Papel</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3 font-medium text-card-foreground">{u.full_name ?? '—'}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(u.created_at).toLocaleDateString('pt-PT')}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      u.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {u.role === 'admin' ? 'Admin' : 'Estudante'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <RoleToggleButton userId={u.id} role={u.role} disabled={u.id === admin.id} action={toggleUserRole} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
