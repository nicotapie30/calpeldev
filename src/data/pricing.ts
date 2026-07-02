export type PricingTier = {
  name: string;
  subtitle: string;
  price: string;
  priceNote: string;
  featured?: boolean;
  features: string[];
};

export type QuoteService = {
  title: string;
  description: string;
  whatsappMessage: string;
};

export const pricingTiers: PricingTier[] = [
  {
    name: 'Landing page',
    subtitle: 'Presencia digital de entrada.',
    price: 'Desde $320.000',
    priceNote: 'ARS',
    features: [
      'Diseño responsive mobile-first',
      'Hasta 5 secciones personalizadas',
      'Formulario de contacto',
      'SEO básico (meta tags, Open Graph)',
      'Deploy en Vercel con dominio propio',
    ],
  },
  {
    name: 'Sitio con CMS',
    subtitle: 'Tu sitio, editalo vos mismo.',
    price: 'Desde $750.000',
    priceNote: 'ARS',
    featured: true,
    features: [
      'Todo lo del Landing',
      'CMS para editar contenido sin código',
      'Páginas internas',
      'Blog opcional',
      'Analytics integrado',
    ],
  },
  {
    name: 'Ecommerce',
    subtitle: 'Vendé online desde el día uno.',
    price: 'Desde $1.500.000',
    priceNote: 'ARS',
    features: [
      'Todo lo del Sitio con CMS',
      'Catálogo de productos',
      'Carrito y checkout completo',
      'Integración Mercado Pago',
      'Panel de administración',
    ],
  },
];

export const quoteServices: QuoteService[] = [
  {
    title: 'Apps personalizadas',
    description: 'Paneles de gestión, dashboards y sistemas a medida para tu negocio.',
    whatsappMessage: 'Hola, me interesa cotizar una app personalizada.',
  },
  {
    title: 'Chatbots con IA',
    description: 'Automatizá tu atención al cliente con IA integrada a WhatsApp.',
    whatsappMessage: 'Hola, me interesa cotizar un chatbot con IA.',
  },
  {
    title: 'Automatizaciones',
    description: 'Conectá tus herramientas y eliminá el trabajo manual repetitivo.',
    whatsappMessage: 'Hola, me interesa cotizar automatizaciones para mi negocio.',
  },
];
