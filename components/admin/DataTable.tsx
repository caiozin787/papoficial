import Link from 'next/link';
import { Pencil, Plus } from 'lucide-react';
import { DeleteButton } from './DeleteButton';
import { Button } from '@/components/ui/button';

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  title: string;
  columns: Column<T>[];
  rows: T[];
  basePath: string;
  deleteAction: (id: string) => Promise<void>;
}

export function DataTable<T extends { id: string }>({ title, columns, rows, basePath, deleteAction }: DataTableProps<T>) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <Link href={`${basePath}/novo`}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-foreground/90 whitespace-nowrap">
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '—')}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`${basePath}/${row.id}`}
                      title="Editar"
                      className="inline-flex items-center justify-center h-8 w-8 rounded-md text-foreground/70 hover:bg-muted transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton id={row.id} action={deleteAction} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-8 text-center text-muted-foreground">Nenhum registro encontrado.</p>}
      </div>
    </div>
  );
}
