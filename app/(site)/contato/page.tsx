'use client';

import { useState } from 'react';
import { Mail, MapPin, Send, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contato:', formData);
    alert('Mensagem enviada com sucesso! Retornaremos em breve.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="py-16 md:py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent border border-accent/20 mb-6">
              Entre em Contato
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Estamos aqui para ajudar</h1>
            <p className="text-lg md:text-xl text-foreground/70">
              Tem alguma dúvida, sugestão ou feedback? Nossa equipe está pronta para ouvir você.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">E-mail</h3>
                <p className="text-sm text-muted-foreground mb-2">Respondemos em até 24 horas</p>
                <a href="mailto:saxtools1@gmail.com" className="text-primary hover:text-primary/80 text-sm font-medium">
                  saxtools1@gmail.com
                </a>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">Chat ao Vivo</h3>
                <p className="text-sm text-muted-foreground mb-2">Fale conosco em tempo real</p>
                <button className="text-accent hover:text-accent/80 text-sm font-medium">Iniciar conversa</button>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">Horário de Atendimento</h3>
                <p className="text-sm text-muted-foreground">
                  Segunda a Sexta
                  <br />
                  9h às 18h (horário de Portugal)
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">Localização</h3>
                <p className="text-sm text-muted-foreground">
                  Portugal, PT
                  <br />
                  Europe/Lisbon
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl shadow-xl border border-border p-8 md:p-10">
                <h2 className="text-2xl font-bold text-card-foreground mb-6">Envie sua mensagem</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-card-foreground">
                      Nome completo *
                    </label>
                    <input
                      id="name" name="name" type="text" value={formData.name} onChange={handleChange}
                      placeholder="Seu nome" required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
                      E-mail *
                    </label>
                    <input
                      id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                      placeholder="seu@email.com" required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-card-foreground">
                      Assunto *
                    </label>
                    <select
                      id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="support">Suporte Técnico</option>
                      <option value="feedback">Feedback / Sugestões</option>
                      <option value="partnership">Parcerias</option>
                      <option value="content">Conteúdo / Educação</option>
                      <option value="other">Outros</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-card-foreground">
                      Mensagem *
                    </label>
                    <textarea
                      id="message" name="message" value={formData.message} onChange={handleChange}
                      placeholder="Escreva sua mensagem aqui..." required rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Ao enviar este formulário, você concorda com nossa{' '}
                    <a href="#" className="text-primary hover:text-primary/80">Política de Privacidade</a>.
                  </p>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
                  >
                    <Send className="h-5 w-5" />
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
