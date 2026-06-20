import Link from 'next/link';
import { BookMarked } from 'lucide-react';
import { METHOD_CATEGORY_LABELS, isTierCategory, type Method } from '@/lib/methods';
import { CONTENT_LEVEL_LABELS, CONTENT_LEVEL_COLORS } from '@/lib/content-levels';

export function MethodCard({ method }: { method: Method }) {
  return (
    <Link
      href={`/metodos/${method.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/50 transition-all"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
        {method.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={method.cover_image_url} alt={method.title} className="h-full w-full object-cover" />
        ) : (
          <BookMarked className="h-10 w-10 text-primary/60" />
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {!isTierCategory(method.category) && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {METHOD_CATEGORY_LABELS[method.category]}
            </span>
          )}
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CONTENT_LEVEL_COLORS[method.level]}`}>
            {CONTENT_LEVEL_LABELS[method.level]}
          </span>
        </div>
        <h3 className="text-base font-semibold text-card-foreground mb-1">{method.title}</h3>
        <p className="text-xs text-muted-foreground mb-2">{method.author}</p>
        <p className="text-sm text-muted-foreground flex-1">{method.description}</p>
      </div>
    </Link>
  );
}
