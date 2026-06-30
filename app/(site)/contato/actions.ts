'use server';

import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ error?: string }> {
  const { name, email, subject, message } = input;
  if (!name || !email || !subject || !message) return { error: 'Preenche todos os campos.' };

  const supabase = await createClient();
  const { error: dbError } = await supabase.from('contact_messages').insert({ name, email, subject, message });
  if (dbError) return { error: 'Não foi possível enviar a mensagem: ' + dbError.message };

  const subjectLabels: Record<string, string> = {
    support: 'Suporte Técnico',
    feedback: 'Feedback / Sugestões',
    partnership: 'Parcerias',
    content: 'Conteúdo / Educação',
    other: 'Outros',
  };

  try {
    await resend.emails.send({
      from: 'Sax Tools <contato@saxtools.pt>',
      to: 'saxtools1@gmail.com',
      replyTo: email,
      subject: `[Sax Tools] ${subjectLabels[subject] ?? subject} — ${name}`,
      text: `Nova mensagem do formulário de Contacto.\n\nNome: ${name}\nE-mail: ${email}\nAssunto: ${subjectLabels[subject] ?? subject}\n\nMensagem:\n${message}`,
    });
  } catch {
    // A mensagem já ficou guardada no Supabase mesmo que o e-mail falhe -- não é um erro fatal.
  }

  return {};
}
