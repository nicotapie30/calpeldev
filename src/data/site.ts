/**
 * Info general del sitio. Centralizada para editar sin tocar componentes.
 * TODO(nico): completar los placeholders con tu data real.
 */
export const site = {
  name: 'CalPel.dev',
  url: 'https://calpel.dev',
  author: 'Nicolás Atapie',
  email: 'hola@calpel.dev',
  description:
    'Sitios web, ecommerce y automatizaciones a medida para PyMEs, agencias y emprendedores. Desde Santa Rosa, La Pampa, para toda Argentina y LATAM.',
  location: 'Santa Rosa, La Pampa, Argentina',

  // WhatsApp: solo dígitos para el link wa.me + versión visible
  whatsappNumber: '5492954310509',
  whatsappDisplay: '+54 9 2954 31-0509',

  // Link de agenda (Cal.com / Google Calendar). TODO(nico): URL real.
  calendarUrl: 'https://cal.com/calpel',

  social: {
    instagram: 'https://www.instagram.com/calpel.dev/',
    linkedin: 'https://www.linkedin.com/in/nicolasatapie',
    github: 'https://github.com/nicotapie30',
    twitter: '', // TODO(nico): handle de X/Twitter si existe
  },
} as const;

/** Link de WhatsApp con mensaje prellenado opcional. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
