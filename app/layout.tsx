import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sax Tools — Plataforma para Saxofonistas',
  description: 'Ferramentas interativas, métodos, exercícios e playbacks para saxofonistas de todos os níveis.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
