export type Testimonial = {
  name: string;
  initials: string;
  role: string;
  company: string;
  city: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Luciana Ferreyra',
    initials: 'LF',
    role: 'Dueña',
    company: 'Ferreyra Indumentaria',
    city: 'Santa Rosa, La Pampa',
    quote: 'Teníamos una página vieja que no aportaba nada. El sitio nuevo llegó en dos semanas, carga rapidísimo y las consultas por WhatsApp se triplicaron.',
  },
  {
    name: 'Matías Coria',
    initials: 'MC',
    role: 'Gerente',
    company: 'Coria Automotores',
    city: 'General Pico, La Pampa',
    quote: 'Nos armaron el sistema de turnos online y fue un cambio total. Antes tomábamos todo por teléfono. Ahora los clientes reservan solos y nosotros solo confirmamos.',
  },
  {
    name: 'Carolina Pérez',
    initials: 'CP',
    role: 'Arquitecta',
    company: 'Pérez Arquitectura',
    city: 'Neuquén Capital',
    quote: 'Necesitaba un portfolio que se vea profesional sin gastar una fortuna. Me entregaron exactamente eso: limpio, rápido y en mobile queda impecable.',
  },
  {
    name: 'Rodrigo Gutiérrez',
    initials: 'RG',
    role: 'Fundador',
    company: 'Gutiérrez Digital',
    city: 'Rosario, Santa Fe',
    quote: 'Trabajé con varias agencias antes y siempre quedaba algo a medias. Acá fue la primera vez que entregaron en tiempo, sin errores y respondiendo el mismo día.',
  },
  {
    name: 'Florencia Ibáñez',
    initials: 'FI',
    role: 'Directora',
    company: 'Instituto San Martín',
    city: 'Santa Rosa, La Pampa',
    quote: 'Nos hicieron la web con inscripciones online. El proceso fue muy claro desde la primera reunión y el resultado superó expectativas. Los padres ahora inscriben en minutos.',
  },
  {
    name: 'Ezequiel Ferraro',
    initials: 'EF',
    role: 'CEO',
    company: 'Ferraro Logística',
    city: 'Bahía Blanca, Buenos Aires',
    quote: 'Automatizaron el seguimiento de pedidos y el tiempo que ahorré en operaciones es enorme. Hablás con una persona real que entiende el negocio.',
  },
  {
    name: 'Agustina Vidal',
    initials: 'AV',
    role: 'Psicóloga',
    company: 'Consultorio Vidal',
    city: 'Córdoba Capital',
    quote: 'Quería algo sencillo para que mis pacientes me encuentren y saquen turno. Me la armaron rápido, me explicaron todo y me enseñaron a editarla sola si lo necesito.',
  },
  {
    name: 'Nicolás Figueroa',
    initials: 'NF',
    role: 'Socio',
    company: 'Figueroa & Morales Constructora',
    city: 'Mendoza Capital',
    quote: 'El sistema de cotizaciones cambió cómo trabajamos. Antes una cotización llevaba horas. Ahora sale en 10 minutos y el cliente la recibe automáticamente.',
  },
  {
    name: 'Sabrina Torres',
    initials: 'ST',
    role: 'Fundadora',
    company: 'Torres Nutrición Online',
    city: 'Buenos Aires, CABA',
    quote: 'Arranqué mi consultorio online y necesitaba todo: web, reservas y formularios. Me resolvieron cada punto sin complicarme la vida. Muy buena onda y profesionalismo total.',
  },
];
