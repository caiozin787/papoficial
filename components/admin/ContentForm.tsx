'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox';
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

interface ContentFormProps {
  fields: FieldConfig[];
  initialValues?: object;
  action: (formData: FormData) => Promise<{ error?: string } | void>;
  backHref: string;
}

export function ContentForm({ fields, initialValues = {}, action, backHref }: ContentFormProps) {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const values = initialValues as Record<string, unknown>;

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError('');
    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <Link href={backHref} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      <form action={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        {fields.map((field) => {
          const initial = values[field.name];

          if (field.type === 'checkbox') {
            return (
              <label key={field.name} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={field.name}
                  defaultChecked={typeof initial === 'boolean' ? initial : false}
                  className="rounded border-border"
                />
                <span className="text-sm font-medium text-foreground">{field.label}</span>
              </label>
            );
          }

          return (
            <div key={field.name} className="space-y-1.5">
              <label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                {field.label}
                {field.required && ' *'}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  defaultValue={(initial as string) ?? ''}
                  required={field.required}
                  rows={6}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  defaultValue={(initial as string) ?? ''}
                  required={field.required}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {!field.required && <option value="">—</option>}
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  defaultValue={(initial as string | number) ?? ''}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
            </div>
          );
        })}

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}
