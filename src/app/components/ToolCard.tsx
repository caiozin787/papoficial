import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  href?: string;
}

export function ToolCard({ icon: Icon, title, description, badge, href }: ToolCardProps) {
  const CardContent = () => (
    <>
      {badge && (
        <div className="absolute -top-2 -right-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground shadow-md">
          {badge}
        </div>
      )}

      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-card-foreground">{title}</h3>

      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      <div className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group-hover:gap-2">
        Acessar
        <span className="transition-all">→</span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link to={href} className="group relative rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block">
        <CardContent />
      </Link>
    );
  }

  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent />
    </div>
  );
}
