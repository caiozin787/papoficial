'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/dashboard', label: 'Perfil' },
  { href: '/dashboard/progresso', label: 'Progresso' },
  { href: '/dashboard/favoritos', label: 'Favoritos' },
  { href: '/dashboard/historico', label: 'Histórico' },
  { href: '/dashboard/mensagens', label: 'Mensagens' },
];

export function DashboardTabs() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href));

  return (
    <div className="flex flex-wrap gap-2 mb-10 border-b border-border pb-4">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            isActive(tab.href) ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground/70 hover:bg-muted/80'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
