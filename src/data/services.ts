export type Service = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tags: string[];
};

export const services: Service[] = [
  {
    number: '01',
    title: 'Sitios web & Ecommerce',
    tagline: 'A medida, rápidos y escalables.',
    description:
      'Sitios institucionales, landings y tiendas online con Next.js, Astro y Tailwind. Performance 90+ en PageSpeed, SEO técnico y CMS para que actualices sin depender de nadie.',
    features: [
      'Diseño responsive — mobile-first desde el primer pixel',
      'Performance 90+ en PageSpeed y Core Web Vitals',
      'SEO técnico: meta tags, sitemap, schema, Open Graph',
      'CMS integrado para editar contenido sin tocar código',
      'Integración con medios de pago (MP, Stripe, PayPal)',
    ],
    tags: ['Next.js', 'Astro', 'Tailwind CSS', 'Vercel', 'Sanity'],
  },
  {
    number: '02',
    title: 'Apps personalizadas',
    tagline: 'Soluciones digitales únicas.',
    description:
      'Aplicaciones web a medida para resolver problemas específicos: paneles de gestión, dashboards, sistemas de reservas, herramientas internas. Construidas para crecer.',
    features: [
      'Paneles de gestión y dashboards con datos en tiempo real',
      'Sistema de roles, permisos y autenticación segura',
      'API REST o integración con sistemas y ERPs existentes',
      'Deploy en la nube con escalabilidad automática',
      'Soporte post-lanzamiento y evolución iterativa',
    ],
    tags: ['React', 'TypeScript', 'Supabase', 'tRPC', 'PostgreSQL'],
  },
  {
    number: '03',
    title: 'Chatbots con IA',
    tagline: 'Atención 24/7 automática.',
    description:
      'Integramos modelos de IA (Claude, GPT) con WhatsApp Cloud API o tu sitio web para automatizar consultas, captar leads y mejorar atención sin sumar personal.',
    features: [
      'Integración nativa con WhatsApp Cloud API',
      'Entrenado con tu información de negocio y FAQs',
      'Captación, clasificación y calificación de leads',
      'Escalada automática a humano cuando es necesario',
      'Dashboard con métricas y conversaciones en tiempo real',
    ],
    tags: ['Claude API', 'GPT-4o', 'WhatsApp API', 'n8n', 'Webhooks'],
  },
  {
    number: '04',
    title: 'Automatizaciones',
    tagline: 'Menos trabajo manual, más resultados.',
    description:
      'Conectamos tus herramientas (CRM, planillas, mails, WhatsApp, redes) con n8n para eliminar tareas repetitivas. Workflow custom según tu caso.',
    features: [
      'Flujos con n8n — self-hosted o cloud según tu contexto',
      'Conexión entre CRM, email, WhatsApp y Google Sheets',
      'Notificaciones y alertas automáticas por cualquier canal',
      'Reportes periódicos generados y enviados sin intervención',
      'Documentación del flujo y capacitación al equipo',
    ],
    tags: ['n8n', 'Make', 'Zapier', 'REST APIs', 'Google Workspace'],
  },
];
