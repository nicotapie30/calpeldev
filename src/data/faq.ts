export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: '¿Cuánto tarda un proyecto?',
    answer:
      'Depende del alcance. Una landing entre 7 y 15 días. Un sitio institucional con CMS entre 3 y 5 semanas. Un ecommerce o app a medida entre 6 y 10 semanas. En la propuesta inicial te paso el cronograma exacto.',
  },
  {
    question: '¿Cómo cobrás?',
    answer:
      '50% al iniciar y 50% contra entrega. Para proyectos largos podemos dividir en hitos. Acepto transferencia, Mercado Pago y facturación oficial (monotributo).',
  },
  {
    question: '¿Trabajás con clientes fuera de Argentina?',
    answer:
      'Sí. Trabajo con clientes en toda LATAM y España. Cobranza en pesos argentinos, USD o EUR según el caso.',
  },
  {
    question: '¿Qué pasa si necesito cambios después de la entrega?',
    answer:
      'Tenés 60 días de soporte sin cargo para ajustes menores. Después podés contratar mantenimiento mensual o pagar por hora cuando necesites algo nuevo. Sin obligación.',
  },
  {
    question: '¿Puedo actualizar contenido sin depender de vos?',
    answer:
      'Sí. Todos los proyectos incluyen un panel (CMS) donde podés editar textos, imágenes, agregar productos, etc. Te capacito en una sesión para que lo manejes vos solo.',
  },
  {
    question: '¿Por qué Next.js o Astro y no WordPress?',
    answer:
      'Mejor performance, mejor SEO, mejor seguridad y mucho menos mantenimiento a largo plazo. Te explico los pros y contras de cada tecnología en la primera reunión según tu caso.',
  },
  {
    question: '¿Y si el proyecto requiere algo que no sabés hacer?',
    answer:
      'Trabajo con red de colegas de confianza: diseñadores, redactores SEO, especialistas en ads. Si tu proyecto necesita algo fuera de mi alcance técnico, te lo digo y coordino con quien corresponda. Sin sumar fricción a tu lado.',
  },
];
