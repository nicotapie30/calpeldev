import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { contactSchema, projectTypes } from '../../utils/validation';
import { site } from '../../data/site';

// Endpoint serverless (no se prerenderiza en build)
export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Body inválido.' }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json({ success: false, error: 'Revisá los datos del formulario.' }, 400);
  }

  const { name, email, projectType, message, website } = parsed.data;

  // Honeypot: si viene con contenido es un bot. Respondemos 200 sin enviar nada.
  if (website) return json({ success: true });

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_EMAIL ?? site.email;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY no configurada');
    return json({ success: false, error: 'Servicio de email no disponible.' }, 500);
  }

  const typeLabel =
    projectTypes.find((t) => t.value === projectType)?.label ?? projectType;

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      // TODO(nico): cambiar a hola@calpel.dev cuando el dominio esté verificado.
      from: 'CalPel.dev <onboarding@resend.dev>',
      to: [to],
      replyTo: email,
      subject: `Nueva consulta CalPel.dev — ${typeLabel}`,
      text: `Nombre: ${name}\nEmail: ${email}\nTipo: ${typeLabel}\n\nMensaje:\n${message}`,
    });
    if (error) {
      console.error('[contact] Resend error:', error);
      return json({ success: false, error: 'No se pudo enviar. Probá por WhatsApp.' }, 502);
    }
  } catch (err) {
    console.error('[contact] Excepción:', err);
    return json({ success: false, error: 'Error inesperado. Probá por WhatsApp.' }, 500);
  }

  return json({ success: true });
};
