'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Music, Mail, Lock, User, Eye, EyeOff, Loader2, MailCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não correspondem!');
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { full_name: formData.name } },
    });
    setIsLoading(false);

    if (signUpError) {
      setError(signUpError.message === 'User already registered' ? 'Já existe uma conta com este e-mail.' : 'Não foi possível criar a conta. Tente novamente.');
      return;
    }

    if (data.session) {
      router.push('/dashboard');
      router.refresh();
    } else {
      setAwaitingConfirmation(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (awaitingConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-4">
              <MailCheck className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-bold text-foreground mb-2">Confirme seu e-mail</h1>
            <p className="text-foreground/70">
              Enviamos um link de confirmação para <strong>{formData.email}</strong>. Clique no link para ativar sua conta e fazer login.
            </p>
            <Link href="/login" className="inline-block mt-6 text-primary font-medium hover:text-primary/80 transition-colors">
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Music className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold text-foreground">Sax Tools</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Criar conta grátis</h1>
          <p className="text-foreground/60 mt-2">Comece sua jornada musical hoje</p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-card-foreground">
                Nome completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="name" name="name" type="text" value={formData.name} onChange={handleChange}
                  placeholder="Seu nome" required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                  placeholder="seu@email.com" required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-card-foreground">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange}
                  placeholder="••••••••" required minLength={6}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-card-foreground">
                Confirmar senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange}
                  placeholder="••••••••" required
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" required className="mt-1 rounded border-border" />
              <span className="text-sm text-foreground/70">
                Eu concordo com os{' '}
                <Link href="/termos" className="text-primary hover:text-primary/80">Termos de Uso</Link> e{' '}
                <Link href="/privacidade" className="text-primary hover:text-primary/80">Política de Privacidade</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg disabled:opacity-60"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">ou</span>
              </div>
            </div>

            <Link href="/" className="block w-full text-center border-2 border-accent text-accent py-3 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
              Continuar como Convidado
            </Link>
          </form>

          <p className="text-center text-sm text-foreground/70 mt-6">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-primary font-medium hover:text-primary/80 transition-colors">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
