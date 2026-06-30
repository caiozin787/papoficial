'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/** Envia o e-mail de boas-vindas, sem nunca bloquear o registo se o envio falhar. */
export async function sendWelcomeEmail(name: string, email: string): Promise<void> {
  try {
    await resend.emails.send({
      from: 'Sax Tools <contato@saxtools.pt>',
      to: email,
      subject: 'Bem-vindo ao Sax Tools! 🎷',
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #2C1810;">
          <div style="text-align: center; padding: 24px 0;">
            <span style="font-size: 22px; font-weight: 800; color: #8B4513;">♪ Sax Tools</span>
          </div>
          <div style="background: #FFFBF5; border: 1px solid #F5E6D3; border-radius: 16px; padding: 32px;">
            <h1 style="font-size: 20px; margin: 0 0 16px;">Olá, ${name}! Bem-vindo(a) ao Sax Tools 🎷</h1>
            <p style="font-size: 14px; line-height: 1.6; color: #2C1810;">
              A tua conta foi criada com sucesso. Já podes começar a explorar:
            </p>
            <ul style="font-size: 14px; line-height: 1.8; color: #2C1810;">
              <li><strong>Ferramentas</strong> — afinador, metrónomo, escalas e mais</li>
              <li><strong>Teoria, Métodos, Exercícios, Play Along e Partituras</strong> — conteúdo organizado por nível</li>
              <li><strong>O teu Painel</strong> — favoritos, histórico e progresso de estudo</li>
            </ul>
            <div style="text-align: center; margin-top: 28px;">
              <a href="https://saxtools.pt/dashboard" style="background: #8B4513; color: #FFFBF5; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Ir para o meu painel
              </a>
            </div>
          </div>
          <p style="text-align: center; font-size: 12px; color: #8A7256; margin-top: 20px;">
            Sax Tools — Aprende, toca e evolui no sax
          </p>
        </div>
      `,
    });
  } catch {
    // Não bloqueia o registo se o envio do e-mail falhar.
  }
}
