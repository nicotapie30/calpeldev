import type { ImageMetadata } from 'astro';
import gallegoCazaux from '../assets/projects/gallego-cazaux.png';
import isolina from '../assets/projects/isolina.png';
import estudioJuridico from '../assets/projects/estudio-juridico.png';
import estudioContable from '../assets/projects/estudio-contable.png';
import gimnasio from '../assets/projects/gimnasio.png';
import almaCafe from '../assets/projects/alma-cafe.png';
import espacioSereno from '../assets/projects/espacio-sereno.png';
import geoArgentina from '../assets/projects/geo-argentina.png';

export type Project = {
  name: string;
  type: string;
  stack: string[];
  description: string;
  /** URL del sitio en vivo, o null si está reservado. */
  link: string | null;
  /** Captura preview (16:9) importada desde src/assets/projects, o null para placeholder. */
  image: ImageMetadata | null;
  featured?: boolean;
  /** Marca un slot reservado para próximo proyecto. */
  reserved?: boolean;
};

export const projects: Project[] = [
  {
    name: 'Gimnasio Oxígeno',
    type: 'Demo · Sitio comercial con clases y horarios',
    stack: ['Next.js', 'Tailwind'],
    description:
      'Sitio para gimnasio con planes de membresía, grilla de actividades y formulario de contacto directo.',
    link: 'https://demo-gym-oxigeno.vercel.app/',
    image: gimnasio,
  },
  {
    name: 'Isolina',
    type: 'Landing page premium',
    stack: ['Next.js', 'Tailwind', 'Framer Motion'],
    description:
      'Landing con animaciones cinematográficas y diseño editorial para marca de indumentaria de autor.',
    link: 'https://isolina.vercel.app/',
    image: isolina,
  },
  {
    name: 'Estudio Jurídico',
    type: 'Demo · Landing institucional premium',
    stack: ['Astro', 'Tailwind'],
    description:
      'Landing oscura y editorial para bufete legal. Foco en autoridad, confianza y captación de consultas.',
    link: 'https://demo-estudio-juridico.vercel.app/',
    image: estudioJuridico,
  },
  {
    name: 'Estudio Contable',
    type: 'Demo · Landing profesional + bento de métricas',
    stack: ['Astro', 'Tailwind'],
    description:
      'Landing clean para estudio contable con bento de métricas (clientes, retención, años) y consulta gratuita destacada.',
    link: 'https://estudio-contable-xi.vercel.app/',
    image: estudioContable,
  },
  {
    name: 'Gallego Cazaux Inmobiliaria',
    type: 'Cliente · Sitio institucional + CMS',
    stack: ['Next.js', 'Sanity', 'Tailwind', 'Vercel'],
    description:
      'Sitio profesional con gestión de propiedades en tiempo real. La inmobiliaria carga, edita y publica desde un panel propio.',
    link: 'https://gallegocazaux.com/',
    image: gallegoCazaux,
    featured: true,
  },
  {
    name: 'Alma Café',
    type: 'Demo · Sitio gastronómico + reservas',
    stack: ['Astro', 'Tailwind'],
    description:
      'Sitio cálido y editorial para café de especialidad. Galería, menú y reservas online integradas.',
    link: 'https://demo-cafeteria-web.vercel.app/',
    image: almaCafe,
  },
  {
    name: 'Espacio Sereno',
    type: 'Demo · Landing bienestar + agenda de clases',
    stack: ['Astro', 'Tailwind'],
    description:
      'Landing para centro de yoga con clases, horarios y reservas. Diseño editorial sereno y minimalista.',
    link: 'https://yoga-website-design.vercel.app/',
    image: espacioSereno,
  },
  {
    name: 'Geo Argentina API',
    type: 'Proyecto propio · API REST pública',
    stack: ['Node.js', 'Express', 'MongoDB'],
    description:
      'API con datos geográficos completos de Argentina. Provincias, ciudades, códigos postales.',
    link: 'https://geo-argentina-api.vercel.app/',
    image: geoArgentina,
  },
  {
    name: 'Próximamente',
    type: 'Reservado para próximo proyecto',
    stack: [],
    description: 'Hay un lugar libre para tu proyecto. ¿Lo charlamos?',
    link: null,
    image: null,
    reserved: true,
  },
];
