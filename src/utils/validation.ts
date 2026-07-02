import { z } from 'zod';

/** Opciones del select "Tipo de proyecto". value = lo que viaja en el form. */
export const projectTypes = [
  { value: 'sitio-web', label: 'Sitio web / Landing' },
  { value: 'ecommerce', label: 'Ecommerce / Tienda online' },
  { value: 'app', label: 'App o sistema a medida' },
  { value: 'chatbot', label: 'Chatbot con IA' },
  { value: 'automatizacion', label: 'Automatización / Integración' },
  { value: 'otro', label: 'Otro / No estoy seguro' },
] as const;

const projectTypeValues = projectTypes.map((t) => t.value) as [string, ...string[]];

/**
 * Schema compartido cliente + servidor del formulario de contacto.
 * `website` es el honeypot: debe llegar vacío (los bots lo completan).
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Ingresá tu nombre.').max(80),
  email: z.email('Email inválido.'),
  projectType: z.enum(projectTypeValues, { message: 'Elegí un tipo de proyecto.' }),
  message: z
    .string()
    .trim()
    .min(20, 'Contame un poco más (mínimo 20 caracteres).')
    .max(2000),
  website: z.string().max(0).optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;
